# Grafana NP Research Findings

## 迁移方向

**NewRelic → Grafana (DevOps folder)**

目标：将 NewRelic 上的 HKG NS Limit Checking (PRD) dashboard 迁移至 Grafana NP 实例的 DevOps folder (`afmhol5iowkjkb`)。

---

## Instance Details
- **URL**: https://grafana-np.gcr.manulife.com
- **Version**: v11.5.1 (Aliyun-dev)
- **Authentication**: AliCloud IDaaS SSO (WebAuthn / Azure Entra ID)
- **Access Method**: Playwright CLI（skill 已提前安装好，连接已认证的 Edge 浏览器）

## Authentication
- No API token or service account available
- SSO via AliCloud IDaaS (interactive only)
- 通过 Playwright CLI 连接运行中的 Microsoft Edge 实例（已有活动 SSO session）操作 Grafana

## Target Folder: Devops (afmhol5iowkjkb)

| UID | Title | Status |
|-----|-------|--------|
| **afmhol5iowkjkb** | **Devops** | **Empty — migration destination** |

- **Created**: 2026-05-19T02:05:55+08:00（今日新建，专为迁移使用）
- No dashboards or subfolders — ready to receive migrated dashboards

## Data Sources (relevant to migration)
- 22x Prometheus (ARMS metrics, ACK clusters, global prometheus) — migration 所需数据源均已存在于同一实例

## API Capabilities (confirmed)

| Capability | Available | Endpoint |
|------------|-----------|----------|
| Dashboard JSON export | YES | `/api/dashboards/uid/{uid}` |
| Dashboard create/import | YES (canSave=true) | `POST /api/dashboards/db` |
| Folder management | YES | `/api/folders` |
| Datasource list | YES | `/api/datasources` |

## Recommended Migration Approach

### Strategy: Build dashboard from scratch in Devops folder

由于 NewRelic 与 Grafana 的 dashboard JSON 格式完全不兼容（NerdGraph vs Grafana JSON model，NRQL vs PromQL），不能直接导入。正确做法是在 Grafana 中手工新建 dashboard。

步骤：
1. 使用 Playwright CLI 打开 Grafana，导航至 Devops folder
2. 在 Devops folder 内新建 Dashboard: `HKG NS Limit Checking (PRD)`
3. 按 migration-plan.md 的 Phase 0–4 逐步建 5 个 Panel（详见该文档）
4. 保存至 Devops folder，验证数据

### Why build from scratch
- NewRelic JSON 与 Grafana JSON 格式不兼容，JSON 导入无意义
- 所有 5 个 panel 使用同一 PromQL 模板，手建比转换更快（预计 2–4h）
- 同一 Grafana 实例内无需重新映射 datasource

## Limitations
1. Non-prod environment — data/dashboards may differ from production
2. No direct API token — requires browser-based auth via Playwright CLI
3. SSO session may expire — requires human re-authentication periodically

## How to Access (Playwright CLI)
```bash
# 前提：
# 1. Microsoft Edge 已运行，且已登录 Grafana SSO session
# 2. Playwright CLI skill 已安装

# 启动 Playwright CLI（extension 模式，连接已打开的 Edge）：
# /Users/luruilr/.nvm/versions/node/v22.22.2/bin/playwright-cli full path
playwright-cli

# 或使用已安装的 Playwright CLI skill 直接操作浏览器
```

## 详细迁移文档
- 指标映射: `metric-mapping.md`
- 迁移执行计划: `migration-plan.md`
- Dashboard panel 清单: `ns-limit-dashboard-inventory.md`
- 综合迁移方案: `ns-limit-migration-report.md`
