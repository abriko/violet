# Copilot Studio E2E Setup Guide — DevOps Support Assistant

> From zero to live in Teams. Covers environment setup, topic creation, agent configuration, connectors, testing, and publishing.

---

## Prerequisites

| Item | Detail |
|------|--------|
| License | Microsoft 365 E3/E5 + Copilot Studio license (or trial) |
| Environment | Power Platform environment with Dataverse enabled |
| Admin access | Teams Admin Center (to approve the app) |
| Connectors | Confluence (Atlassian), Jira (HPDS project), ServiceNow (optional) |
| Knowledge sources | Confluence space URLs for KB search |

---

## Phase 1: Create the Copilot

1. Go to https://copilotstudio.microsoft.com
2. Select correct environment (e.g. `Manulife-HK-DevOps`)
3. **Create** → **New copilot**
   - Name: `DevOps Support Assistant`
   - Language: English (primary), add Chinese later
   - Description: "HK DevOps & Platform team support bot"
4. Click **Create**

---

## Phase 2: Configure Instructions (Agent Behavior)

Go to **Settings → Generative AI → Instructions**

Paste the content from `main-instructions.md`:
- Role definition
- Language policy
- Priority order (Feedback > Git > AliCloud > General > Unresolved)
- Core behavior rules

> ⚠️ Keep instructions concise. Do NOT put long templates here — those go in Topics.

---

## Phase 3: Create Topics

### 3.1 Greeting Topic

| Setting | Value |
|---------|-------|
| Name | `Greeting` |
| Trigger | Phrases: hi, hello, hey, good morning, start, help me, 你好 |
| Node 1 | **Message** — welcome text (from `topic-greeting.md`) |
| Node 2 | **Question** (Multiple choice) — "What can I help you with?" |
| Options | Report an Issue / Git Repository Request / AliCloud Request / Search Knowledge Base / Submit Feedback |
| Branches | Each option → **Redirect** to corresponding topic |

#### How to add the opening question:

1. Add a **Question** node after the greeting message
2. Set **Identify** to "Multiple choice options"
3. Add choices:
   - `Report an Issue` → Redirect to **Issue Triage** topic
   - `Git Repository Request` → Redirect to **Git Self-Service** topic
   - `AliCloud / ACK Request` → Redirect to **AliCloud Self-Service** topic
   - `Search Knowledge Base` → Redirect to **Knowledge Search** (agent handles)
   - `Submit Feedback` → Redirect to **Feedback** topic
4. Set **Reprompt** behavior: "How can I help you?" if no valid response

### 3.2 Feedback Topic

| Setting | Value |
|---------|-------|
| Trigger | Phrases: feedback, 反馈, suggestion, complaint, 建议, 意见 |
| Node 1 | **Message** — "Thank you! Please submit via: [Feedback Form](https://forms.office.com/r/vY8Zu67LfA)" |
| Node 2 | **End conversation** |

### 3.3 Git Self-Service Topic

| Setting | Value |
|---------|-------|
| Trigger | Phrases: git repo, repository, create repo, permission, git access |
| Node 1 | **Message** — instructions from `topic-git-self-service.md` |
| Node 2 | **Question** — "Was this helpful?" (Yes/No) |
| Branch Yes | End conversation |
| Branch No | Redirect to **Issue Triage** (create Jira) |

### 3.4 AliCloud Self-Service Topic

| Setting | Value |
|---------|-------|
| Trigger | Phrases: alicloud, ACK, ali cloud, 阿里云, kubernetes china |
| Node 1 | **Message** — portal link + instructions from `topic-alicloud-self-service.md` |
| Node 2 | End or redirect |

### 3.5 Issue Triage Topic

This is where the agent takes over for open-ended troubleshooting.

| Setting | Value |
|---------|-------|
| Trigger | Phrases: report issue, problem, error, 报错, incident |
| Node 1 | **Question** — "Which service is affected?" (Multiple choice) |
| Options | Jenkins / AKS / APIM / Snyk / Azure / Other |
| Node 2 | **Question** — "What environment?" |
| Options | DEV / SIT / UAT / PRD |
| Node 3 | **Question** — "Describe the issue briefly" (Open-ended, User's entire response) |
| Node 4 | **Generative answers** — search Confluence with collected context |
| Node 5 | **Condition** — If resolved → End. If not → collect info → create Jira |

### 3.6 Post-Resolution Feedback Topic

| Setting | Value |
|---------|-------|
| Trigger | System — End of conversation |
| Node 1 | **Question** — "Was your issue resolved?" (Yes / No / Partially) |
| Node 2 | Log to Dataverse or Power Automate |

---

## Phase 3.7: Adaptive Cards — Detailed Configuration

Adaptive Cards 是 Tech Connect 那种美观按钮式交互的核心。比 Multiple Choice Question 更灵活、更好看。

### When to Use Adaptive Card vs Question Node

| 场景 | 推荐 |
|------|------|
| 简单 2-3 个选项 | Question node (Multiple choice) — 自带分支逻辑 |
| 需要自定义布局/图标/多列 | Adaptive Card |
| 需要表单（多字段收集） | Adaptive Card (Input.Text + Input.ChoiceSet) |
| 展示工单详情/搜索结果 | Adaptive Card (结构化展示) |

### 3.7.1 在 Topic 中插入 Adaptive Card

1. 在 Topic 画布中添加 **Message** node
2. 点击消息框 → 工具栏选择 **Adaptive Card** (卡片图标)
3. 选择 **Edit JSON** 或使用可视化编辑器

### 3.7.2 开场语言选择 Card（复刻 Tech Connect）

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "Please select the language:",
      "weight": "Bolder",
      "size": "Medium"
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "English",
      "data": {
        "action": "selectLanguage",
        "value": "en"
      }
    },
    {
      "type": "Action.Submit",
      "title": "中文",
      "data": {
        "action": "selectLanguage",
        "value": "zh"
      }
    }
  ]
}
```

**配置步骤：**

1. 粘贴上面 JSON 到 Message node → Adaptive Card editor
2. 在 Message node 下方添加 **Question** node
3. Set "Identify" → **Choice** (从 card 的 submit data 获取)
4. 在 Question 的 **Variable** 里新建 `Topic.Language`
5. **重要**：勾选 "Skip if the variable already has a value"（card submit 会自动填充）
6. 根据 `Topic.Language` 值做 **Condition** 分支：
   - `en` → Redirect to English menu
   - `zh` → Redirect to Chinese menu

### 3.7.3 主菜单 Card（功能选择）

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "How can I help you today?",
      "weight": "Bolder",
      "size": "Medium"
    },
    {
      "type": "TextBlock",
      "text": "Please select one of the following options:",
      "wrap": true
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "🔧 Report an Issue",
      "data": { "action": "menu", "value": "incident" }
    },
    {
      "type": "Action.Submit",
      "title": "📦 Git Repository Request",
      "data": { "action": "menu", "value": "git" }
    },
    {
      "type": "Action.Submit",
      "title": "☁️ AliCloud / ACK Request",
      "data": { "action": "menu", "value": "alicloud" }
    },
    {
      "type": "Action.Submit",
      "title": "🔍 Search Knowledge Base",
      "data": { "action": "menu", "value": "search" }
    },
    {
      "type": "Action.Submit",
      "title": "💬 Submit Feedback",
      "data": { "action": "menu", "value": "feedback" }
    }
  ]
}
```

**关键点：**
- `Action.Submit` 的 `data` 字段是用户点击后传回 Copilot Studio 的值
- 在后续 Question node 中用 Condition 判断 `data.value` 做路由

### 3.7.4 信息收集表单 Card（Issue Report）

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "Report an Issue",
      "weight": "Bolder",
      "size": "Medium"
    },
    {
      "type": "Input.ChoiceSet",
      "id": "service",
      "label": "Which service is affected?",
      "isRequired": true,
      "choices": [
        { "title": "Jenkins", "value": "jenkins" },
        { "title": "AKS", "value": "aks" },
        { "title": "APIM", "value": "apim" },
        { "title": "Snyk", "value": "snyk" },
        { "title": "Azure", "value": "azure" },
        { "title": "Other", "value": "other" }
      ]
    },
    {
      "type": "Input.ChoiceSet",
      "id": "environment",
      "label": "Environment",
      "isRequired": true,
      "choices": [
        { "title": "DEV", "value": "dev" },
        { "title": "SIT", "value": "sit" },
        { "title": "UAT", "value": "uat" },
        { "title": "PRD", "value": "prd" }
      ]
    },
    {
      "type": "Input.Text",
      "id": "description",
      "label": "Describe the issue",
      "isMultiline": true,
      "isRequired": true,
      "placeholder": "What happened? Include error messages if any."
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "Submit",
      "data": { "action": "submitIssue" }
    }
  ]
}
```

**处理 submit data：**

1. Copilot Studio 自动将 card 的 input 字段作为变量接收
2. 在 Message node 后添加 **Set variable** nodes：
   - `Topic.Service` = `Activity.Value.service`
   - `Topic.Environment` = `Activity.Value.environment`
   - `Topic.Description` = `Activity.Value.description`
3. 然后传给 Power Automate 创建 Jira ticket

### 3.7.5 展示工单结果 Card

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "✅ Ticket Created",
      "weight": "Bolder",
      "size": "Medium",
      "color": "Good"
    },
    {
      "type": "FactSet",
      "facts": [
        { "title": "Ticket ID", "value": "{Topic.JiraKey}" },
        { "title": "Service", "value": "{Topic.Service}" },
        { "title": "Environment", "value": "{Topic.Environment}" },
        { "title": "Status", "value": "Open" }
      ]
    },
    {
      "type": "TextBlock",
      "text": "You can track this ticket in [Jira](https://manulife-asia.atlassian.net/browse/{Topic.JiraKey})",
      "wrap": true
    }
  ],
  "actions": [
    {
      "type": "Action.OpenUrl",
      "title": "Open in Jira",
      "url": "https://manulife-asia.atlassian.net/browse/{Topic.JiraKey}"
    }
  ]
}
```

> 注意：`{Topic.JiraKey}` 是 Copilot Studio 变量语法，会在运行时替换为实际值。

### 3.7.6 如何接收 Adaptive Card 的 Submit Data

这是最容易踩坑的地方：

1. 用户点击 card 按钮后，数据通过 `Activity.Value` 进入 Copilot Studio
2. **你不能直接用 Question node 接收**——需要用 Power Fx 或 Condition node

**方法 A（推荐）：Topic 级别处理**

```
Message node (发送 Adaptive Card)
  ↓
Question node (Identify: "Activity.Value" → 设置为 Blank，自动捕获)
  ↓
Condition node:
  If Activity.Value.action = "menu" AND Activity.Value.value = "incident"
    → Redirect to Issue Triage
  If Activity.Value.action = "menu" AND Activity.Value.value = "git"
    → Redirect to Git Self-Service
  ...
```

**方法 B：使用 Parse Value**

1. 在 card submit 后添加 **Parse value** node
2. Data type: From sample JSON → 粘贴你的 `data` 结构
3. 会自动生成 typed variables 供后续 Condition 使用

### 3.7.7 设计 Adaptive Card 的工具

| 工具 | 用途 |
|------|------|
| [Adaptive Cards Designer](https://adaptivecards.io/designer/) | 在线可视化编辑器，实时预览 |
| Copilot Studio 内置编辑器 | 简单编辑够用，复杂的建议外部设计好再粘贴 |
| [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | VS Code 插件，本地预览 Teams 渲染效果 |

### 3.7.8 会话超时（Session Timeout）实现

Tech Connect 的超时行为：用户 30 分钟无操作后，bot 自动发送一张 Adaptive Card 提示重新开始对话。

#### 原理

Copilot Studio 内置 **System Topic: Inactivity**，当用户在一个 session 内超过设定时间无交互，自动触发该 topic。

#### Tech Connect 的超时消息（逆向还原）

```
时间线：
  10:44 AM — 用户最后一次交互（bot 回复"没有更多的工单给你"）
  11:14 AM — bot 自动发送超时 Adaptive Card（间隔 30 分钟）
```

超时 Card 内容：
```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "本届会议已经很久没有工作了。要开始新的对话，请输入一些东西或单击下面的按钮",
      "wrap": true
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "开始新对话",
      "data": { "action": "restartConversation" }
    }
  ]
}
```

#### 如何配置

1. **进入 System Topics**
   - Copilot Studio → Topics → System → 找到 **Inactivity** (或 "Session timeout")

2. **设置超时时间**
   - Settings → Session management → **Session timeout duration**
   - 默认 30 分钟（与 Tech Connect 一致）
   - 可选：10min / 15min / 30min / 1hr / 2hr

3. **自定义超时消息**
   - 打开 Inactivity topic → 编辑 Message node
   - 替换默认文本为你的 Adaptive Card JSON：

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "Your session has been idle for a while. To start a new conversation, type something or click the button below.",
      "wrap": true
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "Start New Conversation",
      "data": { "action": "restart" }
    }
  ]
}
```

4. **处理"开始新对话"按钮点击**
   - 在 Inactivity topic 的 submit handler 中：
   - **Redirect** → Greeting topic（重新走开场流程）
   - 或 **Clear all variables** + Redirect（确保干净的新 session）

#### 完整的 Inactivity Topic 流程

```
[System trigger: 30min no activity]
  ↓
Message node: 发送超时 Adaptive Card
  ↓
Question node: 等待用户点击或输入
  ↓
Condition:
  - 用户点击 "Start New Conversation" → Clear variables → Redirect to Greeting
  - 用户直接输入文字 → Redirect to Greeting（带用户输入，让 agent 处理）
```

#### 关键注意点

- **超时后 session 不会自动结束** — 只是发了一条提示，用户仍在同一 session 中
- **如果需要强制结束 session**：在 Inactivity topic 末尾添加 **End conversation** node + **Transfer to topic: Greeting**
- **旧 card 的按钮仍然可点击** — 但因为 session context 可能已丢失，建议在 Greeting topic 开头无条件清除变量
- **多语言超时消息**：需要在 Inactivity topic 里判断 `Topic.Language` 变量（如果之前设过），分支发送中/英文 card

#### 与 Tech Connect 对比

| 配置项 | Tech Connect | 建议配置 |
|--------|-------------|----------|
| 超时时间 | 30 分钟 | 30 分钟（合理默认） |
| 提示方式 | Adaptive Card + 按钮 | 同上 |
| 超时文案质量 | 机翻中文（"本届会议"） | 用自然中文 / 根据语言变量切换 |
| 按钮行为 | 重启对话 | 重启 + 清除变量 |

---

### 3.7.9 Adaptive Card 在 Teams 中的限制

- 最大 payload: 28KB
- 最多 6 个 `Action.Submit` 按钮（超过会被截断）
- `Action.OpenUrl` 不返回数据给 bot（纯跳转）
- Card 发送后**不可更新**（除非用 `Activity.ReplyToId` + Power Automate 替换）
- 旧 card 的按钮在 session 超时后仍可点击，但 bot 可能无法正确路由——建议在 submit handler 里判断 session 状态

---

## Phase 4: Knowledge Sources

1. Go to **Knowledge** → **Add knowledge**
2. Add Confluence:
   - Source type: **Website** or **Dataverse** (if synced)
   - URL: `https://manulife-asia.atlassian.net/wiki/spaces/HKDEVOPS/...`
   - Or upload exported pages as documents
3. The agent will use these for Generative Answers in the Issue Triage flow

> 💡 Copilot Studio supports website crawling. Add your Confluence space root URL and it indexes sub-pages automatically.

---

## Phase 5: Actions (Power Automate Flows)

### 5.1 Create Jira Ticket

1. **Actions** → **Add an action** → **Create a flow**
2. Flow logic:
   ```
   Trigger: Copilot Studio (When an action is run)
   Inputs: summary, description, environment, service, reporter_email
   Steps:
     → HTTP POST to Jira REST API
       URL: https://manulife-asia.atlassian.net/rest/api/3/issue
       Body: { project: "HPDS", issuetype: "Task", summary, description, ... }
     → Return issue key to Copilot
   ```
3. Back in Copilot Studio: in the Issue Triage topic, add **Call an action** node → select this flow
4. Map topic variables to flow inputs

### 5.2 Search Confluence (Optional — if Generative Answers not sufficient)

1. Create a flow that calls Confluence REST API `/wiki/rest/api/content/search?cql=...`
2. Return top 3 results (title + link + excerpt)
3. Use in topic as structured fallback

---

## Phase 6: Multi-Language Setup

1. **Settings** → **Languages** → **Add language** → Chinese (Simplified)
2. For each topic:
   - Switch language tab
   - Provide Chinese translations for messages and button labels
3. Or: rely on Generative AI auto-translation (less control, OK for agent responses)

> Alternative approach (like Tech Connect): Add a **Language Selection** question as the very first node in Greeting, then branch all subsequent topics by language variable.

---

## Phase 7: Channel Configuration — Teams

1. **Channels** → **Microsoft Teams** → **Turn on Teams**
2. Click **Open bot in Teams** to test in your personal account
3. **Submit for admin approval**:
   - Go to Teams Admin Center → Manage apps
   - Find "DevOps Support Assistant" → Approve
4. **Distribute**:
   - Pin to specific users/groups via Teams Setup Policy
   - Or publish to org app catalog

---

## Phase 8: Testing Checklist

| Test Case | Expected |
|-----------|----------|
| Send "hi" | Greeting + quick action buttons appear |
| Click "Report an Issue" | Service selection question |
| Send "git repo" | Git self-service topic triggers |
| Send "反馈" | Feedback link shown, conversation ends |
| Send "Jenkins pipeline failed in SIT" | Agent searches Confluence, suggests fix |
| No response 30min | Session timeout message (built-in system topic) |
| Send gibberish | Fallback: "I didn't understand, here are things I can help with..." |

### How to test:

1. **Test canvas** (built-in): top-right "Test your copilot" panel
2. **Teams**: Open bot → chat directly
3. **Analytics**: Monitor in Copilot Studio → Analytics → Topic performance

---

## Phase 9: Go-Live Checklist

- [ ] All topics tested in test canvas
- [ ] Instructions reviewed (no long templates leaked in)
- [ ] Knowledge source indexed and returning relevant results
- [ ] Jira action tested — ticket created in HPDS correctly
- [ ] Chinese responses reviewed for quality
- [ ] Session timeout topic customized ("Need more help? Type 'hi' to restart")
- [ ] Fallback topic customized (not default "I didn't understand")
- [ ] Teams admin approved the app
- [ ] Pilot group (5-10 users) tested for 1 week
- [ ] Feedback form link working
- [ ] Analytics dashboard bookmarked

---

## Architecture Diagram

```
┌──────────────────────────────────────────────────────┐
│                   Microsoft Teams                      │
│                  (User Interface)                      │
└────────────────────────┬─────────────────────────────┘
                         │
┌────────────────────────▼─────────────────────────────┐
│              Copilot Studio (Bot Engine)               │
│                                                       │
│  ┌─────────┐  ┌──────────┐  ┌───────────────────┐   │
│  │ Topics  │  │  Agent   │  │ Knowledge Sources │   │
│  │(决策树) │  │(生成式AI)│  │  (Confluence KB)  │   │
│  └────┬────┘  └────┬─────┘  └───────────────────┘   │
│       │             │                                 │
└───────┼─────────────┼─────────────────────────────────┘
        │             │
┌───────▼─────────────▼─────────────────────────────────┐
│              Power Automate (Actions)                   │
│                                                        │
│  ┌──────────────┐    ┌─────────────────────────────┐  │
│  │ Create Jira  │    │ Search Confluence (optional) │  │
│  │   Ticket     │    │                             │  │
│  └──────┬───────┘    └──────────┬──────────────────┘  │
└─────────┼───────────────────────┼─────────────────────┘
          │                       │
┌─────────▼───────────┐  ┌───────▼───────────────────┐
│  Jira (HPDS)        │  │  Confluence (Knowledge)   │
│  manulife-asia      │  │  manulife-asia            │
│  .atlassian.net     │  │  .atlassian.net           │
└─────────────────────┘  └───────────────────────────┘
```

---

## Tips & Pitfalls

1. **Instructions 字数限制** — Copilot Studio instructions 有 ~4000 字上限，保持精简
2. **Topic 优先级** — 多个 topic trigger 冲突时，可在 Topic 列表里拖拽排序
3. **Adaptive Card vs 纯文本** — 开场菜单用 Adaptive Card 按钮更美观，但 Multiple Choice Question 更简单且自带分支逻辑
4. **Generative Answers 幻觉** — 开启 "Only show answers from knowledge sources" 避免瞎编
5. **转人工** — 如果需要 escalate 到真人，需配置 Omnichannel for Customer Service 或用 Power Automate 发 Teams 消息到支持 channel
6. **Session timeout** — 默认 30min，可在 System topics → Inactivity 里修改文案
7. **测试时清除上下文** — 在 test canvas 点 "Reset" 清除对话状态，否则会延续上次分支

---

## File Map (This Directory)

| File | Purpose |
|------|---------|
| `copilot-studio-e2e-setup-guide.md` | This guide (E2E walkthrough) |
| `copilot-studio-migration-plan.md` | Architecture decisions & responsibility split |
| `main-instructions.md` | Agent instructions (paste into Copilot Studio) |
| `topic-greeting.md` | Greeting topic content |
| `topic-git-self-service.md` | Git self-service topic content |
| `topic-alicloud-self-service.md` | AliCloud self-service topic content |
| `topic-feedback.md` | Feedback topic content |
| `topic-menu-prompts.md` | Menu prompt templates |
| `topic-post-resolution-feedback.md` | Post-resolution feedback flow |
| `reference-appendix.md` | API references, URLs, credentials |
| `rovo.md` | Original Rovo instructions (source of truth) |
