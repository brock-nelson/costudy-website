import { LinearClient } from '@linear/sdk';

const linear = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY!,
});

interface Issue {
  title: string;
  description: string;
  priority: number; // 0 = none, 1 = urgent, 2 = high, 3 = medium, 4 = low
  labels?: string[];
  estimate?: number; // story points
}

const issues: Issue[] = [
  // CRITICAL - Business Model Fix
  {
    title: 'Fix business model and pricing strategy - B2B2C not B2C',
    priority: 1,
    estimate: 8,
    description: `## Problem
Current pricing page and marketing assumes direct-to-student sales, but CoStudy sells to universities/institutions who provide it to students.

## What Needs to Change
**Pricing Page:**
- Remove student pricing tiers ($7.99/month individual plans)
- Focus on university/department licensing
- Emphasize: site licenses, concurrent users, department-wide access
- Add university pilot program details

**Messaging:**
- Change from "Students buy" → "Universities provide"
- Emphasize: Student success metrics, institutional ROI, retention rates
- Add case studies from university perspective

**Business Model:**
- B2B2C: Sell to universities → they provision for students
- Revenue: Institutional contracts, not individual subscriptions
- Pricing: Per-department, per-university, concurrent users

## Tasks
- [ ] Interview stakeholders to understand exact business model
- [ ] Document: Who pays? How do students get access? What's the sales process?
- [ ] Redesign pricing page for institutional buyers
- [ ] Update all marketing copy university-first
- [ ] Create university admin dashboard for provisioning
- [ ] Build student access/authentication flow (via university SSO)

## Success Criteria
- Pricing reflects actual business model
- Clear path: University purchases → Students get access
- Marketing speaks to decision makers (deans, IT, student success teams)`,
  },

  // HIGH PRIORITY - Core Platform Features
  {
    title: 'Build university admin dashboard - provision and manage students',
    priority: 2,
    estimate: 13,
    description: `## Overview
Universities need a dashboard to:
- Add/remove students (bulk import, SSO sync, manual)
- View usage analytics
- Manage licenses/seats
- Configure settings

## Features
**User Management:**
- Bulk CSV import (name, email, student ID)
- SSO/SAML integration (auto-provision on first login)
- Manual add/invite
- Deactivate/remove users
- View active users, last login, usage stats

**Analytics Dashboard:**
- Total active users
- Study groups created
- Session attendance rates
- Engagement metrics (daily/weekly active users)
- Most active courses/departments

**License Management:**
- Current seat count vs. purchased licenses
- Usage trends
- Overage alerts
- Renewal date and notifications

**Settings:**
- Branding (logo, colors, custom domain)
- Email templates
- SSO configuration
- LMS integration settings

## Technical Spec
- Role: \`university_admin\` with full institution access
- Separate \`/admin\` route structure
- Real-time updates for analytics
- Export to CSV/PDF for reports

## Success Criteria
- Admin can provision 1000 students in < 5 minutes (CSV import)
- SSO auto-provisioning works on first student login
- Analytics update in real-time
- Exports work for board/stakeholder reports`,
  },

  {
    title: 'Implement SSO/SAML authentication for university students',
    priority: 2,
    estimate: 8,
    description: `## Overview
Students should authenticate via their university SSO (SAML 2.0), not username/password.

## Requirements
**Supported Providers:**
- Shibboleth (most universities)
- Microsoft Azure AD / Entra
- Okta
- Google Workspace for Education
- Generic SAML 2.0

**Flow:**
1. Student visits costudy.co
2. Prompted: "Sign in with your university"
3. Redirect to university SSO
4. Auto-provision account on first login
5. Map university → correct CoStudy tenant/workspace

**Data Mapping:**
- \`eduPersonPrincipalName\` → email
- \`givenName\` + \`sn\` → full name
- \`eduPersonAffiliation\` → role (student, faculty, staff)
- \`schacHomeOrganization\` → university identifier

## Technical Implementation
- Use \`next-auth\` SAML provider
- Multi-tenant support (multiple universities on one platform)
- Just-in-time (JIT) provisioning
- Session management with university-specific tokens

## Configuration
- University admin provides: Entity ID, SSO URL, Certificate
- We provide: ACS URL, Entity ID, Metadata XML
- Test with Stanford/UCLA sandboxes first

## Success Criteria
- Student can sign in with university credentials
- Account auto-created on first login
- Works with top 50 universities' SSO systems
- < 2 second auth flow`,
  },

  {
    title: 'Build student dashboard - find and join study groups',
    priority: 2,
    estimate: 13,
    description: `## Overview
Students need a dashboard to discover study groups, join sessions, track their study schedule.

## Pages & Features

### Dashboard Home (\`/dashboard\`)
**My Study Groups:**
- List of joined groups with upcoming sessions
- Quick join button for active sessions
- Notification badges for new messages/updates

**Discover Groups:**
- Browse by: Course, Department, Topic, Time
- Filters: Meeting schedule, size, difficulty level
- Search functionality
- "Recommended for you" based on courses/interests

**Quick Actions:**
- Create new study group
- Join with invite code
- Schedule 1:1 study session

### My Study Groups (\`/dashboard/groups\`)
- Grid/list view of all groups
- Status indicators: Active session, Upcoming, Inactive
- Group cards show: Members, next session, recent activity
- Archive/leave options

### Calendar View (\`/dashboard/calendar\`)
- Weekly/monthly calendar of study sessions
- Sync to Google Calendar, iCal
- Reminders and notifications
- Color-coded by course/group

### Profile & Settings (\`/dashboard/settings\`)
- Profile: Name, major, courses, study preferences
- Notification preferences
- Privacy settings
- Connect LMS to auto-join course groups

## Design Requirements
- Mobile-first (students use phones)
- Fast load times (<1s)
- Real-time updates for session status
- Accessible (WCAG 2.1 AA)

## Success Criteria
- Student can find relevant group in <30 seconds
- Join a group with 1 click
- Calendar syncs with student's existing calendar
- 90%+ mobile usability score`,
  },

  // MEDIUM PRIORITY - Integrations
  {
    title: 'LMS integration - Canvas, Blackboard, Moodle auto-sync',
    priority: 3,
    estimate: 13,
    description: `## Overview
Auto-create study groups for each course in university LMS. Sync roster, grades, assignments.

## Supported LMS
**Priority 1:**
- Canvas (most popular)
- Blackboard Learn
- Moodle

**Priority 2:**
- D2L Brightspace
- Schoology

## Features

**Course Sync:**
- Auto-create study group for each enrolled course
- Sync course name, code, section, instructor
- Update roster when students add/drop
- Run sync: Real-time (webhooks) or nightly batch

**Assignment Integration:**
- Show upcoming assignments in study group
- "Study for Midterm on Friday" auto-creates session
- Link to assignment in LMS

**Grade Context:**
- Show class average (anonymized)
- "Students in study groups score 8% higher" messaging
- Identify struggling students (with permission)

**Deep Linking:**
- LMS nav menu: "Study Groups" → opens CoStudy in iframe/new tab
- Single sign-on from LMS

## Technical Approach
**Canvas:**
- OAuth 2.0 authentication
- REST API for course/roster data
- Webhooks for real-time updates
- LTI 1.3 for deep linking

**Blackboard:**
- REST API + Learn Object extensions
- Building Block for deep integration

**Moodle:**
- External tool (LTI)
- Web services API

## Configuration
- University admin connects LMS in dashboard
- Provide: LMS URL, API key/credentials
- Select courses to sync (all or specific departments)
- Map LMS roles to CoStudy permissions

## Success Criteria
- Course rosters sync within 1 hour of enrollment
- Students see study groups in LMS nav menu
- Assignments appear in study group automatically
- Works at 3 pilot universities`,
  },

  {
    title: 'Video/screen sharing - Agora or Daily.co integration',
    priority: 3,
    estimate: 8,
    description: `## Overview
Students need video calls and screen sharing for remote study sessions.

## Requirements
**Core Features:**
- HD video (720p minimum)
- Screen sharing with audio
- Recording (with permission)
- Breakout rooms for group work
- Virtual whiteboard
- Chat overlay

**Performance:**
- <100ms latency for US users
- Works on 5mbps connections
- Mobile app support (iOS/Android)
- Browser-based (no downloads)

## Provider Evaluation

**Daily.co:**
- ✅ Easy WebRTC integration
- ✅ React SDK available
- ✅ Recording built-in
- ✅ $0.0005/min ($0.03/hour per participant)
- ✅ Great developer experience

**Agora:**
- ✅ Lower latency
- ✅ Better for 10+ person groups
- ✅ More control/customization
- ❌ More complex setup
- ✅ $0.99/1000 minutes

**Recommendation:** Start with Daily.co (faster to ship), migrate to Agora if scale demands it.

## Implementation
**Join Flow:**
1. Click "Start Session" in study group
2. Check camera/mic permissions
3. Join video room (named by group ID + session ID)
4. Invite other group members

**Features to Build:**
- Pre-call device check
- Mute/unmute, video on/off
- Screen share toggle
- Recording start/stop (requires all participants consent)
- Whiteboard embed (Excalidraw or tldraw)
- Chat sidebar

**Session Recording:**
- Store in S3/Cloudflare R2
- Available to participants for 30 days
- Auto-transcription with Deepgram
- Search by keyword in transcript

## Pricing Model
- Free tier: 100 hours/month per university
- Overage: $0.05/hour per student (pass-through + margin)

## Success Criteria
- <5 second time to join call
- 99.9% call completion rate
- Recording works 100% of the time
- Works on student's crappy dorm WiFi`,
  },

  // INFRASTRUCTURE & QUALITY
  {
    title: 'Set up monitoring and alerting - DataDog or Sentry',
    priority: 3,
    estimate: 5,
    description: `## Overview
We need visibility into production to catch issues before users report them.

## What to Monitor

**Application Performance:**
- API response times (p50, p95, p99)
- Database query performance
- External API latency (Linear, Stripe, SendGrid)
- Next.js server-side rendering times

**Errors:**
- JavaScript exceptions (client-side)
- API errors (server-side)
- Authentication failures
- Payment processing errors

**Infrastructure:**
- Vercel function errors
- Database connection pool exhaustion
- Redis cache hit rates
- Memory usage / function cold starts

**Business Metrics:**
- Sign-ups per hour
- Active study sessions
- Daily/weekly active users
- Conversion funnel drop-offs

## Tools

**Sentry (Errors):**
- Real-time error tracking
- Stack traces with source maps
- User context (email, session)
- Slack/email alerts
- ~$26/month for 50K errors

**DataDog (APM + Infrastructure):**
- Distributed tracing
- Database query monitoring
- Log aggregation
- Custom dashboards
- ~$15/host/month

**Recommended:** Sentry for errors + Vercel Analytics (free) + custom Slack webhooks for critical alerts

## Alerts to Set Up
- Error rate >1% for 5 minutes → Slack #incidents
- API response time >2s p95 → Slack #eng
- Database connections >80% → Page on-call
- Payment failure → Email + Slack immediately
- Sign-ups stop for 1 hour → Slack #growth

## Success Criteria
- Alerted to P0 issues within 1 minute
- Can diagnose issue from alert context (no need to ssh into servers)
- Errors automatically tagged with release version
- On-call engineer has context to fix without waking up Brock`,
  },

  {
    title: 'Write comprehensive API documentation - OpenAPI/Swagger',
    priority: 4,
    estimate: 5,
    description: `## Overview
External developers (university IT, integration partners) need API docs.

## What to Document

**Authentication API:**
- \`POST /api/auth/login\` - Login with SSO
- \`POST /api/auth/token\` - Get API token
- \`POST /api/auth/refresh\` - Refresh expired token

**Users API:**
- \`GET /api/users\` - List users (admin only)
- \`POST /api/users\` - Create user (bulk import)
- \`GET /api/users/:id\` - Get user details
- \`PATCH /api/users/:id\` - Update user
- \`DELETE /api/users/:id\` - Deactivate user

**Groups API:**
- \`GET /api/groups\` - List study groups
- \`POST /api/groups\` - Create group
- \`GET /api/groups/:id\` - Get group details
- \`POST /api/groups/:id/members\` - Add member
- \`DELETE /api/groups/:id/members/:userId\` - Remove member

**Sessions API:**
- \`GET /api/sessions\` - List study sessions
- \`POST /api/sessions\` - Create session
- \`GET /api/sessions/:id\` - Get session details
- \`POST /api/sessions/:id/join\` - Join session
- \`POST /api/sessions/:id/recording\` - Get recording URL

**Webhooks:**
- Document webhook payloads
- Signature verification
- Event types

## Format
- OpenAPI 3.0 spec
- Generate with Swagger UI
- Host at \`/docs\` or \`docs.costudy.co\`
- Include code examples (curl, Python, JavaScript)
- Authentication flow diagram
- Rate limits documented
- Error codes reference

## Tools
- \`next-swagger-doc\` to generate from JSDoc comments
- Swagger UI for interactive docs
- Redoc for pretty static docs

## Success Criteria
- University IT can integrate without asking questions
- API examples copy-paste-work
- All endpoints documented with request/response schemas
- Webhook signature verification example provided`,
  },

  {
    title: 'Implement automated testing - Unit + E2E with Playwright',
    priority: 4,
    estimate: 8,
    description: `## Overview
Tests catch bugs before production. We need confidence to ship fast.

## Testing Strategy

**Unit Tests (Vitest - already installed):**
- Database models (Drizzle)
- Utility functions
- API route handlers (mock dependencies)
- Email templates render correctly
- Target: 80% coverage

**Integration Tests:**
- API endpoints (real DB, mocked external services)
- Authentication flows
- Webhook handlers
- Payment processing

**E2E Tests (Playwright):**
- Critical user journeys
- SSO login flow
- Create and join study group
- Start video session
- University admin: bulk import students
- Payment checkout flow

## What to Test

**P0 - Must Work:**
- [ ] Student can sign in via SSO
- [ ] Student can discover and join study group
- [ ] Study session can be created and started
- [ ] Video call works (join, screenshare, leave)
- [ ] University admin can add students

**P1 - Important:**
- [ ] Email notifications sent
- [ ] Calendar sync works
- [ ] LMS integration syncs courses
- [ ] Payment processing handles failures
- [ ] Search finds relevant groups

**Test Data:**
- Seed database with realistic data
- Use Stanford test SSO sandbox
- Mock video provider (Daily.co sandbox)
- Test Stripe key for payments

## CI/CD Integration
- Run unit tests on every commit (GitHub Actions)
- Run integration tests on PR (staging database)
- Run E2E tests on pre-production deploy
- Block deploy if tests fail
- Slack notification on test failures

## Success Criteria
- Critical paths covered by E2E tests
- CI catches bugs before code review
- Deployments never break P0 features
- Test suite runs in <5 minutes`,
  },

  // GROWTH & ANALYTICS
  {
    title: 'Build analytics pipeline - track engagement and retention',
    priority: 3,
    estimate: 8,
    description: `## Overview
We need data to understand: What drives retention? What features do students love? Where do they churn?

## Metrics to Track

**Activation:**
- Sign-up → First group join (time, conversion rate)
- First session attended within 7 days
- Connected calendar
- Added profile info

**Engagement:**
- Daily active users (DAU)
- Weekly active users (WAU)
- Study sessions per week per user
- Messages sent per user
- Video minutes per user

**Retention:**
- Day 1, 7, 30, 90 retention
- Cohort analysis by university
- Churn reasons (survey on exit)

**Feature Usage:**
- % using screen share
- % using recordings
- % using calendar sync
- % using mobile app

**University Metrics:**
- Students per university
- Active universities
- Expansion revenue (departments added)

## Tech Stack

**Event Tracking:**
- PostHog (open source, self-hosted)
- Or Mixpanel (easier, paid)
- Or custom (Clickhouse + Python)

**Dashboards:**
- Metabase (open source, connects to Postgres)
- University-specific dashboards for admins

**Events to Track:**
\`\`\`typescript
track('study_session_started', {
  group_id,
  course_name,
  session_duration,
  participant_count,
  university_id,
});

track('student_invited', {
  group_id,
  inviter_id,
  university_id,
});

track('video_call_joined', {
  session_id,
  latency_ms,
  device_type,
});
\`\`\`

## Implementation
1. Add event tracking SDK to client + server
2. Identify users: \`identify(userId, { university, major, year })\`
3. Track page views automatically
4. Track custom events for key actions
5. Build SQL queries for metrics
6. Create Metabase dashboards
7. Schedule weekly metrics email to team

## Success Criteria
- All P0 actions tracked
- Dashboards answer: "Why did retention drop this week?"
- University admins see their usage data
- Data informs product roadmap`,
  },

  {
    title: 'Build referral program - students invite friends',
    priority: 4,
    estimate: 5,
    description: `## Overview
Viral growth: Students invite classmates. Most effective university SaaS acquisition channel.

## How It Works
**Referral Flow:**
1. Student shares referral link: \`costudy.co/join/sarah-stanford\`
2. Friend clicks, signs up via university SSO
3. Both get reward (if university allows)

**Rewards (If Allowed):**
- Priority support for 1 month
- "Founding member" badge
- Early access to features
- Recognition on leaderboard

**Tracking:**
- Who referred whom
- Referral conversion rate
- Most effective referrers
- Viral coefficient (K-factor)

**University Settings:**
- Enable/disable referrals per university
- Some don't allow incentives (check policy)
- Can disable rewards but keep tracking

## Implementation
**Database:**
\`\`\`sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY,
  referrer_id UUID REFERENCES users(id),
  referred_id UUID REFERENCES users(id),
  referral_code TEXT UNIQUE,
  created_at TIMESTAMP,
  converted BOOLEAN DEFAULT FALSE
);
\`\`\`

**Referral Code:**
- Format: \`{firstname}-{university}\` (sarah-stanford)
- Or short code: \`SARAH2024\`
- Unique per student

**Sharing:**
- Copy link button
- Share to: iMessage, WhatsApp, Email, Twitter
- QR code for in-person events
- "Invite classmates" nudge after positive experience

## Gamification
- Leaderboard: Top referrers per university
- Badges: "Connector" (10+ referrals), "Ambassador" (50+)
- Recognition in group: "Sarah brought 12 friends to CoStudy!"

## Success Criteria
- Viral coefficient >0.5 (each user brings 0.5 new users)
- 30% of new sign-ups from referrals within 6 months
- Top referrer has brought 100+ students`,
  },
];

async function main() {
  console.log('🚀 Creating Linear issues...\n');

  // Get the first team
  const teams = await linear.teams();
  const team = teams.nodes[0];

  if (!team) {
    console.error('❌ No teams found in Linear workspace');
    process.exit(1);
  }

  console.log(`📋 Using team: ${team.name} (${team.id})\n`);

  // Create issues
  for (const issue of issues) {
    try {
      const payload = await linear.createIssue({
        teamId: team.id,
        title: issue.title,
        description: issue.description,
        priority: issue.priority,
        estimate: issue.estimate,
      });

      const createdIssue = await payload.issue;
      if (createdIssue) {
        console.log(`✅ Created: ${createdIssue.identifier} - ${issue.title}`);
        console.log(`   URL: ${createdIssue.url}`);
        console.log(`   Priority: ${issue.priority === 1 ? 'URGENT' : issue.priority === 2 ? 'HIGH' : issue.priority === 3 ? 'MEDIUM' : 'LOW'}`);
        console.log(`   Estimate: ${issue.estimate} points\n`);
      }
    } catch (error) {
      console.error(`❌ Failed to create: ${issue.title}`);
      console.error(error);
    }
  }

  console.log('\n🎉 All issues created successfully!');
  console.log(`\n📊 Summary:`);
  console.log(`   Total issues: ${issues.length}`);
  console.log(`   Urgent: ${issues.filter(i => i.priority === 1).length}`);
  console.log(`   High: ${issues.filter(i => i.priority === 2).length}`);
  console.log(`   Medium: ${issues.filter(i => i.priority === 3).length}`);
  console.log(`   Low: ${issues.filter(i => i.priority === 4).length}`);
  console.log(`   Total story points: ${issues.reduce((sum, i) => sum + (i.estimate || 0), 0)}`);
}

main().catch(console.error);
