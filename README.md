# CoStudy Website

CoStudy is revolutionizing student collaboration in higher education. This repository contains our marketing website, built with Next.js 15 and powered by a Fortune-100-level AI content generation system.

## 🤖 AI Content Generation System

We've built a complete AI stack that supports **ALL business functions** - engineering, marketing, sales, support, HR, and more. Generate blog posts, technical specifications, sales proposals, and complete content packages in minutes.

### Quick Start with AI

```bash
# Interactive setup wizard
./ops/scripts/costudy-ai setup

# Generate blog post
./ops/scripts/costudy-ai blog "AI in Education 2025"

# Generate tech spec from GitHub issue
./ops/scripts/costudy-ai spec 42

# Generate sales proposal
./ops/scripts/costudy-ai proposal "Stanford" 17000

# Complete content package (blog + image + video + voice)
./ops/scripts/costudy-ai package "Student Collaboration"

# View cost report
./ops/scripts/costudy-ai costs month
```

### AI System Features

- **7 Premium AI Integrations:** Claude Opus, GPT-4 Turbo, Perplexity, DALL-E 3, Midjourney, Runway, ElevenLabs
- **10 Departments Supported:** Engineering, Marketing, Sales, Support, HR, Finance, PR, Legal, R&D, Partnerships
- **Automated Workflows:** GitHub Actions for weekly blog posts and auto-spec generation
- **ROI Tracking:** Built-in cost tracking with 10,000%+ ROI
- **Zero Compromises:** Best AI for each specific task

### Documentation

- **[Quick Start Guide](ops/SETUP_GUIDE.md)** - Get started in 5 minutes
- **[Complete Usage Guide](docs/ULTIMATE_USAGE_GUIDE.md)** - Detailed examples
- **[Company-Wide System](docs/COMPANY_WIDE_AI_SYSTEM.md)** - All departments guide
- **[AI Stack Strategy](docs/ULTIMATE_AI_STACK.md)** - Philosophy & approach
- **[Implementation Summary](docs/AI_SYSTEM_SUMMARY.md)** - What's implemented

### Key Scripts

- `ops/scripts/costudy-ai` - Main CLI tool for content generation
- `ops/scripts/ultimate_content_generator.py` - Core AI orchestrator
- `ops/scripts/track_costs.py` - Cost tracking and ROI analysis
- `ops/workflows/complete_content_package.sh` - Full blog package generator
- `ops/workflows/generate_tech_spec.sh` - Engineering spec generator
- `ops/workflows/generate_sales_proposal.sh` - Sales proposal generator

---

## 🚀 Website Development

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
