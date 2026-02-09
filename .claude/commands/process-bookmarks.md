# /process-bookmarks

Process prepared Twitter bookmarks into a markdown archive with rich analysis and optional filing to a knowledge library.

## Before You Start

**NEVER use the Write tool on bookmarks.md.** Write REPLACES the entire file, destroying all historical entries. ALWAYS use the Edit tool for bookmarks.md — this applies everywhere including parallel merge steps.

### Parallel vs Sequential

Check parallelThreshold from config (default: 8). Use parallel processing only when bookmark count >= threshold.

```bash
node -e "console.log(require('./smaug.config.json').parallelThreshold ?? 8)"
```

**Create a todo list IMMEDIATELY after reading bookmark count.** Steps: read bookmarks → process (sequential or parallel) → clean up pending → commit and push → return summary. Mark each step in/out of progress. Never skip final steps.

**For parallel processing (>= threshold):** Spawn ALL subagents in ONE message. Each writes to `.state/batch-N.md` (NOT bookmarks.md — race conditions). After all complete, merge batch files into bookmarks.md using Edit. See [Parallel Processing](#parallel-processing) section.

### Setup

```bash
date +"%A, %B %-d, %Y"
node -e "const c=require('./smaug.config.json'); console.log(JSON.stringify({archiveFile:c.archiveFile, pendingFile:c.pendingFile, stateFile:c.stateFile, categories:c.categories}, null, 2))"
```

Use these paths throughout. `~` = user's home directory.

## Input

Prepared bookmarks are in `pendingFile` (typically `./.state/pending-bookmarks.json`).

Each bookmark includes:
- `id`, `author`, `authorName`, `text`, `tweetUrl`, `date`
- `tags[]` - folder tags from bookmark folders
- `links[]` - each with `original`, `expanded`, `type`, and `content`
  - `type`: "github", "article", "x-article", "video", "tweet", "media", "image"
  - `content.contentFile`: path to pre-written knowledge file (if content was extracted)
- `isReply`, `replyContext` - parent tweet info if this is a reply
- `isQuote`, `quoteContext` - quoted tweet info if this is a quote tweet

## Categories

| Category | Match Patterns | Action | Folder |
|----------|---------------|--------|--------|
| github | github.com | file | ./knowledge/tools |
| article | medium.com, substack.com, dev.to, blog | file | ./knowledge/articles |
| x-article | /i/article/ | file | ./knowledge/articles |
| podcast | podcasts.apple.com, spotify.com/episode, overcast.fm | transcribe | ./knowledge/podcasts |
| youtube | youtube.com, youtu.be | transcribe | ./knowledge/videos |
| video | vimeo.com, loom.com | transcribe | ./knowledge/videos |
| tweet | (fallback) | capture | - |

Actions: `file` = create/edit knowledge file + bookmarks.md entry. `capture` = bookmarks.md entry only. `transcribe` = bookmarks.md entry with transcript flag.

## Workflow

### 1. Read Prepared Data

```bash
PENDING_FILE=$(node -e "const p=require('./smaug.config.json').pendingFile; console.log(p.replace(/^~/, process.env.HOME || process.env.USERPROFILE))")
cat "$PENDING_FILE"
```

### 2. Process Each Bookmark

#### a. Title/summary

Don't use generic titles. Use the repo name, article headline, key insight, or main point from the tweet.

#### b. Categorize

Match links against category patterns. First match wins, fallback to `tweet`.

#### c. Handle knowledge files

**If `content.contentFile` exists:** The file is already written with full content. Read it and Edit to:
1. Replace `<!-- NEEDS_ANALYSIS: ... -->` with a summary paragraph and `## Key Takeaways` bullets
2. Fill in `tags: []` in frontmatter
3. Do NOT touch `## Full Content` / `## README` sections

**If `content.contentFile` is NOT present:** Create the knowledge file from scratch using the templates below.

#### d. Add bookmarks.md entry (USE EDIT TOOL)

**Ordering:** File is descending chronological (newest dates at TOP). Bookmarks in pending are sorted oldest-first.

For each bookmark's date:
- If date section exists: insert entry immediately AFTER the `# Date` header
- If no section exists: create `# Weekday, Month Day, Year` at the correct chronological position
- Do NOT create duplicate date sections

**Standard entry:**
```markdown
## @{author} - {descriptive_title}
> {tweet_text}

- **Tweet:** {tweet_url}
- **Link:** {expanded_url}
- **Tags:** [[tag1]] [[tag2]] (only if bookmark has tags)
- **Filed:** [{filename}](./knowledge/tools/{slug}.md) (if filed)
- **What:** {1-2 sentence description}
```

**Quote tweets** — add quoted content in blockquote: `> *Quoting @{author}:* {text}`

**Replies** — add parent context: `> *Replying to @{author}:* {text}`

Separate date sections with `---`. No `---` between entries on the same day.

### 3. Clean Up Pending File

Remove processed bookmarks from pending file:
```javascript
const processedIds = new Set([/* IDs you processed */]);
const remaining = pending.bookmarks.filter(b => !processedIds.has(b.id));
```

### 4. Commit and Push

```bash
DATE=$(date +"%b %-d")
git add "$ARCHIVE_FILE" knowledge/
git commit -m "Process N Twitter bookmarks from $DATE

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
git push
```

### 5. Return Summary

```
Processed N bookmarks:
- @author1: Tool Name → filed to knowledge/tools/tool-name.md
- @author2: Article Title → filed to knowledge/articles/article-slug.md
- @author3: Plain tweet → captured only
```

## Fallback Knowledge File Templates

These are ONLY used when `content.contentFile` is NOT present (extraction failed, paywalled, etc.).

### Tool (`./knowledge/tools/{slug}.md`)

```yaml
---
title: "{tool_name}"
type: tool
date_added: {YYYY-MM-DD}
source: "{github_url}"
tags: [{relevant_tags}]
via: "Twitter bookmark from @{author}"
---

{Description of what the tool does}

## Key Features
- Feature 1
- Feature 2

## Links
- [GitHub]({github_url})
- [Original Tweet]({tweet_url})
```

### Article (`./knowledge/articles/{slug}.md`)

```yaml
---
title: "{article_title}"
type: article
date_added: {YYYY-MM-DD}
source: "{article_url}"
author: "{article_author}"
tags: [{relevant_tags}]
via: "Twitter bookmark from @{author}"
---

{Summary of the article's key points}

## Key Takeaways
- Point 1
- Point 2

## Links
- [Article]({article_url})
- [Original Tweet]({tweet_url})
```

### Podcast (`./knowledge/podcasts/{slug}.md`)

```yaml
---
title: "{episode_title}"
type: podcast
date_added: {YYYY-MM-DD}
source: "{podcast_url}"
show: "{show_name}"
tags: [{relevant_tags}]
via: "Twitter bookmark from @{author}"
status: needs_transcript
---

{Brief description from tweet context}

## Transcript
*Pending transcription*

## Links
- [Episode]({podcast_url})
- [Original Tweet]({tweet_url})
```

### Video (`./knowledge/videos/{slug}.md`)

```yaml
---
title: "{video_title}"
type: video
date_added: {YYYY-MM-DD}
source: "{video_url}"
channel: "{channel_name}"
tags: [{relevant_tags}]
via: "Twitter bookmark from @{author}"
status: needs_transcript
---

{Brief description from tweet context}

## Transcript
*Pending transcription*

## Links
- [Video]({video_url})
- [Original Tweet]({tweet_url})
```

## Parallel Processing

For bookmark count >= parallelThreshold, use subagents writing to temp files, then merge.

**Spawn ALL subagents in ONE message** using model="haiku":
```
Task(model="haiku", prompt="Process batch 0: write to .state/batch-0.md: {bookmarks 0-4}")
Task(model="haiku", prompt="Process batch 1: write to .state/batch-1.md: {bookmarks 5-9}")
```

**Subagent prompt template:**
```
Process these bookmarks and write ONLY the markdown entries to .state/batch-{N}.md

Bookmarks (oldest first):
{JSON array}

For each bookmark, write:
---
DATE: {bookmark.date}
## @{author} - {title}
> {tweet text}
- **Tweet:** {url}
- **Tags:** [[tag1]] [[tag2]] (if tags exist)
- **What:** {description}

For knowledge files: if content.contentFile exists, Read and Edit to add summary/tags.
If not, create from scratch per templates. DO NOT touch bookmarks.md.
```

**After ALL subagents complete — merge using Edit tool:**
1. Read existing bookmarks.md
2. Read .state/batch-*.md files in order
3. Parse entries by DATE line, insert into bookmarks.md at correct chronological position using Edit
4. Delete temp batch files
