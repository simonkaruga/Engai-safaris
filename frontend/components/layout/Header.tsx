"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import CurrencySwitcher from "@/components/currency/CurrencySwitcher";
import LanguageSwitcher from "@/components/language/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

const NAV_HREFS = [
  { key: "nav.home" as const,         href: "/" },
  { key: "nav.safaris" as const,      href: "/safaris" },
  { key: "nav.destinations" as const, href: "/destinations" },
  { key: "nav.guides" as const,       href: "/guides" },
  { key: "nav.reviews" as const,      href: "/reviews" },
  { key: "nav.blog" as const,         href: "/blog" },
  { key: "nav.about" as const,        href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isTransparent = pathname === "/" && !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-16 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Engai Safaris"
            width={140}
            height={44}
            className={`h-10 w-auto object-contain ${isTransparent ? "brightness-0 invert" : ""}`}
            priority
          />
          <div className="hidden sm:block">
            <span className={`font-display font-bold text-xl leading-none block ${
              isTransparent ? "text-white" : "text-teal-DEFAULT"
            }`}>
              Engai Safaris
            </span>
            <span className={`text-[9px] tracking-[0.16em] uppercase leading-none ${
              isTransparent ? "text-white/60" : "text-gray-400"
            }`}>
              Kenya
            </span>
          </div>
        </Link>

        {/* Desktop nav — visible from lg */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_HREFS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-2.5 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  isTransparent
                    ? isActive
                      ? "text-white bg-white/15"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                    : isActive
                      ? "text-teal-DEFAULT bg-teal-50"
                      : "text-gray-600 hover:text-teal-DEFAULT hover:bg-teal-50"
                }`}
              >
                {t(item.key)}
                {isActive && !isTransparent && (
                  <span className="absolute bottom-0.5 left-2.5 right-2.5 h-0.5 rounded-full bg-teal-DEFAULT" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-1 flex-shrink-0">
          <LanguageSwitcher />
          <CurrencySwitcher />

          {/* Wildlife ID — icon+text on xl, icon only on md/lg */}
          <Link
            href="/wildlife-id"
            title="AI Wildlife Identifier"
            className={`p-2 xl:px-3 rounded-lg transition-colors inline-flex items-center gap-1.5 ${
              isTransparent
                ? "text-white/85 hover:text-white hover:bg-white/10"
                : "text-gray-500 hover:text-teal-DEFAULT hover:bg-teal-50"
            }`}
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
            <span className="hidden xl:inline text-sm font-medium">{t("header.wildlifeId")}</span>
          </Link>

          {/* AI Planner — icon+text on xl, icon only on md/lg */}
          <Link
            href="/plan-my-safari"
            title="AI Safari Planner"
            className={`p-2 xl:px-3 rounded-lg transition-colors inline-flex items-center gap-1.5 ${
              isTransparent
                ? "text-white/85 hover:text-white hover:bg-white/10"
                : "text-gray-500 hover:text-teal-DEFAULT hover:bg-teal-50"
            }`}
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            <span className="hidden xl:inline text-sm font-medium">{t("header.aiPlanner")}</span>
          </Link>

          <div className={`w-px h-4 mx-0.5 ${isTransparent ? "bg-white/20" : "bg-gray-200"}`} />

          <Link
            href="/safaris"
            className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              isTransparent
                ? "bg-white text-teal-DEFAULT hover:bg-white/90 shadow-lg shadow-black/10"
                : "bg-teal-DEFAULT text-white hover:bg-teal-600"
            }`}
          >
            {t("header.bookNow")}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("header.closeMenu") : t("header.openMenu")}
          className={`md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
            isTransparent ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {open ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div id="mobile-menu" role="dialog" aria-label="Navigation menu" className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-3 space-y-0.5">
            {NAV_HREFS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-teal-DEFAULT hover:bg-teal-50 rounded-lg transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
          <div className="px-4 pb-4 pt-2 border-t border-gray-100 flex flex-col gap-2">
            <div className="flex items-center gap-2 pb-1">
              <LanguageSwitcher />
              <CurrencySwitcher />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/wildlife-id"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-teal-50 hover:text-teal-DEFAULT hover:border-teal-200 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </svg>
                {t("header.wildlifeId")}
              </Link>
              <Link
                href="/plan-my-safari"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-medium text-teal-DEFAULT border border-teal-DEFAULT rounded-xl hover:bg-teal-50 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                {t("header.aiPlanner")}
              </Link>
            </div>
            <Link
              href="/safaris"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center bg-teal-DEFAULT hover:bg-teal-600 text-white py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              {t("header.bookSafari")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
