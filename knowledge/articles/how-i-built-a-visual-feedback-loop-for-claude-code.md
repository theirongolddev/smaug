---
title: "How I Built a Visual Feedback Loop for Claude Code"
type: x-article
date_added: 2026-02-09
source: "https://x.com/i/article/2014439212838170624"
author: "seejayhess"
tags: ["claude-code", "visual-design", "workflow-optimization", "ui-mockups", "flowy"]
via: "Twitter bookmark from @seejayhess"
---

## Summary

ASCII art diagrams for describing visual layouts to Claude are inefficient and require multiple rounds of back-and-forth iteration. Flowy solves this by introducing a JSON-based diagram format that Claude can write to, which renders as interactive flowcharts and UI mockups in a browser. This creates a visual planning workflow where designers and Claude collaborate visually before writing any code, with the JSON source stored in git for version control. The result is faster iteration and implementation that matches the visual spec exactly.

## Key Takeaways

- ASCII diagrams are limiting; a JSON-based format enables Claude to render interactive, editable diagrams and mockups in the browser
- Visual planning before implementation improves code quality and reduces iteration cycles; design decisions are made visually, not through text descriptions
- Flowy's workflow: plan → generate diagrams → edit visually → Claude reads changes → refine → build implementation from visual spec
- JSON as source of truth enables version control, CI/CD integration, and bidirectional feedback between designer and Claude
- Skills like `/flowy-flowchart` and `/flowy-ui-mockup` make it natural for Claude to generate diagrams without manual JSON writing

## Full Content

How I Built a Visual Feedback Loop for Claude Code

# ASCII Art Isn't Cutting It Anymore

I love Claude Code. It's become essential to how I work. But I kept hitting the same wall: trying to describe exactly what I wanted in a flowchart or UI mockup using nothing but text.

```
┌─────────────┐     ┌─────────────┐
│   Button    │────▶│   Screen    │
└─────────────┘     └─────────────┘
```

These ASCII diagrams are fine for simple things, but the back-and-forth to get them right was exhausting. I'd describe what I wanted, Claude would draw it in ASCII, I'd squint at it trying to figure out if that's actually what I meant, then spend three more messages trying to adjust the layout.

The real problem was that it was difficult to be specific about visual things through prompts

## A JSON-Based Diagram Format Claude Can Write To

So I built Flowy.

The concept is simple, Claude writes JSON to a .flowy directory in your repo, and a dev server watches those files and renders them as interactive flowcharts and UI mockups in your browser. Figma-like editing.

The source of truth lives in your codebase as JSON. You can version it with git. Claude can read it, write it, and respond to your visual edits.

## Visual Planning Before Code

The real power comes from iterating visually before writing a single line of implementation code.

Here's my workflow now:

1. Start with a plan - I write a plan document with requirements and architecture

2. Claude generates diagrams - I ask Claude to create flowcharts and mockups in Flowy

3. I edit visually - I drag nodes around, adjust layouts, tweak the design

4. Claude notices changes - The JSON file updates, Claude can read my modifications

5. We refine together - Back and forth until the visual matches what I actually want

6. Then we build - Implementation follows the visual spec exactly

## Live Demo - Building a Quiz Feature

In my Vibe Code Camp demo, I walked through building a quiz feature for a Claude Code learning app. Here's what that looked like:

Step 1: The Plan

I had a plan document that described a 5-question quiz testing users' knowledge of Claude Code commands and shortcuts.

The plan outlined what needed to be built, but before touching any React code, Phase 1 was "Create flow diagrams and UI mockups."

Step 2: Generate the Diagrams

I asked Claude to create three Flowy visualizations:

1. Navigation Flow - How users get to and from the quiz

2. Gameplay Flow - The internal game logic and state machine

3. Screen Mockups - High-fidelity iPhone mockups of all four screens

The navigation flow shows the entry points (Learn Tab), the quiz screens (Intro → Questions → Results), persistence to AsyncStorage, and exit paths (Back, Done, Play Again).

The gameplay flow visualizes the actual game logic: initialization, the question loop with correct/wrong branching, score tracking, and the best-score check before saving.

Step 3: The UI Mockups

This is where Flowy really shines. Claude generated JSON that renders as actual iPhone mockups:

Four screens, laid out side-by-side:

- Quiz Intro - Brain icon, "Test Your Knowledge" title, best score card, Start button

- Question Screen - Progress bar, question card, four answer options (one selected)

- Answer Feedback - Wrong answer highlighted red with X, correct answer green with checkmark

- Results Screen - "Great Job!" title, 4/5 score, "New Best Score!" badge

Step 4: Edit and Iterate

Here's where the magic happens. In the demo, I:

1. Opened the mockup in Flowy

2. Dragged a node to reposition it

3. Changed some text

4. Saved

Claude immediately saw those changes in the JSON file. I could then ask Claude to update the plan based on my visual modifications, and it understood exactly what I'd changed.

Step 5: Build From the Visual Spec

With the visual planning done, implementation became almost mechanical. Claude had:

- Exact screen layouts to follow

- The state machine clearly visualized

- Component hierarchy evident from the mockup structure

We built the entire quiz feature in one session, and it matched the mockups exactly.

## Rough JSON Format

Flowy uses json to layout the files. The skills include everything Claude needs and I rarely look at these files.

Here's a simplified example of what Claude writes:

```json
{
  "version": "1.0",
  "name": "Quiz Navigation Flow",
  "nodes": [
    {
      "id": "learn-tab",
      "type": "rect",
      "label": "Learn Tab\n(index.tsx)",
      "position": { "x": 80, "y": 200 },
      "size": { "width": 120, "height": 70 },
      "style": {
        "fill": "#d0ebff",
        "stroke": "#1c7ed6",
        "cornerRadius": 10
      },
      "icon": { "name": "book-open", "size": 18, "color": "#1c7ed6" }
    }
  ],
  "edges": [
    { "id": "e1", "from": "learn-tab", "to": "quiz-card", "type": "arrow", "label": "displays" }
  ]
}
```

The schema supports:

- Node types: rect, circle, diamond

- Edge types: arrow, dashed, line, orthogonal, curved

- Icons: Integrated with Lucide icons

- Styling: Fill, stroke, corner radius, shadows, fonts

## Skills That I Use With Flowy

Flowy is designed to work with Claude Code skills. Here are the ones I use constantly:

```
/flowy-flowchart
```

Explicitly tells Claude to create flowcharts in Flowy format. Great for:

- Process flows

- State machines

- Architecture diagrams

- Decision trees

```
/flowy-ui-mockup
```

Creates iPhone mockups in Flowy. Perfect for:

- Screen designs before building

- Iterating on UI layout visually

- Communicating design intent

The mockup format includes:

- Device frames (notch, home bar, status bar)

- iOS-style components (buttons, cards, progress bars)

- Proper safe area handling

## The New Paradigm

Flowy represent a new medium that you can work back and forth with Claude Code. I have found it immensely useful for UI changes or complex workflows.

We're building toward releasing Flowy, if you are interested leave a comment saying "Flowy" and we'll make sure to get it into your hands as fast as possible.

## Links

- [Article](https://x.com/i/article/2014439212838170624)
- [Original Tweet](https://x.com/seejayhess/status/2014448070214197485)
