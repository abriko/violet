---
Priority: Low
Status: In progress
---

# Datasource
Snow?

Pillar:
[All [HK-Common-AKS-Ops » network-policy-management » apply-network-policy] [Jenkins]](https://jenkins.ap.manulife.com/hongkong/job/HK-Common-AKS-Ops/job/network-policy-management/job/apply-network-policy/)

From Release note
https://manulife-asia.atlassian.net/wiki/spaces/CDCOE/pages/1661672187/2026+July+19+Release#4.-Contact-Point

# CR
我需要添加一个release plan功能，这个功能了最终能展示一个类似一个列表，展示如下字段：
```csv
#,Change Request,CR Implementation Status,Serivce,Project Name,Contact Point,Planned start date/time,Planned end date/time,Dependency CR,Pillar
```
其中Change Request是用Service Now管理CHG01234567，凭借这个number可以查到CR具体的信息。
Dependency CR值得当前release plan中依赖的其他CR number。

当前MVP in scope：
- 单独release plan页面，并可以导航到具体的一次release，在页面展示release plan 列表
- 静态页面渲染来自模拟预生成的JSON
- 预生成JSON的script
- 采集CSV数据源的script
- CR和service关联

MVP out of scope：
- Dependency CR自动判断
- 动态API
