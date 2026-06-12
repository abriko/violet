---
tags:
  - AI
creation date: 2026-06-01 12:53
Priority: High
Status: Sign off
---

[[4 - Resources/AI/Copilot Studio]]

[-] Rovo migration @Kiy @BoCheng
Agent enhance
	- [x] Like Tech Connect一样的转折：使用使用Adaptive Card [menu select](4%20-%20Resources/AI/Copilot%20Studio/rovo-migrate/copilot-studio-e2e-setup-guide.md)
	- [x] 微调和rovo一致 https://manulife-asia.atlassian.net/wiki/spaces/HKDO/pages/1709965550/Agent+Answer+Quality
	- [x] 发布到test后丢失topic
	      通过重建Solution解决

## Pipeline AI L3

Jenkins和agent如何打通(2/3天)
- Via GitHub action ✅ 但是有点Low
- Agent
	- A2A/MCP/REST API(公网访问) ⭐️⭐⭐
		- or Connection via Power Automate Machines(内网隧道) ⭐
	- Azure bot
	- 部署在azure


# Confluence AI migrate
rovo to coplit-sutdio [rovo](4%20-%20Resources/AI/Copilot%20Studio/rovo-migrate/)

## KB setup
一直显示in progress
把之前的9个sources删掉，改成一个后发现可以跑完的。

## Instructions
rovo has over 20k instructions copilot only support 8k

## Release
https://github.com/mfc-hongkong/hk-devops-ai-agents-cfg/blob/feature/v1/.github/repo.metadata.yml
