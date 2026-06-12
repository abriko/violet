---
tags: [entity]
created: 2026-04-13
updated: 2026-04-14

sources: 2
---

# Alibaba Cloud ARMS

**Type:** Commercial Observability Platform  
**Full Name:** Application Real-time Monitoring Service  
**Vendor:** Alibaba Cloud  
**Website:** https://www.alibabacloud.com/product/arms

---

## Overview

ARMS (Application Real-time Monitoring Service) is Alibaba Cloud's all-in-one observability platform. It integrates multiple observability capabilities — infrastructure metrics, application tracing, frontend/mobile monitoring, unified alerting, and managed Grafana dashboards — into a single commercial product, positioned as an alternative to assembling the open-source Prometheus + Grafana + ELK stack independently.

---

## Product Components

| Layer | ARMS Component | Open-Source Equivalent |
|-------|---------------|----------------------|
| Infrastructure | Prometheus Monitoring Service | Self-managed [[3 - Areas/AIOps/wiki/entities/Prometheus]] |
| Application | Java APM probe (tracer) | SkyWalking / Jaeger + [[3 - Areas/AIOps/wiki/entities/OpenTelemetry]] |
| User Experience | Mobile, frontend, synthetic monitoring | — |
| Logs | SLS (Log Service) | ELK / Loki |
| Visualization | Managed [[3 - Areas/AIOps/wiki/entities/Grafana]] instance | Self-managed Grafana |
| Alerting | Unified Alerts + Insight | Alertmanager / custom |

---

## Key Features

- **GlobalView** — aggregates multiple Prometheus instances under one query namespace, enabling cross-team unified dashboards without federation complexity
- **Preset Dashboards** — auto-generated dashboards on data connection (application monitoring, container dashboards)
- **Fast Data Access** — one-click integration with ARMS Prometheus, SLS, and CMS CloudMonitor data sources into managed Grafana
- **Cloud Service Integration** — connects observability alerts to cloud remediation actions (auto-scaling, SLB changes)

---

## Positioning

ARMS represents the vendor-managed evolution of the standard Prometheus + Grafana observability stack. Its primary differentiator over open-source tooling is **data quality controls** (sampling strategy, noise reduction, deduplication) and **domain knowledge** embedded in troubleshooting workflows.

> [!note] The Alibaba Cloud blog frames the gap between open-source and commercial tools primarily as a **data quality** gap, not a feature gap — e.g., dynamic trace sampling, always-sample-on-errors policies.

---

## AIOps Connection

ARMS is the observability data backend used in the [[3 - Areas/AIOps/wiki/sources/[2026-04-13] Tianchi 2025 AIOps Fault Localization Challenge|Tianchi 2025 AIOps contest]], where contestants query SLS (via RAM role credentials) to perform [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]] on observability signals.

---

## Relationship to Cloud Monitor 2.0

> [!note] ARMS is migrating into [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]] 2.0
> Cloud Monitor 2.0 is Alibaba Cloud's new unified AIOps observability platform. ARMS (along with Managed Service for Prometheus and Hybrid Cloud Monitoring) has completed storage migration into Cloud Monitor 2.0. Customers can upgrade at no additional cost and gain access to [[3 - Areas/AIOps/wiki/entities/UModel]] topology and the AIOps Agent.

ARMS continues to exist as a product surface/brand, but its data storage and backend now runs on [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud SLS]] within the Cloud Monitor 2.0 ecosystem. The APM capabilities (Java probe tracing, frontend/mobile monitoring) remain ARMS-specific, while the unified observability features (alerts, dashboards, data query) converge under Cloud Monitor 2.0.

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-13] All in One How to Build an End-to-End Observable System]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-13] Tianchi 2025 AIOps Fault Localization Challenge]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Apsara Conference Insights Rebuild Observability]]
