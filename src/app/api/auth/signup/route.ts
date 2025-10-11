import { NextRequest, NextResponse } from 'next/server';
import { db, users } from '@/db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength (min 8 chars)
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        name,
      })
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        createdAt: users.createdAt,
      });

    // Send welcome email (don't block the response)
    // If email fails, log it but don't fail the signup
    if (process.env.RESEND_API_KEY) {
      sendWelcomeEmail({
        to: newUser.email,
        firstName: newUser.name.split(' ')[0], // Use first name only
        // verificationUrl: `${process.env.NEXTAUTH_URL}/verify/${token}`, // TODO: Add email verification
      }).catch((error) => {
        console.error('Failed to send welcome email:', error);
        // Don't fail the signup if email fails
      });
    } else {
      console.warn('⚠️ RESEND_API_KEY not set. Welcome email not sent.');
    }

    // Return success (without password)
    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create account',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    message: 'User signup endpoint',
    method: 'POST',
    requiredFields: ['email', 'password', 'name'],
    example: {
      email: 'student@example.com',
      password: 'securepassword123',
      name: 'John Doe',
    },
  });
}
