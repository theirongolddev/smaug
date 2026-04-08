---
title: "Fractals - Recursive Agent Orchestrator"
type: tool
date_added: 2026-03-05
source: "https://github.com/TinyAGI/fractals"
tags: [agent-orchestration, parallel-execution, recursive-tasks, coding, worktrees]
via: "Twitter bookmark from @jianxliao"
---

Fractals is a recursive agent orchestrator that breaks complex coding tasks into parallel subtasks. Instead of linear execution, it uses a fractal pattern where tasks are recursively decomposed until each piece is small enough for an agent to execute independently, then all run in parallel within isolated git worktrees.

The architecture mirrors itself at every level - like a fractal. Each subtask spawns its own branch and worktree, completely isolated from others. When complete, results propagate back up the tree to the root.

## Key Features

- Recursive task decomposition into parallel subtasks
- Each subtask runs in its own isolated git worktree
- Branch isolation prevents conflicts between parallel work
- GPT-5.4 optimized for task breakdown logic
- Results aggregate back to parent tasks
- Runs on port 1618 (the golden ratio)

## How It Works

1. Give Fractals one complex task
2. It breaks it into subtasks recursively
3. Each subtask gets broken down further until atomic
4. All atomic tasks run in parallel
5. Results propagate back up the tree

Perfect for coordinating multiple AI agents on a single codebase without merge conflicts or coordination overhead.

## Links

- [GitHub](https://github.com/TinyAGI/fractals)
- [Original Tweet](https://x.com/jianxliao/status/2029651439040221323)
