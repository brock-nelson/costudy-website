import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

if (!LINEAR_API_KEY) {
  console.error('❌ LINEAR_API_KEY environment variable is required');
  process.exit(1);
}

const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

async function main() {
  console.log('📡 Checking Linear webhook configuration...\n');

  const webhooks = await linear.webhooks();

  console.log(`Found ${webhooks.nodes.length} webhooks:\n`);

  for (const wh of webhooks.nodes) {
    console.log(`📌 ${wh.label}`);
    console.log(`   URL: ${wh.url}`);
    console.log(`   Enabled: ${wh.enabled ? '✅' : '❌'}`);
    console.log(`   Resource types: ${wh.resourceTypes.join(', ')}`);
    console.log('');
  }

  if (webhooks.nodes.length === 0) {
    console.log('❌ No webhooks configured!');
    console.log('💡 This is why Cyrus is not receiving events.');
    console.log('\n🔧 Solution:');
    console.log('   Cyrus Pro should automatically configure webhooks via the proxy.');
    console.log('   The webhook URL should be: https://cyrus-proxy.ceedar.workers.dev/webhook');
    console.log('\n   Try running: cyrus check-tokens');
    console.log('   Or restart Cyrus to reconfigure webhooks.');
  }
}

main().catch(console.error);
