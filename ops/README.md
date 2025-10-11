# CoStudy Operations (ops/)

This directory contains the automation infrastructure for the CoStudy AI workforce - a system of AI agents that assist with specification writing, code review, marketing content generation, and deployment.

## 🎯 Vision

Transform software development from a manual process into an orchestrated AI workflow where bots handle repetitive tasks while humans focus on strategy, creativity, and final approval.

## 📁 Directory Structure

```
ops/
├── scripts/              # Python automation scripts
│   ├── spec_writer.py   # Generates specs from GitHub issues
│   ├── reviewer.py      # Automated code reviews on PRs
│   ├── marketing_pack.py # Generates release notes and marketing content
│   └── changelog.py     # Creates changelogs from git commits
├── prompts/             # AI prompt templates
│   ├── brand_voice.md   # CoStudy brand guidelines
│   ├── spec_writer_prompt.md
│   ├── reviewer_prompt.md
│   └── marketing_prompt.md
├── .github/
│   └── workflows/       # GitHub Actions automation
│       ├── spec-writer.yml
│       ├── code-review.yml
│       ├── marketing.yml
│       └── deploy.yml
├── output/              # Generated content (gitignored)
├── .env.example         # Environment variable template
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## 🤖 AI Agents

### 1. Spec Writer Bot
**Trigger**: Issue labeled `needs-spec`
**Function**: Generates comprehensive technical specifications

**Workflow**:
1. Issue is created and labeled `needs-spec`
2. GitHub Action triggers `spec_writer.py`
3. Bot reads issue title and description
4. Uses GPT-4 + `spec_writer_prompt.md` to generate SPEC.md
5. Posts spec as issue comment
6. Updates issue label to `spec-ready`

**Example**:
```bash
# Manually test locally
python scripts/spec_writer.py --issue 123
```

### 2. Code Reviewer Bot
**Trigger**: PR labeled `needs-review`
**Function**: Automated code review with inline suggestions

**Workflow**:
1. PR is opened or labeled `needs-review`
2. GitHub Action triggers `reviewer.py`
3. Bot fetches PR diff
4. Uses GPT-4 + `reviewer_prompt.md` to analyze code
5. Posts inline review comments
6. Assigns priority tags (CRITICAL, HIGH, MEDIUM, LOW)

**Example**:
```bash
# Test locally
python scripts/reviewer.py --pr 456
```

### 3. Marketing Bot
**Trigger**: PR merged with `marketing` label
**Function**: Generates release notes, blog posts, social media content

**Workflow**:
1. PR with new features is merged
2. Bot generates changelog from git commits
3. Creates marketing content using `marketing_prompt.md`
4. Opens new PR with generated content for review
5. Human reviews and approves/edits before publishing

**Example**:
```bash
# Generate marketing content for latest release
python scripts/marketing_pack.py --version v1.2.0
```

### 4. Changelog Generator
**Trigger**: Release tag created
**Function**: Auto-generates structured changelog

**Workflow**:
1. Tag is created (e.g., `v1.2.0`)
2. Bot analyzes commits since last release
3. Groups by type (features, fixes, improvements)
4. Formats according to Keep a Changelog standard
5. Updates CHANGELOG.md

**Example**:
```bash
# Generate changelog between tags
python scripts/changelog.py --from v1.1.0 --to v1.2.0
```

## 🚀 Getting Started

### Prerequisites

1. **Python 3.9+**
2. **OpenAI API Key** (for GPT-4 access)
3. **GitHub Personal Access Token** (with repo permissions)

### Installation

1. **Clone and navigate to ops/**:
```bash
cd ops/
```

2. **Create virtual environment**:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**:
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**:
```bash
cp .env.example .env
# Edit .env with your API keys
```

Required environment variables:
```env
OPENAI_API_KEY=sk-...
GITHUB_TOKEN=ghp_...
GITHUB_REPO=brock-nelson/costudy-website
```

### Testing Locally

Each script can be run locally for testing:

```bash
# Spec Writer
python scripts/spec_writer.py --issue 123 --output output/spec-123.md

# Code Reviewer
python scripts/reviewer.py --pr 456 --output output/review-456.md

# Marketing Pack
python scripts/marketing_pack.py --version v1.2.0 --output output/marketing-v1.2.0/

# Changelog
python scripts/changelog.py --from v1.1.0 --to v1.2.0
```

## 🔧 Configuration

### GitHub Actions Setup

1. **Add secrets to GitHub repository**:
   - Go to Settings > Secrets and variables > Actions
   - Add `OPENAI_API_KEY`
   - Add `GH_TOKEN` (GitHub token with repo access)

2. **Copy workflow files**:
```bash
cp ops/.github/workflows/* .github/workflows/
```

3. **Enable Actions**:
   - Go to repository Settings > Actions > General
   - Allow all actions and reusable workflows

### Customizing Prompts

Edit prompt files in `ops/prompts/` to adjust bot behavior:

- `spec_writer_prompt.md` - Change spec format or add context
- `reviewer_prompt.md` - Adjust review criteria
- `marketing_prompt.md` - Modify content style
- `brand_voice.md` - Update brand guidelines

Changes take effect immediately on next bot run.

## 📋 Label-Based Workflow

### Issue Labels
- `needs-spec` → Triggers spec writer bot
- `spec-ready` → Spec has been written, ready for dev
- `dev-ready` → Approved spec, ready to code
- `blocked` → Waiting on external dependency

### PR Labels
- `needs-review` → Triggers code reviewer bot
- `approved` → Code review passed, ready to merge
- `ship` → Auto-merge to staging
- `prod` → Deploy to production
- `marketing` → Generate marketing content after merge

## 🔄 Complete Workflow Example

### Feature Development Flow

1. **Create Issue**:
```markdown
Title: Add real-time collaboration
Labels: feature, needs-spec

Description:
Students should be able to collaborate on documents in real-time...
```

2. **Spec Writer Bot Activates**:
   - Generates comprehensive SPEC.md
   - Posts as comment
   - Updates label to `spec-ready`

3. **Human Review**:
   - Review spec
   - Request changes if needed
   - Approve and label `dev-ready`

4. **Development**:
   - Create branch from issue
   - Implement feature
   - Open PR with reference to issue

5. **Code Review Bot**:
   - Label PR with `needs-review`
   - Bot posts review comments
   - Developer addresses feedback

6. **Merge to Staging**:
   - Label PR with `ship`
   - Auto-merges to `release` branch
   - Deploys to staging environment

7. **Testing**:
   - QA on staging
   - If approved, label `prod`

8. **Production Deploy**:
   - Merge to `main`
   - Deploy to production
   - If `marketing` label present, generate content

9. **Marketing**:
   - Bot creates draft blog post, social posts
   - Human reviews and publishes

## 🛡️ Safety & Governance

### Human-in-the-Loop
- **Specs**: Always reviewed before development
- **Code**: Bot reviews, human approves
- **Marketing**: Generated content always reviewed before publishing
- **Deploys**: Production deploys require explicit approval

### Bot Authority Levels
1. **Auto-Execute**: Documentation updates, dependency patches
2. **Bot + Spot Check**: Feature PRs, bug fixes
3. **Human Required**: Database migrations, security changes
4. **Dual Approval**: Production deploys, breaking changes

### Rollback Procedures
If a bot makes a mistake:
1. Immediately revert the change
2. Document the issue
3. Update prompts to prevent recurrence
4. Re-run with manual oversight

## 📊 Metrics & Monitoring

Track bot performance:
- **Spec Quality**: % of specs requiring major revisions
- **Review Accuracy**: % of bot-caught issues that are valid
- **Time Savings**: Hours saved per week
- **Marketing Effectiveness**: Engagement on bot-generated content

## 🐛 Troubleshooting

### Bot Not Triggering
- Check GitHub Actions are enabled
- Verify secrets are set correctly
- Ensure labels match exactly (case-sensitive)
- Check workflow file syntax

### API Rate Limits
- OpenAI: 3,500 RPM on GPT-4
- GitHub: 5,000 requests/hour
- Add delays if hitting limits

### Poor Output Quality
- Review and update prompt files
- Add more context to prompts
- Check if using correct model (GPT-4 vs GPT-3.5)
- Verify brand voice guide is up-to-date

## 📚 Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [CoStudy Brand Voice Guide](./prompts/brand_voice.md)
- [ROADMAP.md](../ROADMAP.md) - Overall project roadmap

## 🤝 Contributing

When adding new bots:
1. Create script in `scripts/`
2. Create prompt in `prompts/`
3. Add GitHub Action workflow
4. Update this README
5. Test thoroughly locally first
6. Document any new environment variables

## 📝 TODO

- [ ] Implement spec_writer.py
- [ ] Implement reviewer.py
- [ ] Implement marketing_pack.py
- [ ] Implement changelog.py
- [ ] Create GitHub Actions workflows
- [ ] Set up secrets in GitHub
- [ ] Test end-to-end workflow
- [ ] Create first spec with bot
- [ ] Review first PR with bot
- [ ] Generate first marketing content

## 🎓 Learning More

For a deep dive into building AI workforces, see:
- `/Users/brocknelson/Downloads/AI workforce update.pdf`
- Phase 2 in [ROADMAP.md](../ROADMAP.md)

---

**Status**: 🚧 Phase 2 In Progress
**Last Updated**: 2025-10-10
**Maintainer**: CoStudy Team
