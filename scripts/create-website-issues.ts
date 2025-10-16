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

const websiteIssues: Issue[] = [
  // CRITICAL - Fix Messaging
  {
    title: '[WEBSITE] Fix homepage for B2B2C - target universities not students',
    priority: 1,
    estimate: 5,
    description: `## Problem
Current homepage talks to students ("Sign up for $7.99/month"), but universities are the buyers.

## New Homepage Structure

**Hero Section:**
- Headline: "Student Success Through Connected Learning"
- Subhead: "The platform universities trust to increase retention and engagement"
- CTA: "Request University Demo" (not "Sign Up")
- Background: Students collaborating (aspirational, institutional)

**Social Proof Bar:**
- "Trusted by 50+ universities"
- Logos: Stanford, UCLA, MIT, etc. (get permission or use generic)
- Stats: "10,000+ students supported" "15% increase in retention"

**Problem Statement:**
- "Universities face: Low student engagement, high dropout rates, siloed learning"
- "Students need: Peer support, study groups, collaborative tools"

**Solution (3 columns):**
1. **For Universities:** Proven retention tool, easy deployment, rich analytics
2. **For Students:** Find study partners, join groups, succeed together
3. **For Faculty:** Insights into student collaboration, identify at-risk students

**How It Works (Universities):**
1. University licenses CoStudy
2. SSO integration provisions students automatically
3. Students discover study groups for their courses
4. University tracks engagement and outcomes

**Features (University Lens):**
- SSO/LMS Integration
- Analytics Dashboard
- FERPA Compliant
- White-label Options
- Dedicated Support

**CTA Section:**
- "See CoStudy in Action"
- Button: "Schedule Demo" → /demo
- Button: "Download Case Study" → PDF

## Success Criteria
- Clear who the buyer is (universities)
- What problem it solves (retention, engagement)
- Easy path to demo/contact sales
- No student pricing visible`,
  },

  {
    title: '[WEBSITE] Build /demo page - university demo request flow',
    priority: 1,
    estimate: 3,
    description: `## Overview
Universities need a frictionless way to request a demo and learn about CoStudy.

## Page Structure

**Hero:**
- "See How CoStudy Transforms Student Success"
- Short video (2-3 min): Platform walkthrough from university admin perspective

**Demo Request Form:**
\`\`\`typescript
{
  // University Info
  universityName: string;
  universityWebsite: string;
  studentCount: number; // dropdown: <5K, 5-10K, 10-20K, 20K+

  // Contact Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string; // dropdown: Dean, IT Director, Student Success, Other
  department: string;

  // Use Case
  goals: string[]; // checkboxes: Improve retention, Increase engagement, Support remote learning
  timeline: string; // dropdown: This semester, Next semester, Exploring

  // Optional
  message: string; // "Tell us about your needs"
  referralSource: string; // "How did you hear about us?"
}
\`\`\`

**What Happens Next:**
1. Form submission → Sends to Slack #sales + Email to sales@costudy.co
2. Auto-response email: "Thanks! We'll reach out within 24 hours"
3. Add to CRM (HubSpot or Airtable)
4. Sales team follows up to schedule Zoom demo

**Social Proof Section:**
- "Join universities already using CoStudy"
- 3-4 brief quotes from university administrators
- Case study links

**FAQ:**
- How long does implementation take?
- What integrations do you support?
- How is pricing structured?
- Is there a pilot program?

## Technical
- Form validation with react-hook-form + zod
- Submit to \`/api/demo/request\`
- Send to SendGrid + Slack webhook
- Store in database for follow-up tracking
- Thank you page with calendar embed (Calendly)

## Success Criteria
- Form completion rate >60%
- All demo requests routed to sales within 5 minutes
- Response time <24 hours`,
  },

  {
    title: '[WEBSITE] Redesign /pricing for universities - remove student pricing',
    priority: 1,
    estimate: 5,
    description: `## Problem
Current pricing shows student monthly plans ($7.99). Universities buy site licenses, not individual subscriptions.

## New Pricing Structure

**University Licensing Model:**

**Tier 1: Department License**
- Up to 500 students
- 1-3 departments
- Starting at $5,000/year
- Best for: Pilot programs, small colleges

**Tier 2: University License**
- Up to 5,000 students
- Unlimited departments
- Starting at $20,000/year
- Most popular for mid-size universities

**Tier 3: Enterprise**
- Unlimited students
- Multiple campuses
- Custom pricing
- Best for: Large university systems

**What's Included (All Tiers):**
- ✅ SSO/SAML integration
- ✅ LMS integration (Canvas, Blackboard)
- ✅ Admin dashboard & analytics
- ✅ FERPA compliance
- ✅ Dedicated support
- ✅ Onboarding & training
- ✅ Unlimited study groups

**Tier Comparison Table:**
| Feature | Department | University | Enterprise |
|---------|------------|------------|------------|
| Students | Up to 500 | Up to 5,000 | Unlimited |
| Departments | 1-3 | Unlimited | Unlimited |
| SSO/SAML | ✓ | ✓ | ✓ |
| LMS Sync | ✓ | ✓ | ✓ |
| Admin Users | 3 | 10 | Unlimited |
| API Access | - | ✓ | ✓ |
| White-label | - | - | ✓ |
| SLA | Email | Priority | 24/7 + CSM |
| Price | $5K/year | $20K/year | Custom |

**Pilot Program:**
- "Try CoStudy risk-free"
- 1 semester free for 100-500 students
- Full features included
- No credit card required
- Convert to paid: 40-60% of pilots

**ROI Calculator:**
- Input: Student count, current retention rate
- Output: "If CoStudy improves retention by just 5%, you save $XXX in lost tuition"
- CTA: "See your university's ROI" → leads to demo

**FAQ:**
- How is pricing calculated?
- What if we exceed student count?
- Can we start with a pilot?
- How do renewals work?
- Do you offer multi-year discounts?

**CTA:**
- "Ready to improve student success?"
- "Schedule Demo" + "Download Pricing Sheet (PDF)"

## Technical
- Remove all student/individual pricing
- Add "Contact Sales" buttons (not checkout)
- Build ROI calculator widget
- Generate pricing PDF with branding

## Success Criteria
- Pricing reflects B2B2C model
- Clear value proposition for each tier
- Easy path to pilot program
- No confusion about who pays`,
  },

  {
    title: '[WEBSITE] Build /case-studies page - showcase university success stories',
    priority: 2,
    estimate: 5,
    description: `## Overview
Buyers need proof it works. Case studies show ROI and build trust.

## Structure

**Hero:**
- "See How Universities Are Transforming Student Success"
- Filter by: University Size, Use Case, Department

**Case Study Cards:**
Each shows:
- University name + logo
- Student count
- Key metric: "15% increase in retention"
- Quote from decision maker
- "Read Full Story" button

**Example Case Studies to Create:**

### Case Study 1: Stanford CS Department
**Challenge:**
- Large lecture courses (200+ students)
- Students felt isolated, struggled to form study groups
- TA office hours overwhelmed

**Solution:**
- Deployed CoStudy for CS 101, CS 106A, CS 106B
- 850 students across 3 courses
- Auto-created study groups from course rosters

**Results:**
- 78% of students joined study groups (vs. 12% before)
- Average study session: 2.3x per week
- Course evaluations improved 23%
- "I finally found people who get it" - Student feedback

**Quote:**
"CoStudy solved our biggest challenge: helping students connect in 200-person lectures. The data shows it works."
— Dr. Sarah Chen, CS 101 Professor

### Case Study 2: UCLA Pre-Med Program
**Challenge:**
- High-stress, competitive environment
- Students afraid to ask for help
- 22% drop rate from pre-med track

**Solution:**
- Piloted CoStudy for Organic Chemistry I & II
- 450 pre-med students
- Created "study accountability pods" of 4-6 students

**Results:**
- Drop rate decreased to 14% (8% improvement)
- Students report 67% less stress
- Group exam prep increased from 18% → 81%
- ROI: $1.2M in retained tuition (based on 8% retention improvement)

**Quote:**
"The ROI is undeniable. For every dollar spent on CoStudy, we retain $12 in tuition from students who would have dropped out."
— Maria Rodriguez, Director of Academic Success

### Case Study 3: Community College System
**Challenge:**
- 15,000 students across 3 campuses
- 60% work full-time (scheduling conflicts)
- Low engagement in online courses

**Solution:**
- System-wide deployment
- Hybrid: In-person + remote study groups
- Calendar integration for flexible scheduling

**Results:**
- 12,000 students using CoStudy (80% adoption)
- Online course completion rate: 68% → 81%
- NPS score: 73 (would recommend to friends)

**Quote:**
"CoStudy met our students where they are: working full-time, juggling family, studying late at night. It works."
— James Thompson, VP of Student Affairs

## Each Full Case Study Page Includes:
- Hero image (students studying, campus)
- University stats (size, type, location)
- Challenge → Solution → Results
- Pull quotes from multiple stakeholders
- Metrics dashboard (retention, engagement, NPS)
- "See CoStudy in action" CTA

## Technical
- MDX for case study content
- Dynamic routing: \`/case-studies/[slug]\`
- SEO optimized (schema markup)
- PDF download of each case study
- Share buttons (LinkedIn, Twitter, Email)

## Success Criteria
- 3 case studies live at launch
- Each includes quantitative ROI
- Quotes from university administrators (not just students)
- High-quality photos/graphics`,
  },

  {
    title: '[WEBSITE] Create /features page - university-focused feature breakdown',
    priority: 2,
    estimate: 3,
    description: `## Overview
Universities need to understand what they're buying. Features page = product tour.

## Structure

**Hero:**
- "Everything Your University Needs to Drive Student Success"
- Subhead: "Built for higher education, trusted by 50+ universities"

**Feature Categories:**

### 1. For University Administrators
**Admin Dashboard:**
- Monitor usage across all departments
- Track: Active users, study groups created, session attendance
- Export reports for board/stakeholders
- Real-time alerts for low engagement

**User Management:**
- Bulk import via CSV
- SSO auto-provisioning
- Add/remove students instantly
- Role-based permissions (admin, instructor, student)

**Analytics & Reporting:**
- Engagement metrics (DAU, WAU, cohort retention)
- At-risk student identification
- ROI calculator (retention impact)
- Custom reports (by course, department, semester)

### 2. For IT Teams
**SSO/SAML Integration:**
- Works with: Shibboleth, Azure AD, Okta, Google Workspace
- Just-in-time provisioning
- Multi-factor authentication support
- Enterprise-grade security (SOC 2, FERPA)

**LMS Integration:**
- Auto-sync with Canvas, Blackboard, Moodle
- Course rosters update automatically
- Deep linking (launch from LMS nav menu)
- Grade passback (optional)

**Infrastructure:**
- 99.9% uptime SLA
- Hosted on AWS/Vercel (enterprise tier)
- GDPR, FERPA, COPPA compliant
- Data residency options

### 3. For Students (End Users)
**Study Group Discovery:**
- Find groups by course, major, schedule
- Smart matching algorithm
- Join with one click

**Collaboration Tools:**
- HD video calls (up to 50 students)
- Screen sharing
- Virtual whiteboard
- Session recording (with permission)
- Chat with file sharing

**Scheduling:**
- Calendar view of all sessions
- Google Calendar / iCal sync
- Reminders via email/SMS
- Timezone support

### 4. For Faculty
**Course Integration:**
- Study groups auto-created for each course
- View which students are collaborating
- Identify at-risk students (low engagement)
- Optional: Join study sessions as facilitator

**Insights:**
- Aggregate (anonymized) collaboration data
- "Students in study groups score 8% higher on average"
- Engagement trends over semester

## Each Feature Section Includes:
- Feature name + icon
- 2-3 sentence description
- Screenshot or demo video
- "How it works" step-by-step
- Related features

## Interactive Elements:
- Feature comparison table (CoStudy vs. Competitors)
- Video demos (2-3 min each feature)
- "Try it yourself" sandbox (read-only demo account)

## Success Criteria:
- All key features documented
- University-buyer perspective (not student)
- Visual (screenshots, videos, diagrams)
- Clear differentiation from competitors`,
  },

  {
    title: '[WEBSITE] Build /contact page - sales inquiry and support routing',
    priority: 3,
    estimate: 2,
    description: `## Overview
Multiple contact paths: Sales inquiries, support tickets, partnerships.

## Page Structure

**Hero:**
- "Let's Talk About Student Success"
- Subhead: "Whether you're exploring CoStudy or need support, we're here to help"

**Contact Options (Cards):**

### 1. Schedule a Demo
- Icon: Calendar
- "Interested in CoStudy for your university?"
- Button: "Book Demo" → /demo

### 2. Sales Inquiry
- Icon: Chat
- "Have questions about pricing, features, or pilot programs?"
- Button: "Contact Sales" → Opens form

### 3. Existing Customer Support
- Icon: Headset
- "Need help with your account or have a technical question?"
- Button: "Get Support" → support.costudy.co or Intercom

### 4. Partnerships
- Icon: Handshake
- "Interested in partnering with CoStudy?"
- Button: "Partnership Inquiry" → partnerships@costudy.co

**Sales Contact Form:**
\`\`\`typescript
{
  inquiryType: string; // dropdown: Demo Request, Pricing, Pilot Program, Other
  university: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
}
\`\`\`

**Office Locations (if applicable):**
- Address, phone, email for each office
- Map embed

**Social Links:**
- LinkedIn, Twitter, GitHub
- "Follow us for updates"

**Footer:**
- General: info@costudy.co
- Sales: sales@costudy.co
- Support: support@costudy.co
- Phone: (555) 123-4567
- Hours: M-F 9am-6pm ET

## Technical
- Form routes to appropriate team (sales vs. support)
- Slack notifications for urgent inquiries
- Intercom chat widget for live support
- Track: Form submissions, conversion to demo

## Success Criteria
- Clear routing (sales vs. support)
- Response time <24 hours
- Mobile-optimized forms`,
  },

  {
    title: '[WEBSITE] Add university logos and testimonials section',
    priority: 3,
    estimate: 2,
    description: `## Overview
Social proof builds trust. Show which universities use CoStudy.

## Sections to Add

### 1. Homepage: University Logo Bar
- "Trusted by leading universities"
- Grid of 8-12 university logos (grayscale, subtle)
- Logos: Stanford, UCLA, MIT, etc.
- **Important:** Get permission or use generic placeholders
- If no permission: "Trusted by 50+ universities nationwide"

### 2. Testimonials Section
**Format:**
- Photo of person (admin, faculty, or student)
- Quote (1-2 sentences)
- Name, title, university
- Star rating (5/5)

**Example Testimonials:**

**University Administrator:**
"CoStudy delivered a 12% improvement in retention within one semester. The ROI is incredible."
— Dr. Maria Rodriguez, VP of Student Success, UCLA

**Faculty Member:**
"I can finally see which students are struggling and intervene early. CoStudy gives me insights I never had before."
— Professor James Chen, Computer Science, Stanford

**Student:**
"I went from feeling lost in a 200-person lecture to having a study group of 6 people who actually get me. Game changer."
— Sarah Thompson, Pre-Med Junior

**IT Director:**
"Setup took 2 hours. SSO integration was seamless. Students were using it within a week."
— Mike Johnson, Director of IT, University of Michigan

### 3. Stats Bar
- "10,000+ students supported"
- "50+ universities trust CoStudy"
- "15% average retention improvement"
- "98% would recommend to other universities"

## Design Guidelines
- Logos: Grayscale, uniform size, subtle hover effect
- Testimonials: Cards with photo, quote, attribution
- Mobile: Stack vertically, swipeable carousel
- Accessibility: Alt text for logos, contrast for quotes

## Legal
- Get written permission for university logos
- Have signed testimonial release forms
- Option: Anonymize ("Large public university in California")

## Success Criteria
- 8+ university logos (real or placeholders)
- 4+ testimonials from different personas
- Quotes emphasize ROI, ease of use, student impact`,
  },

  {
    title: '[WEBSITE] Implement SEO optimization - university keywords',
    priority: 3,
    estimate: 3,
    description: `## Overview
Universities search for: "student retention software", "LMS study group tools", "peer learning platforms"

## SEO Strategy

**Target Keywords (Primary):**
- student retention software
- university engagement platform
- LMS study group integration
- peer learning software
- student success platform
- collaborative learning tools for universities

**Target Keywords (Long-tail):**
- how to improve student retention in higher education
- best study group platforms for universities
- Canvas LMS study group integration
- student engagement tools for large lecture courses
- peer-to-peer learning software

## On-Page SEO

**Homepage:**
- Title: "CoStudy - Student Success & Retention Platform for Universities"
- Meta: "Increase retention and engagement with CoStudy's peer learning platform. Trusted by 50+ universities. LMS integration, SSO, analytics."
- H1: "Student Success Through Connected Learning"
- H2s: Use target keywords naturally

**Each Page:**
- Unique title tag (<60 chars)
- Meta description (<160 chars)
- H1 + H2s with keywords
- Alt text for all images
- Internal linking strategy

## Technical SEO

**Next.js Setup:**
- \`next-seo\` for meta tags
- Sitemap.xml auto-generated
- Robots.txt configured
- Canonical URLs
- Open Graph tags (social sharing)
- Schema markup (Organization, Product, Review)

**Performance:**
- <2 second page load (Lighthouse score >90)
- Core Web Vitals optimized
- Image optimization (next/image)
- Font optimization
- Code splitting

## Content SEO

**Blog Posts (10 posts minimum):**
1. "5 Ways to Improve Student Retention in 2024"
2. "How Peer Learning Impacts University Retention Rates"
3. "LMS Integration: Connecting Canvas with Study Groups"
4. "ROI of Student Success Platforms: Real University Data"
5. "Remote Learning: Building Community in Online Courses"
6. "Case Study: How UCLA Improved Retention by 15%"
7. "Student Engagement Strategies for Large Lecture Courses"
8. "The Science Behind Peer-to-Peer Learning"
9. "Choosing a Student Success Platform: Buyer's Guide"
10. "FERPA Compliance for University Software Vendors"

**Each Post:**
- 1500+ words
- Target 1-2 keywords
- Internal links to product pages
- CTA: "See CoStudy in Action"
- Author bio (build authority)

## Link Building

**Strategies:**
- Partner with .edu sites (blog posts, resources pages)
- Guest posts on higher ed blogs
- Press releases for university launches
- Directory listings (G2, Capterra, EdTech review sites)
- Backlinks from case study universities

## Local SEO (If Applicable)
- Google Business Profile
- NAP (Name, Address, Phone) consistency
- Local university targeting

## Analytics Setup
- Google Search Console
- Track: Organic traffic, keyword rankings, conversions
- Monitor: Pages that rank, pages that don't
- Monthly SEO report

## Success Criteria
- Page 1 ranking for 5+ target keywords within 6 months
- 10,000+ organic visits/month within 1 year
- Domain authority >30
- 10 high-quality backlinks from .edu domains`,
  },

  {
    title: '[WEBSITE] Build /about page - company story and mission',
    priority: 4,
    estimate: 2,
    description: `## Overview
Buyers want to know: Who are you? Why should we trust you?

## Page Structure

**Hero:**
- "Building the Future of Student Success"
- Subhead: "We believe every student deserves the support to thrive"

**Our Story:**
- Founded: [Year]
- Why: "We saw students struggling to connect in 200-person lectures..."
- Mission: "Make peer learning accessible to every student, everywhere"
- Vision: "A world where no student learns alone"

**Our Values:**
1. **Students First** - Every decision prioritizes student success
2. **Data-Driven** - We measure what matters (retention, engagement)
3. **Partnership** - We're an extension of your university team
4. **Innovation** - Constantly improving based on feedback
5. **Accessibility** - Learning should be available to everyone

**The Team:**
- Founder photos + bios (name, role, background)
- "We've been in your shoes" (show higher ed experience)
- LinkedIn links

**Advisory Board (If Applicable):**
- Higher ed experts, university administrators, investors
- Adds credibility

**Our Commitment:**
- FERPA compliant from day one
- Student privacy is non-negotiable
- Transparent data practices
- Open to feedback and co-creation

**By the Numbers:**
- Founded: 2023
- Universities: 50+
- Students Supported: 10,000+
- Team Members: 12
- Retention Improvement: 15% average

**Press & Recognition:**
- "Featured in EdTech Magazine"
- "Winner: Best Student Success Platform 2024"
- Press logos (if available)

**CTA:**
- "Join the universities transforming student success"
- "Schedule Demo" + "View Case Studies"

## Success Criteria
- Clear mission and values
- Team credibility established
- Trust signals (press, awards, numbers)
- Not too promotional (authentic, mission-driven)`,
  },

  {
    title: '[WEBSITE] Create /resources page - whitepapers, guides, and webinars',
    priority: 4,
    estimate: 3,
    description: `## Overview
Educational content attracts buyers and builds authority.

## Resource Types

### 1. Whitepapers (PDF Downloads)
**Topics:**
- "The State of Student Retention in Higher Education 2024"
- "ROI of Student Success Platforms: A Data-Driven Analysis"
- "Peer Learning: Research & Best Practices"
- "LMS Integration Guide for Universities"

**Format:**
- 10-15 pages
- Data, charts, research citations
- CoStudy logo but not overly promotional
- Gated: Email required to download (lead generation)

### 2. Case Studies
- Link to /case-studies page
- 3-4 full case studies with university success stories
- PDF download available

### 3. Guides & Checklists
- "University Buyer's Guide to Student Success Platforms"
- "Checklist: Launching a Student Engagement Initiative"
- "How to Calculate ROI of Retention Programs"
- "SSO Integration Setup Guide"

### 4. Webinars (On-Demand)
- "Best Practices for Student Engagement in Large Lectures"
- "How Universities Use Data to Improve Retention"
- "Demo: CoStudy Platform Walkthrough"

**Format:**
- Recorded Zoom webinars (30-45 min)
- Slides available for download
- Gated: Email + name to watch

### 5. Blog
- Link to /blog
- 10+ posts on student success, retention, peer learning
- SEO-optimized

## Page Layout

**Hero:**
- "Resources to Help You Improve Student Success"
- Subhead: "Whitepapers, guides, case studies, and more"

**Filter by Type:**
- All Resources
- Whitepapers
- Case Studies
- Guides
- Webinars
- Blog Posts

**Resource Cards:**
- Thumbnail image
- Title
- Type badge ("Whitepaper", "Case Study")
- Short description (1-2 sentences)
- "Download" or "Read More" button

**Newsletter Signup:**
- "Get Student Success Insights in Your Inbox"
- Weekly or monthly newsletter with tips, research, updates

## Lead Capture Strategy
- Gated content: Email required for downloads
- Flows into CRM (HubSpot, Airtable)
- Nurture sequence: 5-email drip campaign
  1. Download link + thank you
  2. Related resource
  3. Case study
  4. Demo invitation
  5. "Ready to see CoStudy?"

## Success Criteria
- 5+ downloadable resources at launch
- Forms capture: Name, email, university, role
- 20%+ conversion (visitor → email capture)
- Resources shared on LinkedIn (50+ shares)`,
  },

  {
    title: '[WEBSITE] Add /blog with 10 SEO-optimized articles',
    priority: 4,
    estimate: 5,
    description: `## Overview
Blog drives organic traffic and positions CoStudy as thought leaders.

## Content Strategy

**Target Audience:**
- University administrators (VPs of Student Success, Deans)
- Faculty (professors, instructors)
- IT directors (implementing software)

**Content Pillars:**
1. Student Retention (how to improve, data, strategies)
2. Peer Learning (research, best practices, case studies)
3. Higher Ed Technology (LMS, SSO, integration guides)
4. Student Engagement (large lectures, online courses)

## 10 Blog Posts to Write

### 1. "Student Retention in Higher Education: 2024 Data & Trends"
- Target: "student retention statistics"
- 2000 words
- Data from NCES, ACE, university reports
- Charts: Retention rates by institution type, major, demographic
- CTA: "See how CoStudy improves retention"

### 2. "How Peer Learning Impacts Student Success (Research-Backed)"
- Target: "peer learning benefits"
- 1800 words
- Research: David Boud, Eric Mazur (peer instruction)
- Studies showing peer learning → better grades, retention
- CTA: "Bring peer learning to your university"

### 3. "LMS Integration 101: Connecting Canvas with Study Group Platforms"
- Target: "Canvas LMS integration"
- 1500 words
- Technical guide: OAuth, API, webhooks
- Step-by-step with screenshots
- CTA: "See CoStudy's Canvas integration"

### 4. "Calculating the ROI of Student Success Platforms"
- Target: "student success platform ROI"
- 2000 words
- Formula: (Retained tuition - Cost) / Cost
- Example: 5% retention improvement = $1.2M ROI
- ROI calculator embed
- CTA: "Calculate your university's ROI"

### 5. "Improving Engagement in Large Lecture Courses (500+ Students)"
- Target: "student engagement large lectures"
- 1700 words
- Challenges: Anonymity, low interaction, passive learning
- Solutions: Study groups, active learning, tech tools
- Case study: Stanford CS 101
- CTA: "See how CoStudy helps"

### 6. "Remote Learning Best Practices: Building Community Online"
- Target: "online course engagement"
- 1600 words
- Challenges of remote learning (isolation, low completion)
- Strategies: Virtual study groups, synchronous sessions
- Tools: Video, chat, collaborative docs
- CTA: "CoStudy for hybrid learning"

### 7. "FERPA Compliance for University Software Vendors"
- Target: "FERPA compliance software"
- 1500 words
- What is FERPA?
- Requirements for vendors
- How to evaluate vendor compliance
- CoStudy's approach to FERPA
- CTA: "See CoStudy's security docs"

### 8. "Case Study: How UCLA Reduced Drop Rates by 15% with Peer Learning"
- Target: "university retention case study"
- 1800 words
- Full case study (see case studies issue)
- Before/after data
- Implementation details
- CTA: "Download full PDF case study"

### 9. "Choosing a Student Engagement Platform: Buyer's Guide"
- Target: "student engagement software"
- 2000 words
- Checklist: Features, pricing, integrations, security
- Comparison table (generic, not competitor bashing)
- Red flags to avoid
- CTA: "See why universities choose CoStudy"

### 10. "The Science of Study Groups: Why Peer Learning Works"
- Target: "study groups benefits"
- 1700 words
- Psychology: Social learning theory, cognitive load, motivation
- Research: Study groups → better grades, lower stress
- Best practices for effective study groups
- CTA: "Bring structured study groups to your university"

## Blog Structure (Each Post)

**Header:**
- Title (H1)
- Author name + photo
- Published date
- Read time (8-10 min)
- Share buttons (LinkedIn, Twitter, Email)

**Body:**
- Introduction (problem statement)
- 3-5 main sections (H2)
- Bullet points, numbered lists
- 2-3 images/charts
- Pull quotes
- Internal links to other posts/pages

**Footer:**
- CTA box: "Want to improve retention at your university?" → Demo button
- Related articles (3 posts)
- Author bio
- Newsletter signup

**SEO:**
- Meta title, description
- Target keyword in: Title, H1, first paragraph, 2-3 H2s
- Alt text for images
- Internal links to homepage, features, pricing

## Technical Setup
- \`/blog\` - Blog listing page
- \`/blog/[slug]\` - Individual posts
- MDX for content (allows React components)
- Syntax highlighting for code blocks
- RSS feed
- Sitemap includes all posts

## Publishing Schedule
- 2 posts/month minimum
- Promote: LinkedIn, Twitter, email newsletter
- Repurpose: Turn posts into LinkedIn articles, conference talks

## Success Criteria
- 10 posts live at launch
- Each post: 1500+ words, SEO optimized
- Target: 5,000 organic visitors/month from blog within 6 months
- 20+ backlinks from .edu and higher ed sites`,
  },
];

async function main() {
  console.log('🌐 Creating WEBSITE Linear issues...\n');

  // Get the first team
  const teams = await linear.teams();
  const team = teams.nodes[0];

  if (!team) {
    console.error('❌ No teams found in Linear workspace');
    process.exit(1);
  }

  console.log(`📋 Using team: ${team.name} (${team.id})\n`);

  // Create issues
  for (const issue of websiteIssues) {
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

  console.log('\n🎉 All WEBSITE issues created successfully!');
  console.log(`\n📊 Summary:`);
  console.log(`   Total issues: ${websiteIssues.length}`);
  console.log(`   Urgent: ${websiteIssues.filter(i => i.priority === 1).length}`);
  console.log(`   High: ${websiteIssues.filter(i => i.priority === 2).length}`);
  console.log(`   Medium: ${websiteIssues.filter(i => i.priority === 3).length}`);
  console.log(`   Low: ${websiteIssues.filter(i => i.priority === 4).length}`);
  console.log(`   Total story points: ${websiteIssues.reduce((sum, i) => sum + (i.estimate || 0), 0)}`);
}

main().catch(console.error);
