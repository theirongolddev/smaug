---
title: "Claude CLI Wrapper Package Extraction Analysis"
type: research
date_added: 2026-02-02
source: ghost-admin codebase deep review + ecosystem research
tags: [claude-code, cli-wrapper, package-extraction, oss]
via: manual deep research session
---

# Claude CLI Wrapper Package Extraction: Deep Analysis

## Executive Summary

Ghost Admin contains ~3,800 lines of production-tested code that wraps the Claude Code CLI as a headless subprocess with SSE streaming, concurrent session management, permission delegation, and session history parsing. This code solves problems the official Agent SDK does NOT — specifically the "web app wrapping a CLI" pattern with multi-session process management, event buffering/replay, and UI-delegated permission flows.

## What Exists Today (Ghost Admin Inventory)

| Module | File | Lines | Purpose |
|--------|------|-------|---------|
| Process Registry | process-registry.ts | 720 | Child process lifecycle, RingBuffer, SSE streaming |
| Permission Store | permission-store.ts | 160 | Pending permission requests with timeout + dual indexing |
| Chat Handler | chat.ts | 177 | Concurrency control (AsyncSemaphore), session locks |
| CLI Arg Builder | chat-args.ts | 79 | Flag construction for headless CLI |
| Event Mapper | chat-events.ts | 76 | NDJSON to SSE event transformation |
| Session Parser | session-parser.ts | 822 | JSONL transcript parsing with mtime caching |
| SSE Parser | sse.ts | 107 | Spec-compliant SSE frame decoder (client-side) |
| Auth Guards | request.ts | 130 | Token management, timing-safe comparison |
| Permission Hook | permission-hook.sh | 85 | Bash bridge between CLI and web UI |
| Chat Types | types/chat.ts | 81 | ChatMessage, ContentBlock, PermissionRequest |
| Session Types | types/sessions.ts | 245 | SessionEvent, SessionMetadata, ParsedSession |
| useChat Hook | useChat.ts | 834 | React state management with rAF batching |
| **TOTAL** | | **~3,500** | |

## Gap Analysis: What Official SDK Provides vs What We Built

| Capability | Agent SDK | Ghost Admin | Gap Filled |
|------------|-----------|-------------|------------|
| Spawn CLI subprocess | Yes (query function) | Yes (spawn function) | Parity |
| Stream NDJSON messages | Yes (async iterator) | Yes (ReadableStream + SSE) | Web transport |
| Session resume | Yes (resume option) | Yes + history loading | Full history replay |
| Concurrent sessions | No (one at a time) | Yes (3 concurrent, per-session locks) | Multi-session |
| Event buffering/replay | No | Yes (500-event RingBuffer) | Reconnection |
| Permission delegation to UI | No (callback-based) | Yes (long-poll + SSE + hook script) | Web UI approval |
| SSE event framing | No | Yes (spec-compliant encoder/decoder) | Browser streaming |
| Process watchdog | No | Yes (60s startup timeout, kill escalation) | Reliability |
| Session transcript parsing | No | Yes (822 lines, O(n) XML stripping, mtime cache) | History |
| Cost/token tracking | Partial (result message) | Yes (accumulated across exchanges) | Observability |
| rAF-batched text rendering | No | Yes (60fps streaming display) | UX performance |
| Persona/context injection | Via system prompt | Dynamic snapshot + file injection | Context management |

The Agent SDK is designed for server-to-server or script use. It gives you an async iterator of messages. Ghost Admin built the web application layer - turning that iterator into a multi-client, reconnectable, permission-delegating SSE service.

## Ghost-Specific Coupling Points

### Hard Couplings (Must Abstract)

| Coupling | Location | Abstraction Needed |
|----------|----------|--------------------|
| ~/.claude/ghost/ paths | process-registry.ts:105 | Configurable data directory |
| Energy/work mode reading | process-registry.ts:124-170 | Plugin/hook for dynamic context |
| Identity/corrections injection | process-registry.ts:172-226 | Configurable persona builder |
| Session metadata to JSONL | process-registry.ts:240-252 | Event hook or callback |
| ~/.claude/projects/ | session-parser.ts:83 | Configurable sessions root |
| project dir pattern | session-parser.ts:24 | Configurable project filter |
| isGhostSession check | session-parser.ts:383 | Remove or make generic |
| BetterAuth requireSession | request.ts:55 | Pluggable auth middleware |
| Token at ghost-admin-token | request.ts:7 | Configurable token path |
| Port 3033 hardcoded | process-registry.ts:102 | From config |

### Soft Couplings (Already Flexible)

| Component | Status |
|-----------|--------|
| CLI arg builder | Already parameterized via CliArgOptions |
| Event mapper | Pure function, no dependencies |
| Permission store | Fully generic, no Ghost references |
| SSE parser | Pure utility, zero dependencies |
| RingBuffer | Self-contained data structure |
| AsyncSemaphore | Self-contained concurrency primitive |

## Proposed Package Architecture

### Layer Architecture

```
Package: claude-cli-kit

  Process Registry
    - spawn, attachStream, stop
    - RingBuffer, EventEmitter

  Permission Store
    - create, respond, poll

  CLI Argument Builder
    - buildArgs, buildEnv

  Event Pipeline
    - NDJSON to typed events
    - SSE frame encoder/decoder

  Session Parser
    - listSessions, parseSession, compareSessions

  Utilities
    - AsyncSemaphore, RingBuffer
    - timing-safe token validation
    - session ID validation
```

### Extension Points (Plugin API)

```
ClaudeServerConfig:
  maxConcurrent: number (default 3)
  bufferSize: number (default 500)
  spawnTimeoutMs: number (default 60000)
  cliCommand: string (default "claude")
  defaultModel: string (default "sonnet")
  defaultMaxTurns: number (default 25)
  permissionMode: string (default "acceptEdits")
  tools: string[] (configurable whitelist)
  mcpConfig: object (MCP server definitions)
  strictMcpConfig: boolean (default true)
  permissionAllowRules: string[] (auto-approved MCP tools)
  workingDirectory: string
  addDirectories: string[]

  Hooks:
    onBeforeSpawn(sessionId, args) => args
    onContextBuild(sessionId) => string (dynamic context)
    onPersonaBuild(sessionId) => string (system prompt)
    onSessionComplete(meta) => void
    onPermissionRequest(req) => void

  Auth:
    tokenPath: string
    sessionsRoot: string
    projectPattern: RegExp
```

## Broadened API Surface Opportunities

### 1. Framework-Agnostic HTTP Handlers

Export standard Request/Response handlers that work with Express, Hono, Fastify, etc:

```
createChatHandlers(config) => {
  chatPost, chatDelete, chatStream, chatStatus,
  permissionPost, permissionPut
}
```

### 2. EventEmitter API (No HTTP Required)

For Node.js apps that don't need HTTP transport:

```
const manager = new ClaudeProcessManager(config)
const session = await manager.spawn("id", { prompt })
session.on("text", handler)
session.on("tool_use", handler)
session.on("permission_request", handler)
session.on("done", handler)
```

### 3. React Hook (Optional Subpath Export)

```
import { useClaudeChat } from "claude-cli-kit/react"
// rAF batching, reconnection, permission handling
```

### 4. Permission Hook Generator

Generate customized bash hook scripts:

```
generatePermissionHook({
  whitelistedTools, apiEndpoint, tokenFile, timeoutSeconds
}) => bash script string
```

### 5. Session History as First-Class Feature

```
const store = new SessionStore({ root, pattern })
store.list({ since, limit })
store.parse(sessionId)
store.compare(older, newer)
```

## Extraction Complexity Assessment

| Component | Complexity | Notes |
|-----------|-----------|-------|
| SSE parser | Trivial | Zero dependencies, copy |
| Event mapper | Trivial | Pure function, copy |
| Permission store | Low | Already generic, copy |
| RingBuffer | Trivial | Self-contained, copy |
| AsyncSemaphore | Trivial | Self-contained, copy |
| CLI arg builder | Low | Parameterize tool whitelist, paths |
| Chat handler | Medium | Remove BetterAuth, make auth pluggable |
| Process registry | **High** | Remove Ghost persona/context, add hooks |
| Session parser | Medium | Remove Ghost-specific checks, configurable paths |
| Auth guards | Medium | Extract token management, remove BetterAuth |
| Permission hook | Low | Template from config |
| useChat hook | Medium | Remove Ghost-specific API paths |
| Types | Low | Copy + extend generic versions |

The real work is in process-registry.ts where Ghost persona building is interleaved with process spawning. That needs splitting into a clean hook/callback interface.

## Competitive Landscape

| Package | What It Does | What It Lacks |
|---------|-------------|---------------|
| @anthropic-ai/claude-agent-sdk | query() async iterator over CLI | Multi-session, SSE, buffering, reconnection, permission UI |
| claude-flow (ruvnet) | Stream chaining between claude -p processes | Not a web server layer |
| claudish | Drop-in CLI replacement with JSON mode | Not a library |
| ClaudeCodeSDK (Swift) | macOS subprocess wrapper | Swift-only, not web-focused |
| claude-wrapper | Basic wrapper | Minimal, no streaming/sessions |

Nobody has published a "Claude CLI as a web service" package. The Agent SDK gives you the subprocess; this package gives the web infrastructure around it.

## Security Considerations for Public Package

| Risk | Current Mitigation | Recommendation |
|------|-------------------|----------------|
| Path traversal via sessionId | Regex [a-zA-Z0-9-]{1,128} | Keep + document |
| Command injection | spawn() not exec() | Maintain |
| Token timing attacks | crypto.timingSafeEqual | Keep |
| Process escape | --strict-mcp-config | Document as required |
| Unbounded spawning | AsyncSemaphore max 3 | Make configurable |
| Stderr overflow | 100KB cap with tail truncation | Keep |
| Permission timeout | 5-minute auto-deny | Make configurable |
| DNS rebinding | Host header validation | Provide middleware helper |

## Recommended Extraction Phases

### Phase 1: Core (Standalone, Zero Dependencies)
1. SSE parser, RingBuffer, AsyncSemaphore, permission store, event mapper, types
2. Refactor process-registry: replace Ghost persona with hooks
3. Refactor CLI arg builder: fully configurable
4. Publish as claude-cli-kit

### Phase 2: HTTP Layer
1. Framework-agnostic Request/Response handlers
2. Permission hook bash script generator
3. Auth middleware helper
4. SSE response builder utility

### Phase 3: Client Layer (Optional)
1. React useClaudeChat hook as /react subpath
2. SSE client parser (already generic)
3. Connection resilience

### Phase 4: Session Layer (Optional)
1. Session history parser as /sessions subpath
2. Configurable project patterns and search
3. Session comparison/diffing
