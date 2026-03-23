export const CURRENCIES = {
  USD: { code: "USD", symbol: "$",    name: "US Dollar",          flag: "🇺🇸" },
  GBP: { code: "GBP", symbol: "£",    name: "British Pound",      flag: "🇬🇧" },
  EUR: { code: "EUR", symbol: "€",    name: "Euro",               flag: "🇪🇺" },
  KES: { code: "KES", symbol: "KES ", name: "Kenyan Shilling",    flag: "🇰🇪" },
  AUD: { code: "AUD", symbol: "A$",   name: "Australian Dollar",  flag: "🇦🇺" },
  CAD: { code: "CAD", symbol: "C$",   name: "Canadian Dollar",    flag: "🇨🇦" },
  CHF: { code: "CHF", symbol: "Fr",   name: "Swiss Franc",        flag: "🇨🇭" },
  SEK: { code: "SEK", symbol: "kr",   name: "Swedish Krona",      flag: "🇸🇪" },
  JPY: { code: "JPY", symbol: "¥",    name: "Japanese Yen",       flag: "🇯🇵" },
  INR: { code: "INR", symbol: "₹",    name: "Indian Rupee",       flag: "🇮🇳" },
  ZAR: { code: "ZAR", symbol: "R",    name: "South African Rand", flag: "🇿🇦" },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

// Fallback rates vs USD — updated quarterly, used when API is unavailable
export const FALLBACK_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92,
  KES: 130,
  AUD: 1.55,
  CAD: 1.37,
  CHF: 0.90,
  SEK: 10.4,
  JPY: 149,
  INR: 83.5,
  ZAR: 18.7,
};

const RATES_KEY    = "engai_fx_rates";
const RATES_TS_KEY = "engai_fx_rates_ts";
const TTL_MS       = 12 * 60 * 60 * 1000; // 12 hours

function loadCached(): Record<CurrencyCode, number> | null {
  try {
    const ts = parseInt(localStorage.getItem(RATES_TS_KEY) ?? "0", 10);
    if (Date.now() - ts > TTL_MS) return null;
    const raw = localStorage.getItem(RATES_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function fetchRates(): Promise<Record<CurrencyCode, number>> {
  const cached = loadCached();
  if (cached) return cached;

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!res.ok) throw new Error("Rate fetch failed");
    const data = await res.json();
    const rates = Object.fromEntries(
      (Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => [
        c,
        data.rates?.[c] ?? FALLBACK_RATES[c],
      ])
    ) as Record<CurrencyCode, number>;
    localStorage.setItem(RATES_KEY, JSON.stringify(rates));
    localStorage.setItem(RATES_TS_KEY, String(Date.now()));
    return rates;
  } catch {
    return FALLBACK_RATES;
  }
}

export function convert(
  amountUSD: number,
  currency: CurrencyCode,
  rates: Record<CurrencyCode, number>
): number {
  return amountUSD * (rates[currency] ?? FALLBACK_RATES[currency]);
}

export function format(amount: number, currency: CurrencyCode): string {
  const { symbol } = CURRENCIES[currency];
  // JPY and KES don't use decimals
  if (currency === "JPY" || currency === "KES") {
    return `${symbol}${Math.round(amount).toLocaleString()}`;
  }
  return `${symbol}${Math.round(amount).toLocaleString()}`;
}

export function formatPrice(
  amountUSD: number,
  currency: CurrencyCode,
  rates: Record<CurrencyCode, number>
): string {
  return format(convert(amountUSD, currency, rates), currency);
}

/** Detect best currency from browser locale — falls back to USD */
export function detectCurrency(): CurrencyCode {
  try {
    const lang = navigator.language ?? "en-US";
    if (/^en-GB|^en-IE/.test(lang))                              return "GBP";
    if (/^en-AU|^en-NZ/.test(lang))                              return "AUD";
    if (/^en-CA/.test(lang))                                     return "CAD";
    if (/^sw|^en-KE/.test(lang))                                 return "KES";
    if (/^de-CH|^fr-CH|^it-CH/.test(lang))                      return "CHF";
    if (/^de|^fr|^es|^it|^nl|^pt-PT|^fi|^el/.test(lang))       return "EUR";
    if (/^sv|^no|^da/.test(lang))                                return "SEK";
    if (/^ja/.test(lang))                                        return "JPY";
    if (/^hi|^mr|^gu|^bn/.test(lang))                           return "INR";
    if (/^af|^zu|^xh|^en-ZA/.test(lang))                        return "ZAR";
    return "USD";
  } catch {
    return "USD";
  }
}
