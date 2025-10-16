import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

if (!LINEAR_API_KEY) {
  console.error('❌ LINEAR_API_KEY environment variable is required');
  process.exit(1);
}

const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

async function main() {
  console.log('🔍 Finding all website-related issues...\n');

  // Get teams
  const teams = await linear.teams();
  console.log('Teams found:');
  for (const team of teams.nodes) {
    console.log(`  - ${team.name} (${team.key})`);
  }
  console.log('');

  // Look for issues with COS prefix (from the trigger script)
  const issueNumbers = [
    // URGENT (5 remaining)
    137, 138, 139, 140, 141,
    // HIGH (12 issues)
    125, 126, 127, 128, 129, 130, 131, 132, 142, 143, 144, 145,
    // MEDIUM/LOW (10 issues)
    146, 147, 149, 150, 151, 133, 134, 135, 152, 153
  ];

  console.log(`📋 Checking ${issueNumbers.length} specific website issues...\n`);

  const found: any[] = [];
  const notFound: number[] = [];

  for (const num of issueNumbers) {
    try {
      const issues = await linear.issues({ filter: { number: { eq: num } } });
      const issue = issues.nodes[0];

      if (issue) {
        const assignee = await issue.assignee;
        const state = await issue.state;
        found.push({ issue, assignee, state });
      } else {
        notFound.push(num);
      }
    } catch (error) {
      console.error(`Error checking COS-${num}:`, error);
    }
  }

  console.log(`✅ Found ${found.length} issues\n`);

  // Group by state
  const byState: { [key: string]: any[] } = {};
  for (const { issue, assignee, state } of found) {
    const stateName = state?.name || 'No State';
    if (!byState[stateName]) {
      byState[stateName] = [];
    }
    byState[stateName].push({ issue, assignee, state });
  }

  // Print by state
  for (const [stateName, items] of Object.entries(byState)) {
    console.log(`\n📌 ${stateName} (${items.length} issues):`);
    console.log('─'.repeat(80));
    for (const { issue, assignee, state } of items) {
      console.log(`   COS-${issue.number}: ${issue.title}`);
      console.log(`   Assignee: ${assignee?.name || '❌ NONE'}`);
      console.log(`   ${issue.url}\n`);
    }
  }

  if (notFound.length > 0) {
    console.log(`\n❌ Not found: ${notFound.join(', ')}`);
  }

  console.log('\n📊 Summary:');
  for (const [stateName, items] of Object.entries(byState)) {
    console.log(`   ${stateName}: ${items.length} issues`);
  }
}

main().catch(console.error);
