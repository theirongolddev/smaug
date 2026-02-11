---
title: "model_guided_research"
type: tool
date_added: 2026-02-09
source: "https://github.com/Dicklesworthstone/model_guided_research"
stars: 93
language: "Python"
tags: ["mathematics", "deep-learning", "ai-research", "jax", "pytorch", "attention-mechanisms", "nanochat"]
via: "Twitter bookmark from @doodlestein"
---

## Description

Model-Guided Research is a groundbreaking exploration of exotic mathematical structures in deep learning that emerged from a unique AI-human collaboration. The project demonstrates AI systems as genuine mathematical partners, not just solvers—capable of identifying which problems are worth solving. It maintains dual implementations: JAX demonstrations for interactive exploration and property validation, and PyTorch's Nanochat for production-ready transformer experiments. The repository implements 11+ mathematical frameworks for attention mechanisms (tropical, quaternion, matrix-gauge, etc.) and provides systematic evaluation infrastructure including CMA-ES hyperparameter optimization for comprehensive benchmarking.

## Key Features

- **Dual implementation strategy**: JAX demos for pedagogical clarity and rapid prototyping vs PyTorch Nanochat for production-scale training and evaluation
- **11+ mathematical attention frameworks**: Tropical geometry, quaternions, matrix gauges, and other exotic structures implemented as drop-in attention mechanisms
- **AI-guided discovery process**: Meta-cognitive loop where frontier models (GPT-5 Pro) generate research directions, self-evaluate proposals, and guide implementation
- **Systematic evaluation framework**: Comprehensive experimental matrix with multiple optimizers and schedulers for fair comparison across all frameworks
- **Production readiness**: Full training infrastructure with gradient computation, distributed optimization, and reproducible evaluation protocols
- **Research → Implementation pipeline**: Validate mathematical ideas in JAX, deploy validated approaches in PyTorch production code

## README

# Model-Guided Research: Mathematical Foundations for Next-Generation AI

*From theoretical exploration to production implementation: A systematic investigation of exotic mathematical structures in deep learning*

## 📍 Quick Navigation

- [**Project Overview**](#-project-overview) - What this project is about
- [**Dual Implementation Strategy**](#-dual-implementation-strategy) - Research (JAX) + Production (PyTorch)
- [**Quick Start**](#-quick-start) - Get up and running
- [**The 11 Mathematical Frameworks**](#-the-11-mathematical-frameworks) - Browse all implementations
- [**Nanochat: Production Transformer**](#-nanochat-production-transformer-implementation) - Unified GPT with all 11 approaches
- [**Experimental Matrix**](#-experimental-matrix) - Systematic evaluation framework
- [**CLI Usage**](#-cli-usage) - How to run demos and experiments
- [**Project Structure**](#-project-structure) - Repository organization

## 🌟 Project Overview

### Genesis: AI as Mathematical Research Partner

This repository emerged from a remarkable experiment in AI-guided mathematical discovery. What began as Jeffrey Emanuel (@doodlestein) posing a single question to GPT-5 Pro about matrix exponentials and Lie groups evolved into something unprecedented: **the AI model itself generated additional mathematical prompts, scored its own ideas, and helped design implementations for revolutionizing machine learning**.

The meta-cognitive loop:
1. **Human Question** → Emanuel asks about matrix exponentials in AI
2. **AI Deep Dive** → GPT-5 Pro provides comprehensive answer
3. **AI Creativity** → Model generates 5 additional research directions autonomously
4. **AI Self-Evaluation** → Model scores its own proposals (0-1000 scale)
5. **Human-AI Implementation** → Collaborative translation to working code
6. **Systematic Validation** → Empirical testing of theoretical predictions

This represents a new paradigm: **AI systems as genuine partners in mathematical discovery**, capable not just of solving problems but of identifying which problems are worth solving.

### Evolution: From Demos to Production

The project has evolved through three distinct phases:

**Phase 1: Mathematical Exploration (JAX Demos)**
- 11 standalone demonstrations of exotic mathematical structures
- Pure research focus: "Can this work in principle?"
- Rich, interactive visualizations
- Property validation and sanity checks

**Phase 2: Unification (Nanochat)**
- Production-ready GPT transformer in PyTorch
- All 11 mathematical approaches as drop-in attention mechanisms
- Systematic experimental framework
- Runtime configuration without code changes

**Phase 3: Systematic Evaluation (Current)**
- Comprehensive benchmarking infrastructure
- MCP Agent Mail for task coordination
- Multiple optimizers and schedulers
- A/B testing across the full experimental matrix

## 🔄 Dual Implementation Strategy

This project maintains **two complementary implementations** of each mathematical framework:

### JAX Demonstrations (Exploration)
**Location**: Root directory (`*.py` files)
**Purpose**: Interactive exploration and validation
**Characteristics**:
- Self-contained, runnable demos
- Rich console output with visualizations
- Detailed mathematical commentary
- Property checks and sanity tests
- ~500-1000 lines each, focused on clarity

**Run via**:
```bash
mgr list                    # See all demos
mgr run matrix-gauge        # Run specific demo
mgr run-all                 # Run all 11 demos
```

### PyTorch Production (Implementation)
**Location**: `nanochat/` directory
**Purpose**: Production-ready transformer with all frameworks
**Characteristics**:
- Unified GPT architecture
- Drop-in attention mechanism swapping
- Training infrastructure
- Multiple optimizers and schedulers
- ~100-200 lines per attention mechanism

**Run via**:
```bash
python -m nanochat.train --attention-type tropical --optimizer-type hoss
python -m nanochat.train --attention-type quaternion --scheduler-type ordinal
```

### Why Both?

**JAX Demos provide**:
- **Pedagogical value**: Understand the math interactively
- **Rapid prototyping**: Test new ideas quickly
- **Property validation**: Verify mathematical claims
- **Isolation**: Study one concept at a time

**PyTorch Nanochat provides**:
- **Systematic comparison**: A/B test all frameworks
- **Production readiness**: Real training infrastructure
- **Reproducibility**: Standardized evaluation protocol
- **Scalability**: From toy models to production-scale

**Together they create**:
- **Research → Implementation pipeline**: Validate in JAX, deploy in PyTorch
- **Bidirectional learning**: Production insights inform research
- **Comprehensive validation**: Theory, demos, and empirical results

## 🚀 Quick Start

### Prerequisites

- **Python 3.13+** (uses latest Python features)
- **[uv](https://github.com/astral-sh/uv)** - Modern Python package manager
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```
- **8GB+ RAM** recommended
- **
...[truncated]

## Links

- [GitHub](https://github.com/Dicklesworthstone/model_guided_research)
- [Original Tweet](https://x.com/doodlestein/status/2005815788628762640)
