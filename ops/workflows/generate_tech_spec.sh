#!/bin/bash
# Engineering: Generate Technical Specification from GitHub Issue
# Usage: ./generate_tech_spec.sh <issue_number>

set -e

ISSUE_NUMBER=$1

if [ -z "$ISSUE_NUMBER" ]; then
  echo "❌ Error: Please provide a GitHub issue number"
  echo "Usage: ./generate_tech_spec.sh 123"
  exit 1
fi

# Load environment
if [ -f "ops/.env.local" ]; then
  source ops/.env.local
fi

echo "🔧 Generating technical specification from GitHub issue #$ISSUE_NUMBER"
echo "================================================================="

# Get issue details (requires gh CLI)
if command -v gh &> /dev/null; then
  ISSUE_TITLE=$(gh issue view $ISSUE_NUMBER --json title -q .title)
  ISSUE_BODY=$(gh issue view $ISSUE_NUMBER --json body -q .body)

  echo "📋 Issue: $ISSUE_TITLE"
  echo ""
else
  echo "⚠️  GitHub CLI not installed. Using issue number only."
  ISSUE_TITLE="GitHub Issue #$ISSUE_NUMBER"
  ISSUE_BODY=""
fi

# Generate technical specification
echo "📝 Generating specification with GPT-4 Turbo..."

# Create comprehensive prompt
SPEC_TOPIC="Technical Specification: $ISSUE_TITLE

Context from GitHub Issue:
$ISSUE_BODY

Generate a comprehensive technical specification including:
1. Overview and Objectives
2. System Architecture
3. Technical Requirements
4. API Design
5. Database Schema
6. Security Considerations
7. Testing Strategy
8. Implementation Plan
9. Acceptance Criteria"

python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "$SPEC_TOPIC" \
  --keywords "technical specification,architecture,system design,API,database" \
  --ai gpt-4-turbo \
  --output "specs/spec_issue_$ISSUE_NUMBER.json"

echo "✅ Specification generated"
echo ""

# Extract and display key sections
echo "📄 Specification preview:"
jq -r '.content.headline // "Specification"' "specs/spec_issue_$ISSUE_NUMBER.json"
echo ""

# Add spec link to GitHub issue
if command -v gh &> /dev/null; then
  gh issue comment $ISSUE_NUMBER --body "📋 **Technical Specification Generated**

Specification: \`specs/spec_issue_$ISSUE_NUMBER.json\`

Review the generated specification and provide feedback.

Generated with CoStudy AI Stack 🤖"

  echo "✅ Comment added to GitHub issue #$ISSUE_NUMBER"
fi

echo ""
echo "💰 Cost: \$$(jq -r '.cost' specs/spec_issue_$ISSUE_NUMBER.json)"
echo "📁 Output: specs/spec_issue_$ISSUE_NUMBER.json"
echo ""
echo "🎯 Next steps:"
echo "   1. Review specs/spec_issue_$ISSUE_NUMBER.json"
echo "   2. Refine technical details as needed"
echo "   3. Share with engineering team for feedback"
