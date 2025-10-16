import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

if (!LINEAR_API_KEY) {
  console.error('❌ LINEAR_API_KEY environment variable is required');
  process.exit(1);
}

const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

async function main() {
  console.log('🚀 Requesting Website Issue Protocol from Cyrus on all active website issues...\n');

  // Get Cyrus user
  const users = await linear.users();
  const cyrus = users.nodes.find((u) => u.name === 'Cyrus');

  if (!cyrus) {
    console.error('❌ Cyrus not found');
    process.exit(1);
  }

  console.log(`✅ Found Cyrus: ${cyrus.name} (${cyrus.email})\n`);

  // Get all "In Progress" website issues (from the known issue numbers)
  const issueNumbers = [
    // URGENT (5 remaining)
    137, 138, 139, 140, 141,
    // HIGH (12 issues)
    125, 126, 127, 128, 129, 130, 131, 132, 142, 143, 144, 145,
    // MEDIUM/LOW (10 issues)
    146, 147, 149, 150, 151, 133, 134, 135, 152, 153
  ];

  const activeIssues: any[] = [];

  for (const num of issueNumbers) {
    const issues = await linear.issues({ filter: { number: { eq: num } } });
    const issue = issues.nodes[0];
    if (issue) {
      const state = await issue.state;
      // Only include if In Progress
      if (state?.name === 'In Progress') {
        activeIssues.push(issue);
      }
    }
  }

  if (activeIssues.length === 0) {
    console.log('✅ No active issues assigned to Cyrus');
    return;
  }

  console.log(`📋 Found ${activeIssues.length} active issues assigned to Cyrus\n`);

  let commented = 0;

  const protocolComment = `@[${cyrus.name}](${cyrus.id}) run **"Website Issue Protocol"** now.

## Checklist → Website QA & Deployment Review

Report back with:
• **What changed** (1–3 lines summary)
• **PR / commit / staging URL** (links to code and preview)
• **Before/after screenshots or video** (visual proof of changes)
• **Lighthouse & axe summary** (performance & accessibility scores)
• **Any risks or owner decisions** (breaking changes, edge cases, considerations)

Tag @brock for final review → iterate or ship.`;

  for (const issue of activeIssues) {
    try {
      const state = await issue.state;

      // Create comment with deployment request
      await linear.createComment({
        issueId: issue.id,
        body: protocolComment,
      });

      console.log(`✅ COS-${issue.number}: ${issue.title}`);
      console.log(`   State: ${state?.name}`);
      console.log(`   URL: ${issue.url}\n`);
      commented++;

      // Rate limit: wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Failed COS-${issue.number}:`, error);
    }
  }

  console.log(`\n🎉 Done!`);
  console.log(`   ✅ Commented on: ${commented} issues`);
  console.log(`\n💡 Cyrus will respond with the Website Issue Protocol checklist.`);
  console.log(`   📍 Check Linear for responses and tag you for final review!`);
}

main().catch(console.error);
