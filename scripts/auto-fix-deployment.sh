#!/bin/bash

# Auto-fix Vercel deployment errors
# This script loops until deployment succeeds

set -e

MAX_ATTEMPTS=5
ATTEMPT=0

echo "🔄 Auto-Fix Deployment Loop Started"
echo "===================================="
echo ""

# Function to check deployment status
check_deployment() {
    echo "🔍 Checking latest Vercel deployment status..."

    # Get latest deployment
    DEPLOYMENT_JSON=$(vercel list --json 2>&1 | head -1)

    if [ $? -ne 0 ]; then
        echo "❌ Failed to get deployment list. Make sure you're logged in:"
        echo "   vercel login"
        exit 1
    fi

    # Parse deployment state
    STATE=$(echo "$DEPLOYMENT_JSON" | jq -r '.deployments[0].state' 2>/dev/null || echo "UNKNOWN")
    URL=$(echo "$DEPLOYMENT_JSON" | jq -r '.deployments[0].url' 2>/dev/null || echo "unknown")

    echo "   State: $STATE"
    echo "   URL: https://$URL"
    echo ""

    echo "$STATE"
}

# Function to get deployment logs
get_deployment_logs() {
    echo "📋 Fetching deployment logs..."

    DEPLOYMENT_ID=$(vercel list --json 2>&1 | head -1 | jq -r '.deployments[0].uid' 2>/dev/null)

    if [ -z "$DEPLOYMENT_ID" ] || [ "$DEPLOYMENT_ID" = "null" ]; then
        echo "⚠️  Could not get deployment ID"
        return 1
    fi

    # Save logs to temp file
    vercel logs "$DEPLOYMENT_ID" > /tmp/vercel-deployment-logs.txt 2>&1

    echo "   Saved to: /tmp/vercel-deployment-logs.txt"
    echo ""
}

# Function to analyze error and suggest fix
analyze_error() {
    echo "🔬 Analyzing deployment error..."
    echo ""

    if [ ! -f /tmp/vercel-deployment-logs.txt ]; then
        echo "⚠️  No logs found"
        return 1
    fi

    # Common error patterns and fixes
    if grep -q "Module not found" /tmp/vercel-deployment-logs.txt; then
        echo "❌ Error: Missing module dependency"
        echo "   Fix: Running npm install to update dependencies"
        npm install
        return 0
    fi

    if grep -q "Type error" /tmp/vercel-deployment-logs.txt; then
        echo "❌ Error: TypeScript type error"
        echo "   Fix: Running TypeScript check"
        grep "Type error" /tmp/vercel-deployment-logs.txt | head -5
        echo ""
        echo "   These need manual fixing. Check the errors above."
        return 1
    fi

    if grep -q "Build failed" /tmp/vercel-deployment-logs.txt; then
        echo "❌ Error: Build failed"
        grep -A 3 "Build failed" /tmp/vercel-deployment-logs.txt
        echo ""
        return 1
    fi

    if grep -q "ECONNREFUSED\|ETIMEDOUT" /tmp/vercel-deployment-logs.txt; then
        echo "❌ Error: Network/connection issue"
        echo "   Fix: This is usually temporary. Retrying..."
        return 0
    fi

    echo "⚠️  Unknown error pattern. Showing last 20 lines:"
    tail -20 /tmp/vercel-deployment-logs.txt
    return 1
}

# Main loop
while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    ATTEMPT=$((ATTEMPT + 1))
    echo "📍 Attempt $ATTEMPT of $MAX_ATTEMPTS"
    echo "─────────────────────────────────────"
    echo ""

    # Trigger deployment
    if [ $ATTEMPT -eq 1 ]; then
        echo "🚀 Using existing deployment..."
    else
        echo "🚀 Deploying to Vercel..."
        vercel --prod --yes
    fi

    # Wait for deployment to process
    echo ""
    echo "⏳ Waiting for deployment to process (30s)..."
    sleep 30

    # Check status
    STATE=$(check_deployment)

    if [ "$STATE" = "READY" ]; then
        echo "✅ Deployment successful!"
        echo ""
        echo "🎉 Site is live!"
        exit 0
    elif [ "$STATE" = "ERROR" ] || [ "$STATE" = "CANCELED" ]; then
        echo "❌ Deployment failed with state: $STATE"
        echo ""

        # Get and analyze logs
        get_deployment_logs

        if analyze_error; then
            echo "🔧 Applied automatic fix. Retrying..."
            echo ""

            # Commit fix if there are changes
            if ! git diff --quiet; then
                git add -A
                git commit -m "fix: auto-fix deployment error (attempt $ATTEMPT)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
                git push origin main
                echo "✅ Fix committed and pushed"
                echo ""
            fi

            # Continue to next attempt
            continue
        else
            echo "⚠️  Could not automatically fix. Manual intervention needed."
            echo ""
            echo "📋 Check the logs above and fix manually, then run:"
            echo "   ./scripts/auto-fix-deployment.sh"
            exit 1
        fi
    else
        echo "⏳ Deployment in progress (state: $STATE). Checking again..."
        sleep 15
        # Don't increment attempt for in-progress states
        ATTEMPT=$((ATTEMPT - 1))
        continue
    fi
done

echo "❌ Max attempts ($MAX_ATTEMPTS) reached without successful deployment"
echo ""
echo "📋 Manual intervention required. Check Vercel dashboard:"
echo "   https://vercel.com/dashboard"
exit 1
