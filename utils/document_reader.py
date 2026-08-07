import os

from utils.pdf_reader import extract_text_from_pdf
from utils.docx_reader import extract_text_from_docx


def extract_text(file_path):
    """
    Extract text from a PDF or DOCX file.

    Args:
        file_path (str): Path to the document.

    Returns:
        str: Extracted text.

    Raises:
        ValueError: If the file type is not supported.
    """

    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".pdf":
        return extract_text_from_pdf(file_path)

    elif extension == ".docx":
        return extract_text_from_docx(file_path)

    else:
        raise ValueError(
            f"Unsupported file type: {extension}. "
            "Only PDF and DOCX files are supported."
        )