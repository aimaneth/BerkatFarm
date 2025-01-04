import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getTransactions } from '@/lib/db';

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

    const transactions = await getTransactions();

    // Get last 6 months of revenue
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const monthlyRevenue = await transactions.aggregate([
      {
        $match: {
          type: 'INCOME',
          month: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$month" },
            month: { $month: "$month" }
          },
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]).toArray();

    // Format the data
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const stats = {
      monthly: monthlyRevenue.map(item => ({
        name: monthNames[item._id.month - 1],
        value: item.total,
        year: item._id.year
      })),
      _links: {
        self: '/api/stats/revenue',
        transactions: '/api/transactions'
      }
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Failed to fetch revenue stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch revenue statistics' },
      { status: 500 }
    );
  }
} 