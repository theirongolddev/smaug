---
title: "Ryan Carson's Automation Framework - Synthesis"
type: article
date_added: 2026-02-06
source: "Compiled from X/Twitter bookmarks"
author: "Ryan Carson (synthesized)"
tags:
  - automation
  - testing
  - e2e
  - agents
  - github
  - compound-engineering
  - ci-cd
via: "ryancarson"
---

# Ryan Carson's Automation Framework - Synthesis

This document synthesizes Ryan Carson's approach to automating development workflows using AI agents, specifically focusing on automated testing, bug filing, and autonomous shipping.

## Core Philosophy

**Stop prompting. Start compounding.**

The industry is moving from reactive AI assistance (you prompt → it responds) to autonomous agent loops that:
- Learn from every interaction
- Compound knowledge into persistent memory
- Ship features while you sleep
- File bugs automatically when tests fail

## The Two-Part System

Ryan Carson's automation framework has two complementary components that work together:

### 1. Agent-Driven E2E Testing (Daily Quality Assurance)

**Purpose:** Catch regressions before you start your day

**Implementation time:** 1 hour

**How it works:**
- Runs daily at 9 AM via macOS launchd
- Fresh user every run (deletes from DB, auth provider, payment provider)
- Google OAuth fully unattended using pre-signed Chrome debug profile
- **Auto-files bugs** when tests fail (creates GitHub issues automatically)

**Key insight:** This isn't Playwright or Cypress. Agent-Driven E2E uses accessibility tree snapshots and adapts to semantic changes. It tests the ACTUAL user journey with real OAuth flows.

**Architecture:**

```
Four phases:
1. Setup     — Kill Chrome, clear cookies, delete test user from all systems
2. Signup    — Open signup page, click OAuth, handle consent screens
3. Onboarding — Read AI's last message, pattern-match, send response
4. Features  — Send tool prompts, verify responses, take screenshots
```

**Critical component - Automatic Bug Filing:**

When tests fail, the script:
- Creates a ticket in your issue tracker automatically
- Includes errors, logs, and screenshots
- Deduplicates (checks if similar bug exists in last 24 hours)
- Comments on existing tickets instead of creating duplicates

**Security considerations:**

The pre-signed Chrome debug profile contains live session cookies and OAuth tokens that bypass MFA. Treat it like production SSH keys:
- Use a dedicated Google account (not personal)
- Run on a locked-down machine (Mac mini, dedicated runner)
- Never commit the profile directory to git

**File structure:**

```bash
scripts/e2e/
├── daily-e2e-test.sh         # Main test runner
├── delete-test-user.ts        # Cleanup script
├── com.myapp.e2e-daily.plist  # launchd schedule
└── .env.e2e.example           # Environment variables
```

### 2. Autonomous Learning Loop (Nightly Shipping)

**Purpose:** Make your agent smarter every day AND ship features while you sleep

**How it works:** Two jobs run in sequence every night

**10:30 PM - Compound Review:**
- Reviews all threads from last 24 hours
- Extracts learnings from sessions
- Updates AGENTS.md files with patterns, gotchas, and context
- Commits and pushes to main

**11:00 PM - Auto-Compound:**
- Pulls latest (with fresh learnings from review job)
- Picks #1 priority from reports
- Creates PRD → breaks into tasks → implements
- Opens draft PR

**The compound effect:**

The agent gets smarter every day because it reads its own updated instructions before each implementation run:
- Patterns discovered Monday inform Tuesday's work
- Gotchas hit Wednesday are avoided Thursday
- AGENTS.md files become living institutional memory

**Dependencies (Open Source):**

1. **Compound Engineering Plugin** (by @kieranklaassen)
   - GitHub: `EveryInc/compound-engineering-plugin`
   - Gives agents ability to extract and persist learnings

2. **Compound Product**
   - GitHub: `snarktank/compound-product`
   - Automation layer: prioritized reports → shipped PRs
   - Includes auto-compound.sh script

3. **Ralph**
   - GitHub: `snarktank/ralph`
   - Autonomous agent loop for continuous execution

**File structure:**

```bash
scripts/
├── daily-compound-review.sh      # 10:30 PM - Extract learnings
├── compound/
│   ├── auto-compound.sh          # 11:00 PM - Ship features
│   ├── analyze-report.sh         # Pick priority from reports
│   └── loop.sh                   # Iterative execution engine
└── logs/
    ├── compound-review.log
    └── auto-compound.log
```

## Scheduling with launchd (macOS)

Both systems use launchd instead of cron for better reliability and edge case handling.

**Key launchd patterns:**

1. **Calendar intervals** for scheduled runs
2. **Standard output/error paths** for debugging
3. **Environment variables** (especially PATH)
4. **Working directory** set explicitly

**Critical:** Use caffeinate to keep Mac awake during automation window:

```xml
<!-- Keeps Mac awake 5pm-2am for nightly jobs -->
caffeinate -i -t 32400
```

## Implementation Path for Ghost

### Phase 1: E2E Testing + Bug Filing (Week 1)

**Goal:** Daily automated testing that files GitHub issues when tests fail

**Steps:**

1. **Setup dev-browser for headless Chrome**
   - Ghost already has dev-browser skill
   - Configure Chrome debug profile for OAuth
   - Test unattended login flow

2. **Create test user cleanup script**
   - Delete from ghost-admin.db (SQLite)
   - Clean up better-auth sessions
   - Reset any test data

3. **Build daily E2E runner**
   - Test login flow
   - Test Ghost memory file operations
   - Test chat interface (spawn Claude CLI, verify streaming)
   - Test MCP endpoint authentication

4. **Implement automatic bug filing**
   - Use GitHub CLI (`gh issue create`)
   - Include error logs, screenshots, stack traces
   - Add deduplication logic (check last 24h)
   - Tag with `automated-test` label

5. **Schedule with launchd**
   - Create plist file for 9 AM daily run
   - Configure logging
   - Set up caffeinate for wake guarantee

**Expected outcome:** Every morning, you have confidence that critical flows work OR a GitHub issue waiting with full context.

### Phase 2: Compound Learning (Week 2-3)

**Goal:** Agent extracts learnings from development sessions and updates CLAUDE.md

**Steps:**

1. **Install Compound Engineering Plugin**
   - Clone to `~/.claude/skills/`
   - Test learning extraction manually
   - Verify AGENTS.md (or CLAUDE.md for Ghost) updates

2. **Create compound review script**
   - Read Claude Code session transcripts from last 24h
   - Extract patterns, gotchas, performance insights
   - Update ghost-admin/CLAUDE.md and /data/projects/ai2/CLAUDE.md
   - Commit to git

3. **Schedule nightly review**
   - 10:30 PM launchd job
   - Review yesterday's development
   - Push learnings to main

**Expected outcome:** CLAUDE.md files become living knowledge base that grows from every development session.

### Phase 3: Auto-Shipping (Week 4+)

**Goal:** Agent autonomously implements features from backlog while you sleep

**Steps:**

1. **Create prioritized reports system**
   - Weekly planning session creates priority reports
   - Reports contain ranked feature list
   - Stored in reports/ directory

2. **Build analyze-report.sh**
   - Parse report markdown
   - Extract #1 priority item
   - Generate branch name

3. **Create auto-compound script**
   - Pull latest (with fresh CLAUDE.md learnings)
   - Pick top priority
   - Create PRD using Ghost's planning patterns
   - Convert to beads_rust issues (`br create`)
   - Implement via iterative loop
   - Open draft PR

4. **Schedule nightly shipping**
   - 11:00 PM launchd job
   - Runs after compound review
   - Creates PR for morning review

**Expected outcome:** Wake up to draft PRs implementing prioritized features, informed by yesterday's learnings.

## Adaptation Notes for Ghost

### Ghost-Specific Patterns

**Testing targets:**
- Authentication flow (better-auth sessions)
- Ghost memory file CRUD (via /api/files)
- Chat interface (Claude CLI spawning, SSE streaming)
- MCP endpoint (bearer token auth, tool catalog)
- Session history parsing
- File watcher and auto-commit

**Bug filing integration:**
- Use beads_rust (`br create`) instead of GitHub issues
- Tag automated bugs with `type=bug priority=1`
- Include session transcript excerpts
- Link to shadow-history snapshots if relevant

**Compound engineering targets:**
- Update `/data/projects/ai2/CLAUDE.md` (project-wide patterns)
- Update `/data/projects/ai2/ghost-admin/CLAUDE.md` (ghost-admin specific)
- Update Ghost skills in `/data/projects/ai2/ghost/config/skills/ghost-*/`
- Ghost memory corrections in `ghost-data/02-patterns/corrections.md`

**Scheduling considerations:**
- Ghost server runs on localhost:3033
- Keep server running during test window
- Use systemd service restart if needed
- Coordinate with llama-server embedding service

### Security for Ghost Context

**Sensitive paths to protect:**
- `ghost-data/` contains personal information
- `data/ghost-admin.db` has auth sessions
- `.env.local` has secrets
- Chrome debug profile has live sessions

**Test data isolation:**
- Use dedicated test user account
- Sanitize Ghost memory in test scenarios
- Never commit test Chrome profile
- Clean up test data after runs

## Key Takeaways

### What Makes This Different

1. **Real user journeys** - Not mocked, uses actual OAuth and real browser
2. **Adaptive testing** - Uses accessibility tree, survives UI changes
3. **Automatic bug filing** - No human needed to create issues
4. **Compound learning** - Agent gets smarter every day
5. **Autonomous shipping** - Features implemented while you sleep

### Success Metrics

**E2E Testing:**
- Zero manual test runs needed
- Bugs caught before first commit of the day
- Regression detection within 24 hours

**Compound Learning:**
- CLAUDE.md files grow continuously
- Patterns discovered are never lost
- New agents benefit from historical learnings

**Auto-Shipping:**
- Draft PRs waiting every morning
- Feature velocity increases over time
- Code quality improves (agent learns from mistakes)

### Critical Dependencies

**Tools:**
- Claude Code CLI (for agent execution)
- dev-browser or similar (for headless browser control)
- GitHub CLI (`gh`) for PR creation
- beads_rust (`br`) for issue tracking (Ghost-specific)
- launchd (macOS scheduling)

**Repositories:**
- `EveryInc/compound-engineering-plugin`
- `snarktank/compound-product`
- `snarktank/ralph`

### Timeline Estimate

- **Week 1:** E2E testing + bug filing working
- **Week 2-3:** Compound learning extracting patterns
- **Week 4+:** Auto-shipping producing draft PRs

**Total time to full system:** ~1 month of setup, then runs autonomously

## Next Steps for Ghost Implementation

1. **Immediate (today):**
   - Create `/data/projects/ai2/ghost-admin/scripts/e2e/` directory
   - Draft `daily-e2e-test.sh` skeleton
   - Test dev-browser Chrome profile setup

2. **This week:**
   - Implement test user cleanup
   - Build basic E2E flow (login → file read → chat message)
   - Connect to `br create` for bug filing
   - Create launchd plist

3. **Next week:**
   - Add compound review script
   - Test CLAUDE.md updates
   - Schedule nightly review job

4. **Following weeks:**
   - Build prioritized reports system
   - Create auto-compound pipeline
   - Schedule nightly shipping

## Resources

### Original Sources

- **E2E Testing Guide:** https://x.com/i/article/2017713291540267008
- **Autonomous Learning:** https://x.com/ryancarson/status/2016520542723924279

### Filed Knowledge

- `ghost-data/04-knowledge/articles/agent-driven-e2e-testing.md`
- `ghost-data/04-knowledge/articles/autonomous-agent-learning-loop.md`

### GitHub Repositories

- https://github.com/EveryInc/compound-engineering-plugin
- https://github.com/snarktank/compound-product
- https://github.com/snarktank/ralph
