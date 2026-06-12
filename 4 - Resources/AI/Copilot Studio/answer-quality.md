# Agent Answer Quality

Currently, we primarily benchmark answer quality by comparing responses from Rovo and Copilot Studio. Unlike Rovo, which can simply use Confluence directly as the agent's knowledge base (KB), Copilot Studio — while also capable of connecting to Confluence — exhibits issues such as slow indexing, imprecise retrieval, and inconsistent grounding. This article outlines how to help Copilot Studio improve its answer quality.

---

## Background

Given the challenges Copilot Studio faces when using Confluence as a KB, we have currently scoped the KB to only the **MITDC CD HK DEVOPS** Confluence space to minimize retrieval noise and establish a controlled baseline.

---

## Debugging & Tuning Methodology

### Rovo Response as Reference

Rovo's responses typically include cited article links, as shown below:

![](9%20-%20Assets/Others/SCR-20260610-izpm.png)

You can also prompt the agent directly with _"Which articles did you query to generate this response?"_ to have it list the retrieved documents:

![](9%20-%20Assets/Others/SCR-20260610-iztw.png)

These cited pages serve as a **ground-truth set** that should ideally be surfaced by Copilot Studio as well.

### Update the KB

To improve Copilot Studio's answer quality, add the Confluence articles referenced in Rovo's responses into the **MITDC CD HK DEVOPS** space.

You can monitor the KB indexing progress from the configuration page:

![](9%20-%20Assets/Others/SCR-20260610-jact.png)

>  Note: The entire indexing process may take 2–4 hours. Even if the page shows ready, please rely on actual testing results.

### Test & Validate

Use the agent's built-in test feature to verify the response quality. You can see both the agent's reply and the referenced article links it used:

![](9%20-%20Assets/Others/SCR-20260610-pkjy.png)
---

## Summary

The key to improving Copilot Studio's answer quality lies in **curating authoritative KB content** and **validating through iterative testing**. Regularly compare against a reference agent (like Rovo), enrich your indexed knowledge base, and verify through controlled test queries — the same feedback-loop mentality that underpins DevOps continuous improvement.
