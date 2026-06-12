---
tags:
  - entity
created: 2026-04-23
updated: 2026-04-23
sources: 1
---

# SynergyRCA

LLM-based [[Root Cause Analysis]] tool for [[Kubernetes]] that uses graph-structured [[Retrieval-Augmented Generation]] from a [[Neo4j]] database. Developed at [[Tsinghua University]] with industry collaboration ([[Harmonic Inc]], [[Peng Cheng Laboratory]]).

## Overview

SynergyRCA constructs two graph structures from a running Kubernetes cluster:

- **StateGraph** — captures spatial and temporal entity relationships at runtime (entity vertices + STATE snapshot vertices; edges: `ReferInternal`, `UseExternal`, `HasState`, `HasEvent`)
- **MetaGraph** — schema-level abstraction mapping entity kinds and their connections (derived from StateGraph; analogous to class vs. object diagram)

Five LLM modules (Triage → PathQueryGen → StateChecker → ReportGen → ReportQualityChecker) pipeline an incident through graph-guided diagnosis, producing a root cause report with remediation commands.

## Key Results

- **~0.90 precision** across two production clusters (v1.18 / v1.21)
- **~2 minutes** average diagnosis time
- **18–20 root cause types** identified, including 5 novel types
- **~$0.19–$0.41** per diagnosis (GPT-4o pricing)
- 99% of token cost is input prompts (STATE vertex JSON) — validates [[Computing Pushdown]]

## Architecture Principles

- **State reconciliation**: checks existence, correctness, and consistency of entity states
- **Graph-constrained LLM**: MetaGraph prevents hallucinated entity connections; entity taxonomy prevents hallucinated entity kinds
- **Strict factual adherence**: StateChecker prompt forbids inference beyond provided JSON — anti-hallucination design
- **Iterative retry**: ReportQualityChecker triggers re-triage if diagnosis is insufficient (up to 3 attempts)

## Comparison with [[K8sGPT]]

| Aspect | SynergyRCA | K8sGPT |
|---|---|---|
| LLM role | Full reasoning + code generation + diagnosis | Natural language output only |
| Knowledge source | Runtime graph database (dynamic) | Hardcoded SRE analyzers (static) |
| Maintenance | Automatic graph construction | Manual analyzer updates per K8s version |
| Scope | End-to-end RCA with remediation | Scan + explain (no remediation) |

## Relationships

- [[Root Cause Analysis]] — primary task
- [[Retrieval-Augmented Generation]] — graph-based RAG variant
- [[Neo4j]] — graph database backend
- [[K8sGPT]] — compared alternative
- [[Kubernetes]] — target environment
- [[LLM Agent]] — future work proposes TAG agent extension

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-06-03] Simplifying Root Cause Analysis in Kubernetes with StateGraph and LLM]]
