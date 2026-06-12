---
tags: [entity]
created: 2026-05-13
updated: 2026-05-13
sources: 1
---

# GCX

**Type:** CLI tool / Product
**Full name:** Grafana Cloud CLI
**Maintainer:** [[3 - Areas/AIOps/wiki/entities/Grafana]]
**Status:** Public preview (as of GrafanaCON 2026, April 2026)

---

## Overview

GCX (Grafana Cloud CLI) brings [[3 - Areas/AIOps/wiki/entities/Grafana]] Cloud and [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] capabilities to the terminal and agentic coding environments such as Claude Code, Cursor, and similar tools.

> [!tip] Key insight
> Coding agents can see code but not production reality — latency spikes, SLO breaches, CPU burn. GCX bridges the gap between local development environments and production observability.

---

## Capabilities

- Connects agentic coding environments to Grafana Cloud's full observability stack
- Enables AI coding agents to query metrics, logs, traces, and alerts from production
- Leverages [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] investigation context within the terminal
- Uses synthetic monitoring checks, metrics, and logs for diagnosing production issues

---

## Demo (GrafanaCON 2026)

A live demo showed Claude Code combined with GCX to:

1. Detect a production issue via synthetic monitoring checks
2. Pull assistant investigation context for the failing service
3. Query relevant metrics and logs from Grafana Cloud
4. Diagnose the root cause and apply a fix — all from within the coding agent

---

## Related

- [[3 - Areas/AIOps/wiki/entities/Grafana]] — parent platform
- [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] — AI assistant capabilities exposed via GCX
- [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] — protocol standard enabling tool integration
- [[3 - Areas/AIOps/wiki/entities/Grafana MCP Server]] — related MCP server using similar mechanisms

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-22] GrafanaCON 2026 Keynote]]
