---
tags: [concept]
created: 2026-04-14
updated: 2026-04-14
sources: 3
---

# Self-Healing Systems

**Also known as:** Self-healing infrastructure, autonomous remediation, auto-remediation
**Related concepts:** [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]], [[3 - Areas/AIOps/wiki/concepts/AIOps]], [[3 - Areas/AIOps/wiki/concepts/Progressive Delivery]]

---

## What It Is

A Self-Healing System is an infrastructure or software delivery pipeline that can **automatically detect a failure, diagnose its cause, generate or apply a fix, and verify the fix** — closing the loop from fault to recovery with minimal or no human intervention.

In the [[3 - Areas/AIOps/wiki/concepts/Progressive Delivery]] context demonstrated by [[3 - Areas/AIOps/wiki/entities/Carlos Sanchez]] at Adobe, self-healing specifically refers to the chain that activates *after* an automated rollback:

```
Canary failure detected
        ↓
Automated rollback (blast radius limited to canary %)
        ↓
AI agent diagnoses root cause from logs + K8s state
        ↓
GitHub Issue created with detailed RCA narrative
        ↓
Issue assigned to coding AI (Google Jules / Copilot / any assistant)
        ↓
Coding AI creates PR with code fix (+ test)
        ↓
Human approves PR  ──or──  YOLO: auto-merge
        ↓
New canary deployed → AI analysis loop restarts
```

---

## Why It Matters

Traditional rollback alone only restores stability — it does not fix the underlying defect. Engineers still need to:
1. Investigate the failure manually
2. Identify the root cause
3. Write a fix
4. Deploy and re-validate

Self-healing systems aim to automate steps 1–3, reducing the time-to-fix and the expertise required at each step. The key value is compressing the **detect → recover → fix → redeploy** cycle.

> [!tip] Key insight
> Even partial self-healing (diagnosis + issue creation, without auto-fix) provides major leverage: the platform engineer receives a structured RCA before needing to escalate to the owning development team, reducing the noise and the blast radius of the incident.

---

## Autonomy Spectrum

Self-healing exists on an autonomy spectrum. The right operating point depends on organizational trust, accuracy, and risk tolerance:

| Autonomy level | Mechanism | Human role |
|----------------|-----------|-----------|
| **Advisory** | RCA narrative in GitHub Issue | Human reads, manually investigates and fixes |
| **Fix suggestion** | Coding AI creates PR | Human reviews and merges |
| **Semi-autonomous** | PR created + auto-approved after human review window | Human can veto; otherwise merges |
| **Fully autonomous** ("YOLO") | Auto-approve + re-deploy | No human gate |

> [!warning] Fully autonomous mode
> "YOLO mode" (auto-approve coding AI PRs) was demonstrated as a conceptual extreme. The presenters explicitly cautioned against using it in production. It represents the hypothetical ceiling of [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]], not the recommended operating point.

---

## Relationship to Progressive Autonomy

[[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] (the Adobe model from the on-call response context) and Self-Healing Systems (from the rollout context) are the same underlying principle applied to different lifecycle phases:

| Phase | Pattern | Tool |
|-------|---------|------|
| Production incident | [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] stages | On-call agent (Azure AI Foundry) |
| Rollout failure | Self-healing loop | [[3 - Areas/AIOps/wiki/entities/Argo Rollouts]] AI plugin |

The key shared principle: **start with human review; earn the right to act autonomously over time**.

---

## Design Considerations

### What Makes a Good Self-Healing Loop

1. **Bounded blast radius first**: rollback before diagnosis. Never attempt to self-heal a live 100%-traffic failure — reduce exposure first.
2. **Diagnosable failures**: LLM agents diagnose well when error signals are unambiguous (panic logs, stack traces). Subtle or environmental failures (network partitions, clock skew) are harder.
3. **Coding AI quality**: the fix PR quality depends heavily on the coding assistant's access to context — the GitHub issue should include enough RCA detail for the coding AI to understand the problem without querying separately.
4. **Re-validation loop**: after the fix is deployed, the same analysis loop should re-run to confirm the fix resolved the issue — not just that the deployment succeeded.
5. **Prompt crafting**: non-determinism in LLM output means the diagnosis and issue quality vary. Prompt engineering and tool design dominate implementation effort.

---

## Relationship to Other Concepts

- **[[3 - Areas/AIOps/wiki/concepts/Progressive Delivery]]** — the deployment pattern that enables bounded-blast-radius rollback as the first step
- **[[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]]** — the staged authority model; self-healing is an implementation of progressive autonomy in the CD pipeline
- **[[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]]** — self-healing depends on accurate RCA to generate a meaningful fix
- **[[3 - Areas/AIOps/wiki/concepts/LLM Agent]]** — agent that performs log analysis, diagnosis, and orchestrates the fix pipeline
- **[[3 - Areas/AIOps/wiki/concepts/AIOps]]** — self-healing is the most advanced AIOps capability; the end-state that VibeOps points toward
- **[[3 - Areas/AIOps/wiki/concepts/VibeOps]]** — natural language intent-driven IT operations; self-healing is a concrete step toward VibeOps
- **[[3 - Areas/AIOps/wiki/entities/Argo Rollouts]]** — the tool that implements this pattern in Kubernetes
- **[[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]]** — MCP tools give the agent access to K8s cluster state for diagnosis

---

## Microsoft SRE Agent: Enterprise-Scale Self-Healing

[[3 - Areas/AIOps/wiki/entities/Andrew Flick]] cited Microsoft's internal **SRE Agent** as a production example of self-healing at enterprise scale, without progressive delivery as a prerequisite:

```
PagerDuty alert
  → SRE Agent investigates (Azure Monitor, request charts, error patterns)
  → Interim remediation: scale Azure container up/down automatically
  → GitHub Issue created with incident description
  → GitHub Copilot assigned → proposes permanent fix (e.g., increase cache rate)
  → Human reviews PR → merge
```

**Microsoft internal result:** 10,500 hours saved and 7,000+ incidents handled by the SRE agent.

This extends the self-healing pattern beyond the CI/CD rollout context — any production incident can trigger the loop if the agent has sufficient monitoring access and tool permissions.

> [!tip] The Microsoft SRE Agent + Harness Horizon 3 (Autonomous SRE) together indicate the self-healing pattern is the industry's converging end-state for production operations — across vendors, platforms, and use cases.

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-11-25] Fix Production Rollouts on the Fly With Agentic AIOps]]
- [[3 - Areas/AIOps/wiki/sources/[2025-02-11] Agentic AI in DevOps Architecting Autonomous Infrastructure]]
- [[3 - Areas/AIOps/wiki/sources/[2026-01-28] The future of software creation with Agentic DevOps]]
