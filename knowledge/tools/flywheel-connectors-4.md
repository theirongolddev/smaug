---
title: "flywheel_connectors"
type: tool
date_added: 2026-02-09
source: "https://github.com/Dicklesworthstone/flywheel_connectors/commits/main/FCP_Specification_V2.md"
stars: 28
language: "Rust"
tags: [git-history, specification-evolution, design-decisions]
via: "Twitter bookmark from @doodlestein"
---

Commit history archive for FCP specification iterations. Documents the evolution of the specification across multiple refinement rounds with detailed commit messages and git audit trail. Useful for understanding design decisions and evolution of security/performance considerations.

## Key Takeaways
- Full git commit history showing specification evolution
- Traces design iterations and rationale for changes
- Documents security implications reviewed in each round
- Shows progression toward stable production-ready specification

## README

# Flywheel Connector Protocol (FCP)

<div align="center">
  <img src="fcp_illustration.webp" alt="FCP - Secure connectors for AI agents with zone-based isolation and capability tokens">
</div>

> **Specification note:** `FCP_Specification_V2.md` is the *authoritative* interoperability contract.
> This README is a high-level overview; when diagrams conflict, implement the Spec.

A mesh-native protocol for secure, distributed AI assistant operations across personal device meshes — plus a growing library of production-ready Rust connectors implementing that protocol.

---

## TL;DR

**This project is two things:**

1. **The FCP Protocol** — A mesh-native specification for how AI agents securely interact with external services through zone-isolated, capability-gated connectors distributed across your personal device mesh

2. **Connector Implementations** — Production Rust binaries for Twitter, Linear, Stripe, Telegram, Discord, Gmail, GitHub, browser automation, and more

**The Vision**: Your personal AI runs on YOUR devices. Your data exists as symbols across YOUR mesh. Any subset of YOUR devices can reconstruct anything. Computation happens wherever optimal. Secrets are never complete anywhere. History is tamper-evident by construction.

**This is not a cloud alternative. This is digital sovereignty.**

**Registry Note**: Registries are just sources of signed manifests/binaries. Your mesh can mirror and pin connectors as content-addressed objects so installs/updates work offline and without upstream dependency.

### Three Foundational Axioms

| Axiom | Principle |
|-------|-----------|
| **Universal Fungibility** | All durable mesh objects are symbol-addressable: any K' symbols reconstruct the canonical object bytes. Control-plane messages MAY travel over FCPC streams for efficiency, but the canonical representation is still a content-addressed mesh object. |
| **Authenticated Mesh** | Tailscale IS the transport AND the identity layer. Every node has unforgeable WireGuard keys. |
| **Explicit Authority** | No ambient authority. All capabilities flow from owner key through cryptographic chains. |

### Why Use FCP?

| Feature | What It Does |
|---------|--------------|
| **Mesh-Native Architecture** | Every device IS the Hub. No central coordinator. |
| **Symbol-First Protocol** | RaptorQ fountain codes enable multipath aggregation and offline resilience |
| **Zone Isolation** | Cryptographic namespaces with integrity/confidentiality axes and Tailscale ACL enforcement |
| **Mesh-Stored Policy Objects** | Zone definitions + policies are owner-signed mesh objects (auditable + rollbackable) |
| **Capability Tokens (CWT/COSE)** | Provable authority with grant_object_ids; tokens are canonically CBOR-encoded and COSE-signed for interoperability |
| **Threshold Owner Key** | FROST signing so no single device holds the complete owner private key |
| **Threshold Secrets** | Shamir secret sharing with k-of-n across devices—never complete anywhere |
| **Secretless Connectors** | Egress proxy can inject credentials so connectors never see raw API keys by default |
| **Computation Migration** | Operations execute on the optimal device automatically |
| **Offline Access** | Measurable availability SLOs via ObjectPlacementPolicy and background repair |
| **Tamper-Evident Audit** | Hash-linked audit chain with monotonic seq and quorum-signed checkpoints |
| **Revocation** | First-class revocation objects with O(1) freshness checks |
| **Egress Proxy** | Connector network access via capability-gated proxy with CIDR deny defaults |
| **Supply Chain Attestations** | in-toto/SLSA provenance + SBOM + vulnerability-scan attestations, transparency logging |

### Quick Example

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           PERSONAL MESH                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌──────────┐      ┌──────────┐      ┌──────────┐                      │
│   │ Desktop  │◄────►│  Laptop  │◄────►│  Phone   │  ← Tailscale mesh    │
│   │ MeshNode │      │ MeshNode │      │ MeshNode │                      │
│   └────┬─────┘      └────┬─────┘      └────┬─────┘                      │
│        │                 │                 │                             │
│        ▼                 ▼                 ▼                             │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                    SYMBOL DISTRIBUTION                           │   │
│   │  Object: gmail-inbox-2026-01   K=100 symbols distributed        │   │
│   │  Desktop: [1,5,12,23,...]  Laptop: [2,8,15,...]  Phone: [3,9,...]│   │
│   │  Any 100 symbols → full reconstruction                          │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                      
...[truncated]

## Links

- [GitHub](https://github.com/Dicklesworthstone/flywheel_connectors/commits/main/FCP_Specification_V2.md)
- [Original Tweet](https://x.com/doodlestein/status/2010780941027889572)
