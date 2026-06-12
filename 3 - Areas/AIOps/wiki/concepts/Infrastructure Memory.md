---
tags: [concept]
created: 2026-04-13
updated: 2026-04-13
sources: 1
---

# Infrastructure Memory

**Also known as:** infrastructure knowledge base, ambient system context

---

## Definition

Infrastructure Memory is a proactive, scheduled mechanism used by [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] to build a persistent knowledge base about an observed system *before* any user query is made. Rather than discovering context on demand, the assistant pre-loads relevant facts so they are immediately available at query time.

---

## How It Works (Grafana Implementation)

1. **Scheduled crawl** — on a weekly cadence, the assistant crawls the connected Grafana instance.
2. **Context extraction** — it identifies and stores facts such as:
   - Application/service names and their relationships
   - Infrastructure topology (e.g., Kubernetes environment, regions)
   - Data sources and signal types available
3. **Database storage** — extracted context is persisted in a dedicated database, not in the LLM's context window.
4. **Query-time retrieval** — when a user asks a question, relevant facts are retrieved from this store (a `retrieve infrastructure memory` step is visible in the UI) and injected into the agent's context.

> [!tip] Key insight
> This is essentially a domain-specific [[3 - Areas/AIOps/wiki/concepts/Retrieval-Augmented Generation]] pattern: the "documents" are automatically harvested infrastructure facts, not user-supplied content.

---

## Why It Matters

Without Infrastructure Memory, an agent answering "which service uses the most CPU?" must first discover what services exist — adding latency and consuming context tokens. With it:

- **Faster responses** — topology is known upfront; the agent goes straight to querying metrics.
- **More accurate service diagrams** — the assistant can map full architecture without sampling or guessing.
- **Reduced context pressure** — facts are retrieved selectively rather than passed wholesale into each prompt.

---

## Relationship to Other Concepts

| Pattern | How Infrastructure Memory relates |
|---|---|
| [[3 - Areas/AIOps/wiki/concepts/LLM Tool Calling]] | Retrieval from the memory store is itself a tool call |
| [[3 - Areas/AIOps/wiki/concepts/Token Noise Reduction]] | Pre-structured facts reduce exploration queries needed |
| [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] | Memory gives the agent ambient awareness it would otherwise have to acquire reactively |

---

## Open Questions

> [!question] How does Grafana handle stale memory between weekly crawls?
> If a new service is deployed mid-week, it may be invisible to the assistant until the next crawl runs.

> [!question] Is Infrastructure Memory user-editable or fully automated?
> The demo shows only the automated cadence; manual enrichment is not mentioned.

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-09] Start with Grafana AI Assistant and ask your observability stack anything]]
