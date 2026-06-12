---
tags: [source]
created: 2026-04-13
updated: 2026-04-13
sources: 1
---

# [2026-04-13] All in One: How to Build an End-to-End Observable System

**Source:** [Alibaba Cloud Blog](https://www.alibabacloud.com/blog/599171)  
**Author:** Alibaba Cloud (unnamed)  
**Published:** Unknown  
**Captured:** 2026-04-13

---

## Summary

A comprehensive survey of observability history and architecture, written from an Alibaba Cloud/ARMS product perspective. Covers three decades of evolution from basic host monitoring through APM to cloud-native observability, establishes a conceptual framework distinguishing monitoring/APM/observability using an awareness–understanding matrix, describes the three-pillar data model, and walks through constructing a Prometheus + [[3 - Areas/AIOps/wiki/entities/Grafana]] full-stack dashboard.

---

## Key Takeaways

### 1. Observability Evolution Timeline

| Era | Architecture | O&M Focus |
|-----|-------------|-----------|
| Late 1990s | Client-Server | Network & host performance; first APM generation |
| Post-2000 | Browser-App-DB (Java) | Code-level tracing, DB optimization; second APM generation |
| Post-2005 | SOA/ESB + virtualization | Distributed tracing, virtual resources, three-party components |
| Post-2010 | Cloud-native microservices | Full-stack: logs, metrics, traces, events across entire lifecycle |

### 2. Monitoring vs. APM vs. Observability Framework

Uses a **2×2 awareness / understanding matrix**:

| | Aware | Unaware |
|---|---|---|
| **Understood** | Fact → **Monitoring** (known KPIs, dashboards) | Predictive → **AIOps** (forecast from history) |
| **Not Understood** | Diagnostic → **APM** (trace-driven root cause) | Discovery → **Observability** (unexpected correlations) |

> [!tip] The "Apple terminal / Shanghai" example illustrates true observability: CPU spikes caused by misconfigured Info-level logging for a specific client cohort — unknowable without cross-signal correlation.

### 3. Three Pillars of Observability

Logging · Tracing · Metrics — see [[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]]

### 4. Data Collection Principles

- **Full Stack Coverage** — infra layer → container layer → application layer → user terminal
- **Uniform Standards** — [[3 - Areas/AIOps/wiki/entities/Prometheus]] (metrics), [[3 - Areas/AIOps/wiki/entities/OpenTelemetry]] (traces), Fluentd/Loki (logs), [[3 - Areas/AIOps/wiki/entities/Grafana]] (visualization)
- **Data Quality** — sampling strategy controls (e.g., always-sample on errors/slowness), dynamic adjustment, deduplication; the primary gap between open-source and commercial tools

### 5. Data Analysis Principles

- **Horizontal + Vertical Correlation** — traces link microservices horizontally; infra/container metrics map vertically under each app
- **Domain Knowledge** — embed expert troubleshooting paths and root cause decision procedures into the platform; distinguished from statistical AIOps by being knowledge-driven

### 6. Value Output Principles

- **Unified Presentation** — [[3 - Areas/AIOps/wiki/entities/Grafana]] cited as the emerging standard for multi-source unified dashboards (Prometheus, SLS, ElasticSearch, MongoDB, etc.)
- **Collaborative Processing** — integrations with DingTalk/WeCom for alert-to-incident workflows
- **Cloud Service Integration** — closed loop: detection → localization → remediation via cloud APIs (auto-scaling, SLB)

### 7. Full-Stack Dashboard Dimensions

A well-structured observability dashboard covers five layers stacked from user to infra:

1. **User Experience** — PV/UV, JS error rate, first paint time, API success rate, TopN page performance
2. **Application Performance** — request volume, error rate, response time (the three golden metrics), per-service breakdown
3. **Container** — pod list per deployment, CPU/memory per pod
4. **Cloud Services** — e.g., Kafka: accumulated vs consumed messages
5. **Host Node** — CPU, running pods

### 8. ARMS — Alibaba Cloud All-in-One Platform

[[3 - Areas/AIOps/wiki/entities/Alibaba Cloud ARMS]] is presented as an integrated commercial alternative covering: Prometheus monitoring service, Java APM probe, mobile/frontend/synthetic monitoring, unified alerting, and a managed Grafana instance with GlobalView for cross-Prometheus-instance queries.

---

## Relationship to Existing Wiki

- Confirms [[3 - Areas/AIOps/wiki/entities/Grafana]] as the de-facto visualization standard — consistent with Grafana's own framing in existing sources
- Introduces [[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]], [[3 - Areas/AIOps/wiki/concepts/Application Performance Monitoring]], and [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]] as foundational concepts not yet covered
- Introduces [[3 - Areas/AIOps/wiki/concepts/AIOps]] as a distinct concept (predictive + diagnostic AI on observability data)
- Introduces [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud ARMS]], [[3 - Areas/AIOps/wiki/entities/Prometheus]], [[3 - Areas/AIOps/wiki/entities/OpenTelemetry]] as new entities

---

## Pages Created from This Source

**Entities:** [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud ARMS]] · [[3 - Areas/AIOps/wiki/entities/Prometheus]] · [[3 - Areas/AIOps/wiki/entities/OpenTelemetry]]  
**Concepts:** [[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]] · [[3 - Areas/AIOps/wiki/concepts/Application Performance Monitoring]] · [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]]
