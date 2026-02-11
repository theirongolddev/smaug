---
title: "claude-code-semantic-memory"
type: tool
date_added: 2026-02-09
source: "https://github.com/zacdcook/claude-code-semantic-memory"
stars: 72
language: "Shell"
tags: ["claude-code", "memory-systems", "hooks", "semantic-search", "context-management", "persistence"]
via: "Twitter bookmark from @PerceptualPeak"
---

## Summary

A persistent memory system for Claude Code that extracts learnings from past sessions and injects relevant context on every prompt. The system converts transcripts to markdown, extracts learnings using Claude sub-agents, embeds them locally with nomic-embed-text, and injects relevant memories via pre-configured hooks that fire during prompts and tool execution. Includes a memory daemon, transcript conversion tools, and hooks for UserPromptSubmit and PreToolUse stages.

## Key Takeaways

- **Persistent Memory Across Sessions**: Solves the problem of Claude forgetting solutions, gotchas, infrastructure details, and decisions between sessions
- **Hook-Based Architecture**: Uses SessionStart, UserPromptSubmit, PreToolUse, and PreCompact hooks to seamlessly inject memories
- **Cosine Similarity Matching**: Queries the daemon with embeddings to find top 3 most relevant memories (≥0.45 similarity threshold)
- **Real-Time Thinking Analysis**: PreToolUse hook extracts Claude's thinking blocks to detect workflow drift and inject corrective memories mid-workflow
- **Local Embedding Model**: Uses Ollama with nomic-embed-text for privacy and speed (embeddings run on-device)
- **Daemon Architecture**: Python server on port 8741 provides /store and /recall endpoints for managing memories

## README

# Claude Code Semantic Memory System

A persistent memory system for Claude Code that extracts learnings from past sessions and injects relevant context on every prompt.

## The Problem

Claude Code sessions are stateless by default. Every time context compacts or you start a new session, Claude forgets:
- Solutions you already discovered together
- Gotchas and traps you identified
- Your infrastructure details and preferences
- Decisions you made and why

This leads to repeated mistakes, redundant conversations, and lost productivity.

## The Solution

This system gives Claude **persistent memory** across sessions:

1. **Convert** your `.jsonl` transcripts to readable markdown
2. **Extract** learnings using Claude sub-agents that process transcripts
3. **Embed** learnings with a local embedding model (nomic-embed-text)
4. **Inject** relevant memories via Claude Code hooks that fire on every prompt

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Your Prompt    │────►│  Hook Fires     │────►│  Query Daemon   │
│                 │     │  (mechanical)   │     │  (cosine sim)   │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Claude sees    │◄────│  Inject as XML  │◄────│  Top 3 memories │
│  context + mem  │     │  in context     │     │  (≥0.45 sim)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (for transcript conversion)
- [Ollama](https://ollama.com/) (for local embeddings)
- Python 3.8+ (for the memory daemon)
- Claude Code CLI

### 1. Install Dependencies

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull the embedding model
ollama pull nomic-embed-text

# Clone this repo
git clone https://github.com/zacdcook/claude-code-semantic-memory.git
cd claude-code-semantic-memory
```

### 2. Convert Your Transcripts

Claude Code stores session transcripts as `.jsonl` files in `~/.claude/projects/`. Convert them to readable markdown:

```bash
node scripts/jsonl-to-markdown.js ~/.claude/projects/ ./converted-transcripts/
```

This extracts user messages, assistant messages (including thinking blocks), and system prompts. Tool calls and results are stripped for cleaner extraction.

### 3. Extract Learnings

Start a new Claude Code session and use the extraction prompt:

```bash
claude
```

Then paste the contents of `prompts/extract-learnings.md`. Claude will:

1. List all `.md` files in your converted transcripts folder
2. Dispatch sub-agents in parallel to process batches
3. Each sub-agent extracts structured learnings
4. Store learnings via the daemon's `/store` endpoint
5. Output to `~/extracted-learnings.jsonl`

### 4. Start the Memory Daemon

```bash
cd daemon
pip install -r requirements.txt
python server.py
```

The daemon runs on port 8741 and provides:
- `POST /store` - Embed and store a learning
- `POST /recall` - Query for relevant memories
- `GET /health` - Health check

### 5. Import Your Learnings

```bash
python scripts/import-learnings.py ~/extracted-learnings.jsonl
```

### 6. Install the Hooks

Copy all hooks to your Claude Code hooks directory:

```bash
# Session initialization
cp hooks/session-start.sh ~/.claude/hooks/SessionStart.sh

# Memory injection on prompts
cp hooks/user-prompt-submit.sh ~/.claude/hooks/UserPromptSubmit.sh

# Memory injection during iteration
cp hooks/pre-tool-use.sh ~/.claude/hooks/PreToolUse.sh

# Auto-export on compaction
cp hooks/pre-compact.sh ~/.claude/hooks/PreCompact.sh

# Make executable
chmod +x ~/.claude/hooks/*.sh
```

Now:
- Every prompt automatically queries memory and injects relevant learnings
- During iteration, Claude's thinking is analyzed for additional relevant memories
- When context compacts, the transcript is exported and a sub-agent extracts learnings

---

## Architecture

### Hook Lifecycle

```
SESSION START
════════════
┌─────────────────┐
│  SessionStart   │ → Check daemon health
│                 │ → Warn about orphaned transcripts
└────────┬────────┘
         │
ACTIVE WORK (repeats for each user message)
════════════
         ▼
┌─────────────────┐
│UserPromptSubmit │ → Embed user's prompt
│                 │ → Query daemon /recall
│                 │ → Inject top 3 memories
└────────┬────────┘
         │
         ▼  (fires before EACH tool)
┌─────────────────┐
│  PreToolUse     │ → Extract Claude's thinking
│                 │ → Query for new relevant memories
│                 │ → Inject if thinking has drifted
└────────┬────────┘
         │
CONTEXT COMPACTION (when context window fills)
════════════════════
         ▼
┌─────────────────┐
│  PreCompact     │ → Export transcript to disk
│                 │ → Convert JSONL to markdown
│                 │ → Output sub-agent dispa
...[truncated]

## Links

- [GitHub](https://github.com/zacdcook/claude-code-semantic-memory)
- [Original Tweet](https://x.com/PerceptualPeak/status/2016721834935537833)
