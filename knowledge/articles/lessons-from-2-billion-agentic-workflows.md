---
title: "Lessons From 2 Billion Agentic Workflows"
type: x-article
date_added: 2026-02-09
source: "https://x.com/i/article/2014616902073778176"
author: "joaomdmoura"
tags: [agentic-systems, production-deployment, multi-agent-architecture, trust-in-ai, operational-patterns]
via: "Twitter bookmark from @joaomdmoura"
---

After powering 2 billion agentic system executions across enterprise deployments at companies like PepsiCo, DocuSign, AB InBev, and the US DoD, CrewAI identified critical patterns that separate demos from production systems. The key insight: intelligence is table stakes. Success depends on architecture designed for production from day one, separating deterministic workflows from probabilistic agent reasoning, and building human-in-the-loop trust gradients that allow systems to earn autonomy through consistent, auditable execution. Teams using full-stack approaches (observability, deployment infrastructure, PII protection, human oversight) ship faster and with higher business outcomes.

## Key Takeaways
- **Trust is earned gradually**: Start with 100% human review, dial down oversight as the system proves itself over thousands of executions. One HR services company moved Andy from full review to 50% autonomous handling.
- **Architecture decisions compound**: Separate deterministic workflows (structure) from probabilistic agents (judgment). DocuSign's 14x code reduction vs graph-based competitors validates this pattern.
- **Full stack = speed to value**: Success requires infrastructure, observability, K8s, human-in-the-loop built in (not bolted on), proper security/PII protection. AB InBev runs $30B+ in annual decisions through CrewAI AMP.
- **Production-first mindset**: The gap between demos and production is where most teams fail. Intelligence is assumed; the unlock is everything around it (monitoring, audit trails, human oversight, state management).

## Full Content

Lessons From 2 Billion Agentic Workflows

CrewAI just has powered around 2 billion agentic system executions in the last 12 months.

That sounds like an insanely huge number, but it's also just a fraction of what AI agents are growing into as a technology.

PepsiCo, Johnson & Johnson, PwC,  the US DoD (!), DocuSign, AB InBev, BDO, NTT Data, Experian. Just to name a few of the companies we got to help building, monitoring, and deploying agents to add value at real scale.

Some have incredible goals, like saving $ 1 Billion dollars in the next five years using CrewAI while generating another Billion in revenue. 
Another: 30% of tickets fully autonomous within months. 
Another: Evaluated everything in the market, ran their own assessment across frameworks and solutions and picked CrewAI, shipped in weeks with 14x less code than what they had previously built on another framework.

I've spent the past year in the trenches with these teams, watching what shipped, what broke, what patterns emerged.

These next sections cover some of what we learned.

# Why Some Agents Never Ship

The industry data confirms what many teams already knew walking in.

There are all sorts of reports out there, and all seem to point to the fact that quality (or what I would call trust instead) is the top barrier to production. Whether that lack of trust comes from hallucinations or output consistency.

We notice many teams talk about how complex agentic systems can get, and how some early abstraction choices pile extremely fast and can get in the way, many engineers regret graph-based architectures that might look great in screenshots but become debugging nightmares in production, just too many abstraction layers stacked on top of each other.

Graphs, sub-graphs, state objects, all hiding the actual agent logic, so when something breaks, the engineers dig through multiple indirections just to try finding which prompt or tool caused it. On top of that add constant breaking changes across versions and now you're spending more time maintaining the framework than building your system.

The reality is that the demand for prototyping is still 10x the demand for production, and as a result of that most products in the market focus on that, the "building" part of the agents, what falls short on helping these companies actually address the struggles of getting agentic system up, running and driving real business outcomes at scale.

The problem isn't intelligence though, most models out there are good enough. GPT-4o-mini runs many of our own production workloads up to this day still. Yes, the latest models are incredible and super powerful for certain use cases, but aren't the unlock.

The problem is the Agent Operations side, getting from "this works in a notebook" to "this runs reliably at scale with audit trails, human oversight, and outcomes and we can trust it".

The companies that are getting to the other side of this aren't just building smarter agents, they are focusing on building agentic systems, architectures designed for production from day one and that is some of what we will talk about today.

# Patterns From the Trenches

After processing billions of workflows across dozens of enterprise deployments, you get to see some patterns emerge whether you're looking for them or not.

Some of what we learned was obvious in hindsight, but on the otherside some of it surprised us, but all of it came from watching real teams shipping real agentic systems, many of them with now production workloads handling millions of decisions.

The three main broader topics that kept showing up:

Trust is earned in production. The teams that have been getting the biggest outcomes didn't start with full agent autonomy but instead started with 100% human review and worked their way down. 
It's not usual to see customers going from reviewing every single output to 50% because the system proved itself over thousands of executions.

Architecture choices compound fast. Most team getting fast speed to value were remarkable at separating the predictable from the unpredictable. Having deterministic workflows handling the structure, and agents deployed strategically where judgment actually matters.

Speed comes from the full stack, not just what you use for harness. Another major pattern is that teams had a more complete stack from day one. They had human-in-the-loop built into the architecture, not bolted on after, they could trace every decision back to the input that caused it, they could easily monitor quality and hallucination and spin off deployment using K8s. This combo actually has proveen to be a super power of our CrewAI AMP (Agent Management Platform), but we can cover that in a another article.

## Earning Trust at Scale

An HR services company came to us spread too thin to handle tickets, they had 3,000+ employee tickets per month, their compliance team was struggling to keep up and their number of employee was growing 2.5x.

Was a great candidate for an initial use case, so they built agentic system with CrewAI to handle all tickets moving forward, but they didn't start by letting the agents handle everything out of the gate, they started with 100% human in the loop review, on every single output.

The agent, they named it Andy, would draft responses, surface relevant policies, flag edge cases. But every ticket went through a human before it reached an employee.

Then something interesting happened: The compliance team started noticing the quality and after a few thousand executions, their SVP asked: "Can we use these outputs to train our human agents?"

That's when they knew they could start dialing down the oversight, nowadays Andy handles 50%+ of touches without human review, because the agents earned the trust through thousands of consistent, auditable decisions.

The rate of improvement was faster than they expected, and took weeks instead of months. It begs the reflection on how seemingly "simple" features like human-in-the-loop, when deployed right can become a trust gradient as the system proves itself.

## Architecture choices compound fast

DocuSign was one of the first customers to adopt CrewAI Flows  and watching how they architected their system taught us a lot about what works at scale.

Their use case: sales pipeline acceleration. Take a lead, research them, compose personalized outreach, validate quality, send. They call it the 3 Ps: Productivity, Personalization, Pipeline.

Before building, they evaluated the market. LangChain, AutoGen, others. They chose CrewAI and the pattern they landed on tells the story of why.

Their initial use case includes five agents: Identifier, Researcher, Composer, Validator and an Orchestrator. But the agents don't run wild, they're embedded in a deterministic Flow that controls sequencing, handles errors, manages state, and then kept adjusting how much they would delegate to models and how much agency / intelligence they wanted, the unpredictable parts (research, composition) get a lot of agency for example.

Their validation alone has three layers: LLM-as-judge for quality, hallucination checks against source material, and API-based quality scoring, when something fails, they know exactly which layer caught it and how to fix it.

The result were a very significant reduction in turnaround time, with higher email open rates, higher reply rates, and higher conversion. And a codebase their team can actually maintain, one internal assessment of a similar migration from another customer showed 14x less code than their previous graph-based implementation.

This is what we mean by agentic systems, not just agents that can reason but production architectures where the deterministic and probabilistic parts are deliberately separated.

## Speed comes from the full stack

The ability to get speed to value comes as a by product of the tools being used most of the time and the ability to have a good understanding of what is being built out of the gate.

The pattern we noticed across almost every successful deployment wasn't because teams were moving fast and breaking things, but actually the opposite, they take the time to assess the decisions that matter.

AB InBev is a good example, they run $30 billion in decisions through AI annually. When their leadership said "I want our company to lead in agentic," it was a mandate. They now have dozens of use cases live in CrewAI AMP (Agent Management Platform) having millions of dollars impact on their bottom line!

What makes that speed possible isn't just better models or smarter agents. It's having the full stack from day one: from the infrastructure, K8s, the observability that traces every decision, human-in-the-loop that's built into the architecture, deployment options that pass security review, proper PII protections and such.

# What This Means If You're Building

Two billion executions taught us that the gap between "working demo" and "production system" is where most teams get stuck and it is mostly because the focus has been on the wrong part of the problem.

The companies shipping real agentic systems figured out that intelligence is table stakes and that the unlock is everything around it: trust earned through transparency and architecture that separates the predictable from the unpredictable, and a stack that treats production as the starting point.

That's what we're building toward.

## Links

- [Article](https://x.com/i/article/2014616902073778176)
- [Original Tweet](https://x.com/joaomdmoura/status/2015131559742083377)
