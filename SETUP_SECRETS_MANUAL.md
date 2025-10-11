# 🔐 Set Up GitHub Secrets (Manual - 2 Minutes)

## Quick Setup - Just Copy & Paste!

### Step 1: Open GitHub Secrets Page

Click this link (it will open in your browser):
👉 **https://github.com/brock-nelson/costudy-website/settings/secrets/actions**

### Step 2: Add Three Secrets

Click **"New repository secret"** and add each of these:

---

#### Secret 1: VERCEL_TOKEN

**Name:** (copy exactly)
```
VERCEL_TOKEN
```

**Value:** (copy exactly)
```
YoKN7IoSTYYF2YbDyUFdg6np
```

Click **"Add secret"**

---

#### Secret 2: VERCEL_PROJECT_ID

**Name:** (copy exactly)
```
VERCEL_PROJECT_ID
```

**Value:** (copy exactly)
```
prj_rZsLBD8ZVuZ2UCpIqNNbYkXdP4YK
```

Click **"Add secret"**

---

#### Secret 3: VERCEL_TEAM_ID

**Name:** (copy exactly)
```
VERCEL_TEAM_ID
```

**Value:** (copy exactly)
```
team_dADCkHgSm52Gv4xnjUEOWL3R
```

Click **"Add secret"**

---

## ✅ Done!

Once you've added all three secrets, the deployment monitor will work automatically:

- ✅ Every push to `main` will be monitored
- ✅ Failed deployments create GitHub issues with error logs
- ✅ Successful deployments comment on open issues
- ✅ You never have to paste error logs manually again

---

## What These Secrets Do

- **VERCEL_TOKEN**: Allows GitHub Actions to query Vercel API for deployment status
- **VERCEL_PROJECT_ID**: Identifies your project in Vercel
- **VERCEL_TEAM_ID**: Identifies your team in Vercel

These are used by `.github/workflows/deployment-monitor.yml` to automatically:
1. Check deployment status after each push
2. Fetch error logs from Vercel API
3. Create detailed GitHub issues when deployments fail
4. Update issues when deployments succeed

---

## Test It

After setting up secrets, make any small change and push:

```bash
echo "# Test" >> README.md
git add README.md
git commit -m "test: trigger deployment monitor"
git push
```

Then:
1. Go to **Actions** tab on GitHub
2. Watch the "Deployment Monitor" workflow run
3. If deployment fails, you'll get a GitHub issue automatically!

---

**That's it! Takes 2 minutes to set up, saves hours of debugging time.**
