import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Input validation schema
const quarantineRecordSchema = z.object({
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().optional().transform(str => str ? new Date(str) : undefined),
  reason: z.string().min(1, 'Reason is required'),
  location: z.string().min(1, 'Location is required'),
  status: z.string().min(1, 'Status is required'),
  notes: z.string().optional(),
  veterinarianId: z.string().optional(),
  cost: z.string().optional(),
});

// GET /api/livestock/[id]/quarantine
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Check if animal exists
    const animal = await prisma.animal.findUnique({
      where: { id: params.id },
      select: { id: true },
    });

    if (!animal) {
      return NextResponse.json(
        { error: 'Animal not found' },
        { status: 404 }
      );
    }

    // Get total count for pagination
    const total = await prisma.quarantineRecord.count({
      where: { animalId: params.id },
    });

    // Get paginated results with veterinarian details
    const records = await prisma.quarantineRecord.findMany({
      where: { animalId: params.id },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { startDate: 'desc' },
      include: {
        veterinarian: {
          select: {
            id: true,
            name: true,
            contact: true,
          },
        },
      },
    });

    return NextResponse.json({
      records,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      _links: {
        self: `/api/livestock/${params.id}/quarantine?page=${page}&limit=${limit}`,
        animal: `/api/livestock/${params.id}`,
      }
    });
  } catch (error) {
    console.error('Failed to fetch quarantine records:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quarantine records' },
      { status: 500 }
    );
  }
}

// POST /api/livestock/[id]/quarantine
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = quarantineRecordSchema.parse(body);

    // Check if animal exists
    const animal = await prisma.animal.findUnique({
      where: { id: params.id },
      select: { id: true },
    });

    if (!animal) {
      return NextResponse.json(
        { error: 'Animal not found' },
        { status: 404 }
      );
    }

    // If veterinarian is specified, check if they exist
    if (validatedData.veterinarianId) {
      const veterinarian = await prisma.veterinarian.findUnique({
        where: { id: validatedData.veterinarianId },
        select: { id: true },
      });

      if (!veterinarian) {
        return NextResponse.json(
          { error: 'Veterinarian not found' },
          { status: 404 }
        );
      }
    }

    // Create quarantine record
    const record = await prisma.quarantineRecord.create({
      data: {
        ...validatedData,
        animalId: params.id,
      },
      include: {
        veterinarian: {
          select: {
            id: true,
            name: true,
            contact: true,
          },
        },
      },
    });

    // Update animal's quarantine status
    await prisma.animal.update({
      where: { id: params.id },
      data: { 
        isQuarantined: true,
        quarantineLocation: validatedData.location,
      },
    });

    return NextResponse.json({
      message: 'Quarantine record created successfully',
      record,
      _links: {
        self: `/api/livestock/${params.id}/quarantine/${record.id}`,
        collection: `/api/livestock/${params.id}/quarantine`,
        animal: `/api/livestock/${params.id}`,
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Quarantine record creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation error', 
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create quarantine record' },
      { status: 500 }
    );
  }
}

// PUT /api/livestock/[id]/quarantine/[recordId]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; recordId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = quarantineRecordSchema.parse(body);

    // Check if quarantine record exists
    const existingRecord = await prisma.quarantineRecord.findUnique({
      where: {
        id: params.recordId,
        animalId: params.id,
      },
    });

    if (!existingRecord) {
      return NextResponse.json(
        { error: 'Quarantine record not found' },
        { status: 404 }
      );
    }

    // If veterinarian is specified, check if they exist
    if (validatedData.veterinarianId) {
      const veterinarian = await prisma.veterinarian.findUnique({
        where: { id: validatedData.veterinarianId },
        select: { id: true },
      });

      if (!veterinarian) {
        return NextResponse.json(
          { error: 'Veterinarian not found' },
          { status: 404 }
        );
      }
    }

    // Update quarantine record
    const record = await prisma.quarantineRecord.update({
      where: {
        id: params.recordId,
        animalId: params.id,
      },
      data: validatedData,
      include: {
        veterinarian: {
          select: {
            id: true,
            name: true,
            contact: true,
          },
        },
      },
    });

    // If status is changed to completed, update animal's quarantine status
    if (validatedData.status === 'completed' && existingRecord.status !== 'completed') {
      await prisma.animal.update({
        where: { id: params.id },
        data: { 
          isQuarantined: false,
          quarantineLocation: null,
        },
      });
    }

    return NextResponse.json({
      message: 'Quarantine record updated successfully',
      record,
      _links: {
        self: `/api/livestock/${params.id}/quarantine/${record.id}`,
        collection: `/api/livestock/${params.id}/quarantine`,
        animal: `/api/livestock/${params.id}`,
      }
    });
  } catch (error) {
    console.error('Failed to update quarantine record:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation error', 
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }

    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { error: 'Quarantine record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update quarantine record' },
      { status: 500 }
    );
  }
}

// DELETE /api/livestock/[id]/quarantine/[recordId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; recordId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if quarantine record exists and get its status
    const record = await prisma.quarantineRecord.findUnique({
      where: {
        id: params.recordId,
        animalId: params.id,
      },
      select: { status: true },
    });

    if (!record) {
      return NextResponse.json(
        { error: 'Quarantine record not found' },
        { status: 404 }
      );
    }

    // Delete quarantine record
    await prisma.quarantineRecord.delete({
      where: {
        id: params.recordId,
        animalId: params.id,
      },
    });

    // If the deleted record was active, update animal's quarantine status
    if (record.status !== 'completed') {
      await prisma.animal.update({
        where: { id: params.id },
        data: { 
          isQuarantined: false,
          quarantineLocation: null,
        },
      });
    }

    return NextResponse.json({
      message: 'Quarantine record deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete quarantine record:', error);

    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { error: 'Quarantine record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete quarantine record' },
      { status: 500 }
    );
  }
} 