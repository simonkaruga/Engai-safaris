"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MPesaLogo, VisaLogo, MastercardLogo } from "@/components/ui/PaymentLogos";
import type { SafariDetail } from "@/types/api";

interface Props {
  safari: SafariDetail;
}

function formatKES(n: number) {
  return `KES ${Math.round(n).toLocaleString("en-KE")}`;
}
function formatUSD(n: number) {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

const PEAK = new Set([7, 8, 9, 10]);
const LOW  = new Set([4, 5]);

function getSeason(dateStr: string): { label: string; multiplier: number; color: string } {
  const m = new Date(dateStr).getMonth() + 1;
  if (PEAK.has(m)) return { label: "Peak season +35%", multiplier: 1.35, color: "text-amber-600 bg-amber-50 border-amber-200" };
  if (LOW.has(m))  return { label: "Green season −25%", multiplier: 0.75, color: "text-teal-600 bg-teal-50 border-teal-200" };
  return { label: "Standard season", multiplier: 1.0, color: "text-gray-500 bg-gray-50 border-gray-200" };
}

function getBaseUSD(safari: SafariDetail, pax: number): number | null {
  if (pax === 1) return safari.price_usd_solo ?? null;
  if (pax <= 3)  return safari.price_usd_2pax ?? null;
  if (pax <= 5)  return safari.price_usd_4pax ?? null;
  return safari.price_usd_6pax ?? null;
}

const USD_TO_KES = 130;

export default function BookingSidebar({ safari }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState("");
  const [pax, setPax] = useState(2);

  const base = getBaseUSD(safari, pax);
  const season = date ? getSeason(date) : null;
  const totalUSD = base && season ? Math.round(base * season.multiplier * pax) : null;
  const totalKES = totalUSD ? Math.round(totalUSD * USD_TO_KES) : null;
  const depositKES = totalKES ? Math.round(totalKES * safari.deposit_pct / 100) : null;
  const balanceKES = totalKES && depositKES ? totalKES - depositKES : null;

  const bookHref = date
    ? `/book?safari=${safari.slug}&date=${date}&pax=${pax}`
    : `/book?safari=${safari.slug}&pax=${pax}`;

  return (
    <div className="bg-white border-2 border-teal-DEFAULT rounded-2xl overflow-hidden shadow-lg sticky top-24">

      {/* Header */}
      <div className="bg-teal-DEFAULT px-5 py-4">
        <p className="text-teal-100 text-xs font-semibold uppercase tracking-widest mb-0.5">Instant Booking</p>
        <div className="flex items-end justify-between">
          <div>
            {base ? (
              <>
                <p className="text-white font-display font-bold text-3xl">
                  {formatUSD(base)}
                  <span className="text-teal-200 text-sm font-normal">/pp</span>
                </p>
                <p className="text-teal-200 text-xs">from · 2 people · standard season</p>
              </>
            ) : (
              <p className="text-white font-bold text-xl">Select group size</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-teal-200 text-xs">{safari.deposit_pct}% deposit</p>
            <p className="text-white text-sm font-semibold">to confirm</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">

        {/* Group size */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Group Size</label>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { label: "Solo", value: 1 },
              { label: "2", value: 2 },
              { label: "4", value: 4 },
              { label: "6+", value: 6 },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setPax(value)}
                className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                  pax === value
                    ? "bg-teal-DEFAULT text-white border-teal-DEFAULT shadow-sm"
                    : "border-gray-200 text-gray-600 hover:border-teal-DEFAULT hover:text-teal-DEFAULT bg-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Date picker */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Departure Date</label>
          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-teal-DEFAULT transition-colors text-sm font-medium"
          />
        </div>

        {/* Live price breakdown */}
        {totalKES && season && depositKES && balanceKES ? (
          <div className="bg-gray-950 rounded-xl p-4 space-y-2.5">
            <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${season.color}`}>
              {season.label}
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total ({pax} {pax === 1 ? "person" : "people"})</span>
                <div className="text-right">
                  <span className="text-white font-bold">{formatKES(totalKES)}</span>
                  <span className="text-gray-500 text-xs ml-1">/ {formatUSD(totalUSD!)}</span>
                </div>
              </div>
              <div className="border-t border-white/10 pt-1.5 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-teal-300 font-semibold">Pay now ({safari.deposit_pct}%)</span>
                  <span className="text-white font-bold">{formatKES(depositKES)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Balance (30 days before)</span>
                  <span className="text-gray-400">{formatKES(balanceKES)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Select a date to see your price</p>
          </div>
        )}

        {/* CTA */}
        <Link
          href={bookHref}
          className="block w-full bg-teal-DEFAULT hover:bg-teal-600 text-white text-center py-4 rounded-xl font-bold text-lg transition-colors shadow-md hover:shadow-lg"
        >
          {depositKES ? `Book Now — Pay ${formatKES(depositKES)}` : "Book This Safari →"}
        </Link>

        {/* Lipa Polepole */}
        {safari.installments_ok && (
          <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-100 rounded-xl p-3">
            <MPesaLogo className="h-5 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-700">Lipa Polepole — Pay in 4 instalments</p>
              <p className="text-xs text-gray-500">No interest. M-Pesa only.</p>
            </div>
          </div>
        )}

        {/* Payment logos */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <MPesaLogo className="h-6" />
            <VisaLogo className="h-6" />
            <MastercardLogo className="h-6" />
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <svg className="w-3.5 h-3.5 text-teal-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Secure · PCI DSS
          </div>
        </div>

        {/* WhatsApp fallback */}
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=Hi! I'd like to book the ${safari.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full border border-gray-200 text-gray-600 py-3 rounded-xl text-sm font-semibold hover:border-[#25D366] hover:text-[#25D366] transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Book via WhatsApp instead
        </a>
      </div>
    </div>
  );
}
