---
title: "GitNexus - Zero-Server Code Intelligence Engine"
type: tool
date_added: 2026-03-02
source: "https://github.com/abhigyanpatwari/GitNexus"
tags: [codebase-analysis, knowledge-graph, code-exploration, ai-agent]
via: "Twitter bookmark from @MillieMarconnni"
---

GitNexus is a client-side knowledge graph tool that transforms any GitHub repository or ZIP file into an interactive, visual representation of code structure. The tool runs entirely in your browser—no server, no subscription required—and includes a built-in Graph RAG agent for semantic querying of your codebase.

## Key Architecture

**Parsing:** 4-pass AST pipeline (structure → parsing → imports → call graph) that maps every function, class, and dependency relationship.

**Graph Storage:** Uses KuzuDB embedded graph database running entirely in-browser.

**Visualization:** D3.js-based interactive knowledge graph showing call relationships and code structure.

**Query Agent:** Graph RAG agent uses Cypher queries (not embeddings) to traverse actual graph logic, answering questions like "What functions call this module?" or "Find all classes inheriting from X."

**Performance:** Web Workers parallelize parsing across threads, preventing browser freezes on massive monorepos.

## Key Features

- Parses GitHub repos or ZIP files in seconds
- Builds live interactive knowledge graph with D3.js
- Maps every function, class, import, and call relationship
- Runs 4-pass AST pipeline for comprehensive code analysis
- Stores everything in embedded KuzuDB graph database
- Query codebase in plain English with AI agent
- Web Workers for parallel parsing across threads
- Graph RAG agent with Cypher queries for semantic traversal
- Works with TypeScript, JavaScript, and Python
- 100% open source (MIT License)
- Runs entirely in your browser—no server required

## Links

- [GitHub](https://github.com/abhigyanpatwari/GitNexus)
- [Original Tweet](https://x.com/MillieMarconnni/status/2028436636841996451)
