"use client";

import Script from "next/script";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

type PaymentButtonProps = {
  amount?: number;
};

export function PaymentButton({ amount = 199900 }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const { t } = useI18n();

  async function handlePayment() {
    setLoading(true);
    try {
      const response = await fetch("/api/payments/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to create order.");
      }

      const RazorpayCtor = window.Razorpay;
      if (!RazorpayCtor) {
        throw new Error("Razorpay SDK not loaded.");
      }

      const razorpay = new RazorpayCtor({
        key: payload.key,
        order_id: payload.orderId,
        amount: payload.amount,
        currency: payload.currency,
        name: "MilkatAI",
        description: "MilkatAI subscription",
        theme: { color: "#7c3aed" },
      });

      razorpay.open();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button
        type="button"
        onClick={handlePayment}
        disabled={loading}
        className="rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:brightness-110 disabled:opacity-60"
      >
        {loading ? "Starting payment..." : t.app.dashboard.payButton}
      </button>
    </>
  );
}
