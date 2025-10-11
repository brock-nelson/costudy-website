#!/bin/bash
# Sales: Generate Custom Proposal for University/Enterprise
# Usage: ./generate_sales_proposal.sh "University Name" student_count

set -e

UNIVERSITY=$1
STUDENT_COUNT=$2

if [ -z "$UNIVERSITY" ] || [ -z "$STUDENT_COUNT" ]; then
  echo "❌ Error: Missing required arguments"
  echo "Usage: ./generate_sales_proposal.sh \"University of Michigan\" 45000"
  exit 1
fi

# Load environment
if [ -f "ops/.env.local" ]; then
  source ops/.env.local
fi

echo "💼 Generating sales proposal for $UNIVERSITY"
echo "👥 Student count: $STUDENT_COUNT"
echo "=================================="
echo ""

# Create output directory
OUTPUT_DIR="sales/$(echo $UNIVERSITY | sed 's/ /_/g')_$(date +%Y%m%d)"
mkdir -p "$OUTPUT_DIR"

# Step 1: Competitive Analysis
echo "1/4 🔍 Market research..."
python3 ops/scripts/ultimate_content_generator.py research \
  --topic "Student collaboration platforms for higher education institutions similar to $UNIVERSITY" \
  --output "$OUTPUT_DIR/competitive_analysis.json" 2>/dev/null || echo "   ⏭️  Research skipped (Perplexity API not available)"

# Step 2: Custom Proposal
echo "2/4 📄 Generating custom proposal with Claude Opus..."

PROPOSAL_TOPIC="Custom Enterprise Proposal: CoStudy Implementation for $UNIVERSITY

University Profile:
- Institution: $UNIVERSITY
- Student Population: $STUDENT_COUNT students
- Use Case: Student collaboration and peer learning platform

Proposal Requirements:
1. Executive Summary
2. Understanding of $UNIVERSITY's Needs
3. CoStudy Solution Overview
4. Implementation Plan (phases, timeline)
5. Technical Integration (LMS, SSO, etc.)
6. Pricing and ROI Analysis for $STUDENT_COUNT students
7. Success Metrics and KPIs
8. Case Studies from Similar Institutions
9. Support and Training Plan
10. Next Steps and Timeline

Tone: Professional, data-driven, focused on student success and ROI"

python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "$PROPOSAL_TOPIC" \
  --keywords "enterprise,proposal,higher education,ROI,implementation" \
  --ai claude-opus \
  --output "$OUTPUT_DIR/proposal.json"

echo "✅ Proposal generated"
echo ""

# Step 3: ROI Calculator
echo "3/4 💰 Generating ROI analysis..."

ROI_TOPIC="ROI Analysis: CoStudy Implementation for $UNIVERSITY ($STUDENT_COUNT Students)

Calculate and present:
1. Investment Breakdown
   - Platform cost per student
   - Implementation costs
   - Training and support
   - Total Year 1 investment

2. Measurable Benefits
   - Improved student collaboration (40% increase)
   - Better grades (23% average improvement)
   - Reduced dropout rates (15% decrease)
   - Increased student satisfaction
   - Faculty time savings

3. Financial Returns
   - Retention revenue impact
   - Operational efficiency savings
   - Competitive advantage value
   - 3-year ROI projection

4. Non-Financial Value
   - Enhanced learning outcomes
   - Stronger student community
   - Modern campus reputation

Use specific numbers for $STUDENT_COUNT students, industry benchmarks, and real data"

python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "$ROI_TOPIC" \
  --keywords "ROI,business case,financial analysis,cost savings" \
  --ai gpt-4-turbo \
  --output "$OUTPUT_DIR/roi_analysis.json"

echo "✅ ROI analysis generated"
echo ""

# Step 4: Executive Summary (one-pager)
echo "4/4 📋 Creating executive summary..."

SUMMARY_TOPIC="Executive Summary: CoStudy for $UNIVERSITY (One-Page Overview)

Create a compelling one-page executive summary:
- The Challenge: Current collaboration gaps at $UNIVERSITY
- The Solution: CoStudy's proven platform
- Key Benefits: Top 3 outcomes for $UNIVERSITY
- Investment: Clear pricing for $STUDENT_COUNT students
- ROI: 3-year return projection
- Timeline: 90-day implementation plan
- Call to Action: Next steps to get started

Format: Concise, bullet-driven, executive-friendly, maximum impact"

python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "$SUMMARY_TOPIC" \
  --keywords "executive summary,proposal,higher education,concise" \
  --ai claude-opus \
  --output "$OUTPUT_DIR/executive_summary.json"

echo "✅ Executive summary generated"
echo ""

# Generate presentation deck content
echo "📊 Bonus: Generating pitch deck outline..."
DECK_OUTLINE=$(cat <<EOF
Slide Deck Outline for $UNIVERSITY:

Slide 1: Title - "Transforming Student Collaboration at $UNIVERSITY"
Slide 2: The Challenge - Current state of student collaboration
Slide 3: The CoStudy Solution - Platform overview
Slide 4: Key Features - Visual feature showcase
Slide 5: Student Outcomes - 23% grade improvement, 40% collaboration increase
Slide 6: Case Studies - Similar institutions' success
Slide 7: Implementation - 90-day plan
Slide 8: Technical Integration - Seamless LMS/SSO
Slide 9: ROI - Investment vs Returns for $STUDENT_COUNT students
Slide 10: Next Steps - Timeline and CTA
EOF
)

echo "$DECK_OUTLINE" > "$OUTPUT_DIR/pitch_deck_outline.txt"

# Calculate total cost
echo "=================================="
echo "✅ COMPLETE! Sales package generated:"
echo ""
echo "📄 Files created:"
ls -1 "$OUTPUT_DIR/" | while read file; do
  echo "   ✅ $file"
done

echo ""
echo "💰 Total cost:"
find "$OUTPUT_DIR" -name "*.json" -exec jq -r '.cost // 0' {} + | \
  awk '{s+=$1} END {printf "   $%.2f\n", s}'

echo ""
echo "📁 Location: $OUTPUT_DIR"
echo ""
echo "🎯 Next steps:"
echo "   1. Review proposal.json for main proposal content"
echo "   2. Review roi_analysis.json for financial justification"
echo "   3. Use executive_summary.json for one-page overview"
echo "   4. Follow pitch_deck_outline.txt to create slide deck"
echo "   5. Schedule proposal presentation with $UNIVERSITY"
echo ""
echo "💡 Pro tip: Customize with $UNIVERSITY-specific data and case studies"
