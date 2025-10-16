#!/bin/bash

# Deploy CoStudy MARKETING WEBSITE to staging/testing environment
# This is the TESTING environment before production
# Production (costudy.co) remains untouched
# NOTE: This is for MARKETING WEBSITE, not platform (dev.costudy.co is for platform)

echo "🧪 Deploying CoStudy Marketing Website to Staging/Testing"
echo "=========================================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "📦 Creating Vercel project: costudy-website-staging"
echo ""

# Deploy to staging project
vercel --name costudy-website-staging --prod --yes

echo ""
echo "🌐 Adding custom domain: staging.costudy.co"
echo ""

# Add custom domain
vercel domains add staging.costudy.co --yes

echo ""
echo "✅ Staging environment deployed!"
echo ""
echo "🌐 URLs:"
echo "   - Primary: https://staging.costudy.co"
echo "   - Vercel:  https://costudy-website-staging.vercel.app"
echo ""
echo "⚙️  Next steps:"
echo "1. Add DNS record in your domain provider:"
echo "   Type:  CNAME"
echo "   Name:  staging"
echo "   Value: cname.vercel-dns.com"
echo ""
echo "2. Set environment variables:"
echo "   vercel env add DATABASE_URL --project costudy-website-staging"
echo "   vercel env add SENDGRID_API_KEY --project costudy-website-staging"
echo "   vercel env add NEXTAUTH_SECRET --project costudy-website-staging"
echo "   vercel env add UPSTASH_REDIS_REST_URL --project costudy-website-staging"
echo "   vercel env add UPSTASH_REDIS_REST_TOKEN --project costudy-website-staging"
echo "   vercel env add LINEAR_API_KEY --project costudy-website-staging"
echo "   vercel env add PLATFORM_DATABASE_URL --project costudy-website-staging"
echo ""
echo "🚀 Marketing Website Deployment Flow (2-tier):"
echo "   1. Test on staging.costudy.co (YOU ARE HERE)"
echo "   2. If staging looks good → deploy to costudy.co (production)"
echo ""
echo "📝 Notes:"
echo "   - staging.costudy.co = Testing environment for marketing website"
echo "   - dev.costudy.co = Platform (separate)"
echo ""
