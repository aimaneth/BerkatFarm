import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { UserRole } from '@/shared/types/auth';
import { getUsers } from '@/lib/db';

// Input validation schema
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate input
    const validatedData = registerSchema.parse(body);
    
    const users = await getUsers();
    
    // Check if user already exists
    const existingUser = await users.findOne({ 
      email: validatedData.email.toLowerCase() 
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await hash(validatedData.password, 12);

    // Check if this is the first user (make them admin)
    const userCount = await users.countDocuments();
    const role: UserRole = userCount === 0 ? 'ADMIN' : 'STAFF';
    
    // Create user
    const result = await users.insertOne({
      name: validatedData.name,
      email: validatedData.email.toLowerCase(),
      password: hashedPassword,
      role,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    if (!result.acknowledged) {
      throw new Error('Failed to create user account');
    }
    
    return NextResponse.json(
      {
        message: 'Registration successful! You can now log in.',
        userId: result.insertedId,
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Registration Error:', error);
    
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

    // More specific error messages
    const errorMessage = error instanceof Error ? error.message : 'Registration failed';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 