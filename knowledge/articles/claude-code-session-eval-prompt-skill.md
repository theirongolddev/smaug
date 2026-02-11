---
title: "Claude Code Session Eval Prompt / Skill"
type: x-article
date_added: 2026-02-09
source: "https://x.com/i/article/2017913662099349504"
author: "bobsheth"
tags: [claude-code, evaluation, prompt, skill, performance-metrics, agentic-workflows]
via: "Twitter bookmark from @bobsheth"
---

A structured prompt-based evaluation skill for Claude Code sessions that provides weighted scoring across five dimensions: Spec Stability, First-Attempt Accuracy, Feedback Sentiment, Autonomy Level, and Completion Quality. Includes red flag deductions for common failure modes and outputs a final performance percentage with detailed breakdown.

## Key Takeaways
- Comprehensive 5-criterion evaluation framework with 25%, 25%, 20%, 15%, 15% weighting
- Red flag deduction system penalizes wrong-path corrections, repeated mistakes, ignored instructions, and work restarts
- Weighted average calculation plus deductions (floor 0, cap 100) produces normalized final score
- Designed for evaluating Claude Code's autonomous performance in iterative coding sessions
- Outputs standardized performance report for session analysis and improvement tracking
- Framework applies to both skill/rule evals and general agentic coding workflows

## Full Content

Claude Code Session Eval Prompt / Skill

---
name: cc-performance
description: claude code performance evaluation score prompt to calculate how well the coding agent performed.
---
# Session Performance Evaluation

You are evaluating the performance of a completed coding session. Review the session's full history including content, updates, and activity log to calculate a performance score.

## Evaluation Criteria

Score each criterion from 0-100, then calculate the weighted average:

### 1. Spec Stability (25% weight)

How stable were the requirements throughout the session?
- **100**: No changes to original spec
- **75**: Minor clarifications only
- **50**: Moderate scope adjustments
- **25**: Significant spec rewrites
- **0**: Complete pivot from original requirements

### 2. First-Attempt Accuracy (25% weight)

Did the agent understand and execute correctly on first attempt?

- **100**: Correct approach from the start
- **75**: Minor course corrections needed
- **50**: Required redirection but recovered well
- **25**: Multiple attempts before correct path
- **0**: Never achieved correct understanding

### 3. Feedback Sentiment (20% weight)

What was the tone of user feedback throughout?

- **100**: Positive/neutral feedback only
- **75**: Mostly positive with minor frustrations
- **50**: Mixed feedback
- **25**: Predominantly negative/frustrated feedback
- **0**: Heated exchanges or explicit dissatisfaction

### 4. Autonomy Level (15% weight)

How independently did the agent work?

- **100**: Completed with minimal guidance
- **75**: Occasional clarifying questions
- **50**: Regular back-and-forth required
- **25**: Heavy hand-holding needed
- **0**: Required constant correction

### 5. Completion Quality (15% weight)

Was the final deliverable complete and correct?

- **100**: Fully complete, no issues
- **75**: Complete with minor gaps
- **50**: Mostly complete, some rework needed
- **25**: Significant gaps or errors
- **0**: Did not meet requirements

## Red Flags (Deductions)

Apply deductions for these issues:

- **"Wrong path" correction**: -10 points per occurrence
- **Repeated same mistake**: -15 points per occurrence  
- **User had to explain same thing twice**: -10 points
- **Ignored explicit instruction**: -20 points per occurrence
- **Had to restart/redo significant work**: -25 points

## Evaluation Process

1. **Read the ticket content** - Understand the original requirements
2. **Review activity log** - Look for status changes, update patterns, pause/resume cycles
3. **Analyze update content** - Check for correction patterns, feedback tone, spec changes
4. **Identify red flags** - Note any deduction triggers
5. **Calculate scores** - Score each criterion and apply deductions
6. **Compute final score** - Weighted average minus deductions (floor at 0, cap at 100)

## Output Format

Provide your evaluation in this format:

### Ticket Performance Report

**Scores by Criterion**
| Criterion | Score | Weight | Weighted |

|-----------|-------|--------|----------|
| Spec Stability | X | 25% | X |
| First-Attempt Accuracy | X | 25% | X |
| Feedback Sentiment | X | 20% | X |
| Autonomy Level | X | 15% | X |
| Completion Quality | X | 15% | X |
| **Subtotal** | | | **X** |

**Deductions**

- [List any red flags and their deductions]
- Total Deductions: -X

**Final Score: X%** to be saved [UPDATE_FIELD TICKET_EVAL]

**Summary**: [2-3 sentence summary of performance]

## Links

- [Article](https://x.com/i/article/2017913662099349504)
- [Original Tweet](https://x.com/bobsheth/status/2018797457497542743)
