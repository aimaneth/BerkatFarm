import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUsers } from '@/lib/db';
import { z } from 'zod';

// Input validation schema
const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = registerSchema.parse(body);
    
    const users = await getUsers();

    // Check if user already exists
    const existingUser = await users.findOne({ email: validatedData.email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Check if this is the first user (make them admin)
    const userCount = await users.countDocuments();
    const role = userCount === 0 ? 'ADMIN' : 'STAFF';

    // Create user
    const result = await users.insertOne({
      ...validatedData,
      password: hashedPassword,
      role,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    if (!result.acknowledged) {
      throw new Error('Failed to create user');
    }

    const created = await users.findOne({ _id: result.insertedId });
    if (!created) {
      throw new Error('Failed to fetch created user');
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = created;

    return NextResponse.json({
      message: 'User registered successfully',
      user: userWithoutPassword,
      _links: {
        self: `/api/users/${result.insertedId}`,
        collection: '/api/users'
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    
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
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
} 