import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  console.warn('⚠️ RESEND_API_KEY not set. Email functionality will not work.');
}

export const resend = new Resend(process.env.RESEND_API_KEY || '');

// Email configuration
export const emailConfig = {
  from: 'CoStudy <noreply@costudy.co>',
  replyTo: 'support@costudy.co',
};
