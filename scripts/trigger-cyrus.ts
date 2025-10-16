import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

if (!LINEAR_API_KEY) {
  console.error('❌ LINEAR_API_KEY environment variable is required');
  process.exit(1);
}

const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

async function main() {
  console.log('🎯 Triggering Cyrus by adding comments to issues...\n');

  // Get Brock's assigned issues
  const users = await linear.users();
  const brock = users.nodes.find((u) => u.name?.toLowerCase().includes('brock'));

  if (!brock) {
    console.error('❌ Brock not found');
    process.exit(1);
  }

  // Get all issues assigned to Brock
  const issues = await linear.issues({
    filter: {
      assignee: { id: { eq: brock.id } },
      state: { type: { nin: ['completed', 'canceled'] } }
    }
  });

  console.log(`Found ${issues.nodes.length} assigned issues\n`);

  // Comment on the first 5 to trigger Cyrus
  const issuesToTrigger = issues.nodes.slice(0, 5);

  for (const issue of issuesToTrigger) {
    try {
      await linear.createComment({
        issueId: issue.id,
        body: '🤖 Cyrus, please start working on this issue.',
      });

      console.log(`✅ Triggered: ${issue.identifier} - ${issue.title}`);
    } catch (error) {
      console.error(`❌ Failed ${issue.identifier}:`, error);
    }
  }

  console.log('\n🎉 Done! Check your Cyrus terminal for activity.');
  console.log('💡 Cyrus should start working within 10-30 seconds.');
}

main().catch(console.error);
