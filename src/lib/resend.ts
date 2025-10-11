import { Resend } from 'resend';

// Only initialize Resend if API key is available
// This prevents build-time errors when the key is not set
const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.warn('⚠️ RESEND_API_KEY not set. Email functionality will not work.');
}

// Use a placeholder key for build-time to avoid errors
// The actual functions will check for the key before sending
export const resend = new Resend(RESEND_API_KEY || 're_placeholder_for_build');

// Email configuration
export const emailConfig = {
  from: 'CoStudy <noreply@costudy.co>',
  replyTo: 'support@costudy.co',
};
