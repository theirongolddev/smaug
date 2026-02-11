---
title: "ralph-tui"
type: tool
date_added: 2026-02-09
source: "https://github.com/subsy/ralph-tui"
stars: 1768
language: "TypeScript"
tags: [ai-agents, task-automation, tui, agent-orchestration, agent-loop, prd, beads, typescript]
via: "Twitter bookmark from @theplgeek"
---

## Summary

Ralph TUI is a terminal UI that orchestrates AI coding agents (Claude Code, OpenCode, Factory Droid, Gemini CLI) through autonomous task execution loops. Built with Bun and TypeScript with 1768+ stars, it connects to task trackers (PRD JSON or Beads) and runs agents through intelligent task selection, error handling, and real-time observability. The tool launched live after being built using itself, demonstrating a "ralph loop" pattern where agents iteratively improve their own workflow tools.

## Key Features

- **Multi-Agent Support**: Works with Claude Code, OpenCode, Factory Droid, Gemini CLI, Codex, and Kiro CLI agents
- **Task Orchestration**: Autonomous loop that selects highest-priority tasks, builds prompts, executes agents, detects completion, and repeats
- **Tracker Integration**: Supports simple prd.json format and Beads (git-backed with dependencies for complex task relationships)
- **Session Persistence**: Pause/resume functionality survives crashes and system failures
- **Real-time TUI**: Watch agent output, control execution with keyboard shortcuts, see nested subagent calls
- **Remote Instances**: Monitor and control multiple ralph-tui processes running on different machines from a single interface
- **High Configurability**: Extensive customization for team workflows, agent selection, and execution parameters

## README

# Ralph TUI

[![npm version](https://img.shields.io/npm/v/ralph-tui.svg)](https://www.npmjs.com/package/ralph-tui)
[![CI](https://github.com/subsy/ralph-tui/actions/workflows/ci.yml/badge.svg)](https://github.com/subsy/ralph-tui/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/subsy/ralph-tui/graph/badge.svg)](https://codecov.io/gh/subsy/ralph-tui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Built with Bun](https://img.shields.io/badge/Built%20with-Bun-f9f1e1.svg)](https://bun.sh)

**AI Agent Loop Orchestrator** - A terminal UI for orchestrating AI coding agents to work through task lists autonomously.

Ralph TUI connects your AI coding assistant (Claude Code, OpenCode, Factory Droid, Gemini CLI, Codex, Kiro CLI) to your task tracker and runs them in an autonomous loop, completing tasks one-by-one with intelligent selection, error handling, and full visibility.

![Ralph TUI Screenshot](docs/images/ralph-tui.png)

## Quick Start

```bash
# Install
bun install -g ralph-tui

# Setup your project
cd your-project
ralph-tui setup

# Create a PRD with AI assistance
ralph-tui create-prd --chat

# Run Ralph!
ralph-tui run --prd ./prd.json
```

That's it! Ralph will work through your tasks autonomously.

## Documentation

**[ralph-tui.com](https://ralph-tui.com)** - Full documentation, guides, and examples.

### Quick Links

- **[Quick Start Guide](https://ralph-tui.com/docs/getting-started/quick-start)** - Get running in 2 minutes
- **[Installation](https://ralph-tui.com/docs/getting-started/installation)** - All installation options
- **[CLI Reference](https://ralph-tui.com/docs/cli/overview)** - Complete command reference
- **[Configuration](https://ralph-tui.com/docs/configuration/overview)** - Customize Ralph for your workflow
- **[Troubleshooting](https://ralph-tui.com/docs/troubleshooting/common-issues)** - Common issues and solutions

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐   │
│   │  1. SELECT   │────▶│  2. BUILD    │────▶│  3. EXECUTE  │   │
│   │    TASK      │     │    PROMPT    │     │    AGENT     │   │
│   └──────────────┘     └──────────────┘     └──────────────┘   │
│          ▲                                         │            │
│          │                                         ▼            │
│   ┌──────────────┐                         ┌──────────────┐    │
│   │  5. NEXT     │◀────────────────────────│  4. DETECT   │    │
│   │    TASK      │                         │  COMPLETION  │    │
│   └──────────────┘                         └──────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Ralph selects the highest-priority task, builds a prompt, executes your AI agent, detects completion, and repeats until all tasks are done.

## Features

- **Task Trackers**: prd.json (simple), Beads (git-backed with dependencies)
- **AI Agents**: Claude Code, OpenCode, Factory Droid, Gemini CLI, Codex, Kiro CLI
- **Session Persistence**: Pause anytime, resume later, survive crashes
- **Real-time TUI**: Watch agent output, control execution with keyboard shortcuts
- **Subagent Tracing**: See nested agent calls in real-time
- **Cross-iteration Context**: Automatic progress tracking between tasks
- **Flexible Skills**: Use PRD/task skills directly in your agent or via the TUI
- **Remote Instances**: Monitor and control ralph-tui running on multiple machines from a single TUI

## CLI Commands

| Command | Description |
|---------|-------------|
| `ralph-tui` | Launch the interactive TUI |
| `ralph-tui run [options]` | Start Ralph execution |
| `ralph-tui resume` | Resume an interrupted session |
| `ralph-tui status` | Check session status |
| `ralph-tui logs` | View iteration output logs |
| `ralph-tui setup` | Run interactive project setup |
| `ralph-tui create-prd` | Create a new PRD interactively |
| `ralph-tui convert` | Convert PRD to tracker format |
| `ralph-tui config show` | Display merged configuration |
| `ralph-tui template show` | Display current prompt template |
| `ralph-tui plugins agents` | List available agent plugins |
| `ralph-tui plugins trackers` | List available tracker plugins |
| `ralph-tui run --listen` | Run with remote listener enabled |
| `ralph-tui remote <cmd>` | Manage remote server connections |

### Common Options

```bash
# Run with a PRD file
ralph-tui run --prd ./prd.json

# Run with a Beads epic
ralph-tui run --epic my-epic-id

# Override agent or model
ralph-tui run --agent claude --model sonnet
ralph-tui run --agent opencode --model anthropic/claude-3-5-sonnet

# Limit iterations
ralph-tui run --iterations 5

# Run headless (no TUI)
ralph-tui run --headless

# Run agent in isolated sandbox (bwrap on Linux, sandbox-ex
...[truncated]

## Links

- [GitHub](https://github.com/subsy/ralph-tui)
- [Original Tweet](https://x.com/theplgeek/status/2010879209204552168)
