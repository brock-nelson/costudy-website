# Resources Page Setup Guide

This guide explains how to set up and use the new /resources page for CoStudy.

## Overview

The resources page allows visitors to download educational content (whitepapers, guides, case studies, webinars) in exchange for their contact information, supporting lead generation efforts.

## Features

- **Gated Content**: Email required for downloads (configurable per resource)
- **Lead Capture**: Name, email, university, role
- **Filtering**: By resource type (whitepaper, guide, case study, webinar)
- **Newsletter Integration**: Automatic subscription opt-in
- **Analytics**: Track downloads and views per resource
- **Rate Limiting**: Prevents abuse (10 downloads/hour per email)

## Database Setup

### 1. Run Migrations

The schema includes two new tables:
- `resources` - Stores resource metadata
- `resource_downloads` - Tracks downloads and lead data

Apply the migration:
```bash
npm run db:push
# or
npx drizzle-kit push
```

### 2. Seed Sample Data

Populate with 15 sample resources:
```bash
npx tsx src/db/seed-resources.ts
```

Or add to package.json:
```json
{
  "scripts": {
    "seed:resources": "tsx src/db/seed-resources.ts"
  }
}
```

## Resource Management

### Adding New Resources

Resources can be added via:
1. **Admin Panel** (recommended - to be built)
2. **Direct Database Insert**:

```typescript
import { db } from "@/db";
import { resources } from "@/db/schema";

await db.insert(resources).values({
  title: "Your Resource Title",
  description: "Detailed description...",
  type: "whitepaper", // whitepaper, guide, checklist, webinar, case-study
  category: "retention", // optional categorization
  fileUrl: "https://cdn.example.com/file.pdf",
  fileSize: "2.5 MB", // optional
  duration: "45 min", // for webinars
  isGated: true, // require email to access
  isPublished: true,
  publishedAt: new Date(),
  author: "Author Name",
  thumbnailUrl: "https://cdn.example.com/thumb.jpg", // optional
});
```

### Resource Types

- **whitepaper**: Research papers, data analysis (10-15 pages)
- **guide**: How-to guides, buyer's guides
- **checklist**: Actionable checklists
- **webinar**: Recorded video content
- **case-study**: University success stories

### File Hosting

Upload PDFs and videos to:
- Vercel Blob Storage
- AWS S3
- Cloudinary
- Or any CDN

Update `fileUrl` with the public URL.

## Lead Management

### Accessing Lead Data

Download leads are stored in `resource_downloads` table:

```sql
SELECT
  rd.name,
  rd.email,
  rd.university,
  rd.role,
  r.title as resource_title,
  rd.created_at
FROM resource_downloads rd
JOIN resources r ON rd.resource_id = r.id
ORDER BY rd.created_at DESC;
```

### Export for CRM

Create an admin export endpoint:
```typescript
// src/app/api/admin/export/resource-leads/route.ts
export async function GET() {
  const leads = await db.query.resourceDownloads.findMany({
    with: { resource: true },
    orderBy: [desc(resourceDownloads.createdAt)],
  });

  // Convert to CSV
  return new Response(csvData, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=resource-leads.csv",
    },
  });
}
```

### Newsletter Integration

When `subscribeToNewsletter` is true, the email is automatically added to `email_subscriptions` table. These can be synced to:
- SendGrid Lists
- HubSpot
- Mailchimp
- ActiveCampaign

## Email Nurture Sequence

### Recommended 5-Email Drip Campaign

Implement in `src/lib/email-nurture.ts`:

1. **Immediate**: Download link + thank you
2. **Day 2**: Related resource recommendation
3. **Day 4**: Case study highlighting success
4. **Day 7**: Demo invitation
5. **Day 10**: "Ready to see CoStudy?" direct ask

Use SendGrid's Marketing Campaigns or create custom automation:

```typescript
// Example: Send download email
import { sendEmail } from "@/lib/email-service";

await sendEmail({
  to: email,
  subject: `Your ${resourceTitle} is ready`,
  template: "resource-download",
  data: {
    name,
    resourceTitle,
    downloadUrl,
    resourceType,
  },
});
```

## Analytics

### Track Resource Performance

```sql
-- Most downloaded resources
SELECT
  title,
  download_count,
  view_count
FROM resources
WHERE is_published = true
ORDER BY download_count DESC
LIMIT 10;

-- Lead conversion by resource type
SELECT
  r.type,
  COUNT(rd.id) as total_downloads,
  COUNT(DISTINCT rd.email) as unique_leads
FROM resources r
LEFT JOIN resource_downloads rd ON r.id = rd.resource_id
GROUP BY r.type;

-- University/institution breakdown
SELECT
  university,
  COUNT(*) as downloads
FROM resource_downloads
WHERE university IS NOT NULL
GROUP BY university
ORDER BY downloads DESC;
```

## API Endpoints

### GET /api/resources
Fetch published resources (optionally filtered)

**Query params**:
- `type` - Filter by type (whitepaper, guide, etc.)
- `category` - Filter by category

**Response**:
```json
{
  "success": true,
  "resources": [...]
}
```

### POST /api/resources/download
Submit lead form and get download URL

**Body**:
```json
{
  "resourceId": "uuid",
  "name": "John Doe",
  "email": "john@university.edu",
  "university": "State University",
  "role": "professor",
  "subscribeToNewsletter": true
}
```

**Response**:
```json
{
  "success": true,
  "message": "Resource access granted",
  "downloadUrl": "https://...",
  "resourceTitle": "..."
}
```

## Rate Limiting

Downloads are rate-limited per email:
- **10 downloads per hour** per email address
- Prevents abuse and bot scraping
- Configurable in `/api/resources/download/route.ts`

## Success Metrics

Track these KPIs:
- **Conversion Rate**: Visitors → Email capture (target: 20%+)
- **Downloads per Resource**: Identify popular content
- **Newsletter Opt-in Rate**: % who subscribe (target: 60%+)
- **Lead Quality**: Role breakdown (professors vs students)
- **Social Shares**: Track LinkedIn shares (target: 50+)

## Next Steps

1. ✅ Database migration
2. ✅ Seed sample data
3. 📄 Upload actual PDFs/videos to CDN
4. 📧 Set up email templates
5. 🔄 Configure nurture sequence
6. 📊 Add admin dashboard for resource management
7. 🎨 Create thumbnail images for resources
8. 📈 Set up Google Analytics goals for downloads
9. 🔗 Add social sharing buttons
10. 💬 A/B test form fields and copy

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── resources/
│   │       ├── route.ts           # GET resources list
│   │       └── download/
│   │           └── route.ts       # POST download/lead capture
│   └── resources/
│       ├── page.tsx               # Main resources page
│       └── metadata.ts            # SEO metadata
├── components/
│   └── forms/
│       └── ResourceDownloadForm.tsx  # Lead capture modal
└── db/
    ├── schema.ts                  # Database schema
    └── seed-resources.ts          # Sample data seeder
```

## Support

For questions or issues, contact the development team or check the main README.
