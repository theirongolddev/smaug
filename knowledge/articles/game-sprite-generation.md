---
title: "Generating Animated Game Sprites using GPT 5.4 + Image 1.5"
type: article
date_added: 2026-03-11
source: "https://x.com/i/article/2031720286639333376"
author: "Chong-U"
tags: [game-dev, ai-image-generation, sprite-animation, gpt, prompt-engineering]
via: "Twitter bookmark from @LLMJunky"
---

Workflow for generating consistent AI animated game sprites using GPT 5.4 and Image 1.5 API.

## Workflow Overview

1. **Start from approved seed frame** — anchor to existing production sprite, not loose concept
2. **Build reference canvas** — upscale 64x64 sprite with nearest-neighbor, place in larger transparent 1024x1024 canvas with reserved frame slots
3. **Request full animation strip** — ask for one complete strip at once (not frame-by-frame) for better consistency
4. **Normalize to fixed frames** — detect sprite components, compute shared scale, pad to 64x64 transparent canvas
5. **Lock starting frame** — replace frame 01 with exact shipped sprite when animation should start from idle

## Key Constraints for Consistency

- **Anchor to production sprite**: Face, body proportions, palette, silhouette locked in
- **One global scale per animation**: Prevents tall poses (e.g., sword-up) from making character appear smaller
- **Shared edit canvas**: Larger upscaled reference prevents AI from degrading small details
- **Preserve frame 01**: Lock starting frame back to shipped sprite to guarantee animation origin

## Example Prompt Pattern

Request full 4-frame spritesheet with specific constraints:

> Intended use: candidate production spritesheet for a 2D side-view pirate platformer hurt animation review. Edit the provided transparent reference-canvas image into a single horizontal four-frame hurt spritesheet. The existing sprite in the leftmost slot is the exact shipped idle-v2 starting frame and must remain the starting frame for this sequence: same compact pirate hero, same right-facing side view, same red bandana, same blue tunic, same brown boots, same tan skin, same readable face, same proportions, same pixel-art silhouette family. Keep body size, head size, and outfit proportions consistent across all four frames. Style: authentic 16-bit pixel art, crisp pixel clusters, stepped shading, restrained palette, production game asset. Constraints: no sword, no weapon, no scenery, no floor, no glow.

## Lessons Learned

- **Consistency beats frame-by-frame**: Generating full strip in one request maintains character consistency better than editing individual frames
- **Seed matters**: Locking to exact production sprite prevents drift across animation frames
- **Shared scale solves pose height issues**: Using one scale for tall and short poses preserves character size while allowing natural pose variation
- **Edit canvas prevents degradation**: Upscaling and padding prevents AI from losing detail in small sprites

## Links

- [Original Article](https://x.com/i/article/2031720286639333376)
- [Original Tweet Series](https://x.com/chongdashu/status/2031474716704436484)
