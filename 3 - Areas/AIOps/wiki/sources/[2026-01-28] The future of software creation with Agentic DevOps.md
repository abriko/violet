---
tags: [source]
created: 2026-04-21
updated: 2026-04-21
sources: 1
---

# [2026-01-28] The future of software creation with Agentic DevOps

**Authors:** [[3 - Areas/AIOps/wiki/entities/Andrew Flick]] & Patrick (GitHub)  
**Publication:** Microsoft Reactor (YouTube demo session)  
**URL:** https://www.youtube.com/watch?v=4HqusF5gAh4  
**Ingested:** 2026-04-21

---

## Summary

Microsoft Reactor session by Andrew Flick (Senior Director, Developer Tools) and Patrick (GitHub). Forward-looking demo of Agentic DevOps across the full SDLC using [[3 - Areas/AIOps/wiki/entities/GitHub Copilot]], custom agents, plan mode, MCP extensibility, CodeQL security scanning, and an SRE incident response agent. First session in a Microsoft Reactor "Agentic DevOps" series.

---

## Industry Context

- IDC forecasts **1.3 billion agents** by 2028
- 1.1 million GitHub repos already use an LLM SDK
- 82% of orgs intend to integrate AI agents within 1–3 years
- 90% of software engineers will use AI coding assistance in the same timeframe
- 80% of new GitHub users leverage Copilot in their first week
- Pull requests merged: 35M (2024) → 43.2M (2025) — velocity uptick
- Code pushes: 65M → 82M in same period
- Microsoft internal: 91% of engineering team uses GitHub Copilot; SRE agent saved 10,500 hours and 7K+ incidents

---

## Three Pillars of Agentic DevOps

| Pillar | Description |
|---|---|
| **1. Developer Experience** | Copilot evolution: code completion → chat → multi-file edits → agent mode → coding agent → plan mode → custom agents |
| **2. Agents Across SDLC** | Agents infused at every stage: coding, code review, testing, security, modernization, SRE |
| **3. AI Building AI** | Maturity arc: chatbot → RAG chatbot → multi-agent system; building AI apps requires new DevOps practices |

See [[3 - Areas/AIOps/wiki/concepts/Agentic DevOps]] for full concept page.

---

## GitHub Copilot Evolution Timeline

| Year | Milestone |
|---|---|
| 2021 | Preview launch; single/multi-line completion |
| ~2022 | Chat interface |
| ~2023 | Multi-file edits; natural language refactoring |
| ~2024 | Agent mode; coding agent; multi-model support (OpenAI, Gemini, Claude) |
| Oct 2025 | Plan mode; custom agents; Agent HQ; GitHub graph integration |
| 2026 | Copilot SDK; Copilot CLI; open-sourced VS Code extension |

---

## Demo Highlights

### Custom Agent Creation

- Test Engineer agent: defined via Markdown file (description, MCP servers, tasks, patterns, anti-patterns)
- Committed to repo → immediately available as an assignable agent in GitHub Issues
- Demonstrates agent-as-team-member framing

### Plan Mode Workflow

1. Fetch GitHub Issue details via GitHub MCP server
2. Enter plan mode: agent reads codebase, generates clarifying questions
3. Answer questions interactively → agent builds detailed implementation plan
4. Plans saved as Markdown files in repo for documentation and parallelization
5. Multiple cloud agents implement plans in parallel (light mode + dark mode simultaneously)

### SpecKit (external tool referenced)

- More ceremony than plan mode: constitution → specification (what/why) → planning (tech stack reasoning) → task breakdown with parallel execution analysis
- Author wrote shell of an e-commerce site on a 14-hour flight using SpecKit

### Security Integration

- CodeQL runs automatically within agent sessions — security scan before implementation plan executes
- [[3 - Areas/AIOps/wiki/entities/GitHub Advanced Security]] Autofix: code scanning → vulnerability summary → one-click fix → commit to branch
- MCP Server Allowlist: org/enterprise-level registry allowlist governs which MCP servers agents can use

### Governance & Insights

- GitHub Insights dashboard: model usage breakdown by %, language usage, agent contribution metrics
- Model controls: org-level enable/disable specific models; repo-level granularity
- Custom agent management: org-level visibility and access control; partner agents (PagerDuty, JFrog, etc.)

### SRE Agent (Incident Response Demo)

Full automated incident response loop:
1. PagerDuty alert triggers SRE Agent
2. Agent investigates: Azure Monitor metrics, request volume charts, error patterns
3. Interim remediation: scales Azure container up/down automatically
4. Creates GitHub Issue with incident description, assigns GitHub Copilot
5. Copilot proposes permanent fix (increase cache rate)
6. Human reviews PR → merge

> Microsoft internal: SRE agent saved **10,500 hours** and handled **7,000+ incidents**

---

## New Problems Introduced by AI-Assisted Development

- **Model selection complexity**: 11,000+ models in Azure AI Foundry; single apps using 7 different models
- **Non-deterministic testing**: expected outcomes no longer guaranteed; reproducing bugs is harder
- **Security surface expansion**: traditional + AI attack layer; 116-day average remediation time for critical defects; 17% of vulnerability backlogs flagged critical
- **Agent integration failures**: example — sales agent recommending competitor products in production; org's response: turn it off and revert

---

## Relationships

- [[3 - Areas/AIOps/wiki/entities/Andrew Flick]] — co-speaker; entity page
- [[3 - Areas/AIOps/wiki/entities/GitHub Copilot]] — primary platform; evolution timeline documented
- [[3 - Areas/AIOps/wiki/concepts/Agentic DevOps]] — central concept defined by three pillars
- [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] — VS Code extensibility; MCP server allowlist governance
- [[3 - Areas/AIOps/wiki/entities/GitHub Advanced Security]] — CodeQL + Autofix integration
- [[3 - Areas/AIOps/wiki/concepts/Self-Healing Systems]] — SRE agent incident response loop
- [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] — parallel cloud agents; custom agent marketplace
- [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] — human-on-the-loop during agent execution; PR review as checkpoint
- [[3 - Areas/AIOps/wiki/concepts/Human-in-the-Loop]] — plan mode back-and-forth as human-agent collaboration model
- [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]] — agent session inspector in Agent HQ; GitHub Insights model governance
