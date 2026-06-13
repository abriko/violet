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

---

帮我准备dummy data用来做demo，放到dummy-release
```csv
#,Change Request,CR Implementation Status,Serivce,Project Name,Contact Point,Planned start date/time,Planned end date/time,Dependency CR,Pillar
```
Change Request其中号码类似CHG01234567，CR Implementation Status全部放Plan。
准备数量40个，种类包括：少量的资源配置（setup db， setup domain），project new feature， project bau
我需要这些模拟CR依赖关系，也就是Dependency CR，需要包含三类
- 孤立CR，没有依赖
- 有依赖链路的CR，最多三层链路
- 相互依赖的CR

data/release-plans/2026-h1.csv有点怪，我们习惯两次major release：7月/12月。帮我改成对应的明明
另外帮我创建个：
2025-dec-major：40CR；有依赖链路的CR，最多二层链路
2026-april-minor：10CR的list；孤立CR，没有依赖


之前做的release data我需要你帮我review下，我想在里面实现一个case：
release plan里没有标出

## Governance
/office-hours 我需要在服务页面添加治理情况展示，并在data/文件夹准备dummy data。
例子我们公司服务部署使用RSF框架
- 2.9.0 最新版