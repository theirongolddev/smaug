---
title: "PrismML Bonsai 8B - 1-Bit Neural Network Compression"
type: tool
date_added: 2026-04-01
source: "https://github.com/PrismML/bonsai"
tags: ["machine-learning", "model-compression", "quantization", "edge-computing", "neural-networks"]
via: "Twitter bookmark from @aakashgupta"
---

1-bit weight quantization model achieving 14x compression (8.2B params in 1.15GB) while maintaining competitive performance with full-precision 8B models. Founded by Caltech PhD team, backed by Khosla Ventures.

Challenges the trillion-dollar AI scaling assumption by proving intelligence density can improve through compression rather than requiring massive compute infrastructure.

## Key Metrics

- **Compression Ratio**: 14x smaller than standard 8B models
- **Memory Footprint**: 1.15 GB vs. 16 GB for full-precision
- **Intelligence Density**: 1.06 capability/GB vs. 0.10 for Qwen3/Llama3 (10x improvement)
- **Throughput**: 40+ tokens/second on iPhone 17 Pro
- **Energy Efficiency**: 5x more efficient on edge hardware compared to standard models
- **Performance**: Competitive with Qwen3 8B and Llama3 8B on standard evals despite 1/14th size

## Models Available

- **Bonsai 1.7B**: 130 tok/s on iPhone 17 Max at 0.24 GB
- **Bonsai 4B**: 132 tok/s on M4 Pro at 0.57 GB
- **Bonsai 8B**: Full evaluation parity with larger models

## Implementation

- Apache 2.0 licensed
- Custom 1-bit kernels for CUDA and Metal
- llama.cpp forks for portability
- Ready for production use on edge devices

## Implications

Fundamentally challenges the assumption that intelligence requires massive compute. If compression scales, the economics of $75B+ annual data center spending could shift dramatically. Enables on-device agents, real-time robotics, offline intelligence, and entirely new product categories.

## Links

- [GitHub Repository](https://github.com/PrismML/bonsai)
- [Original Announcement](https://x.com/PrismML/status/2039049400190939426)
- [Analysis Thread](https://x.com/aakashgupta/status/2039244629653286940)

## Team

Founded by Caltech professors and PhDs:
- CEO: Babak Hassibi (neural network compression theory)
- Backed by Khosla Ventures, Cerberus (includes Amir Salek who built TPU at Google)
