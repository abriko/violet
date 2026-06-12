# AIOps 立项汇报 — 内容稿（草稿）

> 用途：PPT 制作前的内容细化稿。每章含核心主张、支撑论据、建议口头表达。
> 状态：草稿，待确认后进入 PPT 制作阶段。
> 目标观众：VP-level，有安全背景。
> 目标时长：20–30 分钟。

---

## 章 1 · 现状：救火式运维的代价

**核心主张**
我们的运维方式，和团队规模已经不匹配了。

**数据支撑**
我们在 HK DevOps & Platform 团队做了一次 136 人问卷，结果说明了问题：

| 痛点 | 信号强度 | 真实声音 |
|------|---------|---------|
| 发布/部署摩擦 | **118 条反馈（最高）** | "能否一键完成发布到 UAT？不用多个 pipeline" |
| Jenkins 故障处理 | **83 条反馈，54% 票选最难用工具** | "打包失败的时候手动找日志流程非常繁琐" |
| 文档找不到、找不到人 | 80 条反馈 | "Confluence 有些文档不太好找，不知道该找谁" |
| 资源排队/等待 | 28 条反馈 | "上线时服务器不够，排队时间太长" |
| 手动重复操作 | 18 条反馈 | "每次上线手动停止服务" |
Note: 这个表格应该插图或者其他视觉内容形式展示。

**核心矛盾**
团队规模在增长，HK marketing下有接近400个服务，但手动干预的次数没有减少。
一次 pipeline 故障，工程师要花 15–60 分钟手动翻日志定位原因。
这不是工程师的问题——是系统没有给他们正确的工具。

**建议口头表达**
"这些数字不是在抱怨，是在说明一件事：我们现在的运维方式是被动的、人力密集的。
每一次 pipeline 挂了，都需要一个工程师停下手头的工作去救火。
我们想改变这件事。"

---

## 章 2 · 我们已经做了什么（牵引力前置）

**核心主张**
运维规模已经超过了人力能覆盖的边界。
我们的答案是 AIOps：AI 驱动主动自愈的 DevOps。
这不是提案，是已经跑着的项目，今天来要名分和资源。

**已交付成果**

### Pipeline AI L1 — demo 已上线
- **问题**：pipeline 故障 → 工程师手动翻日志，15–60 分钟/次
- **现在**：故障自动触发 RCA 分析，< 30 秒，结果归档到 Jenkins build description
- **技术路径**：Jenkins Groovy → GitHub Copilot → RCA summary 自动写回

### miniops 1.0 — 已上线（团队内开发/使用）
- **问题**：发布需要手动创建 Jira 卡、选 branch、逐个触发 pipeline
- **现在**：统一界面一键发布，协调多个 pipeline
- **这是什么**：miniops 是我们内部构建的发布编排层，1.0 没有 AI，是纯流程自动化

**我们用这些说明什么**
不是在提案一个概念。我们已经证明了这个方向是可行的，并且有用户在用。
现在需要的，是把它从"团队内部自发在做"变成"公司正式支持的项目"。

**建议口头表达**
"L1 和 miniops 1.0 是我们做出来的低成本验证方案。
它们已经在工作了。今天来这里，不是要大家批准一个想法——
是要大家支持一个已经证明有价值、需要更多资源继续做下去的事情。"

---

## 章 3 · AIOps 战略方向：三条轨道 + North Star

**核心主张**
从"人工被动救火"走向"AI 驱动主动自愈的 DevOps"——分三条轨道推进，有序交付。

**北极星目标**
> 「人工被动救火」→「AI 驱动主动自愈的 DevOps」

**三条战略轨道**

### 轨道 1：Pipeline AI & Release Orchestration（已启动）
覆盖 DevOps 团队最高频的两类工作：故障处理 + 发布管理。

| 能力 | 现状 | 目标 |
|------|------|------|
| 故障诊断 L1 ✅ | 手动找日志，15–60 min | AI 自动 RCA，< 30s |
| 故障诊断 L2 📋 | 重复故障无人汇总 | ≥3 次触发 Teams 告警 + 负责人 @mention |
| 故障诊断 L3 📋 | 复杂问题靠经验 | Bot 综合 KB + 日志，输出证据链诊断 |
| 发布编排 miniops 2.0 📋 | 多步手动，Jira/Git/Jenkins 各点一遍 | 自然语言一句话发布 + 安全前置检查 |

### 轨道 2：Proactive Monitoring → RCA → Auto-Fix（规划中，Q3/Q4）
把故障处理从"发现后处理"变成"预测并自动修复"。

- 异常检测 → 多源信号关联 → AI 生成证据链 RCA → 低风险故障自动修复
- Auto-Fix 范围严格限定：仅非生产环境、仅可逆操作（pod restart / scale）
- 所有生产环境变更：强制 Human-in-the-Loop

### 轨道 3：FinOps Cost Intelligence（规划中，Q3/Q4）
让云成本和系统健康享有同等的可观测性。

- 实时成本异常检测，关联到具体服务 / 团队 / 部署事件
- 每日闲置资源扫描，推送优化建议
- 月度自动起草各团队成本分摊报告
- 把"月底才发现超支"变成"当天就知道谁触发了成本峰值"

**建议口头表达**
"三条轨道不是并行全铺，是有序推进。轨道 1 是基础，轨道 2 和 3 依赖轨道 1 建立的 agent 层。
我们的原则是：先在 DevOps 内部验证，再扩展到交付团队。"

---

## 章 4 · 平台架构与安全治理

**核心主张**
大字：AI 可以建议。只有人可以执行生产变更。
小字/副标题：我们知道 AI 在生产环境里的风险——我们已经把控制机制设计进架构里了。

> 这章专门给有安全背景的观众。核心不是"展示技术"，是"证明我们是负责任的"。

**治理原则（一句话版本）**
1. 每条 AI 决策必须有数据证据，无证据不发布
2. 生产环境强制人工审批门（ITIL 流程）
3. 每个 agent 只有完成任务所需的最小权限

**建议口头表达**
"我们设计这个系统的时候，问自己一个问题：如果 AI 做错了决定，会发生什么？
答案是：在非生产环境，它会自动修复然后告诉你它做了什么。
在生产环境，它会给你一张卡片，等你批准。它永远不会在生产环境自己动手。"

---

## 章 5 · 路线图 + 立项 Ask

**核心主张**
我们有清晰的交付计划，也清楚需要什么才能按时交付。

**分阶段路线图**

| 阶段 | 时间 | 重点交付 |
|------|------|---------|
| Foundation | Q2 2026 | Jenkins Agent 标准化 · Service Catalog MVP · miniops 2.0 MVP |
| First Deliveries | Q3 2026 | Pipeline AI L2 · UC3 FinOps Cost Observability · AIOps Dashboard 初版 · Doc Reorg |
| Deep Capabilities | Q4 2026 | UC2 监控 RCA MVP · Pipeline AI L3 · UC2 Auto-Fix（非生产）· UC3 Daily Agent |
| Platform | 2027+ | Smart Release Scheduling · Autonomous FinOps · Service Catalog v2 |

> Foundation 是关键路径。Jenkins Agent 和 Service Catalog 是所有后续用例的共同依赖。

**我们需要的支持（具体清单）**

### 人力（Q2/Q3 重点）
Q2：3.5 FTE（Service Catalog / miniops 2.0 / Jenkins Agent）
Q3：2.5 FTE（Pipeline AI L2 / AIOps Dashboard / Doc Reorg）
详见附录 A


---

## 章 6 · CTA：两个决定，今天定

**核心主张**
今天的会议有两个具体产出，不是"听听了解一下"。

**决定 1：AIOps 正式立为内部项目**
- 公开支持这个方向（不再是"几个人自己在做"）
- 资源承诺：批准 Q2/Q3 所需的人力 + 权限 + 基础设施
- 指定 sponsor / steering contact（谁对这个项目的进展负责）

**决定 2：确认方向与 Q2/Q3 优先序**
- 三条轨道方向对齐（UC1 → UC2 → UC3 的顺序）
- Q2 Foundation 优先（Jenkins Agent + Service Catalog 是关键路径）
- 如有调整，今天对齐，避免 Q3 再回头重新讨论范围

**我们承诺什么**
- 每季度 milestone review
- 完整的审计链和治理记录
- 每个用例上线前在 DevOps 内部先验证，再推广
- 出了问题：AI 不在生产自主行动，人永远是最后一道门

**建议收尾口头表达**
"我们不是来要求大家相信 AI 能做一切的。
我们是来告诉大家，我们已经知道怎么负责任地推进这件事了。
L1 和 miniops 1.0 是证据，今天这份路线图是计划。
我们需要的，是资源和一个正式的名分。"

---

## 附录：主要风险与缓释

> 建议汇报时不单独讲，作为 Q&A 备用材料。

| # | 风险 | 影响 | 缓释方案 |
|---|------|------|---------|
| R1 | Copilot Studio RAG 黑盒，chunk 策略不可控 | Chatbot 质量不稳定 | 先做文档重整；质量不达标则迁移自建 RAG |
| R2 | 无 CMDB / Service Catalog | L2 @mention 错人；miniops 数据混乱 | Phase 1 优先建 Service Catalog MVP |
| R3 | miniops 2.0 资源紧张（旁路项目） | 交付慢，阻塞 Cross-team Drive | Orchestrator 独立设计，不阻塞 Pipeline AI |
| R8 | LLM 输出差异导致错误修复 | 生产环境误操作 | 证据链强制要求 + 置信度阈值 + 生产强制 HitL |
| R11 | Auto-Fix 误判 RCA（假阳性） | 错误 pod restart 导致故障 | MVP 限定非生产 + 可逆操作 + 修复后验证 |
| R13 | 云账单标签不对齐 | Cost Entity Graph 失效 | UC3 Phase 1 前置标签对齐验证，未通过不启动 Phase 2 |

## 附录：人力成本

| # | 需求 | 关联交付 | 规模 | 时间 |
|---|------|---------|------|------|
| R1 | Service Catalog MVP 初始数据录入 | L2 @mention 准确性 / miniops | 0.5 FTE | Q2 |
| R2 | Full Stack Developer | miniops 2.0 MVP | 2 FTE | Q2 |
| R3 | DevOps 工程师 | Jenkins Agent 标准化 | 1 FTE | Q2 |
| R4 | 文档重整专项负责人 / TL | DevOps Chatbot 质量 | 1 FTE | Q3 |
| R5 | DevOps 工程师 | Pipeline AI L2 | 0.5 FTE | Q3 |
| R6 | Full Stack Developer | AIOps Dashboard 初版 | 1 FTE | Q3 |

合计：Q2 约 3.5 FTE，Q3 约 2.5 FTE