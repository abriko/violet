---
tags: [concept]
created: 2026-04-21
updated: 2026-04-21
sources: 1
---

# Three Horizons of Adoption

## Definition

The **Three Horizons of Adoption** is a staged framework for understanding how organizations will progressively adopt agentic AI in DevOps/operations, introduced by [[3 - Areas/AIOps/wiki/entities/Harness]] in their architect's guide to autonomous infrastructure (2025).

Each horizon represents a distinct level of agent autonomy, human involvement, and organisational trust maturity.

---

## The Three Horizons

### Horizon 1 — Augmented Operator (Today)

- **Human role:** Driver; agent is the navigator
- **Agent role:** Sidecar to the engineer — answers questions, proposes fixes, the human executes
- **Architecture:** IDE extensions, CLI wrappers
- **Example:** "Why is this pod crashing?" → agent queries logs, correlates `MemoryLimitExceeded` with a recent config change, proposes a fix; human applies it
- **Trust level:** Low (human retains full control)

### Horizon 2 — Agent Swarms & Task Autonomy (1–2 Years)

- **Human role:** Human-on-the-Loop — reviews output; does not drive the process
- **Agent role:** Specific scoped tasks handled autonomously; multi-agent collaboration
- **Architecture:** Specialized agents pass work between each other; human approves at pipeline exit
- **Example:** Security agent identifies CVE → creates ticket → Developer agent branches and bumps version → QA agent runs tests → human merges
- **Trust level:** Medium (human reviews outcome, not steps)

### Horizon 3 — Autonomous SRE (3–5 Years)

- **Human role:** Human-out-of-the-Loop for standard operations; manages *policy* and *goals*, not tasks
- **Agent role:** Tier-1 support; proactive 24/7 health management
- **Architecture:** Full autonomous control loop with policy engine as the safety boundary
- **Example:** 2 AM latency spike → agent detects noisy neighbor → drains and cordons the node → verifies stability → posts post-mortem to Slack → human paged only if agent fails
- **Trust level:** High (established within clearly defined policy boundaries)

---

## Relationship to Other Frameworks

| Framework | Source | Alignment |
|---|---|---|
| [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] | Adobe (via [[3 - Areas/AIOps/wiki/entities/Danilo Banjac]]) | Horizon 1 ≈ RCA recommendations; Horizon 2 ≈ human-approved actions; Horizon 3 ≈ narrow autonomous |
| Human-in/on/out-of-the-Loop | [[3 - Areas/AIOps/wiki/entities/Brian Randell]] / Microsoft | Direct 1:1 mapping to H1/H2/H3 |
| YOLO Mode | [[3 - Areas/AIOps/wiki/entities/Argo Rollouts]] / [[3 - Areas/AIOps/wiki/entities/Carlos Sanchez]] | Beyond Horizon 3; explicitly not recommended |
| AIOps Exploration Charter | [[3 - Areas/AIOps/wiki/entities/Matthew Liu]] / Michelin | Entry path into Horizon 1 without premature commitment to H2/H3 |

---

## The Architect's Challenge: Probabilistic Infrastructure

At Horizon 2 and beyond, operations become **probabilistic** — agents may choose different solution paths for the same problem. This is philosophically incompatible with classical Ops' reliance on determinism.

The design response is **guardrails**, not avoidance:
1. **[[3 - Areas/AIOps/wiki/concepts/Policy as Code]]**: deterministic policy engine pre-approves every agent action
2. **Contextual Permissions**: least-privilege per agent role
3. **Black Box Recorder**: tamper-proof audit log of every reasoning step and action

> [!tip] The progression from H1 to H3 is not a product decision — it is an **organisational trust maturity** decision. Engineering the guardrails is the prerequisite, not the afterthought.

---

## Relationships

- [[3 - Areas/AIOps/wiki/entities/Harness]] — source of the framework
- [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] — Adobe's equivalent model; aligned staging
- [[3 - Areas/AIOps/wiki/concepts/Human-in-the-Loop]] — Microsoft's parallel three-level taxonomy
- [[3 - Areas/AIOps/wiki/concepts/Policy as Code]] — required guardrail for H2/H3
- [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] — the coordination mechanism at Horizon 2
- [[3 - Areas/AIOps/wiki/concepts/Self-Healing Systems]] — the operational target of Horizon 3
- [[3 - Areas/AIOps/wiki/concepts/Agentic DevOps]] — the broader context this framework sits within
- [[3 - Areas/AIOps/wiki/concepts/AIOps Exploration Charter]] — enterprise entry path; prevents premature H2/H3 commitment

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-02-11] Agentic AI in DevOps Architecting Autonomous Infrastructure]]
