/**
 * Slack Webhook Integration
 * Sends notifications to Slack channels via incoming webhooks
 */

interface SlackMessage {
  text: string;
  blocks?: Array<{
    type: string;
    text?: {
      type: string;
      text: string;
    };
    fields?: Array<{
      type: string;
      text: string;
    }>;
  }>;
}

export interface DemoRequestSlackNotificationParams {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  universityName: string;
  universityWebsite?: string;
  studentCount?: string;
  role: string;
  department?: string;
  goals?: string[];
  timeline?: string;
  message?: string;
  referralSource?: string;
}

/**
 * Send demo request notification to Slack #sales channel
 */
export async function sendDemoRequestToSlack(
  params: DemoRequestSlackNotificationParams
): Promise<{ success: boolean; error?: unknown }> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('⚠️ SLACK_WEBHOOK_URL not set. Skipping Slack notification.');
    return { success: false, error: 'Slack webhook not configured' };
  }

  try {
    const fields: Array<{ type: string; text: string }> = [
      {
        type: 'mrkdwn',
        text: `*University:*\n${params.universityName}`,
      },
      {
        type: 'mrkdwn',
        text: `*Contact:*\n${params.firstName} ${params.lastName}`,
      },
      {
        type: 'mrkdwn',
        text: `*Email:*\n<mailto:${params.email}|${params.email}>`,
      },
      {
        type: 'mrkdwn',
        text: `*Role:*\n${params.role}`,
      },
    ];

    if (params.phone) {
      fields.push({
        type: 'mrkdwn',
        text: `*Phone:*\n${params.phone}`,
      });
    }

    if (params.studentCount) {
      fields.push({
        type: 'mrkdwn',
        text: `*Student Count:*\n${params.studentCount}`,
      });
    }

    if (params.department) {
      fields.push({
        type: 'mrkdwn',
        text: `*Department:*\n${params.department}`,
      });
    }

    if (params.timeline) {
      fields.push({
        type: 'mrkdwn',
        text: `*Timeline:*\n${params.timeline}`,
      });
    }

    if (params.goals && params.goals.length > 0) {
      fields.push({
        type: 'mrkdwn',
        text: `*Goals:*\n${params.goals.map((g) => `• ${g}`).join('\n')}`,
      });
    }

    if (params.universityWebsite) {
      fields.push({
        type: 'mrkdwn',
        text: `*Website:*\n<${params.universityWebsite}|${params.universityWebsite}>`,
      });
    }

    if (params.referralSource) {
      fields.push({
        type: 'mrkdwn',
        text: `*Referral Source:*\n${params.referralSource}`,
      });
    }

    const message: SlackMessage = {
      text: `New Demo Request from ${params.universityName}`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🎓 New University Demo Request',
          },
        },
        {
          type: 'section',
          fields,
        },
      ],
    };

    if (params.message) {
      message.blocks?.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Additional Message:*\n${params.message}`,
        },
      });
    }

    message.blocks?.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Action Required:* Follow up with ${params.email} within 24 hours`,
      },
    });

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.status} ${response.statusText}`);
    }

    console.log('✅ Demo request sent to Slack successfully');
    return { success: true };
  } catch (error) {
    console.error('Error sending demo request to Slack:', error);
    return { success: false, error };
  }
}
