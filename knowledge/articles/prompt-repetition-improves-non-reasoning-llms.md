---
title: "Prompt Repetition Improves Non-Reasoning LLMs"
type: article
date_added: 2026-02-18
source: "https://www.chapterpal.com/s/1b15378b/prompt-repetition-improves-non-reasoning-llms"
author: "burkov"
tags: [llm-prompting, prompt-engineering, accuracy, research, non-reasoning-models]
via: "Twitter bookmark from @burkov"
---

Sending a prompt twice in a row (instead of once) improves LLM accuracy across multiple benchmarks and models without any increase in output length or meaningful latency penalty. This works because LLMs process tokens left-to-right with no future attention—context seen at the beginning cannot influence itself during generation. A second pass allows every token to attend to the full input, fixing the fundamental asymmetry where context tokens were generated without awareness of the task they're supporting. Improvements range from small to dramatic (one model jumped from 21% to 97% on a name-finding task).

## Key Takeaways

- **Structural asymmetry in LLM processing**: LLMs process left-to-right and tokens can only attend backward. This means context at the beginning is generated without knowing the task at the end, creating an inherent asymmetry between how context is generated and how it's used.
- **Double-pass solves asymmetry**: Sending the prompt twice in a row (context + question, then context + question again) gives every token a second opportunity to attend to the complete input, fixing the generation-usage mismatch without additional output cost.
- **Tested across models and benchmarks**: Seven different benchmarks and models from Gemini, ChatGPT, Claude, and DeepSeek series all show improvements, demonstrating this is a general property of non-reasoning LLMs, not model-specific.
- **No latency or cost penalty**: The input processing is parallelized by hardware, so sending the prompt twice adds negligible latency. No increase in output tokens means no increase in generation cost. Only compute cost for the input, which is free compared to decoding.
- **Dramatic variance in improvement size**: Some tasks see small gains, others see massive jumps. A name-finding task improved from 21% accuracy to 97%, suggesting the technique is particularly powerful for tasks where the model needs to comprehensively attend to context before responding.

## Full Content

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="canonical" href="https://www.chapterpal.com/" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="ChapterPal transforms reading into active learning. Read research papers, textbooks, and technical documents with an AI companion that explains concepts in context." />
    <title>ChapterPal</title>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-CQ2R7FZXWB"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-CQ2R7FZXWB');
</script>
    <script type="module" crossorigin src="/assets/index-B-o9jnpX.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-BCpYbSsQ.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

## Links

- [Article](https://www.chapterpal.com/s/1b15378b/prompt-repetition-improves-non-reasoning-llms)
- [Original Tweet](https://x.com/burkov/status/2023822767284490263)
