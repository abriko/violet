# Deployment Agent — MVP Technical Review & Task Decomposition

> Status: Draft
> Author: tech-leader
> Date: 2026-05-19
> Parent: [[deployment-agent-requirements]], [[aiops-blueprint]]

---

## 1. Technical Review

### 1.1 Summary Verdict

The requirements document is technically sound and internally consistent. The Deployment Agent is well-scoped as a deterministic execution proxy — not an AI reasoning component — and that is the correct design. The AI intelligence lives one layer up in the Release Orchestration Orchestrator (guardrail Go/No-Go, human confirmation). The Deployment Agent's job is to be a safe, auditable, idempotent bridge between an AI decision and a Jenkins execution.

### 1.2 Addressing the "Q for BA" Concern

> "Deployment Agent looks like a wrapper for Jenkins, not an AI-powered Agent."

This is a valid observation worth clarifying for stakeholders, not a design problem to fix.

The Deployment Agent is intentionally NOT an AI agent. That is a feature, not a gap. Here is why:

- AI non-determinism is a risk in execution layers. When you are about to trigger a pipeline that deploys to PROD, you want a machine that will refuse if the approval artifact is missing — not one that "reasons" its way to a decision.
- The AI work is already upstream: template resolution, guardrail aggregation (CI green? K8s healthy? Snyk clean? DAST clear?), and the LLM Go/No-Go verdict all happen in the Release Orchestration Orchestrator before the Deployment Agent is ever called.
- The Deployment Agent holds the safety contract. It guarantees idempotency, approval gating, credential non-persistence, and rollback semantics regardless of what any upstream component does. These guarantees must be deterministic.

A useful analogy: a bank vault door does not "reason" about whether to open. It checks whether you have a valid PIN and the right authorization level. The AI is the advisor who tells you whether to make the withdrawal. Mixing those roles would be dangerous.

The correct way to communicate this to stakeholders: the AIOps platform is AI-powered; the Deployment Agent is the safety-layer that makes AI-driven deployment safe enough to trust with PROD.

### 1.3 Confirmed Design Decisions (from Section 19 Answers)

| Question | Decision | Impact on MVP |
|---|---|---|
| Credential collection channel | Token collected by Copilot Studio / AIOps Platform; passed as opaque handle | Deployment Agent never touches raw tokens; credential broker is out of scope for this agent |
| Jenkins audit actor per trigger | Out of scope — no Jenkins config change needed | MVP does not require Jenkins audit plugin |
| Service-to-Jenkins-job mapping source | GitHub YAML config repo (interim, pre-Service Catalog) | Must implement a YAML-backed catalog reader; design so Service Catalog can swap in later |
| UAT approval recording | Only PROD requires approval gate; no special UAT record needed | Simplifies approval state machine significantly |
| Rollback | Not required in first release | Rollback state machine, rollback Jenkins jobs = out of MVP |
| Implementation approach | Start from scratch for MVP; AgentScope framework for future | No framework dependency in MVP; pure service code |

### 1.4 Risks

| # | Risk | Severity | Mitigation |
|---|---|---|---|
| R1 | GitHub YAML catalog is hand-maintained; stale entries will cause deployment failures at runtime | High | Validation endpoint: agents can pre-check service mapping exists before submitting a command |
| R2 | Credential handle TTL may expire during a long-running PROD approval wait | Medium | Deployment Agent must detect expired handles and surface `attention_required`; orchestrator must refresh handle or re-prompt user |
| R3 | Jenkins CSRF/crumb handling varies across Jenkins versions and plugins | Medium | Isolate crumb handling inside the adapter; integration test against target Jenkins instance early |
| R4 | Status polling with no stage plugin: terminal result available only after build ends | Low | Design polling with configurable interval and timeout; log `provider_running` with last-known heartbeat to users |
| R5 | Single-provider MVP creates pressure to skip the provider abstraction layer | Medium | Define and enforce the `DeploymentProvider` interface even for Jenkins only; prevents future refactor debt |
| R6 | No rollback in MVP means a failed PROD deploy has no automated recovery path | Medium | Deployment Agent must produce a clear human-readable rollback handoff with Jenkins job URL and build number so engineers can act manually |
| R7 | ITIL change management alignment unclear for UAT (C4 in blueprint) | Low | UAT is in-scope for MVP but ITIL gate only applies to PROD per confirmed design; document assumption explicitly |

### 1.5 Assumptions

1. The Release Orchestration Orchestrator already exists or is being built in parallel and will submit correctly-shaped deployment commands. The Deployment Agent rejects malformed commands; it does not compensate for an absent orchestrator.
2. Jenkins pipelines are already parameterized and accept the standard `AIOPS_*` parameter set defined in Section 9.3 of the requirements. If they are not, that is a Jenkins-side prerequisite task, not a Deployment Agent task.
3. The ephemeral credential broker (vault / secret store) is provided by the AIOps platform infrastructure team. The Deployment Agent only resolves handles; it does not implement the broker.
4. The Notification Agent exists or is a separate work item. The Deployment Agent emits events on a message bus or event channel; it does not implement Teams messaging directly.
5. A GitHub repository with the YAML service catalog config exists or will be created as a parallel task.

### 1.6 Out-of-MVP Confirmed

- Rollback state machine and rollback Jenkins jobs
- GitHub Actions provider adapter
- AgentScope framework integration
- Inter-service dependency resolution
- Smart Release Scheduling
- UC2 / UC3 capabilities (separate from this agent entirely)

---

## 2. MVP Task Decomposition

Scope: Deployment Agent Phase 1, Jenkins-only, no rollback, PROD approval gate, YAML-backed catalog.

Complexity key: S = small (1-2 days), M = medium (3-5 days), L = large (1-2 weeks)

---

### Task 1: Project Scaffold & API Contract Definition

**Description**: Initialize the Deployment Agent service repository. Define the OpenAPI/schema contract for the inbound platform command (`POST /v1/deployments`) and the immediate response shape. Set up the project structure with provider abstraction layer skeleton (the `DeploymentProvider` interface) so Jenkins is one adapter, not the whole architecture. Includes CI pipeline setup.

**Acceptance Criteria**:
- Repository created with agreed language/runtime (Python or TypeScript — to be confirmed)
- `POST /v1/deployments` endpoint returns 422 for malformed schema and 202 accepted for valid schema (stub handler, no Jenkins call yet)
- `DeploymentProvider` interface defined with all 8 methods from Section 10.1 of requirements
- Unit tests for schema validation pass
- CI pipeline runs lint + tests on pull request

**Complexity**: S
**Dependencies**: None (first task)
**Assignee**: Backend

---

### Task 2: Service Catalog Reader (GitHub YAML Config)

**Description**: Implement the catalog layer that resolves a `(service, environment)` tuple to a Jenkins job path, allowed commands, and approval policy. The source of truth in MVP is a GitHub YAML config file. Design the reader behind an interface so a future Service Catalog API can replace it without touching the Deployment Agent core logic.

**Acceptance Criteria**:
- `CatalogReader` interface defined; `GitHubYamlCatalogReader` implements it
- YAML schema documented (service name, environment, Jenkins job path, allowed commands, approval override)
- Reader fetches and caches the YAML with a configurable TTL
- Returns a clear structured error when a `(service, env)` mapping is not found
- Unit tests cover: hit, miss, malformed YAML, fetch failure with stale cache fallback

**Complexity**: M
**Dependencies**: Task 1
**Assignee**: Backend

---

### Task 3: Deployment State Machine

**Description**: Implement the 14-state normalized deployment lifecycle (received → validating → approved → dispatching → provider_running → succeeded / failed / attention_required). State transitions must be explicit, logged, and persisted. No Jenkins calls in this task — the state machine is tested with stub provider.

**Acceptance Criteria**:
- All 14 states from Section 6 of requirements are implemented as an enum
- Invalid state transitions are rejected with a structured error
- Every state transition is persisted with a timestamp
- Unit tests cover happy path, validation rejection, approval wait, and terminal failure
- `deployment_id` is generated at `received` state and is globally unique

**Complexity**: M
**Dependencies**: Task 1
**Assignee**: Backend

---

### Task 4: PROD Approval Gate

**Description**: Implement the approval enforcement policy. PROD requests must pause at `awaiting_approval` and only advance when an explicit approval artifact is received (via an internal API call from the orchestrator carrying the approver identity). UAT requests may skip this gate. Include approval artifact persistence for audit.

**Acceptance Criteria**:
- Before go PROD check CR status first step.
- PROD requests enter `awaiting_approval` state after validation and guardrail checks
- UAT requests bypass the approval wait and advance to `dispatching`
- Approval acceptance endpoint validates: approver identity is present, request is in correct state, approval is not expired
- Expired credential handles detected during approval wait surface `attention_required`
- Approval artifact (approver id, approved_at timestamp) is written to audit record
- Unit tests cover: PROD approval path, UAT bypass, double-approval attempt, expired credential

**Complexity**: M
**Dependencies**: Task 3
**Assignee**: Backend

---

### Task 5: Jenkins Provider Adapter

**Description**: Implement the `JenkinsDeploymentProvider` that satisfies the `DeploymentProvider` interface. Covers: parameterized job queueing, queue item polling to get build number, build status polling, and terminal result normalization. CSRF/crumb handling isolated inside the adapter.

**Acceptance Criteria**:
- `startDeployment` queues a parameterized Jenkins job with the full `AIOPS_*` parameter set from Section 9.3
- `getExecutionStatus` polls and returns normalized state (`provider_queued`, `provider_running`, `succeeded`, `failed`)
- CSRF/crumb negotiation handled inside adapter; no crumb logic leaks into upper layers
- Adapter integration tested against a local Jenkins instance (Docker Compose test environment)
- All Jenkins API calls use the user credential handle resolved just-in-time; no token written to logs or traces

**Complexity**: L
**Dependencies**: Task 1, Task 2 (for job path), Task 4 (credential handle resolved after approval)
**Assignee**: Backend, DevOps

---

### Task 6: Credential Handle Resolution

**Description**: Implement the just-in-time credential resolution step. The Deployment Agent receives an opaque `credential_handle`. Before each Jenkins API call, it resolves this handle against the ephemeral secret broker to get the raw credential. The raw credential is used in-memory only and never written to disk, queue payloads, logs, or traces.

**Acceptance Criteria**:
- Credential resolution is a single function called immediately before Jenkins API use
- Resolved credential is never assigned to a variable that could be serialized or logged
- Expired or invalid handles cause an `attention_required` transition, not a crash
- Credential resolve latency is recorded in traces
- Integration test: credential used for Jenkins call without appearing in any log line (negative assertion)

**Complexity**: M
**Dependencies**: Task 1 (interface), coordination with platform infra team for broker API
**Assignee**: Backend

---

### Task 7: Audit Event Emission

**Description**: Implement the event emission layer. Every state transition emits a structured event to the message bus or event channel. Events are used by the Notification Agent and downstream consumers. Includes the 11 required event types from Section 8.4 of requirements.

**Acceptance Criteria**:
- All 11 event types implemented: deployment.requested through deployment.attention_required
- Each event includes the mandatory fields: event_id, deployment_id, request_id, emitted_at, requested_by.aiops_user_id, provider.name, human-safe message
- No raw credential or secret field appears in any event payload
- Event emission failure does not block state transitions (emit with best-effort; log emission failures)
- Unit tests: all 11 event types have correct shape; secret fields are absent

**Complexity**: M
**Dependencies**: Task 3 (state transitions), coordination with Notification Agent team for bus contract
**Assignee**: Backend

---

### Task 8: Peer Agent API (status, cancel)

**Description**: Implement the internal peer API from Section 8 of requirements. Supports `get_status`, `cancel`, and `get_execution_evidence` operations. This is the stable contract that the Release Orchestration Orchestrator and Notification Agent use to query deployment state.

**Acceptance Criteria**:
- `POST /internal/deployment-agent/v1/requests` accepts peer request schema
- `get_status` returns normalized state with provider refs and timeline
- `cancel` transitions to `cancelled` if deployment is cancellable (not yet in `provider_running` terminal)
- `get_execution_evidence` returns audit references for the session
- Caller agent identity is validated (basic service-to-service auth)
- Contract tests: orchestrator simulator sends all 3 operations, responses match schema

**Complexity**: M
**Dependencies**: Task 3, Task 5
**Assignee**: Backend

---

### Task 9: Rate Limiting & Concurrency Safety

**Description**: Implement the safety limits from Section 16 of requirements. PROD deployments for the same service must serialize. Per-user request rate limits and per-environment concurrency limits must be enforced.

**Acceptance Criteria**:
- Concurrent PROD deploy attempts for the same service are rejected with a structured error referencing the active `deployment_id`
- Per-user rate limit is configurable and enforced (e.g., 5 requests/minute by default)
- Per-environment concurrency limit is configurable
- Rate limit and concurrency rejection responses include retry-after guidance
- Integration test: two concurrent PROD deploy requests for same service — second is rejected

**Complexity**: S
**Dependencies**: Task 3
**Assignee**: Backend

---

### Task 10: Observability & Fail-Safe Behavior

**Description**: Wire up the metrics, logs, and traces defined in Section 15. Implement the fail-safe behaviors from Section 17: if provider status is ambiguous, surface `attention_required`; produce human-readable rollback handoff with provider run reference when automated rollback is unavailable (MVP: always).

**Acceptance Criteria**:
- Prometheus metrics exposed: deployments_requested_total, deployments_succeeded_total, deployments_failed_total (by error class), deployment_duration_seconds, approval_wait_seconds
- Distributed trace covers: orchestrator handoff, credential resolution, Jenkins API calls, event emission
- All log lines are redaction-safe (no credentials, no raw tokens)
- On ambiguous Jenkins state after trigger: state transitions to `attention_required` with human-safe message containing Jenkins job URL and build reference (if known)
- `attention_required` events include enough context for a human to continue manually

**Complexity**: M
**Dependencies**: Task 5, Task 7
**Assignee**: Backend, DevOps

---

### Task 11: End-to-End Integration Test Suite

**Description**: Build an integration test suite that runs the full happy path and key failure paths against a local Jenkins Docker Compose environment. This is the main quality gate before any environment deployment.

**Acceptance Criteria**:
- Happy path: UAT deploy → provider_queued → provider_running → succeeded, all events emitted, audit record complete
- PROD path: deploy → awaiting_approval → approved → dispatching → succeeded
- Failure path: Jenkins job fails → failed state, attention_required if status ambiguous
- Credential not in any log assertion
- Duplicate request idempotency: same idempotency_key → same deployment_id returned, no second Jenkins trigger
- Suite runs in CI (GitHub Actions or equivalent)

**Complexity**: M
**Dependencies**: Tasks 1–10
**Assignee**: QA, Backend

---

### Task 12: Jenkins Pipeline Parameterization Alignment

**Description**: Verify and update existing Jenkins pipelines to accept the standard `AIOPS_*` parameter set. This is a DevOps-side prerequisite task. The Deployment Agent cannot trigger jobs that do not accept `AIOPS_REQUEST_ID`, `AIOPS_DEPLOYMENT_ID`, `AIOPS_ACTOR_ID`, etc.

**Acceptance Criteria**:
- At least 2 target services have Jenkins pipelines updated to accept the full parameter set
- Parameter passing tested manually: trigger pipeline with AIOPS params, confirm they appear in build metadata
- No pipeline business logic changed — only parameter intake added
- Documentation of which jobs are AIOps-ready

**Complexity**: S
**Dependencies**: Task 1 (parameter set definition)
**Assignee**: DevOps

---

## 3. Dependency Graph

```
Task 1 (Scaffold)
  └── Task 2 (Catalog Reader)
  └── Task 3 (State Machine)
        └── Task 4 (Approval Gate)
        └── Task 8 (Peer API)
        └── Task 9 (Rate Limiting)
  └── Task 6 (Credential Resolution)
  └── Task 12 (Jenkins Pipeline Alignment)

Task 2 + Task 4 + Task 6 + Task 12
  └── Task 5 (Jenkins Adapter) ← critical path

Task 3 + Task 5
  └── Task 7 (Audit Events)
  └── Task 8 (Peer API)

Task 5 + Task 7
  └── Task 10 (Observability & Fail-Safe)

Tasks 1–10
  └── Task 11 (E2E Test Suite)
```

## 4. Prioritized Delivery Order

| Priority | Task | Complexity | Assignee | Gate |
|---|---|---|---|---|
| 1 | Task 1: Scaffold & API Contract | S | Backend | Unblocks everything |
| 2 | Task 12: Jenkins Pipeline Alignment | S | DevOps | Parallel; needed for Task 5 |
| 3 | Task 2: Catalog Reader | M | Backend | Needed for Task 5 |
| 3 | Task 3: State Machine | M | Backend | Needed for Tasks 4, 5, 7, 8 |
| 3 | Task 6: Credential Handle | M | Backend | Needed for Task 5 |
| 4 | Task 4: Approval Gate | M | Backend | Needed before PROD capable |
| 4 | Task 5: Jenkins Adapter | L | Backend + DevOps | Core execution path |
| 5 | Task 7: Audit Events | M | Backend | Required for compliance |
| 5 | Task 8: Peer API | M | Backend | Required for orchestrator integration |
| 5 | Task 9: Rate Limiting | S | Backend | Safety requirement |
| 6 | Task 10: Observability | M | Backend + DevOps | Required before any env deploy |
| 7 | Task 11: E2E Tests | M | QA + Backend | Quality gate before release |

**Estimated total: ~8–10 weeks at 2 FTE Backend + 0.5 FTE DevOps + 0.5 FTE QA** (consistent with blueprint R2 staffing estimate)

---

## 5. MVP Definition of Done

The Deployment Agent MVP is complete when:

1. A Release Orchestration 2.0 orchestrator can POST one deployment command and receive a `deployment_id` in the immediate response.
2. UAT deployments trigger the correct Jenkins job using the end user's credential without the credential appearing in any log or trace.
3. PROD deployments block at `awaiting_approval` and only advance when an explicit approval artifact is submitted.
4. Failed deployments surface a human-readable `attention_required` state with Jenkins build reference for manual follow-up.
5. All 11 audit event types are emitted and observable.
6. Duplicate requests with the same idempotency key return the same `deployment_id` without a second Jenkins trigger.
7. E2E test suite passes with Jenkins Docker Compose environment.
