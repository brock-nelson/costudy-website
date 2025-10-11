#!/usr/bin/env python3
"""
ULTIMATE Fortune-100 Content Generator
Uses BEST-IN-CLASS AI for every task - zero compromises

Integrates:
- Claude 3 Opus (Anthropic) - Best long-form writing
- GPT-4 Turbo (OpenAI) - Best technical content
- Perplexity Pro - Best research with citations
- DALL-E 3 HD - Best realistic images
- Midjourney v6 - Best artistic images
- Runway Gen-2 - Best video generation
- ElevenLabs - Best voice synthesis

Features:
- Auto-selects best AI for each task
- Multi-AI ensemble mode (generate with 3 AIs, pick best)
- Quality scoring and validation
- Comprehensive cost tracking

Usage:
    # Ultimate mode (auto-selects best AI)
    python ultimate_content_generator.py blog --topic "Your Topic" --mode ultimate

    # Ensemble mode (use 3 AIs, pick best)
    python ultimate_content_generator.py blog --topic "Your Topic" --ensemble

    # Specific AI
    python ultimate_content_generator.py blog --topic "Your Topic" --ai claude-opus
"""

import os
import sys
import json
import argparse
import requests
from datetime import datetime
from typing import Dict, List, Optional, Tuple
from openai import OpenAI

try:
    from anthropic import Anthropic
    ANTHROPIC_AVAILABLE = True
except ImportError:
    ANTHROPIC_AVAILABLE = False
    print("⚠️  Anthropic library not installed. Run: pip install anthropic")

# API Keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")
MIDJOURNEY_API_KEY = os.getenv("MIDJOURNEY_API_KEY")
RUNWAY_API_KEY = os.getenv("RUNWAY_API_KEY")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")

# Cost tracking (per 1K tokens or per unit)
COSTS = {
    "claude-opus": {"input": 0.015, "output": 0.075},  # Most expensive, best quality
    "gpt-4-turbo": {"input": 0.01, "output": 0.03},
    "perplexity": {"input": 0.001, "output": 0.001},
    "dalle3-hd": 0.08,  # per image
    "dalle3-std": 0.04,
    "midjourney": 0.20,  # fast mode
    "runway": 0.05,  # per second
    "elevenlabs": 0.0003,  # per character
}

class UltimateContentGenerator:
    """The ULTIMATE content generator - best AI for every task."""

    def __init__(self):
        self.openai_client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None
        self.anthropic_client = Anthropic(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_AVAILABLE and ANTHROPIC_API_KEY else None
        self.total_cost = 0.0

    def select_best_ai(self, task_type: str, mode: str = "ultimate") -> str:
        """Auto-select the best AI for the task."""

        if mode == "budget":
            return {
                "blog": "gpt-4-turbo",
                "research": "perplexity",
                "image": "dalle3-std",
                "social": "gpt-4-turbo"
            }.get(task_type, "gpt-4-turbo")

        # Ultimate mode - best for each task
        best_ai = {
            "blog": "claude-opus",  # Better narrative
            "technical": "gpt-4-turbo",  # Better code/structure
            "research": "perplexity",  # Real citations
            "image-artistic": "midjourney",  # Best aesthetics
            "image-realistic": "dalle3-hd",  # Best photos
            "video": "runway",  # Only good option
            "voice": "elevenlabs",  # Most realistic
            "social": "gpt-4-turbo"  # Good and fast
        }

        return best_ai.get(task_type, "gpt-4-turbo")

    def generate_blog_claude(self, topic: str, keywords: List[str], target_length: int = 2000) -> Dict:
        """Generate blog post with Claude 3 Opus - BEST for creative content."""

        print(f"📝 Using Claude 3 Opus (best for creative content)...")

        if not self.anthropic_client:
            print("❌ Claude API not available, falling back to GPT-4")
            return self.generate_blog_gpt4(topic, keywords, target_length)

        brand_voice = self._load_brand_voice()

        prompt = f"""Write an EXCEPTIONAL blog post for CoStudy's Fortune-100-level content marketing.

Topic: {topic}
Target Keywords: {', '.join(keywords)}
Target Length: {target_length} words

{brand_voice}

Create a blog post that would win industry awards. Include:

1. Compelling headline (60-70 chars, keyword-optimized)
2. Meta description (150-160 chars, compelling CTA)
3. Engaging introduction (hook immediately, state problem, preview solution)
4. Well-structured main content with H2/H3 headings
5. Data-driven insights with specific examples
6. Key takeaways (bulleted, actionable)
7. Strong conclusion with clear CTA
8. SEO metadata (slug, focus keyphrase, related keywords)

Make it:
- Engaging and conversational (not corporate-speak)
- Data-driven with real insights
- Actionable with specific steps
- SEO-optimized naturally
- Award-worthy quality

Format as JSON with all required fields."""

        # FIRST PASS with Claude
        print("   Pass 1: Claude Opus draft...")
        response = self.anthropic_client.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=8000,
            temperature=0.9,  # High creativity
            messages=[{
                "role": "user",
                "content": prompt
            }]
        )

        content = response.content[0].text
        input_tokens = response.usage.input_tokens
        output_tokens = response.usage.output_tokens

        cost = self._calculate_cost_anthropic(input_tokens, output_tokens)
        self.total_cost += cost

        print(f"   ✅ Claude draft complete ({output_tokens} tokens, ${cost:.4f})")

        # SECOND PASS: Refinement with Claude
        print("   Pass 2: Claude Opus refinement...")

        refinement = self.anthropic_client.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=8000,
            temperature=0.3,  # More precise
            messages=[{
                "role": "user",
                "content": f"""You are a senior editor at a Fortune 100 company.

Review and ELEVATE this blog post to award-winning quality:

{content}

Make it:
- More compelling and engaging
- Better structured for skimmability
- More actionable with specific examples
- Perfectly optimized for SEO
- Publication-ready, zero AI feel

Return improved version in same JSON format."""
            }]
        )

        refined_content = refinement.content[0].text
        refine_cost = self._calculate_cost_anthropic(
            refinement.usage.input_tokens,
            refinement.usage.output_tokens
        )
        self.total_cost += refine_cost
        cost += refine_cost

        print(f"   ✅ Claude refinement complete (+${refine_cost:.4f})")
        print(f"   🎯 TOTAL: ${cost:.4f} (2-pass Claude Opus)")

        return {
            "content": self._parse_json_safely(refined_content),
            "ai": "claude-opus",
            "passes": 2,
            "cost": cost,
            "tokens": input_tokens + output_tokens + refinement.usage.input_tokens + refinement.usage.output_tokens
        }

    def generate_research_perplexity(self, topic: str) -> Dict:
        """Research with Perplexity Pro - BEST for citations."""

        print(f"🔍 Using Perplexity Pro (best for research with citations)...")

        if not PERPLEXITY_API_KEY:
            print("❌ Perplexity API not available")
            return {"error": "Perplexity API key required"}

        prompt = f"""Conduct comprehensive research on: {topic}

Provide:
1. Executive summary (200 words)
2. Current trends and statistics (with specific numbers and dates)
3. Key challenges and opportunities
4. Expert perspectives (with names and titles)
5. Best practices and recommendations
6. Competitive landscape analysis
7. Future outlook

IMPORTANT: Include citations and sources for all claims."""

        response = requests.post(
            "https://api.perplexity.ai/chat/completions",
            headers={
                "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "pplx-70b-online",  # Online search enabled
                "messages": [{
                    "role": "user",
                    "content": prompt
                }],
                "max_tokens": 4000
            }
        )

        if response.status_code != 200:
            print(f"❌ Perplexity API error: {response.status_code}")
            return {"error": response.text}

        data = response.json()
        content = data['choices'][0]['message']['content']
        citations = data.get('citations', [])

        cost = 0.005  # Approximate per query
        self.total_cost += cost

        print(f"   ✅ Research complete with {len(citations)} citations (${cost:.4f})")

        return {
            "research": content,
            "citations": citations,
            "ai": "perplexity-pro",
            "cost": cost
        }

    def generate_image_midjourney(self, prompt: str) -> Dict:
        """Generate image with Midjourney - BEST for artistic quality."""

        print(f"🎨 Using Midjourney v6 (best for artistic images)...")

        if not MIDJOURNEY_API_KEY:
            print("⚠️  Midjourney API requires unofficial service or Zapier")
            print("   Falling back to DALL-E 3 HD...")
            return self.generate_image_dalle(prompt, quality="hd")

        # Enhanced prompt with style parameters
        enhanced_prompt = f"""{prompt}, modern professional educational technology,
inspiring collaborative, award-winning photography, sophisticated color palette,
high detail, rule of thirds composition --ar 16:9 --style raw --v 6"""

        # Note: This requires unofficial Midjourney API service
        # Example: https://github.com/erictik/midjourney-api
        try:
            response = requests.post(
                f"{os.getenv('MIDJOURNEY_API_URL', 'https://api.midjourney.com')}/imagine",
                headers={"Authorization": f"Bearer {MIDJOURNEY_API_KEY}"},
                json={"prompt": enhanced_prompt}
            )

            if response.status_code == 200:
                data = response.json()
                cost = 0.20  # Fast mode
                self.total_cost += cost

                print(f"   ✅ Midjourney image generated (${cost:.4f})")

                return {
                    "url": data.get("image_url"),
                    "prompt": enhanced_prompt,
                    "ai": "midjourney-v6",
                    "cost": cost
                }
        except Exception as e:
            print(f"   ⚠️  Midjourney error: {e}, falling back to DALL-E 3...")

        return self.generate_image_dalle(prompt, quality="hd")

    def generate_image_dalle(self, prompt: str, quality: str = "hd") -> Dict:
        """Generate image with DALL-E 3 - BEST for realistic images."""

        print(f"🎨 Using DALL-E 3 {quality.upper()} (best for realistic images)...")

        enhanced_prompt = f"""{prompt}

PREMIUM QUALITY: Award-winning photography, professional lighting,
sophisticated color palette, high detail, modern educational technology aesthetic,
inspiring collaborative mood, Fortune-100 marketing quality"""

        response = self.openai_client.images.generate(
            model="dall-e-3",
            prompt=enhanced_prompt,
            size="1792x1024",
            quality=quality,
            style="natural",
            n=1
        )

        cost = 0.08 if quality == "hd" else 0.04
        self.total_cost += cost

        print(f"   ✅ DALL-E 3 {quality.upper()} image generated (${cost:.4f})")

        return {
            "url": response.data[0].url,
            "revised_prompt": response.data[0].revised_prompt,
            "ai": f"dalle3-{quality}",
            "cost": cost,
            "quality": quality
        }

    def generate_video_runway(self, prompt: str, duration: int = 5) -> Dict:
        """Generate video with Runway Gen-2 - BEST (only) option."""

        print(f"🎬 Using Runway Gen-2 (video generation, {duration}sec)...")

        if not RUNWAY_API_KEY:
            print("❌ Runway API key required for video generation")
            return {"error": "Runway API key required"}

        enhanced_prompt = f"""{prompt}, professional quality, smooth camera movement,
modern educational technology, inspiring collaborative atmosphere, 4K quality"""

        try:
            response = requests.post(
                "https://api.runwayml.com/v1/generate",
                headers={
                    "Authorization": f"Bearer {RUNWAY_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "prompt": enhanced_prompt,
                    "duration": duration,
                    "resolution": "1920x1080"
                }
            )

            if response.status_code == 200:
                data = response.json()
                cost = duration * 0.05  # $0.05 per second
                self.total_cost += cost

                print(f"   ✅ Runway video generated ({duration}sec, ${cost:.4f})")

                return {
                    "video_url": data.get("video_url"),
                    "duration": duration,
                    "ai": "runway-gen2",
                    "cost": cost
                }
        except Exception as e:
            print(f"   ❌ Runway error: {e}")

        return {"error": "Video generation failed"}

    def generate_voice_elevenlabs(self, text: str, voice: str = "Rachel") -> Dict:
        """Generate voice with ElevenLabs - BEST voice synthesis."""

        print(f"🎤 Using ElevenLabs (best voice synthesis, voice: {voice})...")

        if not ELEVENLABS_API_KEY:
            print("❌ ElevenLabs API key required")
            return {"error": "ElevenLabs API key required"}

        try:
            response = requests.post(
                f"https://api.elevenlabs.io/v1/text-to-speech/{voice}",
                headers={
                    "Authorization": f"Bearer {ELEVENLABS_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "text": text,
                    "model_id": "eleven_monolingual_v1",
                    "voice_settings": {
                        "stability": 0.5,
                        "similarity_boost": 0.75
                    }
                }
            )

            if response.status_code == 200:
                audio_data = response.content
                cost = len(text) * 0.0003
                self.total_cost += cost

                print(f"   ✅ Voice generated ({len(text)} chars, ${cost:.4f})")

                return {
                    "audio_data": audio_data,
                    "text_length": len(text),
                    "ai": "elevenlabs",
                    "voice": voice,
                    "cost": cost
                }
        except Exception as e:
            print(f"   ❌ ElevenLabs error: {e}")

        return {"error": "Voice generation failed"}

    def generate_blog_gpt4(self, topic: str, keywords: List[str], target_length: int = 2000) -> Dict:
        """Fallback: Generate blog with GPT-4 Turbo."""

        print(f"📝 Using GPT-4 Turbo (technical content)...")

        if not self.openai_client:
            return {"error": "OpenAI API key required"}

        brand_voice = self._load_brand_voice()

        prompt = f"""Write an EXCEPTIONAL blog post for CoStudy's Fortune-100-level content marketing.

Topic: {topic}
Target Keywords: {', '.join(keywords)}
Target Length: {target_length} words

{brand_voice}

Create a blog post that would win industry awards. Include:

1. Compelling headline (60-70 chars, keyword-optimized)
2. Meta description (150-160 chars, compelling CTA)
3. Engaging introduction (hook immediately, state problem, preview solution)
4. Well-structured main content with H2/H3 headings
5. Data-driven insights with specific examples
6. Key takeaways (bulleted, actionable)
7. Strong conclusion with clear CTA
8. SEO metadata (slug, focus keyphrase, related keywords)

Make it:
- Engaging and conversational (not corporate-speak)
- Data-driven with real insights
- Actionable with specific steps
- SEO-optimized naturally
- Award-worthy quality

Format as JSON with all required fields."""

        # FIRST PASS with GPT-4
        print("   Pass 1: GPT-4 Turbo draft...")
        response = self.openai_client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "You are a WORLD-CLASS content marketer for Fortune-100 companies."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.9,
            max_tokens=8000
        )

        content = response.choices[0].message.content
        input_tokens = response.usage.prompt_tokens
        output_tokens = response.usage.completion_tokens

        cost = self._calculate_cost_openai(input_tokens, output_tokens)
        self.total_cost += cost

        print(f"   ✅ GPT-4 draft complete ({output_tokens} tokens, ${cost:.4f})")

        # SECOND PASS: Refinement
        print("   Pass 2: GPT-4 Turbo refinement...")

        refinement = self.openai_client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "You are a senior editor at a Fortune 100 company."},
                {"role": "user", "content": f"""Review and ELEVATE this blog post to award-winning quality:

{content}

Make it:
- More compelling and engaging
- Better structured for skimmability
- More actionable with specific examples
- Perfectly optimized for SEO
- Publication-ready, zero AI feel

Return improved version in same JSON format."""}
            ],
            temperature=0.3,
            max_tokens=8000
        )

        refined_content = refinement.choices[0].message.content
        refine_cost = self._calculate_cost_openai(
            refinement.usage.prompt_tokens,
            refinement.usage.completion_tokens
        )
        self.total_cost += refine_cost
        cost += refine_cost

        print(f"   ✅ GPT-4 refinement complete (+${refine_cost:.4f})")
        print(f"   🎯 TOTAL: ${cost:.4f} (2-pass GPT-4 Turbo)")

        return {
            "content": self._parse_json_safely(refined_content),
            "ai": "gpt-4-turbo",
            "passes": 2,
            "cost": cost,
            "tokens": input_tokens + output_tokens + refinement.usage.prompt_tokens + refinement.usage.completion_tokens
        }

    def ensemble_generate(self, content_type: str, **kwargs) -> Dict:
        """ENSEMBLE MODE: Generate with 3 AIs, pick best."""

        print(f"\n🎯 ENSEMBLE MODE: Generating with 3 different AIs...")
        print("=" * 60)

        results = []

        if content_type == "blog":
            topic = kwargs.get("topic")
            keywords = kwargs.get("keywords", [])

            # Generate with Claude
            print("\n1️⃣  Generating with Claude 3 Opus...")
            claude_result = self.generate_blog_claude(topic, keywords)
            results.append(("claude", claude_result))

            # Generate with GPT-4
            print("\n2️⃣  Generating with GPT-4 Turbo...")
            gpt4_result = self.generate_blog_gpt4(topic, keywords)
            results.append(("gpt4", gpt4_result))

            # Generate with Perplexity (research-based)
            print("\n3️⃣  Generating research-backed version with Perplexity...")
            perplexity_result = self.generate_research_perplexity(topic)
            results.append(("perplexity", perplexity_result))

        # Score each output
        print("\n📊 Scoring outputs...")
        scored_results = []
        for ai_name, result in results:
            score = self._score_content(result, content_type)
            scored_results.append((ai_name, result, score))
            print(f"   {ai_name}: {score}/100")

        # Pick best
        best = max(scored_results, key=lambda x: x[2])
        winner_name, winner_result, winner_score = best

        print(f"\n🏆 WINNER: {winner_name} (score: {winner_score}/100)")
        print("=" * 60)

        return {
            "winner": winner_name,
            "content": winner_result,
            "all_results": scored_results,
            "ensemble_mode": True,
            "total_cost": self.total_cost
        }

    def _score_content(self, content: Dict, content_type: str) -> int:
        """Score content quality (1-100)."""
        # Simplified scoring - in production, use more sophisticated metrics
        score = 80  # Base score

        if content_type == "blog":
            if "content" in content:
                content_data = content.get("content", {})
                # Check for key elements
                if content_data.get("headline"): score += 5
                if content_data.get("key_takeaways"): score += 5
                if len(str(content_data)) > 2000: score += 5
                if content_data.get("seo_score", 0) > 85: score += 5

        return min(score, 100)

    def _calculate_cost_anthropic(self, input_tokens: int, output_tokens: int) -> float:
        """Calculate cost for Anthropic API."""
        input_cost = (input_tokens / 1000) * COSTS["claude-opus"]["input"]
        output_cost = (output_tokens / 1000) * COSTS["claude-opus"]["output"]
        return input_cost + output_cost

    def _calculate_cost_openai(self, input_tokens: int, output_tokens: int) -> float:
        """Calculate cost for OpenAI API."""
        input_cost = (input_tokens / 1000) * COSTS["gpt-4-turbo"]["input"]
        output_cost = (output_tokens / 1000) * COSTS["gpt-4-turbo"]["output"]
        return input_cost + output_cost

    def _load_brand_voice(self) -> str:
        """Load brand voice guidelines."""
        try:
            with open("ops/prompts/brand_voice.md", "r") as f:
                return f.read()
        except FileNotFoundError:
            return "Professional, friendly, educational tone."

    def _parse_json_safely(self, text: str) -> Dict:
        """Parse JSON from AI output safely."""
        try:
            # Try to find JSON in markdown code blocks
            if "```json" in text:
                start = text.index("```json") + 7
                end = text.index("```", start)
                text = text[start:end]
            elif "```" in text:
                start = text.index("```") + 3
                end = text.index("```", start)
                text = text[start:end]

            return json.loads(text.strip())
        except:
            # If JSON parsing fails, return raw text
            return {"raw_content": text}


def main():
    parser = argparse.ArgumentParser(description="Ultimate Fortune-100 Content Generator")
    subparsers = parser.add_subparsers(dest="command", help="Content type")

    # Blog post
    blog_parser = subparsers.add_parser("blog", help="Generate blog post")
    blog_parser.add_argument("--topic", required=True)
    blog_parser.add_argument("--keywords", required=True)
    blog_parser.add_argument("--ai", choices=["claude-opus", "gpt-4-turbo", "auto"], default="auto")
    blog_parser.add_argument("--ensemble", action="store_true", help="Use 3 AIs, pick best")
    blog_parser.add_argument("--output", default="blog.json")

    # Research
    research_parser = subparsers.add_parser("research", help="Deep research")
    research_parser.add_argument("--topic", required=True)
    research_parser.add_argument("--output", default="research.json")

    # Image
    image_parser = subparsers.add_parser("image", help="Generate image")
    image_parser.add_argument("--prompt", required=True)
    image_parser.add_argument("--ai", choices=["midjourney", "dalle3-hd", "dalle3-std", "auto"], default="auto")
    image_parser.add_argument("--output", default="image.json")

    # Video
    video_parser = subparsers.add_parser("video", help="Generate video")
    video_parser.add_argument("--prompt", required=True)
    video_parser.add_argument("--duration", type=int, default=5)
    video_parser.add_argument("--output", default="video.json")

    # Voice
    voice_parser = subparsers.add_parser("voice", help="Generate voiceover")
    voice_parser.add_argument("--text", required=True)
    voice_parser.add_argument("--voice", default="Rachel")
    voice_parser.add_argument("--output", default="audio.mp3")

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(1)

    generator = UltimateContentGenerator()

    try:
        if args.command == "blog":
            keywords = args.keywords.split(",")

            if args.ensemble:
                result = generator.ensemble_generate("blog", topic=args.topic, keywords=keywords)
            elif args.ai == "claude-opus" or args.ai == "auto":
                result = generator.generate_blog_claude(args.topic, keywords)
            else:
                result = generator.generate_blog_gpt4(args.topic, keywords)

        elif args.command == "research":
            result = generator.generate_research_perplexity(args.topic)

        elif args.command == "image":
            if args.ai == "midjourney" or args.ai == "auto":
                result = generator.generate_image_midjourney(args.prompt)
            else:
                quality = "hd" if args.ai == "dalle3-hd" else "standard"
                result = generator.generate_image_dalle(args.prompt, quality)

        elif args.command == "video":
            result = generator.generate_video_runway(args.prompt, args.duration)

        elif args.command == "voice":
            result = generator.generate_voice_elevenlabs(args.text, args.voice)

        # Save output
        with open(args.output, "w") as f:
            json.dump(result, f, indent=2)

        print(f"\n✅ Content saved to: {args.output}")
        print(f"💰 Total cost: ${generator.total_cost:.4f}")
        print(f"🏆 AI used: {result.get('ai', 'multiple')}")

    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
