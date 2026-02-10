---
title: "How to setup your agent to do daily testing + file bugs"
author: "Ryan Carson"
source: "https://x.com/i/article/2017713291540267008"
date: 2026-02-03
tags:
  - testing
  - e2e
  - agents
  - automation
  - ci-cd
---

# How to setup your agent to do daily testing + file bugs

Every morning at 9 AM, a script tests our signup and onboarding flow. Fresh signup. Full onboarding. Every agent tool. If something breaks, a bug appears in our tracker before we've finished coffee.

**Time to implement:** 1 hour (just point your agent at this post to get started)

**What you'll get:** A complete daily E2E runner that catches regressions you'd otherwise miss for days

## TL;DR

- Runs daily at 9 AM via macOS launchd (adaptable to CI)
- Fresh user every run – deletes from DB, auth provider, and payment provider before signup
- Google OAuth fully unattended – uses a pre-signed Chrome debug profile
- Auto-files bugs – creates a ticket with errors when tests fail

## Core Insight

This isn't Playwright or Cypress in CI. Agent-Driven E2E uses accessibility tree snapshots and adapts to semantic changes. It runs daily to catch regressions and gives you "real user journey" confidence.

**When to use this approach:**
- Your app has AI/chat flows with adaptive responses
- You want to test the _actual_ user journey, not a mocked version
- You're okay with "daily safety net" rather than PR gating
- You have OAuth flows that are painful to mock

**When NOT to use:**
- You need deterministic CI gating (use Playwright with mocked auth)
- You can't tolerate any flakiness
- You don't have a dedicated machine for the Chrome profile

## Key Components

### 1. Delete Test User (Fresh slate each run)
Before each run, delete the test user from three systems:
- Database (cascading deletes)
- Payment provider (cancel subscriptions, delete customer)
- Auth provider

### 2. Unattended Google OAuth
Launch Chrome with a debug profile that's already signed into your test Google account. The trick: pre-sign the profile once, then reuse it.

### 3. Pattern Matching for Chat Flows
Extract AI responses from the page and pattern-match to determine responses. Falls back to "yes" with a warning.

### 4. Automatic Bug Filing
When tests fail, create a ticket in your issue tracker automatically with errors, logs, and screenshots.

## File Structure

```bash
scripts/e2e/
├── daily-e2e-test.sh         # Main test runner
├── delete-test-user.ts        # Cleanup script
├── com.myapp.e2e-daily.plist  # launchd schedule
└── .env.e2e.example           # Environment variables
```

## Environment Variables

```bash
DATABASE_URL=postgresql://...
AUTH_SECRET_KEY=sk_live_...
PAYMENT_SECRET_KEY=sk_live_...
TRACKER_API_TOKEN=...
E2E_TEST_EMAIL=test@yourdomain.com
```

## The Architecture

Four phases:
1. **Setup** — Kill Chrome, clear cookies, delete test user from all systems
2. **Signup** — Open signup page, click OAuth, handle consent screens
3. **Onboarding** — Read the AI's last message, pattern-match, send appropriate response
4. **Feature Tests** — Send tool prompts, verify responses, take screenshots

## Making Google OAuth Unattended

The trick: launch Chrome with a debug profile that's already signed in.

```bash
# One-time setup: create and sign into the profile
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 \
  --user-data-dir="$HOME/chrome-debug-profile"
# Sign into test Gmail account, then close Chrome

# In your test script: reuse the profile
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 \
  --user-data-dir="$HOME/chrome-debug-profile" \
  --no-first-run \
  --disable-default-apps &

agent-browser connect 9222
agent-browser open "$BASE_URL/sign-up"
agent-browser click "text=Continue with Google"
# OAuth completes automatically!
```

## Reliability Tips

1. **Retry on transient failures** (2 attempts max)
2. **Bug deduplication** — Check if similar bug exists in last 24 hours, comment instead of duplicate
3. **Artifact retention** — Keep last 7 days of logs and screenshots, auto-delete older runs
4. **Alert threshold** — Only page on-call for 2+ consecutive failures

## Security Considerations

**⚠️ Critical:** The pre-signed Chrome debug profile contains live session cookies and OAuth tokens that bypass MFA. Treat it like production SSH keys:

- Use a dedicated Google account (not personal)
- Run on a locked-down machine (Mac mini, dedicated runner)
- Store tokens in keychain or secret manager
- Ensure test user data contains no real PII
- Sanitize screenshots before attaching to tickets
- Never commit the profile directory to git

## Scheduling with launchd

Use a plist file to schedule daily runs at 9 AM on macOS.

## What's Next

This approach scales to other flows:
- Payment testing with Stripe test cards
- Email verification with real inbox
- Multi-user scenarios (spawn multiple browser sessions)
- API integrations (trigger webhooks, verify database state)

**Core insight:** Your AI agent already knows how to interact with your app. Give it a script, a schedule, and an issue tracker API—and you've got autonomous QA.
