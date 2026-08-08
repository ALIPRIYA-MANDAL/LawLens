from fastapi import APIRouter, UploadFile, File
import os

from app.utils.pdf_reader import extract_text_from_pdf
from app.utils.docx_reader import extract_text_from_docx
from app.ai import analyze_contract

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


    analysis = analyze_contract(text)

    return {
        "filename": file.filename,
        "analysis": analysis
    }