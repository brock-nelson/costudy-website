#!/bin/bash
# Permanent automation setup - creates a stored GitHub token for future use

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}🔧 Setting up permanent automation${NC}"
echo ""

# Check if token already exists
if [ -f "$HOME/.claude-github-token" ]; then
    echo -e "${GREEN}✓ Token already configured${NC}"
    echo "To update, delete: rm ~/.claude-github-token"
    exit 0
fi

echo "To enable Claude Code to manage GitHub secrets automatically,"
echo "we need a GitHub Personal Access Token."
echo ""
echo -e "${YELLOW}Step 1: Create a token${NC}"
echo "1. Open: https://github.com/settings/tokens/new"
echo "2. Note: 'Claude Code Automation'"
echo "3. Expiration: 90 days (or longer)"
echo "4. Scopes: Check 'repo' and 'workflow'"
echo "5. Click 'Generate token'"
echo "6. Copy the token (starts with ghp_)"
echo ""
echo -e "${YELLOW}Step 2: Paste the token below${NC}"
echo -n "GitHub Token: "
read -s GITHUB_TOKEN
echo ""
echo ""

# Validate token format
if [[ ! $GITHUB_TOKEN =~ ^ghp_[a-zA-Z0-9]{36}$ ]] && [[ ! $GITHUB_TOKEN =~ ^github_pat_[a-zA-Z0-9_]{82}$ ]]; then
    echo -e "${RED}⚠ Warning: Token format doesn't match expected pattern${NC}"
    echo "Expected: ghp_... or github_pat_..."
    echo ""
    echo -n "Continue anyway? (y/N): "
    read CONTINUE
    if [ "$CONTINUE" != "y" ]; then
        echo "Cancelled"
        exit 1
    fi
fi

# Test the token
echo "Testing token..."
RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/user" | python3 -c "import sys, json; print(json.load(sys.stdin).get('login', 'ERROR'))")

if [ "$RESPONSE" = "ERROR" ]; then
    echo -e "${RED}✗ Token is invalid${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Token is valid (user: $RESPONSE)${NC}"
echo ""

# Store token securely
echo "$GITHUB_TOKEN" > "$HOME/.claude-github-token"
chmod 600 "$HOME/.claude-github-token"

echo -e "${GREEN}✓ Token stored in ~/.claude-github-token${NC}"
echo ""

# Now set the secrets
echo -e "${YELLOW}Setting GitHub secrets...${NC}"
export GITHUB_TOKEN
python3 "$(dirname "$0")/set-github-secrets.py"

echo ""
echo -e "${GREEN}✅ Automation setup complete!${NC}"
echo ""
echo "Claude Code can now:"
echo "  • Push to GitHub directly"
echo "  • Set GitHub secrets automatically"
echo "  • Monitor deployments"
echo "  • Create issues for failures"
echo ""
echo "Token stored at: ~/.claude-github-token"
echo "To revoke: Delete the file and revoke token on GitHub"
