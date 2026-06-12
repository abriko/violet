---
tags: [entity]
created: 2026-04-13
updated: 2026-05-13
sources: 4
---

# Grafana Assistant

**Type:** Product feature / AI assistant
**Maintainer:** [[3 - Areas/AIOps/wiki/entities/Grafana]]
**Status:** Generally available / public docs (as of 2026-04-09); private preview as of 2025-06-07
**Docs:** https://grafana.com/docs/grafana-cloud/machine-learning/assistant/get-started/
**Sign-up:** https://grafana.com/blog/2025/05/07/llm-grafana-assistant/

---

## Overview

Grafana Assistant is an agentic AI assistant embedded directly in the Grafana UI. Rather than being an external MCP client, it is a native [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] that can navigate Grafana, run queries, edit dashboards, manage alerts, and perform complex multi-step observability tasks using natural language.

It is built on top of the same tool surface as the [[3 - Areas/AIOps/wiki/entities/Grafana MCP Server]] and uses a [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] (coordinator + specialist sub-agents) to handle the breadth of possible user questions.

A key differentiator is [[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]]: a weekly scheduled crawl that pre-builds a persistent knowledge base of the user's infrastructure topology, so the assistant already knows service names, regions, and relationships before any query is made.

---

## Capabilities (as of 2026-04-09)

| Capability | Description |
|---|---|
| Service diagram generation | Maps architecture and data flow between services from a natural-language prompt |
| PromQL generation | Converts natural-language questions to PromQL; executes multiple queries automatically |
| [[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]] | Weekly crawl pre-loads service topology into a database for immediate retrieval |
| [[3 - Areas/AIOps/wiki/concepts/Knowledge Graph]] integration | Optional; enriches cross-signal context when Grafana Knowledge Graph is configured |
| Multi-step query execution | Runs N backend queries per user question (e.g., 7 for a CPU ranking query); hides detail by default, exposes on demand |

---

## Architecture

See [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] for the general pattern. Grafana Assistant uses:

- **Coordinator agent** — small system prompt; receives user input, routes to specialist sub-agents.
- **Specialist sub-agents** — e.g., support agent (docs search), dashboard agent (create/edit), alerts agent.
- Each sub-agent maintains its **own isolated conversation thread**, keeping the main context clean.

### Evolution

| Stage | Approach | Problem |
|---|---|---|
| v1 | Single monolithic agent | 10k+ token system prompt (~40 pages); hard to iterate; all tools in one context |
| v2 | [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] with delegation | Modular, extensible; slight routing overhead |

---

## Evaluation

Grafana uses reproducible [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation|evals]] at three levels:
- Individual tool correctness (e.g., ensuring the right data source `type` filter is passed)
- Sub-agent behaviour
- Full end-to-end flows with a mocked Grafana environment

---

## Roadmap (as of 2025-06-07)

- ~~Grafana knowledge graphs for smarter in-instance content discovery~~ — **shipped** (visible in 2026-04-09 demo)
- Specialized observability agents (alerts, SLOs)
- Community-accessible evals for query generation

---

## OSS and Enterprise Availability

As of GrafanaCON 2026, Grafana Assistant is now available for **Grafana OSS and Enterprise** — not just Grafana Cloud. It requires a connection to a Grafana Cloud account for LLM communication. A free tier is available with 3 users, no credit card required.

---

## Workspace

A new full-page view for agentic workflows. Enables complex investigations in a dedicated space. Can convert an investigation directly into a dashboard in one click.

---

## Automations

Scheduled regular work via natural language prompts — e.g., weekly incident theme analysis. Supports multiple languages for prompt input.

---

## Customization

Tools to control how agents behave, answer questions, and take actions. Allows mixing with trusted [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] servers for extended capabilities.

---

## Investigations

The Investigations feature enables multi-agent swarming investigation for incident diagnosis:

- **Input:** User provides symptoms, impact scope, time range, and related services
- **Process:** Multiple sub-agents concurrently investigate different signal types (logs, metrics, traces, Sift checks)
- **Output:** Structured, editable Markdown report with timeline, activity log, candidate root causes, and supporting evidence

The output preserves **process transparency** — engineers can see what the agent queried, what evidence it found, and edit the report before sharing.

### RBAC Constraint

> [!warning] Privacy boundary
> Grafana Assistant cannot access data the user cannot see. All queries respect the user's existing RBAC permissions — the assistant operates within the same access boundary as the human engineer.

---

## Related

- [[3 - Areas/AIOps/wiki/entities/Grafana MCP Server]] — external MCP server; shares tooling with Assistant
- [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] — architectural pattern used
- [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]] — testing methodology
- [[3 - Areas/AIOps/wiki/concepts/Token Noise Reduction]] — optimization technique applied
- [[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]] — proactive knowledge base feature
- [[3 - Areas/AIOps/wiki/entities/GCX]] — CLI tool exposing Assistant capabilities to terminal/coding agents
- [[3 - Areas/AIOps/wiki/entities/Sift]] — automated diagnostic checks consumed during Investigations

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-06-07] Building AI Into Observability Workflows]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-09] Start with Grafana AI Assistant and ask your observability stack anything]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-22] GrafanaCON 2026 Keynote]]
- [[3 - Areas/AIOps/wiki/sources/[2026-05-13] Grafana 给 AI RCA 提了个醒]]
