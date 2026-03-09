---
title: "fractals"
type: tool
date_added: 2026-03-08
source: "https://github.com/TinyAGI/fractals"
stars: 489
language: "TypeScript"
tags: [agent-orchestration, task-decomposition, git-worktrees, parallel-execution, typescript]
via: "Twitter bookmark from @jianxliao"
---

Fractals is a recursive task orchestrator for agent swarms. Give it a high-level task and it recursively decomposes it into subtasks until every piece is atomic, then runs leaf tasks in parallel in isolated git worktrees using Claude or Codex CLI. A Next.js frontend visualizes the decomposition tree and live execution status. Runs on port 1618 (the golden ratio). Experimental.

## Key Features
- Recursive decomposition: composite tasks split until atomic, then executed in parallel
- Isolated execution: each leaf task runs in its own git worktree on its own branch
- Two-phase flow: Plan (review full tree before committing) → Execute (batch leaf tasks)
- Real-time status polling via Next.js frontend with interactive tree renderer (react-arborist)
- Depth-first batch execution strategy implemented; breadth-first and layer-sequential on roadmap
- Uses OpenAI (gpt-5.2) for classify/decompose + Claude/Codex CLI for execution

## README

<div align="center">
  <img src="./images/fractals-cover.png" alt="Fractals" width="600" />
  <h1>Fractals 🌀</h1>
  <p><strong>Recursive agentic task orchestrator</strong></p>
  <p><strong>Give it any high-level task and it grows a self-similar tree of executable subtasks, then runs each leaf in isolated git worktrees with an agent swarm.</strong></p>
  <p>
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg" alt="Experimental" />
    <a href="https://opensource.org/licenses/MIT">
      <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License" />
    </a>
    <a href="https://discord.gg/jH6AcEChuD">
      <img src="https://img.shields.io/discord/1353722981163208785?logo=discord&logoColor=white&label=Discord&color=7289DA" alt="Discord" />
    </a>
  </p>
</div>


<p align="center">
  <img src="./images/fractals.png" alt="Fractals demo UI" width="760" />
</p>

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  web/  (Next.js frontend)                               │
│  - Task input                                           │
│  - Tree visualization                                   │
│  - Workspace setup                                      │
│  - Execution status polling                             │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP (:1618)
┌────────────────────▼────────────────────────────────────┐
│  src/  (Hono server)                                    │
│                                                         │
│  ┌─────────┐   ┌──────────┐   ┌──────────────────────┐  │
│  │  LLM    │   │Orchestr- │   │  Executor            │  │
│  │classify │──>│  ator    │   │  Claude / Codex CLI  │  │
│  │decompose│   │ plan()   │   │  git worktrees       │  │
│  └─────────┘   └──────────┘   └──────────────────────┘  │
│                                                         │
│  OpenAI (gpt-5.2)            Claude / Codex CLI (spawn) │
└─────────────────────────────────────────────────────────┘
```

## Two-Phase Flow

```
Phase 1: PLAN                          Phase 2: EXECUTE
─────────────────                      ──────────────────
User enters task                       User confirms plan
        │                              User provides workspace path
        v                                      │
  classify(task)                               v
  ┌──atomic──> mark "ready"            git init workspace
  │                                    create worktrees
  └──composite──> decompose(task)      batch leaf tasks
                      │                        │
                 [children]                    v
                      │                 claude --dangerously-skip-permissions
                 plan(child) <────┐          -p "task + lineage context"
                      │           │          (per worktree)
                      └───────────┘
```

## UX Flow

1. **Input** -- enter a task description and max depth
2. **Decompose** -- server recursively breaks it into a tree
3. **Review** -- inspect the full plan tree before committing
4. **Workspace** -- provide a directory path (git-initialized automatically, defaults to `~/fractals/<task-slug>`)
5. **Execute** -- leaf tasks run via Claude CLI in batches, status updates poll in real-time

## Batch Strategies

Due to rate limits, leaf tasks execute in batches rather than all at once.

| Strategy | Description | Status |
|----------|-------------|--------|
| **depth-first** | Complete all leaves under branch 1.x, then 2.x, etc. Tasks within each branch run concurrently. | Implemented |
| **breadth-first** | One leaf from each branch per batch. Spreads progress evenly. | Roadmap |
| **layer-sequential** | All shallowest leaves first, then deeper. | Roadmap |

## Project Structure

```
src/
  server.ts        Hono API server (:1618)
  types.ts         Shared types (Task, Session, BatchStrategy)
  llm.ts           OpenAI calls: classify + decompose (structured output)
  orchestrator.ts  Recursive plan() -- builds the tree, no execution
  executor.ts      Claude CLI invocation per task in git worktree
  workspace.ts     git init + worktree management
  batch.ts         Batch execution strategies
  index.ts         CLI entry point (standalone, no server)
  print.ts         Tree pretty-printer (CLI)

web/
  src/app/page.tsx              Main UI (input -> review -> execute)
  src/components/task-tree.tsx  Recursive tree renderer
  src/lib/api.ts                API client for Hono server
```

## Quick Start

```bash
# 1. Install server deps
npm install

# 2. Install frontend deps
cd web && npm install && cd ..

# 3. Set your OpenAI key
echo "OPENAI_API_KEY=sk-..." > .env

# 4. Start the server (port 1618)
npm run server

# 5. Start the frontend (port 3000)
cd web && npm run dev
```

Port `1618` — the golden ratio, the constant behind fractal geometry.

## API

| Endpoint | Method | Description |
|----------|--------|----------
...[truncated]

## Links

- [GitHub](https://github.com/TinyAGI/fractals)
- [Original Tweet](https://x.com/jianxliao/status/2029651439040221323)
