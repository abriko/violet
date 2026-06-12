---
tags: [entity]
created: 2026-04-21
updated: 2026-04-21
sources: 2
---

# GitHub Advanced Security

**Type:** Security tool suite  
**Vendor:** GitHub / Microsoft  
**Availability:** Paid for private repos; free for public/open-source repos

---

## Overview

GitHub Advanced Security (GHAS) is a suite of security scanning tools embedded in the GitHub platform. In the context of [[3 - Areas/AIOps/wiki/concepts/Agentic DevOps]], it serves as the security guardrail layer that catches vulnerabilities introduced by AI-generated code before they reach production.

---

## Core Capabilities

| Feature | Function |
|---|---|
| **Secret Scanning** | Detects credentials, tokens, API keys committed to repos; 4.4 million leaks prevented in 2024 |
| **Code Scanning** | Static analysis for security vulnerabilities (SQL injection, XSS, etc.) at PR time |
| **Copilot Autofix** | AI-generated fix suggestions for found vulnerabilities; "found means fixed" principle |
| **CodeQL** | Semantic code analysis engine; runs automatically within [[3 - Areas/AIOps/wiki/entities/GitHub Copilot]] agent sessions |
| **Dependency Alerts** | Flags known vulnerable dependencies |

---

## Copilot Autofix Workflow

1. Code scanning finds vulnerability at PR submission
2. Alert displayed with: vulnerability description + code context + fix suggestion
3. Developer reviews AI-generated fix
4. One click: commit fix to new branch or existing branch
5. PR created and enters normal review process

This workflow closes the gap between *detection* and *remediation* — historically the hardest part of security practice.

---

## AI-Era Security Statistics (2025–2026)

- **4.4 million** credential leaks prevented in 2024 by GHAS secret protection
- **322% more** privilege escalation paths in AI-generated code vs. human-written code
- **40% increase** in critical secrets exposure risk with AI-assisted development
- **116-day average** remediation time for critical security defects (industry-wide)
- **17%** of vulnerability backlogs flagged as critical

> [!warning] The 322% privilege escalation stat suggests AI coding assistants systematically introduce security regressions. Even with two separate AI agents reviewing code (as documented in the Microsoft keynote demo), GHAS still caught URL injection attacks. This underscores that GHAS is a **necessary complement** to AI coding, not an optional add-on.

---

## MCP Server Allowlist (Governance)

As of 2026, GitHub added an MCP Server Allowlist at the org/enterprise level:
- Administrators define which MCP servers agents are permitted to use
- Prevents malicious or unvetted MCP servers from accessing repo context
- Part of the broader [[3 - Areas/AIOps/wiki/concepts/AI Agent Runtime Security]] posture for the CI/CD layer

---

## Relationships

- [[3 - Areas/AIOps/wiki/entities/GitHub Copilot]] — primary integration; Autofix and CodeQL embedded in agent sessions
- [[3 - Areas/AIOps/wiki/concepts/AI-Generated Code Safety]] — GHAS is the enforcement layer for AI code safety
- [[3 - Areas/AIOps/wiki/concepts/AI Agent Runtime Security]] — MCP server allowlist as agent governance
- [[3 - Areas/AIOps/wiki/concepts/Human-in-the-Loop]] — Autofix still requires human review before merge
- [[3 - Areas/AIOps/wiki/concepts/Progressive Delivery]] — security gate integrated into PR workflow

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-12-22] Agentic DevOps in Real Life]]
- [[3 - Areas/AIOps/wiki/sources/[2026-01-28] The future of software creation with Agentic DevOps]]
