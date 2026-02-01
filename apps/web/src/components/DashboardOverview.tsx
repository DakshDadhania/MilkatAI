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
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-zinc-900">
          {t.app.dashboard.title}
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          {t.app.dashboard.statusLabel}:{" "}
          <span className="font-semibold text-zinc-900">{status}</span>
        </p>
        <div className="mt-6">
          {status === "active" ? (
            <p className="text-sm text-green-600">{t.app.dashboard.activeNote}</p>
          ) : (
            <PaymentButton />
          )}
        </div>
      </div>
      {status === "active" ? <AccessCodeCard /> : null}
    </div>
  );
}
