---
title: Pi-Mono AI Agent Toolkit Research
type: tool_evaluation
date_added: 2026-02-05
source: https://github.com/badlogic/pi-mono
tags: [coding-agent, llm, typescript, evaluation]
via: user_request
---

# Pi-Mono AI Agent Toolkit

## Overview

Pi-mono is a radically minimal, opinionated AI agent toolkit created by Mario Zechner (@badlogic). It's a TypeScript monorepo with 7 packages focused on building AI-powered coding agents and chat interfaces. As of Jan 2026, it has 2,900+ GitHub stars.

## Architecture

### Package Structure

| Package | Purpose |
|---------|---------|
| `@mariozechner/pi-ai` | Unified multi-provider LLM API (OpenAI, Anthropic, Google, xAI, Groq, Cerebras, OpenRouter) |
| `@mariozechner/pi-agent-core` | Agent runtime with tool calling capabilities |
| `@mariozechner/pi-coding-agent` | Interactive CLI for code generation tasks |
| `@mariozechner/pi-mom` | Slack integration delegating to the coding agent |
| `@mariozechner/pi-tui` | Terminal rendering library with differential rendering |
| `@mariozechner/pi-web-ui` | Web components for chat interfaces |
| `@mariozechner/pi-pods` | CLI for vLLM deployment management |

### Core Philosophy

**Radical minimalism**: System prompt + tool definitions total **<1000 tokens** (vs Claude Code's ~20k+ tokens)

**Four core tools only**: read, write, edit, bash
- No MCP support (author views it as "token waste")
- No background bash
- No sub-agents
- No plan modes
- No built-in todos

**Self-extending**: If you need new functionality, ask the agent to extend itself with code rather than installing extensions.

## LLM Session Management

### API Usage Pattern

Uses a **unified LLM API** (`pi-ai`) that abstracts multiple providers:
- Supports Anthropic, OpenAI, Google, xAI, Groq, Cerebras, OpenRouter, OpenAI-compatible endpoints
- Four core API adapters handle "pretty much any LLM provider"
- **Cross-provider context handoff**: Thinking traces serialize/deserialize between providers
- Anthropic traces convert to `<thinking>` tags for other models
- Progressive JSON parsing: Tool arguments parse incrementally during streaming
- Full abort support with partial result recovery

### Billing Model

**Flexible billing approach**:
- Supports both subscription (e.g., Claude Pro) and pay-as-you-go API billing
- Token and cache tracking operates on "best-effort basis" due to provider inconsistencies
- Cost tracking for multi-model sessions, though exact attribution is challenging

**CRITICAL DIFFERENCE FROM GHOST'S CONSTRAINTS**:
- Pi uses the **Anthropic API directly** via the unified LLM abstraction
- It does NOT use the Claude CLI or subscription-based access
- This is fundamentally incompatible with Ghost's architectural requirement to use CLI subscription billing

## Operational Modes

### CLI Invocation

```bash
pi [options] [@files...] [messages...]
```

**Modes**:
1. **Interactive**: Default terminal UI with message history
2. **Print/JSON**: Direct output without saving sessions (`--no-session`)
3. **RPC mode**: JSON-based stdin/stdout communication (`--mode rpc`)
4. **SDK mode**: Embedded Node.js integration

### Session Management

```bash
pi -c              # Continue most recent session
pi -r              # Browse and select from past sessions
pi --no-session    # Ephemeral mode (don't save)
pi --session <path># Use specific session file or ID
```

Sessions auto-save to `~/.pi/agent/sessions/` organized by working directory.

### Permission Model

**Minimal-permission approach**:
- No built-in permission popups
- Tools (read, write, edit, bash) execute with full system access
- Users run agents in containers or build custom gates via extensions

### Programmatic Access

**SDK Integration** (Node.js):
```typescript
const { session } = await createAgentSession({
  sessionManager: SessionManager.inMemory(),
  authStorage: new AuthStorage(),
  modelRegistry: new ModelRegistry(authStorage)
});
```

**RPC Mode** (non-Node.js):
```bash
pi --mode rpc  # JSON message passing over stdin/stdout
```

## Technical Differentiators

### vs Claude Code

| Aspect | Pi | Claude Code |
|--------|----|----|
| System prompt size | <1000 tokens | ~20k+ tokens |
| Tool definitions | 4 core tools | 15+ tools |
| Observability | Full (single agent loop) | Black-box sub-agents |
| Configuration | User-controlled | Hidden changes |
| MCP support | No (views as bloat) | Yes |

### TUI Innovation

- **Differential rendering**: Compares line-by-line changes, outputs only modified content
- Synchronized output escape sequences for flicker reduction
- Minimal token footprint in system prompt

## Ghost Compatibility Analysis

### ❌ INCOMPATIBLE: Billing Architecture

**Ghost's non-negotiable constraint**: Must use Claude CLI subscription (Claude Pro/Max), NOT Anthropic API billing.

**Pi's architecture**: Uses Anthropic API directly via unified LLM abstraction layer.

**Conclusion**: Pi's core design violates Ghost's fundamental architectural requirement. The unified API is a feature for Pi but a dealbreaker for Ghost.

### ❌ INCOMPATIBLE: Headless Execution Pattern

**Ghost's pattern**:
```typescript
spawn("claude", ["--print", "--output-format", "stream-json", ...])
```

**Pi's pattern**:
```typescript
// SDK mode - programmatic API calls
const { session } = await createAgentSession({ ... });

// RPC mode - stdin/stdout JSON protocol
spawn("pi", ["--mode", "rpc"])
```

Pi doesn't expose a `--print` equivalent that streams to stdout in the same format Ghost expects.

### ⚠️ PARTIAL: Multi-Provider Support

**Potential value**: Pi's unified LLM API could be useful IF Ghost ever wants to support multiple LLM providers.

**Current reality**: Ghost is Claude-specific by design (Ghost persona, Claude context, Claude skills). Multi-provider support is not a stated goal.

### ✅ COMPATIBLE: TUI Library

**Potential value**: Pi's `@mariozechner/pi-tui` differential rendering library could improve Ghost's terminal output.

**Caveat**: Ghost Admin is primarily web-based. TUI improvements would only benefit direct CLI usage, not the web chat interface.

### ✅ COMPATIBLE: Web UI Components

**Potential value**: `@mariozechner/pi-web-ui` chat components could inform Ghost Admin's chat interface design.

**Caveat**: Ghost Admin already has a working TanStack Start chat UI. Migrating would be a lateral move, not a clear upgrade.

## Verdict

**Should Ghost transition to pi-mono?**

**NO. Pi-mono is fundamentally incompatible with Ghost's architecture.**

### Critical Blockers

1. **API billing**: Pi uses Anthropic API (pay-per-token). Ghost MUST use CLI subscription billing. This is non-negotiable and has been corrected multiple times.

2. **Execution model**: Pi's SDK and RPC modes don't match Ghost's `spawn("claude", ["--print"])` pattern.

3. **Minimal ROI**: Even if we could adapt pi to use the Claude CLI (which would require forking and rewriting core components), the benefits are minimal:
   - Ghost doesn't need multi-provider support
   - Ghost already has a working web UI
   - Pi's minimalism (4 tools) is less capable than Claude CLI's 15+ tools
   - Ghost's token budget is not constrained (using subscription)

### Potential Salvage

If there's value in pi-mono, it's **component-level inspiration**:
- Study the differential rendering approach for terminal output
- Review the progressive JSON parsing for streaming UX improvements
- Consider the session management patterns

But **wholesale migration or "using pi under the hood" is architecturally impossible** without violating Ghost's core constraint.

## References

- GitHub: https://github.com/badlogic/pi-mono
- Author's blog: https://mariozechner.at/posts/2025-11-30-pi-coding-agent/
- npm package: https://www.npmjs.com/package/@mariozechner/pi-coding-agent
