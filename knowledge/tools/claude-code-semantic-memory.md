---
title: "Claude Code Semantic Memory System"
type: tool
date_added: 2026-01-28
source: "GitHub - zacdcook/claude-code-semantic-memory"
repo: "https://github.com/zacdcook/claude-code-semantic-memory"
language: "Shell/Python/Node.js"
tags: [claude-code, memory, semantic-search, embeddings, hooks, context-management, llm]
via: Twitter bookmark by @PerceptualPeak
---

# Claude Code Semantic Memory System

## Problem Solved

Claude Code sessions are stateless by default. Every context compaction or new session loses:
- Solutions already discovered
- Gotchas and traps identified
- Infrastructure details and preferences
- Decisions made and why
- Past learnings and patterns

This leads to repeated mistakes, redundant conversations, lost productivity.

## Solution Overview

Persistent memory system that:
1. Converts `.jsonl` transcripts to readable markdown
2. Extracts learnings using Claude sub-agents
3. Embeds learnings with local embedding model (nomic-embed-text)
4. Injects relevant memories via Claude Code hooks

**Key Innovation:** PreToolUse hook catches mid-stream workflow drift by injecting memories during tool execution, not just at prompt start.

## Architecture

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

## Hook Lifecycle

### SessionStart
- Check daemon health
- Warn about orphaned transcripts

### UserPromptSubmit (fires for each user message)
- Embed user's prompt
- Query daemon `/recall` endpoint
- Inject top 3 memories into context
- **Limitation:** Memories less relevant as workflow drifts from original prompt

### PreToolUse (fires before EACH tool execution)
- Extract Claude's thinking from last 1,500 characters of thinking block
- Query daemon for new relevant memories based on current reasoning
- Inject if thinking has drifted from original prompt direction
- **Advantage:** Self-correcting workflows in real-time (~500ms execution)
- **Game Changer:** Prevents Claude from going down known error paths mid-stream

### PreCompact (context window fills)
- Export transcript to disk
- Convert JSONL to markdown
- Dispatch sub-agents for learning extraction

## Memory Injection Timing

**UserPromptSubmit Only (common, but limited):**
- Memories injected at prompt initiation
- Become less relevant as workflow extends
- Good for: Kickstarting with context

**UserPromptSubmit + PreToolUse (recommended):**
- Initial context + ongoing workflow corrections
- Catches when Claude starts drifting to error paths
- Injects relevant memories from past learnings
- Result: Self-correcting workflows
- Performance: All happening in <500ms (synchronous hooks)

## Quick Start

### Prerequisites
- Node.js
- Ollama (for embeddings)
- Python 3.8+
- Claude Code CLI

### Installation Steps

1. **Pull Embedding Model**
   ```bash
   ollama pull nomic-embed-text
   ```

2. **Clone Repository**
   ```bash
   git clone https://github.com/zacdcook/claude-code-semantic-memory.git
   cd claude-code-semantic-memory
   ```

3. **Convert Transcripts**
   ```bash
   node scripts/jsonl-to-markdown.js ~/.claude/projects/ ./converted-transcripts/
   ```
   - Extracts user messages, assistant messages, thinking blocks
   - Strips tool calls and results for cleaner extraction

4. **Extract Learnings** (in new Claude Code session)
   - Paste contents of `prompts/extract-learnings.md`
   - Claude dispatches sub-agents in parallel
   - Outputs to `~/extracted-learnings.jsonl`

5. **Start Memory Daemon**
   ```bash
   cd daemon
   pip install -r requirements.txt
   python server.py
   ```
   - Runs on port 8741
   - Endpoints: `/store`, `/recall`, `/health`

6. **Import Learnings**
   ```bash
   python scripts/import-learnings.py ~/extracted-learnings.jsonl
   ```

7. **Install Hooks**
   ```bash
   cp hooks/session-start.sh ~/.claude/hooks/SessionStart.sh
   cp hooks/user-prompt-submit.sh ~/.claude/hooks/UserPromptSubmit.sh
   cp hooks/pre-tool-use.sh ~/.claude/hooks/PreToolUse.sh
   cp hooks/pre-compact.sh ~/.claude/hooks/PreCompact.sh
   chmod +x ~/.claude/hooks/*.sh
   ```

## Daemon API

### POST /store
Embed and store a learning
```json
{
  "title": "...",
  "content": "...",
  "source": "..."
}
```

### POST /recall
Query for relevant memories
```json
{
  "query": "user's prompt or thinking",
  "limit": 3,
  "threshold": 0.45
}
```
Returns top matching memories by cosine similarity

### GET /health
Health check endpoint

## Workflow

### Normal Session
1. SessionStart hook fires
   - Daemon health check
2. User submits prompt
   - UserPromptSubmit hook embeds query
   - Relevant memories injected into context
3. Claude reasons and selects tools
   - PreToolUse hook fires
   - Extracts Claude's thinking
   - Queries for workflow-drift memories
   - Injects if needed (before tool execution)
4. Tool executes
5. Repeat for each iteration

### Context Compaction
1. PreCompact hook fires
2. Exports transcript to disk
3. Converts to markdown
4. Sub-agents extract learnings
5. Learnings embedded and stored
6. Ready for next session to access

## Key Benefits

**For Claude Code Users:**
- Avoid repeating mistakes already learned
- Self-correcting workflows (mid-stream memory injection)
- Infrastructure/preference continuity across sessions
- Decision rationale preservation
- Pattern recognition feedback loop

**Measured Improvement:**
- Workflow efficiency increase reported as "over 9,000" (ADHD-energy claim)
- Prevents extended error paths by injecting relevant past solutions
- Reduces "I know this will error but let Claude figure it out" moments

## Critical Implementation Detail

**PreToolUse is the game-changer:**
- Takes last 1,500 characters from Claude's thinking block
- Embeds current reasoning context
- Queries vector DB with current thinking
- Pulls relevant past learnings
- Injects before tool executes
- **Result:** Claude sees "Oh, I tried this before and it failed because..."

Without PreToolUse, memories become stale as workflow drifts. With it, memories stay fresh and prevent errors in real-time.

## Technical Stack

- **Node.js:** Transcript conversion
- **Python:** Daemon, embedding service, import scripts
- **Ollama:** Local embedding model (nomic-embed-text)
- **Claude Code:** Hook execution and sub-agent dispatching
- **Vector DB:** In-memory or persistent storage (implementation dependent)

## Configuration

Available in hooks:
- Similarity threshold (default 0.45)
- Memory limit per query (default 3)
- Thinking block extraction length (default 1,500 chars)
- Hook execution timeout (500ms or less)

## Gotchas & Limitations

- Requires Ollama running locally (can be resource-intensive)
- First extraction may take time (parallel sub-agents)
- Memory quality depends on learning extraction quality
- Vector similarity has false positives (threshold helps)
- Only works with Claude Code v2.0+

## Use Cases

1. **Debugging patterns:** Store solutions to recurring bugs; inject when similar error appears
2. **Infrastructure context:** Store deployment patterns, config details, secrets management approach
3. **Architectural decisions:** Why certain choices made; prevent regressions
4. **Gotchas:** "This library has X quirk"; prevent rediscovery
5. **Performance optimizations:** "We found Y pattern slow; use Z instead"
6. **API learnings:** "This endpoint behaves weird in Z scenario"

## Community

Zac (@PerceptualPeak) open-sourced this and recommends:
- If you have semantic memory setup, implement PreToolUse immediately
- Report issues or improvements via GitHub
- Customization for your specific workflow patterns
