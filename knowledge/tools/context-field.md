---
title: "context-field"
type: tool
date_added: 2026-02-09
source: "https://github.com/NeoVertex1/context-field/blob/main/code_field.md"
stars: 136
language: "Shell"
tags: [prompting, llm-optimization, code-quality, cognitive-constraints, research]
via: "Twitter bookmark from @BLUECOW009"
---

Context Fields is a prompting methodology that uses "inhibition" (telling LLMs what NOT to do) instead of instructions to achieve dramatically better results. Research from @BLUECOW009 showed that inhibition-based prompts increased assumption documentation from 0% to 100%, bug detection from 39% to 89%, and critical bug severity recognition from 0% to 100% compared to baseline prompting.

## Key Takeaways

- **Inhibition > Instruction**: Telling LLMs what NOT to do creates blockers they cannot bypass, unlike instructions which create mere preferences
- **21 Composable Fields**: The toolkit includes core fields like /code, /interview, /critic, /debug, and anti-fields like /elaborate and /trust for situational reversal
- **Dramatic Quality Improvements**: Tested compositions (e.g., /code + /critic for code review) show consistent improvements in bug detection, security awareness, and assumption documentation
- **Four Primitives**: Every field combines inhibition, forcing functions, meta-monitors, and scope bounds to reshape LLM cognition
- **Auto-Activation**: Fields auto-apply based on request type (code errors trigger /debug, writing requests trigger /concise, etc.)

## README

# Context Fields

**Stop telling LLMs what to do. Tell them what NOT to do.**

Context Fields are composable cognitive constraints that reshape how Claude thinks. Instead of instructions that can be ignored, they create blockers that must be resolved.

## The Core Discovery

Standard prompt engineering uses instructions: *"Consider edge cases. Write secure code."*

These create preferences. When the easy path is obvious, preferences lose.

Context Fields use inhibitions: *"Do not handle only the happy path."*

These create blockers. The model cannot proceed without addressing them.

**Results from testing:**
- Assumption stating: 0% → 100%
- Hidden bug discovery: +320%
- Refuses bad requests: 0% → 100%

## Installation (Claude Code Plugin)

```bash
# Add the marketplace
claude plugin marketplace add NeoVertex1/context-field

# Install the plugin
claude plugin install context-fields
```

After installation, fields auto-activate based on your request type, or use them explicitly:

```
/context-fields:code Write a function to validate email addresses
/context-fields:debug My React app crashes on button click
/context-fields:interview Should I quit my job?
```

## The Fields (21 Total)

### Core Fields (15)

| Field | Purpose | Key Constraint |
|-------|---------|----------------|
| `/code` | Assumption-stating before coding | Do not write code before stating assumptions |
| `/interview` | Questions before advice | Do not answer before understanding the real problem |
| `/critic` | Rigorous examination | Do not accept the premise without examining it |
| `/debug` | Root cause analysis | Do not propose fixes before understanding failure |
| `/creative` | Unfiltered ideation | Do not filter ideas before expressing them |
| `/simplify` | Reduction to essentials | Do not add abstraction before proving it's needed |
| `/empathy` | Emotional acknowledgment first | Do not solve before acknowledging feelings |
| `/concise` | Brevity and directness | Do not write more when less would suffice |
| `/planning` | Structure before execution | Do not execute before planning |
| `/scope` | Explicit boundaries | Do not start without defining what's in and out |
| `/teacher` | Understanding verification | Do not explain next concept before verifying previous |
| `/steelman` | Strongest version of arguments | Do not attack the weak version |
| `/adversarial` | Failure mode identification | Do not assume good faith inputs |
| `/explore` | Delayed commitment, retain ambiguity | Do not conclude when the question is still opening |
| `/novel` | Non-obvious, original thinking | Do not suggest the first idea that comes to mind |

### Anti-Fields (6)

For when you want the normally-discouraged behavior:

| Field | Inverse Of | Purpose |
|-------|------------|---------|
| `/elaborate` | /simplify | Explore full complexity |
| `/trust` | /critic | Build on ideas, assume good faith |
| `/conventional` | /creative | Prefer proven patterns |
| `/verbose` | /concise | Full explanations with context |
| `/solve` | /interview | Immediate solutions over questions |

### Tools (1)

| Field | Purpose |
|-------|---------|
| `/generate` | Create new fields from failure descriptions |

## How It Works

### The Four Primitives

Every field is built from these components:

1. **Inhibition**: "Do not X" - Creates a blocker that must be resolved
2. **Forcing Function**: "What/Why/How?" - Redirects processing
3. **Meta-monitor**: "Before X, do Y" - Creates a checkpoint
4. **Scope Bound**: "Under what conditions..." - Forces explicit limitation

### Why Inhibition Beats Instruction

| Approach | Example | What Happens |
|----------|---------|--------------|
| Instruction | "Consider edge cases" | Model tries, but takes easy path when uncertain |
| Inhibition | "Do not handle only the happy path" | Model cannot proceed without addressing edge cases |

**Analogy:**
- Instruction = suggesting a scenic route
- Inhibition = closing the highway

One influences. The other forces.

## Composition

Fields stack. Use multiple for complex tasks:

```
/context-fields:interview + /context-fields:scope

I want to build a social media app.
```

### Tested Compositions

| Composition | Use Case | Result |
|-------------|----------|--------|
| /code + /critic | Code review | Finds bugs AND design flaws |
| /interview + /scope | Requirements | Asks context AND bounds scope |
| /creative + /critic | Brainstorming | Generates THEN evaluates (phased) |
| /debug + /adversarial | Security | Diagnoses with threat modeling |
| /empathy + /interview | Life decisions | Acknowledges feelings, then explores |

**Key finding**: When fields have tension, the model naturally phases them. /creative + /critic produces generation first, then critique.

**5-field composition tested and working.**

## Auto-Activation

After installing the plugin, fields auto-activate based on request type:

| Request Type | Auto-Applies |
|--------------|--------------|
| Code errors/bugs | /debug |
| Writin
...[truncated]

## Links

- [GitHub](https://github.com/NeoVertex1/context-field/blob/main/code_field.md)
- [Original Tweet](https://x.com/BLUECOW009/status/2010221837389570364)
