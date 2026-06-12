---
tags: [concept]
created: 2026-04-13
updated: 2026-04-13
sources: 1
---

# Application Performance Monitoring

**Abbreviation:** APM  
**Also known as:** Application Performance Management

---

## Definition

APM is the practice of monitoring and managing software application performance and availability. It uses diagnostic tools — particularly distributed traces, thread/memory profiling, and code-level instrumentation — to identify the root cause of performance problems detected by basic monitoring.

In the observability maturity model, APM sits between raw **monitoring** (known KPI dashboards) and full **observability** (unknown-unknown discovery):

| Level | Tool | Answers |
|-------|------|---------|
| Monitoring | Dashboards, alerts | *Is something wrong?* |
| **APM** | Traces, profilers, thread dumps | *Why is it wrong?* |
| Observability | Cross-signal correlation | *What unknown thing is wrong?* |

---

## Historical Generations

Per the [[3 - Areas/AIOps/wiki/sources/[2026-04-13] All in One How to Build an End-to-End Observable System|Alibaba Cloud survey]]:

- **1st gen (late 1990s)** — CS architecture era; focused on network and host performance
- **2nd gen (post-2000)** — Browser-App-DB era; Java became dominant; APM emerged to diagnose JVM internals (code-level tracing, DB query analysis)
- **3rd gen (post-2005)** — SOA/ESB + virtualization; expanded to distributed tracing across services and virtual resources
- **4th gen (post-2010)** — Cloud-native microservices; APM subsumed into the broader full-stack observability paradigm covering [[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]]

---

## Core Capabilities

- **Distributed Tracing** — following a request across microservice boundaries (see [[3 - Areas/AIOps/wiki/entities/OpenTelemetry]])
- **Service Dependency Mapping** — automatically discovering how services call each other
- **Transaction Profiling** — code-level hotspot identification (CPU, I/O, DB calls per request)
- **Error Tracking** — exception capture and aggregation with stack traces
- **SLI/SLO Monitoring** — tracking the three golden signals: request rate, error rate, latency (RED method)

---

## APM in the AI Observability Context

APM principles apply directly to LLM-powered systems:
- **[[3 - Areas/AIOps/wiki/concepts/LLM Agent]] tracing** — each tool call or sub-agent invocation is a span; distributed traces reveal agent execution paths
- **Latency profiling** — identifying which step (retrieval, LLM call, tool call) dominates end-to-end latency
- **Error tracking** — capturing failed tool calls, hallucination-triggered retries, context window overflows

[[3 - Areas/AIOps/wiki/entities/OpenTelemetry]] is the emerging standard for LLM APM instrumentation.

---

## Commercial Tools

- **[[3 - Areas/AIOps/wiki/entities/Alibaba Cloud ARMS]]** — Java probe-based APM with OTel-compatible ingest
- SkyWalking, Jaeger, Zipkin — open-source APM backends
- Datadog APM, New Relic, Dynatrace — commercial alternatives

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-13] All in One How to Build an End-to-End Observable System]]
