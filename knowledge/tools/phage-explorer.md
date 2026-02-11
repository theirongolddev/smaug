---
title: "phage_explorer"
type: tool
date_added: 2026-02-09
source: "https://github.com/Dicklesworthstone/phage_explorer"
stars: 21
language: "TypeScript"
tags: ["biology", "genetics", "phage", "virus", "bioinformatics", "visualization", "education", "molecular-biology", "tui"]
via: "Twitter bookmark from @doodlestein"
---

## Summary

Comprehensive open-source bioinformatics platform for exploring bacteriophage genomes featuring 23 analysis algorithms, 40+ visualizations, and interactive simulations. Implements ~150K lines of TypeScript/Rust/Wasm with complete genetic data for 24 phage classes (Lambda, T4, T5, P1, P22, etc.). Serves as educational resource for understanding phage modularity, genetic code translation, and structure biology.

## Key Takeaways

- **Scope**: 24 complete phage genomes, color-coded DNA/amino acid sequences, WebGL 3D structure viewer (RCSB PDB), rotating 3D ASCII phage models
- **Algorithms**: Codon usage, ORF detection, restriction enzyme mapping, sequence similarity, hydrophobicity analysis, G+C content, and 17 more
- **Simulations**: Lysogeny decision circuit (lysis vs lysogeny), plaque growth automata, ribosome traffic congestion, burst kinetics, restriction digestion, protein translation
- **Features**: Virtual gel electrophoresis with enzyme digestion, genome browser with gene map, amino acid property visualization, high-performance TUI for desktop, mobile-optimized
- **Technical**: Offline-first, runs locally, no cloud dependencies, uses Bun runtime, WebGL for 3D molecular structures
- **Why phages matter**: Most abundant organisms on Earth (10^31 particles), drive bacterial evolution, reshape carbon cycle, foundational to genetic code discovery (Hershey-Chase, Crick-Brenner)

## README

# Phage Explorer

![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-blue)
![Runtime](https://img.shields.io/badge/runtime-Bun%201.1+-purple)
![License](https://img.shields.io/badge/license-MIT-green)

A Terminal User Interface (TUI) for browsing, visualizing, and analyzing bacteriophage genetic data. Features color-coded DNA/amino acid sequences, rotating 3D ASCII phage models, and instant navigation between genomes—no browser, no cloud, just a fast local binary.

**One-liner install:**
```bash
curl -fsSL "https://raw.githubusercontent.com/Dicklesworthstone/phage_explorer/main/install.sh?$(date +%s)" | bash
```

---

## Screenshots

<p align="center">
  <img src="docs/images/lambda_phage_full_interface.webp" alt="Phage Explorer main interface" width="100%">
  <br>
  <em>Main dashboard — Phage selector with 24 genomes, Lambda phage illustration, color-coded sequence grid, 3D protein structure viewer, and Analysis Tools panel</em>
</p>

<p align="center">
  <img src="docs/images/t5_phage_3d_structure.webp" alt="Sequence grid with 3D structure" width="100%">
  <br>
  <em>Sequence + Structure view — Color-coded amino acid grid with gene map, alongside WebGL 3D protein structure (8ZVI, 28,618 atoms) fetched from RCSB PDB</em>
</p>

<p align="center">
  <img src="docs/images/t5_phage_sequence_detail.webp" alt="Virtual Gel Electrophoresis" width="100%">
  <br>
  <em>Virtual Gel Electrophoresis [Alt+G] — Simulate restriction enzyme digestion with EcoRI, HindIII, BamHI and more; compare predicted band patterns against experimental gels</em>
</p>

<p align="center">
  <img src="docs/images/t5_phage_zoomed_view.webp" alt="Simulation Hub" width="100%">
  <br>
  <em>Simulation Hub [Shift+S] — Interactive phage biology simulations: Lysogeny Decision Circuit, Plaque Growth Automata, Ribosome Traffic, Burst Kinetics, and more</em>
</p>

---

## Phage 101 for engineers (why this field is wild)

**What phages are (in engineering terms):** self-assembling nanosyringes that package code (DNA/RNA) in a protein shell, land on bacteria, and inject that code to hijack the host. They’re the most abundant biological “edge devices” on Earth (≈10³¹ particles), continuously stress‑testing bacterial firmware.

### Why people study them
- *Medicine*: design phage cocktails to beat antibiotic‑resistant infections.
- *Biotech*: workhorse enzymes (T7 RNA polymerase, Phi29 DNA pol) are phage gifts used in PCR, in‑vitro transcription, and genome amplification.
- *Evolution & ecology*: phages rewrite bacterial genomes, drive the ocean carbon cycle, and shape your gut microbiome.
- *Engineering playground*: modular genomes swap parts (tail fibers, lysis cassettes) like microservice plugins.

### How phages cracked the genetic code
- **Hershey–Chase blender experiment (1952)** used phage T2 to prove DNA is the hereditary material.
- **Crick–Brenner frameshift experiment (1961)** in phage T4 rII genes showed the code is read in *triplets*—delete/insert three bases and the protein still works.
- **Early codon assignments** relied on phage RNA/DNA templates (e.g., poly‑U/UGG) to map base triplets to amino acids, paving the way for the 64‑codon table we use today.

---

- **What they are:** Bacteriophages (“phages”) are bacteria‑infecting viruses. They self‑assemble into nanomachines with a head (capsid) that stores DNA/RNA and a tail that injects it like a syringe.
- **Why they matter today**
  - *Medicine*: design phage cocktails to beat antibiotic‑resistant infections.
  - *Biotech*: workhorse enzymes (T7 RNA polymerase, Phi29 DNA pol) are phage gifts used in PCR, in‑vitro transcription, and genome amplification.
  - *Evolution & ecology*: phages are the most abundant biological entities on Earth. They rewrite bacterial genomes, drive the ocean carbon cycle, and shape your gut microbiome.
- **Modular by design:** Phage genomes behave like Lego kits—swapping tail fibers, lysis cassettes, and regulatory modules across lineages. That modularity is exactly what Phage Explorer visualizes.
- **Historical impact:** Foundational experiments (Hershey–Chase blender test for DNA as genetic material; Luria–Delbrück fluctuation test revealing random mutation) used phages. They were also the playground for cracking the genetic code.

### Quick mental model for software folks
- **Genome = source code** (A/C/G/T chars) with strongly typed 3-char opcodes (codons).
- **Promoter/RBS = function entry points** that recruit ribosomes (the runtime) to start decoding.
- **Reading frame = instruction pointer alignment;** shift by one base and every downstream opcode changes.
- **Stop codons = return;** terminate translation and hand control back to the host.
- **Phage lifecycle = deployment strategy:** lytic = `rm -rf host`; lysogenic = `git clone` into host genome and wait.

## A 90‑second genetic code primer

- DNA alphabet: A, C, G, T (RNA swaps T→U). Proteins are chains of 20 amino acids.
- Translation reads DNA in **codons**—non‑o
...[truncated]

## Links

- [GitHub](https://github.com/Dicklesworthstone/phage_explorer)
- [Original Tweet](https://x.com/doodlestein/status/2017440470595436836)
