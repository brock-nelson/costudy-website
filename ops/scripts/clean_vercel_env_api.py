#!/usr/bin/env python3
"""
Clean Vercel Environment Variables via API

This script automatically removes whitespace from Vercel environment variables
using the Vercel REST API.

Requirements:
- VERCEL_TOKEN: API token from https://vercel.com/account/tokens
- VERCEL_PROJECT_ID: Project ID from Vercel project settings

Usage:
    export VERCEL_TOKEN="your_token_here"
    export VERCEL_PROJECT_ID="prj_xxxxx"
    python clean_vercel_env_api.py

Or pass as arguments:
    python clean_vercel_env_api.py --token YOUR_TOKEN --project-id PROJECT_ID
"""

import os
import sys
import json
import argparse
import requests
from typing import List, Dict, Optional


class VercelEnvCleaner:
    """Clean whitespace from Vercel environment variables."""

    def __init__(self, token: str, project_id: str, team_id: Optional[str] = None):
        self.token = token
        self.project_id = project_id
        self.team_id = team_id
        self.base_url = "https://api.vercel.com"
        self.headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }

    def get_env_vars(self) -> List[Dict]:
        """Fetch all environment variables for the project."""
        url = f"{self.base_url}/v9/projects/{self.project_id}/env"
        if self.team_id:
            url += f"?teamId={self.team_id}"

        response = requests.get(url, headers=self.headers)
        response.raise_for_status()

        data = response.json()
        return data.get("envs", [])

    def has_whitespace(self, value: str) -> bool:
        """Check if a value has leading/trailing whitespace or newlines."""
        return value != value.strip()

    def remove_env_var(self, env_id: str) -> bool:
        """Remove an environment variable."""
        url = f"{self.base_url}/v9/projects/{self.project_id}/env/{env_id}"
        if self.team_id:
            url += f"?teamId={self.team_id}"

        response = requests.delete(url, headers=self.headers)
        return response.status_code in [200, 204]

    def create_env_var(self, key: str, value: str, target: List[str], env_type: str = "encrypted") -> bool:
        """Create a new environment variable."""
        url = f"{self.base_url}/v10/projects/{self.project_id}/env"
        if self.team_id:
            url += f"?teamId={self.team_id}"

        payload = {
            "key": key,
            "value": value,
            "type": env_type,
            "target": target
        }

        response = requests.post(url, headers=self.headers, json=payload)
        return response.status_code in [200, 201]

    def clean_environment_variables(self, dry_run: bool = False) -> Dict[str, any]:
        """
        Clean all environment variables with whitespace.

        Args:
            dry_run: If True, only report issues without making changes

        Returns:
            Dictionary with cleanup statistics
        """
        print("🔍 Fetching environment variables...")
        env_vars = self.get_env_vars()

        stats = {
            "total": len(env_vars),
            "cleaned": 0,
            "skipped": 0,
            "errors": 0,
            "details": []
        }

        print(f"📋 Found {stats['total']} environment variables\n")

        for env in env_vars:
            key = env.get("key")
            value = env.get("value")
            env_id = env.get("id")
            target = env.get("target", [])

            # Decrypt value if encrypted
            if env.get("type") == "encrypted":
                print(f"⚠️  {key}: Encrypted value cannot be read directly")
                print(f"   Targets: {', '.join(target)}")
                print(f"   Manual cleanup recommended via Vercel dashboard\n")
                stats["skipped"] += 1
                continue

            # Check for whitespace
            if not self.has_whitespace(value):
                print(f"✓ {key}: No whitespace detected")
                stats["skipped"] += 1
                continue

            # Found whitespace
            cleaned_value = value.strip()
            print(f"🧹 {key}: Whitespace detected!")
            print(f"   Original length: {len(value)} chars")
            print(f"   Cleaned length: {len(cleaned_value)} chars")
            print(f"   Targets: {', '.join(target)}")

            if dry_run:
                print(f"   [DRY RUN] Would clean this variable\n")
                stats["cleaned"] += 1
                stats["details"].append({
                    "key": key,
                    "action": "would_clean",
                    "targets": target
                })
                continue

            # Actually clean the variable
            print(f"   Removing old variable...")
            if not self.remove_env_var(env_id):
                print(f"   ❌ Failed to remove {key}\n")
                stats["errors"] += 1
                continue

            print(f"   Creating cleaned variable...")
            if self.create_env_var(key, cleaned_value, target):
                print(f"   ✅ Successfully cleaned {key}\n")
                stats["cleaned"] += 1
                stats["details"].append({
                    "key": key,
                    "action": "cleaned",
                    "targets": target
                })
            else:
                print(f"   ❌ Failed to create cleaned {key}\n")
                stats["errors"] += 1

        return stats

    def print_summary(self, stats: Dict):
        """Print cleanup summary."""
        print("\n" + "=" * 60)
        print("📊 Cleanup Summary")
        print("=" * 60)
        print(f"Total variables checked: {stats['total']}")
        print(f"✅ Cleaned: {stats['cleaned']}")
        print(f"⏭️  Skipped (no whitespace): {stats['skipped']}")
        print(f"❌ Errors: {stats['errors']}")
        print("=" * 60)

        if stats["cleaned"] > 0:
            print("\n🎉 Environment variables cleaned successfully!")
            print("\n⚠️  Important: Trigger a new deployment to apply changes:")
            print("   git commit --allow-empty -m 'chore: trigger redeploy'")
            print("   git push origin main")
        elif stats["skipped"] > 0 and stats["cleaned"] == 0:
            print("\n✅ All environment variables are already clean!")

        if stats["errors"] > 0:
            print("\n⚠️  Some variables had errors. Please check manually:")
            print("   https://vercel.com/costudy-website/settings/environment-variables")


def main():
    parser = argparse.ArgumentParser(
        description="Clean whitespace from Vercel environment variables"
    )
    parser.add_argument(
        "--token",
        help="Vercel API token (or set VERCEL_TOKEN env var)",
        default=os.getenv("VERCEL_TOKEN")
    )
    parser.add_argument(
        "--project-id",
        help="Vercel project ID (or set VERCEL_PROJECT_ID env var)",
        default=os.getenv("VERCEL_PROJECT_ID")
    )
    parser.add_argument(
        "--team-id",
        help="Vercel team ID (optional)",
        default=os.getenv("VERCEL_TEAM_ID")
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Check for issues without making changes"
    )

    args = parser.parse_args()

    # Validate required arguments
    if not args.token:
        print("❌ Error: VERCEL_TOKEN is required")
        print("   Get a token from: https://vercel.com/account/tokens")
        print("   Usage: export VERCEL_TOKEN='your_token_here'")
        sys.exit(1)

    if not args.project_id:
        print("❌ Error: VERCEL_PROJECT_ID is required")
        print("   Find in: Vercel Dashboard > Project Settings")
        print("   Usage: export VERCEL_PROJECT_ID='prj_xxxxx'")
        sys.exit(1)

    # Initialize cleaner
    cleaner = VercelEnvCleaner(
        token=args.token,
        project_id=args.project_id,
        team_id=args.team_id
    )

    # Run cleanup
    try:
        if args.dry_run:
            print("🔍 Running in DRY RUN mode (no changes will be made)\n")

        stats = cleaner.clean_environment_variables(dry_run=args.dry_run)
        cleaner.print_summary(stats)

    except requests.exceptions.HTTPError as e:
        print(f"\n❌ API Error: {e}")
        print(f"Response: {e.response.text}")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
