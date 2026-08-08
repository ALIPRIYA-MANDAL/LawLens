# LawLens - Build Script

## Project Overview

LawLens is an AI-powered contract analysis application.

Users can upload PDF or DOCX contracts, and the application:

- Extracts the contract text
- Uses AI to analyze the contract
- Calculates an overall risk score
- Identifies risky clauses
- Identifies missing clauses
- Provides recommendations
- Displays the results through a web interface

---

## Technology Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Python
- FastAPI
- Uvicorn
- PyMuPDF
- python-docx
- python-multipart
- python-dotenv
- Groq API

### AI

- Groq API
- LLM-based contract analysis
- Structured JSON output

---

# Prerequisites

Install the following:

- Python 3.11 or newer
- Node.js LTS
- npm
- Git

Check the installations:

```bash
python --3.14.5
node --version
npm --version
git 2.54.0.windows.1