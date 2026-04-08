---
title: "Artifacts: versioned storage that speaks Git"
type: article
date_added: 2026-04-17
source: "https://blog.cloudflare.com/artifacts-git-for-agents-beta/"
author: "Dillon Mulroy"
tags: [agents, cloudflare, storage, git, durable-objects, versioning, filesystem]
via: "Twitter bookmark from @jpschroeder"
---

Cloudflare Artifacts is a Git-compatible versioned filesystem built as Durable Objects, solving a critical gap for agent development. While Cloudflare Workers and Durable Objects provide powerful compute capabilities, they lack native filesystem and bash support—critical constraints for agents that need persistent, versioned state.

Artifacts bridges this gap by providing tens of millions of Git repositories as cold-start-free Durable Objects. Any Git client can interact with these repositories, enabling agents to read/write/manage versioned files as naturally as any traditional filesystem. The Git interface means agents can fork from remote repositories, manage branches, and hand off URLs to humans or other tools seamlessly.

## Key Takeaways

- Solves the filesystem problem for agent workloads on Cloudflare infrastructure
- Git-compatible API enables any Git client to interact with agent-managed storage
- Runs as cold-start-free Durable Objects for zero latency on first access
- Scales to tens of millions of repositories
- Enables version control, branching, and collaboration patterns directly in agent workflows
- Part of Cloudflare's broader "Agents Week" push toward production-grade agent infrastructure

## Links

- [Article](https://blog.cloudflare.com/artifacts-git-for-agents-beta/)
- [Original Tweet](https://x.com/dillon_mulroy/status/2044765430649168272)
- [Discussion](https://x.com/jpschroeder/status/2044774146475725042)
