#!/bin/bash
# Setup GitHub secrets for Vercel integration using GitHub API
# No dependencies required except curl and jq

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🔐 Setting up GitHub Secrets for Vercel Integration${NC}"
echo ""

# Check if jq is available
if ! command -v jq &> /dev/null; then
    echo -e "${RED}Error: jq is required but not installed${NC}"
    echo "Install with: curl -L https://github.com/stedolan/jq/releases/download/jq-1.6/jq-osx-amd64 -o /usr/local/bin/jq && chmod +x /usr/local/bin/jq"
    exit 1
fi

# Repository info
REPO_OWNER="brock-nelson"
REPO_NAME="costudy-website"

# Vercel credentials
VERCEL_TOKEN="YoKN7IoSTYYF2YbDyUFdg6np"
VERCEL_PROJECT_ID="prj_rZsLBD8ZVuZ2UCpIqNNbYkXdP4YK"
VERCEL_TEAM_ID="team_dADCkHgSm52Gv4xnjUEOWL3R"

echo "Repository: $REPO_OWNER/$REPO_NAME"
echo ""

# Check if GitHub token is available
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${YELLOW}⚠ GITHUB_TOKEN environment variable not set${NC}"
    echo ""
    echo "To set secrets via API, you need a GitHub Personal Access Token with 'repo' scope."
    echo ""
    echo "Option 1: Get a token and run:"
    echo "  export GITHUB_TOKEN='your_github_token_here'"
    echo "  ./ops/scripts/setup-github-secrets-api.sh"
    echo ""
    echo "Option 2: Set secrets manually in GitHub:"
    echo "  1. Go to: https://github.com/$REPO_OWNER/$REPO_NAME/settings/secrets/actions"
    echo "  2. Click 'New repository secret'"
    echo "  3. Add these three secrets:"
    echo ""
    echo "     Name: VERCEL_TOKEN"
    echo "     Value: $VERCEL_TOKEN"
    echo ""
    echo "     Name: VERCEL_PROJECT_ID"
    echo "     Value: $VERCEL_PROJECT_ID"
    echo ""
    echo "     Name: VERCEL_TEAM_ID"
    echo "     Value: $VERCEL_TEAM_ID"
    echo ""
    echo "Option 3: Use GitHub CLI (gh):"
    echo "  Download from: https://cli.github.com/"
    echo "  Then run: ./ops/scripts/setup-github-secrets.sh"
    echo ""
    exit 0
fi

# Function to encrypt secret using GitHub API
encrypt_secret() {
    local secret_value="$1"
    local public_key="$2"

    # Use Python to encrypt (available on macOS by default)
    python3 -c "
import base64
import sys
from nacl import encoding, public

def encrypt(public_key: str, secret_value: str) -> str:
    public_key_bytes = public.PublicKey(public_key.encode('utf-8'), encoding.Base64Encoder())
    sealed_box = public.SealedBox(public_key_bytes)
    encrypted = sealed_box.encrypt(secret_value.encode('utf-8'))
    return base64.b64encode(encrypted).decode('utf-8')

print(encrypt('$public_key', '$secret_value'))
" 2>/dev/null || echo "ERROR: PyNaCl not installed"
}

# Get repository public key
echo -e "${YELLOW}Fetching repository public key...${NC}"
PUBLIC_KEY_RESPONSE=$(curl -s \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/secrets/public-key")

PUBLIC_KEY=$(echo "$PUBLIC_KEY_RESPONSE" | jq -r '.key')
KEY_ID=$(echo "$PUBLIC_KEY_RESPONSE" | jq -r '.key_id')

if [ "$PUBLIC_KEY" = "null" ] || [ -z "$PUBLIC_KEY" ]; then
    echo -e "${RED}Error: Failed to fetch public key${NC}"
    echo "Response: $PUBLIC_KEY_RESPONSE"
    echo ""
    echo "This usually means:"
    echo "1. GITHUB_TOKEN is invalid or expired"
    echo "2. Token doesn't have 'repo' scope"
    echo "3. Repository name is incorrect"
    echo ""
    echo "Please use Option 2 (manual setup) from above."
    exit 1
fi

echo -e "${GREEN}✓ Public key retrieved${NC}"
echo ""

# Check if PyNaCl is available for encryption
echo -e "${YELLOW}Checking for encryption dependencies...${NC}"
if ! python3 -c "import nacl" 2>/dev/null; then
    echo -e "${YELLOW}⚠ PyNaCl not installed (required for encryption)${NC}"
    echo ""
    echo "The GitHub API requires secrets to be encrypted before uploading."
    echo ""
    echo "Please use Option 2 (manual setup) instead:"
    echo "  1. Go to: https://github.com/$REPO_OWNER/$REPO_NAME/settings/secrets/actions"
    echo "  2. Click 'New repository secret'"
    echo "  3. Add these three secrets:"
    echo ""
    echo "     Name: VERCEL_TOKEN"
    echo "     Value: $VERCEL_TOKEN"
    echo ""
    echo "     Name: VERCEL_PROJECT_ID"
    echo "     Value: $VERCEL_PROJECT_ID"
    echo ""
    echo "     Name: VERCEL_TEAM_ID"
    echo "     Value: $VERCEL_TEAM_ID"
    echo ""
    exit 0
fi

# Encrypt and upload secrets
echo -e "${YELLOW}Encrypting and uploading secrets...${NC}"

# VERCEL_TOKEN
ENCRYPTED_TOKEN=$(encrypt_secret "$VERCEL_TOKEN" "$PUBLIC_KEY")
if [ "$ENCRYPTED_TOKEN" = "ERROR: PyNaCl not installed" ]; then
    echo -e "${RED}Encryption failed${NC}"
    exit 1
fi

curl -s -X PUT \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/secrets/VERCEL_TOKEN" \
    -d "{\"encrypted_value\":\"$ENCRYPTED_TOKEN\",\"key_id\":\"$KEY_ID\"}"

echo -e "${GREEN}✓ VERCEL_TOKEN set${NC}"

# VERCEL_PROJECT_ID
ENCRYPTED_PROJECT=$(encrypt_secret "$VERCEL_PROJECT_ID" "$PUBLIC_KEY")
curl -s -X PUT \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/secrets/VERCEL_PROJECT_ID" \
    -d "{\"encrypted_value\":\"$ENCRYPTED_PROJECT\",\"key_id\":\"$KEY_ID\"}"

echo -e "${GREEN}✓ VERCEL_PROJECT_ID set${NC}"

# VERCEL_TEAM_ID
ENCRYPTED_TEAM=$(encrypt_secret "$VERCEL_TEAM_ID" "$PUBLIC_KEY")
curl -s -X PUT \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/secrets/VERCEL_TEAM_ID" \
    -d "{\"encrypted_value\":\"$ENCRYPTED_TEAM\",\"key_id\":\"$KEY_ID\"}"

echo -e "${GREEN}✓ VERCEL_TEAM_ID set${NC}"

echo ""
echo -e "${GREEN}✅ All secrets configured!${NC}"
echo ""
echo "The deployment monitor will now:"
echo "  • Automatically check deployment status after each push"
echo "  • Create GitHub issues for deployment failures"
echo "  • Include error logs in the issues"
echo "  • Comment on issues when deployments succeed again"
