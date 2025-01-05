import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Input validation schema
const movementRecordSchema = z.object({
  date: z.string().transform(str => new Date(str)),
  type: z.string().min(1, 'Type is required'),
  fromLocation: z.string().min(1, 'From location is required'),
  toLocation: z.string().min(1, 'To location is required'),
  reason: z.string().optional(),
  transportMethod: z.string().optional(),
  cost: z.string().optional(),
  notes: z.string().optional(),
});

// GET /api/livestock/[id]/movement
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
    const total = await prisma.movementRecord.count({
      where: { animalId: params.id },
    });

    // Get paginated results
    const records = await prisma.movementRecord.findMany({
      where: { animalId: params.id },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { date: 'desc' },
    });

    return NextResponse.json({
      records,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      _links: {
        self: `/api/livestock/${params.id}/movement?page=${page}&limit=${limit}`,
        animal: `/api/livestock/${params.id}`,
      }
    });
  } catch (error) {
    console.error('Failed to fetch movement records:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movement records' },
      { status: 500 }
    );
  }
}

// POST /api/livestock/[id]/movement
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
    const validatedData = movementRecordSchema.parse(body);

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

    // Create movement record
    const record = await prisma.movementRecord.create({
      data: {
        ...validatedData,
        animalId: params.id,
      },
    });

    // Update animal's current location
    await prisma.animal.update({
      where: { id: params.id },
      data: { location: validatedData.toLocation },
    });

    return NextResponse.json({
      message: 'Movement record created successfully',
      record,
      _links: {
        self: `/api/livestock/${params.id}/movement/${record.id}`,
        collection: `/api/livestock/${params.id}/movement`,
        animal: `/api/livestock/${params.id}`,
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Movement record creation error:', error);

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
      { error: 'Failed to create movement record' },
      { status: 500 }
    );
  }
}

// DELETE /api/livestock/[id]/movement/[recordId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; recordId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.movementRecord.delete({
      where: {
        id: params.recordId,
        animalId: params.id,
      },
    });

    return NextResponse.json({
      message: 'Movement record deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete movement record:', error);

    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { error: 'Movement record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete movement record' },
      { status: 500 }
    );
  }
} 