type ScrapedDoc = {
  doc_type?: string | null;
  label?: string | null;
};

export type CompareIssue = {
  title: string;
  severity: "Low" | "Medium" | "High";
  details: string;
};

export function compareOcrWithScrape(
  ocrText: string,
  scrapedDocs: ScrapedDoc[]
): CompareIssue[] {
  const normalized = ocrText.toLowerCase();
  const issues: CompareIssue[] = [];

  for (const doc of scrapedDocs) {
    if (!doc.doc_type) continue;
    if (!normalized.includes(doc.doc_type.toLowerCase())) {
      issues.push({
        title: "Scraped doc type missing in OCR",
        severity: "Medium",
        details: `OCR text missing mention of ${doc.doc_type}.`,
      });
    }
  }

  if (!issues.length) {
    issues.push({
      title: "No mismatches detected",
      severity: "Low",
      details: "OCR text aligns with scraped document hints.",
    });
  }

  return issues;
}
