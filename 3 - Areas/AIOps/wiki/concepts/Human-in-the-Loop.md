---
tags: [concept]
created: 2026-04-21
updated: 2026-04-21
sources: 2
---

# Human-in-the-Loop

## Definition

**Human-in-the-Loop** (HitL) describes the degree to which human judgment is embedded in an AI agent's decision and action cycle. In the context of [[3 - Areas/AIOps/wiki/concepts/Agentic DevOps]] and [[3 - Areas/AIOps/wiki/concepts/AIOps]], it is a spectrum — not a binary — with three named positions.

The terminology was popularized in the agentic DevOps context by [[3 - Areas/AIOps/wiki/entities/Brian Randell]] and [[3 - Areas/AIOps/wiki/entities/Mickey Gousset]] (Live! 360 keynote, 2025-12-22), drawing on Microsoft/GitHub's framing.

---

## Three-Level Taxonomy

| Level | Human Role | Agent Role | When to Use |
|---|---|---|---|
| **Human-in-the-Loop** | Driver; approves every action | Navigator; suggests, executes on permission | High-risk, novel, or regulated workflows |
| **Human-on-the-Loop** | Reviewer of outcomes; can steer mid-run | Acts autonomously within session; raises flags | Established patterns; repetitive but complex tasks |
| **Human-out-of-the-Loop** | Policy owner; manages goals and guardrails | Full autonomous execution | Only for well-understood, extensively validated workflows |

> [!warning] Brian Randell explicitly stated: "I currently have nothing that I use that is human out of the loop." Human-out-of-the-Loop is a theoretical endpoint, not an operational target for 2025–2026.

---

## Implementation Patterns

Four collaboration patterns for injecting agents into DevOps pipelines:

1. **Interrupt and Resume**: agent runs until it needs elevated permission, then pauses for human input
2. **Human as a Tool**: agent calls human input as a tool call within its workflow (human treated as an API endpoint)
3. **Approval Flow**: agent completes a batch of work; human approves before the next stage executes
4. **Fallback Escalation**: agent handles routine cases; escalates to human when confidence is below threshold

---

## Enforcement in Practice

[[3 - Areas/AIOps/wiki/entities/GitHub Copilot]] enforces the Human-in-the-Loop checkpoint structurally:
- The person who initiated an agent task **cannot** be the final PR merger
- Requires a second human reviewer before merging to the main branch
- This is not configurable — it is an architectural safety guarantee

---

## Relationship to Other Frameworks

| Framework | Mapping |
|---|---|
| [[3 - Areas/AIOps/wiki/concepts/Three Horizons of Adoption]] (Harness) | Horizon 1 = HitL; Horizon 2 = HotL; Horizon 3 = HootL |
| [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] (Adobe) | RCA stage ≈ HitL; narrow autonomous ≈ HotL; YOLO mode ≈ HootL |
| ACP approval (OpenClaw) | Tool-level HitL: high-risk tools require explicit approval before execution |
| Agent HQ (GitHub Copilot) | HotL tooling: real-time session monitor + steering capability |

---

## Why This Matters for Safety

The core tension in agentic systems is between **efficiency** (fewer interruptions) and **safety** (more oversight). The three-level taxonomy makes this tradeoff explicit and governable:

- Teams can assign different HitL levels to different agent types (diagnosis vs. remediation)
- Policy engines enforce HitL levels deterministically, regardless of what the LLM "decides"
- Audit logs provide post-hoc accountability at any level

> [!tip] The right level is determined by **trust maturity** (how well the agent is understood in this domain) and **risk tolerance** (cost of a wrong action), not by technology capability alone.

---

## Relationships

- [[3 - Areas/AIOps/wiki/concepts/Agentic DevOps]] — primary context for this taxonomy
- [[3 - Areas/AIOps/wiki/concepts/Three Horizons of Adoption]] — H1/H2/H3 map to HitL/HotL/HootL
- [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] — Adobe's equivalent staged model
- [[3 - Areas/AIOps/wiki/concepts/Policy as Code]] — deterministic enforcement of HitL levels
- [[3 - Areas/AIOps/wiki/entities/GitHub Copilot]] — enforces HitL checkpoint via PR review rule
- [[3 - Areas/AIOps/wiki/concepts/AI Agent Runtime Security]] — ACP approval as tool-level HitL
- [[3 - Areas/AIOps/wiki/concepts/Self-Healing Systems]] — YOLO mode as the beyond-HootL ceiling

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-12-22] Agentic DevOps in Real Life]]
- [[3 - Areas/AIOps/wiki/sources/[2026-01-28] The future of software creation with Agentic DevOps]]
