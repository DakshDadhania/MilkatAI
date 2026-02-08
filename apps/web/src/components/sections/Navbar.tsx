"use client";

import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="#features" className="hover:text-white">
            {t.nav.features}
          </Link>
          <Link href="#use-cases" className="hover:text-white">
            {t.nav.useCases}
          </Link>
          <Link href="#testimonials" className="hover:text-white">
            {t.nav.stories}
          </Link>
          <Link href="#faq" className="hover:text-white">
            {t.nav.faq}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Link href="/login" className="text-sm font-semibold text-slate-200">
            {t.nav.signIn}
          </Link>
          <Button href="/signup">{t.nav.getStarted}</Button>
        </div>
      </Container>
    </header>
  );
}
