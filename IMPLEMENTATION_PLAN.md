# CoStudy Website - Voting & Admin System Implementation Plan

## Executive Summary
This plan details the implementation of Tickets 19, 25, and 26: a complete feature voting system with admin panel and dynamic release log. The system will allow users to vote on features, submit suggestions, and view release notes, while admins can moderate content and publish updates.

---

## Table of Contents
1. [Technology Stack](#technology-stack)
2. [Database Schema](#database-schema)
3. [API Architecture](#api-architecture)
4. [Component Structure](#component-structure)
5. [Security Implementation](#security-implementation)
6. [Implementation Phases](#implementation-phases)
7. [Testing Strategy](#testing-strategy)
8. [Deployment Checklist](#deployment-checklist)

---

## Technology Stack

### Core Technologies
- **Frontend**: Next.js 15.5.4 (App Router)
- **Database**: Vercel Postgres (serverless PostgreSQL)
- **Authentication**: NextAuth.js v5 (Auth.js)
- **ORM**: Drizzle ORM (TypeScript-first, lightweight)
- **State Management**: React Context + Server Actions
- **Styling**: Tailwind CSS v4

### Why These Choices?

**Vercel Postgres**
- Native Vercel integration (zero config)
- Serverless (pay per query, auto-scaling)
- Edge-compatible
- Built on Neon (fast, branching)

**NextAuth.js v5**
- Industry standard for Next.js auth
- Supports credentials + OAuth providers
- Built-in CSRF protection
- Edge-compatible
- Session management

**Drizzle ORM**
- Type-safe SQL queries
- Zero-runtime overhead
- Excellent TypeScript inference
- Easy migrations
- ~7kb bundle size vs Prisma's ~30kb

### Alternative Considerations
- **Supabase**: Good option but adds external dependency
- **PlanetScale**: Excellent but requires separate billing
- **Firebase**: Overkill for this use case

---

## Database Schema

### Tables Overview

```sql
-- Users table (for admin authentication)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  two_factor_secret VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Feature requests/suggestions (What's Next)
CREATE TABLE feature_requests (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, in_progress, completed, rejected
  vote_count INTEGER DEFAULT 0,
  submitter_email VARCHAR(255),
  submitter_name VARCHAR(100),
  rank INTEGER, -- calculated field based on votes
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  approved_at TIMESTAMP,
  completed_at TIMESTAMP,
  approved_by INTEGER REFERENCES users(id)
);

-- Individual votes (track who voted for what)
CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  feature_request_id INTEGER REFERENCES feature_requests(id) ON DELETE CASCADE,
  voter_identifier VARCHAR(255) NOT NULL, -- IP hash or fingerprint
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(feature_request_id, voter_identifier)
);

-- Release log entries (changelog)
CREATE TABLE release_entries (
  id SERIAL PRIMARY KEY,
  version VARCHAR(50),
  release_date DATE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50), -- NEW_FEATURE, IMPROVEMENT, FIX
  status VARCHAR(50) DEFAULT 'draft', -- draft, published
  author_id INTEGER REFERENCES users(id),
  feature_request_id INTEGER REFERENCES feature_requests(id), -- link to original feature
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);

-- Release entry items (multiple items per release)
CREATE TABLE release_items (
  id SERIAL PRIMARY KEY,
  release_entry_id INTEGER REFERENCES release_entries(id) ON DELETE CASCADE,
  category VARCHAR(50), -- NEW_FEATURE, IMPROVEMENT, FIX
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50), -- emoji or icon identifier
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Admin activity log (audit trail)
CREATE TABLE admin_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  action VARCHAR(100) NOT NULL, -- approved_feature, rejected_feature, published_release, etc.
  entity_type VARCHAR(50), -- feature_request, release_entry
  entity_id INTEGER,
  metadata JSONB, -- additional context
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_feature_requests_status ON feature_requests(status);
CREATE INDEX idx_feature_requests_vote_count ON feature_requests(vote_count DESC);
CREATE INDEX idx_votes_voter ON votes(voter_identifier);
CREATE INDEX idx_release_entries_status ON release_entries(status);
CREATE INDEX idx_release_entries_date ON release_entries(release_date DESC);
CREATE INDEX idx_admin_logs_user ON admin_logs(user_id, created_at DESC);
```

### Key Design Decisions

**Vote Tracking**
- Uses `voter_identifier` (IP hash + browser fingerprint) instead of cookies
- More persistent than localStorage alone
- UNIQUE constraint prevents duplicate votes
- GDPR-compliant (hashed IPs, no PII)

**Status Flow**
```
Feature Request: pending → approved → in_progress → completed
                    ↓
                 rejected

Release Entry: draft → published
```

**Soft Deletes**
- Not implemented (hard deletes with CASCADE)
- Can add `deleted_at` column if needed for audit trail

---

## API Architecture

### API Routes Structure

```
/api/
├── auth/
│   ├── [...nextauth]/route.ts     # NextAuth.js handler
│   ├── login/route.ts              # Custom login endpoint
│   └── logout/route.ts             # Logout handler
│
├── features/
│   ├── route.ts                    # GET all features, POST new suggestion
│   ├── [id]/route.ts               # GET single feature, PATCH update
│   ├── [id]/vote/route.ts          # POST vote, DELETE unvote
│   └── stats/route.ts              # GET voting statistics
│
├── admin/
│   ├── features/
│   │   ├── route.ts                # GET pending features (admin only)
│   │   └── [id]/approve/route.ts  # POST approve feature
│   │
│   ├── releases/
│   │   ├── route.ts                # GET all releases, POST create
│   │   ├── [id]/route.ts           # GET single, PATCH update, DELETE
│   │   └── [id]/publish/route.ts  # POST publish release
│   │
│   └── logs/route.ts               # GET admin activity logs
│
└── releases/
    ├── route.ts                    # GET published releases (public)
    └── [id]/route.ts               # GET single release (public)
```

### Authentication Middleware

```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const path = req.nextUrl.pathname;

      // Admin routes require authentication
      if (path.startsWith('/dashboard-xyz') || path.startsWith('/api/admin')) {
        return token?.role === 'admin';
      }

      return true;
    },
  },
});

export const config = {
  matcher: ['/dashboard-xyz/:path*', '/api/admin/:path*'],
};
```

### Rate Limiting

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Voting rate limit: 10 votes per hour
export const voteRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'),
});

// Suggestion rate limit: 3 submissions per day
export const suggestionRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '24 h'),
});
```

### Server Actions vs API Routes

**Use Server Actions for:**
- Form submissions (voting, suggestions)
- Admin mutations (approve, reject, publish)
- Benefits: Type-safety, progressive enhancement, automatic revalidation

**Use API Routes for:**
- Public data fetching (GET requests)
- Webhook handlers
- External integrations

**Example Server Action:**

```typescript
// app/actions/vote.ts
'use server';

import { db } from '@/lib/db';
import { getVoterIdentifier } from '@/lib/fingerprint';
import { revalidatePath } from 'next/cache';

export async function voteForFeature(featureId: number) {
  const identifier = await getVoterIdentifier();

  // Check if already voted
  const existingVote = await db.votes.findUnique({
    where: { feature_request_id_voter_identifier: { featureId, identifier } }
  });

  if (existingVote) {
    throw new Error('Already voted for this feature');
  }

  // Check vote limit (max 2 active votes)
  const userVotes = await db.votes.count({
    where: { voter_identifier: identifier }
  });

  if (userVotes >= 2) {
    throw new Error('Maximum 2 active votes allowed');
  }

  // Create vote
  await db.votes.create({
    data: { feature_request_id: featureId, voter_identifier: identifier }
  });

  // Update vote count
  await db.feature_requests.update({
    where: { id: featureId },
    data: { vote_count: { increment: 1 } }
  });

  revalidatePath('/products');
  return { success: true };
}
```

---

## Component Structure

### Public-Facing Components

```
/components/
├── voting/
│   ├── FeatureCard.tsx              # Individual feature card
│   ├── FeatureGrid.tsx              # Grid of top 6 features
│   ├── VoteButton.tsx               # Vote/unvote toggle
│   ├── SuggestionForm.tsx           # Submit new idea
│   ├── FeatureTable.tsx             # "See All" sortable table
│   └── VotingStats.tsx              # Remaining votes indicator
│
├── releases/
│   ├── ReleaseLog.tsx               # Public changelog
│   ├── ReleaseEntry.tsx             # Single release card
│   ├── ReleaseFilter.tsx            # Search & filter UI
│   └── ReleaseTimeline.tsx          # Visual timeline view
│
└── ui/
    ├── Modal.tsx                    # Reusable modal
    ├── Toast.tsx                    # Toast notifications
    └── Badge.tsx                    # Status badges
```

### Admin Panel Components

```
/app/dashboard-xyz/
├── layout.tsx                       # Admin layout with sidebar
├── page.tsx                         # Dashboard overview
├── features/
│   ├── page.tsx                     # Moderation queue
│   └── [id]/page.tsx                # Feature detail & edit
├── releases/
│   ├── page.tsx                     # Release list
│   ├── new/page.tsx                 # Create release
│   └── [id]/
│       ├── page.tsx                 # Edit release
│       └── preview/page.tsx         # Preview before publish
└── components/
    ├── Sidebar.tsx
    ├── FeatureModeration.tsx
    ├── ReleaseEditor.tsx
    ├── ActivityLog.tsx
    └── StatsCards.tsx
```

### State Management Pattern

**Client State** (React Context)
- User's active votes (synced with DB)
- Toast notifications
- Modal states

**Server State** (React Server Components + Server Actions)
- Feature requests
- Release log entries
- Admin data

**Example Context:**

```typescript
// contexts/VotingContext.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface VotingContextType {
  activeVotes: number[];
  remainingVotes: number;
  addVote: (featureId: number) => Promise<void>;
  removeVote: (featureId: number) => Promise<void>;
}

const VotingContext = createContext<VotingContextType | null>(null);

export function VotingProvider({ children, initialVotes }: {
  children: React.ReactNode;
  initialVotes: number[];
}) {
  const [activeVotes, setActiveVotes] = useState(initialVotes);
  const remainingVotes = 2 - activeVotes.length;

  const addVote = async (featureId: number) => {
    // Server Action call
    await voteForFeature(featureId);
    setActiveVotes([...activeVotes, featureId]);
  };

  const removeVote = async (featureId: number) => {
    // Server Action call
    await unvoteForFeature(featureId);
    setActiveVotes(activeVotes.filter(id => id !== featureId));
  };

  return (
    <VotingContext.Provider value={{ activeVotes, remainingVotes, addVote, removeVote }}>
      {children}
    </VotingContext.Provider>
  );
}

export const useVoting = () => {
  const context = useContext(VotingContext);
  if (!context) throw new Error('useVoting must be used within VotingProvider');
  return context;
};
```

---

## Security Implementation

### 1. Authentication & Authorization

**Password Requirements**
- Minimum 12 characters
- Must include: uppercase, lowercase, number, special character
- Hashed with bcrypt (cost factor: 12)

**Two-Factor Authentication (Optional)**
- TOTP-based (Google Authenticator, Authy)
- QR code generation with `qrcode` library
- Backup codes generated and encrypted

**Session Management**
- JWT tokens (signed with secret)
- 7-day expiration
- Refresh token rotation
- Secure HTTP-only cookies

### 2. Admin URL Obfuscation

```env
# .env.local
ADMIN_URL_PATH=dashboard-xyz  # Change to random string
```

```typescript
// middleware.ts - Dynamic path matching
const adminPath = process.env.ADMIN_URL_PATH || 'dashboard-xyz';

export const config = {
  matcher: [`/${adminPath}/:path*`, '/api/admin/:path*'],
};
```

### 3. Input Validation & Sanitization

```typescript
// lib/validation.ts
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

export const featureSuggestionSchema = z.object({
  title: z.string()
    .min(10, 'Title must be at least 10 characters')
    .max(255, 'Title too long')
    .transform(val => DOMPurify.sanitize(val, { ALLOWED_TAGS: [] })),

  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description too long')
    .transform(val => DOMPurify.sanitize(val, { ALLOWED_TAGS: ['b', 'i', 'em', 'strong'] })),

  email: z.string()
    .email('Invalid email')
    .optional()
    .transform(val => val ? DOMPurify.sanitize(val, { ALLOWED_TAGS: [] }) : undefined),
});
```

### 4. CSRF Protection

NextAuth.js provides built-in CSRF protection. Additional measures:

```typescript
// app/api/admin/features/[id]/approve/route.ts
import { headers } from 'next/headers';

export async function POST(req: Request) {
  const headersList = headers();
  const origin = headersList.get('origin');
  const referer = headersList.get('referer');

  // Verify request origin
  if (!origin || !referer || !referer.startsWith(origin)) {
    return new Response('Forbidden', { status: 403 });
  }

  // ... rest of logic
}
```

### 5. SQL Injection Prevention

Drizzle ORM uses parameterized queries by default:

```typescript
// Safe - parameterized
await db.select()
  .from(feature_requests)
  .where(eq(feature_requests.id, featureId));

// Also safe - prepared statements
const statement = db.select()
  .from(feature_requests)
  .where(eq(feature_requests.id, sql.placeholder('id')))
  .prepare();

await statement.execute({ id: featureId });
```

### 6. Rate Limiting

```typescript
// app/api/features/route.ts
import { voteRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/ip';

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const { success } = await voteRateLimit.limit(ip);

  if (!success) {
    return new Response('Too many requests', { status: 429 });
  }

  // ... proceed with vote
}
```

### 7. Content Security Policy

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self' data:;
      connect-src 'self' https://vercel-insights.com;
    `.replace(/\s{2,}/g, ' ').trim()
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
**Goal**: Set up database, authentication, and basic structure

**Tasks**:
1. Initialize Vercel Postgres database
2. Set up Drizzle ORM and create schema
3. Run migrations
4. Implement NextAuth.js with credentials provider
5. Create basic admin layout
6. Set up environment variables
7. Configure security headers

**Deliverables**:
- Database schema deployed
- Admin login working
- Protected admin routes
- Security middleware active

**Testing Checklist**:
- [ ] Database connection successful
- [ ] Admin can log in
- [ ] Unauthorized users redirected from admin routes
- [ ] CSRF protection working
- [ ] Session persistence across page refreshes

---

### Phase 2: Feature Voting System (Week 2)
**Goal**: Build public-facing voting interface

**Tasks**:
1. Create FeatureCard component with vote button
2. Implement voting Server Actions
3. Add voter fingerprinting
4. Build SuggestionForm with email capture
5. Create FeatureTable for "See All" view
6. Implement auto-reordering by votes
7. Add localStorage sync for vote persistence
8. Create toast notifications

**Deliverables**:
- Top 6 features displayed on homepage
- Vote/unvote functionality
- Suggestion submission form
- "See All" sortable table
- Vote limit enforcement (2 max)

**Testing Checklist**:
- [ ] Can vote for feature (card shows selected state)
- [ ] Can unvote
- [ ] Cannot vote for more than 2 features
- [ ] Cannot vote twice for same feature
- [ ] Features auto-reorder by vote count
- [ ] Suggestion form validates properly
- [ ] Email is optional but encouraged
- [ ] Confirmation message shows after submission
- [ ] Votes persist across page refreshes
- [ ] Rate limiting prevents spam

---

### Phase 3: Admin Moderation Panel (Week 3)
**Goal**: Build admin interface for managing features

**Tasks**:
1. Create admin dashboard with stats cards
2. Build moderation queue (pending features)
3. Implement approve/reject actions
4. Add feature editing capability
5. Create activity log viewer
6. Build notification system for new submissions
7. Add batch operations (approve multiple)
8. Implement search and filters

**Deliverables**:
- Admin dashboard at /dashboard-xyz
- Moderation queue showing pending suggestions
- Approve/reject/edit features
- Activity audit log
- Email notifications to submitters

**Testing Checklist**:
- [ ] Dashboard shows correct stats
- [ ] Pending features appear in queue
- [ ] Can approve feature (moves to public voting)
- [ ] Can reject feature (hides from public)
- [ ] Can edit feature description before approval
- [ ] Activity log records all actions
- [ ] Email sent to submitter on approval/rejection
- [ ] Search filters work correctly
- [ ] Only admin role can access

---

### Phase 4: Release Log System (Week 4)
**Goal**: Build public changelog and admin editor

**Tasks**:
1. Create public release log page at /updates
2. Build ReleaseEntry components
3. Implement search and filter UI
4. Create admin release editor
5. Add preview mode
6. Implement draft/publish workflow
7. Auto-generate entries from completed features
8. Add version numbering
9. Implement collapsible entries

**Deliverables**:
- Public changelog at /updates
- Admin release editor
- Search and category filtering
- Auto-link completed features to releases
- Preview before publish

**Testing Checklist**:
- [ ] Public can view published releases
- [ ] Drafts not visible to public
- [ ] Search works by keyword
- [ ] Can filter by category (NEW, IMPROVEMENT, FIX)
- [ ] Can filter by date range
- [ ] Admin can create new release
- [ ] Admin can add multiple items to release
- [ ] Preview shows accurate rendering
- [ ] Publishing makes release public immediately
- [ ] Completed features auto-generate draft entries
- [ ] Entries are collapsible
- [ ] Icons/emojis display correctly

---

### Phase 5: Integration & Polish (Week 5)
**Goal**: Connect all systems and refine UX

**Tasks**:
1. Link feature voting to release log
2. When feature completed, auto-archive from voting board
3. Add release notes to completed feature cards
4. Implement email notifications
5. Add analytics tracking
6. Performance optimization
7. Accessibility audit (WCAG AA)
8. Mobile responsive testing
9. Dark mode verification
10. SEO optimization for /updates

**Deliverables**:
- Seamless workflow from suggestion → approval → voting → completion → release
- Email notifications throughout lifecycle
- Performance score >90 (Lighthouse)
- WCAG AA compliant
- Fully responsive

**Testing Checklist**:
- [ ] Completed feature removed from voting board
- [ ] Draft release note auto-created
- [ ] Admin can link release to original feature
- [ ] Submitter notified at each stage
- [ ] Analytics tracking votes and page views
- [ ] Lighthouse score >90
- [ ] All interactive elements keyboard accessible
- [ ] Screen reader friendly
- [ ] Works on mobile (iOS Safari, Android Chrome)
- [ ] Dark mode works throughout
- [ ] /updates page indexed by search engines

---

## Testing Strategy

### Unit Tests
**Tool**: Vitest

```typescript
// __tests__/lib/fingerprint.test.ts
import { describe, it, expect } from 'vitest';
import { generateFingerprint } from '@/lib/fingerprint';

describe('Fingerprint Generation', () => {
  it('generates consistent hash for same inputs', () => {
    const ip1 = generateFingerprint('192.168.1.1', 'Mozilla/5.0...');
    const ip2 = generateFingerprint('192.168.1.1', 'Mozilla/5.0...');
    expect(ip1).toBe(ip2);
  });

  it('generates different hashes for different IPs', () => {
    const ip1 = generateFingerprint('192.168.1.1', 'Mozilla/5.0...');
    const ip2 = generateFingerprint('192.168.1.2', 'Mozilla/5.0...');
    expect(ip1).not.toBe(ip2);
  });
});
```

### Integration Tests
**Tool**: Playwright

```typescript
// __tests__/e2e/voting.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Feature Voting', () => {
  test('user can vote for a feature', async ({ page }) => {
    await page.goto('/products');

    // Find first feature card
    const featureCard = page.locator('[data-testid="feature-card"]').first();

    // Click vote button
    await featureCard.locator('[data-testid="vote-button"]').click();

    // Verify selected state
    await expect(featureCard).toHaveClass(/ring-purple-500/);

    // Verify vote count increased
    const voteCount = await featureCard.locator('[data-testid="vote-count"]').textContent();
    expect(parseInt(voteCount || '0')).toBeGreaterThan(0);
  });

  test('user cannot vote for more than 2 features', async ({ page }) => {
    await page.goto('/products');

    // Vote for two features
    await page.locator('[data-testid="vote-button"]').nth(0).click();
    await page.locator('[data-testid="vote-button"]').nth(1).click();

    // Try to vote for third
    await page.locator('[data-testid="vote-button"]').nth(2).click();

    // Should see error toast
    await expect(page.locator('[role="alert"]')).toContainText('Maximum 2 votes');
  });
});
```

### API Tests
**Tool**: Vitest + MSW (Mock Service Worker)

```typescript
// __tests__/api/features.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { POST } from '@/app/api/features/route';

describe('POST /api/features', () => {
  it('creates feature suggestion with valid data', async () => {
    const req = new Request('http://localhost:3000/api/features', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Add dark mode to admin panel',
        description: 'Would love to have dark mode support in the admin dashboard',
        email: 'user@example.com'
      }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.status).toBe('pending');
  });

  it('rejects suggestion with short title', async () => {
    const req = new Request('http://localhost:3000/api/features', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Short',
        description: 'This description is long enough to pass validation',
      }),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });
});
```

### Security Tests

**OWASP ZAP** - Automated security scanning
- SQL injection attempts
- XSS payloads
- CSRF verification
- Authentication bypass attempts

**Manual Penetration Testing Checklist**:
- [ ] Try SQL injection in all form inputs
- [ ] Test XSS with `<script>alert('XSS')</script>` in descriptions
- [ ] Attempt CSRF by crafting malicious form
- [ ] Try session hijacking
- [ ] Test rate limiting with rapid requests
- [ ] Verify admin URL cannot be guessed
- [ ] Test password strength requirements
- [ ] Verify 2FA cannot be bypassed

---

## Deployment Checklist

### Environment Variables
```env
# Database
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=

# Authentication
NEXTAUTH_URL=https://costudy.co
NEXTAUTH_SECRET=  # Generate with: openssl rand -base64 32
ADMIN_URL_PATH=dashboard-xyz  # Change to random string

# Email (for notifications)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=noreply@costudy.co

# Rate Limiting
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Optional: Analytics
NEXT_PUBLIC_GA_ID=
```

### Pre-Launch Steps
1. [ ] Run full test suite
2. [ ] Lighthouse audit (target: >90)
3. [ ] WCAG audit (target: AA)
4. [ ] Security scan with OWASP ZAP
5. [ ] Load testing (artillery.io)
6. [ ] Backup database
7. [ ] Document admin procedures
8. [ ] Set up monitoring (Sentry, Vercel Analytics)
9. [ ] Configure email templates
10. [ ] Prepare launch announcement

### Post-Launch Monitoring
- Database query performance
- API response times
- Error rates (Sentry)
- Vote fraud attempts
- Admin activity frequency
- User engagement metrics

---

## File Structure Summary

```
costudy-website/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx
│   ├── (public)/
│   │   ├── products/page.tsx      # Voting UI here
│   │   └── updates/page.tsx       # Release log
│   ├── dashboard-xyz/             # Admin panel
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── features/
│   │   └── releases/
│   ├── api/
│   │   ├── auth/
│   │   ├── features/
│   │   ├── admin/
│   │   └── releases/
│   └── actions/                   # Server Actions
│       ├── vote.ts
│       ├── suggest.ts
│       └── admin.ts
├── components/
│   ├── voting/
│   ├── releases/
│   └── admin/
├── lib/
│   ├── db.ts                      # Drizzle client
│   ├── auth.ts                    # NextAuth config
│   ├── fingerprint.ts
│   ├── validation.ts
│   └── rate-limit.ts
├── drizzle/
│   ├── schema.ts                  # Database schema
│   └── migrations/
├── middleware.ts
├── drizzle.config.ts
└── auth.config.ts
```

---

## Estimated Timeline

**Total**: 5 weeks

- **Week 1**: Foundation & Database ⚙️
- **Week 2**: Voting System 🗳️
- **Week 3**: Admin Panel 🔒
- **Week 4**: Release Log 📝
- **Week 5**: Integration & Polish ✨

**Assumptions**:
- Full-time development (~40 hours/week)
- Access to necessary tools and services
- No major blockers or scope changes

---

## Risk Mitigation

### Technical Risks

**Risk**: Database performance degradation with high vote volume
**Mitigation**: Implement caching (Vercel KV), optimize queries, add database indexes

**Risk**: Vote manipulation/fraud
**Mitigation**: Multi-layer fraud detection (IP + fingerprint + rate limiting)

**Risk**: Admin credentials compromised
**Mitigation**: Enforce 2FA, activity logging, IP whitelisting option

### UX Risks

**Risk**: Users confused by 2-vote limit
**Mitigation**: Clear UI indicators, helpful error messages, FAQ section

**Risk**: Low submission quality
**Mitigation**: Validation, examples, guidelines, minimum character counts

### Business Risks

**Risk**: Feature voting creates unrealistic expectations
**Mitigation**: Clear disclaimer that votes inform prioritization, not guarantee implementation

---

## Success Metrics

### User Engagement
- **Target**: 30% of visitors interact with voting
- **Target**: 50+ feature suggestions in first month
- **Target**: <5% duplicate suggestions

### Admin Efficiency
- **Target**: <2 minutes average time to moderate a suggestion
- **Target**: 100% of suggestions reviewed within 48 hours
- **Target**: <1% false positives in fraud detection

### Technical Performance
- **Target**: <200ms API response time (p95)
- **Target**: 0% data loss
- **Target**: 99.9% uptime
- **Target**: Lighthouse score >90

---

## Appendix

### A. Voter Fingerprinting Logic

```typescript
// lib/fingerprint.ts
import { headers } from 'next/headers';
import crypto from 'crypto';

export async function getVoterIdentifier(): Promise<string> {
  const headersList = headers();

  const ip = headersList.get('x-forwarded-for') ||
             headersList.get('x-real-ip') ||
             '0.0.0.0';

  const userAgent = headersList.get('user-agent') || '';
  const acceptLanguage = headersList.get('accept-language') || '';

  // Combine signals
  const raw = `${ip}|${userAgent}|${acceptLanguage}`;

  // Hash for privacy
  return crypto
    .createHash('sha256')
    .update(raw)
    .digest('hex')
    .substring(0, 32);
}
```

### B. Email Templates

**Suggestion Submitted**
```html
<h2>Thanks for your suggestion!</h2>
<p>Hi there,</p>
<p>We received your feature suggestion: "<strong>{{title}}</strong>"</p>
<p>Our team will review it soon. You'll hear from us when it's approved!</p>
<p>– The CoStudy Team</p>
```

**Suggestion Approved**
```html
<h2>Your suggestion was approved!</h2>
<p>Hi there,</p>
<p>Great news! Your feature suggestion "<strong>{{title}}</strong>" has been approved and is now open for voting.</p>
<p><a href="{{url}}">See it on the voting board →</a></p>
<p>– The CoStudy Team</p>
```

**Feature Completed**
```html
<h2>We shipped your feature!</h2>
<p>Hi there,</p>
<p>The feature you suggested ("<strong>{{title}}</strong>") has been implemented and released!</p>
<p><a href="{{releaseUrl}}">See the release notes →</a></p>
<p>Thanks for helping us build a better product!</p>
<p>– The CoStudy Team</p>
```

### C. Sample Admin Workflow

```
1. New Suggestion Arrives
   ↓
2. Email notification to admin@costudy.co
   ↓
3. Admin logs in to /dashboard-xyz
   ↓
4. Reviews suggestion in moderation queue
   ↓
5. Options:
   - Approve → Feature goes live for voting
   - Edit & Approve → Clean up description first
   - Reject → Send reason to submitter
   ↓
6. If approved:
   - Feature appears on voting board
   - Submitter notified
   - Starts accumulating votes
   ↓
7. When implementation complete:
   - Admin marks feature as "completed"
   - Draft release note auto-created
   - Feature archived from voting board
   ↓
8. Admin edits release note
   ↓
9. Publishes release
   ↓
10. Submitter notified of release
    Public can view on /updates
```

---

## Questions for Review

Before starting implementation, please confirm:

1. **Database**: Approve Vercel Postgres? Or prefer alternative (Supabase, PlanetScale)?
2. **Admin URL**: Confirm /dashboard-xyz or prefer different obfuscated path?
3. **Email Service**: SMTP provider preference (SendGrid, Postmark, AWS SES)?
4. **Rate Limiting**: Approve Upstash Redis? Or skip for MVP?
5. **Analytics**: Which events should we track?
6. **2FA**: Required or optional for admin?
7. **IP Logging**: Comfortable logging hashed IPs for fraud prevention?
8. **Scope**: Any features to descope for faster MVP launch?

---

**Document Version**: 1.0
**Last Updated**: 2025-01-10
**Author**: Claude Code
**Status**: Ready for Review
