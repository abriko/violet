# AIOps 立项汇报 — 按页大纲拆分

> 用途：把章节稿拆成可直接做 PPT 的页级结构
> 类型：Pitch / Proposal
> 目标观众：VP-level，有安全背景
> 建议总页数：8 页正文 + 2 页附录
> 建议时长：20–30 分钟
> 语言：英文

---

## P1 · 开场痛点页

**页标题**
救火式运维，已经跟不上当前规模

**这一页只回答一个问题**
为什么现在必须做？

**核心信息**
- HK DevOps & Platform 团队 136 人问卷显示，当前运维痛点高度集中
- 发布/部署摩擦 118 条反馈，为最高频痛点
- Jenkins 故障处理 83 条反馈，54% 票选最难用工具
- HK marketing 下已有接近 400 个服务，但手动干预没有下降

**建议版式**
不要放完整表格。
做成 3 个大数字 + 1 句判断：
- 118 条：发布/部署摩擦
- 83 条：Jenkins 故障痛点
- 400 个：服务规模
- 判断句：团队规模在增长，但运维仍然靠人力救火

**建议口播**
这些数字不是在抱怨，而是在说明一件事：
我们的运维方式仍然是被动的、人力密集的，已经不适配现在的服务规模。

---

## P2 · 判断页（结论前置）

**页标题**
运维规模，已经超过了人力能覆盖的边界

**这一页只回答一个问题**
我们的判断是什么？

**核心信息**
- 运维规模已经超过了人力覆盖边界
- 我们的答案是 AIOps：AI 驱动主动自愈的 DevOps
- 今天这场汇报，不是在提一个想法，而是在为一个已经跑起来的方向争取正式立项和资源

**建议版式**
大字主张页。
正文越少越好，最多 3 行。
可用对照式表达：
- 人工被动救火
- AI 驱动主动自愈的 DevOps

**建议口播**
我们的判断很明确：继续靠增加人力，不会从根本上解决问题。
我们需要把运维从人工被动救火，推进到 AI 驱动主动自愈。

---

## P3 · 牵引力证明页

**页标题**
这不是概念：我们已经跑出了第一批结果

**这一页只回答一个问题**
为什么值得相信你们能做成？

**核心信息**
### Pipeline AI L1 — demo 已上线
- 过去：pipeline 故障后，工程师手工翻日志，15–60 分钟/次
- 现在：故障自动触发 RCA 分析，< 30 秒写回 Jenkins build description

### miniops 1.0 — 已上线（团队内开发/使用）
- 过去：发布需要手动创建 Jira 卡、选 branch、逐个触发 pipeline
- 现在：统一界面一键发布，协调多个 pipeline

**建议版式**
Before / After 双卡片：
- L1：15–60 min → < 30 sec
- miniops：多步手工 → 一键发布

**建议口播**
这不是停留在 blueprint 上的概念。
我们已经用低成本方式验证了两个方向：一个提升故障处理效率，一个改善发布流程。

---

## P4 · 战略方向页

**页标题**
AIOps 不是单点工具，而是三条递进式能力轨道

**这一页只回答一个问题**
项目立项后，方向是什么？

**核心信息**
### Phase 1 Focus：UC1
Pipeline AI & Release Orchestration
- L1 已上线
- L2 / L3 / miniops 2.0 是接下来最直接兑现价值的部分

### Next on shared agent layer：UC2 / UC3
- UC2：Proactive Monitoring → RCA → Auto-Fix
- UC3：FinOps Cost Intelligence

**建议版式**
做成 1 个主轨道 + 2 个次轨道：
- 主轨道放大：UC1
- 次轨道缩略：UC2 / UC3
- 底部加一句：UC2 / UC3 建立在共享 agent layer 之上

**建议口播**
我们不是三条线同时重兵推进。
现阶段的重点是 UC1，因为它最接近兑现价值，也为 UC2 和 UC3 提供共享基础。

---

## P5 · ROI 预期页

**页标题**
我们期待带来两类可量化的回报

**这一页只回答一个问题**
投入之后，我们能拿到什么？

**核心信息**

### 1 · 人力提效
- 现状：生产问题完全依赖人工排查
- 数据：月均 xx 个问题，平均解决时间 xx 小时
- 目标：AIOps L1/L2/L3 介入后，MTTR 大幅压缩，同等规模下工程师的精力可以从救火转向建设

### 2 · Cost Saving（FinOps）
- 案例参考：2025 Q1 DB downgrade，一年节省 ~100K USD
  - 这是一次完全人工排查的结果
  - 排查范围仅限 DB，同样逻辑适用于 Redis / Kafka / Deployment Requests 等云资源
- 下一步期望：引入 AI FinOps Agent，系统性扫描 BAU 领域的资源浪费
  - 预期在 BAU 领域可挖掘 **1M+ USD** 的优化空间

**建议版式**
左右两列，各一个主数字 + 一段简短说明：
- 左：MTTR xx h → 目标大幅压缩（数字待填）
- 右：100K → 1M+ USD（FinOps 规模化的跃升）

底部加一句锚点：一次人工排查只能看一个维度；AI 可以同时覆盖所有资源层。

**建议口播**
我们做过一次 DB downgrade，一年省了 10 万美元，但这只是靠人工翻出来的一个点。
Redis、Kafka、deployment requests 还没动过。
如果 AI 能系统性地把这件事做到 BAU 里，1M 不是天花板，是起点。

**数据待确认**
- 月均问题数（xx）
- 平均解决时间（xx h）
以上两个数字在正式制作前需补充真实统计口径，避免会中被追问。

---

## P5 · 治理与安全页

**页标题**
AI 可以建议。只有人可以执行生产变更。

**这一页只回答一个问题**
为什么这件事可以被负责任地推进？

**核心信息**
三条治理原则：
1. 每条 AI 决策必须有数据证据，无证据不发布
2. 生产环境强制人工审批门，遵循 ITIL 流程
3. 每个 agent 只拥有完成任务所需的最小权限

**建议版式**
大字锚点句 + 下方 3 条原则。
~~不要再展开复杂架构图，复杂内容留附录。~~
v1更新，在页面备注详细的架构/安全治理设计在附录中。

**建议口播**
我们对 AI 的态度不是“放手让它做”，而是“让它建议、让人做最后决定”。
尤其在生产环境里，人永远是最后一道门。

---

## P6 · 路线图页

**页标题**
从 Foundation 到 Platform：分阶段交付，而不是一次性铺开

**这一页只回答一个问题**
项目怎么落地？

**核心信息**
- Q2 2026：Foundation
  - Jenkins Agent 标准化
  - Service Catalog MVP
  - miniops 2.0 MVP
- Q3 2026：First Deliveries
  - Pipeline AI L2
  - AIOps Dashboard 初版
  - Doc Reorg
  - UC3 Cost Observability
- Q4 2026：Deep Capabilities
  - UC2 Monitoring RCA MVP
  - Pipeline AI L3
  - UC2 Auto-Fix（非生产）
  - UC3 Daily Agent

**建议版式**
时间轴 / roadmap 形式。
高亮 Q2 Foundation：这是关键路径。

**建议口播**
我们的计划不是一下子把所有愿景都做完。
先打地基，再交付第一批结果，然后逐步进入更深能力。

---

## P7 · Ask 页

**页标题**
为了按计划交付，我们需要两阶段资源支持

**这一页只回答一个问题**
你要什么资源？

**核心信息**
- Q2：3.5 FTE
  - Service Catalog
  - miniops 2.0
  - Jenkins Agent
- Q3：2.5 FTE
  - Pipeline AI L2
  - AIOps Dashboard
  - Doc Reorg
- 详细人力拆分见附录 A

**建议版式**
只放 2 个数字：
- Q2：3.5 FTE
- Q3：2.5 FTE
下方用小字说明资源投向

**建议口播**
我们今天不是来申请一个无限膨胀的平台预算。
我们要的是非常具体、分阶段的资源，用来把已经验证过的方向做成正式项目。

---

## P8 · CTA 页

**页标题**
今天请确认两个决定

**这一页只回答一个问题**
观众离开会议室前，要拍板什么？

**核心信息**
### 决定 1
AIOps 正式立为内部项目
- 不再停留在团队自发推进
- 获得正式 sponsor / steering support

### 决定 2
确认 Q2 / Q3 优先序与资源投入
- Q2 优先：Foundation
- Q3 延展：L2 / Dashboard / Doc Reorg

**建议版式**
两个 checkbox / 两个 decision card。
这是行动页，不是总结页。

**建议口播**
今天我们希望确认两件事：
第一，把 AIOps 正式立起来；
第二，按这个优先顺序投入 Q2 和 Q3 的资源。

---

## Appendix A · 人力成本明细

**用途**
用于回答“3.5 FTE / 2.5 FTE 具体怎么拆”的问题。

**内容**
- R1 Service Catalog MVP 初始数据录入 — 0.5 FTE — Q2
- R2 Full Stack Developer（miniops 2.0 MVP）— 2 FTE — Q2
- R3 DevOps 工程师（Jenkins Agent 标准化）— 1 FTE — Q2
- R4 文档重整专项负责人 / TL — 1 FTE — Q3
- R5 DevOps 工程师（Pipeline AI L2）— 0.5 FTE — Q3
- R6 Full Stack Developer（AIOps Dashboard 初版）— 1 FTE — Q3

---

## Appendix B · 主要风险与缓释

**用途**
用于回答“最大风险是什么，怎么控”的问题。

**建议保留的 4 条风险**
1. Copilot Studio RAG 黑盒 → 先做文档重整，必要时迁移自建 RAG
2. 无 CMDB / Service Catalog → Phase 1 优先建设 MVP
3. LLM 输出差异导致错误修复 → 证据链 + 置信度阈值 + 生产强制 HitL
4. 云账单标签不对齐 → 先做标签校验，再推进 UC3 Phase 2

---

v1更新：
## Appendix C· 架构/安全治理设计

**用途**
slide中描述过于简单，放置不清晰放上详细设计。

**内容**
- 放上架构图
- 放上应用的详细文档：https://manulife-asia.atlassian.net/wiki/spaces/HKDO/pages/1648525895/AIOps+blueprints

---

## 视觉调整项目

v1更新：
- p5，三条原则要用高亮色highlight。
- 减少偏“说明书”的句子，可以放到speaknote中。
- p3，增加一个插图当背景。
- p4，Before: Multi-step manual Now: One coordinated entry point.太长了点换成短小更有冲击的，Dozens of repetitive steps/ One key。还要控制字体大小，现在太大导致换行，和左侧形状不一致。
- html模板左下角要和template.pptx一样印有manulife logo。

v2更新：
下面提到的页码均为当前版本slide实际页码，上次修改带页码的修改均为生效，需要检查。
另外：
- 左下logo调大一点，往下移动一个字的距离。
- “Audience · VP-level, security-aware stakeholders”去掉。
- cover和closing的图片不需要，去掉placeholder，但是保持现在页面元素的位置。
- p6去掉整个“Appendix pointer“框，保留“See Appendix C”。
- “Appendix C”页面顺序错误。

v3更新：
再次重申下面提到的页码均为slide实际页码！
1. p4去掉背景图；miniops 1.0下Before/Now框换行导致和左侧不一致，需要保持一致。
2. p3，增加一个插图当背景。
3. p6，三条原则要用高亮色highlight。
4. governance.png已经放在assets文件夹中。

---
## 备注：进入视觉制作前的清理项

1. 删除正文中的制作注释，比如：
   - “这个表格应该插图展示”
2. 确认“接近 400 个服务”的统计口径，避免会中被追问

