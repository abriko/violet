---
tags: [entity]
created: 2026-04-13
updated: 2026-04-13
sources: 1
---

# Prometheus

**Type:** Open-Source Monitoring & Metrics System  
**Maintained by:** CNCF (Cloud Native Computing Foundation)  
**Website:** https://prometheus.io

---

## Overview

Prometheus is the de-facto standard for metrics collection and alerting in cloud-native environments. It uses a pull-based scraping model, a multi-dimensional time-series data model with labels, and PromQL as its query language.

It has achieved broad adoption as the **metrics standard** in the cloud-native era, with the Prometheus data format and remote-write protocol supported natively by most observability platforms and cloud vendors.

---

## Role in the Observability Stack

Prometheus occupies the **Metrics** pillar of the [[3 - Areas/AIOps/wiki/concepts/Observability Three Pillars]] (Logs · Traces · Metrics). It is commonly paired with:

- **[[3 - Areas/AIOps/wiki/entities/Grafana]]** — for dashboard visualization and unified queries across multiple Prometheus instances
- **[[3 - Areas/AIOps/wiki/entities/OpenTelemetry]]** — which can export metrics in Prometheus-compatible format
- **Alertmanager** — for routing and deduplication of Prometheus alerts

---

## Cloud-Managed Variants

Most major cloud providers offer managed Prometheus services:

- **Alibaba Cloud ARMS Prometheus** — part of [[3 - Areas/AIOps/wiki/entities/Alibaba Cloud ARMS]]; supports GlobalView for cross-instance unified queries
- **Amazon Managed Prometheus (AMP)**
- **Google Cloud Managed Prometheus**
- **Grafana Cloud** — Grafana-hosted Prometheus (Mimir backend)

---

## PromQL

PromQL (Prometheus Query Language) is the query language for Prometheus time-series data. Notably, [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] can generate PromQL queries automatically from natural-language prompts, lowering the barrier for ad-hoc observability investigations.

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-04-13] All in One How to Build an End-to-End Observable System]]
