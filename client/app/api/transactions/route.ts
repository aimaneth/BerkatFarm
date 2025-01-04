import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getTransactions } from '@/lib/db';
import { z } from 'zod';

// Input validation schema
const transactionSchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE']),
  category: z.string().min(1, 'Category is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  description: z.string().optional(),
  date: z.date(),
  paymentMethod: z.enum(['CASH', 'BANK_TRANSFER', 'CREDIT_CARD', 'DEBIT_CARD', 'CHECK', 'OTHER']),
  reference: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional()
});

// GET /api/transactions
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
    const category = searchParams.get('category');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const transactions = await getTransactions();
    
    // Build query
    const query: any = {};
    if (type) query.type = type;
    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Get total count for pagination
    const total = await transactions.countDocuments(query);

    // Get paginated results
    const items = await transactions.find(query)
      .sort({ date: -1, createdAt: -1 })
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
        self: `/api/transactions?page=${page}&limit=${limit}`,
        first: `/api/transactions?page=1&limit=${limit}`,
        last: `/api/transactions?page=${Math.ceil(total / limit)}&limit=${limit}`,
        next: page < Math.ceil(total / limit) ? `/api/transactions?page=${page + 1}&limit=${limit}` : null,
        prev: page > 1 ? `/api/transactions?page=${page - 1}&limit=${limit}` : null,
        stats: '/api/stats/revenue'
      }
    });
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

// POST /api/transactions
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = transactionSchema.parse(body);
    
    const transactions = await getTransactions();

    // Create transaction
    const result = await transactions.insertOne({
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: session.user.id
    });

    if (!result.acknowledged) {
      throw new Error('Failed to create transaction');
    }

    const created = await transactions.findOne({ _id: result.insertedId });

    return NextResponse.json({
      message: 'Transaction created successfully',
      transaction: created,
      _links: {
        self: `/api/transactions/${result.insertedId}`,
        collection: '/api/transactions'
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Transaction creation error:', error);
    
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
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
} 