---
tags:
  - entity
created: 2026-04-23
updated: 2026-04-23
sources: 1
---

# Neo4j

Graph database platform used as the backend for [[SynergyRCA]]'s StateGraph and MetaGraph. Neo4j's Cypher query language enables LLM-generated graph traversals for [[Root Cause Analysis]] in [[Kubernetes]].

## Role in AIOps

In the SynergyRCA architecture, Neo4j stores:

- **StateGraph** — runtime entity relationships and STATE snapshots from K8s clusters
- **MetaGraph** — schema-level entity kind connections

The PathQueryGen LLM module generates Cypher queries to traverse these graphs, achieving ~95% executable query precision. Neo4j's native graph traversal is well-suited for following dependency chains across K8s resource types (Pod → PVC → PV → NFS, etc.).

## Relationships

- [[SynergyRCA]] — primary user in the wiki context
- [[Knowledge Graph]] — Neo4j is a common backend for knowledge graph implementations

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-06-03] Simplifying Root Cause Analysis in Kubernetes with StateGraph and LLM]]
