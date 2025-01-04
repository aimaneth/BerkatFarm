import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

type DashboardResponse = {
  charts: {
    livestock: Array<{
      name: string;
      value: number;
    }>;
    tasks: {
      total: number;
      completed: number;
      pending: number;
    };
    revenue: Array<{
      name: string;
      value: number;
    }>;
  };
  recentActivities: Array<{
    id: string;
    type: string;
    description: string;
    createdAt: Date;
  }>;
};

type LivestockCategory = {
  type: string;
  _count: {
    id: number;
  };
};

export async function GET(
  request: NextRequest,
  { params }: { params: { role: string } }
): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { role } = params;

    // Fetch common data
    const [
      totalLivestock,
      tasks,
      recentActivities
    ] = await Promise.all([
      prisma.livestock.count(),
      prisma.task.findMany({
        where: {
          assignedTo: session.user.id
        },
        take: 5,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.activity.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc'
        }
      })
    ]) as [number, Task[], Activity[]];

    // Calculate task statistics
    const completedTasks = tasks.filter((task: Task) => task.status === 'COMPLETED').length;
    const pendingTasks = tasks.filter((task: Task) => task.status === 'PENDING').length;

    // Get livestock categories
    const livestockByCategory = await prisma.livestock.groupBy({
      by: ['type'],
      _count: {
        id: true
      }
    }) as LivestockCategory[];

    // Mock revenue data (replace with actual data in production)
    const revenueData = [
      { name: 'Jan', value: 4000 },
      { name: 'Feb', value: 3000 },
      { name: 'Mar', value: 2000 },
      { name: 'Apr', value: 2780 },
      { name: 'May', value: 1890 },
      { name: 'Jun', value: 2390 }
    ];

    const livestockData = livestockByCategory.map((item: LivestockCategory) => ({
      name: item.type,
      value: item._count.id
    }));

    const dashboardData: DashboardResponse = {
      charts: {
        livestock: livestockData,
        tasks: {
          total: tasks.length,
          completed: completedTasks,
          pending: pendingTasks
        },
        revenue: revenueData
      },
      recentActivities: recentActivities.map((activity: Activity) => ({
        id: activity.id,
        type: activity.type,
        description: activity.description,
        createdAt: activity.createdAt
      }))
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 