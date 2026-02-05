---
title: "How I made Claude Code 3x faster"
author: "Aiden Bai"
source: "https://x.com/i/article/2017677914108792832"
date: 2026-02-03
tags:
  - claude-code
  - frontend
  - performance
  - react
  - developer-tools
---

# How I made Claude Code 3x faster

## The Problem: Intent Translation is Lossy

Coding agents suck at frontend because translating intent is lossy:

1. Create a visual representation in your brain
2. Write a prompt (e.g., "make this button bigger")
3. Agent turns your prompt into a search trajectory
4. Agent tries to guess what you're referencing and edits the code

**Search is a pretty random process** since language models have non-deterministic outputs. Depending on the search strategy, these trajectories range from instant (if lucky) to very long. This means added latency, cost, and performance.

## Two Solutions

1. **Prompt better**: Use @ to add context, write longer/more specific prompts (YOU control)
2. **Make the agent better at codebase search** (MODEL/AGENT PROVIDERS control)

Improving the agent involves training better models (Instant Grep, SWE-grep). Ultimately, **reducing the amount of translation steps required** makes the process faster and more accurate.

## The Insight: React Internals

React.js exposes the source location for elements on the page. **React Grab** walks up the component tree from the element you clicked, collects each component's name and source location (file path + line number), and formats that into a readable stack.

```
<span>React Grab</span>
in StreamDemo at components/stream-demo.tsx:42:11
```

When you pass this to Claude Code, it instantly finds the file and makes the change in a couple seconds.

## Benchmarking Results

**Test environment:** shadcn/ui dashboard (Next.js with auth, data tables, charts, forms)

**Benchmark:** 20 test cases covering real-world UI element retrieval scenarios

**Methodology:** Each test ran twice (with React Grab, without), using identical codebases and Claude 4.5 Sonnet in Claude Code.

### How React Grab Works

Without React Grab:
- Agent must search through codebase
- Language models predict tokens non-deterministically
- Search process varies dramatically
- Sometimes instant, sometimes requires multiple attempts

With React Grab:
- Search phase eliminated entirely
- Component stack with exact file paths embedded in DOM
- Agent jumps straight to correct file
- **O(1) time complexity**

### Performance Impact

**Claude Code becomes ~3× faster with React Grab!**

The table shows detailed breakdown comparing performance metrics (time, tool calls, tokens) between control and treatment groups, with speedup percentages indicating how much faster React Grab made the agent for each task.

## Best Use Cases

React Grab excels for **low-entropy adjustments**:
- Spacing
- Layout tweaks
- Minor visual changes

If you iterate on UI frequently, these changes feel smoother. Instead of describing where the code is, you can select an element and give the agent an exact starting point.

## Compatibility

React Grab works with any IDE or coding tool:
- Cursor
- Claude Code
- Copilot
- Codex
- Zed
- Windsurf
- Any others

At its core, it just adds extra context to your prompt that helps the agent locate the right code faster.

**Moving closer to narrowing the intent-to-output gap** (see [Inventing on Principle](https://youtu.be/PUv66718DII?t=390)).

## Future Improvements

**On the benchmark side:**
- Different codebases (test on more repos beyond shadcn dashboard)
- Different agents/model providers
- Multiple trials and sampling (decrease variance)

**On React Grab itself:**
- Grab error stack traces when things break
- Chrome extension (no need to modify your app)
- Screenshots of the element being grabbed
- Capture runtime state/props

## Getting Started

**React Grab is free and open source.** [Try it out!](https://www.react-grab.com/)

For help or ideas:
- DM @aidenybai
- Open an issue on GitHub
