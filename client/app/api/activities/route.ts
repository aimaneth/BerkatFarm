import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getActivities } from '@/lib/db';
import { z } from 'zod';

// Input validation schema
const activitySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
  assignedTo: z.string().min(1, 'Assigned user is required'),
  category: z.string().min(1, 'Category is required'),
  priority: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  dueDate: z.string().min(1, 'Due date is required'),
  tags: z.array(z.string()).optional(),
  attachments: z.array(z.string()).optional()
});

// GET /api/activities
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const priority = searchParams.get('priority');
    const assignedTo = searchParams.get('assignedTo');

    const activities = await getActivities();
    
    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (priority) query.priority = priority;
    if (assignedTo) query.assignedTo = assignedTo;

    // Get total count for pagination
    const total = await activities.countDocuments(query);

    // Get paginated results
    const items = await activities.find(query, {
      skip: (page - 1) * limit,
      limit: limit,
      sort: { createdAt: -1 }
    }).toArray();

    return NextResponse.json({
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      _links: {
        self: `/api/activities?page=${page}&limit=${limit}`,
        first: `/api/activities?page=1&limit=${limit}`,
        last: `/api/activities?page=${Math.ceil(total / limit)}&limit=${limit}`,
        next: page < Math.ceil(total / limit) ? `/api/activities?page=${page + 1}&limit=${limit}` : null,
        prev: page > 1 ? `/api/activities?page=${page - 1}&limit=${limit}` : null,
      }
    });
  } catch (error) {
    console.error('Failed to fetch activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

// POST /api/activities
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = activitySchema.parse(body);
    
    const activities = await getActivities();
    
    // Create activity
    const result = await activities.insertOne({
      ...validatedData,
      createdBy: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    if (!result.acknowledged) {
      throw new Error('Failed to create activity');
    }

    const created = await activities.findOne({ _id: result.insertedId });

    return NextResponse.json({
      message: 'Activity created successfully',
      activity: created,
      _links: {
        self: `/api/activities/${result.insertedId}`,
        collection: '/api/activities'
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create activity:', error);
    
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
      { error: 'Failed to create activity' },
      { status: 500 }
    );
  }
} 