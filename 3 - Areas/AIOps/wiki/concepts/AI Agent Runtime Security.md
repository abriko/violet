---
tags: [concept]
created: 2026-04-21
updated: 2026-04-21
sources: 2
---

# AI Agent Runtime Security

## Definition

AI Agent Runtime Security is the set of mechanisms that control and constrain what an AI Agent can do at execution time. It is the "city wall" layer that enforces boundaries before actions are taken — complemented by [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]] (the "watchtower") which detects what slips through.

The core challenge: unlike traditional software, AI Agent behaviour is **non-deterministic**. The same input can trigger different tool call sequences on different executions, making static code review insufficient to predict all possible behaviour paths.

---

## Threat Taxonomy

| Risk Category | Scenario | Consequence |
|---|---|---|
| Tool / Skill abuse | Agent induced via prompt to run `exec` with malicious command | System intrusion |
| Data exfiltration | Agent reads sensitive file via tool, outputs content to conversation | Privacy breach |
| Cost runaway | Agent enters loop, continuously consuming tokens | Bill explosion |
| Prompt injection | User embeds instructions overriding the System Prompt | Behaviour hijack |
| Session hijack | Multi-turn conversation gradually steers Agent off intended course | Authorization bypass |
| SSRF / internal scan | Agent calls "weather query" tool that actually scans internal network | Infrastructure exposure |

---

## Defence Layers

Runtime security operates in multiple layers. Each layer has gaps — which is why [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]] is required as the detection complement.

### Layer 1 — Execution Isolation (Sandbox)

[[3 - Areas/AIOps/wiki/entities/ACS Agent Sandbox]] provides kernel-level isolation per Agent instance:
- Independent kernel sandbox: prevents malicious code from attacking host
- Isolated temporary filesystem: prevents host file read/tamper/delete
- Network boundary: contains SSRF and internal network scanning

This is stronger than standard container isolation because K8s containers share the host kernel.

### Layer 2 — Tool Policy Pipeline

Applied at the Agent runtime level (e.g. [[3 - Areas/AIOps/wiki/entities/OpenClaw]]):

**Gateway HTTP default-blocked tools** (too dangerous or non-functional via HTTP):

| Tool | Reason blocked |
|---|---|
| `sessions_spawn` | Remote agent launch ≈ RCE |
| `sessions_send` | Cross-session injection; lateral movement vector |
| `cron` | Persistent automation control plane |
| `gateway` | Gateway reconfiguration |
| `whatsapp_login` | Interactive process requiring terminal |

**ACP (Automation Control Plane) explicit-approval tools** (must be user-approved before execution):

| Tool | Risk |
|---|---|
| `exec`, `spawn`, `shell` | Execute commands / spawn processes |
| `sessions_spawn`, `sessions_send` | Session orchestration and cross-session messaging |
| `gateway` | Gateway config change |
| `fs_write`, `fs_delete`, `fs_move` | File write / delete / move |
| `apply_patch` | Apply patches to modify files |

### Layer 3 — Loop Detection

Runtime loop detectors halt Agent execution when runaway cycles are detected (addresses cost runaway risk).

---

## Relationship to Observability

Runtime defences and observability are **complementary, not substitutable**:

> [!warning] Defence alone is insufficient
> Tool policies and loop detectors can be misconfigured, bypassed via prompt injection, or may have gaps in edge cases. [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]] — specifically session audit logs and high-risk tool call monitoring — is the independent layer that detects what the runtime policies miss.

### High-Risk Tool Monitoring (Observability Side)

Session audit logs should be continuously monitored for calls to high-risk tools, regardless of whether the runtime blocked them:

```sql
type: message and message.role : assistant and message.stopReason : toolUse
| ... where content_name in ('exec', 'write', 'edit', 'gateway', 'whatsapp_login',
    'cron', 'sessions_spawn', 'sessions_send', 'spawn', 'shell', 'apply_patch')
```

If a Gateway-HTTP-blocked tool appears as a successful call, a policy bypass exists and must be investigated.

---

## Security Audit Patterns

### Sensitive Data Exfiltration Detection
Monitor `toolResult` entries for API keys, private keys, passwords, AK secrets in returned content — these indicate sensitive data has entered the Agent's context.

### Unauthorized WebSocket Connection Monitoring
App logs record `WARN` entries for authentication failures at the WS gateway layer (`reason=token_mismatch`). Repeated failures from the same IP may indicate credential stuffing.

### Privilege Escalation Audit
Security audit log entries (`reason=role-upgrade`, `roleTo=owner`) represent high-sensitivity operations — should be monitored for off-hours or anomalous frequency.

---

## Relationships

- Complementary to: [[3 - Areas/AIOps/wiki/concepts/AI Agent Observability]]
- Enforced by: [[3 - Areas/AIOps/wiki/entities/ACS Agent Sandbox]] (isolation layer), [[3 - Areas/AIOps/wiki/entities/OpenClaw]] Tool Policy Pipeline (policy layer)
- Related: [[3 - Areas/AIOps/wiki/concepts/Progressive Autonomy]] (security boundaries expand as autonomy increases)
- Related: [[3 - Areas/AIOps/wiki/concepts/Self-Healing Systems]] (autonomous actions require tighter security boundaries)
- Related: [[3 - Areas/AIOps/wiki/concepts/AI-Generated Code Safety]] (complementary security layer — this page covers Agent execution-time security; AI-Generated Code Safety covers IaC written by AI before deployment)
- Applied to: [[3 - Areas/AIOps/wiki/entities/OpenClaw]]

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2026-03-02] 你的 OpenClaw 真的在受控运行吗？]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-06] LoongCollector + ACS Agent Sandbox]]
