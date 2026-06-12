---
tags: [source]
created: 2026-04-28
updated: 2026-04-28
sources: 1
---

# [2026-04-28] How we built our multi-agent research system

**Author:** Jeremy Hadfield, Barry Zhang, Kenneth Lien, Florian Scholz, Jeremy Fox, Daniel Ford (Anthropic)
**Published:** ~April 2026
**URL:** https://www.anthropic.com/engineering/multi-agent-research-system

---

## Summary

Anthropic's engineering retrospective on building Claude's Research feature — a production multi-agent system using an orchestrator-worker pattern. A lead agent (Claude Opus 4) coordinates parallel subagents (Claude Sonnet 4) that search the web and other integrations simultaneously. The post covers architecture, prompt engineering principles, evaluation strategy, and production reliability challenges.

---

## Architecture

```
User query
  → LeadResearcher (Claude Opus 4)
       ├── saves research plan to Memory (guards against 200k token truncation)
       ├── spawns N Subagents in parallel (web search, Google Workspace, integrations)
       │     each: iterative search → interleaved thinking → findings summary
       └── CitationAgent (post-processing: maps claims to source locations)
```

Dynamic multi-step search vs. static RAG — adapts to new findings rather than fetching fixed chunks.

---

## Key Performance Data

| Metric | Value |
|---|---|
| Multi-agent vs single-agent (internal eval) | +90.2% |
| Token usage: chat vs agent vs multi-agent | 1x → 4x → 15x |
| Research time reduction (parallelization) | up to 90% faster |
| Tool description improvement (agent-rewritten) | 40% faster task completion |

---

## 8 Prompt Engineering Principles

1. **Think like your agents** — simulate agents in Console, watch them step-by-step to surface failure modes
2. **Teach the orchestrator how to delegate** — each subagent needs: objective, output format, tool guidance, task boundaries
3. **Scale effort to query complexity** — embed explicit scaling rules: 1 agent for fact-finding, 2–4 for comparisons, 10+ for complex research
4. **Tool design is critical** — bad tool descriptions send agents down wrong paths; each tool needs distinct purpose and clear description
5. **Let agents improve themselves** — Claude 4 can diagnose and rewrite flawed tool descriptions; a tool-testing agent rewrote MCP descriptions, cutting task time 40%
6. **Start wide, then narrow** — short broad queries first, then progressively narrow; mirrors expert human research
7. **Guide the thinking process** — extended thinking for planning; interleaved thinking for subagents to evaluate quality and adapt
8. **Parallel tool calling transforms speed** — lead agent spawns 3–5 subagents in parallel; subagents call 3+ tools in parallel

---

## Evaluation Strategy

- **Start small:** 20 queries is enough to spot large improvements in early development
- **LLM-as-judge:** rubric covers factual accuracy, citation accuracy, completeness, source quality, tool efficiency; single LLM call with 0.0–1.0 scores outperformed multi-judge setups
- **Human evaluation:** catches SEO content farm bias, hallucinations on unusual queries, subtle source selection failures

---

## Production Engineering Challenges

| Challenge | Solution |
|---|---|
| Stateful errors compound | Resume from checkpoint; let agent adapt to tool failures gracefully |
| Non-deterministic debugging | Full production tracing (without reading conversation content); monitor decision patterns |
| Deployment without disrupting running agents | Rainbow deployments — gradual traffic shift from old to new version |
| Synchronous subagent bottleneck | Known limitation; async execution planned but adds coordination complexity |

---

## Key Insight: Why Multi-Agent Works

Three factors explain 95% of BrowseComp performance variance:
1. **Token usage** (80% of variance) — more tokens = better results; parallel agents multiply token capacity
2. Number of tool calls
3. Model choice

Multi-agent architectures are fundamentally a **token scaling strategy** for tasks exceeding single context windows. Best fit: high-value, breadth-first, parallelizable tasks with many independent directions.

---

## Relation to Other Sources

> [!warning] Apparent tension with [[3 - Areas/AIOps/wiki/sources/[2025-06-12] Don't Build Multi-Agents]] (Cognition). Resolution: the tasks differ. Anthropic targets breadth-first research with *independent* parallel directions — Cognition's critique targets tasks with *interdependent* decisions (like building a game) where parallel agents make conflicting implicit choices. Both are correct within their domain.

---

## Related

- [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] — core concept, updated with this source
- [[Context Engineering]] — Anthropic doesn't use this term but the prompt engineering principles are its implementation
- [[3 - Areas/AIOps/wiki/entities/Anthropic]] — the company behind this piece
- [[3 - Areas/AIOps/wiki/sources/[2025-06-12] Don't Build Multi-Agents]] — counterpoint from Cognition
- [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]] — LLM-as-judge evaluation details
- [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] — MCP servers as tool sources for agents
