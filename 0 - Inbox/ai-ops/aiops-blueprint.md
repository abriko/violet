# AIOps Platform — Global Blueprint

> **Status**: Draft for Review
> **Author**: Platform Engineering — DevOps Team
> **Last Updated**: 2026-04-21

---

## 1. Background & Problem Statement

### Why AIOps Now?

Based on a 136-person survey across HK DevOps & Platform teams:

| Pain Area                     | Signal Strength                         | Top Verbatim                |
| ----------------------------- | --------------------------------------- | --------------------------- |
| Jenkins难用 / pipeline failures | 83 mentions, **54% voted hardest tool** | "打包失败的时候手动找日志流程非常繁琐"        |
| 发布/部署 friction                | **118 mentions** (highest)              | "能否一键完成发布到UAT？不用多个pipeline" |
| 文档找不到 / 找不到人                  | 80 mentions                             | "Confluence有些文档不太好找，不知道该找谁" |
| 手动重复操作                        | 18 mentions                             | "每次上线手动停止服务"                |
| 排队/资源等待                       | 28 mentions                             | "上线时服务器不够，排队时间太长"           |

**Core tension**: Team headcount grows, but manual intervention has not decreased.

### North Star

> From **"人工被动救火"** → **"AI驱动主动自愈的 DevOps"**

---

## 2. Use Case Landscape

Three strategic tracks, data-driven from survey findings:
![1000](0%20-%20Inbox/ai-ops/assets/aiops-usecase-landscape.excalidraw.md)

| # | Use Case | Track | Status |
|---|---|---|---|
| UC1 | Pipeline AI & Release Orchestration | DevOps Drive + Cross-team | UC1-A L1 ✅ Live; UC1-B Release Orchestration 1.0 ✅ Live |
| UC2 | Proactive Monitoring → RCA → Auto-Fix | DevOps Drive | 📋 Planned |
| UC3 | FinOps Cost Intelligence | Platform Drive | 📋 Planned |

---

## 3. Use Case Deep Dive

---

### UC1: Pipeline AI & Release Orchestration

**Problem**: Pipeline failures require manual log hunting (15–60 min per incident); BAU release requires manual multi-step coordination — Jira cards, Git branches, triggering pipelines — across multiple services.

**Solution**: Unified pipeline intelligence layer covering failure triage (L1→L3) and AI-augmented release orchestration. Both tracks share the Jenkins Agent and are being merged into a single orchestration plane.

---

#### UC1-A: Pipeline Triage AI (L1 → L3)

| Layer     | Trigger                                 | AI Action                                                        | Success Metric                     |
| --------- | --------------------------------------- | ---------------------------------------------------------------- | ---------------------------------- |
| **L1** ✅  | CD pipeline failure (auto)              | RCA analysis in < 30s, archived to Jenkins build description     | MTTR < 30s for common failures     |
| **L2** 📋 | New relic: same job fails ≥ 3x in 30min | Pattern summary + recommendation + @responsible person via Teams | Alert noise reduced ≥ 50%          |
| **L3** 📋 | User @Bot with Jenkins build URL        | KB retrieval + multi-step diagnosis + tool calls                 | Self-service resolution rate > 60% |

**L2 Data Flow**:
```
New relic Alert (failure pattern detected)
  → L2 Orchestrator
  → Jenkins Agent: fetch last 3 failure logs
  → Copilot LLM: generate failure pattern summary + recommendation
  → Responsible person resolution:
      if triggered by human → @that person
      if API-triggered → @Jenkins job owner (MVP)
                         later: lookup Service Catalog
  → Notification Agent: Teams @mention with summary card
  → User can reply "详细分析" → escalate to L3
```

**L3 Data Flow**:
```
User @Bot: "payment-service build 失败，报 OOMKilled"
  → L3 Orchestrator
  → KB Agent: search Confluence for "OOMKilled" runbook
  → Jenkins Agent: fetch specific build log
  → Copilot LLM: synthesize KB + log → diagnosis + steps
  → Output: root cause + runbook steps + doc links
  → User satisfied → close | unsatisfied → escalate to human
```

**L1 Current Tech Stack**:
- Jenkins Groovy (`cd-pipeline.groovy` → triggers `aiops-triage.groovy`)
- `gh copilot -- -p "$PROMPT" --allow-tool=shell --silent`
- Credential: `GITHUB_TOKEN` (string type in Jenkins)

---

#### UC1-B: Release Orchestration 2.0

**1.0 → 2.0 Transformation**:

| Capability             | 1.0 (Current — No AI)                    | 2.0 (Target)                                        |
| ---------------------- | ---------------------------------------- | --------------------------------------------------- |
| Trigger                | Human clicks UI, selects services        | Team 预设编排模板 + AI 推进流程                              |
| Jira Card              | Manual form fill                         | AI extracts from conversation / PR description      |
| Git Branch             | Manual input                             | AI suggests based on naming convention              |
| Pipeline orchestration | Human selects and triggers each pipeline | AI parses intent → triggers in sequence             |
| Status feedback        | Jenkins UI                               | Real-time progress pushed to Teams conversation     |
| Release Guardrail      | None                                     | AI checks CI status + environment health → Go/No-Go |

**2.0 AI Capability Boundary (current phase)**:
- ✅ 预设编排模板解析 → structured release parameters (service, env, branch)
- ✅ Pre-release Guardrail: CI green? Target namespace healthy?
- ✅ Human confirmation gate (simplified for UAT, mandatory for Prod)
- ❌ Inter-service dependency ordering — human decides for now
- ❌ Smart Release Scheduling — next phase

**2.0 Release Flow**:
```
User 选择预设编排模板 (payment-service + auth-service → UAT)
  → Copilot Studio Bot → Release Orchestrator
  → Orchestrator: resolve template → {services: [payment, auth], env: UAT, branch: main}
  → Parallel Guardrail checks:
      ├── Jenkins Agent: CI pipelines green?
      ├── K8s Agent: UAT namespace healthy?
      ├── Snyk: new critical CVE in image digest? IaC policy violation?
      └── DAST: exposed endpoint or auth regression in canary?
  → LLM: Go/No-Go decision + reason (security regression = automatic block)
  → Human confirmation (UAT: simplified, Prod: mandatory)
  → Jenkins Agent: trigger pipelines (order decided by human, current phase)
  → Notification Agent: real-time progress per pipeline
```

**Release Orchestration Evolution Path**:
```
1.0 (Now):     UI → Jenkins API (no AI, orchestration only)
2.0 (Planned): Team 预设编排模板 + AI Guardrail + 流程推进 → Shared Agent Layer
3.0 (Future):  + Smart Release Scheduling + auto dependency resolution
```

---

### UC2: Proactive Monitoring → RCA → Auto-Fix

**Problem**: Issues are discovered reactively — after users report them or alerts fire. Engineers spend significant time correlating signals from multiple systems (metrics, logs, topology) to identify root cause, and then manually execute fixes.

**Solution**: AI-driven proactive monitoring that continuously correlates signals, generates evidence-linked RCA, and auto-remediates low-risk issues — with mandatory human approval for high-risk or production actions.

| Stage              | Trigger                                         | AI Action                                                                           | Success Metric                                    |
| ------------------ | ----------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Detect** 📋      | Metric anomaly / New relic alert / K8s event       | Signal correlation across metrics, logs, deployment history                         | Anomaly-to-alert latency < 2 min                  |
| **RCA** 📋         | Anomaly confirmed by signal threshold           | Multi-source RCA with evidence chain (log line + metric + deployment event)         | Evidence-linked RCA in < 60s                      |
| **Auto-Fix** 📋    | High-confidence RCA + low-risk action class     | Execute remediation (pod restart, replica scale, config rollback) automatically     | Auto-resolved rate > 40% for known failure classes |
| **HitL Escalate** 📋 | Low confidence / high-risk / prod environment | Teams alert with RCA summary + recommended action + approval button                 | Human decision latency < 10 min                   |

**Auto-Fix Data Flow**:
```
Monitoring Signal (New relic anomaly / K8s event / APM alert)
  → Monitoring Orchestrator
  → Signal Correlation Agent:
      ├── Metrics: error rate spike, latency P99, resource saturation
      ├── Logs: correlated error patterns within time window
      ├── Deployment events: recent release in scope?
      └── Topology: upstream/downstream service health
  → Copilot LLM: generate evidence-linked RCA
  → Confidence & Risk Evaluation:
      ├── High confidence + reversible action (pod restart, scale up)
      │     → Policy-as-Code check → auto-execute → post-fix validation
      │     → Teams notification: "已自动修复 / Auto-fixed: [evidence summary]"
      └── Low confidence / destructive / production
            → Teams alert: RCA card + recommended action + [Approve] / [Reject] button
            → Human approves → Remediation Agent executes
            → Human rejects → escalate to on-call engineer
  → Post-fix validation:
      → Monitor signals for 5 min; if anomaly recurs → re-escalate
```

**AI Capability Boundary (MVP scope)**:
- ✅ Signal correlation across logs + metrics + recent deployments
- ✅ Evidence-linked RCA with confidence score
- ✅ Auto-fix for pre-approved, reversible action classes (pod restart, scale replica)
- ✅ Human-in-the-Loop for all production changes and low-confidence cases
- ❌ Cross-service cascade analysis — next phase (requires Service Catalog + topology graph)
- ❌ Predictive failure (before anomaly fires) — next phase

**Known Failure Classes eligible for Auto-Fix (MVP)**:
| Failure Class           | Auto-Fix Action       | Reversibility | Approval Required |
| ----------------------- | --------------------- | ------------- | ----------------- |
| Pod OOMKilled           | Restart pod           | Yes           | Non-prod only     |
| Replica count below min | Scale to desired      | Yes           | Non-prod only     |
| Config drift detected   | Rollback to last good | Yes           | Always (HitL)     |
| Disk pressure on node   | Alert + cordon node   | Partial       | Always (HitL)     |

---

### UC3: FinOps Cost Intelligence

**Problem**: Cloud costs are opaque and reactive. Budget overruns are discovered at month-end. Engineers know the bill went up but cannot trace it to a specific service, team, or deployment event. Finance cannot decode instance types. Nobody has the bandwidth to act on a Grafana dashboard. The result: costs drift, optimisation advice is ignored, and FinOps remains a reporting exercise rather than an operational discipline.

**Solution**: Treat financial health with the same rigor as system health. Billing signals become a fourth telemetry type — cost spikes become another alert class, rightsizing becomes another remediation action, and the same agent architecture that closes the loop on incidents closes the loop on cost.

**Two core value propositions for leadership**:
- **Cost Attribution** — "Which team, which service, and which deployment caused this week's 23% cost increase?" answered in seconds, not days.
- **Budget Guardianship** — Month-end surprise bills replaced by real-time alerts and automated low-risk remediation.

| Dimension          | Current State                                      | MVP Target (Phase 1)                                   | Future (Phase 2–3)                                         |
| ------------------ | -------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| Cost Visibility    | Monthly Grafana dashboard, team manually reviews   | Real-time cost anomaly alert with RCA correlation      | Autonomous budget-bounded scheduling                       |
| Attribution        | Pie chart by account; cannot trace to service/PR   | Cost Entity Graph: Cluster → Namespace → Team → Budget | Deployment-level attribution linked to release events      |
| Idle Resource      | Manual review, low-priority, rarely acted on       | Daily agent scan: idle CPU < 5% → rightsizing report   | Auto-execute low-risk optimisations (dev off-hours scale)  |
| Budget Enforcement | Finance spreadsheet → email → engineer (lag weeks) | Threshold alert routed via same pipeline as SLO alerts | Budget-as-Code in GitOps repo; agent reads policy directly |
| Reporting          | FinOps team manually aggregates per-team costs     | Monthly agent drafts chargeback statements per team    | Auto-distributed to team leads; FinOps team reviews only   |

**Architecture — Three Agents, Three Time Granularities**:

```
Real-time Agent (minute-level):
  Cloud Billing API (Azure Cost Management / Aliyun Cost Center)
    → OpenTelemetry Collector (custom billing receiver)
    → Unified storage (SLS / Prometheus) — label-aligned with K8s namespace/team
    → Cost anomaly detected
    → Correlate: which Deployment event / HPA behaviour triggered the spike?
    → Output: "15:32 hk-payment-service scale-out caused $400 overspend this hour"
    → Teams alert with [Approve rollback] / [Accept cost] button

Daily Agent (08:00 AM):
  → Scan previous day: CPU < 5% sustained 4h = idle candidate
  → Generate rightsizing recommendations with utilisation evidence
  → Push report to Teams channel / email
  → Phase 2: auto-execute low-risk actions (dev namespace off-hours scale-down)

Monthly Agent (1st of month):
  → Budget vs actuals, split by team
  → Forecast month-end trend
  → Draft per-team cost chargeback statements
  → Requires human review before distribution
```

**Progressive Autonomy Model**:

```
Phase 1 — Augmented FinOps (MVP):
  Agent generates recommendations → human clicks to execute
  "Recommend downgrading 3× D4s_v3 in dev-namespace → projected saving $800/month"

Phase 2 — Supervised Automation (months 3–6):
  Low-risk actions auto-execute with Teams notification + undo window
  Auto-delete orphaned PVCs unused > 30 days
  Auto-scale-down dev environment 22:00–08:00

Phase 3 — Autonomous FinOps (year 1+):
  Agent self-manages within budget policy boundaries (OPA / Sentinel)
  Automated Spot/On-Demand mixed scheduling to hit cost targets
```

**AI Capability Boundary (MVP scope)**:
- ✅ Billing data ingested as fourth telemetry type (alongside metrics, logs, traces)
- ✅ Cost Entity Graph: cost attributed to Cluster → Namespace → Deployment → Team → Budget
- ✅ Real-time cost anomaly detection correlated with deployment events
- ✅ Daily idle resource scan with evidence-backed rightsizing recommendations
- ✅ Human-in-the-Loop for all execution actions (Phase 1)
- ❌ Auto-execution of cost optimisations — Phase 2 (trust must be earned through Phase 1 visibility first)
- ❌ Cross-cloud cost correlation (Azure + Aliyun unified) — requires label standardisation first

> **Note — DevOps Knowledge Assistant**: Conversational KB lookup and operational status queries ("pipeline X 的状态？") are delivered as part of UC1 L3 — the same Teams Bot interface, KB retrieval, and tool-call layer. No separate UC is required; UC1 L3 already covers this capability scope.

---

## 4. Capability Architecture

### Layered Architecture

![[0 - Inbox/ai-ops/assets/aiops-architecture.excalidraw|1000]]

### Cross-Cutting Capabilities (shared by all orchestrators)

| Capability             | Description                                       | Compliance Requirement |
| ---------------------- | ------------------------------------------------- | ---------------------- |
| Human-in-the-Loop      | Approval gate before prod changes                 | Mandatory              |
| Audit Trail            | Log AI input/output/decision for every action     | Mandatory              |
| Tool Permission (RBAC) | Agents operate on least-privilege principle       | Mandatory              |
| ITIL Compliance        | All prod changes follow change management process | Mandatory              |

---

### AI Safety Model (Non-Determinism Risk)

LLMs introduce a class of risk that classical software does not have: **the same incident may trigger different reasoning paths, tool selections, and recommendations on different runs**. This must be treated as an operational risk, not a bug to fix.

**Reasoning Freedom vs Execution Freedom**

| Layer | Policy |
|---|---|
| Diagnosis agents | Read-only by default; no write access |
| Mutable actions (restart, rollback) | Must pass Policy-as-Code check before execution |
| Production actions | Scoped by namespace, criticality, and reversibility; mandatory Human-in-the-Loop |
| Dangerous tool families | Allowlisted explicitly — never exposed generically |

**AI Agent Observability (monitor the agent as a workload)**

The AIOps agent itself must be observable. Monitor for:

- Abnormal variance in tool-call paths for the same incident class
- Loops, stuck sessions, token spikes, repeated denied actions
- RCA summaries lacking evidence links to logs/metrics/traces (evidence-free outputs are invalid)
- Prompt injection or data exfiltration indicators in tool inputs/outputs

**Evidence-Linked RCA Requirement**

Every AI-generated RCA output must reference at least one data source (log line, metric value, trace span, or deployment event). Conclusions without evidence links must be flagged as low-confidence and escalate to human review.

**Session Audit Standard**

Every agent session must record: prompt, tool calls, parameters, model version, evidence sources, action taken, and token cost. This is both a compliance requirement and a quality feedback loop.

**Confidence Threshold & Fallback**

When evidence is weak, conflicting, or incomplete, the agent must escalate rather than guess. Define per-use-case thresholds (e.g., L1: auto-publish if evidence ≥ 2 signals; otherwise escalate to L2).

---

### AppSec Signal Integration

AIOps **consumes** AppSec tooling outputs as signals and policy gates — it does not replace them. Security findings must be normalized into the same topology as metrics and deployment events.

**Required normalization fields per finding**:
```
service | repo | image_digest | env | endpoint | severity | exploitability |
internet_exposed | first_seen | last_seen | release_id
```

**Integration map**:

| Practice | AIOps Integration Point | Layer |
|---|---|---|
| Snyk Code / SAST | PR + build findings linked to release-id | Release Guardrail, Preventive Inspection |
| Snyk IaC / OSS | Dependency risk, policy-breach evidence | Release Guardrail, Governance Gate |
| Snyk Container Scanning | Image digest CVE delta, base-image drift | Signal Layer, Analytics, Deploy Gate |
| DAST | Canary post-deploy: exposed endpoints, auth regressions | Release Guardrail, Incident Triage |
| Pentest / Red-team | Curated attack-path KB, compensating control gaps | Context Layer, Preventive Inspection |

Once normalized, the agent can answer: *"Did this release introduce a new critical vulnerability? Is the current incident correlated with an unresolved DAST failure? Should the rollout block because the canary is both unhealthy and newly exploitable?"*

> Security scanners remain **signal producers and policy inputs**. AIOps summarizes and correlates; the scanner and policy layer provide the hard gate.

---

### AI Model Observability (Scope Boundary)

As backend services integrate LLMs (e.g., Copilot, Azure OpenAI), AIOps treats LLM calls **as any other observable service dependency** — not as a business logic validator.

**AIOps is responsible for (operational health)**:

```
Backend Service → LLM Call
                    ↓
AIOps Signal Layer:
  • Latency P99 / error rate / timeout rate
  • Token consumption trend (cost anomaly detection)
  • Security filter trigger rate (prompt injection attempts)
  • Circuit breaker / fallback events
  • Availability of LLM provider endpoint
```

**AIOps is NOT responsible for**:

| Concern | Correct Owner |
|---|---|
| Model answer accuracy / hallucination rate | Application team + AI Platform (LLMOps) |
| Business-domain correctness of AI outputs | Domain teams with ground-truth evaluation sets |
| Content policy configuration (allow/deny) | Application team + Compliance |

> **Scope rule**: If the question is *"is the AI service running?"* → AIOps. If the question is *"is the AI answer correct?"* → LLMOps / AI Platform. Keeping this boundary explicit prevents AIOps from becoming an accuracy-evaluation system it is not equipped to be.

---

## 5. Dependency Map & Build Order

```
Already Available:
  ✅ Pipeline AI L1
  ✅ Release Orchestration 1.0
  ✅ Copilot Studio Bot (base)
  ✅ Confluence KB (unstructured)

Phase 1 — Foundation (Q2/Q3, must do first):
  Jenkins Agent (standardized)     ← ALL use cases depend on this
  Service Catalog MVP              ← L2 owner routing + Release Orchestration service list
  Document Reorg                   ← DevOps Chatbot quality prerequisite
  Monitoring Signal Normalization  ← UC2 prerequisite (New relic + K8s event schema)

Phase 2 — First Deliveries (Q3):
  Pipeline AI L2                   requires: Jenkins Agent + New relic access
  Release Orchestration 2.0 MVP    requires: Jenkins Agent + Jira/Git Agent
  UC2 Monitoring RCA MVP           requires: New relic access + K8s read + Signal Normalization
  UC3 FinOps Phase 1 — Cost Observability  requires: Cloud Billing API access + label alignment

Phase 3 — Deep Capabilities (Q4):
  Pipeline AI L3                   requires: KB Agent + L2 accumulated case history
  UC2 Auto-Fix (non-prod)          requires: K8s Agent + Policy-as-Code + UC2 RCA MVP
  K8s Agent                        requires: AliCloud/Azure permissions
  Migration AI validation auto     requires: K8s Agent
  UC3 FinOps Phase 2 — Daily Agent + Cost RCA   requires: UC3 Phase 1 + K8s read

Phase 4 — Platform (2027+):
  AIOps Dashboard
  UC2 Auto-Fix (prod, HitL)        requires: UC2 Auto-Fix non-prod proven + ITIL gate
  Smart Release Scheduling         requires: Service Catalog mature + historical data
  Incident auto-routing            requires: Service Catalog + CMDB-level data
  UC3 FinOps Phase 3 — Autonomous execution  requires: Phase 2 proven + Policy-as-Code
  Service Catalog v2
```

**Critical dependency chains**:

```
Document Reorg ──────────────────────────────→ ChatBot quality
Service Catalog ────────────────┬───────────→ L2 owner accuracy
                  └──────────────────────────→ Release Orchestration service management
Jenkins Agent ──────────────────┬───────────→ Pipeline AI L2/L3
                  └──────────────────────────→ Release Orchestration 2.0
Signal Normalization ───────────┬───────────→ UC2 RCA accuracy
K8s Agent ──────────────────────┴───────────→ UC2 Auto-Fix execution
```

---

## 6. Quarterly Roadmap

| Quarter   | Deliverable                                                       | Track            | Dependencies                                             | Before (Current State)                                                                  | After (Goal Achieved)                                                                                                | Status      |
| --------- | ----------------------------------------------------------------- | ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------- |
| Q2 2026 ✅ | Pipeline AI L1 (live)                                             | DevOps Drive     | —                                                        | Pipeline failure → manual log hunting, 15–60 min per incident                           | Auto RCA archived to Jenkins build description, < 30s                                                                | Done        |
| Q2 2026   | Jenkins Agent + Service Catalog MVP                               | Foundation       | —                                                        | No standardized agent interface; service ownership tracked manually                     | All use cases call a unified Jenkins Agent; service owner lookup available                                           | Plan        |
| Q2 2026   | Release Orchestration 2.0 MVP (TBD)                               | Cross-team Drive | Jenkins/Jira/Git Agent                                   | Release requires manual Jira creation, branch setup, and pipeline trigger               | Team 预设编排 + AI Guardrail + 一键推进 with CI and environment health pre-gate                                              | Plan        |
| Q3 2026   | Document Reorg                                                    | Foundation       | —                                                        | 50+ page docs per page, low RAG recall, keyword mismatch                                | Atomic pages < 500 words with tags; UC1 L3 Bot retrieval quality significantly improved                              | In-progress |
| Q3 2026   | UC3: FinOps Cost Observability (billing data + Cost Entity Graph) | Platform Drive   | Cloud Billing API access + K8s namespace label alignment | Cloud costs visible only as account-level pie chart; cannot trace spike to service/team | Billing ingested as 4th telemetry type; Cost Entity Graph attributes cost to Cluster → Namespace → Team → Budget     | Plan        |
| Q3 2026   | Pipeline AI L2 (New relic → Teams proactive alert)                | DevOps Drive     | Jenkins Agent, New relic                                 | Repeated failures go unnoticed until engineers discover them manually                   | ≥ 3 failures in 30 min auto-triggers Teams @mention with pattern summary                                             | Plan        |
| Q3 2026   | Init AIOps Dashboard                                              | Platform Drive   | Release Orchestration/Jenkins Agent                      | Check Ops status everywhere                                                             | Unified observability panel: agent status, event trends, and cost visibility                                         | Plan        |
| Q4 2026   | UC2: Monitoring RCA MVP (New relic + K8s → evidence-linked RCA)   | DevOps Drive     | Monitor access + K8s read + Signal normalization         | Issues discovered reactively; RCA takes 30–60 min of manual correlation                 | AI-generated evidence-linked RCA in < 60s; correlated across logs, metrics, deployments                              | Plan        |
| Q4 2026   | Pipeline AI L3 (deep diagnosis via Teams Bot)                     | DevOps Drive     | KB Agent                                                 | Complex incidents require manually correlating logs across multiple systems             | Bot synthesizes KB + logs in multi-step reasoning; outputs evidence-linked RCA                                       | Plan        |
| Q4 2026   | UC2: Auto-Fix non-prod (pod restart / scale)                      | DevOps Drive     | K8s Agent + UC2 RCA MVP                                  | Engineers manually execute remediation after RCA                                        | Known failure classes auto-remediated in non-prod; auto-resolved rate > 40%                                          | Plan        |
| Q4 2026   | Release Guardrail (full) + K8s health check                       | Cross-team Drive | K8s Agent                                                | No systematic security or health check before release; issues surface post-deploy       | Pre-release auto-check of CVE / K8s health / DAST; security regressions auto-blocked                                 | Plan        |
| Q4 2026   | Migration AI validation automation                                | DevOps Drive     | K8s Agent                                                | Migration validation relies on manual item-by-item review; slow and error-prone         | AI auto-compares pre/post-migration environment state and generates a diff report                                    | Plan        |
| Q4 2026   | UC3: FinOps Daily Agent (idle resource scan + cost RCA)           | Platform Drive   | UC3 Cost Observability (Phase 1)                         | Idle resources identified manually; cost spikes traced days after the fact              | Daily rightsizing report pushed to Teams; real-time cost spike correlated to deployment event in < 2 min             | Plan        |
| 2027+     | Smart Release Scheduling                                          | Cross-team Drive | Service Catalog mature                                   | —                                                                                       | AI recommends optimal release windows based on historical data; reduces queue conflicts                              | Plan        |
| 2027+     | Fully functional AIOps Dashboard                                  | Platform Drive   | All agents stable                                        | —                                                                                       | Unified observability panel: agent status, event trends, and cost visibility                                         | Plan        |
| 2027+     | Service Catalog v2                                                | Platform Drive   | —                                                        | —                                                                                       | Full CMDB-level service graph with dependency analysis and auto-routing support                                      | Plan        |
| 2027+     | UC3: FinOps Autonomous Execution (budget-bounded self-management) | Platform Drive   | UC3 Phase 2 proven + Policy-as-Code (OPA/Sentinel)       | Cost optimisation requires manual approval for every action                             | Agent self-manages within budget policy boundaries; Spot/On-Demand mixed scheduling auto-adjusts to hit cost targets | Plan        |
| 2027+     | Incident auto-routing                                             | Platform Drive   | CMDB-level data                                          | —                                                                                       | Incidents auto-classified and routed to the correct team; reduces manual triage                                      | Plan        |

---

## 7. Support Requirements (Q2/Q3 Focus)

> The following items represent the external support and collaboration needed to deliver Q2/Q3 milestones. All stakeholders are requested to confirm ownership, current status, and action plan for the items they are responsible for.

### 7.1 Resource & Staffing

| #   | Resource Need                                | Related Deliverable           | Estimated Size | Quarter | Status | Action Plan |
| --- | -------------------------------------------- | ----------------------------- | -------------- | ------- | ------ | ----------- |
| R1  | Service Catalog MVP — initial data entry     | L2 @mention accuracy, Release Orchestration | 0.5 FTE        | Q2      | TBC    |             |
| R2  | Full stack Developer                         | Release Orchestration 2.0 MVP | 2 FTE          | Q2      | TBC    |             |
| R3  | DevOps                                       | Jenkins Agent                 | 1 FTE          | Q2      |        |             |
| R4  | Document Reorg — dedicated owner / tech lead | DevOps Chatbot MVP           | 1 FTE (or TL)  | Q3      | TBC    |             |
| R5  | DevOps                                       | Pipeline AI L2                | 0.5 FTE        | Q3      |        |             |
| R6  | Full stack Developer                         | Init AIOps Dashboard          | 1 FTE          | Q3      |        |             |

### 7.2 Access & Permissions

| #   | Access / Permission Required                  | Purpose                                  | Request Target / Owner | Target Quarter | Status | Action Plan |
| --- | --------------------------------------------- | ---------------------------------------- | ---------------------- | -------------- | ------ | ----------- |
| A1  | New relic — Jenkins pipeline log query access    | Pipeline AI L2 trigger mechanism         | (TBD)                  | Q2             | TBC    |             |
| A2  | AliCloud / Azure K8s cluster read-only access | K8s Agent health check (Q3 pre-research) | (TBD)                  | Q3             | TBC    |             |
| A3  | Jira API Token / Service Account              | Release Orchestration 2.0 auto-create Jira cards | (TBD)                  | Q2             | TBC    |             |
| A4  | GitHub API — cross-org repo read/write access | Release Orchestration 2.0 auto-create branches | (TBD)                  | Q2             | TBC    |             |

### 7.3 Cross-Team Collaboration

| #   | Collaboration Need                                                                       | Counterpart Team / Contact | Related Deliverable           | Quarter | Status | Action Plan |
| --- | ---------------------------------------------------------------------------------------- | -------------------------- | ----------------------------- | ------- | ------ | ----------- |
| C1  | Confirm whether New relic currently indexes Jenkins pipeline logs                           | (TBD)                      | Pipeline AI L2                | Q2      | TBC    |             |
| C2  | Align Service MVP to serve both Release Orchestration 2.0 and L2                         | (TBD)                      | Release Orchestration 2.0 + Pipeline AI L2  | Q2      | TBC    |             |
| C3  | Define scope of Document Reorg — which Confluence spaces are in scope                    | (TBD)                      | DevOps Chatbot MVP           | Q2/Q3   | TBC    |             |
| C4  | Align ITIL change management flow — does Release Orchestration 2.0 auto-trigger require approval gate? | (TBD)                      | Release Orchestration 2.0 Release Guardrail | Q3      | TBC    |             |

### 7.4 Infrastructure & Environment

| #  | Infrastructure Need                                                       | Purpose                                   | Quarter | Status | Action Plan |
| -- | ------------------------------------------------------------------------- | ----------------------------------------- | ------- | ------ | ----------- |
| I1 | Jenkins Agent image standardization — unified toolset (gh cli, jq, etc.) | Jenkins Agent foundation (required by all use cases) | Q2 | TBC |    |
| I2 | Copilot Studio Bot — production deployment and approval process           | DevOps Chatbot MVP                       | Q3      | TBC    |             |
| I3 | AIOps runtime environment (K8s namespace or VM)                           | Orchestrator + Agent hosting              | Q3      | TBC    |             |

---

## 8. Risk Register

| # | Risk | Impact | Likelihood | Mitigation                                                                                            |
|---|---|---|---|---|
| R1 | Copilot Studio RAG is black-box — chunk strategy uncontrollable | ChatBot answer quality unpredictable | High | Document reorg first; migrate to custom RAG if quality unacceptable                                   |
| R2 | No CMDB / Service Catalog | L2 @mentions wrong person; Release Orchestration service data messy | High | Build Service Catalog MVP as Phase 1 foundation                                                       |
| R3 | Release Orchestration 2.0 resource constraint (side project) | Slow delivery, blocks Cross-team Drive | Medium | Independent Orchestrator design — does not block Pipeline AI                                          |
| R4 | Single LLM dependency (GitHub Copilot Enterprise) | Policy change = platform blocked | Medium | Decouple LLM calls at architecture layer; provider-swappable                                          |
| R5 | New relic access/permissions for L2 | L2 trigger mechanism blocked | Medium | Confirm New relic query permissions early; fallback: Jenkins polling                                     |
| R6 | Document reorg effort underestimated | ChatBot quality remains poor | Medium | Treat as dedicated project, not side task                                                             |
| R7 | Release Orchestration inter-service dependency unknown | 2.0 cannot auto-sequence multi-service releases | Low (scoped out) | Accepted — human decides order in 2.0, auto-resolve in 3.0                                            |
| R8 | LLM output variance causes incorrect remediation actions | Wrong rollback or block decision in prod | Medium | Evidence-linked RCA requirement; confidence threshold + mandatory HitL for all prod actions           |
| R9 | Agent prompt injection / data exfiltration via tool inputs | Security breach, credential leak | Medium | AI Agent Runtime Security monitoring; tool input/output audit; allowlist-only dangerous tool families |
| R10 | AppSec signals (Snyk/DAST) not normalized → cannot enter AIOps decision chain | Release Guardrail misses security regressions | Medium | Define standard finding schema early (service/image/env/severity fields); normalize before ingestion  |
| R11 | UC2 Auto-Fix executes incorrect remediation (false positive RCA) | Wrong pod restart or scale causes outage | Medium | Restrict auto-fix to pre-approved, reversible action classes; mandatory post-fix validation; non-prod only in MVP |
| R12 | Monitoring signal normalization incomplete → RCA missing key signals | AI generates low-confidence or misleading RCA | Medium | Define signal schema (log + metric + deployment event) as Phase 1 prerequisite; confidence threshold gates auto-fix |
| R13 | Cloud billing label misalignment → cost attribution fails | FinOps agent cannot trace cost to service or team; Cost Entity Graph is useless | High | Enforce label alignment (namespace/service/team) as UC3 Phase 1 prerequisite — wire billing data only after labels verified; block Phase 2 automation until attribution accuracy validated |

---

## 9. Governance Principles

1. **AI Suggests, Human Approves** — No AI-autonomous execution of production changes
2. **Progressive Rollout** — Validate within DevOps team first, then expand to Delivery teams
3. **Full Audit Trail** — Every AI decision logs: input, output, reasoning, actor
4. **ITIL Compliance** — All production changes follow established change management process
5. **Least Privilege** — Agents are granted only the permissions required for their specific use case
6. **Fail Safe** — If AI is unavailable, workflows fall back to manual (1.0 behavior)
7. **Evidence-Linked Outputs** — AI-generated RCA and recommendations must cite data sources; evidence-free outputs are escalated, not published
8. **AIOps ≠ LLMOps** — AIOps monitors AI services as operational workloads; model accuracy and business correctness are owned by application teams and AI Platform

---

## 10. Open Questions

- [ ] Does New relic currently index Jenkins pipeline logs? (determines L2 trigger feasibility)
- [ ] What is Release Orchestration 2.0 resourcing plan? (dedicated sprint vs side project)
- [ ] Who owns the Document Reorg project? (prerequisite for ChatBot quality)
- [ ] K8s Agent permissions — AliCloud/Azure access approval process?
