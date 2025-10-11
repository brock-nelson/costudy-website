import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
} else {
  console.warn('⚠️ SENDGRID_API_KEY not set. Email functionality will not work.');
}

export { sgMail };

// Email configuration
export const emailConfig = {
  from: process.env.EMAIL_FROM || 'CoStudy <noreply@costudy.co>',
  replyTo: 'support@costudy.co',
};
