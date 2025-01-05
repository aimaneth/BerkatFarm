import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Input validation schema
const productionRecordSchema = z.object({
  date: z.string().transform(str => new Date(str)),
  type: z.string().min(1, 'Type is required'),
  quantity: z.string().min(1, 'Quantity is required'),
  quality: z.string().min(1, 'Quality is required'),
  notes: z.string().optional(),
});

// GET /api/livestock/[id]/production
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
    const total = await prisma.productionRecord.count({
      where: { animalId: params.id },
    });

    // Get paginated results
    const records = await prisma.productionRecord.findMany({
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
        self: `/api/livestock/${params.id}/production?page=${page}&limit=${limit}`,
        animal: `/api/livestock/${params.id}`,
      }
    });
  } catch (error) {
    console.error('Failed to fetch production records:', error);
    return NextResponse.json(
      { error: 'Failed to fetch production records' },
      { status: 500 }
    );
  }
}

// POST /api/livestock/[id]/production
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
    const validatedData = productionRecordSchema.parse(body);

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

    // Create production record
    const record = await prisma.productionRecord.create({
      data: {
        ...validatedData,
        animalId: params.id,
      },
    });

    return NextResponse.json({
      message: 'Production record created successfully',
      record,
      _links: {
        self: `/api/livestock/${params.id}/production/${record.id}`,
        collection: `/api/livestock/${params.id}/production`,
        animal: `/api/livestock/${params.id}`,
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Production record creation error:', error);

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
      { error: 'Failed to create production record' },
      { status: 500 }
    );
  }
}

// DELETE /api/livestock/[id]/production/[recordId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; recordId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.productionRecord.delete({
      where: {
        id: params.recordId,
        animalId: params.id,
      },
    });

    return NextResponse.json({
      message: 'Production record deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete production record:', error);

    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { error: 'Production record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete production record' },
      { status: 500 }
    );
  }
} 