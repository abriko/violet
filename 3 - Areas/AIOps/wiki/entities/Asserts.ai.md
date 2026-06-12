---
tags: [entity]
created: 2026-05-13
updated: 2026-05-13
sources: 1
---

# Asserts.ai

**Type:** Acquired company (by Grafana Labs)

---

## Overview

Asserts.ai is a company acquired by Grafana Labs whose technology powers Grafana's [[3 - Areas/AIOps/wiki/concepts/Knowledge Graph]] and RCA Workbench. Its core capabilities are:

- **Entity discovery** — automatically discovers services, pods, nodes, databases
- **Relationship mapping** — builds dependency and topology relationships between entities
- **Insight generation** — detects resource saturation, error rate anomalies, latency anomalies, deployment/config changes
- **Timeline correlation** — places entities and insights on a shared timeline for incident investigation

---

## RCA Workbench

The Asserts.ai technology enables an entity-centric RCA Workbench where investigators can see fault propagation on a timeline:

```
Config change → Service errors → Downstream timeout → Upstream retry → Resource exhaustion → Cascade
```

The key investigative question becomes: **"Which insight appeared first?"** — identifying the initiating event in a cascade rather than the most visible symptom.

---

## Related

- [[3 - Areas/AIOps/wiki/concepts/Knowledge Graph]] — powered by Asserts.ai entity discovery and relationship mapping
- [[3 - Areas/AIOps/wiki/concepts/Root Cause Analysis]] — RCA Workbench enables investigation-based RCA
- [[3 - Areas/AIOps/wiki/entities/Grafana]] — parent company post-acquisition

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-05-13] Grafana 给 AI RCA 提了个醒]]
