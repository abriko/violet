---
tags: [entity]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# Alibaba Cloud SLS

**Type:** Managed Data Platform  
**Full Name:** Simple Log Service  
**Vendor:** Alibaba Cloud  
**Website:** https://www.alibabacloud.com/product/log-service  
**Role in Cloud Monitor 2.0:** Unified observability data backbone

---

## Overview

Simple Log Service (SLS) is Alibaba Cloud's unified observability data platform, serving as the core engine underpinning [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]] 2.0. It provides centralised management for all five observability signal types — logs, metrics, traces, events, and performance profiles — replacing the fragmented multi-system architecture that previously created data silos and blocked cross-domain [[3 - Areas/AIOps/wiki/concepts/AIOps]] analysis.

---

## Scale and Performance

| Capability | Specification |
|-----------|--------------|
| Storage scale | Exabyte-scale; globally available, highly elastic |
| Query speed | Hundreds of billions of rows in seconds |
| Analytics | Tens of billions of rows |
| Time-series compute | Millions of time-series per computation |
| Daily ingest | Hundreds of petabytes (logs, metrics, traces) |
| Data redundancy | 3 replicas; triple-zone redundancy in eligible regions |
| Cost vs. self-managed | **>50% reduction** |

---

## Collection

- **200+ collectors** spanning the full stack: mobile devices → traditional applications → cloud infrastructure → AI/LLM frameworks
- **Non-intrusive** real-time collection
- Breaks down monitoring silos — a single ingestion point replaces multiple system-specific pipelines

---

## Open Data Principles

SLS adheres to open standards, ensuring data portability and compatibility:

| Signal type | Standard |
|-------------|---------|
| Metrics | [[3 - Areas/AIOps/wiki/entities/Prometheus]] (PromQL compatible) |
| Traces | [[3 - Areas/AIOps/wiki/entities/OpenTelemetry]] |
| Events | CloudEvents |
| Tables | SQL |

All data is stored within the **customer's own SLS project** — customers retain full ownership and can perform custom analysis or export freely.

---

## Relationship to Observability Operators

SLS is the execution environment for [[3 - Areas/AIOps/wiki/concepts/Computing Pushdown]]. Rather than sending raw data to an LLM, the [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]] AIOps Agent invokes specialised observability operators that run inside SLS:

- **Metric operators:** anomaly detection, forecasting, clustering, dimensional drill-down
- **Trace operators:** anomaly analysis, dimensional drill-down, topology construction and comparison

Only the pre-processed, high-value output is forwarded to the LLM — achieving **>90% token reduction** vs. raw data ingestion.

---

## AI Agent Observability Backend

SLS is also the unified observability backend for AI Agent workloads running on [[3 - Areas/AIOps/wiki/entities/ACS Agent Sandbox]]. Via [[3 - Areas/AIOps/wiki/entities/LoongCollector]] (auto-injected sidecar), all four [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]] signal types are routed to SLS:

| Signal | SLS Store Type | Use |
|---|---|---|
| Session audit logs | Logstore | Behaviour audit: tool calls, parameters, token cost |
| Application logs | Logstore | System health: gateway errors, webhook failures |
| OTEL Metrics | MetricStore | Real-time monitoring: token rate, stuck sessions, latency |
| OTEL Traces | Trace Store | Request chain analysis |

SLS's SPL (Simple Pipeline Language) enables rich analysis directly on session logs — including sensitive data detection, high-risk tool call auditing, cost attribution by model/provider, and multi-source correlation queries.

---

## Relationship to Other Entities

- **[[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]]** — Cloud Monitor 2.0 is built on SLS as its data backbone
- **[[3 - Areas/AIOps/wiki/entities/Alibaba Cloud ARMS]]** — ARMS uses SLS as its log backend; Tianchi 2025 contestants query SLS via RAM role credentials
- **[[3 - Areas/AIOps/wiki/entities/UModel]]** — UModel queries SLS to populate entity attributes and surface golden metrics/health signals
- **[[3 - Areas/AIOps/wiki/entities/Prometheus]]** — SLS stores Prometheus-format metrics, bridging managed and open-source ecosystems
- **[[3 - Areas/AIOps/wiki/entities/OpenTelemetry]]** — SLS is an OpenTelemetry-compatible trace and metric sink
- **[[3 - Areas/AIOps/wiki/entities/LoongCollector]]** — LoongCollector is the primary data pipeline feeding AI Agent telemetry into SLS
- **[[3 - Areas/AIOps/wiki/entities/ACS Agent Sandbox]]** — ACS Agent Sandbox workloads use SLS as the observability backend

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Apsara Conference Insights Rebuild Observability]]
- [[3 - Areas/AIOps/wiki/sources/[2026-03-02] 你的 OpenClaw 真的在受控运行吗？]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-06] LoongCollector + ACS Agent Sandbox]]
