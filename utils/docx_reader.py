from docx import Document


def extract_text_from_docx(docx_path):
    document = Document(docx_path)

    text = ""

    for paragraph in document.paragraphs:
        if paragraph.text.strip():
            text += paragraph.text + "\n"

    return text