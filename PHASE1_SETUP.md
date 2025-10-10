# Phase 1 Setup Guide: Database + Authentication

This guide will help you set up the database and authentication for the CoStudy admin portal.

## Prerequisites

- Vercel account
- SendGrid account
- Upstash account (for Redis rate limiting)

## Step 1: Set Up Vercel Postgres

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project
3. Click on **Storage** tab
4. Click **Create Database** → Select **Postgres**
5. Name your database (e.g., "costudy-db")
6. Once created, go to the **.env.local** tab
7. Copy all the environment variables

## Step 2: Set Up Upstash Redis

1. Go to [Upstash Console](https://console.upstash.com/)
2. Create a new Redis database
3. Name it (e.g., "costudy-rate-limit")
4. Select a region close to your Vercel deployment
5. Go to **Details** tab
6. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

## Step 3: Set Up SendGrid

1. Go to [SendGrid Dashboard](https://app.sendgrid.com/)
2. Navigate to **Settings** → **API Keys**
3. Click **Create API Key**
4. Name it (e.g., "CoStudy Production")
5. Select **Full Access**
6. Copy the API key (you won't see it again!)

## Step 4: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and fill in all the values:

   ```bash
   # Google Analytics (if you have it)
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

   # Database - Paste from Vercel Postgres .env.local tab
   POSTGRES_URL=
   POSTGRES_PRISMA_URL=
   POSTGRES_URL_NO_SSL=
   POSTGRES_URL_NON_POOLING=
   POSTGRES_USER=
   POSTGRES_HOST=
   POSTGRES_PASSWORD=
   POSTGRES_DATABASE=

   # NextAuth.js - Generate a secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET= # Run: openssl rand -base64 32
   AUTH_SECRET= # Same value as NEXTAUTH_SECRET

   # SendGrid Email
   SENDGRID_API_KEY=
   SENDGRID_FROM_EMAIL=noreply@costudy.co
   SENDGRID_FROM_NAME=CoStudy

   # Upstash Redis
   UPSTASH_REDIS_REST_URL=
   UPSTASH_REDIS_REST_TOKEN=

   # Admin Emails
   ADMIN_EMAILS=brock@costudy.co,henry@costudy.co

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. Generate the `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

## Step 5: Push Database Schema

Push the database schema to Vercel Postgres:

```bash
npm run db:push
```

This will create all the tables defined in `src/db/schema.ts`.

## Step 6: Seed Admin Users

Create the initial admin accounts:

```bash
npm run db:seed
```

This will create two admin users:
- **brock@costudy.co** - Password: `ChangeMe123!`
- **henry@costudy.co** - Password: `ChangeMe123!`

**⚠️ IMPORTANT:** Change these passwords immediately after first login!

## Step 7: Start Development Server

```bash
npm run dev
```

## Step 8: Test Authentication

1. Navigate to http://localhost:3000/admin/login
2. Login with one of the admin accounts
3. You should see the admin dashboard
4. **IMMEDIATELY change your password** (password change feature coming in Phase 2)

## Step 9: Deploy to Production

1. Commit all changes:
   ```bash
   git add .
   git commit -m "Add Phase 1: Database + Auth"
   git push origin main
   ```

2. Add environment variables to Vercel:
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all variables from `.env.local` (except `NEXT_PUBLIC_SITE_URL` should be your production URL)

3. Re-deploy your project:
   - Vercel will automatically deploy after pushing to main
   - Or manually trigger a deployment

4. Run migrations on production:
   ```bash
   # Install Vercel CLI if you haven't
   npm i -g vercel

   # Link to your project
   vercel link

   # Push database schema to production
   vercel env pull .env.production.local
   npm run db:push

   # Seed admin users on production
   npm run db:seed
   ```

## Troubleshooting

### "Error: NEXTAUTH_SECRET is not set"
- Make sure you've generated a secret with `openssl rand -base64 32`
- Ensure it's set in both `NEXTAUTH_SECRET` and `AUTH_SECRET`

### "Database connection failed"
- Verify all Postgres environment variables are correct
- Check that your IP is allowed in Vercel Postgres settings
- Try using `POSTGRES_URL_NON_POOLING` if pooling issues occur

### "Cannot find module '@/db'"
- Run `npm install` to ensure all dependencies are installed
- Restart your development server

### Build errors with Drizzle
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`

## Next Steps

Phase 1 is complete! You now have:
- ✅ Database with comprehensive schema
- ✅ Admin authentication
- ✅ Protected admin routes
- ✅ Admin dashboard

**Coming in Phase 2:**
- Feature voting system
- Email notifications
- Rate limiting
- Analytics tracking

## Database Studio (Optional)

You can explore your database with Drizzle Studio:

```bash
npm run db:studio
```

This will open a web interface at https://local.drizzle.studio where you can view and edit database records.
