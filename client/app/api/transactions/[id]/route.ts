import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getTransactions, toObjectId } from '@/lib/db';
import { z } from 'zod';

// Update validation schema
const updateSchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE']).optional(),
  category: z.string().min(1, 'Category is required').optional(),
  amount: z.number().min(0, 'Amount must be positive').optional(),
  description: z.string().optional(),
  date: z.date().optional(),
  paymentMethod: z.enum(['CASH', 'BANK_TRANSFER', 'CREDIT_CARD', 'DEBIT_CARD', 'CHECK', 'OTHER']).optional(),
  reference: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional()
});

// GET /api/transactions/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const transactions = await getTransactions();
    const transaction = await transactions.findOne({ _id: toObjectId(params.id) });

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...transaction,
      _links: {
        self: `/api/transactions/${params.id}`,
        collection: '/api/transactions'
      }
    });
  } catch (error) {
    console.error('Failed to fetch transaction:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transaction' },
      { status: 500 }
    );
  }
}

// PUT /api/transactions/[id]
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
    
    const transactions = await getTransactions();

    // Update transaction
    const result = await transactions.findOneAndUpdate(
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
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Transaction updated successfully',
      transaction: result.value,
      _links: {
        self: `/api/transactions/${params.id}`,
        collection: '/api/transactions'
      }
    });
  } catch (error) {
    console.error('Failed to update transaction:', error);
    
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
      { error: 'Failed to update transaction' },
      { status: 500 }
    );
  }
}

// DELETE /api/transactions/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const transactions = await getTransactions();
    const result = await transactions.findOneAndDelete({ _id: toObjectId(params.id) });

    if (!result || !result.value) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Transaction deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to delete transaction:', error);
    return NextResponse.json(
      { error: 'Failed to delete transaction' },
      { status: 500 }
    );
  }
} 