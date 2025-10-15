# Analytics & Conversion Tracking Setup

This document describes the analytics and conversion tracking infrastructure for the CoStudy website.

## Overview

The website uses a comprehensive analytics stack to track user behavior, conversions, and attribution:

- **Google Analytics 4 (GA4)** - Custom event tracking and conversion measurement
- **Microsoft Clarity** - Heat maps, session recordings, and user behavior insights
- **Vercel Analytics** - Performance and user metrics
- **Vercel Speed Insights** - Core Web Vitals monitoring
- **UTM Parameter Tracking** - Campaign attribution across the user journey

## Environment Variables

Add these environment variables to your `.env.local` file (and configure them in your production environment):

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Microsoft Clarity (optional but recommended)
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_project_id
```

### Setting Up Google Analytics 4

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (starts with `G-`)
3. Add it to your environment variables as `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### Setting Up Microsoft Clarity

1. Create a project at [clarity.microsoft.com](https://clarity.microsoft.com)
2. Get your Project ID
3. Add it to your environment variables as `NEXT_PUBLIC_CLARITY_PROJECT_ID`

## Tracked Events

### Conversion Events

These high-value events are tracked with estimated lead values:

#### Demo Request (`demo_request`)
- **Estimated Value**: $500
- **Tracked Data**: Role, institution, team size, UTM parameters
- **GA4 Conversion**: `generate_lead`

#### Contact Form (`contact_submit`)
- **Estimated Value**: $100
- **Tracked Data**: Role, institution, UTM parameters
- **GA4 Conversion**: `generate_lead`

#### Newsletter Signup (`newsletter_signup`)
- **Tracked Data**: Source, page location

### Page View Events

#### Pricing Page View (`pricing_view`)
- **Category**: engagement
- **Label**: pricing_page
- **Optional**: Plan parameter

#### Features Page View (`feature_view`)
- **Category**: engagement
- **Label**: features_page
- **Optional**: Feature parameter

#### Feature Vote (`feature_vote`)
- **Category**: engagement
- **Tracked Data**: Feature ID, feature name

### Attribution Tracking

#### UTM Parameters (`utm_capture`)
- **Category**: attribution
- **Captured Parameters**:
  - `utm_source`
  - `utm_medium`
  - `utm_campaign`
  - `utm_term`
  - `utm_content`

UTM parameters are automatically:
1. Captured from the URL on page load
2. Stored in sessionStorage for attribution
3. Attached to conversion events

## Usage Examples

### Track a Custom Event

```typescript
import { trackEvent } from "@/lib/analytics";

trackEvent("button_click", {
  event_category: "engagement",
  event_label: "cta_homepage",
  button_text: "Get Started",
});
```

### Track Page Views

Add the `PageViewTracker` component to any page:

```tsx
import PageViewTracker from "@/components/analytics/PageViewTracker";

export default function MyPage() {
  return (
    <div>
      <PageViewTracker
        eventName="custom_page_view"
        eventParams={{
          event_category: "engagement",
          page_type: "landing_page",
        }}
      />
      {/* Page content */}
    </div>
  );
}
```

### Track Conversions in Forms

```typescript
import { trackDemoRequest, getStoredUTMParameters } from "@/lib/analytics";

// After successful form submission
const utmParams = getStoredUTMParameters();
trackDemoRequest({
  role: data.role,
  institution: data.institution,
  teamSize: data.teamSize,
  value: 500,
  ...utmParams,
});
```

## Setting Up GA4 Conversions

To track conversions in GA4:

1. Go to **Admin > Events** in GA4
2. Click **Create Event** or mark existing events as conversions
3. Mark these events as conversions:
   - `demo_request`
   - `contact_submit`
   - `generate_lead`
   - `newsletter_signup`

## Campaign Tracking with UTM Parameters

Use these UTM parameters in your marketing campaigns:

```
https://costudy.co/?utm_source=linkedin&utm_medium=social&utm_campaign=spring2025&utm_content=demo_cta
```

Parameters will be:
- Captured on first page load
- Stored in sessionStorage
- Attached to all conversion events during that session

## Analytics API Reference

See `/src/lib/analytics.ts` for the complete list of tracking functions:

- `trackEvent(eventName, params)` - Generic event tracking
- `trackDemoRequest(params)` - Demo form conversions
- `trackContactSubmit(params)` - Contact form conversions
- `trackNewsletterSignup(params)` - Newsletter signups
- `trackPricingView(params)` - Pricing page views
- `trackFeatureView(params)` - Feature page views
- `trackFeatureVote(params)` - Feature voting
- `trackFeatureInteraction(params)` - Feature interactions
- `trackResourceDownload(params)` - Resource downloads
- `trackError(params)` - Error tracking
- `getUTMParameters()` - Get current UTM params from URL
- `getStoredUTMParameters()` - Get stored UTM params from session

## Key User Journeys Tracked

1. **Demo Request Funnel**
   - Homepage view → Pricing view → Demo page view → Demo request conversion

2. **Newsletter Signup**
   - Any page → Newsletter form → Signup conversion

3. **Feature Engagement**
   - Features page view → Feature interaction → Feature vote

4. **Contact Flow**
   - Any page → Contact page → Contact form submission

## Heat Maps & Session Recordings (Microsoft Clarity)

Microsoft Clarity provides:
- **Heat maps**: Click, scroll, and attention heat maps
- **Session recordings**: Watch user sessions to understand behavior
- **Insights**: Automatic detection of rage clicks, dead clicks, and excessive scrolling

Access your Clarity dashboard at [clarity.microsoft.com](https://clarity.microsoft.com)

## Testing Analytics

To test analytics in development:

1. Open browser DevTools
2. Go to Console tab
3. Analytics events will be logged if measurement IDs are not configured
4. With IDs configured, check the Network tab for `gtag` and `clarity` requests

## Best Practices

1. **Always include UTM parameters** in marketing campaigns
2. **Track conversion values** to measure ROI
3. **Set up GA4 conversion goals** for key events
4. **Review Clarity recordings** weekly to find UX issues
5. **Use consistent event naming** across the application
6. **Test tracking** before launching campaigns

## Troubleshooting

### Events Not Showing in GA4

- Check that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
- Events can take 24-48 hours to appear in reports
- Use the GA4 DebugView for real-time testing

### Clarity Not Recording

- Verify `NEXT_PUBLIC_CLARITY_PROJECT_ID` is set
- Check browser console for errors
- Clarity needs time to start recording after initial setup

### UTM Parameters Not Persisting

- UTM params are stored in sessionStorage (cleared when browser closes)
- Make sure users land on the site with UTM params in the URL
- Check browser console to see if params are being captured

## Support

For questions or issues with analytics setup, contact the development team or refer to:
- [Google Analytics Documentation](https://support.google.com/analytics)
- [Microsoft Clarity Documentation](https://learn.microsoft.com/en-us/clarity/)
