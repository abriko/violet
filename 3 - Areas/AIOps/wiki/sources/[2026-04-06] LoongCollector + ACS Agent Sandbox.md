---
tags: [source]
created: 2026-04-06
updated: 2026-04-21
sources: 1
---

# LoongCollector + ACS Agent Sandbox：构建 AI Agent 生产级运行平台

**Author:** 林润骑（太业）(Alibaba Cloud)
**Published:** 2026-04-06
**Source:** Alibaba Cloud WeChat official account (阿里云可观测)
**URL:** https://mp.weixin.qq.com/s/5ko4yGotfDsfBTEgA9Szdg

---

## Summary

Technical deep-dive on running AI Agents safely in production using two complementary Alibaba Cloud components: [[3 - Areas/AIOps/wiki/entities/ACS Agent Sandbox]] (runtime isolation) and [[3 - Areas/AIOps/wiki/entities/LoongCollector]] (observability data collection). Together they form a complete production-grade AI Agent platform that addresses the two core challenges unique to AI Agents: unpredictable runtime behaviour and the need for full-chain observability.

The companion article [[3 - Areas/AIOps/wiki/sources/[2026-03-02] 你的 OpenClaw 真的在受控运行吗？]] covers *what* to observe; this article covers *how to run and instrument* the Agent.

---

## Key Takeaways

### Two Core AI Agent Challenges

**Challenge 1 — Runtime Security (What can the Agent do? Who controls the boundary?)**
- **Weak execution isolation**: without strict permissions, prompt injection or accidental triggers can cause unauthorized access or data leakage
- **Unmanaged external capabilities**: the biggest threat is abuse of external tools — abnormal outbound calls, SSRF/internal network scanning, sensitive data exfiltration

**Challenge 2 — Full-Chain Observability (What did the Agent do? Why? With what effect?)**
- **Behaviour is non-reproducible**: same input may call different tools on different days — hard to know which step failed
- **Cost is hard to attribute**: token consumption and API calls are volatile; hard to identify which users/tasks are "burning money"
- **Quality is hard to measure**: output quality is affected by model capability, prompt design, retrieval data — and keeps changing

### ACS Agent Sandbox Architecture

[[3 - Areas/AIOps/wiki/entities/ACS Agent Sandbox]] provides a Kubernetes-based secure, isolated, scalable AI Agent runtime:

- Each Sandbox runs in an **independent kernel sandbox environment** — prevents malicious code from attacking host system programs
- Each Sandbox has an **isolated temporary filesystem** — prevents reading/tampering/deleting host files
- Based on Alibaba Cloud Container Service (ACK/ACS)

Key security properties:
- Sandbox-level isolation (not just container-level)
- Independent kernel per Agent instance
- Compatible with standard K8s workload scheduling

### LoongCollector Architecture

[[3 - Areas/AIOps/wiki/entities/LoongCollector]] is Alibaba Cloud's open-source unified observability data collector, designed for cloud-native and high-performance scenarios:

**Performance:**
- Zero-copy architecture (Memory Arena + Zero-Copy)
- Event pooling to reduce GC pressure
- Single-core throughput: 500 MB/s log collection

**Unified collection (all three pillars):**
- **Logs**: stdout/stderr, file logs; auto-annotates K8s metadata (Pod/Namespace/Labels)
- **Metrics**: native Prometheus Exporter support; system metrics (CPU/memory/network/disk I/O); GPU metrics (NVIDIA DCGM)
- **Traces**: full [[3 - Areas/AIOps/wiki/entities/OpenTelemetry]] support

**Edge-side computing (Computing Pushdown at collector):**
- High-performance C++ plugin / SPL engine
- Filter, transform, aggregate at source
- Reduces noise and data volume before transmission

**Enterprise reliability:**
- At-Least-Once delivery semantics
- Local disk cache: writes to disk on network failure, retransmits on recovery
- Multi-tenant pipeline isolation
- Hot reload / graceful config change (zero downtime)
- ConfigServer: centralized config management for 10,000+ agents

### Deep Integration: Zero-Intrusion Observability

ACS management plane **automatically injects LoongCollector** as a sidecar container into each Sandbox:
- Shared file path mount for log collection
- Pod network for Prometheus scraping or OpenTelemetry data reception
- No application code changes required

### OpenClaw Deployment on ACS Agent Sandbox

For running [[3 - Areas/AIOps/wiki/entities/OpenClaw]] with full observability:
1. Enable `diagnostics-otel` plugin in OpenClaw config
2. Configure OTLP endpoint to `127.0.0.1:4318`
3. ACS automatically injects LoongCollector into the Sandbox
4. Three `ClusterAliyunPipelineConfig` resources configured:
   - `openclaw-session-log`: file collection of session JSONL
   - `openclaw-app-log`: file collection of application logs
   - `openclaw-otel-config`: OTLP receiver routing to separate SLS logstores for logs/metrics/traces

---

## Relationships

- Describes: [[3 - Areas/AIOps/wiki/entities/ACS Agent Sandbox]], [[3 - Areas/AIOps/wiki/entities/LoongCollector]]
- Used to run: [[3 - Areas/AIOps/wiki/entities/OpenClaw]]
- Integrates with: [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud SLS]], [[3 - Areas/AIOps/wiki/entities/OpenTelemetry]], [[3 - Areas/AIOps/wiki/entities/Prometheus]]
- Implements: [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]], [[3 - Areas/AIOps/wiki/concepts/AI Agent Runtime Security]]
- Related concept: [[3 - Areas/AIOps/wiki/concepts/Computing Pushdown]] (LoongCollector performs edge-side data reduction)
- Companion article: [[3 - Areas/AIOps/wiki/sources/[2026-03-02] 你的 OpenClaw 真的在受控运行吗？]]
