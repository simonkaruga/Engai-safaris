"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MPesaLogo, VisaLogo, MastercardLogo } from "@/components/ui/PaymentLogos";
import { useCurrency } from "@/context/CurrencyContext";
import { formatPrice, CURRENCIES } from "@/lib/currency";
import type { SafariDetail } from "@/types/api";

interface Props {
  safari: SafariDetail;
}


const SEASON_LABELS: Record<string, { label: string; color: string }> = {
  peak:     { label: "Peak season · Jul–Oct (Great Migration)", color: "text-amber-700 bg-amber-50 border-amber-200" },
  holiday:  { label: "Holiday season · Dec 20–Jan 5", color: "text-red-700 bg-red-50 border-red-200" },
  low:      { label: "Green season · Apr–May (lower rates)", color: "text-teal-700 bg-teal-50 border-teal-100" },
  standard: { label: "Standard season", color: "text-gray-500 bg-gray-50 border-gray-200" },
};

type Preview = {
  safari_name: string;
  duration_days: number;
  pax: number;
  season: string;
  multiplier: number;
  base_usd_pp: number;
  insurance_usd: number;
  total_usd: number;
  total_kes: number;
  deposit_kes: number;
  balance_kes: number;
  deposit_pct: number;
  installments_ok: boolean;
};

export default function BookingSidebar({ safari }: Props) {
  const { currency, rates } = useCurrency();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState("");
  const [pax, setPax] = useState(2);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [showPromo, setShowPromo] = useState(false);
  const [promoValid, setPromoValid] = useState<{ discount_pct: number; description: string } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [checkingPromo, setCheckingPromo] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch live price preview from the backend whenever date/pax changes
  useEffect(() => {
    if (!date) { setPreview(null); return; }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/preview`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ safari_slug: safari.slug, travel_date: date, pax }),
        });
        if (res.ok) setPreview(await res.json());
        else setPreview(null);
      } catch {
        setPreview(null);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [date, pax, safari.slug]);

  const validatePromo = async () => {
    if (!promoCode.trim()) return;
    setCheckingPromo(true);
    setPromoError("");
    setPromoValid(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/validate-promo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode.trim() }),
      });
      if (res.ok) setPromoValid(await res.json());
      else setPromoError("Invalid or expired code");
    } catch {
      setPromoError("Could not check code. Try again");
    } finally {
      setCheckingPromo(false);
    }
  };

  const season = preview ? SEASON_LABELS[preview.season] ?? SEASON_LABELS.standard : null;

  // Apply promo discount to displayed totals
  const discountFactor = promoValid ? 1 - promoValid.discount_pct / 100 : 1;
  const displayTotalKES = preview ? Math.round(preview.total_kes * discountFactor) : null;
  const displayDepositKES = preview ? Math.round(preview.deposit_kes * discountFactor) : null;
  const displayBalanceKES = displayTotalKES && displayDepositKES ? displayTotalKES - displayDepositKES : null;

  // Convert to selected currency — derive deposit/balance from total_usd to avoid KES→USD→currency rounding errors
  const discountedTotalUSD = preview ? preview.total_usd * discountFactor : null;
  const depositUSD = discountedTotalUSD != null ? discountedTotalUSD * (preview!.deposit_pct / 100) : null;
  const balanceUSD = discountedTotalUSD != null && depositUSD != null ? discountedTotalUSD - depositUSD : null;
  const displayTotalSelected = discountedTotalUSD != null ? formatPrice(discountedTotalUSD, currency, rates) : null;
  const displayDepositSelected = depositUSD != null ? formatPrice(depositUSD, currency, rates) : null;
  const displayBalanceSelected = balanceUSD != null ? formatPrice(balanceUSD, currency, rates) : null;
  const showKESAlso = currency !== "KES";

  const bookHref = date
    ? `/book?safari=${safari.slug}&date=${date}&pax=${pax}${promoCode ? `&promo=${promoCode.trim().toUpperCase()}` : ""}`
    : `/book?safari=${safari.slug}&pax=${pax}`;

  const basePricePP = safari.price_usd_2pax ? Math.round(safari.price_usd_2pax / 2) : null;

  return (
    <div className="bg-white border-2 border-teal-DEFAULT rounded-2xl overflow-hidden shadow-lg sticky top-24">

      {/* Header */}
      <div className="bg-teal-DEFAULT px-5 py-4">
        <p className="text-teal-100 text-xs font-semibold uppercase tracking-widest mb-0.5">Instant Booking</p>
        <div className="flex items-end justify-between">
          <div>
            {basePricePP ? (
              <>
                <p className="text-white font-display font-bold text-3xl">
                  {formatPrice(basePricePP, currency, rates)}
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

        {/* Solo advisory */}
        {pax === 1 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs leading-relaxed">
            <p className="font-bold text-amber-800 mb-1 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
              </svg>
              Solo traveller heads-up
            </p>
            <p className="text-amber-700">
              As a solo traveller you hire the full private vehicle, great for flexibility but the highest per-person cost.
            </p>
            <p className="text-amber-700 mt-1.5">
              <strong>Better value option:</strong> join one of our <Link href="/group-safaris" className="underline font-semibold hover:text-amber-900">group departures</Link> and split the vehicle with other travellers. Same parks, same guides, from <strong>40–60% less</strong>.
            </p>
          </div>
        )}

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
        {loading && (
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm animate-pulse">Calculating price…</p>
          </div>
        )}

        {!loading && preview && season && displayTotalKES && displayDepositKES && displayBalanceKES ? (
          <div className="bg-gray-950 rounded-xl p-4 space-y-2.5">
            <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${season.color}`}>
              {season.label}
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{pax} {pax === 1 ? "person" : "people"} · {preview.duration_days} days</span>
                <div className="text-right">
                  {promoValid ? (
                    <>
                      <span className="text-gray-500 line-through text-xs mr-1">{formatPrice(preview.total_usd, currency, rates)}</span>
                      <span className="text-white font-bold">{displayTotalSelected}</span>
                    </>
                  ) : (
                    <span className="text-white font-bold">{displayTotalSelected}</span>
                  )}
                  {showKESAlso && displayTotalKES && (
                    <p className="text-gray-500 text-[10px]">~KES {displayTotalKES.toLocaleString()}</p>
                  )}
                </div>
              </div>
              {promoValid && (
                <div className="flex justify-between text-xs">
                  <span className="text-green-400 font-semibold">Promo: {promoValid.description}</span>
                  <span className="text-green-400 font-semibold">−{promoValid.discount_pct}%</span>
                </div>
              )}
              <div className="border-t border-white/10 pt-1.5 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-teal-300 font-semibold">Pay now ({safari.deposit_pct}%)</span>
                  <span className="text-white font-bold">{displayDepositSelected}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Balance (30 days before)</span>
                  <span className="text-gray-400">{displayBalanceSelected}</span>
                </div>
              </div>
            </div>
          </div>
        ) : !loading && !date ? (
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Select a date to see your exact price</p>
          </div>
        ) : null}

        {/* Promo code */}
        <div>
          <button
            type="button"
            onClick={() => setShowPromo(!showPromo)}
            className="text-xs text-teal-DEFAULT underline underline-offset-2"
          >
            {showPromo ? "Hide promo code" : "Have a promo code?"}
          </button>
          {showPromo && (
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                placeholder="e.g. ENGAI10"
                value={promoCode}
                onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setPromoValid(null); setPromoError(""); }}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-DEFAULT uppercase"
              />
              <button
                onClick={validatePromo}
                disabled={checkingPromo || !promoCode.trim()}
                className="text-xs bg-teal-DEFAULT text-white rounded-lg px-3 py-2 disabled:opacity-50 font-semibold"
              >
                {checkingPromo ? "…" : "Apply"}
              </button>
            </div>
          )}
          {promoValid && (
            <p className="text-xs text-green-600 font-semibold mt-1">✓ {promoValid.description} applied</p>
          )}
          {promoError && (
            <p className="text-xs text-red-500 mt-1">{promoError}</p>
          )}
        </div>

        {/* CTA */}
        <Link
          href={bookHref}
          className="block w-full bg-teal-DEFAULT hover:bg-teal-600 text-white text-center py-4 rounded-xl font-bold text-lg transition-colors shadow-md hover:shadow-lg"
        >
          {displayDepositSelected ? `Book Now: Pay ${displayDepositSelected}` : "Book This Safari →"}
        </Link>

        {/* Lipa Polepole */}
        {safari.installments_ok && (
          <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-100 rounded-xl p-3">
            <MPesaLogo className="h-5 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-700">Lipa Polepole: Pay in 4 instalments</p>
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
