#!/bin/bash
# Non-interactive version - takes token as argument
# Usage: ./set-token-and-secrets.sh YOUR_GITHUB_TOKEN

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

if [ -z "$1" ]; then
    echo -e "${RED}Error: GitHub token required${NC}"
    echo "Usage: $0 YOUR_GITHUB_TOKEN"
    exit 1
fi

GITHUB_TOKEN="$1"

echo -e "${YELLOW}🔐 Setting up automation...${NC}"
echo ""

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

# Store token
echo "$GITHUB_TOKEN" > "$HOME/.claude-github-token"
chmod 600 "$HOME/.claude-github-token"
echo -e "${GREEN}✓ Token stored securely${NC}"
echo ""

# Set secrets using Python script
echo -e "${YELLOW}Setting GitHub secrets...${NC}"
export GITHUB_TOKEN
python3 "$(dirname "$0")/set-github-secrets.py"

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Claude Code can now:"
echo "  • Push to GitHub directly"
echo "  • Set GitHub secrets automatically"
echo "  • Monitor deployments"
echo "  • Create issues for failures"
