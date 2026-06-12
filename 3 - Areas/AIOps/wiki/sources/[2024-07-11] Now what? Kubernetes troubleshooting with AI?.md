---
tags: [source]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# Now what? Kubernetes troubleshooting with AI?

**Author:** [[3 - Areas/AIOps/wiki/entities/Emin Alemdar]] (CNCF Ambassador)  
**Published:** 2024-07-11  
**Original venue:** Medium; cross-posted to CNCF blog  
**URL:** https://www.cncf.io/blog/2024/07/11/now-what-kubernetes-troubleshooting-with-ai/

---

## Summary

A hands-on introduction to [[3 - Areas/AIOps/wiki/entities/K8sGPT]], a CNCF Sandbox project that scans Kubernetes clusters and translates complex diagnostic data into plain-English explanations and actionable recommendations. The article positions K8sGPT as a practical [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] for Kubernetes [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]], deployable either as a local CLI or as a Kubernetes Operator for continuous monitoring.

---

## Key Takeaways

### 1. The Kubernetes Troubleshooting Problem

Kubernetes diagnostics are hard even with a full observability stack because:
- Logs are verbose and not always human-readable
- Investigation requires jumping across pods, events, and dashboards
- Diagnosis times and troubleshooting times extend drastically

Traditional AIOps tools exist but "consume huge amounts of GPU resources" — increasing cost and maintainability burden.

### 2. K8sGPT: AI-Powered Diagnostics in Plain English

[[3 - Areas/AIOps/wiki/entities/K8sGPT]] is a CNCF Sandbox project that:
- Scans Kubernetes clusters for critical issues
- Translates diagnostic data into simple, understandable suggestions
- Integrates with multiple AI backends (OpenAI, Azure OpenAI, Amazon Bedrock, and others)

Key CLI flow:
```
k8sgpt analyse             # detect issues (no AI yet)
k8sgpt analyse --explain   # connect to LLM; get plain-English explanation + recommendations
```

The `--explain` flag is the AI layer — without it, K8sGPT works like a standard linter; with it, the LLM provides contextual diagnosis and remediation steps.

### 3. Key Feature Set

| Feature | Detail |
|---------|--------|
| **Workload Health Analysis** | Scans Pods, Services, Nodes; transforms complex diagnostics into suggestions |
| **AI-Powered Diagnostics** | LLM explains issues and recommends fixes in plain English |
| **Built-in + Custom Analysers** | Native analysers for K8s resources; extensible for custom needs |
| **Continuous Monitoring** | Deploy as a Kubernetes Operator; integrates with [[3 - Areas/AIOps/wiki/entities/Prometheus]] and Alertmanager |
| **Security CVE Review** | Trivy integration installs Trivy K8s Operator; surfaces CVEs with AI-driven explanations |
| **AWS ACK Integration** | Analyse AWS resources managed by ACK controllers alongside K8s resources |

### 4. Data Privacy: Anonymisation

Before sending diagnostic data to an AI backend, K8sGPT can **anonymise** the data — replacing sensitive identifiers with placeholders. This directly addresses security concerns about sending internal infrastructure details to external AI APIs.

### 5. Operator Mode

K8sGPT can run as a Kubernetes Operator, enabling:
- Continuous ambient monitoring (not just on-demand CLI runs)
- Integration with existing cluster tooling (Prometheus, Alertmanager)
- A persistent AI diagnostics layer embedded in the cluster itself

This mirrors the shift from reactive to proactive observability seen in [[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]] (Grafana's weekly crawl) and [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]] 2.0's intelligent inspection feature.

---

## Relationship to Existing Pages

- [[3 - Areas/AIOps/wiki/entities/K8sGPT]] — the primary subject; new entity page created
- [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] — K8sGPT is a concrete Kubernetes-domain LLM agent; adds to the gallery alongside [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]]
- [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]] — K8sGPT's `--explain` output is practical AI-assisted RCA
- [[3 - Areas/AIOps/wiki/concepts/AIOps]] — K8sGPT is positioned as a lightweight AIOps alternative that avoids the "huge GPU resource" cost of traditional AIOps tooling
- [[3 - Areas/AIOps/wiki/entities/Prometheus]] — named integration target for continuous monitoring mode
- [[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]] — K8sGPT consumes K8s events/logs/metrics to drive its analysis
