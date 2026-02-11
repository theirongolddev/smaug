---
title: "Obsidian & Claude Code 101: Context Engineering"
type: x-article
date_added: 2026-02-09
source: "https://x.com/i/article/2015578841087873024"
author: "arscontexta"
tags: ["claude-code", "context-engineering", "obsidian", "progressive-disclosure", "knowledge-management"]
via: "Twitter bookmark from @arscontexta"
---

A practical guide to making Claude Code work effectively with vibe-based note-taking by engineering context selectivity through progressive disclosure. Rather than letting Claude read all files indiscriminately, the pattern uses four layers (file tree → descriptions → outlines → full content) to force Claude to justify each read and curate better context. The pattern mirrors MCP tool discovery and creates efficient information retrieval.

## Key Takeaways
- Progressive disclosure forces selectivity: file tree → yaml descriptions → section outlines → full content
- Inject the full file tree at session start so Claude has a map before exploring
- Use one-sentence descriptions in YAML frontmatter to filter before reading files
- Check section outlines via grep before loading full content—often only specific sections are needed
- This pattern matches MCP tool discovery behavior (list → search → references → definitions)
- Implementation is simple: SessionStart hook, yaml frontmatter, and Claude.md instructions enforcing selectivity
- When Claude must justify each read, it curates and focuses better on relevant context
- Descriptive filenames work as first impressions; "queries-evolve-during-search.md" conveys more than "search.md"

## Full Content

Obsidian & Claude Code 101: Context Engineering

vibe note-taking works better if you force claude code to be selective about what it reads

by default claude reads full files whenever they seem useful for the task

use 4 layers to be more selective

the pattern is called progressive disclosure

## 1. file tree

a session start hook injects the full file tree before claude touches anything

```json
"hooks": {
    "SessionStart": [{
        "hooks": [{
            "type": "command",
            "command": "tree -L 3 -a -I '.git|.obsidian' --noreport"
        }]
    }]
}
```

this gives claude the map before it starts exploring

filenames are descriptive so they work as a first impression

"queries evolve during search so agents should checkpoint md"

tells you more than "search notes md"

just reading the tree already shows what notes are about

## 2. yaml descriptions

every note has a one sentence description in the frontmatter

```yaml
---
description: Memory retrieval in brains works through spreading activation where neighbors prime each other. Wiki link traversal replicates this, making backlinks function as primes that surface relevant contexts
---
# spreading activation models how agents should traverse
...
```

the description elaborates the title

if something seems interesting claude queries it with ripgrep

```bash
rg "^description:" 01_thinking/*.md
```

## 3. outline

if a note passes the description filter claude checks the outline

sometimes you only need one section and loading the full file would create noise

```
grep -n "^#" "01_thinking/knowledge-work.md"
# output:
# 5:# knowledge-work
# 13:## Core Ideas
# 19:## Tensions
# 23:## Gaps
```

now claude knows where to look and can read what it needs

## 4. full content

if everything seems relevant for the task claude loads the full file

but only for notes that passed all three filters

most notes never get here but thats the point

when claude has to justify each read it curates better

## the mcp parallel

this isnt a new pattern

mcp tool discovery works the same way

when you have 50+ tools claude doesnt load all definitions into context upfront

tool specs are available but deferred until claude actually searches for them

```plaintext
tool list → tool search → tool references → full definitions
```

same structure:

```plaintext
file tree → descriptions → outline → full content
```

## implementation

the whole thing is just:

1. a SessionStart hook that runs `tree`

2. yaml frontmatter with a description field

3. instructions in claude md telling claude to check descriptions before reading

just a few constraints that force selectivity

heinrich

## Links

- [Article](https://x.com/i/article/2015578841087873024)
- [Original Tweet](https://x.com/arscontexta/status/2015585363318743071)
