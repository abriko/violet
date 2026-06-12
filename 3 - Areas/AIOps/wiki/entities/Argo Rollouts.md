---
tags: [entity]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# Argo Rollouts

**Type:** Open-source Kubernetes controller / CNCF project
**Part of:** Argo project ecosystem
**Category:** [[3 - Areas/AIOps/wiki/concepts/Progressive Delivery]] tooling

---

## What It Is

Argo Rollouts is a Kubernetes controller that extends the native Deployment resource with advanced rollout strategies including **canary deployments**, **blue-green deployments**, and **progressive traffic shifting**. It is one of the primary tools for implementing [[3 - Areas/AIOps/wiki/concepts/Progressive Delivery]] in cloud-native environments.

---

## Core Mechanism

1. Define a `Rollout` custom resource in place of a standard Kubernetes `Deployment`
2. Define traffic-shifting steps (e.g., 30% → pause → 60% → pause → 100%)
3. Attach **analysis templates** that define success/failure criteria (e.g., PromQL expressions against [[3 - Areas/AIOps/wiki/entities/Prometheus]])
4. Argo Rollouts evaluates the analysis at each step — on failure, it automatically rolls back to the last stable version

```yaml
# Example step definition
steps:
  - setWeight: 30
  - pause: {}
  - setWeight: 60
  - setWeight: 80
  - setWeight: 100
```

---

## AI Plugin Extension

[[3 - Areas/AIOps/wiki/entities/Carlos Sanchez]] (Adobe) created an AI analysis plugin hosted in **Argo product labs** that replaces (or supplements) static PromQL analysis templates with an [[3 - Areas/AIOps/wiki/concepts/LLM Agent|agentic AI analysis]] step:

| Mechanism | Traditional | AI Plugin |
|-----------|------------|-----------|
| Success criteria | Hand-written PromQL | LLM confidence score (>50%) |
| Failure detection | Only known metrics | Known + unknown unknowns |
| Analysis source | Prometheus metrics | Logs + K8s cluster state |
| Implementation | YAML condition | Java/Quarkus agent via A2A protocol |

The plugin is **additive** — it can run alongside existing PromQL templates rather than replacing them.

The AI agent uses [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol|MCP tools]] to inspect live Kubernetes pods (`get pod`, `describe pod`, log fetching), compares stable vs. canary pod behaviour, and returns a confidence score that Argo Rollouts maps to a pass/fail decision.

---

## Self-Healing Extension

On rollback, the same agent pipeline can be extended to trigger a [[3 - Areas/AIOps/wiki/concepts/Self-Healing Systems|self-healing loop]]:

```
Rollback → Agent generates RCA → GitHub Issue created →
Coding AI (e.g., Google Jules) creates fix PR → Human approves → Re-deploy
```

See [[3 - Areas/AIOps/wiki/concepts/Self-Healing Systems]] for the full pattern.

---

## Relationship to Other Tools

- **[[3 - Areas/AIOps/wiki/entities/Prometheus]]** — primary metric source for traditional analysis templates
- **[[3 - Areas/AIOps/wiki/entities/OpenTelemetry]]** — can feed telemetry into Argo analysis templates
- **[[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]]** — canary-phase RCA is the core value of the AI plugin
- **[[3 - Areas/AIOps/wiki/entities/K8sGPT]]** — another CNCF project using LLM for K8s diagnostics; complementary scope (post-incident vs. pre-incident)

---

## Key People

- [[3 - Areas/AIOps/wiki/entities/Carlos Sanchez]] — creator of the AI analysis plugin
- [[3 - Areas/AIOps/wiki/entities/Kevin Dubois]] — co-author of the Quarkus agent implementation

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-11-25] Fix Production Rollouts on the Fly With Agentic AIOps]]
