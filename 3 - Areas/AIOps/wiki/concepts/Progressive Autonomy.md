---
tags: [concept]
created: 2026-04-14
updated: 2026-04-14
sources: 4
---

# Progressive Autonomy

**Also known as:** Staged autonomy, incremental agent autonomy

---

## What It Is

Progressive Autonomy is a deployment strategy for [[3 - Areas/AIOps/wiki/concepts/LLM Agent|agentic AI systems]] in which autonomy is deliberately expanded in stages, each validated before the next is unlocked. Rather than deploying a fully autonomous agent from the outset, teams start with read-only or advisory capabilities, measure accuracy, build trust, and then progressively grant write access and self-remediation authority.

This strategy directly addresses the risk of deploying [[3 - Areas/AIOps/wiki/concepts/AIOps]] agents with write access to production infrastructure before accuracy and failure modes are well understood.

---

## The Four Stages (Adobe's Model)

[[3 - Areas/AIOps/wiki/entities/Adobe]]'s on-call agent followed this progression over ~18 months:

| Stage | Agent capability | Human role |
|-------|-----------------|------------|
| **1. Diagnosis** | RCA only — identifies probable root cause from metrics and logs | Human investigates from scratch, agent's diagnosis is advisory |
| **2. Recommendations** | RCA + proposed remediation steps (kubectl commands, config changes) | Human reads recommendations, executes manually |
| **3. Human-approved actions** | RCA + recommended actions + explicit approval request in Slack | Human clicks Yes/No per proposed action |
| **4. Narrow autonomous** *(planned)* | Agent self-remediates for a small set of well-understood, low-risk fault classes | No approval required for those specific cases |

> "I personally still prefer to run everything by human eyes and then confirm the mutable actions." — [[3 - Areas/AIOps/wiki/entities/Danilo Banjac]]

---

## Why It Works

1. **Trust accumulation**: each stage gives operators time to observe and validate agent behaviour before granting more authority
2. **Accuracy gating**: moving to the next stage is conditional on measured accuracy at the current stage (Adobe used [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation|LLM-as-judge]] to track 71% RCA accuracy)
3. **Failure blast radius control**: at stages 1-2, the worst outcome is a wrong recommendation; at stage 3, a human veto prevents harmful actions; only at stage 4 does the agent act autonomously — and only for narrowly defined, reversible operations

---

## Relationship to the Autonomy Spectrum

Progressive Autonomy answers the broader **autonomy spectrum** question: where between "fully autonomous" and "fully deterministic" should an agent sit?

Adobe's finding: the correct answer changes over time. You start near the advisory end and move toward autonomy as confidence grows — you don't pick a fixed point.

See also: the [[3 - Areas/AIOps/wiki/concepts/Token Noise Reduction]] implication — higher autonomy (more arbitrary queries) is not only riskier but also more expensive and less reliable. Curated, bounded tools at earlier stages are simultaneously safer *and* cheaper.

---

## YOLO Mode: The Autonomy Ceiling

[[3 - Areas/AIOps/wiki/entities/Carlos Sanchez]]'s [[3 - Areas/AIOps/wiki/concepts/Self-Healing Systems|self-healing rollout]] demo (KubeCon 2025) introduced a concept the presenters called **"YOLO mode"**: automatically approving the coding AI's fix PR and re-deploying without human review. While explicitly cautioned against for production, it illustrates the theoretical ceiling of the autonomy spectrum:

| End | Description |
|-----|-------------|
| **Fully deterministic** | Hard-coded PromQL rules; no AI; fully predictable but misses unknowns |
| **Advisory AI** | AI diagnoses + recommends; human decides everything |
| **Progressive Autonomy** (Adobe model) | Staged: RCA → recommendations → approved actions → narrow auto |
| **YOLO mode** | Full auto-approve of AI-generated fixes; no human gate |

> [!warning]
> YOLO mode is an instructive thought experiment, not a production recommendation. Its value is clarifying that the autonomy spectrum has a defined ceiling — and that most production systems should operate well below it.

This aligns with Adobe's on-call agent finding: narrow autonomy for well-understood, low-risk fault classes is the practical ceiling for the foreseeable future.

---

## Cross-Framework Alignment

Three independent sources converge on the same staged-autonomy insight:

| Source | Framework | Mapping to Progressive Autonomy |
|---|---|---|
| [[3 - Areas/AIOps/wiki/entities/Adobe]] (Banjac/Prangishvili) | 4-stage on-call agent | Advisory → recommendations → approved actions → narrow auto |
| [[3 - Areas/AIOps/wiki/entities/Harness]] | Three Horizons of Adoption | H1 Augmented Operator → H2 Agent Swarms → H3 Autonomous SRE |
| Microsoft / [[3 - Areas/AIOps/wiki/entities/Brian Randell]] | Human-in/on/out-of-the-Loop | HitL → HotL → HootL |

> [!tip] The convergence across vendor (Harness), platform (Microsoft/GitHub), and enterprise user (Adobe) is strong evidence that staged autonomy is a genuine architectural principle, not a vendor-specific framing.

## Relationship to Other Concepts

- **[[3 - Areas/AIOps/wiki/concepts/AIOps]]** — progressive autonomy is the practical deployment strategy for AIOps agents in production
- **[[3 - Areas/AIOps/wiki/concepts/LLM Agent]]** — agents are the subjects of the autonomy progression
- **[[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]]** — accuracy measurement drives the decision to advance stages
- **[[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]]** — stage 1 output; the foundation all later stages build upon
- **[[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]]** — at stage 3/4, the coordinator must handle action approval flows
- **[[3 - Areas/AIOps/wiki/concepts/Three Horizons of Adoption]]** — Harness's parallel horizon model; aligned staging
- **[[3 - Areas/AIOps/wiki/concepts/Human-in-the-Loop]]** — Microsoft's three-level taxonomy; direct HitL/HotL/HootL mapping
- **[[3 - Areas/AIOps/wiki/concepts/Policy as Code]]** — the deterministic enforcement layer that makes higher autonomy stages safe to deploy

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Is AIOps the Future of Operations?]]
- [[3 - Areas/AIOps/wiki/sources/[2025-11-25] Fix Production Rollouts on the Fly With Agentic AIOps]]
- [[3 - Areas/AIOps/wiki/sources/[2025-02-11] Agentic AI in DevOps Architecting Autonomous Infrastructure]]
- [[3 - Areas/AIOps/wiki/sources/[2025-12-22] Agentic DevOps in Real Life]]
