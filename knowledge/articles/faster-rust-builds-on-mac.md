---
title: "Faster Rust builds on Mac"
type: article
date_added: 2026-02-09
source: "https://nnethercote.github.io/2025/09/04/faster-rust-builds-on-mac.html"
author: "steipete"
tags: [rust, performance, macos, xprotect, build-optimization, developer-tools]
via: "Twitter bookmark from @steipete"
---

macOS has an XProtect antivirus feature that scans every newly-launched executable for malware. This is especially problematic for Rust development where build scripts are executed frequently, causing significant slowdowns. By adding your terminal app as a "developer tool" in System Settings, you can bypass XProtect checks and dramatically improve compilation times—particularly for test suites which can be reduced from 9+ minutes to 3-4 minutes.

## Key Takeaways

- **The Problem:** XProtect scans every executable on first run, causing build scripts to take 0.48-3.88 seconds each instead of milliseconds
- **The Cause:** Single-threaded XProtect daemon creates bottlenecks when multiple binaries launch in parallel
- **The Solution:** Whitelist Terminal (or iTerm) as a developer tool in System Settings to bypass XProtect for locally-compiled binaries
- **The Impact:** Test suites like rustc's ui tests can be 2-3x faster (9m42s → 3m33s); cargo builds, runs, and tests all benefit
- **The Tradeoff:** You're disabling an OS security feature—only recommended if you trust your development environment
- **Implementation:** Cargo is developing a warning feature to detect XProtect and suggest disabling it

## Full Content

Did you know that macOS has a secret setting that can make Rust builds faster?
It can also make Rust tests faster (sometimes massively so). It probably even
has similar effects for other compiled languages such as C, C++, Go, and Swift.
It sounds crazy, but read on…

The problem

Isaac Asimov reportedly said: the most exciting phrase to hear in science…
is not “Eureka” but “that’s funny…”

I noticed something recently while looking at the output of cargo build
--timings on Mac: build scripts took a strangely long time to execute.
Consider the following output from compiling
wild on my 2019 MacBook Pro.


  


Time is on the x-axis. Each blue/purple bar is a single invocation of the
compiler. (This image shows only part of the output. The full compilation has
over 100 crates.) Each orange bar measures the time taken to execute a build
script. The orange bars are quite long!

Build scripts
let you do custom tasks that fall outside the normal Cargo workflow. Sometimes
they are expected to be slow, such as when invoking a C compiler to build a
library. But often they are trivial. A common case is to run rustc --version
to see what version of the compiler is installed and then adjust some
configuration detail accordingly.

All the build scripts shown in this output are simple ones that should be very
quick to run, and that’s what I saw when I measured on Linux. So why were they
taking between 0.48 and 3.88 seconds on Mac? And why was each successive one
slower than the previous?

I tried running a couple of these build scripts directly instead of via Cargo.
They were much faster that way, e.g. 75ms vs. 300ms. Weird. At first I
suspected that Cargo was mismeasuring the build script executions somehow. I
looked at the relevant code in Cargo but it was pretty straightforward and
seemed unlikely to be hiding a problem.

The explanation

Before digging further I
asked
on Zulip if this behaviour was familiar to anyone. Weihang
Lo suggested it might be caused by code-signing
verification or some other security check.

Wait, what? This was not the answer I was expecting, but it was correct. macOS
has an antivirus feature called
XProtect.


  XProtect checks for known malicious content whenever:
  
    An app is first launched
    An app has been changed (in the file system)
    XProtect signatures are updated
  


In other words, the OS scans every executable for malware on the first run.
This makes sense for executables downloaded from the internet. It’s arguably
less sensible for executables you compiled yourself. Indeed, build scripts are
the worst possible case for this kind of check, performance-wise, because each
build script executable is typically run exactly once.

(XProtect is closely related to another security feature called
Gatekeeper.
As I understand it, Gatekeeper verifies signed code while XProtect does generic
malware scans. Note that people often use the name “Gatekeeper” when referring
to all of these activities.)

The workaround

You can avoid these scans by adding Terminal (or any alternative terminal app
you are using, such as iTerm) as a “developer tool” in System Settings. See
these docs for details.
Note: as the docs say, you will likely need to restart Terminal for the change
to take effect. But if you want to undo the change, you might need to reboot
the machine for the change to take effect.

This is the “secret setting” I mentioned at the start of this post. Searching
around, I found only a few online mentions of it.

  A blog post.
  A users.rust-lang.org
post.
  A Hacker News comment.
  The cargo-nextest docs, which cite the Hacker News comment.
  The Zed docs, which cite the cargo-nextest docs.
  Corrode’s Tips for Faster Rust Compile
Times,
which cites the cargo-nextest docs and the Zed docs! (This post is an
excellent and comprehensive collection of tips for speeding up Rust
compilation, by the way.)
  A rust-lang Zulip
thread.


Please note that if you do this you are disabling an OS security feature. You
should not do it unless you are comfortable with the potential speed/security
trade-off.

The benefits: cargo build, cargo check

The following image replicates the cargo build --timings partial output from
above alongside the corresponding partial output from a run with XProtect
disabled.


  
  


A huge difference! Those orange bars are now tiny. The build scripts are taking
around 0.06 to 0.14 seconds each on my old MacBook Pro.

This definitely has the potential to speed up full builds of various Rust
projects. In this case, the original wild build took 25.9s and the new one took
25.0s. I didn’t do careful measurements to see if those numbers were
consistent. (Don’t read too much into the times taken to compile individual
crates; the scheduling between the two runs is very different.)

The exact effect will depend heavily on a project’s dependency
graph and the characteristics of your machine, but if build script execution is
on the critical path it will certainly have an effect.

Great! But maybe you don’t actually run build scripts all that often. Most of
the time you’re just rebuilding your own code, not third-party dependencies,
other than after the occasional cargo clean, right? Well…

The benefits: cargo run

If your project is an executable, you’ll be paying the XProtect cost every
single time you rebuild and rerun. It’s extra time on every edit-compile-run
cycle. Yuk.

The benefits: cargo test

Disabling XProtect also helps for test binaries. In fact, this is the area with
the potential for the biggest speedups, because some test setups involve many
small binaries. For example, every integration test gets its own binary. And
every pre-2024-edition doctest gets its own
binary!
And the cargo-nextest folks clearly noticed it.

The Rust compiler itself provides a particularly compelling example. Its
biggest test suite is called tests/ui/ and involves running almost 4,000
individual executables, most of them tiny. Mads
Marquart found that disabling XProtect reduced the
runtime of this test suite from 9m42s to
3m33s!
Incredible.

The benefits: other languages

I haven’t tested this, but developers using other compiled languages will
presumably benefit similarly, so long as development involves frequent
compilation and execution of binaries.

Spreading the joy

The status quo is that this behaviour is documented in a few obscure places and
99%+ of Mac users are unaware. Fortunately, Mads has a draft
PR for Cargo that detects if
XProtect is enabled and issues a warning to the user explaining its impact and
how to disable it. (There is apparently no programmatic way to disable XProtect
in the terminal and we wouldn’t want to do that anyway; the user should
be required to make an active choice.)

The PR is worth a look because it has a precise description of the situation,
one that goes into more detail than I have here. Also, it answers a question
posed much earlier in this post: in the original cargo build --timings
output, why was each successive build script slower than the previous? The PR
has the answer:


  the XprotectService daemon runs in a single thread, so if you try to launch
10 new binaries at once, the slowdown will be more than a second.


On my old MacBook Pro, which has eight cores, it’s much more than a second.
Going back to my original cargo build --timings run, the final build script
took 3.88s to run. Its execution overlapped with that of most of the previous
build scripts. Most of that 3.88s is actually spent waiting for the daemon.
Good grief.

There will need to be careful discussion and review of how the warning is
presented to the user, given that it’s about disabling an OS security feature.
But I am happy there is a clear path forward to get this knowledge out of “deep
lore” territory and into the purview of normal users. In the meantime, if you are
a Mac user you could consider disabling XProtect in the terminal and get the
speed benefits immediately.

## Links

- [Article](https://nnethercote.github.io/2025/09/04/faster-rust-builds-on-mac.html)
- [Original Tweet](https://x.com/steipete/status/2003925293665337501)
