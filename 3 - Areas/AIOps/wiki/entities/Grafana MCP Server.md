---
tags: [entity]
created: 2026-04-13
updated: 2026-05-13
sources: 2
---

# Grafana MCP Server

**Type:** Open-source tool / [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] server
**Maintainer:** [[3 - Areas/AIOps/wiki/entities/Grafana]]
**Repository:** https://github.com/grafana/mcp-grafana (open source)

---

## Overview

The Grafana MCP Server is an open-source [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] server that exposes the core Grafana API surface to any MCP-compatible LLM client (e.g., Cursor, Claude Code, ChatGPT). It acts as the canonical bridge between LLMs and a live Grafana instance, eliminating the need for custom per-client integrations.

> [!tip] Key insight
> Grafana MCP allows product owners to own the LLM integration surface for their platform — any MCP client gains access without additional bespoke work.

---

## Capabilities

- Search and update dashboards
- Query data sources (Prometheus, Loki, etc.)
- Manage incidents
- Find firing alerts
- (Coverage being expanded continuously)

### Grafana Cloud MCP Server Scope (GrafanaCON 2026)

External AI tools can connect to query: dashboards, Prometheus, Loki, Tempo, Pyroscope, alerts, incidents, OnCall, and Sift investigations.

---

## Setup

1. Install the binary or pull the prebuilt Docker image.
2. Configure your MCP client (Cursor, Claude Code, etc.) to point at the server.
3. Provide your Grafana instance URL and an access token.
4. The MCP client auto-discovers all available tools.

Multiple MCP servers can be stacked — e.g., Grafana MCP + GitHub MCP together in one agent session.

---

## Demo (2025-06-07)

In the talk by [[3 - Areas/AIOps/wiki/entities/Yasir Ekinci]], Cursor was connected to the Grafana MCP Server and used to:
1. Auto-generate a Grafana dashboard from application source code metrics (no manual PromQL).
2. Add latency metric instrumentation to the source code.
3. Update the dashboard with the new latency panel.

All three steps were completed via natural-language prompts with zero manual dashboard editing.

---

## Related

- [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] — the standard this server implements
- [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] — the embedded agentic system that also uses this tooling internally
- [[3 - Areas/AIOps/wiki/concepts/LLM Tool Calling]] — the underlying mechanism MCP is built on
- [[3 - Areas/AIOps/wiki/entities/GCX]] — CLI tool that uses similar mechanisms to bring observability to coding agents

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-06-07] Building AI Into Observability Workflows]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-22] GrafanaCON 2026 Keynote]]
