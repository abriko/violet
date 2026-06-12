---
tags: [synthesis]
created: 2026-05-03
updated: 2026-05-03
sources: 0
confidence: medium
---

# AIOps-Driven FinOps System Design

> [!tip] Core Thesis
> FinOps is a subdomain of AIOps. Replace "system health" with "financial health" and the architecture is identical — billing APIs become a fourth telemetry source, cost spikes become another alert class, and rightsizing becomes another remediation action.

The root cause of FinOps failure is not missing cost data. It is the **broken link between data and action** — engineers lack context beyond a Grafana dashboard, finance cannot decode instance types, and nobody has the bandwidth to trace a billing spike back to a specific PR or deployment event. AIOps closes that gap.

---

## Capability Mapping

| FinOps Pain Point | AIOps Capability |
|---|---|
| Cost spike detected late | Anomaly detection (same metrics pipeline as [[Root Cause Analysis]]) |
| Cost not attributable to team/service | [[UModel]] topology → cost attribution |
| Idle resource review is manual and slow | Scheduled agent scan + automated recommendations |
| Budget overrun discovered after the fact | Forecasting + threshold alerting (same path as PagerDuty) |
| Optimisation advice never acted on | [[Progressive Autonomy]] → automated low-risk execution |
| FinOps and engineering are siloed | Cost embedded in AIOps dashboard — no separate tooling |

---

## Layer 1 — Data Collection (Cost Observability)

Introduce billing signals as a **fourth telemetry type** alongside the standard three pillars (see [[Observability Three Pillars]]):

```
Cloud Billing API
  Azure Cost Management  /  Aliyun Cost Center
        ↓
OpenTelemetry Collector  (custom billing receiver)
        ↓
Unified storage — SLS / Prometheus remote write
        ↓
Aligned with existing metrics: CPU, memory, request rate
```

> [!warning] Label alignment is the make-or-break detail
> Cost metric labels **must** match the Kubernetes namespace/service/team labels already in use. Without this, attribution is impossible regardless of how sophisticated the agent is.

---

## Layer 2 — Knowledge Layer (Cost UModel)

Extend the [[UModel]] entity topology concept to a **Cost Entity Graph**:

```
Cluster → Namespace → Deployment → Pod
   ↓           ↓           ↓
$cost/hr   $cost/hr   $cost/hr
   ↓
Team  (resolved via label ownership)
   ↓
Budget  (synced from FinOps platform)
```

This graph enables the agent to answer: *"Which team, which service, and which deployment caused this week's 23% cost increase?"* — not just render a pie chart.

Related: [[Infrastructure Memory]] (same pre-built knowledge base pattern, extended to cost entities).

---

## Layer 3 — Analysis Agents

Three agents mapped to three time granularities:

### Real-time Agent (minute-level)
- Listens for cost anomaly signals
- Triggers RCA: cost spike → correlates to Deployment event / HPA behaviour
- Output example: *"15:32 hk-payment-service scale-out caused $400 overspend this hour"*

### Daily Agent (08:00 AM)
- Scans previous day for idle resources (CPU < 5% sustained 4 h)
- Generates rightsizing recommendation list with utilisation evidence
- Pushes report to **Teams channel / email**

### Monthly Agent (1st of month)
- Compares budget vs actuals, split by team
- Forecasts month-end trend (linear regression or Prophet)
- Drafts a cost report — **requires human review before distribution**

See [[Multi-Agent Architecture]] for orchestration patterns and [[LLM Evaluation]] for how to validate agent output quality before promotion.

---

## Layer 4 — Automated Execution (Progressive Autonomy)

Mirrors the Adobe [[Progressive Autonomy]] model from KubeCon 2026:

### Phase 1 — Augmented FinOps (start here)
Agent generates recommendations; human clicks to execute.
> Example: *"Recommend downgrading 3× D4s_v3 in dev-namespace to D2s_v3 — projected saving $800/month."*

### Phase 2 — Supervised Action (months 3–6)
Low-risk actions execute automatically; Teams/email notification sent; human can undo within a window.
> Example: Auto-delete orphaned PVCs unused for >30 days.
> Example: Auto-scale-down dev environment during off-hours (22:00–08:00).

### Phase 3 — Autonomous FinOps (year 1+)
Agent self-manages within budget policy boundaries.
Requires [[Policy as Code]] guardrails (OPA / Sentinel).
> Example: Automated Spot/On-Demand mixed scheduling to hit cost targets.

> [!warning] Don't skip Phase 1
> The [[AIOps Exploration Charter]] pattern from Michelin applies here: run a time-boxed learning phase before committing to autonomy KPIs. Trust in the agent must be earned through visible, auditable recommendations first.

---

## Layer 5 — Governance

Often the layer skipped, and the reason most FinOps programmes stall:

- **Budget-as-Code** — budgets live in the GitOps repo; the agent reads config, not spreadsheets.
- **Cost alerts as first-class citizens** — routed through the same AlertManager/[[Policy as Code]] pipeline as SLO alerts, not a separate FinOps tool.
- **Automated chargeback** — monthly agent generates per-team cost statements pushed to team leads via Teams/email, eliminating manual FinOps team aggregation.
- **Full audit log** — every automated action is recorded in the [[AI Agent Observability]] session audit log, satisfying compliance requirements.

---

## Recommended Roll-out Sequence

```
Weeks 1–2   Wire billing data into SLS/Prometheus (unglamorous but foundational)
Weeks 3–4   Build Cost Entity Graph — align namespace/team labels
Month 2     Daily agent live: idle resource scanning + Teams/email report
Month 3     Real-time anomaly detection + RCA correlation
Month 4+    Phase 2 low-risk automated execution (dev environment off-hours)
Year 1+     Phase 3 — autonomous budget-bounded scheduling
```

---

## Related Wiki Pages

- [[UModel]] — entity topology foundation the Cost UModel extends
- [[Progressive Autonomy]] — the staged autonomy model this design follows
- [[AI Agent Observability]] — audit and control layer for all automated actions
- [[AIOps Exploration Charter]] — learning-first adoption pattern to apply at each phase
- [[Policy as Code]] — guardrail mechanism for Phase 3 autonomous execution
- [[Multi-Agent Architecture]] — orchestration pattern for the three-agent design
- [[Infrastructure Memory]] — pre-built knowledge base pattern extended to cost entities
- [[Observability Three Pillars]] — baseline telemetry this design extends with billing
- [[Root Cause Analysis]] — the RCA pipeline re-used for cost spike attribution
- [[Context Engineering]] — ensures each agent step has the right cost + infra context
