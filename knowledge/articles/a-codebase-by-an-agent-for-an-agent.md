---
title: "A Codebase by an Agent for an Agent"
type: article
date_added: 2026-02-09
source: "https://ampcode.com/notes/by-an-agent-for-an-agent"
author: "thorstenball"
tags: ["agent-driven-development", "codebase-structure", "ai-autonomy", "collaborative-coding"]
via: "Twitter bookmark from @thorstenball"
---

Tim Culverhouse explores the principle of letting AI agents make autonomous decisions about code structure, naming, and organization. When he stepped back from micromanaging Amp's choices during the development of a TypeScript TUI framework, the agent not only worked faster but produced code that it could navigate more effectively using its own pattern recognition. The key insight is that agents trained on patterns can find their own solutions more efficiently than human-imposed structures—creating a codebase optimized for agent reasoning rather than human intuition.

## Key Takeaways

- Agents make better architectural decisions than humans when allowed autonomy—their "instincts" are guided by probabilistic patterns from training data
- Micromanaging agent decisions (e.g., renaming functions, reorganizing files) forces agents to navigate against their weights and consumes extra tokens
- Codebases written by agents for agents are self-consistent: function naming, file layout, and abstractions align with what the agent's training expects
- The success of Amp in working with the TUI framework stems from it being optimized for agent reasoning patterns (Flutter-like APIs, stateful widget patterns) rather than human readability conventions
- Effective human-agent collaboration means setting goals and constraints but letting agents determine the specific implementation approach

## Full Content

Tim Culverhouse//Dec 18, 2025   When I’m coding there are many decisions I have to make that affect
my ability to navigate the codebase: what’s a good name for this function? Should
I make a new file for this type or should it be in an existing file? What should
the file be called? Should I create a new directory for this?   Not only do I have to decide these things, but I have to remember them. Every
time I open Neovim I have to think about what past-Tim would’ve called this.
Where would he have put it?  I get hit with cognitive overhead on each side of
the decision. The good thing is that now I can offload nearly all of this to an agent. Yes, I know, one shouldn’t, but hear me out. I did exactly that when I created
the TUI framework behind the Amp CLI. The framework is a port of my Zig TUI
library into TypeScript and it’s 90%
written by Amp. And, as
Thorsten and many others
on the team, have said: Amp rips when working with this framework on the CLI.
It plows through most anything you can throw at it. So much so that the question
of “why is Amp so good at working on our CLI?” has come up multiple times. I
think I have the answer. I think the answer is that I offloaded decisions to the agent. The thing is — I do care about the names of things and how the codebase is
structured. Early on in the process of writing the framework I would often stop
the agent — irritated by a change it made — and tell it to rename a function,
move a file to a different directory, or put some class into its own file. I
don’t enjoy making these decisions, but I still wanted to make them. There’s
just some satisfaction from having things look nice in your codebase — so I
would stop the agent and tell it “I know better”. But I don’t. I am not absolutely right, it turns out. Let me give you an example. The Amp TUI framework uses a double-buffering
approach toward updating the screen. We keep a front and a back screen — one
representing the last frame, the other the next frame. Then we diff them, print
the updates, and swap the screens. When porting the code from Zig to TypeScript,
Amp named the function that swaps the screens present(). I didn’t like that
and I know better so I renamed it to swapScreens(). But as the port progressed, I saw Amp repeatedly trying to find a function
called present(), not finding it, declaring “let me try something else”, and
eventually finding the function under the name that had made sense to me. Amp spun its wheels because I had interjected with my opinions about code
naming, structure, and layout. But apparently my opinions aren’t the most
statistically likely. When the agent reached for the name present(), its hand
was guided by training data and the context I had provided. But I pushed it away
from that, against its instincts, so to say, and made the agent’s job harder the
next time.  Amp could no longer ask “what would past-Amp have called this?” and
find the answer in its weights — it had to know what past-Tim would call this.   I saw this repeat a few times, and realized my mistake. I was interfering with
its ability to navigate using its own thoughts. I made it go against its grain.
I slowed it down, cost more tokens as it ran more loops, and, ultimately, caused
frustration for myself when I saw that it couldn’t remember the name. So I changed my approach. No more telling the agent how to name things or where
to put them. The agent gets to decide. And it worked. Once I took my hands off the wheel, the agent went faster and for longer. It
chose names I wouldn’t have picked and file layouts that didn’t occur to me. It
used more OOP patterns and classes than we have anywhere else in the codebase.
Its use of generics and TypeScript primitives is strange when compared to the
rest of our code. But: it rips. There was no denying that. Once it had finished the framework, it impressed us
by being really, really good at using it — our own custom framework, mind you,
that’s not documented anywhere and doesn’t fit into a single context window!
With the framework it built, Amp can knock out things faster and more correctly
than most of us. It knows how to add scrollbars to a new modal (we’re talking
about a TUI here, remember!), it knows how the animation subsystem works, it
knows how the keyboard shortcuts and click handlers work, and if there’s
something missing in the framework, it adds it. “Oh, we don’t listen for this
event. Let me fix that real quick.” And real quick it fixes it. Ultimately I don’t know why it’s so good at using it, I can’t look inside its
weights while it’s writing code, and I don’t trust its answers when I ask it
about it, but here’s what I suspect. The framework and its predecessor in Zig are inspired by Flutter. They have a
Flutter-like API with Widgets and StatefulWidgets and Intents and Bindings and
so on. And, I think, the agent recognizes that. It has enough Flutter in its weights. Even
though Flutter is originally written in Dart, I think the agent recognized the
Flutter in the Zig version and it can now recognize the Flutter in our codebase
too and can look through the language and syntax and see the concepts at play. And the codebase lets it do that. After I gave it free rein over the codebase — letting it use the most probable names for functions and types, putting files where its “instincts” told it they
should go — it built a framework for itself. A framework and a codebase in which
things are exactly where a model that knows Flutter and that knows TypeScript —
knows them in a probabilistic way — would first look for them. A codebase in which
syntax and concepts strike a balance between what’s statistically likely and
what actually compiles. A codebase in which the agent doesn’t have to
second-guess what something is called and doesn’t have to wonder why something
works the way it does. A codebase in equilibrium between what I want it to do,
what the concepts require, and what the agent’s weights judge as the most likely
way to achieve it. A codebase by an agent for an agent.

## Links

- [Article](https://ampcode.com/notes/by-an-agent-for-an-agent)
- [Original Tweet](https://x.com/thorstenball/status/2001686082862145565)
