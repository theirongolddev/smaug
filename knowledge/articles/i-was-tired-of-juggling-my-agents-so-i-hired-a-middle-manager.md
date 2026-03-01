---
title: "I Was Tired of Juggling My Agents, So I Hired a Middle Manager"
type: x-article
date_added: 2026-02-28
source: "https://x.com/i/article/2027230637158219776"
author: "sawyerhood"
tags: [agents, multi-agent, orchestration, workflow, claude-code, productivity]
via: "Twitter bookmark from @sawyerhood"
---

Pattern for building a persistent "middle manager" agent to coordinate parallel coding agents, solving the meta-work bottleneck where engineers spend more time coordinating agents than actually building. The manager (Claude Opus, personality hire) handles task dispatch, routing, and agent lifecycle — the engineer just describes what needs doing. Architecture: daemon for message passing + Conductor-style UI + manager agent built on pi. Key patterns: dedicated merger agent to serialize branches and prevent conflicts, Obsidian for task tracking (human-legible, editable), daily branch with end-of-day manual review for production work.

## Key Takeaways
- The coordination bottleneck is real: once you have many parallel agents, you become a manager not an IC — the middle manager pattern solves this
- An agentic merge queue (single serialization point) prevents agents from clobbering each other — the most important safety mechanism for parallel agent work
- Use Obsidian (or your own tool) for task tracking — brings task management to agents without a bespoke system, keeps the process legible to humans
- Tradeoff: you cede code quality control; works best for vibe coding side projects, requires careful review gates for production
- Production variant: daily branch → agents fork off it → merge back → one big manual review before merging to main
- The workflow shines for stream-of-thought voice input: dump a list of work on the manager and it parallelizes appropriately
- Source: [middleman on GitHub](https://github.com/SawyerHood/middleman) — manager agent built on [pi](https://github.com/badlogic/pi-mono)

## Full Content

I Was Tired of Juggling My Agents, So I Hired a Middle Manager

Here's a pattern I've seen many an engineer fall into over the past few months. It starts innocently: you're working on a feature and have a few agents going. They are planning, reviewing, researching. You branch out. Now you've got agents on bugs from the backlog. You embrace git worktrees, tmux, background agents. You reach for things like the Codex app or Conductor to keep it all together.

And it works! You're shipping more code than ever. But at some point you notice where all your time is going: coordinating agents, sequencing work, checking output, nudging things along, telling an agent to open a PR. The actual coding is a solved problem.

[Embedded Tweet: https://x.com/i/status/2026779152217440511]

Then it hits you. You're not an IC anymore. You've become a manager. Your reports crank out code but don't offer much beyond that. Your brain is fried from context-switching across a dozen conversations. You need to hire a middle manager.

## The Middle Manager

The vision is simple: I talk to one guy for each of my projects. I tell him what needs to be done and he manages the logistics. He's persistent. I onboard him once, tell him how I like to work, and he remembers across sessions. He lasts for days His memory compacts over time and he has a longer-term memory file he can reference. He gets better the longer he runs.

A manager is really an intelligent event bus. I describe what I want, rattle off a list of tasks, and the manager figures out how to dispatch them. It can hire workers, route messages between them, and parallelize where it makes sense. I can have it spawn a planning agent first, then break the plan into parallel work. Or I can just fire off a bunch of bug fixes and let it handle the rest. It surfaces the things that need my attention and takes care of things that don't.

## What I Actually Built

I want to be honest here. You might be reading this and think I have Claude Code psychosis. If you squint, this looks like Steve Yegge's [Gas Town](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04), which I think is more art project than real engineering tool. But I aimed to build something a bit more restrained. You're still engineering, still reviewing, still responsible. You just have a management layer handling the dispatch. Think of it like having an agent that uses [Conductor](https://www.conductor.build/) for you.

What I ended up building looks a bit like this:

- A daemon that runs on my machine, tracks running agents, and facilitates message passing. It has an interface for managing different agent types (Codex / Pi) and tools that let agents talk to each other.

- A Conductor-style UI (forked from the defunct agent runner I worked on: https://github.com/terragon-labs/terragon-oss)

- A manager agent built on top of the wonderful Mario's wonderful [pi](https://github.com/badlogic/pi-mono). The manager can spawn workers and has a tool to message me directly. It's event-driven and never blocked, always ready for the next message.

When you first boot up, it asks you to onboard it (in the style of OpenClaw's hatching).

You proceed by telling them how you work, what they are working on, how you do things around here (like a real new employee). Congrats! You've just hired a middle manager.

## My Managers

Up until this point things have been a little abstract. It might be illustrative to go over how I use my middle managers

I have a middle manager for each project. The workflow I've onboarded them with looks like this:

- My main manager is Claude Opus (personality hire)

- Code changes and planning go to Codex workers

- UI-heavy work goes to an Opus worker

- All work happens in worktrees

- A dedicated "merger" agent merges changes, and workers notify it when they're ready

- Sometimes a reviewer agent gets involved before merging

- Long-running task TODOs are tracked in my Obsidian vault

A big benefit of this is I get to talk to my personality hire (Claude Opus) all day while Codex does the actual coding.

## Parallelizing the Little Things

The killer part of this flow is how I prompt all of the little fixes while working on a project. I mostly just stream-of-thought into the middle manager via voice and dump a bunch of work on it at once. It breaks things up and spawns workers accordingly.

From there I can either have a couple of PRs for myself to review when done or just ask them to be sent to the merger when done.

## The Merge Queue

When vibe coding, the agentic merge queue is the real star of the show. Having a single serialization point where branches get merged, conflicts get resolved, and tests pass keeps agents from clobbering each other. This is my more sane approach to having a bunch of agents work on the same codebase.

## Obsidian for Task Tracking

For bigger tasks, I work with the manager and a planning agent to draft a TODO list with dependencies, stored in Obsidian. Both the agent and I can track progress. I can look at the file, edit it to steer things, and the agent updates it as work completes. I really like bringing your own task management to agents rather than some bespoke system. It makes the whole process more legible.

## Vibe Coding vs. Production

This workflow really shines for vibe coding. I've mostly moved to it for side projects where I care more about getting the thing working than about code quality. I'm constantly chatting with my manager about some side project while doing other work. For example, I used it to build a clone of wisprflow that supports ChatGPT OAuth when my wisprflow sub ran out.

There was a feedback loop where I would use my transcription app and when I ran into new features I would just send them to my manager and it would just be constantly building and installing the new version to my applications directory.

This is a project I probably wouldn't have even attempted if I wasn't able to make this process as seamless as I did. It truly felt like I had hired a team of contractors to implement this for me.

There's a real tradeoff here: you're ceding control to the model. If you want to review every line of code, that bottleneck will eat any management efficiency gains. In this way it is also like hiring a team of contractors! It can be hard to control for code quality.

For my production projects (ones with paying customers), I've been experimenting with using this flow for small fixes. I keep a daily branch, let agents fork off it and merge back in, and do one big manual review at the end of the day before merging to main.

## Where Is This All Going?

[Embedded Tweet: https://x.com/i/status/2027027874134343717]

I have no doubt this is closer to what agentic development environments will look like in a couple months from now. A persistent manager that knows the codebase, the product, the ongoing work, the future plans, and handles the grunt work of dispatching agents. We should be more focused on the actual work being done instead of the meta-work of managing parallel agents.

I'm not convinced that this workflow is 100% production ready yet, we might need to wait for the next generation of models for this to really click. That being said I recommend that everyone should vibe code their own workflow like this and give it their own spin. It really helps you grapple with the chaos of micromanaging multiple agents and worry more about the what of building instead of the how. Granted there is a time and place for each but using this workflow was eye opening to me. I truly felt more like a software gardener than engineer. I was planting a seed, watering, and pruning my project and watching it grow.

If it is helpful, you can check out [my version of it here](https://github.com/SawyerHood/middleman).

## Links

- [Article](https://x.com/i/article/2027230637158219776)
- [Original Tweet](https://x.com/sawyerhood/status/2027409021914026093)
