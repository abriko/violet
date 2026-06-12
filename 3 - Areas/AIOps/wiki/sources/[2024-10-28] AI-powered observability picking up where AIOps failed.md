---
tags: [source]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# AI-powered observability: picking up where AIOps failed

**Author:** [[3 - Areas/AIOps/wiki/entities/Asaf Yigal]] (Logz.io co-founder)  
**Published:** 2024-10-28  
**Original venue:** [[3 - Areas/AIOps/wiki/entities/Logz.io]] blog; cross-posted to CNCF blog  
**URL:** https://www.cncf.io/blog/2024/10/28/ai-powered-observability-picking-up-where-aiops-failed/

---

## Summary

A practitioner retrospective arguing that [[3 - Areas/AIOps/wiki/concepts/AIOps]] failed primarily because organisations were unwilling to change their processes — not because the technology was flawed. GenAI-powered observability can succeed *if* teams absorb that lesson. The article draws a sharp conceptual line between AIOps (AI-first) and AI-powered observability (observability-first + AI as enhancement).

---

## Key Takeaways

### 1. Why AIOps Failed: Organisational Friction, Not Technology

> "Failure to realize benefits from those solutions wasn't due to the technology — it was because organizations weren't making the changes required to get those benefits."

AIOps stalled because:
- Use cases were never clearly defined ("What were the right tools? Those questions were never answered.")
- Gartner and vendors called for process change; most organisations resisted
- Adoption lagged despite technically sound capabilities (anomaly detection, correlation, RCA)

### 2. The AIOps vs. AI-Powered Observability Distinction

| Dimension | AIOps | AI-Powered Observability |
|-----------|-------|--------------------------|
| Starting point | AI/ML model; ingest *all* telemetry | Selective telemetry (observability-first) |
| Dashboard model | May have no unified dashboard | Full dashboarding + visualisation |
| AI role | Core engine | Enhancement layer |
| Anomaly detection | Primary goal | Feature added to an observability solution |

> "The core idea of AIOps is to pull in as much telemetry data as possible to identify anomalies… [this is] different from what observability solutions provide. Observability provides services on selective telemetry data… While incorporating AI for anomaly detection within these metrics might seem like an AIOps feature, it actually is an enhancement to an observability solution."

### 3. Democratising Observability via Natural Language

Traditional observability insights are locked behind complex query languages (PromQL, LogQL, SQL), accessible only to technical experts. GenAI unlocks:
- Natural language interaction with telemetry data
- Broader user base: non-technical stakeholders, junior engineers
- "Junior developer equivalent" working within the platform

This directly addresses the IT staffing / knowledge-gap problem.

### 4. Concrete GenAI Observability Benefits

- Filter irrelevant data → faster troubleshooting
- Identify top errors and suggest mitigation strategies
- Automate manual processes → engineers focus on strategy

### 5. Lessons from AIOps Must Be Heeded

For AI-powered observability to avoid AIOps's fate:
- Use cases must be explicitly defined before adoption
- Productivity gains must be measurable and realised
- Organisational mindset shift is a prerequisite, not a side effect
- Evolutionary (tool augmentation) + revolutionary (ops team restructuring) changes are both on the table

---

## Relationship to Existing Pages

- [[3 - Areas/AIOps/wiki/concepts/AIOps]] — this source adds the "why it failed" angle and the AIOps vs. AI-powered observability distinction
- [[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]] — the selective vs. exhaustive telemetry framing maps onto this
- [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] — natural language observability interfaces are built on LLM capabilities
- [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]] — named as a primary use case for GenAI observability
- [[3 - Areas/AIOps/wiki/entities/Logz.io]] — the publishing platform; Asaf Yigal is its co-founder/CPO
