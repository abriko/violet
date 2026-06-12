---
tags: [concept]
created: 2026-04-13
updated: 2026-04-14

sources: 6
---

# AIOps

**Full name:** Artificial Intelligence for IT Operations  
**Also known as:** Algorithmic IT Operations (original Gartner coinage)

---

## Definition

AIOps is the application of machine learning, statistical analysis, and AI reasoning to automate and augment IT operations tasks — particularly those involving large volumes of observability data. The primary goal is to reduce mean time to detect (MTTD) and mean time to resolve (MTTR) by automating anomaly detection, correlation, and [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]].

[[3 - Areas/AIOps/wiki/entities/Alolita Sharma]] (KubeCon 2024) frames AIOps as the end-stage of an observability evolution: classical telemetry → [[3 - Areas/AIOps/wiki/concepts/Intelligent Observability]] → AIOps. In this framing, **Intelligent Observability is the prerequisite** — you cannot do AIOps without first being able to reason qualitatively over observability data.

---

## Scope of AIOps Capabilities

### Anomaly Detection
Identify deviations in metrics, logs, or traces that fall outside learned normal behaviour — without requiring manually set thresholds.

### Event Correlation
Group related alerts and signals across the [[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]] into a single causal incident, reducing alert storm noise.

### Root Cause Analysis (RCA)
Automatically trace a fault back to its originating component or change. See [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]].

### Predictive Operations
Forecast future resource exhaustion or performance degradation from historical patterns (the "understood but unaware" quadrant in the [[3 - Areas/AIOps/wiki/sources/[2026-04-13] All in One How to Build an End-to-End Observable System|Alibaba Cloud awareness/understanding matrix]]).

### Automated Remediation
Trigger corrective actions (auto-scaling, circuit breaking, config rollback) in response to detected faults, closing the loop from detection to resolution.

---

## Why AIOps Failed — and What That Means for AI-Powered Observability

[[3 - Areas/AIOps/wiki/entities/Asaf Yigal]] (co-founder of [[3 - Areas/AIOps/wiki/entities/Logz.io]]) argues that the first wave of AIOps stalled not because the technology was flawed, but because **organisations were unwilling to change their processes**:

> "Failure to realize benefits from those solutions wasn't due to the technology — it was because organizations weren't making the changes required to get those benefits."

The failure modes were:
- Use cases were never clearly defined — "What were the right tools? Those questions were never answered."
- AIOps required teams to reorganise workflows and data pipelines; most organisations resisted
- Adoption lagged despite technically sound ML capabilities

> [!tip] The implication for GenAI observability is direct: technology improvement alone is insufficient. Adoption requires explicit use-case definition, measurable productivity targets, and active organisational change management.

### Practitioner Adoption Dynamics (Michelin Retrospective)

[[3 - Areas/AIOps/wiki/entities/Matthew Liu]]'s retrospective from [[3 - Areas/AIOps/wiki/entities/Michelin]] adds a ground-level account of the specific **stakeholder resistance patterns** that enterprise AIOps architects face — and a recommended sequencing to navigate them:

| Stakeholder | Resistance |
|-------------|-----------|
| Ops engineers | Fear that stated efficiency gains will translate to headcount reduction |
| Team leads | Fear that MTTR improvements become enforced KPIs before the solution matures |
| IT management | Wants concrete value commitments before granting budget or sponsorship |
| Global governance | Wants architecture and risk assessment before scope or KPIs are final |

The critical sequencing mistake: **asking for hard KPI commitments before running any pilots**. This triggers the headcount/KPI-punishment fear spiral and produces no shared objectives.

The recommended antidote is an **[[3 - Areas/AIOps/wiki/concepts/AIOps Exploration Charter]]** — a time-boxed (3–6 month), learning-first commitment signed off by CIO and ops head *before* any KPI discussion:

- **O1:** Reduce uncertainty (replace hype with evidence)
- **O2:** Prove technical and data feasibility on a small scope
- **O3:** Materialise operational know-how into reusable assets (prompts, workflows, tool patterns)
- **O4:** Build confidence and guardrails

Only *after* a charter pilot runs should gains be measured and a real business case built. The governance approval itself should be for an **MCP-based pattern** (not a specific tool), with the app builder/runtime treated as a replaceable component — enabling "validate the pattern, not a product" as the governance message.

### AIOps vs. AI-Powered Observability

This source draws a sharp conceptual distinction:

| Dimension | AIOps | AI-Powered Observability |
|-----------|-------|--------------------------|
| Starting point | AI/ML; ingest *all* telemetry | Selective telemetry (observability-first) |
| Dashboard model | May have no unified dashboard | Full dashboarding + visualisation |
| AI role | Core engine | Enhancement layer |
| Anomaly detection | Primary goal | Feature added to existing observability |

> "AIOps starts with AI and might not offer a single dashboard… [AI anomaly detection within observability metrics] is an enhancement to an observability solution — not AIOps."

This reframes modern LLM-powered systems like [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] and [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]] 2.0's AIOps Agent as *AI-enhanced observability* rather than classical AIOps — a distinction with real implications for adoption strategy.

---

## AIOps Tipping Point — Three Converging Factors

Alibaba Cloud's Apsara Conference framing explains why AIOps is reaching a true breakthrough *now*, despite Gartner's original 2017 vision being long stalled by rigid rule engines, data silos, and prohibitive customization costs:

| Factor | Status |
|--------|--------|
| **High-quality data** | Unified platforms (e.g., [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud SLS]]) now ingest all pillars at exabyte scale with open standards |
| **Elastic computing power** | Cloud-native on-demand compute/storage is mature; the "can't store, can't compute" dilemma is solved |
| **Large models** | Emergent general reasoning without task-specific labelling — genuine understanding of operational scenarios |

---

## AIOps vs. Traditional Domain-Knowledge Approaches

The Alibaba Cloud observability blog draws an important distinction:

> **Statistical AIOps:** learns patterns from data; generalises but may lack operational context  
> **Knowledge-driven RCA:** embeds expert troubleshooting procedures into the platform; faster for known fault classes, fragile for novel ones

Modern systems increasingly combine both: ML for anomaly detection + LLM reasoning over embedded domain knowledge for RCA explanation and recommendation.

---

## LLMs as the New AIOps Layer

The emergence of [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] systems is reshaping AIOps:

| Traditional AIOps | LLM-based AIOps |
|------------------|----------------|
| Trained ML models per task | General reasoning over observability APIs |
| Requires labelled training data | Few-shot or zero-shot via prompt engineering |
| Black-box anomaly scores | Explainable natural-language RCA narratives |
| Fixed playbooks | Dynamic multi-step investigation via [[3 - Areas/AIOps/wiki/concepts/LLM Tool Calling]] |

[[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] exemplifies this shift: an LLM agent that queries [[3 - Areas/AIOps/wiki/entities/Grafana MCP Server|Grafana's MCP server]], executes PromQL, reads logs, and generates a natural-language incident summary — effectively performing AIOps through general-purpose reasoning.

[[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]] 2.0's AIOps Agent takes this further with a structured agentic architecture:

**Four capability tiers** (each building on the previous):
1. *Basic query* — natural language → SQL/PromQL data retrieval from [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud SLS]]
2. *Topology awareness* — [[3 - Areas/AIOps/wiki/entities/UModel]]-grounded entity relationship understanding; association analysis
3. *Deep insights* — [[3 - Areas/AIOps/wiki/concepts/Computing Pushdown]]: operators preprocess data at the source (anomaly detection, forecasting, clustering, dimensional drill-down); >90% token reduction
4. *Decision support* — complex [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis|RCA]], change impact analysis, actionable recommendations

**Four key AIOps scenarios** it addresses:
- Intelligent analysis (traces, flame graphs, cross-service diagnosis)
- Intelligent alerting (alert configuration, noise consolidation)
- Root cause insights (RCA, impact assessment, incident summaries)
- Intelligent inspection — proactive scheduled checks (reactive → preventive)

The cognitive alignment challenge (semantic gap, topology blindness, fragmented causal logic) is solved by [[3 - Areas/AIOps/wiki/entities/UModel]], which binds domain knowledge and topology directly to each observable entity, giving the LLM a "digital twin" of the IT environment to reason over.

---

## Two Core AIOps Engineering Challenges

Alibaba Cloud identifies two fundamental challenges that any production AIOps system must solve:

**1. Data Mastery** — observability data at petabyte-to-exabyte scale has three sub-problems:
- *Siloed heterogeneous systems*: multiple monitoring platforms prevent cross-domain analysis
- *Data deluge*: explosive growth creates ingest/storage/compute bottlenecks
- *Compute black hole*: feeding raw data to LLMs is expensive and low-value — solved by [[3 - Areas/AIOps/wiki/concepts/Computing Pushdown]]

**2. Cognitive Alignment** — bridging general LLM intelligence to domain-specific IT expertise:
- *Semantic gap*: LLMs don't understand operational jargon ("jitter", "health", "spike")
- *Topology blindness*: no awareness of system interdependencies
- *Fragmented causal logic*: discrete data leads to hallucinations — solved by [[3 - Areas/AIOps/wiki/entities/UModel]]

---

## AIOps in Production: Adobe's Enterprise Results

[[3 - Areas/AIOps/wiki/entities/Adobe]] provides the most detailed public enterprise case study of production AIOps at Kubernetes scale (from a KubeCon 2026 talk by [[3 - Areas/AIOps/wiki/entities/Danilo Banjac]] & [[3 - Areas/AIOps/wiki/entities/Iveri Prangishvili]]):

**Scale:** 70+ clusters, 20,000+ namespaces, 200,000+ services  
**Stack:** [[3 - Areas/AIOps/wiki/entities/Prometheus]] (metrics) + [[3 - Areas/AIOps/wiki/entities/Splunk]] (logs) + Azure AI Foundry + MCPs

| Metric | Result |
|--------|--------|
| Automated alerts/month | 550 (~30% of all alerts) |
| Engineering time saved/month | ~91 hours |
| RCA accuracy | 71% (LLM-as-judge vs. golden dataset) |

### The Autonomy Spectrum Lesson

Adobe's central finding: **neither extreme of the autonomy spectrum works for AIOps tools**:

| Approach | Outcome |
|----------|---------|
| Fully autonomous (arbitrary Prometheus/Splunk queries) | Same alert → different trajectories every run; 2/10 useful responses; context pollution |
| Fully deterministic (one tool per alert type) | Doesn't scale — N alert types requires N variants |
| **Middle ground: curated metric reports** | ✅ Production-viable |

The winning insight: give agents **pre-computed structured reports** (analogous to a Grafana dashboard view) rather than the ability to write arbitrary queries. This mirrors what experienced engineers actually do — they open a dashboard, not the raw query interface.

### Progressive Autonomy in AIOps Deployment

Adobe follows [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] — a staged expansion of agent authority:
1. RCA (diagnosis only) → 2. Recommendations → 3. Human-approved actions → 4. Narrow autonomous *(planned)*

This staged approach is the practical answer to "how autonomous should an AIOps agent be?" — the correct answer evolves as accuracy is validated.

---

## AIOps as a Benchmark Discipline

The [[3 - Areas/AIOps/wiki/sources/[2026-04-13] Tianchi 2025 AIOps Fault Localization Challenge|Tianchi 2025 AIOps contest]] formalizes fault localization as an evaluable ML task with structured JSONL I/O, signalling the maturation of AIOps from heuristics to reproducible, comparable systems. This mirrors how [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]] brought rigor to LLM agent quality assessment.

---

## Relationship to Other Concepts

- **[[3 - Areas/AIOps/wiki/concepts/Intelligent Observability]]** — the prerequisite stage: qualitative + quantitative reasoning over telemetry that enables AIOps
- **[[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]]** — AIOps consumes logs, metrics, and traces as its input signals
- **[[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]]** — the primary near-term AIOps deliverable
- **[[3 - Areas/AIOps/wiki/concepts/Application Performance Monitoring]]** — APM provides the trace/profile data AIOps reasons over
- **[[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]]** — Grafana's proactive knowledge-base crawl is an AIOps input; reduces cold-start reasoning cost
- **[[3 - Areas/AIOps/wiki/concepts/LLM Agent]]** — LLM agents implement the reasoning layer of modern AIOps systems
- **[[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]]** — complex AIOps investigations (e.g., correlating cross-service failures) benefit from specialist sub-agents
- **[[3 - Areas/AIOps/wiki/entities/UModel]]** — entity topology + domain knowledge layer that enables cognitive alignment
- **[[3 - Areas/AIOps/wiki/concepts/Computing Pushdown]]** — technique for making LLM-driven AIOps economically viable at scale
- **[[3 - Areas/AIOps/wiki/concepts/VibeOps]]** — the end-state vision: fully intent-driven autonomous IT operations
- **[[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]]** — production AIOps platform implementing all of these patterns
- **[[3 - Areas/AIOps/wiki/entities/Adobe]]** — enterprise AIOps at Kubernetes scale; autonomy spectrum + progressive autonomy lessons
- **[[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]]** — staged deployment model validated in production
- **[[3 - Areas/AIOps/wiki/entities/Splunk]]** — enterprise log platform; common AIOps data source alongside Prometheus

- **[[3 - Areas/AIOps/wiki/entities/Michelin]]** — enterprise AIOps adoption (bottom-up); governance-aligned MCP pattern on AliCloud; [[3 - Areas/AIOps/wiki/concepts/AIOps Exploration Charter]] framing

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2024-03-22] Intelligent Observability The Foundation for Operating Smarter in the Age of AI]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-13] All in One How to Build an End-to-End Observable System]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-13] Tianchi 2025 AIOps Fault Localization Challenge]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Apsara Conference Insights Rebuild Observability]]
- [[3 - Areas/AIOps/wiki/sources/[2024-10-28] AI-powered observability picking up where AIOps failed]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Is AIOps the Future of Operations?]]
- [[3 - Areas/AIOps/wiki/sources/[2025-12-17] Rolling Out AIOps Without a Grand Vision]]
