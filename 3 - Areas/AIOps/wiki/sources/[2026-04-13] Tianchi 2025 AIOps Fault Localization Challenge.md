---
tags: [source]
created: 2026-04-13
updated: 2026-04-13
sources: 1
---

# [2026-04-13] Tianchi 2025 AIOps Fault Localization Challenge

**Source:** [GitHub — alibabacloud-observability/tianchi-2025](https://github.com/alibabacloud-observability/tianchi-2025)  
**Author:** Alibaba Cloud Observability team  
**Contest:** [Tianchi 2025 AI-Native Programming Challenge](https://tianchi.aliyun.com/competition/entrance/532387)  
**Contest year:** 2025  
**Captured:** 2026-04-13

---

## Summary

Reference implementation (sample code) for the Alibaba Cloud Tianchi 2025 AI-native programming challenge track focused on **AIOps fault localization**. The repository demonstrates how to build an automated [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]] tool that consumes observability signals and outputs the identified root cause for each incident case.

---

## Key Takeaways

### 1. RCA as a Formalised ML Benchmark

The contest frames [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]] as a structured, evaluable task with clean I/O contracts:

| | Path | Format |
|--|------|--------|
| **Input** | `dataset/input.jsonl` | JSONL — one problem case per line |
| **Output** | `dataset/output.jsonl` | JSONL — identified root cause per case |

This signals an industry trend: RCA is moving from an art (human expert troubleshooting) to an engineering discipline with reproducible benchmarks — mirroring how [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]] formalized LLM agent quality.

### 2. Alibaba Cloud Observability Stack as Backend

The sample solution authenticates against Alibaba Cloud services via RAM role credentials:

```bash
export ALIBABA_CLOUD_ACCESS_KEY_ID="..."
export ALIBABA_CLOUD_ACCESS_KEY_SECRET="..."
export ALIBABA_CLOUD_ROLE_ARN="acs:ram::1672753017899339:role/tianchi-user-a"
export ALIBABA_CLOUD_ROLE_SESSION_NAME="my-sls-access"
```

The role name (`tianchi-user-a`) and session name suggest access to **SLS (Log Service)** — [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud ARMS]]'s log backend — as the observability data source for contestant queries.

### 3. AIOps Positioning

The contest is explicitly framed as part of an "AI-native programming" challenge series, positioning [[3 - Areas/AIOps/wiki/concepts/AIOps]] fault localization as a first-class AI engineering task rather than a traditional DevOps skill. Contestants are expected to apply LLMs, ML models, or rule-based reasoning to automate what human SREs currently do manually.

---

## Relationship to Existing Wiki

- Directly instantiates [[3 - Areas/AIOps/wiki/concepts/AIOps]] and [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]] as practical, benchmarked capabilities
- Uses [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud ARMS]] / SLS as the observability data backend
- The JSONL benchmark format parallels [[3 - Areas/AIOps/wiki/concepts/LLM Evaluation]] methodology (structured I/O, reproducible scoring)

---

## Pages Created from This Source

**Concepts:** [[3 - Areas/AIOps/wiki/concepts/AIOps]]
