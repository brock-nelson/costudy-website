# 🎯 Simple Setup (5 Minutes Total)

## What's Happening

The GitHub secrets page is giving a 404, probably because you need to log in first or navigate there manually. Let's use the automation script instead - it's actually faster!

## Step-by-Step

### 1. Create GitHub Token (2 minutes)

**I just opened this page for you:** https://github.com/settings/tokens/new

You should see a form to create a new token. It's already pre-filled with:
- Description: "Claude Code Automation"
- Scopes: `repo` and `workflow` (should be checked)

**Just:**
1. Make sure you're logged into GitHub
2. Set "Expiration" to **90 days** (or longer if you want)
3. Scroll down and click **"Generate token"**
4. **Copy the token** (it starts with `ghp_` and looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### 2. Run The Setup Script

In your terminal, run:

```bash
./ops/scripts/setup-automation-permanent.sh
```

When it asks for the token:
1. **Paste the token you just copied**
2. Press Enter

The script will:
- Test that the token works
- Store it securely in `~/.claude-github-token`
- Automatically set all 3 GitHub secrets
- Enable me to push directly in the future

### 3. Done!

After the script finishes:
- ✅ All 3 secrets will be set automatically
- ✅ Deployment monitoring will be enabled
- ✅ I can push code directly (no more GitHub Desktop needed)
- ✅ You never have to paste error logs again

---

## If You Can't Create a Token

If you can't access the token creation page, the manual way is:

1. Go to: https://github.com/brock-nelson/costudy-website
2. Make sure you're logged in
3. Click **Settings** tab
4. Scroll down left sidebar to **"Secrets and variables"** → **"Actions"**
5. Add the 3 secrets from the `SECRETS_TO_ADD.txt` file

---

## Why This is Better

**Manual approach:**
- Navigate to secrets page
- Copy-paste 3 secrets manually
- Still can't push automatically

**Automation approach:**
- Create 1 token (one-time)
- Script sets all 3 secrets automatically
- Enables full automation forever

---

**Next:** Create the token in the browser window I opened, then run the script!
