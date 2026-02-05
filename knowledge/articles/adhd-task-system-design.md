---
title: "ADHD-Optimized Task System Design Research"
type: article
date_added: 2026-02-02
source: First-principles design session
tags: [adhd, task-management, ghost, executive-function, prosthetic, design]
via: Design conversation with Claude
---

# ADHD-Optimized Task System Design

Research and design principles established during Ghost task system revamp.

## Key ADHD Research Findings Applied

- **Interest-based nervous system** (Dodson, Barkley): ADHD prioritizes by urgency/interest/novelty/challenge, not importance. Priority numbers are useless.
- **Working memory** (Kasper et al., 2012): ADHD holds ~2-3 items vs 5-7 NT. Never show more than 2-3 surfaced items.
- **Task initiation** (Brown, 2013): Starting is the bottleneck, not finishing. Reduce initiation friction above all.
- **Performance deficit** (Barkley, 2015): ADHD knows what to do but can't consistently do it. Systems must be permanent prosthetics, not training wheels.
- **Ritual adherence** (Vysniauske et al., 2016): Self-initiated recurring behaviors fail in ADHD. Rituals must emerge from observed patterns.
- **Next physical action** (Allen/GTD, validated Barkley 2012, Safren 2005): Reduce everything to the next concrete physical step.
- **Temporal discounting** (Barkley): ADHD brains discount future consequences heavily. Relational urgency (someone you care about is affected) fades in the moment even though it matters.

## Core Design Insight: Multi-Dimensional Urgency

Traditional priority (1-5 scale) fails because it's a single rational axis. Real urgency has multiple dimensions:

1. **Temporal** — hard deadlines
2. **Relational** — affects someone you care about
3. **Consequential** — inaction causes escalating damage
4. **Dependency** — blocks other things
5. **Opportunistic** — window closing
6. **Momentum** — already started, context fresh
7. **Energy match** — fits current capacity
8. **Accumulation** — compounds if ignored

Hybrid scoring: deterministic dimension scores + AI synthesis for final ranking.

## Core Design Insight: Stories, Not Tasks

ADHD brains don't experience tasks atomically. A single task unfolds into a dependency graph that the brain processes all at once, causing overwhelm. The system should:

1. Accept the raw "task" as a **thought** (brain dump)
2. Elaborate it into a **story** with chapters, dependencies, assumptions
3. Extract the **next physical action** only
4. Surface that action, not the story

Partial progress = completed chapters, not failure.

## Full Design Document

See: `ghost-admin/docs/task-system-design.md`
