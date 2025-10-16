import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

if (!LINEAR_API_KEY) {
  console.error('❌ LINEAR_API_KEY environment variable is required');
  process.exit(1);
}

const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

async function main() {
  console.log('🏷️  Creating Cyrus agent mode labels...\n');

  // Get the CoStudy team
  const teams = await linear.teams();
  const team = teams.nodes.find((t) => t.name === 'CoStudy');

  if (!team) {
    console.error('❌ CoStudy team not found');
    process.exit(1);
  }

  console.log(`📋 Using team: ${team.name} (${team.id})\n`);

  // Define labels for each Cyrus agent mode
  const labels = [
    { name: 'Bug', color: '#e5484d', description: 'Triggers Cyrus debugging specialist mode' },
    { name: 'Feature', color: '#0091ff', description: 'Triggers Cyrus feature builder mode' },
    { name: 'Improvement', color: '#00a2c7', description: 'Triggers Cyrus feature builder mode' },
    { name: 'Enhancement', color: '#00a2c7', description: 'Triggers Cyrus feature builder mode' },
    { name: 'PRD', color: '#ab4aba', description: 'Triggers Cyrus product scoping mode' },
    { name: 'Scope', color: '#ab4aba', description: 'Triggers Cyrus product scoping mode' },
    { name: 'Planning', color: '#ab4aba', description: 'Triggers Cyrus product scoping mode' },
    { name: 'Orchestrator', color: '#f76808', description: 'Triggers Cyrus project orchestrator mode' },
    { name: 'Epic', color: '#f76808', description: 'Triggers Cyrus project orchestrator mode' },
    { name: 'Performance', color: '#46a758', description: 'Triggers Cyrus performance optimizer mode' },
    { name: 'Optimization', color: '#46a758', description: 'Triggers Cyrus performance optimizer mode' },
    { name: 'Security', color: '#e93d82', description: 'Triggers Cyrus security specialist mode' },
    { name: 'Vulnerability', color: '#e93d82', description: 'Triggers Cyrus security specialist mode' },
    { name: 'Refactor', color: '#bdee63', description: 'Triggers Cyrus refactoring specialist mode' },
    { name: 'Tech Debt', color: '#bdee63', description: 'Triggers Cyrus refactoring specialist mode' },
    { name: 'Content', color: '#8e4ec6', description: 'Triggers Cyrus content creator mode' },
    { name: 'Copy', color: '#8e4ec6', description: 'Triggers Cyrus content creator mode' },
    { name: 'Blog', color: '#8e4ec6', description: 'Triggers Cyrus content creator mode' },
  ];

  // Check existing labels to avoid duplicates
  const existingLabels = await linear.issueLabels({ filter: { team: { id: { eq: team.id } } } });
  const existingLabelNames = new Set(existingLabels.nodes.map(l => l.name));

  let created = 0;
  let skipped = 0;

  for (const label of labels) {
    if (existingLabelNames.has(label.name)) {
      console.log(`⏭️  Skipped: ${label.name} (already exists)`);
      skipped++;
      continue;
    }

    try {
      await linear.createIssueLabel({
        name: label.name,
        color: label.color,
        description: label.description,
        teamId: team.id,
      });
      console.log(`✅ Created: ${label.name} (${label.description})`);
      created++;
    } catch (error) {
      console.error(`❌ Failed to create label "${label.name}":`, error);
    }
  }

  console.log('\n🎉 Cyrus agent labels setup complete!\n');
  console.log('📊 Summary:');
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total: ${labels.length}\n`);

  console.log('💡 Usage:');
  console.log('   Add these labels to Linear issues to trigger specific Cyrus agent modes:');
  console.log('   • Bug → Debugging specialist');
  console.log('   • Feature/Improvement/Enhancement → Feature builder');
  console.log('   • PRD/Scope/Planning → Product scoping');
  console.log('   • Orchestrator/Epic → Project orchestrator');
  console.log('   • Performance/Optimization → Performance optimizer');
  console.log('   • Security/Vulnerability → Security specialist');
  console.log('   • Refactor/Tech Debt → Refactoring specialist');
  console.log('   • Content/Copy/Blog → Content creator\n');
}

main().catch(console.error);
