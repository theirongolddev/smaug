---
title: "autoresearch - Autonomous AI Research Loop"
type: tool
date_added: 2026-03-07
source: "https://github.com/karpathy/autoresearch"
tags: [ai-research, hyperparameter-tuning, autonomous-agents, neural-networks, llm-training]
via: "Twitter bookmark from @karpathy"
---

autoresearch is a minimal, self-contained framework for autonomous AI-driven research. It enables an AI agent to iteratively improve neural network training through an autonomous loop that discovers better hyperparameters, architectures, and training strategies without human involvement.

The core is a ~630 line single-file version of nanochat LLM training stripped down to run on a single GPU. The human provides direction via prompt markdown files, while the AI agent iteratively improves the training code by running 5-minute training experiments and committing improvements to a git feature branch.

## Key Features

- Autonomous hyperparameter optimization
- AI iterates on training code without human loops
- Each training run: exactly 5 minutes
- Results tracked via git commits
- Single GPU friendly
- Minimal 630-line codebase
- Split workflow: human iterates prompts (.md), AI iterates code (.py)

## Workflow

1. Human writes/updates research prompt (.md file)
2. AI reads prompt and training results
3. AI modifies training code (.py file) to test new hypotheses
4. Training run executes (5 min)
5. Results compared and committed to feature branch
6. Loop repeats with AI making progressively better decisions

## Use Cases

- Discovering optimal hyperparameters for your models
- Automating neural architecture search
- Optimizer selection and tuning
- Comparative research across different approaches
- Building intuition about what works for your specific problem

Every dot in the research trajectory is a complete 5-minute training run, accumulated on a git branch as the agent discovers improvements in validation loss.

## Links

- [GitHub](https://github.com/karpathy/autoresearch)
- [Original Tweet](https://x.com/karpathy/status/2030371219518931079)
