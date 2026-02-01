"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type AccessCodeResponse = {
  code: string;
  expiresAt: string;
};

export function AccessCodeCard() {
  const [code, setCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useI18n();

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/whatsapp/access-code", {
        method: "POST",
      });
      const payload = (await response.json()) as AccessCodeResponse & {
        error?: string;
      };
      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to generate code.");
      }
      setCode(payload.code);
      setExpiresAt(payload.expiresAt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">
        {t.app.dashboard.whatsappTitle}
      </h2>
      <p className="mt-2 text-sm text-zinc-600">
        {t.app.dashboard.whatsappDesc}
      </p>
      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading}
        className="mt-4 rounded-full bg-black px-5 py-2 text-xs font-semibold text-white hover:bg-zinc-800 disabled:opacity-60"
      >
        {loading ? "Generating..." : t.app.dashboard.whatsappButton}
      </button>
      {code ? (
        <div className="mt-4 rounded-2xl border border-dashed border-zinc-200 p-4 text-sm text-zinc-700">
          Code: <span className="font-semibold text-zinc-900">{code}</span>
          {expiresAt ? (
            <p className="mt-1 text-xs text-zinc-500">
              Expires at {new Date(expiresAt).toLocaleString()}
            </p>
          ) : null}
        </div>
      ) : null}
      {error ? <p className="mt-3 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
