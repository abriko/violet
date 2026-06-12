---
tags: [source]
created: 2026-05-13
updated: 2026-05-13
sources: 1
---

# LoongSuite GenAI 可观测语义规范

**Authors:** 铖朴、瑜棕、顺岭 (Alibaba / Ant Group)
**Published:** ~2026-05-12
**Repository:** https://github.com/alibaba/loongsuite-semantic-conventions-genai

---

## Summary

Alibaba and Ant Group jointly created [[LoongSuite]] GenAI SemConv, an extension of [[OpenTelemetry]] GenAI semantic conventions designed to make AI Agent workloads deeply observable at the trace, skill, and token level.

---

## Key Innovations

### 1. Entry/Step Span — Hierarchical Agent Trace Structure

Standard OTel traces for complex Agents can produce hundreds of spans, making them unreadable. LoongSuite introduces two span types:

- **Entry Span**: captures the raw user input and final output of an Agent invocation
- **Step Span**: captures each ReAct iteration (think → act → observe) within the Entry

This hierarchy collapses a flat 100+ span trace into a navigable two-level tree.

### 2. Skill Semantic — Business-Function-Level Observability

New `gen_ai.skill.*` attributes define a **Skill** as a reusable unit between a Tool and an Agent. Skills represent business functions (e.g. "flight booking", "document summarisation") and enable observability at the business-capability level rather than the raw tool-call level.

### 3. Token-Level Inference Observability

Per-token timing telemetry:
- **Scheduling latency**: time waiting for GPU resources
- **Execution latency**: actual inference compute time
- **Total latency**: end-to-end per-token time
- **Batch size**: concurrent requests sharing GPU
- **Top-K probability distribution**: token selection confidence

This enables both **performance diagnosis** (slow token → resource contention) and **accuracy diagnosis** (low-confidence token → model uncertainty).

### 4. GenAI Utils — Engineering Abstraction Layer

`ExtendedTelemetryHandler` abstracts away OTel SDK complexity. Instrumentation libraries only need to extract semantic data; GenAI Utils handles span lifecycle, attribute mapping, and export. Available for Python and JavaScript.

---

## Production Deployments

Already integrated into:
- [[OpenClaw]]
- QwenPaw
- Hermes Agent

Contributions fed back upstream to [[OpenTelemetry]] GenAI SemConv working group.

---

## Case Studies

| Scenario | Root Cause | Signal Used |
|---|---|---|
| Slow token generation | Cross-request GPU resource interference | Per-token scheduling latency spike + batch size correlation |
| "Answer irrelevance" | BOS (Beginning of Sequence) token anomaly | Top-K probability distribution showing unexpected token selection |

Both cases demonstrate that token-level observability catches issues invisible to request-level metrics.

---

## Significance

LoongSuite GenAI SemConv fills a critical gap in [[AI Agent Observability]]: the standard OTel GenAI SemConv covers basic LLM call spans, but lacks Agent-hierarchical, skill-level, and token-level granularity needed for production diagnosis. The GenAI Utils layer solves the engineering adoption barrier by decoupling semantic data extraction from OTel API management.

This work also demonstrates [[Computing Pushdown]] principles applied to observability: push semantic extraction to the instrumentation point, centralise pipeline management in a shared utility layer.

---

## Relationships

- Extends: [[OpenTelemetry]]
- Domain: [[AI Agent Observability]]
- Platform: [[LoongSuite]]
- Backend: [[Alibaba Cloud SLS]]
- Deployed in: [[OpenClaw]]
