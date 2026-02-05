---
title: "YouTube Video Ingestion for Ghost - Research & Architecture"
type: research
date_added: 2026-02-02
tags: [youtube, transcription, knowledge-pipeline, ghost-architecture, mcp, whisper, video]
via: "Deep research session - 3 parallel agents"
---

# YouTube Video Ingestion for Ghost

## The Landscape (Feb 2026)

### MCP Servers for YouTube Transcription

| Server | Key Feature | Install |
|---|---|---|
| [kimtaeyoon83/mcp-server-youtube-transcript](https://github.com/kimtaeyoon83/mcp-server-youtube-transcript) | Most referenced, npm, zero deps, ad filtering | `npx -y @kimtaeyoon83/mcp-server-youtube-transcript` |
| [hancengiz/youtube-transcript-mcp](https://github.com/hancengiz/youtube-transcript-mcp) (Fabriqa.ai) | Claude Code-specific, sub-agent isolation | `npx @fabriqa.ai/youtube-transcript-mcp@latest` |
| [jkawamoto/mcp-youtube-transcript](https://github.com/jkawamoto/mcp-youtube-transcript) | Cursor-based pagination for long videos (50K char split), Docker | `npx @nicepkg/mcp-youtube-transcript` |
| [ergut/youtube-transcript-mcp](https://github.com/ergut/youtube-transcript-mcp) | First remote MCP (Cloudflare Workers), zero local setup | Uses `npx mcp-remote` |
| [adhikasp/mcp-youtube](https://github.com/adhikasp/mcp-youtube) | Lightweight Python | `uvx` |

All scrape YouTube's undocumented Innertube API for captions. No API key needed.

### Underlying Libraries

- **Python:** [jdepoix/youtube-transcript-api](https://github.com/jdepoix/youtube-transcript-api) - 6.8K stars, actively maintained (v1.2.3, Python 3.14 support)
- **Node.js:** [youtube-transcript](https://www.npmjs.com/package/youtube-transcript) - 66 dependents, simple API
- **Node.js alt:** [youtube-caption-extractor](https://www.npmjs.com/package/youtube-caption-extractor) - Innertube API with bot-detection bypass, Edge runtime support

### Standalone Tools

- **[Fabric](https://github.com/danielmiessler/Fabric)** - CLI framework with `extract_wisdom` pattern for structured video analysis (Summary, Ideas, Insights, Quotes, Habits, Facts, References)
- **[tapestry-skills-for-claude-code](https://github.com/michalparkola/tapestry-skills-for-claude-code)** - Claude Code skill with priority chain: manual subs → auto-generated → Whisper fallback

### Hosted APIs

- **[Supadata](https://supadata.ai/youtube-transcript-api)** - 100 free requests, AI fallback pipeline, supports YouTube/TikTok/Instagram/Facebook. Use `mode=native` for caption-only (cheaper)
- **[youtube-transcript.io](https://www.youtube-transcript.io/api)** - Rate limited: 5 req/10 sec

## Critical Limitations

### Caption Quality
- Auto-captions lack punctuation, mangle technical terms ("LangChain" → "lang chain")
- YouTube blocks cloud provider IPs (AWS, GCP, Azure) - only matters for cloud deployment, not local use
- ~250 sequential requests from one IP triggers blocks (irrelevant for personal use)

### MCP Protocol Cap
- 25,000 token response limit on MCP tool responses
- 60-min video transcript = ~20-30K tokens → exceeds limit
- Solution: jkawamoto server does cursor-based pagination

### Visual Content Gap
- Transcripts capture ~60-70% of video information
- Code on screen, diagrams, terminal output, slides shown but not read = invisible
- Multimodal (keyframe + vision LLM) costs ~$4/video vs ~$0.002 transcript-only

### Knowledge Decay
- Technical content goes stale fast
- No existing system handles freshness scoring well
- Summarization hallucinations compound over time (invented version numbers, API names)

## Cost Analysis (7 videos/week for 1 year)

| Component | Budget | Quality |
|---|---|---|
| Transcription | Free (YouTube captions) | $65 (Whisper API) |
| Summarization | $0.73 (GPT-4o-mini) | $11 (GPT-4o) |
| Embedding | $0.04 | $0.04 |
| Storage | Free (local SQLite) | Free (local) |
| **Total** | **~$1/year** | **~$76/year** |
| + Multimodal | +$1,456/year | (keyframe + vision LLM) |

Storage: ~150-200 MB after one year (transcript-only pipeline)

## Ghost Integration Architecture

### Fits Existing Patterns
- One-file-per-item (like smaug-tools)
- YAML frontmatter + markdown
- qmd auto-indexes new files
- `/api/search` works immediately
- Shadow git tracks changes
- MCP tools searchable by external sessions

### Proposed File Format
```yaml
---
title: "Video Title"
type: video
date_added: 2026-02-02
source: "https://youtube.com/watch?v=..."
duration_minutes: 45
channel: "Channel Name"
tags: [ai, llms, coding]
via: "YouTube bookmark"
transcript_available: true
cognitive_demand: medium
---
```

### Innovation Opportunities (Ghost-Specific)
1. **Energy-aware video recommendations** - Tag videos with cognitive_demand, surface via /ghost:next based on spoon level
2. **Cross-source correlation** - Connect bookmarked tweets about tools to YouTube deep-dive videos about same tools
3. **Freshness scoring** - Weight recency + topic volatility (AI decays fast, math doesn't)
4. **Transcript post-processing** - Fix proper nouns, add punctuation via small local LLM

### Implementation Phases
- **Phase 0:** Install MCP server (5 min, one command)
- **Phase 1:** Ghost skill for structured ingestion (2-4 hours)
- **Phase 2:** Batch pipeline with watchlist (1-2 days)
- **Phase 3:** UI integration in Knowledge page (1-2 days)
- **Phase 4:** Energy tagging + /ghost:next (4-8 hours)
- **Phase 5:** Multimodal keyframe extraction (3-5 days, ongoing API costs) — TRAP: don't build first

## Key Decision: Phase 5 is a trap
Multimodal sounds exciting but cost/complexity ratio is terrible for personal use. Transcripts cover 90%+ of value for talks, podcasts, interviews. Only coding tutorials suffer, and you're usually watching + coding along for those anyway.

## Whisper Options (for videos without captions)

| Implementation | Speed (1hr audio) | Notes |
|---|---|---|
| [faster-whisper](https://github.com/SYSTRAN/faster-whisper) | 2-5 min (RTX 3080) | Best Python integration, INT8/FP16 |
| [whisper.cpp](https://github.com/ggerganov/whisper.cpp) | Near real-time CPU | Most portable, slightly lower accuracy |
| Groq API + Whisper | Very fast | Free tier available |
| OpenAI Whisper API | 4-7 sec latency | $0.006/min ($0.36/hr) |

Whisper Large V3 Turbo: 6x faster, within 1-2% accuracy of full model.
