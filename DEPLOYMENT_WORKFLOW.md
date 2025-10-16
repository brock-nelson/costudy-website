# Marketing Website Deployment Workflow

## ✅ SIMPLIFIED: 2-Tier Domain Structure

**IMPORTANT:** Simplified to 2-tier deployment:

### Marketing Website Domains:
- **staging.costudy.co** - Staging/Testing environment (test FIRST)
- **costudy.co** - Production (deploy LAST)

### Platform Domains:
- **dev.costudy.co** - Platform development (SEPARATE from marketing)
- *(Platform staging/prod TBD)*

## Deployment Scripts

Located in: `~/Documents/costudy-website/`

### 1. Deploy to Staging/Testing
```bash
./deploy-staging.sh
```
- Deploys to: `staging.costudy.co`
- Vercel project: `costudy-website-staging`
- **Use this for testing before production**

### 2. Deploy to Production
```bash
./deploy-demo.sh
# or
vercel --prod
```
- Deploys to: `costudy.co`
- **Only deploy after staging is verified**

## DNS Configuration

Henry has the DNS key. Add this CNAME record:

```
Type:  CNAME
Name:  staging
Value: cname.vercel-dns.com
```

## Environment Variables

Set for each environment:

```bash
# Staging
vercel env add DATABASE_URL --project costudy-website-staging
vercel env add SENDGRID_API_KEY --project costudy-website-staging
vercel env add NEXTAUTH_SECRET --project costudy-website-staging
vercel env add UPSTASH_REDIS_REST_URL --project costudy-website-staging
vercel env add UPSTASH_REDIS_REST_TOKEN --project costudy-website-staging
vercel env add LINEAR_API_KEY --project costudy-website-staging
vercel env add PLATFORM_DATABASE_URL --project costudy-website-staging

# Production (repeat with --project costudy-website-prod or default)
```

## Workflow for Cyrus

When Cyrus completes a feature:

1. **Create PR** and get reviewed
2. **Deploy to staging**: Run `./deploy-staging.sh`
   - Test thoroughly on staging.costudy.co
   - Comment in Linear: "🚀 Deployed to staging.costudy.co for testing"
3. **If staging works** → Deploy to production: Run `./deploy-demo.sh`
   - Comment in Linear: "✅ Deployed to costudy.co (production)"

## Current Status

✅ Scripts created and updated (2-tier: staging → production)
✅ Domain strategy simplified (removed preview.costudy.co)
✅ Database sync script ready (`scripts/sync-users-to-platform.ts`)
⏳ DNS record needs to be added by Henry (staging only)
⏳ Issues still assigned to brock@costudy.co (not yet transferred to Cyrus)

## Next Steps

1. **Henry**: Add DNS CNAME record for `staging`
   ```
   Type:  CNAME
   Name:  staging
   Value: cname.vercel-dns.com
   ```
2. **You**: Either:
   - Manually reassign issues to Cyrus in Linear, OR
   - Run a script to bulk-reassign to Cyrus
3. **Post deployment instructions** to all Cyrus issues once assigned
4. **Configure PLATFORM_DATABASE_URL** to enable user sync between website and platform

## Database Integration

See `DATABASE_SYNC.md` for full details on connecting the marketing website database to the platform database.

Quick test:
```bash
npx tsx scripts/sync-users-to-platform.ts
```

This will collect all user data from the marketing website (votes, demos, contacts, etc.) and prepare it for platform sync.

