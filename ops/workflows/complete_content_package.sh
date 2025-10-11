#!/bin/bash
# Complete Content Package Generator
# Generates: Research + Blog + Image + Video + Voice for any topic
# Usage: ./complete_content_package.sh "Your Topic Here"

set -e

TOPIC=$1

if [ -z "$TOPIC" ]; then
  echo "❌ Error: Please provide a topic"
  echo "Usage: ./complete_content_package.sh \"Your Topic\""
  exit 1
fi

# Load environment variables if available
if [ -f "ops/.env.local" ]; then
  source ops/.env.local
fi

# Create output directory
OUTPUT_DIR="content/generated/$(date +%Y%m%d)_$(echo $TOPIC | sed 's/ /_/g' | cut -c1-30)"
mkdir -p "$OUTPUT_DIR"

echo "🚀 Generating complete content package for: $TOPIC"
echo "📁 Output directory: $OUTPUT_DIR"
echo "=================================="
echo ""

# Step 1: Research (if Perplexity API available)
if [ -n "$PERPLEXITY_API_KEY" ]; then
  echo "1/5 🔍 Conducting research with Perplexity Pro..."
  python3 ops/scripts/ultimate_content_generator.py research \
    --topic "$TOPIC" \
    --output "$OUTPUT_DIR/research.json"
  echo "✅ Research complete"
  echo ""
else
  echo "1/5 ⏭️  Skipping research (Perplexity API key not set)"
  echo ""
fi

# Step 2: Blog Post (Claude Opus if available, GPT-4 otherwise)
echo "2/5 📝 Writing blog post..."
if [ -n "$ANTHROPIC_API_KEY" ]; then
  echo "   Using Claude 3 Opus (best quality)"
  AI_CHOICE="claude-opus"
else
  echo "   Using GPT-4 Turbo"
  AI_CHOICE="gpt-4-turbo"
fi

python3 ops/scripts/ultimate_content_generator.py blog \
  --topic "$TOPIC" \
  --keywords "education,students,collaboration,CoStudy" \
  --ai "$AI_CHOICE" \
  --output "$OUTPUT_DIR/blog_post.json"
echo "✅ Blog post complete"
echo ""

# Step 3: Hero Image (Midjourney if available, DALL-E otherwise)
echo "3/5 🎨 Generating hero image..."
HEADLINE=$(jq -r '.content.headline // "Professional image"' "$OUTPUT_DIR/blog_post.json")
python3 ops/scripts/ultimate_content_generator.py image \
  --prompt "$HEADLINE - modern, professional, educational setting" \
  --ai auto \
  --output "$OUTPUT_DIR/hero_image.json"
echo "✅ Image complete"
echo ""

# Step 4: Demo Video (if Runway API available)
if [ -n "$RUNWAY_API_KEY" ]; then
  echo "4/5 🎬 Generating demo video with Runway Gen-2..."
  python3 ops/scripts/ultimate_content_generator.py video \
    --prompt "Students collaborating, $TOPIC demonstration, professional quality" \
    --duration 10 \
    --output "$OUTPUT_DIR/demo_video.json"
  echo "✅ Video complete"
  echo ""
else
  echo "4/5 ⏭️  Skipping video (Runway API key not set)"
  echo ""
fi

# Step 5: Voice Narration (if ElevenLabs API available)
if [ -n "$ELEVENLABS_API_KEY" ]; then
  echo "5/5 🎤 Generating voice narration with ElevenLabs..."

  # Extract blog content (first 3000 chars for ~2 min narration)
  BLOG_TEXT=$(jq -r '.content.introduction + " " + .content.main_content' "$OUTPUT_DIR/blog_post.json" | head -c 3000)

  python3 ops/scripts/ultimate_content_generator.py voice \
    --text "$BLOG_TEXT" \
    --voice Rachel \
    --output "$OUTPUT_DIR/narration.mp3"
  echo "✅ Narration complete"
  echo ""
else
  echo "5/5 ⏭️  Skipping voice (ElevenLabs API key not set)"
  echo ""
fi

# Calculate total cost
echo "=================================="
echo "🎉 COMPLETE! Content package generated:"
echo ""
echo "📄 Files created:"
if [ -f "$OUTPUT_DIR/research.json" ]; then
  echo "   ✅ research.json - Market research with citations"
fi
echo "   ✅ blog_post.json - SEO-optimized blog post"
echo "   ✅ hero_image.json - Professional hero image"
if [ -f "$OUTPUT_DIR/demo_video.json" ]; then
  echo "   ✅ demo_video.json - Demo video"
fi
if [ -f "$OUTPUT_DIR/narration.mp3" ]; then
  echo "   ✅ narration.mp3 - Voice narration"
fi

echo ""
echo "💰 Total cost:"
find "$OUTPUT_DIR" -name "*.json" -exec jq -r '.cost // .total_cost // 0' {} + | \
  awk '{s+=$1} END {printf "   $%.2f\n", s}'

echo ""
echo "📁 Location: $OUTPUT_DIR"
echo ""
echo "🎯 Next steps:"
echo "   1. Review blog_post.json for content"
echo "   2. Download image from hero_image.json URL"
echo "   3. Review and publish to your website"
