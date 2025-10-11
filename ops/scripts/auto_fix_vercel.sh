#!/bin/bash

# Automatic Vercel Environment Variable Fix
# Fastest possible fix - just paste your token!

set -e

echo "⚡ SUPER FAST Vercel Environment Variable Fix"
echo "=============================================="
echo ""

# Auto-detect project ID from .vercel/project.json
if [ -f ".vercel/project.json" ]; then
    PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*"' | cut -d'"' -f4)
    TEAM_ID=$(cat .vercel/project.json | grep -o '"orgId":"[^"]*"' | cut -d'"' -f4)
    echo "✅ Auto-detected Project ID: $PROJECT_ID"
    if [ -n "$TEAM_ID" ]; then
        echo "✅ Auto-detected Team ID: $TEAM_ID"
    fi
    echo ""
else
    echo "❌ Error: .vercel/project.json not found"
    echo "Run 'vercel link' first or use quick_fix_vercel.sh instead"
    exit 1
fi

# Check for Python and requests
if ! python3 -c "import requests" 2>/dev/null; then
    echo "📦 Installing requests package..."
    pip3 install requests -q
fi

# Get token from environment or prompt
if [ -n "$VERCEL_TOKEN" ]; then
    echo "✅ Using VERCEL_TOKEN from environment"
    echo ""
else
    echo "🔑 We need your Vercel API token (one-time setup)"
    echo ""
    echo "Quick steps:"
    echo "1. Open: https://vercel.com/account/tokens"
    echo "2. Click 'Create Token'"
    echo "3. Name it: 'Environment Cleanup'"
    echo "4. Click 'Create'"
    echo "5. Copy the token and paste it here"
    echo ""
    read -sp "Paste your Vercel API Token: " VERCEL_TOKEN
    echo ""
    echo ""

    if [ -z "$VERCEL_TOKEN" ]; then
        echo "❌ Token is required"
        exit 1
    fi

    echo "✅ Token received!"
    echo ""

    # Offer to save it
    read -p "Save token for future use? (y/n): " SAVE_TOKEN
    if [ "$SAVE_TOKEN" = "y" ]; then
        echo "export VERCEL_TOKEN=\"$VERCEL_TOKEN\"" >> ~/.zshrc
        echo "✅ Token saved to ~/.zshrc"
        echo "   (You can remove it later if needed)"
        echo ""
    fi
fi

export VERCEL_TOKEN
export VERCEL_PROJECT_ID="$PROJECT_ID"
if [ -n "$TEAM_ID" ]; then
    export VERCEL_TEAM_ID="$TEAM_ID"
fi

echo "🔍 Step 1/3: Checking for environment variable issues..."
echo ""

# Run dry-run to see what will be cleaned
python3 ops/scripts/clean_vercel_env_api.py --dry-run

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
read -p "Proceed with cleanup? (y/n): " CONFIRM
echo ""

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "❌ Cleanup cancelled"
    exit 0
fi

echo "🧹 Step 2/3: Cleaning environment variables..."
echo ""

python3 ops/scripts/clean_vercel_env_api.py

echo ""
echo "🚀 Step 3/3: Triggering automatic redeploy..."
echo ""

# Check if there are any uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  You have uncommitted changes. Creating temporary commit..."
    git stash
    STASHED=true
fi

# Trigger empty commit for redeploy
git commit --allow-empty -m "chore: trigger redeploy after env var cleanup [skip ci]"

# Check if we have the GitHub token for pushing
if [ -n "$GITHUB_TOKEN" ]; then
    git push origin main
elif git push origin main 2>/dev/null; then
    echo "✅ Pushed to GitHub"
else
    echo "⚠️  Couldn't push automatically. Please run:"
    echo "   git push origin main"
    echo ""
    read -p "Press Enter after you've pushed..."
fi

# Restore stashed changes if any
if [ "$STASHED" = true ]; then
    git stash pop
fi

echo ""
echo "=============================================="
echo "✅ ALL DONE! 🎉"
echo "=============================================="
echo ""
echo "📊 What just happened:"
echo "  ✅ Cleaned whitespace from environment variables"
echo "  ✅ Triggered new Vercel deployment"
echo "  ✅ Deployment monitor is watching for issues"
echo ""
echo "🔗 Track your deployment:"
echo "  → Vercel: https://vercel.com/costudy-website"
echo "  → GitHub: https://github.com/brock-nelson/costudy-website/actions"
echo ""
echo "⏱️  Your site should be live in 2-3 minutes!"
echo ""
echo "📝 Note: If deployment fails, an automatic GitHub issue"
echo "   will be created with full error details."
echo ""
