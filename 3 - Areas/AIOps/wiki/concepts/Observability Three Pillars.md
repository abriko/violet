---
tags: [concept]
created: 2026-04-13
updated: 2026-04-13
sources: 2
---

# Observability Three Pillars

**Also known as:** Logs, Metrics, Traces (LMT); the three pillars of observability

---

## Definition

The three pillars model is the standard taxonomy for observability telemetry data in cloud-native systems:

| Pillar | What it captures | Primary standard | Example backends |
|--------|-----------------|-----------------|-----------------|
| **Metrics** | Numeric time-series aggregates (rates, gauges, histograms) | [[3 - Areas/AIOps/wiki/entities/Prometheus]] format / OTLP | Prometheus, Mimir, InfluxDB |
| **Logs** | Timestamped text/structured records of discrete events | No single standard; Fluentd/Loki common | Elasticsearch, Loki, SLS |
| **Traces** | Causal chains of spans across distributed service calls | [[3 - Areas/AIOps/wiki/entities/OpenTelemetry]] (OTLP) | Jaeger, Tempo, SkyWalking |

Some frameworks add a fourth pillar (**Events**) for discrete state-change notifications, though this is less universally adopted.

---

## Why Three Pillars?

Each pillar answers a different observability question:

- **Metrics** → *Is something wrong?* (high error rate, latency spike) — coarse-grained, cheap, alertable
- **Logs** → *What happened?* (event trail, error messages, context) — verbose, high-cardinality, queryable
- **Traces** → *Where did it go wrong?* (which service/span introduced latency or error) — causal, cross-service

No single pillar is sufficient alone. Effective [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]] requires correlating all three: a metric alert triggers investigation, logs provide context, traces pinpoint the failing component.

---

## The Correlation Problem

The core challenge in modern observability is **cross-pillar correlation** — linking a metric anomaly to its causative log lines and the relevant trace. This requires:
- Shared identifiers (trace ID injected into logs)
- Unified query interfaces (e.g., [[3 - Areas/AIOps/wiki/entities/Grafana]]'s explore view linking metrics → logs → traces)
- Application-centric grouping (metrics, logs, and traces all tagged with the same service/app labels)

> [!tip] The Alibaba Cloud article frames the goal as **shielding users from having to distinguish between the three pillars** — the platform should present a unified, application-centric view rather than exposing raw per-pillar silos.

---

## Standards Landscape (as of 2026)

- **Metrics:** Prometheus has achieved consensus as the cloud-native standard
- **Traces:** [[3 - Areas/AIOps/wiki/entities/OpenTelemetry]] has superseded OpenTracing and OpenCensus; widely adopted
- **Logs:** No dominant standard; Fluentd (collection) and Loki (storage/query) are common open-source choices; structuring logs with trace context (via OTel) is best practice
- **Visualization:** [[3 - Areas/AIOps/wiki/entities/Grafana]] is the emerging standard for unified multi-pillar dashboards

---

## Relationship to AI Observability

As LLM systems become infrastructure, the three pillars apply directly:
- **Metrics** — token throughput, latency percentiles, error rates per model endpoint
- **Logs** — prompt/response pairs, tool call records, agent step logs
- **Traces** — end-to-end [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] execution traces (which tools were called, sub-agent calls)

[[3 - Areas/AIOps/wiki/entities/OpenTelemetry]] is the emerging instrumentation standard for LLM pipeline observability.

### AI Agents Introduce a Fourth Signal

[[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]] extends the three pillars with **session audit logs** — a signal unique to AI Agents with no classical observability equivalent:

| Signal | AI Agent Form | Questions Answered |
|---|---|---|
| Metrics | `openclaw.tokens`, `openclaw.cost.usd`, `openclaw.session.stuck` | Is cost spiking? Are sessions stuck? |
| Logs (app) | Structured gateway/webhook/queue logs | What system errors occurred? |
| Traces | OTLP spans per model call and message | Where is latency? What's the call chain? |
| **Session audit** (4th) | Per-conversation JSONL: every tool call, parameter, cost | Who did what? What tools were invoked? Was sensitive data accessed? |

The fourth signal addresses the fundamental non-determinism of AI Agents: because you cannot predict behaviour from code inspection, you need a persistent forensic record.

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-13] All in One How to Build an End-to-End Observable System]]
- [[3 - Areas/AIOps/wiki/sources/[2026-03-02] 你的 OpenClaw 真的在受控运行吗？]]
