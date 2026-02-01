---
title: repo_updater (ru)
type: tool
date_added: 2026-02-01
source: https://github.com/Dicklesworthstone/repo_updater
tags:
  - bash
  - git
  - multi-repo
  - cli
  - automation
via: "Twitter bookmark from @doodlestein"
---

# repo_updater (ru)

A beautiful, automation-friendly CLI for synchronizing GitHub repositories. Keep dozens (or hundreds) of repos in sync with a single command.

## Features

- Clone missing repos
- Pull updates across all repos
- Detect conflicts with actionable resolution commands
- Pure Bash with no string parsing of git output
- Uses git plumbing for reliable status detection
- Meaningful exit codes for CI
- JSON output for scripting
- Non-interactive mode for automation

## Installation

```bash
curl -fsSL "https://raw.githubusercontent.com/Dicklesworthstone/repo_updater/main/install.sh?ru_cb=$(date +%s)" | bash
```

Or via Homebrew (macOS/Linux):

```bash
brew install dicklesworthstone/tap/ru
```

## Quick Commands

```bash
ru sync                    # Sync all repos
ru sync --dry-run          # Preview only
ru sync -j4 --autostash    # Parallel + auto-stash
ru status --no-fetch       # Quick local status
ru list --paths            # Repo paths (stdout)
```

## Agent Integration

Use structured output in agent contexts:

```bash
# Sync all repos (machine-readable)
ru sync --format json

# Preview without changes
ru sync --dry-run --format json

# Status only (no fetch)
ru status --no-fetch --format json
```

**Exit Codes:**
- 0 = ok
- 1 = partial
- 2 = conflicts
- 3 = system
- 4 = bad args
- 5 = interrupted

## Use Case

Keeps your projects directory synchronized across multiple machines. Configure once with repo lists, then run `ru sync` to automatically:
- Clone missing repos
- Pull updates
- Report on conflicts

## Specs

- **Language:** Shell/Bash 4.0+
- **Platform:** macOS | Linux
- **License:** MIT
- **Stars:** 42
- **Repository:** https://github.com/Dicklesworthstone/repo_updater
