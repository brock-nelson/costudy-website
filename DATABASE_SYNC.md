# Database Sync: Website ↔ Platform

## Overview

The CoStudy marketing website and platform use **separate PostgreSQL databases** that need to be connected for user tracking.

### Architecture

```
Marketing Website DB (Drizzle ORM)          Platform DB (TypeORM)
├─ votes                                   ├─ users
├─ demo_requests                           ├─ groups
├─ email_subscriptions                     ├─ connections
├─ contact_submissions                     ├─ messages
├─ analytics_events                        └─ ...
└─ releases
```

## Database Verification ✅

- **Marketing Website**: PostgreSQL (Drizzle ORM) - **Relational ✓**
- **Platform Backend**: PostgreSQL (TypeORM) - **Relational ✓**

## Setup Instructions

### 1. Configure Platform Database Connection

Add the platform database URL to your `.env.local`:

```bash
# Marketing Website Database (already configured)
DATABASE_URL="postgres://..."

# Platform Database (NEW - add this)
PLATFORM_DATABASE_URL="postgres://..."
PLATFORM_API_URL="https://api.costudy.co" # or staging/dev URL
```

### 2. Run User Sync Script

This script collects user data from the marketing website and prepares it for platform sync:

```bash
npx tsx scripts/sync-users-to-platform.ts
```

### 3. Sync Strategies

Choose one of these approaches:

#### Option A: Direct Database Sync (Recommended for batch operations)
```typescript
// Directly write to platform database using TypeORM
// Requires PLATFORM_DATABASE_URL
```

#### Option B: API-Based Sync (Recommended for real-time)
```typescript
// Send user data to platform API endpoints
// Requires PLATFORM_API_URL and API auth token
```

#### Option C: Queue-Based Sync (Recommended for scale)
```typescript
// Use job queue (e.g., BullMQ, Upstash QStash)
// Process user sync asynchronously
```

## Sync Triggers

User data should sync to platform when:

1. **User requests demo** → Create lead in platform
2. **User votes on feature** → Track engagement in platform
3. **User subscribes to email** → Add to platform mailing list
4. **User submits contact form** → Create support ticket in platform

## Implementation TODOs

- [ ] Add `PLATFORM_DATABASE_URL` to environment variables
- [ ] Choose sync strategy (direct DB / API / queue)
- [ ] Implement platform user creation/update logic
- [ ] Add sync tracking table to prevent duplicates
- [ ] Set up cron job for periodic batch syncs
- [ ] Add webhook handlers for real-time syncs
- [ ] Create admin dashboard to monitor sync status

## Testing

```bash
# Test on dev environment
PLATFORM_DATABASE_URL="dev-postgres-url" npx tsx scripts/sync-users-to-platform.ts

# Test on staging environment
PLATFORM_DATABASE_URL="staging-postgres-url" npx tsx scripts/sync-users-to-platform.ts

# Production (run carefully!)
PLATFORM_DATABASE_URL="prod-postgres-url" npx tsx scripts/sync-users-to-platform.ts
```

## Security Notes

- Never commit database URLs to git
- Use separate credentials for website and platform databases
- Implement rate limiting on sync operations
- Log all sync operations for audit trail
- Encrypt sensitive user data in transit

## Monitoring

Track these metrics:

- Number of users synced per run
- Sync success/failure rate
- Sync duration
- Data discrepancies between databases
- Last successful sync timestamp

