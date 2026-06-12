---
title: "你的 OpenClaw 真的在受控运行吗？"
source: "https://mp.weixin.qq.com/s?__biz=MzUzNzYxNjAzMg==&mid=2247582344&idx=1&sn=7d5c0a6f1d886879a52e8f4fe1c97e6e&scene=21&poc_token=HCIR52mjqDgz21oZO-ts3LydF8b4F-XFq5s70w3d"
author:
  - "[[徐可甲]]"
published:
created: 2026-04-21
description: "本文基于 OpenClaw 与阿里云 SLS，将 Session 审计日志、应用日志与 OTEL 遥测统一汇入，搭建“日志 + 指标 + 链路”可观测体系，实现行为审计、运维观测与安全审计闭环，回答“Agent 是否在受控运行”。"
tags:
  - "clippings"
---
徐可甲 *2026年3月2日 18:30*

> 基于 OpenClaw（https://github.com/openclaw/openclaw）与阿里云日志服务（SLS），将日志与 OpenTelemetry 遥测汇入 SLS，搭建 AI Agent 可观测体系，实现行为审计、运维观测、实时告警与安全审计闭环。

---

**01**

***为什么必须回答：***

*****“Agent 真的在受控运行吗？”*****

*Cloud Native*

“受控”至少包含四件事：谁在触发调用、花了多少钱、做了哪些操作（尤其是高危工具）、行为是否可追溯、可审计。回答不了这些问题，就不能说 Agent 在受控运行。

本文围绕“如何用阿里云 SLS 回答上述问题”展开：Session 日志回答“做了什么、花了多少”；应用日志回答“系统哪里异常”；OTEL 指标与链路回答“当前状态与耗时”。多条数据 Pipeline 协同，才能对“Agent 真的在受控运行吗？”给出有据可查的答案。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/bvDbzNRia8j1dqzGkaC7e4yz5jkNsPHyAGvQtVFX7IcwtYM49GjzzuVN8ibpjRRYCz5FDnc4ibhC3PTexpVTUwI8Kknr4lD8GFvMdnIYIGx5RY/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

▍ **1.1 AI Agent 的安全风险面**

AI Agent 与传统后端服务有一个本质差异：Agent 的行为是非确定的。同样的用户输入，模型可能产生完全不同的工具调用序列。这意味着你无法像审计 REST API 那样，通过代码审查预判所有行为路径。

若不做可观测，你无法回答“谁在调你的模型、花了多少钱、有没有被注入恶意指令”——也就无法声称 Agent 在受控运行。具体的风险面包括：

| 风险类别 | 典型场景 | 后果 |
| --- | --- | --- |
| Skills/工具滥用 | Agent 被诱导执行 `exec` 运行恶意命令 | 系统入侵 |
| 数据外泄 | Agent 通过工具读取敏感文件后输出到对话 | 隐私泄露 |
| 成本失控 | Agent 陷入循环，持续消耗 Token | 账单暴涨 |
| Prompt 注入 | 用户在消息中嵌入指令覆盖 System Prompt | 行为失控 |
| 会话劫持 | 通过多轮对话逐步引导 Agent 偏离预期行为 | 授权绕过 |

这些风险单靠代码里的运行时防护（如 OpenClaw 内置的工具策略、循环检测器）是不够的。运行时防护是“城墙”，可观测是“哨岗”——只有持续观测 Agent 在做什么、谁在调用、花了多少，才能发现城墙没挡住的东西。

▍ **1.2 可观测三支柱：不同的数据回答不同的问题**

传统的可观测性建立在 Logs + Metrics + Traces 三支柱之上。对 AI Agent 而言，这三者各自承担了不同的观测职能。理解它们各自能回答什么问题，是后续搭建整套体系的基础：

| 支柱 | OpenClaw 对应数据源 | 能回答的核心问题 |
| --- | --- | --- |
| Logs（Session 日志） | `~/.openclaw/agents/<id>/sessions/*.jsonl` | Agent 做了什么？调了哪些工具？传了什么参数？花了多少钱？ |
| Logs（应用日志） | `/tmp/openclaw/openclaw-YYYY-MM-DD.log` | 系统哪里出了问题？Webhook 失败了？消息队列堵了？ |
| Metrics | `diagnostics-otel` 插件 OTLP 输出 | 现在花了多少钱？延迟正常吗？有没有会话卡死？ |
| Traces | `diagnostics-otel` 插件 OTLP 输出 | 一条消息从接收到响应经历了什么？链路如何串起来？ |

▍ **1.3 为什么选阿里云 SLS**

阿里云日志服务（Simple Log Service, SLS）天然适合这个场景：

- OTLP 友好接入：LoongCollector 原生支持 OTLP 协议，与 OpenClaw 的 diagnostics-otel 插件无缝对接，开箱即用；
- 算子丰富、查询灵活：内置多种加工与分析算子，对 Session 日志里的 JSON 嵌套字段（如 message.content、message.usage.cost）做解析、过滤、聚合很方便，写几条 SPL 就能做工具调用统计、成本归因、敏感模式匹配；
- 安全与合规能力：支持日志访问审计、RAM 权限管控、敏感数据脱敏与加密存储，满足审计留痕与合规要求；告警可对接钉钉、短信、邮件，便于安全事件及时响应；
- 日志分析一站式：“采集 → 索引 → 查询 → 仪表盘 → 告警”一条龙，小规模 Agent 日志量不大、按量计费成本低，流量上来也能自动弹性。

---

**02**

***全景架构***

*Cloud Native*

▍ **2.1 数据 Pipeline**

▍ **2.2 数据源对照表**

| 维度 | Session 审计日志 | 应用日志 | Metric | Trace |
| --- | --- | --- | --- | --- |
| 路径 | `~/.openclaw/agents/<id>/sessions/*.jsonl` | `/tmp/openclaw/openclaw-YYYY-MM-DD.log` | SLS Metric Store（OTLP 直推） | SLS Trace Store（OTLP 直推） |
| 格式 | JSONL（每行一条会话条目） | JSONL（每行一条结构化日志） | 指标（Counter/Histogram 等） | Span（调用链） |
| 采集方式 | LoongCollector 文件采集 | LoongCollector 文件采集 | LoongCollector OTLP 转发 | LoongCollector OTLP 转发 |
| 分析价值 | 行为审计：还原 Agent 完整行为链 | 运维观测：系统健康度与错误排查 | 实时监控：指标大盘、趋势、告警 | 链路追踪：消息/模型调用链路与耗时 |
| 数据量 | 高（与对话频率成正比） | 中（与请求量成正比） | 低（聚合指标） | 低（采样 Span） |

接下来，我们按数据源依次展开：接数据 → 看场景。

---

**03**

***行为审计：Session 日志***

*Cloud Native*

Session 日志是 AI Agent 安全审计的核心数据源。它记录了每一轮对话、每一次工具调用、每一笔 Token 消耗——完整还原“Agent 到底做了什么”。

▍ **3.1 数据格式**

每个会话对应一个.jsonl 文件，每行是一个 JSON 对象，通过 type 字段区分条目类型。以下是一次典型的对话中产生的日志序列（以用户请求读取系统文件为例）：

用户消息

```json
{  "type": "message",  "id": "70f4d0c5",  "parentId": "b5690259",  "message": {    "role": "user",    "content": [{ "type": "text", "text": "帮我读取 /etc/passwd 文件" }]  }}
```

Assistant 回复（含工具调用）

```css
{  "type": "message",  "id": "3878c644",  "parentId": "70f4d0c5",  "message": {    "role": "assistant",    "content": [    {       "type": "toolCall", "id": "call_d46c7e2b...", "name": "read",       "arguments": { "path": "/etc/passwd" }     }],    "provider": "anthropic",    "model": "claude-4-sonnet",    "usage": { "totalTokens": 2350 },    "stopReason": "toolUse"  }}
```

工具执行结果

```swift
{  "type": "message",  "id": "81fd9eca",  "parentId": "3878c644",  "message": {    "role": "toolResult",    "toolCallId": "call_d46c7e2b...",    "toolName": "read",    "content": [{ "type": "text", "text": "root:x:0:0:root:/root:/bin/bash\n..." }],    "isError": false  }}
```

Assistant 最终回复（stopReason 为 stop）

```swift
{  "type": "message",  "id": "a025ab9e",  "parentId": "81fd9eca",  "message": {    "role": "assistant",    "content": [{ "type": "text", "text": "文件 \`/etc/passwd\` 的内容如下（节选）：\n\nroot:x:0:0:..." }],    "usage": { "totalTokens": 12741, "cost": { "total": 0.0401 } },    "stopReason": "stop"  }}
```

从审计视角看，上面这段示例（一轮 user → assistant toolCall → toolResult → assistant stop）已经能回答几个关键问题：谁（user）让 Agent 做了什么（read 工具读 /etc/passwd），Agent 用了哪个模型（claude-4-sonnet），花了多少钱（$0.0401），结果是什么（成功读取了 /etc/passwd 内容）。

▍ **3.2 接入 SLS**

LoongCollector 采集配置

SLS 索引配置

在 SLS 控制台为 session-audit Logstore 配置以下字段索引：

| 字段路径 | 类型 | 安全审计用途 |
| --- | --- | --- |
| `type` | text | 区分 session / message / compaction，过滤出可审计的对话与压缩摘要 |
| `message.role` | text | 区分 user / assistant / toolResult，定位谁说了什么、谁调了工具、工具返回内容 |
| `message.content` | text（分词） | 用户输入与工具参数/返回的全文，支撑注入检测与敏感数据匹配 |
| `message.provider` 、 `message.model` | text | 模型标识，成本与行为归因、按模型统计 |
| `message.usage.totalTokens` 、 `message.usage.cost.total` | long / double | 用量与成本，异常消耗与会话成本排序 |
| `message.stopReason` | text | 取值： `stop` =正常结束， `toolUse` =因要执行工具调用而暂停，下一条通常是 toolResult， `error` / `aborted` / `timeout` =异常结束；筛出 toolUse 配合工具调用审计 |
| `message.toolName` 、 `message.content` 、 `message.isError` | text / bool | toolResult 专用：工具名、返回内容（敏感检测）、是否错误 |
| `id` 、 `parentId` | text | 条目与父 ID，构建对话树、按会话还原顺序；session 条的 `id` 即 sessionId，按会话聚合 |
| `timestamp` | text | 时间窗口与排序、告警时间范围 |

▍ **3.3 审计场景：敏感数据外泄检测**

Agent 通过工具读取文件、执行命令后，返回内容会记录在 toolResult 条目中。如果返回内容中包含 API Key、AK、私钥、密码等敏感数据，意味着这些数据已经进入了 Agent 的上下文——可能被模型“记住”并在后续对话中泄露。

```sql
type: message and message.role : toolResult   | extend content = cast(json_extract(message, '$.content')  as array<json>)   | project content | unnest   | extend content_type = json_extract_scalar(content, '$.type'), content_text = json_extract_scalar(content, '$.text')   | where content_type = 'text' | project content_text   | where content_text like '%BEGIN RSA PRIVATE KEY%' or content_text like '%password%' or content_text like '%ACCESS_KEY%' or regexp_like(content_text, 'LTAI[a-zA-Z0-9]{12,20}')
```

▍ **3.4 审计场景：Skills 调用审计**

技能文件（如 SKILL.md）被 read 工具读取时，会在 Assistant 消息的 content 中以 type: "toolCall"、name: "read"、arguments.path 记录。可按路径统计哪些技能被调用、调用次数及最近调用时间，用于合规与使用分析。

```sql
type: message and message.role : assistant and message.stopReason : toolUse  | extend content = cast(json_extract(message, '$.content')  as array<json>)   | project content, timestamp | unnest   | extend content_type = json_extract_scalar(content, '$.type'), content_name = json_extract_scalar(content, '$.name'), skill_path = json_extract_scalar(content, '$.arguments.path')   | project-away content   | where content_type = 'toolCall' and content_name = 'read' and skill_path like '%SKILL.md'   | stats cnt = count(*), latest_time = max(timestamp) by skill_path | sort cnt desc
```

▍ **3.5 审计场景：高危工具调用监控**

OpenClaw 的工具权限体系（Tool Policy Pipeline + Owner-only 封装）已经在运行时做了管控，但可观测层应该独立于运行时防护进行监控——万一策略配置有误，可观测层是最后的发现机会。高危工具的定义按使用场景分为两类。

场景一：Gateway HTTP 默认禁止的工具

通过网关 POST /tools/invoke 调用时，以下工具默认拒绝，因为它们在非交互的 HTTP 面上风险过高或无法正常完成：

| 工具名 | 禁止原因 |
| --- | --- |
| `sessions_spawn` | 会话编排：远程拉起 Agent 等价于远程执行（RCE） |
| `sessions_send` | 跨会话注入：向其他会话发送消息，可被滥用做横向移动 |
| `cron` | 持久化自动化控制面：可创建/修改/删除定时任务，不适合 HTTP 开放 |
| `gateway` | 网关控制面：防止通过 HTTP 重配置网关 |
| `whatsapp_login` | 交互式流程：需终端扫码等，在 HTTP 上会挂起无响应 |

场景二：ACP 必须显式审批的工具

ACP（Automation Control Plane）是自动化入口，以下工具不允许静默通过，必须用户显式批准后再执行：

| 工具名 | 说明 |
| --- | --- |
| `exec` 、 `spawn` 、 `shell` | 执行命令 / 衍生进程，直接影响主机与安全边界 |
| `sessions_spawn` 、 `sessions_send` | 同上，会话编排与跨会话消息 |
| `gateway` | 网关配置变更 |
| `fs_write` 、 `fs_delete` 、 `fs_move` | 写文件、删文件、移动文件（日志中可能以 `write` / `edit` 等名称出现） |
| `apply_patch` | 应用补丁修改文件 |

在 Session 日志中监控上述工具（及其在日志中的等价名称）的调用，可发现异常或越权行为；若某工具在 Gateway HTTP 场景下仍被调用成功，则可能存在配置绕过，需排查。

```css
type: message and message.role : assistant and message.stopReason : toolUse  | extend content = cast(json_extract(message, '$.content')  as array<json>)   | project content, timestamp | unnest | extend content_type = json_extract_scalar(content, '$.type'), content_name = json_extract_scalar(content, '$.name'), content_arguments = json_extract(content, '$.arguments')   | project-away content   | where content_type = 'toolCall' and content_name in ('exec', 'write', 'edit', 'gateway', 'whatsapp_login', 'cron', 'sessions_spawn', 'sessions_send', 'spawn', 'shell', 'apply_patch')
```

▍ **3.6 审计场景：成本归因**

每条 Assistant 消息都携带 usage（含 totalTokens、input、output、cacheRead、cacheWrite）以及 provider、model。按 provider、model 汇总 totalTokens 可回答“用量花在哪了”；若上游提供 usage.cost.total，也可用同样方式按 provider、model 汇总做成本归因。

```sql
type: message and message.role : assistant   | stats totalTokens= sum(cast("message.usage.totalTokens" as BIGINT)), inputTokens= sum(cast("message.usage.input" as BIGINT)), outputTokens= sum(cast("message.usage.output" as BIGINT)), cacheReadTokens= sum(cast("message.usage.cacheRead" as BIGINT)), cacheWriteTokens= sum(cast("message.usage.cacheWrite" as BIGINT)) by "message.provider", "message.model"
```

**04**

***运维观测：应用日志***

*Cloud Native*

应用日志的角色不同于 Session 日志。Session 日志记录的是 Agent 做了什么（面向审计），应用日志记录的是系统运行状态（面向运维）——Gateway 是否正常启动？Webhook 有没有报错？消息队列是否堆积？

▍ **4.1 数据格式**

OpenClaw Gateway 使用 tslog 库写结构化 JSONL 日志：

```swift
{  "0": "{\"subsystem\":\"gateway/channels/telegram\"}",  "1": "webhook processed chatId=123456 duration=2340ms",  "_meta": {    "logLevelName": "INFO",    "date": "2026-02-27T10:00:05.123Z",    "name": "openclaw",    "path": {      "filePath": "src/telegram/webhook.ts",      "fileLine": "142"    }  },  "time": "2026-02-27T10:00:05.123Z"}
```

关键字段：

- \_meta.logLevelName：日志级别（TRACE / DEBUG / INFO / WARN / ERROR / FATAL）；
- \_meta.path：源码文件路径和行号，用于精确定位；
- 数字键 "0"：JSON 格式的 bindings，通常含 subsystem（如 gateway/channels/telegram）；
- 数字键 "1" 及后续：日志消息文本。

日志文件按天滚动（openclaw-YYYY-MM-DD.log），24 小时自动清理，单文件上限 500 MB。

▍ **4.2 接入 SLS**

索引建议对 \_meta.logLevelName、\_meta.date、\_meta.path.filePath、"0"（subsystem bindings）、"1"（消息文本）建立字段索引。

▍ **4.3 按子系统的错误大盘**

应用日志以异常级别（WARN、ERROR、FATAL）和子系统为维度做聚合，可方便看出哪类异常集中在哪个组件。

```java
_meta.logLevelName: ERROR or _meta.logLevelName: WARN or _meta.logLevelName: FATAL  | project subsystem = "0.subsystem", loglevel = "_meta.logLevelName"   | stats cnt = count(1) by loglevel, subsystem   | sort loglevel
```

▍ **4.4 典型安全审计场景与日志样例**

场景一：WebSocket 未授权连接（unauthorized）

安全审计价值：WebSocket 连接在鉴权阶段被拒绝时会打 WARN，便于发现 token 错误、过期或伪造导致的未授权访问。审计时关注：subsystem: gateway/ws 表示来自 WS 层；消息正文中 conn= 为连接 ID，remote= 为客户端 IP，client= 为客户端标识（如 openclaw-control-ui、webchat），reason=token\_mismatch 表示 token 不匹配（过期、错误或伪造）。同一 remote 在短时间大量 unauthorized 且 reason 为 token\_mismatch，可能为撞库或盗用尝试；若 client 为已知合法客户端而仍频繁失败，则多为配置或 token 轮换问题，需从运维侧排查。

```swift
{  "0": "{\"subsystem\":\"gateway/ws\"}",  "1": "unauthorized conn=e32bf86b-c365-4669-a496-5a0be1b91694 remote=127.0.0.1 client=openclaw-control-ui webchat vdev reason=token_mismatch",  "_meta": { "logLevelName": "WARN", "date": "2026-02-27T07:46:20.727Z" },  "time": "2026-02-27T07:46:20.728Z"}
```

场景二：HTTP 工具调用被拒或执行失败

安全审计价值：POST /tools/invoke 的失败/告警日志可发现谁在尝试执行被禁止的高危工具、或执行时触发的权限/沙箱异常。审计时关注：subsystem: tools-invoke 可快速筛出此类事件；消息正文中的异常类型（如 EACCES、ENOENT、路径）可区分“越权访问敏感路径”与“配置/路径错误”。例如下例中 "open '/etc/shadow'" 明确指向尝试读敏感文件，需结合 Session 日志定位调用方。

```swift
{  "0": "{\"subsystem\":\"tools-invoke\"}",  "1": "tool execution failed: Error: EACCES: permission denied, open '/etc/shadow'",  "_meta": { "logLevelName": "WARN", "date": "2026-02-27T10:00:07.000Z" },  "time": "2026-02-27T10:00:07.000Z"}
```

场景三：连接/请求处理失败

安全审计价值：连接重置、解析错误等可暴露异常客户端行为、畸形请求或中间人干扰。审计时关注：subsystem: gateway 表示来自网关核心（WS/请求处理）；消息正文区分两类——“request handler failed: Connection reset by peer”多为对端断开或网络中断，可按时间 /conn 看是否集中爆发（疑似扫描或 DoS）；“parse/handle error: Invalid JSON”表示请求体非法，可能是恶意构造的畸形包或兼容性问题，同一来源短时间大量出现时应优先排查攻击或异常客户端。

```swift
{  "0": "{\"subsystem\":\"gateway\"}",  "1": "request handler failed: Connection reset by peer",  "_meta": { "logLevelName": "ERROR", "date": "2026-02-27T10:00:08.000Z" },  "time": "2026-02-27T10:00:08.000Z"}
```

```swift
{  "0": "{\"subsystem\":\"gateway\"}",  "1": "parse/handle error: Invalid JSON",  "_meta": { "logLevelName": "ERROR", "date": "2026-02-27T10:00:08.100Z" },  "time": "2026-02-27T10:00:08.100Z"}
```

场景四：安全审计类（设备访问升级等）

安全审计价值：设备配对与权限升级会留下“谁、从何角色/权限、升级到何角色/权限、来自哪 IP、何种认证方式”的审计迹。审计时重点看消息正文中的结构化字段：reason=role-upgrade 表示因角色提升触发；device= 为设备 ID；ip= 为客户端 IP，可用于与已知管理 IP 比对；roleFrom=\[\] roleTo=owner  表示从无角色升为 owner，属高敏感操作；auth=token 表示本次认证方式。同一 IP 或同一 device 在非工作时间频繁升级、或 roleTo 为 owner 的条目异常增多，应优先排查是否越权或账号盗用。

```swift
{  "0": "{\"subsystem\":\"gateway\"}",  "1": "security audit: device access upgrade requested reason=role-upgrade device=abc-123 ip=192.168.1.1 auth=token roleFrom=[ ] roleTo=owner scopesFrom=[ ] scopesTo=[...] client=control conn=conn-1",  "_meta": { "logLevelName": "WARN", "date": "2026-02-27T10:00:09.000Z" },  "time": "2026-02-27T10:00:09.000Z"}
```

场景五：FATAL 与核心异常

安全审计价值：FATAL 表示核心功能不可用，可能由配置被篡改、依赖失效或严重运行时错误导致，需立即排查是否与入侵或误配置相关。审计时：在错误大盘中筛选 \_meta.logLevelName = 'FATAL'，结合 subsystem 与 "1" 的消息正文定位到具体组件与错误原因；若 FATAL 伴随“bind”、“config”、“listen”等关键词，需优先排查暴露面与配置一致性。建议配置实时告警（如每分钟、cnt > 0 推送钉钉/短信），确保第一时间响应。

---

**05**

***实时监控与告警：OTEL 遥测***

*Cloud Native*

Session 日志和应用日志以事件与审计迹为主，适合按条件检索与事后归因。从可观测体系看，若要掌握聚合指标、趋势与请求链路（如成本/用量趋势、会话健康度、单次请求的耗时与依赖），需要借助 OTEL 的 Metrics（计数器、直方图、仪表盘）与 Traces（分布式链路、延迟与调用关系），与日志一起构成“日志 + 指标 + 链路”的完整可观测能力。

▍ **5.1 接入 SLS**

OpenClaw 内置了 diagnostics-otel 插件（v26.2.19 以上版本），支持通过 OTLP/HTTP (Protobuf) 协议导出 Metrics、Traces 和 Logs。

启用插件

执行命令 ` openclaw plugins enable diagnostics-otel ` 启动插件，通过 openclaw plugins list 命令查看插件状态，预期状态为 loaded。

配置 ~/.openclaw/openclaw.json

```json
{  "plugins": {    "allow": ["diagnostics-otel"],    "entries": {      "diagnostics-otel": { "enabled": true }    }  },  "diagnostics": {    "enabled": true,    "otel": {      "enabled": true,      "endpoint": "https://127.0.0.1:4318",      "protocol": "http/protobuf",      "serviceName": "openclaw-gateway",      "traces": true,      "metrics": true,      "logs": true,      "sampleRate": 1,      "flushIntervalMs": 60000    }  }}
```

创建采集配置

在 SLS 控制台创建 logstore: otlp-logs、otlp-traces；metricstore: otlp-metrics，及相应的采集配置。

```json
{    "aggregators": [        {            "detail": {},            "type": "aggregator_opentelemetry"        }    ],    "inputs": [        {            "detail": {                "Protocals": {                    "HTTP": {                        "Endpoint": "127.0.0.1:4318",                        "ReadTimeoutSec": 10,                        "ShutdownTimeoutSec": 5,                        "MaxRecvMsgSizeMiB": 64                    },                    "GRPC": {                        "MaxConcurrentStreams": 100,                        "Endpoint": "127.0.0.1:4317",                        "ReadBufferSize": 1024,                        "MaxRecvMsgSizeMiB": 64,                        "WriteBufferSize": 1024                    }                }            },            "type": "service_otlp"        }    ]}
```

▍ **5.2 导出了什么数据**

为回答“用量与成本”、“入口稳定性”、“队列与会话健康”等观测需求，OpenClaw 通过 OTEL 导出 Metrics 与 Traces。以下按需求分类给出整体说明与详情表（指标名、类型、作用）。

成本与用量指标

与 LLM 调用成本直接相关，是费用管控的核心。通过监控 token 消耗、估算费用、运行耗时和上下文占用，可掌握每次模型调用的成本，发现配置不当或使用低效导致的浪费。

| 指标名 | 类型 | 作用 |
| --- | --- | --- |
| `openclaw.tokens` | Counter | 模型处理时消耗的 token 数量，区分输入/输出 |
| `openclaw.cost.usd` | Counter | 按 token 用量估算的费用（美元），实时掌握开支 |
| `openclaw.run.duration_ms` | Histogram | 单次任务从开始到结束的耗时，反映整体响应速度 |
| `openclaw.context.tokens` | Histogram | 当前对话或任务占用的上下文 token 数量 |

openclaw.cost.usd 仅在上游 model.usage 事件提供 costUsd 时才会产生数据。

Webhook 处理指标

Webhook 是 OpenClaw 与外部系统交互的重要入口。监控收到的请求量、错误次数和处理耗时，可及时发现外部调用异常，保障对接稳定。

| 指标名 | 类型 | 作用 |
| --- | --- | --- |
| `openclaw.webhook.received` | Counter | 收到的 Webhook 请求总量，反映请求压力 |
| `openclaw.webhook.error` | Counter | 处理 Webhook 时出错的次数 |
| `openclaw.webhook.duration_ms` | Histogram | 处理单次 Webhook 请求的耗时（毫秒） |

消息队列指标

消息队列是任务处理的中转站。关注入队/出队数量、队列深度和等待时间，可判断系统是否拥堵、任务是否积压，便于调整资源或排查瓶颈。

| 指标名 | 类型 | 作用 |
| --- | --- | --- |
| `openclaw.message.queued` | Counter | 进入待处理队列的消息总量，反映请求压力 |
| `openclaw.message.processed` | Counter | 消息处理完成次数，按成功/失败等结果分类 |
| `openclaw.message.duration_ms` | Histogram | 处理单条消息的耗时（毫秒） |
| `openclaw.queue.depth` | Histogram | 入队或出队时队列中堆积的消息数量 |
| `openclaw.queue.wait_ms` | Histogram | 消息执行前的队列等待时间 |
| `openclaw.queue.lane.enqueue` | Counter | 命令队列通道入队次数 |
| `openclaw.queue.lane.dequeue` | Counter | 命令队列通道出队次数 |

会话管理指标

会话状态变化与卡住会话数量反映交互健康度。监控卡住、重试等指标可快速发现陷入死循环或异常状态的对话，提升可观测与排障效率。

| 指标名 | 类型 | 作用 |
| --- | --- | --- |
| `openclaw.session.state` | Counter | 会话状态转换 |
| `openclaw.session.stuck` | Counter | 处理过程中卡住、无进展的会话数量 |
| `openclaw.session.stuck_age_ms` | Histogram | 卡住会话已持续的时间（毫秒） |
| `openclaw.run.attempt` | Counter | 任务执行重试次数，帮助发现不稳定环节 |

Trace Span

| 指标名 | 类型 | 作用 |
| --- | --- | --- |
| `openclaw.model.usage` | Span | 每次模型调用，含 provider/model/sessionKey/tokens |
| `openclaw.webhook.processed` | Span | Webhook 处理完成，含 channel/chatId |
| `openclaw.message.processed` | Span | 消息处理完成，含 channel/outcome/sessionKey |
| `openclaw.session.stuck` | Span | 检测到卡死会话，含 state/ageMs/queueDepth |

▍ **5.3 数据价值分析**

场景：用量与成本分布

回答：用量与钱主要花在哪些模型、哪些 Provider？近期 Token 消耗趋势是否正常、有无突然飙升？按模型或 Provider 的累计用量如何排名？Token 增速异常时，可结合 Session 日志做进一步分析。

```bash
# Token 消耗增速（可设告警：如超过 N tokens/min）sum(rate(openclaw_tokens[10m]))# Token 消耗趋势（按模型）sum(rate(openclaw_tokens[5m])) by (openclaw_model)# 累计 Token（按 Provider）sum(openclaw_tokens) by (openclaw_provider)
```

场景：会话卡死与执行过长

回答：当前是否存在卡死、无进展的会话？卡死发生的频率与时段如何？单次 Agent 执行耗时（P95/P99）是否超过预期、是否有长尾？

```apache
# 卡死会话（告警：> 0）sum(rate(openclaw_session_stuck[5m]))# 执行耗时 P95（告警：如 > 5 分钟）histogram_quantile(0.95, sum(rate(openclaw_run_duration_ms_bucket[5m])) by (le))
```

场景：Webhook 错误率与处理延迟

回答：各通道 Webhook 的请求量与错误次数如何、错误率是否在可接受范围？单次 Webhook 处理耗时与 Agent 执行耗时的分位数（P95/P99）是否恶化？按通道或按模型的延迟分布有何差异？错误率或延迟异常时，可结合应用日志按 Webhook 子系统查具体错误。

```apache
# Webhook 错误率（告警：如 > 5%）sum(rate(openclaw_webhook_error[5m])) / sum(rate(openclaw_webhook_received[5m]))# 执行耗时 P99（按模型）histogram_quantile(0.99, sum(rate(openclaw_run_duration_ms_bucket[5m])) by (le, openclaw_model))# Webhook 处理耗时 P95（按通道）histogram_quantile(0.95, sum(rate(openclaw_webhook_duration_ms_bucket[5m])) by (le, openclaw_channel))
```

场景：队列积压与等待时间

回答：各队列通道（lane）的深度与入队/出队速率是否健康？任务在队列中的等待时间（P95/P99）是否拉长、是否存在积压趋势？哪些 lane 最容易出现拥堵？便于在用户体感变差前发现瓶颈并调整资源。

```apache
# 队列深度（按 lane）histogram_quantile(0.95, sum(rate(openclaw_queue_depth_bucket[5m])) by (le, openclaw_lane))# 队列等待时间 P95（按 lane）histogram_quantile(0.95, sum(rate(openclaw_queue_wait_ms_bucket[5m])) by (le, openclaw_lane))
```

**06**

***多源联动：复合排查流程***

*Cloud Native*

前面分别展示了每条数据 Pipeline 的独立价值。但真正体现“让 Agent 受控运行”的，是多种可观测数据 Pipeline 协同工作的能力。

这个流程的关键在于每条数据 Pipeline 回答不同层次的问题，缺一不可：

- 只有 OTEL 没有 Session 日志：知道成本在飙升，但不知道是谁、干了什么；
- 只有 Session 日志没有 OTEL：能审计行为但无法从整体感知状态；
- 只有应用日志：能看到系统错误但不知道 Agent 的业务行为。

---

**07**

***总结***

*Cloud Native*

回答“你的 OpenClaw 真的在受控运行吗？”需要同时回答四件事：谁在触发调用、花了多少钱、做了哪些操作（尤其是高危工具）、行为是否可追溯、可审计。单靠运行时防护（工具策略、循环检测等）不足以声称受控；必须建立持续可观测体系，用数据回答上述问题。

本文基于阿里云 SLS，将 OpenClaw 的三类可观测数据——Session 审计日志、应用日志、OTEL 指标与链路——统一汇入 SLS，形成“日志 + 指标 + 链路”的完整能力：Session 日志回答“Agent 做了什么、花了多少”；应用日志回答“系统哪里异常”；OTEL 回答“当前状态与耗时”。通过 LoongCollector 文件采集与 OTLP 直推，实现采集、索引、查询、仪表盘与告警的一站式闭环，并利用 SLS 的审计、权限与脱敏能力满足合规要求。

实践中，三条数据 Pipeline 应协同使用：由 OTEL 告警发现异常，用应用日志缩小范围、定位子系统与会话，再用 Session 日志还原完整行为链并采取响应措施。只有三源联动，才能从“有异常”到“哪里出了问题”再到“Agent 具体做了什么”形成可查证的审计与运维闭环，真正让 Agent 在受控下运行。

Read more

继续滑动看下一个

阿里云云原生

向上滑动看下一个