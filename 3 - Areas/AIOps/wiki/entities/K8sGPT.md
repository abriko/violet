---
tags: [entity]
created: 2026-04-14
updated: 2026-04-23
sources: 2
---

# K8sGPT

**Type:** Open-source CLI tool + Kubernetes Operator (CNCF Sandbox project)  
**Repository:** https://github.com/k8sgpt-ai/k8sgpt  
**Domain:** Kubernetes diagnostics, AI-powered observability, [[3 - Areas/AIOps/wiki/concepts/AIOps]]

---

## Overview

K8sGPT is a CNCF Sandbox project that scans Kubernetes clusters, diagnoses issues, and delivers explanations and remediation suggestions in plain English by routing diagnostic data through an LLM backend. It bridges the gap between Kubernetes' notoriously complex output and the understanding of engineers who are not deep Kubernetes specialists.

It is an early production example of a domain-specific [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] for infrastructure operations — integrating cluster scanning, multi-source analysis, and natural language generation in a single tool.

---

## Architecture

K8sGPT separates detection from explanation:

| Mode | What happens |
|------|-------------|
| `k8sgpt analyse` | Cluster scan only — detects issues using built-in rules, no AI call |
| `k8sgpt analyse --explain` | Sends diagnostic data to configured LLM backend; returns plain-English explanation + recommendations |

This two-phase design keeps AI costs opt-in and makes the tool useful even without an LLM backend.

### Supported AI Backends

OpenAI (GPT-4), Azure OpenAI, Amazon Bedrock, Amazon SageMaker, Google Vertex AI, Hugging Face, LocalAI, Cohere, OCI, and more.

---

## Key Features

### Built-in Analysers
Native coverage for Pods, Services, Nodes, Deployments, and other core Kubernetes resources.

### Integrations
| Integration | Purpose |
|------------|---------|
| [[3 - Areas/AIOps/wiki/entities/Prometheus]] + Alertmanager | Metrics-based analysis; continuous monitoring in Operator mode |
| Trivy | Kubernetes CVE scanning; vulnerability reports with AI-driven remediation |
| AWS ACK | Analyse AWS resources managed by Kubernetes CRD controllers |
| KEDA | Autoscaler event analysis |

### Operator Mode
Deployable as a Kubernetes Operator for **continuous ambient monitoring** — moves K8sGPT from an on-demand CLI to a persistent in-cluster AI diagnostics layer. This parallels the proactive observability design of [[3 - Areas/AIOps/wiki/concepts/Infrastructure Memory]] and [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud Cloud Monitor]] 2.0's intelligent inspection.

### Data Anonymisation
An `--anonymize` flag strips sensitive identifiers from diagnostic payloads before sending to external AI APIs — addressing enterprise data-sovereignty concerns about external LLM backends.

---

## Positioning

K8sGPT is explicitly positioned as a **lightweight alternative** to traditional [[3 - Areas/AIOps/wiki/concepts/AIOps]] tooling:

> "Almost all of those [AIOps] tools consume huge amounts of GPU resources and that increases the underlying cost and the maintainability issue."

K8sGPT instead leverages existing hosted LLM APIs (OpenAI, Bedrock), shifting the compute cost off the operator and onto managed inference endpoints. This makes AI-assisted RCA accessible to teams without dedicated ML infrastructure.

---

## Relationship to Other Concepts

- **[[3 - Areas/AIOps/wiki/concepts/LLM Agent]]** — K8sGPT's `--explain` path is an LLM agent loop: scan → send context → receive diagnosis → display
- **[[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]]** — the primary deliverable; K8sGPT localises and explains K8s faults
- **[[3 - Areas/AIOps/wiki/concepts/AIOps]]** — lightweight AIOps alternative; avoids the GPU-heavy model training of traditional AIOps
- **[[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]]** — consumes K8s events (logs), cluster metrics, and resource states
- **[[3 - Areas/AIOps/wiki/entities/Prometheus]]** — integration for continuous monitoring mode
- **[[3 - Areas/AIOps/wiki/entities/SynergyRCA]]** — academic alternative using graph-based RAG; comparison: K8sGPT uses LLM only for NL output while SynergyRCA uses LLM for full reasoning + code generation

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2024-07-11] Now what? Kubernetes troubleshooting with AI?]]
- [[3 - Areas/AIOps/wiki/sources/[2025-06-03] Simplifying Root Cause Analysis in Kubernetes with StateGraph and LLM]]
