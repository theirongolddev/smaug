---
title: "misc_coding_agent_tips_and_scripts"
type: tool
date_added: 2026-02-09
source: "https://github.com/Dicklesworthstone/misc_coding_agent_tips_and_scripts/blob/main/DESTRUCTIVE_GIT_COMMAND_CLAUDE_HOOKS_SETUP.md"
stars: 194
language: "Shell"
tags: ["git-safety", "agent-hooks", "destructive-command-guard", "terminal-config", "development-tooling"]
via: "Twitter bookmark from @alexhillman"
---

A comprehensive collection of practical scripts, hooks, and configurations designed to prevent AI coding agents from accidentally destroying work or misconfiguring development environments. Each guide solves a specific problem encountered during daily AI-assisted development with copy-paste ready solutions.

## Key Features
- **Destructive Git Command Protection:** Intercepts and blocks `git checkout --`, `git reset --hard`, `git clean -f`, `git push --force`, and destructive `rm -rf` commands before they execute
- **Pre-commit Hook Integration:** Uses Claude Code's PreToolUse hook system for deterministic command validation
- **Context Compaction Awareness:** Reminds agents to re-read project conventions (AGENTS.md) after context compaction
- **Terminal Infrastructure:** Host-aware color themes, persistent remote sessions, and terminal multiplexer tuning for agent swarms
- **Systems Administration:** NFS auto-mounting, 10GbE networking, and Moonlight streaming configurations for remote development
- **Verified Tools:** Includes setups for WezTerm, Ghostty, MX Master keyboards, and Claude Code native installations

## README

# Misc Coding Agent Tips and Scripts

Practical guides for AI coding agents, terminal customization, and development tooling. Each guide documents a real problem encountered during daily work, the solution that fixed it, and copy-paste configurations to replicate the setup.

## Quick Reference

| Guide | Problem Solved | Time to Set Up |
|:------|:---------------|:---------------|
| [Destructive Git Command Protection](#destructive-git-command-protection) | AI agent ran `git checkout --` and destroyed uncommitted work | 5 min |
| [Post-Compact AGENTS.md Reminder](#post-compact-agentsmd-reminder) | Claude forgets project conventions after context compaction | 2 min |
| [Host-Aware Terminal Colors](#host-aware-color-themes) | Can't tell which terminal is connected to production | 5-15 min |
| [WezTerm Persistent Sessions](#wezterm-persistent-remote-sessions) | Remote terminal sessions die when Mac sleeps or reboots | 20 min |
| [WezTerm Mux Tuning for Agent Swarms](#wezterm-mux-tuning-for-agent-swarms) | Mux server becomes unresponsive with 20+ agents | 5 min |
| [Ghostty Terminfo for Remote Machines](#ghostty-terminfo-for-remote-machines) | Numpad Enter shows `[57414u` garbage when SSH'd | 2 min |
| [macOS NFS Auto-Mount](#macos-nfs-auto-mount) | Have to manually mount remote dev server after every reboot | 10 min |
| [Budget 10GbE Direct Link](#budget-10gbe-direct-link) | File transfers crawl at 100MB/s through gigabit switch | 30 min |
| [MX Master Tab Switching](#mx-master-thumbwheel-tab-switching) | Thumbwheel does horizontal scroll instead of something useful | 10 min |
| [Doodlestein Punk Theme](#doodlestein-punk-theme-for-ghostty) | Need a cyberpunk color scheme for Ghostty | 1 min |
| [Reducing Vercel Build Credits](#reducing-vercel-build-credits) | Automatic deployments burn through Pro plan credits | 10 min |
| [Claude Code Native Install Fix](#claude-code-native-install-fix) | `claude --version` shows old version after native install | 5 min |
| [Claude Code MCP Config Fix](#claude-code-mcp-config-fix) | MCP servers wiped out, need quick restore | 2 min |
| [Mirror Claude Code Skills](#mirror-claude-code-skills) | Copy project skills to global ~/.claude/skills | 2 min |
| [Beads Setup](#beads-setup) | Worktree errors when syncing Beads | 5 min |
| [Moonlight Streaming](#moonlight-streaming-configuration) | Remote desktop to Linux workstation with AV1 encoding | 30 min |
| [Vault HA Cluster](#hashicorp-vault-ha-cluster) | Single Vault instance is a single point of failure | 45 min |
| [DevOps CLI Tools](#devops-cli-tools) | Clicking through web dashboards wastes time | 15 min |
| [Gemini CLI Crash + Retry Fix](#gemini-cli-crash--retry-fix) | Gemini CLI crashes with EBADF and gives up after 3 retries | 10 sec |

---

## AI Agent Safety

### Destructive Git Command Protection

> **Origin story:** An AI agent ran `git checkout --` on files containing hours of uncommitted work from a parallel coding session. The files were recovered via `git fsck --lost-found`, but this prompted creating a mechanical enforcement system.

A Python hook for Claude Code that intercepts Bash commands and blocks destructive operations before they execute.

**Blocked commands:**

| Command | Why it's dangerous |
|:--------|:-------------------|
| `git checkout -- <files>` | Discards uncommitted changes permanently |
| `git reset --hard` | Destroys all uncommitted work |
| `git clean -f` | Deletes untracked files |
| `git push --force` | Overwrites remote history |
| `rm -rf` (non-temp paths) | Recursive deletion |

**How it works:** Claude Code's `PreToolUse` hook system runs the guard script before each Bash command. The script pattern-matches against known destructive commands and returns a deny decision with an explanation. Safe variants (like `git checkout -b`, `git clean -n`, `rm -rf /tmp/...`) are allowlisted.

<details>
<summary><strong>Quick install</strong></summary>

See the [full guide](DESTRUCTIVE_GIT_COMMAND_CLAUDE_HOOKS_SETUP.md) for the automated installer. After running it:

```bash
# Restart Claude Code for hooks to take effect
```

Test that it works:
```bash
echo '{"tool_name": "Bash", "tool_input": {"command": "git checkout -- file.txt"}}' | \
  python3 .claude/hooks/git_safety_guard.py
# Should output: permissionDecision: deny
```

</details>

**[Full guide →](DESTRUCTIVE_GIT_COMMAND_CLAUDE_HOOKS_SETUP.md)**

---

### Post-Compact AGENTS.md Reminder

> **Problem:** During long coding sessions, Claude Code compacts the conversation to stay within context limits. After compaction, Claude "forgets" project-specific conventions documented in AGENTS.md.

A bash hook that detects context compaction and injects a reminder for Claude to re-read AGENTS.md.

**How it works:** Claude Code's `SessionStart` hook fires with `source: "compact"` after compaction. The hook checks this field and outputs a reminder message that Claude sees immediately.

<details>
<summary><strong>Quick install</strong></summary>

```bash
c
...[truncated]

## Links

- [GitHub](https://github.com/Dicklesworthstone/misc_coding_agent_tips_and_scripts/blob/main/DESTRUCTIVE_GIT_COMMAND_CLAUDE_HOOKS_SETUP.md)
- [Original Tweet](https://x.com/alexhillman/status/2006881325849129246)
