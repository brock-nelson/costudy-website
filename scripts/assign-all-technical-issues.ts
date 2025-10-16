import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

if (!LINEAR_API_KEY) {
  console.error('❌ LINEAR_API_KEY environment variable is required');
  process.exit(1);
}

const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

async function main() {
  console.log('🤖 Assigning ALL technical website issues to Cyrus...\n');

  // Get labels
  const labels = await linear.issueLabels();
  const featureLabel = labels.nodes.find(l => l.name === 'Feature');
  const performanceLabel = labels.nodes.find(l => l.name === 'Performance');
  const contentLabel = labels.nodes.find(l => l.name === 'Content');
  const securityLabel = labels.nodes.find(l => l.name === 'Security');

  if (!featureLabel || !performanceLabel || !contentLabel || !securityLabel) {
    console.error('❌ Required labels not found');
    process.exit(1);
  }

  // Get Brock
  const users = await linear.users();
  const brock = users.nodes.find((u) => u.name?.toLowerCase().includes('brock'));

  if (!brock) {
    console.error('❌ Brock not found');
    process.exit(1);
  }

  console.log(`👤 Assigning to: ${brock.name}\n`);

  // All website issues EXCEPT design-related ones
  const technicalIssues = [
    // URGENT (already assigned, but confirming)
    { number: 136, label: featureLabel.id, name: 'Status page & changelog' },
    { number: 137, label: featureLabel.id, name: 'Analytics & conversion tracking' },
    { number: 138, label: featureLabel.id, name: 'Legal pages - Privacy, Terms, Cookie Policy' },
    { number: 139, label: performanceLabel.id, name: 'Performance optimization - Core Web Vitals' },
    { number: 140, label: featureLabel.id, name: 'Lead capture & CRM integration' },
    { number: 141, label: featureLabel.id, name: 'Social proof infrastructure - ROI calculator' },

    // HIGH
    { number: 125, label: featureLabel.id, name: 'Fix homepage for B2B2C' },
    { number: 126, label: featureLabel.id, name: 'Build /demo page' },
    { number: 127, label: featureLabel.id, name: 'Redesign /pricing for universities' },
    { number: 128, label: featureLabel.id, name: 'Build /case-studies page' },
    { number: 129, label: featureLabel.id, name: 'Create /features page' },
    { number: 130, label: featureLabel.id, name: 'Build /contact page' },
    { number: 131, label: featureLabel.id, name: 'Add university logos and testimonials' },
    { number: 132, label: featureLabel.id, name: 'SEO optimization' },
    { number: 142, label: featureLabel.id, name: 'Interactive product demo & feature tour' },
    { number: 143, label: securityLabel.id, name: 'Security & compliance page' },
    { number: 144, label: featureLabel.id, name: 'Comparison/alternatives page - vs Zoom, Teams, Discord' },
    { number: 145, label: featureLabel.id, name: 'Integration showcase - LMS, SSO, SIS' },

    // MEDIUM
    { number: 146, label: featureLabel.id, name: 'A/B testing infrastructure' },
    { number: 147, label: featureLabel.id, name: 'University-specific landing pages template' },
    { number: 149, label: featureLabel.id, name: '404/500 error pages' },
    { number: 150, label: featureLabel.id, name: 'XML sitemap & robots.txt' },
    { number: 151, label: featureLabel.id, name: 'Email newsletter signup & automation' },

    // LOW
    { number: 133, label: featureLabel.id, name: 'Build /about page' },
    { number: 134, label: contentLabel.id, name: 'Create /resources page' },
    { number: 135, label: contentLabel.id, name: 'Add /blog with 10 articles' },
    { number: 152, label: contentLabel.id, name: 'Press/media kit page' },
    { number: 153, label: featureLabel.id, name: 'Live chat / AI chatbot' },
  ];

  // Issues to SKIP (design-focused)
  const designIssues = [148]; // Hero header redesign

  console.log(`🚀 Assigning ${technicalIssues.length} technical issues...\n`);

  let assigned = 0;
  let skipped = 0;

  for (const issue of technicalIssues) {
    if (designIssues.includes(issue.number)) {
      console.log(`⏭️  Skipped COS-${issue.number}: ${issue.name} (design task)`);
      skipped++;
      continue;
    }

    try {
      const issues = await linear.issues({ filter: { number: { eq: issue.number } } });
      const foundIssue = issues.nodes[0];

      if (foundIssue) {
        // Get current labels and add new one
        const currentLabelIds = (await foundIssue.labels()).nodes.map(l => l.id);
        const newLabelIds = [...new Set([...currentLabelIds, issue.label])];

        await linear.updateIssue(foundIssue.id, {
          labelIds: newLabelIds,
          assigneeId: brock.id,
        });

        const labelName = issue.label === featureLabel.id ? 'Feature' :
                          issue.label === performanceLabel.id ? 'Performance' :
                          issue.label === securityLabel.id ? 'Security' : 'Content';

        console.log(`✅ COS-${issue.number}: ${issue.name} (${labelName})`);
        assigned++;
      }
    } catch (error) {
      console.error(`❌ Failed COS-${issue.number}:`, error);
    }
  }

  console.log('\n🎉 Assignment complete!\n');
  console.log('📊 Summary:');
  console.log(`   Assigned: ${assigned}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total: ${technicalIssues.length}`);
  console.log('\n💡 Cyrus will now work on all technical implementation!');
  console.log('   You focus on UI design (COS-148 Hero Header)');
}

main().catch(console.error);
