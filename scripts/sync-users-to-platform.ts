/**
 * Sync Users from Marketing Website to Platform Database
 *
 * This script syncs user data collected from the marketing website
 * (votes, demo requests, email subscriptions) to the platform database.
 *
 * Usage:
 *   npx tsx scripts/sync-users-to-platform.ts
 *
 * Environment Variables Required:
 *   - DATABASE_URL: Marketing website database (already set)
 *   - PLATFORM_DATABASE_URL: Platform database connection string
 *   - PLATFORM_API_URL: Platform API endpoint (optional, for API-based sync)
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { votes, demoRequests, emailSubscriptions, contactSubmissions } from '../src/db/schema';
import { sql } from 'drizzle-orm';

// Marketing website database
const marketingDbClient = postgres(process.env.DATABASE_URL!);
const marketingDb = drizzle(marketingDbClient);

// Platform database (when configured)
// const platformDbClient = postgres(process.env.PLATFORM_DATABASE_URL!);
// const platformDb = drizzle(platformDbClient);

interface UserSyncData {
  email: string;
  name?: string;
  source: 'vote' | 'demo' | 'subscription' | 'contact';
  metadata: Record<string, any>;
  firstSeenAt: Date;
  lastActivityAt: Date;
}

async function collectUserData(): Promise<Map<string, UserSyncData>> {
  const users = new Map<string, UserSyncData>();

  console.log('📊 Collecting user data from marketing website...\n');

  // Collect from votes
  const voteData = await marketingDb
    .select({
      email: votes.userEmail,
      name: votes.userName,
      createdAt: votes.createdAt,
      ipAddress: votes.ipAddress,
      metadata: votes.metadata,
    })
    .from(votes)
    .orderBy(votes.createdAt);

  console.log(`  ✓ Found ${voteData.length} unique voters`);

  for (const vote of voteData) {
    const existing = users.get(vote.email);
    if (!existing || vote.createdAt < existing.firstSeenAt) {
      users.set(vote.email, {
        email: vote.email,
        name: vote.name || undefined,
        source: 'vote',
        metadata: {
          ipAddress: vote.ipAddress,
          hasVoted: true,
          voteMetadata: vote.metadata,
        },
        firstSeenAt: vote.createdAt,
        lastActivityAt: vote.createdAt,
      });
    }
  }

  // Collect from demo requests
  const demoData = await marketingDb
    .select({
      email: demoRequests.email,
      name: demoRequests.name,
      createdAt: demoRequests.createdAt,
      institution: demoRequests.institution,
      role: demoRequests.role,
      phoneNumber: demoRequests.phoneNumber,
      status: demoRequests.status,
    })
    .from(demoRequests)
    .orderBy(demoRequests.createdAt);

  console.log(`  ✓ Found ${demoData.length} demo requests`);

  for (const demo of demoData) {
    const existing = users.get(demo.email);
    if (existing) {
      existing.metadata = {
        ...existing.metadata,
        hasDemoRequest: true,
        institution: demo.institution,
        role: demo.role,
        phoneNumber: demo.phoneNumber,
        demoStatus: demo.status,
      };
      existing.lastActivityAt = demo.createdAt;
    } else {
      users.set(demo.email, {
        email: demo.email,
        name: demo.name,
        source: 'demo',
        metadata: {
          hasDemoRequest: true,
          institution: demo.institution,
          role: demo.role,
          phoneNumber: demo.phoneNumber,
          demoStatus: demo.status,
        },
        firstSeenAt: demo.createdAt,
        lastActivityAt: demo.createdAt,
      });
    }
  }

  // Collect from email subscriptions
  const subData = await marketingDb
    .select({
      email: emailSubscriptions.email,
      name: emailSubscriptions.name,
      createdAt: emailSubscriptions.createdAt,
      isActive: emailSubscriptions.isActive,
      source: emailSubscriptions.source,
    })
    .from(emailSubscriptions)
    .orderBy(emailSubscriptions.createdAt);

  console.log(`  ✓ Found ${subData.length} email subscribers`);

  for (const sub of subData) {
    const existing = users.get(sub.email);
    if (existing) {
      existing.metadata = {
        ...existing.metadata,
        isSubscribed: sub.isActive,
        subscriptionSource: sub.source,
      };
    } else if (sub.name) {
      users.set(sub.email, {
        email: sub.email,
        name: sub.name,
        source: 'subscription',
        metadata: {
          isSubscribed: sub.isActive,
          subscriptionSource: sub.source,
        },
        firstSeenAt: sub.createdAt,
        lastActivityAt: sub.createdAt,
      });
    }
  }

  // Collect from contact submissions
  const contactData = await marketingDb
    .select({
      email: contactSubmissions.email,
      name: contactSubmissions.name,
      createdAt: contactSubmissions.createdAt,
      type: contactSubmissions.type,
      status: contactSubmissions.status,
    })
    .from(contactSubmissions)
    .orderBy(contactSubmissions.createdAt);

  console.log(`  ✓ Found ${contactData.length} contact submissions\n`);

  for (const contact of contactData) {
    const existing = users.get(contact.email);
    if (existing) {
      existing.metadata = {
        ...existing.metadata,
        hasContactedUs: true,
        contactType: contact.type,
        contactStatus: contact.status,
      };
      existing.lastActivityAt = contact.createdAt;
    } else {
      users.set(contact.email, {
        email: contact.email,
        name: contact.name,
        source: 'contact',
        metadata: {
          hasContactedUs: true,
          contactType: contact.type,
          contactStatus: contact.status,
        },
        firstSeenAt: contact.createdAt,
        lastActivityAt: contact.createdAt,
      });
    }
  }

  return users;
}

async function syncToPlatform(users: Map<string, UserSyncData>) {
  console.log(`📤 Ready to sync ${users.size} unique users to platform\n`);

  // TODO: Implement platform sync once PLATFORM_DATABASE_URL is configured
  // Options:
  //   1. Direct database sync via TypeORM
  //   2. API-based sync via platform API endpoints
  //   3. Queue-based sync via background jobs

  console.log('⚠️  Platform database connection not yet configured');
  console.log('   Set PLATFORM_DATABASE_URL environment variable to enable sync\n');

  // Preview sync data
  console.log('📋 Sample user data (first 5):');
  let count = 0;
  for (const [email, data] of users) {
    if (count >= 5) break;
    console.log(`\n  ${email}:`);
    console.log(`    Name: ${data.name || 'N/A'}`);
    console.log(`    Source: ${data.source}`);
    console.log(`    First Seen: ${data.firstSeenAt.toISOString()}`);
    console.log(`    Last Activity: ${data.lastActivityAt.toISOString()}`);
    console.log(`    Metadata:`, data.metadata);
    count++;
  }

  console.log(`\n  ... and ${users.size - 5} more users\n`);

  return users;
}

async function main() {
  try {
    console.log('🔄 CoStudy User Sync: Website → Platform\n');
    console.log('========================================\n');

    const users = await collectUserData();
    await syncToPlatform(users);

    console.log('✅ Sync complete!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  } finally {
    await marketingDbClient.end();
  }
}

main();
