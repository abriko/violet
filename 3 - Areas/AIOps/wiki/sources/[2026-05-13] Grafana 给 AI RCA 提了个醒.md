---
tags: [source]
created: 2026-05-13
updated: 2026-05-13
sources: 1
---

# Grafana 给 AI RCA 提了个醒：不要让大模型猜根因，要让它进工作台

**Author:** 技术调研 (WeChat public account)
**Published:** 2026-05-12
**Type:** WeChat article / industry analysis

---

## Summary

This article analyzes Grafana Labs' AI RCA strategy in depth, arguing that the industry should shift from "answer-based" RCA (letting an LLM guess the root cause) to "investigation-based" RCA (letting the LLM work inside a structured workbench with evidence, timelines, and diagnostic checks).

---

## Key Takeaways

### 1. Investigation-Based RCA, Not Answer-Based

Grafana positions AI RCA as an **investigation product**, not an answer product. The output should be an evidence package — timeline, impact scope, candidate root causes, supporting/counter-evidence, recent changes, similar historical incidents, and next actions — not a single paragraph of suspected root cause.

### 2. Sift: Curated Diagnostic Checks

[[3 - Areas/AIOps/wiki/entities/Sift]] is an automated diagnostic checklist for K8s infrastructure. It runs explainable, curated checks (OOMKill, CrashLoopBackOff, CPU throttling, etc.) rather than delegating high-frequency failure pattern recognition to LLMs. Key insight: productize what you already know; reserve LLMs for organizing, correlating, and explaining results.

### 3. Knowledge Graph + RCA Workbench (from Asserts.ai)

[[3 - Areas/AIOps/wiki/entities/Asserts.ai]] acquisition powers Grafana's [[3 - Areas/AIOps/wiki/concepts/Knowledge Graph]] and RCA Workbench. Entity discovery, relationship mapping, insight generation, and timeline correlation enable an entity-centric investigation view where "which insight appeared first?" is the key question.

### 4. MCP as New Observability Entry Point

Grafana Cloud's [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] server enables external AI tools (Cursor, Claude Code, Claude Desktop, Windsurf, Goose, VS Code) to query dashboards, Prometheus, Loki, Tempo, Pyroscope, alerts, incidents, OnCall, and Sift investigations. The observability platform becomes a "production context provider."

### 5. o11y-bench

[[3 - Areas/AIOps/wiki/entities/o11y-bench]] is an open-source benchmark for evaluating AI observability agent performance — testing actual tool use and task completion, not just answer quality.

### 6. Privacy and RBAC Constraints

[[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] enforces RBAC: the assistant cannot access data the user cannot see.

### 7. Seven Strategic Lessons for Domestic Vendors

The article distills seven lessons from Grafana's approach for Chinese AIOps vendors, emphasizing engineering-first restraint, productized diagnostics, and structured investigation over chatbot-style RCA.

---

## Entities Referenced

- [[3 - Areas/AIOps/wiki/entities/Grafana]]
- [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]]
- [[3 - Areas/AIOps/wiki/entities/Sift]]
- [[3 - Areas/AIOps/wiki/entities/Asserts.ai]]
- [[3 - Areas/AIOps/wiki/entities/o11y-bench]]

## Concepts Referenced

- [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]]
- [[3 - Areas/AIOps/wiki/concepts/Knowledge Graph]]
- [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]]
- [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]]
