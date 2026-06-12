---
tags: [entity]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# Alibaba Cloud Cloud Monitor

**Type:** Commercial AIOps Observability Platform  
**Version:** Cloud Monitor 2.0 (current, as of Apsara Conference 2025)  
**Vendor:** Alibaba Cloud  
**Product page:** https://www.alibabacloud.com/product/cloud-monitor

---

## Overview

Cloud Monitor 2.0 is Alibaba Cloud's unified, large-model-native observability platform — the umbrella product that consolidates all of Alibaba Cloud's observability offerings. It is positioned as a complete, end-to-end answer to enterprise AIOps, built on three restructured layers: a unified data layer ([[3 - Areas/AIOps/wiki/entities/Alibaba Cloud SLS]]), a cognitive knowledge layer ([[3 - Areas/AIOps/wiki/entities/UModel]]), and an agentic intelligence layer (the AIOps Agent).

The 2.0 redesign was not a patch on existing systems but a fundamental restructure driven by the "All in AI" wave, with the explicit design philosophy: **"enable the large model to see what we see and do what we do."**

---

## Three-Layer Architecture

```
┌─────────────────────────────────────────────────────┐
│  Intelligence Layer  — AIOps Agent                  │
│  (natural language, plan/execute/reflect loop)       │
├─────────────────────────────────────────────────────┤
│  Knowledge Layer  — UModel + Algorithm Engine        │
│  (entity topology, domain knowledge, operators)      │
├─────────────────────────────────────────────────────┤
│  Data Layer  — SLS                                   │
│  (unified ingest, storage, query for all signals)    │
└─────────────────────────────────────────────────────┘
```

| Layer | Component | Function |
|-------|-----------|---------|
| Data | [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud SLS]] | Unified ingest, exabyte storage, open protocols |
| Knowledge | [[3 - Areas/AIOps/wiki/entities/UModel]] | Entity definitions, topology, golden metrics, runbooks, actions |
| Knowledge | Algorithm Engine | Observability operators for anomaly detection, forecasting, clustering |
| Intelligence | AIOps Agent | Natural language interface; plan/execute/reflect agentic loop |

---

## Integrated Systems (Migration into 2.0)

Cloud Monitor 2.0 is the convergence destination for Alibaba Cloud's previously separate observability products:

| System | Status |
|--------|--------|
| [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud ARMS]] (APM) | Integrated — storage migrated |
| Managed Service for [[3 - Areas/AIOps/wiki/entities/Prometheus]] | Integrated — storage migrated |
| Hybrid Cloud Monitoring | Integrated — storage migrated |
| CloudLens for SLS | Scheduled H2 migration |
| Cloud Monitor Basic | Scheduled H2 migration |

> [!note] Most Alibaba Cloud observability customers can upgrade to the Cloud Monitor 2.0 ecosystem at no additional cost, gaining UModel topology and AIOps Agent capabilities.

---

## AIOps Agent

The AIOps Agent is the intelligence layer of Cloud Monitor 2.0. Key properties:

- **Agentic architecture**: fully autonomous plan → invoke tools → execute → reflect loop; no rigid rules or fixed workflows
- **Natural language interface**: summoned from any console screen; supports conversational context ("add this cluster to context")
- **Four capability tiers** (building on each other):
  1. *Basic query* — natural language → SQL/PromQL data retrieval
  2. *Topology awareness* — [[3 - Areas/AIOps/wiki/entities/UModel]]-grounded entity relationship understanding
  3. *Deep insights* — operator-powered anomaly detection, forecasting, pattern classification
  4. *Decision support* — complex RCA, change impact analysis, actionable recommendations
- **Four key scenarios**:
  1. Intelligent analysis (traces, flame graphs, cross-service diagnosis)
  2. Intelligent alerting (alert configuration, noise consolidation)
  3. Root cause insights (RCA, impact assessment, incident summaries)
  4. Intelligent inspection — proactive scheduled checks (shifts from reactive to preventive)

---

## Observability MCP Toolkit

Cloud Monitor 2.0 exposes its AIOps capabilities as an open [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol|MCP]] toolkit with three layers, designed to prevent agent tool overload:

| Layer | Target | What it provides |
|-------|--------|-----------------|
| **Base query** | Data experts | Direct API access; NL → SQL/PromQL |
| **UModel tool** | LLM agents / AI workflows | Topology-structured queries, pre-processing |
| **Agent** | All users | Full NL interface for analysis and diagnosis |

This allows enterprises to integrate Cloud Monitor 2.0 intelligence into their existing platforms incrementally — rather than rebuilding everything on the Alibaba Cloud platform.

---

## Design Philosophy

> "The design philosophy of Cloud Monitor 2.0 is to enable the large model to see what we see and do what we do."

Every UI interaction (click, drill-down, pivot) in the console is designed to mirror the reasoning process the AIOps Agent uses for [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]]. Human-assisted and AI-automated operations share the same interface layer — analogous to the "co-driving" phase in autonomous vehicle development.

---

## Relationship to Other Entities

- **[[3 - Areas/AIOps/wiki/entities/Alibaba Cloud SLS]]** — the data backbone; Cloud Monitor 2.0 is built on top of it
- **[[3 - Areas/AIOps/wiki/entities/UModel]]** — the entity model that provides topology and domain knowledge
- **[[3 - Areas/AIOps/wiki/entities/Alibaba Cloud ARMS]]** — a component system now migrating its storage into Cloud Monitor 2.0

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Apsara Conference Insights Rebuild Observability]]
