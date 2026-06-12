---
tags: [entity]
created: 2026-05-13
updated: 2026-05-13
sources: 1
---

# Sift

**Type:** Product feature (Grafana Cloud)
**Maintainer:** [[3 - Areas/AIOps/wiki/entities/Grafana]]

---

## Overview

Sift is an automated diagnostic checklist for Kubernetes infrastructure within Grafana Cloud. It is explicitly **not** an AI agent — it runs curated, explainable rule-based checks against K8s clusters to surface common failure patterns.

---

## How It Works

Sift requires cluster and namespace context, then runs a series of diagnostic checks:

- Error log pattern detection
- Pod crash analysis (CrashLoopBackOff)
- OOMKill detection
- Deployment rollout issues
- Noisy neighbor identification
- CPU throttling detection
- Resource contention analysis

Each check produces an explainable result that can be reviewed by engineers or consumed by [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] for further correlation and explanation.

---

## Design Philosophy

> [!tip] Key insight
> High-frequency failure patterns should be productized as explainable diagnostic rules, not delegated to LLMs. LLM value lies in organizing, explaining, and correlating check results — and suggesting next steps.

This represents Grafana's "engineering-first" approach to AI RCA: codify what you already know as deterministic checks; use AI to synthesize and explain, not to guess.

---

## Related

- [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]] — Sift provides the diagnostic evidence that feeds RCA investigations
- [[3 - Areas/AIOps/wiki/entities/Grafana]] — parent platform
- [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] — consumes Sift results in Investigations workflow

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-05-13] Grafana 给 AI RCA 提了个醒]]
