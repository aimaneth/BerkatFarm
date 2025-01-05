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

// POST /api/livestock/batch (batch create)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Request body must be an array' },
        { status: 400 }
      );
    }

    if (body.length > 100) {
      return NextResponse.json(
        { error: 'Batch size cannot exceed 100 animals' },
        { status: 400 }
      );
    }

    const validatedData = z.array(animalSchema).parse(body);
    const tags = validatedData.map(animal => animal.tag);

    // Check for duplicate tags in the request
    if (new Set(tags).size !== tags.length) {
      return NextResponse.json(
        { error: 'Duplicate tags found in batch request' },
        { status: 400 }
      );
    }

    // Check for existing tags in database
    const existingTags = await prisma.animal.findMany({
      where: { tag: { in: tags } },
      select: { tag: true },
    });

    if (existingTags.length > 0) {
      return NextResponse.json(
        { 
          error: 'Some tags already exist',
          existingTags: existingTags.map(a => a.tag)
        },
        { status: 409 }
      );
    }

    // Create animals in batch
    const animals = await prisma.$transaction(
      validatedData.map(data => 
        prisma.animal.create({
          data,
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
        })
      )
    );

    return NextResponse.json({
      message: 'Animals created successfully',
      count: animals.length,
      animals,
      _links: {
        collection: '/api/livestock'
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Batch creation error:', error);
    
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
      { error: 'Failed to create animals', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT /api/livestock/batch (batch update)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json(
        { error: 'Request body must be a non-empty array' },
        { status: 400 }
      );
    }

    if (body.length > 100) {
      return NextResponse.json(
        { error: 'Batch size cannot exceed 100 animals' },
        { status: 400 }
      );
    }

    // Each item should have an id and data
    const updateSchema = z.array(z.object({
      id: z.string(),
      data: animalSchema.partial()
    }));

    const updates = updateSchema.parse(body);

    // Update animals in batch
    const animals = await prisma.$transaction(
      updates.map(({ id, data }) => 
        prisma.animal.update({
          where: { id },
          data,
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
        })
      )
    );

    return NextResponse.json({
      message: 'Animals updated successfully',
      count: animals.length,
      animals,
      _links: {
        collection: '/api/livestock'
      }
    });
  } catch (error) {
    console.error('Batch update error:', error);
    
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
        { error: 'One or more animals not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update animals', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE /api/livestock/batch (batch delete)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const schema = z.object({
      ids: z.array(z.string()).min(1, 'At least one ID is required')
    });

    const { ids } = schema.parse(body);

    if (ids.length > 100) {
      return NextResponse.json(
        { error: 'Batch size cannot exceed 100 animals' },
        { status: 400 }
      );
    }

    await prisma.animal.deleteMany({
      where: { id: { in: ids } },
    });

    return NextResponse.json({
      message: 'Animals deleted successfully',
      count: ids.length,
      _links: {
        collection: '/api/livestock'
      }
    });
  } catch (error) {
    console.error('Batch deletion error:', error);

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
      { error: 'Failed to delete animals', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 