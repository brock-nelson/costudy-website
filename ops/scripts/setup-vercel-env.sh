#!/bin/bash

# Setup Vercel environment variables for staging
# Using Vercel API

VERCEL_TOKEN="YoKN7IoSTYYF2YbDyUFdg6np"
PROJECT_ID="prj_rZsLBD8ZVuZ2UCpIqNNbYkXdP4YK"
TEAM_ID="team_dADCkHgSm52Gv4xnjUEOWL3R"

echo "🔧 Setting up Vercel environment variables..."
echo ""

# Function to add environment variable
add_env_var() {
    local key=$1
    local value=$2
    local target=${3:-"preview"}  # default to preview

    echo "Adding $key to $target environment..."

    curl -s -X POST "https://api.vercel.com/v10/projects/$PROJECT_ID/env?teamId=$TEAM_ID" \
        -H "Authorization: Bearer $VERCEL_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{
            \"key\": \"$key\",
            \"value\": \"$value\",
            \"type\": \"encrypted\",
            \"target\": [\"$target\"]
        }" > /dev/null

    if [ $? -eq 0 ]; then
        echo "✅ $key added successfully"
    else
        echo "❌ Failed to add $key"
    fi
}

# Database
add_env_var "DATABASE_URL" "postgres://postgres.uoeapsmbpmbolnaydyhj:xBeG3lILm9mxLwS3@aws-1-us-west-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true"
add_env_var "POSTGRES_URL" "postgres://postgres.uoeapsmbpmbolnaydyhj:xBeG3lILm9mxLwS3@aws-1-us-west-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true"
add_env_var "POSTGRES_PRISMA_URL" "postgres://postgres.uoeapsmbpmbolnaydyhj:xBeG3lILm9mxLwS3@aws-1-us-west-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true"
add_env_var "POSTGRES_URL_NON_POOLING" "postgres://postgres.uoeapsmbpmbolnaydyhj:xBeG3lILm9mxLwS3@aws-1-us-west-1.pooler.supabase.com:5432/postgres?sslmode=require"

# Redis
add_env_var "UPSTASH_REDIS_REST_URL" "https://prime-antelope-22395.upstash.io"
add_env_var "UPSTASH_REDIS_REST_TOKEN" "AVd7AAIncDI1YmYyOGZjNzBhNDA0MjdkOWQ5ZWU1ZTFlZGU1MGI2MXAyMjIzOTU"

# NextAuth
add_env_var "NEXTAUTH_URL" "https://costudy-web.vercel.app"
add_env_var "NEXTAUTH_SECRET" "your-super-secret-key-change-this-in-production"

# Supabase
add_env_var "NEXT_PUBLIC_SUPABASE_URL" "https://uoeapsmbpmbolnaydyhj.supabase.co"
add_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvZWFwc21icG1ib2xuYXlkeWhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMTYwOTQsImV4cCI6MjA3NTY5MjA5NH0.eHBojPc3xwI4dgRtL9RILyPdB_8_mYhZCureMWVlWec"
add_env_var "SUPABASE_SERVICE_ROLE_KEY" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvZWFwc21icG1ib2xuYXlkeWhqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDExNjA5NCwiZXhwIjoyMDc1NjkyMDk0fQ.nQfvbn9icuwwwRg9dtWMzlzNZ9wRuXVkKl3i4WbQuzY"

# Email (placeholder - user needs to add real SendGrid key)
add_env_var "EMAIL_FROM" "CoStudy <noreply@costudy.co>"

echo ""
echo "✅ Environment variables setup complete!"
echo ""
echo "⚠️  NOTE: You still need to add SENDGRID_API_KEY manually or provide it to me"
echo ""
echo "Next step: Trigger a redeploy in Vercel dashboard"
