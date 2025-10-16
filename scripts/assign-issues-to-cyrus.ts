import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

if (!LINEAR_API_KEY) {
  console.error('❌ LINEAR_API_KEY environment variable is required');
  process.exit(1);
}

const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

async function main() {
  console.log('🤖 Setting up issues for Cyrus to implement...\n');

  // Get labels
  const labels = await linear.issueLabels();
  const featureLabel = labels.nodes.find(l => l.name === 'Feature');
  const performanceLabel = labels.nodes.find(l => l.name === 'Performance');
  const contentLabel = labels.nodes.find(l => l.name === 'Content');

  if (!featureLabel || !performanceLabel || !contentLabel) {
    console.error('❌ Required labels not found');
    process.exit(1);
  }

  console.log('🏷️  Labels found:');
  console.log(`   - Feature: ${featureLabel.id}`);
  console.log(`   - Performance: ${performanceLabel.id}`);
  console.log(`   - Content: ${contentLabel.id}\n`);

  // First, unassign and unlabel COS-148 (hero header - user wants to do this themselves)
  console.log('🔄 Unassigning COS-148 (Hero Header)...');
  const heroIssues = await linear.issues({ filter: { number: { eq: 148 } } });
  const heroIssue = heroIssues.nodes[0];
  if (heroIssue) {
    await linear.updateIssue(heroIssue.id, {
      assigneeId: null,
      labelIds: [],
    });
    console.log('✅ COS-148 unassigned (you can handle the aesthetic)\n');
  }

  // Issues to assign with appropriate labels
  const issuesToLabel = [
    { number: 150, label: featureLabel.id, name: 'XML sitemap & robots.txt optimization' },
    { number: 149, label: featureLabel.id, name: '404/500 error pages' },
    { number: 137, label: featureLabel.id, name: 'Analytics & conversion tracking' },
    { number: 139, label: performanceLabel.id, name: 'Performance optimization - Core Web Vitals' },
    { number: 136, label: featureLabel.id, name: 'Status page & changelog' },
  ];

  // Get Brock's user ID
  const users = await linear.users();
  const brock = users.nodes.find((u) => u.name?.toLowerCase().includes('brock'));

  if (!brock) {
    console.error('❌ Brock not found in Linear users');
    process.exit(1);
  }

  console.log(`👤 Assigning to: ${brock.name} (${brock.id})\n`);
  console.log('🚀 Adding labels and assigning issues for Cyrus to implement:\n');

  for (const issue of issuesToLabel) {
    const issues = await linear.issues({ filter: { number: { eq: issue.number } } });
    const foundIssue = issues.nodes[0];

    if (foundIssue) {
      // Get current label IDs and add new one (don't overwrite existing)
      const currentLabelIds = (await foundIssue.labels()).nodes.map(l => l.id);
      const newLabelIds = [...new Set([...currentLabelIds, issue.label])];

      await linear.updateIssue(foundIssue.id, {
        labelIds: newLabelIds,
        assigneeId: brock.id,
      });

      const labelName = issue.label === featureLabel.id ? 'Feature' :
                        issue.label === performanceLabel.id ? 'Performance' : 'Content';

      console.log(`✅ COS-${issue.number}: ${issue.name}`);
      console.log(`   Assigned to: ${brock.name}`);
      console.log(`   Label: ${labelName}`);
      console.log(`   URL: ${foundIssue.url}\n`);
    }
  }

  console.log('🎉 Setup complete!\n');
  console.log('⏳ Cyrus should now pick up these issues:');
  console.log('   • COS-150: XML sitemap (quick win, 2 pts)');
  console.log('   • COS-149: Error pages (quick win, 2 pts)');
  console.log('   • COS-137: Analytics tracking (3 pts)');
  console.log('   • COS-139: Performance optimization (5 pts)');
  console.log('   • COS-136: Status/changelog page (5 pts)\n');
  console.log('💡 Watch your Cyrus terminal for activity!');
}

main().catch(console.error);
