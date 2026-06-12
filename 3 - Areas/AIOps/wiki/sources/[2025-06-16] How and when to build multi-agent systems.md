---
tags: [source]
created: 2026-05-13
updated: 2026-05-13
sources: 1
---

# How and When to Build Multi-Agent Systems

**Author:** [[3 - Areas/AIOps/wiki/entities/Harrison Chase]] (CEO, [[3 - Areas/AIOps/wiki/entities/LangChain]])
**Published:** 2025-06-16
**Type:** Blog post / essay

---

## Summary

[[3 - Areas/AIOps/wiki/entities/Harrison Chase]] reconciles two influential and apparently contradictory posts: [[3 - Areas/AIOps/wiki/entities/Cognition]]'s "Don't Build Multi-Agents" and [[3 - Areas/AIOps/wiki/entities/Anthropic]]'s "How we built our multi-agent research system." The reconciliation hinges on two key insights.

---

## Key Insight 1: Context Engineering Is Everything

[[3 - Areas/AIOps/wiki/concepts/Context Engineering]] is the foundational discipline for all agent systems — single or multi-agent. Chase endorses Cognition's framing that the #1 job of agent engineers is managing what the model sees at each step. [[3 - Areas/AIOps/wiki/entities/LangChain]]'s [[LangGraph]] is positioned as enabling this through a "no hidden prompts" approach — developers have full control over context construction with no framework-injected prompt content.

---

## Key Insight 2: Read vs Write Distinction

The critical decision factor for [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] is whether agents primarily **read** (research, information gathering) or **write** (code generation, state mutation):

| Task Type | Example | Multi-Agent Fit | Why |
|---|---|---|---|
| **Read** (research) | Web research, document analysis | Excellent | Subtasks are independent; parallelization works; context fragmentation doesn't cause conflicting decisions |
| **Write** (code/actions) | Software engineering, infrastructure changes | Poor | Actions carry implicit decisions; parallel agents make conflicting assumptions; context sharing is critical |

This resolves the Cognition vs Anthropic tension:
- **Anthropic** built a read-heavy research system → multi-agent excels
- **Cognition** builds Devin for write-heavy coding → single-threaded agent is correct

---

## When Multi-Agent Excels

- **Breadth-first queries** — many independent search directions
- **Tasks exceeding a single context window** — divide and conquer
- **High-value tasks justifying heavy parallelization** — token cost is acceptable when value is high

---

## Production Challenges

1. **Durable execution** — long-running agent tasks need fault tolerance, checkpointing, and recovery (LangGraph positioned as solution)
2. **Agent observability and debugging** — multi-agent systems are hard to debug without proper tooling (LangSmith positioned as solution)
3. **[[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]]** — start small (~20 datapoints), use LLM-as-judge, human testing essential

---

## Related

- [[3 - Areas/AIOps/wiki/concepts/Context Engineering]] — the foundational discipline Chase endorses
- [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] — read-vs-write decision framework
- [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]] — production eval practices
- [[3 - Areas/AIOps/wiki/entities/Harrison Chase]] — author
- [[3 - Areas/AIOps/wiki/entities/LangChain]] — LangGraph and LangSmith as solutions
- [[3 - Areas/AIOps/wiki/entities/Cognition]] — "Don't Build Multi-Agents" post
- [[3 - Areas/AIOps/wiki/entities/Anthropic]] — orchestrator-worker research system
