---
tags: [concept]
created: 2026-04-28
updated: 2026-05-13
sources: 3
---

# Context Engineering

**Coined by:** Walden Yan (Cognition), June 2025
**Related term:** Prompt Engineering (predecessor)

---

## What It Is

Context Engineering is the practice of **automatically managing what information an AI agent sees at each step**, in a dynamic, multi-turn system. It is the next level beyond prompt engineering: instead of carefully crafting a static prompt, you design the system that continuously constructs the right context for each action.

> "It takes more nuance and is effectively the #1 job of engineers building AI agents." — Walden Yan

---

## Why It Matters

Models in 2025 are extremely intelligent — but even the smartest human cannot do their job effectively without context about what they're being asked to do. The gap between a capable model and a reliable agent is almost entirely a context problem:

- What has already been decided?
- What tools have been called and what did they return?
- What implicit assumptions were made earlier in the conversation?
- What do *other parts of the system* know that this agent doesn't?

---

## The Two Principles (Cognition)

These principles define whether a given agent architecture satisfies Context Engineering requirements:

**Principle 1 — Share context**
Share full agent traces, not just individual messages. Every action should be informed by all relevant decisions made by other parts of the system. Ideally, every action would see everything else.

**Principle 2 — Actions carry implicit decisions**
Every action an agent takes encodes assumptions. Conflicting decisions from different agents produce bad results. Parallel agents that cannot see each other's work will build on conflicting assumptions.

> [!tip] These principles are the basis for Cognition's recommendation to prefer single-threaded linear agents over parallel multi-agent architectures in 2025.

---

## Practical Implementations

### Single-threaded linear agent (simplest)
Context is continuous across all turns. No fragmentation. Recommended default.

### Compression model (for long-running agents)
When context windows overflow, a dedicated model summarizes the history of actions, decisions, and events into key facts. Cognition built a fine-tuned version for Devin's sessions. This preserves continuity without parallel fragmentation.

### Orchestrator-worker with explicit context passing (Anthropic's approach)
The lead agent saves its research plan to external memory before spawning subagents. Subagents receive explicit task descriptions with boundaries, output format, and tool guidance. Each subagent's findings are returned to the lead agent, which synthesizes them. This satisfies Principle 1 for independent tasks but is acknowledged as a synchronous bottleneck.

---

## Context Engineering vs. Prompt Engineering

| Dimension | Prompt Engineering | Context Engineering |
|---|---|---|
| Scope | Static: one message | Dynamic: entire system |
| Timing | Before the session | At every step, automatically |
| Author | Human writes it | System constructs it |
| Key skill | Crafting ideal phrasing | Deciding what information to include, when |

---

## Where Multi-Agent Architectures Break Context Engineering

Parallel multi-agent systems violate Principle 1 and Principle 2 when:
- Subagents cannot see each other's tool calls and outputs
- Subagents receive only a summary of the original task, not the full decision history
- Final agent must reconcile outputs from agents that made conflicting implicit assumptions

This is why [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] must be designed carefully — the architecture must ensure context flows to every decision point.

---

## Related

- [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] — the architecture pattern most affected by context engineering failures
- [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] — the building block whose reliability depends on context engineering
- [[3 - Areas/AIOps/wiki/entities/Cognition]] — coined the term; applied in Devin
- [[3 - Areas/AIOps/wiki/sources/[2025-06-12] Don't Build Multi-Agents]] — primary source for this concept
- [[3 - Areas/AIOps/wiki/sources/[2026-04-28] How we built our multi-agent research system]] — Anthropic's engineering implementation of context engineering principles in a production multi-agent system

---

## Harrison Chase's Framing (LangChain, June 2025)

[[3 - Areas/AIOps/wiki/entities/Harrison Chase]] validated Cognition's context engineering thesis and added a key decision heuristic: the **read-vs-write distinction**. Multi-agent systems that primarily read (research, information gathering) tolerate context fragmentation because subtasks are independent. Systems that primarily write (code, state mutation) require shared context because actions carry implicit, potentially conflicting decisions.

Chase also advocates a **"no hidden prompts" approach** in [[LangGraph]]: agent frameworks should never inject hidden prompt content. Developers must retain full control over what the model sees at each step — this is a direct implementation of Cognition's Principle 1 (share context) at the framework level.

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-06-12] Don't Build Multi-Agents]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-28] How we built our multi-agent research system]]
- [[3 - Areas/AIOps/wiki/sources/[2025-06-16] How and when to build multi-agent systems]]
