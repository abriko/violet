# Log

Append-only chronological record of all wiki operations.

Each entry format: `## [YYYY-MM-DD] operation | Title`

Operations: `ingest` · `query` · `lint`

Quick grep: `grep "^## \[" log.md | tail -10`

---

## [2026-04-13] init | Wiki initialized

Directory structure and schema created. `CLAUDE.md`, `index.md`, and `log.md` bootstrapped.
