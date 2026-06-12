---
tags: [source]
created: 2026-04-13
updated: 2026-04-13
sources: 1
---

# [2026-04-09] Start with Grafana AI Assistant and ask your observability stack anything

**Type:** YouTube demo video
**Author:** [[3 - Areas/AIOps/wiki/entities/Grafana]] (presenter unnamed)
**Published:** 2026-04-09
**URL:** https://www.youtube.com/watch?v=JrXGSw2rU0A

---

## Summary

A short product demo of [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] showing two natural-language queries against a live Grafana Cloud instance:

1. **"Build me a service diagram of what services we have and how does data flow between them?"** — Assistant returns a full architecture diagram with all connected services, leveraging pre-built [[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]].
2. **"Which service is using the most CPU?"** — Assistant issues seven PromQL queries automatically, ranks results, and returns a plain-language answer (Kafka / frontend highest).

The demo highlights that the Assistant can do in seconds what would otherwise require navigating dashboards, writing PromQL, or interrupting a colleague.

---

## Key Takeaways

- [[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]] is a foundational feature: a weekly scheduled crawl stores context (services, regions, environment type, relationships) in a database *before* the user asks anything. This gives the assistant ambient system knowledge.
- The assistant executes multiple backend queries ([[3 - Areas/AIOps/wiki/concepts/LLM Tool Calling]]) that it hides by default but exposes on demand — balancing usability and transparency.
- [[3 - Areas/AIOps/wiki/concepts/LLM Agent|Agentic]] PromQL generation dramatically lowers the bar for less experienced users who might forget syntax details.
- Optional integration with Grafana [[3 - Areas/AIOps/wiki/concepts/Knowledge Graph]] for richer cross-signal context.
- Getting-started docs are now public, suggesting the product has moved beyond private preview.

---

## New Concepts Introduced

- [[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]] — proactive, scheduled infrastructure knowledge base built before queries arrive

---

## Notable Quotes

> "It already knew this before I even asked the question." — on Infrastructure Memory pre-loading context

> "It made seven queries here to answer this question." — on automated multi-step [[3 - Areas/AIOps/wiki/concepts/LLM Tool Calling]]

---

## Related Pages

- [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] — primary entity demonstrated
- [[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]] — new concept surfaced
- [[3 - Areas/AIOps/wiki/concepts/LLM Tool Calling]] — mechanism used for multi-query execution
- [[3 - Areas/AIOps/wiki/sources/[2025-06-07] Building AI Into Observability Workflows]] — companion source covering architecture internals
