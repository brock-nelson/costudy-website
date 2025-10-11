#!/usr/bin/env python3
"""
Marketing Pack Generator - Creates release notes, blog posts, and social media content

Usage:
    python marketing_pack.py --version v1.2.0
    python marketing_pack.py --from v1.1.0 --to v1.2.0
    python marketing_pack.py --version v1.2.0 --output marketing/
"""

import os
import sys
import click
import subprocess
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv
from github import Github
from openai import OpenAI

# Load environment variables
load_dotenv()

# Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_REPO = os.getenv("GITHUB_REPO", "brock-nelson/costudy-website")
GITHUB_OWNER = os.getenv("GITHUB_OWNER", "brock-nelson")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o")
OPENAI_MAX_TOKENS = int(os.getenv("OPENAI_MAX_TOKENS", "4000"))

# Paths
SCRIPT_DIR = Path(__file__).parent
PROMPTS_DIR = SCRIPT_DIR.parent / "prompts"
OUTPUT_DIR = SCRIPT_DIR.parent / "output"


def load_prompt(prompt_name: str) -> str:
    """Load a prompt template from the prompts directory"""
    prompt_path = PROMPTS_DIR / prompt_name
    if not prompt_path.exists():
        raise FileNotFoundError(f"Prompt file not found: {prompt_path}")

    with open(prompt_path, 'r', encoding='utf-8') as f:
        return f.read()


def get_git_commits(from_ref: str, to_ref: str) -> list:
    """Get git commits between two references"""
    try:
        # Get commit messages with format: hash|date|author|subject
        cmd = [
            'git', 'log',
            f'{from_ref}..{to_ref}',
            '--pretty=format:%H|%aI|%an|%s',
            '--no-merges'
        ]

        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            check=True
        )

        commits = []
        for line in result.stdout.strip().split('\n'):
            if line:
                hash, date, author, subject = line.split('|', 3)
                commits.append({
                    'hash': hash,
                    'date': date,
                    'author': author,
                    'subject': subject,
                })

        return commits

    except subprocess.CalledProcessError as e:
        print(f"Error getting git commits: {e}", file=sys.stderr)
        sys.exit(1)


def get_git_diff_stats(from_ref: str, to_ref: str) -> dict:
    """Get diff statistics between two references"""
    try:
        cmd = ['git', 'diff', '--shortstat', from_ref, to_ref]
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            check=True
        )

        # Parse output like "5 files changed, 123 insertions(+), 45 deletions(-)"
        stats_text = result.stdout.strip()
        stats = {
            'files_changed': 0,
            'insertions': 0,
            'deletions': 0,
            'text': stats_text,
        }

        if 'file' in stats_text:
            parts = stats_text.split(',')
            for part in parts:
                if 'file' in part:
                    stats['files_changed'] = int(part.split()[0])
                elif 'insertion' in part:
                    stats['insertions'] = int(part.split()[0])
                elif 'deletion' in part:
                    stats['deletions'] = int(part.split()[0])

        return stats

    except subprocess.CalledProcessError as e:
        print(f"Error getting diff stats: {e}", file=sys.stderr)
        return {'files_changed': 0, 'insertions': 0, 'deletions': 0, 'text': ''}


def categorize_commits(commits: list) -> dict:
    """Categorize commits by type"""
    categories = {
        'features': [],
        'fixes': [],
        'improvements': [],
        'docs': [],
        'other': [],
    }

    feature_keywords = ['add', 'new', 'feature', 'implement']
    fix_keywords = ['fix', 'bug', 'patch', 'resolve']
    improvement_keywords = ['update', 'improve', 'enhance', 'optimize', 'refactor']
    docs_keywords = ['doc', 'readme', 'comment']

    for commit in commits:
        subject_lower = commit['subject'].lower()

        if any(kw in subject_lower for kw in feature_keywords):
            categories['features'].append(commit)
        elif any(kw in subject_lower for kw in fix_keywords):
            categories['fixes'].append(commit)
        elif any(kw in subject_lower for kw in improvement_keywords):
            categories['improvements'].append(commit)
        elif any(kw in subject_lower for kw in docs_keywords):
            categories['docs'].append(commit)
        else:
            categories['other'].append(commit)

    return categories


def format_changes_context(version: str, from_ref: str, to_ref: str, commits: list, categories: dict, stats: dict) -> str:
    """Format changes into context for AI"""
    context = f"""
**Version:** {version}
**From:** {from_ref}
**To:** {to_ref}
**Date:** {datetime.now().strftime('%Y-%m-%d')}

**Statistics:**
- Files changed: {stats['files_changed']}
- Insertions: +{stats['insertions']}
- Deletions: -{stats['deletions']}
- Total commits: {len(commits)}

**New Features ({len(categories['features'])}):**
"""

    for commit in categories['features']:
        context += f"- {commit['subject']} (by {commit['author']})\n"

    context += f"\n**Bug Fixes ({len(categories['fixes'])}):**\n"
    for commit in categories['fixes']:
        context += f"- {commit['subject']} (by {commit['author']})\n"

    context += f"\n**Improvements ({len(categories['improvements'])}):**\n"
    for commit in categories['improvements']:
        context += f"- {commit['subject']} (by {commit['author']})\n"

    if categories['docs']:
        context += f"\n**Documentation ({len(categories['docs'])}):**\n"
        for commit in categories['docs']:
            context += f"- {commit['subject']} (by {commit['author']})\n"

    if categories['other']:
        context += f"\n**Other Changes ({len(categories['other'])}):**\n"
        for commit in categories['other']:
            context += f"- {commit['subject']} (by {commit['author']})\n"

    return context


def generate_marketing_content(changes_context: str, marketing_prompt: str, brand_voice: str) -> dict:
    """Generate marketing content using OpenAI"""

    user_message = f"""
Generate comprehensive marketing content for this release:

{changes_context}

Please create:
1. Release Notes (professional changelog with emojis)
2. Blog Post Announcement (600-800 words)
3. Social Media Posts:
   - Twitter/X (280 characters)
   - LinkedIn (professional, 150 words)
   - Instagram caption (casual, engaging)

Focus on benefits to students, professors, and administrators. Use the CoStudy brand voice.
"""

    try:
        client = OpenAI(api_key=OPENAI_API_KEY)

        # Combine marketing prompt and brand voice
        system_prompt = f"{marketing_prompt}\n\n---\n\n{brand_voice}"

        response = client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            max_tokens=OPENAI_MAX_TOKENS,
            temperature=0.7
        )

        content = response.choices[0].message.content

        # Parse the response into sections
        # This is a simple split - in production you might want more sophisticated parsing
        sections = {
            'full': content,
            'release_notes': '',
            'blog_post': '',
            'social_twitter': '',
            'social_linkedin': '',
            'social_instagram': '',
        }

        # Try to extract sections
        if '# Release Notes' in content or '## Release Notes' in content:
            # Split content into sections
            lines = content.split('\n')
            current_section = 'full'

            for line in lines:
                if 'release notes' in line.lower() and line.startswith('#'):
                    current_section = 'release_notes'
                elif 'blog post' in line.lower() and line.startswith('#'):
                    current_section = 'blog_post'
                elif 'twitter' in line.lower() and line.startswith('#'):
                    current_section = 'social_twitter'
                elif 'linkedin' in line.lower() and line.startswith('#'):
                    current_section = 'social_linkedin'
                elif 'instagram' in line.lower() and line.startswith('#'):
                    current_section = 'social_instagram'
                else:
                    sections[current_section] += line + '\n'

        return sections

    except Exception as e:
        print(f"Error generating marketing content: {e}", file=sys.stderr)
        sys.exit(1)


def save_marketing_pack(version: str, content: dict, output_dir: Path):
    """Save marketing content to files"""
    try:
        output_dir.mkdir(parents=True, exist_ok=True)

        # Save full content
        full_path = output_dir / f"marketing-pack-{version}.md"
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content['full'])
        print(f"✓ Saved full marketing pack to {full_path}")

        # Save individual sections if they were parsed
        if content['release_notes']:
            notes_path = output_dir / f"release-notes-{version}.md"
            with open(notes_path, 'w', encoding='utf-8') as f:
                f.write(content['release_notes'])
            print(f"✓ Saved release notes to {notes_path}")

        if content['blog_post']:
            blog_path = output_dir / f"blog-post-{version}.md"
            with open(blog_path, 'w', encoding='utf-8') as f:
                f.write(content['blog_post'])
            print(f"✓ Saved blog post to {blog_path}")

        if content['social_twitter'] or content['social_linkedin'] or content['social_instagram']:
            social_path = output_dir / f"social-posts-{version}.md"
            with open(social_path, 'w', encoding='utf-8') as f:
                f.write("# Social Media Posts\n\n")
                if content['social_twitter']:
                    f.write("## Twitter/X\n\n")
                    f.write(content['social_twitter'])
                    f.write("\n\n")
                if content['social_linkedin']:
                    f.write("## LinkedIn\n\n")
                    f.write(content['social_linkedin'])
                    f.write("\n\n")
                if content['social_instagram']:
                    f.write("## Instagram\n\n")
                    f.write(content['social_instagram'])
                    f.write("\n\n")
            print(f"✓ Saved social media posts to {social_path}")

    except Exception as e:
        print(f"Error saving marketing pack: {e}", file=sys.stderr)
        sys.exit(1)


def get_latest_tag() -> str:
    """Get the latest git tag"""
    try:
        result = subprocess.run(
            ['git', 'describe', '--tags', '--abbrev=0'],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError:
        return None


@click.command()
@click.option('--version', '-v', help='Version tag (e.g., v1.2.0)')
@click.option('--from', 'from_ref', help='Starting reference (tag, branch, or commit)')
@click.option('--to', 'to_ref', default='HEAD', help='Ending reference (default: HEAD)')
@click.option('--output', '-o', type=click.Path(), help='Output directory (optional)')
@click.option('--debug', is_flag=True, help='Enable debug output')
def main(version: str, from_ref: str, to_ref: str, output: str, debug: bool):
    """Generate marketing content pack for a release"""

    # Validate environment
    if not OPENAI_API_KEY:
        print("Error: OPENAI_API_KEY not set in environment", file=sys.stderr)
        sys.exit(1)

    print(f"🎨 CoStudy Marketing Pack Generator")
    print(f"{'='*50}")

    # Determine version and references
    if not version and not from_ref:
        print("Error: Either --version or --from must be specified", file=sys.stderr)
        sys.exit(1)

    if version and not from_ref:
        # Get previous tag
        latest_tag = get_latest_tag()
        if latest_tag:
            from_ref = latest_tag
            print(f"Using latest tag as baseline: {from_ref}")
        else:
            print("Error: No previous tags found. Please specify --from", file=sys.stderr)
            sys.exit(1)

    if not version:
        version = to_ref

    print(f"Version: {version}")
    print(f"Changes: {from_ref} → {to_ref}")
    print()

    # Load prompts
    print("Loading prompts...")
    marketing_prompt = load_prompt("marketing_prompt.md")
    brand_voice = load_prompt("brand_voice.md")
    if debug:
        print(f"✓ Loaded marketing prompt ({len(marketing_prompt)} characters)")
        print(f"✓ Loaded brand voice ({len(brand_voice)} characters)")

    # Get git changes
    print(f"Analyzing changes from {from_ref} to {to_ref}...")
    commits = get_git_commits(from_ref, to_ref)
    stats = get_git_diff_stats(from_ref, to_ref)
    categories = categorize_commits(commits)

    print(f"✓ Found {len(commits)} commits")
    print(f"  Features: {len(categories['features'])}")
    print(f"  Fixes: {len(categories['fixes'])}")
    print(f"  Improvements: {len(categories['improvements'])}")
    print(f"  {stats['text']}")
    print()

    # Format context
    changes_context = format_changes_context(
        version, from_ref, to_ref, commits, categories, stats
    )

    # Generate marketing content
    print("Generating marketing content with AI...")
    print("(This may take 60-90 seconds)")
    content = generate_marketing_content(changes_context, marketing_prompt, brand_voice)

    print(f"✓ Generated marketing content ({len(content['full'])} characters)")
    print()

    # Save to files
    if output:
        output_dir = Path(output)
    else:
        output_dir = OUTPUT_DIR / f"marketing-{version}"

    save_marketing_pack(version, content, output_dir)

    print()
    print("✅ Done!")
    print()
    print(f"📁 Output directory: {output_dir}")
    print()
    print("Next steps:")
    print("1. Review generated content for accuracy")
    print("2. Edit and customize as needed")
    print("3. Publish release notes to GitHub")
    print("4. Schedule blog post and social media posts")


if __name__ == "__main__":
    main()
