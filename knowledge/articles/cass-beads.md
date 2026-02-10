---
title: "Cass Beads"
type: article
date_added: 2026-02-09
source: "https://dicklesworthstone.github.io/beads_for_cass/"
author: "doodlestein"
tags: []
via: "Twitter bookmark from @doodlestein"
---

<!-- NEEDS_ANALYSIS: summary, key_takeaways, tags -->

## Full Content

🚧
                    Bottlenecks
                    Betweenness Centrality
                  
                
                
                  
                    What It Measures
                    How often a bead lies on shortest paths between other beads in the dependency graph.
                  
                  
                    Why It Matters
                    High-scoring beads are critical junctions. Delays here ripple across the entire project.
                  
                  
                    Take Action
                    Prioritize these to unblock parallel workstreams. Consider breaking them into smaller pieces.
                  
                  
                    How It's Calculated
                    
                      BW(v) = Σ (paths through v) / (total paths)
                      for all pairs of nodes s,t where s≠v≠t
                    
                  
                
                

              
              
                  📐 What: Measures how often a bead lies on shortest paths between other beads.
                  💡 Why: High-scoring beads are critical junctions. Delays here ripple across the entire project.
                  🎯 Action: Prioritize these to unblock parallel workstreams. Consider breaking them into smaller pieces.
                

              
              
                
                  
                    
                    
                  
                
                No betweenness data available
              
            

            
            
              

              
              
                
                  🏛️
                    Keystones
                    Impact Depth
                  
                
                
                  
                    What It Measures
                    How deep in the dependency chain a bead sits (downstream chain length).
                  
                  
                    Why It Matters
                    Keystones are foundational. Everything above them depends on their completion.
                  
                  
                    Take Action
                    Complete these first. Blocking a keystone blocks the entire chain above it.
                  
                  
                    How It's Calculated
                    
                      Impact(v) = 1 + max(Impact(u))
                      for all u depending on v
                    
                  
                
                

              
                  📐 What: Measures how deep in the dependency chain a bead sits.
                  💡 Why: Keystones are foundational. Everything above them depends on their completion.
                  🎯 Action: Complete these first. Blocking a keystone blocks the entire chain above it.
                
              
                
                  
                    
                    
                  
                
                No critical path data available
              
            

            
            
              

              
              
                
                  🌐
                    Influencers
                    Eigenvector Centrality
                  
                
                
                  
                    What It Measures
                    Scores beads by their connections to other well-connected beads.
                  
                  
                    Why It Matters
                    Influencers are connected to important beads. Changes here have wide-reaching effects.
                  
                  
                    Take Action
                    Review carefully before changes. They're central to project structure.
                  
                  
                    How It's Calculated
                    
                      EV(v) = (1/λ) × Σ A[v,u] × EV(u)
                      λ = largest eigenvalue, A = adjacency
                    
                  
                
                

              
                  📐 What: Scores beads by connections to other well-connected beads (eigenvector centrality).
                  💡 Why: Influencers are connected to important beads. Changes have wide-reaching effects.
                  🎯 Action: Review carefully before changes. They're central to project structure.
                
              
                
                  
                    
                    
                  
                
                No PageRank data available
              
            

            
            
              

              
              
                
                  🚫
                    Most Blocking
                    Direct Blocker Count
                  
                
                
                  
                    What It Measures
                    Issues that are directly blocking the most other issues from being worked on.
                  
                  
                    Why It Matters
                    Clearing these blockers enables parallel work on multiple dependent tasks.
                  
                  
                    Take Action
                    High-priority targets for immediate resolution to maximize team velocity.
                  
                  
                    How It's Calculated
                    
                      Blocks(v) = count of issues where v is a blocker
                    
                  
                
                

              
                  📐 What: Issues directly blocking the most other issues from being worked on.
                  💡 Why: Clearing these enables parallel work on multiple dependent tasks.
                  🎯 Action: High-priority targets for immediate resolution to maximize velocity.
                
              
                
                  
                    
                    
                       blocked
                    
                  
                
                No blocking data available
              
            

            
            
              

              
              
                
                  🛰️
                    HITS Hubs
                    Hub Score
                  
                
                
                  
                    What It Measures
                    Beads that depend on many important authorities (aggregators).
                  
                  
                    Why It Matters
                    Hubs collect dependencies. They often represent high-level features or epics.
                  
                  
                    Take Action
                    Track for milestones. Their completion signals major project progress.
                  
                  
                    How It's Calculated
                    
                      Hub(v) = Σ Authority(u)
                      for all u where v→u
                    
                  
                
                

              
                  📐 What: Beads that depend on many important authorities (aggregators).
                  💡 Why: Hubs are coordination points. They represent high-level features or epics.
                  🎯 Action: Track for milestones. Their completion signals major project progress.
                
              
                
                  
                    
                    
                  
                
                No HITS hub data available
              
            

            
            
              

              
              
                
                  📚
                    HITS Authorities
                    Authority Score
                  
                
                
                  
                    What It Measures
                    Beads that are depended upon by many important hubs (providers).
                  
                  
                    Why It Matters
                    Authorities are foundational services/components that many features need.
                  
                  
                    Take Action
                    Stabilize early. Breaking an authority breaks many dependent hubs.
                  
                  
                    How It's Calculated
                    
                      Auth(v) = Σ Hub(u)
                      for all u where u→v
                    
                  
                
                

              
                  📐 What: Beads depended upon by many important hubs (providers).
                  💡 Why: Authorities are foundational services that many features need.
                  🎯 Action: Stabilize early. Breaking an authority breaks many dependent hubs.
                
              
                
                  
                    
                    
                  
                
                No HITS authority data available
              
            

            
            
              

              
              
                
                  🧠
                    K-Core Cohesion
                    k-core Number
                  
                
                
                  
                    What It Measures
                    Nodes with highest k-core numbers (embedded in dense subgraphs).
                  
                  
                    Why It Matters
                    High-core nodes sit in tightly knit clusters—changes can ripple locally.
                  
                  
                    Take Action
                    Use for resilience checks; prioritize when breaking apart tightly coupled areas.
                  
                  
                    How It's Calculated
                    
                      k = max core that node remains in
                      after iterative degree peeling
                    
                  
                
                

              
                  📐 What: Nodes with highest k-core numbers (embedded in dense subgraphs).
                  💡 Why: High-core items are in tightly coupled clusters—changes ripple through the group.
                  🎯 Action: Handle together as a batch. They often form natural work packages.
                
              
                
                  
                    
                    k=
                  
                
                No k-core data available
              
            

            
            
              

              
              
                
                  🪢
                    Cut Points
                    Articulation Vertices
                  
                
                
                  
                    What It Measures
                    Nodes whose removal disconnects the undirected graph.
                  
                  
                    Why It Matters
                    Single points of failure. Instability here can isolate workstreams.
                  
                  
                    Take Action
                    Harden or split these nodes; avoid piling more dependencies onto them.
                  
                  
                    How It's Calculated
                    
                      Tarjan's articulation algorithm
                      on undirected graph view
                    
                  
                
                

              
                  📐 What: Nodes whose removal disconnects parts of the dependency graph.
                  💡 Why: Single points of failure. Instability here can isolate workstreams.
                  🎯 Action: Consider adding parallel paths to reduce dependency on these critical bridges.
                
              
                
                  
                    
                    bridge
                  
                
                No cut points found (graph is well-connected)

## Links

- [Article](https://dicklesworthstone.github.io/beads_for_cass/)
- [Original Tweet](https://x.com/doodlestein/status/2008813776687030781)
