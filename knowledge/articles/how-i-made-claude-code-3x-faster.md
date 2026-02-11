---
title: "How I made Claude Code 3x faster"
type: x-article
date_added: 2026-02-09
source: "https://x.com/i/article/2017677914108792832"
author: "aidenybai"
tags: [claude-code, react-grab, frontend, ui-development, performance-optimization, agent-developer-tools, react-internals, context-engineering]
via: "Twitter bookmark from @aidenybai"
---

Frontend coding agents suffer from lossy translation between visual intent and code edits. React Grab solves this by exposing React component stack traces directly from the DOM, enabling O(1) file lookups instead of non-deterministic codebase search. Benchmarks on shadcn/ui dashboard demonstrate consistent 3x speedup for Claude Code on UI changes without modifying the agent model or prompts—pure context improvement through eliminated search phase.

## Key Takeaways
- Translation loss in frontend (UI intent → text prompt → code) creates non-deterministic search
- React Grab eliminates search phase by embedding component stack in DOM
- O(1) file lookup (exact path + line) replaces probabilistic codebase search
- 3x speedup measured on 20 test cases with shadcn/ui dashboard
- Works with any IDE (Cursor, Claude Code, Copilot, Codex, Zed, Windsurf)
- Best for low-entropy adjustments: spacing, layout, minor visual tweaks

## Full Content

How I made Claude Code 3x faster

Coding agents suck at frontend because translating intent (from UI → prompt → code → UI) is lossy.

For example, if you want to make a UI change:

1. Create a visual representation in your brain

2. Write a prompt (e.g. "make this button bigger")

How the coding agent processes this:

1. Turns your prompt into a trajectory (e.g. "let me grep/search for where this code might be")

2. Tries to guess what you're referencing and edits the code

Search is a pretty random process since language models have non-deterministic outputs. Depending on the search strategy, these trajectories range from instant (if lucky) to very long. Unfortunately, this means added latency, cost, and performance.

Today, there are two solutions to this problem:

- Prompt better: Use @ to add additional context, write longer and more specific prompts (this is something YOU control)

- Make the agent better at codebase search (this is something model/agent PROVIDERS control)

Improving the agent is a lot of unsolved research problems. It involves training better models (see [Instant Grep](https://cursor.com/changelog/2-1), [SWE-grep](https://cognition.ai/blog/swe-grep)).

Ultimately, reducing the amount of translation steps required makes the process faster and more accurate (this scales with codebase size).

But what if there was a different way?

## Digging through React internals

In my ad-hoc tests, I noticed that referencing the file path (e.g. path/to/component.tsx) or something to grep (e.g. className="flex flex-col gap-5 text-shimmer") made the coding agent much faster at finding what I was referencing. In short - there are shortcuts to reduce the number of steps needed to search!

Turns out, React.js exposes the source location for elements on the page.1 React Grab walks up the component tree from the element you clicked, collects each component's component name and source location (file path + line number), and formats that into a readable stack.

It looks something like this:

```javascript
<span>React Grab</span>
in StreamDemo at components/stream-demo.tsx:42:11

```

When I passed this to Claude Code, it instantly found the file and made the change in a couple seconds. Trying on a couple other cases got the same result.

## Benchmarking for speed

I used the [shadcn/ui dashboard](https://github.com/shadcn-ui/ui) as the test codebase. This is a Next.js application with auth, data tables, charts, and form components.

The benchmark consists of [20 test cases](https://github.com/aidenybai/react-grab/blob/main/packages/benchmarks/test-cases.json) designed to cover a wide range of UI element retrieval scenarios. Each test represents a real-world task that developers commonly perform when working with coding agents.

Each test ran twice: once with React Grab enabled (treatment), once without (control). Both conditions used identical codebases and Claude 4.5 Sonnet (in Claude Code).

Without React Grab, the agent must search through the codebase to find the right component. Since language models predict tokens non-deterministically, this search process varies dramatically - sometimes finding the target instantly, other times requiring multiple attempts. This unpredictability adds latency, increases token consumption, and degrades overall performance.

With React Grab, the search phase is eliminated entirely. The component stack with exact file paths and line numbers is embedded directly in the DOM. The agent can jump straight to the correct file and locate what it needs in O(1) time complexity.

…and turns out, Claude Code becomes ~3× faster with React Grab!

Below are the latest measurement results from all 20 test cases. The table below shows a detailed breakdown comparing performance metrics (time, tool calls, tokens) between the control and treatment groups, with speedup percentages indicating how much faster React Grab made the agent for each task.

## How it impacts you

The best use case I've seen for React Grab is for low-entropy adjustments like: spacing, layout tweaks, or minor visual changes.

If you iterate on UI frequently, this can make everyday changes feel smoother. Instead of describing where the code is, you can select an element and give the agent an exact starting point.

React Grab works with any IDE or coding tool: Cursor, Claude Code, Copilot, Codex, Zed, Windsurf, you name it. At its core, it just adds extra context to your prompt that helps the agent locate the right code faster.

We're finally moves things a bit closer to narrowing the intent to output gap (see [Inventing on Principle](https://youtu.be/PUv66718DII?t=390)).

## What's next

There are a lot of improvements that can be made to this benchmark:

- Different codebases (this benchmark used shadcn dashboard) - what happens with different frameworks/sizes/patterns? Need to run it on more repos.

- Different agents/model providers

- Multiple trials and sampling - decrease variance, since agents are non-deterministic

On the React Grab side - there's also a bunch of stuff that could make this even better. For example, grabbing error stack traces when things break, or building a Chrome extension so you don't need to modify your app at all. Maybe add screenshots of the element you're grabbing, or capture runtime state/props.

If you want to help out or have ideas, dm me @aidenybai or open an issue on GitHub.

> React Grab is free and open source. [Go try it out!](https://www.react-grab.com/)

## Links

- [Article](https://x.com/i/article/2017677914108792832)
- [Original Tweet](https://x.com/aidenybai/status/2018812643369488747)
