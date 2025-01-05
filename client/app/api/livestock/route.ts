import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const animalSchema = z.object({
  tag: z.string().min(1, 'Tag is required'),
  category: z.string().min(1, 'Category is required'),
  breed: z.string().min(1, 'Breed is required'),
  age: z.string().min(1, 'Age is required'),
  weight: z.string().min(1, 'Weight is required'),
  status: z.string().min(1, 'Status is required'),
  location: z.string().min(1, 'Location is required'),
  reproductiveStatus: z.string().min(1, 'Reproductive status is required'),
  lastCheckup: z.string().transform(str => new Date(str)),
  notes: z.string().optional(),
});

// GET /api/livestock
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    const fields = searchParams.get('fields')?.split(',');

    // Build where clause
    const where: any = {};
    if (category && category !== 'all') where.category = category;
    if (status && status !== 'all') where.status = status;
    if (search) {
      where.OR = [
        { tag: { contains: search, mode: 'insensitive' } },
        { breed: { contains: search, mode: 'insensitive' } },
        { notes: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Build select clause for field selection
    const select = fields ? 
      fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}) :
      undefined;

    // Get total count for pagination
    const total = await prisma.animal.count({ where });

    // Get paginated results with dynamic sorting
    const animals = await prisma.animal.findMany({
      where,
      select,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sort]: order },
      include: !select ? {
        _count: {
          select: {
            healthRecords: true,
            productionRecords: true,
            weightRecords: true,
            movementRecords: true,
            breedingRecords: true,
            feedRecords: true,
          },
        },
      } : undefined,
    });

    return NextResponse.json({
      items: animals,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      _links: {
        self: `/api/livestock?page=${page}&limit=${limit}`,
        first: `/api/livestock?page=1&limit=${limit}`,
        last: `/api/livestock?page=${Math.ceil(total / limit)}&limit=${limit}`,
        next: page < Math.ceil(total / limit) ? `/api/livestock?page=${page + 1}&limit=${limit}` : null,
        prev: page > 1 ? `/api/livestock?page=${page - 1}&limit=${limit}` : null,
        batch: '/api/livestock/batch'
      }
    });
  } catch (error) {
    console.error('Failed to fetch livestock:', error);
    return NextResponse.json(
      { error: 'Failed to fetch livestock', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/livestock
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = animalSchema.parse(body);
    
    // Check if tag already exists
    const existingAnimal = await prisma.animal.findUnique({
      where: { tag: validatedData.tag }
    });

    if (existingAnimal) {
      return NextResponse.json(
        { error: 'An animal with this tag already exists' },
        { status: 409 }
      );
    }

    const animal = await prisma.animal.create({
      data: validatedData,
      include: {
        _count: {
          select: {
            healthRecords: true,
            productionRecords: true,
            weightRecords: true,
            movementRecords: true,
            breedingRecords: true,
            feedRecords: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: 'Animal created successfully',
      animal,
      _links: {
        self: `/api/livestock/${animal.id}`,
        collection: '/api/livestock',
        healthRecords: `/api/livestock/${animal.id}/health-records`,
        breedingRecords: `/api/livestock/${animal.id}/breeding-records`,
        weightRecords: `/api/livestock/${animal.id}/weight-records`,
        movementRecords: `/api/livestock/${animal.id}/movement-records`,
        productionRecords: `/api/livestock/${animal.id}/production-records`,
        feedRecords: `/api/livestock/${animal.id}/feed-records`
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Animal creation error:', error);
    
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
      { error: 'Failed to create animal', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 