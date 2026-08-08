from fastapi import APIRouter, UploadFile, File
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os

from app.utils.pdf_reader import extract_text_from_pdf
from app.utils.docx_reader import extract_text_from_docx
from app.ai import analyze_contract
from app.prompts import CONTRACT_ANALYSIS_PROMPT
from app.report_generator import generate_report


router = APIRouter()

UPLOAD_FOLDER = "uploads"


@router.post("/upload")
async def upload_contract(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    if file.filename.endswith(".pdf"):
        text = extract_text_from_pdf(file_path)

    elif file.filename.endswith(".docx"):
        text = extract_text_from_docx(file_path)

    else:
        return {
            "error": "Only PDF and DOCX files are supported"
        }

    prompt = CONTRACT_ANALYSIS_PROMPT.format(
        text=text
    )

    analysis = analyze_contract(prompt)

    return {
        "filename": file.filename,
        "analysis": analysis
    }


class ReportRequest(BaseModel):
    filename: str
    analysis: dict


@router.post("/report")
async def create_report(request: ReportRequest):

    report_path = generate_report(
        request.analysis,
        request.filename
    )

    return FileResponse(
        report_path,
        media_type="application/pdf",
        filename=os.path.basename(report_path)
    )