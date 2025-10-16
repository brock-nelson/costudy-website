import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

if (!LINEAR_API_KEY) {
  console.error('❌ LINEAR_API_KEY environment variable is required');
  process.exit(1);
}

const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

async function main() {
  console.log('🔍 Checking all website issues...\n');

  // Get Cyrus user
  const users = await linear.users();
  const cyrus = users.nodes.find((u) => u.name === 'Cyrus');

  if (!cyrus) {
    console.error('❌ Cyrus not found');
    process.exit(1);
  }

  // Get all issues (website project)
  const allIssues = await linear.issues({
    filter: {
      assignee: { id: { eq: cyrus.id } }
    }
  });

  console.log(`📊 Total issues assigned to Cyrus: ${allIssues.nodes.length}\n`);

  const issuesByState: { [key: string]: any[] } = {};

  for (const issue of allIssues.nodes) {
    const state = await issue.state;
    const stateName = state?.name || 'No State';

    if (!issuesByState[stateName]) {
      issuesByState[stateName] = [];
    }
    issuesByState[stateName].push(issue);
  }

  // Print issues grouped by state
  for (const [stateName, issues] of Object.entries(issuesByState)) {
    console.log(`\n📌 ${stateName} (${issues.length} issues):`);
    console.log('─'.repeat(60));
    for (const issue of issues) {
      console.log(`   COS-${issue.number}: ${issue.title}`);
      console.log(`   ${issue.url}`);
    }
  }

  console.log('\n\n💡 Summary:');
  for (const [stateName, issues] of Object.entries(issuesByState)) {
    console.log(`   ${stateName}: ${issues.length} issues`);
  }
}

main().catch(console.error);
