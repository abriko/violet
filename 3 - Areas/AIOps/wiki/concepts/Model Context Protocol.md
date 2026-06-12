---
tags: [concept]
created: 2026-04-13
updated: 2026-05-13
sources: 5
---

# Model Context Protocol (MCP)

**Alias:** MCP
**Origin:** Anthropic (open source)
**Analogy:** "USB-C for AI tools" — a universal connector between LLMs and applications

---

## What It Is

Model Context Protocol is an open standard that defines how LLM clients and external tools/services communicate. Before MCP, every LLM-to-tool integration was vendor-specific and had to be built from scratch for every combination of client and service. MCP standardises this interface so that:

- **Product owners** publish one MCP server describing their tool surface.
- **App developers** consume any MCP server without building custom integrations.
- **End users** bring MCP servers into their preferred client (Cursor, Claude Code, ChatGPT, etc.) to extend its capabilities.

---

## How It Works

MCP is built on top of [[3 - Areas/AIOps/wiki/concepts/LLM Tool Calling]]. An MCP server exposes a structured manifest of available tools (name, description, parameters). An MCP-compatible LLM client discovers this manifest at connection time and makes those tools available to the LLM.

```
User prompt
   ↓
LLM client (Cursor, Claude Code, …)
   ↓  discovers tools via MCP
MCP Server (e.g., Grafana MCP, GitHub MCP, Slack MCP)
   ↓  proxies calls
Underlying API / data source
```

Multiple MCP servers can be stacked in a single session.

---

## Adoption

- Proposed by Anthropic as an open standard.
- [[3 - Areas/AIOps/wiki/entities/Grafana]] was an early adopter, open-sourcing the [[3 - Areas/AIOps/wiki/entities/Grafana MCP Server]] before the standard was widely ratified.
- OpenAI adopted MCP approximately one month after Grafana open-sourced their server, solidifying it as the de-facto standard.
- [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]] 2.0 ships an **observability MCP toolkit** — demonstrating that enterprise AIOps platforms are adopting MCP as their external integration layer.
- [[3 - Areas/AIOps/wiki/entities/Michelin]] China IT adopted a **global MCP ecosystem** (ServiceNow, GitHub, IPAM, asset list) as the integration backbone for their [[3 - Areas/AIOps/wiki/entities/Dify]]-based AIOps initiative — demonstrating MCP's role in **enterprise governance**: the architectural approval was for the MCP-based *pattern*, not any specific tool, enabling the runtime to be swapped without re-approval.

> [!tip] The Michelin case introduces a governance insight: framing AIOps adoption as "an MCP-aligned pattern with replaceable runtime" allows security and architecture reviews to succeed even before full scope is defined — because the stable contract is the MCP tool interface, not the application layer.

---

## Observability MCP Toolkits in Practice

Two distinct approaches to exposing observability capabilities via MCP have emerged in the wiki:

| Implementation | Depth | Design approach |
|---------------|-------|----------------|
| [[3 - Areas/AIOps/wiki/entities/Grafana MCP Server]] | Tool-level | Exposes Grafana's API surface (datasources, dashboards, alerts, PromQL) to any MCP client |
| [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]] Observability MCP Toolkit | Layered | Three-tier design: base query → UModel tool layer → Agent layer |

The Alibaba Cloud approach introduces a notable design principle: **layered MCP to manage agent tool overload**. A flat list of many MCP tools causes LLM agents to make selection errors. A three-layer hierarchy lets users/agents consume only the abstraction level they need:

```
Agent layer       ─ NL interface for analysis and diagnosis (all users)
UModel tool layer ─ topology-structured queries + pre-processing (LLM agents)
Base query layer  ─ direct API access; NL → SQL/PromQL (data experts)
```

The UModel tool layer also implements [[3 - Areas/AIOps/wiki/concepts/Computing Pushdown]] — topology-aware pre-processing that reduces token consumption by >90% before results reach the LLM.

---

## MCP Governance: The Allowlist Pattern

As MCP adoption scales, uncontrolled MCP server usage introduces security risk — a malicious or misconfigured MCP server could expose sensitive repo/infrastructure context to unintended parties.

[[3 - Areas/AIOps/wiki/entities/GitHub Advanced Security]] (as of 2026) addresses this with an **MCP Server Allowlist** at the org/enterprise level:

- Administrators register approved MCP servers in a central registry
- Only allowlisted servers are available to [[3 - Areas/AIOps/wiki/entities/GitHub Copilot]] agents
- Controlled at org level and repo level granularity
- Prevents agents from calling arbitrary third-party MCP servers

This is a concrete instance of [[3 - Areas/AIOps/wiki/concepts/Policy as Code]] applied to the MCP integration layer — the policy governs *which tools agents may use*, not just *what actions they may take*.

> [!tip] The Michelin "pattern-not-product" governance insight (approve the MCP pattern, not a specific tool) and the GitHub allowlist governance (approve specific MCP servers at org level) are complementary: Michelin's approach works at the architecture/procurement layer; GitHub's works at the runtime enforcement layer.

---

## MCP as the New Observability Entry Point

The Grafana Cloud MCP server demonstrates a broader shift: the observability platform becomes a **"production context provider"** for external AI agents. Rather than requiring engineers to context-switch into the observability UI, external tools query observability data where the engineer already works.

**Grafana Cloud MCP server capabilities:**
- Query dashboards, Prometheus, Loki, Tempo, Pyroscope
- Access alerts, incidents, OnCall
- Trigger [[3 - Areas/AIOps/wiki/entities/Sift]] investigations

**Compatible clients:** Cursor, Claude Code, Claude Desktop, Windsurf, Goose, VS Code

> [!tip] Future entry points
> The MCP pattern extends beyond IDEs: CLI, ChatOps, enterprise messaging (WeCom, Feishu, DingTalk), ticketing systems, and CI/CD pipelines are all potential observability entry points via MCP.

---

## Relationships

- [[3 - Areas/AIOps/wiki/concepts/LLM Tool Calling]] — the underlying mechanism MCP standardises
- [[3 - Areas/AIOps/wiki/entities/Grafana MCP Server]] — a production MCP server implementation
- [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] — agents that use MCP servers as their tool surface
- [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]] — ships a 3-layer observability MCP toolkit
- [[3 - Areas/AIOps/wiki/concepts/Computing Pushdown]] — technique implemented in the UModel MCP tool layer
- [[3 - Areas/AIOps/wiki/entities/UModel]] — the entity model exposed through the UModel tool layer of the MCP toolkit
- [[3 - Areas/AIOps/wiki/entities/Michelin]] / [[3 - Areas/AIOps/wiki/entities/Dify]] — enterprise governance pattern: MCP as the stable contract enabling replaceable runtime
- [[3 - Areas/AIOps/wiki/entities/GitHub Advanced Security]] — MCP Server Allowlist enforcement
- [[3 - Areas/AIOps/wiki/concepts/Policy as Code]] — allowlist as policy enforcement for MCP tool access
- [[3 - Areas/AIOps/wiki/entities/GitHub Copilot]] — primary MCP consumer in the Microsoft/GitHub ecosystem

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-06-07] Building AI Into Observability Workflows]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Apsara Conference Insights Rebuild Observability]]
- [[3 - Areas/AIOps/wiki/sources/[2025-12-17] Rolling Out AIOps Without a Grand Vision]]
- [[3 - Areas/AIOps/wiki/sources/[2026-01-28] The future of software creation with Agentic DevOps]]
- [[3 - Areas/AIOps/wiki/sources/[2026-05-13] Grafana 给 AI RCA 提了个醒]]
