---
title: Assistant Plan File Template
type: tool
date_added: 2026-01-31
source: https://gist.github.com/alexknowshtml/7629fbd8b4f50dd9a04e5c40b9b77bc9
tags: [planning, prompting, claude, code-patterns, task-templates, success-criteria]
via: "Twitter bookmark from @alexhillman"
---

# Assistant Plan File Template

A plan file template that goes beyond step-by-step task lists by including concrete success criteria based on existing code patterns and project conventions.

## Key Pattern

Rather than generic task descriptions, plan files should include:
- **Step-by-step tasks** (what needs to be done)
- **Success criteria with code examples** (what the result should look like)
- **Code patterns from the existing codebase** (to ensure consistency)
- **Contextual references** (how new code relates to existing patterns)

## Why This Works

When you provide Claude with examples of how your codebase already solves similar problems, the assistant can:
- Maintain architectural consistency
- Reuse existing patterns and techniques
- Write code that feels native to the project
- Avoid introducing new patterns when existing ones apply
- Produce implementation that matches team conventions

## Implementation Strategy

1. Extract working examples from your codebase that solve similar problems
2. Include them as "success criteria" in the plan
3. Let Claude reference these patterns during implementation
4. Result: code that seamlessly integrates with existing architecture

## Usage Example

Instead of:
```
Task: Add authentication to user endpoints
Success Criteria: Users can log in
```

Provide:
```
Task: Add authentication to user endpoints
Success Criteria: Similar to how the /profile endpoint validates JWT tokens
Code Pattern Reference:
[include actual auth implementation from existing endpoint]
```

This grounds Claude's implementation in your project's actual patterns rather than generic best practices.
