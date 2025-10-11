# Fortune-100 AI Stack - Setup & Implementation Guide

## 🚀 Quick Implementation (5 Minutes)

### Step 1: Get Your API Keys (2 minutes)

#### Required (Must Have):
1. **OpenAI API Key** - Get from https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Copy the key (starts with `sk-...`)
   - Cost: Pay-as-you-go, ~$0.80 per blog post

#### Premium (Recommended):
2. **Anthropic API Key** - Get from https://console.anthropic.com/settings/keys
   - Sign up for Anthropic account
   - Create API key
   - Copy the key (starts with `sk-ant-...`)
   - Cost: $1.50 per blog post (BEST quality)

#### Optional (For Advanced Features):
3. **Perplexity API Key** - Get from https://www.perplexity.ai/settings/api
   - Requires Perplexity Pro subscription ($20/month)
   - Cost: $0.005 per research query

4. **Midjourney** - Currently requires unofficial API or Zapier
   - Script will automatically fallback to DALL-E 3
   - No setup needed for fallback

5. **Runway Gen-2** - Get from https://app.runwayml.com/
   - Sign up for account
   - Get API key from settings
   - Cost: $0.05/second of video

6. **ElevenLabs** - Get from https://elevenlabs.io/
   - Sign up for account
   - Get API key from profile settings
   - Cost: $0.30 per 1000 characters

### Step 2: Configure API Keys (1 minute)

**Option A: Environment Variables (Recommended)**

Create `ops/.env.local`:
```bash
# Required
OPENAI_API_KEY=sk-...

# Premium (for best quality)
ANTHROPIC_API_KEY=sk-ant-...

# Optional
PERPLEXITY_API_KEY=pplx-...
RUNWAY_API_KEY=...
ELEVENLABS_API_KEY=...
```

Then load it:
```bash
source ops/.env.local
```

**Option B: Export Directly**
```bash
export OPENAI_API_KEY="sk-..."
export ANTHROPIC_API_KEY="sk-ant-..."
```

### Step 3: Verify Installation (30 seconds)

```bash
# Test the script
python3 ops/scripts/ultimate_content_generator.py --help

# Check it finds your API key
python3 -c "import os; print('✅ OpenAI key found' if os.getenv('OPENAI_API_KEY') else '❌ Set OPENAI_API_KEY')"
```

### Step 4: Generate Your First Content! (2 minutes)

```bash
# Generate a blog post about student collaboration
python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "How AI is Transforming Student Collaboration in Higher Education" \
  --keywords "AI,student collaboration,higher education,edtech" \
  --ai auto \
  --output content/generated/first_blog.json

# Check the output
cat content/generated/first_blog.json | jq '.content.headline'
```

---

## 🎯 Real-World Implementation Examples

### Example 1: Weekly Blog Post Generation

**Automated Workflow:**
```bash
#!/bin/bash
# Save as: ops/workflows/weekly_blog.sh

# Set your API keys
source ops/.env.local

# Topics for the week
TOPICS=(
  "5 Ways AI Enhances Peer Learning in Universities"
  "The Future of Study Groups: Digital Collaboration Tools"
  "How CoStudy Helps Students Achieve Better Grades"
  "Breaking Down Barriers: Inclusive Education Through Technology"
)

# Generate blog posts
for topic in "${TOPICS[@]}"; do
  echo "Generating: $topic"

  python3 ops/scripts/ultimate_content_generator.py blog \
    --topic "$topic" \
    --keywords "education,students,collaboration,AI" \
    --ai claude-opus \
    --output "content/generated/$(echo $topic | sed 's/ /_/g' | cut -c1-50).json"

  echo "✅ Complete"
  sleep 2
done

echo "🎉 All blog posts generated!"
```

**Run it:**
```bash
chmod +x ops/workflows/weekly_blog.sh
./ops/workflows/weekly_blog.sh
```

### Example 2: Complete Content Package for Product Launch

**Full Launch Package:**
```bash
#!/bin/bash
# Save as: ops/workflows/product_launch.sh

FEATURE="Real-time Collaboration Board"
source ops/.env.local

echo "📊 Generating complete content package for: $FEATURE"

# 1. Research first
echo "1/5 Research with Perplexity..."
python3 ops/scripts/ultimate_content_generator.py research \
  --topic "Real-time collaboration tools in education market 2025" \
  --output content/generated/launch_research.json

# 2. Blog post with Claude Opus (best quality)
echo "2/5 Blog post with Claude Opus..."
python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "Introducing CoStudy's $FEATURE: Transform How Students Collaborate" \
  --keywords "real-time collaboration,students,CoStudy,education technology" \
  --ai claude-opus \
  --output content/generated/launch_blog.json

# 3. Hero image with DALL-E 3 HD
echo "3/5 Hero image..."
python3 ops/scripts/ultimate_content_generator.py image \
  --prompt "Students using real-time collaboration board, modern university setting, professional photography" \
  --ai dalle3-hd \
  --output content/generated/launch_hero.json

# 4. Demo video (if Runway API available)
echo "4/5 Demo video..."
if [ -n "$RUNWAY_API_KEY" ]; then
  python3 ops/scripts/ultimate_content_generator.py video \
    --prompt "Real-time collaboration board interface, smooth zoom and pan, students working together" \
    --duration 15 \
    --output content/generated/launch_video.json
else
  echo "⚠️  Skipping video (Runway API key not set)"
fi

# 5. Voiceover narration (if ElevenLabs API available)
echo "5/5 Voiceover..."
if [ -n "$ELEVENLABS_API_KEY" ]; then
  # Extract blog content
  BLOG_TEXT=$(jq -r '.content.introduction + " " + .content.main_content' content/generated/launch_blog.json | head -c 3000)

  python3 ops/scripts/ultimate_content_generator.py voice \
    --text "$BLOG_TEXT" \
    --voice Rachel \
    --output content/generated/launch_narration.mp3
else
  echo "⚠️  Skipping voiceover (ElevenLabs API key not set)"
fi

echo ""
echo "✅ COMPLETE! Content package generated:"
echo "   📄 Research: content/generated/launch_research.json"
echo "   📝 Blog: content/generated/launch_blog.json"
echo "   🎨 Image: content/generated/launch_hero.json"
echo "   🎬 Video: content/generated/launch_video.json (if available)"
echo "   🎤 Voice: content/generated/launch_narration.mp3 (if available)"
```

### Example 3: Social Media Content Batch

**Generate Week's Social Content:**
```bash
#!/bin/bash
# Save as: ops/workflows/social_batch.sh

source ops/.env.local

ANNOUNCEMENTS=(
  "We just hit 10,000 students using CoStudy! 🎉"
  "New feature alert: Real-time collaboration boards are here!"
  "Study tip: The Pomodoro Technique works better in groups"
  "CoStudy helped students improve grades by 23% on average"
  "Join our webinar: Effective Study Groups in the Digital Age"
)

for announcement in "${ANNOUNCEMENTS[@]}"; do
  echo "Creating social pack for: $announcement"

  # Use the premium content generator for social posts
  python3 ops/scripts/content_generator.py social \
    --announcement "$announcement" \
    --platforms "twitter,linkedin,instagram" \
    --output "content/generated/social_$(date +%s).json"

  sleep 1
done

echo "✅ Week's social content ready!"
```

---

## 💡 Smart Implementation Strategies

### Strategy 1: Start with OpenAI Only (Budget Mode)

**Minimum setup:**
```bash
export OPENAI_API_KEY="sk-..."

# Generate good quality content
python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "Your topic" \
  --keywords "keywords" \
  --ai gpt-4-turbo \
  --output blog.json
```

**Cost:** ~$0.80 per blog post
**Quality:** Good (professional, but not award-winning)
**Best for:** High-volume content, internal docs, drafts

### Strategy 2: Add Claude for Premium Quality

**Setup:**
```bash
export OPENAI_API_KEY="sk-..."
export ANTHROPIC_API_KEY="sk-ant-..."

# Get BEST quality content
python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "Your topic" \
  --keywords "keywords" \
  --ai claude-opus \
  --output blog.json
```

**Cost:** ~$1.50 per blog post
**Quality:** Exceptional (award-worthy, engaging)
**Best for:** Public blog posts, marketing content, important announcements

### Strategy 3: Full Stack (Zero Compromises)

**Setup all APIs:**
```bash
export OPENAI_API_KEY="sk-..."
export ANTHROPIC_API_KEY="sk-ant-..."
export PERPLEXITY_API_KEY="pplx-..."
export ELEVENLABS_API_KEY="..."

# Generate complete package
./ops/workflows/product_launch.sh
```

**Cost:** ~$3-5 per complete package
**Quality:** Fortune-100 level
**Best for:** Product launches, major announcements, homepage content

### Strategy 4: Ensemble Mode for Critical Content

**When:** Homepage copy, pricing page, investor pitch
```bash
# Generate with 3 AIs, automatically pick best
python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "CoStudy: Transform How Students Learn Together" \
  --keywords "student collaboration,education,CoStudy" \
  --ensemble \
  --output critical_homepage_copy.json
```

**Cost:** ~$4.50 (3x normal)
**Quality:** Guaranteed best possible
**ROI:** Worth it for critical pages that drive revenue

---

## 🔧 Integration with Your Workflow

### Option 1: Manual Generation

```bash
# Generate when needed
python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "..." \
  --keywords "..." \
  --output blog.json
```

### Option 2: Automated Cron Jobs

```bash
# Edit crontab
crontab -e

# Add weekly blog generation (Monday 9am)
0 9 * * 1 cd /path/to/costudy-website && source ops/.env.local && python3 ops/scripts/ultimate_content_generator.py blog --topic "$(python3 ops/scripts/get_trending_topic.py)" --keywords "education,students" --output "content/generated/weekly_$(date +\%Y\%m\%d).json"

# Add daily social content (Daily 8am)
0 8 * * * cd /path/to/costudy-website && source ops/.env.local && ./ops/workflows/social_batch.sh
```

### Option 3: GitHub Actions (Automated)

Create `.github/workflows/content-generation.yml`:
```yaml
name: Weekly Content Generation

on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday 9am
  workflow_dispatch:  # Manual trigger

jobs:
  generate-content:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'

      - name: Install dependencies
        run: |
          pip install openai anthropic requests

      - name: Generate blog post
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          python3 ops/scripts/ultimate_content_generator.py blog \
            --topic "Weekly Education Technology Insights" \
            --keywords "education,technology,students" \
            --ai claude-opus \
            --output content/generated/weekly_blog.json

      - name: Commit generated content
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add content/generated/
          git commit -m "chore: Weekly content generation"
          git push
```

---

## 📊 Cost Management

### Track Your Spending

**Create cost tracking script:**
```bash
# ops/scripts/track_costs.sh
#!/bin/bash

echo "📊 Content Generation Cost Report"
echo "=================================="
echo ""

# Sum costs from all generated content
total_cost=$(find content/generated -name "*.json" -exec jq -r '.cost // .total_cost // 0' {} + | awk '{s+=$1} END {print s}')

echo "Total spent this month: \$$total_cost"
echo ""

# Break down by content type
echo "By Content Type:"
blog_cost=$(find content/generated -name "*blog*.json" -exec jq -r '.cost // 0' {} + | awk '{s+=$1} END {print s}')
image_cost=$(find content/generated -name "*image*.json" -exec jq -r '.cost // 0' {} + | awk '{s+=$1} END {print s}')
echo "  Blog posts: \$$blog_cost"
echo "  Images: \$$image_cost"
```

### Set Budget Alerts

```bash
# Check if over budget
MONTHLY_BUDGET=200
current_spend=$(find content/generated -name "*.json" -exec jq -r '.cost // 0' {} + | awk '{s+=$1} END {print s}')

if (( $(echo "$current_spend > $MONTHLY_BUDGET" | bc -l) )); then
  echo "⚠️  WARNING: Over budget! Spent: \$$current_spend / \$$MONTHLY_BUDGET"
fi
```

---

## 🚨 Troubleshooting

### Error: "OpenAI API key not found"
```bash
# Make sure it's exported
export OPENAI_API_KEY="sk-..."

# Verify it's set
echo $OPENAI_API_KEY
```

### Error: "Anthropic library not installed"
```bash
pip3 install anthropic
```

### Images not generating (Midjourney)
**Solution:** Midjourney will auto-fallback to DALL-E 3 HD
```bash
# This works without Midjourney API
python3 ops/scripts/ultimate_content_generator.py image \
  --prompt "Your prompt" \
  --ai auto  # Automatically uses DALL-E
```

### Script says "Claude API not available"
**Solution:** Script automatically falls back to GPT-4
```bash
# Either set Claude API key
export ANTHROPIC_API_KEY="sk-ant-..."

# Or explicitly use GPT-4
python3 ops/scripts/ultimate_content_generator.py blog \
  --ai gpt-4-turbo
```

---

## 📈 ROI Calculator for Your Business

**Your Numbers:**
```python
# How much content per month?
blog_posts = 4           # $1.50 each if Claude, $0.80 if GPT-4
images = 10              # $0.08 each (DALL-E HD)
research_reports = 2     # $0.01 each (Perplexity)

# Calculate
blog_cost = blog_posts * 1.50      # $6.00
image_cost = images * 0.08         # $0.80
research_cost = research_reports * 0.01  # $0.02

total_monthly_cost = blog_cost + image_cost + research_cost
# = $6.82

# Time saved
hours_saved = (blog_posts * 5) + (images * 2) + (research_reports * 8)
# = 20 + 20 + 16 = 56 hours

# Value
value_at_50_per_hour = hours_saved * 50
# = $2,800

# ROI
roi = ((value_at_50_per_hour - total_monthly_cost) / total_monthly_cost) * 100
# = 40,940% ROI
```

**Your break-even:** First blog post pays for itself!

---

## ✅ Next Steps

1. **Get API keys** (2 min) - Start with just OpenAI
2. **Set environment variables** (1 min)
3. **Generate first blog post** (2 min)
4. **Add Claude for premium quality** (optional, 2 min)
5. **Set up automated workflows** (10 min)

**Start here:**
```bash
# 1. Get OpenAI API key from platform.openai.com
# 2. Export it
export OPENAI_API_KEY="sk-..."

# 3. Generate your first content
python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "The Future of Student Collaboration" \
  --keywords "students,collaboration,education" \
  --ai auto \
  --output my_first_blog.json

# 4. Check the result
cat my_first_blog.json | jq '.content.headline'
```

---

## 📚 Resources

- **Full Documentation:** `/docs/ULTIMATE_USAGE_GUIDE.md`
- **AI Strategy:** `/docs/ULTIMATE_AI_STACK.md`
- **OpenAI Guide:** `/docs/OPENAI_AUTOMATION.md`
- **Script Help:** `python3 ops/scripts/ultimate_content_generator.py --help`

---

**Ready to generate Fortune-100 level content?** Start with the Quick Implementation above! 🚀
