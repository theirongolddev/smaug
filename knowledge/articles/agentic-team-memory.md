---
title: "Agentic Team Memory"
type: x-article
date_added: 2026-02-14
source: "https://x.com/i/article/2022444483581992960"
author: "dabit3"
tags: [team-knowledge, documentation, devin-ai, agents, tribal-knowledge, team-conventions, auto-generation]
via: "Twitter bookmark from @dabit3"
---

Cognition's Devin AI implements agentic team memory by capturing tribal knowledge as a side effect of agent corrections rather than requiring explicit documentation. Engineers correct agents the way they'd correct teammates, and the system prompts persistence of valuable conventions, automatically keeping team knowledge current and eliminating stale documentation maintenance burden.

## Key Takeaways

- Tribal knowledge emerges from engineer corrections in real-time rather than requiring manual wiki/README maintenance
- Knowledge gets created through chat feedback, auto-scanning repos (README, AGENTS.md, CLAUDE.md, .cursorrules), and manual API entries
- Team conventions, deployment quirks, and internal library preferences accumulate automatically without separate documentation effort
- New engineers access full team convention knowledge in their first session without reading docs or searching Slack
- Knowledge can be pinned to specific repos or org-wide, with lower barriers for non-technical contributors getting guardrails

## Full Content

Agentic Team Memory

Every engineering team has tribal knowledge.

Most teams try to capture this in wikis, READMEs, or onboarding docs. These go stale fairly quickly. Nobody maintains them because the cost of writing documentation always loses to the cost of shipping features.

New engineers take more time to ramp up, senior engineers lose hours answering the same questions, and the same mistakes still keep happening because conventions live in people's heads vs in some up-to-date system.

## Making it a side effect

At @cognition we [capture knowledge from corrections they're already making](https://docs.devin.ai/product-guides/knowledge#knowledge-suggestions) instead of asking people to write docs.

When an engineer says "don't call fetch directly, use the wrapper in src/lib/api-client", @DevinAI suggests saving that as a knowledge item. The engineer reviews it, tweaks the wording if needed, and saves.

From that point on every future session across the org retrieves that knowledge when it's relevant.

You don't have to think about documentation while you're working, you just correct the agent the way you'd correct a teammate, and the system prompts you to persist what's worth keeping.

## Multiple sources

Chat feedback is the most organic source, but knowledge also gets created in other ways:

- Auto-generated from repos: When you connect a repo, Devin scans your READMEs, file structure, and contents. It also pulls from AGENTS.md, CLAUDE.md, .cursorrules, and .rules files.

- Updates to existing items: Devin suggests updates to knowledge that's already saved, not just new items. Conventions evolve; the knowledge base evolves with them.

- Manual creation: Add knowledge directly in the UI or via the API when you want to codify something upfront.

## The result

The team's conventions, deployment quirks, internal library preferences, and common pitfalls accumulate. Nobody sat down and wrote an onboarding guide. It emerged from corrections people were already making.

A new engineer joins, starts a session, and the agent already knows every convention the team has built up without having to read docs or search Slack etc...

This also lowers the barrier for who can contribute, as non-technical people have more guardrails.

You can [pin knowledge to a specific repo](https://docs.devin.ai/product-guides/knowledge#pinning-knowledge-to-repos) or apply it org-wide. Backend deployment conventions don't surface when someone's working on the marketing site. Org-wide standards like commit message format apply everywhere.

Knowledge that writes itself is knowledge that actually stays current.

## Links

- [Article](https://x.com/i/article/2022444483581992960)
- [Original Tweet](https://x.com/dabit3/status/2022459842342916559)
