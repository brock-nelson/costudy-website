#!/usr/bin/env python3
"""
Changelog Generator - Creates structured changelogs from git history

Usage:
    python changelog.py --from v1.1.0 --to v1.2.0
    python changelog.py --version v1.2.0  # Compares with previous tag
    python changelog.py --all  # Generate full changelog from all tags
"""

import os
import sys
import click
import subprocess
import re
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Paths
SCRIPT_DIR = Path(__file__).parent
OUTPUT_DIR = SCRIPT_DIR.parent / "output"
REPO_ROOT = SCRIPT_DIR.parent.parent


def get_git_tags() -> list:
    """Get all git tags sorted by version"""
    try:
        result = subprocess.run(
            ['git', 'tag', '--sort=-version:refname'],
            capture_output=True,
            text=True,
            check=True
        )
        tags = [tag.strip() for tag in result.stdout.split('\n') if tag.strip()]
        return tags
    except subprocess.CalledProcessError as e:
        print(f"Error getting git tags: {e}", file=sys.stderr)
        return []


def get_latest_tag() -> str:
    """Get the latest git tag"""
    tags = get_git_tags()
    return tags[0] if tags else None


def get_previous_tag(current_tag: str) -> str:
    """Get the tag before the current tag"""
    tags = get_git_tags()
    try:
        idx = tags.index(current_tag)
        return tags[idx + 1] if idx + 1 < len(tags) else None
    except ValueError:
        return None


def get_tag_date(tag: str) -> str:
    """Get the date of a tag"""
    try:
        result = subprocess.run(
            ['git', 'log', '-1', '--format=%aI', tag],
            capture_output=True,
            text=True,
            check=True
        )
        date_str = result.stdout.strip()
        # Parse and format as YYYY-MM-DD
        date = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
        return date.strftime('%Y-%m-%d')
    except (subprocess.CalledProcessError, ValueError):
        return datetime.now().strftime('%Y-%m-%d')


def get_commits_between(from_ref: str, to_ref: str) -> list:
    """Get commits between two references"""
    try:
        cmd = [
            'git', 'log',
            f'{from_ref}..{to_ref}',
            '--pretty=format:%H|%aI|%an|%s|%b',
            '--no-merges'
        ]

        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            check=True
        )

        commits = []
        current_commit = None

        for line in result.stdout.split('\n'):
            if '|' in line and line.count('|') >= 3:
                # New commit
                if current_commit:
                    commits.append(current_commit)

                parts = line.split('|', 4)
                current_commit = {
                    'hash': parts[0],
                    'date': parts[1],
                    'author': parts[2],
                    'subject': parts[3],
                    'body': parts[4] if len(parts) > 4 else '',
                }
            elif current_commit:
                # Continuation of body
                current_commit['body'] += '\n' + line

        if current_commit:
            commits.append(current_commit)

        return commits

    except subprocess.CalledProcessError as e:
        print(f"Error getting commits: {e}", file=sys.stderr)
        return []


def categorize_commit(commit: dict) -> str:
    """Categorize a commit based on conventional commits or keywords"""
    subject = commit['subject'].lower()
    body = commit['body'].lower()
    full_text = subject + ' ' + body

    # Conventional Commits prefixes
    if subject.startswith('feat:') or subject.startswith('feature:'):
        return 'added'
    elif subject.startswith('fix:'):
        return 'fixed'
    elif subject.startswith('docs:'):
        return 'docs'
    elif subject.startswith('style:') or subject.startswith('refactor:'):
        return 'changed'
    elif subject.startswith('perf:'):
        return 'changed'
    elif subject.startswith('test:'):
        return 'tests'
    elif subject.startswith('chore:'):
        return 'chore'
    elif subject.startswith('breaking:') or 'breaking change' in body:
        return 'breaking'
    elif subject.startswith('remove:') or subject.startswith('delete:'):
        return 'removed'
    elif subject.startswith('deprecate:'):
        return 'deprecated'
    elif subject.startswith('security:'):
        return 'security'

    # Keyword-based categorization
    feature_keywords = ['add', 'new', 'feature', 'implement', 'create']
    fix_keywords = ['fix', 'bug', 'patch', 'resolve', 'correct']
    improvement_keywords = ['update', 'improve', 'enhance', 'optimize', 'refactor']
    removal_keywords = ['remove', 'delete', 'drop']
    security_keywords = ['security', 'vulnerability', 'cve', 'exploit']

    if any(kw in full_text for kw in security_keywords):
        return 'security'
    elif any(kw in subject for kw in feature_keywords):
        return 'added'
    elif any(kw in subject for kw in fix_keywords):
        return 'fixed'
    elif any(kw in subject for kw in removal_keywords):
        return 'removed'
    elif any(kw in subject for kw in improvement_keywords):
        return 'changed'
    else:
        return 'changed'


def format_commit_message(commit: dict) -> str:
    """Format commit message for changelog"""
    # Remove conventional commit prefix if present
    subject = commit['subject']
    subject = re.sub(r'^(feat|fix|docs|style|refactor|perf|test|chore|security|breaking|remove|deprecate):\s*', '', subject, flags=re.IGNORECASE)

    # Capitalize first letter
    if subject:
        subject = subject[0].upper() + subject[1:]

    # Add commit hash link
    short_hash = commit['hash'][:7]
    return f"{subject} ([{short_hash}](https://github.com/brock-nelson/costudy-website/commit/{commit['hash']}))"


def generate_changelog_section(version: str, date: str, commits: list) -> str:
    """Generate a changelog section for a version"""
    if not commits:
        return f"## [{version}] - {date}\n\nNo changes recorded.\n\n"

    # Categorize commits
    categories = {
        'breaking': [],
        'security': [],
        'added': [],
        'changed': [],
        'deprecated': [],
        'removed': [],
        'fixed': [],
        'docs': [],
        'tests': [],
        'chore': [],
    }

    for commit in commits:
        category = categorize_commit(commit)
        if category in categories:
            categories[category].append(commit)

    # Build changelog section
    section = f"## [{version}] - {date}\n\n"

    # Keep a Changelog order
    if categories['breaking']:
        section += "### ⚠️ Breaking Changes\n\n"
        for commit in categories['breaking']:
            section += f"- {format_commit_message(commit)}\n"
        section += "\n"

    if categories['security']:
        section += "### 🔒 Security\n\n"
        for commit in categories['security']:
            section += f"- {format_commit_message(commit)}\n"
        section += "\n"

    if categories['added']:
        section += "### ✨ Added\n\n"
        for commit in categories['added']:
            section += f"- {format_commit_message(commit)}\n"
        section += "\n"

    if categories['changed']:
        section += "### 🔄 Changed\n\n"
        for commit in categories['changed']:
            section += f"- {format_commit_message(commit)}\n"
        section += "\n"

    if categories['deprecated']:
        section += "### ⚠️ Deprecated\n\n"
        for commit in categories['deprecated']:
            section += f"- {format_commit_message(commit)}\n"
        section += "\n"

    if categories['removed']:
        section += "### 🗑️ Removed\n\n"
        for commit in categories['removed']:
            section += f"- {format_commit_message(commit)}\n"
        section += "\n"

    if categories['fixed']:
        section += "### 🐛 Fixed\n\n"
        for commit in categories['fixed']:
            section += f"- {format_commit_message(commit)}\n"
        section += "\n"

    return section


def generate_full_changelog() -> str:
    """Generate complete changelog from all tags"""
    tags = get_git_tags()

    if not tags:
        return "# Changelog\n\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\nand this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\n## [Unreleased]\n\nNo unreleased changes.\n\n"

    changelog = """# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

"""

    # Add unreleased section
    latest_tag = tags[0]
    unreleased_commits = get_commits_between(latest_tag, 'HEAD')
    if unreleased_commits:
        unreleased_date = datetime.now().strftime('%Y-%m-%d')
        changelog += generate_changelog_section('Unreleased', unreleased_date, unreleased_commits)

    # Add sections for each tag
    for i, tag in enumerate(tags):
        date = get_tag_date(tag)
        from_ref = tags[i + 1] if i + 1 < len(tags) else None

        if from_ref:
            commits = get_commits_between(from_ref, tag)
        else:
            # First tag - get all commits up to it
            try:
                result = subprocess.run(
                    ['git', 'rev-list', '--max-parents=0', 'HEAD'],
                    capture_output=True,
                    text=True,
                    check=True
                )
                first_commit = result.stdout.strip()
                commits = get_commits_between(first_commit, tag)
            except subprocess.CalledProcessError:
                commits = []

        changelog += generate_changelog_section(tag, date, commits)

    return changelog


def save_changelog(content: str, output_path: Path):
    """Save changelog to file"""
    try:
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✓ Saved changelog to {output_path}")
    except Exception as e:
        print(f"Error saving changelog: {e}", file=sys.stderr)
        sys.exit(1)


@click.command()
@click.option('--version', '-v', help='Version to generate changelog for')
@click.option('--from', 'from_ref', help='Starting reference (tag, branch, or commit)')
@click.option('--to', 'to_ref', default='HEAD', help='Ending reference (default: HEAD)')
@click.option('--all', 'generate_all', is_flag=True, help='Generate full changelog from all tags')
@click.option('--output', '-o', type=click.Path(), help='Output file path (default: CHANGELOG.md in repo root)')
@click.option('--debug', is_flag=True, help='Enable debug output')
def main(version: str, from_ref: str, to_ref: str, generate_all: bool, output: str, debug: bool):
    """Generate structured changelog from git history"""

    print(f"📋 CoStudy Changelog Generator")
    print(f"{'='*50}")
    print()

    # Determine output path
    if output:
        output_path = Path(output)
    else:
        output_path = REPO_ROOT / "CHANGELOG.md"

    # Generate full changelog if --all
    if generate_all:
        print("Generating complete changelog from all tags...")
        changelog = generate_full_changelog()
        save_changelog(changelog, output_path)
        print()
        print("✅ Done!")
        return

    # Determine version and references
    if version and not from_ref:
        # Get previous tag
        prev_tag = get_previous_tag(version)
        if prev_tag:
            from_ref = prev_tag
            print(f"Comparing {version} with previous tag: {from_ref}")
        else:
            print(f"Warning: No previous tag found. Using first commit as baseline.", file=sys.stderr)
            try:
                result = subprocess.run(
                    ['git', 'rev-list', '--max-parents=0', 'HEAD'],
                    capture_output=True,
                    text=True,
                    check=True
                )
                from_ref = result.stdout.strip()
            except subprocess.CalledProcessError:
                print("Error: Could not find first commit", file=sys.stderr)
                sys.exit(1)
        to_ref = version
    elif not from_ref:
        print("Error: Either --all, --version, or --from must be specified", file=sys.stderr)
        sys.exit(1)

    if not version:
        version = to_ref

    print(f"Version: {version}")
    print(f"Range: {from_ref} → {to_ref}")
    print()

    # Get commits
    print("Analyzing commits...")
    commits = get_commits_between(from_ref, to_ref)

    if not commits:
        print("No commits found in range")
        sys.exit(0)

    print(f"✓ Found {len(commits)} commits")
    print()

    # Generate changelog section
    date = get_tag_date(version) if version != 'HEAD' else datetime.now().strftime('%Y-%m-%d')
    changelog_section = generate_changelog_section(version, date, commits)

    # Create full changelog with header
    changelog = f"""# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

{changelog_section}
"""

    # Save
    save_changelog(changelog, output_path)

    print()
    print("✅ Done!")
    print()
    print(f"📁 Changelog saved to: {output_path}")
    print()
    print("Next steps:")
    print("1. Review the generated changelog")
    print("2. Edit for clarity and completeness")
    print("3. Commit CHANGELOG.md to the repository")


if __name__ == "__main__":
    main()
