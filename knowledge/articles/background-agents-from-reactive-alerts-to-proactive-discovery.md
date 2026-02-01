---
title: Background Agents - From Reactive Alerts to Proactive Discovery
type: article
date_added: 2026-01-27
source: https://x.com/i/article/2016233327670476800
author: Jesse Provost
tags: [ai-agents, alerting-systems, financial-research, background-agents, llm-workflows, discovery]
via: "Twitter bookmark from @JesseProvo"
---

# Background Agents: From Reactive Alerts to Proactive Discovery

An article by Fintool on building advanced alerting systems for financial research using AI agents.

## Key Concepts

### The Relevance Problem

Traditional keyword alerts fail at financial research because:
- Same information appears in multiple document types (8-K, earnings calls, press releases, 10-Q)
- Companies use varied terminology (layoffs, workforce reduction, right-sizing)
- Context matters (company size affects materiality)
- Negations are missed ("no plans for layoffs" still triggers keyword match)

### Creating Alerts Through Conversation

Users can describe alerts in natural language, and the AI follows a structured workflow:
1. Search recent documents to discover which types contain relevant information
2. Report findings to user
3. Ask clarifying questions for ambiguous requirements
4. Present explicit trigger conditions for user confirmation
5. Create alert only after user approval

### Principles Encoded in Skills

- **Discovery first, configuration after**: Don't assume document types; search broadly
- **Keywords match text, not meaning**: Use topic nouns, let AI handle interpretation
- **Err on side of coverage**: Missing an event is worse than false positives

## Two Trigger Mechanisms

### Publication Alerts
Event-driven: fires when documents arrive via SQS queue. Evaluates four dimensions:
- Document type (8-K, 10-Q, earnings-call-transcript, etc.)
- Ticker/universe
- Keywords via Elasticsearch
- Watchlist membership (resolves dynamically)

### Scheduled Alerts
Time-based triggers using CloudWatch Events (every 10 minutes). Supports:
- iCal VEVENT format
- Pre-check scripts in E2B sandbox (conditional scheduling)
- Self-configuring alerts that update schedules based on conditions

## The Frontier: Proactive Opportunity Discovery

Beyond monitoring known companies, the system surfaces opportunities matching user's investment style through:

### Onboarding: Learning User Style
- Analyze investment memos (thesis structure, assumptions)
- Examine Excel models (key metrics, drivers)
- Review email threads (decision triggers)
- Explore annotations (highlighted patterns)

Extracts:
1. Companies being covered
2. Investment style (growth/value, fundamental/technical, time horizon)
3. Thesis structure
4. Decision triggers

### Dynamic Screens
Living documents that continuously evaluate against user criteria:
- Market cap ranges
- Sector filters
- Margin trajectories
- Insider activity patterns
- Catalyst signals

Updates automatically and notifies user when companies match/exit screens.

## Architecture Highlights

- **Temporal workflows**: Reliable execution with error tracking and history
- **User-defined prompts**: System doesn't anticipate use cases; users define their own
- **Filesystem paradigm**: Moving toward alerts as markdown files with YAML frontmatter
- **Idempotent processing**: Tracks processed document/alert pairs to prevent re-firing
- **Point-in-time snapshots**: Index constituents resolve at creation time

## What Makes This State-of-the-Art

Combines precise triggering with semantic analysis:
- Trigger layer: high-volume filtering (documents, tickers, keywords)
- Execution layer: interpretation (meaning, materiality, communication)

Separation enables coverage without precision loss. User-defined prompts mean the system adapts to each user's needs without anticipating every use case.
