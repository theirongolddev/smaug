---
title: "mcp_agent_mail"
type: tool
date_added: 2026-02-09
source: "https://github.com/Dicklesworthstone/mcp_agent_mail"
stars: 1671
language: "Python"
tags: ["agent-coordination", "mcp-servers", "multi-agent-systems", "file-reservations", "ai-infrastructure"]
via: "Twitter bookmark from @doodlestein"
---

Agent Mail is a Git-backed, FastMCP-based coordination layer that enables multiple AI coding agents to work concurrently on the same codebase without conflicts. It provides persistent agent identities, mailbox messaging, searchable message history, and advisory file reservations ("leases") to signal editing intent. The system bridges the gap between heterogeneous agent tools (Claude Code, Codex, Gemini CLI, etc.) by offering a lightweight, human-auditable communication fabric backed by SQLite for indexing and queries.

## Key Takeaways

- Agent Mail solves multi-agent coordination by providing asynchronous messaging and file reservation leases, preventing overwrites and silent conflicts
- The system maintains auditable artifacts in Git, making it easy to understand what each agent was doing and when
- File reservations are advisory (not exclusive by default) and use TTL (time-to-live), allowing flexible coordination patterns without rigid locking
- Designed to work across multiple codebases in a single project, supporting both single-bus (shared project_key) and separate-projects coordination strategies
- Productivity multiplier: 1-2 hours of human setup enables dozens of agent-hours of parallel execution with clear conflict-avoidance built in

## README

# MCP Agent Mail

![Agent Mail Showcase](screenshots/output/agent_mail_showcase.gif)

> "It's like gmail for your coding agents!"

A mail-like coordination layer for coding agents, exposed as an HTTP-only FastMCP server. It gives agents memorable identities, an inbox/outbox, searchable message history, and voluntary file reservation "leases" to avoid stepping on each other.

Think of it as asynchronous email + directory + change-intent signaling for your agents, backed by Git (for human-auditable artifacts) and SQLite (for indexing and queries).

Status: Under active development. The design is captured in detail in `project_idea_and_guide.md` (start with the original prompt at the top of that file).

## Why this exists

Modern projects often run multiple coding agents at once (backend, frontend, scripts, infra). Without a shared coordination fabric, agents:

- Overwrite each other's edits or panic on unexpected diffs
- Miss critical context from parallel workstreams
- Require humans to "liaison" messages across tools and teams

This project provides a lightweight, interoperable layer so agents can:

- Register a temporary-but-persistent identity (e.g., GreenCastle)
- Send/receive GitHub-Flavored Markdown messages with images
- Search, summarize, and thread conversations
- Declare advisory file reservations (leases) on files/globs to signal intent
- Inspect a directory of active agents, programs/models, and activity

It's designed for: FastMCP clients and CLI tools (Claude Code, Codex, Gemini CLI, Factory Droid, etc.) coordinating across one or more codebases.

## From Idea Spark to Shipping Swarm

If a blank repo feels daunting, follow the field-tested workflow we documented in `project_idea_and_guide.md` (“Appendix: From Blank Repo to Coordinated Swarm”):

- **Ideate fast:** Write a scrappy email-style blurb about the problem, desired UX, and any must-have stack picks (≈15 minutes).
- **Promote it to a plan:** Feed that blurb to GPT-5 Pro (and optionally Grok4 Heavy / Opus 4.1) until you get a granular Markdown plan, then iterate on the plan file while it’s still cheap to change. The Markdown Web Browser sample plan shows the level of detail to aim for.
- **Codify the rules:** Clone a tuned `AGENTS.md`, add any tech-specific best-practice guides, and let Codex scaffold the repo plus Beads tasks straight from the plan.
- **Spin up the swarm:** Launch multiple Codex panes (or any agent mix), register each identity with Agent Mail, and have them acknowledge `AGENTS.md`, the plan document, and the Beads backlog before touching code.
- **Keep everyone fed:** Reuse the canned instruction cadence from the tweet thread or, better yet, let the commercial Companion app’s Message Stacks broadcast those prompts automatically so you never hand-feed panes again.

Watch the full 23-minute walkthrough (https://youtu.be/68VVcqMEDrs?si=pCm6AiJAndtZ6u7q) to see the loop in action.

## Productivity Math & Automation Loop

One disciplined hour of GPT-5 Codex—when it isn’t waiting on human prompts—often produces 10–20 “human hours” of work because the agents reason and type at machine speed. Agent Mail multiplies that advantage in two layers:

1. **Base OSS server:** Git-backed mailboxes, advisory file reservations, Typer CLI helpers, and searchable archives keep independent agents aligned without babysitting. Every instruction, lease, and attachment is auditable.
2. **Companion stack (commercial):** The iOS app + host automation can provision, pair, and steer heterogeneous fleets (Claude Code, Codex, Gemini CLI, Factory Droid, etc.) from your phone using customizable Message Stacks, Human Overseer broadcasts, Beads awareness, and plan editing tools—no manual tmux choreography required. The automation closes the loop by scheduling prompts, honoring Limited Mode, and enforcing Double-Arm confirmations for destructive work.

Result: you invest 1–2 hours of human supervision, but dozens of agent-hours execute in parallel with clear audit trails and conflict-avoidance baked in.

## TLDR Quickstart

### One-line installer

```bash
curl -fsSL "https://raw.githubusercontent.com/Dicklesworthstone/mcp_agent_mail/main/scripts/install.sh?$(date +%s)" | bash -s -- --yes
```

What this does:

- Installs uv if missing and updates your PATH for this session
- Installs jq if missing (needed for safe config merging; auto-detects your package manager)
- Creates a Python 3.14 virtual environment and installs dependencies with uv
- Runs the auto-detect integration to wire up supported agent tools
- Starts the MCP HTTP server on port 8765 and prints a masked bearer token
- Creates helper scripts under `scripts/` (including `run_server_with_token.sh`)
- Adds an `am` shell alias to your `.zshrc` or `.bashrc` for quick server startup (just type `am` in a new terminal!)
- Installs **Beads Rust (`br`)**, a Rust reimplementation of the Beads task tracker, and creates a `bd` shell alias pointing to `br` for backwards compatibility. This replaces any exist
...[truncated]

## Links

- [GitHub](https://github.com/Dicklesworthstone/mcp_agent_mail)
- [Original Tweet](https://x.com/doodlestein/status/2001682606153171406)
