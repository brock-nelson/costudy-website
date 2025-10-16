import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

if (!LINEAR_API_KEY) {
  console.error('❌ LINEAR_API_KEY environment variable is required');
  process.exit(1);
}

const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

async function main() {
  console.log('🤖 Reassigning all website issues to Cyrus bot...\n');

  // Get Cyrus bot user
  const users = await linear.users();
  const cyrusBot = users.nodes.find((u) => u.name === 'Cyrus');

  if (!cyrusBot) {
    console.error('❌ Cyrus bot not found in Linear workspace');
    process.exit(1);
  }

  console.log(`🤖 Found Cyrus: ${cyrusBot.id}\n`);

  // All website issues (excluding design-focused COS-148)
  const issueNumbers = [
    // URGENT
    136, 137, 138, 139, 140, 141,
    // HIGH
    125, 126, 127, 128, 129, 130, 131, 132, 142, 143, 144, 145,
    // MEDIUM/LOW
    146, 147, 149, 150, 151, 133, 134, 135, 152, 153
  ];

  console.log(`📋 Reassigning ${issueNumbers.length} issues...\n`);

  let reassigned = 0;

  for (const issueNumber of issueNumbers) {
    try {
      const issues = await linear.issues({ filter: { number: { eq: issueNumber } } });
      const issue = issues.nodes[0];

      if (issue) {
        await linear.updateIssue(issue.id, {
          assigneeId: cyrusBot.id,
        });

        console.log(`✅ COS-${issueNumber}: ${issue.title}`);
        reassigned++;
      }
    } catch (error) {
      console.error(`❌ Failed COS-${issueNumber}:`, error);
    }
  }

  console.log(`\n🎉 Reassignment complete!`);
  console.log(`   Reassigned: ${reassigned} issues to Cyrus bot`);
  console.log(`\n💡 Cyrus should start working within 10-30 seconds!`);
  console.log(`   Watch the Cyrus terminal for activity.`);
}

main().catch(console.error);
