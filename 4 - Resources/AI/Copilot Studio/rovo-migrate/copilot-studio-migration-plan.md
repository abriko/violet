# Copilot Studio Migration Plan for DevOps Support Assistant

## 1. Migration Principle

The original Rovo instructions should be preserved in business meaning, but the implementation should be split by responsibility:

- **Fixed, deterministic replies** go to **Copilot Studio Topics**
- **Search, reasoning, summarization, and open-ended Q&A** stay in the **Agent**
- **Instructions** should only describe routing rules and decision logic
- **Long examples and repeated templates** should not be duplicated in Instructions

---

## 2. Responsibility Boundary

### 2.1 Topics should handle

Use Topics for short, stable, trigger-based responses:

- Welcome / greeting
- Feedback capture
- Git repo self-service redirect
- Ali Cloud / ACK self-service redirect
- Post-resolution feedback reminder
- Fixed menu prompts such as:
  - issue type selection
  - environment selection
  - urgency selection

### 2.2 Agent should handle

Keep these in the Agent:

- Interpreting user intent
- Searching Confluence first
- Summarizing knowledge base results
- Asking follow-up questions when needed
- Deciding whether a Jira ticket is required
- Building the Jira ticket payload
- Handling unresolved issues through structured troubleshooting

---

## 3. Topic List

### Topic 1: Greeting
**Trigger examples**
- hi
- hello
- 你好
- 早上好
- 下午好
- 晚上好

**Action**
- Show welcome message
- Offer quick actions

---

### Topic 2: Feedback
**Trigger examples**
- 反馈
- feedback
- 建议
- suggestion
- complain
- complaint
- 意见
- comment
- 改进
- improvement

**Action**
- Immediately show the feedback form link
- Do not show issue menus
- Do not route to issue creation flow

---

### Topic 3: Git Repository Self-Service Redirect
**Trigger examples**
- Git repo
- github
- 创建仓库
- 仓库权限
- repo
- grant permission
- delete repo
- change default branch

**Action**
- Redirect to IssueOps self-service
- Do not create a Jira ticket

---

### Topic 4: Ali Cloud / ACK Redirect
**Trigger examples**
- 阿里云项目
- alicloud project
- ACK项目
- alicloud
- aliyun

**Action**
- Redirect to Ali Cloud portal
- Do not create a Jira ticket

---

### Topic 5: Post-Resolution Feedback Reminder
**Trigger examples**
- issue resolved
- problem solved
- 问题解决了
- 谢谢
- thank you

**Action**
- Show a short feedback reminder
- Keep it separate from the main troubleshooting flow

---

### Topic 6: Menu Prompts
Use Topics for stable prompt blocks such as:

- issue type selection
- environment selection
- urgency selection
- yes/no follow-up prompts

**Action**
- Present fixed options only
- Hand the conversation back to the Agent after user selection

---

## 4. Agent Instructions Structure

The Agent Instructions should be short, rule-based, and focused on orchestration.

### 4.1 Identity
- You are the DevOps Support Assistant for HK DevOps & Platform.
- Help users with Jenkins, Azure, AKS, APIM, Snyk, Ali Cloud, and related support requests.

### 4.2 Priority Rules
1. Feedback keywords always override all other triggers.
2. Git repo / repository / permission requests must go to IssueOps.
3. Ali Cloud / ACK requests must go to the portal.
4. For all other support requests, search Confluence first.
5. If no solution is found, collect required details and create a Jira ticket.

### 4.3 Knowledge Base Flow
- Search Confluence first before suggesting ticket creation.
- Present any found solution clearly.
- Ask whether the solution resolved the issue.
- If not resolved, ask whether the user wants to add a comment to the article.
- If still unresolved, proceed to Jira ticket creation.

### 4.4 Ticket Creation Flow
- Collect only the required fields for the specific request type.
- Use structured summaries for each support category.
- Keep the response concise.
- After ticket creation, remind the user to submit feedback.

### 4.5 Response Policy
- Do not duplicate fixed response templates inside the Agent Instructions.
- Use Topics for canned replies.
- Use the Agent for reasoning, search, and dynamic conversation.

---

## 5. Recommended Instruction Skeleton for Copilot Studio

```text
You are the DevOps Support Assistant for HK DevOps & Platform.

Priority rules:
1. Feedback keywords override all other triggers and must route to the Feedback topic.
2. Git repository and permission requests must route to the Git self-service topic.
3. Ali Cloud / ACK requests must route to the Ali Cloud portal topic.
4. For all other support requests, search Confluence first.
5. If no solution is found, collect required details and create a Jira ticket.

Behavior:
- Use Topics for fixed replies, menus, and redirects.
- Use the Agent for open-ended troubleshooting, Confluence search, summarization, and follow-up questions.
- Do not repeat long templates in Instructions.
- Always provide feedback reminder after resolution or ticket creation.
```

---

## 6. What to Keep Outside Instructions

Move the following out of the Copilot Studio Instructions body:

- Long welcome examples
- Full bilingual sample conversations
- Full ticket template examples
- Repeated feedback sections
- Detailed category-by-category examples

Store them as reference notes or implementation docs instead.

---

## 7. Implementation Order

1. Create the Topics
2. Move fixed text into Topics
3. Reduce Instructions to routing rules
4. Keep knowledge-base search and open Q&A in the Agent
5. Validate the full end-to-end flow with sample prompts

---

## 8. Expected Result

This split keeps the business rules intact while making the Copilot Studio Instructions small enough to fit within the 8000-character limit.
