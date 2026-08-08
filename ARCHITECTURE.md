# LawLens — Architecture

## Overview
LawLens is an AI-powered legal document analysis tool. A user uploads a
contract (PDF or DOCX), the backend extracts the text, sends it to an LLM
with a structured legal-analysis prompt, and returns a breakdown of the
contract's summary, key clauses, risks, missing information, and
recommendations.

> Educational/hackathon project — not a substitute for professional legal advice.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Backend | FastAPI (Python) |
| AI Provider | Groq API — `llama-3.1-8b-instant` |
| Document parsing | PyMuPDF (PDF), python-docx (DOCX) |
| Report generation | reportlab (planned) |
| Config / secrets | python-dotenv (`.env`, gitignored) |

## Repository Structure

```
LawLens/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app entrypoint
│   │   ├── routes.py        # /upload endpoint
│   │   ├── ai.py            # Groq client + analyze_contract()
│   │   ├── prompts.py       # Structured legal-analysis prompt template
│   │   ├── config.py        # Env var loading
│   │   └── utils/
│   │       ├── pdf_reader.py
│   │       └── docx_reader.py
│   └── requirements.txt
├── LawLens/lawlens-frontend/  # React + Vite frontend
├── utils/                      # Standalone document-processing utilities
│   ├── pdf_reader.py
│   ├── docx_reader.py
│   ├── document_reader.py      # Auto-detects PDF vs DOCX
│   ├── text_cleaner.py         # Text cleaning/preprocessing
│   └── report_generator.py     # PDF report generation
└── requirements.txt
```

## Data Flow

1. **Upload** — User uploads a PDF/DOCX file via the React frontend to the
   FastAPI `/upload` endpoint.
2. **Type detection & extraction** — `routes.py` checks the file extension
   and routes to `pdf_reader.py` or `docx_reader.py` to extract raw text.
3. **AI analysis** — The extracted text is inserted into the
   `CONTRACT_ANALYSIS_PROMPT` template (`prompts.py`) and sent to Groq's
   `llama-3.1-8b-instant` model via `ai.py`.
4. **Response** — The model's structured analysis (summary, clauses, risks,
   missing info, recommendations) is returned as JSON to the frontend.

## Planned / In-Progress Components

The `utils/` directory contains additional processing modules
(`text_cleaner.py`, `report_generator.py`, `document_reader.py`) that are
not yet wired into the live request path. Next integration steps:

- Route extracted text through `text_cleaner.py` before it reaches the AI
  prompt, to strip boilerplate/noise from scanned or messy documents.
- Use `report_generator.py` to turn the AI's JSON analysis into a
  downloadable PDF report (per the "Generation of a final PDF analysis
  report" feature).
- Add explicit risk-score / risk-level computation as a discrete step
  rather than relying solely on free-text model output.

## Design Decisions

- **FastAPI** was chosen for a lightweight async API with automatic docs.
- **Groq** was chosen as the LLM backend for its free tier and fast
  inference on `llama-3.1-8b-instant`, keeping response latency low for a
  live demo.
- File uploads are written to a local `uploads/` folder (gitignored) rather
  than held only in memory, to simplify debugging during development.
