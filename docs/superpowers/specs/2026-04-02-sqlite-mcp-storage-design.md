# SQLite Storage + MCP Server for Smaug

**Date:** 2026-04-02
**Status:** Approved

## Summary

Add a configurable SQLite storage module to Smaug and an MCP server that exposes bookmark data to AI agents. The storage layer uses an adapter pattern so users can choose markdown-only (current behavior), SQLite-only, or both. The MCP server provides full-text search, metadata filtering, semantic search (via sqlite-vec), and aggregation stats through 6 tools.

## Requirements

- SQLite storage as an optional module, configurable per user
- Read-only MCP server exposed as `npx smaug mcp` subcommand
- Full-text search (FTS5), metadata filtering, semantic search (sqlite-vec), stats/aggregations
- Agents use the MCP for both explicit queries and passive lookup during work
- Embeddings are optional — semantic search degrades gracefully when unconfigured
- Zero changes to existing markdown-only behavior when SQLite is not enabled

## Architecture

### Storage Adapter Pattern

```
processor.js (fetches + prepares bookmarks)
    |
    v
job.js (orchestrates run)
    |
    v
storage/index.js --- reads config.storage ("markdown" | "sqlite" | "both")
    |
    +-- storage/markdown.js   <- extracted from current behavior (no changes)
    +-- storage/sqlite.js     <- new module
```

`createStorage(config)` returns an object with:
- `save(bookmarks)` — write prepared bookmarks to active adapter(s)
- `getExistingIds()` — return Set of already-processed bookmark IDs
- `close()` — cleanup (close DB connections)

Each adapter implements this interface independently. When `config.storage` is `"both"`, both adapters receive every call.

### Configuration

New fields in `smaug.config.json`:

```json
{
  "storage": "both",
  "sqliteDb": "./.state/smaug.db",
  "embeddings": {
    "provider": "openai",
    "model": "text-embedding-3-small",
    "dimensions": 1536
  }
}
```

| Field | Default | Description |
|-------|---------|-------------|
| `storage` | `"markdown"` | `"markdown"`, `"sqlite"`, or `"both"` |
| `sqliteDb` | `"./.state/smaug.db"` | Path to SQLite database file |
| `embeddings` | `null` | Embedding config; `null` disables semantic search |
| `embeddings.provider` | — | `"openai"` (expandable later) |
| `embeddings.model` | — | Model identifier |
| `embeddings.dimensions` | — | Vector dimension count |

Environment variable overrides: `SMAUG_STORAGE`, `SMAUG_SQLITE_DB`, `SMAUG_EMBEDDINGS_PROVIDER`, `SMAUG_EMBEDDINGS_MODEL`, `SMAUG_EMBEDDINGS_DIMENSIONS`, `OPENAI_API_KEY`.

## SQLite Schema

```sql
CREATE TABLE bookmarks (
  id TEXT PRIMARY KEY,
  author TEXT NOT NULL,
  author_name TEXT,
  text TEXT NOT NULL,
  tweet_url TEXT NOT NULL,
  created_at TEXT,
  date_label TEXT,
  is_reply INTEGER DEFAULT 0,
  is_quote INTEGER DEFAULT 0,
  reply_context JSON,
  quote_context JSON,
  tags JSON DEFAULT '[]',
  media JSON DEFAULT '[]',
  category TEXT,
  action TEXT,
  summary TEXT,
  knowledge_file TEXT,
  raw_json JSON,
  indexed_at TEXT NOT NULL
);

CREATE TABLE links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bookmark_id TEXT NOT NULL REFERENCES bookmarks(id),
  original_url TEXT,
  expanded_url TEXT NOT NULL,
  type TEXT,
  content JSON,
  UNIQUE(bookmark_id, expanded_url)
);

CREATE VIRTUAL TABLE bookmarks_fts USING fts5(
  author, text, summary, content,
  content=bookmarks,
  content_rowid=rowid
);

CREATE VIRTUAL TABLE bookmarks_vec USING vec0(
  bookmark_id TEXT PRIMARY KEY,
  embedding FLOAT[1536]
);

CREATE TABLE stats_cache (
  key TEXT PRIMARY KEY,
  value JSON,
  updated_at TEXT
);
```

### FTS5 Sync

FTS5 is configured as a content-external table (`content=bookmarks`). The `bookmarks` table carries a `_fts_content` TEXT column (not shown in the core schema for clarity) that stores pre-concatenated link content. This column is populated during `save()` by joining all `links.content` text for the bookmark.

Triggers on `bookmarks` INSERT/UPDATE/DELETE keep `bookmarks_fts` in sync:
- `AFTER INSERT`: inserts the new row into FTS
- `BEFORE UPDATE`: deletes old FTS entry, `AFTER UPDATE` inserts new one
- `AFTER DELETE`: removes from FTS

This avoids the complexity of cross-table triggers while keeping FTS current.

### Embedding Content

One embedding per bookmark. The embedded text is a concatenation of:
- Tweet text
- AI-generated summary
- Truncated linked content (article text, GitHub README, up to ~4000 chars)

This captures both raw content and the AI interpretation for better semantic coverage.

## MCP Server

### Runtime

Started via `npx smaug mcp`. Communicates over stdio transport. Connects to the SQLite database at the configured path. Refuses to start if SQLite storage is not enabled in config.

### Tools

#### `smaug_search`

Full-text keyword search across tweet text and linked content.

**Parameters:**
- `query` (string, required) — search terms
- `limit` (number, optional, default 20) — max results
- `offset` (number, optional, default 0) — pagination offset

**Returns:** Array of bookmark objects with relevance ranking, matched snippets highlighted.

#### `smaug_semantic_search`

Concept/similarity search via embeddings.

**Parameters:**
- `query` (string, required) — natural language description
- `limit` (number, optional, default 10) — max results

**Returns:** Array of bookmark objects with similarity scores. Returns error message if embeddings are not configured.

#### `smaug_get_bookmarks`

Retrieve one or many bookmarks by ID with full link and content data.

**Parameters:**
- `ids` (string | string[], required) — one or more tweet IDs

**Returns:** Array of full bookmark objects including all links with extracted content, reply/quote context, and knowledge file path.

#### `smaug_filter`

Query bookmarks by metadata fields. All parameters optional; combines with AND logic.

**Parameters:**
- `author` (string) — filter by author username
- `category` (string) — "github", "article", "tweet", "video", etc.
- `tags` (string[]) — filter by folder tags (OR within tags)
- `date_from` (string) — ISO date, inclusive
- `date_to` (string) — ISO date, inclusive
- `type` (string) — link type filter ("github", "article", "video", etc.)
- `has_knowledge_file` (boolean) — only bookmarks that were filed
- `limit` (number, default 20)
- `offset` (number, default 0)

**Returns:** Array of bookmark objects matching all criteria.

#### `smaug_related`

Find bookmarks related to a given bookmark by shared links, tags, authors, or semantic similarity.

**Parameters:**
- `id` (string, required) — bookmark ID to find related items for
- `limit` (number, optional, default 10)

**Returns:** Array of related bookmarks with a `reason` field explaining the relationship (e.g., "shared tag: ai-tools", "same author", "semantic similarity: 0.89").

**Implementation:** Combines multiple signals:
1. Bookmarks sharing the same expanded URLs
2. Bookmarks sharing tags
3. Bookmarks by the same author
4. Semantically similar bookmarks (if embeddings configured)

Results are deduplicated and ranked by number of matching signals.

#### `smaug_stats`

Aggregated statistics about the bookmark collection.

**Parameters:**
- `period` (string, optional) — "week", "month", "all" (default "all")

**Returns:** Object with:
- `total_bookmarks` — count
- `by_category` — `{github: N, article: N, tweet: N, ...}`
- `by_author` — top 20 authors with counts
- `by_tag` — all tags with counts
- `by_period` — bookmarks per week/month over time
- `filed_count` — bookmarks with knowledge files
- `embedding_coverage` — percentage of bookmarks with embeddings

Uses `stats_cache` table; recomputed when stale (>1 hour or after new inserts).

## CLI Changes

### New Subcommands

| Command | Purpose |
|---------|---------|
| `npx smaug mcp` | Start the MCP server (stdio transport) |
| `npx smaug index` | Rebuild SQLite DB from existing markdown files |
| `npx smaug index --embeddings` | Rebuild DB and regenerate all embeddings |

### Modified Commands

- `npx smaug run` / `npx smaug fetch` — after processing, writes to active storage adapter(s)
- `npx smaug setup` — new step asking about SQLite and embeddings config
- `npx smaug status` — shows SQLite stats when enabled (row count, DB size, embedding coverage)

### Unchanged Commands

- `npx smaug process` — still shows pending items only
- `.claude/commands/process-bookmarks.md` — no changes; job runner handles storage after Claude finishes

## File Structure

```
src/
  cli.js              <- add mcp, index subcommands
  config.js           <- add storage, sqliteDb, embeddings config fields
  job.js              <- call storage.save() after AI processing
  processor.js        <- no changes
  index.js            <- add new exports
  storage/
    index.js          <- createStorage(config), adapter routing
    markdown.js       <- extracted from current job.js behavior
    sqlite.js         <- SQLite adapter (better-sqlite3, FTS5, triggers)
    embeddings.js     <- embedding generation (provider abstraction)
  mcp/
    server.js         <- MCP server setup, tool registration
    tools.js          <- tool handlers (search, filter, get, related, stats)
```

## Dependencies

New npm dependencies:
- `better-sqlite3` — synchronous SQLite driver, good for MCP server (no async complexity)
- `sqlite-vec` — vector similarity extension for SQLite
- `@modelcontextprotocol/sdk` — MCP server SDK

Optional (only if embeddings enabled):
- `openai` — for generating embeddings via OpenAI API

## Migration Path

For existing users with markdown data:

1. Enable SQLite in config: `"storage": "both"`
2. Run `npx smaug index` to backfill existing bookmarks.md and knowledge files into SQLite
3. Optionally run `npx smaug index --embeddings` to generate embeddings
4. Add MCP server to Claude Code config: `npx smaug mcp`

Future `smaug run` calls write to both markdown and SQLite automatically.

## Graceful Degradation

| Condition | Behavior |
|-----------|----------|
| `storage: "markdown"` | Current behavior, no SQLite, `smaug mcp` refuses to start |
| `storage: "sqlite"` or `"both"`, no embeddings config | All tools work except `smaug_semantic_search` returns informative error |
| `storage: "sqlite"` or `"both"`, embeddings configured | Full functionality |
| `smaug mcp` called without SQLite enabled | Exits with message: "SQLite storage must be enabled. Set storage to 'sqlite' or 'both' in smaug.config.json" |
| OpenAI API key missing but embeddings configured | Embeddings silently skipped during save, warning logged |
