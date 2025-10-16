import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

if (!LINEAR_API_KEY) {
  console.error('❌ LINEAR_API_KEY environment variable is required');
  process.exit(1);
}

const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

async function main() {
  console.log('🔍 Checking issue assignments for Cyrus...\n');

  const issueNumbers = [136, 137, 139, 149, 150];

  for (const num of issueNumbers) {
    const issues = await linear.issues({ filter: { number: { eq: num } } });
    const issue = issues.nodes[0];

    if (issue) {
      const assignee = await issue.assignee;
      const labels = await issue.labels();
      const state = await issue.state;

      console.log(`COS-${num}: ${issue.title}`);
      console.log(`  Assignee: ${assignee?.name || '❌ NONE'}`);
      console.log(`  Labels: ${labels.nodes.map(l => l.name).join(', ') || '❌ NONE'}`);
      console.log(`  State: ${state?.name}`);
      console.log(`  URL: ${issue.url}`);
      console.log('');
    }
  }

  console.log('💡 For Cyrus to work, issues need:');
  console.log('   1. ✅ Assignee: brock@costudy.co');
  console.log('   2. ✅ Label: Feature, Performance, Content, etc.');
  console.log('   3. ✅ State: Not "Done" or "Canceled"');
}

main().catch(console.error);
