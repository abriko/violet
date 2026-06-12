---
tags:
  - Jenkins
  - devops
creation date: 2026-06-01 09:53
Priority: Medium
Status: In progress
---

https://manulife-asia.atlassian.net/browse/HPD-1042
https://manulife-asia.atlassian.net/browse/HCM-25858


prepare
- account
- fw rule

实现方式：
Jenkins lib, folder配置lib, pipeline调用

https://github.com/mfc-hongkong/hgpt-generic_pipeline_library/pull/88
https://manulife-asia.atlassian.net/wiki/spaces/HKDO/pages/1659831348/AliCloud+MTP+Linux+Pipeline

> [!IMPORTANT]
继续做还需要
pipline lib的branch还没有merge，搞定后还得change folder setting
权限change apply
Image change to prod


### Permission enhance

Currently
```
deployments:
  - server:     ALLPDHKGXCAS01
    ip:         10.83.203.250
    cred_id:    10.83.203.250
    from:       batch/linux/hkgxcas01/hkcas/job/
    to:         /data/develop-1/hkcas/job/
    owner:      svcalivm #Remove this
    group:      oinstall
    permission: 654
```

New
```
deployments:
  - server:     ALLPDHKGXCAS01
    ip:         10.83.203.250
    cred_id:    10.83.203.250
    from:       batch/linux/hkgxcas01/hkcas/job/
    to:         /data/develop-1/hkcas/job/
    group:      oinstall
    permission: 654
    folder_permission: 755 # Add new parameter
      
```

1. Change exec `chown $owner:$group file` -> `chown :$group file`
2. Add `find /remote-to -d -exec chmod $folder_permission`


### Feedback from CSMS
https://manulife-asia.atlassian.net/browse/HCM-27480
MTP and DB Deployment pipeline requirement to DevOps:

As discuss via the call, for the MTP pipeline, below is what we need but not supported as of now:

1. permission not only apply to files, also want to apply to folder
2. The config repository can be confirmed(hard code) in pipeline, but the source code repository should be a input parameter.
3. we want to have 4 inputs in the Jenkins:
    1. Repo name
    2. Branch Name
    3. CR#
    4. action (MTP/DB Deployment/all)

[teams link](https://teams.microsoft.com/l/message/19:2f4276dae6424ee1b2ac8dfd2aee64ef@thread.v2/1780038920903?context=%7B%22contextType%22%3A%22chat%22%7D)