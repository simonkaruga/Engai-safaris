"use client";

import { useState } from "react";
import { LOCALES, type Locale } from "@/lib/i18n";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = LOCALES[locale];

  return (
    <div className="relative">
      <button
        onMouseDown={(e) => { e.preventDefault(); setOpen((o) => !o); }}
        aria-label="Change language"
        className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-teal-DEFAULT px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden xl:inline">{locale.toUpperCase()}</span>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onMouseDown={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-1.5">
              {(Object.keys(LOCALES) as Locale[]).map((code) => {
                const l = LOCALES[code];
                const isActive = code === locale;
                return (
                  <button
                    key={code}
                    onClick={(e) => { e.stopPropagation(); setLocale(code); setOpen(false); }}
                    className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                      isActive
                        ? "bg-teal-DEFAULT/10 text-teal-DEFAULT font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-base leading-none">{l.flag}</span>
                    <span>{l.label}</span>
                    {isActive && (
                      <svg className="w-3.5 h-3.5 ml-auto text-teal-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
