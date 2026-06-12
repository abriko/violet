---
tags: [concept]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# Progressive Delivery

**Also known as:** Canary deployment, staged rollout, progressive rollout
**Related practice:** Continuous Delivery (CD)

---

## What It Is

Progressive Delivery is a software release strategy in which new code is exposed to a gradually increasing subset of production traffic, with automated health checks at each stage that can trigger an immediate rollback if anything goes wrong. It extends Continuous Delivery by adding **controlled exposure** and **automated rollback** to the deployment pipeline.

> [!tip] Key insight
> The goal is to limit the blast radius of any bad deployment to the smallest possible fraction of users before the failure is detected and reversed — rather than discovering it only after 100% of traffic is affected.

The CrowdStrike 2024 outage — cited in the source talk — is a canonical example of what progressive delivery is designed to prevent: a change deployed to all endpoints simultaneously with no staged exposure.

---

## Core Mechanisms

### Traffic Shifting (Canary)

```
Step 1: 30% of traffic → new version (canary)
         70% traffic → old version (stable)
Step 2: Analyze health
Step 3: If healthy → 60% canary; if not → rollback to 100% stable
Step 4: Continue until 100% canary (promotion) or rollback
```

### Analysis Templates

At each pause, an **analysis template** queries one or more data sources and applies a success condition:

| Analysis type | Example condition |
|---------------|-------------------|
| Prometheus metric | `< 5% HTTP 500 rate` |
| AI confidence score | `> 50% LLM confidence canary is healthy` |
| Custom plugin | Any external evaluation |

### Feature Flags

An alternative or complementary mechanism: new code ships to all users but is toggled on only for a controlled group via a feature flag system, allowing instant kill-switch rollback without a deployment.

---

## Tooling

| Tool | Approach |
|------|----------|
| [[3 - Areas/AIOps/wiki/entities/Argo Rollouts]] | Kubernetes-native canary/blue-green controller with analysis templates |
| Flagger | GitOps-driven progressive delivery for Kubernetes |
| LaunchDarkly | Feature flag platform |
| Spinnaker | Multi-cloud deployment pipeline with canary analysis |

---

## AI Enhancement: The Unknown Unknowns Problem

Traditional analysis templates require engineers to *anticipate* failure modes and encode them as PromQL expressions. This creates a blind spot: failure modes that were not anticipated have no metric to detect them.

[[3 - Areas/AIOps/wiki/concepts/LLM Agent|AI agents]] integrated into the analysis step (e.g., the [[3 - Areas/AIOps/wiki/entities/Argo Rollouts]] AI plugin) address this by reading logs and cluster state holistically and returning a fuzzy confidence judgment — catching **unknown unknowns** that static thresholds cannot.

> [!note]
> This is a fundamentally different approach: metrics measure what you know to instrument; AI agents reason about emergent signals you didn't plan for.

---

## Relationship to Progressive Autonomy

[[3 - Areas/AIOps/wiki/concepts/Progressive Delivery]] at the deployment level has a structural analogy to [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] at the agent level:

- Both expand scope incrementally (traffic % / autonomy stage)
- Both gate progression on measured health (analysis / accuracy)
- Both use automated rollback/veto as the safety mechanism

---

## Relationship to Other Concepts

- **[[3 - Areas/AIOps/wiki/concepts/AIOps]]** — AI-powered analysis templates bring AIOps into the CD pipeline
- **[[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]]** — canary-phase RCA catches failures at minimal blast radius
- **[[3 - Areas/AIOps/wiki/concepts/Self-Healing Systems]]** — extends progressive delivery: on rollback, automatically diagnose and fix
- **[[3 - Areas/AIOps/wiki/concepts/LLM Agent]]** — agent pattern used for AI-powered canary analysis
- **[[3 - Areas/AIOps/wiki/entities/Argo Rollouts]]** — primary Kubernetes implementation
- **[[3 - Areas/AIOps/wiki/entities/Prometheus]]** — traditional metric source for analysis templates
- **[[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]]** — analogous staged-control pattern for agent operations

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-11-25] Fix Production Rollouts on the Fly With Agentic AIOps]]
