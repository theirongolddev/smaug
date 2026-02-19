---
title: "storage_ballast_helper"
type: tool
date_added: 2026-02-18
source: "https://github.com/Dicklesworthstone/storage_ballast_helper"
stars: 3
language: "Rust"
tags: [rust, ai-agents, disk-management, daemon, devops, automation]
via: "Twitter bookmark from @doodlestein"
---

Doodlestein's storage_ballast_helper (`sbh`) is a Rust daemon addressing disk-full failures in AI agent swarms through predictive PID control, ballast pool management, and deterministic artifact scoring with hard safety vetoes. The tool monitors disk pressure, predicts exhaustion before critical levels, and safely reclaims space while protecting critical projects and open files.

## Key Takeaways

- AI agent swarms can fill disks faster than humans can react, requiring predictive rather than reactive monitoring
- PID controller + EWMA provides anticipatory pressure management instead of fixed-schedule cron cleanup
- Ballast pools pre-allocate space on each filesystem under pressure, enabling safe cleanup without write failures
- Hard safety vetoes (.git, protected paths, recent files, open files) prevent accidental cleanup of critical data
- Zero-write emergency mode recovers from 100% full disks without requiring additional disk writes for tools
- Deterministic artifact scoring ensures identical inputs produce identical ranking for reproducible cleanup decisions
- Shadow → canary → enforce deployment modes with automatic fallback provide safe production rollout

## README

# storage_ballast_helper (`sbh`)

<div align="center">
  <img src="sbh_illustration.webp" alt="sbh - Storage Ballast Helper illustration">
</div>

```bash
curl -fsSL https://raw.githubusercontent.com/Dicklesworthstone/storage_ballast_helper/main/install.sh | bash
```

Cross-platform disk-pressure defense for AI coding workloads: predictive monitoring, safe cleanup, ballast release, and explainable policy decisions.

## TL;DR

**The problem:** agent swarms and build systems can fill disks faster than humans can react, causing failed builds, stuck daemons, and crashed workflows.

**The solution:** `sbh` continuously monitors storage pressure, predicts exhaustion, and safely reclaims space using layered controls: ballast pools, deterministic artifact scoring, hard safety vetoes, and conservative fallback modes.

### Why Use `sbh`?

| Capability | What it gives you |
| --- | --- |
| Predictive pressure control | EWMA + PID reacts before disks hit critical levels |
| Multi-volume ballast pools | Frees space on the exact filesystem under pressure |
| Safe artifact cleanup | Deterministic scoring + hard vetoes (`.git`, protected paths, too-recent files, open files) |
| Zero-write emergency mode | Recover from near-100% full disks without needing DB/config writes |
| Project protection | `.sbh-protect` markers and config globs prevent accidental cleanup in critical repos |
| Explainable decisions | Evidence ledger + `sbh explain` shows why each action happened |
| Strong observability | `status`, `dashboard`, `stats`, `blame`, structured logs, and decision traces |
| Production rollout safety | Shadow -> canary -> enforce modes with automatic fallback and guardrails |

## Quick Example

```bash
# 1) Install and bootstrap service
sbh install --systemd

# 2) Provision per-volume ballast pools
sbh ballast provision

# 3) Protect critical projects from cleanup
sbh protect /data/projects/critical-app

# 4) Inspect pressure and forecast
sbh check --target-free 15
sbh status --json

# 5) Run cleanup scan and review candidates
sbh scan /data/projects --top 20 --min-score 0.70

# 6) Execute safe cleanup with confirmation
sbh clean --target-free 20

# 7) Investigate decisions and trends
sbh explain --id <decision-id>
sbh stats --window 24h
sbh blame --json

# 8) Emergency recovery (zero-write mode)
sbh emergency /data --target-free 10 --yes
```

## Design Principles

1. **Safety before aggressiveness:** hard vetoes always win over reclaim pressure.
2. **Predict, then act:** pressure trends and controller outputs drive timing and scope.
3. **Deterministic decisions:** identical inputs produce identical ranking and policy outcomes.
4. **Explainability is mandatory:** every action has traceable evidence and rationale.
5. **Fail conservative:** policy/guard failures force fallback-safe behavior.

### Implementation Constraints

`sbh` enforces several hard constraints that shape the codebase:

- **`#![forbid(unsafe_code)]`** in both `lib.rs` and `main.rs`. No unsafe blocks, no raw pointer arithmetic, no manual memory management. All platform-specific behavior goes through safe abstractions (`nix`, `libc` bindings, `signal-hook`).
- **No async runtime.** Concurrency uses OS threads with `crossbeam-channel` for bounded message passing and `parking_lot` for synchronization. This avoids the complexity and debugging opacity of async runtimes while providing predictable scheduling behavior for a daemon that needs to respond to pressure signals in bounded time.
- **Pedantic + nursery Clippy lints** are enabled project-wide. The code is held to strict Rust idiom standards beyond the default warning set.
- **Deterministic builds.** The release profile uses `opt-level = "z"` (size optimization), `lto = true` (link-time optimization), `codegen-units = 1`, `panic = "abort"`, and `strip = true` for a lean, predictable binary.

## The Problem in Depth

AI coding agents (Claude Code, Codex, Gemini CLI, etc.) spawn parallel build processes, download dependencies, generate intermediate artifacts, and write logs continuously. A single agent can produce gigabytes of build artifacts per hour. Run a dozen agents across multiple projects on the same machine, and disk consumption becomes unpredictable and bursty in ways that traditional monitoring tools were never designed for.

The failure mode is severe: when a disk hits 100%, everything breaks simultaneously. Builds fail mid-compilation, SQLite databases corrupt, daemon state files can't be written, and even basic shell operations stop working. Recovery from a completely full disk is painful because most cleanup tools themselves need to write temporary files.

Existing solutions fall short in specific ways:

- **Cron + rm scripts** are fragile, have no pressure awareness, and can't distinguish a 2-hour-old build artifact from a 2-hour-old source file. They run on fixed schedules regardless of whether the disk is at 10% or 99%.
- **Generic temp cleaners** (tmpreaper, systemd-tmpfiles) only handle `/t
...[truncated]

## Links

- [GitHub](https://github.com/Dicklesworthstone/storage_ballast_helper)
- [Original Tweet](https://x.com/doodlestein/status/2023626632657805407)
