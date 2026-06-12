---
tags: [source]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# [2025-12-17] Rolling Out AIOps Without a Grand Vision: What We Did, What We Would Change

**Author:** [[3 - Areas/AIOps/wiki/entities/Matthew Liu]] (Michelin China IT Architect)
**Organisation:** [[3 - Areas/AIOps/wiki/entities/Michelin]]
**Published:** 2025-12-17
**URL:** https://blogit.michelin.io/rolling-out-aiops-without-a-grand-vision-what-we-did-what-we-would-change/

---

## One-Line Summary

A practitioner retrospective on bootstrapping an enterprise AIOps initiative at [[3 - Areas/AIOps/wiki/entities/Michelin]] China IT — using [[3 - Areas/AIOps/wiki/entities/Dify]] as a low-code builder on AliCloud, plugged into a global [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol|MCP]] ecosystem — with lessons on stakeholder management, governance, use-case discovery, and the right sequencing of KPI discussions.

---

## Context

[[3 - Areas/AIOps/wiki/entities/Matthew Liu]], a China-based IT architect at [[3 - Areas/AIOps/wiki/entities/Michelin]], shares what actually happened when his team tried to start AIOps with no grand vision and no pre-approved budget — and what they would do differently. The initiative operates within [[3 - Areas/AIOps/wiki/entities/Michelin]]'s **Game Changer** global AI programme and aligns with a corporate decision to adopt an **MCP-based approach** to AI tooling across IT systems.

The platform stack:
- **[[3 - Areas/AIOps/wiki/entities/Dify]]** — low-code AI app builder and runtime, deployed on AliCloud
- **Global MCP connectors** — ServiceNow MCP (the first delivered by global IT), plus planned connectors for GitHub, asset list, IPAM, etc.
- **Local MCP** — AliCloud resources, local observability platform, China-specific systems
- **AliCloud landing zone** — existing secure infrastructure (network links, firewalls/WAF, IAM/RBAC, logging)

The explicit goal: **not a China-only AI island**, but a regional pilot acting as an early adopter of the global MCP governance model.

---

## The Actual Journey (Flow 1 — Reconstructed)

### A1 — Personal Conviction & Industry Trend Insight

Architect forms a strong view that now is the right time for AIOps based on industry maturity, operations experience, and the readiness of monitoring/ITSM/cloud platforms. More than "AI looks cool" — but still pre-formal-scope.

### A2 — Early Ops Conversations ("Oral Buy-In")

Informal talks with CloudOps, DevOps, platform engineers: "Do you believe AI could help?" and "Which areas feel repetitive?" Result: **soft agreement**, no numbers, no commitment.

### A3 — Assumption-Based Demos in Dify (Using MCP)

Working demos built without being a full-time app developer:
- **DBA support chatbot** — database health checks, slow query log analysis, error RCA
- **Kubernetes admin chatbot**
- ServiceNow-related flows using the **first version of the global ServiceNow MCP**

> [!tip] The ServiceNow MCP made it possible to wire a working AIOps prototype in **a few hours** — validating that Dify + MCP can implement real operations flows and giving ops teams something concrete to react to.

### A4 — Early KPI Discussion (Too Early — Key Mistake)

After demos, asked ops teams for quantified gain expectations and KPIs. **Resistance emerged:**

- *"If we say 30% effort saved, does headcount drop 30%?"*
- *"If MTTR improves, will that become a hard KPI before the solution is mature?"*

Result: no shared quantified objectives. The intent was right but the **timing and framing** were wrong.

### A5 — "Self-Serve Exploration" Pitch

Positioned [[3 - Areas/AIOps/wiki/entities/Dify]] as a low-code platform where ops teams could build and explore themselves, materialising tacit know-how into prompts and workflows. Management did not find this sufficient — it sounded like "tool exploration" rather than "solving clear operations pain".

### A6 — Security / Technology / Governance Validation

Obtained governance approvals via three strategies:

**a) Modular architecture: pattern, not product**
- Clearly separated app builder/runtime (Dify, replaceable), LLM "brain" (role + interaction pattern), and MCP-based extensions
- The stable layer is the **MCP-aligned interaction pattern and reusable know-how** — not any specific tool
- Message: "Approve the AIOps pattern built around MCP, not Dify forever"

**b) Hosting within existing AliCloud landing zone**
- Reused standard security components: network links, firewalls/WAF, IAM/RBAC, SSO, logging
- Message: "A new workload inside the existing secure architecture — not a new security model"

**c) Data categories defined up-front**
Mapped all realistic data categories: operational know-how (SOPs, runbooks, postmortems, RCAs), environment/context knowledge (CMDB, topologies, dashboards), automation assets, governance, people/processes, external intelligence. Confirmed non-core business secrets are not sent to the platform.

**Result:** architectural, security, and data-handling approvals obtained.

### A7 — IT Management Review

Management did not block the initiative, but required:
1. Working with the **head of China IT operations** to clarify value and expectations
2. Returning with jointly defined **objectives and scope**

Initiative became a **sponsored exploration** — conditioned on clearer value definition.

### A8 — External Flagship Use Case Discovery (Vendor Contract Renewal)

Used vendor support contract renewals as a channel to discover automation opportunities. The China BSS head, shown Dify + MCP demos, immediately identified:
- Reducing **periodic manual checks and reports** currently done by vendor staff
- **Self-healing** for repetitive incident patterns

> **Key insight:** vendor contract negotiations are a politically low-risk, directly cost-measurable channel for finding AIOps flagship use cases.

### A9 — Internal Flagship Use Case Discovery (Ops Process Mining)

Parallel internal channel: pain inventory + existing ways of working. Concrete example: the **DBA chatbot** — database health, slow query analysis, error RCA — generated expressed interest from the DBA team for integration into real operations.

---

## Key Lessons from Flow 1

**What worked:**
- Building **real demos early** with Dify + global ServiceNow MCP
- Securing governance approval for the **modular, MCP-based pattern** (not a specific product)
- Aligning with global governance rather than creating a local island
- Accepting management's condition to align with ops head
- Recognising external contracts (A8) and internal process mining (A9) as distinct flagship channels

**What to change:**
- Pushing for hard KPIs (A4) before an exploration-oriented charter and CIO/ops-head alignment
- Treating flagship use cases as loosely defined pilots rather than deriving them from a time-boxed charter
- Positioning self-serve (A5) as a default entry point — it only works for operationally mature teams; it should be an **earned capability** after flagship pilot success

---

## Recommended Journey (Flow 2)

| Step | Activity |
|------|----------|
| A1 | Personal conviction & industry insight |
| A2 (Refined) | **Structured pain inventory** workshop with ops — list and rank pains before building demos |
| A3 | **Demos aligned to identified pains** (not assumed scenarios); use global MCPs from day one |
| A6 | Security/tech/governance validation at **pattern level** |
| **Charter** | **[[3 - Areas/AIOps/wiki/concepts/AIOps Exploration Charter]]** — time-boxed learning commitment (3–6 months), 4 exploration objectives, 1–2 flagship use cases, Go/Expand/Stop decision point |
| A8 | External use case discovery (vendor renewals, managed service agreements, audits) |
| A9 | Internal use case discovery (pain inventory, recurring incidents, shadow automation) |
| Select | Pick 1–2 flagship use cases (one external, one internal) |
| A4 (Reframed) | **KPI discussion after pilot data** — measure time saved, noise reduction, MTTA/MTTR changes; build business case from real evidence |
| A5 (Later) | Self-serve exploration opened to **operationally mature teams** with guardrails |

---

## Takeaways for Other Teams

1. **Don't wait for a perfect grand vision** — "We want to test, safely and cheaply, whether AIOps can reduce pain in 1–2 concrete areas" is sufficient
2. **Use exploration-oriented objectives** — reduce uncertainty, prove feasibility, materialise know-how, build confidence; treat flagship use cases as experiments
3. **Anchor early on global programmes and standards** — use existing MCP connectors, follow global governance; being a pilot beats being a side project
4. **Make the pain inventory explicit and early** — concrete pains before "AI could help in theory"
5. **Use a low-code platform as demo engine first, platform second** — the core value is MCP + patterns, not the UI
6. **Validate the pattern, not a fixed product** — separate builder/runtime, LLM, and MCP tools; reuse standard landing zones; define data categories upfront
7. **Create a learning-first charter** — explicitly frame Phase 1 as learning and pain reduction, not headcount cuts or KPI tightening
8. **Use multiple channels for flagship use case discovery** — external (vendor contracts, audits) and internal (ops mining, recurring incidents)
9. **Discuss gains after you have data** — define direction early, measure during pilots, build the real business case from outcomes

---

## Relationship to Other Sources

- [[3 - Areas/AIOps/wiki/sources/[2024-10-28] AI-powered observability picking up where AIOps failed]] — [[3 - Areas/AIOps/wiki/entities/Asaf Yigal]] also identifies organisational resistance as the primary AIOps failure mode; this source provides the practitioner playbook for navigating that resistance
- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Is AIOps the Future of Operations?]] — [[3 - Areas/AIOps/wiki/entities/Adobe]] similarly adopted [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] — a staged, evidence-based expansion of agent authority; complements the exploration-charter approach
- [[3 - Areas/AIOps/wiki/sources/[2025-06-07] Building AI Into Observability Workflows]] — Grafana's agentic MCP architecture; Michelin's ServiceNow MCP adoption follows the same integration pattern at the enterprise governance layer

---

## Related Pages

- [[3 - Areas/AIOps/wiki/entities/Matthew Liu]] — author; Michelin China IT architect
- [[3 - Areas/AIOps/wiki/entities/Michelin]] — enterprise case study: bottom-up AIOps adoption with global MCP governance alignment
- [[3 - Areas/AIOps/wiki/entities/Dify]] — low-code AI app builder used as the AIOps demo engine and platform runtime
- [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] — the integration standard enabling "pattern-not-product" governance and fast demo development
- [[3 - Areas/AIOps/wiki/concepts/AIOps Exploration Charter]] — the recommended learning-first charter concept derived from this retrospective
- [[3 - Areas/AIOps/wiki/concepts/AIOps]] — broader concept page; this source adds adoption dynamics and organisational change context
- [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] — complementary concept: Adobe's staged authority model vs. Michelin's staged governance model
