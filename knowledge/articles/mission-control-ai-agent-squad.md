---
title: Mission Control - Building an AI Agent Squad
type: article
date_added: 2026-01-31
source: https://x.com/i/article/2017588473751052288
author: Bhanu Teja P (@pbteja1998)
tags: [agents, multi-agent, coordination, Clawdbot, automation]
via: Twitter bookmark from @pbteja1998
---

# The Complete Guide to Building Mission Control: AI Agent Squad

Comprehensive guide to building a multi-agent system where 10 AI agents work together as a coordinated team.

## Core Architecture

Based on Clawdbot (OpenClaw) - an open-source AI agent framework that runs as persistent daemon with access to:
- File system
- Shell commands
- Web browsing
- APIs

Each agent is a separate Clawdbot session with its own:
- Conversation history
- Identity/personality (SOUL.md)
- Memory files
- Context and workspace

## Key Components

### Session System
- Session keys identify each agent (e.g., `agent:product-analyst:main`)
- Sessions are independent with separate history and context
- Cron jobs schedule periodic "heartbeats" for each agent

### The Heartbeat
- Each agent wakes every 15 minutes
- Checks for assignments and @mentions
- Reviews activity feed
- Takes action or reports status
- Uses isolated sessions to keep costs down

### Mission Control (Shared Brain)
- Real-time shared task database (Convex)
- Comment threads for agent discussion
- Activity feed for visibility
- Notification system with @mentions
- Document storage for deliverables

### Memory Stack
- **Session Memory:** Clawdbot conversation history
- **Working Memory:** /memory/WORKING.md for current task state
- **Daily Notes:** /memory/YYYY-MM-DD.md for raw logs
- **Long-term Memory:** /memory/MEMORY.md for important facts

### SOUL Files
Each agent has a SOUL.md that defines:
- Name and role
- Personality and voice
- Strengths and specialties
- What they care about

## The 10-Agent Squad

1. **Jarvis** (Squad Lead) - Coordinator, handles delegation
2. **Shuri** (Product Analyst) - Testing, edge cases, UX issues
3. **Fury** (Customer Researcher) - Deep research, user data
4. **Vision** (SEO Analyst) - Keywords, search intent
5. **Loki** (Content Writer) - Copy, polish, voice
6. **Quill** (Social Media Manager) - Hooks, threads, engagement
7. **Wanda** (Designer) - Visuals, graphics, mockups
8. **Pepper** (Email Marketing) - Sequences, lifecycle emails
9. **Friday** (Developer) - Code, testing, documentation
10. **Wong** (Documentation) - Organization, knowledge base

## Task Workflow

Task lifecycle: Inbox → Assigned → In Progress → Review → Done

- Tasks have assignees
- Comments are threaded
- @mentions create notifications
- Full history preserved
- Agents can subscribe to threads

## Key Learnings

- Start with 2-3 agents, scale gradually
- Use cheaper models for routine heartbeats
- Memory must persist to files, not mental notes
- Treat AI agents like team members with roles and accountability
- Stagger heartbeats to avoid simultaneous wake-ups
- Daily standups provide visibility and accountability

## Practical Implementation

Built on Clawdbot + Convex for real-time coordination. Creates "office" where agents work on shared whiteboard. UI shows activity feed, task board, agent status, and documents.

The system works best when agents have distinct specialties and clear decision boundaries, making them focus and effective within their domain.
