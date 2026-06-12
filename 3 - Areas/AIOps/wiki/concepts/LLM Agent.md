---
tags: [concept]
created: 2026-04-13
updated: 2026-04-14
sources: 4
---

# LLM Agent

**Also known as:** AI agent, agentic LLM

---

## What It Is

An LLM Agent is an LLM that operates in an action-feedback loop: it takes an action (calls a tool), observes the result, decides what to do next, and repeats until the task is complete. This is in contrast to a single-call LLM (one prompt → one response) or a basic [[3 - Areas/AIOps/wiki/concepts/LLM Tool Calling|tool-calling LLM]] (one prompt → one tool call → one response).

> [!tip] Key insight
> Agency is what allows an LLM to "come up with a new recipe for every single request" — handling infinite task variety without predefined scripts.

---

## The Action-Feedback Loop

```
User task
   ↓
LLM decides next action
   ↓
Execute tool (query data source, search docs, edit dashboard, …)
   ↓
LLM observes result
   ↓
Can answer? ──Yes──→ Return answer
     │
    No
     ↓
LLM decides next action  (loop)
```

The loop continues until the LLM has enough information to resolve the task, or a timeout/step limit is reached.

---

## Why Observability Needs Agents

Simple [[3 - Areas/AIOps/wiki/concepts/LLM Tool Calling|tool-calling]] is insufficient for observability because:

1. **Multi-step questions** — debugging a production issue typically takes many sequential steps (find relevant dashboard → query metrics → check logs → correlate traces).
2. **Environment diversity** — every Grafana instance is different; no fixed script handles all setups.
3. **Infinite variety** — an open text box accepts any question; a static tool call chain cannot cover all cases.
4. **Context discovery** — finding the *relevant* metrics/dashboards/logs among millions of series requires dynamic exploration, not a single lookup.

---

## Capability Tiers (from the Grafana talk)

| Tier | Mechanism | Private context | Write actions | Multi-step |
|---|---|---|---|---|
| Single-call LLM | Prompt + response | ✗ | ✗ | ✗ |
| [[3 - Areas/AIOps/wiki/concepts/LLM Tool Calling]] | Prompt + tool pick | ✓ | ✓ | ✗ |
| **LLM Agent** | Action-feedback loop | ✓ | ✓ | ✓ |

---

## Challenges

- **Evaluation** — must use reproducible [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation|evals]], not ad-hoc "vibe testing".
- **Token cost & latency** — long loops accumulate context; [[3 - Areas/AIOps/wiki/concepts/Token Noise Reduction]] helps.
- **Scalability of instructions** — a monolithic agent with all tools and a 10k-token system prompt is brittle; [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] addresses this.
- **Non-determinism** — unlike traditional software, the same input can trigger different tool call sequences on different runs, making behaviour reproduction and cost attribution hard. See [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]].
- **Runtime security** — Agents can execute real actions (file write, API calls, command execution); without proper isolation and tool policies, prompt injection or misconfiguration can cause real harm. See [[3 - Areas/AIOps/wiki/concepts/AI Agent Runtime Security]].

---

## Production Observability Requirements

When deploying LLM Agents in production, four questions must be answerable at all times (from the [[3 - Areas/AIOps/wiki/entities/OpenClaw]] case study):

1. **Who** is triggering calls?
2. **How much** is it costing?
3. **What operations** were performed (especially high-risk tools)?
4. **Is behaviour traceable and auditable?**

This requires [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]] — a specialised four-signal telemetry approach (session audit logs + app logs + metrics + traces) that goes beyond classical three-pillar observability.

---

## Related

- [[3 - Areas/AIOps/wiki/concepts/LLM Tool Calling]] — the primitive agents are built on
- [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] — how to structure multiple cooperating agents
- [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]] — how to test and iterate on agents reliably
- [[3 - Areas/AIOps/wiki/concepts/Token Noise Reduction]] — how to keep agent loops efficient
- [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]] — how to monitor, audit, and attribute cost for production agents
- [[3 - Areas/AIOps/wiki/concepts/AI Agent Runtime Security]] — how to constrain what agents can do at runtime
- [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] — a production LLM agent for observability
- [[3 - Areas/AIOps/wiki/entities/K8sGPT]] — a CNCF Sandbox LLM agent for Kubernetes diagnostics and RCA
- [[3 - Areas/AIOps/wiki/entities/Argo Rollouts]] — AI analysis plugin; LLM agent used as a canary rollout gate
- [[3 - Areas/AIOps/wiki/entities/OpenClaw]] — open-source AI Agent runtime; primary case study for production observability

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-06-07] Building AI Into Observability Workflows]]
- [[3 - Areas/AIOps/wiki/sources/[2024-07-11] Now what? Kubernetes troubleshooting with AI?]]
- [[3 - Areas/AIOps/wiki/sources/[2025-11-25] Fix Production Rollouts on the Fly With Agentic AIOps]]
- [[3 - Areas/AIOps/wiki/sources/[2026-03-02] 你的 OpenClaw 真的在受控运行吗？]]
