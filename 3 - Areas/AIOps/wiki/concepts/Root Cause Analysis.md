---
tags: [concept]
created: 2026-04-13
updated: 2026-05-13
sources: 7
---

# Root Cause Analysis

**Abbreviation:** RCA  
**Also known as:** Fault localization, root cause identification

---

## Definition

Root Cause Analysis is the process of identifying the underlying cause of a system failure or performance degradation, rather than merely treating its surface symptoms. In observability contexts, RCA takes signals from the [[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]] (logs, metrics, traces) and traces them back to the specific misconfiguration, code defect, resource exhaustion, or infrastructure failure that initiated a fault cascade.

---

## Manual vs. Automated RCA

### Manual RCA
Human engineers follow a troubleshooting workflow:
1. Alert fires on a metric threshold
2. Engineer investigates correlated logs and traces
3. Engineer identifies the causal service/component
4. Post-mortem documents root cause and remediation

**Limitation:** Expertise-dependent, slow under pressure, knowledge siloed in individuals.

### Automated RCA (AIOps)
[[3 - Areas/AIOps/wiki/concepts/AIOps]] systems apply ML/AI to automate part or all of the RCA process:
- Anomaly detection flags signals before threshold breaches
- Causal inference correlates across pillars to surface the likely root cause
- [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] systems can query live observability data and reason over it to suggest or confirm a root cause

---

## RCA in Practice: Adobe On-Call Agent

[[3 - Areas/AIOps/wiki/entities/Adobe]] runs a production on-call agent that performs RCA in parallel with human engineers at the moment an alert fires:

```
Alert (Prometheus → AlertManager → Slack)
  ├──→ On-call engineer notified
  └──→ Orchestrator agent dispatched in parallel
        ├──→ Sub-agent: Splunk (log evidence)
        ├──→ Sub-agent: Prometheus (curated metric report)
        └──→ Sub-agent: Knowledge base (runbooks + past RCAs)
              ↓
        RCA + Recommendations + source citations → Slack thread
```

**Results after ~18 months:** 550 alerts/month automated (30% of total), 91 hours/month saved, **71% RCA accuracy** (measured by [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation|LLM-as-judge]] vs. engineer resolution).

### Key RCA Design Lessons from Adobe

1. **Curated reports > arbitrary queries**: agents given free rein to write Prometheus or Splunk queries produce inconsistent, context-polluting outputs. Pre-built metric report tools (analogous to Grafana dashboards) give agents the "whole picture in one call."
2. **Citations build trust**: every RCA includes links to the specific log queries and runbook sections used, enabling engineers to verify and hand off cleanly.
3. **Self-improving via golden dataset**: resolved RCAs are stored as Markdown in GitHub and re-indexed as a knowledge base — agents learn from past investigations rather than re-deriving the same RCA.
4. **Knowledge base chunk size**: runbooks should target ~5K tokens per document; large runbooks split into small chunks pollute RAG context with unrelated command snippets.

---

## RCA in Practice: Tianchi 2025 Contest

The [[3 - Areas/AIOps/wiki/sources/[2026-04-13] Tianchi 2025 AIOps Fault Localization Challenge|Tianchi 2025 AIOps contest]] frames RCA as a structured ML task:

- **Input:** `dataset/input.jsonl` — observability signal snapshots per incident case
- **Output:** `dataset/output.jsonl` — the identified root cause per case
- **Backend:** [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud ARMS]] / SLS providing the raw telemetry

This benchmark illustrates the emerging industry practice of treating RCA as an evaluable, automated capability rather than purely a human skill.

---

## Topology-Guided RCA with UModel

[[3 - Areas/AIOps/wiki/entities/UModel]] from [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]] 2.0 represents a significant advance in automated RCA by providing a **unified entity topology graph** that crosses all system boundaries:

> Instead of jumping between multiple tools (APM tracing → database console → Kubernetes dashboard), the entire causal path exists in a single navigable graph — from gateway application to Kubernetes release audit logs.

A real incident walkthrough from the Apsara Conference demo:

```
Alert: Gateway API latency spike
  └→ Gateway app entity → Order app entity (call topology)
        └→ DB client entity → DB server entity
              └→ Slow SQL logs (log clustering: 100s of queries → 3 patterns)
                    └→ K8s Deployment → Namespace → Cluster
                          └→ Release audit: faulty image version identified
```

Key enablers within this RCA flow:
- **Log clustering operator** ([[3 - Areas/AIOps/wiki/concepts/Computing Pushdown]]): collapsed hundreds of slow queries into 3 distinct patterns — dramatically accelerating the diagnosis
- **UModel relationships**: allowed crossing the app→infrastructure boundary without switching tools
- **Entity-bound knowledge**: each entity carries "golden metrics" and health definitions so the agent understands what "healthy" and "anomalous" mean for that entity type

> [!tip] Key insight
> The design philosophy of Cloud Monitor 2.0 — *"enable the large model to see what we see and do what we do"* — means every console drill-down sequence is designed to mirror the AIOps Agent's RCA reasoning path.

---

## RCA in Practice: Canary-Phase Diagnosis (Argo Rollouts AI Plugin)

[[3 - Areas/AIOps/wiki/entities/Carlos Sanchez]] (Adobe) demonstrated a distinct RCA context: diagnosing failures **during a [[3 - Areas/AIOps/wiki/concepts/Progressive Delivery|canary rollout]]**, before the failure reaches 100% of users.

```
Canary at 30% traffic → AI analysis plugin runs
  └── Agent: compare stable pods vs. canary pods
        ├── Fetch logs (both stable and canary)
        ├── MCP tools: get pod, describe pod (K8s state)
        └── LLM analysis: "index out of range panic in canary; unhandled empty-slice scenario"
              ↓
        Confidence < 50% → rollback triggered
              ↓
        GitHub Issue: RCA narrative with stable/canary comparison + recommended fix
```

**Key distinction from post-incident RCA:** Canary-phase RCA operates *within* the deployment pipeline, not after the incident fully materializes. The blast radius is bounded to the canary percentage (e.g., 30% of traffic), and the diagnosis happens while the evidence (live canary logs) is immediately accessible.

**Design lesson:** AI agents are especially effective at canary RCA because the comparison signal is clean — you have a simultaneous stable baseline to diff against the canary, eliminating many confounding variables that complicate post-incident diagnosis.

---

## Domain Knowledge as RCA Accelerator

The Alibaba Cloud observability blog distinguishes between statistical AIOps and **knowledge-driven RCA**:

> Embed the best troubleshooting paths, common problem positioning methods, and root cause decision procedures into the platform itself — equivalent to embedding an experienced engineer into the tool.

This aligns with [[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]] (Grafana's approach): pre-building a knowledge base of infrastructure topology so the agent can reason about root causes without querying from scratch each time.

---

## Investigation-Based vs. Answer-Based RCA

Grafana's AI RCA strategy draws a sharp distinction between two product paradigms:

| Paradigm | Output | Limitation |
|----------|--------|------------|
| **Answer-based** (most current tools) | A paragraph of suspected root cause | No evidence trail; not auditable; engineers must re-investigate to trust it |
| **Investigation-based** (Grafana's approach) | Evidence package: timeline, impact scope, candidate root causes, supporting evidence, counter-evidence, recent changes, similar historical incidents, next actions | Structured, verifiable, editable |

> [!tip] Key insight
> Don't let the LLM guess the root cause — let it into the workbench. AI RCA should produce an investigation, not an answer.

### Sift: Productized Diagnostic Checks

[[3 - Areas/AIOps/wiki/entities/Sift]] demonstrates that high-frequency failure patterns should be codified as explainable diagnostic rules rather than delegated to LLMs:

- OOMKill, CrashLoopBackOff, CPU throttling
- Slow SQL, connection pool exhaustion, MQ backlog
- Downstream timeout, post-release error rate increase
- Certificate expiry, DNS anomaly

The LLM's value is in organizing, explaining, and correlating these check results — and suggesting next steps — not in detecting the patterns themselves.

### RCA Workbench (Asserts.ai)

[[3 - Areas/AIOps/wiki/entities/Asserts.ai]] powers an entity-centric RCA Workbench that places all entities and insights on a shared timeline, showing fault propagation:

```
Config change → Service errors → Downstream timeout → Upstream retry → Resource exhaustion → Cascade
```

The key investigative question: **"Which insight appeared first?"** — tracing back from the most visible symptom to the initiating event. The workbench leverages the [[3 - Areas/AIOps/wiki/concepts/Knowledge Graph]] for entity relationships and insight types (resource saturation, error rate anomaly, latency anomaly, deployment/config change).

---

## Relationship to Other Concepts

- **[[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]]** — the raw material for RCA; all three pillars must be correlated
- **[[3 - Areas/AIOps/wiki/concepts/Application Performance Monitoring]]** — APM tools provide the traces and profiles that RCA uses
- **[[3 - Areas/AIOps/wiki/concepts/AIOps]]** — automated RCA is the primary near-term AIOps use case
- **[[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]]** — pre-built knowledge base accelerates RCA by providing topology context
- **[[3 - Areas/AIOps/wiki/concepts/LLM Agent]]** — agents can perform multi-step RCA by querying observability APIs and reasoning over results
- **[[3 - Areas/AIOps/wiki/entities/UModel]]** — unified entity topology graph; enables cross-boundary RCA in a single view
- **[[3 - Areas/AIOps/wiki/concepts/Computing Pushdown]]** — log clustering and anomaly operators pre-process data to accelerate RCA diagnosis
- **[[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]]** — production platform with UModel-guided RCA and AIOps Agent
- **[[3 - Areas/AIOps/wiki/entities/Adobe]]** — production on-call agent; 71% RCA accuracy; curated metric reports pattern; canary-phase self-healing via Argo Rollouts AI plugin
- **[[3 - Areas/AIOps/wiki/entities/Argo Rollouts]]** — canary-phase RCA: AI plugin catches failures at 10–30% traffic exposure
- **[[3 - Areas/AIOps/wiki/concepts/Progressive Delivery]]** — the rollout strategy that bounds blast radius, enabling more tractable canary-phase RCA
- **[[3 - Areas/AIOps/wiki/concepts/Self-Healing Systems]]** — RCA output feeds the self-healing loop: diagnosis → fix PR → re-deploy
- **[[3 - Areas/AIOps/wiki/entities/Splunk]]** — log data source in enterprise RCA stacks
- **[[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]]** — staged framework for expanding RCA from advisory to autonomous
- **[[3 - Areas/AIOps/wiki/entities/SynergyRCA]]** — graph-based RAG for K8s RCA; StateGraph + MetaGraph + GPT-4o; ~0.90 precision in ~2 min
- **[[3 - Areas/AIOps/wiki/concepts/Retrieval-Augmented Generation]]** — SynergyRCA demonstrates graph-structured RAG variant for runtime state retrieval

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-13] All in One How to Build an End-to-End Observable System]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-13] Tianchi 2025 AIOps Fault Localization Challenge]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Apsara Conference Insights Rebuild Observability]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Is AIOps the Future of Operations?]]
- [[3 - Areas/AIOps/wiki/sources/[2025-11-25] Fix Production Rollouts on the Fly With Agentic AIOps]]
- [[3 - Areas/AIOps/wiki/sources/[2025-06-03] Simplifying Root Cause Analysis in Kubernetes with StateGraph and LLM]]
- [[3 - Areas/AIOps/wiki/sources/[2026-05-13] Grafana 给 AI RCA 提了个醒]]
