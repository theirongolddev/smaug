---
title: "How to build an AI boardroom in Claude Code"
type: x-article
date_added: 2026-02-14
source: "https://x.com/i/article/2011917192032362496"
author: "alliekmiller"
tags: [claude-code, ai-advisors, strategic-decision-making, multi-agent, skill-building, business-tools]
via: "Twitter bookmark from @alliekmiller"
---

A practical guide to building a /boardroom Claude Code skill that spins up 6 AI advisor agents (roleplaying as different business leaders) to debate strategic decisions in two rounds. Round 1 has all advisors write positions in parallel; Round 2 has them read each other's actual arguments and rebut while potentially changing their votes. The skill auto-generates markdown debate transcripts, interactive HTML with assumption sliders for dynamic projections, and print-ready PDFs. At ~$5-8 compute per session, it delivers board-of-directors-quality strategic debate on demand.

## Key Takeaways

- Build custom advisor personas based on who you respect strategically—mix perspectives (pricing expert, product expert, platform thinker, naysayer, radical thinker)
- Two-round adversarial debate structure forces agents to engage with actual arguments, not just produce positions
- Deliverables automation: markdown vote tracker + interactive HTML with dynamic projections + PDF for team sharing
- Customize advisors per domain (SaaS founders, creators, legacy thinkers, etc.) and include people you might disagree with
- The skill reads business context documents you provide (markdown files) to ground decisions in real company data
- Cost-effective: $5-8 compute vs consulting fees for equivalent strategic depth
- The prompts are provided openly, making it a template you can modify and extend

## Full Content

How to build an AI boardroom in Claude Code

AI is making me feel like my team is unlimited in size and capability. And I want to lay out one of the more fun ways I see that unfolding. 

I built a /boardroom command in Claude Code that spins up 6 AI agents - each roleplaying as a different business leader I admire - and has them debate my strategic decisions in two rounds.

Round 1: They all write their positions in parallel (~2 min)

Round 2: They read each other's ACTUAL arguments and fight. They name names. They quote each other. They change their votes or double down. It's mutiny. It's glorious.

Then it auto-generates:
- A markdown file with the full debate + vote tracker
- An interactive HTML with sliders to adjust assumptions and watch revenue or cost or impact projections change
- A clean PDF I can send to my team

The whole thing runs off a single slash command. I type /boardroom "should I price this at $25,000 or $50,000?" or "/boardroom how should I launch <product x file path>?" and 4 minutes later I have a folder with a full strategic debate that I can literally interact with from "people" who think completely differently from each other.

("People" being in air quotes, of course.)

Best part: the AI avatars of these folks actually disagree. The pricing person attacks the product person. The platform thinker tells the exclusivity person they're thinking too small. Someone changes their mind in Round 2 after reading another advisor's argument.

It's a board of directors on demand for maybe $5-8 in compute. A complete no-brainer for any complex decisions.

Here's the prompt you can steal to build your own.

---

AI Boardroom Claude Code Skills Prompt:

```
Create a Claude Code slash command at ~/.claude/commands/boardroom.md that does the following:

I want to specify [NUMBER] advisors aka real people whose strategic thinking I admire. Some folks I'd like you to start with are <name of first board member> and <name of second board member>. 

For each advisor, include:
- Their name
- A 2-3 sentence personality profile describing how they think, what they prioritize, and what biases they bring (you will find this online)

Prompt me for deep cut information on my business and types of decisions so we can select the right board of advisors (ie experts in my field, adjacent experts, naysayers, radical thinkers, impact-driven leaders, etc).

When I invoke /boardroom [my question], it should:

ROUND 1 (parallel):
- Spin up [NUMBER] agents as a team, one per advisor
- Each agent reads a business context document* I provide (a markdown file describing my business, revenue, team, products, goals, and positioning) 
- Each writes 800-1200 words arguing their position on my question (or as many words as needed - more or less - to convey 95% of their point)
- Each includes a YES/NO/CONDITIONAL vote, specific numbers, and projections on cost, revenue, impact, and team joy

ROUND 2 (parallel):
- Collect all Round 1 positions
- Send every advisor ALL the other positions
- Each writes a 400-800 word rebuttal that includes:
  - Who they disagree with most and WHY (referencing their actual argument)
  - Whether anyone changed their mind
  - Their FINAL vote (which can differ from Round 1)

DELIVERABLES:
- Create a folder named after the decision and save it <file path>
- Markdown file: vote tracker (Round 1 vs Final), consensus, key tensions, arguments, rebuttals, relevant decision framework 
- HTML file: branded, interactive sliders for key assumptions (price, participants, conversion rate, hours committed, complexity) that dynamically recalculate impact projections. Show vote changes visually. Styled cards for each advisor.
- PDF file: print-optimized version for sharing with team
Present back to me a synthesis: final votes, who changed their mind, biggest fights, sharpest insight, and likely decision.
```

---

You'll want to customize the advisor list to match your industry and goals. A SaaS founder might want Jensen Huang, Marc Benioff, Ginny Rometty, and Patrick Collison arguing about strategy. A creator might want MrBeast, Alex Hormozi, and Codie Sanchez debating monetization. If you find you're not thinking big enough, maybe pull in Elon Musk, Melinda Gates, and Jeff Bezos. Or if you're thinking about legacy maybe Katherine Johnson, Eleanor Roosevelt, and Marie Curie. Or add people out of left field just to shake things up: David Bowie, David Guetta, David Tennant, and Dave Chappelle.

Pick people who think differently from each other, especially people who might disagree with you or with each other - that's where the real value is.

---

*Note: I create context documents for key parts of my life - including my personal constitution, my business, my career, my family, my friends, and my 2026 goals. I point this skill, and many other skills, directly at these documents. [If you want the prompts to create those context docs to fully customize AI outputs for yourself, just go here.](https://www.linkedin.com/posts/alliekmiller_new-i-just-dropped-something-that-will-completely-activity-7423060787654479872-4qZE)

## Links

- [Article](https://x.com/i/article/2011917192032362496)
- [Original Tweet](https://x.com/alliekmiller/status/2021578555034149188)
