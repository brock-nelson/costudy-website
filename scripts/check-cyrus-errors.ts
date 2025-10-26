/**
 * Check all Cyrus issues for errors and status
 */

import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY!;

async function main() {
  const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

  console.log('🔍 Checking all Cyrus issues for errors...\n');

  // Website issue numbers
  const issueNumbers = [
    125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135,
    137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147,
    149, 150, 151, 152, 153
  ];

  for (const num of issueNumbers) {
    try {
      const issues = await linear.issues({ filter: { number: { eq: num } } });
      const issue = issues.nodes[0];

      if (!issue) {
        console.log(`❌ COS-${num}: Issue not found\n`);
        continue;
      }

      const state = await issue.state;
      const comments = await issue.comments();

      console.log(`📋 COS-${num}: ${issue.title}`);
      console.log(`   State: ${state?.name}`);
      console.log(`   Comments: ${comments.nodes.length}`);

      // Check for error-related comments
      const errorComments = comments.nodes.filter(c =>
        c.body?.toLowerCase().includes('error') ||
        c.body?.toLowerCase().includes('failed') ||
        c.body?.toLowerCase().includes('issue')
      );

      if (errorComments.length > 0) {
        console.log(`   ⚠️  ${errorComments.length} error-related comments`);
        for (const comment of errorComments.slice(-2)) { // Show last 2
          const preview = comment.body?.substring(0, 150).replace(/\n/g, ' ');
          console.log(`      - "${preview}..."`);
        }
      } else if (comments.nodes.length > 0) {
        // Show latest comment
        const latest = comments.nodes[comments.nodes.length - 1];
        const preview = latest.body?.substring(0, 100).replace(/\n/g, ' ');
        console.log(`      Latest: "${preview}..."`);
      }

      console.log(`   URL: ${issue.url}\n`);

    } catch (error) {
      console.error(`❌ Error checking COS-${num}:`, error);
    }
  }
}

main().catch(console.error);
