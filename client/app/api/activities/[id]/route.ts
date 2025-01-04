import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getActivities, toObjectId } from '@/lib/db';
import { z } from 'zod';

// Update validation schema
const updateSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
  assignedTo: z.string().min(1, 'Assigned user is required').optional(),
  category: z.string().min(1, 'Category is required').optional(),
  priority: z.enum(['HIGH', 'MEDIUM', 'LOW']).optional(),
  dueDate: z.string().min(1, 'Due date is required').optional(),
  tags: z.array(z.string()).optional(),
  attachments: z.array(z.string()).optional()
});

// GET /api/activities/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const activities = await getActivities();
    const activity = await activities.findOne({ _id: toObjectId(params.id) });

    if (!activity) {
      return NextResponse.json(
        { error: 'Activity not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...activity,
      _links: {
        self: `/api/activities/${params.id}`,
        collection: '/api/activities'
      }
    });
  } catch (error) {
    console.error('Failed to fetch activity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activity' },
      { status: 500 }
    );
  }
}

// PUT /api/activities/[id]
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
    
    const activities = await getActivities();

    // Update activity
    const result = await activities.findOneAndUpdate(
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
        { error: 'Activity not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Activity updated successfully',
      activity: result.value,
      _links: {
        self: `/api/activities/${params.id}`,
        collection: '/api/activities'
      }
    });
  } catch (error) {
    console.error('Failed to update activity:', error);
    
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
      { error: 'Failed to update activity' },
      { status: 500 }
    );
  }
}

// DELETE /api/activities/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const activities = await getActivities();
    const result = await activities.deleteOne({ _id: toObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Activity not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Activity deleted successfully',
      _links: {
        collection: '/api/activities'
      }
    });
  } catch (error) {
    console.error('Failed to delete activity:', error);
    return NextResponse.json(
      { error: 'Failed to delete activity' },
      { status: 500 }
    );
  }
} 