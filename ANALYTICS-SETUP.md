# Analytics Integration Setup

## Google Analytics 4 (GA4) Setup

### 1. Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Create an account name (e.g., "CoStudy")
4. Configure data sharing settings
5. Click "Next"

### 2. Set Up Property

1. Property name: "CoStudy Website"
2. Reporting time zone: Your timezone
3. Currency: USD
4. Click "Next"

### 3. Add Data Stream

1. Select "Web"
2. Website URL: `https://costudy.co`
3. Stream name: "CoStudy Production"
4. Click "Create stream"
5. **Copy your Measurement ID** (looks like `G-XXXXXXXXXX`)

### 4. Configure Environment Variable

1. Create a `.env.local` file in your project root
2. Add your Measurement ID:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. Restart your dev server

### 5. Enable Analytics in Production

In `src/app/layout.tsx`, uncomment the GoogleAnalytics component:

```tsx
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {GA_MEASUREMENT_ID && <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />}
        {/* rest of your layout */}
      </body>
    </html>
  );
}
```

## Event Tracking

Use the analytics library to track custom events:

```tsx
import { event } from "@/lib/analytics";

// Track form submissions
event({
  action: "form_submission",
  category: "engagement",
  label: "contact_form",
});

// Track button clicks
event({
  action: "click",
  category: "cta",
  label: "schedule_demo",
});

// Track downloads
event({
  action: "download",
  category: "resources",
  label: "team_charter_template",
});
```

## Hotjar Setup (Optional)

### 1. Create Hotjar Account

1. Go to [Hotjar](https://www.hotjar.com/)
2. Sign up for an account
3. Create a new site
4. Copy your Hotjar Site ID

### 2. Add Hotjar Script

Create `src/components/analytics/Hotjar.tsx`:

```tsx
"use client";

import Script from "next/script";

interface HotjarProps {
  siteId: string;
}

export default function Hotjar({ siteId }: HotjarProps) {
  return (
    <Script id="hotjar" strategy="afterInteractive">
      {`
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${siteId},hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `}
    </Script>
  );
}
```

### 3. Add to Environment

```
NEXT_PUBLIC_HOTJAR_SITE_ID=XXXXXXX
```

## Privacy & GDPR Compliance

⚠️ **Important**: Before enabling analytics:

1. Add a Cookie Consent banner
2. Update Privacy Policy
3. Implement opt-out mechanism
4. Configure data retention settings in GA4

### Recommended Cookie Consent Solutions:
- [CookieYes](https://www.cookieyes.com/)
- [Osano](https://www.osano.com/)
- [OneTrust](https://www.onetrust.com/)

## Testing

1. In development, open browser DevTools → Network tab
2. Look for requests to `google-analytics.com`
3. Use [Google Tag Assistant](https://tagassistant.google.com/) Chrome extension
4. Check Real-Time reports in GA4 dashboard

## Key Metrics to Track

- Page views
- Form submissions (Contact, Demo)
- Button clicks (CTA buttons)
- Time on page
- Bounce rate
- User flow through pages
- Conversion rate (demo requests)

## Next Steps

1. Set up conversion goals in GA4
2. Create custom dashboards
3. Set up alerts for important events
4. Connect to Google Search Console
5. Enable Demographics and Interests reports
