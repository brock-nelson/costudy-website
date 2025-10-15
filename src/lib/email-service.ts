import { sgMail, emailConfig } from './sendgrid';
import { render } from '@react-email/render';
import React from 'react';
import WelcomeEmail from '@/emails/welcome';
import StudyGroupInviteEmail from '@/emails/study-group-invite';
import DemoRequestConfirmation from '@/emails/demo-request-confirmation';
import DemoRequestSalesNotification from '@/emails/demo-request-sales-notification';

export interface SendWelcomeEmailParams {
  to: string;
  firstName: string;
  verificationUrl?: string;
}

export interface SendStudyGroupInviteParams {
  to: string;
  recipientName: string;
  inviterName: string;
  groupName: string;
  className: string;
  nextSessionDate?: string;
  acceptUrl: string;
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail({
  to,
  firstName,
  verificationUrl,
}: SendWelcomeEmailParams) {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('⚠️ SENDGRID_API_KEY not set. Skipping email send.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    // Render React component to HTML
    const html = await render(
      React.createElement(WelcomeEmail, { firstName, verificationUrl })
    );

    const msg = {
      to,
      from: emailConfig.from,
      replyTo: emailConfig.replyTo,
      subject: 'Welcome to CoStudy! 🎓',
      html,
    };

    await sgMail.send(msg);

    console.log('✅ Welcome email sent successfully to:', to);
    return { success: true, data: { to } };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error };
  }
}

/**
 * Send study group invitation email
 */
export async function sendStudyGroupInvite({
  to,
  recipientName,
  inviterName,
  groupName,
  className,
  nextSessionDate,
  acceptUrl,
}: SendStudyGroupInviteParams) {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('⚠️ SENDGRID_API_KEY not set. Skipping email send.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    // Render React component to HTML
    const html = await render(
      React.createElement(StudyGroupInviteEmail, {
        recipientName,
        inviterName,
        groupName,
        className,
        nextSessionDate,
        acceptUrl,
      })
    );

    const msg = {
      to,
      from: emailConfig.from,
      replyTo: emailConfig.replyTo,
      subject: `${inviterName} invited you to join their study group on CoStudy`,
      html,
    };

    await sgMail.send(msg);

    console.log('✅ Study group invite sent successfully to:', to);
    return { success: true, data: { to } };
  } catch (error) {
    console.error('Error sending study group invite:', error);
    return { success: false, error };
  }
}

/**
 * Send session reminder email
 */
export async function sendSessionReminder({
  to,
  studentName,
  groupName,
  sessionDate,
  sessionTime,
  location,
  joinUrl,
}: {
  to: string;
  studentName: string;
  groupName: string;
  sessionDate: string;
  sessionTime: string;
  location: string;
  joinUrl: string;
}) {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('⚠️ SENDGRID_API_KEY not set. Skipping email send.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #7C3AED; padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Study Session Reminder 📚</h1>
        </div>

        <div style="padding: 30px 20px;">
          <p style="font-size: 16px;">Hi ${studentName},</p>

          <p style="font-size: 16px;">
            This is a friendly reminder about your upcoming study session:
          </p>

          <div style="background-color: #F7FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #2D3748;">${groupName}</h2>
            <p style="margin: 8px 0;"><strong>📅 Date:</strong> ${sessionDate}</p>
            <p style="margin: 8px 0;"><strong>🕐 Time:</strong> ${sessionTime}</p>
            <p style="margin: 8px 0;"><strong>📍 Location:</strong> ${location}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${joinUrl}" style="background-color: #7C3AED; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              View Session Details
            </a>
          </div>

          <p style="font-size: 14px; color: #718096; margin-top: 30px;">
            Can&apos;t make it? Let your group know as soon as possible.
          </p>
        </div>
      </div>
    `;

    const msg = {
      to,
      from: emailConfig.from,
      replyTo: emailConfig.replyTo,
      subject: `Reminder: Study session tomorrow - ${groupName}`,
      html,
    };

    await sgMail.send(msg);

    console.log('✅ Session reminder sent successfully to:', to);
    return { success: true, data: { to } };
  } catch (error) {
    console.error('Error sending session reminder:', error);
    return { success: false, error };
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail({
  to,
  firstName,
  resetUrl,
}: {
  to: string;
  firstName: string;
  resetUrl: string;
}) {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('⚠️ SENDGRID_API_KEY not set. Skipping email send.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #7C3AED; padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Reset Your Password 🔐</h1>
        </div>

        <div style="padding: 30px 20px;">
          <p style="font-size: 16px;">Hi ${firstName},</p>

          <p style="font-size: 16px;">
            We received a request to reset your CoStudy password. Click the button below to create a new password:
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #7C3AED; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              Reset Password
            </a>
          </div>

          <p style="font-size: 14px; color: #718096;">
            This link will expire in 1 hour for security reasons.
          </p>

          <div style="margin-top: 30px; padding: 15px; background-color: #FEF2F2; border-left: 4px solid #EF4444; border-radius: 4px;">
            <p style="margin: 0; font-size: 14px; color: #991B1B;">
              <strong>⚠️ Didn&apos;t request a password reset?</strong><br />
              You can safely ignore this email. Your password won&apos;t change unless you click the link above.
            </p>
          </div>
        </div>
      </div>
    `;

    const msg = {
      to,
      from: emailConfig.from,
      replyTo: emailConfig.replyTo,
      subject: 'Reset Your CoStudy Password',
      html,
    };

    await sgMail.send(msg);

    console.log('✅ Password reset email sent successfully to:', to);
    return { success: true, data: { to } };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error };
  }
}

export interface SendDemoRequestConfirmationParams {
  to: string;
  firstName: string;
  universityName: string;
}

/**
 * Send demo request confirmation email to requester
 */
export async function sendDemoRequestConfirmation({
  to,
  firstName,
  universityName,
}: SendDemoRequestConfirmationParams) {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('⚠️ SENDGRID_API_KEY not set. Skipping email send.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const html = await render(
      React.createElement(DemoRequestConfirmation, { firstName, universityName })
    );

    const msg = {
      to,
      from: emailConfig.from,
      replyTo: emailConfig.replyTo,
      subject: 'Thanks for Requesting a CoStudy Demo!',
      html,
    };

    await sgMail.send(msg);

    console.log('✅ Demo confirmation email sent successfully to:', to);
    return { success: true, data: { to } };
  } catch (error) {
    console.error('Error sending demo confirmation email:', error);
    return { success: false, error };
  }
}

export interface SendDemoRequestSalesNotificationParams {
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
 * Send demo request notification to sales team
 */
export async function sendDemoRequestSalesNotification(
  params: SendDemoRequestSalesNotificationParams
) {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('⚠️ SENDGRID_API_KEY not set. Skipping email send.');
    return { success: false, error: 'Email service not configured' };
  }

  const salesEmail = process.env.SALES_EMAIL || 'sales@costudy.co';

  try {
    const html = await render(
      React.createElement(DemoRequestSalesNotification, params)
    );

    const msg = {
      to: salesEmail,
      from: emailConfig.from,
      replyTo: params.email,
      subject: `New Demo Request: ${params.universityName}`,
      html,
    };

    await sgMail.send(msg);

    console.log('✅ Sales notification email sent successfully to:', salesEmail);
    return { success: true, data: { to: salesEmail } };
  } catch (error) {
    console.error('Error sending sales notification email:', error);
    return { success: false, error };
  }
}
