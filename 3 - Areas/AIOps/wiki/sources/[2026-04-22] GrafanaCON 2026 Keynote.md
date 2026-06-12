---
tags: [source]
created: 2026-05-13
updated: 2026-05-13
sources: 1
---

# [2026-04-22] GrafanaCON 2026 Keynote

**Source:** YouTube — GrafanaCON 2026 Keynote Livestream
**Published:** 2026-04-22
**Type:** Conference keynote

---

## Speakers

- **Raj Dutt** — CEO, Grafana Labs
- **Torkel Ödegaard** — CGO / Grafana creator
- **David Kalsmit** — VP Engineering
- **Poyzan** — Loki team
- **Ted Young** — OpenTelemetry co-founder, Grafanista
- **Mat Ryer** — Grafana Labs
- **Sven Grossman** — Grafana Labs
- **Ward Becker** — Grafana Labs

---

## Summary

The GrafanaCON 2026 keynote covered a sweeping set of announcements across the Grafana platform:

### Company Metrics

35M active [[3 - Areas/AIOps/wiki/entities/Grafana]] users, 1M+ companies, <10K customers, $400M+ ARR. 1,600 Grafanistas across 40 countries. Gartner Magic Quadrant: furthest right in completeness of vision (2025). Google partnership running Grafana for internal monitoring.

### Grafana 13

Major release: 170 data sources, 120 visualizations, Graphviz panel, dynamic dashboards GA, GitSync production-ready (GitHub/GitLab/Bitbucket/PureGit), dashboard templates, saved queries, learning paths, marketplace pilot.

### Loki New Architecture

Kafka-based write path bringing read-write isolation and deduplication. Columnar storage. New query engine achieving 20x less data scanned and 10x faster queries. Secondary indexes for needle-in-haystack queries across massive log volumes.

### OpenTelemetry Stabilization

Ted Young presented [[3 - Areas/AIOps/wiki/entities/OpenTelemetry]] stabilization roadmap: top priority is stabilizing all components for CNCF graduation. Two-stage instrumentation rollout. Vision of `apt-get install OpenTelemetry` for single-click system-wide install. Kubernetes operator improvements.

### Grafana Assistant for OSS and Enterprise

[[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] now available beyond Grafana Cloud — works with OSS and Enterprise via a Grafana Cloud account connection. New Workspace feature for full-page agentic workflows. Automations for scheduled tasks. Customization tools for controlling agent behaviour.

### GCX CLI

[[3 - Areas/AIOps/wiki/entities/GCX]] announced in public preview — a CLI that brings Grafana Cloud and Assistant capabilities to terminal and agentic coding environments (Claude Code, Cursor). Live demo showed diagnosing and fixing a production issue from within Claude Code.

### AI Observability Product

Brand new end-to-end solution for building agentic applications in Grafana Cloud: metrics dashboards (token/cost tracking), conversation debugging, system prompt analysis, online evaluations with Grafana alerting integration.

### Agentic Observability Cloud Vision

Raj Dutt framed the future as an "Agentic Observability Cloud" where agents become the primary consumers of observability tools, not just humans.

---

## Key Entities Referenced

- [[3 - Areas/AIOps/wiki/entities/Grafana]]
- [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]]
- [[3 - Areas/AIOps/wiki/entities/GCX]]
- [[3 - Areas/AIOps/wiki/entities/OpenTelemetry]]
- [[3 - Areas/AIOps/wiki/entities/Grafana MCP Server]]
- [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]]
- [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]]
