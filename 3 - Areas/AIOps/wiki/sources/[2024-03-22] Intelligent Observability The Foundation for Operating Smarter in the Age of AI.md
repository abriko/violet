---
tags: [source]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# \[2024-03-22] Intelligent Observability: The Foundation for Operating Smarter in the Age of AI

**Speaker:** [[3 - Areas/AIOps/wiki/entities/Alolita Sharma]]  
**Organisation:** [[3 - Areas/AIOps/wiki/entities/CNCF]]  
**Format:** KubeCon + CloudNativeCon talk (YouTube)  
**Published:** 2024-03-22  
**URL:** https://www.youtube.com/watch?v=8sQo493lOiE

---

## Summary

Alolita Sharma argues that the cloud-native observability baseline — instrumenting systems to emit metrics, traces, and logs — is being fundamentally extended by LLM-powered applications. She introduces the term **[[3 - Areas/AIOps/wiki/concepts/Intelligent Observability]]** to describe the next generation of observability platforms that support AI models natively and understand system behaviour *qualitatively* (not just quantitatively).

Her key claim: **Intelligent Observability is the first step of [[3 - Areas/AIOps/wiki/concepts/AIOps]].**

---

## Key Points

### The Evolving Baseline

Classical cloud-native observability = metrics + traces + logs ([[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]]). These signals describe system behaviour *quantitatively* (numbers, counts, latencies).

New AI-enabled applications leverage LLMs and demand a richer observability layer — one that can also reason qualitatively about what those numbers mean.

### Intelligent Observability Defined

> "The next generation of observability platforms will support AI models and applications out of the box. They will collect much more data & serve as the basis for truly understanding system behavior qualitatively in addition to quantitatively."

Intelligent Observability is thus:
- **Quantitative:** traditional telemetry (metrics, traces, logs)
- **Qualitative:** LLM-powered reasoning about what the data means
- **Proactive:** AI-native platforms that support AI models as first-class workloads to observe

### Intelligent Observability → AIOps

Sharma frames the relationship as a prerequisite chain:

```
Cloud-Native Observability → Intelligent Observability → AIOps
```

[[3 - Areas/AIOps/wiki/concepts/AIOps]] is defined here as the application of AI, ML, and data analysis to manage enterprise applications and infrastructure, with the goal of:
- Reducing **time to detect** (MTTD)
- Reducing **time to resolve** (MTTR)
- Ultimately **preventing** failures before they occur

---

## Relationship to Other Sources

- Consistent with [[3 - Areas/AIOps/wiki/entities/Asaf Yigal]]'s framing in [[3 - Areas/AIOps/wiki/sources/[2024-10-28] AI-powered observability picking up where AIOps failed]] — both position AI as the layer that elevates observability from data collection to operational intelligence
- Consistent with [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]] 2.0's vision: qualitative reasoning over observability data via [[3 - Areas/AIOps/wiki/entities/UModel]] and the AIOps Agent
- The "qualitative + quantitative" framing anticipates the [[3 - Areas/AIOps/wiki/sources/[2025-06-07] Building AI Into Observability Workflows|Grafana MCP/agent work]], where LLMs interpret dashboards rather than just rendering them

---

## Limitations of This Source

> [!note] The raw capture is a YouTube video description, not a transcript. Specific implementation details, benchmarks, and tooling recommendations are not available from this source alone. Key value is the conceptual framing and terminology ("Intelligent Observability" as a distinct stage).
