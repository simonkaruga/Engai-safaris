"use client";

import type { SafariDetail } from "@/types/api";
import { useCurrency } from "@/context/CurrencyContext";
import { formatPrice, CURRENCIES } from "@/lib/currency";

interface Props {
  safari: SafariDetail;
}

const PAX_OPTIONS = [
  { label: "Solo traveller", usdKey: "price_usd_solo" as const, perPax: 1 },
  { label: "2 people",       usdKey: "price_usd_2pax" as const, perPax: 2 },
  { label: "4 people",       usdKey: "price_usd_4pax" as const, perPax: 4 },
  { label: "6 people",       usdKey: "price_usd_6pax" as const, perPax: 6 },
];

export default function GroupPricingTable({ safari }: Props) {
  const { currency, rates } = useCurrency();
  const sym = CURRENCIES[currency].symbol;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Pricing</h3>
        <span className="text-xs text-gray-400 font-medium">
          Showing {CURRENCIES[currency].name}
        </span>
      </div>

      <div className="space-y-2">
        {PAX_OPTIONS.map(({ label, usdKey, perPax }) => {
          const totalUSD = safari[usdKey];
          if (!totalUSD) return null;
          const ppUSD = totalUSD / perPax;
          return (
            <div key={label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-600">{label}</span>
              <div className="text-right">
                <span className="font-bold text-teal-DEFAULT">
                  {formatPrice(ppUSD, currency, rates)}
                  <span className="text-xs font-normal text-gray-400">/pp</span>
                </span>
                {currency !== "USD" && (
                  <p className="text-[10px] text-gray-400">~${Math.round(ppUSD).toLocaleString()} USD</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 mt-3">
        Group total for the vehicle. Peak season (Jul–Oct) +60%. Low season (Apr–May) −25%.
      </p>
    </div>
  );
}
