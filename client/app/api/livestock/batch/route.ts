import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri as string);
const dbName = 'berkat-farm';

async function connectToDatabase() {
  try {
    await client.connect();
    return client.db(dbName);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Database connection failed');
  }
}

// POST /api/livestock/batch (Batch Create)
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const db = await connectToDatabase();
    const collection = db.collection('livestock');

    // Add timestamps to each record
    const recordsWithTimestamps = data.map((record: any) => ({
      ...record,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const result = await collection.insertMany(recordsWithTimestamps);

    return NextResponse.json({
      success: true,
      insertedCount: result.insertedCount,
      insertedIds: result.insertedIds,
    });
  } catch (error) {
    console.error('Failed to batch create livestock:', error);
    return NextResponse.json(
      { error: 'Failed to batch create livestock' },
      { status: 500 }
    );
  }
}

// PUT /api/livestock/batch (Batch Update)
export async function PUT(request: Request) {
  try {
    const { updates } = await request.json();
    const db = await connectToDatabase();
    const collection = db.collection('livestock');

    const operations = updates.map((update: any) => ({
      updateOne: {
        filter: { _id: new ObjectId(update.id) },
        update: {
          $set: {
            ...update.updates,
            updatedAt: new Date(),
          },
        },
      },
    }));

    const result = await collection.bulkWrite(operations);

    return NextResponse.json({
      success: true,
      modifiedCount: result.modifiedCount,
      matchedCount: result.matchedCount,
    });
  } catch (error) {
    console.error('Failed to batch update livestock:', error);
    return NextResponse.json(
      { error: 'Failed to batch update livestock' },
      { status: 500 }
    );
  }
}

// DELETE /api/livestock/batch (Batch Delete)
export async function DELETE(request: Request) {
  try {
    const { ids } = await request.json();
    const db = await connectToDatabase();
    const collection = db.collection('livestock');

    const objectIds = ids.map((id: string) => new ObjectId(id));
    const result = await collection.deleteMany({
      _id: { $in: objectIds },
    });

    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Failed to batch delete livestock:', error);
    return NextResponse.json(
      { error: 'Failed to batch delete livestock' },
      { status: 500 }
    );
  }
} 