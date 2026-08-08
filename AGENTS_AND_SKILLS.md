# AGENTS_AND_SKILLS.md

This documents the custom agent and custom skill built for LawLens, as
required by the hackathon's non-negotiable checkpoints.

> Note: this file describes what should be implemented and committed to
> the repo. Fill in the "Implementation" line for each once the code is
> committed, and link the actual file path.

---

## Custom Agent: Clause Risk Analyst

**Purpose:** A focused AI agent role, distinct from a generic "summarize
this document" prompt, that specifically hunts for risky and missing
clauses in a contract and scores overall risk.

**Behavior:**
- Given extracted contract text, identifies clauses that are ambiguous,
  one-sided, or commonly associated with legal risk (e.g. unlimited
  liability, auto-renewal without notice, vague termination terms).
- Flags standard clauses that are *absent* from the document (e.g. no
  confidentiality clause, no dispute-resolution clause).
- Assigns a risk score/level (Low / Medium / High) based on the count and
  severity of flagged issues.
- Does not give legal advice — only flags patterns for human review.

**Implementation:** `backend/app/ai.py` + `backend/app/prompts.py`
(`CONTRACT_ANALYSIS_PROMPT`), invoked via `analyze_contract()`.

---

## Custom Skill: Legal Document Report Generation

**Purpose:** A reusable capability that takes structured analysis output
(summary, clauses, risks, missing info, recommendations) and turns it into
a clean, shareable PDF report — independent of which document or which LLM
call produced the analysis.

**Behavior:**
- Accepts the structured analysis (JSON/dict) as input.
- Formats it into readable sections with headings.
- Outputs a PDF file to `reports/`.
- Can be reused for any future document type or analysis pipeline, not
  just the current `/upload` route.

**Implementation:** `utils/report_generator.py` (using `reportlab`).

---

## Status

| Component | Status |
|---|---|
| Clause Risk Analyst (agent) | Prompt-based, implemented in `prompts.py` / `ai.py` |
| Report Generation (skill) | Module exists in `utils/report_generator.py`; not yet wired into `/upload` route — next step is to call it from `routes.py` and return a downloadable report link |
