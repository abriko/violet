---
tags: [concept]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# AIOps Exploration Charter

**Also known as:** Learning-First AIOps Charter, AIOps Exploration Phase Charter

---

## What It Is

An AIOps Exploration Charter is a **time-boxed, learning-oriented commitment** that an IT team makes before entering a full-scale AIOps programme. It is the structured bridge between informal demos and sponsored production pilots — designed to unlock management sponsorship and CIO-level buy-in without triggering the organisational resistance that premature KPI discussions provoke.

The concept was articulated by [[3 - Areas/AIOps/wiki/entities/Matthew Liu]] ([[3 - Areas/AIOps/wiki/entities/Michelin]]) in his retrospective on bootstrapping enterprise AIOps, as the key correction to the mistake of asking for hard efficiency gains and KPIs before a pilot had run.

---

## The Problem It Solves

When IT architects try to quantify AIOps value too early, they encounter a predictable resistance pattern:

| Stakeholder | Fear |
|-------------|------|
| Ops engineers | "30% effort saved = 30% fewer people" |
| Team leads | "Improved MTTR becomes a hard KPI before the solution is mature" |
| IT managers | "Interesting, but what's the concrete value right now?" |
| Governance | "We need architecture before scope and KPIs are defined" |

Asking for hard gains before pilots creates a **catch-22**: management wants numbers before committing, but ops teams won't provide numbers because they fear the consequences. The charter breaks this deadlock by reframing the first phase as a **learning commitment**, not a productivity commitment.

---

## Structure

### Time Box

Typically **3–6 months**, with clear milestones and a formal **Go / Expand / Stop** decision point at the end.

### Scope

**1–2 flagship use cases** drawn from two discovery channels:
- **External channel (A8):** vendor contract renewals, managed service agreements, external audit findings — politically low-risk, directly cost-measurable
- **Internal channel (A9):** existing ops workflows, recurring incident patterns, "shadow automation" (scripts, copy-paste processes), repeated manual reports

Even individually modest use cases are sufficient — together they validate the full chain: data → MCP tool → LLM → workflow → human.

### Four Exploration-Oriented Objectives

| Objective | Intent |
|-----------|--------|
| **O1 – Reduce uncertainty** | Replace AIOps hype with concrete evidence about what is and isn't feasible |
| **O2 – Prove technical and data feasibility** | Validate that data is accessible, MCP connectors work, and workflows are buildable on a small scope |
| **O3 – Materialise know-how** | Convert tacit operational expertise into reusable prompts, workflows, tool descriptions, and patterns |
| **O4 – Build confidence and guardrails** | Develop trust in the platform, calibrate risk, define approval flows before expanding autonomy |

> [!tip] Key framing: "We convert vague AIOps hype into concrete knowledge and patterns the organisation can reuse" — even if flagship use cases are not high-impact individually, these objectives still deliver real value.

---

## Placement in the Adoption Sequence

The charter belongs *before* KPI discussions, but *after* governance validation:

```
Personal conviction (A1)
      ↓
Structured pain inventory (A2)
      ↓
Pain-aligned demos (A3)
      ↓
Governance: pattern-level approval (A6)
      ↓
AIOps Exploration Charter  ← HERE
(CIO + Ops Head sign-off on exploration objectives)
      ↓
Flagship use case selection (A8 + A9)
      ↓
Pilot execution
      ↓
KPI discussion — from real pilot data (A4 reframed)
      ↓
Self-serve / scale-out — for mature teams only (A5)
```

A critical ordering lesson from [[3 - Areas/AIOps/wiki/entities/Michelin]]: the **gains and KPIs discussion (A4)** must come *after* pilots, not before. Moving it earlier is the single most common mistake in enterprise AIOps adoption.

---

## After the Charter: Evidence-Based KPIs

Once the charter pilot runs, gains can be discussed from **real data**:
- "We saw ~X% reduction in manual effort for this report"
- "On this service, MTTA improved by Y minutes from better triage"

This transforms the KPI discussion from a political negotiation into an evidence-based planning conversation.

---

## Relationship to Other Concepts

- **[[3 - Areas/AIOps/wiki/concepts/AIOps]]** — the broader discipline; the charter is the recommended entry pattern for enterprise adoption
- **[[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]]** — complementary concept: Adobe's staged expansion of *agent authority* vs. the charter's staged expansion of *organisational commitment*; both prioritise evidence before escalation
- **[[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]]** — MCP connectors (ServiceNow, GitHub, etc.) enable rapid demo and pilot development within the charter scope
- **[[3 - Areas/AIOps/wiki/entities/Dify]]** — example low-code platform used to run charter-phase demos and pilots

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-12-17] Rolling Out AIOps Without a Grand Vision]]
