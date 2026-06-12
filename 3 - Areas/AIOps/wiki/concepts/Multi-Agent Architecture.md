---
tags: [concept]
updated: 2026-05-13
sources: 7
---

# Multi-Agent Architecture

**Also known as:** Multi-agent with delegation, coordinator-specialist pattern

---

## What It Is

A multi-agent architecture is a system design where a single coordinating [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] receives user input and delegates sub-tasks to a set of specialist agents, each focused on a narrow domain. Each specialist has its own isolated context thread, smaller system prompt, and a curated subset of tools.

This pattern emerges as a response to the scalability problems of monolithic single-agent systems.

---

## Problem: The Monolithic Agent

When building an [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] that must handle many domains (dashboards, alerts, logs, support docs, …), a naive approach is to give one agent everything:

| Problem | Detail |
|---|---|
| Huge system prompt | [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] v1 had 10k+ token prompt (~40 pages of instructions) |
| Tool confusion | As tool count grows (1 → 10 → 20 → 30+), the LLM struggles to pick the right one |
| Ballooning context window | Every turn adds to a single shared history; all tokens must be re-sent each message |
| Brittle iteration | Fixing one flow can break 10 others; [[LLM Evaluation|evals]] are essential to catch regressions |

---

## Solution: Coordinator + Specialists

```
User
  ↓
Coordinator agent  (small prompt, no domain tools)
  ├──→ Support agent      (docs search tools, own thread)
  ├──→ Dashboard agent    (create/edit tools, own thread)
  ├──→ Alerts agent       (alert query tools, own thread)
  └──→ … (extensible)
```

- **Coordinator** holds minimal state; it classifies the request and delegates.
- **Specialists** run in isolated threads — their intermediate tool calls and results never pollute the main conversation.
- **Extensibility** — adding a new skill = adding a new specialist agent; coordinator needs only a small update to its routing instructions.

---

## Trade-offs

| Pro | Con |
|---|---|
| Smaller, focused prompts per agent | Routing overhead (coordinator → specialist → back) adds latency |
| Isolated context per task | Coordination failures can silently drop context |
| Easy to add new specialists | Shared state between specialists requires explicit passing |
| Better eval granularity (per-agent) | More moving parts to monitor and debug |

---

## Real-World Example: Adobe's Agent Marketplace

[[3 - Areas/AIOps/wiki/entities/Adobe]] built a **self-service agent marketplace** for on-call automation — a production implementation of this pattern at enterprise scale:

```
Agent definition (YAML): name, system prompt, tools, KB links
  → CI/CD pipeline
    → Azure Functions     (tools deployed as MCPs)
    → Azure AI Foundry    (agent runtime)
    → Azure AI Search     (vector KB, auto-synced from GitHub)
```

- **Time to onboard a new specialist agent:** ~half a day
- Each product team owns their agent covering their domain (CDN, replication, etc.)
- A coordinator routes incoming alerts or user queries to the right specialist based on agent descriptions
- **Challenge solved:** at [[3 - Areas/AIOps/wiki/entities/Adobe]]'s scale (200K+ services), a single monolithic agent is impossible — the marketplace lets teams own their domain without central bottlenecks

### Routing Strategy

Adobe uses internal webhook infrastructure to bridge AlertManager → Slack → agent. The coordinator dispatches based on agent descriptions in the marketplace YAML. Not AI-magic routing — the agent description field is effectively the routing key.

---

## Real-World Example: Grafana Assistant

[[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] migrated from a monolithic agent to this pattern. Example routing:
- *"How do I add a data source?"* → Support agent (searches Grafana docs)
- *"Add a latency panel to my dashboard"* → Dashboard agent (uses dashboard edit tools)
- *"Who's on call right now?"* → Alerts/IRM agent (queries incident management API)

---

## Real-World Example: GitHub Copilot Agent Marketplace

[[3 - Areas/AIOps/wiki/entities/GitHub Copilot]] implements a third multi-agent pattern — a **platform-level open agent marketplace** where both first-party and third-party agents are registered and orchestrated:

- **Custom agents**: defined as Markdown files (description, MCP servers, tasks, patterns, anti-patterns); committed to repo; immediately available as assignable agents in GitHub Issues
- **Partner agents**: PagerDuty, JFrog, and other third-party agents registered at org level
- **Parallel execution**: multiple cloud agents can implement different plans simultaneously (e.g., light mode + dark mode implementations in parallel)
- **Agent HQ**: centralized session monitor providing unified visibility across all active/historical agent sessions

**Key difference from Adobe's marketplace:** GitHub's is a *platform-level* standard (anyone can register agents); Adobe's is an *enterprise-internal* marketplace (product teams own their domain agents). Both use a description-based routing key.

---

## Agent Swarms (Horizon 2)

[[3 - Areas/AIOps/wiki/entities/Harness]]'s [[3 - Areas/AIOps/wiki/concepts/Three Horizons of Adoption]] formalizes the multi-agent collaboration pattern at Horizon 2 as **Agent Swarms** — specialized agents passing work sequentially through a pipeline:

```
Security agent (detects CVE)
  → Developer agent (branches, bumps version)
    → QA agent (runs tests)
      → Human (merges)
```

This is the same coordinator-specialist pattern, specialized for the SDLC pipeline rather than an operations marketplace. Human involvement drops to a single approval gate at the pipeline exit.

---

## Related

- [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] — the building block; each agent in the multi-agent system is one
- [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]] — evals must cover coordinator routing as well as individual agents
- [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] — production implementation of this pattern
- [[3 - Areas/AIOps/wiki/concepts/Token Noise Reduction]] — still needed within each specialist's context
- [[3 - Areas/AIOps/wiki/entities/Adobe]] — enterprise agent marketplace; YAML-defined specialists, MCP-deployed tools
- [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] — multi-agent architecture supports staged autonomy (RCA → recommendations → actions)
- [[3 - Areas/AIOps/wiki/concepts/Three Horizons of Adoption]] — Horizon 2 Agent Swarms as a named instantiation of this pattern
- [[3 - Areas/AIOps/wiki/entities/GitHub Copilot]] — platform-level agent marketplace; parallel cloud agent execution
- [[3 - Areas/AIOps/wiki/concepts/Agentic DevOps]] — multi-agent architecture is the core delivery mechanism
- [[Context Engineering]] — the foundational discipline for making multi-agent systems reliable
- [[3 - Areas/AIOps/wiki/entities/Anthropic]] — production orchestrator-worker implementation with empirical benchmarks
- [[3 - Areas/AIOps/wiki/entities/Cognition]] — critical perspective on parallel multi-agent fragility
- [[3 - Areas/AIOps/wiki/entities/Harrison Chase]] — read-vs-write reconciliation framework
- [[3 - Areas/AIOps/wiki/entities/LangChain]] — LangGraph for durable execution; LangSmith for observability

---

## Real-World Example: Anthropic Research (Orchestrator-Worker at Scale)

[[3 - Areas/AIOps/wiki/entities/Anthropic]]'s Claude Research feature is a production orchestrator-worker system with empirical performance data:

- **Lead agent** (Claude Opus 4) saves a research plan to external memory, then spawns parallel subagents (Claude Sonnet 4)
- **Subagents** search web, Google Workspace, MCP integrations in parallel; use interleaved thinking to adapt
- **CitationAgent** post-processes findings to map claims to source locations
- **Performance:** +90.2% over single-agent Claude Opus 4 on internal research eval
- **Token cost:** multi-agent uses ~15x more tokens than chat; ~4x more than single-agent
- **Speed gain:** parallel tool calling cuts research time up to 90% for complex queries

Token usage explains 80% of performance variance (BrowseComp eval). Multi-agent is fundamentally a **token scaling strategy** for breadth-first tasks with many independent parallel directions.

---

## Critical Perspective: When Multi-Agent Fails ([[Context Engineering]])

[[3 - Areas/AIOps/wiki/entities/Cognition]] (Walden Yan, June 2025) argues that parallel multi-agent architectures are **fragile by default** because of context fragmentation:

> [!warning] **Principle 1 — Share context:** Parallel agents that receive only a task summary, not the full decision history, will misinterpret their subtask. The original conversation has implicit decisions baked into tool calls and prior context.

> [!warning] **Principle 2 — Actions carry implicit decisions:** Parallel agents build on different, potentially conflicting assumptions. Their outputs become inconsistent with each other (different visual styles, different architectural choices, etc.) and the final agent must combine miscommunications.

**Cognition's recommendation:** default to a single-threaded linear agent. For very long tasks, use a dedicated compression model to summarize history, not parallel subagents.

**Resolution of apparent contradiction with Anthropic's data:** the two positions target different task types:
- Anthropic's research tasks have *independent* parallel directions (search for X and Y simultaneously) — context fragmentation doesn't occur because subtasks don't make conflicting design decisions
- Cognition's critique targets tasks with *interdependent* decisions (building a game, writing code) — where subagent actions must be consistent with each other

The practical rule: **use parallel multi-agent only when subtasks are genuinely independent and don't make conflicting implicit assumptions.**

---

## Chase's Reconciliation: Read vs Write (June 2025)

[[3 - Areas/AIOps/wiki/entities/Harrison Chase]] ([[3 - Areas/AIOps/wiki/entities/LangChain]]) formalized the resolution of the Cognition vs Anthropic tension into a simple heuristic:

| Dimension | Read-heavy (research) | Write-heavy (code/actions) |
|---|---|---|
| Parallelizable? | Yes — subtasks are independent | No — actions carry conflicting implicit decisions |
| Context fragmentation risk | Low | High |
| Multi-agent fit | Excellent | Poor — prefer single-threaded |
| Example | Anthropic's Claude Research | Cognition's Devin |

Multi-agent excels specifically at: breadth-first queries, tasks exceeding a single context window, and high-value tasks where heavy parallelization is justified by the value delivered.

Chase also identifies **durable execution** as a key production requirement — long-running agent tasks need fault tolerance, checkpointing, and recovery. [[LangGraph]] is positioned as a solution for this.

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-06-07] Building AI Into Observability Workflows]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Is AIOps the Future of Operations?]]
- [[3 - Areas/AIOps/wiki/sources/[2025-02-11] Agentic AI in DevOps Architecting Autonomous Infrastructure]]
- [[3 - Areas/AIOps/wiki/sources/[2026-01-28] The future of software creation with Agentic DevOps]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-28] How we built our multi-agent research system]]
- [[3 - Areas/AIOps/wiki/sources/[2025-06-12] Don't Build Multi-Agents]]
- [[3 - Areas/AIOps/wiki/sources/[2025-06-16] How and when to build multi-agent systems]]
