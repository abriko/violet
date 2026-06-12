---
tags: [entity]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# Splunk

**Type:** Log aggregation and search platform (now part of Cisco)  
**Category:** Observability tooling — logs pillar (see [[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]])

---

## Role in AIOps

Splunk is a widely deployed enterprise log aggregation and search platform. In [[3 - Areas/AIOps/wiki/concepts/AIOps]] pipelines, it serves as the primary logs data source — agents query Splunk to retrieve log evidence during [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]].

At [[3 - Areas/AIOps/wiki/entities/Adobe]], Splunk is one of two primary data sources (alongside [[3 - Areas/AIOps/wiki/entities/Prometheus]] for metrics) that on-call agents query when diagnosing incidents.

> [!note] Splunk's proprietary query language (SPL) is analogous to [[3 - Areas/AIOps/wiki/entities/Prometheus]]'s PromQL — both require agent tooling to abstract the query interface. Adobe's lesson: giving agents direct access to write arbitrary Splunk queries leads to unpredictable, expensive context pollution; curated report tools are more reliable.

---

## Relationship to Other Concepts

- [[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]] — covers the logs pillar
- [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]] — log evidence is essential for fault diagnosis
- [[3 - Areas/AIOps/wiki/concepts/AIOps]] — Splunk is a common backend in enterprise AIOps stacks
- [[3 - Areas/AIOps/wiki/concepts/Computing Pushdown]] — pre-processing logs before LLM consumption (clustering, filtering) reduces token cost and improves reliability
- [[3 - Areas/AIOps/wiki/entities/Adobe]] — enterprise user; Splunk alongside Prometheus in on-call agent stack

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Is AIOps the Future of Operations?]]
