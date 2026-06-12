---
tags: [entity]
created: 2026-04-28
updated: 2026-04-28
sources: 2
---

# Cognition

**Type:** AI company
**Product:** Devin (AI software engineer)
**Website:** https://cognition.ai / https://app.devin.ai

---

## What They Do

Cognition builds [[3 - Areas/AIOps/wiki/concepts/LLM Agent|AI agents]] for software engineering. Their flagship product, Devin, is a long-running agent designed to tackle complex, multi-step coding tasks autonomously. This requires solving hard problems in agent reliability and [[Context Engineering]].

---

## Contributions to the Field

- Coined the term **[[Context Engineering]]** (Walden Yan, June 2025)
- Argued against parallel [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] for tasks with interdependent decisions
- Built an internal fine-tuned compression model for long-context session management in Devin
- Provides a canonical framework for reasoning about agent reliability: two principles (share context, actions carry implicit decisions)
- [[3 - Areas/AIOps/wiki/entities/Harrison Chase]] ([[3 - Areas/AIOps/wiki/entities/LangChain]]) independently validated Cognition's context engineering thesis, confirming that write-heavy tasks (like Devin's coding) require single-threaded agents with full context sharing

---

## Key People

- **Walden Yan** — author of "Don't Build Multi-Agents"; reachable at walden@cognition.ai

---

## Related

- [[Context Engineering]] — concept coined by Cognition
- [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] — Cognition's critique shapes the trade-off analysis
- [[3 - Areas/AIOps/wiki/sources/[2025-06-12] Don't Build Multi-Agents]] — primary source

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-06-12] Don't Build Multi-Agents]]
- [[3 - Areas/AIOps/wiki/sources/[2025-06-16] How and when to build multi-agent systems]]
