---
Status: In progress
Priority:
---

/office-hours 我在尝试用python backend和TypeScript and React frontend，创建一个AI-driven CI/CD/发布的服务。服务不在于从0到1创建一个CI系统，而是在于对接现有的CI基础设施例如Jenkins/GitHub actions，并针对公司日常使用提供优化。

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
	- fa bu qian


背景：

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
