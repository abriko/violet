---
tags: [concept]
created: 2026-04-21
updated: 2026-04-21
sources: 1
---

# AI-Generated Code Safety

## Definition

AI-Generated Code Safety is the set of practices, prompt patterns, and automated validation techniques required to safely use LLMs (ChatGPT, Claude, Copilot) to generate infrastructure code (Terraform, Kubernetes YAML, CI/CD pipelines) without introducing security vulnerabilities, operational failures, or compliance violations.

The core problem: AI models are trained on millions of GitHub/StackOverflow examples where the priority is **"works"**, not **"secure"**. Default AI output optimises for the happy path — code that runs immediately in a dev environment but is unsuitable for production.

> [!warning] The "brilliant junior engineer" framing
> Treat AI-generated infrastructure code like a PR from a talented but reckless junior engineer — no blind merges. Unlike a human junior who might add TODO comments or flag uncertainty, AI output looks authoritative regardless of quality.

---

## The 5 Anti-Patterns

| Anti-Pattern | Symptom | Example |
|---|---|---|
| Infra ≠ secure infra | Permissive security groups, open SSH | `cidr_blocks = ["0.0.0.0/0"]` for SSH |
| Developer prompts, not DevOps prompts | Missing rollback, secrets management, health checks | Basic CI workflow without OIDC auth |
| False confidence | Clean-looking code with hidden production risks | K8s Deployment with no health checks, `latest` tag, root container |
| No SRE system prompt | Low-fidelity output missing HA, monitoring, compliance | Single-AZ RDS with `password123` and `skip_final_snapshot = true` |
| Blind YAML trust | Secrets in env vars, no resource limits | `value: "sk_live_..."` in plain-text Pod spec |

### Root Cause of Each Anti-Pattern

The training data bias means AI defaults consistently favour:
- Working over secure
- Simple over resilient
- Dev environment over production environment
- Explicit configuration over security-by-default

---

## Mitigation Techniques

### 1 — Security-First Prompts

Every infrastructure prompt must include explicit security constraints. Never ask for "a web server security group"; ask for "a production web server security group following least-privilege: no direct internet SSH, minimal inbound, explicit outbound, compliance tags."

System prompt template for SRE context:
```
You are a Senior Site Reliability Engineer at a Fortune 500 company. Systems handle millions of requests/day. Every piece of infrastructure must be: secure by default (zero-trust), highly available (99.99% SLA), observable (comprehensive monitoring), cost-optimized, SOC2/PCI-DSS compliant. Include error handling, least privilege, monitoring, DR considerations.
```

### 2 — "AI Audits AI" Technique

> [!tip] Key workflow pattern
> After generating infra code, immediately follow up with a security-audit prompt asking the AI to act as a paranoid Senior Security Engineer reviewing its own output. In a documented case, this surfaced 7 previously missed issues: 2× Critical (root container, missing resource limits), 2× High (security context, env-var secrets), 2× Medium (missing network policy, over-privileged service account), 1× Low (missing PodDisruptionBudget).

Audit prompt template:
```
You are a Senior Security Engineer auditing the [RESOURCE TYPE] you just generated. The app handles PCI-compliant data, runs in a shared cluster, and will be targeted by sophisticated attackers. For each issue found: severity (Critical/High/Medium/Low), specific line/config, exact fix, why it matters in production. Be paranoid.
```

This generates → audits → fixes loop before any automated tooling is run.

### 3 — Automated Validation Pipeline

All AI-generated IaC must pass automated gates before merge:

**Terraform:**
- `tfsec` — security scanning
- `Checkov` — multi-language IaC security
- `Snyk IaC` — vulnerability scanning
- `Infracost` — cost estimation (catches business-logic errors AI misses)
- OPA policies — custom company policy enforcement

**Kubernetes:**
- `kube-score` — object analysis
- `kubeval` — YAML schema validation
- `OPA Gatekeeper` — admission control policies
- `Falco` — runtime security monitoring

**CI/CD safety gate (GitHub Actions)** — automatic rejection of:
- `0.0.0.0/0` CIDR blocks in any Terraform file
- Hardcoded secrets matching `(password|secret|key).*=.*"..."` patterns
- `image:.*:latest` tags in Kubernetes manifests
- K8s Deployments without `resources:` limits

### 4 — The 60/40 Rule

**AI handles 60% of the typing. 100% of the thinking stays with the engineer.**

| AI appropriate for | Engineer must still do |
|---|---|
| Generating boilerplate | Understand what code does |
| Exploring implementation options | Verify security requirements |
| Finding likely errors | Ensure fit with existing architecture |
| Researching unfamiliar tech best practices | Test in context |
| | Make architectural decisions based on business reality |

Real failure mode: an AI-generated autoscaling configuration that was technically correct but added $10K/month in costs because the AI had no knowledge of actual traffic patterns.

---

## Checklist for AI-Generated Infrastructure

**Security:**
- [ ] Least privilege principle applied?
- [ ] Secrets managed securely (not hardcoded)?
- [ ] Network segmentation implemented?
- [ ] Security scanning enabled?

**Reliability:**
- [ ] Health checks configured?
- [ ] Resource limits reasonable?
- [ ] Retry and timeout logic included?
- [ ] Monitoring and alerting covered?

**Operations:**
- [ ] Logging configured?
- [ ] Deployment strategy defined?
- [ ] Rollback plan exists?
- [ ] Environment-specific configs separated?

---

## Relationship to AI Agent Runtime Security

[[3 - Areas/AIOps/wiki/concepts/AI Agent Runtime Security]] addresses the security of AI Agents *at execution time* — sandbox isolation, tool policies, ACP approval. AI-Generated Code Safety addresses a different layer: the security of *infrastructure code written by AI*. Both arise from the same root cause (AI defaults to functional, not secure) but apply at different points:

- **AI-Generated Code Safety** → secure the IaC/config before deployment
- **AI Agent Runtime Security** → secure the Agent's actions after deployment

> [!note]
> The "AI audits AI" technique here parallels the OpenClaw observability principle: runtime defences alone are insufficient — you need an independent verification layer. Here, that layer is a security-audit follow-up prompt plus automated tooling.

---

## Relationships

- Related to: [[3 - Areas/AIOps/wiki/concepts/AI Agent Runtime Security]] (complementary security layers)
- Related to: [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] (both require human checkpoints before escalating AI authority)
- Related to: [[3 - Areas/AIOps/wiki/concepts/Self-Healing Systems]] (automated rollback is a prerequisite for safe autonomous deployment)
- Related to: [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] (AI as coding accelerator; same non-determinism risk applies to code generation)

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-09-10] 别再被 AI 反噬：DevOps 误用清单]]
