---
tags:
  - source
created: 2026-04-23
updated: 2026-04-23
sources: 1
---

# [2025-06-03] Simplifying Root Cause Analysis in Kubernetes with StateGraph and LLM

## Metadata

| Field | Value |
|---|---|
| **Title** | Simplifying Root Cause Analysis in Kubernetes with StateGraph and LLM |
| **Authors** | Yong Xiang, Charley Peter Chen, Liyi Zeng, Wei Yin, Xin Liu, Hu Li, Wei Xu |
| **Affiliations** | [[Tsinghua University]], [[Harmonic Inc]], [[Peng Cheng Laboratory]] |
| **Published** | 2025-06-03 (arXiv:2506.02490v1) |
| **Type** | Academic paper (cs.DC) |
| **LLM Used** | GPT-4o (via Azure OpenAI) |
| **Graph DB** | [[Neo4j]] |

## Summary

SynergyRCA is an end-to-end [[Root Cause Analysis]] tool for [[Kubernetes]] that combines [[Retrieval-Augmented Generation]] from a graph database with expert prompts to diagnose production incidents. Unlike fine-tuning approaches or rule-based tools like [[K8sGPT]], SynergyRCA constructs two graph structures — a **StateGraph** (capturing spatial and temporal entity relationships at runtime) and a **MetaGraph** (a schema-level abstraction of entity kind connections) — stored in Neo4j. An LLM (GPT-4o) then traverses these graphs via generated Cypher queries to locate root causes.

## Key Contributions

1. **Graph-based RAG for RCA**: first integration of graph databases with LLMs for Kubernetes RCA — the StateGraph provides structured runtime context that avoids hallucination from pure LLM reasoning
2. **End-to-end automated system**: from incident detection through triage, graph traversal, state checking, report generation, and quality assessment — no manual intervention required
3. **Production evaluation**: tested on two real-world K8s clusters (v1.18 / 27 nodes / 1 week; v1.21 / 88 nodes / 6 months), achieving **~0.90 precision** in **~2 minutes** average

## Architecture — Five LLM Modules

SynergyRCA's workflow is a pipeline of five LLM-powered modules:

| Module | Function | Key Design |
|---|---|---|
| **Triage** | Predicts root cause entity kind (destKind) from error message | Zero-shot with entity taxonomy + expert guidance prompts; prevents hallucinated entity kinds |
| **PathQueryGen** | Converts metapath into executable Cypher query | LLM code generation constrained by MetaGraph structure; ~95% runnable query rate |
| **StateChecker** | Extracts diagnostic summary from entity STATE vertices | Strict factual adherence prompt — LLM must not infer beyond provided JSON |
| **ReportGen** | Generates root cause report + remediation commands | Three state reconciliation rules; includes specific kubectl commands with actual resource names |
| **ReportQualityChecker** | Assesses if report adequately explains the incident | Score-based (not binary) for longer chain-of-thought reasoning; triggers retry if insufficient |

## StateGraph and MetaGraph

- **StateGraph**: captures all K8s entities (native: Pod, PVC, Job, etc. + external: NFS, container, image) as vertices, with snapshots (STATE vertices) recording periodic state. Edges are typed: `ReferInternal` (native→native), `UseExternal` (native→external), `HasState`, `HasEvent`
- **MetaGraph**: derived from StateGraph by abstracting entity instances to entity kinds — functions like a class diagram vs. object diagram. Used by Triage to constrain destKind predictions and by PathQueryGen to ensure valid graph traversals
- **State reconciliation principle**: root causes are identified by checking (1) existence of current state, (2) correctness/consistency of states, (3) discrepancies between states

## Evaluation Results

| Metric | Dataset-1 (v1.18) | Dataset-2 (v1.21) |
|---|---|---|
| **Overall Precision** | 0.88 | 0.92 |
| **Triage Precision** | 0.89–0.91 | 0.92–0.95 |
| **PathQueryGen Precision** | ~0.95 | ~0.95 |
| **ReportGen Conclusion** | 0.92–0.94 | 0.93–0.95 |
| **Avg Time per Attempt** | ~131 sec | ~119 sec |
| **Avg Token Cost** | ~161K tokens (~$0.41) | ~73K tokens (~$0.19) |
| **Root Cause Types Found** | 18 | 20 (incl. 5 novel) |

> [!tip] 99% of token cost is input prompts
> StateChecker processing STATE vertex JSON content dominates token consumption. This aligns with the [[Computing Pushdown]] principle — reducing input tokens at the data layer is the primary cost lever.

## Limitations

- **Snapshot inconsistency**: 5-minute polling interval can miss rapid state changes (e.g., PVC briefly unbound then rebound), causing false negatives. Tolerating inconsistent snapshots pushes precision above 0.95
- **Aggregation scenarios**: issues like `FailedScheduling-NodeNotAvailable` require aggregating data across all Nodes, which the current single-entity StateChecker cannot handle
- **Future direction**: tool-augmented generation (TAG) agents for diverse checking strategies

## Comparison with Existing Approaches

| Approach | Limitation SynergyRCA Addresses |
|---|---|
| Fine-tuning LLMs (Ahmed et al.) | Expensive; hard to update continuously; hallucination risk |
| [[K8sGPT]] (rule-based + LLM) | Requires expert maintenance for version updates; LLM only for NL output, not reasoning |
| In-context learning (Zhang et al.) | Limited by example count in prompt; SynergyRCA uses graph-based dynamic retrieval instead |
| RCACopilot (RAG + ICL) | Relies on incident handlers; SynergyRCA bypasses incident handler via direct graph queries |
| GraphRAG (Microsoft) | Builds knowledge graphs from text; cannot capture rapidly changing runtime states |

## Relationships

- [[Root Cause Analysis]] — primary task; extends with graph-based RAG methodology
- [[Retrieval-Augmented Generation]] — core technique; graph-structured RAG variant
- [[K8sGPT]] — compared as rule-based alternative; SynergyRCA is more autonomous
- [[LLM Agent]] — SynergyRCA is a multi-module LLM pipeline (not yet a full ReAct agent; future work proposes TAG agents)
- [[Computing Pushdown]] — 99% input token cost validates the need for data-layer token reduction
- [[Kubernetes]] — target environment for all evaluation
- [[Neo4j]] — graph database backend
