---
title: "beads_viewer"
type: tool
date_added: 2026-02-09
source: "https://github.com/Dicklesworthstone/beads_viewer"
stars: 1233
language: "Go"
tags: []
via: "Twitter bookmark from @nummanali"
---

<!-- NEEDS_ANALYSIS: description, key_features, tags -->

## README

# Beads Viewer (bv)

![Release](https://img.shields.io/github/v/release/Dicklesworthstone/beads_viewer?style=for-the-badge&color=bd93f9)
![Go Version](https://img.shields.io/github/go-mod/go-version/Dicklesworthstone/beads_viewer?style=for-the-badge&color=6272a4)
![License](https://img.shields.io/badge/License-MIT-50fa7b?style=for-the-badge)
![Build Status](https://img.shields.io/github/actions/workflow/status/Dicklesworthstone/beads_viewer/ci.yml?style=for-the-badge&logo=github)
[![Coverage](https://codecov.io/gh/Dicklesworthstone/beads_viewer/branch/main/graph/badge.svg)](https://codecov.io/gh/Dicklesworthstone/beads_viewer)

> **The elegant, keyboard-driven terminal interface for the [Beads](https://github.com/steveyegge/beads) issue tracker.**

<div align="center" style="margin: 1.2em 0;">
  <table>
    <tr>
      <td align="center" style="padding: 8px;">
        <img src="screenshots/screenshot_01__main_screen.webp" alt="Main split view" width="420" />
        <div><sub>Main split view: fast list + rich details</sub></div>
      </td>
      <td align="center" style="padding: 8px;">
        <img src="screenshots/screenshot_03__kanban_view.webp" alt="Kanban board" width="420" />
        <div><sub>Kanban board (`b`) for flow at a glance</sub></div>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 8px;">
        <img src="screenshots/screenshot_02__insights_view.webp" alt="Insights view" width="420" />
        <div><sub>Insights panel: PageRank, critical path, cycles</sub></div>
      </td>
      <td align="center" style="padding: 8px;">
        <img src="screenshots/screenshot_04__graph_view.webp" alt="Graph view" width="420" />
        <div><sub>Graph view (`g`): navigate the dependency DAG</sub></div>
      </td>
    </tr>
  </table>
</div>

## Installation

### Recommended: Homebrew (macOS/Linux)

```bash
brew install dicklesworthstone/tap/bv
```

This method provides:
- Automatic updates via `brew upgrade`
- Dependency management
- Easy uninstall via `brew uninstall`

### Windows: Scoop

```powershell
scoop bucket add dicklesworthstone https://github.com/Dicklesworthstone/scoop-bucket
scoop install dicklesworthstone/bv
```

### Alternative: Direct Download

Download the latest release for your platform (tar.gz assets):
- [Linux x86_64](https://github.com/Dicklesworthstone/beads_viewer/releases/latest/download/bv_0.13.0_linux_amd64.tar.gz)
- [Linux ARM64](https://github.com/Dicklesworthstone/beads_viewer/releases/latest/download/bv_0.13.0_linux_arm64.tar.gz)
- [macOS Intel](https://github.com/Dicklesworthstone/beads_viewer/releases/latest/download/bv_0.13.0_darwin_amd64.tar.gz)
- [macOS ARM](https://github.com/Dicklesworthstone/beads_viewer/releases/latest/download/bv_0.13.0_darwin_arm64.tar.gz)
- [Windows](https://github.com/Dicklesworthstone/beads_viewer/releases/latest/download/bv_0.13.0_windows_amd64.tar.gz)

> Note: Asset names include the release version. If a link 404s, open the latest release page and download the matching asset.

### Alternative: Install Script

**Linux/macOS:**
```bash
curl -fsSL "https://raw.githubusercontent.com/Dicklesworthstone/beads_viewer/main/install.sh?$(date +%s)" | bash
```

**Windows (PowerShell):**
```powershell
irm "https://raw.githubusercontent.com/Dicklesworthstone/beads_viewer/main/install.ps1" | iex
```
> **Note:** Windows requires Go 1.21+ ([download](https://go.dev/dl/)). For best display, use Windows Terminal with a [Nerd Font](https://www.nerdfonts.com/).

---

## 🤖 Agent Quickstart (Robot Mode)

⚠️ **Never run bare `bv` in an agent context** — it launches the interactive TUI. Always use `--robot-*`.

```bash
# 1) Start with triage (single-call mega-command)
bv --robot-triage

# 2) Minimal mode: just the top pick + claim command
bv --robot-next

# 3) Token-optimized output (TOON)
bv --robot-triage --format toon
export BV_OUTPUT_FORMAT=toon

# 4) Full robot help
bv --robot-help
```

**Output conventions**
- stdout = JSON/TOON data only
- stderr = diagnostics
- exit 0 = success

## 💡 TL;DR

`bv` is a high-performance **Terminal User Interface (TUI)** for browsing and managing tasks in projects that use the **Beads** issue tracking system. 

**Why you'd care:**
*   **Speed:** Browse thousands of issues instantly with zero network latency.
*   **Focus:** Stay in your terminal and use Vim-style keys (`j`/`k`) to navigate.
*   **Intelligence:** It visualizes your project as a **dependency graph**, automatically highlighting bottlenecks, cycles, and critical paths that traditional list-based trackers miss.
*   **AI-Ready:** It provides structured, pre-computed insights for AI coding agents, acting as a "brain" for your project's task management.

---

## 📖 The Core Experience

At its heart, `bv` is about **viewing your work nicely**.

### ⚡ Fast, Fluid Browsing
No web page loads, no heavy clients. `bv` starts instantly and lets you fly through your issue backlog using standard Vim keys (`j`/`k`).
*   **Split-View Dashboard:** On wider s
...[truncated]

## Links

- [GitHub](https://github.com/Dicklesworthstone/beads_viewer)
- [Original Tweet](https://x.com/nummanali/status/1997643423059259826)
