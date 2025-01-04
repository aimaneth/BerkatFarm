import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getLivestock } from '@/lib/db';

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

    const livestock = await getLivestock();

    // Get livestock statistics
    const [totalCount, categoryStats] = await Promise.all([
      livestock.countDocuments(),
      livestock.aggregate([
        {
          $group: {
            _id: "$type",
            count: { $sum: 1 }
          }
        }
      ]).toArray()
    ]);

    const stats = {
      total: totalCount,
      byCategory: categoryStats.map(item => ({
        name: item._id,
        value: item.count
      })),
      _links: {
        self: '/api/stats/livestock',
        livestock: '/api/livestock'
      }
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Failed to fetch livestock stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch livestock statistics' },
      { status: 500 }
    );
  }
} 