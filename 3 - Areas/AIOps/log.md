# Log

Append-only chronological record of all wiki operations.

Each entry format: `## [YYYY-MM-DD] operation | Title`

Operations: `ingest` · `query` · `lint`

Quick grep: `grep "^## \[" log.md | tail -10`

---

## [2026-04-13] init | Wiki initialized

Directory structure and schema created. `CLAUDE.md`, `index.md`, and `log.md` bootstrapped.

## [2026-04-13] ingest | Building AI Into Observability Workflows (Grafana, 2025-06-07)

Ingested YouTube talk by Yasir Ekinci (Grafana). Created 11 new pages:

**Source:** `wiki/sources/[2025-06-07] Building AI Into Observability Workflows`

**Entities (4):**
- `wiki/entities/Grafana`
- `wiki/entities/Yasir Ekinci`
- `wiki/entities/Grafana MCP Server`
- `wiki/entities/Grafana Assistant`

**Concepts (6):**
- `wiki/concepts/Model Context Protocol`
- `wiki/concepts/LLM Tool Calling`
- `wiki/concepts/LLM Agent`
- `wiki/concepts/Multi-Agent Architecture`
- `wiki/concepts/LLM Evaluation`
- `wiki/concepts/Token Noise Reduction`

No contradictions with existing pages (first ingest). `index.md` updated.

## [2026-04-13] ingest | Start with Grafana AI Assistant and ask your observability stack anything (Grafana, 2026-04-09)

Ingested YouTube product demo by Grafana. Created 2 new pages, updated 2 existing pages:

**Source:** `wiki/sources/[2026-04-09] Start with Grafana AI Assistant and ask your observability stack anything`

**New Concepts (1):**
- `wiki/concepts/Infrastructure Memory`

**Updated Entities (1):**
- `wiki/entities/Grafana Assistant` — added Capabilities table, Infrastructure Memory overview, PromQL generation, status update (private preview → public docs), second source link, roadmap item marked shipped

No contradictions with existing pages. Roadmap item "Grafana knowledge graphs" from first source confirmed shipped. `index.md` updated.

## [2026-04-13] meta | CLAUDE.md schema finalized

Full wiki schema document added to `CLAUDE.md`. Defines directory layout, page conventions (frontmatter, wikilinks, naming), workflows (ingest, query, lint), callout conventions, and index/log formats.

## [2026-04-13] ingest | All in One: How to Build an End-to-End Observable System (Alibaba Cloud)

Ingested Alibaba Cloud blog post on observability history and architecture. Created 7 new pages, updated 1 existing page:

**Source:** `wiki/sources/[2026-04-13] All in One How to Build an End-to-End Observable System`

**Entities (3):**
- `wiki/entities/Alibaba Cloud ARMS`
- `wiki/entities/Prometheus`
- `wiki/entities/OpenTelemetry`

**Concepts (3):**
- `wiki/concepts/Observability Three Pillars`
- `wiki/concepts/Application Performance Monitoring`
- `wiki/concepts/Root Cause Analysis`

**Updated Entities (1):**
- `wiki/entities/Grafana` — added "Role as Visualization Standard" section (Alibaba Cloud independently confirms Grafana as de-facto dashboard standard); added source reference; bumped sources count to 3

No contradictions with existing pages. Alibaba Cloud's characterization of Grafana as the unified dashboard standard is consistent with Grafana's own positioning. `index.md` updated.

## [2026-04-13] ingest | Tianchi 2025 AIOps Fault Localization Challenge (Alibaba Cloud)

Ingested GitHub repository README for the Tianchi 2025 AIOps contest. Created 2 new pages:

**Source:** `wiki/sources/[2026-04-13] Tianchi 2025 AIOps Fault Localization Challenge`

**Concepts (1):**
- `wiki/concepts/AIOps`

No contradictions with existing pages. Contest formalizes RCA as a benchmarked ML task using ARMS/SLS backend. `index.md` updated.

## [2026-04-14] ingest | Apsara Conference Insights: Rebuild Observability — Cloud Monitor 2.0 and a New AIOps Paradigm (Alibaba Cloud)

Ingested Alibaba Cloud Apsara Conference blog post on Cloud Monitor 2.0 architecture. Created 6 new pages, updated 5 existing pages:

**Source:** `wiki/sources/[2026-04-14] Apsara Conference Insights Rebuild Observability`

**New Entities (3):**
- `wiki/entities/Alibaba Cloud SLS` — Simple Log Service; unified 5-signal observability data backbone; exabyte-scale; open protocols; 50%+ cost reduction vs self-managed
- `wiki/entities/Alibaba Cloud Cloud Monitor` — Cloud Monitor 2.0; large-model-native AIOps platform; 3-layer architecture (SLS → UModel → AIOps Agent)
- `wiki/entities/UModel` — Unified Model; 6 domains, 1,800+ entity models; binds Data + Knowledge + Action; enables digital SRE vision

**New Concepts (2):**
- `wiki/concepts/Computing Pushdown` — LLM orchestrates data operators at storage engine; >90% token reduction; complement to Token Noise Reduction
- `wiki/concepts/VibeOps` — natural language intent-driven IT operations; end-state AIOps vision; coined by analogy with Vibe Coding

**Updated Pages (5):**
- `wiki/concepts/AIOps` — added tipping point framing (3 factors), two core engineering challenges, AIOps Agent 4-tier architecture, new relationships; sources 2→3
- `wiki/concepts/Root Cause Analysis` — added UModel topology-guided RCA section with demo walkthrough; new relationships; sources 2→3
- `wiki/concepts/Token Noise Reduction` — added Computing Pushdown comparison table (input-side vs output-side); clarified complementary nature; sources 1→2
- `wiki/entities/Alibaba Cloud ARMS` — added Cloud Monitor 2.0 migration note; ARMS APM capabilities remain, storage converges to SLS; sources 1→2 (corrected: was 1, now 2)
- `wiki/concepts/Model Context Protocol` — added Alibaba 3-layer observability MCP toolkit; layered design principle for agent tool overload; comparison with Grafana MCP Server; sources 1→2

No contradictions with existing pages. ARMS migration into Cloud Monitor 2.0 is additive context (ARMS previously described as standalone; now clarified as component converging into unified platform). `index.md` updated.

## [2026-04-14] ingest | AI-powered observability: picking up where AIOps failed

**Source:** Logz.io / CNCF blog by [[3 - Areas/AIOps/wiki/entities/Asaf Yigal]], published 2024-10-28  
**Summary page:** `wiki/sources/[2024-10-28] AI-powered observability picking up where AIOps failed`

### New pages created
- `wiki/sources/[2024-10-28] AI-powered observability picking up where AIOps failed` — source summary
- `wiki/entities/Asaf Yigal` — Logz.io co-founder/CPO; author
- `wiki/entities/Logz.io` — AI-powered observability platform

### Pages updated
- `wiki/concepts/AIOps` — added "Why AIOps Failed" section (org resistance, not tech failure); added AIOps vs. AI-powered observability comparison table; sources 3→4
- `index.md` — new source + two new entities added

### Key new knowledge
- AIOps adoption failure was organisational (process resistance), not technological — this nuance was absent from the prior AIOps page
- Sharp distinction between AI-first AIOps (exhaustive telemetry ingestion, may lack unified dashboard) and observability-first AI-enhanced tooling (selective telemetry, AI as enhancement layer)
- GenAI natural language interfaces as the democratisation lever for non-technical users

No contradictions with existing pages. The "AIOps failed" framing is consistent with the Tipping Point section already in `AIOps.md` (which described pre-LLM AIOps as "long stalled by rigid rule engines, data silos, and prohibitive customization costs") — this source adds the human/organisational dimension.

## [2026-04-14] ingest | Now what? Kubernetes troubleshooting with AI?

**Source:** CNCF blog by [[3 - Areas/AIOps/wiki/entities/Emin Alemdar]], published 2024-07-11  
**Summary page:** `wiki/sources/[2024-07-11] Now what? Kubernetes troubleshooting with AI?`

### New pages created
- `wiki/sources/[2024-07-11] Now what? Kubernetes troubleshooting with AI?` — source summary
- `wiki/entities/K8sGPT` — CNCF Sandbox K8s diagnostics tool
- `wiki/entities/Emin Alemdar` — CNCF Ambassador; author

### Pages updated
- `wiki/concepts/LLM Agent` — added K8sGPT as second concrete LLM agent example alongside Grafana Assistant; sources 1→2
- `index.md` — new source + two new entities added

### Key new knowledge
- K8sGPT: CNCF Sandbox project bridging the K8s complexity gap via LLM-powered diagnostics in plain English
- Two-phase design (scan without AI / explain with AI) keeps costs opt-in
- Operator mode enables continuous ambient monitoring — consistent with proactive observability trend seen across Grafana (Infrastructure Memory) and Alibaba Cloud (intelligent inspection)
- Data anonymisation pattern addresses enterprise concerns about sending infrastructure data to external LLMs
- K8sGPT explicitly positioned as lightweight alternative to GPU-heavy AIOps tooling

No contradictions with existing pages.

## [2026-04-14] ingest | Is AIOps the Future of Operations? — Adobe KubeCon Talk

**Source:** KubeCon + CloudNativeCon 2026 talk by Danilo Banjac & Iveri Prangishvili (Adobe)
**Raw file:** `Is AIOps the Future of Operations? Real Use Cases From the Tre... Iveri Prangishvili & Danilo Banjac.md`

### New pages created
- `wiki/sources/[2026-04-14] Is AIOps the Future of Operations?.md`
- `wiki/entities/Danilo Banjac.md`
- `wiki/entities/Iveri Prangishvili.md`
- `wiki/entities/Adobe.md`
- `wiki/entities/Splunk.md`
- `wiki/concepts/Progressive Autonomy.md`

### Pages updated
- `wiki/concepts/AIOps.md` — added Adobe production results section; autonomy spectrum table; progressive autonomy link (sources: 4→5)
- `wiki/concepts/LLM Evaluation.md` — added LLM-as-judge pattern; golden dataset concept; Adobe's Slack-thread eval methodology (sources: 1→2)
- `wiki/concepts/Root Cause Analysis.md` — added Adobe on-call agent flow; curated metric reports lesson; RAG chunk size lesson (sources: 3→4)
- `wiki/concepts/Multi-Agent Architecture.md` — added Adobe agent marketplace section with YAML/MCP/Azure architecture; routing strategy (sources: 1→2)
- `index.md` — new source, 4 new entities, 1 new concept
- `log.md` — this entry

### Key insights from this source
- First enterprise end-user practitioner talk in the wiki (Alibaba/Grafana are vendors)
- **71% RCA accuracy** — measurable production benchmark
- **Autonomy spectrum**: fully autonomous fails; fully deterministic doesn't scale; middle ground (curated reports) works
- **Progressive Autonomy** formalized as a staged deployment model (new concept page)
- **LLM-as-judge** at production scale using real Slack incident threads, not synthetic test cases
- **80% of effort** in tools and knowledge bases — not agent runtime or model selection
- **Chunk size** (~5K tokens) matters critically for RAG-backed knowledge bases
- Fully automated golden-dataset self-improvement was tried and failed — human curation checkpoint required

No contradictions with existing pages. Adobe's autonomy spectrum finding is consistent with Grafana's multi-agent specialization lesson and Alibaba's Computing Pushdown philosophy.

## [2026-04-14] ingest | Fix Production Rollouts on the Fly With Agentic AIOps (Carlos Sanchez, Adobe & Kevin Dubois, IBM)

**Source:** KubeCon + CloudNativeCon talk, published 2025-11-25
**Raw file:** `Fix Production Rollouts on the Fly With Agentic AIOps - Carlos Sanchez, Adobe & Kevin Dubois, IBM.md`

### New pages created (6)

- `wiki/sources/[2025-11-25] Fix Production Rollouts on the Fly With Agentic AIOps` — source summary
- `wiki/entities/Carlos Sanchez` — Adobe Principal Scientist; creator of Argo Rollouts AI plugin
- `wiki/entities/Kevin Dubois` — IBM engineer; co-author of Quarkus K8s agent
- `wiki/entities/Argo Rollouts` — CNCF progressive delivery controller; AI plugin architecture documented
- `wiki/concepts/Progressive Delivery` — canary deployments, traffic shifting, analysis templates, AI enhancement
- `wiki/concepts/Self-Healing Systems` — full detect → rollback → diagnose → fix PR → re-deploy cycle; YOLO mode

### Pages updated (5)

- `wiki/concepts/LLM Agent` — added Argo Rollouts AI plugin as third concrete agent example; sources 2→3
- `wiki/concepts/Progressive Autonomy` — added YOLO mode section (auto-approve as autonomy ceiling); added second source; sources 1→2
- `wiki/concepts/Root Cause Analysis` — added canary-phase RCA section (Argo Rollouts AI plugin; simultaneous stable baseline advantage); sources 4→5
- `wiki/entities/Adobe` — added self-healing rollouts section (Sanchez track); lifecycle table; Carlos Sanchez to Key People; sources 1→2
- `index.md` — new source, 3 new entities, 2 new concepts

### Key new knowledge

- **Canary-phase RCA**: AI diagnoses failures at 10–30% traffic exposure, before the incident reaches full production — fundamentally different from post-incident RCA; simultaneous stable/canary baseline makes diagnosis cleaner
- **AI as fuzzy metric gate**: LLM confidence score replaces brittle PromQL success criteria; captures unknown unknowns that static thresholds miss entirely
- **Self-healing loop**: rollback → RCA narrative → GitHub Issue → coding AI generates fix PR (with test) → human approval → re-deploy; loop restarts
- **YOLO mode**: auto-approve coding AI PRs without human review — the theoretical ceiling of Progressive Autonomy; explicitly not recommended for production
- **Additive architecture**: AI plugin sits alongside existing analysis templates, not as a replacement; lowers adoption barrier
- **A2A protocol**: Agent-to-Agent protocol used for plugin-to-agent communication; emerging standard alongside MCP
- **Adobe's full AIOps lifecycle**: Carlos Sanchez's work (deployment pipeline) + Banjac/Prangishvili's work (incident response) = Adobe AIOps covers the complete software lifecycle

## [2026-04-18] query | AIOps design for Azure-to-AliCloud managed Kubernetes migration

Created synthesis page `wiki/synthesis/AIOps Design for Azure-to-AliCloud Managed Kubernetes` to answer a user query about:

- AIOps ecosystem components
- how AIOps evolves from observability to progressive autonomy
- how to design AIOps for a hybrid AKS + ACK estate using managed services, Jenkins, GitHub Actions, Splunk, ARMS, Cloud Monitor, and managed Grafana

Updated `index.md` with the new synthesis page.

No contradictions with existing pages. YOLO mode extends the Progressive Autonomy spectrum beyond Adobe's previously documented four stages — it is additive context, not a contradiction. The additive architecture principle (AI alongside PromQL, not replacing it) is consistent with the broader wiki theme of AI as enhancement rather than wholesale replacement.

## [2026-04-14] ingest | Intelligent Observability: The Foundation for Operating Smarter in the Age of AI (Alolita Sharma, KubeCon 2024-03-22)

**Source:** KubeCon + CloudNativeCon talk by [[3 - Areas/AIOps/wiki/entities/Alolita Sharma]] (CNCF), published 2024-03-22  
**Raw file:** `Intelligent Observability The Foundation for Operating Smarter in the Age of AI - Alolita Sharma.md`

> [!note] The raw capture is a YouTube video description only — no transcript available. Core value is definitional framing and terminology.

### New pages created (3)

- `wiki/sources/[2024-03-22] Intelligent Observability The Foundation for Operating Smarter in the Age of AI` — source summary
- `wiki/entities/Alolita Sharma` — CNCF engineer; popularised "Intelligent Observability" as a distinct stage before AIOps
- `wiki/concepts/Intelligent Observability` — qualitative + quantitative observability; AI models as first-class observable workloads; prerequisite for AIOps

### Pages updated (2)

- `wiki/concepts/AIOps` — added Intelligent Observability as the prerequisite stage in the definition section; added Alolita Sharma source link; added Intelligent Observability to relationships; sources 5→6
- `index.md` — new source, new entity, new concept added

### Key new knowledge

- **"Intelligent Observability" as a named stage**: classical telemetry → Intelligent Observability → AIOps is Sharma's formulated prerequisite chain
- **Qualitative vs quantitative distinction**: classical observability is purely quantitative (numbers); Intelligent Observability adds qualitative reasoning (what the numbers mean) — this maps directly to the LLM reasoning layer seen in Grafana Assistant and Alibaba Cloud Monitor 2.0
- **AI models as observable workloads**: next-gen platforms must treat AI applications as first-class observability targets, not just consumers of telemetry

No contradictions with existing pages. The prerequisite chain framing is consistent with Asaf Yigal's "observability-first AI enhancement" distinction and Alibaba Cloud's "Intelligent Observability is the first step of AIOps" framing.

## [2026-04-14] ingest | Rolling Out AIOps Without a Grand Vision (Matthew Liu, Michelin, 2025-12-17)

**Source:** Michelin IT blog by Matthew Liu, published 2025-12-17
**Raw file:** `Rolling Out AIOps Without a Grand Vision What We Did, What We Would Change.md`

### New pages created (5)

- `wiki/sources/[2025-12-17] Rolling Out AIOps Without a Grand Vision` — source summary
- `wiki/entities/Matthew Liu` — Michelin China IT architect; author of the retrospective
- `wiki/entities/Michelin` — enterprise case study: bottom-up grassroots AIOps adoption; MCP governance alignment
- `wiki/entities/Dify` — open-source low-code AI app builder used as AIOps demo engine and replaceable runtime
- `wiki/concepts/AIOps Exploration Charter` — new concept: learning-first, time-boxed AIOps adoption charter; 4 exploration objectives; two-channel use case discovery; Go/Expand/Stop decision point

### Pages updated (3)

- `wiki/concepts/AIOps` — added "Practitioner Adoption Dynamics" subsection under "Why AIOps Failed"; documented specific stakeholder resistance patterns (headcount fear, premature KPI fear); exploration charter as antidote; modular pattern governance approach; sources 6→7
- `wiki/concepts/Model Context Protocol` — added Michelin/Dify as third adoption case; "pattern-not-product" governance insight (MCP as stable contract enabling replaceable runtime); callout tip added; sources 2→3
- `index.md` — new source, 3 new entities, 1 new concept; last-updated stamp refreshed

### Key new knowledge

- **Grassroots vs vendor-driven AIOps**: first source in the wiki from an individual IT architect initiating AIOps without top-down mandate — contrasts with Alibaba (platform vendor), Adobe (large-scale programme), Grafana (product vendor)
- **Specific resistance patterns documented**: headcount fear, premature KPI fear, governance without scope — and concrete countermeasures for each
- **AIOps Exploration Charter as a named pattern**: learning-first, time-boxed charter with 4 exploration-oriented objectives before KPI commitments; the antidote to premature KPI discussions
- **Two-channel use case discovery**: external (vendor contract renewals, audits) + internal (ops process mining) — politically and practically motivated decomposition
- **"Pattern-not-product" governance**: MCP as stable contract means approving the interaction pattern rather than a fixed tool stack, enabling Dify to be replaced without re-approval
- **Self-serve as earned capability**: positioning self-serve exploration as a default entry point is a mistake; it only works for operationally mature teams after flagship pilot success
- **Dify + ServiceNow MCP**: working AIOps prototype buildable in a few hours — practical validation of MCP as a rapid demo enablement tool in enterprise settings

No contradictions with existing pages. The organisational resistance framing is consistent with Asaf Yigal's finding that AIOps failed due to org resistance (not tech). The learning-first charter approach is consistent with Adobe's Progressive Autonomy pattern — both advocate staged commitment with evidence before escalation.

## [2026-04-14] lint | Full wiki lint pass

### Issues Found and Fixed

**Missing stub pages (3 created):**
- `wiki/entities/CNCF.md` — referenced as `[[CNCF]]` in `Alolita Sharma.md` and `[2024-03-22]` source page; no page existed
- `wiki/concepts/Knowledge Graph.md` — referenced as `[[Knowledge Graph]]` in `Grafana Assistant.md` and `[2026-04-09]` source page; no page existed
- `wiki/concepts/Retrieval-Augmented Generation.md` — referenced as `[[Retrieval-Augmented Generation]]` in `Infrastructure Memory.md`; no page existed

**Broken wikilink (1 fixed):**
- `wiki/entities/Alibaba Cloud ARMS.md` — `[[Tianchi 2025 AIOps Fault Localization Challenge|...]]` was a broken short-form link (no date prefix, no path); corrected to `[[wiki/sources/[2026-04-13] Tianchi 2025 AIOps Fault Localization Challenge|...]]`

**Missing cross-reference (1 added):**
- `wiki/entities/Adobe.md` — described the staged 18-month on-call agent deployment but did not link to `[[Progressive Autonomy]]`; link added

**Duplicate source entry (1 fixed):**
- `wiki/concepts/AIOps.md` — `[[wiki/sources/[2025-12-17] Rolling Out AIOps Without a Grand Vision]]` appeared twice in the Sources section; duplicate removed

**Index updated:**
- Added `[[wiki/entities/CNCF]]`, `[[wiki/concepts/Retrieval-Augmented Generation]]`, and `[[wiki/concepts/Knowledge Graph]]` to index.md

**No contradictions found** between any pages.
**No orphan pages found** — all pages are linked from index.md and/or page bodies.

## [2026-04-21] ingest | 你的 OpenClaw 真的在受控运行吗？ (Alibaba Cloud, 2026-03-02)

**Source:** Alibaba Cloud WeChat article by 徐可甲, published 2026-03-02
**Raw file:** `你的 OpenClaw 真的在受控运行吗？.md`

### New pages created (4)

- `wiki/sources/[2026-03-02] 你的 OpenClaw 真的在受控运行吗？` — source summary
- `wiki/entities/OpenClaw` — open-source AI Agent runtime; "digital employee that never goes offline"
- `wiki/concepts/AI Agent Observability` — four-signal observability framework for AI Agent workloads
- `wiki/concepts/AI Agent Runtime Security` — layered Agent execution-time defence: sandbox, tool policy, ACP

### Pages updated (4)

- `wiki/concepts/Intelligent Observability` — added "AI Agents as Observable Workloads" section; concrete implementation of Sharma's framing; session audit as 4th signal; sources 1→2
- `wiki/concepts/LLM Agent` — added non-determinism and runtime security to Challenges; added "Production Observability Requirements" section; added OpenClaw to Related; sources 3→4
- `wiki/concepts/Observability Three Pillars` — added "AI Agents Introduce a Fourth Signal" subsection with four-signal table; sources 1→2
- `wiki/entities/Alibaba Cloud SLS` — added "AI Agent Observability Backend" section; four-signal SLS store mapping; SPL analysis capabilities; LoongCollector and ACS Sandbox relationships; sources 1→2 (corrected: now 2 post-update, then bumped further in next ingest)

### Key new knowledge

- **Session audit logs as a 4th observability signal**: classical three pillars (logs/metrics/traces) are insufficient for AI Agents because behaviour is non-deterministic. Session JSONL files recording every tool call, parameter, and token cost are the primary forensic data source for security audits — a signal unique to AI Agents with no classical observability equivalent.
- **"City wall vs. watchtower" framing**: runtime defences (tool policies, loop detectors, ACP) are the city wall; observability is the watchtower. They are complementary, not substitutable — policies can be misconfigured or bypassed via prompt injection.
- **Five AI Agent risk categories**: tool/skill abuse, data exfiltration, cost runaway, prompt injection, session hijack — and a sixth (SSRF/internal scan) from tool misuse.
- **ACP (Automation Control Plane)**: OpenClaw pattern requiring explicit user approval before executing high-risk tools — a concrete implementation of [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] at the tool level.
- **Multi-source correlation workflow**: OTEL alert → app logs (narrow scope) → session logs (reconstruct behaviour chain). Each pipeline is necessary; none is sufficient alone.

No contradictions with existing pages. The four-signal model is additive to the three-pillar model, not a replacement. The ACP approval pattern is consistent with Progressive Autonomy's "human checkpoint" principle from the Adobe case study.

## [2026-04-21] ingest | LoongCollector + ACS Agent Sandbox：构建 AI Agent 生产级运行平台 (Alibaba Cloud, 2026-04-06)

**Source:** Alibaba Cloud WeChat article by 林润骑（太业）, published 2026-04-06
**Raw file:** `LoongCollector + ACS Agent Sandbox：构建 AI Agent 生产级运行平台.md`

### New pages created (2)

- `wiki/sources/[2026-04-06] LoongCollector + ACS Agent Sandbox` — source summary
- `wiki/entities/ACS Agent Sandbox` — Alibaba Cloud K8s-based AI Agent sandbox with kernel-level isolation
- `wiki/entities/LoongCollector` — Alibaba Cloud open-source unified observability collector

### Pages updated (1)

- `wiki/entities/Alibaba Cloud SLS` — added LoongCollector and ACS Agent Sandbox to relationships section; bumped sources count

### Key new knowledge

- **Kernel-level isolation vs. container isolation**: ACS Agent Sandbox provides per-Agent independent kernel sandbox — stronger than standard K8s containers (which share the host kernel). Critical for preventing prompt-injection-driven host attacks.
- **Zero-intrusion observability injection**: ACS management plane automatically injects LoongCollector as a sidecar — no application code changes required. Demonstrates the "infrastructure provides observability" rather than "application instruments itself" pattern.
- **LoongCollector as Computing Pushdown at the collector tier**: edge-side SPL engine filters, transforms, and aggregates at the data source — the same Computing Pushdown principle from Cloud Monitor 2.0, applied one tier lower (collector vs. AIOps Agent orchestration).
- **500 MB/s single-core throughput**: LoongCollector's zero-copy architecture makes it practical to co-locate it with compute-intensive AI Agent workloads without performance impact.
- **Three-pipeline config pattern**: session-log + app-log + OTEL pipelines as a standard production template for any AI Agent deployed on ACS.

No contradictions with existing pages. LoongCollector's Computing Pushdown at the collector tier is consistent with (and additive to) the Cloud Monitor 2.0 Computing Pushdown at the AIOps Agent orchestration tier — different layers of the same architectural principle.

## [2026-04-21] ingest | 别再被 AI 反噬：DevOps 误用清单 (DevOps教练, 2025-09-10)

**Source:** DevOps教练 WeChat article (community contribution), published 2025-09-10
**Raw file:** `别再被 AI 反噬：DevOps 误用清单，守住你的技术栈安全边界.md`

### New pages created (2)

- `wiki/sources/[2025-09-10] 别再被 AI 反噬：DevOps 误用清单` — source summary
- `wiki/concepts/AI-Generated Code Safety` — five anti-patterns; "AI audits AI" technique; security-first prompts; 60/40 rule; automated validation pipeline

### Pages updated (2)

- `wiki/concepts/AI Agent Runtime Security` — added cross-reference to AI-Generated Code Safety (complementary security layers: IaC generation vs. Agent execution)
- `index.md` — new source + new concept added

### Key new knowledge

- **AI training data bias**: AI models trained on GitHub/StackOverflow examples optimise for "works", not "secure". Default IaC output is happy-path code unsuitable for production without explicit security constraints.
- **"AI audits AI" technique**: generate infra code, then immediately follow up with a paranoid security-engineer audit prompt. In a documented case surfaced 7 issues (2× Critical, 2× High, 2× Medium, 1× Low) missed in the initial output. This is a general prompt engineering pattern for any AI-generated high-stakes configuration.
- **60/40 rule**: AI handles 60% of typing; 100% of thinking stays with the engineer. Business-logic errors (e.g. autoscaling config adding $10K/month) are invisible to AI without context about actual traffic patterns.
- **Two-layer AI security taxonomy**: this source plus the OpenClaw sources together define a two-layer AI security model — (1) IaC security before deployment (AI-Generated Code Safety) and (2) Agent runtime security after deployment (AI Agent Runtime Security).
- **Automated safety gates**: GitHub Actions pattern blocking common AI mistakes at PR time (0.0.0.0/0, hardcoded secrets, `latest` tags, missing resource limits) — a CI/CD enforcement complement to prompt engineering.

No contradictions with existing pages. The "AI audits AI" technique is a novel prompt engineering pattern with no equivalent in existing wiki pages. The 60/40 rule's "human checkpoint required" principle is consistent with Adobe's Progressive Autonomy finding that fully automated golden-dataset self-improvement failed and required human curation.

## [2026-04-21] ingest | Agentic AI in DevOps: Architecting Autonomous Infrastructure (Harness, ~2025-02-11)

**Source:** Harness blog (Harness team), estimated publication 2025-02-11 (frontmatter date corrupted)  
**Raw file:** `Agentic AI in DevOps Architecting Autonomous Infrastructure.md`

### New pages created (3)

- `wiki/sources/[2025-02-11] Agentic AI in DevOps Architecting Autonomous Infrastructure` — source summary
- `wiki/entities/Harness` — DevOps platform; author of C-P-A Model and Three Horizons of Adoption
- `wiki/concepts/Three Horizons of Adoption` — Augmented Operator → Agent Swarms → Autonomous SRE; 3-timeframe adoption framework
- `wiki/concepts/Policy as Code` — Constitutional AI / deterministic policy engine as safety layer for probabilistic agents

### Pages updated (1)

- `wiki/concepts/Progressive Autonomy` — added Cross-Framework Alignment table (Adobe / Harness / Microsoft convergence); added Three Horizons, Human-in-the-Loop, Policy as Code to relationships; sources 2→4

### Key new knowledge

- **C-P-A Model**: formal four-layer anatomy of a DevOps agent (Perception → Memory → Reasoning → Tool Use); the most structured agent anatomy in the wiki
- **Three Horizons of Adoption**: H1 Augmented Operator (today) / H2 Agent Swarms (1–2 years) / H3 Autonomous SRE (3–5 years) — maps directly onto Progressive Autonomy and Human-in/on/out-of-the-Loop
- **Probabilistic Infrastructure**: the key philosophical challenge — agents are non-deterministic; requires deterministic guardrails (Policy as Code, contextual permissions, Black Box Recorder)
- **Policy as Code / Constitutional AI**: every agent action must pass through a deterministic policy engine before execution; this is the safety primitive that enables higher autonomy stages
- **Living Architecture Engine**: Observer Agents continuously scan cloud estate for infrastructure drift — extends the observability concept into the IaC governance domain

No contradictions with existing pages. The Three Horizons framework converges with Adobe's Progressive Autonomy and Microsoft's Human-in/on/out-of-the-Loop taxonomy — all three independently arrive at the same staged-autonomy principle.

## [2026-04-21] ingest | Agentic DevOps in Real Life (Brian Randell & Mickey Gousset, 2025-12-22)

**Source:** Live! 360 keynote (Microsoft Visual Studio YouTube), published 2025-12-22  
**Raw file:** `Agentic DevOps in Real Life – Build Faster, Ship Safer, Keep Humans in the Loop.md`

### New pages created (4)

- `wiki/sources/[2025-12-22] Agentic DevOps in Real Life` — source summary
- `wiki/entities/Brian Randell` — Microsoft consultant / ex-GitHub MVP; co-author of *Essential DevOps*
- `wiki/entities/Mickey Gousset` — GitHub Staff DevOps Architect; demo presenter
- `wiki/concepts/Human-in-the-Loop` — three-level HitL/HotL/HootL taxonomy; four collaboration patterns

### New entities (2)

- `wiki/entities/GitHub Copilot` — full entity page covering evolution timeline, agent types, Agent HQ, safety mechanisms, governance
- `wiki/entities/GitHub Advanced Security` — secret scanning, CodeQL, Copilot Autofix, MCP Server Allowlist; security statistics

### Pages updated (3)

- `wiki/concepts/Progressive Autonomy` — added Harness + Microsoft to Cross-Framework Alignment table; sources 2→4
- `wiki/concepts/Multi-Agent Architecture` — added GitHub Copilot agent marketplace section; Agent Swarms (Horizon 2); sources 2→4
- `wiki/concepts/Self-Healing Systems` — added Microsoft SRE Agent enterprise-scale example (10,500 hours saved, 7K+ incidents); sources 1→3

### Key new knowledge

- **Human-in/on/out-of-the-Loop taxonomy**: three named positions on the autonomy spectrum, with Microsoft explicitly confirming "nothing in Human-out-of-the-Loop yet" in 2025–2026 — calibrates realistic expectations
- **Productivity paradox**: developers *feel* faster but studies show 30% code acceptance rate; "paper pushing" illusion — trust must be domain-specific, not model-capability-driven
- **322% more privilege escalation paths** in AI-generated code: quantitative evidence that AI code generation systematically worsens security posture; GHAS is a necessary complement, not an option
- **"Found means fixed"**: Copilot Autofix closes the detection→remediation gap that historically caused security debt to accumulate
- **30/60/90-day rollout plan**: concrete enterprise adoption roadmap consistent with Michelin's AIOps Exploration Charter phasing
- **Agent HQ**: first wiki documentation of a centralized multi-agent session monitor with real-time steering capability

No contradictions with existing pages. The productivity paradox finding adds nuance to the velocity statistics (PR volume growth) — the two are complementary, not contradictory.

## [2026-04-21] ingest | The future of software creation with Agentic DevOps (Andrew Flick, 2026-01-28)

**Source:** Microsoft Reactor YouTube session, published 2026-01-28  
**Raw file:** `The future of software creation with Agentic DevOps.md`

### New pages created (2)

- `wiki/sources/[2026-01-28] The future of software creation with Agentic DevOps` — source summary
- `wiki/entities/Andrew Flick` — Microsoft Senior Director, Developer Tools; Agentic DevOps three-pillar framework author
- `wiki/concepts/Agentic DevOps` — three-pillar framework; human collaboration spectrum; DevOps history; guardrails

### Pages updated (3)

- `wiki/concepts/Model Context Protocol` — added MCP Server Allowlist governance pattern (GitHub Advanced Security, 2026); Michelin vs. GitHub governance comparison tip; sources 3→4
- `wiki/concepts/Multi-Agent Architecture` — already updated in previous ingest batch
- `wiki/concepts/Self-Healing Systems` — already updated in previous ingest batch

### Key new knowledge

- **Three Pillars of Agentic DevOps**: (1) developer experience, (2) agents across SDLC, (3) AI building AI — the most complete definitional framework for Agentic DevOps in the wiki
- **Copilot evolution timeline 2021→2026**: documented progression from code completion to full agentic platform; useful for dating when capabilities became available
- **1.3 billion agents by 2028** (IDC forecast); 82% of orgs plan integration in 1–3 years — industry scale context
- **Microsoft SRE Agent: 10,500 hours saved, 7,000+ incidents** — first large-scale quantitative evidence of self-healing systems ROI
- **MCP Server Allowlist**: org/enterprise-level registry allowlist for MCP server governance — closes the governance gap between MCP adoption and security posture
- **Non-deterministic testing challenge**: AI outputs break traditional expected-result frameworks; requires new engineering discipline (evals, guardrails, observability)
- **Agent integration failure example**: sales agent recommending competitor products in production — illustrates that "turn it off and revert" is an insufficient AIOps practice; proper monitoring needed

No contradictions with existing pages. The productivity paradox finding (from the previous ingest) is complementary to the velocity statistics cited here (PR volume growth) — both are true simultaneously and context-dependent.

---

## [2026-04-21] lint | Wiki-wide lint pass

### Fixes applied

1. **index.md — merged fragmented entity sections**: three separate entity headings ("Entities", "Entities — New (2026-04-14 ingest)", "Entities — New (2026-04-21 ingest)") consolidated into a single Entities section with 35 entries.

2. **index.md — fixed broken synthesis link**: `[[wiki/synthesis/AIOps Platform Product Vision Map]]` pointed to a non-existent file. Corrected to `[[wiki/synthesis/AIOps Design for Azure-to-AliCloud Managed Kubernetes]]` which is the actual file on disk.

3. **Broken `[[ACK]]` wikilink** in `wiki/synthesis/AIOps Design for Azure-to-AliCloud Managed Kubernetes.md`: replaced with inline text "ACK (Alibaba Cloud Container Service for Kubernetes)" since no ACK entity page exists.

4. **Incorrect `[[CNCF|ACK]]` wikilink** in `wiki/sources/[2026-04-06] LoongCollector + ACS Agent Sandbox.md`: ACK ≠ CNCF. Replaced with plain text "ACK/ACS".

### Audit summary

- **17 source pages** — all present on disk and in index ✓
- **35 entity pages** — all present on disk and in index ✓
- **27 concept pages** — all present on disk and in index ✓
- **0 comparison pages** — none yet (expected) ✓
- **1 synthesis page** — present on disk, now correctly linked in index ✓
- **No orphan pages** detected (all disk files appear in index)
- **No contradictions** found between pages
- **No stale claims** identified

## [2026-04-22] query | Strengthen AI safety and AppSec integration in AIOps design

Updated `wiki/synthesis/AIOps Design for Azure-to-AliCloud Managed Kubernetes` to strengthen the security section in two directions:

- added an AI-specific safety model for non-deterministic LLM operations, grounded in `[[AI Agent Observability]]`, `[[AI Agent Runtime Security]]`, `[[Policy as Code]]`, and `[[Human-in-the-Loop]]`
- integrated existing AppSec practices such as Snyk code/image scanning, DAST, and pentest outputs into the AIOps signal, analytics, release-guardrail, and governance layers

No contradictions with existing pages. This update extends the original design from generic governance into AI-specific operational safety and clarifies that security tooling should feed AIOps as both evidence and policy input, not be replaced by it.

## [2026-04-23] ingest | Simplifying Root Cause Analysis in Kubernetes with StateGraph and LLM (Tsinghua/Harmonic, 2025-06-03)

**Source:** arXiv paper (2506.02490v1) by Yong Xiang et al. (Tsinghua University, Harmonic Inc, Peng Cheng Laboratory), published 2025-06-03
**Raw file:** `Simplifying Root Cause Analysis in Kubernetes  with StateGraph and LLM.pdf`

### New pages created (3)

- `wiki/sources/[2025-06-03] Simplifying Root Cause Analysis in Kubernetes with StateGraph and LLM` — source summary
- `wiki/entities/SynergyRCA` — LLM-based K8s RCA tool; StateGraph + MetaGraph + GPT-4o pipeline
- `wiki/entities/Neo4j` — graph database backend for SynergyRCA

### Pages updated (3)

- `wiki/concepts/Root Cause Analysis` — added SynergyRCA and graph-based RAG to relationships and sources; sources 5→6
- `wiki/entities/K8sGPT` — added SynergyRCA comparison (LLM for NL output vs. full reasoning); sources 1→2
- `wiki/concepts/Retrieval-Augmented Generation` — added graph-based RAG row (SynergyRCA/Neo4j); added SynergyRCA and Knowledge Graph to relationships; promoted from stub to sourced page; sources 0→1

### Key new knowledge

- **Graph-based RAG**: first academic paper in the wiki using a graph database (Neo4j) instead of a vector store for RAG retrieval in AIOps — StateGraph captures runtime K8s entity states and relationships; MetaGraph constrains LLM traversals to prevent hallucinated entity connections
- **State reconciliation principle**: root causes identified by checking (1) state existence, (2) state correctness, (3) cross-entity state consistency — a generalizable principle beyond Kubernetes
- **Five-module LLM pipeline**: Triage → PathQueryGen → StateChecker → ReportGen → ReportQualityChecker; each module is independently evaluable with ~0.89–0.97 precision
- **~0.90 precision in ~2 minutes**: competitive with Adobe's 71% RCA accuracy but in a different context (batch K8s incidents vs. live production alerts)
- **99% input token cost**: validates Computing Pushdown — the dominant cost driver is feeding STATE vertex JSON into StateChecker, not LLM generation
- **Snapshot inconsistency limitation**: 5-minute polling misses rapid state changes; tolerating this pushes precision above 0.95 — a data quality problem, not an LLM reasoning problem
- **K8sGPT comparison**: SynergyRCA uses LLM for full reasoning and code generation; K8sGPT uses LLM only for natural language output with hardcoded analyzers

No contradictions with existing pages. SynergyRCA's graph-based approach is complementary to existing wiki knowledge: it validates Computing Pushdown (token cost is dominated by input), extends RAG beyond vector stores, and provides an academic benchmark alongside Adobe's production metrics.
## [2026-04-28] ingest | Don't Build Multi-Agents (Cognition / Walden Yan, 2025-06-12)
## [2026-04-28] ingest | How we built our multi-agent research system (Anthropic, 2026-04-28)
## [2026-05-03] query | How can AIOps enable FinOps — system design
- Filed as: wiki/synthesis/AIOps-Driven FinOps System Design.md
- Index updated: Synthesis section

## [2026-05-13] ingest | LoongSuite GenAI 可观测语义规范 (Alibaba/Ant Group, 2026-05-12)

**Source:** Alibaba/Ant Group article by 铖朴、瑜棕、顺岭, published ~2026-05-12

### New pages created (2)

- `wiki/sources/[2026-05-12] LoongSuite GenAI 可观测语义规范` — source summary
- `wiki/entities/LoongSuite` — Alibaba's open-source GenAI observability brand

### Pages updated (3)

- `wiki/entities/OpenTelemetry` — added LoongSuite as vendor extension; updated GenAI SemConv status; sources 1→2
- `wiki/concepts/AI Agent Observability` — added LoongSuite three innovations (Entry/Step Span, Skill semantic, Token-level observability); token-level as 5th signal dimension; sources 2→3
- `wiki/entities/OpenClaw` — added LoongSuite as observability instrumentation layer; sources 2→3

### Key new knowledge

- **Entry/Step Span**: two-level Agent trace hierarchy taming 100+ span traces into navigable trees
- **Skill semantic**: `gen_ai.skill.*` attributes for business-function-level observability between Tool and Agent granularity
- **Token-level inference observability**: per-token scheduling/execution latency, batch size, Top-K probability — enables sub-request diagnosis (GPU contention, BOS token anomalies)
- **GenAI Utils**: engineering abstraction (`ExtendedTelemetryHandler`) decoupling semantic extraction from OTel API management
- **Case studies**: slow token diagnosis via cross-request resource interference; answer irrelevance from BOS token anomaly

No contradictions with existing pages. LoongSuite's innovations are additive extensions to the four-signal AI Agent Observability model already documented.

## [2026-05-13] ingest | How and when to build multi-agent systems (Harrison Chase / LangChain, 2025-06-16)

**Source:** Blog post by Harrison Chase (LangChain CEO), published 2025-06-16

### New pages created (3)

- `wiki/sources/[2025-06-16] How and when to build multi-agent systems` — source summary
- `wiki/entities/Harrison Chase` — CEO/co-founder of LangChain
- `wiki/entities/LangChain` — open-source LLM application framework; LangGraph + LangSmith

### Pages updated (5)

- `wiki/concepts/Context Engineering` — added Chase's read-vs-write framing and LangGraph "no hidden prompts" approach; sources 2→3
- `wiki/concepts/Multi-Agent Architecture` — added read-vs-write reconciliation table, durable execution requirement; sources 6→7
- `wiki/concepts/LLM Evaluation` — added Chase/Anthropic eval guidance (start small, LLM-as-judge, human testing); sources 2→3
- `wiki/entities/Cognition` — added Chase's validation of context engineering thesis; sources 1→2
- `wiki/entities/Anthropic` — added Chase's validation of orchestrator-worker for read-heavy tasks; sources 1→2

### Key new knowledge

- **Read-vs-write distinction**: the critical heuristic for multi-agent decisions — read-heavy tasks (research) suit parallel multi-agent; write-heavy tasks (code) need single-threaded agents
- **Reconciliation of Cognition vs Anthropic**: both are correct for their respective task types
- **Durable execution**: identified as key production requirement for long-running agents
- **LangGraph "no hidden prompts"**: framework philosophy where developers retain full context control

No contradictions with existing pages. Chase's framing is a synthesis of positions already documented from Cognition and Anthropic.

## [2026-05-13] ingest | GrafanaCON 2026 Keynote Livestream (YouTube, 2026-04-22)

Ingested GrafanaCON 2026 keynote. Created 2 new pages, updated 5 existing pages:

### New pages
- `wiki/sources/[2026-04-22] GrafanaCON 2026 Keynote` — source summary
- `wiki/entities/GCX` — Grafana Cloud CLI entity page

### Updated pages
- `wiki/entities/Grafana` — added GrafanaCON 2026 metrics, Grafana 13, Loki new architecture, Agentic Observability Cloud, AI observability product; sources 3→4
- `wiki/entities/Grafana Assistant` — added OSS/Enterprise availability, Workspace, Automations, Customization, GCX relationship; sources 2→3
- `wiki/entities/OpenTelemetry` — added Stabilization Roadmap (GrafanaCON 2026); sources 2→3
- `wiki/concepts/AI Agent Observability` — added Grafana AI Observability Product section; sources 3→4
- `wiki/entities/Grafana MCP Server` — added Cloud MCP scope, GCX relationship; sources 1→2

### Key new knowledge
- **Agentic Observability Cloud**: Grafana's strategic vision — agents as primary consumers of observability tools
- **GCX**: bridges gap between coding agents (code-aware) and production reality (latency, SLOs, CPU)
- **Grafana Assistant for OSS/Enterprise**: no longer Cloud-only; free tier with 3 users
- **Loki new architecture**: Kafka write path, columnar storage, 20x less data scanned, 10x faster queries
- **OTel stabilization**: "apt-get install OpenTelemetry" vision; boring is amazing philosophy
- **AI observability product**: conversations as a new observability primitive; end-to-end agentic app monitoring

## [2026-05-13] ingest | Grafana 给 AI RCA 提了个醒：不要让大模型猜根因，要让它进工作台

WeChat article by 技术调研 analyzing Grafana's AI RCA strategy.

### Pages created
- `wiki/sources/[2026-05-13] Grafana 给 AI RCA 提了个醒` — source summary
- `wiki/entities/Sift` — Grafana Cloud automated K8s diagnostic checklist
- `wiki/entities/Asserts.ai` — acquired company powering Knowledge Graph + RCA Workbench
- `wiki/entities/o11y-bench` — open-source observability agent benchmark

### Pages updated
- `wiki/concepts/Root Cause Analysis` — added Investigation-Based vs. Answer-Based RCA section, Sift, RCA Workbench; sources 6→7
- `wiki/concepts/Knowledge Graph` — expanded from stub; added RCA Workbench, insight types, Asserts.ai; sources 0→1
- `wiki/concepts/Model Context Protocol` — added MCP as New Observability Entry Point section; sources 4→5
- `wiki/concepts/LLM Evaluation` — added o11y-bench section; sources 3→4
- `wiki/entities/Grafana` — added AI RCA Strategy section, o11y-bench, Asserts.ai; sources 4→5
- `wiki/entities/Grafana Assistant` — added Investigations, RBAC constraint, Sift relationship; sources 3→4

### Key new knowledge
- **Investigation-based RCA**: AI should produce evidence packages, not answer paragraphs
- **Sift**: productize high-frequency failure patterns as explainable rules; reserve LLMs for correlation and explanation
- **Asserts.ai → Knowledge Graph + RCA Workbench**: entity-centric timeline; "which insight appeared first?" as the key RCA question
- **MCP as production context provider**: observability platform serves external AI tools wherever engineers work
- **o11y-bench**: industry benchmark for what agents do, not just what they answer
