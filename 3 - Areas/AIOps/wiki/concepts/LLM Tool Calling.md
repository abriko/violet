---
tags: [concept]
created: 2026-04-13
updated: 2026-04-13
sources: 1
---

# LLM Tool Calling

**Also known as:** Function calling, tool use

---

## What It Is

Tool calling is the mechanism by which an LLM is given a set of defined tools (API calls, functions, custom actions) and can choose to invoke one or more of them when it determines this would help answer a user's question. The LLM does not execute the tool itself — it signals which tool to call and with what parameters; the host application executes the call and returns the result.

---

## Capability Unlocked

Tool calling extends a plain (single-call) LLM in two important dimensions:

| Dimension | Single-call LLM | Tool-calling LLM |
|---|---|---|
| **Context** | Public training data only | Can call APIs to fetch private/live data |
| **Actions** | Text response only | Can trigger writes: create PRs, update dashboards, etc. |

---

## Flow

```
1. Developer defines a set of tools (name, description, parameters)
2. Tools are passed to the LLM alongside the user prompt
3. LLM decides: use a tool, or answer directly?
4. If tool chosen → LLM returns tool name + arguments
5. Host app executes the tool → result returned to LLM
6. LLM incorporates result and generates final response
```

In a single tool call, this cycle happens once. In an [[3 - Areas/AIOps/wiki/concepts/LLM Agent]], it loops until the task is complete.

---

## Relation to MCP

Before [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]], tool definitions were vendor-specific and had to be rebuilt per integration. MCP standardises how tools are published and discovered, making tool calling interoperable across clients and servers.

---

## Related

- [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] — standardises tool surface publication and discovery
- [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] — extends tool calling into a multi-step action-feedback loop
- [[3 - Areas/AIOps/wiki/entities/Grafana MCP Server]] — a real-world MCP tool surface for Grafana

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-06-07] Building AI Into Observability Workflows]]
