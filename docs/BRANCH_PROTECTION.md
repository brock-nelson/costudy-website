# Branch Protection Setup Guide

This guide will help you configure branch protection rules for the `main` branch to ensure code quality and prevent accidental direct commits.

## Why Branch Protection?

Branch protection rules enforce workflows before changes are merged to production:
- Require pull requests for all changes
- Require passing CI checks before merge
- Require code reviews from CODEOWNERS
- Prevent force pushes that rewrite history
- Enable automatic status checks from GitHub Actions

## Setup Instructions

### 1. Navigate to Branch Protection Settings

1. Go to your repository on GitHub: `https://github.com/brock-nelson/costudy-website`
2. Click **Settings** (top navigation)
3. Click **Branches** (left sidebar)
4. Click **Add branch protection rule**

### 2. Configure Protection Rule

**Branch name pattern**: `main`

#### Required Settings

✅ **Require a pull request before merging**
- Check: "Require approvals" (set to 1)
- Check: "Dismiss stale pull request approvals when new commits are pushed"
- Check: "Require review from Code Owners" (uses `.github/CODEOWNERS`)

✅ **Require status checks to pass before merging**
- Check: "Require branches to be up to date before merging"
- Add status checks (after first workflow runs):
  - `build` - Next.js build must succeed
  - `lint` - ESLint must pass
  - `typecheck` - TypeScript must compile
  - `test` - Unit tests must pass (when added)

✅ **Require conversation resolution before merging**
- Ensures all PR comments are addressed

✅ **Require signed commits** (optional but recommended)
- Adds cryptographic verification to commits

✅ **Require linear history**
- Prevents merge commits, keeps history clean
- Requires rebase or squash merge strategies

✅ **Do not allow bypassing the above settings**
- Applies rules to administrators too
- Can be unchecked during emergency hotfixes

#### Additional Recommended Settings

✅ **Allow force pushes**
- Leave UNCHECKED (prevents rewriting history)

✅ **Allow deletions**
- Leave UNCHECKED (prevents accidental branch deletion)

✅ **Require deployments to succeed before merging** (optional)
- Check this if you want preview deployments to succeed first

### 3. Save and Test

1. Click **Create** or **Save changes**
2. Try to push directly to `main` - it should be blocked
3. Create a feature branch and PR to test the workflow

## Workflow After Branch Protection

### For Feature Development:

```bash
# Create feature branch
git checkout -b feature/new-awesome-feature

# Make changes and commit
git add .
git commit -m "feat: add awesome feature"

# Push to remote
git push -u origin feature/new-awesome-feature

# Create pull request on GitHub
gh pr create --title "Add awesome feature" --body "Description"

# After review and CI passes, merge via GitHub UI
```

### For AI Workforce Integration:

The AI bots will automatically:
1. Generate specs when issues are labeled `needs-spec`
2. Review PRs when labeled `needs-review`
3. Generate marketing content for merged PRs with `marketing` label
4. All checks must pass before merge button becomes available

## Status Checks Reference

These checks run automatically via GitHub Actions:

| Check | Workflow | Purpose |
|-------|----------|---------|
| `build` | `.github/workflows/ci.yml` | Verifies Next.js builds successfully |
| `lint` | `.github/workflows/ci.yml` | Runs ESLint on all code |
| `typecheck` | `.github/workflows/ci.yml` | Validates TypeScript types |
| `spec-writer` | `.github/workflows/spec-writer.yml` | Generates technical specs |
| `code-review` | `.github/workflows/code-review.yml` | AI code review |
| `marketing` | `.github/workflows/marketing.yml` | Generates marketing content |

## Troubleshooting

### "Required status checks are not passing"
- Check the Actions tab to see which check failed
- Click on the failed check to see error details
- Fix the issue and push new commits

### "Review required from code owners"
- Ensure you have at least one approval from @brock-nelson
- Check `.github/CODEOWNERS` to see who can approve

### "Branch is not up to date"
- Pull latest changes from main: `git pull origin main`
- Rebase or merge main into your branch
- Push updated branch: `git push --force-with-lease`

### Emergency Hotfix (Bypass Protection)
If you need to bypass protection temporarily:
1. Go to Settings > Branches > Edit rule
2. Uncheck "Do not allow bypassing the above settings"
3. Select "Repository administrators can bypass"
4. Make your hotfix
5. Re-enable protection immediately after

## Best Practices

1. **Keep PRs small** - Easier to review, faster to merge
2. **Write descriptive commit messages** - Follow conventional commits
3. **Request reviews early** - Don't wait until PR is "perfect"
4. **Respond to feedback** - Mark conversations as resolved
5. **Keep branch updated** - Regularly merge/rebase from main
6. **Delete branches after merge** - Keeps repository clean

## Additional Resources

- [GitHub Docs: Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Docs: Required Status Checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches#require-status-checks-before-merging)
- [About CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
