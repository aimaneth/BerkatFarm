import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getLivestock, toObjectId } from '@/lib/db';
import { z } from 'zod';

// Update validation schema
const updateSchema = z.object({
  tag: z.string().min(1, 'Tag is required').optional(),
  type: z.string().min(1, 'Type is required').optional(),
  breed: z.string().min(1, 'Breed is required').optional(),
  status: z.enum(['HEALTHY', 'SICK', 'QUARANTINED', 'DECEASED']).optional(),
  age: z.number().min(0, 'Age must be positive').optional(),
  weight: z.number().min(0, 'Weight must be positive').optional(),
  location: z.string().min(1, 'Location is required').optional(),
  lastCheckup: z.date().optional(),
  nextCheckup: z.date().optional(),
  purchaseDate: z.date().optional(),
  purchasePrice: z.number().min(0, 'Purchase price must be positive').optional(),
  notes: z.string().optional()
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

    const livestock = await getLivestock();
    const item = await livestock.findOne({ _id: toObjectId(params.id) });

    if (!item) {
      return NextResponse.json(
        { error: 'Livestock not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...item,
      _links: {
        self: `/api/livestock/${params.id}`,
        collection: '/api/livestock'
      }
    });
  } catch (error) {
    console.error('Failed to fetch livestock:', error);
    return NextResponse.json(
      { error: 'Failed to fetch livestock' },
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
    const validatedData = updateSchema.parse(body);
    
    const livestock = await getLivestock();

    // If tag is being updated, check for duplicates
    if (validatedData.tag) {
      const existingLivestock = await livestock.findOne({
        _id: { $ne: toObjectId(params.id) },
        tag: validatedData.tag
      });

      if (existingLivestock) {
        return NextResponse.json(
          { error: 'Tag already in use' },
          { status: 409 }
        );
      }
    }

    // Update livestock
    const result = await livestock.findOneAndUpdate(
      { _id: toObjectId(params.id) },
      { 
        $set: {
          ...validatedData,
          updatedAt: new Date(),
          updatedBy: session.user.id
        }
      },
      { returnDocument: 'after' }
    );

    if (!result || !result.value) {
      return NextResponse.json(
        { error: 'Livestock not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Livestock updated successfully',
      livestock: result.value,
      _links: {
        self: `/api/livestock/${params.id}`,
        collection: '/api/livestock'
      }
    });
  } catch (error) {
    console.error('Failed to update livestock:', error);
    
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
      { error: 'Failed to update livestock' },
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

    const livestock = await getLivestock();
    const result = await livestock.findOneAndDelete({ _id: toObjectId(params.id) });

    if (!result || !result.value) {
      return NextResponse.json(
        { error: 'Livestock not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Livestock deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to delete livestock:', error);
    return NextResponse.json(
      { error: 'Failed to delete livestock' },
      { status: 500 }
    );
  }
} 