/**
 * Add Deployment Instructions to All Cyrus Issues
 *
 * Posts deployment workflow instructions to all Cyrus-assigned issues
 */

import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY!;

const DEPLOYMENT_INSTRUCTIONS = `
## 🚀 Marketing Website Deployment Workflow

**IMPORTANT:** Henry has added the DNS key to costudy.co. We have a 2-tier deployment for the MARKETING WEBSITE:

### Environment URLs (Marketing Website):
1. **Staging/Testing**: \`staging.costudy.co\` - Test here FIRST
2. **Production**: \`costudy.co\` - Deploy here LAST (after staging is verified)

**Note:** \`dev.costudy.co\` is reserved for the PLATFORM, not the marketing website!

### Deployment Commands:

\`\`\`bash
# 1. Deploy to staging for testing
./deploy-staging.sh

# 2. If staging looks good, deploy to production
./deploy-demo.sh  # (or vercel --prod)
\`\`\`

### Workflow:
1. Complete your work on a feature branch
2. Create PR and get it reviewed
3. After PR approval, deploy to \`staging.costudy.co\`
4. Test thoroughly on staging
5. If staging works → deploy to \`costudy.co\` (production)

### When to Comment:
- **Before deploying to staging**: Comment "🚀 Deploying to staging.costudy.co for testing"
- **After staging testing**: Comment results and whether deploying to production
- **After production deploy**: Comment "✅ Deployed to costudy.co (production)"

### Database Sync:
The marketing website database is now connected to the platform database. See \`DATABASE_SYNC.md\` for details.

---
*Auto-posted by deployment automation*
`;

async function main() {
  const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

  console.log('🚀 Adding deployment instructions to all Cyrus issues...\n');

  // Get Cyrus user
  const users = await linear.users();
  const cyrus = users.nodes.find(u => u.name === 'Cyrus');

  if (!cyrus) {
    console.error('❌ Cyrus user not found');
    process.exit(1);
  }

  console.log(`✅ Found Cyrus: ${cyrus.name} (${cyrus.id})\n`);

  // Get all issues assigned to Cyrus (any state except Done/Canceled)
  const issues = await linear.issues({
    filter: {
      assignee: { id: { eq: cyrus.id } },
      state: { name: { nin: ['Done', 'Canceled'] } },
    },
  });

  console.log(`📋 Found ${issues.nodes.length} active issues assigned to Cyrus\n`);

  let commentCount = 0;

  for (const issue of issues.nodes) {
    try {
      await linear.commentCreate({
        issueId: issue.id,
        body: DEPLOYMENT_INSTRUCTIONS,
      });

      console.log(`✅ ${issue.identifier}: ${issue.title}`);
      console.log(`   URL: ${issue.url}\n`);
      commentCount++;

      // Rate limit: wait 500ms between comments
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ Failed to comment on ${issue.identifier}:`, error);
    }
  }

  console.log(`\n🎉 Done!`);
  console.log(`   ✅ Posted deployment instructions to: ${commentCount} issues\n`);
}

main().catch(console.error);
