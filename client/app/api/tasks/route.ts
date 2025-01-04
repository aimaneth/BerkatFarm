import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getTasks } from '@/lib/db';
import { z } from 'zod';

// Input validation schema
const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  dueDate: z.date(),
  assignedTo: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(),
  attachments: z.array(z.string()).optional()
});

// GET /api/tasks
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const assignedTo = searchParams.get('assignedTo');
    const category = searchParams.get('category');

    const tasks = await getTasks();
    
    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (assignedTo) query.assignedTo = assignedTo;
    if (category) query.category = category;

    // Get total count for pagination
    const total = await tasks.countDocuments(query);

    // Get paginated results
    const items = await tasks.find(query)
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
        self: `/api/tasks?page=${page}&limit=${limit}`,
        first: `/api/tasks?page=1&limit=${limit}`,
        last: `/api/tasks?page=${Math.ceil(total / limit)}&limit=${limit}`,
        next: page < Math.ceil(total / limit) ? `/api/tasks?page=${page + 1}&limit=${limit}` : null,
        prev: page > 1 ? `/api/tasks?page=${page - 1}&limit=${limit}` : null,
        stats: '/api/stats/tasks'
      }
    });
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = taskSchema.parse(body);
    
    const tasks = await getTasks();

    // Create task
    const result = await tasks.insertOne({
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: session.user.id
    });

    if (!result.acknowledged) {
      throw new Error('Failed to create task');
    }

    const created = await tasks.findOne({ _id: result.insertedId });

    return NextResponse.json({
      message: 'Task created successfully',
      task: created,
      _links: {
        self: `/api/tasks/${result.insertedId}`,
        collection: '/api/tasks'
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Task creation error:', error);
    
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
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
} 