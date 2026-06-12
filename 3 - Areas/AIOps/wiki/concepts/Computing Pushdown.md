---
tags: [concept]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# Computing Pushdown

**Also known as:** Compute pushdown, analytical pushdown, operator pushdown

---

## What It Is

Computing Pushdown is the strategy of pushing an LLM's analytical intent down to the underlying data engine for execution, rather than feeding raw observability data directly to the LLM. The LLM acts as an **intelligent orchestrator**: it selects and invokes specialised data operators, which preprocess the data at the source and return only high-value, condensed features for final LLM inference.

This is the primary technique used by [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]] 2.0 to make LLM-driven AIOps economically viable at petabyte-to-exabyte data scales.

---

## The Problem It Solves: The Compute Black Hole

A naive AIOps approach feeds raw high-volume data directly to the LLM — e.g., asking the model to analyse millions of log lines. This creates a "compute black hole":

- **Exorbitant GPU cost**: LLM inference on raw data at scale is prohibitively expensive
- **Poor ROI**: Most of the raw data has low information density — the LLM burns tokens on noise
- **Degraded quality**: LLM context windows fill with irrelevant data, crowding out important signals

> [!warning] Contrast with [[3 - Areas/AIOps/wiki/concepts/Token Noise Reduction]]
> Token Noise Reduction converts structured *tool output* (e.g., JSON) into natural language before the LLM reads it — an output-side technique. Computing Pushdown is an *input-side* technique: it pre-processes data at the storage engine before the LLM ever sees it. Both techniques reduce token consumption, but at different stages of the pipeline.

---

## How It Works

```
LLM receives task
      ↓
LLM selects appropriate observability operator(s)
      ↓
Operator runs inside [[Alibaba Cloud SLS]] (the data engine)
      ↓
Operator extracts key features from raw data at the source
      ↓
Condensed, high-value output returned to LLM
      ↓
LLM performs final inference and decision-making on preprocessed data
```

---

## Observability Operator Library

Alibaba Cloud has built an extensive library of purpose-built operators, deployed inside [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud SLS]]:

**Metric operators:**
| Operator | Purpose |
|----------|---------|
| Anomaly detection | Flag metric deviations without manual threshold setting |
| Forecasting | Project future values from historical trends |
| Clustering | Group similar metric patterns to reduce signal multiplicity |
| Dimensional drill-down | Identify which dimension (region, host, service) is responsible for a metric shift |

**Trace operators:**
| Operator | Purpose |
|----------|---------|
| Trace anomaly analysis | Identify abnormal spans or latency outliers in a call graph |
| Dimensional drill-down | Surface the axis of variance in trace data |
| Topology construction | Build and compare call-chain topologies across time windows |

**Log operators:**
- Pattern clustering (demonstrated: reduced hundreds of slow SQL queries to 3 distinct patterns)

---

## Measured Impact

| Approach | Token consumption | Quality |
|----------|-----------------|---------|
| Feed raw data to LLM | Baseline | Low (noise dominates) |
| Computing Pushdown | **<10% of baseline (>90% reduction)** | High (features only) |

> [!tip] Key insight
> The >90% token reduction from computing pushdown plus the ~4× reduction from [[3 - Areas/AIOps/wiki/concepts/Token Noise Reduction]] on output formatting can compound. Together they represent an order-of-magnitude improvement in LLM inference efficiency for observability workloads.

---

## Relationship to the AIOps Agent Architecture

Computing Pushdown maps directly to the **"Deep Insights"** capability tier in the [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]] AIOps Agent stack:

```
Decision support   ← complex RCA, change impact analysis
Deep insights      ← Computing Pushdown: operators run here
Topology awareness ← [[UModel]] entity graph traversal
Basic query        ← NL → SQL/PromQL retrieval
```

---

## Broader Applicability

The principle generalises beyond observability:
- Any system where LLMs must reason over large, structured datasets benefits from pushdown
- Database query optimization uses an analogous concept (predicate pushdown)
- The pattern will likely emerge in LLM-native data warehousing and analytics platforms

---

## Related

- **[[3 - Areas/AIOps/wiki/concepts/Token Noise Reduction]]** — complementary output-side token reduction technique
- **[[3 - Areas/AIOps/wiki/entities/Alibaba Cloud SLS]]** — the data engine where operators execute
- **[[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]]** — the AIOps platform that implements this pattern
- **[[3 - Areas/AIOps/wiki/entities/UModel]]** — provides topology context that guides which operators to invoke
- **[[3 - Areas/AIOps/wiki/concepts/LLM Agent]]** — the agent orchestrates the operator invocations
- **[[3 - Areas/AIOps/wiki/concepts/AIOps]]** — the use case that motivated this technique

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Apsara Conference Insights Rebuild Observability]]
