#!/usr/bin/env python3
"""
Set GitHub secrets via API
Requires: PyNaCl (already installed)
"""

import base64
import json
import os
import sys
from nacl import encoding, public
import subprocess

# Repository info
REPO_OWNER = "brock-nelson"
REPO_NAME = "costudy-website"

# Secrets to set
SECRETS = {
    "VERCEL_TOKEN": "YoKN7IoSTYYF2YbDyUFdg6np",
    "VERCEL_PROJECT_ID": "prj_rZsLBD8ZVuZ2UCpIqNNbYkXdP4YK",
    "VERCEL_TEAM_ID": "team_dADCkHgSm52Gv4xnjUEOWL3R"
}

def get_github_token():
    """Try to get GitHub token from various sources"""

    # Check stored token file first
    token_file = os.path.expanduser('~/.claude-github-token')
    if os.path.exists(token_file):
        with open(token_file, 'r') as f:
            token = f.read().strip()
            if token:
                return token

    # Check environment
    token = os.environ.get('GITHUB_TOKEN')
    if token:
        return token

    # Try to get from gh CLI
    try:
        result = subprocess.run(
            ['gh', 'auth', 'token'],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass

    # Try git credential helper
    try:
        result = subprocess.run(
            ['git', 'credential', 'fill'],
            input='protocol=https\nhost=github.com\n\n',
            capture_output=True,
            text=True,
            check=True
        )
        for line in result.stdout.split('\n'):
            if line.startswith('password='):
                return line.split('=', 1)[1]
    except subprocess.CalledProcessError:
        pass

    return None

def encrypt_secret(public_key: str, secret_value: str) -> str:
    """Encrypt a secret using the repository's public key"""
    public_key_bytes = public.PublicKey(public_key.encode('utf-8'), encoding.Base64Encoder())
    sealed_box = public.SealedBox(public_key_bytes)
    encrypted = sealed_box.encrypt(secret_value.encode('utf-8'))
    return base64.b64encode(encrypted).decode('utf-8')

def set_secret(token: str, repo_owner: str, repo_name: str, secret_name: str, secret_value: str):
    """Set a secret in the repository"""

    # Get public key
    url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/actions/secrets/public-key"
    result = subprocess.run(
        ['curl', '-s', '-H', f'Authorization: token {token}',
         '-H', 'Accept: application/vnd.github.v3+json', url],
        capture_output=True,
        text=True
    )

    key_data = json.loads(result.stdout)
    public_key = key_data['key']
    key_id = key_data['key_id']

    # Encrypt the secret
    encrypted_value = encrypt_secret(public_key, secret_value)

    # Set the secret
    url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/actions/secrets/{secret_name}"
    data = json.dumps({
        "encrypted_value": encrypted_value,
        "key_id": key_id
    })

    result = subprocess.run(
        ['curl', '-s', '-X', 'PUT',
         '-H', f'Authorization: token {token}',
         '-H', 'Accept: application/vnd.github.v3+json',
         url, '-d', data],
        capture_output=True,
        text=True
    )

    return result.returncode == 0

def main():
    print("🔐 Setting GitHub Secrets\n")

    # Get GitHub token
    print("Looking for GitHub token...")
    token = get_github_token()

    if not token:
        print("❌ No GitHub token found\n")
        print("Please create a Personal Access Token:")
        print("1. Go to: https://github.com/settings/tokens/new")
        print("2. Select scope: 'repo' (Full control of private repositories)")
        print("3. Generate token")
        print("4. Run: export GITHUB_TOKEN='your_token_here'")
        print("5. Run this script again\n")
        return 1

    print(f"✅ Token found (length: {len(token)})\n")

    # Set each secret
    for secret_name, secret_value in SECRETS.items():
        print(f"Setting {secret_name}...", end=" ")
        try:
            if set_secret(token, REPO_OWNER, REPO_NAME, secret_name, secret_value):
                print("✅")
            else:
                print("❌")
        except Exception as e:
            print(f"❌ Error: {e}")

    print("\n✅ Done! Deployment monitoring is now enabled.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
