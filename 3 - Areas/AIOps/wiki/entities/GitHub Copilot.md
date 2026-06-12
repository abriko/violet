---
tags: [entity]
created: 2026-04-21
updated: 2026-04-21
sources: 2
---

# GitHub Copilot

**Type:** AI coding assistant / Agentic DevOps platform  
**Vendor:** GitHub / Microsoft  
**Status:** Generally available; agent features in rapid iteration (as of 2026)

---

## Overview

GitHub Copilot started as an AI pair programmer in 2021 and has evolved into an agentic DevOps platform by 2026. It is the primary vehicle through which Microsoft delivers [[3 - Areas/AIOps/wiki/concepts/Agentic DevOps]] capabilities — spanning code completion, multi-file edits, autonomous agent workflows, and full SDLC integration.

> 100 million developer accounts on GitHub; 90% of Fortune 500 use GitHub; 91% of Microsoft's global engineering team uses Copilot.

---

## Evolution Timeline

| Year | Milestone |
|---|---|
| Jun 2021 | Preview launch; single/multi-line code completion (built on Codex) |
| ~2022 | Chat interface introduced |
| ~2023 | Multi-file edits; natural language refactoring |
| ~2024 | Agent mode; Coding Agent; multi-model support (OpenAI, Gemini, Claude) |
| Oct 2025 | Plan mode; custom agents; **Agent HQ**; GitHub graph integration; Claude Sonnet 4.5 as primary model |
| 2026 | Copilot SDK open-sourced; Copilot CLI; Azure DevOps integration (preview); MCP server allowlist governance |

---

## Core Capabilities

### Interaction Modes (VS Code)
| Mode | Description |
|---|---|
| **Ask** | Traditional Q&A chat |
| **Edit** | Copilot makes direct file edits |
| **Agent** | Autonomous local execution; multi-file changes, runs tests |
| **Plan** | Generates clarifying questions → explicit step-by-step implementation plan |

### Agent Types
- **Coding Agent**: cloud-hosted; assigned via GitHub Issues or Azure DevOps work items; creates draft PRs
- **Background Agent**: runs silently; prompts on permission escalation
- **Cloud Agent**: peer programmer; reasons and executes without interruption; used for parallel implementations
- **Custom Agents**: defined as Markdown files committed to repo; specify MCP servers, tasks, patterns, anti-patterns
- **Partner Agents**: third-party integrations (PagerDuty, JFrog, etc.) managed via org-level controls

### Agent HQ
Centralized session monitor for all active and historical Copilot agent sessions:
- Real-time session steering (inject instructions mid-run)
- Full reasoning and action history
- Pull request status surfaced without leaving Agent HQ
- Available in GitHub web UI and via VS Code

### Safety Mechanisms
- Original requester **cannot** be the final PR merger — enforced human-in-the-loop checkpoint
- Microsoft Responsible AI pipeline validates all model inputs/outputs
- MCP Server Allowlist: org/enterprise administrators control which MCP servers agents can access
- GitHub Advanced Security integration: CodeQL runs automatically within agent sessions

---

## GitHub Advanced Security Integration

See [[3 - Areas/AIOps/wiki/entities/GitHub Advanced Security]] for full page.

- Secret scanning: 4.4 million credential leaks prevented in 2024 alone
- Code scanning: finds vulnerabilities at PR time
- **Copilot Autofix**: "found means fixed" — one-click fix generation, commit to branch, create PR

---

## Governance & Insights

- **GitHub Insights dashboard**: model usage %, language breakdown, agent contribution metrics
- **Model controls**: org-level and repo-level enable/disable for specific models
- **Custom agent management**: org-level visibility and access control

---

## Relationships

- [[3 - Areas/AIOps/wiki/concepts/Agentic DevOps]] — primary implementation platform
- [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] — extensibility backbone; MCP server allowlist
- [[3 - Areas/AIOps/wiki/entities/GitHub Advanced Security]] — security integration
- [[3 - Areas/AIOps/wiki/concepts/Human-in-the-Loop]] — enforced PR review checkpoint; plan mode collaboration
- [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] — custom + partner agents; parallel cloud agent execution
- [[3 - Areas/AIOps/wiki/concepts/Self-Healing Systems]] — SRE agent incident response loop
- [[3 - Areas/AIOps/wiki/entities/Andrew Flick]] — Microsoft Senior Director leading developer tools
- [[3 - Areas/AIOps/wiki/entities/Brian Randell]] — keynote presenter
- [[3 - Areas/AIOps/wiki/entities/Mickey Gousset]] — GitHub Staff DevOps Architect; demo presenter

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-12-22] Agentic DevOps in Real Life]]
- [[3 - Areas/AIOps/wiki/sources/[2026-01-28] The future of software creation with Agentic DevOps]]
