# AGENTS.md — Rules for AI Coding Agents Working on LawLens

This file defines the conventions any AI coding agent (Cline, Roo Code, or
similar) must follow when generating or editing code in this repository.
It exists so that AI-assisted changes stay consistent, reviewable, and
safe, per the "Deploy or Die" hackathon's human-in-the-loop requirement.

## Project Context

LawLens is a legal-document analysis tool: FastAPI backend, React/Vite
frontend, Groq LLM for contract analysis. See `ARCHITECTURE.md` for the
full system design.

## General Rules

1. **Human-in-the-loop, always.** No agent may auto-commit, auto-push, or
   merge code without explicit review and approval from a team member.
   Propose changes; do not silently apply large-scale edits.
2. **No secrets in code.** API keys (`GROQ_API_KEY`, etc.) must only ever
   be read from environment variables via `.env` (gitignored). Never hardcode
   a key, never paste a real key into a prompt sent to an AI tool.
3. **Small, explained commits.** Each commit should represent one logical
   change (one feature, one fix, one refactor) with a clear message. Avoid
   large end-of-day dumps.
4. **Keep the existing structure.** New backend logic goes under
   `backend/app/`; new document-processing utilities go under `utils/`;
   frontend code stays under `LawLens/lawlens-frontend/src/`.
5. **Match existing style.** Python: PEP8, snake_case functions, type hints
   where practical. React: functional components with hooks.
6. **Every new feature needs a corresponding test or manual verification
   step noted in the PR/commit description**, even if full CI-integrated
   testing isn't in place yet.

## Coding Conventions

- Backend: FastAPI route handlers stay thin; business logic (parsing,
  prompting, analysis) lives in dedicated modules (`utils/`, `ai.py`),
  not inline in `routes.py`.
- Environment variables are loaded once via `config.py`/`load_dotenv()` —
  do not scatter `os.getenv()` calls across the codebase.
- Prompts sent to the LLM live in `prompts.py`, not inline strings in
  `ai.py`, so they stay easy to review and version.

## What Agents Should NOT Do

- Do not install new dependencies without adding them to the relevant
  `requirements.txt` / `package.json`.
- Do not remove or bypass the `.gitignore` entries for `.env`, `uploads/`,
  or `reports/`.
- Do not fabricate legal advice or claims in prompts/output — the tool is
  explicitly educational and must not present itself as a legal authority.

## Review Checklist Before Accepting an Agent's Change

- [ ] Does it run locally without errors?
- [ ] Are secrets still only in `.env`?
- [ ] Is the commit scoped to one clear change?
- [ ] Does it match the structure/conventions above?
