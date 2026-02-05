---
title: "Fabric YouTube Integration - Agent Implementation Reference"
type: research
date_added: 2026-02-03
tags: [fabric, youtube, transcription, ghost-admin, integration, implementation-ready]
via: "Deep research session - Feb 2-3 2026"
schema_version: 1
---

# Fabric YouTube Integration Reference

## What Is Fabric

- **Repo:** github.com/danielmiessler/Fabric (38.8K stars, MIT)
- **Language:** Go (single binary)
- **Version:** v1.4.397 (Jan 31, 2026) — ~100 releases in 6 months
- **Install:** `brew install fabric-ai` or `curl -fsSL https://raw.githubusercontent.com/danielmiessler/fabric/main/scripts/installer/install.sh | bash`
- **Setup:** `fabric --setup` (interactive, prompts for API keys)
- **Config dir:** `~/.config/fabric/`

## Core Concept

Pattern-based LLM orchestration. 243 reusable prompt patterns. Unix-pipe friendly CLI. Feed text in, structured output comes out.

## YouTube Processing

Uses **yt-dlp** under the hood (NOT youtube-transcript-api). Downloads VTT subtitle files, strips timestamps, passes clean text to LLM.

```bash
# Basic usage
fabric -y "https://youtube.com/watch?v=VIDEO_ID" -p extract_wisdom

# With timestamps
fabric -y "URL" --transcript-with-timestamps -p summarize

# Playlist
fabric -y "https://youtube.com/playlist?list=..." --playlist -p summarize

# Stream output
fabric -y "URL" -sp extract_wisdom

# Save to file
fabric -y "URL" -sp extract_wisdom -o output.md

# Specify model
fabric -y "URL" -p extract_wisdom -v anthropic -m claude-sonnet-4-20250514
```

**No API key needed for transcripts.** API key only needed for `--comments` and `--metadata`.
**No Whisper fallback.** If no captions exist, it fails. ~95% of videos have auto-captions.
**Requires:** yt-dlp >= 2025.06.09

## extract_wisdom Output Format

Nine structured sections:

1. **SUMMARY** — 25-word summary
2. **IDEAS** — 20-50 ideas (minimum 25)
3. **INSIGHTS** — 10-20 synthesized insights (each 15 words)
4. **QUOTES** — 15-30 exact quotes
5. **HABITS** — 15-30 habits mentioned
6. **FACTS** — 15-30 facts mentioned
7. **REFERENCES** — All tools, projects, books, sources mentioned
8. **ONE-SENTENCE TAKEAWAY** — Single sentence
9. **RECOMMENDATIONS** — Actionable recommendations

All bulleted lists. Markdown format.

## Other Useful Patterns

| Pattern | Purpose |
|---|---|
| `summarize` | General summary |
| `summarize_lecture` | Lecture-specific |
| `analyze_claims` | Evaluate claims |
| `create_flash_cards` | Flashcards |
| `create_video_chapters` | Chapter markers with timestamps |
| `extract_references` | All references/tools/sources |
| `create_quiz` | Quiz questions |

## REST API (for programmatic integration)

```bash
# Start server
fabric --serve --address :8080 --api-key my_secret_key

# Call from any language
curl -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -H "X-API-Key: my_secret_key" \
  -d '{"prompts": [{"userInput": "text", "vendor": "anthropic", "model": "claude-sonnet-4-20250514", "patternName": "extract_wisdom"}]}'

# YouTube transcript endpoint
curl -X POST http://localhost:8080/youtube/transcript \
  -d '{"url": "URL", "timestamps": true}'

# List patterns
curl http://localhost:8080/patterns/names
```

Returns SSE for streaming. Swagger docs at `/swagger/index.html`. Ollama-compatible API mode available.

## Subprocess Integration

```python
import subprocess
result = subprocess.run(
    ["fabric", "-p", "extract_wisdom", "-v", "anthropic", "-m", "claude-sonnet-4-20250514"],
    input=transcript_text, capture_output=True, text=True
)
output = result.stdout
```

## Cost Per Video (Sonnet 4 — recommended model)

| Video Length | Cost |
|---|---|
| 15 min | ~$0.04 |
| 30 min | ~$0.06 |
| 60 min | ~$0.11 |
| 90 min | ~$0.14 |

Annual at 5 videos/week: ~$16/year. Negligible.

## Custom Patterns

Drop `system.md` into `~/.config/fabric/patterns/pattern_name/`:

```markdown
# IDENTITY and PURPOSE
You are...

# STEPS
1. Step one
2. Step two

# OUTPUT INSTRUCTIONS
- Format rules

# INPUT:
INPUT:
```

## Known Issues

- YouTube HTTP 429 rate limiting (workaround: `--sleep-requests 5`)
- Subtitle language code mismatch (`en-US` vs `en`) causes silent failures
- `--yt-dlp-args` passthrough broken in some versions
- Weak models (4o-mini, small Ollama) produce empty sections
- 243 patterns with no descriptions in `--list` output
- Fast-moving project — tutorials go stale quickly

## Ghost Integration Decision

**Recommended approach:** Ghost Admin server spawns `fabric` CLI as subprocess (same pattern as Claude CLI spawning). YouTube URL → fabric extract_wisdom → parse output → write to ghost-data/04-knowledge/videos/.

**NOT recommended:** Fabric REST API server (extra process to manage, unnecessary complexity for single-user app).

**Model choice:** Sonnet 4 ($0.06/video). NOT Sonnet 4.5 or Opus — extraction tasks don't benefit from more expensive models.

**Dependency:** Requires `fabric` binary and `yt-dlp` installed on host. Both available via brew/apt.
