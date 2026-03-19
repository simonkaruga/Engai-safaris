import Link from "next/link";
import type { SafariDetail } from "@/types/api";
import { formatUSD, formatKES } from "@/lib/utils";

interface Props {
  safari: SafariDetail;
}

const PARTNER_HOTELS = [
  { name: "Baobab Beach Resort & Spa", tier: "Luxury", price: 280 },
  { name: "Leopard Beach Resort & Spa", tier: "Luxury", price: 240 },
  { name: "Diani Reef Beach Resort", tier: "Standard", price: 160 },
];

export default function BeachExtensionCard({ safari }: Props) {
  if (!safari.has_beach_extension) return null;

  const days = safari.beach_extension_days ?? 3;
  const priceUsd = safari.beach_extension_price_usd;
  const priceKes = safari.beach_extension_price_kes;

  return (
    <div className="border-2 border-teal-DEFAULT rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-teal-DEFAULT text-white px-5 py-3 flex items-center gap-2">
        <span className="text-xl">🏖️</span>
        <div>
          <p className="font-bold text-sm">Add Diani Beach Extension</p>
          <p className="text-teal-100 text-xs">{days} nights · Indian Ocean · Coral reef</p>
        </div>
      </div>

      <div className="p-5 bg-white space-y-4">
        <p className="text-gray-600 text-sm leading-relaxed">
          Kenya's most popular add-on. Fly Nairobi → Mombasa (45 min, ~$80pp) and spend{" "}
          {days} nights on Africa's finest white sand beach.
        </p>

        {/* Price */}
        {priceUsd && (
          <div className="bg-teal-50 rounded-lg p-3 flex justify-between items-center">
            <span className="text-sm text-gray-600">Add-on price (per person)</span>
            <div className="text-right">
              <p className="font-bold text-teal-DEFAULT">{formatUSD(priceUsd)}</p>
              {priceKes && <p className="text-xs text-gray-400">{formatKES(priceKes)}</p>}
            </div>
          </div>
        )}

        {/* Partner hotels */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Partner Hotels
          </p>
          <div className="space-y-2">
            {PARTNER_HOTELS.map((hotel) => (
              <div key={hotel.name} className="flex justify-between items-center text-sm">
                <div>
                  <span className="font-medium">{hotel.name}</span>
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                    hotel.tier === "Luxury"
                      ? "bg-gold-50 text-gold-DEFAULT"
                      : "bg-gray-100 text-gray-600"
                  }`}>{hotel.tier}</span>
                </div>
                <span className="text-gray-500 text-xs">from ${hotel.price}/night</span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-1.5 text-xs text-gray-600">
          {["White sand beach", "Coral reef snorkelling", "Dolphin watching", "Fort Jesus UNESCO"].map((h) => (
            <div key={h} className="flex items-center gap-1">
              <span className="text-teal-DEFAULT">✓</span> {h}
            </div>
          ))}
        </div>

        <Link
          href={`/enquire?safari=${safari.slug}&addon=beach`}
          className="block w-full bg-teal-DEFAULT hover:bg-teal-600 text-white text-center py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          Add Beach Extension →
        </Link>

        <Link
          href="/safaris/diani-beach-3-nights"
          className="block text-center text-xs text-teal-DEFAULT hover:underline"
        >
          View Diani Beach package details
        </Link>
      </div>
    </div>
  );
}
