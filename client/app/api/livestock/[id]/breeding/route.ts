import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Input validation schema
const breedingRecordSchema = z.object({
  date: z.string().transform(str => new Date(str)),
  type: z.string().min(1, 'Type is required'),
  partnerId: z.string().optional(),
  expectedDueDate: z.string().optional().transform(str => str ? new Date(str) : undefined),
  outcome: z.string().optional(),
  offspringCount: z.string().optional(),
  notes: z.string().optional(),
  cost: z.string().optional(),
});

// GET /api/livestock/[id]/breeding
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
    const total = await prisma.breedingRecord.count({
      where: { animalId: params.id },
    });

    // Get paginated results with partner details
    const records = await prisma.breedingRecord.findMany({
      where: { animalId: params.id },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { date: 'desc' },
      include: {
        partner: {
          select: {
            id: true,
            name: true,
            breed: true,
            gender: true,
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
        self: `/api/livestock/${params.id}/breeding?page=${page}&limit=${limit}`,
        animal: `/api/livestock/${params.id}`,
      }
    });
  } catch (error) {
    console.error('Failed to fetch breeding records:', error);
    return NextResponse.json(
      { error: 'Failed to fetch breeding records' },
      { status: 500 }
    );
  }
}

// POST /api/livestock/[id]/breeding
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
    const validatedData = breedingRecordSchema.parse(body);

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

    // If partner is specified, check if it exists
    if (validatedData.partnerId) {
      const partner = await prisma.animal.findUnique({
        where: { id: validatedData.partnerId },
        select: { id: true },
      });

      if (!partner) {
        return NextResponse.json(
          { error: 'Partner animal not found' },
          { status: 404 }
        );
      }
    }

    // Create breeding record
    const record = await prisma.breedingRecord.create({
      data: {
        ...validatedData,
        animalId: params.id,
      },
      include: {
        partner: {
          select: {
            id: true,
            name: true,
            breed: true,
            gender: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: 'Breeding record created successfully',
      record,
      _links: {
        self: `/api/livestock/${params.id}/breeding/${record.id}`,
        collection: `/api/livestock/${params.id}/breeding`,
        animal: `/api/livestock/${params.id}`,
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Breeding record creation error:', error);

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
      { error: 'Failed to create breeding record' },
      { status: 500 }
    );
  }
}

// DELETE /api/livestock/[id]/breeding/[recordId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; recordId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.breedingRecord.delete({
      where: {
        id: params.recordId,
        animalId: params.id,
      },
    });

    return NextResponse.json({
      message: 'Breeding record deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete breeding record:', error);

    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { error: 'Breeding record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete breeding record' },
      { status: 500 }
    );
  }
} 