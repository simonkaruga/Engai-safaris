"use client";

import { useState } from "react";
import { CURRENCIES, CurrencyCode } from "@/lib/currency";
import { useCurrency } from "@/context/CurrencyContext";

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const current = CURRENCIES[currency];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-teal-DEFAULT px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
        aria-label="Change display currency"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span>{current.code}</span>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-1 z-50 w-52 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            <div className="p-1.5 max-h-80 overflow-y-auto">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                const c = CURRENCIES[code];
                const isActive = code === currency;
                return (
                  <button
                    key={code}
                    onClick={() => { setCurrency(code); setOpen(false); }}
                    className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                      isActive
                        ? "bg-teal-DEFAULT/10 text-teal-DEFAULT font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-base leading-none">{c.flag}</span>
                    <span className="font-medium">{c.code}</span>
                    <span className={`ml-auto text-xs ${isActive ? "text-teal-DEFAULT" : "text-gray-400"}`}>
                      {c.symbol}
                    </span>
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
