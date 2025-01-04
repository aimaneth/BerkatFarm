import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getActivities, getLivestock, getTasks } from '@/lib/db';
import { WithId, Document } from 'mongodb';

interface Task extends WithId<Document> {
  title: string;
  description?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Activity extends WithId<Document> {
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

async function getLivestockGroups() {
  const livestock = await getLivestock();
  const result = await livestock.aggregate([
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 }
      }
    }
  ]).toArray();
  
  return result.map(item => ({
    type: item._id,
    _count: {
      id: item.count
    }
  }));
}

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

    // Get collection instances
    const [livestockColl, tasksColl, activitiesColl] = await Promise.all([
      getLivestock(),
      getTasks(),
      getActivities()
    ]);

    // Fetch common data
    const [
      totalLivestock,
      tasks,
      recentActivities
    ] = await Promise.all([
      livestockColl.countDocuments(),
      tasksColl.find<Task>({
        assignedTo: session.user.id
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray(),
      activitiesColl.find<Activity>({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray()
    ]);

    // Calculate task statistics
    const completedTasks = tasks.filter(task => task.status === 'COMPLETED').length;
    const pendingTasks = tasks.filter(task => task.status === 'PENDING').length;

    // Get livestock categories
    const livestockByCategory = await getLivestockGroups();

    // Mock revenue data (replace with actual data in production)
    const revenueData = [
      { name: 'Jan', value: 4000 },
      { name: 'Feb', value: 3000 },
      { name: 'Mar', value: 2000 },
      { name: 'Apr', value: 2780 },
      { name: 'May', value: 1890 },
      { name: 'Jun', value: 2390 }
    ];

    const livestockData = livestockByCategory.map(item => ({
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
      recentActivities: recentActivities.map(activity => ({
        id: activity._id.toString(),
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