---
title: "Impeccable: Design skills for AI harnesses"
type: article
date_added: 2026-03-08
source: "https://impeccable.style/"
author: "pbakaus"
tags: [design, frontend, claude-skills, ai-harness, developer-tools]
via: "Twitter bookmark from @pbakaus"
---

Impeccable is a design skill library that gives AI coding harnesses (Claude Code, Cursor, Codex CLI, Gemini CLI, Copilot, Antigravity, Kiro) a shared vocabulary for producing higher-quality frontend work. Built on Anthropic's original frontend-design skill, it adds curated patterns and anti-patterns across typography, color, layout, motion, and more. v1.1 unifies commands as agent skills, adds VS Code Copilot and Antigravity support, and renames /simplify → /distill to avoid conflict with Claude Code's built-in.

## Key Takeaways
- Install via `npx skills add pbakaus/impeccable` — auto-detects AI harness and places files correctly
- 17 design commands (/polish, /audit, /distill, /bolder, etc.) give agents a concrete design language
- Skills architecture: all commands now have `user-invokable: true` for explicit invocation
- v1.1: renamed /simplify → /distill to avoid Claude Code built-in conflict; added Kiro support
- Works across all major AI harnesses from a single install

## Full Content

Anthropic's original frontend-design skill laid the foundation. Impeccable builds on it with curated patterns and anti-patterns across typography, color, layout, motion, and more.

        
        

        Missing something? Suggest a pattern →
      

    
    
        One comprehensive skill with deep expertise, plus 17 commands that form the language of design.

        

      

    
    


    
    
      

      
      
            
              All tools$
                npx skills add pbakaus/impeccable
                
              
              Auto-detects your AI harness and installs to the right location
            
            
            
              Claude Code$
                /plugin marketplace add pbakaus/impeccable
                
              
              Then open /plugin to install from Discover tab
            
            
            
              Manual
                
                  
                  
                  
                    Prefix with /i-
                  
                
              
              Contains all provider directories — extract to project root
            
          

      
      
        Works with
          
            Cursor
          
          
            Claude Code
          
          
            Gemini CLI
          
          
            Codex CLI
          
          
            Copilot
          
          
            Antigravity
          
          
            Kiro
          
        
      

      Once installed, keep the command cheatsheet handy for quick reference.
    

    
    
        
          
          
            Added Kiro support (.kiro/skills/)
            Restored prefix toggle — download i- prefixed bundles to avoid naming conflicts
            Audit and critique skills only suggest real, installed commands
          
        

        
          
          
            Unified skills architecture — commands are now skills with user-invokable: true
            Added VS Code Copilot and Google Antigravity support (.agents/skills/)
            New install flow: npx skills add as primary, universal ZIP as fallback
            Added universal ZIP containing all 5 provider directories
            Renamed /simplify to /distill to avoid Claude Code conflict
          
        

        
          
          
            Initial release with enhanced frontend-design skill
            17 design commands: /polish, /audit, /distill, /bolder, and more
            Support for Cursor, Claude Code, Gemini CLI, and Codex CLI
            Interactive command cheatsheet
          
        
      

    
    
        
          Where do I put the downloaded files?
          
            The easiest way is npx skills add pbakaus/impeccable — it auto-detects your AI harness and places files correctly.
            If you downloaded the universal ZIP, extract it to your project root (same level as your package.json or src/ folder). It creates hidden folders for each supported tool: .cursor/, .claude/, .gemini/, .codex/, and .agents/.
            Project-level installation takes precedence and lets you version control your skills.
          
        

        
          Commands or skills aren't appearing. What do I do?
          
            For commands: Type / in your AI harness and look for commands like /audit, /polish, etc. If they don't appear, double-check the files are in the correct location.
            For skills: Skills are applied automatically when relevant. To verify, explicitly mention "use the frontend-design skill" in your prompt—this forces the AI to acknowledge and apply it.
            Tool-specific setup:
            
              Cursor: Requires Nightly channel + Agent Skills enabled in Settings → Rules
              Gemini CLI: Requires @google/gemini-cli@preview + Skills enabled via /settings
            
          
        

        
          I'm new to AI harnesses. Where do I start?
          
            Skills and commands are intermediate features. If you're just getting started, learn the basics first:
            
              Claude Code: Official Documentation
              Cursor: Cursor Docs
              Gemini CLI: Gemini CLI Docs
              Codex CLI: Codex GitHub
            
            Once you're comfortable with basic prompting and code generation, come back and give Impeccable a try.
          
        
      

    
    
        
          Work with me
          I help teams navigate AI transformation: upleveling developers, building AI-native workflows, and shipping products. Deep expertise in developer experience, design systems, and full-stack architecture.
        
        
          
            Get in touch
            
              
            
          
          
            Leave a tip

## Links

- [Article](https://impeccable.style/)
- [Original Tweet](https://x.com/pbakaus/status/2029334353894162720)
