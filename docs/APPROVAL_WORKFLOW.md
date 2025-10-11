# AI Content Approval Workflow
## How to Review & Approve Content Using GitHub (Your Existing Tools)

You don't need another dashboard! Use GitHub for everything.

---

## 🎯 How It Works

### The AI System → GitHub → You Approve → Goes Live

All AI-generated content goes through **GitHub Pull Requests** where you can:
- ✅ Review the content
- ✅ Leave comments
- ✅ Request changes
- ✅ Approve or reject
- ✅ Merge to publish

---

## 📋 For Technical Specs & Epics

### Automatic Workflow (Already Set Up!):

1. **Create GitHub Issue:**
   ```
   Title: Real-time Collaboration Board
   Label: needs-spec
   ```

2. **AI Auto-Generates Spec:**
   - GitHub Action triggers automatically
   - AI generates complete technical specification
   - Creates Pull Request with the spec
   - Comments on your original issue with preview

3. **You Review in GitHub:**
   - Go to Pull Requests tab
   - See the PR: "[Auto] Spec for #42: Real-time Collaboration Board"
   - Click "Files changed" to see the spec
   - **Leave comments directly on the spec** (inline comments!)
   - Request changes or approve

4. **If Approved:**
   - Merge the PR
   - Spec is now in `/specs/spec_issue_42.json`
   - Engineering team can start implementing

5. **If Changes Needed:**
   - Leave comments in PR
   - Re-run generation with your feedback
   - Or manually edit the spec file

### Manual Generation:

```bash
# Generate spec locally first
./ops/scripts/costudy-ai spec 42

# Review locally
cat specs/spec_issue_42.json

# If good, commit and push
git add specs/spec_issue_42.json
git commit -m "specs: Add spec for issue #42"
git push
```

---

## 📝 For Blog Posts

### Automatic Workflow (Weekly):

1. **Every Monday at 9 AM:**
   - GitHub Action runs automatically
   - AI generates blog post with Claude Opus
   - Creates hero image with DALL-E 3
   - Opens Pull Request: "[Auto] Weekly Blog Post - October 14, 2025"

2. **You Review in GitHub:**
   - Go to Pull Requests
   - See the blog post in `content/generated/blog_20251014.json`
   - Click "Files changed" to see the content
   - Read the JSON (or view raw markdown)

3. **Approve/Request Changes:**
   - **Leave comment:** "This is great! Approve"
   - **Or:** "Change the headline to focus more on X"
   - **Or:** "Reject - wrong tone"

4. **If Approved:**
   - Merge PR
   - Content is ready to publish to website
   - Extract content and add to your CMS

### Manual Generation:

```bash
# Generate blog post
./ops/scripts/costudy-ai blog "AI in Education 2025"

# Review output
cat content/generated/blog_*.json | jq '.content.headline'

# If good, create PR
git checkout -b blog/ai-education-2025
git add content/generated/blog_*.json
git commit -m "content: Add blog post about AI in education"
git push
# Then open PR on GitHub
```

---

## 💼 For Sales Proposals

### Manual Generation (Since Each is Custom):

```bash
# Generate proposal
./ops/scripts/costudy-ai proposal "Stanford University" 17000

# Output goes to sales/Stanford_University_20251014/
# Contains:
# - proposal.json
# - roi_analysis.json
# - executive_summary.json
# - pitch_deck_outline.txt
```

### Review Process:

**Option 1: Local Review**
```bash
# Review locally first
cat sales/Stanford_University_20251014/proposal.json | jq '.content'

# If good, commit
git add sales/Stanford_University_20251014/
git commit -m "sales: Add proposal for Stanford"
git push
```

**Option 2: PR Review**
```bash
# Create PR for team review
git checkout -b proposal/stanford
git add sales/Stanford_University_20251014/
git commit -m "sales: Stanford proposal"
git push

# Open PR on GitHub
# Sales team reviews and comments
# You approve and merge
```

---

## 🔄 Complete GitHub-Based Workflow

### Step-by-Step Example: Tech Spec

1. **You create issue:**
   ```
   Issue #42: Build real-time collaboration board
   Label: needs-spec, feature
   ```

2. **Add "needs-spec" label** (or create issue with it)

3. **GitHub Action runs automatically:**
   - Detects "needs-spec" label
   - Calls AI to generate specification
   - Posts comment on issue:
     ```
     📋 Technical Specification Generated
     Specification: specs/spec_issue_42.json
     Preview: [shows headline and intro]
     💰 Generation Cost: $0.80
     ```
   - Creates PR with spec file
   - Removes "needs-spec" label
   - Adds "has-spec" label

4. **You review the PR:**
   - Go to Pull Requests
   - See: "[Auto] Spec for #42: Build real-time collaboration board"
   - Click "Files changed"
   - Read the specification
   - **Leave comments:** "Add more detail on WebSocket architecture"
   - Or click "Approve" if it's good

5. **If changes needed:**
   - Comment what needs to change
   - Re-run: `./ops/scripts/costudy-ai spec 42`
   - Updates the PR
   - You review again

6. **When approved:**
   - Merge PR
   - Spec is now in main branch
   - Engineering team implements from the spec

---

## 🔗 Linear Integration (Optional)

If you use Linear for project management:

### Connect GitHub to Linear:

1. **In Linear:**
   - Settings → Integrations → GitHub
   - Connect your repository

2. **In GitHub Issues:**
   - Reference Linear issues:
     ```
     Closes COS-123
     ```
   - Linear auto-links

3. **Workflow:**
   - Create issue in Linear: "Build collaboration board"
   - Gets ID: COS-123
   - Create GitHub issue: "Spec for COS-123"
   - AI generates spec
   - Spec PR includes: "Relates to COS-123"
   - Linear shows the connection

---

## 💬 Talking to AI (Me, Claude Code)

**You ALWAYS talk to me, not ChatGPT!**

### For Clarifications:
```
You: "Can you refine the spec for issue #42 to include more details on caching?"
Me: I'll update the spec with caching details...
```

### For Custom Generation:
```
You: "Generate a blog post about our new collaboration feature"
Me: I'll generate that using Claude Opus...
```

### For Modifications:
```
You: "Change the tone of that proposal to be more formal"
Me: I'll regenerate with a formal tone...
```

### For Implementation:
```
You: "Implement the feature from spec #42"
Me: I'll start implementing based on the approved spec...
```

---

## 🎯 What Tools You Use

| Tool | Used For | How |
|------|----------|-----|
| **GitHub Issues** | Request specs, epics, features | Create issue, add "needs-spec" label |
| **GitHub Pull Requests** | Review ALL AI content | Comment, approve, request changes |
| **GitHub Actions** | Automatic generation | Runs on schedule or label triggers |
| **Linear** (optional) | Project management | Links to GitHub issues |
| **Me (Claude Code)** | Generate content, implement features | Talk to me directly in this interface |
| **Terminal** | Manual generation | `costudy-ai` commands |

---

## ✅ Your Approval Process

### For Specs:
1. AI generates → PR created
2. You review PR → Leave comments
3. You merge PR → Spec approved
4. Engineering implements

### For Blog Posts:
1. AI generates → PR created weekly
2. You review content → Comment if changes needed
3. You merge → Content ready to publish
4. You add to website

### For Proposals:
1. You request → AI generates locally
2. You review files → Make any edits
3. You commit → Goes to sales team
4. Sales team uses it

---

## 🚀 Getting Started

### Today:

1. **Push code to GitHub:**
   - Open GitHub Desktop
   - Click "Push origin"
   - Vercel auto-deploys

2. **Test the automatic spec generation:**
   - Create issue: "Test Feature"
   - Add label: "needs-spec"
   - Watch GitHub Action run
   - Review the PR it creates

3. **Generate your first blog post:**
   ```bash
   ./ops/scripts/costudy-ai blog "Test Blog Post"
   git add content/generated/
   git commit -m "test: First AI blog post"
   git push
   ```

4. **Review in GitHub:**
   - Go to your repository
   - See the new content
   - That's it!

---

## 💡 Pro Tips

1. **Use GitHub's inline comments** to request specific changes
2. **Use PR templates** for consistent reviews
3. **Add reviewers** to PRs for team approval
4. **Use GitHub Projects** to track AI-generated content
5. **Connect Linear** if you want unified project management

---

## 📊 Example Workflow in Action

```
9:00 AM Monday:
└─ GitHub Action runs
   └─ Generates blog post
      └─ Creates PR #123

9:15 AM You:
└─ Open PR #123
   └─ Review content
      └─ Comment: "Great! Change headline to focus on students"

9:20 AM Claude Code (me):
└─ You ask me to regenerate
   └─ I update the blog post
      └─ Push to same PR

9:25 AM You:
└─ Review updated PR
   └─ Approve PR
      └─ Merge to main

9:30 AM:
└─ Content ready to publish!
```

---

**Bottom line:** You use **GitHub** like you normally do. AI-generated content comes as **Pull Requests**. You review, comment, and approve **just like code reviews**. No new tools needed! 🎯
