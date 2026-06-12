---
tags:
  - AliCloud
  - Platform
creation date: 2026-06-01 11:10
Status: In progress
Priority: Medium
---

当前是怎么用的：
	除了APIG/ACK/PolarDB还有啥
	服务如何创建的？
		[ETS](https://manulife.service-now.com/sp?id=sc_cat_item_guide&sys_id=475d348b477cb6d00a94228e326d439c)创建
		[哪些资源能用](https://app.powerbi.com/groups/me/reports/fe80eaf7-e72b-4d1e-b13a-5a4448f9e7c8/ReportSectionb80007fb18dc0e2d766f?experience=power-bi)（能用：存PII，理解上给过的也可以测试，只是不能存PII）
		资源 TAG（TBD）
	架构
	ACK上服务有哪些
当前服务的SLA
	现在alert是设置在哪里
接下来上AliCloud的服务
全链路追踪


# Usage analysis

Python script.
billing https://dev-api.gcr.manulife.com/cloudmind/web/automation/bill-allocation.html?billing_cycle=2026-05

# 权限 

当前发现没权限的
ALB
SMQ（mns）
billing
tag:List


# 标准化

### ETS
name https://manulife-asia.atlassian.net/wiki/spaces/EAB/pages/473629055/Naming+Convention
tag https://manulife-asia.atlassian.net/wiki/spaces/EAB/pages/473402647/Resource+Tags

### HK
name https://manulife-asia.atlassian.net/wiki/spaces/CGT/pages/1561199368/Ali+Cloud+-+Resource

### 文档对比
📄 [[4 - Resources/AliCloud/阿里云资源命名规范-对比报告|阿里云资源命名规范-对比报告]] — EAB vs CGT 版本详细对比
