#!/bin/bash

# School Logo Downloader Script
# This script downloads school logos from various sources

echo "🎓 Downloading school logos..."
echo ""

# Create the schools directory if it doesn't exist
mkdir -p public/schools

# Function to download and convert SVG to PNG if needed
download_logo() {
  local name=$1
  local url=$2
  local output=$3

  echo "📥 Downloading $name..."

  if curl -L -o "$output" "$url" 2>/dev/null; then
    echo "✅ Successfully downloaded $name"
  else
    echo "❌ Failed to download $name"
    echo "   Please manually download from the URL provided in the comments"
  fi
  echo ""
}

# Boston University
# Source: SeekLogo (PNG available)
download_logo "Boston University" \
  "https://seeklogo.com/images/B/boston-university-logo-2675C5D9F0-seeklogo.com.png" \
  "public/schools/boston-university.png"

# Indiana University Kelley School
# Source: SeekLogo
download_logo "Indiana Kelley School" \
  "https://seeklogo.com/images/K/kelley-school-of-business-logo-0F8A7E7F7A-seeklogo.com.png" \
  "public/schools/indiana-kelley.png"

# BU PRLab - Using BU logo as fallback (PRLab logo not publicly available)
echo "⚠️  BU PRLab: Using Boston University logo as placeholder"
echo "   Contact PRLab directly for their specific logo"
cp public/schools/boston-university.png public/schools/bu-prlab.png 2>/dev/null || \
  download_logo "BU PRLab (BU Logo Fallback)" \
    "https://seeklogo.com/images/B/boston-university-logo-2675C5D9F0-seeklogo.com.png" \
    "public/schools/bu-prlab.png"

# University of San Francisco
# Source: Wikimedia Commons SVG
echo "📥 Downloading University of San Francisco..."
echo "   Note: This will download an SVG. You may need to convert to PNG manually"
download_logo "University of San Francisco" \
  "https://upload.wikimedia.org/wikipedia/commons/7/7b/University_of_San_Francisco_Seal.svg" \
  "public/schools/usf.svg"

# City College of San Francisco
# Source: Wikimedia Commons
download_logo "City College of San Francisco" \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/City_College_of_San_Francisco_square_logo.svg/512px-City_College_of_San_Francisco_square_logo.svg.png" \
  "public/schools/ccsf.png"

# UC Berkeley
# Source: Wikimedia Commons
download_logo "UC Berkeley" \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/512px-Seal_of_University_of_California%2C_Berkeley.svg.png" \
  "public/schools/ucb.png"

# NYU
# Source: Wikimedia Commons
download_logo "New York University" \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/NYU_logo.svg/512px-NYU_logo.svg.png" \
  "public/schools/nyu.png"

# Boston College
# Source: Wikimedia Commons
download_logo "Boston College" \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Boston_College_Logotype.svg/512px-Boston_College_Logotype.svg.png" \
  "public/schools/boston-college.png"

# University of Arizona
# Source: Wikimedia Commons
download_logo "University of Arizona" \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/University_of_Arizona_logo.svg/512px-University_of_Arizona_logo.svg.png" \
  "public/schools/arizona.png"

echo ""
echo "✨ Logo download process complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Check the public/schools/ directory for downloaded logos"
echo "   2. Convert any SVG files to PNG if needed (e.g., USF)"
echo "   3. For BU PRLab, contact PRLab directly for their specific logo"
echo "   4. Verify all logos display correctly in both light and dark modes"
echo ""
echo "⚖️  Important: These logos are for educational/portfolio purposes."
echo "   For commercial use, contact each institution for permission."
