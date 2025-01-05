import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Input validation schema
const weightRecordSchema = z.object({
  date: z.string().transform(str => new Date(str)),
  weight: z.string().min(1, 'Weight is required'),
  notes: z.string().optional(),
});

// GET /api/livestock/[id]/weight
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
    const total = await prisma.weightRecord.count({
      where: { animalId: params.id },
    });

    // Get paginated results
    const records = await prisma.weightRecord.findMany({
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
        self: `/api/livestock/${params.id}/weight?page=${page}&limit=${limit}`,
        animal: `/api/livestock/${params.id}`,
      }
    });
  } catch (error) {
    console.error('Failed to fetch weight records:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weight records' },
      { status: 500 }
    );
  }
}

// POST /api/livestock/[id]/weight
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
    const validatedData = weightRecordSchema.parse(body);

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

    // Create weight record
    const record = await prisma.weightRecord.create({
      data: {
        ...validatedData,
        animalId: params.id,
      },
    });

    // Update animal's current weight
    await prisma.animal.update({
      where: { id: params.id },
      data: { weight: validatedData.weight },
    });

    return NextResponse.json({
      message: 'Weight record created successfully',
      record,
      _links: {
        self: `/api/livestock/${params.id}/weight/${record.id}`,
        collection: `/api/livestock/${params.id}/weight`,
        animal: `/api/livestock/${params.id}`,
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Weight record creation error:', error);

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
      { error: 'Failed to create weight record' },
      { status: 500 }
    );
  }
}

// DELETE /api/livestock/[id]/weight/[recordId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; recordId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.weightRecord.delete({
      where: {
        id: params.recordId,
        animalId: params.id,
      },
    });

    return NextResponse.json({
      message: 'Weight record deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete weight record:', error);

    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { error: 'Weight record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete weight record' },
      { status: 500 }
    );
  }
} 