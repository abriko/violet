---
tags: [source]
created: 2026-04-28
updated: 2026-04-28
sources: 1
---

# [2025-06-12] Don't Build Multi-Agents

**Author:** Walden Yan (Cognition / Devin)
**Published:** June 12, 2025
**URL:** https://cognition.ai/blog/dont-build-multi-agents

---

## Summary

A first-principles argument against multi-agent parallel architectures in 2025. The central claim: the dominant failure mode of multi-agent systems is not capability — it is **context fragmentation**. When agents work in parallel without full shared context, their implicit decisions conflict, producing fragile and incoherent outputs.

The author proposes two foundational principles for reliable long-running agents under the umbrella of **[[Context Engineering]]**.

---

## Core Argument

### The Flappy Bird Problem

A canonical failure: task "Build a Flappy Bird clone" is split into:
- Subagent 1: "build a moving background with green pipes and hitboxes"
- Subagent 2: "build a bird that can move up and down"

Result: Subagent 1 builds a Super Mario Bros background; Subagent 2 builds a bird that doesn't match it visually or mechanically. The final agent must combine two miscommunications.

This seems contrived, but real production tasks have **many layers of nuance** that can be miscommunicated. Even copying the original task to each subagent doesn't help — a multi-turn conversation has implicit decisions baked into tool calls, rewrites, and prior context that cannot be summarized into a single task description.

### Two Principles

**Principle 1 — Share context:** Share full agent traces, not just individual messages. Every action should be informed by the context of all relevant decisions made by other parts of the system.

**Principle 2 — Actions carry implicit decisions:** Conflicting decisions produce bad results. Every action an agent takes encodes assumptions. Parallel agents build on different, potentially conflicting assumptions.

### Why Multi-Agent Systems Are Fragile Today

- Cross-agent context passing is a hard, unsolved problem
- No major effort is currently dedicated to solving it
- The author expects the solution will "come for free" as single-threaded agents improve at communicating with humans

### Recommended Architecture

Start with a **single-threaded linear agent**. Context is continuous, no fragmentation. For very long tasks that overflow context windows, introduce a dedicated **compression model** that summarizes history into key events, decisions, and state — not a parallel agent.

> [!note] Cognition built a fine-tuned compression model internally for Devin's long-running sessions.

---

## Nuances and Caveats

- The critique is specifically about *parallel* multi-agent architectures where agents make conflicting decisions
- Sequential agent pipelines (one agent hands off to the next with full context) are not criticized
- Claude Code's subagent pattern is cited as a *good* example: subagents are only tasked with answering well-defined questions, never writing code; work is never done in parallel with the main agent

---

## Key Quotes

> "Running multiple agents in collaboration only results in fragile systems. The decision-making ends up too dispersed and context isn't able to be shared thoroughly enough between the agents."

> "I personally think [cross-agent context sharing] will come for free as we make our single-threaded agents even better at communicating with humans."

---

## Relation to Other Sources

> [!warning] Direct tension with [[3 - Areas/AIOps/wiki/sources/[2026-04-28] How we built our multi-agent research system]], which reports a 90.2% performance gain for parallel multi-agent over single-agent Claude Opus 4. Anthropic's system uses an orchestrator-worker pattern with parallel subagents for breadth-first research. Cognition's argument applies to tasks with interdependent decisions; Anthropic's research tasks are explicitly chosen for their parallelizability and independence. The contradiction is real but domain-specific.

---

## Related

- [[Context Engineering]] — the core concept introduced in this piece
- [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] — existing concept page, updated with this source's critique
- [[3 - Areas/AIOps/wiki/entities/Cognition]] — the company behind this piece
- [[3 - Areas/AIOps/wiki/sources/[2026-04-28] How we built our multi-agent research system]] — counterpoint from Anthropic
