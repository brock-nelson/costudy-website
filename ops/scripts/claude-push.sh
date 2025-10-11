#!/bin/bash
# Script for Claude Code to push changes directly to GitHub
# Uses GitHub Actions workflow dispatch API

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d ".git" ]; then
    echo -e "${RED}Error: Not in a git repository${NC}"
    exit 1
fi

# Get inputs
BRANCH="${1:-main}"
COMMIT_MESSAGE="${2:-Auto-commit from Claude Code}"
FILES="${3:-all}"

echo -e "${YELLOW}🚀 Claude Code Push${NC}"
echo "Branch: $BRANCH"
echo "Message: $COMMIT_MESSAGE"
echo "Files: $FILES"
echo ""

# Get the GitHub repository info
REPO_URL=$(git config --get remote.origin.url)
REPO_PATH=$(echo "$REPO_URL" | sed -e 's/.*github.com[:/]\(.*\)\.git/\1/')

echo -e "${YELLOW}Repository: $REPO_PATH${NC}"
echo ""

# Check if GitHub CLI is available and authenticated
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI (gh) is not installed${NC}"
    echo "Install it with: brew install gh"
    exit 1
fi

if ! gh auth status &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI is not authenticated${NC}"
    echo "Run: gh auth login"
    exit 1
fi

# First, commit locally
echo -e "${YELLOW}Committing changes locally...${NC}"
if [ "$FILES" = "all" ]; then
    git add -A
else
    IFS=',' read -ra FILE_ARRAY <<< "$FILES"
    for file in "${FILE_ARRAY[@]}"; do
        git add "$file"
    done
fi

if git diff --staged --quiet; then
    echo -e "${YELLOW}No changes to commit${NC}"
    exit 0
fi

git commit -m "$COMMIT_MESSAGE

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

echo -e "${GREEN}✓ Committed locally${NC}"
echo ""

# Push to GitHub
echo -e "${YELLOW}Pushing to GitHub...${NC}"

# Check for stored token for authentication
if [ -f "$HOME/.claude-github-token" ]; then
    GITHUB_TOKEN=$(cat "$HOME/.claude-github-token")
    git -c credential.helper='!f() { echo "username=x-access-token"; echo "password='$GITHUB_TOKEN'"; }; f' push origin "$BRANCH"
else
    git push origin "$BRANCH"
fi

echo -e "${GREEN}✓ Pushed to GitHub${NC}"
echo ""

# Wait for Vercel to deploy
echo -e "${YELLOW}Waiting for Vercel deployment...${NC}"
sleep 5

# Check deployment status
echo -e "${YELLOW}Checking Vercel deployment status...${NC}"

# We'll check the latest deployment via Vercel API
if [ -n "$VERCEL_TOKEN" ]; then
    RESPONSE=$(curl -s \
        -H "Authorization: Bearer $VERCEL_TOKEN" \
        "https://api.vercel.com/v6/deployments?projectId=$VERCEL_PROJECT_ID&limit=1")

    STATE=$(echo "$RESPONSE" | jq -r '.deployments[0].readyState')
    URL=$(echo "$RESPONSE" | jq -r '.deployments[0].url')

    echo ""
    echo "Deployment Status: $STATE"
    echo "Deployment URL: https://$URL"
    echo ""

    if [ "$STATE" = "READY" ]; then
        echo -e "${GREEN}✓ Deployment successful!${NC}"
    elif [ "$STATE" = "ERROR" ]; then
        echo -e "${RED}✗ Deployment failed!${NC}"
        echo "Check https://vercel.com for logs"
        exit 1
    else
        echo -e "${YELLOW}⏳ Deployment in progress...${NC}"
        echo "Check https://vercel.com for status"
    fi
else
    echo -e "${YELLOW}⚠ VERCEL_TOKEN not set, skipping deployment check${NC}"
    echo "Set VERCEL_TOKEN to enable automatic deployment monitoring"
fi

echo ""
echo -e "${GREEN}✓ Push complete!${NC}"
