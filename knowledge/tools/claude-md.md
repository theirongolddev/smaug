---
title: "Claude Code System Prompt Overrides (CLAUDE.md)"
type: tool
date_added: 2026-03-31
source: "https://github.com/iamfakeguru/claude-md"
tags: ["ai-agents", "prompt-engineering", "claude-code", "system-prompts", "production"]
via: "Twitter bookmark from @iamfakeguru"
---

Production-grade CLAUDE.md configuration that overrides Claude Code's system prompts to enable verification loops, multi-agent coordination, context management, and forced code quality verification.

Reverse-engineered from Claude Code's internal implementation, this configuration enables features gated to Anthropic employees by default, including post-edit verification, sub-agent swarming, and proper context decay management.

## Key Features

- **Forced Verification**: Mandatory type-checking and linting before claiming success (overrides 29-30% false-claim rate)
- **Sub-Agent Swarming**: Parallel agent deployment for tasks >5 files (835K tokens of working memory vs. 167K sequential)
- **Context Decay Awareness**: File re-reads after 10+ messages to prevent stale edits
- **File Read Budgeting**: Chunked reads for files >500 LOC to prevent truncation blindness
- **Edit Integrity**: Before/after read verification to catch silent failures
- **No Semantic Search**: Explicit multi-pass searches (direct calls, types, strings, imports, re-exports, tests)
- **Step 0 Cleanup**: Dead code removal before refactors to reduce context compaction triggers

## Core Rules

1. **Dead Code First**: Strip unused imports/exports/props before structural refactors
2. **Phased Execution**: Max 5 files per phase, explicit approval between phases
3. **Senior Dev Override**: Fix all architectural issues a perfectionist would reject
4. **Multi-Agent Strategy**: Batch large tasks into 5-8 file groups, launch in parallel
5. **Tool Result Blindness**: Re-run narrower searches if results seem truncated

## Links

- [GitHub Repository](https://github.com/iamfakeguru/claude-md)
- [Original Twitter Thread](https://x.com/iamfakeguru/status/2039076558686531761)

## Implementation Notes

Drop this file into your project root as `.claude/CLAUDE.md` to activate. The configuration overrides default system prompts and forces employee-grade output standards including mandatory verification loops and proper error handling before completion claims.
