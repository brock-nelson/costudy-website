#!/bin/bash

# Fix Vercel Environment Variables
# This script removes whitespace/newlines from environment variables in Vercel
# Requires: Vercel CLI (npm install -g vercel)

set -e

echo "🔧 Fixing Vercel Environment Variables"
echo "======================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if logged in to Vercel
echo "Checking Vercel authentication..."
vercel whoami || {
    echo "❌ Not logged in to Vercel. Please run: vercel login"
    exit 1
}

# Get project name
PROJECT_NAME="costudy-website"

echo "📋 Current environment variables with potential whitespace:"
echo ""

# List all environment variables (this will show if any have issues)
vercel env ls

echo ""
echo "🧹 Cleaning environment variables..."
echo ""

# Function to clean and update an environment variable
update_env_var() {
    local VAR_NAME=$1
    local ENV_TYPE=$2  # production, preview, development

    echo "Processing $VAR_NAME for $ENV_TYPE..."

    # Pull the current value
    CURRENT_VALUE=$(vercel env pull .env.vercel.temp --environment=$ENV_TYPE 2>/dev/null | grep "^${VAR_NAME}=" | cut -d'=' -f2- || echo "")

    if [ -z "$CURRENT_VALUE" ]; then
        echo "  ⚠️  Variable not found or empty, skipping..."
        return
    fi

    # Trim whitespace using parameter expansion
    CLEANED_VALUE=$(echo "$CURRENT_VALUE" | xargs)

    if [ "$CURRENT_VALUE" != "$CLEANED_VALUE" ]; then
        echo "  ✅ Found whitespace, cleaning..."

        # Remove the old variable
        # Note: Vercel doesn't have a direct update, so we need to remove and re-add
        # This requires confirmation, so we'll provide instructions instead
        echo "  📝 Manual action needed:"
        echo "     1. Go to https://vercel.com/costudy-website/settings/environment-variables"
        echo "     2. Find '$VAR_NAME' for $ENV_TYPE"
        echo "     3. Delete and recreate with cleaned value (without quotes):"
        echo "        $CLEANED_VALUE"
        echo ""
    else
        echo "  ✓ No whitespace detected"
    fi
}

# List of environment variables to check and clean
ENV_VARS=(
    "UPSTASH_REDIS_REST_URL"
    "UPSTASH_REDIS_REST_TOKEN"
    "DATABASE_URL"
    "POSTGRES_URL"
    "POSTGRES_PRISMA_URL"
    "POSTGRES_URL_NON_POOLING"
    "NEXTAUTH_URL"
    "NEXTAUTH_SECRET"
    "NEXT_PUBLIC_SUPABASE_URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    "SUPABASE_SERVICE_ROLE_KEY"
)

echo "Checking environment variables for all environments..."
echo ""

for ENV_TYPE in production preview development; do
    echo "=== $ENV_TYPE Environment ==="
    for VAR_NAME in "${ENV_VARS[@]}"; do
        update_env_var "$VAR_NAME" "$ENV_TYPE"
    done
    echo ""
done

# Cleanup
rm -f .env.vercel.temp

echo "======================================"
echo "✅ Environment variable check complete!"
echo ""
echo "⚠️  IMPORTANT: Manual Action Required"
echo ""
echo "Since Vercel requires confirmation to update environment variables,"
echo "please visit the Vercel dashboard and manually update any variables"
echo "that showed whitespace issues above."
echo ""
echo "Steps:"
echo "1. Go to: https://vercel.com/costudy-website/settings/environment-variables"
echo "2. For each variable listed above with whitespace:"
echo "   - Click the ⋯ menu next to the variable"
echo "   - Click 'Delete'"
echo "   - Click 'Add New' and recreate with the cleaned value"
echo "   - Make sure to select the correct environments (Production, Preview, Development)"
echo ""
echo "After updating, trigger a new deployment to apply changes:"
echo "  git commit --allow-empty -m \"chore: trigger redeploy after env var cleanup\""
echo "  git push origin main"
echo ""

# Alternative: Direct approach using Vercel API
echo "📖 Alternative: Use Vercel API Script"
echo ""
echo "For automated cleanup, you can use the Python script:"
echo "  python ops/scripts/clean_vercel_env_api.py"
echo ""
echo "This requires:"
echo "  - VERCEL_TOKEN environment variable (get from https://vercel.com/account/tokens)"
echo "  - VERCEL_PROJECT_ID (find in project settings)"
echo ""
