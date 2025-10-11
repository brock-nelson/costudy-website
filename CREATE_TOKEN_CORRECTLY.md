# 🔑 Create Token With Correct Permissions

## The Issue

The token you created works, but it doesn't have permission to manage GitHub secrets. We need to create a new token with the right permissions.

## Option 1: Fine-Grained Personal Access Token (Recommended)

**I just opened this page:** https://github.com/settings/personal-access-tokens/new

### Settings:

1. **Token name:** `Claude Code Automation`
2. **Expiration:** 90 days (or longer)
3. **Repository access:** Select "Only select repositories" → Choose `costudy-website`
4. **Repository permissions:**
   - **Secrets:** Read and write ✅
   - **Contents:** Read and write ✅
   - **Workflows:** Read and write ✅
   - **Actions:** Read and write ✅

5. Click **"Generate token"**
6. **Copy the token** (starts with `github_pat_`)

## Option 2: Classic Token (Easier but less secure)

If fine-grained doesn't work, use classic:

Go to: https://github.com/settings/tokens/new

### Settings:
1. **Note:** `Claude Code Automation`
2. **Expiration:** 90 days
3. **Scopes:** Check ALL of these:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
   - ✅ `admin:repo_hook` (Full control of repository hooks)

4. Click **"Generate token"**
5. **Copy the token** (starts with `ghp_`)

---

## Then Give Me The New Token

Just paste the new token in the chat and I'll set everything up correctly this time!

---

## Why This Happened

The first token had `repo` and `workflow` scopes, but GitHub also requires explicit permission to manage **secrets**. That's a separate permission that needs to be enabled.
