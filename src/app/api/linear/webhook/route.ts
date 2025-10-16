import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature
    const signature = request.headers.get('linear-signature');
    const webhookSecret = process.env.LINEAR_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('⚠️ LINEAR_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      );
    }

    const bodyText = await request.text();

    if (signature) {
      const hmac = createHmac('sha256', webhookSecret);
      hmac.update(bodyText);
      const expectedSignature = hmac.digest('hex');

      if (signature !== expectedSignature) {
        console.error('❌ Invalid webhook signature');
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }

    const body = JSON.parse(bodyText);
    const { action, data, type } = body;

    console.log('📊 Linear webhook received:', { action, type });

    // Handle different Linear webhook events
    switch (type) {
      case 'Issue':
        await handleIssueEvent(action, data);
        break;

      case 'Comment':
        await handleCommentEvent(action, data);
        break;

      case 'Project':
        await handleProjectEvent(action, data);
        break;

      default:
        console.log('Unhandled Linear event type:', type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error handling Linear webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleIssueEvent(action: string, data: Record<string, unknown>) {
  console.log(`Issue ${action}:`, {
    id: data.id,
    title: data.title,
    state: (data.state as Record<string, unknown> | undefined)?.name,
    assignee: (data.assignee as Record<string, unknown> | undefined)?.name,
  });

  // TODO: Implement custom logic based on issue events
  // Examples:
  // - Send notifications when issues are assigned
  // - Update project dashboard
  // - Sync to other tools
}

async function handleCommentEvent(action: string, data: Record<string, unknown>) {
  console.log(`Comment ${action}:`, {
    id: data.id,
    body: data.body,
    issue: (data.issue as Record<string, unknown> | undefined)?.identifier,
  });

  // TODO: Implement custom logic based on comment events
}

async function handleProjectEvent(action: string, data: Record<string, unknown>) {
  console.log(`Project ${action}:`, {
    id: data.id,
    name: data.name,
  });

  // TODO: Implement custom logic based on project events
}

export async function GET() {
  return NextResponse.json({
    message: 'Linear webhook endpoint',
    info: 'Configure this URL in Linear settings: https://linear.app/settings/api',
  });
}
