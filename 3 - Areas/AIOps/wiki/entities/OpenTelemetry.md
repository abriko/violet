---
tags: [entity]
created: 2026-04-13
updated: 2026-05-13
sources: 3
---

# OpenTelemetry

**Type:** Open-Source Observability Framework / Standard  
**Maintained by:** CNCF (Cloud Native Computing Foundation)  
**Website:** https://opentelemetry.io  
**Predecessor standards:** OpenTracing, OpenCensus (merged into OTel)

---

## Overview

OpenTelemetry (OTel) is the CNCF-hosted open standard for generating, collecting, and exporting telemetry data — traces, metrics, and logs — in a vendor-neutral way. It provides SDKs for most major programming languages and a Collector component for pipeline processing.

It has become the **dominant tracing standard** in cloud-native environments, superseding the earlier OpenTracing and OpenCensus projects.

---

## Role in the Observability Stack

OpenTelemetry primarily addresses the **Tracing** pillar of the [[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]], with growing support for Metrics and Logs:

- **Traces** — distributed trace context propagation (W3C TraceContext), span collection
- **Metrics** — OTLP-format metrics exportable to [[3 - Areas/AIOps/wiki/entities/Prometheus]] or vendor backends
- **Logs** — structured log correlation with trace context

---

## Significance for AI Observability

OpenTelemetry is increasingly being adopted to instrument **LLM inference pipelines and agents**, capturing:
- Latency per LLM call and tool invocation
- Token usage (prompt/completion)
- Agent step traces (which tools were called, in what order)

This connects to the broader AI-with-observability theme: OTel as the instrumentation layer for [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] systems.

> [!note] GenAI Semantic Conventions Status (2026)
> OTel GenAI SemConv is actively evolving. Basic LLM call spans (model, token counts, latency) are stabilising. [[LoongSuite]] GenAI SemConv by Alibaba/Ant Group is a major vendor extension that adds Agent hierarchy (Entry/Step Span), Skill-level attributes (`gen_ai.skill.*`), and per-token inference observability — contributions are being fed upstream to the OTel working group.

---

## Relationship to Other Entities

- **[[3 - Areas/AIOps/wiki/entities/Prometheus]]** — OTel can export metrics in Prometheus format; the two complement each other
- **[[3 - Areas/AIOps/wiki/entities/Grafana]]** — Grafana's Tempo (distributed tracing backend) is a primary OTel trace destination; Grafana Cloud accepts OTLP natively
- **[[3 - Areas/AIOps/wiki/entities/Alibaba Cloud ARMS]]** — ARMS accepts traces via OTel SDKs/probes in addition to its proprietary Java probe
- **[[3 - Areas/AIOps/wiki/entities/LoongSuite]]** — Alibaba's open-source GenAI SemConv extension; adds Agent/Skill/Token-level trace semantics beyond upstream OTel

---

## Stabilization Roadmap (GrafanaCON 2026)

Ted Young (OTel co-founder, now a Grafanista) presented the stabilization roadmap at GrafanaCON 2026:

- **Top priority:** stabilize all components for CNCF graduation
- **Two-stage instrumentation rollout:** (1) mark de-facto-stable packages as 1.0, (2) lift data to latest semantic conventions
- **Integrated OpenTelemetry:** vision of `apt-get install OpenTelemetry` — single-click system-wide install
- **Kubernetes operator improvements** removing current limitations
- **Philosophy:** "Boring is amazing" — stability and reliability over novelty

> [!tip] Key insight
> The goal is to make OpenTelemetry so stable and ubiquitous that instrumenting an application becomes as routine as installing a package — no expertise required.

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-13] All in One How to Build an End-to-End Observable System]]
- [[3 - Areas/AIOps/wiki/sources/[2026-05-12] LoongSuite GenAI 可观测语义规范]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-22] GrafanaCON 2026 Keynote]]
