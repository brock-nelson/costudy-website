import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

if (!LINEAR_API_KEY) {
  console.error('❌ LINEAR_API_KEY environment variable is required');
  process.exit(1);
}

const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

async function main() {
  console.log('🔧 Setting up Cyrus webhook in Linear...\n');

  const CYRUS_WEBHOOK_URL = 'https://cyrus-proxy.ceedar.workers.dev/webhook';

  // Get the team ID first
  const teams = await linear.teams();
  const team = teams.nodes[0];

  if (!team) {
    console.error('❌ No team found in Linear workspace');
    process.exit(1);
  }

  console.log(`📋 Team: ${team.name} (${team.id})\n`);

  // Check if Cyrus webhook already exists
  const existingWebhooks = await linear.webhooks();
  const cyrusWebhook = existingWebhooks.nodes.find(wh =>
    wh.url?.includes('cyrus-proxy.ceedar.workers.dev')
  );

  if (cyrusWebhook) {
    console.log('✅ Cyrus webhook already exists!');
    console.log(`   URL: ${cyrusWebhook.url}`);
    console.log(`   Enabled: ${cyrusWebhook.enabled ? '✅' : '❌'}`);

    if (!cyrusWebhook.enabled) {
      console.log('\n⚠️ Webhook is disabled. Enable it in Linear settings.');
    }
    return;
  }

  console.log('📡 Creating new Cyrus webhook...\n');

  try {
    const webhook = await linear.createWebhook({
      url: CYRUS_WEBHOOK_URL,
      label: 'Cyrus AI Agent',
      enabled: true,
      teamId: team.id,
      resourceTypes: [
        'Issue',
        'IssueLabel',
        'Comment',
        'Project',
      ],
    });

    console.log('✅ Cyrus webhook created successfully!');
    console.log(`   URL: ${CYRUS_WEBHOOK_URL}`);
    console.log(`   Resource types: Issue, IssueLabel, Comment, Project`);
    console.log('\n🎉 Cyrus should now receive events from Linear!');
    console.log('💡 Try assigning an issue to yourself with a label - Cyrus will pick it up.');
  } catch (error: any) {
    console.error('❌ Failed to create webhook:', error.message);
    console.log('\n🔧 Manual setup required:');
    console.log('   1. Go to Linear → Settings → API → Webhooks');
    console.log(`   2. Create new webhook with URL: ${CYRUS_WEBHOOK_URL}`);
    console.log('   3. Enable: Issue, IssueLabel, Comment, Project events');
    console.log('   4. Save and enable the webhook');
  }
}

main().catch(console.error);
