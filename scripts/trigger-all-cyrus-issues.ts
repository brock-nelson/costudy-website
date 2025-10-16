import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

if (!LINEAR_API_KEY) {
  console.error('❌ LINEAR_API_KEY environment variable is required');
  process.exit(1);
}

const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

async function main() {
  console.log('🚀 Triggering Cyrus on all website issues...\n');

  // Get Cyrus user
  const users = await linear.users();
  const cyrus = users.nodes.find((u) => u.name === 'Cyrus');

  if (!cyrus) {
    console.error('❌ Cyrus not found');
    process.exit(1);
  }

  // All website issues except 136 (already started) and 148 (design task)
  const issueNumbers = [
    // URGENT (5 remaining)
    137, 138, 139, 140, 141,
    // HIGH (12 issues)
    125, 126, 127, 128, 129, 130, 131, 132, 142, 143, 144, 145,
    // MEDIUM/LOW (10 issues)
    146, 147, 149, 150, 151, 133, 134, 135, 152, 153
  ];

  console.log(`📋 Triggering ${issueNumbers.length} issues...\n`);

  let triggered = 0;

  for (const issueNumber of issueNumbers) {
    try {
      const issues = await linear.issues({ filter: { number: { eq: issueNumber } } });
      const issue = issues.nodes[0];

      if (issue) {
        // Assign to Cyrus
        await linear.updateIssue(issue.id, {
          assigneeId: cyrus.id,
        });

        // @mention Cyrus to trigger work
        await linear.createComment({
          issueId: issue.id,
          body: `@[${cyrus.name}](${cyrus.id}) Please start working on this issue.`,
        });

        console.log(`✅ COS-${issueNumber}: ${issue.title}`);
        triggered++;

        // Rate limit: wait 1 second between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`❌ Failed COS-${issueNumber}:`, error);
    }
  }

  console.log(`\n🎉 Done!`);
  console.log(`   Triggered: ${triggered} issues`);
  console.log(`\n💡 Cyrus will process these in the background.`);
  console.log(`   Check Linear for progress updates!`);
}

main().catch(console.error);
