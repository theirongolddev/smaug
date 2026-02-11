---
title: "Here's How To Stream Claude Code With AFK Ralph"
type: article
date_added: 2026-02-09
source: "https://www.aihero.dev/heres-how-to-stream-claude-code-with-afk-ralph"
author: "mattpocockuk"
tags: [claude-code, ralph, streaming, agentic-coding, bash, automation, dev-tools]
via: "Twitter bookmark from @mattpocockuk"
---

A practical guide for improving the developer experience when running Claude Code in AFK (away from keyboard) mode using Ralph. The core problem: using the --print flag with Claude Code gives zero streaming output, leaving you staring at a blank terminal with no visibility into whether Claude is working or stuck. The solution combines stream-json output format with jq filtering to extract readable streaming text while still capturing the final result for completion detection. The article provides a complete bash script that pipes Claude's output through grep and jq filters to display real-time progress and detect the <promise>COMPLETE</promise> marker, solving the opacity issue of traditional AFK Ralph scripts.

## Key Takeaways

- **Problem**: AFK Ralph with --print flag produces no streaming output, creating blind execution with no visibility
- **Solution**: Use --output-format stream-json with jq filtering to extract readable text while maintaining final result capture
- **Stream Filter Components**: Selects assistant messages, extracts text content, fixes line endings (carriage return fix), and adds spacing
- **Data Pipeline**: grep filters valid JSON → tee captures to temp file → jq extracts readable text in real-time
- **Key jq Filters**: Stream filter selects assistant type messages and extracts text; final filter checks for completion promise
- **Practical Benefits**: Real-time visibility into Claude's work while running AFK, plus proper completion detection
- **Temporary Solution**: Author notes this is a workaround until Claude Code ships proper streaming support (OpenCode already has this)
- **Technical Details**: Line buffering (--line-buffered), unbuffered jq (--unbuffered), and carriage return handling (\r\n) ensure smooth streaming

## Full Content

This guide is for people who've tried Ralph with Claude Code and hit that frustration point: running the AFK script and ending up staring at a blank screen.
If you've never heard of Ralph, start here:

Getting Started With Ralph
11 Tips For AI Coding With Ralph


When you want Ralph to run while you're away from your keyboard, you might use a script like this:
#!/bin/bash
set -e
if [ -z "$1" ]; then
echo "Usage: $0 <iterations>"
exit 1
fi
for ((i=1; i<=$1; i++)); do
result=$(docker sandbox run --credentials host claude \
--print \
"<your prompt here>")
if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
echo "Ralph complete after $i iterations."
exit 0
fi
done
The issue here is frustrating: when you run Claude with the --print flag, you get zero streaming output. Your terminal goes blank.
You walk away, and you have absolutely no idea what's happening. Is Claude working? Is it stuck? Did something break? You won't know until it's finished.
The dream with AFK Ralph is to get the best of both worlds: you want real-time visibility into what Claude is doing, but you also want to leave it running while you step away.

Claude can output stream-json format, which gives you every single message as it happens. But that output is extremely verbose and unreadable.
By combining stream-json with jq filtering, you can extract just the useful information and stream it to your terminal in real-time. At the same time, you capture the final result to check for the <promise>COMPLETE</promise> marker.
Here's the complete script:
#!/bin/bash
set -e
if [ -z "$1" ]; then
echo "Usage: $0 <iterations>"
exit 1
fi
# jq filter to extract streaming text from assistant messages
stream_text='select(.type == "assistant").message.content[]? | select(.type == "text").text // empty | gsub("\n"; "\r\n") | . + "\r\n\n"'
# jq filter to extract final result
final_result='select(.type == "result").result // empty'
for ((i=1; i<=$1; i++)); do
tmpfile=$(mktemp)
trap "rm -f $tmpfile" EXIT
docker sandbox run --credentials host claude \
--verbose \
--print \
--output-format stream-json \
"<your prompt here>" \
| grep --line-buffered '^{' \
| tee "$tmpfile" \
| jq --unbuffered -rj "$stream_text"
result=$(jq -r "$final_result" "$tmpfile")
if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
echo "Ralph complete after $i iterations."
exit 0
fi
done
This script accepts one argument: the number of iterations to run.

Breaking Down the Stream Filter
The stream filter does several important things:

Selects assistant messages: select(.type == "assistant") grabs only Claude's responses
Extracts text content: .message.content[]? | select(.type == "text").text pulls out just the text portions
Fixes line endings: gsub("\n"; "\r\n") replaces newlines with carriage return + newline
Adds spacing: . + "\r\n\n" inserts extra space between messages

The carriage return replacement fixes a bug where the cursor wasn't returning to the first character of the line properly.
The Data Pipeline
Here's how data flows through the script:
Docker streams out stream-json formatted data, but it includes some non-JSON lines just for noise. The grep --line-buffered '^{' filter ensures only valid JSON lines get processed.
The tee "$tmpfile" command writes everything to a temporary file without stopping the stream. You need this file later to check if Claude has finished.
Finally, jq --unbuffered -rj "$stream_text" applies the streaming filter and displays the text in real-time to your terminal.

My hope is that relatively soon I'll be able to delete this article because Claude Code will have shipped a feature that allows you to stream the responses while still capturing the final output.
OpenCode already has this, and so there's no need to write an article like this for OpenCode. But until then, this is a workable solution to get real-time streaming output from Claude while running AFK Ralph.

## Links

- [Article](https://www.aihero.dev/heres-how-to-stream-claude-code-with-afk-ralph)
- [Original Tweet](https://x.com/mattpocockuk/status/2014277127244296688)
