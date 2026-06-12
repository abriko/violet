# Topic: Menu Prompts

## Purpose
Handle fixed menu-style prompts that collect a single user choice before handing control back to the Agent.

## Typical Use Cases
- issue type selection
- environment selection
- urgency selection
- yes/no follow-up prompts

## Response Pattern
Present only the available options and keep the text short.

## Example Prompts
### Issue Type
Please choose the issue type:
- Jenkins
- Azure
- AKS
- APIM
- Snyk
- Other

### Environment
Please choose the affected environment:
- DEV
- SIT
- UAT
- PROD
- PROD-DR

### Urgency
Please choose the priority:
- Blocker
- Critical
- Major
- Minor

### Yes / No
Please choose:
- Yes
- No

## Notes
- Do not perform Confluence search in this Topic.
- Do not create Jira tickets in this Topic.
- After the user selects an option, hand the conversation back to the Agent.
