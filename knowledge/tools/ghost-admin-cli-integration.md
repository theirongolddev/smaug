---
title: "Ghost Admin — Headless Claude CLI Integration"
type: tool
date_added: 2026-01-31
tags: [ghost-admin, claude-code, cli, headless, permissions, mcp]
---

## Architecture

Ghost Admin chat spawns the Claude CLI as a headless subprocess:

```
React UI → fetch(/api/chat) → TanStack Start API → spawn("claude", args) → stream-json SSE
```

Source: `ghost-admin/src/server/functions/chat.ts`

## Required CLI Flags

| Flag | Value | Purpose |
|------|-------|---------|
| `--print` | (no value) | Non-interactive mode. REQUIRED — without it, everything hangs |
| `-p` | `<prompt>` | The user's message |
| `--output-format` | `stream-json` | Newline-delimited JSON for SSE streaming |
| `--permission-mode` | `acceptEdits` | Auto-approve file Write/Edit operations |
| `--tools` | `Read,Write,Edit,Glob,Grep,mcp__qmd__*` | Whitelist of allowed tools |
| `--mcp-config` | `mcp-config.json` | Load qmd as MCP server |
| `--strict-mcp-config` | (no value) | Ignore user/project MCP configs (no agent-mail etc.) |
| `--settings` | `chat-settings.json` | Permission allow rules for MCP tools |
| `--add-dir` | `<ghost-data-dir>` | Give CLI access to Ghost memory files |
| `--session-id` / `--resume` | UUID | Session management |
| `--append-system-prompt-file` | `<persona-file>` | Inject identity + corrections (new sessions only) |

## Permission Model (CRITICAL)

`--permission-mode acceptEdits` ONLY auto-approves file Write/Edit operations.

MCP tool calls (like `mcp__qmd__search`) are NOT covered by `acceptEdits`. They need explicit allow rules via `--settings`:

```json
{
  "permissions": {
    "allow": [
      "mcp__qmd__search",
      "mcp__qmd__vsearch",
      "mcp__qmd__query",
      "mcp__qmd__get",
      "mcp__qmd__multi_get",
      "mcp__qmd__status"
    ]
  }
}
```

Without this, the CLI prompts for permission on every MCP call — which hangs in headless mode.

## Config Files

| File | Location | Purpose |
|------|----------|---------|
| `mcp-config.json` | `ghost-admin/` (project root) | Registers qmd stdio MCP server |
| `chat-settings.json` | `ghost-admin/` (project root) | Permission allow rules for MCP tools |

## Adding New MCP Tools

To give the Ghost chat CLI access to a new MCP server:

1. Add the server to `mcp-config.json`
2. Add tool names to `chat-settings.json` permissions.allow
3. Add tool names to the `--tools` whitelist in `chat.ts`
4. Update the test assertion in `chat.test.ts`
