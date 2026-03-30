"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { previewPrice, createBooking, getSafaris } from "@/lib/api";
import type { SafariList } from "@/types/api";
import { MPesaLogo, VisaLogo, MastercardLogo } from "@/components/ui/PaymentLogos";
import Link from "next/link";
import Image from "next/image";

function formatKES(n: number) {
  return `KES ${n.toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;
}

function formatUSD(n: number) {
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

type Preview = {
  safari_name: string;
  duration_days: number;
  pax: number;
  season: string;
  multiplier: number;
  base_usd_pp: number;
  total_usd: number;
  total_kes: number;
  deposit_kes: number;
  balance_kes: number;
  deposit_pct: number;
  installments_ok: boolean;
  cover_image?: string;
};

const SEASON_LABELS: Record<string, string> = {
  peak: "Peak season — Jul–Oct (Great Migration)",
  low: "Green season — Apr–May (lower rates)",
  standard: "Standard season",
};

const SEASON_COLORS: Record<string, string> = {
  peak: "text-gold-DEFAULT bg-gold-50 border-gold-100",
  low: "text-teal-DEFAULT bg-teal-50 border-teal-100",
  standard: "text-gray-600 bg-gray-50 border-gray-200",
};

function BookPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const safariSlug = searchParams.get("safari") ?? "";
  const prefillDate = searchParams.get("date") ?? "";
  const prefillPax = parseInt(searchParams.get("pax") ?? "2");

  const [date, setDate] = useState(prefillDate);
  const [pax, setPax] = useState(prefillPax);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [previewError, setPreviewError] = useState("");

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_country: "",
    celebration: "",
    special_requests: "",
    promo_code: "",
  });
  const [showPromo, setShowPromo] = useState(false);
  const [promoResult, setPromoResult] = useState<{ discount_pct: number; description: string } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [validatingPromo, setValidatingPromo] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchPreview = useCallback(async () => {
    if (!safariSlug || !date) return;
    setLoadingPreview(true);
    setPreviewError("");
    try {
      const data = await previewPrice(safariSlug, date, pax);
      setPreview(data);
    } catch {
      setPreviewError("Could not load pricing. Please check your date.");
      setPreview(null);
    } finally {
      setLoadingPreview(false);
    }
  }, [safariSlug, date, pax]);

  useEffect(() => {
    fetchPreview();
  }, [fetchPreview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "customer_name" && !value.trim()) {
      setErrors((prev) => ({ ...prev, customer_name: "Name is required" }));
    }
    if (name === "customer_email") {
      if (!value.trim()) setErrors((prev) => ({ ...prev, customer_email: "Email is required" }));
      else if (!/\S+@\S+\.\S+/.test(value)) setErrors((prev) => ({ ...prev, customer_email: "Enter a valid email address" }));
    }
    if (name === "customer_phone" && !value.trim()) {
      setErrors((prev) => ({ ...prev, customer_phone: "Phone number is required" }));
    }
  };

  // Abandoned booking recovery — fire intent when email is filled and user leaves
  const sendIntent = useCallback(() => {
    const email = form.customer_email.trim();
    if (!email || !/\S+@\S+\.\S+/.test(email) || !safariSlug) return;
    const payload = {
      safari_slug: safariSlug,
      travel_date: date || undefined,
      pax: pax || undefined,
      customer_email: email,
      customer_name: form.customer_name.trim() || undefined,
      customer_phone: form.customer_phone.trim() || undefined,
    };
    // Use sendBeacon so it fires even when the tab is closing
    navigator.sendBeacon(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/bookings/intent`,
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );
  }, [form.customer_email, form.customer_name, form.customer_phone, safariSlug, date, pax]);

  useEffect(() => {
    const handleLeave = () => sendIntent();
    document.addEventListener("visibilitychange", handleLeave);
    window.addEventListener("pagehide", handleLeave);
    return () => {
      document.removeEventListener("visibilitychange", handleLeave);
      window.removeEventListener("pagehide", handleLeave);
    };
  }, [sendIntent]);

  const applyPromo = async () => {
    const code = form.promo_code.trim().toUpperCase();
    if (!code) return;
    setValidatingPromo(true);
    setPromoError("");
    setPromoResult(null);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
      const res = await fetch(`${API}/api/bookings/validate-promo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) { setPromoError("Invalid or expired promo code"); return; }
      const data = await res.json();
      setPromoResult(data);
    } catch {
      setPromoError("Could not validate code. Try again.");
    } finally {
      setValidatingPromo(false);
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.customer_name.trim()) e.customer_name = "Name is required";
    if (!form.customer_email.trim() || !/\S+@\S+\.\S+/.test(form.customer_email)) e.customer_email = "Valid email required";
    if (!form.customer_phone.trim()) e.customer_phone = "Phone number is required";
    if (!date) e.date = "Please select a travel date";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      const result = await createBooking({
        safari_slug: safariSlug,
        travel_date: date,
        pax,
        customer_name: form.customer_name.trim(),
        customer_email: form.customer_email.trim(),
        customer_phone: form.customer_phone.trim(),
        customer_country: form.customer_country.trim() || undefined,
        celebration: form.celebration.trim() || undefined,
        special_requests: form.special_requests.trim() || undefined,
        promo_code: form.promo_code.trim().toUpperCase() || undefined,
      });
      // Redirect to Pesapal payment page — validate URL is https before assigning
      const redirectUrl = result.redirect_url;
      if (typeof redirectUrl !== "string" || !redirectUrl.startsWith("https://")) {
        throw new Error("Invalid payment redirect URL received from server.");
      }
      window.location.href = redirectUrl;
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : "Payment could not be initiated. Please try again or WhatsApp us." });
    } finally {
      setSubmitting(false);
    }
  };

  const [allSafaris, setAllSafaris] = useState<SafariList[]>([]);
  useEffect(() => {
    if (!safariSlug) getSafaris().then(setAllSafaris).catch(() => {});
  }, [safariSlug]);

  if (!safariSlug) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Book a Safari</h1>
        <p className="text-gray-500 mb-6">Select a safari package to continue.</p>
        {allSafaris.length > 0 ? (
          <div className="space-y-3">
            {allSafaris.map((s) => (
              <a
                key={s.id}
                href={`/book?safari=${s.slug}&pax=2`}
                className="flex items-center justify-between w-full border border-gray-200 rounded-xl px-5 py-4 hover:border-teal-DEFAULT hover:shadow-sm transition-all group"
              >
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-teal-DEFAULT transition-colors">{s.name}</p>
                  <p className="text-sm text-gray-400">{s.duration_days} days</p>
                </div>
                <svg className="w-5 h-5 text-gray-300 group-hover:text-teal-DEFAULT transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            ))}
          </div>
        ) : (
          <Link href="/safaris" className="text-teal-DEFAULT hover:underline font-semibold">Browse all safaris →</Link>
        )}
      </div>
    );
  }

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT focus:border-transparent transition-shadow text-sm bg-white";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";
  const errorClass = "text-maasai-DEFAULT text-xs mt-1.5";

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-950 pt-16 pb-14 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={preview?.cover_image ?? "/images/destinations/masai-mara.png"}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950/95 to-teal-900/20" />
        <div className="relative max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-6">
            <Link href="/safaris" className="hover:text-white/90 transition-colors">Safaris</Link>
            <span>/</span>
            {preview ? (
              <Link href={`/safaris/${safariSlug}`} className="hover:text-white/90 transition-colors">{preview.safari_name}</Link>
            ) : (
              <span className="text-white/80">Loading...</span>
            )}
            <span>/</span>
            <span className="text-white/80">Book</span>
          </nav>
          {/* Progress stepper */}
          <div className="flex items-center gap-0 mb-8">
            {[
              { n: 1, label: "Trip details" },
              { n: 2, label: "Your details" },
              { n: 3, label: "Payment" },
            ].map(({ n, label }, i) => {
              const done = n < 2; // step 1 is complete once we're on this page with a safari
              const active = n === 2;
              return (
                <div key={n} className="flex items-center">
                  {i > 0 && (
                    <div className={`h-px w-8 sm:w-16 mx-1 ${done || active ? "bg-teal-DEFAULT" : "bg-white/20"}`} />
                  )}
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                      done ? "bg-teal-DEFAULT text-white" : active ? "bg-white text-gray-900" : "bg-white/15 text-white/50"
                    }`}>
                      {done ? (
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : n}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${active ? "text-white" : done ? "text-teal-300" : "text-white/40"}`}>
                      {label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="eyebrow text-teal-200 mb-3">Secure booking · Step 2 of 3</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-2">
            {preview ? preview.safari_name : "Complete Your Booking"}
          </h1>
          {preview && (
            <p className="text-gray-400 text-lg">{preview.duration_days}-day safari · Departure {new Date(date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left — Customer form (3/5) */}
            <div className="lg:col-span-3 space-y-8">

              {/* Date + pax selector */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
                <p className="eyebrow text-teal-DEFAULT mb-4">Trip details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Departure date <span className="text-maasai-DEFAULT">*</span></label>
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className={inputClass + (errors.date ? " border-maasai-DEFAULT" : "")}
                    />
                    {errors.date && <p className={errorClass}>{errors.date}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Group size <span className="text-maasai-DEFAULT">*</span></label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setPax(Math.max(1, pax - 1))}
                        className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-teal-DEFAULT hover:text-teal-DEFAULT transition-colors text-xl font-light flex-shrink-0"
                      >
                        −
                      </button>
                      <div className="flex-1 text-center">
                        <p className="font-display font-bold text-2xl text-gray-900">{pax}</p>
                        <p className="text-xs text-gray-400">{pax === 1 ? "person" : "people"}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPax(Math.min(12, pax + 1))}
                        className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-teal-DEFAULT hover:text-teal-DEFAULT transition-colors text-xl font-light flex-shrink-0"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer details */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
                <p className="eyebrow text-teal-DEFAULT mb-4">Your details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Full Name <span className="text-maasai-DEFAULT">*</span></label>
                    <input name="customer_name" value={form.customer_name} onChange={handleChange} onBlur={handleBlur} className={inputClass + (errors.customer_name ? " border-maasai-DEFAULT" : "")} placeholder="Jane Smith" />
                    {errors.customer_name && <p className={errorClass}>{errors.customer_name}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Email <span className="text-maasai-DEFAULT">*</span></label>
                    <input name="customer_email" type="email" value={form.customer_email} onChange={handleChange} onBlur={handleBlur} className={inputClass + (errors.customer_email ? " border-maasai-DEFAULT" : "")} placeholder="jane@example.com" />
                    {errors.customer_email && <p className={errorClass}>{errors.customer_email}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Phone / WhatsApp <span className="text-maasai-DEFAULT">*</span></label>
                    <input name="customer_phone" value={form.customer_phone} onChange={handleChange} onBlur={handleBlur} className={inputClass + (errors.customer_phone ? " border-maasai-DEFAULT" : "")} placeholder="+254 700 000 000" />
                    {errors.customer_phone && <p className={errorClass}>{errors.customer_phone}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Country</label>
                    <input name="customer_country" value={form.customer_country} onChange={handleChange} className={inputClass} placeholder="United Kingdom" />
                  </div>
                  <div>
                    <label className={labelClass}>Special Occasion?</label>
                    <select name="celebration" value={form.celebration} onChange={handleChange} className={inputClass}>
                      <option value="">None</option>
                      {["Honeymoon", "Anniversary", "Birthday", "Graduation", "Retirement"].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Special Requests</label>
                    <textarea name="special_requests" value={form.special_requests} onChange={handleChange} rows={3} className={inputClass + " resize-none"} placeholder="Dietary requirements, accessibility needs, specific wildlife..." />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      onClick={() => { setShowPromo((v) => !v); setPromoResult(null); setPromoError(""); }}
                      className="text-sm text-teal-DEFAULT hover:text-teal-600 font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-transform ${showPromo ? "rotate-90" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                      {showPromo ? "Hide promo code" : "Have a promo or affiliate code?"}
                    </button>
                    {showPromo && (
                      <div className="mt-2 space-y-2">
                        {promoResult ? (
                          <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-xl px-4 py-2.5">
                            <svg className="w-4 h-4 text-teal-DEFAULT flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            <p className="text-sm text-teal-700 font-medium flex-1">{promoResult.description} ({promoResult.discount_pct}% off)</p>
                            <button type="button" onClick={() => { setPromoResult(null); setForm((p) => ({ ...p, promo_code: "" })); }} className="text-xs text-gray-400 hover:text-gray-600">Remove</button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <input
                              name="promo_code"
                              value={form.promo_code}
                              onChange={(e) => { handleChange(e); setPromoError(""); }}
                              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), applyPromo())}
                              className={`${inputClass} flex-1`}
                              placeholder="Enter code e.g. ENGAI10"
                              autoCapitalize="characters"
                            />
                            <button
                              type="button"
                              onClick={applyPromo}
                              disabled={validatingPromo || !form.promo_code.trim()}
                              className="px-4 py-2 bg-teal-DEFAULT text-white text-sm font-semibold rounded-xl hover:bg-teal-600 disabled:opacity-50 transition-colors flex-shrink-0"
                            >
                              {validatingPromo ? "..." : "Apply"}
                            </button>
                          </div>
                        )}
                        {promoError && <p className={errorClass}>{promoError}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit error */}
              {errors.submit && (
                <div className="flex items-start gap-3 text-maasai-DEFAULT text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <span>{errors.submit}</span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting || !preview || loadingPreview}
                className="w-full bg-teal-DEFAULT hover:bg-teal-600 disabled:opacity-50 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-base"
              >
                {submitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Redirecting to payment...
                  </>
                ) : preview ? (
                  <>
                    Pay Deposit — {formatKES(promoResult ? Math.round(Math.round(preview.total_kes * (1 - promoResult.discount_pct / 100)) * preview.deposit_pct / 100) : preview.deposit_kes)}
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </>
                ) : (
                  "Select a date to continue"
                )}
              </button>

              <p className="text-xs text-gray-400 text-center leading-relaxed">
                You will be redirected to Pesapal's secure payment page. We accept M-Pesa, Visa, and Mastercard.
              </p>
            </div>

            {/* Right — Price summary (2/5) */}
            <div className="lg:col-span-2 space-y-5 lg:sticky lg:top-24 lg:self-start">

              {/* Price card */}
              <div className="bg-teal-700 rounded-2xl p-6 space-y-4">
                <p className="text-white font-semibold text-sm">Price summary</p>

                {loadingPreview ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-4 bg-white/10 rounded w-1/2" />
                    <div className="h-4 bg-white/10 rounded w-2/3" />
                  </div>
                ) : previewError ? (
                  <p className="text-red-400 text-sm">{previewError}</p>
                ) : preview ? (
                  <>
                    {/* Season badge */}
                    <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${SEASON_COLORS[preview.season]}`}>
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25" />
                      </svg>
                      {SEASON_LABELS[preview.season]}
                    </div>

                    {/* Line items */}
                    <div className="space-y-2.5 border-t border-white/10 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Base price/person</span>
                        <span className="text-white font-medium">{formatUSD(preview.base_usd_pp)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{pax} {pax === 1 ? "person" : "people"}</span>
                        <span className="text-white font-medium">× {pax}</span>
                      </div>
                      {preview.multiplier !== 1 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Season adjustment</span>
                          <span className={`font-medium ${preview.multiplier > 1 ? "text-gold-DEFAULT" : "text-teal-300"}`}>
                            × {preview.multiplier}
                          </span>
                        </div>
                      )}
                      {promoResult && (
                        <div className="flex justify-between text-sm">
                          <span className="text-teal-300">Promo ({promoResult.discount_pct}% off)</span>
                          <span className="text-teal-300 font-medium">− {formatKES(Math.round(preview.total_kes * promoResult.discount_pct / 100))}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm border-t border-white/10 pt-2.5">
                        <span className="text-gray-400">Total</span>
                        <div className="text-right">
                          {promoResult ? (
                            <>
                              <p className="text-white font-bold">{formatKES(Math.round(preview.total_kes * (1 - promoResult.discount_pct / 100)))}</p>
                              <p className="text-gray-500 text-xs line-through">{formatKES(preview.total_kes)}</p>
                            </>
                          ) : (
                            <>
                              <p className="text-white font-bold">{formatKES(preview.total_kes)}</p>
                              <p className="text-gray-500 text-xs">{formatUSD(preview.total_usd)}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Deposit / balance split */}
                    {(() => {
                      const discountedTotal = promoResult
                        ? Math.round(preview.total_kes * (1 - promoResult.discount_pct / 100))
                        : preview.total_kes;
                      const discountedDeposit = Math.round(discountedTotal * preview.deposit_pct / 100);
                      const discountedBalance = discountedTotal - discountedDeposit;
                      return (
                        <div className="bg-teal-DEFAULT/10 border border-teal-DEFAULT/20 rounded-xl p-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-teal-200 font-semibold">Deposit due now ({preview.deposit_pct}%)</span>
                            <span className="text-white font-bold">{formatKES(discountedDeposit)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Balance due 30 days before travel</span>
                            <span className="text-gray-300">{formatKES(discountedBalance)}</span>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Installments */}
                    {preview.installments_ok && (
                      <div className="flex items-center gap-2 text-xs text-gray-400 border-t border-white/10 pt-3">
                        <MPesaLogo className="h-4" />
                        <span>Lipa Polepole: 4 monthly M-Pesa instalments available</span>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">Select a date to see pricing.</p>
                )}
              </div>

              {/* Payment methods */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-card">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Accepted payments</p>
                <div className="flex items-center gap-3">
                  <MPesaLogo className="h-7" />
                  <VisaLogo className="h-7" />
                  <MastercardLogo className="h-7" />
                </div>
                <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                  Secure payment via Pesapal. PCI DSS compliant. We never store your card number.
                </p>
              </div>

              {/* Trust */}
              <div className="space-y-3">
                {[
                  { icon: "shield", text: "Free cancellation up to 30 days before travel" },
                  { icon: "check", text: "Instant booking confirmation via email & SMS" },
                  { icon: "chat", text: "24/7 WhatsApp support throughout your trip" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0">
                      {icon === "shield" && (
                        <svg className="w-4 h-4 text-teal-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />
                        </svg>
                      )}
                      {icon === "check" && (
                        <svg className="w-4 h-4 text-teal-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      )}
                      {icon === "chat" && (
                        <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      )}
                    </div>
                    {text}
                  </div>
                ))}
              </div>

              {/* WhatsApp fallback */}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=Hi! I'd like to book ${preview?.safari_name ?? "a safari"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:border-[#25D366] hover:text-[#25D366] transition-colors text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Prefer to book via WhatsApp?
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-teal-DEFAULT border-t-transparent rounded-full animate-spin" /></div>}>
      <BookPageInner />
    </Suspense>
  );
}
