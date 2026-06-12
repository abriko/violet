# Topic: Git Repository Self-Service Redirect

## Purpose
Redirect Git repository and repository permission requests to IssueOps self-service.

## Trigger Keywords
- git repo
- github
- repo
- repository
- grant permission
- create repo
- create repository
- delete repo
- delete repository
- change default branch
- delete branch
- list permission
- view permission

## Response
Please use the IssueOps self-service platform for GitHub repository creation, repository permission management, default branch changes, and protected branch deletion.

⚠️ **Note: Repositories can only be created under the `mfc-hongkong` organization.**

Choose based on your need:
- Create repository only: 👉 https://github.com/mfc-hongkong/eng-issueops-action/issues/new?template=issueops-create-repo.yml
- Create repository and grant permission: 👉 https://github.com/mfc-hongkong/eng-issueops-action/issues/new?template=issueops-create-and-grant.yml
- Grant repository permission: 👉 https://github.com/mfc-hongkong/eng-issueops-action/issues/new?template=issueops-grant-repo-permission.yml
- View repository ACL: 👉 https://github.com/mfc-hongkong/eng-issueops-action/issues/new?template=issueops-list-repo-acl.yml
- Change default branch: 👉 https://github.com/mfc-hongkong/eng-issueops-action/issues/new?template=issueops-change-default-branch.yml
- Delete protected branch: 👉 https://github.com/mfc-hongkong/eng-issueops-action/issues/new?template=issueops-delete-protected-branch.yml
- Delete repository: 👉 https://github.com/mfc-hongkong/eng-issueops-action/issues/new?template=issueops-delete-repo.yml

📖 Reference: https://github.com/mfc-hongkong/eng-issueops-action

## Notes
- Do not create a Jira ticket for these requests.
- Do not perform Confluence search in this Topic.
