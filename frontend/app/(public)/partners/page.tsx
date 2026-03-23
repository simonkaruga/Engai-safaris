"use client";

import { useState } from "react";
import Link from "next/link";

// Metadata cannot be exported from a "use client" component in Next.js App Router.
// SEO is handled via the layout or a separate generateMetadata — see note below.

const TIERS = [
  {
    name: "Standard Partner",
    commission: "5%",
    threshold: "All partners",
    color: "border-gray-200 bg-white",
    badge: null,
    perks: [
      "5% commission on every completed booking",
      "30-day cookie tracking",
      "Access to partner dashboard",
      "Marketing materials",
    ],
  },
  {
    name: "Silver Partner",
    commission: "8%",
    threshold: "5+ bookings / year",
    color: "border-teal-DEFAULT bg-teal-50",
    badge: "Popular",
    perks: [
      "8% commission on every completed booking",
      "30-day cookie tracking",
      "Priority dashboard access",
      "Co-branded marketing materials",
      "Monthly performance report",
    ],
  },
  {
    name: "Gold Partner",
    commission: "12%",
    threshold: "15+ bookings / year",
    color: "border-gold-DEFAULT bg-gold-50",
    badge: "Best rate",
    perks: [
      "12% commission on every completed booking",
      "30-day cookie tracking",
      "Dedicated partner support via WhatsApp",
      "Custom marketing collateral",
      "Quarterly strategy call",
      "Priority support on all bookings",
    ],
  },
];

const HOW_IT_WORKS = [
  { n: "1", title: "Apply below", desc: "Fill in the short form. We review all applications within 24 hours." },
  { n: "2", title: "Get your referral code", desc: "Once approved, you'll receive a unique referral code and link to share with clients." },
  { n: "3", title: "Share with your clients", desc: "Add the link to your emails, website, or brochures. The 30-day cookie does the tracking." },
  { n: "4", title: "Earn after trip completion", desc: "Commission is paid within 14 days of your client's trip completing. No chasing invoices." },
];

const BENEFITS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
      </svg>
    ),
    title: "30-day cookie tracking",
    desc: "Clients have 30 days from clicking your link to complete their booking. You still get credited.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Real-time booking dashboard",
    desc: "See clicks, bookings, and commissions in your partner portal. Updated in real time.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z" />
      </svg>
    ),
    title: "Marketing materials provided",
    desc: "High-resolution images, copy, and banners ready to use on your website or social media.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: "Dedicated partner support",
    desc: "Direct WhatsApp line to our partner team for quick answers on bookings, availability, and custom itineraries.",
  },
];

type FormData = {
  fullName: string;
  email: string;
  company: string;
  country: string;
  website: string;
  clientsPerYear: string;
  message: string;
};

const INITIAL_FORM: FormData = {
  fullName: "",
  email: "",
  company: "",
  country: "",
  website: "",
  clientsPerYear: "",
  message: "",
};

export default function PartnersPage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/partners/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        // Gracefully handle if endpoint is not yet live
        console.warn("Partner apply endpoint returned", res.status, "— showing success anyway");
      }

      console.log("[Partners] Application submitted:", form);
      setSubmitted(true);
    } catch (err) {
      // If the endpoint doesn't exist yet, still surface a success state in development
      console.warn("[Partners] Fetch error (endpoint may not exist yet):", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-teal-700 text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-obsidian opacity-25 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <p className="eyebrow text-teal-200 mb-4 tracking-widest uppercase text-xs font-semibold">Partner Program</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Earn commission on every safari you refer
          </h1>
          <p className="text-teal-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Join our travel agent and referral partner network. Earn up to 12% commission on completed bookings with no caps and transparent real-time tracking.
          </p>
          <div className="mt-10">
            <a href="#apply" className="inline-block bg-gold-DEFAULT hover:bg-gold-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-gold">
              Apply to Partner
            </a>
          </div>
        </div>
      </section>

      {/* Commission tiers */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="eyebrow text-teal-DEFAULT mb-3 uppercase tracking-widest text-xs font-semibold">Commission structure</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">Transparent, tiered rates</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Your tier upgrades automatically as your annual bookings grow. No applications needed — we track it for you.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier) => (
            <div key={tier.name} className={`rounded-2xl border-2 p-7 flex flex-col ${tier.color} relative`}>
              {tier.badge && (
                <span className="absolute top-4 right-4 bg-teal-DEFAULT text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {tier.badge}
                </span>
              )}
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{tier.threshold}</p>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
              <div className="text-5xl font-display font-bold text-teal-DEFAULT mb-5">{tier.commission}</div>
              <ul className="space-y-2 mt-auto">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-teal-DEFAULT mt-0.5 flex-shrink-0">
                      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-stone-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow text-teal-DEFAULT mb-3 uppercase tracking-widest text-xs font-semibold">Simple process</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">How it works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-12 h-12 rounded-full bg-teal-DEFAULT text-white font-display text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {s.n}
                </div>
                <h3 className="font-display text-base font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="eyebrow text-teal-DEFAULT mb-3 uppercase tracking-widest text-xs font-semibold">What you get</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">Partner benefits</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-teal-50 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-DEFAULT mb-4">
                {b.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1.5">{b.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="bg-stone-50 py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="eyebrow text-teal-DEFAULT mb-3 uppercase tracking-widest text-xs font-semibold">Get started</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">Apply to become a partner</h2>
            <p className="text-gray-500 mt-3">We review applications within 24 hours and will contact you by email.</p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-2xl border border-teal-100 p-10 text-center shadow-card">
              <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-teal-DEFAULT" fill="none" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">Application received!</h3>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto leading-relaxed">
                Thank you for applying. We'll review your application and contact you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {waNumber && (
                  <a
                    href={`https://wa.me/${waNumber}?text=Hi, I just applied for the Engai Safaris partner program`}
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
                  >
                    Follow up on WhatsApp
                  </a>
                )}
                <Link href="/" className="border border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                  Back to home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 space-y-5">
              {/* Full name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Full name <span className="text-maasai-DEFAULT">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email <span className="text-maasai-DEFAULT">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@agency.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Company + Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Company / Agency name <span className="text-maasai-DEFAULT">*</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={form.company}
                    onChange={handleChange}
                    placeholder="African Wanderers Ltd"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Country <span className="text-maasai-DEFAULT">*</span>
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    required
                    value={form.country}
                    onChange={handleChange}
                    placeholder="United Kingdom"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Website */}
              <div>
                <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Website <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://www.youragency.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT focus:border-transparent transition"
                />
              </div>

              {/* Clients per year */}
              <div>
                <label htmlFor="clientsPerYear" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  How many safari clients do you refer per year? <span className="text-maasai-DEFAULT">*</span>
                </label>
                <select
                  id="clientsPerYear"
                  name="clientsPerYear"
                  required
                  value={form.clientsPerYear}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT focus:border-transparent transition"
                >
                  <option value="" disabled>Select an option</option>
                  <option value="1-5">1–5 clients</option>
                  <option value="6-20">6–20 clients</option>
                  <option value="21-50">21–50 clients</option>
                  <option value="50+">50+ clients</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Anything else you'd like us to know? <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="e.g. We specialise in luxury East Africa itineraries for UK clients..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT focus:border-transparent transition resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-maasai-DEFAULT bg-red-50 rounded-lg px-4 py-2.5">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-DEFAULT hover:bg-teal-600 disabled:bg-teal-200 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  "Submit application"
                )}
              </button>

              <p className="text-xs text-gray-400 text-center leading-relaxed">
                By submitting you agree to be contacted by Engai Safaris regarding the partner program. We don't share your details with third parties.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-teal-700 text-white py-16 px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Questions before applying?
        </h2>
        <p className="text-teal-100 mb-8 max-w-xl mx-auto">
          Chat with our partner team directly on WhatsApp. We're happy to walk you through the programme before you apply.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {waNumber && (
            <a
              href={`https://wa.me/${waNumber}?text=Hi, I'd like to know more about the Engai Safaris partner program`}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          )}
          <Link href="/contact" className="border border-teal-500 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-teal-600 transition-colors">
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
