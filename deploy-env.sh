#!/bin/bash

# Deploy environment variables to Vercel
# Make sure you're logged in first: vercel login

echo "🚀 Deploying environment variables to Vercel..."

# Set the project (link if not already linked)
vercel link --yes

# Production NEXTAUTH_SECRET (secure random string)
NEXTAUTH_SECRET="X/0zfntu+KLFHCprtcy2Jm5zqACEinAYaexIZ7Kk9JM="

# Database variables
vercel env add DATABASE_URL production <<< 'postgres://postgres.uoeapsmbpmbolnaydyhj:xBeG3lILm9mxLwS3@aws-1-us-west-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true'
vercel env add POSTGRES_URL production <<< 'postgres://postgres.uoeapsmbpmbolnaydyhj:xBeG3lILm9mxLwS3@aws-1-us-west-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true'
vercel env add POSTGRES_PRISMA_URL production <<< 'postgres://postgres.uoeapsmbpmbolnaydyhj:xBeG3lILm9mxLwS3@aws-1-us-west-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true'
vercel env add POSTGRES_URL_NON_POOLING production <<< 'postgres://postgres.uoeapsmbpmbolnaydyhj:xBeG3lILm9mxLwS3@aws-1-us-west-1.pooler.supabase.com:5432/postgres?sslmode=require'

# Redis variables
vercel env add UPSTASH_REDIS_REST_URL production <<< 'https://prime-antelope-22395.upstash.io'
vercel env add UPSTASH_REDIS_REST_TOKEN production <<< 'AVd7AAIncDI1YmYyOGZjNzBhNDA0MjdkOWQ5ZWU1ZTFlZGU1MGI2MXAyMjIzOTU'

# NextAuth variables
vercel env add NEXTAUTH_URL production <<< 'https://www.brocknelson.io'
vercel env add NEXTAUTH_SECRET production <<< "$NEXTAUTH_SECRET"

# Supabase public variables (optional)
vercel env add NEXT_PUBLIC_SUPABASE_URL production <<< 'https://uoeapsmbpmbolnaydyhj.supabase.co'
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production <<< 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvZWFwc21icG1ib2xuYXlkeWhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMTYwOTQsImV4cCI6MjA3NTY5MjA5NH0.eHBojPc3xwI4dgRtL9RILyPdB_8_mYhZCureMWVlWec'
vercel env add SUPABASE_SERVICE_ROLE_KEY production <<< 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvZWFwc21icG1ib2xuYXlkeWhqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDExNjA5NCwiZXhwIjoyMDc1NjkyMDk0fQ.nQfvbn9icuwwwRg9dtWMzlzNZ9wRuXVkKl3i4WbQuzY'

echo "✅ Environment variables deployed!"
echo ""
echo "🔄 Triggering new deployment..."
vercel --prod

echo ""
echo "✨ Done! Your site will be live in a few moments."
echo "🔗 Visit: https://www.brocknelson.io/admin/login"
