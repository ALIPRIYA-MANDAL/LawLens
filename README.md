# LawLens

LawLens is an AI-powered legal document analysis system designed to help users understand contracts and identify potentially risky or missing clauses.

The system accepts legal documents such as PDF and DOCX files, extracts their text, analyzes the document using AI, and generates a structured legal analysis report.

> **Note:** LawLens is an educational/project tool and does not replace professional legal advice.

---

## Features

- Upload and process PDF documents
- Upload and process DOCX documents
- Automatic document type detection
- Text extraction from legal documents
- Text cleaning and preprocessing
- AI-based contract analysis
- Risk score and risk-level identification
- Detection of risky clauses
- Detection of missing clauses
- AI-generated recommendations
- Generation of a final PDF analysis report

---

## Project Structure

```text
LawLens/
│
├── utils/
│   ├── __init__.py
│   ├── pdf_reader.py
│   ├── docx_reader.py
│   ├── document_reader.py
│   ├── text_cleaner.py
│   └── report_generator.py
│
├── uploads/
│
├── reports/
│
├── requirements.txt
├── .gitignore
├── README.md
└── ...