import { NextRequest, NextResponse } from 'next/server';
import {
  sendWelcomeEmail,
  sendStudyGroupInvite,
  sendSessionReminder,
  sendPasswordResetEmail,
} from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, type = 'welcome' } = body;

    if (!to) {
      return NextResponse.json(
        { error: 'Email address (to) is required' },
        { status: 400 }
      );
    }

    if (!process.env.SENDGRID_API_KEY) {
      return NextResponse.json(
        {
          error: 'SENDGRID_API_KEY not configured',
          help: 'Add SENDGRID_API_KEY to your .env.local file'
        },
        { status: 500 }
      );
    }

    let result;

    switch (type) {
      case 'welcome':
        result = await sendWelcomeEmail({
          to,
          firstName: 'Test User',
          verificationUrl: 'https://costudy.co/verify/test-token-123',
        });
        break;

      case 'invite':
        result = await sendStudyGroupInvite({
          to,
          recipientName: 'Test Student',
          inviterName: 'Sarah Chen',
          groupName: 'CS 101 Study Group',
          className: 'Introduction to Computer Science',
          nextSessionDate: 'Friday, January 15 at 3:00 PM',
          acceptUrl: 'https://costudy.co/groups/test-123/accept',
        });
        break;

      case 'reminder':
        result = await sendSessionReminder({
          to,
          studentName: 'Test Student',
          groupName: 'CS 101 Study Group',
          sessionDate: 'Tomorrow, January 15',
          sessionTime: '3:00 PM',
          location: 'Library Room 204',
          joinUrl: 'https://costudy.co/sessions/test-456',
        });
        break;

      case 'reset':
        result = await sendPasswordResetEmail({
          to,
          firstName: 'Test User',
          resetUrl: 'https://costudy.co/reset-password/test-token-789',
        });
        break;

      default:
        return NextResponse.json(
          {
            error: 'Invalid email type',
            validTypes: ['welcome', 'invite', 'reminder', 'reset']
          },
          { status: 400 }
        );
    }

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Failed to send email',
          details: result.error
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${type} email sent successfully to ${to}`,
    });

  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Email testing endpoint',
    usage: 'POST with { "to": "email@example.com", "type": "welcome|invite|reminder|reset" }',
    examples: [
      {
        description: 'Send welcome email',
        method: 'POST',
        body: { to: 'test@example.com', type: 'welcome' }
      },
      {
        description: 'Send study group invite',
        method: 'POST',
        body: { to: 'test@example.com', type: 'invite' }
      },
      {
        description: 'Send session reminder',
        method: 'POST',
        body: { to: 'test@example.com', type: 'reminder' }
      },
      {
        description: 'Send password reset',
        method: 'POST',
        body: { to: 'test@example.com', type: 'reset' }
      },
    ],
    configured: !!process.env.SENDGRID_API_KEY,
  });
}
