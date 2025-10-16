import { LinearClient } from '@linear/sdk';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

if (!LINEAR_API_KEY) {
  console.error('❌ LINEAR_API_KEY environment variable is required');
  process.exit(1);
}

const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

async function main() {
  console.log('🔍 Fetching projects and users...\n');

  // Get users
  const users = await linear.users();
  const henry = users.nodes.find((u) => u.name?.toLowerCase().includes('henry'));
  const brock = users.nodes.find((u) => u.name?.toLowerCase().includes('brock'));

  if (!henry || !brock) {
    console.error('❌ Could not find Henry or Brock in Linear users');
    process.exit(1);
  }

  console.log('👥 Users found:');
  console.log(`   - Henry: ${henry.name} (${henry.id})`);
  console.log(`   - Brock: ${brock.name} (${brock.id})\n`);

  // Get all projects
  const projects = await linear.projects();

  console.log(`📊 Found ${projects.nodes.length} projects\n`);

  if (projects.nodes.length === 0) {
    console.log('⚠️ No projects found in Linear. Create projects first or link issues to projects.');
    return;
  }

  // Display and assign projects
  for (const project of projects.nodes) {
    const projectName = project.name.toLowerCase();

    console.log(`📁 Project: ${project.name}`);
    console.log(`   ID: ${project.id}`);
    console.log(`   State: ${project.state}`);

    // Determine if it's a marketing project
    const isMarketing =
      projectName.includes('website') ||
      projectName.includes('marketing') ||
      projectName.includes('landing page') ||
      projectName.includes('seo') ||
      projectName.includes('content') ||
      projectName.includes('blog') ||
      projectName.includes('pricing page') ||
      projectName.includes('demo page') ||
      projectName.includes('case studies');

    try {
      if (isMarketing) {
        // Assign Brock as lead
        await linear.updateProject(project.id, { leadId: brock.id });
        console.log(`   ✅ Assigned lead: Brock (Marketing)\n`);
      } else {
        // All other projects are platform-related, assign to Henry
        await linear.updateProject(project.id, { leadId: henry.id });
        console.log(`   ✅ Assigned lead: Henry (Platform)\n`);
      }
    } catch (error) {
      console.error(`   ❌ Failed to assign lead:`, error);
      console.log('');
    }
  }

  console.log('🎉 Project lead assignment complete!\n');

  // Summary
  const platformProjects = projects.nodes.filter(p => {
    const name = p.name.toLowerCase();
    return name.includes('platform') || name.includes('backend') || name.includes('api') ||
           name.includes('infrastructure') || name.includes('admin');
  });

  const marketingProjects = projects.nodes.filter(p => {
    const name = p.name.toLowerCase();
    return name.includes('website') || name.includes('marketing') || name.includes('landing');
  });

  console.log('📊 Summary:');
  console.log(`   Total projects: ${projects.nodes.length}`);
  console.log(`   Platform projects (Henry): ${platformProjects.length}`);
  console.log(`   Marketing projects (Brock): ${marketingProjects.length}`);
}

main().catch(console.error);
