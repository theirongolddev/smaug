---
title: "coding_agent_session_search"
type: tool
date_added: 2026-02-09
source: "https://github.com/Dicklesworthstone/coding_agent_session_search/blob/main/PLAN_TO_CREATE_GH_PAGES_WEB_EXPORT_APP.md"
stars: 450
language: "Rust"
tags: []
via: "Twitter bookmark from @doodlestein"
---

<!-- NEEDS_ANALYSIS: description, key_features, tags -->

## README

# 🔎 coding-agent-search (cass)

![Platform](https://img.shields.io/badge/platform-Linux%20%7C%20macOS%20%7C%20Windows-blue.svg)
![Rust](https://img.shields.io/badge/Rust-nightly-orange.svg)
![Status](https://img.shields.io/badge/status-alpha-purple.svg)
[![Coverage](https://codecov.io/gh/Dicklesworthstone/coding_agent_session_search/branch/main/graph/badge.svg)](https://codecov.io/gh/Dicklesworthstone/coding_agent_session_search)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Unified, high-performance TUI to index and search your local coding agent history.**
Aggregates sessions from Codex, Claude Code, Gemini CLI, Cline, OpenCode, Amp, Cursor, ChatGPT, Aider, Pi-Agent, and Factory (Droid) into a single, searchable timeline.

<div align="center">

```bash
curl -fsSL "https://raw.githubusercontent.com/Dicklesworthstone/coding_agent_session_search/main/install.sh?$(date +%s)" \
  | bash -s -- --easy-mode --verify
```

```powershell
# Windows (PowerShell)
irm https://raw.githubusercontent.com/Dicklesworthstone/coding_agent_session_search/main/install.ps1 | iex
install.ps1 -EasyMode -Verify
```

Installs the latest release by default. Pass `--version <tag>` / `-Version <tag>` to pin a specific version.

**Or via package managers:**

```bash
# macOS/Linux (Homebrew)
brew install dicklesworthstone/tap/cass

# Windows (Scoop)
scoop bucket add dicklesworthstone https://github.com/Dicklesworthstone/scoop-bucket
scoop install dicklesworthstone/cass
```

</div>

---

## 🤖 Agent Quickstart (Robot Mode)

⚠️ **Never run bare `cass` in an agent context** — it launches the interactive TUI. Always use `--robot` or `--json`.

```bash
# 1) Health check (exit 0 = OK, non-zero = rebuild index)
cass health --json || cass index --full

# 2) Search across all agent history
cass search "authentication error" --robot --limit 5 --fields minimal

# 3) View + expand a hit (use source_path/line_number from search output)
cass view /path/to/session.jsonl -n 42 --json
cass expand /path/to/session.jsonl -n 42 -C 3 --json

# 4) Discover the full machine API
cass robot-docs guide
cass robot-docs schemas
```

**Output conventions**
- stdout = data only
- stderr = diagnostics
- exit 0 = success

## 📸 Screenshots

<div align="center">

### Search Results Across All Your Agents
*Three-pane layout with semantic styling: filter bar with pills, results list with color-coded agents and score tiers, and syntax-highlighted detail preview with tab navigation*

<img src="screenshots/screenshot_01.webp" alt="Main TUI showing search results across multiple coding agents" width="800">

---

### Rich Conversation Detail View
*Full conversation rendering with markdown formatting, code blocks, headers, and structured content*

<img src="screenshots/screenshot_02.webp" alt="Detail view showing formatted conversation content" width="800">

---

### Quick Start & Keyboard Reference
*Built-in help screen (press `F1` or `?`) with all shortcuts, filters, modes, and navigation tips*

<img src="screenshots/screenshot_03.webp" alt="Help screen showing keyboard shortcuts and features" width="500">

</div>

---

## 💡 Why This Exists

### The Problem

AI coding agents are transforming how we write software. Claude Code, Codex, Cursor, Copilot, Aider, Pi-Agent; each creates a trail of conversations, debugging sessions, and problem-solving attempts. But this wealth of knowledge is **scattered and unsearchable**:

- **Fragmented storage**: Each agent stores data differently—JSONL files, SQLite databases, markdown logs, proprietary JSON formats
- **No cross-agent visibility**: Solutions discovered in Cursor are invisible when you're using Claude Code
- **Lost context**: That brilliant debugging session from two weeks ago? Good luck finding it by scrolling through files
- **No semantic search by default**: File-based grep doesn't understand natural language queries; cass can add optional local ML search when model files are installed

### The Solution

`cass` treats your coding agent history as a **unified knowledge base**. It:

1. **Normalizes** disparate formats into a common schema
2. **Indexes** everything with a purpose-built full-text search engine
3. **Surfaces** relevant past conversations in milliseconds
4. **Respects** your privacy—everything stays local, nothing phones home

### Who Benefits

- **Individual developers**: Find that solution you know you've seen before
- **Teams**: Share institutional knowledge across different tool preferences
- **AI agents themselves**: Let your current agent learn from all your past agents (via robot mode)
- **Power users**: Build workflows that leverage your complete coding history

---

## ✨ Key Features

### ⚡ Instant Search (Sub-60ms Latency)
- **"Search-as-you-type"**: Results update instantly with every keystroke.
- **Edge N-Gram Indexing**: We frontload the work by pre-computing prefix matches (e.g., "cal" -> "calculate") during indexing, trading disk space for O(1) lookup speed at query time.
- **Sma
...[truncated]

## Links

- [GitHub](https://github.com/Dicklesworthstone/coding_agent_session_search/blob/main/PLAN_TO_CREATE_GH_PAGES_WEB_EXPORT_APP.md)
- [Original Tweet](https://x.com/doodlestein/status/2008813776687030781)
