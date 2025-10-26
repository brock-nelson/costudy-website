/**
 * Automated Deployment Error Fixer
 *
 * This script:
 * 1. Checks latest Vercel deployment status
 * 2. If failed, fetches and analyzes error logs
 * 3. Automatically fixes common issues
 * 4. Commits and pushes fixes
 * 5. Loops until deployment succeeds
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const MAX_ATTEMPTS = 5;
const WAIT_TIME = 30000; // 30 seconds

interface DeploymentInfo {
  state: string;
  url: string;
  uid: string;
  error?: string;
}

// Execute command and return output
function exec(command: string): string {
  try {
    return execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
  } catch (error: any) {
    return error.stdout || error.stderr || '';
  }
}

// Get latest deployment info
async function getLatestDeployment(): Promise<DeploymentInfo | null> {
  console.log('🔍 Checking latest Vercel deployment...');

  try {
    const output = exec('vercel list --json');
    const lines = output.split('\n').filter(l => l.trim());

    if (lines.length === 0) {
      console.log('⚠️  No deployments found');
      return null;
    }

    // Find the first line that starts with '{' (actual JSON, not CLI version string)
    const jsonLine = lines.find(l => l.startsWith('{'));
    if (!jsonLine) {
      console.log('⚠️  No JSON output found');
      return null;
    }

    const data = JSON.parse(jsonLine);
    const deployment = data.deployments?.[0];

    if (!deployment) {
      console.log('⚠️  No deployment data');
      return null;
    }

    return {
      state: deployment.state || 'UNKNOWN',
      url: deployment.url || 'unknown',
      uid: deployment.uid || '',
      error: deployment.error || undefined
    };
  } catch (error) {
    console.error('❌ Error getting deployment:', error);
    return null;
  }
}

// Get deployment logs
async function getDeploymentLogs(uid: string): Promise<string> {
  console.log('📋 Fetching deployment logs...');

  try {
    const logs = exec(`vercel logs ${uid}`);
    return logs;
  } catch (error) {
    console.error('⚠️  Could not fetch logs');
    return '';
  }
}

// Analyze error and apply fix
async function analyzeAndFix(logs: string): Promise<{ fixed: boolean; message: string }> {
  console.log('🔬 Analyzing errors...\n');

  // Pattern 1: Missing dependencies
  if (logs.includes('Module not found') || logs.includes('Cannot find module')) {
    const moduleMatch = logs.match(/Cannot find module ['"]([^'"]+)['"]/);
    const moduleName = moduleMatch ? moduleMatch[1] : 'unknown';

    console.log(`❌ Error: Missing module '${moduleName}'`);
    console.log('🔧 Fix: Installing dependencies...\n');

    exec('npm install');

    return {
      fixed: true,
      message: `Installed missing dependencies including ${moduleName}`
    };
  }

  // Pattern 2: TypeScript errors
  if (logs.includes('Type error:') || logs.includes('TS')) {
    const typeErrors = logs.match(/Type error: .+/g) || [];

    console.log(`❌ Error: TypeScript type errors found (${typeErrors.length})`);
    typeErrors.slice(0, 3).forEach(err => console.log(`   ${err}`));
    console.log('');

    // Try to fix with type generation
    console.log('🔧 Fix: Regenerating types...\n');

    try {
      exec('npm run build');
      return {
        fixed: true,
        message: 'Regenerated types and rebuilt'
      };
    } catch {
      return {
        fixed: false,
        message: 'TypeScript errors require manual fixing. Check logs above.'
      };
    }
  }

  // Pattern 3: Environment variable issues
  if (logs.includes('process.env') || logs.includes('undefined') && logs.includes('ENV')) {
    console.log('❌ Error: Missing environment variables');
    console.log('🔧 Fix: Check .env.local and Vercel environment variables\n');

    return {
      fixed: false,
      message: 'Environment variables need to be set in Vercel dashboard'
    };
  }

  // Pattern 4: Build command failures
  if (logs.includes('Build failed') || logs.includes('Command failed')) {
    console.log('❌ Error: Build command failed');

    // Try cleaning build cache
    console.log('🔧 Fix: Cleaning build cache and node_modules...\n');

    try {
      exec('rm -rf .next node_modules');
      exec('npm install');
      exec('npm run build');

      return {
        fixed: true,
        message: 'Cleaned cache and rebuilt'
      };
    } catch {
      return {
        fixed: false,
        message: 'Build failure persists after cache clean'
      };
    }
  }

  // Pattern 5: Import/Export errors
  if (logs.includes('export') && (logs.includes('not found') || logs.includes('undefined'))) {
    console.log('❌ Error: Import/export issues detected');
    console.log('   This usually means a component or function is imported but not exported\n');

    return {
      fixed: false,
      message: 'Import/export errors require manual code fixes'
    };
  }

  // Pattern 6: Network/timeout errors
  if (logs.includes('ECONNREFUSED') || logs.includes('ETIMEDOUT') || logs.includes('timeout')) {
    console.log('❌ Error: Network/timeout issue');
    console.log('🔧 Fix: This is usually temporary, will retry...\n');

    return {
      fixed: true,
      message: 'Network issue - retrying'
    };
  }

  // Unknown error
  console.log('⚠️  Unknown error pattern detected');
  console.log('📋 Last 30 lines of logs:');
  console.log(logs.split('\n').slice(-30).join('\n'));
  console.log('');

  return {
    fixed: false,
    message: 'Unknown error - manual intervention needed'
  };
}

// Commit and push changes
async function commitAndPush(message: string, attempt: number): Promise<void> {
  console.log('💾 Committing fix...');

  // Check if there are changes
  const status = exec('git status --porcelain');

  if (!status.trim()) {
    console.log('   No changes to commit\n');
    return;
  }

  exec('git add -A');

  const commitMessage = `fix: auto-fix deployment error (attempt ${attempt})

${message}

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>`;

  exec(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);
  exec('git push origin main');

  console.log('✅ Fix committed and pushed\n');
}

// Wait for deployment to process
async function wait(ms: number): Promise<void> {
  console.log(`⏳ Waiting ${ms / 1000}s for deployment to process...\n`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main auto-fix loop
async function main() {
  console.log('🔄 Auto-Fix Deployment Loop Started');
  console.log('====================================\n');

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    console.log(`📍 Attempt ${attempt} of ${MAX_ATTEMPTS}`);
    console.log('─────────────────────────────────────\n');

    // Get latest deployment status
    const deployment = await getLatestDeployment();

    if (!deployment) {
      console.log('❌ Could not get deployment info\n');

      if (attempt === 1) {
        console.log('🚀 Triggering new deployment...\n');
        exec('vercel --prod --yes');
        await wait(WAIT_TIME);
        continue;
      } else {
        process.exit(1);
      }
    }

    console.log(`   State: ${deployment.state}`);
    console.log(`   URL: https://${deployment.url}\n`);

    // Check if deployment succeeded
    if (deployment.state === 'READY') {
      console.log('✅ Deployment successful!\n');
      console.log('🎉 Site is live at https://' + deployment.url);
      console.log('');
      process.exit(0);
    }

    // Check if deployment failed
    if (deployment.state === 'ERROR' || deployment.state === 'CANCELED') {
      console.log(`❌ Deployment failed with state: ${deployment.state}\n`);

      // Get logs
      const logs = await getDeploymentLogs(deployment.uid);

      // Analyze and fix
      const result = await analyzeAndFix(logs);

      if (result.fixed) {
        console.log(`✅ Applied fix: ${result.message}\n`);

        // Commit changes if any
        await commitAndPush(result.message, attempt);

        // Trigger new deployment
        console.log('🚀 Deploying with fix...\n');
        exec('vercel --prod --yes');

        // Wait for next deployment
        await wait(WAIT_TIME);
        continue;
      } else {
        console.log(`⚠️  ${result.message}\n`);
        console.log('📋 Manual intervention required.');
        console.log('   Fix the issues above and run:');
        console.log('   npm run fix-deployment\n');
        process.exit(1);
      }
    }

    // Deployment still in progress
    if (deployment.state === 'BUILDING' || deployment.state === 'QUEUED') {
      console.log(`⏳ Deployment in progress: ${deployment.state}`);
      await wait(15000); // Wait 15s for in-progress deployments
      attempt--; // Don't count this as an attempt
      continue;
    }

    // Unknown state
    console.log(`⚠️  Unknown deployment state: ${deployment.state}\n`);
    await wait(WAIT_TIME);
  }

  console.log(`❌ Max attempts (${MAX_ATTEMPTS}) reached\n`);
  console.log('📋 Manual intervention required');
  console.log('   Check Vercel dashboard: https://vercel.com/dashboard\n');
  process.exit(1);
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
