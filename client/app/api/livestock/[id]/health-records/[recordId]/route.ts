import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const healthRecordSchema = z.object({
  date: z.string().transform(str => new Date(str)),
  type: z.string().min(1, 'Type is required'),
  description: z.string().min(1, 'Description is required'),
  treatment: z.string().optional(),
  notes: z.string().optional(),
});

// GET /api/livestock/[id]/health-records/[recordId]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; recordId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const record = await prisma.healthRecord.findUnique({
      where: { 
        id: params.recordId,
        animalId: params.id
      }
    });

    if (!record) {
      return NextResponse.json(
        { error: 'Health record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      record,
      _links: {
        self: `/api/livestock/${params.id}/health-records/${record.id}`,
        collection: `/api/livestock/${params.id}/health-records`,
        animal: `/api/livestock/${params.id}`
      }
    });
  } catch (error) {
    console.error('Failed to fetch health record:', error);
    return NextResponse.json(
      { error: 'Failed to fetch health record', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT /api/livestock/[id]/health-records/[recordId]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; recordId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify record exists and belongs to the animal
    const existingRecord = await prisma.healthRecord.findUnique({
      where: { 
        id: params.recordId,
        animalId: params.id
      }
    });

    if (!existingRecord) {
      return NextResponse.json(
        { error: 'Health record not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validatedData = healthRecordSchema.parse(body);

    const record = await prisma.healthRecord.update({
      where: { id: params.recordId },
      data: validatedData
    });

    return NextResponse.json({
      message: 'Health record updated successfully',
      record,
      _links: {
        self: `/api/livestock/${params.id}/health-records/${record.id}`,
        collection: `/api/livestock/${params.id}/health-records`,
        animal: `/api/livestock/${params.id}`
      }
    });
  } catch (error) {
    console.error('Failed to update health record:', error);
    
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
      { error: 'Failed to update health record', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE /api/livestock/[id]/health-records/[recordId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; recordId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify record exists and belongs to the animal
    const existingRecord = await prisma.healthRecord.findUnique({
      where: { 
        id: params.recordId,
        animalId: params.id
      }
    });

    if (!existingRecord) {
      return NextResponse.json(
        { error: 'Health record not found' },
        { status: 404 }
      );
    }

    await prisma.healthRecord.delete({
      where: { id: params.recordId }
    });

    return NextResponse.json({
      message: 'Health record deleted successfully',
      _links: {
        collection: `/api/livestock/${params.id}/health-records`,
        animal: `/api/livestock/${params.id}`
      }
    });
  } catch (error) {
    console.error('Failed to delete health record:', error);
    return NextResponse.json(
      { error: 'Failed to delete health record', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 