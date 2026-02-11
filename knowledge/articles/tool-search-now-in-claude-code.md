---
title: "Tool Search now in Claude Code"
type: x-article
date_added: 2026-02-09
source: "https://x.com/i/article/2011507229279825920"
author: "trq212"
tags: [claude-code, mcp, tools, context-optimization, lazy-loading]
via: "Twitter bookmark from @trq212"
---

Claude Code now includes MCP Tool Search, a context-aware feature that dynamically loads tools instead of preloading all tools. As MCP servers have grown to include 50+ tools, this feature addresses a major pain point: tools consuming excessive context (17+ servers consuming 67k+ tokens). Tool Search automatically triggers when tool descriptions would exceed 10% of context, enabling lazy loading similar to skills. This resolves GitHub's most-requested feature and maintains backward compatibility with existing MCP servers.

## Key Takeaways

- Tool Search dynamically loads MCP tools into context on-demand instead of preloading all tools
- Triggered automatically when tool descriptions exceed 10% of available context
- Resolves issue of setups with 7+ servers consuming 67k+ tokens
- Maintains full backward compatibility—all existing MCP tools work as before
- Server instructions become more useful with Tool Search to help Claude know when to search
- Implements ToolSearchTool with custom search function for Claude Code
- Programmatic tool composition explored but deferred in favor of immediate context savings

## Full Content

Tool Search now in Claude Code

Today we're rolling out MCP Tool Search for Claude Code. 

As MCP has grown to become a more popular protocol and agents have become more capable, we've found that MCP servers may have up to 50+ tools and take up a large amount of context.

Tool Search allows Claude Code to dynamically load tools into context when MCP tools would otherwise take up a lot of context.

How it works:
- Claude Code detects when your MCP tool descriptions would use more than 10% of context
- When triggered, tools are loaded via search instead of preloaded

Otherwise,  MCP tools work exactly as before.

This resolves one of our most-requested features on GitHub: [lazy loading for MCP servers](https://github.com/anthropics/claude-code/issues/7336). Users were documenting setups with 7+ servers consuming 67k+ tokens.

If you're making a MCP server
Things are mostly the same, but the "server instructions" field becomes more useful with tool search enabled. It helps Claude know when to search for your tools, similar to skills

If you're making a MCP client
We highly suggest implementing the ToolSearchTool,[ you can find the docs here](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool). We implemented it with a custom search function to make it work for Claude Code.

What about programmatic tool calling?
We experimented with doing programmatic tool calling such that MCP tools could be composed with each other via code. While we will continue to explore this in the future, we felt the most important need was to get Tool Search out to reduce context usage.

Tell us what you think here or on Github as you see the ToolSearchTool work.

## Links

- [Article](https://x.com/i/article/2011507229279825920)
- [Original Tweet](https://x.com/trq212/status/2011523109871108570)
