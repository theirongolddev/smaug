---
title: "drift"
type: tool
date_added: 2026-02-09
source: "https://github.com/dadbodgeoff/drift"
stars: 685
language: "TypeScript"
tags: ["ai-tools", "cli", "code-quality", "csharp", "java", "mcp", "mcp-server", "model-context-protocol", "pattern-detection", "php", "python", "typescript", "vscode-extension"]
via: "Twitter bookmark from @DadBodGeoffTV"
---

## Overview

Drift solves the critical problem of AI myopia in large codebases. When Claude Code or other AI assistants search a codebase with grep, they often get fragment-based results that miss the full architectural context. Drift scans your entire codebase to learn your coding patterns and conventions, then makes this intelligence available to AI through CLI or MCP.

Drift uses semantic AST parsing with regex fallback to detect patterns across 8+ languages, organizing them into 15 categories and 170+ pattern types (custom hooks, security blast radius, architecture patterns, etc.). It includes a "Cortex Memory System" that replaces static AGENTS.md files with living, self-correcting memory that learns from your feedback.

## Key Takeaways

- **Codebase-aware AI**: Replaces static documentation with dynamic pattern detection that evolves with your code
- **Pattern-based context**: Detects 170+ patterns across 15 categories (architecture, security, custom conventions)
- **MCP Integration**: Full Model Context Protocol support for seamless IDE and Claude integration
- **Cortex Memory**: Self-learning memory system that stores architectural decisions and learns from corrections
- **Multi-language**: Supports TypeScript, Python, Java, C#, PHP, Go, Rust, and more
- **CLI + MCP modes**: Use standalone or integrate with Claude Desktop, Windsurf, Cursor, and other AI tools

## README

# 🔍 Drift

**Make AI write code that actually fits your codebase.**

Drift scans your code, learns your patterns, and tells AI how you do things. No more fixing AI output.

[![npm version](https://img.shields.io/npm/v/driftdetect.svg)](https://www.npmjs.com/package/driftdetect)
[![npm downloads](https://img.shields.io/npm/dm/driftdetect.svg)](https://www.npmjs.com/package/driftdetect)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

---

## ⚡ Quick Start (30 seconds)

```bash
npm install -g driftdetect
cd your-project
drift setup
```

That's it. The setup wizard walks you through everything:
- Pattern scanning
- Auto-approval of high confidence patterns  
- Call graph analysis
- Test topology mapping
- Cortex memory initialization

**Want defaults without prompts?** Run `drift setup -y`

---

## 🚫 Delete Your AGENTS.md

You know that `AGENTS.md` or `CLAUDE.md` file you wrote once and forgot about? It's stale. Delete it.

Drift's **Cortex Memory System** replaces static instruction files with living memory:

```bash
# Instead of maintaining a static file:
drift memory add tribal "Always use bcrypt for passwords" --importance critical
drift memory add tribal "Services should not call controllers" --topic Architecture

# AI gets context dynamically:
drift memory why "authentication"

# And learns from corrections:
drift memory learn --original "Used MD5" --feedback "Use bcrypt instead"
```

| Static AGENTS.md | Cortex Memory |
|------------------|---------------|
| Written once, forgotten | Learns from corrections |
| Gets stale immediately | Confidence decays naturally |
| Manual updates required | Self-correcting through feedback |
| One-size-fits-all dump | Intent-aware retrieval |

→ [Learn more about Cortex](https://github.com/dadbodgeoff/drift/wiki/Cortex-V2-Overview)

---

## 📋 What You Need

- **Node.js 18 or newer** — [Download here](https://nodejs.org/)
- **npm** — Comes with Node.js

Check if you have them:
```bash
node --version   # Should show v18.x.x or higher
npm --version    # Should show 9.x.x or higher
```

---

## 🚀 Three Ways to Use Drift

| Path | Best For | Time to Setup |
|------|----------|---------------|
| [1. CLI Only](#1-use-drift-without-ai-cli-only) | Exploring your codebase manually | 2 minutes |
| [2. AI + CLI](#2-let-ai-use-drift-ai--cli) | AI runs drift commands for you | 2 minutes |
| [3. MCP Server](#3-set-up-mcp-full-ai-integration) | Full AI integration (recommended) | 5 minutes |

---

## 1. Use Drift Without AI (CLI Only)

**Perfect for:** Exploring what Drift finds in your codebase before connecting AI.

### Install & Setup

```bash
npm install -g driftdetect
cd your-project
drift setup
```

The setup wizard handles everything. Just answer the prompts (or use `drift setup -y` for defaults).

### See What Drift Found

```bash
drift status
```

You'll see something like:
```
Patterns: 47 discovered, 12 approved
Health Score: 85/100
Languages: TypeScript, Python
```

### Useful Commands

| Command | What It Does |
|---------|--------------|
| `drift status` | Quick overview of your codebase |
| `drift patterns list` | See all discovered patterns |
| `drift callgraph reach src/api/users.ts:42` | What data can line 42 access? |
| `drift coupling cycles` | Find circular dependencies |
| `drift test-topology affected src/auth.ts` | Which tests cover this file? |

### Upgrade to Latest Version

```bash
npm install -g driftdetect@latest
```

---

## 2. Let AI Use Drift (AI + CLI)

**Perfect for:** Using AI assistants that can run terminal commands (Cursor, Windsurf, Kiro, etc.)

### Install & Setup

```bash
npm install -g driftdetect
cd your-project
drift setup
```

### Tell Your AI About Drift

Copy this into your AI chat:

```
I have Drift installed. Before writing code, run these commands:

1. `drift status` - See codebase overview
2. `drift similar --intent api_endpoint --description "what you're building"` - Find similar code

Use what you learn to match my patterns.
```

That's it! Your AI will run drift commands and use the output to write better code.

---

## 3. Set Up MCP (Full AI Integration)

**Perfect for:** The best experience. AI automatically gets context without you asking.

### What is MCP?

MCP (Model Context Protocol) lets AI tools directly query Drift. Instead of you running commands and pasting output, the AI calls Drift tools automatically.

### Install & Setup

```bash
# Install both packages
npm install -g driftdetect driftdetect-mcp

# Run the setup wizard
cd your-project
drift setup
```

### Configure Your AI Tool

Pick your AI tool and follow the instructions:

<details>
<summary><b>Claude Desktop</b></summary>

1. Open this file (create it if it doesn't exist):
   - **Mac:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

2. Add this:
```json
{
  "mcpServers": {
    "drift": {
      "command": "dr
...[truncated]

## Links

- [GitHub](https://github.com/dadbodgeoff/drift)
- [Original Tweet](https://x.com/DadBodGeoffTV/status/2015600186769211498)
