---
title: Agent Settings Backup (asb)
type: tool
date_added: 2026-01-29
source: https://github.com/Dicklesworthstone/agent_settings_backup_script
tags: [backup, versioning, git, coding-agents, configuration-management]
via: "Twitter bookmark from @doodlestein"
---

# Agent Settings Backup (asb)

A smart backup tool for AI coding agent configuration folders. Each agent type gets its own git repository, providing full version history and easy restoration.

## Features

- **Git-versioned backups**: Every backup is a git commit with full history
- **Multiple agent support**: Claude Code, Codex, Cursor, Gemini, Cline, Amp, Aider, OpenCode, Factory, Windsurf, and more
- **Efficient syncing**: Uses rsync for incremental backups
- **Easy restoration**: Restore to any point in history
- **Diff support**: See what changed since last backup
- **Restore preview & confirmation**: See changes before restoring
- **Config file support**: Persistent settings in `~/.config/asb/config`
- **Export/import archives**: Move backups between machines
- **Shell completion**: Bash, Zsh, and Fish completions
- **Dry-run mode**: Preview operations without changes
- **Scheduled backups**: Install cron or systemd timers
- **Hooks**: Run scripts before/after backup and restore
- **Named tags**: Label important backups for easy reference
- **Backup statistics**: See size, commit count, and activity metrics
- **Auto-discovery**: Scan for new AI coding agents
- **Structured output**: Machine-readable output for all commands (JSON/TOON)

## Quick Install

```bash
curl -fsSL "https://raw.githubusercontent.com/Dicklesworthstone/agent_settings_backup_script/main/install.sh" | bash
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
