---
title: "A Complete Guide To AGENTS.md"
type: article
date_added: 2026-02-09
source: "https://www.aihero.dev/a-complete-guide-to-agents-md"
author: "alexhillman"
tags: [agents-md, instruction-budget, progressive-disclosure, documentation-patterns, agent-performance, context-efficiency]
via: "Twitter bookmark from @alexhillman"
---

## Summary

An in-depth guide to writing effective AGENTS.md files that maximize agent performance through constraint and clarity. The article introduces the concept of an "instruction budget" (frontier LLMs can follow ~150-200 instructions consistently) and demonstrates how bloated, stale, or irrelevant instructions poison agent context. The solution is progressive disclosure: keep the root AGENTS.md minimal (3-5 sentences) and organize detailed instructions into hierarchical documentation trees.

## Key Takeaways

- **Instruction budget is real**: Every token in AGENTS.md loads on every request; 150-200 instruction capacity means bloated files = worse performance
- **Avoid the documentation trap**: Without discipline, AGENTS.md grows into unmaintainable "balls of mud" as developers add rules reactively to prevent agent mistakes
- **Never auto-generate**: Generated AGENTS.md files prioritize comprehensiveness over restraint and waste instruction budget on "useful for most scenarios"
- **Stale docs poison context**: File paths change constantly; agents confidently look in wrong places when documentation drifts from reality
- **Minimal root AGENTS.md**: Include ONLY:
  - One-sentence project description (acts like role-based prompt)
  - Package manager (if not npm)
  - Non-standard build/typecheck commands
  - Skip everything else
- **Use progressive disclosure**: Move language-specific rules (TypeScript conventions, testing patterns) to separate files (docs/TYPESCRIPT.md, docs/TESTING.md)
- **Describe capabilities, not file structure**: Instead of documenting exact paths, describe where things are and let agents explore; domain concepts are more stable than file locations
- **Nest hierarchically**: Create docs/ folders with linked documentation trees; agents navigate hierarchies efficiently for just-in-time learning
- **Monorepo structure**: Root explains shared context, package-level AGENTS.md files contain specific tech stack and conventions
- **Progressive refactoring prompt**: Copy-paste provided prompt into agent to refactor bloated AGENTS.md files into minimal root + organized separate files

## Full Content

Have you ever felt concerned about the size of your AGENTS.md file?
Maybe you should be. A bad AGENTS.md file can confuse your agent, become a maintenance nightmare, and cost you tokens on every request.
So you'd better know how to fix it.

An AGENTS.md file is a markdown file you check into Git that customizes how AI coding agents behave in your repository. It sits at the top of the conversation history, right below the system prompt.
Think of it as a configuration layer between the agent's base instructions and your actual codebase. The file can contain two types of guidance:

Personal scope: Your commit style preferences, coding patterns you prefer
Project scope: What the project does, which package manager you use, your architecture decisions

The AGENTS.md file is an open standard supported by many - though not all - tools.
CLAUDE.mdNotably, Claude Code doesn't use AGENTS.md - it uses CLAUDE.md instead. You can symlink between them to keep all your tools working the same way:# Create a symlink from AGENTS.md to CLAUDE.md
ln -s AGENTS.md CLAUDE.md

There's a natural feedback loop that causes AGENTS.md files to grow dangerously large:

The agent does something you don't like
You add a rule to prevent it
Repeat hundreds of times over months
File becomes a "ball of mud"

Different developers add conflicting opinions. Nobody does a full style pass. The result? An unmaintainable mess that actually hurts agent performance.
Another culprit: auto-generated AGENTS.md files. Never use initialization scripts to auto-generate your AGENTS.md. They flood the file with things that are "useful for most scenarios" but would be better progressively disclosed. Generated files prioritize comprehensiveness over restraint.
The Instruction Budget
Kyle from Humanlayer's article mentions the concept of an "instruction budget":

Frontier thinking LLMs can follow ~ 150-200 instructions with reasonable consistency. Smaller models can attend to fewer instructions than larger models, and non-thinking models can attend to fewer instructions than thinking models.

Every token in your AGENTS.md file gets loaded on every single request, regardless of whether it's relevant. This creates a hard budget problem:
ScenarioImpactSmall, focused AGENTS.mdMore tokens available for task-specific instructionsLarge, bloated AGENTS.mdFewer tokens for the actual work; agent gets confusedIrrelevant instructionsToken waste + agent distraction = worse performance
Taken together, this means that the ideal AGENTS.md file should be as small as possible.
Stale Documentation Poisons Context
Another issue for large AGENTS.md files is staleness.
Documentation goes out of date quickly. For human developers, stale docs are annoying, but the human usually has enough built-in memory to be skeptical about bad docs. For AI agents that read documentation on every request, stale information actively poisons the context.
This is especially dangerous when you document file system structure. File paths change constantly. If your AGENTS.md says "authentication logic lives in src/auth/handlers.ts" and that file gets renamed or moved, the agent will confidently look in the wrong place.
Instead of documenting structure, describe capabilities. Give hints about where things might be and the overall shape of the project. Let the agent generate its own just-in-time documentation during planning.
Domain concepts (like "organization" vs "group" vs "workspace") are more stable than file paths, so they're safer to document. But even these can drift in fast-moving AI-assisted codebases. Keep a light touch.

Be ruthless about what goes here. Consider this the absolute minimum:

One-sentence project description (acts like a role-based prompt)
Package manager (if not npm; or use corepack for warnings)
Build/typecheck commands (if non-standard)

That's honestly it. Everything else should go elsewhere.
The One-Liner Project Description
This single sentence gives the agent context about why they're working in this repository. It anchors every decision they make.
Example:
This is a React component library for accessible data visualization.
That's the foundation. The agent now understands its scope.
Package Manager Specification
If you're In a JavaScript project and using anything other than npm, tell the agent explicitly:
This project uses pnpm workspaces.
Without this, the agent might default to npm and generate incorrect commands.
Corepack is also great
You could also use corepack to let the system handle warnings automatically, saving you precious instruction budget.
Use Progressive Disclosure
Instead of cramming everything into AGENTS.md, use progressive disclosure: give the agent only what it needs right now, and point it to other resources when needed.
Agents are fast at navigating documentation hierarchies. They understand context well enough to find what they need.
Move Language-Specific Rules to Separate Files
If your AGENTS.md currently says:
Always use const instead of let.
Never use var.
Use interface instead of type when possible.
Use strict null checks.
...
Move that to a separate file instead. In your root AGENTS.md:
For TypeScript conventions, see docs/TYPESCRIPT.md
Notice the light touch, no "always," no all-caps forcing. Just a conversational reference.
The benefits:

TypeScript rules only load when the agent writes TypeScript
Other tasks (CSS debugging, dependency management) don't waste tokens
File stays focused and portable across model changes

Nest Progressive Disclosure
You can go even deeper. Your docs/TYPESCRIPT.md can reference docs/TESTING.md. Create a discoverable resource tree:
docs/
├── TYPESCRIPT.md
│   └── references TESTING.md
├── TESTING.md
│   └── references specific test runners
└── BUILD.md
└── references esbuild configuration
You can even link to external resources, Prisma docs, Next.js docs, etc. The agent will navigate these hierarchies efficiently.
Use Agent Skills
Many tools support "agent skills" - commands or workflows the agent can invoke to learn how to do something specific. These are another form of progressive disclosure: the agent pulls in knowledge only when needed.
We'll cover agent skills in-depth in a separate article.

You're not limited to a single AGENTS.md at the root. You can place AGENTS.md files in subdirectories, and they merge with the root level.
This is powerful for monorepos:
What Goes Where
LevelContentRootMonorepo purpose, how to navigate packages, shared tools (pnpm workspaces)PackagePackage purpose, specific tech stack, package-specific conventions
Root AGENTS.md:
This is a monorepo containing web services and CLI tools.
Use pnpm workspaces to manage dependencies.
See each package's AGENTS.md for specific guidelines.
Package-level AGENTS.md (in packages/api/AGENTS.md):
This package is a Node.js GraphQL API using Prisma.
Follow docs/API_CONVENTIONS.md for API design patterns.
Don't overload any level. The agent sees all merged AGENTS.md files in its context. Keep each level focused on what's relevant at that scope.

If you're starting to get nervous about the AGENTS.md file in your repo, and you want to refactor it to use progressive disclosure, try copy-pasting this prompt into your coding agent:
I want you to refactor my AGENTS.md file to follow progressive disclosure principles.
Follow these steps:
1. **Find contradictions**: Identify any instructions that conflict with each other. For each contradiction, ask me which version I want to keep.
2. **Identify the essentials**: Extract only what belongs in the root AGENTS.md:
- One-sentence project description
- Package manager (if not npm)
- Non-standard build/typecheck commands
- Anything truly relevant to every single task
3. **Group the rest**: Organize remaining instructions into logical categories (e.g., TypeScript conventions, testing patterns, API design, Git workflow). For each group, create a separate markdown file.
4. **Create the file structure**: Output:
- A minimal root AGENTS.md with markdown links to the separate files
- Each separate file with its relevant instructions
- A suggested docs/ folder structure
5. **Flag for deletion**: Identify any instructions that are:
- Redundant (the agent already knows this)
- Too vague to be actionable
- Overly obvious (like "write clean code")

When you're about to add something to your AGENTS.md, ask yourself where it belongs:
LocationWhen to useRoot AGENTS.mdRelevant to every single task in the repoSeparate fileRelevant to one domain (TypeScript, testing, etc.)Nested documentation treeCan be organized hierarchically
The ideal AGENTS.md is small, focused, and points elsewhere. It gives the agent just enough context to start working, with breadcrumbs to more detailed guidance.
Everything else lives in progressive disclosure: separate files, nested AGENTS.md files, or skills.
This keeps your instruction budget efficient, your agent focused, and your setup future-proof as tools and best practices evolve.

## Links

- [Article](https://www.aihero.dev/a-complete-guide-to-agents-md)
- [Original Tweet](https://x.com/alexhillman/status/2014420478518083714)
