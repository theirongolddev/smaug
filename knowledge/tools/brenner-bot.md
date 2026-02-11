---
title: "brenner_bot"
type: tool
date_added: 2026-02-09
source: "https://github.com/Dicklesworthstone/brenner_bot"
stars: 51
language: "TypeScript"
tags: ["ai-agents", "biology", "science-research", "sydney-brenner", "research-methodology", "agent-mail", "multi-agent"]
via: "Twitter bookmark from @doodlestein"
---

## Description

Brenner Bot is a research coordination system that distills Sydney Brenner's scientific methodology from 236 interview transcripts and makes it executable by AI agents. The system enables multi-agent collaboration (Claude Opus 4.5, GPT-5.2, Gemini 3) through Agent Mail, allowing agents to debate hypotheses, design lethal experiments, and synthesize findings following Brenner's systematic approach. Built with Next.js web interface, Bun CLI, and tmux-based orchestration, it serves as both a research corpus and operational framework for agent-driven discovery.

## Key Features

- **Sydney Brenner transcript corpus**: 236 curated interviews compiled from WebOfStories, serving as primary source material
- **Multi-model collaboration**: Claude Code, Codex CLI, and Gemini CLI agents coordinate via Agent Mail without calling external APIs
- **Debate and synthesis modes**: Oxford-style, Socratic, and Steelman debate formats for hypothesis testing and refinement
- **Research hygiene framework**: Built-in guardrails against hindsight bias, unfalsifiable hypotheses, confound blindness via prediction locks and artifact linting
- **Brenner Method operators**: Executable cognitive patterns for level-splitting, exclusion testing, system selection, and physics validation
- **Deterministic merge algorithm**: Reconciles multi-agent deltas with human approval gates ensuring epistemic integrity
- **Web interface and CLI**: Both Vercel-deployed web app (brennerbot.org) and terminal-first Bun CLI for power users

## README

## Brenner Bot

**🌐 Live at [brennerbot.org](https://brennerbot.org)**

[![Coverage](https://codecov.io/gh/Dicklesworthstone/brenner_bot/branch/main/graph/badge.svg)](https://codecov.io/gh/Dicklesworthstone/brenner_bot)

<p align="center">
  <img src="apps/web/public/brennerbot_illustration.jpeg" alt="BrennerBot Illustration" width="600" />
  <br />
  <em>Harness the scientific methods of Sydney Brenner using AI Agents</em>
</p>

---

**Brenner Bot is a research "seed crystal"**: a curated primary-source corpus (Sydney Brenner transcripts) plus multi-model syntheses, powering **collaborative scientific research conversations** that follow the "Brenner approach."

> 📊 **[End-to-End Test Report: Bio-Inspired Nanochat Session](./ANALYSIS_OF_USING_BRENNERBOT_FOR_BIO_INSPIRED_NANOCHAT.md)** — A complete walkthrough demonstrating the Brenner method in action on a real research question about biological vs. synthetic nanoparticle communication.

### The north star

This repository integrates with **Agent Mail** (coordination + memory + workflow glue) so multiple coding agents can collaborate as a *research group*:

- **Claude Code** running **Opus 4.5**
- **Codex CLI** running **GPT‑5.2** (extra-high reasoning)
- **Gemini CLI** running **Gemini 3**

> **Critical constraint (non-negotiable):** We do **not** call vendor AI APIs from code. Instead, we coordinate CLI tools via their **subscription tiers** (Claude Max / GPT Pro / Gemini Ultra) running in terminal sessions. Orchestration is *message passing + compilation*, not remote inference.

The agents run in parallel via **ntm** (Named Tmux Manager), coordinating through **Agent Mail** threads, producing structured deltas that get compiled into durable artifacts.

The system includes:
- A **Next.js web app** at `brennerbot.org` — human interface for corpus browsing + session viewing (not agent execution)
- A **Bun CLI** (`brenner`) — terminal-first workflows for power users
- A **cockpit runtime** — ntm-based multi-agent sessions with Agent Mail coordination

Deployed on Vercel with Cloudflare DNS at **`brennerbot.org`**.

---

### Table of contents

- [Why this repo is interesting](#why-this-repo-is-interesting)
- [The Core Insight: Why Brenner?](#the-core-insight-why-brenner)
- [What's here](#whats-here)
- [Quick Install](#quick-install)
- [What this is ultimately for](#what-this-is-ultimately-for)
- [How the system works](#how-the-system-works)
- [How to use this repo](#how-to-use-this-repo)
- [Repository map](#repository-map)
- [The three distillations](#the-three-distillations)
- [Working vocabulary](#working-vocabulary)
- [The Operator Algebra](#the-operator-algebra)
- [The Implicit Bayesianism](#the-implicit-bayesianism)
- [The Brenner Method: Ten Principles](#the-brenner-method-ten-principles)
- [The Required Contradictions](#the-required-contradictions)
- [Why This Matters for AI-Assisted Research](#why-this-matters-for-ai-assisted-research)
- [Provenance, attribution, and epistemic hygiene](#provenance-attribution-and-epistemic-hygiene)
- [System Architecture](#system-architecture)
- [Design Principles](#design-principles)
- [The Artifact Merge Algorithm](#the-artifact-merge-algorithm)
- [The Linting System](#the-linting-system)
- [Performance Characteristics](#performance-characteristics)
- [Testing Infrastructure](#testing-infrastructure)
- [Development Workflow](#development-workflow)
- [Releases](#releases)
- [Research Artifact Lifecycle Management](#research-artifact-lifecycle-management)
  - [Hypothesis Management](#hypothesis-management)
  - [Test Management](#test-management)
  - [Assumption Management](#assumption-management)
  - [Anomaly Management](#anomaly-management)
  - [Critique Management](#critique-management)
- [Scoring & Evaluation System](#scoring--evaluation-system)
  - [The 7-Dimension Session Score](#the-7-dimension-session-score)
  - [Role-Specific Scoring](#role-specific-scoring)
  - [Pass/Fail Gates](#passfail-gates)
- [Research Program Orchestration](#research-program-orchestration)
  - [Dashboard Metrics](#dashboard-metrics)
- [Experiment Capture & Encoding](#experiment-capture--encoding)
- [Cockpit Runtime](#cockpit-runtime)
- [Web Application Pages](#web-application-pages)
- [Specification Reference](#specification-reference)
- [Storage & Schema Architecture](#storage--schema-architecture)
- [JSON Output Mode](#json-output-mode)
- [Session Replay Infrastructure](#session-replay-infrastructure)
- [Coach Mode: Guided Learning System](#coach-mode-guided-learning-system)
- [Domain-Aware Confound Detection](#domain-aware-confound-detection)
- [Hypothesis Similarity Search](#hypothesis-similarity-search)
- [Agent Debate Mode](#agent-debate-mode)
- [What-If Scenario Exploration](#what-if-scenario-exploration)
- [Session State Machine](#session-state-machine)
- [Undo/Redo System](#undoredo-system)
- [Prediction Lock & Calibration](#prediction-lock--calibration)
- [The Operator Framework](#the-operator-framework)
- [Offline Resilien
...[truncated]

## Links

- [GitHub](https://github.com/Dicklesworthstone/brenner_bot)
- [Original Tweet](https://x.com/doodlestein/status/2005815788628762640)
