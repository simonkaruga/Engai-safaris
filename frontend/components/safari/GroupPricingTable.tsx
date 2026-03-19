"use client";

import { useState } from "react";
import type { SafariDetail } from "@/types/api";
import { formatUSD, formatKES } from "@/lib/utils";

interface Props {
  safari: SafariDetail;
}

const PAX_OPTIONS = [
  { label: "Solo", usdKey: "price_usd_solo", kesKey: "price_kes_solo" },
  { label: "2 people", usdKey: "price_usd_2pax", kesKey: "price_kes_2pax" },
  { label: "4 people", usdKey: "price_usd_4pax", kesKey: "price_kes_4pax" },
  { label: "6 people", usdKey: "price_usd_6pax", kesKey: "price_kes_6pax" },
] as const;

export default function GroupPricingTable({ safari }: Props) {
  const [currency, setCurrency] = useState<"usd" | "kes">("usd");

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Pricing</h3>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 text-sm">
          <button
            onClick={() => setCurrency("usd")}
            className={`px-3 py-1 font-medium transition-colors ${currency === "usd" ? "bg-teal-DEFAULT text-white" : "text-gray-600 hover:bg-gray-50"}`}
          >
            USD
          </button>
          <button
            onClick={() => setCurrency("kes")}
            className={`px-3 py-1 font-medium transition-colors ${currency === "kes" ? "bg-teal-DEFAULT text-white" : "text-gray-600 hover:bg-gray-50"}`}
          >
            KES
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {PAX_OPTIONS.map(({ label, usdKey, kesKey }) => {
          const price = currency === "usd" ? safari[usdKey] : safari[kesKey];
          if (!price) return null;
          return (
            <div key={label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-600">{label}</span>
              <span className="font-bold text-teal-DEFAULT">
                {currency === "usd" ? formatUSD(price) : formatKES(price)}
                <span className="text-xs font-normal text-gray-400">/pp</span>
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 mt-3">
        Seasonal pricing applies. Peak season (Jul–Oct) +40%. Low season (Apr–May, Nov) -25%.
      </p>
    </div>
  );
}
