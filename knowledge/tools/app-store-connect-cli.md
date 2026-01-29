---
title: App Store Connect CLI
type: tool
date_added: 2026-01-27
source: https://github.com/rudrankriyam/App-Store-Connect-CLI
language: Go
license: MIT
tags: [iOS, automation, AppStore, CLI, agentic]
via: @rudrank
---

# App Store Connect CLI

Fast, lightweight, AI-agent friendly CLI for App Store Connect. Ship iOS apps with zero friction.

## Key Features

- **Complete review workflow**: Covers app details, attachments, submissions, and review items through unified `asc review` command
- **AI-agent friendly**: JSON output, explicit flags, clean exit codes
- **Fast startup**: Go binary with minimal overhead
- **Zero friction**: Automate entire App Store submission process

## Installation

```bash
# Via Homebrew
brew tap rudrankriyam/tap
brew install rudrankriyam/tap/asc

# Install script (macOS/Linux)
curl -fsSL https://raw.githubusercontent.com/rudrankriyam/App-Store-Connect-CLI/main/install.sh | bash
```

## Authentication

```bash
asc auth login \
  --name "MyApp" \
  --key-id "ABC123" \
  --issuer-id "DEF456" \
  --private-key /path/to/AuthKey.p8
```

## Commands

- **TestFlight management**
- **Beta groups and testers**
- **Device management**
- **App Store operations**
- **Analytics & sales**
- **Xcode Cloud integration**
- **Game Center configuration**

## Design Philosophy

- **Explicit over cryptic**: Clear, unambiguous command structure
- **No interactive prompts**: Works seamlessly in CI/CD
- **Remote config**: Change prices, enable features, run tests without app review cycles

## Stars: 381
