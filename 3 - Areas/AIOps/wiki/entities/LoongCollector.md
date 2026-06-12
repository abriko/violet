---
tags: [entity]
created: 2026-04-21
updated: 2026-04-21
sources: 1
---

# LoongCollector

**Type:** Open-source observability data collector
**Organisation:** Alibaba Cloud (open-source)
**Repository:** https://github.com/alibaba/loongcollector

---

## Overview

LoongCollector is Alibaba Cloud's open-source unified observability data collector, designed for cloud-native and high-performance scenarios. It collects all three telemetry pillars (logs, metrics, traces) in a single agent, with edge-side computing capabilities that implement [[3 - Areas/AIOps/wiki/concepts/Computing Pushdown]] at the collector layer.

In the AI Agent context, LoongCollector is the observability backbone of the [[3 - Areas/AIOps/wiki/entities/ACS Agent Sandbox]] platform — automatically injected as a zero-intrusion sidecar to provide full-chain [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]] without application code changes.

---

## Key Capabilities

### Performance
| Feature | Detail |
|---|---|
| Architecture | Zero-copy (Memory Arena + Zero-Copy) |
| Memory management | Event pooling — reduces GC pressure |
| Throughput | 500 MB/s log collection on a single core |

### Unified Three-Pillar Collection

| Pillar | Support |
|---|---|
| **Logs** | stdout/stderr, file logs; auto-annotates K8s metadata (Pod/Namespace/Labels) |
| **Metrics** | Native Prometheus Exporter; system metrics (CPU/mem/network/disk I/O); GPU metrics (NVIDIA DCGM) |
| **Traces** | Full [[3 - Areas/AIOps/wiki/entities/OpenTelemetry]] OTLP support |

### Edge-Side Computing (Computing Pushdown)

LoongCollector implements [[3 - Areas/AIOps/wiki/concepts/Computing Pushdown]] at the collector tier:
- High-performance C++ plugin + SPL (Simple Pipeline Language) engine
- Filter, transform, and aggregate data at the source
- Reduces noise and data volume before transmission — lowers storage and ingestion cost

> [!tip] This is the same Computing Pushdown principle described in the Alibaba Cloud Monitor 2.0 architecture, applied at the collector layer rather than the LLM orchestration layer.

### Enterprise Reliability

**Data reliability:**
- At-Least-Once delivery semantics
- Local disk cache on network failure; automatic retransmission on recovery
- Automatic retry with exponential backoff
- Back-pressure flow control

**Operational reliability:**
- Multi-tenant pipeline isolation
- Priority scheduling (critical data first)
- Hot reload / graceful config change — zero downtime, no restart required

### Large-Scale Management
- **ConfigServer**: centralized config management supporting 10,000+ collector instances
- Remote config push: changes take effect immediately without SSH access
- Unified health and performance monitoring dashboard

---

## Integration with ACS Agent Sandbox

[[3 - Areas/AIOps/wiki/entities/ACS Agent Sandbox]] automatically injects LoongCollector as a sidecar container into every Sandbox pod:

```
ACS Management Plane
  └─ Sandbox Pod
       ├─ AI Agent Container (e.g. OpenClaw)
       └─ LoongCollector Sidecar (auto-injected)
            ├─ File mount → session logs + app logs → SLS
            └─ Pod network → Prometheus scrape + OTLP receive → SLS
```

For [[3 - Areas/AIOps/wiki/entities/OpenClaw]], three pipeline configs are deployed:
1. `openclaw-session-log` — JSONL session audit files → SLS Logstore
2. `openclaw-app-log` — application log files → SLS Logstore
3. `openclaw-otel-config` — OTLP receiver → SLS (separate logstores for logs/metrics/traces)

---

## Relationships

- Part of: [[3 - Areas/AIOps/wiki/entities/ACS Agent Sandbox]] platform
- Sends to: [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud SLS]]
- Implements: [[3 - Areas/AIOps/wiki/concepts/Computing Pushdown]] (at collector tier)
- Supports: [[3 - Areas/AIOps/wiki/entities/OpenTelemetry]], [[3 - Areas/AIOps/wiki/entities/Prometheus]]
- Enables: [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]]
- Instruments: [[3 - Areas/AIOps/wiki/entities/OpenClaw]]

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-06] LoongCollector + ACS Agent Sandbox]]
