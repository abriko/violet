---
tags: [entity]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# Adobe

**Type:** Enterprise software company  
**Relevance:** One of the most detailed public enterprise case studies of production [[3 - Areas/AIOps/wiki/concepts/AIOps]] at Kubernetes scale

---

## AIOps at Adobe

Adobe's cloud infrastructure team operates:
- **70+ Kubernetes clusters**
- **20,000+ namespaces**
- **200,000+ services**

To scale on-call operations without proportionally growing headcount, the team built an agentic **on-call assistant** using a [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture|agent marketplace]] pattern over ~18 months (as of KubeCon 2026). Agent autonomy was expanded in deliberate stages — see [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]].

### Results

| Metric | Value |
|--------|-------|
| Automated alerts/month | 550 (~30% of total) |
| Engineering time saved/month | ~91 hours |
| RCA accuracy | 71% |

### Technology Stack

| Layer | Technology |
|-------|-----------|
| Agent runtime | Azure AI Foundry |
| Tools | MCPs deployed to Azure Functions |
| Knowledge bases | Azure AI Search (vector DB) |
| Knowledge source | GitHub repos (Markdown runbooks + RCA history) |
| Metrics | [[3 - Areas/AIOps/wiki/entities/Prometheus]] |
| Logs | [[3 - Areas/AIOps/wiki/entities/Splunk]] |
| Alerts | AlertManager → Slack webhooks |
| Identity | Okta (token propagated through full tool chain) |

---

## Self-Healing Rollouts (Carlos Sanchez)

Adobe's agentic AI work extends beyond incident response into the **release engineering** domain. [[3 - Areas/AIOps/wiki/entities/Carlos Sanchez]] (Principal Scientist) built an AI analysis plugin for [[3 - Areas/AIOps/wiki/entities/Argo Rollouts]] that:

- Replaces static PromQL success criteria with LLM confidence scoring during canary deployments
- Triggers a [[3 - Areas/AIOps/wiki/concepts/Self-Healing Systems|self-healing loop]] on rollback: AI diagnoses root cause → GitHub Issue created → coding AI (Google Jules) generates fix PR → human approves or auto-merges

This complements the on-call agent (which activates *after* an incident) by catching failures *during* deployment, limiting blast radius to the canary percentage.

Together, Adobe's two AIOps tracks cover the full software lifecycle:

| Track | Phase | Tool |
|-------|-------|------|
| On-call agent (Banjac/Prangishvili) | Production incidents | Azure AI Foundry + MCP |
| Self-healing rollouts (Sanchez) | Deployment pipeline | Argo Rollouts AI plugin |

---

## Key People

- [[3 - Areas/AIOps/wiki/entities/Danilo Banjac]] — Cloud infrastructure / AIOps lead; on-call agent
- [[3 - Areas/AIOps/wiki/entities/Iveri Prangishvili]] — Cloud infrastructure engineer; on-call agent
- [[3 - Areas/AIOps/wiki/entities/Carlos Sanchez]] — Principal Scientist; Argo Rollouts AI plugin and self-healing rollouts

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Is AIOps the Future of Operations?]]
- [[3 - Areas/AIOps/wiki/sources/[2025-11-25] Fix Production Rollouts on the Fly With Agentic AIOps]]
