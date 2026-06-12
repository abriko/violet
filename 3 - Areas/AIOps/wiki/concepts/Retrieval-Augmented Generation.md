---
tags: [concept]
created: 2026-04-14
updated: 2026-04-23
sources: 1
---

# Retrieval-Augmented Generation

**Abbreviation:** RAG

---

## Overview

Retrieval-Augmented Generation (RAG) is a pattern for grounding LLM responses in retrieved, external knowledge rather than relying solely on the model's parametric memory. A standard RAG pipeline:

1. Encode a query into an embedding vector
2. Retrieve semantically similar documents from a vector store
3. Inject retrieved documents into the LLM's context as grounding evidence
4. LLM generates a response conditioned on both the query and the retrieved content

RAG reduces hallucination and enables LLMs to reason over private or frequently-updated knowledge bases without requiring fine-tuning.

---

## Relevance to AIOps and Observability

RAG appears in several forms across the AI-with-observability stack:

| Use case | Implementation |
|----------|---------------|
| [[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]] ([[3 - Areas/AIOps/wiki/entities/Grafana Assistant]]) | Domain-specific RAG; "documents" are auto-harvested infrastructure facts (service names, topologies, regions) |
| On-call RCA ([[3 - Areas/AIOps/wiki/entities/Adobe]]) | Azure AI Search retrieves relevant runbooks and past RCA narratives when diagnosing incidents |
| Knowledge base (K8sGPT Operator mode) | Historical diagnostics and remediation suggestions retrieved at query time |
| Graph-based RAG ([[3 - Areas/AIOps/wiki/entities/SynergyRCA]]) | StateGraph + MetaGraph in [[Neo4j]]; LLM generates Cypher queries to retrieve runtime K8s entity states; ~0.90 RCA precision |

> [!tip]
> In AIOps, the knowledge base corpus is typically a combination of: operational runbooks, past incident post-mortems, and infrastructure topology facts. Chunk size matters significantly — [[3 - Areas/AIOps/wiki/entities/Adobe]]'s lesson: ~5K tokens per document; large runbooks split into small chunks pollute RAG context with unrelated command snippets.

---

## Related Concepts

- [[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]] — Grafana's domain-specific RAG implementation
- [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] — agents use RAG to ground tool-call reasoning in domain knowledge
- [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]] — past RCA histories are a primary RAG knowledge source in AIOps
- [[3 - Areas/AIOps/wiki/concepts/Token Noise Reduction]] — RAG is an input-side technique: retrieving only relevant context reduces tokens vs. passing the entire knowledge base
- [[3 - Areas/AIOps/wiki/entities/SynergyRCA]] — graph-structured RAG variant; retrieves structured runtime state from Neo4j rather than unstructured text from a vector store
- [[3 - Areas/AIOps/wiki/concepts/Knowledge Graph]] — graph databases as an alternative RAG backend to vector stores

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-06-03] Simplifying Root Cause Analysis in Kubernetes with StateGraph and LLM]]
