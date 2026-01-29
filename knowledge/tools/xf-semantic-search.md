---
title: "xf: Ultra-Fast Semantic Search for X Archives"
type: tool
date_added: 2026-01-29
source: "https://github.com/Dicklesworthstone/xf"
tags: [semantic-search, rust, embeddings, hybrid-search, cli-tools, twitter-archive]
via: "Twitter bookmark from @doodlestein"
---

Ultra-fast CLI for searching Twitter/X data archives with sub-millisecond queries via Tantivy + SQLite. Built by Jeffrey Emanuel for searching downloaded X archives and coding agent sessions (cass tool).

## The Innovation: 2-Tier Semantic Search

Jeffrey needed a lightweight, fast, CPU-only semantic embedding model that "understands" semantic concepts well with sub-1-second response time.

The challenge: Choose between speed or quality?
- **potion-128M**: Sub-millisecond response (< 1ms), "ok" results
- **all-MiniLM-L6-v2**: Really decent embeddings, 128ms response (223x slower)

**Solution**: Don't choose. Use both in a progressive enhancement pattern.

### How It Works

1. **First pass (instant)**: Use potion-128M for immediate results
2. **Background upgrade**: Simultaneously run MiniLM-L6 in separate thread/memory-resident process
3. **Progressive refinement**: When MiniLM finishes, smoothly rearrange results with revised semantic scores
4. **Visual feedback**: Results continuously move to reflect upgraded rankings

Since potion and MiniLM both understand semantics reasonably well, the ranking changes aren't dramatic—but the user gets instant feedback that progressively improves.

## Key Features

- **Sub-Millisecond Search**: Tantivy-powered full-text search with BM25 ranking
- **Vector Similarity**: Hash-based by default, true semantic with `--semantic` flag
- **Hybrid Search**: Combines keyword + vector similarity via RRF fusion
- **Search Everything**: Tweets, likes, DMs, Grok conversations
- **Rich Query Syntax**: Phrases, wildcards, boolean operators
- **DM Context**: View full conversation threads with matches highlighted
- **Multiple Formats**: JSON, CSV, compact, or colorized terminal output
- **Privacy-First**: All data stays local
- **Fast Indexing**: ~10,000 documents/second with parallel parsing

## Search Modes

```bash
# Default: hash-based embeddings (fast)
xf index ~/x-archive

# True semantic embeddings (downloads ~80MB on first use)
xf index ~/x-archive --semantic

# Hybrid search (default)
xf search "machine learning"

# Semantic only (uses hash by default, ML if indexed with --semantic)
xf search "feeling overwhelmed at work" --mode semantic

# Keyword-only (classic BM25)
xf search "rust async" --mode lexical

# DMs only with conversation context
xf search "meeting tomorrow" --types dm --context
```

## Technical Approach

The "bake off" process:
1. Claude did web research on available embedding models
2. Conducted performance comparisons
3. Evaluated reranker models for hybrid search fusion
4. Discovered the 2-tier progressive enhancement approach

This pattern will become Jeffrey's standard search implementation across all Rust tooling (and ported to Golang for embedding in bv natively).

## Use Cases

- **cass**: Search across coding agent sessions
- **xf**: Search downloaded X/Twitter archives
- Any tool needing fast, semantic-aware search on CPU

## Performance Characteristics

- Tantivy: Full-text search engine (BM25)
- SQLite: Metadata and conversation threading
- Hash embeddings: Sub-millisecond (instant feedback)
- MiniLM embeddings: 128ms (high quality, background upgrade)
- Combined: Best of both worlds

## Why This Matters

Demonstrates a practical solution to the speed vs. quality tradeoff in semantic search:
- Don't force users to wait for "perfect" results
- Don't force users to settle for "fast but mediocre" results
- Progressive enhancement gives instant feedback + quality refinement

## Links

- [GitHub Repository](https://github.com/Dicklesworthstone/xf)
- [Performance Documentation](https://github.com/Dicklesworthstone/xf/blob/main/docs/performance.md)
- [Original Tweet](https://x.com/doodlestein/status/2016358943723855881)
