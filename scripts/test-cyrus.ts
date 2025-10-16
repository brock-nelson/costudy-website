import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

if (!LINEAR_API_KEY) {
  console.error('❌ LINEAR_API_KEY environment variable is required');
  process.exit(1);
}

const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

async function main() {
  console.log('🧪 Testing Cyrus with hero header redesign issue...\n');

  // Get the issue COS-148
  const issues = await linear.issues({ filter: { number: { eq: 148 } } });
  const issue = issues.nodes[0];

  if (!issue) {
    console.error('❌ Issue COS-148 not found');
    process.exit(1);
  }

  console.log(`📋 Found issue: ${issue.identifier} - ${issue.title}`);
  console.log(`   URL: ${issue.url}\n`);

  // Get Brock's user ID
  const users = await linear.users();
  const brock = users.nodes.find((u) => u.name?.toLowerCase().includes('brock'));

  if (!brock) {
    console.error('❌ Brock not found in Linear users');
    process.exit(1);
  }

  console.log(`👤 Found user: ${brock.name} (${brock.id})\n`);

  // Get the "Feature" label
  const labels = await linear.issueLabels({ filter: { name: { eq: 'Feature' } } });
  const featureLabel = labels.nodes[0];

  if (!featureLabel) {
    console.error('❌ Feature label not found');
    process.exit(1);
  }

  console.log(`🏷️  Found label: ${featureLabel.name} (${featureLabel.id})\n`);

  // Update the issue
  console.log('🔄 Updating issue with:');
  console.log(`   - Assignee: ${brock.name}`);
  console.log(`   - Label: ${featureLabel.name}`);
  console.log(`   - Description: Adding context for Cyrus\n`);

  const updatedDescription = `${issue.description || ''}

---

**🤖 Cyrus Test Instructions:**

This issue is being used to test the Cyrus AI agent. Please:
1. Create a modern, animated hero header background
2. Use one of the recommended options from the issue description
3. Ensure it's performant (<5KB bundle size)
4. Make it responsive and accessible
5. Add proper dark mode support

**Tech Stack:**
- Next.js 15, React 19, TypeScript
- Tailwind CSS 4
- framer-motion (already installed)

**Expected Output:**
- New component: \`src/components/HeroBackground.tsx\`
- Updated homepage to use the new component
- Performance tests to ensure <5KB impact
- Dark mode variant
`;

  await linear.updateIssue(issue.id, {
    assigneeId: brock.id,
    labelIds: [featureLabel.id],
    description: updatedDescription,
  });

  console.log('✅ Issue updated successfully!\n');
  console.log('⏳ Cyrus should now detect the issue and start working on it...');
  console.log('   Watch your terminal running Cyrus for activity!');
  console.log('   You should see:');
  console.log('   • Issue detected');
  console.log('   • Git worktree created');
  console.log('   • Claude Code session started');
  console.log('   • Progress comments posted to Linear\n');
  console.log(`🔗 View issue: ${issue.url}`);
}

main().catch(console.error);
