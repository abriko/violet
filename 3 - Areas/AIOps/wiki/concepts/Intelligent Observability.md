---
tags: [concept]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# Intelligent Observability

**Coined by:** [[3 - Areas/AIOps/wiki/entities/Alolita Sharma]] (KubeCon 2024-03-22)  
**Stage in evolution:** Between classical cloud-native observability and full [[3 - Areas/AIOps/wiki/concepts/AIOps]]

---

## Definition

Intelligent Observability is the next generation of cloud-native observability: platforms that support AI models and applications as first-class workloads to observe, collect richer data, and enable understanding of system behaviour **qualitatively** as well as quantitatively.

> "The next generation of observability platforms will support AI models and applications out of the box. They will collect much more data & serve as the basis for truly understanding system behavior qualitatively in addition to quantitatively."
> — [[3 - Areas/AIOps/wiki/entities/Alolita Sharma]], KubeCon 2024

---

## The Observability Evolution Chain

Classical cloud-native observability (metrics + traces + logs) describes system behaviour in numbers, counts, and latencies. This is purely *quantitative*.

Intelligent Observability extends this with:

| Dimension | Classical Observability | Intelligent Observability |
|-----------|------------------------|--------------------------|
| Data types | Metrics, traces, logs | Above + AI model telemetry, richer context |
| Understanding | Quantitative (what happened) | Quantitative + qualitative (what it means) |
| AI role | None / post-hoc analytics | AI models are first-class observable workloads |
| Relationship to AIOps | Prerequisite data layer | First step of AIOps |

---

## Relationship to AIOps

Sharma frames Intelligent Observability as the **prerequisite** for [[3 - Areas/AIOps/wiki/concepts/AIOps]]:

```
Cloud-Native Observability → Intelligent Observability → AIOps
```

Once a platform can reason qualitatively about telemetry (not just collect it), it can begin automating operations: reducing MTTD, MTTR, and eventually preventing failures entirely.

This framing is consistent with the broader wiki theme:
- [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] exemplifies qualitative reasoning over observability data (natural-language incident summaries)
- [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]] 2.0's [[3 - Areas/AIOps/wiki/entities/UModel]] and AIOps Agent represent the full Intelligent Observability → AIOps pipeline at enterprise scale
- [[3 - Areas/AIOps/wiki/concepts/Computing Pushdown]] is a specific technique for making qualitative reasoning economically viable at scale

---

## AI Agents as Observable Workloads

The two Alibaba Cloud companion articles on [[3 - Areas/AIOps/wiki/entities/OpenClaw]] provide a concrete implementation of Sharma's "AI models as first-class observable workloads" framing. They introduce [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]] — a specialisation of Intelligent Observability that extends the three-pillar taxonomy with a fourth signal:

| Signal | AI Agent Concrete Form |
|---|---|
| Logs | Session audit logs (JSONL per conversation) + application logs |
| Metrics | OTEL: token consumption, cost, stuck sessions, queue depth |
| Traces | OTEL: full request chain from webhook receipt to model response |
| **Session audit** (4th signal) | **Structured record of every tool call, parameter, and cost — primary forensic data for security audits** |

This fourth signal is unique to AI Agents and has no classical observability equivalent. It addresses the non-determinism problem: because Agent behaviour cannot be predicted from code inspection, you need a persistent record of what actually happened.

---

## Relationship to Other Concepts

- **[[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]]** — the quantitative foundation that Intelligent Observability builds upon
- **[[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]]** — a specialisation: Intelligent Observability applied to AI Agent workloads, adding session audit logs as a fourth signal
- **[[3 - Areas/AIOps/wiki/concepts/AIOps]]** — the operational automation layer that Intelligent Observability enables
- **[[3 - Areas/AIOps/wiki/concepts/LLM Agent]]** — the primary mechanism for qualitative reasoning over observability data
- **[[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]]** — Grafana's proactive knowledge crawl is a concrete implementation of qualitative context-building
- **[[3 - Areas/AIOps/wiki/concepts/Application Performance Monitoring]]** — APM is a historical predecessor focused on quantitative performance metrics

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2024-03-22] Intelligent Observability The Foundation for Operating Smarter in the Age of AI]]
- [[3 - Areas/AIOps/wiki/sources/[2026-03-02] 你的 OpenClaw 真的在受控运行吗？]]
