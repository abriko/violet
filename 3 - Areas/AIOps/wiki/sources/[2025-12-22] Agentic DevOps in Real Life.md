---
tags: [source]
created: 2026-04-21
updated: 2026-04-21
sources: 1
---

# [2025-12-22] Agentic DevOps in Real Life — Build Faster, Ship Safer, Keep Humans in the Loop

**Authors:** [[3 - Areas/AIOps/wiki/entities/Brian Randell]] & [[3 - Areas/AIOps/wiki/entities/Mickey Gousset]]  
**Publication:** Live! 360 / Microsoft Visual Studio (YouTube keynote)  
**URL:** https://www.youtube.com/watch?v=MtzTpoots-A  
**Ingested:** 2026-04-21

---

## Summary

Live! 360 keynote by Brian Randell (Microsoft consultant, ex-GitHub) and Mickey Gousset (GitHub Staff DevOps Architect). Covers agentic AI reshaping DevOps across coding, code review, automation, security, and incident response. Includes live demos of [[3 - Areas/AIOps/wiki/entities/GitHub Copilot]] Agents, Agent HQ, Azure DevOps Copilot integration, and Azure's autonomous monitoring agent (SUR Agent preview).

Audience: mixed developers + IT pros. Emphasis on keeping **humans in the loop** and a practical **30/60/90-day rollout plan**.

---

## Key Concepts

### Definition of Agentic DevOps

> "The next evolution of DevOps, reimagined for a world where intelligent agents **collaborate** with you — and with each other — to optimize and automate every stage of the software lifecycle."

Emphasis on *collaborate*, not just *automate*. Agents extend the team, not replace it.

### Human Collaboration Taxonomy

Three levels, referenced from Microsoft/GitHub's framing:

| Model | Description | Current Reality |
|---|---|---|
| **Human-in-the-Loop** | Human drives; AI assists | Most orgs today |
| **Human-on-the-Loop** | Agent acts; human reviews output | Emerging (Horizon 2) |
| **Human-out-of-the-Loop** | Agent acts autonomously within policy | Established workflows only; speakers say: "I have nothing currently in this state" |

See [[3 - Areas/AIOps/wiki/concepts/Human-in-the-Loop]] for full concept page.

### GitHub Copilot Agent Workflow (Demo)

1. Create GitHub Issue with natural-language description
2. Assign issue to Copilot
3. Agent autonomously: reads repo, makes changes across files, runs tests, creates draft PR
4. **Agent HQ**: centralized session monitor — view history, steer in real-time, inspect reasoning steps
5. Human reviews PR — original requester **cannot** be the final merger (enforced safety balance)

### Security Findings

- **4.4 million credential leaks** prevented by GitHub Advanced Security in 2024 alone
- **322% more privilege escalation paths** in AI-generated code vs. human-written
- **40% increase** in critical secrets exposure risk with AI-assisted development
- Copilot Autofix: find → explain → generate fix → commit to branch/PR in one workflow

### Productivity Paradox

> "Sometimes you have to go slower to go faster because you have to do it safely."

- Average 30% code acceptance rate
- 84% increase in successful builds
- BUT: developers often *feel* faster without actually shipping more value — "paper pushing" illusion
- Trust must be built through domain-specific experience, not just model capability

### 30/60/90-Day Rollout Plan

| Phase | Focus |
|---|---|
| Days 1–30 | Learn tools; start with one AI-assisted workflow; identify drudgery candidates |
| Days 31–60 | Expand scope; measure ROI signals; establish instructions files and agent patterns |
| Days 61–90 | Optimize; governance; compliance; team upskilling |

Key principle: **break down work for the agent just as you would for a human.** Giving too much at once degrades output quality.

### Essential Human Controls

Domains where humans must remain active (not delegatable):
- Performance optimization decisions
- Security threat modeling
- Architectural / complex design decisions
- Responsible AI for organizational context
- Compliance and regulatory requirements

### AI-Enabled Logging Requirements

Beyond standard application logging, agentic systems require:
- Agent action audit trails
- Model usage tracking (which model made which decision)
- Approval and override records
- Integration with tools: GitHub audit logs, Splunk, Permit.io

---

## Key Quotes

> "YOLO is not going to cut it in production and real applications."

> "Coding is not typing."

> "AI is powerful but not magic — you really have to invest in how you bring it onto your team just like you would invest in bringing another human onto your team."

---

## Relationships

- [[3 - Areas/AIOps/wiki/entities/Brian Randell]] — co-speaker; entity page
- [[3 - Areas/AIOps/wiki/entities/Mickey Gousset]] — co-speaker; entity page
- [[3 - Areas/AIOps/wiki/entities/GitHub Copilot]] — primary tool demonstrated
- [[3 - Areas/AIOps/wiki/entities/GitHub Advanced Security]] — security scanning and autofix
- [[3 - Areas/AIOps/wiki/concepts/Human-in-the-Loop]] — core concept; three-level taxonomy
- [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] — Human-in/on/out maps to Adobe's autonomy spectrum
- [[3 - Areas/AIOps/wiki/concepts/Self-Healing Systems]] — Azure SUR Agent preview
- [[3 - Areas/AIOps/wiki/concepts/AI-Generated Code Safety]] — 322% privilege escalation stat; secret scanning findings
- [[3 - Areas/AIOps/wiki/concepts/AIOps Exploration Charter]] — 30/60/90-day plan is a concrete adoption roadmap
