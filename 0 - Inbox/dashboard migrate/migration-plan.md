# Dashboard Migration Plan: HKG NS Limit Checking (PRD)

Generated from task t_8711710b. Predecessor analysis: metric-mapping.md (t_ee6e5ad3).

---

## Overall Assessment

Migration difficulty: LOW
Confidence: HIGH (all 5 panels map 1:1, no metric gaps)
Estimated effort: 2–4 hours for one engineer familiar with Grafana

---

---

## Potential Pitfalls

### 1. Cluster Name Label Mismatch (HIGH impact, KNOWN)
- NewRelic uses label `clusterName` with values like `aks-eas-hkg-prd`, `aks-sea-hkg-prd`, etc.
- ACK Prometheus uses label `cluster` with values matching whatever the ACK cluster was registered as in ARMS.
- Risk: If you hardcode `aks-*` cluster names in PromQL, all queries return no data.
- Mitigation: Use a Grafana variable `$cluster` backed by `label_values(kube_resourcequota, cluster)`. Confirm actual ACK cluster names before building panels.

### 2. Grafana Version / ARMS Grafana Feature Parity
- Alicloud managed Grafana (ARMS) is based on Grafana OSS but may lag behind the latest version.
- Risk: Some newer Grafana panel features (e.g., newer stat panel options, field overrides syntax) may not be available.
- Mitigation: Use only core stat panel features available since Grafana 8.x. Avoid experimental or plugin-dependent panels. Check ARMS Grafana version at Settings → About before starting.

### 3. Billboard → Stat Panel Behavioral Differences
- NewRelic billboards show a single latest value with color thresholds.
- Grafana Stat panel is the nearest equivalent but has richer configuration (sparklines, text size, orientation, value reduction options).
- Risk: Default Stat panel may show sparkline or min/max instead of a clean single value — looks different from the original.
- Mitigation: Set "Value" calculation to "Last (not null)", disable sparkline, set text size explicitly. See panel config template below.

### 4. PromQL Returns All Series — No Implicit LIMIT MAX
- NewRelic NRQL `LIMIT MAX` simply means "don't truncate results". PromQL has no such limit.
- Risk: If a cluster has many namespaces, the stat panel may show dozens of rows and look cluttered.
- Mitigation: In Grafana, set "Sort by value" (descending) and optionally set a panel height that accommodates all rows, or add a `topk()` wrapper if only the top N abusers are relevant.

### 5. ARMS Prometheus Scrape Configuration
- Risk: If the ACK cluster was set up with a custom ARMS Prometheus config that excludes kube-state-metrics or namespace-scoped resourcequota metrics, the metric will be absent.
- Mitigation: Before starting, run `kube_resourcequota` in the ARMS Explore / PromQL console and confirm data comes back. If empty, check kube-state-metrics is deployed and ARMS scrape config includes it.

### 6. Dashboard JSON Import Issues
- Do NOT try to export the NewRelic dashboard JSON and import it into Grafana — the formats are completely incompatible (NerdGraph vs Grafana JSON model, NRQL vs PromQL).
- Risk: Some teams waste time on JSON conversion tools that don't handle NRQL.
- Mitigation: Build the Grafana dashboard from scratch using the PromQL templates in this document. It is faster than trying to convert JSON.

### 7. Exclusion Filter Redundancy
- The original NRQL excludes `persistentvolumeclaims`, `services.loadbalancers`, `services.nodeports` from all panels even though each panel already filters by a specific resource (e.g. `resource = 'requests.cpu'`).
- Risk: Including this redundant filter in PromQL is harmless but adds noise. Omitting it is fine since the `resource=` selector already constrains results.
- Mitigation: Keep the filter in Panel 1–5 PromQL for literal parity with original intent; document that it is redundant. Revisit when adding new panels.

### 8. Threshold Color Values
- NewRelic threshold: warning at 79%, critical at 90%.
- Grafana threshold: configured per-panel or via a shared panel default in Dashboard Settings.
- Risk: Easy to fat-finger threshold values or forget to set them on all 5 panels.
- Mitigation: Configure thresholds in Dashboard Settings → Panel defaults once, then inherit. Verify coloring by temporarily setting a test value above 79 and 90 in Explore.

---

## Step-by-Step Migration Task List

### Phase 0 — Prerequisites (do before touching Grafana)

**Task 0.1 — Confirm metric availability**
  - Open ARMS Grafana → Explore → select ARMS Prometheus data source
  - Run: `kube_resourcequota{type="used"}` 
  - Confirm data returns for each ACK cluster (prd + uat)
  - Record the actual `cluster` label values (e.g. `c123456789`, `ack-eas-hkg-prd`, etc.)
  - Acceptance: at least one result per cluster, `namespace` label is populated

**Task 0.2 — Note ARMS Grafana version**
  - Navigate to Help → About in ARMS Grafana
  - Record the version number
  - Acceptance: version is 8.x or higher (Stat panel is stable from 7.x)

**Task 0.3 — Confirm ARMS data source name**
  - Go to Configuration → Data Sources in ARMS Grafana
  - Note the exact display name of the Prometheus data source (needed when building panels)
  - Acceptance: data source listed and shows "Data source connected" green status

---

### Phase 1 — Create Dashboard Shell

**Task 1.1 — Create new dashboard**
  - Dashboards → New Dashboard → Add empty panel (then cancel panel) — or use New Dashboard directly
  - Set dashboard title: `HKG NS Limit Checking (PRD)`
  - Set description: `Namespace resource quota usage % — migrated from NewRelic`

**Task 1.2 — Add cluster variable**
  - Dashboard Settings → Variables → Add variable
  - Name: `cluster`
  - Type: Query
  - Data source: [ARMS Prometheus data source from Task 0.3]
  - Query: `label_values(kube_resourcequota, cluster)`
  - Multi-value: Yes
  - Include All option: Yes
  - Refresh: On dashboard load
  - Acceptance: variable dropdown shows the ACK cluster names found in Task 0.1

**Task 1.3 — Set dashboard-level threshold defaults**
  - Dashboard Settings → Panel defaults → Thresholds
  - Add threshold: 79 → Orange (Warning)
  - Add threshold: 90 → Red (Critical)
  - Base (0): Green
  - Acceptance: new panels inherit these thresholds automatically

---

### Phase 2 — Build the 5 Panels

For each panel below, use the following base configuration:
  - Visualization: Stat
  - Value options: Show → All values (to show per-namespace rows)
  - Calculation: Last (not null)
  - Fields: Value
  - Graph mode: None (disable sparkline)
  - Text size: Auto or match original design
  - Thresholds: inherited from dashboard defaults (verify per panel)
  - Sort: Descending (highest usage first, mirrors NRQL LIMIT MAX behavior)

**Task 2.1 — Panel: NS Quota Req.CPU %**
  PromQL:
  ```
  kube_resourcequota{type="used", resource="requests.cpu", cluster=~"$cluster"}
  /
  kube_resourcequota{type="hard", resource="requests.cpu", cluster=~"$cluster"}
  * 100
  ```
  - Unit: Percent (0-100)
  - Panel title: `NS Quota Req.CPU %`
  - Acceptance: shows per-namespace rows, green/orange/red based on threshold

**Task 2.2 — Panel: NS Quota Req.Memory %**
  PromQL:
  ```
  kube_resourcequota{type="used", resource="requests.memory", cluster=~"$cluster"}
  /
  kube_resourcequota{type="hard", resource="requests.memory", cluster=~"$cluster"}
  * 100
  ```
  - Unit: Percent (0-100)
  - Panel title: `NS Quota Req.Memory %`

**Task 2.3 — Panel: NS Quota Lt.CPU %**
  PromQL:
  ```
  kube_resourcequota{type="used", resource="limits.cpu", cluster=~"$cluster"}
  /
  kube_resourcequota{type="hard", resource="limits.cpu", cluster=~"$cluster"}
  * 100
  ```
  - Unit: Percent (0-100)
  - Panel title: `NS Quota Lt.CPU %`

**Task 2.4 — Panel: NS Quota Lt.Memory %**
  PromQL:
  ```
  kube_resourcequota{type="used", resource="limits.memory", cluster=~"$cluster"}
  /
  kube_resourcequota{type="hard", resource="limits.memory", cluster=~"$cluster"}
  * 100
  ```
  - Unit: Percent (0-100)
  - Panel title: `NS Quota Lt.Memory %`

**Task 2.5 — Panel: NS Quota Req.PODs %**
  PromQL:
  ```
  kube_resourcequota{type="used", resource="pods", cluster=~"$cluster"}
  /
  kube_resourcequota{type="hard", resource="pods", cluster=~"$cluster"}
  * 100
  ```
  - Unit: Percent (0-100)
  - Panel title: `NS Quota Req.PODs %`

---

### Phase 3 — Validation

**Task 3.1 — Data sanity check**
  - Set cluster variable to each ACK PRD cluster
  - Verify all 5 panels show data (non-zero series)
  - Spot-check 2–3 namespaces: does `used/hard * 100` match what `kubectl describe quota -n <ns>` reports?
  - Acceptance: values match kubectl output within 1 scrape interval (default 60s)

**Task 3.2 — Threshold color check**
  - Find a namespace with quota usage between 79%–90% → panel should be orange
  - Find a namespace with usage >90% (or temporarily lower the threshold to 50% to test) → panel should be red
  - Acceptance: color coding works correctly

**Task 3.3 — Side-by-side comparison with NewRelic**
  - Open original NewRelic dashboard in one browser tab, Grafana in another
  - Select matching cluster/namespace in both
  - Compare the top 5 highest-usage namespaces — order and approximate values should match
  - Acceptance: same namespaces appear at top, values agree within ±2% (small delta acceptable due to scrape timing)

**Task 3.4 — UAT cluster coverage**
  - Repeat Task 3.1 for UAT clusters
  - Acceptance: UAT namespaces also visible when UAT clusters selected in variable

---

### Phase 4 — Handoff

**Task 4.1 — Save and share dashboard**
  - Dashboard Settings → General → set appropriate folder
  - Save dashboard
  - Set permissions to match team access (or use default org-wide access)
  - Copy dashboard URL

**Task 4.2 — Document known differences from NewRelic original**
  Write a brief note in the dashboard description or a Text panel:
  - "Cluster selector replaces hardcoded clusterName IN-list from NewRelic"
  - "Stat panel replaces NewRelic billboard — functionally equivalent"
  - "Threshold coloring: orange ≥79%, red ≥90% (matches original)"
  - "Data source: ARMS Prometheus (kube-state-metrics)"

**Task 4.3 — Decommission NewRelic dashboard (optional, post-validation)**
  - Only after at least 1 week of parallel running
  - Confirm with team leads before archiving the NewRelic dashboard

---

## Acceptance Criteria (Summary)

The migration is complete when ALL of the following are true:

1. All 5 panels show live data for PRD clusters (and UAT when selected)
2. Per-namespace usage % values match `kubectl describe quota` output within ±2%
3. Threshold coloring (green / orange / red) fires at 79% and 90% respectively
4. Top-N namespace ranking matches the NewRelic dashboard (same namespaces at the top)
5. Cluster variable allows switching between multiple ACK clusters without page refresh
6. Dashboard is saved in a shared Grafana folder accessible to the ops team

---

## Quick Reference: PromQL Templates

All panels follow this single pattern — only the `resource` value changes:

```
kube_resourcequota{type="used", resource="<RESOURCE>", cluster=~"$cluster"}
/
kube_resourcequota{type="hard", resource="<RESOURCE>", cluster=~"$cluster"}
* 100
```

| Panel | resource value |
|-------|---------------|
| NS Quota Req.CPU % | requests.cpu |
| NS Quota Req.Memory % | requests.memory |
| NS Quota Lt.CPU % | limits.cpu |
| NS Quota Lt.Memory % | limits.memory |
| NS Quota Req.PODs % | pods |

---

# Dashboard Migration Plan: AKS Application Resource Usage

NewRelic source: https://onenr.io/0MRNpZLElQn

---

## Feasibility Assessment

**Can this dashboard be migrated first (before others)? YES.**

| Factor | Assessment |
|--------|-----------|
| Dependencies | Standard Kubernetes metrics (kube-state-metrics + cAdvisor) — both scraped by ARMS Prometheus on ACK ✓ |
| Data source | ARMS Prometheus — already confirmed present and connected in the same Grafana NP instance ✓ |
| Permissions | canSave=true confirmed for Devops folder `afmhol5iowkjkb` ✓ |
| Access method | Playwright CLI (same as NS Limit migration) ✓ |
| Label mapping | `clusterName` (NewRelic/AKS) → `cluster` (ACK Prometheus) — same issue as NS Limit, same mitigation ✓ |
| Platform metric parity | kube-state-metrics and cAdvisor are standard across AKS and ACK — no proprietary Azure-only metrics expected ✓ |

**Key prerequisite before starting:** Do a panel inventory on NewRelic (https://onenr.io/0MRNpZLElQn) to list all panels and their NRQL queries. This determines exact PromQL equivalents. Estimated panel inventory effort: 30 min.

**Estimated migration difficulty: LOW-MEDIUM**
- LOW if panels use only kube-state-metrics (requests/limits quota-style)
- MEDIUM if panels use cAdvisor runtime metrics (actual CPU/memory consumption rates) — requires rate() expressions

**Estimated effort: 3–5 hours** (including panel inventory, build, and validation)

---

## Potential Pitfalls

### 1. AKS clusterName → ACK cluster Label Mismatch (HIGH impact)
- NewRelic AKS integration labels metrics with `clusterName` (e.g. `aks-eas-hkg-prd`)
- ACK Prometheus labels metrics with `cluster` matching the ACK cluster's registration name in ARMS
- Risk: Hardcoded cluster names in PromQL return no data
- Mitigation: Use `$cluster` Grafana variable backed by `label_values(..., cluster)` on the actual metric

### 2. cAdvisor Rate Metrics Require rate() Window
- NewRelic shows resource usage as a simple value via its own aggregation
- PromQL for CPU usage from cAdvisor requires `rate(container_cpu_usage_seconds_total[5m])` — the window affects smoothing
- Risk: Values look different (spiky or flat) compared to NewRelic
- Mitigation: Use `[5m]` rate window to match NewRelic's default 5-minute aggregation period

### 3. container vs pod vs namespace Granularity
- NewRelic "Application Resource Usage" may aggregate at app/deployment level using `appName` or `serviceName` attributes
- Prometheus has no direct equivalent of NewRelic APM `appName` — closest is `container`, `pod`, or `namespace` labels
- Risk: Panel shows pod-level rows instead of app-level aggregation
- Mitigation: Check original NRQL `FACET` clause during panel inventory. If facet is by app/service, use `deployment` or `pod` label and group by that in PromQL. If facet is by namespace, straightforward.

### 4. Requests vs Limits vs Actual Usage Confusion
- NewRelic "Resource Usage" dashboards sometimes mix quota (requests/limits) with actual runtime usage (CPU %, memory bytes used)
- PromQL sources differ: quota comes from `kube_pod_container_resource_*` (kube-state-metrics), actual usage from `container_*` (cAdvisor)
- Risk: Accidentally using wrong metric source, showing configured limits instead of actual consumption
- Mitigation: Confirm each panel's intent from the NRQL query during inventory — `requests.cpu` (quota) vs actual CPU seconds (usage)

### 5. Multi-cluster Dashboard — More Variables Needed
- An "AKS Application Resource Usage" dashboard likely covers multiple AKS clusters (prd + uat, east + southeast)
- Risk: Missing namespace or app-level filter variables, making the dashboard too noisy
- Mitigation: Add both `$cluster` and `$namespace` variables. Optionally add `$pod` for drill-down panels.

---

## Step-by-Step Migration Task List

### Phase 0 — Panel Inventory (do first, 30 min)

**Task 0.1 — Inventory NewRelic panels**
  - Open https://onenr.io/0MRNpZLElQn in browser
  - For each panel, record: panel title, NRQL query, visualization type, thresholds if any
  - Note the FACET clause (this determines Grafana label grouping)
  - Note the WHERE clause (this determines Grafana label filters)
  - Acceptance: complete list of panels with their NRQL queries documented

**Task 0.2 — Confirm metric availability in ARMS**
  - Open Grafana NP → Explore → ARMS Prometheus data source
  - Run each of the following and confirm data returns:
    - `kube_pod_container_resource_requests{cluster=~".+"}` (CPU/memory requests)
    - `kube_pod_container_resource_limits{cluster=~".+"}` (CPU/memory limits)
    - `rate(container_cpu_usage_seconds_total{container!=""}[5m])` (actual CPU)
    - `container_memory_working_set_bytes{container!=""}` (actual memory)
  - Record actual `cluster` label values from results
  - Acceptance: all 4 queries return data; cluster label values captured

**Task 0.3 — Identify available label dimensions**
  - From the metric results in Task 0.2, note which labels exist:
    - namespace, pod, container, deployment, app — these map to NewRelic FACET fields
  - Acceptance: know which labels to use for panel grouping

---

### Phase 1 — Create Dashboard Shell (30 min)

**Task 1.1 — Create new dashboard in Devops folder**
  - Navigate to Devops folder (`afmhol5iowkjkb`) in Grafana NP
  - New Dashboard → name: `AKS Application Resource Usage`
  - Description: `Application-level resource usage (CPU/memory requests, limits, actual) — migrated from NewRelic`

**Task 1.2 — Add $cluster variable**
  - Dashboard Settings → Variables → New variable
  - Name: `cluster`, Type: Query
  - Query: `label_values(kube_pod_container_resource_requests, cluster)`
  - Multi-value: Yes, Include All: Yes, Refresh: On dashboard load
  - Acceptance: dropdown shows ACK cluster names from Task 0.2

**Task 1.3 — Add $namespace variable**
  - Name: `namespace`, Type: Query
  - Query: `label_values(kube_pod_container_resource_requests{cluster=~"$cluster"}, namespace)`
  - Multi-value: Yes, Include All: Yes
  - Depends on: `cluster` variable
  - Acceptance: dropdown updates when cluster changes

**Task 1.4 — (Optional) Add $pod variable**
  - If original dashboard has pod-level panels:
  - Query: `label_values(kube_pod_container_resource_requests{cluster=~"$cluster", namespace=~"$namespace"}, pod)`

---

### Phase 2 — Build Panels (2–3 hours)

Build panels based on the inventory from Task 0.1. The typical panels for this dashboard type are:

**Task 2.1 — CPU Requests by namespace/pod**
  Typical PromQL:
  ```
  sum by (namespace) (
    kube_pod_container_resource_requests{
      resource="cpu",
      cluster=~"$cluster",
      namespace=~"$namespace"
    }
  )
  ```
  - Visualization: Bar gauge or Time series
  - Unit: Cores

**Task 2.2 — Memory Requests by namespace/pod**
  Typical PromQL:
  ```
  sum by (namespace) (
    kube_pod_container_resource_requests{
      resource="memory",
      cluster=~"$cluster",
      namespace=~"$namespace"
    }
  )
  ```
  - Unit: Bytes (auto SI)

**Task 2.3 — Actual CPU Usage**
  Typical PromQL:
  ```
  sum by (namespace) (
    rate(container_cpu_usage_seconds_total{
      container!="",
      cluster=~"$cluster",
      namespace=~"$namespace"
    }[5m])
  )
  ```
  - Unit: Cores

**Task 2.4 — Actual Memory Usage**
  Typical PromQL:
  ```
  sum by (namespace) (
    container_memory_working_set_bytes{
      container!="",
      cluster=~"$cluster",
      namespace=~"$namespace"
    }
  )
  ```
  - Unit: Bytes

**Task 2.5 — CPU Usage % of Requests (efficiency panel)**
  Typical PromQL:
  ```
  sum by (namespace) (rate(container_cpu_usage_seconds_total{container!="", cluster=~"$cluster", namespace=~"$namespace"}[5m]))
  /
  sum by (namespace) (kube_pod_container_resource_requests{resource="cpu", cluster=~"$cluster", namespace=~"$namespace"})
  * 100
  ```
  - Unit: Percent (0-100)
  - Thresholds: >100% red (using more than requested)

NOTE: Adjust panels 2.1–2.5 based on the actual NRQL from Task 0.1. The above are the most common patterns for this dashboard type. Add or remove panels as needed.

---

### Phase 3 — Validation (30–60 min)

**Task 3.1 — Data presence check**
  - Select each PRD cluster in the $cluster variable
  - Verify all panels show non-zero data
  - Acceptance: data present for all clusters

**Task 3.2 — Value comparison with NewRelic**
  - Open NewRelic dashboard (https://onenr.io/0MRNpZLElQn) side-by-side with Grafana
  - Select the same cluster/namespace/time range in both
  - Compare key values — should be within ±5% (slight delta expected due to different scrape timing and aggregation windows)
  - Acceptance: no order-of-magnitude discrepancies

**Task 3.3 — Variable interaction check**
  - Change $cluster → verify all panels update
  - Change $namespace → verify panels filter correctly
  - Select "All" for both → verify no errors
  - Acceptance: all variable combinations work without errors

---

### Phase 4 — Handoff (15 min)

**Task 4.1 — Save to Devops folder and share URL**
  - Confirm dashboard is in Devops folder (`afmhol5iowkjkb`)
  - Save and copy dashboard URL

**Task 4.2 — Add migration notes text panel**
  - Add a Text panel at the top of the dashboard with:
    - "Migrated from NewRelic: https://onenr.io/0MRNpZLElQn"
    - "Cluster filter replaces NewRelic clusterName IN-list"
    - "CPU usage uses rate([5m]) window — values may differ slightly from NewRelic"
    - "Data source: ARMS Prometheus (kube-state-metrics + cAdvisor)"

---

## Acceptance Criteria (AKS Application Resource Usage)

Migration is complete when ALL of the following are true:

1. All panels show live data for PRD ACK clusters
2. CPU and memory values agree with NewRelic within ±10% (larger tolerance than NS Limit due to rate() window differences)
3. $cluster and $namespace variables work correctly
4. Dashboard is saved in Devops folder and URL is shareable
5. Migration notes text panel is present

---

## Timeline Summary

| Phase | Task | Estimated Time |
|-------|------|----------------|
| 0 | Panel inventory + metric verification | 30–45 min |
| 1 | Dashboard shell + variables | 20–30 min |
| 2 | Build panels (estimated 5–8 panels) | 1.5–2.5 hours |
| 3 | Validation | 30–45 min |
| 4 | Handoff + documentation | 15 min |
| **Total** | | **3–5 hours** |

**Can start immediately** — no blockers. Prerequisites (Grafana access, ARMS data source, Devops folder) are already confirmed from NS Limit migration work.

**Recommended migration order:** Migrate AKS Application Resource Usage BEFORE NS Limit Checking if time is short — it covers a wider set of resources and gives the team more immediate operational visibility into app-level resource consumption.

---

## Lessons Learned: AKS Application Resource Usage Migration (2025-05-19)

### Migration Summary

- **Source:** NewRelic "HK AKS Application Resource Usage Analysis" (3 pages, 7+ tables)
- **Target:** Grafana NP `grafana-np.gcr.manulife.com`, Devops folder `afmhol5iowkjkb`
- **Result:** https://grafana-np.gcr.manulife.com/d/efml8t9mqfm68c/ack-application-resource-usage-analysis
- **Actual effort:** ~2 hours (including debugging)

### What Went Well

1. NerdGraph API 拉取 panel inventory 非常高效，一次性获取所有 page 和 NRQL
2. Grafana HTTP API 创建 dashboard 比 UI 操作更快且可复现
3. 原始 NRQL → PromQL 映射相对直接（kube-state-metrics + cAdvisor 标准 metrics）

### Issues Encountered & Fixes

#### Issue 1: kube-state-metrics 多实例导致 many-to-many join 报错

**症状:** UAT panel 报 "Panel status error"，其他环境正常
**根因:** UAT 集群有多个 kube-state-metrics Pod（不同 instance IP），导致 `kube_pod_container_resource_limits` 出现重复 series。当 PromQL 使用 `/ on(namespace, pod, container) kube_pod_container_resource_limits{...}` 做除法时，右侧有多条匹配，Prometheus 拒绝 many-to-many。
**修复:** 在除法右侧包裹 `max by(namespace, pod, container)(...)` 去重，左侧加 `group_left`：
```promql
# Before (会报错):
rate(container_cpu_usage_seconds_total{...}[5m])
/ on(namespace, pod, container)
kube_pod_container_resource_limits{resource="cpu", ...}

# After (正确):
rate(container_cpu_usage_seconds_total{...}[5m])
/ on(namespace, pod, container) group_left
max by(namespace, pod, container)(kube_pod_container_resource_limits{resource="cpu", ...})
```
**预防:** 所有涉及 kube-state-metrics 的 PromQL join，右侧一律用 `max by(...)` 包裹，即使当前只有单实例环境也要加，因为未来可能扩展。

#### Issue 2: 首次 dashboard 结构不对齐

**症状:** 第一版 dashboard 把 Page 2 "Application Resources (Prod)" 的 alert panels 错误地加到了 NP 环境
**根因:** 没有仔细核对原始 3 个 page 的用途就开始构建
**修复:** 删除重建，按 Page 1 (Resource Tables per env) + Page 3 (Replicas/HPA per env) 的结构 1:1 复刻
**预防:** Phase 0 panel inventory 后必须写一份简短的 "原始结构总结"，列出每个 page 的用途和目标环境，确认哪些需要迁移、哪些不需要（如 Prod-only 内容不应出现在 NP Grafana）

### ACK Non-Business Namespace Exclusion List

NewRelic 原始排除 (AKS):
```
default, gatekeeper-system, istio-operator, istio-system, kube-node-lease, kube-public, kube-system, manulife-telemetry, ns-hbt-system, ns-kured-monitor, ns-newrelic-monitor, rabbitmq-system, twistlock
```

ACK 等效排除:
```
ack-onepilot, arms-prom, default, hk-arms-demo, istio-system, kube-node-lease, kube-public, kube-system, litmus, security-inspector, test, twistlock
```

**映射逻辑:**
- `istio-operator` → ACK 没有此 NS，改为排除 `istio-egress`（如存在）
- `manulife-telemetry`, `ns-newrelic-monitor` → 等效为 `arms-prom`（监控 agent NS）
- `gatekeeper-system` → ACK 用 `security-inspector`
- `ns-hbt-system`, `ns-kured-monitor` → ACK 没有，不需要
- ACK 新增: `ack-onepilot`（系统组件）, `litmus`（混沌测试）, `test`, `hk-arms-demo`

**注意:** 每次迁移新 dashboard 都应重新查询目标集群的 namespace 列表，因为 NS 会随时间变化。用以下 PromQL 获取完整列表：
```promql
group by(namespace)(kube_pod_container_resource_requests{resource="cpu"})
```

### Grafana API 操作流程（标准化）

1. **认证:** 使用 Playwright CLI attach 到已登录的 Chrome session，通过页面内 `fetch()` 调用 Grafana API（利用 session cookie）
2. **创建 dashboard:** `POST /api/dashboards/db` with `{"dashboard": {...}, "folderUid": "afmhol5iowkjkb", "overwrite": false}`
3. **更新 dashboard:** 先 `GET /api/dashboards/uid/<uid>` 获取当前 JSON + version，修改后 `POST /api/dashboards/db` with `overwrite: true`
4. **删除 dashboard:** `DELETE /api/dashboards/uid/<uid>`
5. **查询数据源:** `GET /api/datasources` 获取所有数据源 uid 和名称
6. **测试 PromQL:** `POST /api/ds/query` with datasource uid + expr

### Checklist for Next Migration

- [ ] Phase 0: NerdGraph panel inventory → 写 "原始结构总结"
- [ ] Phase 0: 确认哪些 page/panel 适用于目标环境（NP vs Prod）
- [ ] Phase 0: 查询目标集群 namespace 列表，更新排除 NS
- [ ] Phase 1: 所有 PromQL join 右侧用 `max by(...)` 包裹（防 kube-state-metrics 多实例）
- [ ] Phase 1: 使用 Grafana API 创建（非手动 UI），保留 JSON 可复现
- [ ] Phase 2: 每个环境（DEV/SIT/UAT）独立 panel，不要合并（保持和原始 1:1）
- [ ] Phase 3: 创建后立即检查每个环境的 panel 是否报错（不只看第一个）
- [ ] Phase 3: 测试 UAT 环境——往往是多实例/配置最复杂的环境，最容易出问题

---

# Dashboard Migration Plan: Node Server Status

### Source
- **Type**: NewRelic embedded chart (not a full dashboard)
- **Link**: https://chart-embed.service.newrelic.com/herald/48537c7b-b762-4840-bb5c-de50ab3d666a
- **Content**: Single time-series chart titled "Node reboot"
- **Time range**: 3 days
- **Data**: Node reboot events (Rebooted / RebootScheduled) grouped by AKS cluster name
- **Legend entries observed**: `Rebooted, aks-eas-hkg-prd`, `RebootScheduled, aks-sea-emm-uat`, etc.

### NRQL (inferred from chart behavior)
```sql
SELECT count(*) FROM InfrastructureEvent
WHERE category = 'kubernetes' AND event.reason IN ('Rebooted', 'RebootScheduled')
FACET event.reason, clusterName
SINCE 3 days ago TIMESERIES
```

### Target
- **Grafana folder**: devops (afmhol5iowkjkb)
- **Dashboard name**: ACK Node Server Status
- **Panels**: Single time-series chart with datasource variable to switch cluster

### Phase 0: Metrics Availability & Mapping

| #   | Check Item                                                 | Status |
| --- | ---------------------------------------------------------- | ------ |
| 1   | ACK 上是否有 node reboot/cordon/drain 相关事件？                    | ⬜ 待确认  |
| 2   | `kube_node_status_condition` (Ready=false) 是否可用？           | ⬜ 待确认  |
| 3   | `kube_node_spec_unschedulable` (cordon 状态) 是否可用？           | ⬜ 待确认  |
| 4   | `node_boot_time_seconds` (node-exporter) 是否可用？             | ⬜ 待确认  |
| 5   | Kubernetes Events (node reason=Rebooted) 是否采集到 Prometheus？ | ⬜ 待确认  |
| 6   | 确认 NS 排除列表（复用 Application Resource Usage 的结果）              | ⬜      |

**关键差异**: NewRelic 通过 `InfrastructureEvent` 采集 K8s node 事件（Rebooted/RebootScheduled）。ACK Prometheus 默认不采集 K8s Events 为 metrics。可能的替代方案：

| 方案 | 数据源 | 可行性 |
|------|--------|--------|
| A. kube_node_status_condition | Prometheus (kube-state-metrics) | ✅ 默认可用，但只反映 Ready/NotReady 状态变化，不直接对应 reboot |
| B. node_boot_time_seconds | Prometheus (node-exporter) | ✅ 通过 `changes(node_boot_time_seconds[3d])` 检测 reboot |
| C. kube_events_total / kubernetes_events | Prometheus (kube-state-metrics events) | ⬜ 需确认 ACK 是否启用 events 采集 |
| D. Alicloud 事件中心 | Alicloud CloudMonitor / SLS | ⬜ 需确认数据源是否接入 Grafana |

**推荐方案 B**: `changes(node_boot_time_seconds{job="node-exporter"}[3d]) > 0` — 直接检测节点重启次数，最接近原始 NewRelic "Rebooted" 语义。

### Phase 1: Implementation Plan

**Panel 结构** (1:1 复刻原始 — 单图表):

| Panel | Type | Description |
|-------|------|-------------|
| Node Reboot Events | Time series | X 轴=时间, Y 轴=重启次数, 按 node name 分组, 3d 范围 |

**变量**:
- `datasource`: type=prometheus, regex=`/.*hkg-ack.*/`

**PromQL (方案 B)**:
```promql
changes(node_boot_time_seconds{job="node-exporter"}[1h])
```
- Legend: `{{instance}}` 或 `{{node}}`
- 时间范围设为 3d 默认

**PromQL (方案 A 备选 — NotReady 状态)**:
```promql
kube_node_status_condition{condition="Ready", status="false"} == 1
```

### Phase 2: Validation
- [ ] 确认 `node_boot_time_seconds` metric 存在且有数据
- [ ] 确认 `changes()` 在 3d 范围内返回合理结果
- [ ] 对比 NewRelic 图表中的 reboot 事件是否在 Grafana 中可见

### Estimated Effort
- Phase 0 验证: 0.5h
- Phase 1 实施: 0.5h (单图表，结构简单)
- Phase 2 验证: 0.5h
- **Total: ~1.5h**

### Notes
- 原始是一个跨所有 region/环境的全局视图。ACK 版本可以用 datasource 变量切换环境，或直接用 `origin_prometheus` label 在一个图表里显示所有集群。
- 如果 Phase 0 确认方案 B 不可用（node-exporter 未部署），降级为方案 A（NotReady 状态监控）。


---
# Dashboard Migration Plan: Platform Reference

## Source
- **Name**: Asia Platform Reference Dashboard for Hong Kong (DEV / SIT / UAT)
- **NewRelic Link**: https://onenr.io/0MR2ygV04wY
- **Structure**: 每个环境一个独立 dashboard，每个含 14 pages

## Target
- **Grafana**: https://grafana-np.gcr.manulife.com
- **Folder**: Devops (`afmhol5iowkjkb`)
- **Strategy**: 合并为单个 dashboard，通过 datasource 变量切换 DEV/SIT/UAT

---

## Source Panel Inventory (per environment)

| #   | Page                | Widgets | Data Source Type                                | ACK Migratable | Alicloud 等价资源 / Metrics replacement |
| --- | ------------------- | ------- | ----------------------------------------------- | -------------- | ----------------------------------- |
| 1   | Overview            | 19      | K8s Samples + Azure PaaS + Istio Metrics        | ⚠️ PARTIAL     | (K8s 部分直接迁移)                        |
| 2   | Checkpoint          | 14      | K8s Node/Metric (kube_resourcequota) + Azure LB | ⚠️ PARTIAL     |                                     |
| 3   | App Performance     | 8       | Istio Metrics (istio_requests_total, duration)  | ✅ YES          |                                     |
| 4   | Cluster Resources   | 9       | K8s Node Samples                                | ✅ YES          |                                     |
| 5   | Platform Components | 25      | K8s Pod/Container/Deployment Samples            | ✅ YES          |                                     |
| 6   | Platform Services   | 2       | K8s Deployment/Replicaset Samples               | ✅ YES          |                                     |
| 7   | APIM                | 7       | AzureApiManagementServiceSample                 | ❌ Azure Only   | Cloud native gateway                |
| 8   | App Gateway         | 9       | AzureApplicationGatewaySample                   | ❌ Azure Only   | Cloud native gateway                |
| 9   | Service Bus         | 10      | AzureServiceBusNamespaceSample                  | ❌ Azure Only   | Message Queue for Apache RocketMQ   |
| 10  | Eventhub            | 10      | AzureEventHubNamespaceSample                    | ❌ Azure Only   | OUT OF SCOPE                        |
| 11  | AKV                 | 8       | AzureKeyVaultVaultSample                        | ❌ Azure Only   | KMS/Secrets 正在使用                    |
| 12  | ILB                 | 5       | AzureLoadBalancerSample                         | ❌ Azure Only   | ALB/SLB                             |
| 13  | RabbitMQ            | 7       | K8s Volume/Container + RMQ Metrics              | ✅ YES          | Message Queue for RabbitMQ          |
| 14  | Events              | 4       | InfrastructureEvent                             | ⚠️ 需替代方案       |                                     |

### Azure PaaS → AliCloud 资源映射

| Azure PaaS 服务                | 原始监控指标                                                                                                                           | Alicloud 对应服务                     | Alicloud 数据源/Metric                     | 备注      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | --------------------------------------- | ------- |
| API Management (APIM)        | Capacity, Requests, Duration, Backend Duration                                                                                   | Cloud native gateway              | AliyunCnapigateway_*                    |         |
| Application Gateway          | Total Requests, Failed Requests, Healthy/Unhealthy Hosts, Throughput, Response Status, Current Connections, Backend Connect Time | Cloud native gateway              | AliyunCnapigateway_*                    |         |
| Service Bus                  | Active Messages, Dead-lettered, Scheduled, Incoming/Outgoing Messages, Server Errors, User Errors, Throttled Requests            | Message Queue for Apache RocketMQ | rocketmq_*                              |         |
| Event Hub                    | Incoming/Outgoing Messages, Incoming/Outgoing Bytes, Captured Messages, Throttled Requests, Quota Exceeded Errors                | /                                 | /                                       | Retired |
| Key Vault (AKV)              | Service API Hit, Latency, Saturation, Availability, Result                                                                       | KMS/Secrets                       | AliyunKms*                              |         |
| Internal Load Balancer (ILB) | Data Path Availability, Health Probe Status, Byte Count, Packet Count, SYN Count                                                 | ALB/SLB                           | AliyunAlb_LoadBalancer\*<br>AliyunSlb\* |         |


### Metrics replacement

| Type    | 原始监控指标                           | 新指标                         | 备注                         |
| ------- | -------------------------------- | --------------------------- | -------------------------- |
| *Quota* | kube_resourcequota used/hard     | kube_resourcequota (保留原样) | 1:1 复刻，接受 No Data 直到集群配置 ResourceQuota |
| Event   | InfrastructureEvent: node reboot | None node_boot_time_seconds | Event not found in Grafnan |

### 迁移注意项目

1. **Cloud resource metrics datasource**: AliCloud PaaS 指标不在 ACK cluster datasource 中，而是在独立的 cloudservice datasource 下:
   - DEV: `mfc-glprom-dev-hkg-cloudservice` (uid: `VOX0KKpvz`)
   - UAT: `mfc-glprom-uat-hkg-cloudservice` (uid: `PewhKFtvz`)
   - NPRD: `mfc-glprom-nprd-hkg-cloudservice` (uid: `jXu2wByNz`)
   - Dashboard 需要额外的 datasource 变量 (type=prometheus, regex: `/.*hkg-cloudservice.*/`) 来选择 cloud metrics

2. **K8s ResourceQuota 保留原样**: ACK 集群当前未启用 ResourceQuota，Checkpoint page 中基于 `kube_resourcequota` 的 panel 保持 1:1 复刻（NS Quota Req.CPU/Memory %, NS Quota Lt.CPU/Memory %, NS Quota Req.PODs %），接受 No Data 状态，待集群配置 ResourceQuota 后数据自动出现

3. **Namespace 差异**: ACK 各环境 namespace 与 AKS 不同:
   - DEV 独有: `ns-hkg-poc-system`, `mfc-dev-jarvis`, `ns-yoda-system`, `ns-platform-portal-system`, `ns-hbt-system`
   - SIT 独有: `hk-arms-demo`, `mfc-sit-ado`
   - UAT 较精简，仅核心业务 NS
   - 非业务 NS 排除列表需按环境差异化处理

4. **RabbitMQ metrics 双源**: RabbitMQ 指标同时存在于:
   - ACK cluster datasource (exporter in-cluster): `rabbitmq_connections`, `rabbitmq_queue_messages_ready` 等
   - Cloudservice datasource: `rabbitmq_queue_unacked_deliver_messages`, `rabbitmq_channels` 等
   - 需确认哪个源更完整，建议优先用 cluster datasource 的 exporter 指标

5. **Redis 指标来源**: Redis 监控全部在 cloudservice datasource，前缀 `AliyunRedis_*`，有 Standard/Sharding/Splitrw 三种架构类型

6. **Datasource 变量设计**: 需要两套 datasource 变量:
   - K8s metrics: regex `/.*hkg-ackcluster.*/`
   - Cloud PaaS metrics: regex `/.*hkg-cloudservice.*/`
   - 两者须联动（选 DEV cluster 时 cloud 也应显示 DEV）

7. **ILB → ALB/SLB 标签映射**: Azure ILB page 对应 ACK 的 ALB + SLB。关键标签:
   - ALB: `loadBalancerName` (如 `mfc-alb-nprod-hkg-dev-int`, `mfc-alb-nprod-hkg-sit-int`), `addressType: Intranet`
   - SLB: `instanceName` (大多为 ServiceMesh 自动创建如 `ServiceMeshPilot-*`), `addressType: intranet`
   - 过滤建议: ALB 用 `loadBalancerName=~"mfc-alb.*"` 排除非业务 LB; SLB 用 `instanceName!~"ServiceMesh.*"` 排除 mesh 自动创建的
   - DEV cloudservice 有 999+ ALB/SLB series, UAT 有 248 series — 数据充足
   - ALB 对应原 Azure App Gateway + ILB (L7), SLB 对应 ILB (L4)

---

## Implementation Phases

### Phase 0: 验证与确认 (30min) — ✅ 已完成 

- [x] **0.1 确认 K8s Metrics 可用性** ✅ ALL PASS (DEV/SIT/UAT)
  - `kube_node_info` ✅, `kube_pod_status_phase` ✅, `kube_pod_container_resource_requests` ✅
  - `container_cpu_usage_seconds_total` ✅, `container_memory_working_set_bytes` ✅
  - `kube_deployment_status_replicas_unavailable` ✅, `kube_pod_container_status_restarts_total` ✅

- [x] **0.2 确认 Istio Metrics 可用性** ✅ ALL PASS
  - `istio_requests_total` ✅ (DEV/SIT/UAT), `istio_request_duration_milliseconds_sum` ✅ (DEV/SIT/UAT)
  - App Performance phase: UNBLOCKED

- [x] **0.3 确认 RabbitMQ Metrics 可用性** ✅ ALL PASS
  - `rabbitmq_connections` ✅ (DEV/SIT/UAT, from cluster datasource)
  - `kubelet_volume_stats_used_bytes` ✅ (DEV/SIT/UAT)
  - 另外 cloudservice datasource 也有: `rabbitmq_queue_unacked_deliver_messages`, `rabbitmq_channels`, `rabbitmq_queue_messages_ready`, `rabbitmq_queue_consumers`

- [x] **0.4 确认 Event Metrics 可用性** ✅ ALL PASS
  - `kube_event_count` ✅ (DEV/SIT/UAT)
  - `kubernetes_events_total` ✅ (DEV/SIT/UAT)
  - Events page: UNBLOCKED

- [x] **0.5 确认 ACK Non-Business NS 排除列表** ✅ 已查询
  - **DEV namespaces** (29个): `ack-onepilot, arms-prom, default, istio-system, kube-system, litmus, mfc-dev-jarvis, ns-devops-system, ns-gft-atas-system, ns-hbt-system, ns-hkg-agent-system, ns-hkg-alicloud-system, ns-hkg-claims-system, ns-hkg-claims-vendor-system, ns-hkg-customer-system, ns-hkg-dcs-system, ns-hkg-ird-system, ns-hkg-nb-system, ns-hkg-ods-system, ns-hkg-pnf-system, ns-hkg-poc-system, ns-hkg-policy-system, ns-hkg-regulatory-system, ns-hkg-shared-system, ns-platform-portal-system, ns-yoda-system, security-inspector, test, twistlock`
  - **SIT namespaces** (23个): `ack-onepilot, arms-prom, default, hk-arms-demo, istio-system, kube-system, mfc-sit-ado, ns-gft-atas-system, ns-hkg-agent-system, ns-hkg-alicloud-system, ns-hkg-claims-system, ns-hkg-claims-vendor-system, ns-hkg-customer-system, ns-hkg-dcs-system, ns-hkg-ird-system, ns-hkg-nb-system, ns-hkg-ods-system, ns-hkg-pnf-system, ns-hkg-policy-system, ns-hkg-regulatory-system, ns-hkg-shared-system, security-inspector, twistlock`
  - **UAT namespaces** (19个): `ack-onepilot, arms-prom, default, istio-system, kube-system, ns-gft-atas-system, ns-hkg-agent-system, ns-hkg-claims-system, ns-hkg-claims-vendor-system, ns-hkg-customer-system, ns-hkg-dcs-system, ns-hkg-ird-system, ns-hkg-nb-system, ns-hkg-ods-system, ns-hkg-pnf-system, ns-hkg-policy-system, ns-hkg-regulatory-system, ns-hkg-shared-system, twistlock`
  - **排除列表** (非业务 NS): `ack-onepilot|arms-prom|default|istio-system|kube-system|litmus|security-inspector|twistlock|test

- [x] **0.6 确认 AliCloud PaaS 资源映射** ✅ 已确认 metric 存在
  - Cloud Native Gateway (APIM + App Gateway): `AliyunCnapigateway_*` — 34 metrics available ✅
  - ALB/SLB (ILB): `AliyunAlb_*` + `AliyunSlb_*` — 80+ metrics available ✅
  - RocketMQ (Service Bus): `AliyunRocketmq5_*` + `rocketmq_*` — 25+ metrics available ✅
  - KMS (AKV): `AliyunKms_*` — 12 metrics available ✅
  - Redis (新增，原 NR 无): `AliyunRedis_*` — 100+ metrics available ✅
  - Event Hub: OUT OF SCOPE (已确认无等价，已退役)
  - **结论**: Page 7 (APIM), Page 8 (App Gateway), Page 9 (Service Bus), Page 11 (AKV), Page 12 (ILB) 全部可迁移

### Phase 1: Cluster Resources + Checkpoint (基础 Node 监控, ~2h) — ✅ 已完成 

**Panels:**
- Cluster Resource Usage summary (CPU/Mem/Disk %)
- CPU/Memory/Disk Usage by Node (timeseries)
- NS Resource Quota Usage (table)
- Node Scale / Count
- OOM Events (if event metrics available)

**复杂度**: 中 — 标准 node_exporter + kube-state-metrics

### Phase 2: Platform Components (Pod/Container 健康, ~3-4h) — ✅ 已完成 

**Panels (25):**
- Component Count (nodes, namespaces, deployments, services...)
- Pods/Containers by Status (pie/bar)
- Running Pods/Containers by Node (timeseries)
- Missing Pods by Deployment (table)
- Container Restarts (table + timeseries delta)
- Containers with Common Errors (table)
- Container Not Running (table)
- Pod with Failed/Unknown Status (table)
- CPU/Memory Usage % by Container (table)
- Daemonset Missing Pods

**复杂度**: 高 — 25 个 panel，大量 kube_* join 查询，所有 join 右侧必须 `max by(...)` 包裹

### Phase 3: App Performance — Istio (~1.5h) — ✅ 已完成

**Panels:**
- Request Count / Error Count / Error Rate % (stat)
- Request Volume by Cluster (timeseries)
- Requests by Response Code (timeseries)
- Duration (timeseries)
- Request/Response Throughput (timeseries)

**前提**: Phase 0.2 确认 istio metrics 可用

### Phase 4: Overview 综合状态页 (~2h) ✅ DONE

**Dashboard UID**: `dfn493k7nwwlce`
**URL**: /d/dfn493k7nwwlce/asia-platform-reference-overview

**Panels (19 total):**
- ✅ Nodes count (stat) — 有数据
- ✅ Unavailable Pods (table) — No Data = 无异常
- ✅ Istio Endpoints HealthCheck — dev 无 istio
- ✅ RMQ Workers health, RMQ PVC Ratio
- ✅ Network Traffic Per Second — 有数据
- ✅ Memory Ratios / CPU Usage Ratio (timeseries) — 有数据
- ✅ Istio GC Duration / Total Envoy Connections — dev 无 istio
- ✅ Warning Events count — No Data = 无异常
- ⏳ Criticals/Warnings by Component — **placeholder, TBD (见全局 TBD)**
- ✅ Cloud PaaS: Gateway Health (QPS+SuccessRate), Gateway Capacity (CPU+5XX), RocketMQ ConsumerLag, KMS Health — 全部有数据
- ℹ️ Event Hub Connections — OUT OF SCOPE (retired)

**复杂度**: 中 — 聚合前面 phases 的关键指标

### Phase 5: RabbitMQ (~1h) — ✅ 已完成

**Dashboard UID**: `efnw7cvrg2x34c`
**URL**: /d/efnw7cvrg2x34c/asia-platform-reference-rabbitmq

**关键变化**: RabbitMQ 从 AKS self-hosted 变为 Alicloud PaaS (AMQP)，metrics 在 cloudservice datasource。

**原始 NR Panels → PaaS 替代:**

| NR Panel | 状态 | 替代 |
|----------|------|------|
| Disk Usage % | ❌ N/A | PaaS 管理，无用户侧磁盘指标 |
| RMQ Connection | ✅ | `AliyunAmqp_instance_InstanceConnections` |
| Message Queue Depth | ✅ | `AliyunAmqp_instance_InstanceQueueMessageAccumulation` |
| CPU Usage % | ✅ 替换 | TPS In (PaaS 无 CPU 指标) |
| Memory Usage % | ✅ 替换 | TPS Out (PaaS 无 Memory 指标) |
| PVC Ratio | ❌ N/A | PaaS 无 PVC |
| Unavailable Pods | ❌ N/A | PaaS 无 Pods |

**额外新增 panels**: Channels, Consumers, Queue Messages Ready (by vHost), Unacked Messages (by vHost)

**变量**: `datasource_cloud` (cloudservice 切换环境) + `instance` (RabbitMQ 实例名)

**TBD**: TPS Usage % 设计 (TPS/规格上限×100) — 暂 pass，待确认计费档位上限数据来源

**复杂度**: 低 — PaaS metrics 直接可用，无需 K8s join

### Phase 6: Platform Services (~30min) — ✅ 已完成

**Dashboard UID**: `cfnwct0g14k5ca`
**URL**: /d/cfnwct0g14k5ca/asia-platform-reference-platform-services

**Panels (2):**
- ✅ Deployments — table: Deployment | Namespace | Pods Available (platform NS only)
- ✅ Missing Pods — table: ReplicaSet | Namespace | Missing count (shows only >0, empty = healthy)

**Platform NS filter**: `ack-onepilot|arms-prom|default|istio-system|kube-system|litmus|security-inspector|twistlock`

**NR→ACK 映射:**
| NR Panel | NR Metric | PromQL |
|----------|-----------|--------|
| Deployments (podsAvailable) | K8sDeploymentSample.podsAvailable | `kube_deployment_status_replicas_available{namespace=~"<platform_ns>"}` |
| Missing Pods (podsMissing) | K8sReplicasetSample.podsMissing | `(kube_replicaset_status_replicas - kube_replicaset_status_ready_replicas) > 0` |

**验证**: DEV ✅ SIT ✅ (datasource 变量切换正常)

**复杂度**: 低

### Phase 7: Alicloud PaaS (待 Phase 0.6 确认后规划)

根据映射表确认的等价服务，逐个构建对应 page。仅在 Phase 0.6 填写完成后启动。

---

## Metric Mapping (Key Conversions)

| NewRelic Source | Metric | PromQL Equivalent |
|----------------|--------|-------------------|
| K8sNodeSample | `cpuUsedCores` | `sum by(node)(rate(container_cpu_usage_seconds_total{id="/"}[5m]))` |
| K8sNodeSample | `allocatableCpuCores` | `kube_node_status_allocatable{resource="cpu"}` |
| K8sNodeSample | `memoryWorkingSetBytes` | `node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes` |
| K8sNodeSample | `allocatableMemoryBytes` | `kube_node_status_allocatable{resource="memory"}` |
| K8sNodeSample | `fsUsedBytes/fsCapacityBytes` | `(node_filesystem_size_bytes - node_filesystem_avail_bytes) / node_filesystem_size_bytes` |
| K8sPodSample | `status`, `uniqueCount` | `kube_pod_status_phase` |
| K8sContainerSample | `cpuCoresUtilization` | `rate(container_cpu_usage_seconds_total[5m]) / on(namespace,pod,container) group_left max by(namespace,pod,container)(kube_pod_container_resource_limits{resource="cpu"}) * 100` |
| K8sContainerSample | `memoryUtilization` | `container_memory_working_set_bytes / on(namespace,pod,container) group_left max by(namespace,pod,container)(kube_pod_container_resource_limits{resource="memory"}) * 100` |
| K8sContainerSample | `restartCount` | `kube_pod_container_status_restarts_total` |
| K8sDeploymentSample | `podsUnavailable` | `kube_deployment_status_replicas_unavailable` |
| K8sReplicasetSample | `podsMissing` | `kube_replicaset_status_replicas - kube_replicaset_status_ready_replicas` |
| K8sDaemonsetSample | `podsUnavailable` | `kube_daemonset_status_number_unavailable` |
| K8sHpaSample | min/max/current/desired | `kube_horizontalpodautoscaler_spec_min/max_replicas`, `..._status_current/desired_replicas` |
| K8sVolumeSample | `fsUsedBytes/fsCapacityBytes` | `kubelet_volume_stats_used_bytes / kubelet_volume_stats_capacity_bytes` |
| Metric | `istio_requests_total` | `istio_requests_total` (直接等价) |
| Metric | `rabbitmq_connections` | `rabbitmq_connections` (直接等价) |
| InfrastructureEvent | `event.reason` | ❌ 无直接等价，需 kube_event_count 或 Event Exporter |

### Label Mapping

| Concept | NewRelic | ACK PromQL |
|---------|----------|------------|
| Cluster filter | `clusterName in ('aks-eas-hkg-dev')` | datasource 变量已隐含集群 |
| Namespace | `namespace` / `namespaceName` | `namespace` |
| Node | `nodeName` | `node` |
| Pod | `podName` | `pod` |
| Container | `containerName` | `container` |
| Deployment | `deploymentName` | `deployment` (via kube_*) |

---

## Datasources

| Environment | Datasource Name | UID |
|-------------|----------------|-----|
| DEV | mfc-glprom-dev-hkg-ackcluster | -GCRYa6Hk |
| SIT | mfc-glprom-sit-hkg-ackcluster | yqB1XKtDk |
| UAT | mfc-glprom-uat-hkg-ackcluster | VTUAY-6Nz |

---

## Known Pitfalls (从 AKS Resource Usage 迁移总结)

1. **kube-state-metrics 多实例**: 所有 PromQL join 的右侧必须用 `max by(...)` 去重，防止 many-to-many 报错
2. **datasource 变量**: type=prometheus + regex `/.*hkg-ack.*/` 自动匹配所有环境
3. **API 认证**: 无 API token，需通过 Playwright CLI 连接已登录浏览器 session 的 fetch() 调用
4. **NS 排除列表**: ACK 和 AKS 系统 NS 命名不同，每次迁移前必须重新查询确认
5. **Grafana table panel**: 多查询 merge 时必须配置 transform (join by field)
6. **结构对齐**: Phase 0 完成后必须写"原始结构总结"，确认哪些 page 适用目标环境再动手

---

## Existing ACK Dashboards (Overlap Check)

| Existing Dashboard | Overlap With | Action |
|-------------------|--------------|--------|
| ACK Cluster Overview Non_Prod | Cluster Resources | 参考其 PromQL 写法，不重复建 |
| Namespace Overview | Platform Components (部分) | 参考变量定义 |
| AliCloud Rabbitmq Overview | RabbitMQ | 可能直接复用 or 链接 |

---

## Estimated Effort

| Phase | Panels | Complexity | Est. Time |
|-------|--------|-----------|-----------|
| Phase 0 | - | Low | 30min |
| Phase 1 | ~9 | Medium | 2h |
| Phase 2 | ~14 | High | 3-4h |
| Phase 3 | ~7 | Medium | 1.5h |
| Phase 4 | ~11 | Medium | 2h |
| Phase 5 | ~6 | Low | 1h |
| Phase 6 | ~2 | Low | 30min |
| Phase 7 | TBD | TBD | TBD (待 Alicloud PaaS 映射确认) |
| **Total** | **~49 + PaaS** | | **~11h + Phase 7** |

---

## Output Structure (Grafana Dashboard)

```
ACK Platform Reference Dashboard
├── Variables: datasource (prometheus, regex: /.*hkg-ack.*/)
│              namespace (multi, exclude non-business)
├── Row: Overview
├── Row: Checkpoint  
├── Row: Cluster Resources
├── Row: App Performance (Istio)
├── Row: Platform Components
├── Row: Platform Services
├── Row: RabbitMQ
├── Row: Events (pending metric availability)
└── Row: Alicloud PaaS Services (pending Phase 0.6)
```

单个 dashboard 通过 datasource 变量切换 DEV/SIT/UAT，不再像 NewRelic 那样每个环境一个独立 dashboard。

---
