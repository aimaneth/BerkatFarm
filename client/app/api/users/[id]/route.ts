import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { UserRole } from '@/shared/types/auth';
import { getUsers, toObjectId } from '@/lib/db';
import { hash } from 'bcryptjs';
import { WithId, Document } from 'mongodb';

interface User extends WithId<Document> {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}

// Update validation schema (no password required)
const updateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  role: z.enum(['ADMIN', 'MANAGER', 'ACCOUNTANT', 'SUPERVISOR', 'STAFF', 'VETERINARIAN']).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

// GET /api/users/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const users = await getUsers();
    const user = await users.findOne(
      { _id: toObjectId(params.id) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...user,
      _links: {
        self: `/api/users/${params.id}`,
        collection: '/api/users'
      }
    });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = updateSchema.parse(body);
    
    const users = await getUsers();

    // If email is being updated, check for duplicates
    if (validatedData.email) {
      const existingUser = await users.findOne({
        _id: { $ne: toObjectId(params.id) },
        email: validatedData.email.toLowerCase()
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 409 }
        );
      }
    }

    // Prepare update data
    const updateData: Partial<User> = {
      ...validatedData,
      updatedAt: new Date()
    };

    // Hash new password if provided
    if (validatedData.password) {
      updateData.password = await hash(validatedData.password, 12);
    }

    // Update user
    const result = await users.findOneAndUpdate(
      { _id: toObjectId(params.id) },
      { $set: updateData },
      { 
        returnDocument: 'after',
        projection: { password: 0 }
      }
    );

    if (!result || !result.value) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'User updated successfully',
      user: result.value,
      _links: {
        self: `/api/users/${params.id}`,
        collection: '/api/users'
      }
    });
  } catch (error) {
    console.error('Failed to update user:', error);
    
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
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const users = await getUsers();

    // Instead of actually deleting, set status to INACTIVE
    const result = await users.findOneAndUpdate(
      { _id: toObjectId(params.id) },
      { 
        $set: { 
          status: 'INACTIVE',
          updatedAt: new Date()
        } 
      }
    );

    if (!result || !result.value) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'User deactivated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to delete user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
} 