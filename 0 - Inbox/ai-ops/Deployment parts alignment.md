本期只对齐范围如下。其他都进 backlog，不在本期范围内。

**0) DDL** 7/15
- ✅ 5/18 DevOps deployment需求 @Darren
- ✅ 5/21 Service catalog/Service management 需求 @Jerry @Phoebe
- 6/15 MVP @Jerry @Phoebe
	- AIOps 平台接入/跳转deployment服务 
	- ✴️ Deployment 部分通过数据库/Service management 取得pipeline和服务关系
		- 数据DDL @Darren
		- 数据准备 @DevOps
	- Pipeline 修改需求、当前痛点 @Darren @DevOps
- 6/30 Milestone 1
	0) AIOps Deployment 能发起执行
	1) Jenkins pipeline E2E 完整跑通  
	2) 执行结果可复现、参数可追溯 
	3) 发布编排
	4) Pipeline 阶段改造 @DevOps
	5) ✴️ Deployment 生成RCA @DevOps
	6) 推出搜集feedback @Darren
- 7/15 Milestone 2
	0) IRA?
	1) 1）Goal: Deployment service Support Release

**0) 团队参与方式** ✅
- Darren 统筹AIOps项目
	- 产品落地
	- 人员参与调度
- DevOps 提供Deployment部分解决方案
	- Deployment和Jenkins打通
	- Pipeline针对Deployment的改造
- Scott 参与设计实施方案

**1) AIOps Deployment** 职责 ✅

**• AIOps Deployment** **只做**：
- 参数收集/展示
- 触发 Jenkins job
- 展示运行状态/链接日志
- 做一些轻量校验（比如必填项）
- 流程编排、跨环境策略
**• AIOps Deployment** **不做**：
- 审批审计
- 复杂逻辑判断（这些都在 Jenkins pipeline 或业务脚本里）。

**2)  逻辑实施方式选型**
- A：复用现有 Jenkins pipeline（增强参数/步骤）
  适合：已有 job/脚本、只是把流程标准化、补齐环境与参数结构。
- B：新建一套 Jenkins pipeline（按你们方案的模板/接口来）
  适合：现有 job 太乱/不可复用，重新按模板沉淀成标准 pipeline。
- C: A+B同时适配 ✅

**3) Jenkins pipeline 修改** ✅
   - Q: 修改需求、当前痛点。
	   - Requirement DDL
   - Q: 需求审批