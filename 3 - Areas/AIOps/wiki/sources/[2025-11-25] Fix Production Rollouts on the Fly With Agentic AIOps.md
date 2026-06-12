---
tags: [source]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# [2025-11-25] Fix Production Rollouts on the Fly With Agentic AIOps

**Speakers:** [[3 - Areas/AIOps/wiki/entities/Carlos Sanchez]] (Adobe, Principal Scientist) & [[3 - Areas/AIOps/wiki/entities/Kevin Dubois]] (IBM)
**Venue:** KubeCon + CloudNativeCon
**Published:** 2025-11-25
**URL:** https://www.youtube.com/watch?v=wxRDMmiDIU4

---

## One-Line Summary

[[3 - Areas/AIOps/wiki/entities/Argo Rollouts]] + an [[3 - Areas/AIOps/wiki/concepts/LLM Agent|agentic AI plugin]] that replaces rigid PromQL success criteria with fuzzy LLM confidence scoring — and, on failure, triggers a full [[3 - Areas/AIOps/wiki/concepts/Self-Healing Systems|self-healing loop]] that diagnoses the root cause, creates a GitHub issue, and invokes a coding AI to generate a fix PR.

---

## Context

Standard [[3 - Areas/AIOps/wiki/concepts/Progressive Delivery|canary deployments]] with [[3 - Areas/AIOps/wiki/entities/Argo Rollouts]] use pre-written PromQL expressions as success/failure criteria (e.g., "roll back if >5% HTTP 500s"). This works well for *known* failure modes but misses **unknown unknowns** — failure signatures engineers did not anticipate and therefore never wrote metrics for.

The talk demonstrates replacing (or supplementing) that static PromQL gate with an AI agent that reads logs and Kubernetes state holistically, then returns a natural-language confidence judgment.

---

## Architecture

### Phase 1 — AI Canary Analysis

```
git push → Argo Rollouts starts canary (e.g., 30% traffic)
                ↓
    AI Analysis Plugin (Argo Rollouts plugin mechanism)
                ↓
    Java/Quarkus K8s Agent (via A2A protocol)
      ├── get pod / describe pod (MCP tools → K8s API)
      ├── fetch logs (stable pods vs canary pods)
      └── send to LLM (Google Gemini on GKE; model-agnostic)
                ↓
    Confidence score output  (e.g., "73% confident rollout is healthy")
                ↓
    success condition: confidence > 50%  →  continue rollout
                                        →  rollback
```

### Phase 2 — Self-Healing Loop (on rollback)

```
Rollback triggered
    ↓
Agent analyzes error logs → identifies root cause (e.g., "index out of range panic in canary pod")
    ↓
GitHub Issue created (detailed RCA: stable vs canary comparison, recommended actions)
    ↓
Issue assigned to coding AI (Google Jules / GitHub Copilot / any assistant)
    ↓
Coding AI creates PR with fix (+ adds test)
    ↓
Human approves PR  ──or──  YOLO: auto-merge
    ↓
New canary deployed → analysis loop restarts
```

---

## Key Insights

### 1. AI as Fuzzy Metric Gate

Traditional Argo analysis templates require engineers to *know in advance* what failure looks like and encode it in PromQL. The AI plugin captures failure modes that "you didn't know you had to set up metrics for" — filling the **unknown unknowns** gap that static thresholds cannot cover.

### 2. Confidence Score as Success Criterion

The LLM returns a probability estimate, not a binary verdict. The plugin maps this to the Argo Rollouts success condition (`result > 0.5`). This makes the gate tolerant of LLM non-determinism while still providing a clear decision boundary.

### 3. Additive, Not Replacement

The plugin sits *alongside* existing analysis templates. Teams keep their PromQL checks and add the AI plugin as an additional layer. This lowers the adoption barrier — existing safety nets remain intact.

### 4. Non-Determinism is a Real Design Challenge

> "Sometimes [AI] can tell you, 'oh this exception but I think it's okay' — you have to be careful [of] the context you give to the AI model."

Prompt crafting and tool design dominate implementation effort — consistent with [[3 - Areas/AIOps/wiki/entities/Adobe]]'s finding that 80% of effort goes into tools and knowledge bases, not runtime or model selection.

### 5. Self-Healing Extends [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]]

The demo introduces a new extreme: **YOLO mode** — auto-approve the coding AI's PR and re-deploy without human review. While explicitly not recommended for production, this illustrates the far end of the [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] spectrum beyond what Adobe's staged model described.

### 6. Platform Engineering Leverage

The system provides value to **platform engineers** even before reaching developers: an automatically generated GitHub issue with a detailed RCA narrative means the on-call platform engineer can understand what went wrong *before* waking up the owning development team.

---

## Technology Details

| Component | Technology |
|-----------|-----------|
| Progressive delivery | [[3 - Areas/AIOps/wiki/entities/Argo Rollouts]] |
| Plugin language | Java + Quarkus |
| Agent protocol | A2A (Agent-to-Agent) |
| K8s tools | MCP tools (get pod, describe pod, log fetch) |
| LLM | Google Gemini (on GKE; model-agnostic via plugin config) |
| Code fix AI | Google Jules (or GitHub Copilot / any coding assistant) |
| Metrics (prior art) | [[3 - Areas/AIOps/wiki/entities/Prometheus]] PromQL |
| Source hosting | GitHub (issue creation + PR) |

---

## Relationship to Other Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Is AIOps the Future of Operations?]] — same company (Adobe); complements the ops-side picture (on-call agent) with the release-side picture (canary analysis + self-healing)
- [[3 - Areas/AIOps/wiki/sources/[2024-07-11] Now what? Kubernetes troubleshooting with AI?]] — K8sGPT also uses MCP-style K8s tool access for LLM diagnostics; similar agent-with-K8s-tools pattern
- [[3 - Areas/AIOps/wiki/sources/[2025-06-07] Building AI Into Observability Workflows]] — Grafana multi-agent architecture; same trend of AI-as-operator replacing static rule-based gates

---

## Related Pages

- [[3 - Areas/AIOps/wiki/concepts/Progressive Delivery]] — the rollout strategy this plugin enhances
- [[3 - Areas/AIOps/wiki/concepts/Self-Healing Systems]] — the full detect → diagnose → fix → redeploy cycle
- [[3 - Areas/AIOps/wiki/entities/Argo Rollouts]] — the CNCF tool at the center of this architecture
- [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] — the agent pattern used for canary analysis
- [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] — YOLO mode adds a new extreme to the autonomy spectrum
- [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]] — canary-phase RCA: catching failures at 10–30% traffic
- [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] — MCP tools used for K8s cluster access
- [[3 - Areas/AIOps/wiki/entities/Carlos Sanchez]] — primary author; Adobe Principal Scientist
- [[3 - Areas/AIOps/wiki/entities/Kevin Dubois]] — co-author; IBM
