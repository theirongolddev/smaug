---
title: msgvault - Local-First Email Archive with MCP Server
author: Wes McKinney
url: https://wesmckinney.com/blog/announcing-msgvault/
archived: 2026-02-02
tags:
  - email
  - database
  - duckdb
  - mcp
  - go
  - open-source
  - archive
---

# msgvault

Local-first email archive with a terminal UI and MCP server, powered by DuckDB. Built by Wes McKinney as an alternative to letting Gmail hold your data hostage.

## Key Features

- **Local-first architecture**: Your email data stays on your machine
- **Terminal UI**: Command-line interface for interacting with your archive
- **MCP Server integration**: Built-in Model Context Protocol server for AI integration
- **DuckDB powered**: Efficient querying and analysis of email archives
- **Single Go binary**: Easy deployment, minimal dependencies

## Details

- **Creator**: Wes McKinney (author of pandas, Apache Arrow)
- **Use case**: Archive large Gmail accounts (2M+ emails, 150K+ attachments)
- **License**: Open source
- **Built with**: Go, DuckDB

## Why It Matters

Solves the problem of email data lock-in and enables local querying of large email archives with MCP integration for AI-powered email analysis.

## Resources

- **Blog post**: https://wesmckinney.com/blog/announcing-msgvault/
- **Tweet**: https://x.com/wesmckinn/status/2018303622145065455
