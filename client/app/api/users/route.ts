import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { UserRole } from '@/shared/types/auth';
import { getUsers } from '@/lib/db';
import { WithId, Document } from 'mongodb';
import { writeFile } from 'fs/promises';
import { join } from 'path';

interface User extends WithId<Document> {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: 'ACTIVE' | 'INACTIVE';
  avatar?: string;
  department?: string;
  shift?: string;
  phone?: string;
  specializations?: string[];
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Input validation schema
const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['ADMIN', 'MANAGER', 'ACCOUNTANT', 'SUPERVISOR', 'STAFF', 'VETERINARIAN']).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  department: z.string().optional(),
  shift: z.enum(['Morning', 'Afternoon', 'Night']).optional(),
  phone: z.string().optional(),
  specializations: z.string().optional(),
  location: z.string().optional(),
});

// GET /api/users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const role = searchParams.get('role');
    const status = searchParams.get('status');

    const users = await getUsers();
    
    // Build query
    const query: Partial<User> = {};
    if (role) query.role = role as UserRole;
    if (status) query.status = status as 'ACTIVE' | 'INACTIVE';

    // Get total count for pagination
    const total = await users.countDocuments(query);

    // Get paginated results
    const items = await users.find<User>(query, {
      projection: { password: 0 }, // Exclude password
      skip: (page - 1) * limit,
      limit: limit
    }).toArray();

    return NextResponse.json({
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      _links: {
        self: `/api/users?page=${page}&limit=${limit}`,
        first: `/api/users?page=1&limit=${limit}`,
        last: `/api/users?page=${Math.ceil(total / limit)}&limit=${limit}`,
        next: page < Math.ceil(total / limit) ? `/api/users?page=${page + 1}&limit=${limit}` : null,
        prev: page > 1 ? `/api/users?page=${page - 1}&limit=${limit}` : null,
      }
    });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/users
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const avatarFile = formData.get('avatar') as File | null;
    
    // Convert form data to object for validation
    const formDataObj = Object.fromEntries(formData.entries());
    delete formDataObj.avatar; // Remove avatar from validation object
    
    // Validate input
    const validatedData = userSchema.parse(formDataObj);
    
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
    
    // Handle avatar upload
    let avatarPath: string | undefined;
    if (avatarFile) {
      const bytes = await avatarFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Create unique filename
      const filename = `${Date.now()}-${avatarFile.name}`;
      const uploadDir = join(process.cwd(), 'public', 'uploads', 'avatars');
      const filePath = join(uploadDir, filename);
      
      await writeFile(filePath, buffer);
      avatarPath = `/uploads/avatars/${filename}`;
    }
    
    // Hash password
    const hashedPassword = await hash(validatedData.password, 12);

    // Check if this is the first user (make them admin)
    const userCount = await users.countDocuments();
    const role = validatedData.role || (userCount === 0 ? 'ADMIN' : 'STAFF');
    
    // Create user
    const result = await users.insertOne({
      name: validatedData.name,
      email: validatedData.email.toLowerCase(),
      password: hashedPassword,
      role,
      status: validatedData.status || 'ACTIVE',
      avatar: avatarPath,
      department: validatedData.department,
      shift: validatedData.shift,
      phone: validatedData.phone,
      specializations: validatedData.specializations ? validatedData.specializations.split(',').map(s => s.trim()) : undefined,
      location: validatedData.location,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    if (!result.acknowledged) {
      throw new Error('Failed to create user account');
    }

    // Get the created user without password
    const createdUser = await users.findOne(
      { _id: result.insertedId },
      { projection: { password: 0 } }
    );
    
    return NextResponse.json(
      {
        message: 'User created successfully',
        user: createdUser,
        _links: {
          self: `/api/users/${result.insertedId}`,
          collection: '/api/users'
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('User creation error:', error);
    
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

    const errorMessage = error instanceof Error ? error.message : 'Failed to create user';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 