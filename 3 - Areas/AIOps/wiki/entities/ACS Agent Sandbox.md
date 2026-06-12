---
tags: [entity]
created: 2026-04-21
updated: 2026-04-21
sources: 1
---

# ACS Agent Sandbox

**Type:** Cloud platform / AI Agent runtime environment
**Organisation:** Alibaba Cloud (Container Service)
**Component:** `ack-agent-sandbox-controller` (v0.5.3+)

---

## Overview

ACS Agent Sandbox is Alibaba Cloud Container Service's (ACS/ACK) dedicated AI Agent sandbox runtime. It provides a secure, isolated, scalable Kubernetes-based execution environment purpose-built for AI Agents, addressing the unique security risks that arise from their non-deterministic behaviour and ability to execute real actions.

---

## Problem it Solves

Traditional container isolation is insufficient for AI Agents because:
1. **Prompt injection** can cause an Agent to exceed its intended permissions
2. **Tool abuse** can lead to unauthorized data access, SSRF, or malicious external calls
3. Standard K8s containers share the host kernel — a compromised container can affect others

ACS Agent Sandbox provides **kernel-level isolation** per Agent instance, not just container-level isolation.

---

## Architecture

| Property | Detail |
|---|---|
| Isolation unit | Independent kernel sandbox per Agent |
| Filesystem | Isolated temporary filesystem per Sandbox |
| Scheduling | Compatible with standard K8s workload scheduling |
| Observability injection | Auto-injects [[3 - Areas/AIOps/wiki/entities/LoongCollector]] sidecar (zero-intrusion) |
| Networking | Pod network supports Prometheus scrape and OTLP reception |

### Security Guarantees

- **Host kernel protection**: malicious code inside the Sandbox cannot attack host system programs
- **Host filesystem protection**: Sandbox cannot read/tamper/delete host files
- **Network boundary**: SSRF and internal network scanning are contained within the Sandbox boundary

---

## Deployment

Requires pre-installed components (ACK cluster):
- `LoongCollector` component
- `ACK Virtual Node` component
- `ack-agent-sandbox-controller` (v0.5.3+)

Workloads are declared using `Sandbox` Custom Resources (CR) via `agents.kruise.io/v1alpha1`.

---

## Integration with LoongCollector

The ACS management plane **automatically injects [[3 - Areas/AIOps/wiki/entities/LoongCollector]]** as a sidecar into each Sandbox pod:
- Mounts shared file paths for log collection (session logs, app logs)
- Exposes Pod network for Prometheus scraping and OTLP data reception
- No changes to the Agent application code required

This provides zero-intrusion [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]] across all three telemetry pillars (logs/metrics/traces).

---

## Relationships

- Integrates with: [[3 - Areas/AIOps/wiki/entities/LoongCollector]]
- Backed by: [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud SLS]] (via LoongCollector pipeline)
- Runs: [[3 - Areas/AIOps/wiki/entities/OpenClaw]] and other AI Agent workloads
- Addresses: [[3 - Areas/AIOps/wiki/concepts/AI Agent Runtime Security]]
- Enables: [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]]

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-06] LoongCollector + ACS Agent Sandbox]]
