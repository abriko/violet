---
tags: [entity]
created: 2026-04-28
updated: 2026-04-28
sources: 2
---

# Anthropic

**Type:** AI safety company
**Products:** Claude (LLM), Claude Research (multi-agent research feature)
**Website:** https://anthropic.com

---

## What They Do

Anthropic builds AI systems with a focus on safety and reliability. Their Claude family of models powers both consumer and enterprise AI applications. The Claude Research feature is their production multi-agent system for complex research tasks.

---

## Contributions to the Field

- Production [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]]: orchestrator-worker pattern with parallel subagents for breadth-first research
- Empirical data on multi-agent performance: +90.2% vs single-agent; 15x token usage vs chat
- 8 prompt engineering principles for orchestrating multi-agent systems
- LLM-as-judge evaluation methodology (single-call rubric outperforms multi-judge)
- Rainbow deployments for stateful agent systems
- Extended thinking and interleaved thinking as controllable reasoning scratchpads
- Self-improving tool descriptions: agent rewrites MCP tool descriptions, reducing task time 40%
- [[3 - Areas/AIOps/wiki/entities/Harrison Chase]] validated Anthropic's orchestrator-worker approach as the correct pattern for read-heavy (research) tasks, where subtask independence means context fragmentation doesn't cause conflicting decisions

---

## Key Finding

Token usage alone explains 80% of BrowseComp performance variance. Multi-agent architectures are fundamentally a token scaling strategy.

---

## Related

- [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] — production implementation
- [[Context Engineering]] — Anthropic's 8 principles are its practical embodiment
- [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] — Anthropic-originated protocol used by their agent's tool layer
- [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]] — LLM-as-judge methodology
- [[3 - Areas/AIOps/wiki/sources/[2026-04-28] How we built our multi-agent research system]] — primary source

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-28] How we built our multi-agent research system]]
- [[3 - Areas/AIOps/wiki/sources/[2025-06-16] How and when to build multi-agent systems]]
