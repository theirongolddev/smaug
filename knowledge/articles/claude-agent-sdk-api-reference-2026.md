---
title: "Claude Agent SDK TypeScript API Reference (Jan 2026)"
type: research
date_added: 2026-02-02
source: platform.claude.com/docs/en/agent-sdk/typescript + overview + streaming + permissions + user-input
tags: [claude-code, agent-sdk, typescript, api-reference, streaming, permissions]
via: deep web research session for claude-cli-kit PRD v2
---

# Claude Agent SDK TypeScript API Reference

## CRITICAL: SDK Uses API, NOT Subscription

The Agent SDK (`@anthropic-ai/claude-agent-sdk`) requires `ANTHROPIC_API_KEY` and bills per token.
It does NOT use Claude subscriptions (Max/Pro). For subscription-based usage, use the CLI directly
via `child_process.spawn("claude", ["-p", ...])`.

## Key Facts

- Package: `@anthropic-ai/claude-agent-sdk` (renamed from `@anthropic-ai/claude-code`)
- Latest: v0.2.29 (Jan 31, 2026)
- 722 GitHub stars, 491 dependents
- Core function: `query()` returns `AsyncGenerator<SDKMessage>`
- 12s overhead per `query()` call (reported GitHub issue #34 — no hot process reuse)

## query() Options

Key options: prompt, allowedTools, permissionMode, model, maxTurns, maxBudgetUsd,
mcpServers, agents, hooks, includePartialMessages, resume, cwd, settingSources,
systemPrompt, tools, canUseTool, sandbox, fallbackModel, outputFormat (json_schema)

## Message Types

- SDKSystemMessage (type: "system", subtype: "init") — session_id, tools, model
- SDKAssistantMessage (type: "assistant") — uuid, message with content blocks
- SDKUserMessage (type: "user") — tool results
- SDKPartialAssistantMessage (type: "stream_event") — raw API streaming events
- SDKResultMessage (type: "result") — success/error, cost, usage, duration
- SDKCompactBoundaryMessage (type: "system", subtype: "compact_boundary")

## Permission System

canUseTool callback: (toolName, input, options) => Promise<PermissionResult>
- Allow: { behavior: "allow", updatedInput }
- Deny: { behavior: "deny", message }
- 60-second timeout

Modes: default, acceptEdits, bypassPermissions, plan

## Hooks (Native Callbacks)

PreToolUse, PostToolUse, PostToolUseFailure, Notification, UserPromptSubmit,
SessionStart, SessionEnd, Stop, SubagentStart, SubagentStop, PreCompact, PermissionRequest

## Streaming

With includePartialMessages: true, yields StreamEvent messages containing raw Claude API events:
message_start, content_block_start, content_block_delta (text_delta, input_json_delta),
content_block_stop, message_delta, message_stop

## MCP Support

mcpServers config: stdio, sse, http, or sdk (in-process) types.
createSdkMcpServer() for in-process MCP servers.

## Why This Matters for claude-cli-kit

The SDK's architecture confirms what we need to build differently:
1. SDK spawns CLI subprocess internally (same as our approach)
2. SDK returns async iterator (we need SSE HTTP transport)
3. SDK has canUseTool (we need HTTP-bridged permission delegation)
4. SDK manages one session per query() (we manage N concurrent)
5. SDK has no event buffering (we need RingBuffer for reconnection)
