---
title: "Building AI Coding Agents for the Terminal: Scaffolding, Harness, Context Engineering, and Lessons Learned"
type: article
date_added: 2026-03-09
source: "https://arxiv.org/abs/2603.05344"
author: "[Submitted on 5 Mar 2026]"
tags: [ai-agents, cli, coding-agents, context-engineering, architecture, llm]
via: "Twitter bookmark from @omarsar0"
---

OPENDEV is an 81-page paper formalizing design patterns for terminal-native CLI coding agents. The industry is shifting from IDE plugins to terminal-first agents (Claude Code, Codex CLI), and this paper provides a blueprint for building robust autonomous software engineering systems. Key innovations include compound AI system architecture with workload-specialized model routing, a dual-agent design separating planning from execution, and adaptive context compaction that progressively summarizes older observations to prevent context bloat.

## Key Takeaways
- **Dual-agent architecture**: Separates planning (high-level reasoning) from execution (tool calls) to improve reliability on long-horizon tasks
- **Workload-specialized model routing**: Routes different task types to models best suited for them within a single compound system
- **Lazy tool discovery**: Tools are discovered and registered on demand rather than pre-loaded, keeping context lean
- **Adaptive context compaction**: Progressively reduces older observations to prevent reasoning degradation from context bloat
- **Event-driven system reminders**: Counteracts instruction fade-out by injecting reminders at key events rather than relying on initial prompt recall
- **Automated session memory**: Accumulates project-specific knowledge across sessions (analogous to CLAUDE.md patterns)
- **Strict safety controls**: Enforces explicit reasoning phases before tool execution for autonomous operation

## Full Content

View PDF
    HTML (experimental)
            Abstract:The landscape of AI coding assistance is undergoing a fundamental shift from complex IDE plugins to versatile, terminal-native agents. Operating directly where developers manage source control, execute builds, and deploy environments, CLI-based agents offer unprecedented autonomy for long-horizon development tasks. In this paper, we present OPENDEV, an open-source, command-line coding agent engineered specifically for this new paradigm. Effective autonomous assistance requires strict safety controls and highly efficient context management to prevent context bloat and reasoning degradation. OPENDEV overcomes these challenges through a compound AI system architecture with workload-specialized model routing, a dual-agent architecture separating planning from execution, lazy tool discovery, and adaptive context compaction that progressively reduces older observations. Furthermore, it employs an automated memory system to accumulate project-specific knowledge across sessions and counteracts instruction fade-out through event-driven system reminders. By enforcing explicit reasoning phases and prioritizing context efficiency, OPENDEV provides a secure, extensible foundation for terminal-first AI assistance, offering a blueprint for robust autonomous software engineering.
    

    
    
              
          Comments:
          Work in progress, new versions will be updated continuously
        

          Subjects:
          
            Artificial Intelligence (cs.AI)
        
          Cite as:
          arXiv:2603.05344 [cs.AI]
        
        
           
          (or 
              arXiv:2603.05344v1 [cs.AI] for this version)
          
        
        
           
                        https://doi.org/10.48550/arXiv.2603.05344
              
                                arXiv-issued DOI via DataCite
            
          
        
    
  
      Submission history From: Nghi D. Q. Bui [view email]          [v1]
        Thu, 5 Mar 2026 16:21:08 UTC (40,291 KB)

## Links

- [Article](https://arxiv.org/abs/2603.05344)
- [Original Tweet](https://x.com/omarsar0/status/2030771811705872435)
