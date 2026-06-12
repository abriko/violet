---
tags: [entity]
created: 2026-04-21
updated: 2026-05-13
sources: 3
---

# OpenClaw

**Type:** Open-source AI Agent runtime
**Organisation:** Open-source project (referenced in Alibaba Cloud ecosystem)
**Repository:** https://github.com/openclaw/openclaw

---

## Overview

OpenClaw is an open-source AI Agent runtime that redefines the boundary of AI assistants — its core value is not answering questions but understanding intent, planning steps, and calling tools to complete tasks. It is positioned as a "digital employee that never goes offline."

OpenClaw is notable in this wiki as the primary **observable workload** in two companion articles from Alibaba Cloud that demonstrate [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]] and [[3 - Areas/AIOps/wiki/concepts/AI Agent Runtime Security]] in production.

---

## Architecture

OpenClaw operates as a **Gateway** that:
- Receives requests via WebSocket and HTTP channels
- Maintains session state in per-session JSONL files
- Invokes tools (Skills) on behalf of the LLM
- Routes messages through a queue system
- Emits telemetry via the `diagnostics-otel` plugin

### Key Components

| Component | Role |
|---|---|
| Gateway | Core request handler (WS/HTTP); routes webhook and tool calls |
| Tool Policy Pipeline | Runtime enforcement of tool permissions |
| Loop Detector | Detects and halts runaway execution loops |
| ACP (Automation Control Plane) | Requires explicit user approval for high-risk tools |
| `diagnostics-otel` plugin | Exports OTEL metrics, traces, and logs via OTLP/HTTP |

---

## Observability Data Sources

OpenClaw produces four categories of observable data:

| Signal | Path | Content |
|---|---|---|
| Session audit logs | `~/.openclaw/agents/<id>/sessions/*.jsonl` | Every message, tool call, parameter, token cost |
| Application logs | `/tmp/openclaw/openclaw-YYYY-MM-DD.log` | System health, gateway errors, webhook status |
| OTEL Metrics | OTLP push via `diagnostics-otel` | Counters/histograms for tokens, cost, queue, sessions |
| OTEL Traces | OTLP push via `diagnostics-otel` | Span-level model call and message processing chains |

See [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]] for the full framework.

---

## Security Model

OpenClaw implements layered runtime defences:

- **Tool Policy Pipeline**: enforces which tools are allowed per invocation context
- **Gateway HTTP default blocks**: `sessions_spawn`, `sessions_send`, `cron`, `gateway`, `whatsapp_login`
- **ACP explicit-approval tools**: `exec`, `spawn`, `shell`, `fs_write`, `fs_delete`, `fs_move`, `apply_patch`

> [!note]
> Runtime defences are the "city wall"; [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]] is the "watchtower". Only continuous observation can detect what the runtime policies miss.

See [[3 - Areas/AIOps/wiki/concepts/AI Agent Runtime Security]] for the threat taxonomy and monitoring queries.

---

## Production Deployment

For production-grade deployment, OpenClaw is paired with:
- **[[3 - Areas/AIOps/wiki/entities/ACS Agent Sandbox]]** — K8s sandbox providing kernel-level isolation
- **[[3 - Areas/AIOps/wiki/entities/LoongCollector]]** — zero-intrusion sidecar for unified telemetry collection
- **[[3 - Areas/AIOps/wiki/entities/Alibaba Cloud SLS]]** — unified observability backend (session audit, OTEL ingestion, SPL analysis)
- **[[3 - Areas/AIOps/wiki/entities/LoongSuite]]** — GenAI SemConv provides Agent-hierarchy (Entry/Step Span), Skill-level, and token-level trace semantics for OpenClaw's OTel instrumentation

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-03-02] 你的 OpenClaw 真的在受控运行吗？]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-06] LoongCollector + ACS Agent Sandbox]]
- [[3 - Areas/AIOps/wiki/sources/[2026-05-12] LoongSuite GenAI 可观测语义规范]]
