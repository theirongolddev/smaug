---
title: "drawbridge"
type: tool
date_added: 2026-02-09
source: "https://github.com/alexknowshtml/drawbridge"
stars: 34
language: "TypeScript"
tags: ["claude-code", "excalidraw", "diagram-generation", "visualization", "skill", "typescript"]
via: "Twitter bookmark from @alexhillman"
---

Drawbridge is a Claude Code skill + real-time diagram server that lets you ask Claude to draw flowcharts, architecture diagrams, and dependency maps—and watch them appear live on an Excalidraw canvas in your browser. The server uses Express + WebSocket; the browser uses Excalidraw; Claude pushes simplified "skeleton" elements via HTTP that the browser converts to full Excalidraw elements with proper rendering.

## Key Features

- **Real-time visualization.** Push elements via HTTP POST and watch them appear live in browser via WebSocket.
- **Claude Code integration.** Includes a ready-to-use Claude Code skill that teaches Claude the element format, color palette, sizing rules, and drawing order.
- **Progressive streaming.** Supports append mode to build diagrams incrementally as Claude generates elements.
- **Full render suite.** Supports text-to-diagram conversion, multi-image composition, and rendering to PNG/SVG.
- **Persistence.** Optional DigitalOcean Spaces integration for image persistence across sessions.
- **Simple API.** HTTP endpoints for replacing all elements or appending new ones; WebSocket for real-time updates.
- **Container-ready.** Podman Compose and systemd deployment options included.

## Full Content

# Drawbridge

**A Claude Code skill + real-time diagram server.** Ask Claude to draw a flowchart, architecture diagram, or dependency map — and watch it appear live on an Excalidraw canvas in your browser.

![Drawbridge demo — elements appearing in real-time as an AI pushes them](demo.gif)

## Table of Contents

- [Using with Claude Code](#using-with-claude-code)
- [How It Works](#how-it-works)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Element Format](#element-format)
- [Color Palette](#color-palette)
- [Sizing Rules](#sizing-rules)
- [Drawing Order](#drawing-order)
- [Complete Examples](#complete-examples)
- [Rendering to PNG/SVG](#rendering-to-pngsvg)
- [Persistence](#persistence)
- [Frontend Features](#frontend-features)
- [Architecture](#architecture)
- [Credits](#credits)

## Using with Claude Code

Drawbridge includes a ready-to-use Claude Code skill that teaches Claude how to generate and push diagrams. Once installed, Claude will automatically use Drawbridge when you ask for flowcharts, architecture diagrams, dependency maps, or any visual diagram.

### Install the Skill

Copy the skill file into your project's `.claude/skills/` directory:

```bash
# From your project root
mkdir -p .claude/skills/drawbridge
cp /path/to/drawbridge/skills/SKILL.md .claude/skills/drawbridge/SKILL.md
```

Or if you cloned the repo:

```bash
mkdir -p .claude/skills/drawbridge
cp drawbridge/skills/SKILL.md .claude/skills/drawbridge/SKILL.md
```

### What the Skill Includes

- Complete element format reference (labeled shapes, arrows, bindings, zones)
- Color palette with semantic meanings
- Sizing rules and font minimums
- Drawing order for progressive streaming
- Full examples (connected boxes, multi-tier architecture)
- Render-to-PNG/SVG workflow

### Try It

After installing the skill, ask Claude:

> "Draw a diagram of a three-tier web architecture"

Claude will push elements to your Drawbridge server and they'll appear live in your browser.

## How It Works

```
AI / Script ──HTTP POST──> Drawbridge Server ──WebSocket──> Browser (Excalidraw)
```

1. **Server** runs Express (HTTP API) + WebSocket on configurable ports
2. **Browser** loads Excalidraw and connects via WebSocket to a session
3. **AI/Script** pushes simplified "skeleton" elements via HTTP — the browser converts them to full Excalidraw elements using `convertToExcalidrawElements` with proper font loading and text measurement
4. Elements appear in real-time on every connected browser

## Quick Start

```bash
git clone https://github.com/alexknowshtml/drawbridge.git
cd drawbridge
npm install
npm run build
npm start           # Starts API server on :3062, WebSocket on :3061
npx serve dist      # Serve the frontend on :3000 (or any static file server)
```

Open `http://localhost:3000/#my-session` in a browser, then push elements:

```bash
curl -X POST http://localhost:3062/api/session/my-session/elements \
  -H "Content-Type: application/json" \
  -d '{
    "elements": [
      { "type": "rectangle", "id": "b1", "x": 100, "y": 100, "width": 200, "height": 80,
        "roundness": { "type": 3 }, "backgroundColor": "#a5d8ff", "fillStyle": "solid",
        "label": { "text": "Hello World", "fontSize": 20 } }
    ]
  }'
```

## Configuration

| Environment Variable | Default | Description |
|---|---|---|
| `DRAWBRIDGE_PORT` | `3062` | HTTP + WebSocket port |
| `DRAWBRIDGE_DATA_DIR` | `./data` | Directory for persistent session data |
| `DO_SPACES_ACCESS_KEY` | — | DigitalOcean Spaces access key (enables image storage) |
| `DO_SPACES_SECRET_KEY` | — | DigitalOcean Spaces secret key |
| `DO_SPACES_BUCKET` | — | Spaces bucket name |
| `DO_SPACES_REGION` | `nyc3` | Spaces region |

HTTP API and WebSocket run on the same port. The frontend auto-detects: on HTTPS (production), it connects to the same origin; on HTTP (local dev via Vite), it connects to port 3062.

When the `DO_SPACES_*` variables are set, images dropped onto the canvas are uploaded to DO Spaces and persist across page refreshes. Without them, the server runs fine but images are ephemeral (lost on reload).

### Container Deployment

```bash
podman-compose up -d   # Builds and starts on port 5050
```

Or with systemd for auto-restart on boot:

```bash
systemctl --user enable drawbridge.service
systemctl --user start drawbridge.service
```

## API Reference

### Sessions

Sessions are created automatically when you first push elements to a session ID. Session IDs come from the URL hash: `http://host/#session-name`.

#### `POST /api/session/:id/elements`

Replace all elements in a session.

```bash
curl -X POST http://localhost:3062/api/session/demo/elements \
  -H "Content-Type: application/json" \
  -d '{"elements": [...]}'
```

#### `POST /api/session/:id/append`

Add elements to existing canvas (progressive drawing).

```bash
curl -X POST http://localhost:3062/api/session/demo/append \
  -H "Content-Type: application/json" \
  -d '{"elements": [..
...[truncated]

## Links

- [GitHub](https://github.com/alexknowshtml/drawbridge)
- [Original Tweet](https://x.com/alexhillman/status/2020606762471374982)
