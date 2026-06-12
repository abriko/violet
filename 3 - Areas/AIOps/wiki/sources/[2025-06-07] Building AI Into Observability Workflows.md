---
tags: [source]
created: 2026-04-13
updated: 2026-04-13
sources: 1
---

# [2025-06-07] Building AI Into Observability Workflows

**Original:** [YouTube – Grafana](https://www.youtube.com/watch?v=qipWEGaTWsg)
**Speaker:** [[3 - Areas/AIOps/wiki/entities/Yasir Ekinci]] ([[3 - Areas/AIOps/wiki/entities/Grafana]])
**Published:** 2025-06-07

---

## Summary

A conference talk by [[3 - Areas/AIOps/wiki/entities/Yasir Ekinci]] (Grafana) tracing the evolution of AI in observability from single-call LLMs to fully agentic systems embedded inside Grafana. The talk covers three capability tiers—single-call LLMs, [[3 - Areas/AIOps/wiki/concepts/LLM Tool Calling]], and [[3 - Areas/AIOps/wiki/concepts/LLM Agent|LLM Agents]]—and introduces the [[3 - Areas/AIOps/wiki/entities/Grafana MCP Server]] as the bridge between LLMs and a live Grafana instance. It concludes with lessons learned building the [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]]: how to evaluate agents ([[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]]), reduce [[3 - Areas/AIOps/wiki/concepts/Token Noise Reduction|token noise]], and migrate from a monolithic agent to a [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]].

---

## Key Takeaways

1. **Three tiers of LLM integration in products**
   - *Single-call*: feed context, get a natural-language answer (e.g., Pyroscope profile explainer).
   - *Tool calling*: LLM picks from a defined set of API calls/actions; gives access to private context and write actions.
   - *Agents*: action → feedback loop; LLM keeps calling tools until it can answer the query.

2. **[[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] (MCP) = "USB-C for AI tools"**
   - Open standard from Anthropic, quickly adopted by OpenAI.
   - Lets product owners publish a canonical tool surface (e.g., [[3 - Areas/AIOps/wiki/entities/Grafana MCP Server]]) that any MCP client (Cursor, Claude Code, ChatGPT) can consume without custom integration per-client.

3. **[[3 - Areas/AIOps/wiki/entities/Grafana MCP Server]]**
   - Open-source; exposes search/update dashboards, query data sources, manage incidents, find firing alerts.
   - Demo: used Cursor + Grafana MCP to auto-generate a dashboard from source code metrics, then add a latency panel — no manual PromQL.

4. **Why observability needs agents** (not just tool-calling LLMs)
   - Observability questions are multi-step, environment-specific, and unbounded in variety.
   - Agents adapt dynamically: each request gets a "new recipe" of tool calls.

5. **Agency = action → feedback loop**
   - LLM takes an action (e.g., query data source), observes result, decides next action, repeats until task resolved.

6. **[[3 - Areas/AIOps/wiki/concepts/LLM Evaluation|Evals]] are essential**
   - "Vibe testing" doesn't scale; reproducible evals do.
   - Example fix: LLM forgot to pass `type=loki` filter when listing data sources → caught and fixed via eval.
   - Evals run at tool level, sub-agent level, and full end-to-end.

7. **[[3 - Areas/AIOps/wiki/concepts/Token Noise Reduction]]**
   - JSON API responses → natural-language summaries before passing to LLM.
   - Result: 4× fewer tokens, lower latency, *and* better output quality.

8. **[[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]]: coordinator + specialists**
   - Monolithic agent: huge system prompt (10k+ tokens / ~40 pages), all tools, growing context window.
   - Solution: coordinator agent routes tasks to specialist sub-agents (support, dashboard, etc.), each with isolated context thread.
   - Trade-off: adds routing overhead; still being optimised.

9. **Upcoming**
   - Grafana knowledge graphs to help agents find relevant content.
   - More specialized observability agents (alerts, etc.).
   - Open-sourcing some evals (query generation).

---

## Entities Mentioned

- [[3 - Areas/AIOps/wiki/entities/Grafana]] — organisation and observability platform
- [[3 - Areas/AIOps/wiki/entities/Yasir Ekinci]] — speaker, Grafana engineer
- [[3 - Areas/AIOps/wiki/entities/Grafana MCP Server]] — open-source MCP server exposing Grafana to LLMs
- [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] — agentic AI assistant built into Grafana (private preview at time of talk)
- Pyroscope — continuous profiling tool (Grafana Labs); used single-call LLM for profile explanation

## Concepts Mentioned

- [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] — open standard for LLM ↔ tool integration
- [[3 - Areas/AIOps/wiki/concepts/LLM Tool Calling]] — mechanism for LLMs to invoke external functions
- [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] — action-feedback loop driving autonomous multi-step task completion
- [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] — coordinator + specialist sub-agent pattern
- [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]] — reproducible testing methodology for LLM agents
- [[3 - Areas/AIOps/wiki/concepts/Token Noise Reduction]] — converting structured API output to natural language for LLMs
