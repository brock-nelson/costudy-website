#!/usr/bin/env python3
"""
Automated Content Generation System

Uses OpenAI GPT-4o and DALL-E for automated content creation.
Perfect for Fortune-100-level marketing automation.

Features:
- Blog post generation with SEO optimization
- Social media content (Twitter, LinkedIn, Instagram)
- Image generation with DALL-E 3
- Research summaries and competitive analysis
- Epic/user story generation
- Email campaigns
- Ad copy creation

Usage:
    # Generate blog post
    python content_generator.py blog --topic "Student Collaboration Tools" --keywords "teamwork,education"

    # Generate social media pack
    python content_generator.py social --announcement "New feature launch"

    # Generate images
    python content_generator.py image --prompt "Students collaborating on laptops" --style "modern,professional"

    # Deep research
    python content_generator.py research --topic "Higher Education Trends 2025"
"""

import os
import sys
import json
import argparse
from datetime import datetime
from typing import Dict, List, Optional
from openai import OpenAI

# Configuration - PREMIUM QUALITY SETTINGS
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4-turbo-preview")  # Full GPT-4, not optimized
OPENAI_MAX_TOKENS = int(os.getenv("OPENAI_MAX_TOKENS", "8000"))  # 2x longer for quality
ENABLE_REFINEMENT = os.getenv("ENABLE_REFINEMENT", "true").lower() == "true"
QUALITY_MODE = os.getenv("QUALITY_MODE", "premium").lower()  # premium, standard, budget

# Cost tracking - PREMIUM MODELS
COST_PER_1K_INPUT = 0.01     # GPT-4 Turbo input
COST_PER_1K_OUTPUT = 0.03    # GPT-4 Turbo output
COST_PER_IMAGE_HD = 0.08     # DALL-E 3 HD quality
COST_PER_IMAGE_STD = 0.04    # DALL-E 3 standard

# Quality settings
IMAGE_QUALITY = "hd" if QUALITY_MODE == "premium" else "standard"
CREATIVITY_TEMP = 0.9 if QUALITY_MODE == "premium" else 0.7
PRECISION_TEMP = 0.3 if QUALITY_MODE == "premium" else 0.5

class ContentGenerator:
    """Main content generation orchestrator."""

    def __init__(self, api_key: str = None):
        self.api_key = api_key or OPENAI_API_KEY
        if not self.api_key:
            raise ValueError("OPENAI_API_KEY is required")
        self.client = OpenAI(api_key=self.api_key)
        self.total_cost = 0.0

    def generate_blog_post(
        self,
        topic: str,
        keywords: List[str],
        target_length: int = 1500,
        tone: str = "professional",
        include_seo: bool = True
    ) -> Dict:
        """Generate a full blog post with SEO optimization."""

        print(f"🖊️  Generating blog post about: {topic}")

        # Load brand voice
        brand_voice = self._load_brand_voice()

        # Create comprehensive prompt
        prompt = f"""Write a comprehensive blog post for CoStudy, an educational technology platform.

Topic: {topic}
Target Keywords: {', '.join(keywords)}
Target Length: {target_length} words
Tone: {tone}

{brand_voice}

The blog post should include:

1. **Compelling Headline** (60-70 characters, includes primary keyword)
2. **Meta Description** (150-160 characters, compelling, includes keyword)
3. **Introduction** (100-150 words)
   - Hook the reader immediately
   - State the problem
   - Preview the solution
4. **Main Content** (organized with H2 and H3 headings)
   - Use data and statistics
   - Include actionable insights
   - Address pain points
   - Provide solutions
5. **Key Takeaways** (bulleted list)
6. **Conclusion** (100-150 words)
   - Summarize key points
   - Clear call-to-action
7. **SEO Metadata**
   - Suggested slug
   - Focus keyphrase
   - Additional keywords
   - Internal linking suggestions

Format the output as JSON with these fields:
- headline
- meta_description
- slug
- focus_keyphrase
- keywords (array)
- introduction
- main_content (markdown formatted)
- key_takeaways (array)
- conclusion
- call_to_action
- internal_links (array of suggested pages to link to)
- estimated_read_time
- seo_score (1-100)

Make it engaging, data-driven, and optimized for search engines!"""

        # FIRST PASS: Generate comprehensive draft
        print("   📝 Pass 1: Generating comprehensive draft...")
        response = self.client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=[
                {"role": "system", "content": "You are a WORLD-CLASS content marketer and SEO specialist for educational technology. Your content wins awards and drives massive engagement."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=OPENAI_MAX_TOKENS,
            temperature=CREATIVITY_TEMP,  # Higher for creativity
            response_format={"type": "json_object"}
        )

        draft_content = response.choices[0].message.content
        usage = response.usage
        cost = self._calculate_cost(usage.prompt_tokens, usage.completion_tokens)
        self.total_cost += cost

        print(f"   ✅ Draft generated ({usage.completion_tokens} tokens, ${cost:.4f})")

        # SECOND PASS: Refine for quality (if enabled)
        if ENABLE_REFINEMENT and QUALITY_MODE == "premium":
            print("   ✨ Pass 2: Premium quality refinement...")

            refinement_prompt = f"""You are a senior editor at a Fortune 100 company.

Review and SIGNIFICANTLY IMPROVE this blog post:

{draft_content}

Make it:
- More engaging and compelling
- Data-driven with specific examples
- Better structured for readability
- More actionable with clear takeaways
- Perfectly optimized for SEO
- Award-worthy quality

Return the improved version in the same JSON format, but BETTER."""

            refinement = self.client.chat.completions.create(
                model=OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": "You are a senior editor who transforms good content into EXCEPTIONAL content."},
                    {"role": "user", "content": refinement_prompt}
                ],
                max_tokens=OPENAI_MAX_TOKENS,
                temperature=PRECISION_TEMP,  # Lower for refinement
                response_format={"type": "json_object"}
            )

            content = refinement.choices[0].message.content
            refine_usage = refinement.usage
            refine_cost = self._calculate_cost(refine_usage.prompt_tokens, refine_usage.completion_tokens)
            self.total_cost += refine_cost

            print(f"   ✅ Refinement complete (+${refine_cost:.4f})")

            usage.prompt_tokens += refine_usage.prompt_tokens
            usage.completion_tokens += refine_usage.completion_tokens
            cost += refine_cost
        else:
            content = draft_content

        print(f"   🎯 TOTAL: {usage.completion_tokens} tokens, ${cost:.4f}")

        return {
            "content": json.loads(content),
            "usage": {
                "prompt_tokens": usage.prompt_tokens,
                "completion_tokens": usage.completion_tokens,
                "cost": cost,
                "passes": 2 if ENABLE_REFINEMENT and QUALITY_MODE == "premium" else 1
            }
        }

    def generate_social_media_pack(
        self,
        announcement: str,
        platforms: List[str] = ["twitter", "linkedin", "instagram"],
        include_hashtags: bool = True
    ) -> Dict:
        """Generate social media content for multiple platforms."""

        print(f"📱 Generating social media pack for: {announcement}")

        brand_voice = self._load_brand_voice()

        prompt = f"""Create social media content for CoStudy's announcement:

{announcement}

{brand_voice}

Generate platform-specific posts for:
{', '.join(platforms)}

Requirements:
- Twitter: 250-280 characters, punchy, 2-3 relevant hashtags
- LinkedIn: 100-150 words, professional, thought leadership angle
- Instagram: Engaging caption, 100-150 words, story-driven, 5-10 hashtags

Format as JSON:
{{
    "twitter": {{
        "text": "...",
        "hashtags": ["...", "..."],
        "character_count": 0
    }},
    "linkedin": {{
        "text": "...",
        "hashtags": ["...", "..."]
    }},
    "instagram": {{
        "caption": "...",
        "hashtags": ["...", "...", "..."]
    }},
    "threads": {{
        "thread": ["Post 1...", "Post 2...", "Post 3..."],
        "hashtags": ["..."]
    }}
}}"""

        response = self.client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=[
                {"role": "system", "content": "You are a social media expert specializing in educational technology marketing."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=2000,
            temperature=0.8,
            response_format={"type": "json_object"}
        )

        content = response.choices[0].message.content
        usage = response.usage
        cost = self._calculate_cost(usage.prompt_tokens, usage.completion_tokens)
        self.total_cost += cost

        print(f"   ✅ Generated social content (${cost:.4f})")

        return {
            "content": json.loads(content),
            "usage": {"cost": cost}
        }

    def generate_image(
        self,
        prompt: str,
        size: str = "1792x1024",  # Wider format for hero images
        quality: str = None,  # Will use IMAGE_QUALITY global
        style: str = "natural"
    ) -> Dict:
        """Generate a PREMIUM QUALITY image using DALL-E 3 HD."""

        # Override with premium settings
        quality = quality or IMAGE_QUALITY

        print(f"🎨 Generating {quality.upper()} quality image: {prompt[:50]}...")

        # PREMIUM PROMPT ENHANCEMENT
        enhanced_prompt = f"""{prompt}

PREMIUM QUALITY REQUIREMENTS:
- Style: Award-winning, modern, professional educational technology aesthetic
- Composition: Rule of thirds, balanced, visually striking
- Lighting: Professional, warm, inviting
- Colors: Sophisticated palette - blues, greens, warm tones, high contrast
- Mood: Inspiring, collaborative, forward-thinking, energetic
- Details: Sharp focus, high detail, professional photography quality
- People (if applicable): Diverse, authentic, engaged, professional
- Setting: Modern, clean, aspirational
- Avoid: Stock photo feeling, overly corporate, clichéd, generic

Create a stunning, magazine-worthy image that represents Fortune-100 level quality."""

        response = self.client.images.generate(
            model="dall-e-3",
            prompt=enhanced_prompt,
            size=size,
            quality=quality,
            style=style,
            n=1
        )

        image_url = response.data[0].url
        revised_prompt = response.data[0].revised_prompt

        cost = COST_PER_IMAGE_HD if quality == "hd" else COST_PER_IMAGE_STD
        self.total_cost += cost

        print(f"   ✅ Generated {quality.upper()} image (${cost:.4f})")
        print(f"   📸 DALL-E enhanced prompt: {revised_prompt[:100]}...")

        return {
            "url": image_url,
            "revised_prompt": revised_prompt,
            "cost": cost,
            "quality": quality,
            "size": size
        }

    def deep_research(
        self,
        topic: str,
        questions: List[str] = None,
        depth: str = "comprehensive"
    ) -> Dict:
        """Conduct deep research on a topic."""

        print(f"🔍 Conducting deep research on: {topic}")

        base_questions = questions or [
            f"What are the current trends in {topic}?",
            f"What are the challenges and opportunities in {topic}?",
            f"What do industry leaders say about {topic}?",
            f"What are the best practices for {topic}?",
            f"What innovations are emerging in {topic}?"
        ]

        prompt = f"""Conduct comprehensive research on: {topic}

Answer these questions with depth and citations:

{chr(10).join(f'{i+1}. {q}' for i, q in enumerate(base_questions))}

Provide:
- Executive summary (200 words)
- Detailed analysis for each question
- Key statistics and data points
- Industry expert perspectives
- Actionable insights for CoStudy
- Competitive landscape
- Recommendations

Format as structured JSON with clear sections."""

        response = self.client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=[
                {"role": "system", "content": "You are a senior market research analyst specializing in educational technology."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=OPENAI_MAX_TOKENS,
            temperature=0.3,  # Lower for more factual
            response_format={"type": "json_object"}
        )

        content = response.choices[0].message.content
        usage = response.usage
        cost = self._calculate_cost(usage.prompt_tokens, usage.completion_tokens)
        self.total_cost += cost

        print(f"   ✅ Completed research (${cost:.4f})")

        return {
            "research": json.loads(content),
            "usage": {"cost": cost}
        }

    def generate_epic(
        self,
        feature_name: str,
        user_problem: str,
        business_goal: str
    ) -> Dict:
        """Generate an epic with user stories."""

        print(f"📋 Generating epic for: {feature_name}")

        prompt = f"""Create a comprehensive epic for a new feature:

Feature: {feature_name}
User Problem: {user_problem}
Business Goal: {business_goal}

Generate a complete epic with:

1. **Epic Title** (clear, outcome-focused)
2. **Epic Description**
   - Problem statement
   - Proposed solution
   - Success metrics
3. **User Stories** (5-8 stories)
   - Format: "As a [user type], I want to [action], so that [benefit]"
   - Include acceptance criteria for each
   - Estimate story points
4. **Technical Requirements**
   - Architecture considerations
   - Dependencies
   - API requirements
5. **Design Requirements**
   - UX considerations
   - Mockup needs
6. **Testing Strategy**
7. **Release Plan**

Format as JSON with all fields."""

        response = self.client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=[
                {"role": "system", "content": "You are a senior product manager with expertise in agile development."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=3000,
            temperature=0.5,
            response_format={"type": "json_object"}
        )

        content = response.choices[0].message.content
        usage = response.usage
        cost = self._calculate_cost(usage.prompt_tokens, usage.completion_tokens)
        self.total_cost += cost

        print(f"   ✅ Generated epic (${cost:.4f})")

        return {
            "epic": json.loads(content),
            "usage": {"cost": cost}
        }

    def _load_brand_voice(self) -> str:
        """Load brand voice guidelines."""
        try:
            with open("ops/prompts/brand_voice.md", "r") as f:
                return f.read()
        except FileNotFoundError:
            return "Use a professional, friendly, and educational tone."

    def _calculate_cost(self, prompt_tokens: int, completion_tokens: int) -> float:
        """Calculate cost for API call."""
        input_cost = (prompt_tokens / 1000) * COST_PER_1K_INPUT
        output_cost = (completion_tokens / 1000) * COST_PER_1K_OUTPUT
        return input_cost + output_cost

    def get_total_cost(self) -> float:
        """Get total cost of all operations."""
        return self.total_cost


def main():
    parser = argparse.ArgumentParser(description="Automated Content Generation")
    subparsers = parser.add_subparsers(dest="command", help="Content type to generate")

    # Blog post
    blog_parser = subparsers.add_parser("blog", help="Generate blog post")
    blog_parser.add_argument("--topic", required=True, help="Blog post topic")
    blog_parser.add_argument("--keywords", required=True, help="Comma-separated keywords")
    blog_parser.add_argument("--length", type=int, default=1500, help="Target word count")
    blog_parser.add_argument("--output", default="blog_post.json", help="Output file")

    # Social media
    social_parser = subparsers.add_parser("social", help="Generate social media content")
    social_parser.add_argument("--announcement", required=True, help="What to announce")
    social_parser.add_argument("--platforms", default="twitter,linkedin,instagram", help="Platforms")
    social_parser.add_argument("--output", default="social_pack.json", help="Output file")

    # Image generation
    image_parser = subparsers.add_parser("image", help="Generate image with DALL-E")
    image_parser.add_argument("--prompt", required=True, help="Image description")
    image_parser.add_argument("--size", default="1024x1024", help="Image size")
    image_parser.add_argument("--output", default="image_info.json", help="Output file")

    # Research
    research_parser = subparsers.add_parser("research", help="Deep research")
    research_parser.add_argument("--topic", required=True, help="Research topic")
    research_parser.add_argument("--output", default="research.json", help="Output file")

    # Epic generation
    epic_parser = subparsers.add_parser("epic", help="Generate epic with user stories")
    epic_parser.add_argument("--feature", required=True, help="Feature name")
    epic_parser.add_argument("--problem", required=True, help="User problem")
    epic_parser.add_argument("--goal", required=True, help="Business goal")
    epic_parser.add_argument("--output", default="epic.json", help="Output file")

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(1)

    # Initialize generator
    generator = ContentGenerator()

    try:
        # Execute command
        if args.command == "blog":
            result = generator.generate_blog_post(
                topic=args.topic,
                keywords=args.keywords.split(","),
                target_length=args.length
            )
        elif args.command == "social":
            result = generator.generate_social_media_pack(
                announcement=args.announcement,
                platforms=args.platforms.split(",")
            )
        elif args.command == "image":
            result = generator.generate_image(
                prompt=args.prompt,
                size=args.size
            )
        elif args.command == "research":
            result = generator.deep_research(
                topic=args.topic
            )
        elif args.command == "epic":
            result = generator.generate_epic(
                feature_name=args.feature,
                user_problem=args.problem,
                business_goal=args.goal
            )

        # Save output
        with open(args.output, "w") as f:
            json.dump(result, f, indent=2)

        print(f"\n✅ Content saved to: {args.output}")
        print(f"💰 Total cost: ${generator.get_total_cost():.4f}")

    except Exception as e:
        print(f"\n❌ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
