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

// GET /api/livestock
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filters: any = {};

    // Parse filters from query parameters
    if (searchParams.has('type')) filters.type = searchParams.get('type');
    if (searchParams.has('status')) filters.status = searchParams.get('status');
    if (searchParams.has('location')) filters.location = searchParams.get('location');

    const db = await connectToDatabase();
    const collection = db.collection('livestock');
    const livestock = await collection.find(filters).toArray();

    return NextResponse.json(livestock);
  } catch (error) {
    console.error('Failed to fetch livestock:', error);
    return NextResponse.json(
      { error: 'Failed to fetch livestock' },
      { status: 500 }
    );
  }
}

// POST /api/livestock
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const db = await connectToDatabase();
    const collection = db.collection('livestock');

    const result = await collection.insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      id: result.insertedId,
      ...data,
    });
  } catch (error) {
    console.error('Failed to create livestock:', error);
    return NextResponse.json(
      { error: 'Failed to create livestock' },
      { status: 500 }
    );
  }
}

// PUT /api/livestock/[id]
export async function PUT(request: Request) {
  try {
    const id = request.url.split('/').pop();
    const data = await request.json();
    const db = await connectToDatabase();
    const collection = db.collection('livestock');

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Livestock not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to update livestock:', error);
    return NextResponse.json(
      { error: 'Failed to update livestock' },
      { status: 500 }
    );
  }
}

// DELETE /api/livestock/[id]
export async function DELETE(request: Request) {
  try {
    const id = request.url.split('/').pop();
    const db = await connectToDatabase();
    const collection = db.collection('livestock');

    const result = await collection.findOneAndDelete({
      _id: new ObjectId(id),
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Livestock not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete livestock:', error);
    return NextResponse.json(
      { error: 'Failed to delete livestock' },
      { status: 500 }
    );
  }
} 