---
title: "repo_updater"
type: tool
date_added: 2026-02-09
source: "https://github.com/Dicklesworthstone/repo_updater"
stars: 50
language: "Shell"
tags: [automation, cli, git, multi-repo, devops]
via: "Twitter bookmark from @doodlestein"
---

A beautiful, automation-friendly CLI for synchronizing GitHub repositories. Keeps dozens (or hundreds) of repos in sync with a single command through clone missing repos, pull updates, detect conflicts, and provide actionable resolution commands using pure Bash with git plumbing for reliable status detection.

## Key Takeaways
- Clone missing repos, pull updates, and detect conflicts in one command
- Pure Bash with no string parsing of git output for reliability
- JSON output for scripting and non-interactive mode for automation
- Meaningful exit codes for CI integration
- Ideal for managing multiple projects across machines
- MCP-ready with structured output for AI agent integration

## README

<p align="center">
  <img src="https://img.shields.io/badge/version-1.2.0-blue?style=for-the-badge" alt="Version" />
  <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Linux-blueviolet?style=for-the-badge" alt="Platform" />
  <img src="https://img.shields.io/badge/shell-Bash%204.0+-purple?style=for-the-badge" alt="Shell" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License" />
</p>

<h1 align="center">ru</h1>
<h3 align="center">Repo Updater</h3>

<div align="center">
  <img src="ru_illustration.webp" alt="ru - Repo Updater: Keep all your GitHub repositories synchronized with a single command">
</div>

<p align="center">
  <strong>A beautiful, automation-friendly CLI for synchronizing GitHub repositories</strong>
</p>

<p align="center">
  Keep dozens (or hundreds) of repos in sync with a single command.<br/>
  Clone missing repos, pull updates, detect conflicts, and get actionable resolution commands.
</p>

<p align="center">
  <em>Pure Bash with no string parsing of git output. Uses git plumbing for reliable status detection.<br/>
  Meaningful exit codes for CI. JSON output for scripting. Non-interactive mode for automation.</em>
</p>

---

<p align="center">

```bash
curl -fsSL "https://raw.githubusercontent.com/Dicklesworthstone/repo_updater/main/install.sh?ru_cb=$(date +%s)" | bash
# You can omit the `?ru_cb=...` once installed; it's just a cache-buster for the installer fetch.
```

**Or via Homebrew (macOS/Linux):**

```bash
brew install dicklesworthstone/tap/ru
```

</p>

---

## 🤖 Agent Quickstart (JSON/TOON)

**Use structured output in agent contexts.** stdout = data, stderr = diagnostics, exit 0 = success.

```bash
# Sync all repos (machine-readable)
ru sync --format json

# Preview without changes
ru sync --dry-run --format json

# Status only (no fetch)
ru status --no-fetch --format json

# Machine-readable CLI documentation
ru robot-docs                   # All topics as JSON
ru robot-docs commands          # Command/flag reference
ru robot-docs quickstart        # Getting started guide
ru robot-docs examples          # Usage examples
ru robot-docs exit-codes        # Exit code reference
ru robot-docs formats           # Output format details
ru robot-docs schemas           # JSON schemas for command outputs
ru --schema                     # Shortcut for ru robot-docs schemas
```

## 🤖 Ready-made Blurb for AI Agents

> [!IMPORTANT]
> **Copy the blurb below to your project's `AGENTS.md`, `CLAUDE.md`, or `.cursorrules` file for AI agent integration with ru.**

````markdown
## ru Quick Reference for AI Agents

Syncs GitHub repos to local projects directory (clone missing, pull updates, detect conflicts).

```bash
ru sync                    # Sync all repos
ru sync --dry-run          # Preview only
ru sync -j4 --autostash    # Parallel + auto-stash
ru status --no-fetch       # Quick local status
ru list --paths            # Repo paths (stdout)
```

**Automation:** `--non-interactive --format json|toon` (structured→stdout, human→stderr). (`--json` == `--format json`)

**Exit:** 0=ok | 1=partial | 2=conflicts | 3=system | 4=bad args | 5=interrupted (`--resume`)

**Critical:**
- Never create worktrees/clones in projects dir → use `/tmp/`
- Never parse human output → use `--format json|toon`
````

---

## 🎯 The Primary Use Case: Keeping Your Projects Directory in Sync

**The scenario:** You work across multiple machines, contribute to dozens of repositories, and your local `/data/projects` directory needs to stay synchronized with GitHub. Manually running `git pull` in each directory is tedious and error-prone.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Your Repos     │     │  repos.d/       │     │       ru        │
│  on GitHub      │────▶│  public.txt     │────▶│     sync        │
│  (47 repos)     │     │  private.txt    │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
         ┌──────────────────────────────────────────────┤
         ▼                    ▼                         ▼
┌─────────────────┐  ┌─────────────────┐     ┌─────────────────┐
│  Clone Missing  │  │  Pull Updates   │     │  Report Status  │
│  (8 new repos)  │  │  (34 updated)   │     │  (2 conflicts)  │
└─────────────────┘  └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                                             ┌─────────────────┐
                                             │  Actionable     │
                                             │  Resolution     │
                                             │  Commands       │
                                             └─────────────────┘
```

**The workflow:**

1. **Configure once** — Add repos to `~/.config/ru/repos.d/public.txt`
2. **Run `ru sync`** — Everything happens aut
...[truncated]

## Links

- [GitHub](https://github.com/Dicklesworthstone/repo_updater)
- [Original Tweet](https://x.com/doodlestein/status/2018036767505453163)
