"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useI18n } from "@/lib/i18n";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useI18n();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const name = String(formData.get("name") || "");

    try {
      if (mode === "signup") {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });

        if (!response.ok) {
          const payload = await response.json();
          throw new Error(payload.error ?? "Unable to sign up.");
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_-40px_rgba(139,92,246,0.5)] backdrop-blur">
      <h1 className="text-2xl font-semibold text-white">
        {mode === "login" ? t.app.auth.loginTitle : t.app.auth.signupTitle}
      </h1>
      <p className="mt-2 text-sm text-slate-300">
        {mode === "login"
          ? t.app.auth.loginSubtitle
          : t.app.auth.signupSubtitle}
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {mode === "signup" ? (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              {t.app.auth.nameLabel}
            </label>
            <input
              name="name"
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-white"
              placeholder={t.app.auth.namePlaceholder}
            />
          </div>
        ) : null}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">
            {t.app.auth.emailLabel}
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-white"
            placeholder={t.app.auth.emailPlaceholder}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">
            {t.app.auth.passwordLabel}
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-white"
            placeholder={t.app.auth.passwordPlaceholder}
          />
        </div>
        {error ? (
          <p className="text-xs text-rose-300">{error}</p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:brightness-110 disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : mode === "login"
            ? t.app.auth.loginButton
            : t.app.auth.signupButton}
        </button>
      </form>
      <p className="mt-4 text-xs text-slate-400">
        {mode === "login" ? (
          <>
            {t.app.auth.loginSwitch}{" "}
            <Link href="/signup" className="text-white">
              {t.nav.getStarted}
            </Link>
          </>
        ) : (
          <>
            {t.app.auth.signupSwitch}{" "}
            <Link href="/login" className="text-white">
              {t.nav.signIn}
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
