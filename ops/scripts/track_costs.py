#!/usr/bin/env python3
"""
Cost Tracking Tool for AI Content Generation
Analyzes all generated content and tracks spending
"""

import os
import json
import sys
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List

def find_json_files(directory: str) -> List[Path]:
    """Find all JSON files in directory recursively"""
    path = Path(directory)
    if not path.exists():
        return []
    return list(path.rglob("*.json"))

def extract_cost(file_path: Path) -> Dict:
    """Extract cost and metadata from JSON file"""
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)

        # Try different cost fields
        cost = data.get('cost') or data.get('total_cost') or 0

        # Get metadata
        ai = data.get('ai', 'unknown')
        content_type = 'unknown'

        # Infer content type from file name
        name = file_path.name.lower()
        if 'blog' in name:
            content_type = 'blog'
        elif 'spec' in name:
            content_type = 'spec'
        elif 'image' in name:
            content_type = 'image'
        elif 'video' in name:
            content_type = 'video'
        elif 'social' in name:
            content_type = 'social'
        elif 'research' in name:
            content_type = 'research'
        elif 'proposal' in name:
            content_type = 'proposal'

        # Get file modification time
        mtime = datetime.fromtimestamp(file_path.stat().st_mtime)

        return {
            'file': str(file_path),
            'cost': float(cost),
            'ai': ai,
            'type': content_type,
            'date': mtime
        }
    except Exception as e:
        return None

def get_date_range(period: str) -> tuple:
    """Get date range for period"""
    now = datetime.now()

    if period == 'today':
        start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        end = now
    elif period == 'week':
        start = now - timedelta(days=7)
        end = now
    elif period == 'month':
        start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        end = now
    elif period == 'all':
        start = datetime(2020, 1, 1)
        end = now
    else:
        start = datetime(2020, 1, 1)
        end = now

    return start, end

def main():
    import argparse

    parser = argparse.ArgumentParser(description="Track AI content generation costs")
    parser.add_argument('--period', choices=['today', 'week', 'month', 'all'], default='month',
                        help='Time period to analyze')
    parser.add_argument('--directory', default='content/generated',
                        help='Directory to scan for generated content')
    parser.add_argument('--budget', type=float,
                        help='Monthly budget to check against')
    parser.add_argument('--export', type=str,
                        help='Export to CSV file')

    args = parser.parse_args()

    print("💰 AI Content Generation Cost Report")
    print("=" * 60)
    print()

    # Find all JSON files
    directories = [args.directory, 'specs', 'sales']
    all_files = []
    for directory in directories:
        if os.path.exists(directory):
            all_files.extend(find_json_files(directory))

    if not all_files:
        print("❌ No generated content found")
        print(f"   Searched in: {', '.join(directories)}")
        print()
        print("💡 Generate some content first:")
        print("   ./ops/workflows/complete_content_package.sh \"Your Topic\"")
        return

    # Extract costs
    items = []
    for file_path in all_files:
        item = extract_cost(file_path)
        if item:
            items.append(item)

    if not items:
        print("❌ No cost data found in JSON files")
        return

    # Filter by date range
    start_date, end_date = get_date_range(args.period)
    filtered_items = [item for item in items if start_date <= item['date'] <= end_date]

    if not filtered_items:
        print(f"❌ No content generated in {args.period}")
        return

    # Calculate totals
    total_cost = sum(item['cost'] for item in filtered_items)
    total_items = len(filtered_items)

    print(f"📅 Period: {args.period.capitalize()}")
    print(f"   From: {start_date.strftime('%Y-%m-%d')}")
    print(f"   To:   {end_date.strftime('%Y-%m-%d')}")
    print()

    print(f"📊 Summary:")
    print(f"   Total content pieces: {total_items}")
    print(f"   Total cost: ${total_cost:.2f}")
    print(f"   Average cost: ${total_cost / total_items:.2f}" if total_items > 0 else "   Average cost: $0.00")
    print()

    # Breakdown by content type
    by_type = {}
    for item in filtered_items:
        content_type = item['type']
        if content_type not in by_type:
            by_type[content_type] = {'count': 0, 'cost': 0}
        by_type[content_type]['count'] += 1
        by_type[content_type]['cost'] += item['cost']

    print("📈 By Content Type:")
    for content_type, stats in sorted(by_type.items(), key=lambda x: x[1]['cost'], reverse=True):
        print(f"   {content_type.capitalize()}: {stats['count']} items, ${stats['cost']:.2f}")
    print()

    # Breakdown by AI
    by_ai = {}
    for item in filtered_items:
        ai = item['ai']
        if ai not in by_ai:
            by_ai[ai] = {'count': 0, 'cost': 0}
        by_ai[ai]['count'] += 1
        by_ai[ai]['cost'] += item['cost']

    print("🤖 By AI Model:")
    for ai, stats in sorted(by_ai.items(), key=lambda x: x[1]['cost'], reverse=True):
        print(f"   {ai}: {stats['count']} items, ${stats['cost']:.2f}")
    print()

    # Budget check
    if args.budget:
        if args.period == 'month':
            percentage = (total_cost / args.budget) * 100
            remaining = args.budget - total_cost

            print(f"💵 Budget Status:")
            print(f"   Monthly budget: ${args.budget:.2f}")
            print(f"   Current spend: ${total_cost:.2f} ({percentage:.1f}%)")
            print(f"   Remaining: ${remaining:.2f}")

            if percentage > 100:
                print(f"   ⚠️  OVER BUDGET by ${abs(remaining):.2f}!")
            elif percentage > 80:
                print(f"   ⚠️  Warning: {100 - percentage:.1f}% of budget remaining")
            else:
                print(f"   ✅ On track")
            print()

    # ROI calculation
    # Estimate time saved (rough averages)
    time_saved_hours = {
        'blog': 5,
        'spec': 4,
        'proposal': 8,
        'research': 8,
        'social': 0.5,
        'image': 2,
        'video': 3,
        'unknown': 2
    }

    total_time_saved = sum(
        time_saved_hours.get(item['type'], 2) for item in filtered_items
    )

    value_at_50_per_hour = total_time_saved * 50
    roi = ((value_at_50_per_hour - total_cost) / total_cost * 100) if total_cost > 0 else 0

    print("🎯 ROI Analysis:")
    print(f"   Time saved: {total_time_saved:.0f} hours")
    print(f"   Value (@ $50/hr): ${value_at_50_per_hour:.2f}")
    print(f"   Cost: ${total_cost:.2f}")
    print(f"   Net benefit: ${value_at_50_per_hour - total_cost:.2f}")
    print(f"   ROI: {roi:.0f}%")
    print()

    # Recent activity
    recent = sorted(filtered_items, key=lambda x: x['date'], reverse=True)[:5]
    print("📅 Recent Activity (last 5):")
    for item in recent:
        date_str = item['date'].strftime('%Y-%m-%d %H:%M')
        file_name = Path(item['file']).name
        print(f"   {date_str} | {item['type']:12} | ${item['cost']:5.2f} | {file_name}")
    print()

    # Export to CSV
    if args.export:
        import csv
        with open(args.export, 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=['date', 'type', 'ai', 'cost', 'file'])
            writer.writeheader()
            for item in filtered_items:
                writer.writerow({
                    'date': item['date'].strftime('%Y-%m-%d %H:%M:%S'),
                    'type': item['type'],
                    'ai': item['ai'],
                    'cost': item['cost'],
                    'file': item['file']
                })
        print(f"✅ Exported to {args.export}")
        print()

    print("💡 Pro tips:")
    print("   - Use Claude Opus for important public content ($1.50 vs $0.80)")
    print("   - Use GPT-4 Turbo for high-volume internal docs")
    print("   - Batch generate content to maximize efficiency")
    print("   - Review and refine AI output for best quality")

if __name__ == "__main__":
    main()
