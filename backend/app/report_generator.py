from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.enums import TA_CENTER
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
import os


def generate_report(analysis, filename):
    os.makedirs("reports", exist_ok=True)

    safe_filename = os.path.splitext(filename)[0]
    report_path = os.path.join(
        "reports",
        f"{safe_filename}_LawLens_Report.pdf"
    )

    styles = getSampleStyleSheet()

    title_style = styles["Title"]
    title_style.alignment = TA_CENTER

    heading_style = styles["Heading2"]
    body_style = styles["BodyText"]

    doc = SimpleDocTemplate(
        report_path,
        pagesize=A4,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40,
    )

    story = []

    # Title
    story.append(
        Paragraph("LawLens Contract Analysis Report", title_style)
    )

    story.append(Spacer(1, 20))

    # Contract name
    contract_name = analysis.get(
        "contract_name",
        filename
    )

    story.append(
        Paragraph(
            f"<b>Contract:</b> {contract_name}",
            body_style
        )
    )

    story.append(Spacer(1, 10))

    # Risk score
    risk_score = analysis.get("risk_score", "N/A")
    risk_level = analysis.get("risk_level", "N/A")

    story.append(
        Paragraph(
            f"<b>Risk Score:</b> {risk_score}/100",
            body_style
        )
    )

    story.append(
        Paragraph(
            f"<b>Risk Level:</b> {risk_level}",
            body_style
        )
    )

    story.append(Spacer(1, 15))

    # Summary
    story.append(
        Paragraph("Summary", heading_style)
    )

    story.append(
        Paragraph(
            analysis.get("summary", "No summary available."),
            body_style
        )
    )

    story.append(Spacer(1, 20))

    # Risky clauses
    story.append(
        Paragraph("Risky Clauses", heading_style)
    )

    risky_clauses = analysis.get("risky_clauses", [])

    if risky_clauses:
        for index, clause in enumerate(risky_clauses, start=1):

            story.append(
                Paragraph(
                    f"<b>{index}. {clause.get('title', 'Untitled')}</b>",
                    body_style
                )
            )

            story.append(
                Paragraph(
                    f"<b>Risk:</b> {clause.get('risk', 'N/A')}",
                    body_style
                )
            )

            story.append(
                Paragraph(
                    f"<b>Explanation:</b> "
                    f"{clause.get('explanation', '')}",
                    body_style
                )
            )

            story.append(
                Paragraph(
                    f"<b>Recommendation:</b> "
                    f"{clause.get('recommendation', '')}",
                    body_style
                )
            )

            story.append(Spacer(1, 12))

    else:
        story.append(
            Paragraph(
                "No risky clauses were identified.",
                body_style
            )
        )

    story.append(Spacer(1, 10))

    # Missing clauses
    story.append(
        Paragraph("Missing Clauses", heading_style)
    )

    missing_clauses = analysis.get("missing_clauses", [])

    if missing_clauses:
        for index, clause in enumerate(missing_clauses, start=1):

            story.append(
                Paragraph(
                    f"<b>{index}. "
                    f"{clause.get('title', 'Untitled')}</b>",
                    body_style
                )
            )

            story.append(
                Paragraph(
                    clause.get("reason", ""),
                    body_style
                )
            )

            story.append(Spacer(1, 8))
    else:
        story.append(
            Paragraph(
                "No missing clauses were identified.",
                body_style
            )
        )

    story.append(Spacer(1, 10))

    # Recommendations
    story.append(
        Paragraph("Recommendations", heading_style)
    )

    recommendations = analysis.get("recommendations", [])

    if recommendations:
        for index, recommendation in enumerate(
            recommendations,
            start=1
        ):
            story.append(
                Paragraph(
                    f"{index}. {recommendation}",
                    body_style
                )
            )

            story.append(Spacer(1, 6))
    else:
        story.append(
            Paragraph(
                "No additional recommendations.",
                body_style
            )
        )

    story.append(Spacer(1, 25))

    # Disclaimer
    story.append(
        Paragraph(
            "<b>Disclaimer:</b> LawLens provides AI-generated "
            "contract analysis for informational purposes only. "
            "This report does not constitute legal advice.",
            body_style
        )
    )

    doc.build(story)

    return report_path