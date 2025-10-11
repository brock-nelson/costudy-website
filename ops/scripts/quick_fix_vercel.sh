#!/bin/bash

# Quick Fix Vercel Environment Variables
# One-command solution to fix the Redis whitespace issue

set -e

echo "🚀 Quick Vercel Environment Variable Fix"
echo "========================================"
echo ""

# Check if Python script exists
if [ ! -f "ops/scripts/clean_vercel_env_api.py" ]; then
    echo "❌ Error: cleanup script not found"
    exit 1
fi

# Check for required Python package
if ! python3 -c "import requests" 2>/dev/null; then
    echo "📦 Installing required package: requests"
    pip3 install requests
fi

echo "📋 To automate environment variable cleanup, we need:"
echo ""
echo "1. Vercel API Token (from: https://vercel.com/account/tokens)"
echo "2. Vercel Project ID (from your project settings)"
echo ""
echo "Quick steps:"
echo ""
echo "Step 1: Get your Vercel API token"
echo "  → Open: https://vercel.com/account/tokens"
echo "  → Click 'Create'"
echo "  → Name: 'Environment Variable Cleanup'"
echo "  → Scope: Full Account"
echo "  → Expiration: No Expiration (or 1 year)"
echo "  → Copy the token"
echo ""
echo "Step 2: Get your Project ID"
echo "  → Open: https://vercel.com/costudy-website/settings"
echo "  → Look for 'Project ID' near the top"
echo "  → Copy the ID (starts with 'prj_')"
echo ""

# Prompt for token
read -p "Enter your Vercel API Token: " VERCEL_TOKEN
echo ""

# Prompt for project ID
read -p "Enter your Project ID: " VERCEL_PROJECT_ID
echo ""

# Validate inputs
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ Error: Token is required"
    exit 1
fi

if [ -z "$VERCEL_PROJECT_ID" ]; then
    echo "❌ Error: Project ID is required"
    exit 1
fi

echo "✅ Credentials received!"
echo ""

# First, do a dry run
echo "🔍 Step 1: Checking for issues (dry run)..."
echo ""
export VERCEL_TOKEN
export VERCEL_PROJECT_ID

python3 ops/scripts/clean_vercel_env_api.py --dry-run

echo ""
read -p "Continue with cleanup? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ]; then
    echo "❌ Cleanup cancelled"
    exit 0
fi

echo ""
echo "🧹 Step 2: Cleaning environment variables..."
echo ""

python3 ops/scripts/clean_vercel_env_api.py

echo ""
echo "✅ Environment variables cleaned!"
echo ""
echo "🚀 Step 3: Triggering redeploy..."
echo ""

# Trigger redeploy
git commit --allow-empty -m "chore: trigger redeploy after env var cleanup"
git push origin main

echo ""
echo "======================================"
echo "✅ All Done!"
echo "======================================"
echo ""
echo "Your deployment is now rebuilding with cleaned environment variables."
echo "Check status at: https://vercel.com/costudy-website"
echo ""
echo "The deployment monitor will create a GitHub issue if it fails."
echo "Otherwise, your site should be live in 2-3 minutes! 🎉"
echo ""
