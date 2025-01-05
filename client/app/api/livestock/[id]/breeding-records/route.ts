import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const breedingRecordSchema = z.object({
  date: z.string().transform(str => new Date(str)),
  type: z.string().min(1, 'Type is required'),
  outcome: z.string().optional(),
  notes: z.string().optional(),
});

// GET /api/livestock/[id]/breeding-records
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
    const sort = searchParams.get('sort') || 'date';
    const order = searchParams.get('order') || 'desc';

    // Verify animal exists
    const animal = await prisma.animal.findUnique({
      where: { id: params.id },
      select: { id: true }
    });

    if (!animal) {
      return NextResponse.json(
        { error: 'Animal not found' },
        { status: 404 }
      );
    }

    // Get total count
    const total = await prisma.breedingRecord.count({
      where: { animalId: params.id }
    });

    // Get paginated records
    const records = await prisma.breedingRecord.findMany({
      where: { animalId: params.id },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sort]: order },
    });

    return NextResponse.json({
      items: records,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      _links: {
        self: `/api/livestock/${params.id}/breeding-records?page=${page}&limit=${limit}`,
        animal: `/api/livestock/${params.id}`,
        first: `/api/livestock/${params.id}/breeding-records?page=1&limit=${limit}`,
        last: `/api/livestock/${params.id}/breeding-records?page=${Math.ceil(total / limit)}&limit=${limit}`,
        next: page < Math.ceil(total / limit) ? `/api/livestock/${params.id}/breeding-records?page=${page + 1}&limit=${limit}` : null,
        prev: page > 1 ? `/api/livestock/${params.id}/breeding-records?page=${page - 1}&limit=${limit}` : null,
      }
    });
  } catch (error) {
    console.error('Failed to fetch breeding records:', error);
    return NextResponse.json(
      { error: 'Failed to fetch breeding records', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/livestock/[id]/breeding-records
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify animal exists
    const animal = await prisma.animal.findUnique({
      where: { id: params.id },
      select: { id: true }
    });

    if (!animal) {
      return NextResponse.json(
        { error: 'Animal not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validatedData = breedingRecordSchema.parse(body);

    const record = await prisma.breedingRecord.create({
      data: {
        ...validatedData,
        animalId: params.id
      }
    });

    return NextResponse.json({
      message: 'Breeding record created successfully',
      record,
      _links: {
        self: `/api/livestock/${params.id}/breeding-records/${record.id}`,
        collection: `/api/livestock/${params.id}/breeding-records`,
        animal: `/api/livestock/${params.id}`
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create breeding record:', error);
    
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
      { error: 'Failed to create breeding record', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 