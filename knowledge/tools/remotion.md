---
type: tool
title: Remotion
date_added: 2026-01-27
source: https://www.remotion.dev/
tags: [video, react, marketing, automation, programmatic]
via: research
---

# Remotion - Programmatic Video Creation with React

## Overview

Remotion is an open-source framework for creating videos programmatically using React. Each video frame is a React component, and the final output renders to MP4 or WebM. As of January 2026, it includes "Remotion Skills" - a natural language interface that works with Claude Code, allowing video creation via text descriptions instead of manual coding.

**Core Concept:** Remotion treats video as a React application. You render React components for each frame number, using all web technologies (CSS, Canvas, SVG, WebGL).

**GitHub:** https://github.com/remotion-dev/remotion

## Key Features

- **Programmatic video generation** - Videos created via React code, not video editing software
- **Batch rendering** - Generate hundreds/thousands of videos from JSON datasets
- **Full web stack** - Leverage CSS animations, Canvas, SVG, WebGL, etc.
- **Data-driven** - Integrate with databases, APIs, spreadsheets for dynamic content
- **AI-powered (2026)** - Remotion Skills allows natural language video generation via Claude Code

## Licensing

- **Free:** Individual developers, non-profits, companies with ≤3 employees
- **Commercial license required:** Companies with 4+ employees

## Marketing Video Use Cases

### Personalized Marketing Videos
Generate thousands of personalized videos with unique customer data (names, preferences, purchase history). Perfect for email campaigns or targeted ads.

### Product Promotional Videos
Automatically update product videos with real-time info:
- New stock arrivals
- Ongoing promotions
- Price changes
- Product variations

**Ideal for e-commerce stores** needing scalable product video content.

### Dynamic Ad Creation
Batch-generate ads customized by:
- Demographics
- Geographic location
- Language
- Product highlights
- Voiceover variations

### Data Visualizations
Animated charts, graphs, dashboards for:
- Sales reports
- Analytics presentations
- Financial summaries

## Real-World Success Stories

Companies building marketing video businesses on Remotion:

- **Submagic** - AI shorts tool, $1M ARR in 3 months (2023)
- **AIVideo.com** - $1M ARR in under 1 year
- **Crayo** - Video stories generator, $500k+/month revenue
- **Typeframes** - SaaS product intro video generator

## Potential for BBB (Bits Bobs and Baubles)

### Product Showcase Videos
- **Batch-generate videos** for each bookmark design from product database
- Include product name, price, close-up shots, design details
- Automatically create "new arrivals" videos when adding products

### Social Media Content
- **Automated Instagram/TikTok Reels** featuring rotating product highlights
- Template-based "behind the scenes" videos with text overlays
- Market reminder videos (e.g., "Shop local this weekend at [Market Name]")

### Wholesale Pitch Videos
- **Personalized pitch videos** for each target shop
- Include shop name, relevant product selection, wholesale pricing
- Scale outreach with video instead of static PDFs

### Seasonal/Event Content
- Template for holiday promotions (update text/products per holiday)
- Market announcement videos with event details

## Potential for Printstead

### Feature Demo Videos
- **Automated feature tutorials** showing file management workflows
- Version control demonstrations
- Print settings comparison videos

### Onboarding Videos
- Personalized welcome videos with user's name
- Step-by-step setup guides
- Feature highlights based on user's plan tier

### Marketing/Landing Page
- **Explainer videos** generated from feature descriptions in database
- "How it works" animations
- Customer testimonial videos (template + text overlay)

### Product Updates
- Auto-generate "What's new" videos when deploying features
- Changelog videos for subscribers

## Technical Requirements

- **React/TypeScript knowledge** - Videos are React components
- **Node.js environment** - Runs on server or local machine
- **Rendering infrastructure** - Can render locally or use Remotion Lambda (AWS)
- **Claude Code integration** - Remotion Skills requires claude-code CLI

## Getting Started

1. Install: `npm install remotion`
2. Create project: `npx create-video`
3. Write React components for each scene
4. Render: `npx remotion render`

Or with Remotion Skills:
1. Install skill in Claude Code
2. Describe video in natural language
3. Claude generates React code
4. Review and render

## Cost Considerations

- **License:** Free for BBB (≤3 employees), may require license for future growth
- **Rendering:** Local rendering is free, cloud rendering (Remotion Lambda) has AWS costs
- **Development:** Initial learning curve, but templates reusable

## Integration with Claude Code

### Setup Process

1. **Create Remotion project:**
   ```bash
   npx create-video@latest my-video && cd my-video
   ```

2. **Install Remotion Skills:**
   ```bash
   npx skills add remotion-dev/skills
   ```
   This makes Claude Code understand Remotion's React-based video framework and write production-quality code on the first try.

3. **Start Claude Code:**
   ```bash
   claude
   ```

4. **Generate videos through conversation:**
   Describe what you want in natural language - Claude handles the code generation.

**Time investment:** ~1 hour initial setup to first video. After that, generate videos through conversation.

### Custom Skills for BBB/Printstead

Create project-specific skills that integrate with product data:

**BBB Product Video Skill** (`~/.claude/skills/bbb-product-video/SKILL.md`):
- Skill that reads BBB product database/spreadsheet
- Generates product showcase videos with consistent branding
- Accepts product ID or name, outputs rendered video
- Template includes: product name, price, close-up animation, design details

**Printstead Demo Skill** (`~/.claude/skills/printstead-demo/SKILL.md`):
- Generates feature demo videos from feature descriptions
- Consistent branding, tutorial format
- Accepts feature name, outputs walkthrough video

### Automation Workflows

**Batch Generation Script:**
```bash
# Read product list, generate video for each
for product in $(cat products.csv); do
  claude "Generate BBB product video for $product"
done
```

**Scheduled Content Creation:**
```bash
# Weekly social media content generation
cron: 0 9 * * MON claude "Generate 3 Instagram Reels for BBB featuring this week's products"
```

## Integration with Ghost

### Task-Triggered Video Generation

Ghost tasks can trigger video creation workflows:

**In `~/.claude/ghost/01-active/tasks.md`:**
```yaml
### bbb-weekly-content
- description: "Generate weekly social media videos"
- status: pending
- context: "Use Remotion to create 3 Instagram Reels from this week's product highlights"
```

**Ghost Task Hook:**
When task status changes to `in_progress`, automatically:
1. Read task context for video requirements
2. Launch Claude Code with Remotion skill
3. Generate videos based on task description
4. Mark task complete, log accomplishment

### Template Storage in Ghost Knowledge Base

Store video templates as Ghost knowledge:

**`~/.claude/ghost/04-knowledge/video-templates/bbb-product-showcase.md`:**
```markdown
---
type: video-template
project: bbb
template: product-showcase
---

# BBB Product Showcase Template

## Scene 1: Product reveal (0-2s)
- Fade in product image
- Product name overlay
- Smooth zoom animation

## Scene 2: Details (2-5s)
- Design highlights
- Close-up of unique features
- Price reveal

## Scene 3: CTA (5-7s)
- "Available at [Market Name]"
- Shop logo
- Fade out
```

Ghost can reference these templates when generating videos, ensuring consistency.

### Accomplishment Tracking

Log video generation as Ghost accomplishments:

```yaml
### bbb-instagram-videos-jan-27
- accomplishment: true
- outcome: "Generated 5 product videos: Bookmark A, Bookmark B, Bookmark C, Bookmark D, Bookmark E. Published to Instagram. Total reach: pending."
```

### Ghost + Remotion Workflow Examples

**Weekly Social Media Pipeline:**
1. Ghost `/next` surfaces task: "Generate weekly Instagram content"
2. Task context includes: product IDs, caption themes, posting schedule
3. Claude Code reads task, fetches product data
4. Remotion generates 3 videos from template
5. Videos saved to `/marketing/instagram/2026-01-27/`
6. Ghost marks task complete, logs accomplishment

**Wholesale Outreach Automation:**
1. Ghost task: "Send pitch to [Shop Name]"
2. Task includes: shop name, contact email, relevant products
3. Claude Code generates personalized pitch video with Remotion
4. Video includes shop name in opening, tailored product selection
5. Email sent with video link
6. Ghost tracks outreach in decisions log

**Product Launch Content:**
1. New product added to BBB inventory
2. Ghost webhook detects new product
3. Automatically creates task: "Generate launch content for [Product]"
4. Claude Code + Remotion creates: product video, Instagram story, market announcement
5. Ghost logs accomplishment with file paths

### MCP Integration Concept

**Future Enhancement:** Build MCP server that connects Ghost memory to Remotion:

```typescript
// MCP tool: generate_video_from_ghost_task
{
  taskId: "bbb-weekly-content",
  template: "product-showcase",
  outputPath: "/marketing/videos/"
}
```

MCP server:
1. Reads Ghost task by ID
2. Extracts video requirements from context
3. Fetches relevant data (products, branding)
4. Calls Remotion to render
5. Updates Ghost task status
6. Returns video file path

## Recommendation

**For BBB:** High value for social media content generation and wholesale outreach. The ability to batch-generate product videos from a spreadsheet could significantly scale Instagram presence without manual video editing.

**For Printstead:** Medium value. Best use case is onboarding/tutorial videos. Marketing videos less critical pre-launch, but could differentiate in a crowded SaaS market.

**Next Steps:**
1. Install Remotion Skills in Claude Code: `npx skills add remotion-dev/skills`
2. Prototype one BBB product video to evaluate effort vs. output quality
3. Create custom BBB product video skill in `~/.claude/skills/`
4. Build Ghost task integration for automated video generation

## Sources

- [Remotion Official Site](https://www.remotion.dev/)
- [GitHub - remotion-dev/remotion](https://github.com/remotion-dev/remotion)
- [Remotion Skills: AI-Powered Video Creation 2026](https://gaga.art/blog/remotion-skills/)
- [Create Videos Programmatically Using React - Clipcat](https://www.clipcat.com/blog/create-videos-programmatically-using-react-a-beginners-guide-to-remotion/)
- [Remotion Success Stories](https://www.remotion.dev/success-stories)
- [New Claude+Remotion to create amazing videos using AI - DEV Community](https://dev.to/mayu2008/new-clauderemotion-to-create-amazing-videos-using-ai-37bp)
- [Prompting videos with Claude Code](https://www.remotion.dev/docs/ai/claude-code)
- [Claude Code + Remotion = Professional Content With Zero Video Skills](https://medium.com/@ai-with-eric/claude-code-remotion-professional-content-with-zero-video-skills-3545498407ff)
- [Making Videos with Code: The Complete Guide to Remotion and Claude Code](https://medium.com/@creativeaininja/making-videos-with-code-the-complete-guide-to-remotion-and-claude-code-82892e21d022)
- [How To Turn Claude Code into a Video Director with Remotion](https://apidog.com/blog/claude-code-remotion/)
