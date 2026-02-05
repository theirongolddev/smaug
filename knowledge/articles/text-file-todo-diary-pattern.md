---
title: Text File Todo + Diary Pattern
type: article
date_added: 2026-02-03
source: memory
tags: [tasks, adhd, memory, episodic, context]
status: idea
---

# Text File Todo + Diary Pattern

## Core Concept

Inspired by a professor who used a single text file as both todo list and interaction log. The interesting insight: **parallel diary of events via chat becomes contextual intelligence** for the greater system.

## Application to Ghost

### Current State
- Tasks exist in `01-active/tasks.md` (structured)
- Session logs in `03-history/sessions/` (episodic memory)
- These are somewhat disconnected

### Proposed Enhancement

**Chat-as-diary**: Every interaction with Ghost creates episodic context that feeds back into:
- Task surfacing intelligence (what user actually worked on vs what they planned)
- Energy pattern detection (when tasks were abandoned, what drained energy)
- Context-aware recommendations (user mentioned X three times this week)
- ADHD-friendly "what was I doing?" recovery

### Key Insights

1. **Implicit logging**: User doesn't have to "journal" explicitly — chat IS the journal
2. **Task reality vs planning**: The diary reveals what actually happened (ADHD tax: planned task A, got distracted by B, discovered C was blocking it)
3. **Temporal context**: "I was working on X when Y came up" — Ghost can reconstruct work sessions from chat logs
4. **Pattern mining**: Repeated mentions of blockers, energy states, context switches become data

### Implementation Ideas

- Session parser already extracts events from JSONL transcripts
- Could mine these for:
  - Task mentions (even if not formally created)
  - Blockers/frustrations (sentiment + keywords)
  - Energy transitions ("I'm tired", "this is draining")
  - Context switches (topic changes, interruptions)
- Feed this back into task surfacing as signals:
  - "You mentioned this 3x this week but haven't started it"
  - "Last time you tried this, you got blocked by X"
  - "You usually work on Y after finishing X"

### ADHD-Specific Value

- **No executive function tax**: Doesn't require separate "update task status" step
- **Forgiving of chaos**: Captures reality, not idealized workflow
- **Context recovery**: "What was I doing?" becomes a query against the diary
- **Invisible scaffolding**: System learns patterns without user having to articulate them

## Related Patterns

- MemGPT episodic memory (what Ghost already does)
- Spoon theory task surfacing (what Ghost does for energy)
- **NEW**: Mining chat logs for implicit task/context signals

## Questions to Explore

- How to balance episodic memory (raw logs) vs extracted signals (structured data)?
- Privacy implications of mining chat logs?
- How to surface "you mentioned this before" without being creepy/robotic?
- Can chat sentiment analysis help predict energy crashes?

## Status

Idea stage. Not implemented. Worth exploring as Ghost's task system matures.
