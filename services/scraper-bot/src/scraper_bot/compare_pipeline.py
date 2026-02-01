from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable

from .models import DocumentLink


@dataclass(frozen=True)
class ComparisonIssue:
    title: str
    severity: str
    details: str


def compare_scrape_to_ocr(
    scraped: Iterable[DocumentLink], ocr_text: str
) -> list[ComparisonIssue]:
    normalized = ocr_text.lower()
    issues: list[ComparisonIssue] = []

    for doc in scraped:
        if not doc.doc_type:
            continue
        if doc.doc_type not in normalized:
            issues.append(
                ComparisonIssue(
                    title="Document type missing in OCR",
                    severity="Medium",
                    details=f"OCR text missing mention of {doc.doc_type}.",
                )
            )

    if not issues:
        issues.append(
            ComparisonIssue(
                title="No mismatches detected",
                severity="Low",
                details="Scraped items matched OCR text heuristics.",
            )
        )

    return issues
