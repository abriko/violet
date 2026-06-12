---
tags: [source]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# [2026-04-14] Is AIOps the Future of Operations? Real Use Cases From the Trenches

**Authors:** [[3 - Areas/AIOps/wiki/entities/Danilo Banjac]] & [[3 - Areas/AIOps/wiki/entities/Iveri Prangishvili]], [[3 - Areas/AIOps/wiki/entities/Adobe]]  
**Event:** KubeCon + CloudNativeCon (CNCF)  
**Format:** Conference talk (~30 min) with Q&A  
**Source URL:** https://www.youtube.com/watch?v=-aA8j4uUiBo

---

## Summary

A rare, candid enterprise practitioner account of running AIOps in production at massive scale. Adobe's cloud infrastructure team shares concrete results, architectural decisions, and hard-won lessons from 18 months of building an agentic on-call assistant across 70+ Kubernetes clusters.

---

## Adobe's Scale and Motivation

Adobe operates:
- **70+ clusters**, **20,000+ namespaces**, **200,000+ services**
- On-call engineers face daily alert storms requiring correlation across [[3 - Areas/AIOps/wiki/entities/Splunk]], [[3 - Areas/AIOps/wiki/entities/Prometheus]], and internal knowledge bases

Three core requirements drove the AIOps initiative:
1. **Scale** — handle more incidents without proportionally growing the team
2. **Reduce MTTR** — faster RCA with actionable recommendations at alert time
3. **Reduce on-call toil** — free engineers from mechanical log/metric correlation

---

## Results (after ~18 months)

| Metric | Value |
|--------|-------|
| Automated alerts handled/month | 550 (~30% of all AlertManager alerts) |
| Engineering time saved/month | ~91 hours |
| RCA accuracy | 71% |

> [!note] Accuracy is measured against a human-curated **golden dataset** — see [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]] section below.

---

## Architecture: The Agent Marketplace

Adobe built a **self-service platform** where individual product teams can onboard their own specialized agents:

```
Agent definition (YAML)
  → CI/CD pipeline
    → Azure Functions (tools deployed as MCPs)
    → Azure AI Foundry (agent runtime)
    → Azure AI Search (knowledge base index)
```

- **Time to onboard a new agent:** ~half a day
- Each agent is defined by: name, description (used for routing), system prompt, tools (MCPs, file search/RAG, code interpreter), and linked GitHub repos (runbooks, RCA history)
- A **coordinator agent** routes incoming alerts or queries to the right specialist based on agent descriptions
- Knowledge bases auto-sync from linked GitHub repos — agents always work from fresh information

This is a production implementation of [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] applied to AIOps.

### API Gateway and Authentication

A significant engineering investment. The gateway:
- Validates user Okta tokens
- Propagates the token through the full tool-call chain
- For **automated RCA** (before human involvement): uses a **restricted persona** with narrowly scoped permissions validated at every tool call
- For **human-initiated chat**: full user impersonation — "whatever you can do, the agent can as well do"

> [!tip] This solves a real enterprise concern: no master super-user accounts; audit trails tied to real human permissions.

---

## The Autonomy Spectrum

A central insight from the talk: **neither extreme of the autonomy spectrum works**.

| Approach | Problem |
|----------|---------|
| **Fully autonomous** (arbitrary Prometheus queries, full agency) | Unpredictable trajectories; same alert takes different paths; 2/10 runs give useful output; context pollution |
| **Fully deterministic** (one tool per alert type) | Doesn't scale — N alert types requires N agent variants |
| **Middle ground** (curated reports, bounded tool set) | ✅ Works in practice |

The winning tool design: instead of letting agents run arbitrary PromQL queries, provide **pre-computed metric reports** — structured summaries analogous to a Grafana dashboard — so the agent sees the whole picture in a single tool call.

> "As a human when you get the alert you open Grafana dashboard and see graphs and charts… you are not looking at the raw data. That was our motivation."

Key practices:
- Limit the set of available tools
- Filter out noise before it reaches the context window
- Avoid high-agency unbounded queries; encode constraints deterministically in tools

This maps directly to the [[3 - Areas/AIOps/wiki/concepts/Token Noise Reduction]] concept: high agency = high token cost + low reliability.

---

## On-Call Agent Flow

```
Alert fires (Prometheus → AlertManager → Slack webhook)
  ├──→ On-call engineer notified
  └──→ Orchestrator agent (in parallel)
        ├──→ Sub-agent: Splunk (logs)
        ├──→ Sub-agent: Prometheus (metrics report)
        └──→ Sub-agent: Knowledge base (runbooks, past RCAs)
              ↓
        RCA + Recommendations posted to Slack
          → On-call picks up from here; can continue in thread
```

Agent outputs include **citations** (links to the specific Splunk queries run, metrics dashboards, runbook sections) to enable human verification and smooth handover.

---

## Progressive Autonomy

Adobe explicitly follows a staged [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] model:

| Stage | What the agent does |
|-------|---------------------|
| **1. RCA only** | Diagnose the issue, identify root cause |
| **2. Recommendations** | Propose `kubectl` commands or config changes from runbooks |
| **3. Human-approved actions** | "Do you want me to delete this pod? Yes/No" in Slack |
| **4. Narrow autonomous** *(future)* | Self-remediate for very low-risk, well-understood fault classes |

> "I personally still prefer to run everything by human eyes and then confirm the mutable actions."

---

## Self-Improving Knowledge Loop

RCAs feed back into the knowledge base:

```
Incident resolved
  → RCA stored in GitHub repo (Markdown)
  → Indexed into Azure AI Search vector DB
  → Future agents pull the same RCA pattern
```

- Prevents re-investigating identical fault signatures (expensive and slow)
- Postmortem database grows with each incident handled
- **Curation is manual**: automated self-improvement of the golden dataset was tried and failed; a human review cycle (bi-daily or weekly) is required

---

## Evaluation: LLM-as-Judge

Adobe's evaluation approach:
1. Collect **Slack threads** — alert + agent RCA + engineer follow-up discussion
2. Compare engineer's actions/conclusions with agent's RCA
3. Use **a second LLM to judge** the comparison → produces accuracy score (currently 71%)
4. Findings feed the curated **golden dataset** used for future evaluation

> [!note] This LLM-as-judge pattern corroborates [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]] best practices from [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]]'s eval methodology, but applies it to production Slack telemetry rather than mocked environments.

---

## Knowledge Base Engineering Lessons

- **Chunk size matters critically**: large runbooks split into 512-token chunks cause RAG to match similar command snippets from 5 different runbooks → context pollution → wrong answers
- **Target ~5K tokens per runbook**: each runbook covers one concrete use case and fits in a single retrieval chunk
- **Runbook quality problem**: "no one here can tell me they have very good runbooks" — generic, poorly maintained runbooks hurt agent performance more than tool design issues

---

## Key Takeaways

1. **80% of effort goes to tools and knowledge bases** — everything else (agent runtime, monitoring, prompt shields) was delegated to Azure
2. **Autonomy spectrum**: start high-agency, fail, pull back to structured tools — don't start fully deterministic either
3. **Authentication is a first-class engineering concern**, not an afterthought
4. **Self-improvement requires a human curation checkpoint** — fully autonomous golden-dataset refinement failed
5. **LLM-as-judge at production scale** — evaluate agent output by comparing it to real engineer Slack conversations

---

## Relationship Map

- [[3 - Areas/AIOps/wiki/concepts/AIOps]] — enterprise production results; autonomy spectrum lesson
- [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] — agent marketplace implementation
- [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]] — on-call agent RCA flow with real metrics
- [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]] — LLM-as-judge pattern from production Slack
- [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] — staged autonomy model
- [[3 - Areas/AIOps/wiki/concepts/Token Noise Reduction]] — curated reports as input-side noise reduction
- [[3 - Areas/AIOps/wiki/entities/Splunk]] — log data source in Adobe's stack
- [[3 - Areas/AIOps/wiki/entities/Prometheus]] — metrics data source
- [[3 - Areas/AIOps/wiki/concepts/Model Context Protocol]] — tools deployed as MCPs to Azure Functions
