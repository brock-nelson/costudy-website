# Resend Email Setup Guide

This guide walks you through setting up Resend for email automation in CoStudy.

## Why Resend?

- ✅ $20/month for 50,000 emails (vs SendGrid's long verification wait)
- ✅ React email templates (perfect for Next.js)
- ✅ Simple API, excellent developer experience
- ✅ 5-minute domain verification
- ✅ Built-in email testing and logs

## Step 1: Create Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Click "Sign Up" (can use GitHub OAuth)
3. Choose the **$20/month plan** (50,000 emails/month)
   - More than enough for launch
   - Can downgrade to free tier if needed initially

## Step 2: Get API Key

1. After signing up, go to [API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Name it: `CoStudy Production`
4. Select "Full Access" permissions
5. Copy the API key (starts with `re_`)
6. **Save it immediately** - you can't view it again

## Step 3: Add API Key to Environment

### Local Development:

Edit `.env.local`:

```bash
RESEND_API_KEY="re_your_api_key_here"
```

### Production (Vercel):

```bash
# Set via Vercel CLI
vercel env add RESEND_API_KEY

# Or via dashboard:
# 1. Go to your project on vercel.com
# 2. Settings → Environment Variables
# 3. Add: RESEND_API_KEY = re_your_api_key_here
# 4. Select: Production, Preview, Development
# 5. Save
```

### GitHub Secrets (for CI/CD):

```bash
# Using the setup script (recommended)
./ops/scripts/set-token-and-secrets.sh

# Or manually via GitHub UI:
# 1. Go to repository Settings → Secrets and variables → Actions
# 2. New repository secret: RESEND_API_KEY
# 3. Paste the API key
```

## Step 4: Verify Domain

**Important:** Emails from unverified domains go to spam. You MUST verify costudy.co.

1. Go to [Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter: `costudy.co`
4. Resend will provide DNS records:

```
TXT  _resend  [unique-verification-code]
MX   @        feedback-smtp.resend.com (Priority: 10)
```

5. Add these records to your domain DNS:
   - If using Cloudflare: DNS → Add Record
   - If using Namecheap: Advanced DNS → Add Record
   - If using GoDaddy: DNS Management → Add Record

6. Wait 5-30 minutes for DNS propagation
7. Click "Verify" in Resend dashboard
8. Status should change to "Verified" ✅

## Step 5: Test Email Sending

### Test via API Route:

```bash
# Start dev server
npm run dev

# Test welcome email (replace with real email)
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to":"your-email@example.com","type":"welcome"}'
```

### Test via Code:

```typescript
import { sendWelcomeEmail } from '@/lib/email-service';

await sendWelcomeEmail({
  to: 'test@example.com',
  firstName: 'John',
  verificationUrl: 'https://costudy.co/verify/abc123'
});
```

## Step 6: Monitor Email Sending

1. Go to [Emails](https://resend.com/emails) in Resend dashboard
2. You'll see all sent emails with:
   - Status (sent, delivered, bounced, failed)
   - Open rates
   - Click rates
   - Full email preview

## Available Email Templates

### 1. Welcome Email
```typescript
import { sendWelcomeEmail } from '@/lib/email-service';

await sendWelcomeEmail({
  to: 'student@example.com',
  firstName: 'Sarah',
  verificationUrl: 'https://costudy.co/verify/token123'
});
```

### 2. Study Group Invite
```typescript
import { sendStudyGroupInvite } from '@/lib/email-service';

await sendStudyGroupInvite({
  to: 'student@example.com',
  recipientName: 'Alex',
  inviterName: 'Sarah Chen',
  groupName: 'CS 101 Study Group',
  className: 'Intro to Computer Science',
  nextSessionDate: 'Friday, Jan 15 at 3:00 PM',
  acceptUrl: 'https://costudy.co/groups/123/accept'
});
```

### 3. Session Reminder
```typescript
import { sendSessionReminder } from '@/lib/email-service';

await sendSessionReminder({
  to: 'student@example.com',
  studentName: 'Alex',
  groupName: 'CS 101 Study Group',
  sessionDate: 'Tomorrow, Jan 15',
  sessionTime: '3:00 PM',
  location: 'Library Room 204',
  joinUrl: 'https://costudy.co/sessions/456'
});
```

### 4. Password Reset
```typescript
import { sendPasswordResetEmail } from '@/lib/email-service';

await sendPasswordResetEmail({
  to: 'student@example.com',
  firstName: 'Sarah',
  resetUrl: 'https://costudy.co/reset-password/token789'
});
```

## Troubleshooting

### Emails Going to Spam

**Cause:** Domain not verified or missing SPF/DKIM records

**Fix:**
1. Verify domain is fully verified in Resend dashboard
2. Add all DNS records Resend provides
3. Wait 24 hours for email reputation to build
4. Test sending to Gmail, it has strictest filters

### API Key Not Working

**Cause:** API key not properly set or missing permissions

**Fix:**
1. Verify key is in `.env.local` and starts with `re_`
2. Restart dev server after adding key
3. Check key has "Full Access" in Resend dashboard
4. Generate new key if necessary

### Emails Not Sending

**Cause:** Resend API error or rate limit

**Fix:**
1. Check Resend dashboard for error logs
2. Verify you haven't hit rate limits (50,000/month on $20 plan)
3. Check function logs for specific error messages
4. Ensure email addresses are valid

### Domain Verification Failing

**Cause:** DNS records not propagated or incorrect

**Fix:**
1. Double-check DNS records match exactly what Resend provides
2. Use [DNS Checker](https://dnschecker.org) to verify propagation
3. Wait up to 24 hours for full propagation
4. Remove any duplicate DNS records

## Cost Management

### Current Plan: $20/month = 50,000 emails

**Estimated usage for 1,000 active users:**
- Welcome emails: 1,000
- Session reminders (avg 2/week): 8,000/month
- Group invites (avg 1/week): 4,000/month
- Misc notifications: 2,000/month
- **Total: ~15,000/month** (well under limit)

### Scaling:

- **10,000 users**: ~150,000 emails/month → Upgrade to $100/month plan
- **50,000 users**: ~750,000 emails/month → Enterprise plan ($500/month)

## Next Steps

After completing this setup:

1. ✅ Resend account created and paid
2. ✅ API key added to all environments
3. ✅ Domain verified
4. ✅ Test email sent successfully

**You're ready to integrate email automation!**

Proceed to integrate welcome emails into the signup flow (see `docs/EMAIL_INTEGRATION.md`)
