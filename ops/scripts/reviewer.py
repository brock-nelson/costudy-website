#!/usr/bin/env python3
"""
Code Reviewer Bot - Automated code review for GitHub pull requests

Usage:
    python reviewer.py --pr 123
    python reviewer.py --pr 123 --output review.md
"""

import os
import sys
import click
from pathlib import Path
from dotenv import load_dotenv
from github import Github
from openai import OpenAI

# Load environment variables
load_dotenv()

# Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_REPO = os.getenv("GITHUB_REPO", "brock-nelson/costudy-website")
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


def get_pr_info(repo, pr_number: int) -> dict:
    """Fetch PR information from GitHub"""
    try:
        pr = repo.get_pull(pr_number)

        # Get labels
        labels = [label.name for label in pr.labels]

        # Get files changed
        files_changed = []
        for file in pr.get_files():
            files_changed.append({
                'filename': file.filename,
                'status': file.status,
                'additions': file.additions,
                'deletions': file.deletions,
                'changes': file.changes,
                'patch': file.patch if hasattr(file, 'patch') else None,
            })

        return {
            'number': pr.number,
            'title': pr.title,
            'body': pr.body or "No description provided.",
            'labels': labels,
            'author': pr.user.login,
            'created_at': pr.created_at.isoformat(),
            'updated_at': pr.updated_at.isoformat(),
            'url': pr.html_url,
            'base_branch': pr.base.ref,
            'head_branch': pr.head.ref,
            'files_changed': files_changed,
            'additions': pr.additions,
            'deletions': pr.deletions,
            'changed_files_count': pr.changed_files,
        }
    except Exception as e:
        print(f"Error fetching PR #{pr_number}: {e}", file=sys.stderr)
        sys.exit(1)


def format_pr_context(pr_info: dict) -> str:
    """Format PR information into a context string for the AI"""
    context = f"""
**Pull Request #{pr_info['number']}: {pr_info['title']}**

**Description:**
{pr_info['body']}

**Author:** {pr_info['author']}
**Branch:** {pr_info['head_branch']} → {pr_info['base_branch']}
**Labels:** {', '.join(pr_info['labels']) if pr_info['labels'] else 'None'}

**Changes Summary:**
- Files changed: {pr_info['changed_files_count']}
- Additions: +{pr_info['additions']}
- Deletions: -{pr_info['deletions']}

**Files Changed:**
"""

    for file in pr_info['files_changed']:
        context += f"\n### {file['filename']} ({file['status']})\n"
        context += f"Changes: +{file['additions']} -{file['deletions']}\n"

        if file['patch']:
            context += f"\n```diff\n{file['patch']}\n```\n"
        else:
            context += "\n(Binary file or no diff available)\n"

    return context


def generate_review(pr_info: dict, reviewer_prompt: str) -> dict:
    """Generate a code review using OpenAI"""

    # Build the context for the AI
    pr_context = format_pr_context(pr_info)

    user_message = f"""
Please review the following pull request and provide comprehensive feedback:

{pr_context}

Focus on:
- Security vulnerabilities (CRITICAL)
- Performance issues (HIGH)
- Type safety and bugs (HIGH)
- Code quality and maintainability (MEDIUM)
- Style and conventions (LOW)

Provide specific, actionable feedback with file names and line numbers where applicable.
"""

    try:
        client = OpenAI(api_key=OPENAI_API_KEY)

        response = client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=[
                {"role": "system", "content": reviewer_prompt},
                {"role": "user", "content": user_message}
            ],
            max_tokens=OPENAI_MAX_TOKENS,
            temperature=0.3  # Lower temperature for more consistent, focused reviews
        )

        review_content = response.choices[0].message.content

        # Parse priority from review content
        priority = "MEDIUM"
        if "CRITICAL" in review_content:
            priority = "CRITICAL"
        elif "HIGH" in review_content:
            priority = "HIGH"
        elif "LOW" in review_content:
            priority = "LOW"

        return {
            'content': review_content,
            'priority': priority,
        }

    except Exception as e:
        print(f"Error generating review with OpenAI: {e}", file=sys.stderr)
        sys.exit(1)


def post_review_to_pr(repo, pr_number: int, review_data: dict):
    """Post the generated review as a comment on the GitHub PR"""
    try:
        pr = repo.get_pull(pr_number)

        # Priority emoji mapping
        priority_emoji = {
            'CRITICAL': '🚨',
            'HIGH': '⚠️',
            'MEDIUM': 'ℹ️',
            'LOW': '💡',
        }

        emoji = priority_emoji.get(review_data['priority'], 'ℹ️')

        comment_body = f"""## {emoji} AI Code Review - {review_data['priority']} Priority

{review_data['content']}

---

*This review was automatically generated by the CoStudy AI Bot. Please address the feedback and request human review for final approval.*

**Next Steps:**
1. Address any CRITICAL and HIGH priority issues
2. Consider MEDIUM priority suggestions
3. Request review from a human team member
4. Once approved, label this PR as `approved` and merge
"""

        pr.create_issue_comment(comment_body)
        print(f"✓ Posted review to PR #{pr_number}")

        # Update labels
        current_labels = [label.name for label in pr.labels]

        if 'needs-review' in current_labels:
            pr.remove_from_labels('needs-review')
            print(f"✓ Removed 'needs-review' label")

        # Add AI-reviewed label
        pr.add_to_labels('ai-reviewed')
        print(f"✓ Added 'ai-reviewed' label")

        # Add priority label if CRITICAL or HIGH
        if review_data['priority'] in ['CRITICAL', 'HIGH']:
            pr.add_to_labels(f"priority-{review_data['priority'].lower()}")
            print(f"✓ Added 'priority-{review_data['priority'].lower()}' label")

    except Exception as e:
        print(f"Error posting review to PR: {e}", file=sys.stderr)
        sys.exit(1)


def save_review_to_file(review_content: str, output_path: Path):
    """Save the generated review to a file"""
    try:
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(review_content)
        print(f"✓ Saved review to {output_path}")
    except Exception as e:
        print(f"Error saving review to file: {e}", file=sys.stderr)
        sys.exit(1)


@click.command()
@click.option('--pr', '-p', required=True, type=int, help='GitHub pull request number')
@click.option('--output', '-o', type=click.Path(), help='Output file path (optional)')
@click.option('--no-post', is_flag=True, help='Do not post to GitHub (local generation only)')
@click.option('--debug', is_flag=True, help='Enable debug output')
def main(pr: int, output: str, no_post: bool, debug: bool):
    """Generate an automated code review for a GitHub pull request"""

    # Validate environment
    if not OPENAI_API_KEY:
        print("Error: OPENAI_API_KEY not set in environment", file=sys.stderr)
        sys.exit(1)

    if not GITHUB_TOKEN and not no_post:
        print("Error: GITHUB_TOKEN not set in environment", file=sys.stderr)
        sys.exit(1)

    print(f"🤖 CoStudy Code Reviewer Bot")
    print(f"{'='*50}")
    print(f"Pull Request: #{pr}")
    print(f"Repository: {GITHUB_REPO}")
    print()

    # Load the code reviewer prompt
    print("Loading code reviewer prompt...")
    reviewer_prompt = load_prompt("reviewer_prompt.md")
    if debug:
        print(f"✓ Loaded prompt ({len(reviewer_prompt)} characters)")

    # Connect to GitHub
    print(f"Fetching PR #{pr}...")
    github_client = Github(GITHUB_TOKEN)
    repo = github_client.get_repo(GITHUB_REPO)
    pr_info = get_pr_info(repo, pr)

    print(f"✓ PR: {pr_info['title']}")
    print(f"  Author: {pr_info['author']}")
    print(f"  Files changed: {pr_info['changed_files_count']}")
    print(f"  +{pr_info['additions']} -{pr_info['deletions']}")
    print()

    # Generate the review
    print("Generating code review with AI...")
    print("(This may take 30-60 seconds)")
    review_data = generate_review(pr_info, reviewer_prompt)

    print(f"✓ Generated review ({len(review_data['content'])} characters)")
    print(f"  Priority: {review_data['priority']}")
    print()

    # Save to file if requested
    if output:
        output_path = Path(output)
        save_review_to_file(review_data['content'], output_path)
    else:
        # Save to default location
        default_output = OUTPUT_DIR / f"review-pr-{pr}.md"
        save_review_to_file(review_data['content'], default_output)

    # Post to GitHub unless --no-post
    if not no_post:
        print("Posting review to GitHub PR...")
        post_review_to_pr(repo, pr, review_data)
    else:
        print("Skipped posting to GitHub (--no-post flag set)")

    print()
    print("✅ Done!")
    print()
    print(f"View PR: {pr_info['url']}")


if __name__ == "__main__":
    main()
