---
tags: [concept]
created: 2026-04-21
updated: 2026-04-21
sources: 1
---

# Policy as Code

## Definition

**Policy as Code** is the practice of encoding operational rules, security constraints, and compliance requirements as machine-executable code — typically evaluated by a deterministic policy engine — rather than as documentation or human judgment.

In the context of [[3 - Areas/AIOps/wiki/concepts/Agentic DevOps]], Policy as Code serves as the **deterministic safety layer** that constrains probabilistic AI agent behaviour. It is the primary answer to the question: *"How do we sleep at night knowing an AI has root access?"*

The term is also framed as **Constitutional AI** by [[3 - Areas/AIOps/wiki/entities/Harness]] — defining the "constitution" that agents must operate within.

---

## The Core Problem It Solves

AI agents are probabilistic: given the same alert, an agent may take a slightly different remediation path each time. Traditional Ops relies on determinism. Policy as Code bridges this gap by making the **boundary conditions** deterministic, even when the agent's internal reasoning is not.

> "Before any tool is executed, the agent's plan must pass through a deterministic policy engine. If an agent tries to execute `terraform destroy` on a production database, the policy engine kills the command hard, regardless of what the LLM 'thinks' is right." — [[3 - Areas/AIOps/wiki/entities/Harness]] blog

---

## Implementation Pattern

```
Agent reasoning → Tool call request → Policy engine evaluation → ALLOW / DENY → Execute or abort
```

1. Agent formulates a plan and identifies the next tool call
2. Tool call is submitted to the policy engine **before** execution
3. Policy engine evaluates against rules (e.g., OPA policies, Sentinel, custom rulesets)
4. **ALLOW**: tool executes; result returned to agent
5. **DENY**: tool aborted; reason logged; agent may re-plan or escalate to human

---

## Example Policies

| Rule | Example |
|---|---|
| No destructive production operations | `terraform destroy` on prod → always DENY |
| Namespace-scoped writes | Remediation agent write permissions limited to its assigned namespace |
| Read-only diagnosis agents | Diagnosis agents have zero write permissions |
| Approved tool list | Only kubectl, AWS CLI, git are executable; no arbitrary shell |
| Time-of-day gates | No automated changes during peak traffic hours |

---

## Relationship to Other Guardrails

Policy as Code is one of three complementary guardrails for agentic systems (from [[3 - Areas/AIOps/wiki/entities/Harness]]):

| Layer | Mechanism | What it prevents |
|---|---|---|
| **Policy as Code** | Deterministic policy engine | Unauthorized or dangerous actions |
| **Contextual Permissions** | Least-privilege IAM roles per agent type | Privilege escalation; blast radius containment |
| **Black Box Recorder** | Tamper-proof audit log | Post-incident accountability; replay for debugging |

---

## Tools

- **Open Policy Agent (OPA)**: open-source, general-purpose policy engine; CNCF graduated project
- **HashiCorp Sentinel**: policy-as-code framework for Terraform/Vault
- **GitHub Actions required workflows**: policy enforcement at the CI/CD level
- **MCP Server Allowlist** ([[3 - Areas/AIOps/wiki/entities/GitHub Advanced Security]]): org-level policy on which MCP servers agents may use

---

## Relationship to Existing Security Concepts

| Concept | Relationship |
|---|---|
| [[3 - Areas/AIOps/wiki/concepts/AI Agent Runtime Security]] | Policy as Code is the pre-execution enforcement layer; Runtime Security also covers sandbox isolation and post-execution monitoring |
| [[3 - Areas/AIOps/wiki/concepts/AI-Generated Code Safety]] | Policy as Code governs agent *actions*; AI-Generated Code Safety governs agent *outputs* (IaC, code) |
| [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] | Higher autonomy levels require more comprehensive Policy as Code coverage before trust can be extended |
| [[3 - Areas/AIOps/wiki/concepts/Human-in-the-Loop]] | Policy as Code can encode HitL requirements (e.g., require human approval before any write operation) |

---

## Relationships

- [[3 - Areas/AIOps/wiki/entities/Harness]] — introduced the Constitutional AI framing
- [[3 - Areas/AIOps/wiki/concepts/Agentic DevOps]] — Policy as Code is a required architectural component
- [[3 - Areas/AIOps/wiki/concepts/Three Horizons of Adoption]] — H2 and H3 require Policy as Code as a prerequisite
- [[3 - Areas/AIOps/wiki/concepts/AI Agent Runtime Security]] — complementary security layer
- [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] — trust extension requires policy coverage
- [[3 - Areas/AIOps/wiki/concepts/Human-in-the-Loop]] — policies can encode approval requirements

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-02-11] Agentic AI in DevOps Architecting Autonomous Infrastructure]]
