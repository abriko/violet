# Index

Master catalog of all wiki pages. Updated by the LLM on every ingest operation.
Read this file first when answering a query to identify relevant pages.

---

## Sources

*Summary pages for each ingested source document.*

- [[3 - Areas/AIOps/wiki/sources/[2024-03-22] Intelligent Observability The Foundation for Operating Smarter in the Age of AI]] — KubeCon talk by Alolita Sharma (CNCF): "Intelligent Observability" as the prerequisite stage between classical telemetry and AIOps; qualitative + quantitative system behaviour understanding
- [[3 - Areas/AIOps/wiki/sources/[2024-07-11] Now what? Kubernetes troubleshooting with AI?]] — CNCF blog by Emin Alemdar: K8sGPT hands-on — CNCF Sandbox K8s cluster scanner + LLM diagnostics; Operator mode, Trivy/AWS integrations, data anonymisation
- [[3 - Areas/AIOps/wiki/sources/[2024-10-28] AI-powered observability picking up where AIOps failed]] — Logz.io/CNCF blog by Asaf Yigal: AIOps failed due to org resistance (not tech); AIOps vs. AI-powered observability distinction; GenAI democratises observability via natural language
- [[3 - Areas/AIOps/wiki/sources/[2025-06-07] Building AI Into Observability Workflows]] — Grafana talk by Yasir Ekinci: evolution from single-call LLMs to agentic observability via MCP and multi-agent architecture
- [[3 - Areas/AIOps/wiki/sources/[2026-04-09] Start with Grafana AI Assistant and ask your observability stack anything]] — Grafana product demo: Infrastructure Memory, service diagram generation, and automated PromQL query execution
- [[3 - Areas/AIOps/wiki/sources/[2026-04-13] All in One How to Build an End-to-End Observable System]] — Alibaba Cloud blog: 30-year observability history, monitoring→APM→observability framework, three pillars, Prometheus+Grafana full-stack dashboard
- [[3 - Areas/AIOps/wiki/sources/[2026-04-13] Tianchi 2025 AIOps Fault Localization Challenge]] — Alibaba Cloud contest repo: AIOps RCA formalized as a benchmarked ML task with JSONL I/O against ARMS/SLS backend
- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Apsara Conference Insights Rebuild Observability]] — Alibaba Cloud Apsara Conference: Cloud Monitor 2.0 architecture; SLS data layer, UModel entity topology, AIOps Agent, 3-layer MCP toolkit, VibeOps vision
- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Is AIOps the Future of Operations?]] — KubeCon talk by Adobe (Danilo Banjac & Iveri Prangishvili): 18 months of production AIOps at 70+ clusters; agent marketplace, autonomy spectrum, progressive autonomy, 71% RCA accuracy
- [[3 - Areas/AIOps/wiki/sources/[2025-11-25] Fix Production Rollouts on the Fly With Agentic AIOps]] — KubeCon talk by Carlos Sanchez (Adobe) & Kevin Dubois (IBM): Argo Rollouts AI plugin replaces PromQL with LLM confidence scoring; self-healing loop: rollback → RCA → GitHub Issue → coding AI fix PR
- [[3 - Areas/AIOps/wiki/sources/[2025-09-10] 别再被 AI 反噬：DevOps 误用清单]] — DevOps教练 WeChat article: five AI misuse anti-patterns in DevOps IaC generation; "AI audits AI" security audit technique; 60/40 rule; automated validation pipeline
- [[3 - Areas/AIOps/wiki/sources/[2025-12-17] Rolling Out AIOps Without a Grand Vision]] — Michelin IT blog by Matthew Liu: practitioner retrospective on bottom-up enterprise AIOps adoption using Dify + MCP; exploration-charter-first sequencing; two-channel use case discovery
- [[3 - Areas/AIOps/wiki/sources/[2026-03-02] 你的 OpenClaw 真的在受控运行吗？]] — Alibaba Cloud article by 徐可甲: four-signal AI Agent observability framework (session audit logs + app logs + OTEL metrics/traces) using OpenClaw + SLS; agent security risk taxonomy; multi-source correlation workflow
- [[3 - Areas/AIOps/wiki/sources/[2026-04-06] LoongCollector + ACS Agent Sandbox]] — Alibaba Cloud article by 林润骑: ACS Agent Sandbox (kernel-isolated K8s runtime for AI Agents) + LoongCollector (zero-intrusion unified observability collector); zero-copy 500 MB/s throughput; auto-injected sidecar architecture
- [[3 - Areas/AIOps/wiki/sources/[2025-02-11] Agentic AI in DevOps Architecting Autonomous Infrastructure]] — Harness blog: C-P-A Model anatomy of DevOps agents; Three Horizons of Adoption (Augmented Operator → Agent Swarms → Autonomous SRE); Constitutional AI / Policy-as-Code guardrails
- [[3 - Areas/AIOps/wiki/sources/[2025-12-22] Agentic DevOps in Real Life]] — Live! 360 keynote by Brian Randell & Mickey Gousset (Microsoft/GitHub): Human-in/on/out-of-the-Loop taxonomy; 30/60/90-day rollout plan; GitHub Copilot Coding Agent + Agent HQ demo; productivity paradox; security statistics
- [[3 - Areas/AIOps/wiki/sources/[2026-01-28] The future of software creation with Agentic DevOps]] — Microsoft Reactor demo by Andrew Flick & Patrick: Three Pillars of Agentic DevOps; Copilot evolution timeline; plan mode + custom agents + parallel cloud agents; SRE agent (10,500 hrs saved); MCP Server Allowlist governance
- [[3 - Areas/AIOps/wiki/sources/[2025-06-03] Simplifying Root Cause Analysis in Kubernetes with StateGraph and LLM]] — Tsinghua/Harmonic arXiv paper: SynergyRCA — graph-based RAG (StateGraph + MetaGraph in Neo4j) + GPT-4o for K8s RCA; ~0.90 precision in ~2 min; 5 LLM modules; state reconciliation principle
- [[3 - Areas/AIOps/wiki/sources/[2025-06-12] Don't Build Multi-Agents]] — Cognition/Walden Yan: Context Engineering principles; argument against parallel multi-agent for interdependent tasks; two principles (share context, actions carry implicit decisions); single-threaded agent as default
- [[3 - Areas/AIOps/wiki/sources/[2026-04-28] How we built our multi-agent research system]] — Anthropic engineering: production orchestrator-worker system; +90.2% vs single-agent; 8 prompt engineering principles; LLM-as-judge eval; rainbow deployments; token usage as primary performance driver
- [[3 - Areas/AIOps/wiki/sources/[2025-06-16] How and when to build multi-agent systems]] — Harrison Chase (LangChain): reconciles Cognition vs Anthropic; read-vs-write distinction; context engineering; durable execution; LangGraph/LangSmith
- [[3 - Areas/AIOps/wiki/sources/[2026-05-12] LoongSuite GenAI 可观测语义规范]] — Alibaba/Ant Group: LoongSuite GenAI SemConv extends OTel with Entry/Step Span, Skill semantic, token-level inference observability; GenAI Utils engineering layer; deployed in OpenClaw/QwenPaw
- [[3 - Areas/AIOps/wiki/sources/[2026-04-22] GrafanaCON 2026 Keynote]] — GrafanaCON 2026 keynote: Grafana 13, Loki new architecture, OTel stabilization, Grafana Assistant for OSS/Enterprise, GCX CLI, AI observability product, Agentic Observability Cloud vision
- [[3 - Areas/AIOps/wiki/sources/[2026-05-13] Grafana 给 AI RCA 提了个醒]] — 技术调研 WeChat article: Grafana's AI RCA strategy; investigation-based (not answer-based) RCA; Sift diagnostic checks; Asserts.ai Knowledge Graph + RCA Workbench; MCP as observability entry point; o11y-bench; seven lessons for domestic vendors

---

## Entities

*Pages for people, tools, organizations, and projects.*

- [[3 - Areas/AIOps/wiki/entities/Emin Alemdar]] — CNCF Ambassador; author of the K8sGPT Kubernetes troubleshooting article
- [[3 - Areas/AIOps/wiki/entities/Alolita Sharma]] — CNCF engineer; introduced "Intelligent Observability" as the prerequisite stage before AIOps (KubeCon 2024)
- [[3 - Areas/AIOps/wiki/entities/K8sGPT]] — CNCF Sandbox project; CLI + Kubernetes Operator for AI-powered K8s diagnostics and RCA
- [[3 - Areas/AIOps/wiki/entities/Asaf Yigal]] — Logz.io co-founder/CPO; author on AIOps failure modes and GenAI observability strategy
- [[3 - Areas/AIOps/wiki/entities/Logz.io]] — AI-powered observability platform; observability-first + AI enhancement approach
- [[3 - Areas/AIOps/wiki/entities/Grafana]] — Observability platform and organisation; building AI assistants and MCP tooling; de-facto unified dashboard standard
- [[3 - Areas/AIOps/wiki/entities/Yasir Ekinci]] — Grafana engineer; speaker on AI in observability workflows
- [[3 - Areas/AIOps/wiki/entities/Grafana MCP Server]] — Open-source MCP server exposing Grafana's API surface to LLM clients
- [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] — Agentic AI assistant embedded in Grafana; features Infrastructure Memory, service diagrams, PromQL generation (public docs as of 2026-04-09)
- [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud ARMS]] — Alibaba Cloud APM platform; migrating into Cloud Monitor 2.0; backend for Tianchi 2025 AIOps contest
- [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud SLS]] — Simple Log Service; unified observability data backbone for Cloud Monitor 2.0; exabyte-scale, open protocols, 50%+ cost reduction
- [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]] — Cloud Monitor 2.0; Alibaba Cloud's large-model-native AIOps platform; integrates SLS, UModel, and AIOps Agent
- [[3 - Areas/AIOps/wiki/entities/UModel]] — Unified Model; entity topology framework binding data, knowledge, and action; enables LLM to act as digital SRE
- [[3 - Areas/AIOps/wiki/entities/Prometheus]] — CNCF open-source metrics system; de-facto cloud-native metrics standard; PromQL query language
- [[3 - Areas/AIOps/wiki/entities/OpenTelemetry]] — CNCF open standard for traces, metrics, and logs; successor to OpenTracing/OpenCensus; emerging LLM instrumentation layer
- [[3 - Areas/AIOps/wiki/entities/OpenClaw]] — open-source AI Agent runtime; primary case study for production-grade AI Agent observability and security; "digital employee that never goes offline"
- [[3 - Areas/AIOps/wiki/entities/ACS Agent Sandbox]] — Alibaba Cloud K8s-based AI Agent sandbox; kernel-level isolation per Agent instance; auto-injects LoongCollector sidecar
- [[3 - Areas/AIOps/wiki/entities/LoongCollector]] — Alibaba Cloud open-source unified observability collector; zero-copy 500 MB/s; unified logs/metrics/traces; edge-side Computing Pushdown
- [[3 - Areas/AIOps/wiki/entities/Danilo Banjac]] — Adobe cloud infrastructure / AIOps engineer; primary speaker on 18 months of production AIOps
- [[3 - Areas/AIOps/wiki/entities/Iveri Prangishvili]] — Adobe cloud infrastructure engineer; co-presenter on AIOps at KubeCon 2026
- [[3 - Areas/AIOps/wiki/entities/Adobe]] — Enterprise case study: AIOps at 70+ clusters, 200K+ services; agent marketplace, 71% RCA accuracy
- [[3 - Areas/AIOps/wiki/entities/Splunk]] — Enterprise log aggregation platform; common AIOps data source alongside Prometheus
- [[3 - Areas/AIOps/wiki/entities/Carlos Sanchez]] — Adobe Principal Scientist; creator of Argo Rollouts AI analysis plugin and self-healing rollout architecture
- [[3 - Areas/AIOps/wiki/entities/Kevin Dubois]] — IBM engineer (formerly Red Hat); co-author of Quarkus K8s agent for canary AI analysis
- [[3 - Areas/AIOps/wiki/entities/Argo Rollouts]] — CNCF Kubernetes progressive delivery controller; AI plugin enables LLM-powered canary analysis and self-healing rollouts
- [[3 - Areas/AIOps/wiki/entities/Matthew Liu]] — Michelin China IT architect; authored practitioner retrospective on grassroots AIOps adoption with Dify + MCP
- [[3 - Areas/AIOps/wiki/entities/Michelin]] — Enterprise case study: bottom-up AIOps adoption; MCP-aligned governance pattern; AIOps Exploration Charter framing
- [[3 - Areas/AIOps/wiki/entities/Dify]] — Open-source low-code AI app builder; used as AIOps demo engine and replaceable runtime at Michelin
- [[3 - Areas/AIOps/wiki/entities/CNCF]] — Cloud Native Computing Foundation; hosts Prometheus, OpenTelemetry, K8sGPT, Argo Rollouts, and KubeCon
- [[3 - Areas/AIOps/wiki/entities/Harness]] — DevOps platform; author of C-P-A Model and Three Horizons of Adoption framework for autonomous infrastructure
- [[3 - Areas/AIOps/wiki/entities/Brian Randell]] — Microsoft consultant / ex-GitHub MVP; co-author of *Essential DevOps*; articulated Human-in/on/out-of-the-Loop taxonomy
- [[3 - Areas/AIOps/wiki/entities/Mickey Gousset]] — GitHub Staff DevOps Architect; co-presented Agentic DevOps keynote; "found means fixed" security principle
- [[3 - Areas/AIOps/wiki/entities/GitHub Copilot]] — AI coding assistant evolved into agentic DevOps platform; agent modes, Agent HQ, custom agents, MCP extensibility
- [[3 - Areas/AIOps/wiki/entities/GitHub Advanced Security]] — security scanning suite; secret scanning, CodeQL, Copilot Autofix; MCP Server Allowlist governance
- [[3 - Areas/AIOps/wiki/entities/Andrew Flick]] — Microsoft Senior Director, Developer Tools; defined Three Pillars of Agentic DevOps; cited 10,500 hours saved by SRE agent
- [[3 - Areas/AIOps/wiki/entities/SynergyRCA]] — LLM-based K8s RCA tool using graph-structured RAG; StateGraph + MetaGraph + GPT-4o; ~0.90 precision
- [[3 - Areas/AIOps/wiki/entities/Neo4j]] — Graph database; backend for SynergyRCA's StateGraph and MetaGraph
- [[3 - Areas/AIOps/wiki/entities/Cognition]] — AI company behind Devin; coined Context Engineering; argues against parallel multi-agent for interdependent tasks
- [[3 - Areas/AIOps/wiki/entities/Anthropic]] — AI safety company; built Claude Research (production orchestrator-worker); key empirical data on multi-agent performance
- [[3 - Areas/AIOps/wiki/entities/Harrison Chase]] — CEO/co-founder of LangChain; reconciled Cognition vs Anthropic multi-agent positions
- [[3 - Areas/AIOps/wiki/entities/LangChain]] — open-source LLM application framework; LangGraph (agent orchestration), LangSmith (debugging/eval)
- [[3 - Areas/AIOps/wiki/entities/LoongSuite]] — Alibaba's open-source GenAI observability brand; extends OTel with Agent/Skill/Token-level trace semantics; GenAI Utils SDK
- [[3 - Areas/AIOps/wiki/entities/GCX]] — Grafana Cloud CLI; brings Grafana Cloud + Assistant power to terminal and agentic coding environments; public preview
- [[3 - Areas/AIOps/wiki/entities/Sift]] — Grafana Cloud product feature; automated K8s diagnostic checklist (OOMKill, CrashLoopBackOff, CPU throttling); explainable rules, not LLM
- [[3 - Areas/AIOps/wiki/entities/Asserts.ai]] — Acquired by Grafana Labs; powers Knowledge Graph + RCA Workbench with entity discovery, relationship mapping, insight generation
- [[3 - Areas/AIOps/wiki/entities/o11y-bench]] — Open-source benchmark by Grafana Labs for evaluating AI observability agent performance

---

## Concepts

*Pages for ideas, methods, frameworks, and terms.*

- [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] — Open standard ("USB-C for AI tools") for LLM-to-tool integration; layered observability toolkits emerging
- [[3 - Areas/AIOps/wiki/concepts/Intelligent Observability]] — Qualitative + quantitative observability; AI models as first-class observable workloads; prerequisite stage before AIOps (term: Alolita Sharma)
- [[3 - Areas/AIOps/wiki/concepts/LLM Tool Calling]] — Mechanism for LLMs to invoke external functions/APIs; enables private context and write actions
- [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] — LLM operating in an action-feedback loop for autonomous multi-step task completion
- [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] — Coordinator + specialist sub-agents pattern; addresses monolithic agent scalability problems
- [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]] — Reproducible automated testing methodology for LLM agents (vs. "vibe testing")
- [[3 - Areas/AIOps/wiki/concepts/Token Noise Reduction]] — Output-side token reduction: JSON → natural language (4× savings); complemented by Computing Pushdown
- [[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]] — Proactive weekly crawl that pre-builds a persistent infrastructure knowledge base for ambient agent awareness
- [[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]] — Logs, Metrics, Traces: the standard telemetry taxonomy; standards landscape and cross-pillar correlation problem
- [[3 - Areas/AIOps/wiki/concepts/Application Performance Monitoring]] — APM: code-level tracing and profiling to diagnose performance problems; historical generations and LLM APM extension
- [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]] — RCA: identifying the originating cause of a fault; UModel topology-guided RCA; computing pushdown for log clustering
- [[3 - Areas/AIOps/wiki/concepts/AIOps]] — AI for IT Operations: tipping point framing, data mastery + cognitive alignment challenges, AIOps Agent architecture
- [[3 - Areas/AIOps/wiki/concepts/Computing Pushdown]] — Input-side token reduction: LLM orchestrates data operators; >90% token reduction; makes AIOps economically viable at scale
- [[3 - Areas/AIOps/wiki/concepts/VibeOps]] — Natural language intent-driven IT operations; end-state AIOps vision coined by analogy with Vibe Coding
- [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] — Staged expansion of agent authority (RCA → recommendations → human-approved actions → narrow autonomous); Adobe's deployment model; YOLO mode as theoretical ceiling
- [[3 - Areas/AIOps/wiki/concepts/Progressive Delivery]] — Canary/staged rollout strategy with automated health checks and rollback; AI agents replace brittle PromQL gates to catch unknown unknowns
- [[3 - Areas/AIOps/wiki/concepts/Self-Healing Systems]] — Full autonomous recovery cycle: detect → rollback → diagnose → fix PR → re-deploy; YOLO mode (auto-approve) as autonomy ceiling
- [[3 - Areas/AIOps/wiki/concepts/AIOps Exploration Charter]] — Learning-first, time-boxed AIOps adoption charter; 4 exploration objectives before KPI commitments; two-channel use case discovery (external + internal)
- [[3 - Areas/AIOps/wiki/concepts/Retrieval-Augmented Generation]] — RAG: retrieving external knowledge to ground LLM responses; underlying pattern for Infrastructure Memory and AIOps knowledge bases
- [[3 - Areas/AIOps/wiki/concepts/Knowledge Graph]] — Optional Grafana integration enriching Grafana Assistant with structured entity relationships (dashboards, data sources, teams)
- [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]] — four-signal framework (session audit logs + app logs + OTEL metrics + traces) for answering "is this Agent truly running under control?"; extends three-pillar observability with session audit as a 4th signal
- [[3 - Areas/AIOps/wiki/concepts/AI Agent Runtime Security]] — layered Agent execution-time defences: sandbox isolation, tool policy pipeline, ACP approval; complementary to observability ("city wall" vs. "watchtower")
- [[3 - Areas/AIOps/wiki/concepts/AI-Generated Code Safety]] — five anti-patterns of AI-generated IaC; "AI audits AI" technique; security-first prompts; automated validation pipeline (tfsec, Checkov, OPA); 60/40 rule
- [[3 - Areas/AIOps/wiki/concepts/Agentic DevOps]] — next evolution of DevOps; three pillars (developer experience, agents across SDLC, AI building AI); human collaboration spectrum; probabilistic infrastructure guardrails
- [[3 - Areas/AIOps/wiki/concepts/Three Horizons of Adoption]] — Harness framework: Augmented Operator (today) → Agent Swarms (1–2 years) → Autonomous SRE (3–5 years); maps to Progressive Autonomy and Human-in/on/out-of-the-Loop
- [[3 - Areas/AIOps/wiki/concepts/Human-in-the-Loop]] — three-level AI-human collaboration taxonomy; four implementation patterns (interrupt/resume, human-as-tool, approval flow, fallback escalation)
- [[3 - Areas/AIOps/wiki/concepts/Policy as Code]] — deterministic policy engine as the safety layer for probabilistic agents; Constitutional AI framing; OPA / Sentinel / allowlists
- [[Context Engineering]] — practice of automatically managing agent context at each step; the #1 job of agent engineers; two principles: share context + actions carry implicit decisions (Cognition, 2025)

---

## Comparisons

*Side-by-side comparison pages.*

<!-- - [[wiki/comparisons/Name]] — what is being compared -->

---

## Synthesis

*High-level analysis, theses, and evolving insights.*

- [[3 - Areas/AIOps/wiki/synthesis/AIOps Design for Azure-to-AliCloud Managed Kubernetes]] — north-star product vision, capability domains, core workflows, and staged autonomy path for a federated hybrid-cloud AIOps platform
- [[3 - Areas/AIOps/wiki/synthesis/AIOps-Driven FinOps System Design]] — five-layer system design: billing telemetry ingestion, Cost UModel entity graph, three-agent analysis (real-time/daily/monthly), Progressive Autonomy execution phases, and governance guardrails

---

*Last updated: 2026-05-13 (batch ingest — GrafanaCON 2026 Keynote + Grafana 给 AI RCA 提了个醒)*
