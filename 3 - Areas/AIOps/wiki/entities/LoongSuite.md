---
tags: [entity]
created: 2026-05-13
updated: 2026-05-13
sources: 1
---

# LoongSuite

**Type:** Open-source observability framework / brand
**Organisation:** Alibaba Group / Ant Group
**Repository:** https://github.com/alibaba/loongsuite-semantic-conventions-genai

---

## Overview

LoongSuite is Alibaba's open-source observability brand for AI workloads. Its flagship component, **GenAI SemConv**, extends [[OpenTelemetry]] semantic conventions to provide Agent-level, Skill-level, and Token-level trace granularity that standard OTel GenAI conventions do not yet cover.

---

## Components

### GenAI SemConv (Semantic Conventions)

Extensions to OTel GenAI semantic conventions:

- **Entry/Step Span**: two-level Agent trace hierarchy (Entry = full invocation, Step = single ReAct iteration)
- **Skill attributes** (`gen_ai.skill.*`): business-function-level observability for reusable Agent capabilities
- **Token-level attributes**: per-token scheduling/execution/total latency, batch size, Top-K probability distribution

### GenAI Utils (Engineering Layer)

`ExtendedTelemetryHandler` — abstracts OTel SDK complexity so instrumentation libraries only extract semantic data without managing span lifecycle or OTel API calls.

- **Python SDK**: available
- **JavaScript SDK**: available

---

## Production Deployments

- [[OpenClaw]]
- QwenPaw
- Hermes Agent

Contributions from LoongSuite have been fed upstream to the OTel GenAI SemConv working group.

---

## Relationships

- Extends: [[OpenTelemetry]]
- Domain: [[AI Agent Observability]]
- Backend: [[Alibaba Cloud SLS]]
- Related collector: [[LoongCollector]]

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-05-12] LoongSuite GenAI 可观测语义规范]]
