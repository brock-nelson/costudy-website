import { NextRequest, NextResponse } from 'next/server';
import { db, users } from '@/db';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/email-service';
import { passwordResetTokens } from '@/lib/password-reset-tokens';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user by email
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    // Always return success even if user doesn't exist (security best practice)
    // This prevents email enumeration attacks
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'If an account with that email exists, we sent a password reset link',
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 3600000; // 1 hour

    // Store token
    passwordResetTokens.set(resetToken, {
      userId: user.id,
      expires,
    });

    // Build reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

    // Send reset email
    if (process.env.SENDGRID_API_KEY) {
      const result = await sendPasswordResetEmail({
        to: user.email,
        firstName: user.name.split(' ')[0],
        resetUrl,
      });

      if (!result.success) {
        console.error('Failed to send password reset email:', result.error);
        return NextResponse.json(
          { error: 'Failed to send password reset email' },
          { status: 500 }
        );
      }
    } else {
      console.warn('⚠️ SENDGRID_API_KEY not set. Password reset email not sent.');
      // In development, log the reset URL
      console.log('Password reset URL:', resetUrl);
    }

    return NextResponse.json({
      success: true,
      message: 'If an account with that email exists, we sent a password reset link',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process password reset request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

