---
title: "Claude Code overview - Claude Code Docs"
type: article
date_added: 2026-02-09
source: "https://code.claude.com/docs"
author: "aakashgupta"
tags: [claude-code, agentic-coding, developer-tools, ai-assisted-development]
via: "Twitter bookmark from @aakashgupta"
---

Claude Code is an agentic coding assistant that reads your codebase, edits files, and runs commands across multiple surfaces (terminal CLI, VS Code, JetBrains IDEs, browser, desktop app). It provides a unified interface where CLAUDE.md files, settings, and MCP servers sync across all environments. The tool enables developers to start coding locally and continue on mobile, integrate with CI/CD pipelines, and build custom agentic workflows through the Agent SDK. Available on native installs, package managers, and web without local setup.

## Key Takeaways
- **Multi-surface unified experience**: Same Claude Code engine across terminal, VS Code, desktop app, web, and JetBrains IDEs with synchronized configuration and history.
- **Full development workflow**: Edit files, run commands, read codebase, manage projects from CLI; inline diffs and context sharing in IDE extensions.
- **Flexible deployment options**: Native install recommended; also available via Homebrew, WinGet, VS Code extensions, or browser at claude.ai/code. Third-party provider support in Terminal and VS Code.
- **Integration ecosystem**: Connects with CI/CD (GitHub Actions, GitLab CI), chat, browser debugging, Slack routing, and custom agents via Agent SDK.

## Full Content

Claude Code is an agentic coding tool that reads your codebase, edits files, and runs commands. It works in your terminal, IDE, browser, and as a desktop app.Get started
Choose your environment to get started. Most surfaces require a Claude subscription or Anthropic Console account. The Terminal CLI and VS Code also support third-party providers.TerminalVS CodeDesktop appWebJetBrainsThe full-featured CLI for working with Claude Code directly in your terminal. Edit files, run commands, and manage your entire project from the command line.To install Claude Code, use one of the following methods:Native Install (Recommended)HomebrewWinGetmacOS, Linux, WSL:curl -fsSL https://claude.ai/install.sh | bash
Windows PowerShell:irm https://claude.ai/install.ps1 | iex
Windows CMD:curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
brew install --cask claude-code
winget install Anthropic.ClaudeCode
Then start Claude Code in any project:cd your-project
claude
You’ll be prompted to log in on first use. That’s it! Continue with the Quickstart →The VS Code extension provides inline diffs, @-mentions, plan review, and conversation history directly in your editor.
Install for VS Code
Install for Cursor
Or search for “Claude Code” in the Extensions view (Cmd+Shift+X on Mac, Ctrl+Shift+X on Windows/Linux). After installing, open the Command Palette (Cmd+Shift+P / Ctrl+Shift+P), type “Claude Code”, and select Open in New Tab.Get started with VS Code →A standalone app for running Claude Code outside your IDE or terminal. Review diffs visually, run multiple sessions side by side, and kick off cloud sessions.Download and install:
macOS (Intel and Apple Silicon)
Windows (x64)
After installing, launch Claude, sign in, and click the Code tab to start coding.Learn more about the desktop app →Run Claude Code in your browser with no local setup. Kick off long-running tasks and check back when they’re done, work on repos you don’t have locally, or run multiple tasks in parallel. Available on desktop browsers and the Claude iOS app.Start coding at claude.ai/code.Get started on the web →A plugin for IntelliJ IDEA, PyCharm, WebStorm, and other JetBrains IDEs with interactive diff viewing and selection context sharing.Install the Claude Code plugin from the JetBrains Marketplace and restart your IDE.Get started with JetBrains →
What you can do
Here are some of the ways you can use Claude Code:
Use Claude Code everywhere
Each surface connects to the same underlying Claude Code engine, so your CLAUDE.md files, settings, and MCP servers work across all of them.
Beyond the Terminal, VS Code, JetBrains, Desktop, and Web environments above, Claude Code integrates with CI/CD, chat, and browser workflows:I want to…Best optionStart a task locally, continue on mobileWeb or Claude iOS appAutomate PR reviews and issue triageGitHub Actions or GitLab CI/CDRoute bug reports from Slack to pull requestsSlackDebug live web applicationsChromeBuild custom agents for your own workflowsAgent SDK
Next steps
Once you’ve installed Claude Code, these guides help you go deeper.
Quickstart: walk through your first real task, from exploring a codebase to committing a fix
Level up with best practices and common workflows
Settings: customize Claude Code for your workflow
Troubleshooting: solutions for common issues
code.claude.com: demos, pricing, and product details

## Links

- [Article](https://code.claude.com/docs)
- [Original Tweet](https://x.com/aakashgupta/status/2015143414258688314)
