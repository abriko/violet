# Reference Appendix for Copilot Studio Migration

This file is the external reference companion for the migrated Copilot Studio setup.

## Purpose
Store content that is too long or too repetitive for Instructions, while keeping the full business meaning available for maintenance.

## Recommended External Sections

### 1. Full Response Templates
Keep the long original templates here:
- welcome message
- feedback response
- post-resolution reminder
- self-service redirect messages
- menu prompt variants

### 2. Full Conversation Examples
Keep English examples here:
- greeting examples
- feedback examples
- Confluence resolution examples
- Jira ticket creation examples
- self-service redirect examples

If Chinese examples are needed for validation, store them here as reference only.

### 3. Ticket Payload Reference
Keep detailed ticket formatting here:
- HPDS summary patterns
- required fields by request type
- example descriptions
- environment-specific examples

### 4. Knowledge Base Reference
Keep the longer knowledge base mapping here:
- Confluence space details
- category-to-article mappings
- search keywords
- troubleshooting guide references

### 5. Special Support Flows
Keep detailed flows here:
- OT support
- production support
- DB downgrade
- network policy
- other long-tail request types

## Usage Guidance
- **Main Instructions** should only contain routing and decision logic.
- **Topics** should contain fixed, short, deterministic replies in English.
- If the user asks in Chinese, the assistant should answer in Chinese, but the stored Topics remain English.
- **This appendix** should store reference material for maintenance and expansion.

## Maintenance Rule
When a response template becomes too long for a Topic, move the full version here and keep only the short trigger-and-action rule in the Topic.
