# Automated Error Monitoring & Reporting

This document explains how to set up automated error monitoring so deployment issues are automatically reported to Claude Code without manual intervention.

## Overview

We have three layers of automated error detection:

1. **GitHub Actions Deployment Monitor** - Creates issues for failed deployments
2. **Vercel Environment Variable Cleaner** - Automatically fixes common env var issues
3. **Future: Sentry Integration** - Real-time error tracking in production

---

## 1. GitHub Actions Deployment Monitor (Active)

**Status:** ✅ Implemented

### What It Does:
- Monitors every deployment to Vercel
- Detects build failures automatically
- Creates detailed GitHub issues with error information
- Tags issues with `deployment-failure` and `high-priority`
- Mentions @brock-nelson for immediate attention

### How It Works:
The workflow file `.github/workflows/deployment-monitor.yml` runs on every push to `main` and all pull requests. It:

1. Waits 3 minutes for Vercel to start deployment
2. Checks GitHub deployment status API
3. If deployment fails, creates a GitHub issue with:
   - Commit SHA and message
   - Branch and triggering actor
   - Deployment URL
   - Checklist of common issues
   - Troubleshooting steps

### Example Issue Created:
```markdown
## 🚨 Deployment Failed: feat: Add new feature

**Commit:** abc123
**Branch:** main
**Triggered by:** brock-nelson
**Time:** 2025-10-11T06:00:00Z

### Common Issues:
- Missing or malformed environment variables
- TypeScript compilation errors
- Dependency conflicts
- Database connection issues
- Redis connection issues (check for whitespace in env vars)

### Actions Needed:
- [ ] Review Vercel deployment logs
- [ ] Fix underlying issue
- [ ] Verify fix locally
- [ ] Redeploy
```

### Manual Testing:
To test the monitor, trigger a deployment failure:
```bash
# Push a commit with intentional error
git commit --allow-empty -m "test: trigger deployment monitor"
git push origin main
```

Then check GitHub Issues for the auto-created report.

---

## 2. Vercel Environment Variable Cleaner

**Status:** ✅ Implemented

### The Problem:
Environment variables in Vercel sometimes contain trailing whitespace or newlines, causing runtime errors like:
```
Error [UrlError]: Upstash Redis client was passed an invalid URL.
Received: "https://prime-antelope-22395.upstash.io\n"
```

### Solutions:

#### Option A: Bash Script (Manual, Safer)
```bash
./ops/scripts/fix_vercel_env.sh
```

**What it does:**
- Checks all environment variables for whitespace
- Provides manual instructions for cleaning
- Lists exact values to update in Vercel dashboard

**When to use:** First time, or if you want manual control

#### Option B: Python API Script (Automated)
```bash
# Get Vercel API token from: https://vercel.com/account/tokens
export VERCEL_TOKEN="your_token_here"

# Get project ID from Vercel project settings
export VERCEL_PROJECT_ID="prj_xxxxx"

# Dry run (check without changing)
python ops/scripts/clean_vercel_env_api.py --dry-run

# Actually clean variables
python ops/scripts/clean_vercel_env_api.py
```

**What it does:**
- Fetches all environment variables via Vercel API
- Detects whitespace in non-encrypted variables
- Automatically removes and recreates with cleaned values
- Reports encrypted variables that need manual cleanup

**When to use:** When you have API access and want automation

**Note:** Encrypted variables (like `UPSTASH_REDIS_REST_TOKEN`) cannot be read via API and require manual cleanup in Vercel dashboard.

### Manual Cleanup in Vercel Dashboard:

1. Go to: https://vercel.com/costudy-website/settings/environment-variables
2. For each variable with whitespace:
   - Click the ⋯ menu next to the variable
   - Click "Delete"
   - Click "Add New" and recreate with value (paste carefully, no extra spaces)
   - Select correct environments: Production, Preview, Development
3. Trigger redeploy:
   ```bash
   git commit --allow-empty -m "chore: trigger redeploy after env cleanup"
   git push origin main
   ```

### Variables to Check:
- `UPSTASH_REDIS_REST_URL` (often has newline)
- `UPSTASH_REDIS_REST_TOKEN` (often has newline)
- `DATABASE_URL`
- `POSTGRES_URL`
- `NEXTAUTH_SECRET`
- All Supabase URLs/keys

---

## 3. Future: Sentry Integration

**Status:** 🔜 Planned

### Benefits:
- Real-time error tracking in production
- Stack traces with source maps
- Performance monitoring
- User session replay
- Automatic GitHub issue creation
- Alert notifications to Slack/Email

### Setup Steps (When Ready):

1. **Create Sentry Account**
   ```bash
   # Sign up at https://sentry.io
   ```

2. **Install Sentry SDK**
   ```bash
   npm install @sentry/nextjs
   ```

3. **Configure Sentry**
   ```bash
   npx @sentry/wizard@latest -i nextjs
   ```

4. **Add to Environment Variables**
   ```bash
   NEXT_PUBLIC_SENTRY_DSN="https://xxxxx@xxxxx.ingest.sentry.io/xxxxx"
   SENTRY_AUTH_TOKEN="your_auth_token"
   ```

5. **Configure GitHub Integration**
   - Go to Sentry Organization Settings
   - Install GitHub integration
   - Enable "Create GitHub issues for new Sentry issues"
   - Configure alert rules

### Sentry Features We'll Use:
- **Error Tracking**: Catch runtime errors in production
- **Performance Monitoring**: Detect slow pages/APIs
- **Release Tracking**: Link errors to specific deployments
- **Source Maps**: Debug minified production code
- **Breadcrumbs**: See user actions leading to errors
- **GitHub Integration**: Auto-create issues with stack traces

---

## 4. Vercel Log Streaming (Advanced)

**Status:** 🔜 Future Enhancement

### What It Does:
Streams Vercel logs to external monitoring services for analysis.

### Options:

#### A. DataDog Integration
```bash
# Set up in Vercel dashboard
# Integrations > DataDog > Configure
```

#### B. Custom Webhook
Create a webhook endpoint that receives Vercel logs:
```javascript
// pages/api/vercel-logs.ts
export default async function handler(req, res) {
  const logs = req.body;

  // Parse for errors
  const errors = logs.filter(log => log.type === 'error');

  if (errors.length > 0) {
    // Create GitHub issue
    await createGitHubIssue(errors);
  }

  res.status(200).json({ received: true });
}
```

---

## 5. Proactive Monitoring Checklist

Use this checklist to ensure all monitoring is properly configured:

### Deployment Monitoring
- [x] GitHub Actions deployment monitor active
- [x] Issues automatically created on deployment failure
- [ ] Slack/Discord notifications configured (optional)
- [ ] Email alerts set up (optional)

### Error Tracking
- [ ] Sentry installed and configured
- [ ] Error alerts going to GitHub issues
- [ ] Source maps uploaded for debugging
- [ ] Performance monitoring active

### Environment Variables
- [ ] All Vercel env vars cleaned (no whitespace)
- [ ] Automated cleanup script available
- [ ] Documentation for manual cleanup
- [ ] Redis connection verified

### Logs & Metrics
- [ ] Vercel logs accessible
- [ ] Log retention configured
- [ ] Analytics tracking errors (Google Analytics)
- [ ] Performance metrics collected

---

## 6. Debugging Failed Deployments

When you see a deployment failure issue:

### Step 1: Check Vercel Dashboard
1. Go to: https://vercel.com/costudy-website
2. Click on the failed deployment
3. Review build logs for errors

### Step 2: Common Issues & Fixes

#### TypeScript Errors
```bash
# Run locally first
npm run build
npm run typecheck
```

#### Environment Variables Missing
```bash
# Check Vercel dashboard
# Settings > Environment Variables
# Ensure all required vars are set for target environment
```

#### Redis Connection Errors
```bash
# Clean environment variables
./ops/scripts/fix_vercel_env.sh
```

#### Dependency Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Step 3: Test Fix Locally
```bash
# Ensure local build succeeds
npm run build

# Test in production mode
npm run start
```

### Step 4: Redeploy
```bash
git add .
git commit -m "fix: resolve deployment issue"
git push origin main
```

---

## 7. Notification Preferences

Configure how you want to be notified:

### GitHub Issues (Active)
- ✅ Automatically created on deployment failures
- Includes detailed error information
- Can be assigned to specific team members
- Searchable and trackable

### Email Notifications (Optional)
Configure in GitHub settings:
- Settings > Notifications > Email
- Enable "Issues" notifications
- Get emails when deployment issues are created

### Slack/Discord (Future)
Set up webhooks to post deployment failures to channels:
```bash
# Add to deployment-monitor.yml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 8. Maintenance & Testing

### Monthly Checklist:
- [ ] Review automated issues created
- [ ] Check false positive rate
- [ ] Update alert thresholds if needed
- [ ] Test deployment monitor with intentional failure
- [ ] Verify all environment variables still clean
- [ ] Review Sentry error trends (when implemented)

### Testing the System:
```bash
# Test deployment monitor
git commit --allow-empty -m "test: deployment monitoring"
git push origin main

# Check if issue is created within 5 minutes
# Go to: https://github.com/brock-nelson/costudy-website/issues

# Test env var cleaner
./ops/scripts/fix_vercel_env.sh --dry-run
```

---

## 9. Quick Reference

| Issue | Solution | Time |
|-------|----------|------|
| Deployment fails | Check GitHub issue auto-created | 5 min |
| Redis connection error | Run `./ops/scripts/fix_vercel_env.sh` | 10 min |
| TypeScript errors | Run `npm run typecheck` locally | 5 min |
| Missing env vars | Check Vercel dashboard | 5 min |
| Need error details | Check Vercel deployment logs | 2 min |
| Want automated alerts | Set up Sentry (future) | 30 min |

---

## 10. Getting Help

If automated monitoring detects an issue:

1. **Check the auto-created GitHub issue** for details
2. **Review Vercel logs** at the deployment URL provided
3. **Run local diagnostics**:
   ```bash
   npm run build
   npm run typecheck
   npm run lint
   npm test
   ```
4. **Check environment variables**:
   ```bash
   ./ops/scripts/fix_vercel_env.sh
   ```
5. **Ask Claude Code** by providing:
   - The GitHub issue link
   - Vercel deployment URL
   - Error messages from logs

---

**Last Updated:** 2025-10-11
**Status:** Deployment monitoring active, env var cleaners ready, Sentry planned

**Contributing:** If you discover new error patterns, update this doc and the monitoring workflows to detect them automatically.
