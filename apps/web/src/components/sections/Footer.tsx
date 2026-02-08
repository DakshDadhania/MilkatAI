"use client";

import Link from "next/link";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-white/10 bg-slate-950/80 py-12">
      <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Logo />
        <div className="flex flex-wrap gap-6 text-sm text-slate-300">
          <Link href="#features" className="hover:text-white">
            {t.nav.features}
          </Link>
          <Link href="#use-cases" className="hover:text-white">
            {t.nav.useCases}
          </Link>
          <Link href="#faq" className="hover:text-white">
            {t.nav.faq}
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
        </div>
        <p className="text-xs text-slate-400">
          © 2026 MilkatAI. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
