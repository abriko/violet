---
tags: [concept]
created: 2026-04-21
updated: 2026-05-13
sources: 4
---

# AI Agent Observability

## Definition

AI Agent Observability is the practice of collecting, correlating, and analysing telemetry data specifically from AI Agent workloads to answer the question: **"Is this Agent truly running under control?"**

It extends classical [[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars|three-pillar observability]] (logs/metrics/traces) with a fourth signal unique to AI Agents — **session audit logs** — that records every conversation turn, tool invocation, parameter, and token cost.

> [!tip] Key distinction from classical observability
> Classical systems are deterministic: the same input always produces the same output. AI Agents are **non-deterministic** — the same user input may call different tools on different days. This makes behaviour reproduction and cost attribution fundamentally harder, and demands a dedicated observability approach.

---

## The Four Questions of Controlled Operation

An AI Agent is only "controlled" if all four can be answered:

1. **Who** is triggering the calls?
2. **How much** is it costing?
3. **What operations** were performed (especially high-risk tools)?
4. **Is the behaviour traceable and auditable?**

---

## Four-Signal Model

| Signal | Data Source (OpenClaw example) | Primary Use |
|---|---|---|
| **Session audit logs** | `~/.openclaw/agents/<id>/sessions/*.jsonl` | Behaviour audit: what did the Agent do, which tools, what parameters, what cost |
| **Application logs** | `/tmp/openclaw/openclaw-YYYY-MM-DD.log` | System health: gateway errors, webhook failures, queue backlog |
| **Metrics (OTEL)** | `diagnostics-otel` OTLP output | Real-time monitoring: token consumption rate, stuck sessions, latency trends |
| **Traces (OTEL)** | `diagnostics-otel` OTLP output | Request-chain analysis: end-to-end timing, model call latency, dependency chain |

### Session Audit Log Format

Session logs are JSONL files with typed entries:

| Entry Type | `role` | Meaning |
|---|---|---|
| User input | `user` | What the user asked |
| LLM decision | `assistant` + `toolCall` | Which tool the LLM decided to call, with parameters |
| Tool result | `toolResult` | What the tool returned (forensic data for security audits) |
| Final response | `assistant` + `stopReason: stop` | LLM final answer with `usage.cost` |

Key audit fields: `message.provider`, `message.model`, `message.usage.totalTokens`, `message.usage.cost.total`, `message.stopReason`

---

## Multi-Source Correlation Principle

The three pipelines are **complementary, not redundant**:

- **OTEL alone**: know cost is spiking, but not *who* or *what* caused it
- **Session logs alone**: can audit behaviour but cannot sense overall system state
- **App logs alone**: can see system errors but not Agent business behaviour

The correlation workflow:
1. **OTEL alert** detects anomaly (e.g. `openclaw_session_stuck > 0` or token rate spike)
2. **App logs** narrow scope — identify which subsystem and session
3. **Session logs** reconstruct the full behaviour chain and enable response

---

## Implementation Stack (Alibaba Cloud)

| Layer | Component | Role |
|---|---|---|
| Runtime | [[3 - Areas/AIOps/wiki/entities/ACS Agent Sandbox]] | Kernel-isolated execution environment |
| Collection | [[3 - Areas/AIOps/wiki/entities/LoongCollector]] | Zero-intrusion sidecar; unified log/metric/trace collection |
| Storage & analysis | [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud SLS]] | Session audit, OTEL ingestion, SPL queries, alerting |

---

## Key OTEL Metrics for AI Agents

**Cost & usage:** `openclaw.tokens`, `openclaw.cost.usd`, `openclaw.run.duration_ms`, `openclaw.context.tokens`

**Session health:** `openclaw.session.state`, `openclaw.session.stuck`, `openclaw.session.stuck_age_ms`

**Queue:** `openclaw.message.queued/processed`, `openclaw.queue.depth`, `openclaw.queue.wait_ms`

**Webhook:** `openclaw.webhook.received/error/duration_ms`

---

## LoongSuite GenAI SemConv Innovations

[[LoongSuite]] GenAI SemConv (Alibaba/Ant Group, 2026) extends the trace signal with three innovations:

### Entry/Step Span — Agent Trace Hierarchy

Flat OTel traces for complex Agents produce 100+ spans. LoongSuite introduces:
- **Entry Span**: raw user input → final output boundary
- **Step Span**: single ReAct iteration (think → act → observe)

This collapses unreadable flat traces into a navigable two-level tree.

### Skill Semantic — Business-Function Observability

New `gen_ai.skill.*` attributes define a **Skill** as a reusable unit between Tool and Agent. Enables observability at the business-capability level (e.g. "flight booking") rather than raw tool calls.

### Token-Level Inference Observability (5th Signal Dimension)

Per-token telemetry adds a new observability dimension below the request level:

| Attribute | Use |
|---|---|
| Scheduling latency | GPU resource contention diagnosis |
| Execution latency | Inference compute performance |
| Batch size | Cross-request interference detection |
| Top-K probability | Model confidence / accuracy diagnosis |

> [!tip] Token-level observability as a 5th signal
> The four-signal model (session audit + app logs + metrics + traces) operates at request granularity. Token-level timing and probability distribution add a **sub-request signal dimension** that catches issues invisible to request-level metrics — e.g. slow tokens from GPU contention, or answer irrelevance from BOS token anomalies.
---

## Relationship to Classical Observability

AI Agent Observability is a **specialisation** of [[3 - Areas/AIOps/wiki/concepts/Intelligent Observability]] — it treats AI Agents as first-class **observable workloads** (as called for by Alolita Sharma's framing) and extends the classical telemetry taxonomy with session-level forensic audit capability.

> [!note] Runtime defence vs. observability
> As described in the OpenClaw documentation: runtime defences (tool policies, loop detectors, ACP approval) are the "city wall"; observability is the "watchtower". A wall can be misconfigured or bypassed — only continuous observation catches what the wall misses. See [[3 - Areas/AIOps/wiki/concepts/AI Agent Runtime Security]].

---

## Relationships

- Extends: [[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]]
- Specialises: [[3 - Areas/AIOps/wiki/concepts/Intelligent Observability]]
- Complementary to: [[3 - Areas/AIOps/wiki/concepts/AI Agent Runtime Security]]
- Implemented by: [[3 - Areas/AIOps/wiki/entities/LoongCollector]], [[3 - Areas/AIOps/wiki/entities/ACS Agent Sandbox]], [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud SLS]]
- Applied to: [[3 - Areas/AIOps/wiki/entities/OpenClaw]]
- Extended by: [[3 - Areas/AIOps/wiki/entities/LoongSuite]]
- Related: [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]], [[3 - Areas/AIOps/wiki/concepts/LLM Agent]]
- Implemented by: [[3 - Areas/AIOps/wiki/entities/Grafana]] AI Observability Product

---

## Grafana AI Observability Product

Announced at GrafanaCON 2026, this is a brand new end-to-end solution in [[3 - Areas/AIOps/wiki/entities/Grafana]] Cloud for building and monitoring agentic applications.

> [!tip] Conversations as a new primitive
> Grafana frames AI agent conversations as a new observability primitive alongside logs, metrics, and traces.

### Four Key Features

1. **Metrics dashboard** — token/cost/model tracking with ability to drill into individual conversations
2. **Conversation debugging** — sub-agent, tool call, and token-level detail for each conversation
3. **System prompt and tool definition analysis** — insights based on real conversations, not just static definitions
4. **Online evaluations** — continuous feedback loop with [[3 - Areas/AIOps/wiki/entities/Grafana]] alerting integration

Built from lessons learned running [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] at scale.

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-03-02] 你的 OpenClaw 真的在受控运行吗？]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-06] LoongCollector + ACS Agent Sandbox]]
- [[3 - Areas/AIOps/wiki/sources/[2026-05-12] LoongSuite GenAI 可观测语义规范]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-22] GrafanaCON 2026 Keynote]]
