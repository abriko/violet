---
tags: [concept]
created: 2026-04-21
updated: 2026-04-21
sources: 3
---

# Agentic DevOps

## Definition

**Agentic DevOps** is the next evolution of DevOps, where intelligent agents collaborate with humans — and with each other — to optimize and automate every stage of the software development lifecycle (SDLC).

> "The next evolution of DevOps, reimagined for a world where intelligent agents **collaborate** with you." — [[3 - Areas/AIOps/wiki/entities/Brian Randell]] & [[3 - Areas/AIOps/wiki/entities/Mickey Gousset]], Live! 360 keynote

The key word is *collaborate*, not merely *automate*. Agents extend the human team; they do not replace it.

---

## Why Now: The Problem Space

Traditional DevOps automation is **deterministic**: it does exactly what it is told, fails unpredictably on unhandled errors, and provides no reasoning. Agentic AI is **probabilistic** and adaptive — it can observe, hypothesize, plan, and act across novel situations.

New problems that require an agentic approach:
- **Model selection complexity**: 11,000+ models in Azure AI Foundry; apps using 7 models simultaneously
- **Non-deterministic testing**: AI outputs break traditional expected-result test frameworks
- **Security surface expansion**: AI code introduces 322% more privilege escalation paths
- **Agent integration failures**: agents misbehaving in production (e.g., recommending competitor products)
- **Velocity gap**: pull request volume grew 35M → 43.2M (2024→2025); human review can't scale linearly

---

## Three Pillars (Microsoft Framing)

Defined by [[3 - Areas/AIOps/wiki/entities/Andrew Flick]] and colleagues at Microsoft:

| Pillar | Description |
|---|---|
| **1. Developer Experience** | Copilot evolution from pair programmer → peer programmer → AI teammate; plan mode, agent mode, custom agents |
| **2. Agents Across SDLC** | Agents infused at every stage: coding, code review, testing, security scanning, modernization, SRE, incident response |
| **3. AI Building AI** | Maturity arc: chatbot → RAG chatbot → multi-agent system; requires new DevOps practices for AI apps themselves |

---

## Human Collaboration Spectrum

See [[3 - Areas/AIOps/wiki/concepts/Human-in-the-Loop]] for the full taxonomy. Three levels:

| Model | Human Role | Typical Use |
|---|---|---|
| Human-in-the-Loop | Drives every decision; AI assists | Today's default |
| Human-on-the-Loop | Reviews agent output; can steer mid-run | Horizon 2 (1–2 years) |
| Human-out-of-the-Loop | Manages policy and goals; agents handle execution | Narrow, established workflows only |

---

## Three Horizons of Adoption

See [[3 - Areas/AIOps/wiki/concepts/Three Horizons of Adoption]] for the full framework (from [[3 - Areas/AIOps/wiki/entities/Harness]]):

- **Horizon 1 – Augmented Operator**: IDE + CLI agents; human in the loop
- **Horizon 2 – Agent Swarms**: specialized agents collaborating; human on the loop; CVE agent → developer agent → QA agent pipeline
- **Horizon 3 – Autonomous SRE**: proactive 24/7 remediation; human manages policy only

This maps closely to [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] (Adobe's staged deployment model) and the Microsoft Human-in/on/out-of-the-Loop taxonomy.

---

## Guardrails Are Non-Negotiable

Probabilistic agents require deterministic safety layers:

1. **[[3 - Areas/AIOps/wiki/concepts/Policy as Code]]**: every action passes a policy engine (OPA) before execution
2. **Contextual Permissions**: read-only for diagnosis agents; write scoped per namespace for remediation agents
3. **Audit Trail**: every reasoning step and action logged (Black Box Recorder / session audit)
4. **[[3 - Areas/AIOps/wiki/entities/GitHub Advanced Security]]**: CodeQL + secret scanning + Autofix embedded in agent PR workflow
5. **MCP Server Allowlist**: org-level registry controls which external tools agents can invoke

---

## DevOps History Context

| Era | Milestone |
|---|---|
| 2009 | DevOps coined; Flickr talk on dev+ops collaboration |
| ~2014 | Continuous delivery principles (Jez Humble) |
| ~2018 | DevSecOps; security shifted left |
| 2018+ | Cloud-native era; containers; developer owns production |
| 2021+ | AI coding assistance (Copilot) |
| 2024+ | Agentic DevOps |

---

## Contradictions and Open Questions

> [!question] The "productivity paradox": participants in the Microsoft keynote reported that developers *feel* faster but adoption studies show only ~30% code acceptance rates and potential "paper pushing" illusion. The causal relationship between AI tool use and actual value delivery remains contested.

> [!question] The 322% privilege escalation increase in AI-generated code ([[3 - Areas/AIOps/wiki/entities/GitHub Advanced Security]]) raises the question of whether velocity gains are offset by security debt that appears later.

---

## Relationships

- [[3 - Areas/AIOps/wiki/concepts/Human-in-the-Loop]] — three-level collaboration taxonomy
- [[3 - Areas/AIOps/wiki/concepts/Three Horizons of Adoption]] — staged adoption framework
- [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] — Adobe's equivalent staged model
- [[3 - Areas/AIOps/wiki/concepts/Policy as Code]] — deterministic guardrails
- [[3 - Areas/AIOps/wiki/entities/GitHub Copilot]] — primary Microsoft implementation platform
- [[3 - Areas/AIOps/wiki/entities/Harness]] — architect's perspective and C-P-A Model
- [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] — agent swarms and SDLC agent collaboration
- [[3 - Areas/AIOps/wiki/concepts/Self-Healing Systems]] — Horizon 3 / Autonomous SRE vision
- [[3 - Areas/AIOps/wiki/concepts/AI-Generated Code Safety]] — security implications of agentic code generation
- [[3 - Areas/AIOps/wiki/concepts/AIOps]] — Agentic DevOps applied to operations specifically

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-02-11] Agentic AI in DevOps Architecting Autonomous Infrastructure]]
- [[3 - Areas/AIOps/wiki/sources/[2025-12-22] Agentic DevOps in Real Life]]
- [[3 - Areas/AIOps/wiki/sources/[2026-01-28] The future of software creation with Agentic DevOps]]
