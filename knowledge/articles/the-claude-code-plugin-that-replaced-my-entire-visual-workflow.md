---
title: "the claude code plugin that replaced my entire visual workflow"
type: x-article
date_added: 2026-02-09
source: "https://x.com/i/article/2019860366264786944"
author: "omarsar0"
tags: ["claude-code", "image-generation", "agentic-workflows", "design", "iterative-refinement"]
via: "Twitter bookmark from @omarsar0"
---

A deep dive into "agentic image generation"—a Claude Code workflow that replaces traditional visual design tools (Figma, Canva) with an iterative loop: AI generates → user annotates → AI refines → repeat until perfect. Uses Claude Code with image generator and playground plugins.

## Key Takeaways

- **Agentic loops > single-shot prompts.** Most people prompt an AI once and accept whatever appears; agentic workflows iterate: generate, annotate feedback visually, refine, review, repeat until the image hits your bar.
- **Pattern works across all visuals:** blog covers, product mockups, social media graphics, architecture diagrams, infographics. Same workflow: generate → annotate → refine → repeat.
- **Key tools:** Claude Code + image generator plugin + playground plugin (interactive annotation interface that compiles feedback into structured prompts automatically).
- **Specificity matters.** "Snow-capped mountain at sunrise with golden light" beats "mountain." Reference photography terms, art styles, composition rules. More specific = fewer loops needed.
- **Works entirely in terminal/browser.** No switching between six different tools; the whole cycle happens in Claude Code.
- **Save as reusable skill.** Once you build the workflow, save it as a Claude Code skill so you run the same quality standard on every visual you produce.

## Full Content

the claude code plugin that replaced my entire visual workflow

what you will read here is what i refer to as [agentic image generation](https://academy.dair.ai/blog/agentic-context-engineering). and once you understand it, you'll never create visuals with ai the normal way again.

i've been using this with amazing results lately. here's how it works:

most people prompt an image generator once and get satisfied with whatever comes back. an agentic loop works differently.

it generates, you annotate the output visually, it diagnoses what's weak, regenerates, and you review again. it keeps looping until the image actually hits the bar you are looking for.

example: i built a workflow where claude code generates an infographic from a blog post, then spins up an interactive annotation tool so i can mark exactly what needs to change. "make these bubbles light green." "make the icons cleaner." "add complementary colors here." it compiles the feedback into a structured prompt automatically and regenerates. no manual prompt rewriting.

here is what we started with:

here is the improvement using both the image generation plugin and the playground plugin inside of claude code:

the same pattern works for everything:

- blog covers: describe the post topic, claude code reads the content, picks the layout, chooses colors, and generates. if it's not right, annotate and iterate.

- product mockups: generates a macbook mockup showing your dashboard with studio lighting. mark what's off. it fixes and regenerates.

- social media graphics: generates a 9:16 story image, evaluates composition against the platform's visual language. if a distracted scroller would keep scrolling, it reworks the layout.

- architecture diagrams: creates clean data flow visuals from your codebase. if the diagram is cluttered or missing a component, annotate the gaps, and it rebuilds.

- infographics: reads an entire article, extracts key concepts, designs the visual hierarchy. one prompt. no copying text, no switching tools.

the pattern is always the same: generate → annotate → refine → repeat.

now here's how to actually build one:

pick one visual task you do repeatedly. blog covers, social graphics, diagrams. whatever you create most often.

set up claude code with the [image generator](https://github.com/dair-ai/dair-academy-plugins) plugin. it uses gemini nano banana pro under the hood and supports text-to-image, image editing, multi-image composition, and up to 4K resolution.

add the [playground plugin](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/playground). this is the game changer. it builds an interactive annotation interface right in your browser so you can visually mark what needs improvement instead of trying to describe it in words.

build the loop. generate the image, open the annotation tool, mark the areas that need work, copy the compiled prompt, paste it back. claude reads your feedback, regenerates, and you review again. see a full example here: https://academy.dair.ai/blog/agentic-context-engineering

add specificity pressure. "snow-capped mountain at sunrise with golden light" beats "mountain." tell it where the image will be used so it picks the right dimensions and style. reference photography terms, art styles, or composition rules.

the more specific you are, the fewer loops you need.

save the workflow as a reusable pattern (build it as a skill). now you're not starting from scratch every time. you have a system that runs the same quality standard on every visual you produce.

the whole cycle happens without leaving your terminal and browser. no figma. no canva. no switching between six different tools.

i'm building more of these agentic workflows for builders and creators. follow @omarsar0  if you want them as they drop.

## Links

- [Article](https://x.com/i/article/2019860366264786944)
- [Original Tweet](https://x.com/omarsar0/status/2020546189536399568)
