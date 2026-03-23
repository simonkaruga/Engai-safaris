"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import CurrencySwitcher from "@/components/currency/CurrencySwitcher";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Safaris", href: "/safaris" },
  { label: "Destinations", href: "/destinations" },
  { label: "Guides", href: "/guides" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Transparent only on homepage before scroll
  const isTransparent = pathname === "/" && !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-16 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          {/* Leaf/acacia icon */}
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isTransparent ? "bg-white/20 backdrop-blur-sm" : "bg-teal-DEFAULT"
          }`}>
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21c1.94-.81 4.35-1.27 6.18-1 3-.5 7-3 7-12zm0 0c0 7.73-2.45 10.5-5 12" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <span className={`font-display font-bold text-lg leading-none block ${
              isTransparent ? "text-white" : "text-teal-DEFAULT"
            }`}>
              Engai Safaris
            </span>
            <span className={`text-[9px] tracking-[0.15em] uppercase leading-none ${
              isTransparent ? "text-white/60" : "text-gray-400"
            }`}>
              Kenya
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isTransparent
                    ? isActive
                      ? "text-white bg-white/15"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                    : isActive
                      ? "text-teal-DEFAULT bg-teal-50"
                      : "text-gray-600 hover:text-teal-DEFAULT hover:bg-teal-50"
                }`}
              >
                {item.label}
                {isActive && !isTransparent && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-teal-DEFAULT" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2">
          <CurrencySwitcher />
          <Link
            href="/plan-my-safari"
            className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5 ${
              isTransparent
                ? "text-white/85 hover:text-white hover:bg-white/10"
                : "text-teal-DEFAULT hover:bg-teal-50"
            }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            AI Planner
          </Link>
          <Link
            href="/enquire"
            className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
              isTransparent
                ? "bg-white text-teal-DEFAULT hover:bg-white/90 shadow-lg shadow-black/10"
                : "bg-teal-DEFAULT text-white hover:bg-teal-600 shadow-teal hover:shadow-lg"
            }`}
          >
            Book a Safari
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
            isTransparent
              ? "text-white hover:bg-white/10"
              : "text-gray-700 hover:bg-gray-100"
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
          <div className="px-4 py-4 space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-teal-DEFAULT hover:bg-teal-50 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="px-4 pb-4 pt-2 border-t border-gray-100 flex flex-col gap-2">
            <Link
              href="/plan-my-safari"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-teal-DEFAULT border border-teal-DEFAULT rounded-xl hover:bg-teal-50 transition-colors"
            >
              AI Safari Planner
            </Link>
            <Link
              href="/enquire"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center bg-teal-DEFAULT hover:bg-teal-600 text-white py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              Book a Safari
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
