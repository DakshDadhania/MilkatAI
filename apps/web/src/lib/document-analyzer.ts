import { compareOcrWithScrape } from "@/lib/compare";
import { runLlmAnalysis } from "@/lib/llm";
import { runOcr } from "@/lib/ocr";

export async function analyzeDocument(
  fileBytes: ArrayBuffer,
  scrapedDocs: Array<{ doc_type?: string | null; label?: string | null }> = []
) {
  const ocr = await runOcr(fileBytes);
  const llm = await runLlmAnalysis(ocr.text);
  const comparison = scrapedDocs.length
    ? compareOcrWithScrape(ocr.text, scrapedDocs)
    : [];

  return {
    ocr,
    llm,
    comparison,
  };
}
