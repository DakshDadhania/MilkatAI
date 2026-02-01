"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type AnalysisResult = {
  ocr: { text: string; language: string };
  llm: { summary: string; issues: Array<{ title: string; severity: string }> };
  comparison?: Array<{ title: string; severity: string; details: string }>;
};

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [scrapeJson, setScrapeJson] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useI18n();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (scrapeJson.trim()) {
        formData.append("scrape", scrapeJson);
      }
      const response = await fetch("/api/documents/analyze", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to analyze document.");
      }
      setResult(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold text-zinc-900">
          {t.app.upload.title}
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          {t.app.upload.subtitle}
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="file"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm"
          />
          <textarea
            value={scrapeJson}
            onChange={(event) => setScrapeJson(event.target.value)}
            placeholder={t.app.upload.scrapeHint}
            className="h-28 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs"
          />
          <button
            type="submit"
            disabled={loading || !file}
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-60"
          >
            {loading ? t.app.upload.analyzing : t.app.upload.button}
          </button>
        </form>
        {error ? <p className="mt-4 text-xs text-red-600">{error}</p> : null}
        {result ? (
          <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-zinc-900">
              {t.app.upload.summary}
            </h2>
            <p className="mt-2 text-sm text-zinc-600">{result.llm.summary}</p>
            <h3 className="mt-4 text-sm font-semibold text-zinc-900">
              {t.app.upload.issues}
            </h3>
            <ul className="mt-2 space-y-2 text-sm text-zinc-600">
              {result.llm.issues.map((issue) => (
                <li key={issue.title}>
                  {issue.title} • {issue.severity}
                </li>
              ))}
            </ul>
            {result.comparison?.length ? (
              <>
                <h3 className="mt-4 text-sm font-semibold text-zinc-900">
                  {t.app.upload.comparison}
                </h3>
                <ul className="mt-2 space-y-2 text-sm text-zinc-600">
                  {result.comparison.map((issue) => (
                    <li key={issue.title}>
                      {issue.title} • {issue.severity}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            <h3 className="mt-4 text-sm font-semibold text-zinc-900">
              {t.app.upload.ocrExcerpt}
            </h3>
            <p className="mt-2 text-xs text-zinc-500">{result.ocr.text}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
