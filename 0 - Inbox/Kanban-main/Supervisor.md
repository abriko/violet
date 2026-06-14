---
Status: In progress
Priority:
---

/office-hours 我在尝试用python backend和TypeScript and React frontend，创建一个AI-driven CI/CD/发布的服务。服务不在于从0到1创建一个CI系统，而是需要优化现有流程，提高发布成功率和效率。通过对接现有的CI基础设施例如Jenkins/GitHub actions，并针对公司日常使用提供优化。

它解决的问题主要包括：
- 开发人员在使用传统CI时，需要在dev/sit/uat多个环境跳转。
- job logs错误不够清晰，能够快速分析RCA。
- release时面对多个服务，重复的操作
他可以提供：
- 发开效率优化
	- 针对服务将多环境按钮集合在一个页面上，eg：dev下ci和release成一个group，一个点击触发两个job。group连接到sit group的cd。以此类推。
	- 开发人员可以配置属于自己的多服务集合管理，在一个页面上批量触发job。eg：服务a和b需要同时操作，将他们group在一起同时触发dev下的ci和release
	- job报错一件触发AI分析
- 发布优化，会有catalog-service提release的JSON接口，涉及多个服务，发布优化能够：
	- 根据 dependency编排发布
	- 发布前的检查：
		- 根据JSON中的发布数据，例如成功率做服务发布提示。
		- 根据JSON中政策数据，提示预警，例如说使用的框架版本服务和企业policy。
	- 基于服务发布之间依赖的关键路径的识别


当前Jenkins环境背景：

```
HK-MARKETING/
├── dev/                          # 开发环境
│   ├── hk-agent-console/
│   │   ├── ci                    → Jenkinsfile.dev.ci
│   │   └── release               → Jenkinsfile.dev.release
│   ├── hk-auth-sdk/
│   │   ├── ci
│   │   └── release
│   ├── hk-claims-api/
│   │   ├── ci
│   │   └── release
...
├── sit/                          # SIT 环境 (CD)
│   ├── hk-agent-console/cd       → Jenkinsfile.sit.cd
│   ├── hk-claims-api/cd
│   ├── hk-customer-api/cd
│   ├── hk-customer-portal/cd
...
├── uat/                          # UAT 环境 (CD)
│   ├── hk-agent-console/cd       → Jenkinsfile.uat.cd
│   ├── hk-claims-api/cd
...
└── prod/                         # PROD 环境 (CD)
    ├── hk-agent-console/cd       → Jenkinsfile.prod.cd
    ├── hk-claims-api/cd
...
```
1. YES。2.第一开发工程第二Release manager，DevOps的收益不是用这个平台能提高效率，而是满足其他role的需求从而实现解放。3.51个只是给项目开发准备的demo，实际是这个十倍，内部早就实现了pipeline Shared Library。目标仅限于编排工具，你的目标应该放在优化CI系统使用者的效率而非管理者的提效。4.准确。5.这只是给项目准备的开发环境。