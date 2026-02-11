---
title: "xf"
type: tool
date_added: 2026-02-09
source: "https://github.com/Dicklesworthstone/xf/blob/main/docs/performance.md"
stars: 69
language: "Rust"
tags: ["search", "x-archive", "semantic-search", "cli-tools", "rust", "performance", "ai-agent"]
via: "Twitter bookmark from @doodlestein"
---

Ultra-fast CLI tool for searching and analyzing X (Twitter) data archives with sub-millisecond query latency. Combines keyword-based BM25 full-text search with vector similarity (hash-based by default, optional MiniLM semantic embeddings) using reciprocal rank fusion (RRF) for hybrid results. Indexes all content types including tweets, likes, DMs, and Grok conversations. Designed specifically for AI agent workflows with JSON output, parallel parsing, and CPU-only operation for local privacy-first processing.

## Key Takeaways
- Dual-engine search combining BM25 keyword matching with vector similarity for semantic understanding
- 2-tier semantic architecture: fast hash-based embeddings by default, optional MiniLM for true semantic understanding with background async ranking
- CPU-only, privacy-first operation—all data stays local and searchable from command line
- Supports rich query syntax (phrases, wildcards, boolean operators) and DM conversation context
- Built in Rust with parallel parsing for ~10,000 documents/second indexing speed
- Agent-friendly JSON output format and exit codes for seamless automation workflows

## README

# xf

<div align="center">
  <img src="xf_illustration.webp" alt="xf - Ultra-fast CLI for searching your X data archive">
</div>

<div align="center">

[![CI](https://github.com/Dicklesworthstone/xf/actions/workflows/ci.yml/badge.svg)](https://github.com/Dicklesworthstone/xf/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

Ultra-fast CLI for searching and querying your X data archive with sub-millisecond latency.

<div align="center">
<h3>Quick Install</h3>

```bash
curl -fsSL "https://raw.githubusercontent.com/Dicklesworthstone/xf/main/install.sh?$(date +%s)" | bash
```

**Or via package managers:**

```bash
# macOS/Linux (Homebrew)
brew install dicklesworthstone/tap/xf

# Windows (Scoop)
scoop bucket add dicklesworthstone https://github.com/Dicklesworthstone/scoop-bucket
scoop install dicklesworthstone/xf
```

<p><em>Works on Linux, macOS, and Windows. Auto-detects your platform and downloads the right binary.</em></p>
</div>

---

## 🤖 Agent Quickstart (JSON)

**Use `--format json` in agent contexts.** stdout = data, stderr = diagnostics, exit 0 = success.

```bash
# 1) Index once (required before search)
xf index ~/x-archive

# 2) Search (machine-readable)
xf search "machine learning" --format json --limit 20

# 3) Archive stats (machine-readable)
xf stats --format json
```

## TL;DR

**The Problem**: X lets you download all your data, but actually *finding* anything in that archive is painful. The built-in HTML viewer is slow and clunky, there's no real search, and your data is scattered across separate files.

**The Solution**: `xf` indexes your X (formerly Twitter) data export and provides blazingly fast full-text search across tweets, likes, DMs, and Grok conversations—all from the command line.

### Why Use xf?

| Feature | What It Does |
|---------|--------------|
| **Sub-Millisecond Search** | Tantivy-powered full-text search with BM25 ranking |
| **Vector Similarity (default: hash)** | Finds content with overlapping vocabulary; best when queries share words with target content |
| **True Semantic Search (optional ML)** | Uses MiniLM embeddings when indexed with `--semantic` for synonym-level matching |
| **Hybrid Search** | Combines keyword + vector similarity (hash by default, ML when indexed with `--semantic`) |
| **Search Everything** | Tweets, likes, DMs, and Grok conversations in one place |
| **Rich Query Syntax** | Phrases, wildcards, boolean operators (`AND`, `OR`, `NOT`) |
| **DM Context** | View full conversation threads with search matches highlighted |
| **Multiple Formats** | JSON, CSV, compact, or colorized terminal output |
| **Privacy-First** | All data stays local on your machine—nothing sent anywhere |
| **Fast Indexing** | ~10,000 documents/second with parallel parsing |

Note: Semantic mode uses hash-based vocabulary similarity **by default**. Run `xf index --semantic` to build true semantic embeddings (MiniLM). If you switch modes, re-index so the vector index matches the embedder.

### Quick Example

```bash
# Index your archive (default: hash-based embeddings)
$ xf index ~/x-archive

# Optional: true semantic embeddings (downloads ~80MB on first use)
$ xf index ~/x-archive --semantic

# Search across everything (hybrid mode by default)
$ xf search "machine learning"

# Semantic search (vector similarity; true semantic if indexed with --semantic)
$ xf search "feeling overwhelmed at work" --mode semantic

# Keyword-only search (classic BM25)
$ xf search "rust async" --mode lexical

# Search only your DMs with full conversation context
$ xf search "meeting tomorrow" --types dm --context

# Export results as JSON
$ xf search "rust async" --format json --limit 50
```
---
## Prepared Blurb for AGENTS.md Files:
```
## xf — X Archive Search

Ultra-fast local search for X (Twitter) data archives. Parses `window.YTD.*` JavaScript format from X data exports. Hybrid search combining keyword (BM25) + vector similarity (hash by default; ML when indexed with `--semantic`) via RRF fusion.

### Core Workflow

```bash
# 1. Index archive (one-time, ~5-30 seconds)
xf index ~/x-archive
xf index ~/x-archive --force          # Rebuild from scratch
xf index ~/x-archive --only tweet,dm  # Index specific types
xf index ~/x-archive --skip grok      # Skip specific types
xf index ~/x-archive --semantic       # True semantic embeddings (MiniLM; slower)

# 2. Search
xf search "machine learning"          # Hybrid search (default)
xf search "feeling stressed" --mode semantic  # Vector similarity (hash default, ML if indexed with --semantic)
xf search "rust async" --mode lexical # Keyword-only (BM25)
xf search "meeting" --types dm        # DMs only
xf search "article" --types like      # Liked tweets only

Search Modes

--mode hybrid   # Default: BM25 + vector similarity (hash default, ML with --semantic index)
--mode lexical  # Keyword-only (BM25), best for exact terms
--mode semantic # Vector similarity (hash 
...[truncated]

## Links

- [GitHub](https://github.com/Dicklesworthstone/xf/blob/main/docs/performance.md)
- [Original Tweet](https://x.com/doodlestein/status/2016358943723855881)
