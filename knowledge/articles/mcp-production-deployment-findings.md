---
title: "MCP Production Deployment: Well-Known Stubs & Auth Findings"
type: article
date_added: 2026-02-03
tags: [ghost-admin, mcp, nitro, tanstack-start, production, deployment, security]
via: "Debugging session — MCP 500 errors from remote Claude instances"
---

# MCP Production Deployment Findings

## Problem

Remote Claude Code instances got 500 errors when connecting to `https://ghost.irongold.dev/api/mcp`. Two root causes:

### 1. Bearer Token Not Loaded

PM2 caches environment variables at startup. `GHOST_MCP_TOKEN` was added to `.env` after PM2 first started the process. `pm2 restart` doesn't reload the ecosystem config — only `pm2 delete` + `pm2 start` (or `pm2 reload ecosystem.config.cjs`) forces a re-parse of `.env`.

### 2. Well-Known OAuth Stubs Never Reached Production

Claude Code's MCP HTTP transport probes `/.well-known/oauth-authorization-server`, `/.well-known/oauth-protected-resource`, and `/.well-known/openid-configuration` before connecting. Without stubs returning 404 JSON, TanStack Start's auth guard intercepted these requests and returned 307 redirects to `/login`, which the MCP client couldn't handle.

## Why Previous Approaches Failed

| Approach | Dev? | Prod? | Why |
|----------|:----:|:-----:|-----|
| Nitro routes (`routes/.well-known/`) | ❌ | ❌ | TanStack Start overrides Nitro's scanDirs |
| Nitro middleware (`server/middleware/`) | ❌ | ❌ | `server/` not in TanStack Start's scan dirs |
| `scanDirs: ["server"]` in Nitro vite plugin | ❌ | ❌ | TanStack Start's defu merge gives its scanDirs priority |
| `nitro.config.ts` file | ❌ | ❌ | Also overridden by TanStack Start |
| Vite plugin `configureServer()` | ✅ | ❌ | Dev-only hook, not in production builds |
| **`handlers` array in Nitro config** | ✅ | ✅ | Bypasses scanDirs — handlers merged additively |

## Solution

### vite.config.ts — Nitro `handlers` config

```typescript
nitro({
  preset: "node-server",
  handlers: [
    {
      route: "",
      middleware: true,
      handler: "./server/middleware/well-known-oauth.ts",
    },
  ],
  // ...routeRules
})
```

### server/middleware/well-known-oauth.ts

Nitro middleware using h3's `defineEventHandler` + `getRequestURL`. Returns 404 JSON for the three OAuth discovery paths, passes through everything else.

### PM2 Restart Protocol

```bash
# WRONG — doesn't reload ecosystem config
pm2 restart ghost-admin

# RIGHT — forces re-parse of .env via ecosystem.config.cjs
pm2 delete ghost-admin && pm2 start ecosystem.config.cjs
```

## Key Technical Detail

Nitro's handler pipeline (from source):
```
[...nitro.scannedHandlers, ...nitro.options.handlers]
```

`scannedHandlers` comes from `scanDirs` (controlled by TanStack Start). `options.handlers` comes from the config we pass. They merge additively, so our explicit handlers always get included regardless of what TanStack Start does with scanning.

## CASS/qmd Search Results

- Ghost memory had no prior session history for MCP HTTP endpoint debugging
- CASS had the original MCP transport research session (chose Streamable HTTP + bearer token)
- The well-known route issue was never documented before this session
