---
tags: [concept]
created: 2026-04-13
updated: 2026-05-13
sources: 4
---

# LLM Evaluation

**Also known as:** Evals, LLM evals, agent evaluation

---

## What It Is

LLM Evaluation (evals) is the practice of defining reproducible, automated test cases for LLM-powered systems. Rather than manually inspecting outputs ("vibe testing"), evals let you run the same scenarios repeatedly, measure pass/fail rates, and iterate with confidence that changes don't regress working behaviours.

> [!note]
> In ML, quality is never binary. Evals answer "how good is it, and in what fraction of cases?" — not just "does it work?"

---

## Why Evals Matter for Agents

[[3 - Areas/AIOps/wiki/concepts/LLM Agent|LLM Agents]] are especially hard to test because:
- Outputs are non-deterministic.
- Behaviour depends on the interaction of prompt, tools, and environment state.
- A change that fixes one flow can break another (especially in monolithic agents with large prompts).

Evals provide the safety net that makes iterative improvement possible.

---

## The Alternative: Vibe Testing

Ad-hoc manual testing with random inputs, accepting results "if it looks good enough." This works for early prototypes but fails at scale:
- Not reproducible — can't re-run the same scenario.
- Not comprehensive — you test what you think to test, missing edge cases.
- Not auditable — no record of what was fixed or why.

---

## Eval Levels (Grafana's approach)

[[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] runs evals at three levels:

| Level | What is tested |
|---|---|
| **Tool level** | Does the LLM call the right tool with the right parameters? |
| **Sub-agent level** | Does each specialist agent complete its task correctly? |
| **End-to-end** | Does the full agent (coordinator + specialists) produce the right outcome? |

### Example (from the Grafana talk)

**Query:** "Show me some logs"
**Expected behaviour:** Call the list-data-sources tool with `type=loki`
**Bug found:** LLM called the tool but omitted the `type` filter
**Fix:** Updated tool description/instructions, re-ran evals — all pass

---

## Environment Mocking

For end-to-end evals, [[3 - Areas/AIOps/wiki/entities/Grafana]] mocks the Grafana instance and data source responses so tests are deterministic and reproducible. Importantly:
- The **environment** (Grafana API, data source responses) is mocked.
- The **LLM** is **not** mocked — real completions are run to catch actual model behaviour.

---

## LLM-as-Judge: Production-Scale Evaluation

[[3 - Areas/AIOps/wiki/entities/Adobe]] uses a **second LLM to evaluate the first LLM's outputs** — a pattern sometimes called *LLM-as-judge*:

1. Alert fires → agent produces RCA on Slack
2. On-call engineer follows up in the thread (discussion, corrections, final resolution)
3. Another LLM reads the full Slack thread and judges whether the agent's RCA matched the engineer's diagnosis
4. Accuracy score accumulated → currently **71%** across all alerts

This approach evaluates against **real production outcomes** rather than synthetic test cases, making it complementary to [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]]'s environment-mocked evals.

### The Golden Dataset

Adobe curates a **golden dataset** — a manually reviewed set of high-quality RCA examples stored as Markdown in a GitHub repo:

- Agent RCAs that scored well (vs. engineer resolution) are promoted to the golden dataset
- The golden dataset is re-ingested as a knowledge base — future agents learn from it, avoiding re-investigation of known fault patterns
- **Curation is manual**: fully automated golden-dataset refinement was tried and failed; human review on a bi-daily/weekly cycle is required

> [!note] The golden dataset serves double duty: it is both an evaluation benchmark *and* a knowledge base that improves future agent accuracy. This creates a virtuous loop when curated correctly — and a poisoning risk if automated.

---

## Starting Small: Chase & Anthropic's Eval Guidance

[[3 - Areas/AIOps/wiki/entities/Harrison Chase]] and [[3 - Areas/AIOps/wiki/entities/Anthropic]] converge on practical eval advice for multi-agent systems:

- **Start with ~20 datapoints** — a small, hand-curated eval set is enough to begin iterating; don't wait for a large benchmark
- **LLM-as-judge** — use a second LLM to evaluate agent outputs (consistent with Adobe's Slack-thread methodology above)
- **Human testing is essential** — automated evals catch regressions but cannot replace human judgment for novel failure modes

> [!tip] The common thread across all eval approaches in this wiki (Grafana, Adobe, Chase, Anthropic): start small and iterate, don't try to build a comprehensive eval suite upfront.

---

## o11y-bench: Observability Agent Benchmark

[[3 - Areas/AIOps/wiki/entities/Grafana]] open-sourced [[3 - Areas/AIOps/wiki/entities/o11y-bench]] to establish industry standards for evaluating agentic observability systems. Unlike traditional LLM benchmarks that assess answer quality alone, o11y-bench tests what agents actually **query and do** — tool use, query generation, and task completion.

Key metrics from the benchmark:

- Root cause candidate hit rate
- Evidence citation accuracy
- Query generation success rate
- Hallucination rate
- Average investigation time
- Tool call success rate
- Wrong-effect-as-cause rate
- User adoption rate
- Human edit ratio

> [!tip] Evaluation shift
> o11y-bench reflects a broader industry shift: evaluating AI agents not by the quality of their answers but by the quality of their investigative process.

---

## Related

- [[3 - Areas/AIOps/wiki/concepts/LLM Agent]] — the primary subject of evals in this context
- [[3 - Areas/AIOps/wiki/concepts/Multi-Agent Architecture]] — evals must cover both coordinator routing and specialist behaviour
- [[3 - Areas/AIOps/wiki/entities/Grafana Assistant]] — production system where this eval methodology is applied
- [[3 - Areas/AIOps/wiki/entities/Adobe]] — production LLM-as-judge eval against real Slack incident threads; golden dataset curation

---

## Sources

- [[3 - Areas/AIOps/wiki/sources/[2025-06-07] Building AI Into Observability Workflows]]
- [[3 - Areas/AIOps/wiki/sources/[2026-04-14] Is AIOps the Future of Operations?]]
- [[3 - Areas/AIOps/wiki/sources/[2025-06-16] How and when to build multi-agent systems]]
- [[3 - Areas/AIOps/wiki/sources/[2026-05-13] Grafana 给 AI RCA 提了个醒]]
