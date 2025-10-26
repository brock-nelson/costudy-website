/**
 * Add deployment instructions to ALL website issues (regardless of assignee)
 */

import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY!;

const DEPLOYMENT_INSTRUCTIONS = `
## 🚀 Cyrus - Complete This Task Now

### Current Status:
This issue has been triggered but not completed. Please complete ALL requirements now.

### Deployment Workflow (2-tier):
1. **Test on staging**: Deploy to \`staging.costudy.co\` first
2. **If staging works**: Deploy to \`costudy.co\` (production)

### Testing Domain:
For now, test your changes on **brocknelson.io** (current test site).

### When Complete:
- Comment with implementation details
- Include any errors or blockers encountered
- Mark issue as Done if fully implemented
- Tag @brock if you need clarification

---
*Auto-posted: Re-triggered for completion*
`;

async function main() {
  const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

  console.log('🚀 Adding deployment instructions to ALL website issues...\n');

  const issueNumbers = [
    125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135,
    137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147,
    149, 150, 151, 152, 153
  ];

  let commentCount = 0;

  for (const num of issueNumbers) {
    try {
      const issues = await linear.issues({ filter: { number: { eq: num } } });
      const issue = issues.nodes[0];

      if (!issue) {
        console.log(`❌ COS-${num}: Not found\n`);
        continue;
      }

      const state = await issue.state;

      // Skip if already done
      if (state?.name === 'Done') {
        console.log(`⏭️  COS-${num}: Already Done, skipping\n`);
        continue;
      }

      await linear.createComment({
        issueId: issue.id,
        body: DEPLOYMENT_INSTRUCTIONS,
      });

      console.log(`✅ COS-${num}: ${issue.title}`);
      console.log(`   URL: ${issue.url}\n`);
      commentCount++;

      // Rate limit
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ Failed on COS-${num}:`, error);
    }
  }

  console.log(`\n🎉 Done!`);
  console.log(`   ✅ Posted instructions to: ${commentCount} issues\n`);
}

main().catch(console.error);
