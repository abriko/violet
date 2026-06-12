# Wiki Schema — Base

This document defines the structure, conventions, and workflows for this wiki. It is the authoritative reference for any LLM agent maintaining this knowledge base.

---

## Directory Layout

```
Base/
├── raw/                # Immutable source documents — READ ONLY
│   └── assets/         # Downloaded images and attachments
├── wiki/               # LLM-maintained wiki pages
│   ├── entities/       # Pages for people, tools, organizations, projects
│   ├── concepts/       # Pages for ideas, methods, frameworks, terms
│   ├── sources/        # One summary page per ingested source
│   ├── comparisons/    # Side-by-side comparison pages
│   └── synthesis/      # High-level analysis, theses, evolved insights
├── index.md            # Master content catalog (update on every ingest)
├── log.md              # Append-only chronological operation log
└── CLAUDE.md           # This file — the schema
```

---

## Page Conventions

### Frontmatter (YAML)

Every wiki page should include frontmatter:

```yaml
---
tags: [entity | concept | source | comparison | synthesis]
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: 0          # number of source documents this page draws from
---
```

### Wikilinks

Always use Obsidian wikilinks for cross-references: `[[Page Name]]`. Never use relative markdown links. Cross-link liberally — the graph view is a primary navigation tool.

### Naming Convention

- Entity pages: proper noun, singular — e.g., `Andrej Karpathy.md`
- Concept pages: noun phrase — e.g., `Retrieval-Augmented Generation.md`
- Source pages: `[YYYY-MM-DD] Title.md` — e.g., `[2026-04-01] Attention Is All You Need.md`
- Comparison pages: descriptive — e.g., `RAG vs Wiki Approach.md`
- Synthesis pages: thesis-style — e.g., `Overview.md`, `Emerging Themes.md`

---

## Workflows

### Ingest a New Source

1. Read the source document from `raw/`
2. Discuss key takeaways if the user is present
3. Create a summary page in `wiki/sources/`
4. Update or create relevant entity pages in `wiki/entities/`
5. Update or create relevant concept pages in `wiki/concepts/`
6. Note any contradictions with existing pages inline using a `> [!warning]` callout
7. Update `index.md` — add the new source summary and any new pages
8. Append an entry to `log.md`: `## [YYYY-MM-DD] ingest | Source Title`

### Answer a Query

1. Read `index.md` to identify relevant pages
2. Read the relevant wiki pages
3. Synthesize an answer with citations using `[[wikilinks]]`
4. If the answer is non-trivial, file it as a new page in `wiki/synthesis/` or `wiki/comparisons/`
5. Update `index.md` if a new page was created
6. Append to `log.md`: `## [YYYY-MM-DD] query | Query summary`

### Lint the Wiki

Periodically check for:
- Contradictions between pages — flag with `> [!warning]`
- Orphan pages (no inbound links) — add links or note in index
- Concepts mentioned but lacking their own page — stub them
- Stale claims superseded by newer sources — update inline
- Missing cross-references — add wikilinks

Append to `log.md`: `## [YYYY-MM-DD] lint | Summary of findings`

---

## Callout Conventions

Use Obsidian callout syntax for special annotations:

```
> [!note] Additional context or elaboration

> [!warning] Contradiction with [[Other Page]]

> [!question] Open question or gap to investigate

> [!tip] Key insight worth highlighting
```

---

## Index Format

`index.md` is organized by category. Each entry: `- [[Page Name]] — one-line summary`

## Log Format

Each log entry starts with: `## [YYYY-MM-DD] operation | Title`

This makes entries grep-able:
```bash
grep "^## \[" log.md | tail -10
