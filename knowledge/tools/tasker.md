---
title: "tasker"
type: tool
date_added: 2026-02-09
source: "https://github.com/Dowwie/tasker"
stars: 13
language: "Go"
tags: ["agentic-development", "claude-code"]
via: "Twitter bookmark from @darin_gordon"
---

Spec-driven development framework built for Claude Code that implements a three-stage pipeline: Specify (exhaust requirements), Plan (decompose into tasks with DAG), and Execute (implement and verify). Uses finite state machines as contracts, task dependency analysis, decision registries, and resumable checkpoints to guide agentic development from specification through completion.

## Key Takeaways

- **Three-stage pipeline**: Forces exhaustive specification before planning, then systematic decomposition into verified tasks
- **Steel thread first**: Validates architecture early by implementing primary end-to-end flow before building features
- **Task decomposition protocol**: Six-phase structured process (logical decomposition, physical mapping, cross-cutting concerns, definition, dependency analysis, completeness audits)
- **FSM as contracts**: State machines serve dual purpose—shape acceptance criteria during implementation and produce documentation
- **Resumable workflows**: Stop/resume with checkpoints, result files tracking every outcome, and git commits marking progress
- **Decision registry**: Captures architectural decisions in ADRs alongside specifications to preserve context

## README

<div align="center">
<img src="/assets/logo.jpg" alt="Logo" width="100%" style="display: block; margin-top: 0; margin-bottom: 0; max-width: 100%;"/>
</div>

# Tasker

Tasker is a *spec-driven development* workflow built for Claude Code.  It covers the entire pipeline:  spec -> plan -> execute.

---

## Installation

```bash
curl -fsSL https://raw.githubusercontent.com/Dowwie/tasker/main/scripts/install.sh | bash -s -- --easy-mode
```

This installs the `tasker` CLI and registers the Claude Code plugin. After installation, start a new session:
- `/tasker:specify` — develop a specification
- `/tasker:plan` — decompose into tasks
- `/tasker:execute` — implement and verify

---

## Specify → Plan → Execute

Tasker enforces a three-stage pipeline.

**Specify** captures intent exhaustively. Edge cases, state transitions, and invariants are resolved before implementation begins.

**Plan** decomposes the specification into isolated, verifiable tasks with explicit dependencies.

**Execute** implements each task and verifies results against the spec.

By the time code is written, behavior is defined and implementation becomes translation.

---

## What Makes This Work

**Exhaustive discovery.** Agents naturally stop asking after a few questions. Tasker uses reduce-while loops that continue until all requirement categories are covered. The loop pressure forces comprehensive specifications.

**Steel thread first.** Before building features, validate the architecture. The primary end-to-end flow is identified and implemented early; if the foundation is flawed, you discover it in days, not months.

**Task decomposition protocol.** Specifications are transformed into a directed acyclic graph through a structured six-phase process: logical decomposition, physical mapping, cross-cutting concerns, task definition, dependency analysis, and completeness audits. Every task is small enough to verify, specific enough to implement without questions.

**Finite state machines as contracts.** State machines serve two purposes: shaping acceptance criteria during implementation, and producing documentation for ongoing understanding. The FSM JSON is canonical; diagrams are derived.

**Decision registry.** Architectural decisions are captured in ADRs alongside specifications. Context is preserved, not lost to chat history.

---

## Resumable Workflow

Stop anytime with `tasker stop`, resume with `tasker resume`. Checkpoints are created before each batch; result files track every task outcome; git commits mark progress. Work survives interruptions.



## Links

- [GitHub](https://github.com/Dowwie/tasker)
- [Original Tweet](https://x.com/darin_gordon/status/2012907385669492862)
