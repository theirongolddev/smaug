---
title: defib - System Defibrillator
type: tool
date_added: 2026-01-31
source: https://github.com/alexknowshtml/defib
tags: [monitoring, DevOps, system-health, Docker, auto-recovery]
via: Twitter bookmark from @alexhillman
---

# defib: System Defibrillator

Automated system monitoring and recovery tool for container-based applications.

## Purpose

Monitors system health and automatically recovers from common failure modes:
- Container health check failures
- Runaway processes (high CPU/memory)
- System swap pressure
- Stuck D-state processes

## Core Monitoring Commands

### `defib container`
- Watches HTTP health endpoints
- Auto-restarts containers via docker-compose/podman-compose
- Configurable timeout and response time limits

### `defib processes`
- Scans for runaway processes
- Auto-kills processes matching safe-to-kill patterns
- Ignores critical processes (postgres, etc.)
- Configurable CPU/memory thresholds

### `defib system`
- Monitors swap pressure
- Detects stuck D-state processes
- Kills memory hogs when swap critical
- Restarts services to free memory

## Action Modes

- **Report:** Send alerts only
- **Execute:** Auto-execute safe commands
- **Prompt:** Ask permission for each action

## Configuration

Works with config files for complex setups. Discord webhook integration for notifications.

## Safety

- Doesn't run as root
- Designed for single-user systems
- Pattern-based safe-to-kill lists
- Test patterns before enabling auto-kill

## Tech

- TypeScript
- Works with Docker or Podman
- Integrates with Anthropic/OpenAI/Ollama for AI-enhanced diagnosis
