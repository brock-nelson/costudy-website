#!/bin/bash
# Setup GitHub secrets for Vercel integration
# This enables automatic deployment monitoring

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🔐 Setting up GitHub Secrets for Vercel Integration${NC}"
echo ""

# Check if we have the necessary values
VERCEL_TOKEN="YoKN7IoSTYYF2YbDyUFdg6np"
VERCEL_PROJECT_ID="prj_rZsLBD8ZVuZ2UCpIqNNbYkXdP4YK"
VERCEL_TEAM_ID="team_dADCkHgSm52Gv4xnjUEOWL3R"

# Get repository info
REPO_OWNER="brock-nelson"
REPO_NAME="costudy-website"

echo "Repository: $REPO_OWNER/$REPO_NAME"
echo ""

# Check if gh CLI is available
if ! command -v gh &> /dev/null; then
    echo -e "${YELLOW}⚠ GitHub CLI (gh) not installed${NC}"
    echo "Installing via Homebrew..."
    brew install gh
fi

# Authenticate with GitHub CLI if not already authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}🔑 GitHub CLI needs authentication${NC}"
    echo "Please authenticate with GitHub:"
    gh auth login
fi

echo -e "${GREEN}✓ GitHub CLI authenticated${NC}"
echo ""

# Set secrets using gh CLI
echo -e "${YELLOW}Setting VERCEL_TOKEN...${NC}"
echo "$VERCEL_TOKEN" | gh secret set VERCEL_TOKEN --repo "$REPO_OWNER/$REPO_NAME"
echo -e "${GREEN}✓ VERCEL_TOKEN set${NC}"

echo -e "${YELLOW}Setting VERCEL_PROJECT_ID...${NC}"
echo "$VERCEL_PROJECT_ID" | gh secret set VERCEL_PROJECT_ID --repo "$REPO_OWNER/$REPO_NAME"
echo -e "${GREEN}✓ VERCEL_PROJECT_ID set${NC}"

echo -e "${YELLOW}Setting VERCEL_TEAM_ID...${NC}"
echo "$VERCEL_TEAM_ID" | gh secret set VERCEL_TEAM_ID --repo "$REPO_OWNER/$REPO_NAME"
echo -e "${GREEN}✓ VERCEL_TEAM_ID set${NC}"

echo ""
echo -e "${GREEN}✅ All secrets configured!${NC}"
echo ""
echo "The deployment monitor will now:"
echo "  • Automatically check deployment status after each push"
echo "  • Create GitHub issues for deployment failures"
echo "  • Include error logs in the issues"
echo "  • Comment on issues when deployments succeed again"
echo ""
echo -e "${YELLOW}Next step: Push your code to trigger the first monitored deployment${NC}"
