from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


def generate_report(analysis, output_path):
    """
    Generate a PDF report from AI analysis.

    Args:
        analysis (dict): Structured analysis received from the AI module.
        output_path (str): Path where the PDF report will be saved.
    """

    document = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=50,
        leftMargin=50,
        topMargin=50,
        bottomMargin=50,
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "ReportTitle",
        parent=styles["Title"],
        alignment=TA_CENTER,
        spaceAfter=20,
    )

    heading_style = styles["Heading2"]
    body_style = styles["BodyText"]

    story = []

    # Title
    story.append(
        Paragraph("LawLens Legal Document Analysis Report", title_style)
    )

    # Summary
    story.append(Paragraph("Summary", heading_style))

    summary = analysis.get("summary", "No summary available.")
    story.append(Paragraph(summary, body_style))
    story.append(Spacer(1, 15))

    # Overall risk
    story.append(Paragraph("Overall Risk Level", heading_style))

    risk_level = analysis.get("risk_level", "Not available")

    risk_table = Table(
        [["Risk Level", risk_level]],
        colWidths=[150, 250],
    )

    risk_table.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 1, colors.grey),
                ("BACKGROUND", (0, 0), (0, 0), colors.lightgrey),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )

    story.append(risk_table)
    story.append(Spacer(1, 15))

    # Risky clauses
    story.append(Paragraph("Risky Clauses", heading_style))

    risky_clauses = analysis.get("risky_clauses", [])

    if risky_clauses:
        for clause in risky_clauses:
            clause_title = clause.get("clause", "Unnamed clause")
            issue = clause.get("issue", "No issue provided.")
            recommendation = clause.get(
                "recommendation",
                "No recommendation provided.",
            )

            story.append(
                Paragraph(f"<b>Clause:</b> {clause_title}", body_style)
            )

            story.append(
                Paragraph(f"<b>Issue:</b> {issue}", body_style)
            )

            story.append(
                Paragraph(
                    f"<b>Recommendation:</b> {recommendation}",
                    body_style,
                )
            )

            story.append(Spacer(1, 10))

    else:
        story.append(
            Paragraph("No risky clauses identified.", body_style)
        )

    # Recommendations
    story.append(Paragraph("General Recommendations", heading_style))

    recommendations = analysis.get("recommendations", [])

    if recommendations:
        for recommendation in recommendations:
            story.append(
                Paragraph(
                    f"• {recommendation}",
                    body_style,
                )
            )
            story.append(Spacer(1, 5))
    else:
        story.append(
            Paragraph("No recommendations available.", body_style)
        )

    document.build(story)