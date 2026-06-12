---
tags: [entity]
created: 2026-04-13
updated: 2026-05-13
sources: 5
---

# Grafana

**Type:** Organisation / Observability Platform
**Website:** https://grafana.com

---

## Overview

Grafana Labs is the company behind the open-source Grafana observability platform. Grafana provides dashboards, metrics, logs, and traces through an open ecosystem of data source plugins, and hosts Grafana Cloud as a managed service.

Grafana Labs also maintains related open-source projects including [[3 - Areas/AIOps/wiki/entities/Grafana MCP Server|Grafana MCP]], Loki (log aggregation), Pyroscope (continuous profiling), Mimir (metrics), and Tempo (distributed tracing).

---

## AI Efforts

Grafana has been integrating AI into its observability platform across several tiers:

- **Single-call LLMs** — e.g., Pyroscope profile explainer: feeds profiling data to an LLM and returns a human-readable explanation with code-aware recommendations.
- **[[3 - Areas/AIOps/wiki/entities/Grafana MCP Server]]** — open-source [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] server that exposes Grafana's API surface (dashboards, data sources, incidents, alerts) to any MCP-compatible LLM client.
- **[[3 - Areas/AIOps/wiki/entities/Grafana Assistant]]** — agentic AI assistant embedded in Grafana, using a [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] to handle complex, multi-step observability tasks via natural language.
- **[[3 - Areas/AIOps/wiki/entities/o11y-bench]]** — open-source benchmark for evaluating AI observability agent performance

---

## Key People

- [[3 - Areas/AIOps/wiki/entities/Yasir Ekinci]] — Grafana engineer; presented on AI in observability workflows (2025-06-07)

---

## Role as Visualization Standard

Independent of Grafana Labs' own AI efforts, Grafana has become the **de-facto standard for unified observability dashboards** across the industry. The [[3 - Areas/AIOps/wiki/sources/[2026-04-13] All in One How to Build an End-to-End Observable System|Alibaba Cloud observability survey]] cites Grafana as the emerging standard for displaying heterogeneous data sources (Prometheus, Elasticsearch, SLS, MongoDB) in a single unified interface — a characterization consistent with Grafana's own positioning.

[[3 - Areas/AIOps/wiki/entities/Alibaba Cloud ARMS]] ships a managed Grafana instance with a GlobalView feature for cross-Prometheus-instance unified queries.

---

## GrafanaCON 2026 Key Metrics

- 35M active Grafana users, 1M+ companies, <10K customers, $400M+ ARR
- 1,600 Grafanistas in 40 countries
- Gartner Magic Quadrant: furthest right in completeness of vision (2025)
- Google partnership: running Grafana visualization for internal monitoring

---

## Grafana 13

Major release announced at GrafanaCON 2026:

- 170 data sources, 120 visualizations
- Graphviz panel
- Dynamic dashboards GA
- GitSync production-ready (GitHub, GitLab, Bitbucket, PureGit)
- Dashboard templates
- Saved queries
- Learning paths
- Marketplace pilot

---

## Loki New Architecture

Announced at GrafanaCON 2026:

- Kafka-based write path enabling read-write isolation and deduplication
- Columnar storage
- New query engine: 20x less data scanned, 10x faster
- Secondary indexes for needle-in-haystack queries across massive log volumes

---

## Agentic Observability Cloud

Raj Dutt (CEO) presented the vision of an "Agentic Observability Cloud" where **agents become the primary consumers** of observability tools, not just humans. This frames the strategic direction for [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]], [[3 - Areas/AIOps/wiki/entities/GCX]], and the [[3 - Areas/AIOps/wiki/entities/Grafana MCP Server]].

---

## AI Observability Product

New end-to-end solution in Grafana Cloud for building agentic applications:

- Metrics dashboard: token/cost tracking, model usage, drill into conversations
- Conversation debugging: sub-agent, tool call, token-level detail
- System prompt and tool definition analysis based on real conversations
- Online evaluations with [[3 - Areas/AIOps/wiki/entities/Grafana]] alerting integration for continuous feedback loops

See also [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]].

---

## AI RCA Strategy

Grafana takes a restrained, engineering-first approach to AI-assisted [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]]: AI works **inside the workbench**, not as a standalone chatbox.

- **[[3 - Areas/AIOps/wiki/entities/Sift]]** — productized diagnostic checks for K8s (OOMKill, CrashLoopBackOff, CPU throttling); deterministic rules, not LLM guesses
- **[[3 - Areas/AIOps/wiki/entities/Asserts.ai]] acquisition** — powers the [[3 - Areas/AIOps/wiki/concepts/Knowledge Graph]] and RCA Workbench with entity discovery, relationship mapping, insight generation, and timeline correlation
- **Investigation-based RCA** — output is an evidence package (timeline, candidates, evidence, counter-evidence), not a paragraph of suspected root cause

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-06-07] Building AI Into Observability Workflows]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-09] Start with Grafana AI Assistant and ask your observability stack anything]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-13] All in One How to Build an End-to-End Observable System]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-22] GrafanaCON 2026 Keynote]]
- [[3 - Areas/AIOps/wiki/sources/[2026-05-13] Grafana 给 AI RCA 提了个醒]]
