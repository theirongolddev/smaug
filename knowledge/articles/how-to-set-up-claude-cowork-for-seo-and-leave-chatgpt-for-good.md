---
title: "How to Set Up Claude Cowork for SEO (and Leave ChatGPT for Good)"
type: x-article
date_added: 2026-03-10
source: "https://x.com/i/article/2030990122519592961"
author: "bloggersarvesh"
tags: [seo, local-seo, google-business-profile, claude, ai-workflow, marketing]
via: "Twitter bookmark from @bloggersarvesh"
---

Sarvesh Shrivastava's guide to using Claude Cowork — a persistent-workspace Claude environment — for local SEO. The core insight: load your business context (competitors, GBP URL, target keywords, service areas) once, and every subsequent Claude session operates with full market awareness rather than starting from zero. The article walks through an 8-prompt system covering every major GBP optimization lever, with each prompt doing actual browser automation (opening Google Maps, pulling competitor data, building spreadsheets) rather than generic advice.

## Key Takeaways
- Claude Cowork's persistent workspace eliminates the "context from scratch" problem that makes ChatGPT feel generic for local SEO
- 8-prompt stack in order: GBP category audit → attributes audit → competitor review teardown → review response templates → GBP posts calendar → services section → description optimization → photo audit
- GBP category audit is the highest-ROI first step — wrong categories = invisible for high-intent searches
- Review velocity (reviews/month) matters more than total review count; Claude pulls this data automatically
- Each review response with keywords + location is free SEO content; 10/month = 120 keyword-rich signals/year
- Consistent weekly photo uploads signal business activity to Google; beats one-time volume uploads
- Run 4 prompts per week over 4 weeks rather than all at once — sequential because each builds on prior data

## Full Content

How to set up Claude Cowork for SEO (and leave ChatGPT for good):

ChatGPT is a chatbot. Claude Cowork is an SEO strategist. If you're still using ChatGPT for SEO, this article is going to HURT. 

because the difference isn't subtle - it's the difference between asking someone a question and having a senior SEO strategist who already knows your business, your competitors, and your market before you say a word.

And since i published my local SEO prompt stack, people keep asking me:

"i have Claude Cowork. but how do i actually set it up to rank my business on Google?"

this is that article.

if you're serious about local SEO, you need to master Claude Cowork now.

why ChatGPT fails at local SEO

ChatGPT gives you generic output because it has no context about your business. every session starts from zero. you paste a prompt, get a response that could apply to any business in any city, and wonder why it doesn't feel useful.

that's not an AI problem. that's a setup problem.

Claude Cowork is built differently. it has a persistent workspace where you load your business context once - your service area, your competitors, your GBP URL, your target keywords - and every session starts from there. Claude already knows your business before you ask anything.

that's what makes the difference between generic SEO advice and an audit that's specific to your exact market.

here's how to set it up.

## step 1: build your SEO brain

before you run a single prompt, you need to give Claude Cowork context. this is the setup most people skip. it's also why most people get generic output.

open Claude Cowork and before you do anything else, give Claude everything it needs to know about your business. paste in:

your business details - business name, address, phone number, website URL, GBP URL, primary service, service areas, and the 5 keywords you most want to rank for. this is your foundation. every prompt pulls from this.

your competitors - the 3-5 businesses ranking above you in your market. their business names, GBP URLs, and websites. Claude needs these to run any competitive analysis without you repeating yourself every session.

your current standings - where you stand right now. which keywords you show up for. which ones you don't. your current review count. an honest starting point.

once Claude has this context loaded, it stops guessing and starts working from real data about your actual business. that's when it stops feeling like ChatGPT and starts feeling like someone who already knows your market.

every prompt in this stack assumes this context exists. skip this step and you'll get generic output. do it once and every session that follows gets sharper.

## step 2: run the 8-prompt stack

this is the system i use on every client. each prompt does something that used to take hours. run them in order. each one builds on the last.

1. GBP category audit

this is where i start with every single client. because if your categories are wrong, nothing else matters.

your GBP has a primary category and secondary categories. most business owners picked their primary category when they created their listing years ago and never touched it again. meanwhile competitors have added secondary categories they didn't know existed — and those categories directly control which searches trigger your listing in the map pack.

wrong categories = invisible for high-intent searches. it's that simple.

the prompt:

> "Open Chrome and go to Google Maps. Search '[service] in [city]' for these 3 keywords: [keyword1], [keyword2], [keyword3]. For each search, note which of my competitors show up in the Map Pack. Then open each competitor's GBP listing and extract their primary category and all secondary categories. Put everything in a spreadsheet. One tab per keyword. Columns: business name, primary category, secondary categories, star rating, review count, ranking position. Highlight any categories my competitors have that I'm missing from my GBP."

why this matters:

i've had clients add one secondary category and start showing up for a whole new set of searches the next week. fastest win in local SEO.

but the real power is pattern recognition. when you map categories against map pack rankings you start seeing things. like every business ranking for "emergency plumber in [city]" also has "water damage restoration" as a secondary category. those patterns are invisible unless you do this analysis. Claude does the gathering. you do the thinking.

ChatGPT equivalent: it'll tell you what GBP categories are. it won't pull your competitor's actual categories, map them against rankings, and highlight exactly what you're missing.

2. GBP attributes audit

most people don't even know GBP attributes exist - let alone that they affect rankings and conversions.

attributes are the little tags on your profile. "veteran-owned." "free estimates." "24/7 availability." Google uses these to match searchers with businesses. someone searches "24 hour plumber near me" - Google looks at which GBP listings have the 24/7 attribute.

your competitors have attributes you don't. guaranteed.

the prompt:

> "Open Chrome and go to my Google Business Profile at [URL] and these competitors: [URL1], [URL2], [URL3]. For each listing, extract every visible attribute and tag - things like 'veteran-owned,' 'free estimates,' 'offers online appointments,' 'wheelchair accessible,' '24/7 availability,' and any others shown. Put everything in a spreadsheet. Columns: attribute name, my listing (yes/no), competitor 1 (yes/no), competitor 2 (yes/no), competitor 3 (yes/no). Highlight every attribute my competitors have that I'm missing. Then list any attributes that ALL top competitors share - those are the baseline requirements for ranking in this market."

why this matters:

attributes are a two-for-one play. they help you rank for more specific searches AND they increase click-through rate because those little tags build trust before someone even clicks your listing.

the "baseline requirements" line is the key insight. if all three top competitors have "free estimates" and you don't -that's table stakes, not a differentiator. this audit shows you exactly where you're falling behind.

3. competitor review teardown

most business owners check their competitor's star rating and stop there. that tells you almost nothing.

what actually matters is review velocity -how fast they're getting new reviews compared to you. a business with 200 reviews that got 180 of them two years ago is weaker than a business with 90 reviews getting 15 a month. Google tracks this. you should too.

the prompt:

> "Open Chrome and go to these competitor GBP listings: [URL1], [URL2], [URL3]. For each competitor, read their last 50 reviews. Extract: total review count, average rating, how many reviews in the last 30/60/90 days, the most mentioned services in reviews, the most mentioned neighborhoods or cities, and any recurring complaints. Then compare their review velocity to mine at [my GBP URL]. Output a spreadsheet with all this data and a separate tab that says exactly how many reviews per month I need to catch the top competitor and how long it will take."

why this matters:

that second tab is your entire review strategy for the next 6-12 months. you'll know exactly how many reviews per month you need.

but here's the deeper insight - look at what customers mention in reviews. "great furnace install in highland park" is doing SEO work for that competitor whether they know it or not. reviews with keywords and location names are ranking signals. this data tells you exactly what to ask your happy customers to mention.

4. review response strategy

getting reviews is half the battle. how you respond is the other half.

Google has confirmed that responding to reviews improves local ranking. but most businesses either don't respond at all or paste the same "thanks for your review!" on everything. your review responses are free real estate for keywords and service mentions.

the prompt:

> "Open Chrome and go to my GBP listing at [URL] and these competitors: [URL1], [URL2], [URL3]. For each listing, analyze the last 30 review responses from the business owner. Note: how many reviews have responses vs no response, average response time, whether responses mention specific services or locations, response length and tone, and how negative reviews are handled. Put this in a spreadsheet comparing my response strategy vs competitors. Then write me a review response template system: one template for 5-star reviews that naturally includes service + location keywords, one for 4-star reviews, one for 3-star reviews, and one for 1-2 star reviews that's professional and defuses negativity. Each template should have 3 variations so my responses don't look robotic."

why this matters:

10 reviews a month, each response mentioning your service and city - that's 120 pieces of keyword-rich content on your GBP per year that you didn't have before. the template system means you respond to any review in under a minute.

5. GBP posts strategy

GBP posts are the most underused feature on the platform. most businesses don't even know they exist.

posts show up directly on your listing. posting consistently signals to Google that your business is active. active businesses get preferred placement. your competitors probably aren't posting. that's your advantage right now.

the prompt:

> "Open Chrome and go to my GBP listing at [URL] and these competitors: [URL1], [URL2], [URL3]. For each listing, check their GBP posts section. Note: how many posts in the last 90 days, what type of posts, whether posts include images and CTAs, what topics they cover, and how often they post. Put this in a spreadsheet. Then build me an 8-week GBP posting calendar. I want 2-3 posts per week covering: seasonal service promotions, before-and-after project showcases, neighborhood-specific content mentioning areas we serve ([area1], [area2], [area3]), review highlights, and team spotlights. Each post should naturally include at least one target keyword from this list: [keyword1], [keyword2], [keyword3]. Write the first 4 weeks of posts for me - full copy and image suggestions."

why this matters:

every time you publish a post mentioning "just completed a kitchen remodel in [neighborhood]" you're building location relevance. do this across 8-10 neighborhoods every month and you're building local authority that's extremely hard to replicate.

6. services section optimization

Google gives you an entire section to list your services with descriptions. this is prime keyword real estate and almost nobody optimizes it.

most businesses leave it blank or add services with no descriptions. that's like having a landing page with just a title and no content.

the prompt:

> "Open Chrome and go to my GBP listing at [URL] and these competitors: [URL1], [URL2], [URL3]. For each listing, check the services section. Extract: every service listed, whether it has a description, how detailed the descriptions are, and any service categories or groupings. Put this in a spreadsheet comparing my services section vs competitors. Then audit my current services section against my website [URL] and find any services on my site that aren't listed on my GBP. Finally, write optimized descriptions for all my services. Each description should be 2-3 sentences, naturally include target keywords, mention specific service areas where relevant, and include a benefit statement. Here are my core services: [service1], [service2], [service3] and service areas: [area1], [area2], [area3]."

why this matters:

the cross-reference against your website catches the most common mistake in local SEO. businesses add new services to their site but forget to update their GBP. if you do "trenchless sewer repair" but it's not on your GBP, you're invisible for that search in the map pack.

7. GBP description optimization

your GBP description is 750 characters of prime real estate. most businesses waste it.

they either leave it blank, copy-paste from their website, or stuff it with keywords that sound robotic. your description needs to do three things: include your primary keywords naturally, mention your core service areas, and convince someone to choose you over the five other businesses on the screen.

the prompt:

> "Open Chrome and go to my GBP listing at [URL] and these competitors: [URL1], [URL2], [URL3]. Extract each business's full GBP description. Put them in a spreadsheet with columns: business name, full description text, character count, keywords mentioned, service areas mentioned, unique selling points mentioned, and CTA included. Then analyze what top-ranking competitors emphasize vs what i'm saying. Identify the gaps. Finally, write me 3 versions of an optimized GBP description (max 750 characters each). Version 1: keyword-focused for maximum ranking signal. Version 2: conversion-focused for maximum calls. Version 3: balanced approach. All three must include these keywords: [keyword1], [keyword2], [keyword3] and these service areas: [area1], [area2], [area3]. Make them sound human, not robotic."

why this matters:

3 versions lets you test. run version 1 for 30 days. check impressions and calls. try version 2. most people write one description and forget about it forever. treating it as a testable asset gives you a compounding edge.

8. GBP photo audit

Google has confirmed that businesses with photos get 42% more requests for directions and 35% more click-throughs. but it's not just about having photos - it's about the right photos uploaded consistently.

most businesses uploaded 10 blurry phone pics three years ago and called it done. meanwhile the competitor dominating the map pack uploads weekly and has before-and-after shots that build trust before anyone even calls.

the prompt:

> "Open Chrome and go to my GBP listing at [URL] and these competitors: [URL1], [URL2], [URL3]. For each listing, count: total photos, photos uploaded in the last 90 days, types of photos (team, jobs, before-after, office, trucks, equipment), and whether any look like stock photos. Put this in a spreadsheet comparing me vs each competitor. Then give me a specific 8-week photo upload plan for my GBP. Tell me exactly how many photos per week and what type to shoot. Focus on before-afters, team on job sites, trucks in neighborhoods we serve, and close-ups of completed installs. No generic office photos."

why this matters:

consistency beats volume. uploading 50 photos in one day then nothing for 6 months tells Google you're not active. uploading 3-5 quality photos every week tells Google your business is alive and thriving. the 8-week plan removes the guesswork entirely.

why this works when ChatGPT doesn't

ask ChatGPT to audit your GBP categories against competitors. it'll explain what categories are.

ask Claude Cowork the same thing. it opens Chrome, goes to Google Maps, searches your keywords, pulls every competitor's categories, builds a spreadsheet, and highlights exactly what you're missing.

that's not a subtle difference. that's the difference between advice and execution.

ChatGPT tells you what to do. Claude Cowork does it with you.

how to use this

don't run all 8 prompts at once. here's the order:

week 1 - fix the foundation: category audit and attributes audit. fastest fixes with the most immediate ranking impact. you could see changes within days.

week 2 - optimize your listing: services section and description optimization. fills your GBP with keyword-rich content Google can index.

week 3 - review strategy: review teardown and response templates. now you have a velocity target and a system that turns every review into a ranking signal.

week 4 - content engine: GBP posts calendar and photo audit. ongoing content system that keeps your listing active and builds location relevance week after week.

week 5 and beyond: execute. post consistently. upload photos weekly. respond to every review. this is where the compounding starts.

90 days of consistent execution on this system and you will outrank businesses that have been established for years. i've watched it happen dozens of times.

## the real talk

90% of people reading this will save it and never run a single prompt. that's just how it goes.

if you want my team to run this entire system for your business - every audit, every optimization, every month of execution - that's what we do at Alventra Marketing.

we've helped home services businesses generate hundreds of thousands in new revenue using this exact framework.

DM me if you want to talk about it. no pressure. but if you're serious about dominating your local market, the system works.

now stop reading and go run prompt 1.

Sarvesh 
alventramarketing.com

## Links

- [Article](https://x.com/i/article/2030990122519592961)
- [Original Tweet](https://x.com/bloggersarvesh/status/2030997615823798628)
