---
marp: true
theme: default
paginate: true
size: 16:9
backgroundColor: #0f172a
color: #f8fafc
style: |
  section { font-family: 'Segoe UI', system-ui, sans-serif; padding: 45px 60px; }
  h1 { color: #38bdf8; font-size: 2.2em; margin: 0 0 0.3em; }
  h2 { color: #7dd3fc; font-size: 1.4em; border-bottom: 2px solid #1e40af; padding-bottom: 0.2em; margin: 0 0 0.7em; }
  p { color: #cbd5e1; font-size: 0.88em; margin: 0.2em 0; }
  li { color: #cbd5e1; font-size: 0.85em; margin-bottom: 0.15em; }
  ul { margin: 0.2em 0; padding-left: 1.3em; }
  strong { color: #fbbf24; }
  em { color: #34d399; font-style: normal; }
  blockquote { border-left: 4px solid #3b82f6; padding: 0.5em 0.9em; color: #94a3b8; background: #1e293b; border-radius: 0 6px 6px 0; margin: 0.6em 0; font-size: 0.82em; }
  table { width: 100%; border-collapse: collapse; font-size: 0.82em; }
  td { border: 1px solid #334155; padding: 0.4rem 0.7rem; color: #e2e8f0 !important; background-color: #0f172a !important; }
  th { border: 1px solid #334155; padding: 0.4rem 0.7rem; background-color: #1e3a8a !important; color: #93c5fd !important; font-weight: bold; }
  tr:nth-child(even) td { background-color: #1e293b !important; }
  code { background: #1e293b; color: #7dd3fc; padding: 0.1em 0.35em; border-radius: 3px; font-size: 0.8em; }
  pre { background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 0.7em 0.9em; font-size: 0.76em; line-height: 1.6; margin: 0.4em 0; }
  pre code { background: none; padding: 0; color: #e2e8f0; }
  .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; margin-top: 0.5rem; }
  .g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-top: 0.5rem; }
  .f3 { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; gap: 0.6rem; align-items: center; margin-top: 0.8rem; }
  .arr { font-size: 1.8em; color: #475569; text-align: center; }
  .lyr { display: flex; align-items: center; gap: 1rem; border-radius: 6px; padding: 0.5rem 1rem; margin: 0.3rem 0; background: #1e293b; border-left: 3px solid #334155; }
  .lyr-g { background: #0c1f0c; border-left: 4px solid #22c55e; }
  .lyr-b { background: #0c1f3d; border-left: 4px solid #3b82f6; }
  .lnm { min-width: 120px; font-size: 0.74em; font-weight: bold; white-space: nowrap; color: #94a3b8; }
  .lnm-g { color: #86efac; }
  .lnm-b { color: #93c5fd; }
  .ldc { font-size: 0.78em; color: #94a3b8; }
  .ldc-g { color: #86efac; }
  .ldc-b { color: #93c5fd; }
  .lbg { margin-left: auto; border-radius: 4px; padding: 2px 8px; font-size: 0.67em; white-space: nowrap; }
  .lbg-g { background: #14532d; color: #86efac; border: 1px solid #22c55e; }
  .lbg-b { background: #1e3a8a; color: #93c5fd; border: 1px solid #3b82f6; }
  .row { display: flex; align-items: center; gap: 0.9rem; padding: 0.6rem 0; border-bottom: 1px solid #1e3a8a; }
  .row:last-child { border-bottom: none; }
  .ico { font-size: 1.6em; min-width: 1.8em; }
  .pain { background: #1e293b; border-left: 4px solid #ef4444; border-radius: 6px; padding: 0.8rem 1rem; display: flex; align-items: center; gap: 0.9rem; margin-bottom: 0.7rem; }
  .pain-t { color: #fca5a5; font-weight: bold; font-size: 0.87em; }
  .pain-d { color: #64748b; font-size: 0.78em; }
  .cap { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 0.8rem 1rem; display: flex; align-items: center; gap: 0.9rem; margin-bottom: 0.7rem; }
  .cap-t { color: #7dd3fc; font-weight: bold; font-size: 0.84em; }
  .cap-d { color: #94a3b8; font-size: 0.78em; }
---

<!-- _class: lead -->
<!-- _backgroundColor: #020617 -->

# AIOps 落地战略

<div style="color:#94a3b8; font-size:0.95em; margin:0.5rem 0 1.5rem;">降本减负 · 数据驱动 · 智能治理</div>

<div style="display:flex; gap:1.5rem; justify-content:center;">
  <div style="background:#0c2818; border:2px solid #22c55e; border-radius:10px; padding:0.7rem 1.5rem; color:#86efac;">🔧 DevOps Drive</div>
  <div style="background:#1c1407; border:2px solid #f59e0b; border-radius:10px; padding:0.7rem 1.5rem; color:#fbbf24;">🤝 Cross-team Drive</div>
  <div style="background:#150b2e; border:2px solid #8b5cf6; border-radius:10px; padding:0.7rem 1.5rem; color:#c4b5fd;">🏗️ Platform Drive</div>
</div>

<div style="margin-top:1.5rem; color:#475569; font-size:0.8em;">Platform Team · 2026</div>

---

## ✅ 已交付 — Pipeline AI MVP

<div class="g2">

<div>
  <div class="g3" style="gap:0.6rem; margin-top:0; margin-bottom:0.7rem;">
    <div style="background:#052e16; border:2px solid #22c55e; border-radius:10px; padding:0.7rem 0.4rem; text-align:center;">
      <div style="font-size:2.2em; font-weight:bold; color:#22c55e; line-height:1;">&lt;30s</div>
      <div style="color:#86efac; font-size:0.7em; margin-top:0.2rem;">故障 RCA</div>
      <div style="color:#4ade80; font-size:0.65em; text-decoration:line-through; opacity:0.7;">原 30–60 分钟</div>
    </div>
    <div style="background:#0c1f3d; border:2px solid #3b82f6; border-radius:10px; padding:0.7rem 0.4rem; text-align:center;">
      <div style="font-size:2.2em; font-weight:bold; color:#38bdf8; line-height:1;">0</div>
      <div style="color:#93c5fd; font-size:0.7em; margin-top:0.2rem;">新增基础设施</div>
    </div>
    <div style="background:#1c1407; border:2px solid #f59e0b; border-radius:10px; padding:0.7rem 0.4rem; text-align:center;">
      <div style="font-size:2.2em; font-weight:bold; color:#fbbf24; line-height:1;">∞</div>
      <div style="color:#fcd34d; font-size:0.7em; margin-top:0.2rem;">知识自动归档</div>
    </div>
  </div>
  <div style="background:#1e293b; border:1px solid #334155; border-radius:8px; padding:0.8rem 1rem;">
    <div style="color:#7dd3fc; font-size:0.82em; font-weight:bold; margin-bottom:0.4rem;">✅ 已覆盖场景</div>
    <div style="color:#86efac; font-size:0.82em; line-height:1.7;">
      AKS Helm 部署失败<br>
      Docker Build 失败<br>
      测试失败日志摘要
    </div>
    <div style="display:inline-block; background:#14532d; border:1px solid #22c55e; border-radius:20px; padding:2px 10px; font-size:0.7em; color:#86efac; margin-top:0.4rem;">可 Demo ✅</div>
  </div>
</div>

<div style="background:#1e293b; border:1px solid #334155; border-radius:10px; padding:1rem 1.1rem;">
  <div style="color:#7dd3fc; font-size:0.82em; font-weight:bold; margin-bottom:0.5rem;">📐 实现流程</div>
  <div style="font-size:0.78em; color:#94a3b8; line-height:1.8;">
    <span style="color:#f8fafc;">CD Pipeline 失败</span><br>
    &nbsp;↓ 立即写入 Build 描述 <span style="color:#fbbf24;">"AI 分析中..."</span><br>
    &nbsp;↓ 并行触发 AI 分析（不阻塞主流程）<br>
    <span style="color:#f8fafc;">Copilot AI 分析日志 → 推理 RCA</span><br>
    &nbsp;↓ <span style="color:#22c55e;">30s 内完成 → 报告归档</span>
  </div>
  <div style="color:#7dd3fc; font-size:0.82em; font-weight:bold; margin:0.6rem 0 0.3rem;">🔑 核心优势</div>
  <div style="color:#94a3b8; font-size:0.78em; line-height:1.6;">
    零外部依赖 · 基于现有 Copilot Enterprise<br>
    并行分析不阻塞主流程<br>
    结果持久化为团队知识资产
  </div>
</div>

</div>

</div>

---

## 😤 问题 → 我们的方案

<div class="g2">

<div>
  <div class="pain"><span style="font-size:1.8em;">⏱️</span><div><div class="pain-t">重复性 L1 Support</div><div class="pain-d">标准故障排查占据大量时间</div></div></div>
  <div class="pain"><span style="font-size:1.8em;">🧑‍🏫</span><div><div class="pain-t">专家依赖严重</div><div class="pain-d">初级工程师高度依赖资深同事</div></div></div>
  <div class="pain"><span style="font-size:1.8em;">☁️</span><div><div class="pain-t">迁移复杂度叠加</div><div class="pain-d">Azure→AliCloud 迁移带来双倍运维负担</div></div></div>
  <div class="pain"><span style="font-size:1.8em;">🧩</span><div><div class="pain-t">知识无法沉淀</div><div class="pain-d">每次排查经验随手消散</div></div></div>
</div>

<div style="background:#0c1f3d; border:2px solid #3b82f6; border-radius:12px; padding:1.3rem 1.4rem;">
  <div style="text-align:center; color:#7dd3fc; font-weight:bold; margin-bottom:0.9rem;">AI 的答案</div>
  <div class="row"><span class="ico" style="color:#22c55e;">⚡</span><div style="font-size:0.85em;"><strong>秒级响应</strong> — AI 即时分析，不等专家</div></div>
  <div class="row"><span class="ico" style="color:#22c55e;">🧠</span><div style="font-size:0.85em;"><strong>上下文感知</strong> — 关联发布、依赖、历史事件</div></div>
  <div class="row"><span class="ico" style="color:#22c55e;">📚</span><div style="font-size:0.85em;"><strong>知识沉淀</strong> — 分析结果自动归档为 KB</div></div>
  <div class="row"><span class="ico" style="color:#22c55e;">🔄</span><div style="font-size:0.85em;"><strong>主动发现</strong> — 不等告警，主动推送异常洞察</div></div>
</div>

</div>

---

## 🗺️ Pipeline AI — 三层演进

<div class="f3">

<div style="background:#052e16; border:2px solid #22c55e; border-radius:10px; padding:1.3rem 1rem; text-align:center;">
  <div style="background:#14532d; border:1px solid #22c55e; border-radius:20px; padding:2px 10px; font-size:0.68em; color:#86efac; display:inline-block; margin-bottom:0.5rem;">L1 · ✅ MVP完成</div>
  <div style="font-size:2em; margin:0.3rem 0;">🔎</div>
  <div style="color:#f8fafc; font-weight:bold;">快速 Triage</div>
  <div style="color:#6ee7b7; font-size:0.78em; margin-top:0.5rem; line-height:1.6;">Pipeline 失败 → 自动触发<br>30s RCA 报告</div>
  <div style="color:#4ade80; font-size:0.75em; margin-top:0.4rem;">入口: Jenkins Build</div>
</div>

<div class="arr">→</div>

<div style="background:#0c1f3d; border:2px solid #3b82f6; border-radius:10px; padding:1.3rem 1rem; text-align:center;">
  <div style="background:#1e3a8a; border:1px solid #3b82f6; border-radius:20px; padding:2px 10px; font-size:0.68em; color:#93c5fd; display:inline-block; margin-bottom:0.5rem;">L2 · 🚧 规划中</div>
  <div style="font-size:2em; margin:0.3rem 0;">📲</div>
  <div style="color:#f8fafc; font-weight:bold;">主动推送</div>
  <div style="color:#93c5fd; font-size:0.78em; margin-top:0.5rem; line-height:1.6;">Splunk/Grafana 检测模式<br>Bot 主动联系责任人</div>
  <div style="color:#60a5fa; font-size:0.75em; margin-top:0.4rem;">入口: Teams Bot 主动</div>
</div>

<div class="arr">→</div>

<div style="background:#150b2e; border:2px solid #8b5cf6; border-radius:10px; padding:1.3rem 1rem; text-align:center;">
  <div style="background:#3b0764; border:1px solid #8b5cf6; border-radius:20px; padding:2px 10px; font-size:0.68em; color:#c4b5fd; display:inline-block; margin-bottom:0.5rem;">L3 · 🔮 后续</div>
  <div style="font-size:2em; margin:0.3rem 0;">🤖</div>
  <div style="color:#f8fafc; font-weight:bold;">深度诊断</div>
  <div style="color:#c4b5fd; font-size:0.78em; margin-top:0.5rem; line-height:1.6;">你发起 → KB 检索<br>多步推理 + 工具调用</div>
  <div style="color:#a78bfa; font-size:0.75em; margin-top:0.4rem;">入口: Teams Bot 被动</div>
</div>

</div>

<div class="g2" style="margin-top:0.9rem;">
  <div style="background:#1e293b; border:1px solid #334155; border-radius:8px; padding:0.85rem 1.1rem; display:flex; align-items:center; gap:0.9rem;">
    <span style="font-size:1.8em;">💬</span>
    <div><div style="color:#7dd3fc; font-weight:bold; font-size:0.87em;">AIOps 入口 1 — Teams ChatBot</div><div style="color:#64748b; font-size:0.78em;">L2 主动推送 + L3 被动对话，同一个 Bot，两种模式</div></div>
  </div>
  <div style="background:#1e293b; border:1px solid #334155; border-radius:8px; padding:0.85rem 1.1rem; display:flex; align-items:center; gap:0.9rem;">
    <span style="font-size:1.8em;">📊</span>
    <div><div style="color:#7dd3fc; font-weight:bold; font-size:0.87em;">AIOps 入口 2 — AIOps Dashboard</div><div style="color:#64748b; font-size:0.78em;">全局健康态势 · 故障趋势 · 服务风险可视化</div></div>
  </div>
</div>

---

## ☁️ Migration AI — 迁移即 AIOps 演进机会

<div class="g2">

<div>
  <div style="background:#1e0a0a; border-left:4px solid #ef4444; border-radius:8px; padding:0.9rem 1.1rem; margin-bottom:0.9rem;">
    <div style="color:#f87171; font-weight:bold; font-size:0.88em; margin-bottom:0.5rem;">❌ 传统迁移思维</div>
    <div style="text-align:center; padding:0.7rem; background:#300; border-radius:6px; color:#fca5a5; font-size:0.85em;">完成迁移任务 → <strong style="color:#ef4444;">THE END</strong></div>
  </div>
  <div style="background:#0c2818; border-left:4px solid #22c55e; border-radius:8px; padding:0.9rem 1.1rem;">
    <div style="color:#86efac; font-weight:bold; font-size:0.88em; margin-bottom:0.5rem;">✅ 我们的做法</div>
    <div style="background:#022c14; border-radius:6px; padding:0.7rem 0.9rem; font-size:0.8em; color:#6ee7b7; line-height:2;">
      完成迁移任务<br>
      + AI 辅助迁移（降风险 · 提效率）<br>
      + 接入监控数据 → AIOps 数据基础<br>
      + 积累知识库 → L3 ChatBot 素材
    </div>
    <div style="text-align:center; margin-top:0.6rem; color:#22c55e; font-weight:bold; font-size:0.85em;">迁移完成 + AIOps 基础就绪 ✅</div>
  </div>
</div>

<div>
  <div class="cap"><span style="font-size:1.7em;">🔍</span><div><div class="cap-t">AI 配置对比</div><div class="cap-d">AKS vs ACK Manifest 差异分析，识别不兼容点</div></div></div>
  <div class="cap"><span style="font-size:1.7em;">⚠️</span><div><div class="cap-t">迁移风险评估</div><div class="cap-d">依赖分析 + 迁移顺序建议 + 跨云网络/身份差异</div></div></div>
  <div class="cap"><span style="font-size:1.7em;">✅</span><div><div class="cap-t">迁移验证自动化</div><div class="cap-d">自动化回归检查 · 健康状态比对 · 异常标记</div></div></div>
  <div class="cap" style="background:#0c1f3d; border-color:#3b82f6;"><span style="font-size:1.7em;">📡</span><div><div class="cap-t" style="color:#93c5fd;">监控数据接入（Splunk + Grafana）</div><div class="cap-d" style="color:#60a5fa;">每个迁移服务同步接入 AIOps 数据层，L2/L3 基础同步建立</div></div></div>
</div>

</div>

---

## 🏗️ 业界 AIOps 参考架构

<div style="margin-top:0.4rem;">
  <div class="lyr" style="background:#1c1007; border-left:3px solid #f59e0b;"><span class="lnm" style="color:#fcd34d;">7 · 治理与合规层</span><span class="ldc" style="color:#fcd34d;">审计日志 · 审批工作流 · 安全策略 · 变更管理 · 爆炸半径控制</span></div>
  <div class="lyr"><span class="lnm">6 · 行动执行层</span><span class="ldc">Rollback 触发 · 工单创建 · Teams 通知 · K8s 控制面操作 · Runbook 执行</span></div>
  <div class="lyr" style="background:#0c1f0c; border-left:4px solid #22c55e;">
    <span class="lnm lnm-g">5 · AI Agent 层</span>
    <span class="ldc ldc-g">Triage · RCA 分析 · ChatBot 对话 · Dashboard 可视化 · 操作建议生成</span>
  </div>
  <div class="lyr"><span class="lnm">4 · 分析预处理层</span><span class="ldc">异常检测 · 多信号关联 · 日志聚类降噪 · 发布前后对比 · 影响评估</span></div>
  <div class="lyr"><span class="lnm">3 · 上下文知识层</span><span class="ldc">服务目录 · 依赖拓扑 · Runbook 库 · 历史事件 · 变更记录 · KB</span></div>
  <div class="lyr" style="background:#0c1f3d; border-left:4px solid #3b82f6;">
    <span class="lnm lnm-b">2 · 可观测性数据层</span>
    <span class="ldc ldc-b">Splunk · Grafana · ARMS · Azure Monitor · Prometheus · 告警流</span>
  </div>
  <div class="lyr" style="background:#0c1f0c; border-left:4px solid #22c55e;">
    <span class="lnm lnm-g">1 · 信号采集层</span>
    <span class="ldc ldc-g">AKS / ACK · Jenkins · GitHub Actions · App Logs · 云原生事件 · 变更事件</span>
  </div>
</div>

<div style="margin-top:0.7rem; font-size:0.76em; color:#64748b;">参考来源：Gartner AIOps 框架 · 内部 Wiki Synthesis "AIOps Design for Azure-to-AliCloud Managed Kubernetes"</div>

---

## 🧭 AIOps 治理理念 — 我们与架构方向的差异

<div class="g2">

<div style="background:#1e0a0a; border:2px solid #ef4444; border-radius:10px; padding:1.2rem 1.4rem;">
  <div style="color:#f87171; font-weight:bold; font-size:0.95em; margin-bottom:0.7rem;">❌ 全自动化愿景 — 我们不认同</div>
  <div style="background:#300; border-radius:6px; padding:0.7rem 1rem; font-size:0.83em; color:#fca5a5; text-align:center; letter-spacing:0.05em;">
    AI 发现问题 → AI 自动修复 → AI 自动上线
  </div>
  <div style="border-top:1px solid #450a0a; margin-top:0.9rem; padding-top:0.7rem; font-size:0.8em; color:#94a3b8; line-height:2;">
    ⚠ 绕过企业变更管理流程<br>
    ⚠ 缺乏审计追溯能力<br>
    ⚠ 与行业合规要求冲突<br>
    ⚠ 操作风险难以评估和管控
  </div>
</div>

<div style="background:#0c2818; border:2px solid #22c55e; border-radius:10px; padding:1.2rem 1.4rem;">
  <div style="color:#86efac; font-weight:bold; font-size:0.95em; margin-bottom:0.7rem;">✅ AI 智能治理平台 — 我们的方向</div>
  <div style="background:#022c14; border-radius:6px; padding:0.7rem 1rem; font-size:0.83em; color:#34d399; text-align:center; letter-spacing:0.05em;">
    AI 分析洞察 → 人工审批决策 → 遵循变更流程上线
  </div>
  <div style="border-top:1px solid #14532d; margin-top:0.9rem; padding-top:0.7rem; font-size:0.8em; color:#6ee7b7; line-height:2;">
    ✓ 人工始终掌握最终决策权<br>
    ✓ 完整审计日志与变更追溯<br>
    ✓ 渐进式自治：仅限低风险可逆操作<br>
    ✓ 符合 ITIL 与企业变更管理规范
  </div>
</div>

</div>

<blockquote><strong>核心优势</strong>：AI 治理平台让变更管理更智能，而不是绕过它。每个 AI 建议都有完整证据链，决策权始终在人，合规要求在控制之内。这比"全自动化"更符合金融行业监管标准。</blockquote>

---

## 🚀 三轨并行战略

<div class="g3">

<div style="background:#052e16; border:2px solid #22c55e; border-radius:12px; padding:1.3rem 1.4rem;">
  <div style="text-align:center; margin-bottom:0.8rem;">
    <div style="color:#86efac; font-weight:bold; font-size:1.1em;">🔧 DevOps Drive</div>
    <div style="color:#4ade80; font-size:0.78em; margin-top:0.2rem;">降低团队自身负担</div>
    <div style="display:inline-block; background:#14532d; border:1px solid #22c55e; border-radius:4px; padding:2px 10px; font-size:0.7em; color:#86efac; margin-top:0.5rem;">立即执行</div>
  </div>
  <div style="border-top:1px solid #14532d; padding-top:0.7rem; font-size:0.82em; color:#6ee7b7; line-height:2.1;">
    ✅ Pipeline AI L1 MVP<br>🚧 L2 主动监控<br>🚧 Migration AI<br>🚧 Teams ChatBot<br>🔮 AIOps Dashboard
  </div>
</div>

<div style="background:#1c1407; border:2px solid #f59e0b; border-radius:12px; padding:1.3rem 1.4rem;">
  <div style="text-align:center; margin-bottom:0.8rem;">
    <div style="color:#fbbf24; font-weight:bold; font-size:1.1em;">🤝 Cross-team Drive</div>
    <div style="color:#d97706; font-size:0.78em; margin-top:0.2rem;">赋能所有交付团队</div>
    <div style="display:inline-block; background:#78350f; border:1px solid #f59e0b; border-radius:4px; padding:2px 10px; font-size:0.7em; color:#fbbf24; margin-top:0.5rem;">3-6 个月</div>
  </div>
  <div style="border-top:1px solid #78350f; padding-top:0.7rem; font-size:0.82em; color:#fcd34d; line-height:2.1;">
    🚧 Release Guardrail<br>🚧 Chat-based Release<br>🔮 服务生命周期管理<br>🔮 跨云部署风险评估
  </div>
</div>

<div style="background:#150b2e; border:2px solid #8b5cf6; border-radius:12px; padding:1.3rem 1.4rem;">
  <div style="text-align:center; margin-bottom:0.8rem;">
    <div style="color:#c4b5fd; font-weight:bold; font-size:1.1em;">🏗️ Platform Drive</div>
    <div style="color:#7c3aed; font-size:0.78em; margin-top:0.2rem;">公司级 AIOps 平台</div>
    <div style="display:inline-block; background:#3b0764; border:1px solid #8b5cf6; border-radius:4px; padding:2px 10px; font-size:0.7em; color:#c4b5fd; margin-top:0.5rem;">6-18 个月</div>
  </div>
  <div style="border-top:1px solid #3b0764; padding-top:0.7rem; font-size:0.82em; color:#a78bfa; line-height:2.1;">
    🔮 统一 Agent + KB 平台<br>🔮 FinOps Right-sizing<br>🔮 服务自愈（可逆操作）<br>🔮 SecOps / 容量管理
  </div>
</div>

</div>

---

## 📈 AIOps 成熟度 — 我们在哪里

| 阶段 | 名称 | 核心特征 | 状态 |
|------|------|----------|------|
| Stage 0 | Monitoring | 阈值告警，人工关联 | ✅ 已有 |
| Stage 1 | Observability | Logs / Metrics / Traces 可查 | ✅ 已有 |
| **Stage 2** | **Intelligent Obs** | **AI 辅助理解，结构化诊断报告** | **📍 当前（L1 MVP）** |
| **Stage 3** | **Advisory AIOps** | **AI 给出 RCA + 建议，模式识别** | **🎯 近期目标（L2/L3）** |
| Stage 4 | Operational AIOps | AI 辅助执行，人工审批，审计全程 | ⏳ 中期 |
| Stage 5 | Progressive Autonomy | 低风险可逆操作，窄范围自动化 | 🔮 长期 |

<br>

> **我们的路径**：L1 MVP → Stage 2；L2 接入 Splunk/Grafana + Migration AI 监控接入 → Stage 3；ChatBot + Dashboard 落地后进入成熟的 Advisory AIOps。  
> Stage 4-5 需完善治理框架后才进入，确保变更合规性。

---

## 📅 路线图

| 方向               | **Q2（现在）**          | **Q3**                                                  | **Q4**                     | **2027**                        |
| ---------------- | ------------------- | ------------------------------------------------------- | -------------------------- | ------------------------------- |
| **Pipeline AI**  | ✅ L1 MVP<br>L2 设计启动 | L2 接入 Splunk/Grafana<br>Teams Bot 上线<br>90% Pipeline 覆盖 | L3 ChatBot<br>Teams Bot 深化 | —                               |
| **Migration AI** | 需求分析<br>方案设计        | 配置对比 POC<br>风险评估上线                                      | 迁移验证自动化                    | —                               |
| **Cross-team**   | ChatBot 上线          | Chat Release MVP                                        | 全 Delivery 覆盖              | Platform 整合                     |
| **Platform**     | —                   | Agent 框架设计<br>KB 集成                                     | AIOps Dashboard            | *DevOps/ FinOps / SecOps / ...* |
| **成熟度**          | Intelligent Ops     | → Advisory AIOps                                        | Advisory AIOps             | Operational                     |

---

## 🤝 资源需求

<div class="g2">

<div>
  <div style="color:#7dd3fc; font-size:0.88em; font-weight:bold; margin-bottom:0.6rem;">我们能提供</div>
  <div class="cap" style="background:#052e16; border-color:#22c55e;"><span style="font-size:1.5em;">📦</span><div><div class="cap-t" style="color:#86efac;">已验证 MVP</div><div class="cap-d" style="color:#4ade80;">有结果，不是方案</div></div></div>
  <div class="cap" style="background:#052e16; border-color:#22c55e;"><span style="font-size:1.5em;">🏗️</span><div><div class="cap-t" style="color:#86efac;">完整架构设计</div><div class="cap-d" style="color:#4ade80;">7 层架构，清晰演进路径</div></div></div>
  <div class="cap" style="background:#052e16; border-color:#22c55e;"><span style="font-size:1.5em;">💰</span><div><div class="cap-t" style="color:#86efac;">零新增预算</div><div class="cap-d" style="color:#4ade80;">基于现有 Copilot Enterprise + 内部基础设施</div></div></div>
  <div class="cap" style="background:#052e16; border-color:#22c55e;"><span style="font-size:1.5em;">🔄</span><div><div class="cap-t" style="color:#86efac;">敏捷迭代交付</div><div class="cap-d" style="color:#4ade80;">每个 Sprint 交付可演示成果，快速验证价值</div></div></div>
</div>

<div>
  <div style="color:#7dd3fc; font-size:0.88em; font-weight:bold; margin-bottom:0.6rem;">我们需要</div>

| 需求 | 说明 |
|------|------|
| **项目授权** | AI 专题独立立项，Platform Team 主导 |
| **时间投入** | 团队 ~20% 用于 AI 研究与交付 |
| **Splunk/Grafana 权限** | 扩展查询范围，支持 L2 模式检测 |
| **架构协同** | 与架构团队共同定义治理框架 |
| **推广支持** | 向各 Delivery Team 推广使用 |

<blockquote style="margin-top:0.8rem;">我们的承诺：用实际交付证明能够落地 AIOps 战略，从 Pipeline AI 和 Migration AI 同步启动，通过监控数据接入为整体演进铺路。</blockquote>
</div>

</div>

---

<!-- _class: lead -->
<!-- _backgroundColor: #020617 -->

# 谢谢

## 从我们最熟悉的地方开始，用结果说话

