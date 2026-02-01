---
title: "Cord - Headless Claude CLI Reference"
type: tool
date_added: 2026-01-30
source: https://github.com/alexknowshtml/cord
tags: [claude-code, cli, headless, discord, reference]
via: "@alexhillman Twitter bookmark"
---

## What It Is

Discord-to-Claude Code bridge by Alex Hillman. Used as a **reference project** for Ghost Admin's CLI integration — NOT used directly.

## Why It Mattered

Cord's `spawner.ts` demonstrated the `--print` flag pattern for headless CLI usage. This was the key insight that unblocked Ghost Admin's chat implementation.

## Key Pattern From Cord

```typescript
const args = ['claude'];
args.push('--print');                              // NON-INTERACTIVE — the key flag
args.push('--session-id', sessionId);              // or --resume for follow-ups
args.push('--append-system-prompt', systemPrompt); // context injection
args.push('-p', prompt);                           // user prompt
```

`--print` skips the workspace trust dialog — this is what makes headless operation possible.

## Cord's Architecture (for reference only)

```
Discord Bot → BullMQ Queue (Redis) → Worker → Spawner (Claude CLI)
```

| File | Purpose |
|------|---------|
| `src/spawner.ts` | Claude CLI integration (the core) |
| `src/worker.ts` | BullMQ job processor |
| `src/bot.ts` | Discord event handler |
| `src/db.ts` | SQLite for thread→session mapping |
| `src/queue.ts` | BullMQ queue definition |
| `src/api.ts` | HTTP API for external tools |
