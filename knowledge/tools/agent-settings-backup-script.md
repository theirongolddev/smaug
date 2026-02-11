---
title: "agent_settings_backup_script"
type: tool
date_added: 2026-02-09
source: "https://github.com/Dicklesworthstone/agent_settings_backup_script"
stars: 17
language: "Shell"
tags: ["backup", "git", "version-control", "settings-sync", "ai-coding-agents", "claude-code", "devops"]
via: "Twitter bookmark from @doodlestein"
---

## Summary

A smart backup tool for AI coding agent configuration folders that provides git-versioned backups with full history. Called `asb` (Agent Settings Backup), it supports Claude Code, Cursor, Codex, Gemini, Cline, Amp, Aider and other AI coding agents. Each agent gets its own git repository, enabling version history, restoration to any point, dry-run previews, and scheduled automated backups via cron or systemd.

## Key Takeaways

- **Multi-Agent Support**: Works with 10+ AI coding agents including Claude Code, Cursor, Codex, Gemini, Cline, Amp, Aider, OpenCode, Factory, Windsurf
- **Git Versioning**: Every backup is a git commit, allowing full history viewing, diffs, and restoration to any previous state
- **Incremental Syncing**: Uses rsync for efficient backup operations, only transferring changed files
- **Auto-Discovery**: Scans system for new AI agents with `asb discover` and can auto-add them to rotation
- **Structured Output**: All commands support --json and --format options for machine-readable output
- **Scheduled Backups**: Install cron or systemd timers with `asb schedule` for hands-off automation
- **Restore Confirmation**: Preview exactly what will change before restoring with restore preview feature
- **Named Tags**: Label important backups (e.g., `asb tag claude v1.0`) for easy reference and restoration

## README

# Agent Settings Backup (asb)

<div align="center">
  <img src="asb_illustration.webp" alt="asb - Smart backup tool for AI coding agent configurations">
</div>

<div align="center">

[![Test](https://github.com/Dicklesworthstone/agent_settings_backup_script/actions/workflows/test.yml/badge.svg)](https://github.com/Dicklesworthstone/agent_settings_backup_script/actions/workflows/test.yml)
[![Release](https://github.com/Dicklesworthstone/agent_settings_backup_script/actions/workflows/release.yml/badge.svg)](https://github.com/Dicklesworthstone/agent_settings_backup_script/actions/workflows/release.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

A smart backup tool for AI coding agent configuration folders. Each agent type gets its own git repository, providing full version history and easy restoration.

<div align="center">
<h3>Quick Install</h3>

```bash
curl -fsSL "https://raw.githubusercontent.com/Dicklesworthstone/agent_settings_backup_script/main/install.sh" | bash
```

</div>

---

## Features

- **Git-versioned backups**: Every backup is a git commit with full history
- **Multiple agent support**: Claude, Codex, Cursor, Gemini, Cline, Amp, Aider, OpenCode, Factory, Windsurf, and more
- **Efficient syncing**: Uses rsync for incremental backups
- **Easy restoration**: Restore to any point in history
- **Diff support**: See what changed since last backup
- **Restore preview & confirmation**: See changes before restoring
- **Config file support**: Persistent settings in `~/.config/asb/config`
- **Export/import archives**: Move backups between machines
- **Shell completion**: Bash, Zsh, and Fish completions
- **Dry-run mode**: Preview operations without changes
- **Scheduled backups**: Install cron or systemd timers with `asb schedule`
- **Hooks**: Run scripts before/after backup and restore
- **Named tags**: Label important backups for easy reference
- **Backup statistics**: See size, commit count, and activity metrics
- **Auto-discovery**: Scan for new AI coding agents
- **Structured output**: Machine-readable output for all commands (JSON/TOON)

## New in v0.3

- **Backup tags**: Name important backups with `asb tag claude v1.0`
- **Restore from tags**: Use `asb restore claude v1.0` instead of commit hashes
- **Statistics**: View backup stats with `asb stats` and `asb stats <agent>`
- **Auto-discovery**: Find new AI agents with `asb discover`
- **Custom agents**: Add discovered agents to your backup rotation
- **Structured output**: All commands support `--json` (and `--format toon`) for machine-readable output

## New in v0.2

- **Dry-run mode**: Preview changes with `--dry-run` or `-n`
- **Restore confirmation**: See exactly what will change before restoring
- **Configuration file**: Persistent settings in `~/.config/asb/config`
- **Export/Import**: Portable archives with `asb export` and `asb import`
- **Shell completion**: Tab completion for bash, zsh, and fish

## Installation

**Or install manually:**

```bash
git clone https://github.com/Dicklesworthstone/agent_settings_backup_script.git
cd agent_settings_backup_script
cp asb ~/.local/bin/
```

**Verify installation:**

```bash
asb version   # Should output: asb version 0.3.0
asb help      # Shows available commands
```

### Shell Completion

Enable tab completion for commands and agent names:

```bash
# Bash (~/.bashrc)
eval "$(asb completion bash)"

# Zsh (~/.zshrc)
eval "$(asb completion zsh)"

# Fish (~/.config/fish/config.fish)
asb completion fish | source
```

## Quick Start

```bash
# Initialize backup location
asb init

# Backup all detected agents
asb backup

# Check backup status
asb list
```

## Usage

```bash
asb [options] <command> [args]

Global options:
  -n, --dry-run           Show what would happen without making changes
  -f, --force             Skip confirmation prompts (use with caution)
  -v, --verbose           Show detailed output
  --json                  Output in JSON format (machine-readable)
  --format <json|toon>    Structured output format (implies JSON output; TOON uses toon_rust `tru`)

Commands:
  backup [agents...]        Backup agent settings (all if none specified)
  restore <agent> [commit|tag]  Restore agent from backup (commit or tag name)
  export <agent> [file]     Export backup as portable archive
  import <file>             Import backup from archive
  list                      List all agents and backup status
  history <agent>           Show backup history for an agent
  diff <agent>              Show changes since last backup
  verify [agents...]        Verify backup integrity (all if none specified)
  tag <agent> [name]        Tag a backup (--list, --delete supported)
  stats [agent]             Show backup statistics
  discover                  Scan for new AI agents (--auto, --list)
  schedule [options]        Set up automated scheduled backups
  hooks --list              List configured hooks
  init                      Init
...[truncated]

## Links

- [GitHub](https://github.com/Dicklesworthstone/agent_settings_backup_script)
- [Original Tweet](https://x.com/doodlestein/status/2016931012366811634)
