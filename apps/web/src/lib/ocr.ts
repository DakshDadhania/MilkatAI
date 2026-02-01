export type OcrResult = {
  text: string;
  language: "gu" | "en" | "mixed";
};

export async function runOcr(_fileBytes: ArrayBuffer): Promise<OcrResult> {
  // Placeholder for OCR provider integration.
  return {
    text: "OCR output placeholder. Connect your OCR provider here.",
    language: "mixed",
  };
}
