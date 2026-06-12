---
tags: [entity]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# Dify

**Type:** Open-source low-code AI application platform  
**Website:** https://dify.ai  
**Relevance:** Used by [[3 - Areas/AIOps/wiki/entities/Michelin]] China IT as the AIOps app builder and demo engine, connected to a global [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol|MCP]] ecosystem

---

## What It Is

Dify is a low-code platform for building AI-powered bots, chatbots, and workflows. It supports:
- Wiring LLMs with tools and APIs, including [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol|MCP]] tools
- Building conditional workflows (branches, loops, conditions) without full application development skills
- A marketplace of plugins for generic capabilities

It is designed to be accessible to **non-professional application developers** — allowing operations engineers and architects to build and iterate on AI workflows rapidly.

---

## Use in AIOps at Michelin

[[3 - Areas/AIOps/wiki/entities/Matthew Liu]] at [[3 - Areas/AIOps/wiki/entities/Michelin]] used Dify as the primary **demo engine** and **platform runtime** for their AIOps initiative:

- **DBA support chatbot** — database health checks, slow query log analysis, error RCA suggestions
- **Kubernetes admin chatbot** — K8s operations assistance
- **ServiceNow integration** — using the global ServiceNow MCP connector; wired into Dify as an agent node or tools node to query incidents, enabling working AIOps prototypes in **a few hours**

> [!tip] Dify's key advantage in enterprise AIOps adoption: it lets IT architects build **convincing, working demos** without needing dedicated app developers — dramatically reducing the time from idea to stakeholder buy-in.

### Role in Governance

Dify is positioned as the **replaceable runtime layer** in Michelin's modular architecture. The governance approval was for the *MCP-based AIOps pattern*, not Dify specifically — ensuring that switching to another builder/runtime later does not require new architectural or security approvals.

---

## Position in the Stack

```
Dify (app builder + runtime)   ← replaceable
     ↓
LLM "brain" (reasoning, summarisation)
     ↓
MCP tools / extensions
  ├── Global: ServiceNow, GitHub, IPAM, asset list, …
  └── Local: AliCloud resources, local observability platform
```

The **stable layer** is the MCP interaction pattern and the know-how encoded in prompts, workflows, and tool descriptions — not Dify itself.

---

## Relationship to Other Entities and Concepts

- [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] — Dify consumes MCP servers as tools; key integration standard enabling governance-friendly adoption
- [[3 - Areas/AIOps/wiki/entities/Michelin]] — organisation using Dify for AIOps app development
- [[3 - Areas/AIOps/wiki/entities/Matthew Liu]] — Michelin architect who chose and championed Dify as the platform

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-12-17] Rolling Out AIOps Without a Grand Vision]]
