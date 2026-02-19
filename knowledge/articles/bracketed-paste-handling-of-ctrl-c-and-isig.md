---
title: "Bracketed paste handling of Ctrl+C and ISIG"
type: article
date_added: 2026-02-18
source: "https://ampcode.com/threads/T-019c6781-46f6-76db-af2a-22a47ad1376b"
author: "mitchellh"
tags: [terminal-emulation, xterm, pty, unix-signals, bracketed-paste, ctrl-c]
via: "Twitter bookmark from @mitchellh"
---

This query investigates how xterm handles control characters (specifically Ctrl+C / SIGINT) during bracketed paste mode operations, examining the interaction between pty data writes and terminal signal flags like ISIG. Understanding this behavior is critical for correctly handling pasted input that may contain control sequences without triggering unintended signal delivery.

## Key Takeaways

- Bracketed paste mode requires careful handling of control characters to prevent paste data from triggering signals
- The ISIG terminal flag controls whether Ctrl+C generates SIGINT, affecting how pasted content is processed
- xterm handles paste data writes through multiple code paths (button.c, input.c, charproc.c, misc.c, ptydata.c)
- Filtering or special handling of control characters during paste is necessary to preserve exact paste semantics
- Terminal attribute negotiation between application and pty affects signal delivery during data ingestion
- Incorrect handling can cause terminal signal generation when pasted content contains control characters

## Full Content

Find the code in xterm that handles bracketed paste mode - specifically how it sends pasted text to the pty, and whether it does anything special with control characters like 0x03 (Ctrl+C / SIGINT / VINTR) during paste. Look for functions that write paste data to the pty, any filtering of control characters, or any interaction with tty flags like ISIG. Search in button.c, input.c, charproc.c, misc.c, and ptydata.c.

## Links

- [Article](https://ampcode.com/threads/T-019c6781-46f6-76db-af2a-22a47ad1376b)
- [Original Tweet](https://x.com/mitchellh/status/2023497187288907916)
