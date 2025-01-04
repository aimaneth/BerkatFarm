import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getLivestock, toObjectId } from '@/lib/db';
import { z } from 'zod';

// Input validation schema
const livestockSchema = z.object({
  tag: z.string().min(1, 'Tag is required'),
  type: z.string().min(1, 'Type is required'),
  breed: z.string().min(1, 'Breed is required'),
  status: z.enum(['HEALTHY', 'SICK', 'QUARANTINED', 'DECEASED']),
  age: z.number().min(0, 'Age must be positive'),
  weight: z.number().min(0, 'Weight must be positive'),
  location: z.string().min(1, 'Location is required'),
  lastCheckup: z.date().optional(),
  nextCheckup: z.date().optional(),
  purchaseDate: z.date(),
  purchasePrice: z.number().min(0, 'Purchase price must be positive'),
  notes: z.string().optional()
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
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    const livestock = await getLivestock();
    
    // Build query
    const query: any = {};
    if (type) query.type = type;
    if (status) query.status = status;

    // Get total count for pagination
    const total = await livestock.countDocuments(query);

    // Get paginated results
    const items = await livestock.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      items,
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
        stats: '/api/stats/livestock'
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

// POST /api/livestock
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = livestockSchema.parse(body);
    
    const livestock = await getLivestock();
    
    // Check if tag already exists
    const existingLivestock = await livestock.findOne({ tag: validatedData.tag });
    if (existingLivestock) {
      return NextResponse.json(
        { error: 'A livestock with this tag already exists' },
        { status: 409 }
      );
    }

    // Create livestock
    const result = await livestock.insertOne({
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: session.user.id
    });

    if (!result.acknowledged) {
      throw new Error('Failed to create livestock');
    }

    const created = await livestock.findOne({ _id: result.insertedId });

    return NextResponse.json({
      message: 'Livestock created successfully',
      livestock: created,
      _links: {
        self: `/api/livestock/${result.insertedId}`,
        collection: '/api/livestock'
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Livestock creation error:', error);
    
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
      { error: 'Failed to create livestock' },
      { status: 500 }
    );
  }
}

// PUT /api/livestock/[id]
export async function PUT(request: Request) {
  try {
    const id = request.url.split('/').pop();
    if (!id) throw new Error('No ID provided');

    const data = await request.json();
    const collection = await getLivestock();

    const result = await collection.findOneAndUpdate(
      { _id: toObjectId(id) },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    if (!result || !result.value) {
      return NextResponse.json(
        { error: 'Livestock not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.value);
  } catch (error) {
    console.error('Failed to update livestock:', error);
    return NextResponse.json(
      { error: 'Failed to update livestock' },
      { status: 500 }
    );
  }
}

// DELETE /api/livestock/[id]
export async function DELETE(request: Request) {
  try {
    const id = request.url.split('/').pop();
    if (!id) throw new Error('No ID provided');

    const collection = await getLivestock();

    const result = await collection.findOneAndDelete({
      _id: toObjectId(id),
    });

    if (!result || !result.value) {
      return NextResponse.json(
        { error: 'Livestock not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete livestock:', error);
    return NextResponse.json(
      { error: 'Failed to delete livestock' },
      { status: 500 }
    );
  }
} 