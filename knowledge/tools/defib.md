---
title: "defib"
type: tool
date_added: 2026-02-09
source: "https://github.com/alexknowshtml/defib"
stars: 10
language: "TypeScript"
tags: ["monitoring", "health-checks", "process-management", "container-health", "devops", "system-reliability", "auto-recovery"]
via: "Twitter bookmark from @alexhillman"
---

## Summary

System defibrillator that monitors container health, runaway processes, and swap pressure, with intelligent auto-recovery capabilities. Three monitoring modes: `container` (HTTP health endpoints), `processes` (CPU/memory overages), `system` (swap pressure + D-state processes). Integrates Claude for diagnosis and recovery decisions with multiple action modes (alert-only, ask-permission, auto-recover).

## Key Takeaways

- **Three monitoring modes**: Container health (HTTP endpoint), process runaway (CPU/memory thresholds), system pressure (swap, D-state processes)
- **Action modes**: Alert-only (Discord/Telegram notification), ask-permission (copy-paste commands), auto-recover (execute safe operations automatically)
- **Configuration**: Dry-run mode, persistent config files, process safe-to-kill patterns, swap thresholds, backoff cooldowns
- **AI integration**: Claude analyzes failures and generates recovery commands; more complex decisions can route to Opus 4.5 via hook
- **Use case**: Running automated agents (Claude Code, etc.) on servers where memory/CPU/disk pressure can cause cascading failures
- **Safety**: Designed for single-operator systems, not multi-user machines; requires testing before enabling auto-kill

## README

# defib 🫀

**System defibrillator** - monitors health and auto-recovers from common failure modes.

When your containers stop responding, processes go runaway, or swap pressure threatens to freeze your system - defib detects the problem and fixes it automatically.

Works with **Docker** or **Podman** (auto-detects).

> ⚠️ **Safety First**: defib kills processes and restarts services. Don't run as root. Don't use on multi-user systems. Test patterns before enabling auto-kill. [Full security guide →](#security-considerations)

### Example: Discord notification when defib auto-handles a swap pressure event

![Discord notification showing defib auto-handling a swap pressure event](docs/discord-notification-example.png)

## What It Does

defib has three monitoring commands, each targeting a different failure mode:

- **`defib container`** - Watches an HTTP health endpoint. If it stops responding, restarts the container via docker-compose/podman-compose.
- **`defib processes`** - Scans for runaway processes (high CPU or memory). Auto-kills processes that match your safe-to-kill patterns.
- **`defib system`** - Monitors swap pressure and stuck (D-state) processes. Can kill memory hogs or restart services to recover.
- **`defib all`** - Runs all three. Best used with a config file.

## Installation

```bash
# Requires Bun (https://bun.sh)
curl -fsSL https://bun.sh/install | bash

# Clone and run
git clone https://github.com/alexknowshtml/defib.git
cd defib
```

## Quick Start

```bash
# Monitor a container - restart if health check fails
bun run defib.ts container --health http://localhost:8000/health --compose-dir /home/deploy/my-app

# Monitor processes - kill runaway worker processes
bun run defib.ts processes --safe-to-kill "node /app/worker" --ignore "postgres"

# Monitor system - restart app when swap gets critical
bun run defib.ts system --swap-kill "leaky-app" --swap-restart-dir /home/deploy/my-app

# Monitor everything
bun run defib.ts all --config ./defib.config.json
```

## Commands

### `defib container`

Monitors container health via HTTP endpoint. If the endpoint stops responding or responds too slowly, defib restarts the container via docker-compose/podman-compose.

```bash
bun run defib.ts container \
  --health http://localhost:8000/health \
  --compose-dir /home/deploy/my-app \
  --timeout 10 \
  --max-response 15 \
  --backoff 10 \
  --service web
```

**Options:**
| Flag | Default | Description |
|------|---------|-------------|
| `--health <url>` | required | Health endpoint URL |
| `--compose-dir <path>` | required | Directory with docker-compose.yml |
| `--timeout <sec>` | 10 | Health check timeout |
| `--max-response <sec>` | 15 | Max acceptable response time |
| `--backoff <min>` | 10 | Cooldown between restart attempts |
| `--service <name>` | - | Specific service to restart |

### `defib processes`

Monitors for runaway processes. When a process exceeds CPU or memory thresholds for too long, defib can automatically kill it if it matches a safe-to-kill pattern.

```bash
bun run defib.ts processes \
  --cpu-threshold 80 \
  --memory-threshold 2000 \
  --max-runtime 2 \
  --safe-to-kill "node mcp-" \
  --safe-to-kill "python worker" \
  --ignore "postgres" \
  --ignore "ollama"
```

**Options:**
| Flag | Default | Description |
|------|---------|-------------|
| `--cpu-threshold <pct>` | 80 | CPU % to flag as runaway |
| `--memory-threshold <mb>` | 2000 | Memory MB to flag |
| `--max-runtime <hours>` | 2 | Hours at high CPU before action |
| `--safe-to-kill <pattern>` | - | Process patterns safe to auto-kill (repeatable) |
| `--ignore <pattern>` | - | Process patterns to skip (repeatable) |

### `defib system`

Monitors system health: swap pressure and stuck processes (D-state). When swap gets critical, defib can kill specified processes or restart a service to free memory.

```bash
bun run defib.ts system \
  --swap-threshold 80 \
  --swap-kill "electron" \
  --swap-kill "chrome" \
  --swap-restart-dir /home/deploy/my-app \
  --swap-restart-service web
```

**Options:**
| Flag | Default | Description |
|------|---------|-------------|
| `--swap-threshold <pct>` | 80 | Swap % to trigger action |
| `--swap-kill <pattern>` | - | Process patterns to kill when swap critical (repeatable) |
| `--swap-restart-dir <path>` | - | Compose dir to restart when swap critical |
| `--swap-restart-service <n>` | - | Specific service to restart |
| `--no-dstate` | false | Disable D-state monitoring |

### `defib all`

Runs all monitors. Best used with a config file for complex setups.

```bash
bun run defib.ts all --config ./defib.config.json
```

### `defib dismiss`

Suppress alerts for a specific process. Use this when you've investigated a process and decided it's fine.

```bash
bun run defib.ts dismiss 12345
```

The process will not be re-alerted until it exits and a new process takes its PID.

## Action Modes

defib has three action modes that control how it responds to issues:

| Mode | Behavior |
|--
...[truncated]

## Links

- [GitHub](https://github.com/alexknowshtml/defib)
- [Original Tweet](https://x.com/alexhillman/status/2017636722738180598)
