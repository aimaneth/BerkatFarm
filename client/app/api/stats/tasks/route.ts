import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getTasks } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const tasks = await getTasks();

    // Get tasks statistics
    const [totalCount, statusStats] = await Promise.all([
      tasks.countDocuments(),
      tasks.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 }
          }
        }
      ]).toArray()
    ]);

    // Get user's tasks
    const userTasks = await tasks.find({
      assignedTo: session.user.id
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .toArray();

    const stats = {
      total: totalCount,
      byStatus: statusStats.map(item => ({
        status: item._id,
        count: item.count
      })),
      recentTasks: userTasks.map(task => ({
        id: task._id.toString(),
        title: task.title,
        status: task.status,
        createdAt: task.createdAt
      })),
      _links: {
        self: '/api/stats/tasks',
        tasks: '/api/tasks',
        userTasks: `/api/tasks?assignedTo=${session.user.id}`
      }
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Failed to fetch task stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch task statistics' },
      { status: 500 }
    );
  }
} 