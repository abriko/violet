---
tags: [concept]
created: 2026-04-14
updated: 2026-05-13
sources: 1
---

# Knowledge Graph

**Context:** Core component of [[3 - Areas/AIOps/wiki/entities/Grafana]]'s RCA infrastructure
**Powered by:** [[3 - Areas/AIOps/wiki/entities/Asserts.ai]] (acquired by Grafana Labs)

---

## Overview

In the [[3 - Areas/AIOps/wiki/entities/Grafana]] context, a Knowledge Graph maintains structured relationships between observability entities — services, pods, nodes, databases, dashboards, data sources, alerts, and teams. It enables the [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] to traverse entity relationships without querying each data source individually.

The Knowledge Graph is powered by [[3 - Areas/AIOps/wiki/entities/Asserts.ai]]'s technology, which automatically discovers entities and builds relationship maps across the infrastructure.

---

## RCA Workbench Integration

The Asserts.ai integration puts entities and their insights on a **shared timeline** for incident investigation. The RCA Workbench enables investigators to see fault propagation across entity boundaries and answer the key question: "Which insight appeared first?"

### Insight Types

The Knowledge Graph generates and tracks the following insight types:

- **Resource saturation** — CPU, memory, disk, network capacity approaching limits
- **Error rate anomaly** — abnormal increase in error rates for a service or endpoint
- **Latency anomaly** — unusual latency patterns in service-to-service or service-to-database calls
- **System failure** — pod crashes, node failures, connection drops
- **Deployment/config change** — recent deployments, configuration modifications, image version changes

These insights are placed on the entity timeline, enabling causal chain reconstruction during [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]].

---

## Relationship to Infrastructure Memory

[[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]] and the Knowledge Graph serve complementary roles:

| Feature | Purpose |
|---------|---------|
| [[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]] | Proactively crawled facts about infrastructure topology (services, regions, environments) |
| Knowledge Graph | Structured relationships within a Grafana instance (dashboards, data sources, teams, alerts) + Asserts.ai entity discovery and insight generation |

Both reduce cold-start latency and improve response quality by pre-loading context the agent would otherwise need to discover reactively.

---

## Related

- [[3 - Areas/AIOps/wiki/entities/Asserts.ai]] — powers entity discovery, relationship mapping, and insight generation
- [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] — consumes Knowledge Graph for cross-signal context
- [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]] — RCA Workbench uses Knowledge Graph for investigation
- [[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]] — complementary proactive topology crawl

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-05-13] Grafana 给 AI RCA 提了个醒]]
