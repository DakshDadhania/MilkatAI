"use client";

import { AccessCodeCard } from "@/components/AccessCodeCard";
import { PaymentButton } from "@/components/PaymentButton";
import { useI18n } from "@/lib/i18n";

type DashboardOverviewProps = {
  status: string;
};

export function DashboardOverview({ status }: DashboardOverviewProps) {
  const { t } = useI18n();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_-40px_rgba(56,189,248,0.5)] backdrop-blur">
        <h1 className="text-2xl font-semibold text-white">
          {t.app.dashboard.title}
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          {t.app.dashboard.statusLabel}:{" "}
          <span className="font-semibold text-white">{status}</span>
        </p>
        <div className="mt-6">
          {status === "active" ? (
            <p className="text-sm text-emerald-300">
              {t.app.dashboard.activeNote}
            </p>
          ) : (
            <PaymentButton />
          )}
        </div>
      </div>
      {status === "active" ? <AccessCodeCard /> : null}
    </div>
  );
}
