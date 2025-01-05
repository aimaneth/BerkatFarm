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

// GET /api/livestock/[id]
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
    const fields = searchParams.get('fields')?.split(',');

    // Build select clause for field selection
    const select = fields ? 
      fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}) :
      undefined;

    const animal = await prisma.animal.findUnique({
      where: { id: params.id },
      select,
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

    if (!animal) {
      return NextResponse.json(
        { error: 'Animal not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
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
    });
  } catch (error) {
    console.error('Failed to fetch animal:', error);
    return NextResponse.json(
      { error: 'Failed to fetch animal', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT /api/livestock/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = animalSchema.parse(body);

    // Check if tag is being changed and if it already exists
    const existingAnimal = await prisma.animal.findFirst({
      where: {
        tag: validatedData.tag,
        NOT: { id: params.id }
      }
    });

    if (existingAnimal) {
      return NextResponse.json(
        { error: 'An animal with this tag already exists' },
        { status: 409 }
      );
    }

    const animal = await prisma.animal.update({
      where: { id: params.id },
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
      message: 'Animal updated successfully',
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
    });
  } catch (error) {
    console.error('Failed to update animal:', error);
    
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
        { error: 'Animal not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update animal', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE /api/livestock/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const animal = await prisma.animal.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      message: 'Animal deleted successfully',
      _links: {
        collection: '/api/livestock'
      }
    });
  } catch (error) {
    console.error('Failed to delete animal:', error);

    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { error: 'Animal not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete animal', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 