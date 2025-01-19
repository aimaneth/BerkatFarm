import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    const users = await getUsers();

    // Update user role
    const result = await users.updateOne(
      { email: params.email },
      { 
        $set: { 
          role: "ADMIN",
          updatedAt: new Date()
        } 
      }
    );

    if (!result.matchedCount) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'User role updated successfully'
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
} 