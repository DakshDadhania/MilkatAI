export type LlmIssue = {
  title: string;
  severity: "Low" | "Medium" | "High";
  explanation: string;
  action: string;
};

export async function runLlmAnalysis(
  _ocrText: string
): Promise<{ summary: string; issues: LlmIssue[] }> {
  // Placeholder for LLM provider integration.
  return {
    summary: "LLM summary placeholder. Connect OpenAI/Gemini/Claude here.",
    issues: [
      {
        title: "Title verification",
        severity: "Medium",
        explanation: "Sample issue based on OCR text.",
        action: "Verify chain documents and check encumbrance.",
      },
    ],
  };
}
