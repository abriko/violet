---
title: "Grafana 给 AI RCA 提了个醒：不要让大模型猜根因，要让它进工作台"
source: "https://mp.weixin.qq.com/s/-l6a70Q6MAbF9-51QT0Y-Q"
author:
  - "[[技术调研]]"
published:
created: 2026-05-13
description:
tags:
  - "clippings"
---
技术调研 *2026年5月12日 16:52*

![Image](https://mmbiz.qpic.cn/mmbiz_png/zLRM1IicjS8iaZ3DZBC3GMX06e8RlYzibNLdIpOn8sfjibXshzb6WJXEUlVc9Hic6kibicrVFptYlJNWic1r3XibibVJxkLicGia69qTHbkj2H65mUM69uQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

最近我系统看了一下 Grafana 在 AI RCA、AI SRE 方向上的产品动作，分享给大家。

Grafana 没有把 AI RCA 做成一个孤立的“智能根因分析按钮”，也没有急着包装一个替代 SRE 的超级 agent。

它的路线更克制，也更工程化：

**把 AI 放进 Grafana 已经存在的可观测性工作台里，让它基于真实的指标、日志、链路、profile、dashboard、实体拓扑、事故时间线和权限体系工作。**

这件事听起来没那么炫。

但我觉得，这恰恰是 AI RCA 真正要走向生产环境时最重要的方向。

因为生产事故里，最危险的不是 AI 不会说话，而是它说得很像回事，但没有证据。

## AI RCA 不能只是聊天框

现在很多 AI RCA 产品的形态很像：

告警来了。 截几张指标图。 拿几段日志。 塞给大模型。 生成一段“疑似根因分析”。

Demo 时通常还不错。

但真实事故里，一线工程师不会因为 AI 说“可能是数据库连接池耗尽”就相信它。他会继续问：

哪个数据库？ 哪个服务打满的？ 什么时候开始的？ 是新发布引起的吗？ 有没有日志证据？ trace 里有没有下游超时？ 影响了哪些用户？ 还有哪些方向已经排除了？

这些问题不是靠一段小作文解决的。

所以我越来越觉得，AI RCA 的核心不是“更会总结”，而是“真的会调查”。

Grafana 的路线就在说明这一点。

它没有让 LLM 凭空猜根因，而是把 AI 接到 Grafana 的现有上下文里：Prometheus、Loki、Tempo、Pyroscope、dashboard、alert、incident、entity graph、RCA workbench、Sift investigation、MCP server。

换句话说，Grafana 想做的不是一个会聊天的 RCA 页面，而是一个带 AI 的可观测性工作台。

## Grafana Assistant 先解决日常问题，再进入事故调查

Grafana Assistant 是它最核心的 AI 入口。

但这个入口一开始不是“帮我自动修复生产事故”，而是很日常的事情：

帮你写 PromQL。 帮你解释 LogQL。 帮你理解一个 dashboard。 帮你找指标。 帮你基于当前 panel 继续追问。 帮你把调查结果整理成 incident update。

这条路线很务实。

RCA 是低频高压场景。如果 AI 只在事故时出现，用户很难建立信任。真正好的产品，应该先在高频、低风险的日常工作里有用。

一个工程师每天都会写查询、看面板、找指标、切日志、看 trace。Assistant 如果能在这些场景里稳定帮上忙，等事故来了，用户才更愿意让它参与调查。

这和很多产品一上来就讲“AI 自动根因分析”不一样。

Grafana 先把 AI 做成 observability copilot，然后再往 incident investigation 里推进。

## Investigations 的重点不是答案，而是调查过程

Grafana Assistant Investigations 目前还是 public preview，但它的产品形态很值得研究。

用户可以给一个事故描述，比如某个服务延迟升高、某个集群异常、某个数据库疑似锁等待。Assistant 会启动 multi-agent investigation，在后台跨 Prometheus、Loki、Tempo、Pyroscope、SQL 等数据源查证据。

最后输出的不是一句“根因是 X”，而是一份结构化报告：

发生了什么。 时间线是什么。 关键发现有哪些。 查了哪些数据。 下一步建议是什么。 哪些查询和证据支撑这个判断。

这里有几个细节我觉得很重要。

第一，Grafana 要求用户在启动 investigation 时提供症状、影响、时间范围、相关服务这些上下文。它没有假装“什么都不用说，AI 自己全知道”。

这很现实。

事故现场的信息经常不完整。AI 如果没有初始范围，就很容易在海量数据里乱查，最后生成一堆看起来有道理但实际没用的内容。

第二，调查报告是可以编辑的 Markdown。

这意味着 AI 输出不是最终判决，而是一个可修改的工作草稿。工程师可以补充、删改、纠正，再把它变成事故更新、复盘材料或后续任务。

第三，它保留 timeline 和 activity log。

这对 RCA 很关键。

很多 AI 产品只给结论，但不告诉你它怎么来的。Grafana 的思路是把 agent 做过的任务、查过的数据、形成的时间线留下来，让人可以复盘和追溯。

AI RCA 里，过程比答案更重要。

因为错误答案不可怕，最可怕的是一个看起来很自信、但无法追溯的答案。

## Sift 说明了另一个重要判断：高频故障不需要全交给 LLM

Grafana 还有一个很有意思的能力叫 Sift。

Sift 不是 Grafana Assistant 的一部分，也不是一个通用 AI agent。它更像一个自动化排障 checklist，会针对基础设施 telemetry 跑一组 curated checks，然后输出“值得注意的结果”。

比如：

错误日志模式是不是突然增加。 有没有 Pod 最近 crash。 是不是 OOMKill。 调查窗口里有没有 deployment rollout。 有没有 noisy neighbor。 有没有 CPU throttling。 有没有资源争用。

这些都很朴素。

但这恰恰是生产环境里最有用的东西。

很多 Kubernetes 故障并不需要一个大模型从零推理。OOMKill、CrashLoopBackOff、CPU throttling、节点高负载、近期发布、错误日志突增，这些都有相对明确的数据源和判断逻辑。

与其让 LLM 自由发挥，不如先把这些高频故障模式做成可解释、可配置、可复用的诊断检查。

LLM 的价值是在这些检查结果之上做组织、解释、关联和下一步建议，而不是替代所有诊断逻辑。

这对国内厂商很有启发。

我们做 AI RCA 时，不应该一上来就追求“全域自动根因”。更现实的做法是先把高频故障做扎实：

Pod 重启。 OOMKill。 CPU 限流。 慢 SQL。 连接池耗尽。 消息队列积压。 下游超时。 发布后错误率上升。 证书过期。 DNS 异常。

每个场景都应该有明确输入、数据源、阈值、证据和建议动作。

这比让大模型读一堆日志后写“可能是资源问题”靠谱得多。

## Grafana 真正的 RCA 底座，是 Knowledge Graph 和 RCA Workbench

Grafana 做 RCA 的另一个关键，是 Knowledge Graph 和 RCA Workbench。

这条线和 Asserts.ai 有直接关系。Grafana 早前收购 Asserts.ai 后，把它的 contextual RCA 能力逐步整合进 Grafana Cloud。

Asserts 的核心不是聊天，而是实体、关系、insights 和时间线。

系统会自动发现服务、Pod、节点、数据库、基础设施组件，建立它们之间的关系，然后持续生成一些 insight：

资源饱和。 错误率异常。 延迟异常。 系统失败。 部署或配置变更。

RCA Workbench 则把这些 entity 和 insight 放到同一个时间线里。

这件事非常重要。

真实事故不是一个点，而是一串传播过程。

某个配置先变了。 某个服务开始错误。 某个下游开始超时。 某个上游重试导致流量放大。 某个节点资源被打满。 更多服务出现连锁反应。

如果你只看最后一个告警，很容易把后果当成根因。

RCA Workbench 的价值，就是让工程师看到事故的先后顺序和依赖关系。

哪个 insight 最早出现？ 它是不是一个发布或配置变更？ 后面哪些服务受到影响？ 有没有共同依赖？ 有没有资源饱和先于错误率上升？ 有没有 Pod 或 Node failure 触发后续连锁反应？

这比“AI 给我一句根因”更接近真实排障。

AI 在这里应该做的是辅助分析 timeline、提示可能的因果链、解释传播路径、给出下一步验证动作。

它不是替代 RCA Workbench，而是让这个工作台更好用。

## Grafana 的克制，比它的 AI 功能更值得看

我觉得 Grafana 最值得研究的地方，不只是它做了哪些 AI 功能，而是它在哪里保持了克制。

Assistant 不是默认开启的。管理员需要按 stack 启用并接受条款。用户不主动使用 Assistant 功能时，数据不会发给 AI provider。

Assistant 不能绕过 Grafana RBAC。用户看不到的数据，AI 也不能看。

自托管 Grafana 虽然可以使用 Assistant app，但 investigations、infrastructure memory、Grafana Cloud MCP 这些依赖云端的能力并不会完整提供。

Sift 也没有被包装成万能 RCA agent。它主要面向 Kubernetes-centered stacks，而且很多能力需要明确的 cluster 和 namespace。

IRM 里的 incident webhook 也不是事故一创建就启动调查，而是等 incident 有足够活动上下文后再触发。因为刚声明事故时，往往只有标题和少量标签，AI 很容易输出空泛内容。

这些边界看起来保守，但非常必要。

AI SRE 最怕的不是能力不够，而是过度承诺。

企业客户真正关心的是：

AI 能看哪些数据？ 有没有权限继承？ 能不能审计？ 会不会把数据发给第三方？ 哪些动作需要人工确认？ 输出错了能不能追溯？ 成本会不会失控？

如果这些问题没有答案，AI RCA 再炫也很难进生产。

## MCP 会改变可观测性平台的入口

Grafana Cloud MCP server 也是一个值得关注的方向。

它让 Cursor、Claude Code、Claude Desktop、Windsurf、Goose、VS Code 这类外部 AI 工具可以连接 Grafana Cloud，查询 dashboards、Prometheus、Loki、Tempo、Pyroscope、alerts、incidents、OnCall、Sift investigations 等数据。

这意味着 Grafana 不再只把自己看成一个 Web 控制台。

它也在把自己变成外部 AI agent 的 observability context provider。

未来工程师可能不会先打开 Grafana 页面。

他可能在 IDE 里问：

这个 PR 影响的服务最近有没有错误率上升？ payment service 最近一次发布后延迟有没有变化？ 当前告警组里哪些可能是同一个根因？ 帮我生成一个 Grafana Explore 链接去看这段日志。 把这次调查结果写进 incident timeline。

这会改变可观测性产品的入口逻辑。

过去用户围着 dashboard 转。 以后 agent 可能围着生产上下文转。

谁能把自己的可观测性数据、查询能力、拓扑、告警、事故流程变成 AI agent 可调用的工具，谁就更可能保住下一代入口。

对国内厂商来说，MCP 不一定是唯一形态，但这个方向要重视。

企微、飞书、钉钉、IDE、CLI、工单系统、CI/CD、AI coding agent，都会成为新的入口。

可观测性平台不能只等用户打开控制台。

## 国内厂商真正应该借鉴什么

如果把 Grafana 的路线压缩成几条启发，我觉得重点不是“也做一个 Grafana Assistant”，而是下面这些产品判断。

第一，AI RCA 要从答案型产品变成调查型产品。

用户需要的不是一句根因，而是一套证据包：时间线、影响面、候选根因、支持证据、反证、近期变更、相似历史事故和下一步动作。

第二，先做可解释的诊断检查，再让 LLM 组织结果。

高频故障模式应该产品化、规则化、可配置。不要把所有事情都交给大模型猜。

第三，必须建设 entity、topology 和 context memory。

AI 要知道哪个服务对应哪些指标，哪个 dashboard 真正有用，哪个 namespace 属于哪个业务，哪些服务互相调用，哪些日志字段和 trace 关联。

这不是 prompt 问题，是上下文工程。

第四，把 AI 调查接入告警和事故流程。

告警组、事件中心、事故页面、飞书群、企微群、钉钉群、工单系统，都应该能自动触发或承接 investigation。AI 的结果也应该回写到这些地方，而不是留在一个孤立页面里。

第五，私有化和安全架构要前置。

国内客户尤其关心数据不出域、本地模型、敏感字段脱敏、只读权限、审计日志、按系统和部门隔离、动作审批和回滚。

这不是企业版高级功能，而是 AI SRE 进生产的门票。

第六，要做外部 agent 的 production context provider。

未来 AI coding agent 会越来越多。如果 coding agent 只能看代码，看不到生产指标、告警、事故和历史问题，它写出的修复建议很容易脱离现场。

可观测性平台应该把生产上下文开放给这些 agent。

第七，建立评估体系。

Grafana 开源 o11y-bench，就是在强调一件事：AI observability agent 不能只看回答是否像样，而要看它实际查了什么、做了什么、是否稳定完成任务。

国内 AI RCA 也需要自己的 benchmark：

根因候选命中率。 证据引用准确率。 查询生成成功率。 幻觉率。 平均调查耗时。 工具调用成功率。 错把后果当根因的比例。 用户采纳率。 人工编辑比例。

没有评估体系，AI RCA 很容易停在 demo 好看、生产不稳的阶段。

## 最后的判断

Grafana 给 AI RCA 提的最大提醒，不是“AI 应该更强”，而是“AI 应该站在正确的位置”。

它不应该站在一个孤立聊天框里，等用户把问题描述清楚，再凭空写一段判断。

它应该站在可观测性工作台里。

旁边有指标、日志、链路、profile。 下面有实体、拓扑、时间线。 前面有告警、事故、值班和工单。 后面有权限、审计、成本和安全边界。 外面还能接 IDE、CLI、MCP、ChatOps 和 AI coding agent。

这才是 AI RCA 走向生产的样子。

AI RCA 不是 prompt engineering。

它是生产系统工程。

它需要数据访问、上下文建模、诊断规则、工具编排、证据链、事故协作、权限审计和组织记忆。

大模型当然重要。

但真正决定产品能不能落地的，往往不是模型回答得多漂亮，而是它有没有站在一个足够扎实的系统上。

Grafana 的路线不一定适合所有公司照搬。尤其在国内，私有化、本地模型、国产中间件、企业微信/飞书/钉钉、CMDB、ITSM、等保合规都会让产品形态发生变化。

但它提供了一个很清晰的方向：

不要让 AI 替你猜生产系统。

让 AI 进入生产系统的工作台，按证据调查，按权限行动，按流程协作。

这比“更会聊天”难得多，也值钱得多。

---

参考资料：Grafana 官方文档、Grafana Assistant / Investigations / Sift / Knowledge Graph / RCA Workbench / MCP / IRM 相关文档，GrafanaCON 2026 发布稿，o11y-bench 官方博客。
