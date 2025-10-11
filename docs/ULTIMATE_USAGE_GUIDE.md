# Ultimate AI Stack - Usage Guide
## Your Complete Guide to Fortune-100-Level Content Generation

This guide shows you exactly how to use the Ultimate AI Stack for best-in-class content creation.

---

## 🚀 Quick Start

### Step 1: Set Up API Keys

Create a `.env` file in the project root or export these variables:

```bash
# Required for basic functionality
export OPENAI_API_KEY="sk-..."

# Premium AI integrations (optional but recommended)
export ANTHROPIC_API_KEY="sk-ant-..."          # For Claude 3 Opus
export PERPLEXITY_API_KEY="pplx-..."           # For research
export MIDJOURNEY_API_KEY="..."                # For artistic images
export RUNWAY_API_KEY="..."                    # For video generation
export ELEVENLABS_API_KEY="..."                # For voice synthesis

# Midjourney API URL (if using unofficial API service)
export MIDJOURNEY_API_URL="https://api.midjourney.com"
```

### Step 2: Verify Installation

```bash
# Test that the script works
python3 ops/scripts/ultimate_content_generator.py --help

# Check installed packages
pip3 list | grep -E "anthropic|openai"
```

---

## 📝 Content Generation Examples

### 1. Blog Post with Claude 3 Opus (Best Quality)

**Command:**
```bash
python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "How AI is Transforming Student Collaboration in Higher Education" \
  --keywords "AI,student collaboration,higher education,edtech" \
  --ai claude-opus \
  --output blog_ai_collaboration.json
```

**What happens:**
1. ✅ Uses Claude 3 Opus (best for creative, engaging content)
2. ✅ 2-pass generation (draft + refinement)
3. ✅ SEO-optimized with meta descriptions
4. ✅ ~2000 words, award-worthy quality
5. ✅ Cost: ~$1.50 (saves 4-6 hours of writing time)

**Output file structure:**
```json
{
  "content": {
    "headline": "AI-Powered Collaboration: The Future of Higher Education",
    "meta_description": "Discover how AI is revolutionizing student collaboration...",
    "introduction": "...",
    "main_content": "...",
    "key_takeaways": [...],
    "conclusion": "...",
    "seo": {...}
  },
  "ai": "claude-opus",
  "passes": 2,
  "cost": 1.50,
  "tokens": 12000
}
```

### 2. Auto-Select Best AI (Ultimate Mode)

**Command:**
```bash
python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "The Science Behind Effective Study Groups" \
  --keywords "study groups,peer learning,education" \
  --ai auto \
  --output blog_study_groups.json
```

**What happens:**
- Script automatically selects Claude Opus for blog posts (best narrative)
- Falls back to GPT-4 Turbo if Claude API unavailable
- Same 2-pass quality refinement

### 3. Ensemble Mode (3 AIs, Pick Best)

**Command:**
```bash
python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "Future of Online Learning: 2025 Trends" \
  --keywords "online learning,edtech trends,2025" \
  --ensemble \
  --output blog_2025_trends.json
```

**What happens:**
1. Generates blog post with **Claude 3 Opus**
2. Generates same post with **GPT-4 Turbo**
3. Generates research version with **Perplexity Pro**
4. Scores each output (quality, SEO, structure)
5. Returns the BEST one

**Cost:** 3x normal (~$4.50 for blog post)
**Use for:** Critical content (homepage, major announcements)

**Output includes all versions:**
```json
{
  "winner": "claude",
  "content": {...},
  "all_results": [
    ["claude", {...}, 95],
    ["gpt4", {...}, 88],
    ["perplexity", {...}, 82]
  ],
  "ensemble_mode": true,
  "total_cost": 4.50
}
```

---

## 🔍 Research with Perplexity Pro

### Deep Research with Real Citations

**Command:**
```bash
python3 ops/scripts/ultimate_content_generator.py research \
  --topic "Higher Education Technology Market Analysis 2025" \
  --output research_edtech_2025.json
```

**What you get:**
- ✅ Executive summary
- ✅ Current trends with REAL data and dates
- ✅ Expert perspectives with names and titles
- ✅ Competitive landscape
- ✅ Future outlook
- ✅ **Citations and sources for every claim**

**Cost:** ~$0.005 (yes, half a cent!)

**Perfect for:**
- Competitive analysis
- Market research
- Fact-checking blog posts
- Quarterly reports

---

## 🎨 Image Generation

### Option 1: Midjourney v6 (Best Artistic Quality)

**Command:**
```bash
python3 ops/scripts/ultimate_content_generator.py image \
  --prompt "Students collaborating on laptops in modern library" \
  --ai midjourney \
  --output hero_collaboration.json
```

**What happens:**
- Uses Midjourney v6 (best aesthetics, most artistic)
- Automatically enhances prompt with style parameters
- Returns high-quality 16:9 image
- Cost: $0.20 per image

**Note:** Requires unofficial Midjourney API service or Zapier integration

### Option 2: DALL-E 3 HD (Best Realistic Images)

**Command:**
```bash
python3 ops/scripts/ultimate_content_generator.py image \
  --prompt "Professional study group discussion in university setting" \
  --ai dalle3-hd \
  --output product_photo.json
```

**What you get:**
- Photorealistic, professional quality
- HD resolution (1792x1024)
- Natural style, modern aesthetic
- Cost: $0.08 per image

**Use DALL-E when:**
- You need realistic product photos
- Midjourney API not available
- Need quick turnaround

### Auto-Select Best Image AI

```bash
# Script automatically chooses Midjourney (falls back to DALL-E if unavailable)
python3 ops/scripts/ultimate_content_generator.py image \
  --prompt "Your prompt here" \
  --ai auto \
  --output image.json
```

---

## 🎬 Video Generation with Runway Gen-2

**Command:**
```bash
python3 ops/scripts/ultimate_content_generator.py video \
  --prompt "Students using collaborative whiteboard app, smooth zoom in" \
  --duration 10 \
  --output demo_video.json
```

**What you get:**
- Professional 1080p video
- 10 seconds duration
- Smooth camera movement
- Cost: $0.50 (10 sec × $0.05/sec)

**Perfect for:**
- Product demos
- Social media videos
- Website hero sections
- Feature announcements

---

## 🎤 Voice Synthesis with ElevenLabs

**Command:**
```bash
python3 ops/scripts/ultimate_content_generator.py voice \
  --text "$(cat blog_post.txt)" \
  --voice Rachel \
  --output narration.mp3
```

**Available voices:**
- `Rachel` - Professional female (default)
- `Drew` - Professional male
- `Clyde` - Warm, friendly
- `Paul` - Deep, authoritative

**What you get:**
- Ultra-realistic voice narration
- Perfect for podcasts, videos
- Multiple language support
- Cost: $0.45 per 1500-word blog post

**Pro tip:** Generate voice narration for your blog posts automatically!

```bash
# Generate blog post
python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "Your topic" \
  --keywords "keywords" \
  --output blog.json

# Extract text and generate voice
jq -r '.content.main_content' blog.json | \
  python3 ops/scripts/ultimate_content_generator.py voice \
    --text "$(cat -)" \
    --output blog_audio.mp3
```

---

## 🎯 Complete Content Package Workflow

### Full Blog Post + Assets (10 minutes, $3.05)

```bash
#!/bin/bash
# Step 1: Research (Perplexity) - $0.005, 2 min
python3 ops/scripts/ultimate_content_generator.py research \
  --topic "AI in Education 2025" \
  --output research.json

# Step 2: Blog Post (Claude Opus) - $1.50, 3 min
python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "AI in Education: Top 10 Trends for 2025" \
  --keywords "AI,education,edtech,2025" \
  --ai claude-opus \
  --output blog.json

# Step 3: Hero Image (Midjourney) - $0.20, 1 min
python3 ops/scripts/ultimate_content_generator.py image \
  --prompt "Students using AI-powered learning tools, futuristic classroom" \
  --ai midjourney \
  --output hero_image.json

# Step 4: Demo Video (Runway) - $0.75, 2 min
python3 ops/scripts/ultimate_content_generator.py video \
  --prompt "AI tutoring interface, smooth navigation demo" \
  --duration 15 \
  --output demo_video.json

# Step 5: Voiceover (ElevenLabs) - $0.60, 1 min
jq -r '.content.main_content' blog.json | \
  python3 ops/scripts/ultimate_content_generator.py voice \
    --text "$(cat -)" \
    --output narration.mp3

echo "✅ Complete content package generated!"
echo "📊 Total cost: ~$3.05"
echo "⏱️  Total time: ~10 minutes"
echo "💰 Value if outsourced: $1,000+"
echo "🎯 ROI: 32,687%"
```

**What you get:**
- ✅ Research report with citations
- ✅ 2000-word SEO-optimized blog post
- ✅ Hero image (artistic, award-quality)
- ✅ 15-second demo video
- ✅ Audio narration for podcast

**Manual cost:** $1,000+ (writer + designer + video editor + voice talent)
**AI cost:** $3.05
**Time saved:** 10-15 hours
**ROI:** 32,687%

---

## 💡 Best Practices

### 1. Quality vs Cost Trade-offs

**For CRITICAL content** (homepage, pricing page, major launch):
```bash
# Use ensemble mode - 3 AIs, pick best
--ensemble
```

**For PREMIUM content** (weekly blog posts):
```bash
# Use Claude Opus - best quality
--ai claude-opus
```

**For HIGH-VOLUME content** (daily social posts):
```bash
# Use GPT-4 Turbo - good quality, faster, cheaper
--ai gpt-4-turbo
```

### 2. Content Types and Best AI

| Content Type | Best AI | Why | Cost |
|--------------|---------|-----|------|
| **Creative blog posts** | Claude Opus | Better narrative, less corporate | $1.50 |
| **Technical docs** | GPT-4 Turbo | Better structure, code examples | $0.80 |
| **Research reports** | Perplexity Pro | Real citations, current data | $0.005 |
| **Artistic images** | Midjourney | Best aesthetics, artistic quality | $0.20 |
| **Product photos** | DALL-E 3 HD | Best realism, accurate | $0.08 |
| **Videos/GIFs** | Runway Gen-2 | Only viable option | $0.25-1.50 |
| **Voice narration** | ElevenLabs | Most realistic voices | $0.30-0.60 |

### 3. When to Use Auto-Select

Use `--ai auto` when:
- ✅ You want the script to pick the best AI for the task
- ✅ You're batch processing (it adapts per content type)
- ✅ You want to save decision-making time

The script will:
- Choose Claude Opus for blog posts
- Choose Perplexity for research
- Choose Midjourney for images (fallback to DALL-E)
- Choose Runway for video
- Choose ElevenLabs for voice

### 4. Ensemble Mode Strategy

**Use ensemble mode ($3-5 per piece) for:**
- 🎯 Homepage hero copy
- 🎯 Product launch announcements
- 🎯 Pricing page copy
- 🎯 Investor pitch decks
- 🎯 Major partnership announcements

**Don't use ensemble mode for:**
- ❌ Daily social media posts
- ❌ Internal documentation
- ❌ Draft/prototype content
- ❌ High-volume content batches

---

## 🔧 Configuration Tips

### Environment Variables

```bash
# Creativity settings (higher = more creative)
export CREATIVITY_TEMP="0.9"   # For blog posts, social
export PRECISION_TEMP="0.3"    # For refinement, technical

# Quality mode
export QUALITY_MODE="ultimate"  # ultimate | premium | standard

# Cost tracking
export TRACK_COSTS="true"
export MONTHLY_BUDGET="500"     # Alert if exceeded
```

### Custom Brand Voice

The script automatically loads `ops/prompts/brand_voice.md` if available.

**Create custom brand voice:**
```bash
# ops/prompts/brand_voice.md
CoStudy Brand Voice:
- Friendly, approachable, empowering
- Focus on student success and collaboration
- Data-driven but not academic
- Action-oriented with specific examples
- Avoid: corporate-speak, jargon, passive voice
```

---

## 📊 Cost Tracking

### View Total Costs

The script automatically tracks costs in output JSON:

```bash
# After generating content, check cost
jq '.cost' blog.json
# Output: 1.50

# For ensemble mode, check total
jq '.total_cost' ensemble_result.json
# Output: 4.50
```

### Monthly Cost Tracking

```bash
# Sum all costs from output files
find content/generated -name "*.json" -exec jq -r '.cost // .total_cost' {} + | \
  awk '{s+=$1} END {print "Total spent: $" s}'
```

---

## 🚨 Troubleshooting

### Error: "Anthropic library not installed"

```bash
pip3 install anthropic
```

### Error: "Claude API not available, falling back to GPT-4"

```bash
# Set your Anthropic API key
export ANTHROPIC_API_KEY="sk-ant-..."
```

### Error: "Perplexity API key required"

```bash
# Get API key from https://www.perplexity.ai/settings/api
export PERPLEXITY_API_KEY="pplx-..."
```

### Error: "Midjourney API requires unofficial service"

Midjourney doesn't have official API. Options:
1. Use unofficial API service (https://github.com/erictik/midjourney-api)
2. Use Zapier integration
3. Let script fallback to DALL-E 3 HD (automatic)

```bash
# Script will automatically fallback to DALL-E if Midjourney unavailable
⚠️  Midjourney API requires unofficial service or Zapier
   Falling back to DALL-E 3 HD...
```

---

## 📈 ROI Calculator

### Calculate Your ROI

```python
# Your actual usage (example)
blog_posts_per_month = 4      # $1.50 each = $6
images_per_month = 10         # $0.20 each = $2
videos_per_month = 2          # $1.00 each = $2
research_per_month = 2        # $0.01 each = $0.02
voiceovers_per_month = 4      # $0.45 each = $1.80

# Total monthly cost
total_cost = 6 + 2 + 2 + 0.02 + 1.80  # $11.82

# Time saved
hours_saved = (4 * 5) + (10 * 2) + (2 * 3) + (2 * 8) + (4 * 1)
# = 20 + 20 + 6 + 16 + 4 = 66 hours

# Value of time
value_at_50_per_hour = 66 * 50  # $3,300

# ROI
roi = ((value_at_50_per_hour - total_cost) / total_cost) * 100
# = 27,813%
```

**Break-even analysis:**
- If you create just **1 blog post per month**, you save $248.50 ($250 value - $1.50 cost)
- Break-even after **first use**
- Everything else is pure savings

---

## 🎓 Advanced Usage

### Batch Processing

```bash
# Generate 10 blog posts from topics file
while IFS= read -r topic; do
  python3 ops/scripts/ultimate_content_generator.py blog \
    --topic "$topic" \
    --keywords "education,students,collaboration" \
    --ai claude-opus \
    --output "content/blog_$(echo $topic | sed 's/ /_/g').json"
done < topics.txt
```

### API Integration

```python
# Use as Python library
from ops.scripts.ultimate_content_generator import UltimateContentGenerator

generator = UltimateContentGenerator()

# Generate blog post
result = generator.generate_blog_claude(
    topic="Student Engagement Strategies",
    keywords=["engagement", "students", "motivation"]
)

print(f"Blog post generated! Cost: ${result['cost']:.2f}")
```

### Automated Workflows

```bash
# Cron job: Generate weekly blog post every Monday 9am
0 9 * * 1 cd /path/to/project && python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "$(python3 ops/scripts/get_trending_topic.py)" \
  --keywords "education,students" \
  --ai claude-opus \
  --output "content/weekly_$(date +%Y%m%d).json"
```

---

## 📚 Quick Reference

| Command | Purpose | Best AI | Cost | Time |
|---------|---------|---------|------|------|
| `blog --ai claude-opus` | Creative blog post | Claude 3 Opus | $1.50 | 3 min |
| `blog --ai gpt-4-turbo` | Technical blog post | GPT-4 Turbo | $0.80 | 2 min |
| `blog --ensemble` | Best-of-3 blog | Claude/GPT/Perplexity | $4.50 | 5 min |
| `research` | Deep research | Perplexity Pro | $0.01 | 2 min |
| `image --ai midjourney` | Artistic image | Midjourney v6 | $0.20 | 1 min |
| `image --ai dalle3-hd` | Realistic image | DALL-E 3 HD | $0.08 | 30 sec |
| `video --duration 15` | Demo video | Runway Gen-2 | $0.75 | 2 min |
| `voice --text "..."` | Voiceover | ElevenLabs | $0.45 | 1 min |

---

## 🔮 Coming Soon

- **GPT-5 integration** (when available)
- **Suno AI** for music generation
- **Automatic social media posting**
- **Content calendar integration**
- **A/B testing mode** (generate variations)
- **Multi-language support**

---

## 📞 Support

- **Documentation**: `/docs/ULTIMATE_AI_STACK.md`
- **API Setup**: `/docs/OPENAI_AUTOMATION.md`
- **Issues**: Create GitHub issue with `ai-stack` label

---

**Last Updated**: 2025-10-11
**Status**: ✅ Production-ready
**Philosophy**: ZERO COMPROMISES - Use the best AI for every task

---

**TL;DR**: This is how Fortune-100 companies create content. Each task gets the #1 AI for that specific job. Cost: $3-5 per complete content package. ROI: 10,000%+. Time saved: 90%+.
