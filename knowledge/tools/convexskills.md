---
title: "convexskills"
type: tool
date_added: 2026-02-09
source: "https://github.com/waynesutton/convexskills/blob/main/skills/avoid-feature-creep/SKILL.md"
stars: 299
language: "JavaScript"
tags: ["ai", "backend", "claude", "claude-skills", "convex", "database", "skills"]
via: "Twitter bookmark from @waynesutton"
---

Collection of reusable AI agent skills for building production-ready applications with Convex, a TypeScript-first backend framework. Provides structured guidance for implementing best practices, including avoiding feature creep, managing database schemas, handling file uploads, and building real-time features. Installable via npm and compatible with Claude Code, Codex, and other AI agent platforms.

## Key Takeaways

- **Production-ready skills**: Pre-built patterns that help AI generate code passing ESLint and Convex conventions automatically
- **Modular architecture**: Skills cover discrete development concerns (queries/mutations, schemas, cron jobs, file storage, real-time, agents)
- **Multiple deployment paths**: Installable globally via npm, per-project, or symlinked for automatic updates
- **Tooling integration**: Works with Claude Code, Codex, OpenCode, and standard .agents/skills discovery
- **Active maintenance**: Includes feature-creep avoidance skill mentioned in Jan 2026 tweet as major release

## README

# For official Convex Skills use Convex Agent Plugins

Official Convex plugins for AI coding agents, providing development tools for building reactive backends with TypeScript.

https://github.com/get-convex/convex-agent-plugins


## Convex (unofficial) Skills 

[![npm version](https://img.shields.io/npm/v/@waynesutton/convex-skills.svg)](https://www.npmjs.com/package/@waynesutton/convex-skills)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

A collection of AI-consumable skills for building production-ready applications with [Convex](https://convex.dev), following the Agent Skills open format.

## Overview

This repository contains skills that help AI assistants understand and implement Convex best practices. Each skill provides structured guidance for specific aspects of Convex development.

## Code Quality

All skills are designed to produce code that passes @convex-dev/eslint-plugin by default. This creates a complementary workflow:

- **Skills** prevent mistakes at generation time
- **ESLint** catches anything that slips through at build time

See the Code Quality section in [convex-best-practices](/skills/convex-best-practices/SKILL.md) for setup instructions.

## Installation

### npm (recommended)

```bash
# Install globally for CLI access
npm install -g @waynesutton/convex-skills

# List available skills
convex-skills list

# Install a specific skill to your project
convex-skills install convex-best-practices

# Install all skills
convex-skills install-all

# Install all skills to .agents/skills
convex-skills install-all --target agents

# Symlink SKILL.md files instead of copying
convex-skills install-all --target agents --link

# Install templates (CLAUDE.md + skill templates)
convex-skills install-templates
```

Or use npx without installing:

```bash
npx @waynesutton/convex-skills list
npx @waynesutton/convex-skills install-all
```

### Programmatic Usage

```bash
npm install @waynesutton/convex-skills
```

```javascript
import { listSkills, getSkill, SKILLS } from "@waynesutton/convex-skills";

// List all skills
console.log(listSkills());

// Get a specific skill's content
const content = getSkill("convex-best-practices");
```

### Claude Code (from local clone)

```bash
git clone https://github.com/waynesutton/convexskills.git
cd convexskills
# Point Claude Code to this directory
```

### Codex

Follow the Codex skills guide and place the skill under `$CODEX_HOME/skills`:

```bash
# From the repo root
# Defaults to ~/.codex if CODEX_HOME is unset
cp -r skills/convex-best-practices "$CODEX_HOME/skills/"
```

Codex will auto-discover `SKILL.md` files in that directory on the next start.

If you are working from a repo clone, Codex also auto-discovers skills from `.codex/skills` at the repo root. You can symlink this repo’s `skills/*` into `.codex/skills` so updates flow through without copying.

### Standard Agent Skills Path

Some tools are standardizing on `.agents/skills` for discovery. This repo supports that layout via the CLI:

```bash
convex-skills install-all --target agents
convex-skills install-all --target agents --link
```

### OpenCode

OpenCode discovers skills from `~/.claude/skills/<name>/SKILL.md` automatically. See OpenCode Skills docs for more details.

#### Slash Command

This repo includes a `/convex` slash command for OpenCode. Install the command by copying `command/convex.md` to your OpenCode commands directory:

```bash
# Copy the slash command
cp command/convex.md ~/.opencode/command/

# Usage in OpenCode
/convex create a schema with users and posts
/convex set up file uploads
/convex add a Stripe webhook endpoint
```

The slash command provides decision trees to route to the appropriate skill based on your task.

### Manual Installation

Copy the desired skill's `SKILL.md` file to your project's `.claude/skills/` directory.

## Available Skills

| Skill                                                                    | Description                                           |
| ------------------------------------------------------------------------ | ----------------------------------------------------- |
| [convex-best-practices](skills/convex-best-practices/SKILL.md)           | Guidelines for building production-ready Convex apps  |
| [convex-functions](skills/convex-functions/SKILL.md)                     | Writing queries, mutations, actions, and HTTP actions |
| [convex-realtime](skills/convex-realtime/SKILL.md)                       | Patterns for building reactive applications           |
| [convex-schema-validator](skills/convex-schema-validator/SKILL.md)       | Database schema definition and validation             |
| [convex-file-storage](skills/convex-file-storage/SKILL.md)               | File upload, storage, and serving                     |
| [convex-agents](skills/convex-agents/SKILL.md)                           | Building AI agents with Convex                        |
| [convex-cron-jobs](skills/convex-cron-jobs/
...[truncated]

## Links

- [GitHub](https://github.com/waynesutton/convexskills/blob/main/skills/avoid-feature-creep/SKILL.md)
- [Original Tweet](https://x.com/waynesutton/status/2012646729590395205)
