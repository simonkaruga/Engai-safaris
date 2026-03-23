"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  CurrencyCode,
  CURRENCIES,
  FALLBACK_RATES,
  fetchRates,
  detectCurrency,
} from "@/lib/currency";

// Re-export so consumers don't need a separate import
export type { CurrencyCode };

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  rates: Record<CurrencyCode, number>;
  isLoading: boolean;
}

// Seed context with fallback rates so SSR never throws
const defaultRates = Object.fromEntries(
  (Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => [c, FALLBACK_RATES[c]])
) as Record<CurrencyCode, number>;

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "USD",
  setCurrency: () => {},
  rates: defaultRates,
  isLoading: true,
});

const PREF_KEY = "engai_currency";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(defaultRates);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(PREF_KEY) as CurrencyCode | null;
    const initial = saved && saved in CURRENCIES ? saved : detectCurrency();
    setCurrencyState(initial);

    fetchRates().then((r) => {
      setRates(r);
      setIsLoading(false);
    });
  }, []);

  function setCurrency(c: CurrencyCode) {
    setCurrencyState(c);
    localStorage.setItem(PREF_KEY, c);
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
