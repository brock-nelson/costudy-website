#!/bin/bash

# Deploy CoStudy to demo environment
# This keeps production site (costudy.co) untouched

echo "🚀 Deploying CoStudy to Demo Environment"
echo "=========================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "📦 Creating new Vercel project: costudy-demo"
echo ""

# Deploy to new project
vercel --name costudy-demo --yes

echo ""
echo "✅ Demo deployed!"
echo ""
echo "Next steps:"
echo "1. Set environment variables:"
echo "   vercel env add DATABASE_URL"
echo "   vercel env add SENDGRID_API_KEY"
echo "   vercel env add NEXTAUTH_SECRET"
echo "   etc."
echo ""
echo "2. Access your demo site at the URL shown above"
echo ""
echo "3. (Optional) Add custom domain demo.costudy.co:"
echo "   vercel domains add demo.costudy.co"
echo ""
