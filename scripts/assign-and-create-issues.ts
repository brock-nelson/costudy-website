import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

if (!LINEAR_API_KEY) {
  console.error('❌ LINEAR_API_KEY environment variable is required');
  process.exit(1);
}

const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

async function main() {
  console.log('🔍 Fetching team and users...\n');

  // Get the CoStudy team
  const teams = await linear.teams();
  const team = teams.nodes.find((t) => t.name === 'CoStudy');

  if (!team) {
    console.error('❌ CoStudy team not found');
    process.exit(1);
  }

  console.log(`📋 Using team: ${team.name} (${team.id})\n`);

  // Get organization users
  const users = await linear.users();
  const henry = users.nodes.find((u) => u.name?.toLowerCase().includes('henry'));
  const brock = users.nodes.find((u) => u.name?.toLowerCase().includes('brock'));

  console.log('👥 Users found:');
  if (henry) console.log(`   - Henry: ${henry.name} (${henry.id})`);
  if (brock) console.log(`   - Brock: ${brock.name} (${brock.id})`);
  console.log('');

  // Update existing platform issues (COS-114 to COS-124) - assign to Henry
  if (henry) {
    console.log('🔄 Assigning platform issues to Henry...\n');
    const platformIssues = [
      'COS-114', 'COS-115', 'COS-116', 'COS-117', 'COS-118',
      'COS-119', 'COS-120', 'COS-121', 'COS-122', 'COS-123', 'COS-124'
    ];

    for (const identifier of platformIssues) {
      try {
        const issues = await linear.issues({ filter: { number: { eq: parseInt(identifier.split('-')[1]) } } });
        const issue = issues.nodes[0];
        if (issue) {
          await linear.updateIssue(issue.id, { assigneeId: henry.id });
          console.log(`✅ Assigned ${identifier} to Henry`);
        }
      } catch (error) {
        console.error(`❌ Failed to assign ${identifier}:`, error);
      }
    }
    console.log('');
  }

  // Update existing website issues (COS-125 to COS-135) - assign to Brock
  if (brock) {
    console.log('🔄 Assigning existing website issues to Brock...\n');
    const websiteIssues = [
      'COS-125', 'COS-126', 'COS-127', 'COS-128', 'COS-129',
      'COS-130', 'COS-131', 'COS-132', 'COS-133', 'COS-134', 'COS-135'
    ];

    for (const identifier of websiteIssues) {
      try {
        const issues = await linear.issues({ filter: { number: { eq: parseInt(identifier.split('-')[1]) } } });
        const issue = issues.nodes[0];
        if (issue) {
          await linear.updateIssue(issue.id, { assigneeId: brock.id });
          console.log(`✅ Assigned ${identifier} to Brock`);
        }
      } catch (error) {
        console.error(`❌ Failed to assign ${identifier}:`, error);
      }
    }
    console.log('');
  }

  // Create new website issues and assign to Brock
  console.log('🌐 Creating additional website issues...\n');

  const newIssues = [
    {
      title: '[WEBSITE] Status page & changelog - releases, bugs, downtime log',
      description: `## Overview
Create a public status page and changelog so university customers always know the latest about the platform: releases, bug fixes, downtime, and upcoming maintenance.

## Acceptance Criteria
- [ ] Public status page at /status
- [ ] Real-time uptime monitoring
- [ ] Incident history log
- [ ] Scheduled maintenance announcements
- [ ] Changelog at /changelog
- [ ] Release notes for all deployments
- [ ] Bug fix tracking (public-facing)
- [ ] RSS feed for updates
- [ ] Email notifications for incidents
- [ ] Status badge embeddable on other sites
- [ ] Historical uptime percentage (30/60/90 days)

## Technical Requirements

### Option 1: Third-Party (Recommended for faster launch)
**Use Statuspage.io (Atlassian) or StatusPal**
- Hosted solution
- Custom domain (status.costudy.co)
- Incident management UI
- Email/SMS notifications
- 99.99% uptime SLA
- ~$29-79/month

### Option 2: Self-Hosted
**Use Upptime (GitHub Actions based)**
- Free, open-source
- Automated monitoring via GitHub Actions
- Static site generation
- Custom domain support
- Requires more setup/maintenance

**Recommendation:** Start with Statuspage.io for reliability and features.

## Status Page Sections

### 1. Current Status
- All systems operational ✅
- Partial outage ⚠️
- Major outage ❌
- Under maintenance 🔧

### 2. Systems to Monitor
- **Website** (costudy.co)
- **Platform Application** (app.costudy.co)
- **API** (api.costudy.co)
- **Authentication** (auth.costudy.co)
- **Video/Chat Services**
- **Database**
- **File Storage**
- **Email Delivery**
- **LMS Integrations** (Canvas, Blackboard, etc.)

### 3. Incident History
- Timestamp
- Duration
- Affected systems
- Root cause summary
- Resolution steps
- Post-mortem link (for major incidents)

### 4. Scheduled Maintenance
- Upcoming maintenance windows
- Expected duration
- Affected systems
- Timezone-aware display

### 5. Uptime Metrics
- Last 30 days: 99.9%
- Last 60 days: 99.95%
- Last 90 days: 99.98%
- Historical uptime chart

## Changelog Page (/changelog)

### Entry Format
**v2.5.0 - January 15, 2025**

**🚀 New Features**
- University dashboard: Added real-time analytics for student engagement
- Mobile app: Offline mode for study notes
- Integration: Added Moodle 4.0 support

**🐛 Bug Fixes**
- Fixed video call audio echo issue
- Resolved calendar sync delay with Canvas
- Fixed mobile notification delivery

**⚡ Improvements**
- Reduced page load time by 40%
- Enhanced search algorithm for finding study partners
- Updated UI for better accessibility

**🔒 Security**
- Upgraded authentication libraries
- Enhanced data encryption protocols

### Technical Implementation
\`\`\`typescript
// src/app/changelog/page.tsx
interface ChangelogEntry {
  version: string;
  date: string;
  features: string[];
  bugFixes: string[];
  improvements: string[];
  security?: string[];
}

const CHANGELOG: ChangelogEntry[] = [
  {
    version: 'v2.5.0',
    date: '2025-01-15',
    features: ['University dashboard analytics', 'Offline mode'],
    bugFixes: ['Video audio echo', 'Calendar sync delay'],
    improvements: ['40% faster load time', 'Better search'],
  },
  // ... more entries
];
\`\`\`

## Status Page API Integration

### Automated Incident Creation
- Monitor with Vercel's monitoring
- Auto-create incidents on downtime
- Update incident status via API
- Post-resolution auto-close

### Vercel Integration
\`\`\`typescript
// Webhook from monitoring service
POST /api/status/incident
{
  "status": "investigating" | "identified" | "monitoring" | "resolved",
  "systems": ["api", "database"],
  "message": "Experiencing high API latency",
  "severity": "minor" | "major" | "critical"
}
\`\`\`

## Notification System

### Incident Notifications
- Email to all subscribed users
- SMS for critical incidents (optional)
- Webhook to Slack/Teams for internal team
- RSS feed updates

### Subscription Management
- Users can subscribe to updates
- Choose notification preferences
  - All incidents
  - Major incidents only
  - Scheduled maintenance only
- Unsubscribe link

## Status Badge
Embeddable badge showing current status:
\`\`\`html
<a href="https://status.costudy.co">
  <img src="https://status.costudy.co/badge" alt="CoStudy Status">
</a>
\`\`\`

Badge states:
- 🟢 All Systems Operational
- 🟡 Partial Outage
- 🔴 Major Outage
- 🔵 Under Maintenance

## Post-Mortem Template
For major incidents, publish post-mortem:
1. **Incident Summary**
2. **Timeline of Events**
3. **Root Cause Analysis**
4. **Impact Assessment** (users affected, duration)
5. **Resolution Steps**
6. **Preventive Measures**
7. **Lessons Learned**

## Integration with Linear
- Auto-create Linear issue for incidents
- Link status page incidents to Linear issues
- Close Linear issue when incident resolved

## SEO & Public Trust
- Index status page for transparency
- Link from footer: "System Status"
- Shows commitment to reliability
- Reduces support ticket volume

## Success Metrics
- Status page uptime: 99.99%
- Incident notification delivery: <5 minutes
- Incident resolution time: <2 hours (major)
- Changelog update frequency: Weekly
- Subscriber count growth
- Reduction in "Is the site down?" support tickets`,
      priority: 1, // URGENT
      estimate: 5,
    },
    {
      title: '[WEBSITE] Analytics & conversion tracking setup',
      description: `## Overview
Set up comprehensive analytics and conversion tracking infrastructure to measure marketing effectiveness and optimize for university decision-makers.

## Acceptance Criteria
- [ ] Google Analytics 4 configured with custom events
- [ ] Conversion tracking for demo requests, contact forms
- [ ] Heat mapping tool integrated (Hotjar or Microsoft Clarity)
- [ ] Event tracking for key user journeys
- [ ] UTM parameter tracking for campaigns
- [ ] Attribution tracking dashboard
- [ ] Real-time alerts for high-value conversions

## Technical Requirements
- Install \`react-ga4\` or \`@next/third-parties/google\`
- Set up Google Tag Manager container
- Configure custom events: demo_request, contact_submit, pricing_view
- Set up conversion goals in GA4
- Integrate Hotjar or Clarity script
- Create tracking utility functions in \`src/lib/analytics.ts\`

## Key Events to Track
- Demo request submissions
- Pricing page views
- Feature comparison interactions
- Case study views
- Resource downloads
- Newsletter signups

## Success Metrics
- Track conversion rate from homepage → demo request
- Identify highest-performing traffic sources
- Measure time to conversion for different university types`,
      priority: 1, // URGENT
      estimate: 3,
    },
    {
      title: '[WEBSITE] Legal pages - Privacy Policy, Terms of Service, Cookie Policy',
      description: `## Overview
Create legally compliant pages required for B2B sales to universities, including FERPA/COPPA compliance statements.

## Acceptance Criteria
- [ ] Privacy Policy page with FERPA compliance
- [ ] Terms of Service for university customers
- [ ] Cookie Policy with consent management
- [ ] Data Processing Agreement (DPA) template
- [ ] COPPA compliance statement
- [ ] Subprocessor list
- [ ] Cookie consent banner implemented
- [ ] Legal pages linked in footer

## Technical Requirements
- Create \`src/app/legal/privacy/page.tsx\`
- Create \`src/app/legal/terms/page.tsx\`
- Create \`src/app/legal/cookies/page.tsx\`
- Create \`src/app/legal/dpa/page.tsx\`
- Install cookie consent library (e.g., \`react-cookie-consent\`)
- Add last updated dates
- SEO optimization for legal pages

## Content Requirements
- FERPA compliance language for student data
- COPPA compliance for users under 13
- Data retention policies
- Security measures and incident response
- Right to data portability and deletion
- University-specific clauses for institutional licensing

## Compliance References
- FERPA: https://www2.ed.gov/policy/gen/guid/fpco/ferpa/
- COPPA: https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa

## Success Metrics
- Legal review completed by counsel
- Cookie consent opt-in rate tracked`,
      priority: 1, // URGENT
      estimate: 5,
    },
    {
      title: '[WEBSITE] Performance optimization - Core Web Vitals',
      description: `## Overview
Optimize website performance to achieve excellent Core Web Vitals scores, critical for SEO and user experience with university decision-makers.

## Acceptance Criteria
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] All images optimized with next/image
- [ ] WebP format with fallbacks
- [ ] Code splitting implemented
- [ ] Lazy loading for below-fold content
- [ ] CDN configuration optimized
- [ ] Lighthouse score > 90

## Technical Requirements
- Audit all images, convert to WebP
- Replace \`<img>\` tags with \`next/image\`
- Implement dynamic imports for heavy components
- Configure \`next.config.js\` for image optimization
- Set up CDN caching headers
- Minimize JavaScript bundle size
- Implement font optimization (next/font)
- Remove unused CSS
- Prefetch critical resources

## Performance Budget
- Initial bundle < 200KB gzipped
- Images < 100KB each
- Total page weight < 1MB
- Time to Interactive < 3s on 3G

## Testing
- Test with Lighthouse (desktop & mobile)
- Test on real devices (iPhone, Android)
- Test on slow 3G connection
- Monitor with Vercel Analytics

## Success Metrics
- 95+ Lighthouse score (Performance)
- 100 Lighthouse score (Accessibility)
- < 2s page load time (cached)`,
      priority: 1, // URGENT
      estimate: 5,
    },
    {
      title: '[WEBSITE] Lead capture & CRM integration',
      description: `## Overview
Build comprehensive lead capture system with CRM integration to manage university sales pipeline.

## Acceptance Criteria
- [ ] Demo request form with qualification questions
- [ ] Contact sales form with institution details
- [ ] HubSpot/Salesforce integration configured
- [ ] Auto-responder email sequences
- [ ] Lead scoring based on institution size
- [ ] Sales team notification system
- [ ] Lead routing logic (by region, size, etc.)
- [ ] Form analytics tracking

## Technical Requirements
- Create \`src/components/forms/DemoRequestForm.tsx\`
- Create \`src/components/forms/ContactSalesForm.tsx\`
- Integrate with HubSpot Forms API or Salesforce Web-to-Lead
- Set up SendGrid transactional emails for auto-responders
- Create \`src/app/api/leads/route.ts\` endpoint
- Implement form validation with react-hook-form
- Add spam protection (reCAPTCHA or hCaptcha)

## Qualification Questions
- Institution name and type
- Number of students
- Current study tools used
- Timeline for implementation
- Budget range
- Decision-maker role
- Specific pain points

## Lead Scoring Rules
- Enterprise university (>20k students): +50 points
- Mid-size university (5k-20k): +30 points
- Community college: +20 points
- Title contains "Director", "VP", "Dean": +30 points
- Timeline < 3 months: +20 points

## Auto-Responder Sequence
1. Immediate: Thank you + what to expect
2. 1 hour: Case study relevant to institution type
3. 24 hours: Calendar link to book demo
4. 3 days: Educational content on student retention

## Success Metrics
- Demo request conversion rate > 2%
- Lead-to-opportunity conversion > 15%
- Average time to first response < 2 hours`,
      priority: 1, // URGENT
      estimate: 5,
    },
    {
      title: '[WEBSITE] Social proof infrastructure - testimonials & ROI calculator',
      description: `## Overview
Build social proof elements to establish credibility with university decision-makers: video testimonials, ROI calculator, success metrics, certifications.

## Acceptance Criteria
- [ ] Video testimonial component with university partners
- [ ] ROI calculator for cost savings calculation
- [ ] Student success metrics dashboard
- [ ] Accreditation/certification badges
- [ ] University logo showcase
- [ ] Quantified results section (e.g., "30% increase in retention")
- [ ] Trust bar with security certifications

## Technical Requirements
- Create \`src/components/VideoTestimonial.tsx\`
- Create \`src/components/ROICalculator.tsx\`
- Create \`src/components/MetricsDashboard.tsx\`
- Create \`src/components/TrustBadges.tsx\`
- Set up video hosting (Vimeo or YouTube)
- Build interactive calculator with state management
- Add animation for metric counters

## ROI Calculator Inputs
- Number of students
- Current retention rate
- Average tuition per student
- Cost of current collaboration tools
- Estimated improvement (based on case studies)

## ROI Calculator Outputs
- Annual cost savings
- Additional tuition revenue from retention
- Cost per student
- Payback period
- 3-year ROI

## Testimonial Content
- University name and logo
- Person's name, title, photo
- Video testimonial (2-3 minutes)
- Written quote pull
- Key metrics achieved
- Before/after story

## Metrics to Display
- X universities using CoStudy
- Y million study sessions completed
- Z% improvement in student retention
- Average NPS score
- Hours of study collaboration

## Success Metrics
- ROI calculator completion rate > 40%
- Testimonial video view rate > 60%
- Correlation between social proof views and demo requests`,
      priority: 1, // URGENT
      estimate: 5,
    },
    {
      title: '[WEBSITE] Interactive product demo & feature tour',
      description: `## Overview
Create an interactive product demo that allows prospective university customers to explore CoStudy features without signing up.

## Acceptance Criteria
- [ ] Embedded demo environment or video walkthrough
- [ ] Interactive feature highlight tour
- [ ] Self-serve sandbox for IT evaluators
- [ ] Demo request CTA at end of tour
- [ ] Analytics tracking for demo interactions
- [ ] Mobile-responsive demo experience

## Technical Requirements
- Create \`src/app/demo/page.tsx\`
- Build interactive tour with Intro.js or Shepherd.js
- Embed demo video or screenshot carousel
- Create demo state management (show sample data)
- Add step-by-step feature highlights
- Implement progress tracking
- Add contextual tooltips

## Demo Flow
1. Welcome screen explaining what they'll see
2. Study group creation demo
3. Real-time collaboration features
4. Video/screen sharing capabilities
5. Assignment management
6. Analytics dashboard for admins
7. CTA: Request full demo

## Interactive Elements
- Click through UI mockups
- Sample student profiles
- Pre-populated study sessions
- Example assignments and deadlines
- Mock analytics data

## Features to Showcase
- Study group creation and management
- Real-time chat and collaboration
- Video/screen sharing integration
- Assignment tracking
- Grade sync with LMS
- Admin dashboard and analytics
- SSO/SAML authentication
- Mobile app preview

## Success Metrics
- Demo completion rate > 50%
- Average time spent in demo > 3 minutes
- Demo → request conversion rate > 10%`,
      priority: 2, // HIGH
      estimate: 5,
    },
    {
      title: '[WEBSITE] Security & compliance page',
      description: `## Overview
Create a dedicated security and compliance page to address university IT and legal requirements.

## Acceptance Criteria
- [ ] SOC 2 Type II certification display
- [ ] FERPA compliance details
- [ ] COPPA compliance information
- [ ] Data security practices documentation
- [ ] Encryption standards (at-rest and in-transit)
- [ ] Incident response protocols
- [ ] Penetration testing results
- [ ] Disaster recovery plan
- [ ] Data residency options
- [ ] Security whitepaper download

## Technical Requirements
- Create \`src/app/security/page.tsx\`
- Design trust-building layout
- Add certification badge components
- Create downloadable PDF security docs
- Implement accordion FAQ section
- Add schema.org markup for certifications

## Content Sections
1. **Certifications & Standards**
   - SOC 2 Type II
   - FERPA compliant
   - COPPA compliant
   - GDPR ready
   - ISO 27001 (if applicable)

2. **Data Security**
   - AES-256 encryption at rest
   - TLS 1.3 in transit
   - Database encryption
   - Secure API endpoints
   - Authentication methods

3. **Infrastructure Security**
   - Cloud provider (AWS/GCP security)
   - DDoS protection
   - Intrusion detection
   - Regular security audits
   - Vulnerability scanning

4. **Access Controls**
   - Role-based access control (RBAC)
   - SSO/SAML support
   - Multi-factor authentication
   - Session management
   - Audit logging

5. **Compliance**
   - FERPA compliance statement
   - COPPA safe harbor
   - Student data privacy
   - Data retention policies
   - Right to deletion

6. **Incident Response**
   - Security incident protocol
   - Breach notification procedures
   - 24/7 monitoring
   - Incident response team

## Downloadable Resources
- Security whitepaper (PDF)
- DPA template
- Compliance checklist
- Security questionnaire responses

## Success Metrics
- Page views from demo leads
- Security doc download rate
- Time spent on page (target: >2 min)
- Correlation with deal closing rates`,
      priority: 2, // HIGH
      estimate: 3,
    },
    {
      title: '[WEBSITE] Comparison/alternatives page - vs Zoom, Teams, Discord',
      description: `## Overview
Create comparison pages to capture search traffic from users evaluating alternatives and position CoStudy as the superior education-focused solution.

## Acceptance Criteria
- [ ] CoStudy vs Zoom study rooms comparison
- [ ] CoStudy vs Microsoft Teams comparison
- [ ] CoStudy vs Discord for education comparison
- [ ] Feature comparison tables
- [ ] Migration guides from competitors
- [ ] SEO optimized for "[competitor] alternative for universities"
- [ ] Unbiased tone with honest pros/cons

## Technical Requirements
- Create \`src/app/compare/zoom/page.tsx\`
- Create \`src/app/compare/teams/page.tsx\`
- Create \`src/app/compare/discord/page.tsx\`
- Create reusable ComparisonTable component
- Add structured data (schema.org/Product)
- Optimize meta tags for comparison keywords

## Comparison Dimensions

### CoStudy vs Zoom
| Feature | CoStudy | Zoom |
|---------|---------|------|
| Built for education | ✅ Yes | ❌ General purpose |
| Study group management | ✅ Native | ❌ Manual |
| LMS integration | ✅ Canvas, Blackboard | ⚠️ Limited |
| Persistent study spaces | ✅ Yes | ❌ Session-based |
| Academic calendar sync | ✅ Yes | ❌ No |
| Assignment tracking | ✅ Built-in | ❌ No |
| Student analytics | ✅ Detailed | ⚠️ Basic |
| FERPA compliant | ✅ Yes | ✅ Yes |
| Pricing for education | ✅ Institutional | ❌ Per-seat |

### CoStudy vs Microsoft Teams
| Feature | CoStudy | Teams |
|---------|---------|-------|
| Education-specific | ✅ Yes | ⚠️ General collab |
| Study-focused UI | ✅ Purpose-built | ❌ Corporate UI |
| Ease of use | ✅ Simple | ⚠️ Complex |
| LMS integration | ✅ Deep integration | ⚠️ Basic |
| Setup complexity | ✅ Turnkey | ❌ IT-intensive |

### CoStudy vs Discord
| Feature | CoStudy | Discord |
|---------|---------|---------|
| Professional/academic | ✅ Yes | ❌ Gaming focus |
| Admin controls | ✅ Robust | ⚠️ Limited |
| FERPA compliant | ✅ Certified | ❌ Not designed for |
| University support | ✅ Dedicated | ❌ Self-service |
| Brand safety | ✅ Controlled | ⚠️ Public servers |

## SEO Keywords
- "Zoom alternative for universities"
- "Microsoft Teams vs study group software"
- "Discord alternative for education"
- "Best virtual study platform for colleges"
- "Study group software comparison"

## Call to Action
- "Switch from [Competitor]" CTA
- Free migration assistance offer
- Side-by-side demo scheduling
- ROI calculator comparing costs

## Success Metrics
- Organic traffic from comparison keywords
- Conversion rate from comparison pages
- Competitor keyword rankings (top 5)`,
      priority: 2, // HIGH
      estimate: 5,
    },
    {
      title: '[WEBSITE] Integration showcase - LMS, SSO, SIS integrations',
      description: `## Overview
Create an integrations page showcasing all platform integrations to address IT evaluator requirements and reduce implementation concerns.

## Acceptance Criteria
- [ ] Integration gallery with logos
- [ ] Detailed integration pages for top LMS
- [ ] SSO/SAML provider compatibility list
- [ ] SIS (Student Information System) integrations
- [ ] API documentation links
- [ ] Integration setup guides
- [ ] Third-party app directory
- [ ] Coming soon integrations roadmap

## Technical Requirements
- Create \`src/app/integrations/page.tsx\`
- Create \`src/app/integrations/[slug]/page.tsx\` for individual integrations
- Create IntegrationCard component
- Add filtering by category
- Add search functionality
- Implement integration request form

## Integration Categories

### Learning Management Systems (LMS)
- Canvas by Instructure
- Blackboard Learn
- Moodle
- Desire2Learn (D2L/Brightspace)
- Schoology
- Google Classroom

### Single Sign-On (SSO)
- SAML 2.0
- Okta
- OneLogin
- Azure AD / Microsoft Entra
- Google Workspace
- Shibboleth
- CAS (Central Authentication Service)

### Student Information Systems (SIS)
- Ellucian Banner
- Ellucian Colleague
- Oracle PeopleSoft Campus Solutions
- Workday Student
- Jenzabar
- PowerSchool

### Communication Tools
- Slack
- Microsoft Teams
- Zoom
- Google Meet

### Productivity
- Google Drive
- Microsoft OneDrive
- Dropbox
- Notion

## Integration Detail Pages
Each integration should include:
- Logo and description
- Key features enabled
- Setup difficulty (Easy/Medium/Advanced)
- Setup time estimate
- Prerequisites
- Step-by-step setup guide
- Screenshots
- Support resources
- FAQ

## Example: Canvas Integration
**What it does:**
- Automatic course and roster sync
- Assignment grade passback
- Deep linking from Canvas courses
- Single sign-on
- Real-time enrollment updates

**Setup time:** 30 minutes
**Prerequisites:** Canvas admin access, CoStudy admin account
**Difficulty:** Easy

## API Documentation
- Link to public API docs
- Developer portal
- Webhook documentation
- Rate limits
- Authentication methods

## Coming Soon Section
- Integrations in development
- Request new integration form
- Community voting on priorities

## Success Metrics
- Integrations page views from prospects
- Integration search queries
- API documentation access rate
- Impact on IT concerns during sales`,
      priority: 2, // HIGH
      estimate: 5,
    },
    {
      title: '[WEBSITE] A/B testing infrastructure',
      description: `## Overview
Implement A/B testing framework to optimize conversion rates for headlines, CTAs, demo request flow, and pricing display.

## Acceptance Criteria
- [ ] A/B testing framework installed
- [ ] Experiment tracking in analytics
- [ ] Test for homepage headline variants
- [ ] Test for CTA button copy
- [ ] Test for demo form length
- [ ] Test for social proof placement
- [ ] Statistical significance calculator
- [ ] Admin dashboard for managing tests

## Technical Requirements
- Install testing library (Vercel Flags, PostHog, or Optimizely)
- Create \`src/lib/experiments.ts\` utility
- Set up feature flags in Vercel
- Integrate with Google Analytics for conversion tracking
- Create \`src/components/Experiment.tsx\` wrapper component
- Build admin UI for test management

## Priority Tests to Run

### Test 1: Homepage Headline
**Variant A:** "Transform Student Collaboration at Your University"
**Variant B:** "Increase Student Retention Through Better Study Groups"
**Variant C:** "The Study Platform Universities Trust"
**Metric:** Demo request conversion rate

### Test 2: Primary CTA Copy
**Variant A:** "Request a Demo"
**Variant B:** "See It in Action"
**Variant C:** "Schedule Demo"
**Variant D:** "Get Started"
**Metric:** Click-through rate

### Test 3: Demo Form Length
**Variant A:** Short form (name, email, institution)
**Variant B:** Long form (+ role, students, timeline, phone)
**Metric:** Form completion rate vs lead quality score

### Test 4: Social Proof Placement
**Variant A:** Logo bar above fold
**Variant B:** Testimonials above fold
**Variant C:** Statistics above fold
**Metric:** Time on site + demo requests

### Test 5: Pricing Display
**Variant A:** "Contact for Pricing"
**Variant B:** Starting price + tiers
**Variant C:** ROI calculator prominent
**Metric:** Demo request from pricing page

## Testing Framework Example
\`\`\`typescript
import { useExperiment } from '@/lib/experiments';

export function HeroSection() {
  const headline = useExperiment('homepage-headline', {
    variants: ['variant-a', 'variant-b', 'variant-c'],
    defaultVariant: 'variant-a',
  });

  const headlineText = {
    'variant-a': 'Transform Student Collaboration',
    'variant-b': 'Increase Student Retention',
    'variant-c': 'The Study Platform Universities Trust',
  }[headline];

  return <h1>{headlineText}</h1>;
}
\`\`\`

## Statistical Significance
- Minimum sample size calculator
- Required confidence level: 95%
- Test duration: minimum 2 weeks or 1000 visitors
- Winner declared only at p < 0.05

## Test Documentation
- Hypothesis documented before test
- Success metrics defined upfront
- Test results logged with learnings
- Implement winning variant

## Success Metrics
- Number of active experiments
- Lift in conversion rate from winners
- Time to statistical significance
- Learnings documented per test`,
      priority: 3, // MEDIUM
      estimate: 5,
    },
    {
      title: '[WEBSITE] University-specific landing pages template',
      description: `## Overview
Create dynamic landing page template for personalized university campaigns (\`/universities/[slug]\`) with institution-specific content.

## Acceptance Criteria
- [ ] Dynamic route: \`/universities/[slug]\`
- [ ] Template accepts university data (name, logo, stats)
- [ ] Personalized headline with university name
- [ ] Campus-specific success metrics
- [ ] Relevant case study from similar institution
- [ ] UTM parameter tracking per campaign
- [ ] A/B testing capability per university
- [ ] CMS integration for non-technical updates

## Technical Requirements
- Create \`src/app/universities/[slug]/page.tsx\`
- Create university data schema
- Store university configs in \`src/data/universities.json\`
- Generate static pages at build time
- Dynamic OG images with university name
- SEO meta tags per university

## University Data Schema
\`\`\`json
{
  "slug": "stanford",
  "name": "Stanford University",
  "type": "research-university",
  "studentCount": 17000,
  "logo": "/universities/stanford-logo.svg",
  "heroImage": "/universities/stanford-campus.jpg",
  "stats": {
    "studyGroups": 450,
    "students": 8500,
    "retentionImprovement": "18%"
  },
  "testimonial": {
    "quote": "CoStudy transformed how our students collaborate...",
    "author": "Dr. Jane Smith",
    "title": "Director of Student Success",
    "photo": "/testimonials/jane-smith.jpg"
  },
  "relevantCaseStudy": "mit-case-study",
  "primaryColor": "#8C1515"
}
\`\`\`

## Personalized Sections

### Hero
- "[University Name], empower your students with CoStudy"
- Campus photo in background
- University-specific statistics

### Social Proof
- "[X] students at [University Name] already use CoStudy"
- Testimonial from similar institution type
- Logos of peer institutions

### Features
- Highlight features relevant to institution type
  - Research universities: Advanced analytics
  - Community colleges: Mobile-first design
  - Liberal arts: Intimate study groups

### Pricing
- Estimated pricing based on student count
- Custom quote CTA

### CTA
- "Schedule a demo for [University Name]"
- Pre-filled demo form with university name

## Institution Types
- R1 Research Universities
- R2 Doctoral Universities
- Master's Colleges
- Baccalaureate Colleges
- Community Colleges
- For-Profit Universities

## URL Examples
- /universities/stanford
- /universities/mit
- /universities/uc-berkeley
- /universities/harvard
- /universities/yale

## Campaign Use Cases
- Direct mail campaigns with personalized URLs
- LinkedIn ads targeting specific universities
- Conference booth QR codes
- Email campaigns to specific institutions
- Paid search for "[University Name] study platform"

## SEO Optimization
- Title: "CoStudy for [University Name] | Student Collaboration Platform"
- Meta description includes university name
- Schema.org LocalBusiness markup
- Dynamic OG images with university branding

## Success Metrics
- Conversion rate per university page
- Cost per lead by institution type
- A/B test results per university
- Personalization impact on demo requests`,
      priority: 3, // MEDIUM
      estimate: 5,
    },
    {
      title: '[WEBSITE] Redesign hero header with modern dynamic background',
      description: `## Overview
Redesign the homepage hero header with a modern, engaging dynamic background that captures attention and communicates innovation.

## Acceptance Criteria
- [ ] Modern animated background (gradient, particles, or video)
- [ ] Smooth animations (no jank)
- [ ] Mobile-responsive and performant
- [ ] Accessibility compliant (prefers-reduced-motion)
- [ ] Dark mode support
- [ ] Loading state handled gracefully
- [ ] <5KB additional bundle size

## Design Options

### Option 1: Animated Gradient Mesh
- Dynamic flowing gradient colors
- Smooth color transitions
- CSS-based (no external dependencies)
- Libraries: \`framer-motion\` for orchestration

### Option 2: Particle Network
- Floating particles connected by lines
- Interactive (particles follow cursor)
- Canvas-based animation
- Libraries: \`react-tsparticles\` or custom canvas

### Option 3: Video Background
- High-quality looping video of students collaborating
- Optimized WebM/MP4 files
- Fallback to static image
- Lazy loaded

### Option 4: SVG Animated Waves
- Layered wave animations
- Color transitions
- Lightweight SVG
- Libraries: Custom SVG + GSAP

### Option 5: Code Rain Effect (Matrix style)
- Falling characters representing collaboration data
- Subtle, modern aesthetic
- Canvas-based

## Recommended Approach: Animated Gradient Mesh
Modern, performant, and on-brand for education tech.

## Technical Implementation
\`\`\`tsx
'use client';

import { motion } from 'framer-motion';

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{ backgroundSize: '200% 200%' }}
      />
      <div className="absolute inset-0 backdrop-blur-3xl opacity-90" />
    </div>
  );
}
\`\`\`

## Performance Considerations
- Use CSS transforms (GPU-accelerated)
- Avoid layout thrashing
- Respect \`prefers-reduced-motion\` media query
- Lazy load animation library
- Test on low-end devices

## Accessibility
- Provide skip link to main content
- Pause animation on focus
- Ensure text contrast ratio ≥ 4.5:1
- Support keyboard navigation

## Dark Mode
- Adjust colors for dark theme
- Maintain contrast ratios
- Smooth theme transition

## Success Metrics
- Page load time impact < 0.5s
- Lighthouse performance score maintained
- User engagement (time on page) increase
- Qualitative feedback from stakeholders`,
      priority: 2, // HIGH
      estimate: 3,
    },
    {
      title: '[WEBSITE] 404/500 error pages with branding',
      description: `## Overview
Create branded error pages (404 Not Found, 500 Server Error) that maintain user experience and provide helpful navigation.

## Acceptance Criteria
- [ ] Custom 404 page with helpful navigation
- [ ] Custom 500 page with support contact
- [ ] Search functionality on 404 page
- [ ] Suggested pages based on URL
- [ ] Report broken link option
- [ ] Maintains site navigation
- [ ] Analytics tracking for 404s
- [ ] Fun, on-brand messaging

## Technical Requirements
- Create \`src/app/not-found.tsx\` (404)
- Create \`src/app/error.tsx\` (500)
- Track 404s in Google Analytics
- Add error boundary for React errors
- Include site search
- Suggest similar pages algorithm

## 404 Page Design

### Headline Options
- "Oops! This study session doesn't exist"
- "404: Page not found (but your success story starts here)"
- "Lost? Let's get you back on track"

### Content
- Friendly explanation
- Search bar to find what they're looking for
- Links to popular pages (Homepage, Demo, Pricing, Features)
- Suggested pages based on URL similarity
- "Report broken link" form
- University logos trust bar

### Example Layout
\`\`\`
[Illustration of confused student]

# Page Not Found

The page you're looking for might have moved or doesn't exist.

[Search box: "What are you looking for?"]

Popular pages:
- Request a Demo
- See Pricing
- View Features
- Read Case Studies

[Report Broken Link]
\`\`\`

## 500 Page Design

### Headline
- "Something went wrong on our end"
- "Our servers are taking a study break"

### Content
- Apologize for the error
- Let them know the team has been notified
- Provide support email/phone
- Suggest trying again in a moment
- Link to status page (if available)
- Social media links for updates

### Example Layout
\`\`\`
[Illustration of server with a study break]

# We're experiencing technical difficulties

Our team has been notified and is working on it.

Try:
- Refreshing the page
- Coming back in a few minutes
- Contacting support: support@costudy.co

[Back to Homepage]
\`\`\`

## Analytics Tracking
Log 404 errors with:
- Requested URL
- Referrer
- User agent
- Timestamp

## Similar Page Suggestions
Algorithm to suggest pages:
\`\`\`typescript
function suggestPages(requestedPath: string) {
  const pages = [
    { path: '/demo', title: 'Request Demo', keywords: ['demo', 'trial'] },
    { path: '/pricing', title: 'Pricing', keywords: ['pricing', 'cost', 'price'] },
    { path: '/features', title: 'Features', keywords: ['features', 'product'] },
  ];

  // Calculate similarity score based on keywords
  // Return top 3 matches
}
\`\`\`

## Success Metrics
- 404 bounce rate (target: <70%)
- Recovery rate (navigation to valid page)
- Most common 404 URLs (fix broken links)
- User-reported broken links`,
      priority: 3, // MEDIUM
      estimate: 2,
    },
    {
      title: '[WEBSITE] XML sitemap & robots.txt optimization',
      description: `## Overview
Generate and optimize XML sitemap and robots.txt for maximum search engine discoverability.

## Acceptance Criteria
- [ ] Dynamic XML sitemap at /sitemap.xml
- [ ] Sitemap includes all public pages
- [ ] Sitemap updates automatically on content changes
- [ ] robots.txt configured properly
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Sitemap split by content type (pages, blog, resources)
- [ ] Priority and changefreq configured per page type

## Technical Requirements
- Use Next.js 15 sitemap generation API
- Create \`src/app/sitemap.ts\`
- Create \`src/app/robots.ts\`
- Configure in \`next.config.js\`
- Add lastmod timestamps
- Handle dynamic routes
- Include canonical URLs

## Sitemap Structure
\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://costudy.co/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://costudy.co/demo</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- More URLs -->
</urlset>
\`\`\`

## Priority Levels
- Homepage: 1.0
- Demo, Pricing: 0.9
- Features, Case Studies: 0.8
- Blog posts: 0.7
- Resources: 0.6
- Legal pages: 0.3

## Change Frequency
- Homepage: daily
- Blog: weekly
- Product pages: weekly
- Legal pages: monthly
- Static pages: yearly

## robots.txt Configuration
\`\`\`
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/

Sitemap: https://costudy.co/sitemap.xml
Sitemap: https://costudy.co/sitemap-blog.xml
Sitemap: https://costudy.co/sitemap-resources.xml
\`\`\`

## Next.js Implementation
\`\`\`typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://costudy.co';

  const routes = [
    { url: '/', priority: 1.0, changeFrequency: 'daily' },
    { url: '/demo', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/pricing', priority: 0.9, changeFrequency: 'weekly' },
    // ... more routes
  ];

  return routes.map(route => ({
    url: \`\${baseUrl}\${route.url}\`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
\`\`\`

## Dynamic Content
- Fetch blog posts from CMS/database
- Include university landing pages
- Include resource pages
- Exclude private/auth pages

## Search Console Setup
1. Verify domain ownership
2. Submit sitemap URL
3. Monitor indexing status
4. Fix crawl errors
5. Set up email alerts

## Success Metrics
- 100% of public pages in sitemap
- All pages indexed by Google within 7 days
- Zero crawl errors in Search Console
- Organic search visibility increase`,
      priority: 3, // MEDIUM
      estimate: 2,
    },
    {
      title: '[WEBSITE] Email newsletter signup & automation',
      description: `## Overview
Implement email newsletter signup for higher education insights with SendGrid integration and automated welcome sequence.

## Acceptance Criteria
- [ ] Newsletter signup form on homepage
- [ ] Signup form in footer
- [ ] Dedicated /newsletter page
- [ ] SendGrid contact list integration
- [ ] Welcome email automation
- [ ] Weekly newsletter template
- [ ] Unsubscribe management
- [ ] GDPR/CAN-SPAM compliance
- [ ] Analytics tracking for signups

## Technical Requirements
- Create \`src/components/NewsletterSignup.tsx\`
- Create \`src/app/api/newsletter/subscribe/route.ts\`
- Integrate with SendGrid Marketing Campaigns API
- Create email templates with React Email
- Set up SendGrid automation for welcome series
- Add double opt-in confirmation
- Create unsubscribe page

## Newsletter Value Proposition
**For University Decision Makers:**
- "Get Higher Ed Insights Weekly"
- "Student Success Strategies & Best Practices"
- "Latest Trends in EdTech"

**Content Topics:**
- Student retention strategies
- EdTech implementation tips
- University case studies
- Industry research and reports
- Product updates and webinar invites

## Signup Form Fields
- Email (required)
- First name (optional)
- Institution name (optional)
- Role (dropdown: Administrator, IT Director, Faculty, Other)
- Interests (checkboxes: Retention, EdTech, Analytics)

## SendGrid Integration
\`\`\`typescript
// src/app/api/newsletter/subscribe/route.ts
import sgClient from '@sendgrid/client';

export async function POST(request: Request) {
  const { email, firstName, institution, role } = await request.json();

  const data = {
    list_ids: [process.env.SENDGRID_NEWSLETTER_LIST_ID],
    contacts: [{
      email,
      first_name: firstName,
      custom_fields: {
        institution,
        role,
      },
    }],
  };

  await sgClient.request({
    method: 'PUT',
    url: '/v3/marketing/contacts',
    body: data,
  });

  return Response.json({ success: true });
}
\`\`\`

## Welcome Email Sequence

### Email 1: Immediate
**Subject:** "Welcome to CoStudy Insights"
- Thank you for subscribing
- What to expect (weekly emails on Wednesdays)
- Link to latest blog post
- Invite to follow on LinkedIn

### Email 2: Day 3
**Subject:** "How Universities Are Improving Retention with CoStudy"
- Featured case study
- ROI statistics
- CTA: Schedule a demo

### Email 3: Day 7
**Subject:** "5 Student Success Strategies You Can Implement Today"
- Actionable tips
- Link to resources page
- Webinar invitation

## Newsletter Template Design
- Header with CoStudy logo
- Featured article (hero image + excerpt)
- 3-4 additional articles (title + summary)
- University spotlight
- Product update section
- Footer with social links and unsubscribe

## Unsubscribe Flow
- One-click unsubscribe link in footer
- Preference center (choose email frequency)
- Feedback form (why unsubscribing)
- Confirm unsubscribe

## Compliance
- Double opt-in confirmation email
- Clear unsubscribe link in every email
- Physical mailing address in footer
- Privacy policy link
- CAN-SPAM compliant
- GDPR consent checkbox (if EU subscribers)

## Analytics Tracking
- Signup source (homepage, footer, /newsletter)
- Signup conversion rate
- Open rate (target: >25%)
- Click-through rate (target: >3%)
- Unsubscribe rate (target: <0.5%)
- Most popular content

## Newsletter Schedule
- Send: Wednesdays at 10 AM EST
- Frequency: Weekly
- A/B test subject lines
- Segment by role/institution type

## Success Metrics
- Newsletter signups per month (target: 200+)
- Email list growth rate
- Engagement rate (opens + clicks)
- Newsletter → demo request conversion`,
      priority: 3, // MEDIUM
      estimate: 3,
    },
    {
      title: '[WEBSITE] Press/media kit page',
      description: `## Overview
Create a press and media kit page for journalists, conference organizers, and partners with downloadable brand assets.

## Acceptance Criteria
- [ ] High-resolution logos (PNG, SVG)
- [ ] Brand guidelines PDF
- [ ] Product screenshots
- [ ] Press releases
- [ ] Executive headshots and bios
- [ ] Company fact sheet
- [ ] Media contact information
- [ ] Social media links
- [ ] Video assets (if available)
- [ ] ZIP download of all assets

## Technical Requirements
- Create \`src/app/press/page.tsx\`
- Organize assets in \`/public/press-kit/\`
- Create downloadable ZIP file
- Track downloads in analytics
- Make easily shareable (OG tags optimized)

## Page Sections

### 1. Company Overview
**About CoStudy:**
CoStudy is a student collaboration platform that helps universities increase retention and student success through virtual study groups and peer learning.

**Founded:** [Year]
**Headquarters:** [Location]
**Website:** https://costudy.co
**LinkedIn:** [URL]

### 2. Quick Facts
- X universities using CoStudy
- Y million study sessions completed
- Z% average improvement in student retention
- Available on web, iOS, Android
- FERPA and COPPA compliant

### 3. Logos & Brand Assets
- Logo (full color, white, black)
- Icon/app icon
- Supported formats: PNG (transparent), SVG, EPS
- Minimum size requirements
- Clear space guidelines
- Dos and don'ts

### 4. Brand Colors
- Primary: #[HEX] (Blue)
- Secondary: #[HEX] (Purple)
- Accent: #[HEX] (Green)
- Download brand guidelines PDF

### 5. Product Screenshots
- Dashboard view
- Study group interface
- Mobile app screens
- Analytics dashboard
- Admin panel
- High-resolution (at least 1920x1080)
- With and without UI mockups

### 6. Leadership Team
**Brock Nelson, [Title]**
- Professional headshot (300x300)
- Bio (150 words)
- LinkedIn, Twitter

**Henry [Last Name], [Title]**
- Headshot
- Bio
- Social links

### 7. Press Releases
List of press releases in reverse chronological order:
- "CoStudy Raises $X in Seed Funding" (Date)
- "CoStudy Partners with [University]" (Date)
- "CoStudy Launches New Features" (Date)

Each with:
- Full text or link to release
- PDF download option

### 8. Media Coverage
"As featured in:"
- Logo links to publications (TechCrunch, EdSurge, etc.)
- Quote pull from articles
- Link to full coverage

### 9. Media Contact
**For press inquiries:**
- Name: [Press Contact]
- Email: press@costudy.co
- Phone: [Number]
- Response time: Within 24 hours

### 10. Download All Assets
- One-click ZIP download
- Organized folder structure
- README file included

## ZIP File Structure
\`\`\`
costudy-press-kit/
├── logos/
│   ├── costudy-logo-fullcolor.svg
│   ├── costudy-logo-white.svg
│   ├── costudy-logo-black.svg
│   └── costudy-icon.png
├── screenshots/
│   ├── dashboard.png
│   ├── study-group.png
│   └── mobile-app.png
├── headshots/
│   ├── brock-nelson.jpg
│   └── henry-[lastname].jpg
├── brand-guidelines.pdf
├── company-fact-sheet.pdf
└── README.txt
\`\`\`

## Brand Guidelines PDF Content
- Logo usage rules
- Clear space requirements
- Color palette
- Typography (fonts used)
- Dos and don'ts
- Examples of correct usage
- Contact for questions

## Company Fact Sheet (1-pager PDF)
- Company overview
- Mission statement
- Key statistics
- Product offerings
- Target market
- Leadership team
- Contact information

## Success Metrics
- Press kit page views
- Asset downloads
- Press mentions increase
- Media inquiry response time
- Brand consistency in coverage`,
      priority: 4, // LOW
      estimate: 2,
    },
    {
      title: '[WEBSITE] Live chat / AI chatbot for lead qualification',
      description: `## Overview
Implement live chat with AI-powered chatbot for instant lead qualification, answering common questions, and routing to sales team.

## Acceptance Criteria
- [ ] Chat widget on all pages (bottom-right)
- [ ] AI chatbot for instant responses
- [ ] Handoff to human during business hours
- [ ] Lead qualification questions
- [ ] Calendar integration for demo scheduling
- [ ] Chat transcripts saved
- [ ] Mobile-responsive chat interface
- [ ] Proactive chat triggers
- [ ] Analytics tracking (chat starts, conversions)

## Technical Requirements

### Option 1: Third-Party Solutions
**Recommended:** Intercom, Drift, or Crisp
- Easy integration (script tag)
- Built-in AI chatbot
- CRM integration
- Mobile apps for team
- No custom development needed

### Option 2: Custom ChatGPT Integration
- OpenAI Assistant API
- Custom UI component
- Full control over experience
- More development effort

**Recommendation:** Start with Intercom/Drift for faster launch, consider custom later if needed.

## Chat Widget Features

### Proactive Triggers
- After 30 seconds on pricing page: "Have questions about pricing?"
- After 60 seconds on features page: "Want to see a demo?"
- Exit intent on demo page: "Need help getting started?"
- Returning visitor: "Welcome back! Pick up where you left off?"

### Quick Actions
- "Schedule a demo"
- "Talk to sales"
- "Get pricing information"
- "View case studies"
- "Technical questions"

## AI Chatbot Capabilities

### Can Answer:
- "What is CoStudy?"
- "How much does it cost?"
- "What integrations do you support?"
- "Is it FERPA compliant?"
- "How long does implementation take?"
- "Do you offer a free trial?"
- "Can we see a demo?"
- Common technical questions

### Lead Qualification Questions:
1. "What's your name?"
2. "What university are you with?"
3. "What's your role?" (Admin, IT, Faculty, Student)
4. "How many students at your institution?"
5. "What's your timeline for implementation?"
6. "What's your email?" (to send follow-up)

### Smart Routing:
- **Technical questions** → Route to support documentation or IT team
- **Pricing/sales questions** → Route to sales team or offer demo booking
- **Student inquiries** → Explain B2B2C model, refer to university
- **Job seekers** → Link to careers page
- **Press inquiries** → Link to press kit, provide press email

## Integration with Systems

### CRM (HubSpot/Salesforce)
- Automatically create lead record
- Attach chat transcript
- Update lead score based on engagement
- Trigger email follow-up sequences

### Calendar (Calendly)
- Embed demo booking in chat
- Check sales team availability
- Send confirmation via chat
- Add to calendar with reminder

### SendGrid
- Send chat transcript via email
- Trigger nurture sequences
- Send resources mentioned in chat

## Chat Availability

### Business Hours (9am-5pm EST)
- Live agent available
- <2 minute response time
- Warm handoff from bot to human

### After Hours
- AI chatbot only
- Collect contact info for follow-up
- Promise next-day response
- Offer to schedule callback

## Chat Analytics

### Track:
- Chat starts per page
- Chat → demo request conversion
- Average response time
- CSAT (customer satisfaction score)
- Common questions/topics
- Drop-off points in conversations

### Goals:
- Response time <2 minutes
- Resolution rate >80%
- CSAT score >4.5/5
- Chat → demo conversion >20%

## Privacy & Compliance
- GDPR cookie consent for chat tracking
- Clear privacy policy link in chat
- Option to delete chat history
- Don't store sensitive information
- Encrypt chat transcripts

## Mobile Experience
- Minimize/maximize functionality
- Notification badge for new messages
- Works on all screen sizes
- Native feel on mobile devices

## Proactive Outreach Examples

**Pricing page (30s delay):**
"Hi! 👋 I see you're looking at pricing. I'm here to help answer any questions or schedule a demo for your university. What would be most helpful?"

**Case studies page (scroll to bottom):**
"Impressed by what our university partners are achieving? I'd love to show you how CoStudy can work for your institution. Want to schedule a quick demo?"

**Features page (exit intent):**
"Before you go—any questions about CoStudy's features? I'm happy to help or schedule a personalized demo."

## Success Metrics
- 5% of visitors start a chat
- 20% of chats result in demo request
- 50% of qualified leads from chat convert to opportunities
- <2 minute average response time
- >80% chat satisfaction score`,
      priority: 4, // LOW
      estimate: 3,
    },
  ];

  if (!brock) {
    console.warn('⚠️ Could not find Brock in Linear users. Issues will be created unassigned.');
  }

  for (const issue of newIssues) {
    try {
      const payload = await linear.createIssue({
        title: issue.title,
        description: issue.description,
        teamId: team.id,
        priority: issue.priority,
        estimate: issue.estimate,
        assigneeId: brock?.id,
      });

      const createdIssue = await payload.issue;
      if (createdIssue) {
        console.log(`✅ Created: ${createdIssue.identifier} - ${issue.title}`);
        console.log(`   URL: ${createdIssue.url}`);
        console.log(`   Priority: ${['', 'URGENT', 'HIGH', 'MEDIUM', 'LOW'][issue.priority]}`);
        console.log(`   Estimate: ${issue.estimate} points`);
        if (brock) {
          console.log(`   Assigned to: Brock\n`);
        }
      }
    } catch (error) {
      console.error(`❌ Failed to create issue: ${issue.title}`, error);
    }
  }

  console.log('🎉 All additional website issues created successfully!\n');
  console.log('📊 Summary:');
  console.log(`   Total new issues: ${newIssues.length}`);
  const urgentCount = newIssues.filter(i => i.priority === 1).length;
  const highCount = newIssues.filter(i => i.priority === 2).length;
  const mediumCount = newIssues.filter(i => i.priority === 3).length;
  const lowCount = newIssues.filter(i => i.priority === 4).length;
  console.log(`   Urgent: ${urgentCount}`);
  console.log(`   High: ${highCount}`);
  console.log(`   Medium: ${mediumCount}`);
  console.log(`   Low: ${lowCount}`);
  const totalPoints = newIssues.reduce((sum, i) => sum + i.estimate, 0);
  console.log(`   Total story points: ${totalPoints}\n`);
}

main().catch(console.error);
