import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cancellation Policy | Engai Safaris",
  description:
    "Engai Safaris cancellation and amendment policy. Clear fee schedule, refund timelines, and travel insurance guidance so you can book with confidence.",
  alternates: { canonical: "https://www.engaisafaris.com/cancellation-policy" },
};

const CANCELLATION_TIERS = [
  {
    days: "60+ days",
    label: "60 days or more before departure",
    fee: "10%",
    feeLabel: "Admin fee only",
    description: "Lose only the small processing fee. 90% returned.",
    color: "green",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    days: "30–59 days",
    label: "30–59 days before departure",
    fee: "30%",
    feeLabel: "30% of total cost",
    description: "Moderate fee. Travel insurance covers this in most policies.",
    color: "amber",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    days: "14–29 days",
    label: "14–29 days before departure",
    fee: "50%",
    feeLabel: "50% of total cost",
    description: "At this stage we've pre-paid guides, lodges, and park fees.",
    color: "orange",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    badgeColor: "bg-orange-100 text-orange-800",
  },
  {
    days: "0–13 days",
    label: "Less than 14 days / no-show",
    fee: "100%",
    feeLabel: "Non-refundable",
    description: "Full costs committed. Comprehensive travel insurance is essential.",
    color: "red",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    badgeColor: "bg-red-100 text-red-800",
  },
];

export default function CancellationPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F1C17] via-[#1B7A60]/80 to-[#0F1C17] pt-20 pb-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#F5A623] text-xs font-semibold uppercase tracking-widest mb-3">Policy</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Cancellation Policy
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Life happens. We&apos;ve made our cancellation policy as fair and transparent as we possibly
            can. No surprises, no small print.
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-400">
            <span>Last updated: March 2026</span>
            <span className="text-gray-600">·</span>
            <span>Refunds within 7–14 business days</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">

          {/* At a Glance summary */}
          <div className="mb-14">
            <p className="eyebrow text-[#1B7A60] text-xs font-semibold uppercase tracking-widest mb-4">Fee schedule at a glance</p>

            {/* Visual timeline cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CANCELLATION_TIERS.map((tier) => (
                <div
                  key={tier.days}
                  className={`relative rounded-2xl border-2 p-6 ${tier.bgColor} ${tier.borderColor} overflow-hidden`}
                >
                  {/* Days badge */}
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${tier.badgeColor}`}>
                    {tier.days} before departure
                  </span>

                  {/* Fee */}
                  <div className="flex items-end gap-2 mb-2">
                    <span className={`font-display text-5xl font-bold leading-none ${tier.textColor}`}>
                      {tier.fee}
                    </span>
                    <span className="text-gray-500 text-sm pb-1.5">{tier.feeLabel}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">{tier.description}</p>
                </div>
              ))}
            </div>

            {/* Table version for quick reference */}
            <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0F1C17] text-white">
                    <th className="px-5 py-4 text-left font-semibold">Notice period</th>
                    <th className="px-5 py-4 text-left font-semibold">Cancellation fee</th>
                    <th className="px-5 py-4 text-left font-semibold hidden sm:table-cell">Refund</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-green-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-gray-800">60+ days before</td>
                    <td className="px-5 py-4 text-green-700 font-semibold">10% (admin fee)</td>
                    <td className="px-5 py-4 text-gray-600 hidden sm:table-cell">90% refunded</td>
                  </tr>
                  <tr className="hover:bg-amber-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-gray-800">30–59 days before</td>
                    <td className="px-5 py-4 text-amber-700 font-semibold">30% of total</td>
                    <td className="px-5 py-4 text-gray-600 hidden sm:table-cell">70% refunded</td>
                  </tr>
                  <tr className="hover:bg-orange-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-gray-800">14–29 days before</td>
                    <td className="px-5 py-4 text-orange-700 font-semibold">50% of total</td>
                    <td className="px-5 py-4 text-gray-600 hidden sm:table-cell">50% refunded</td>
                  </tr>
                  <tr className="hover:bg-red-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-gray-800">0–13 days / no-show</td>
                    <td className="px-5 py-4 text-red-700 font-semibold">100%, non-refundable</td>
                    <td className="px-5 py-4 text-gray-600 hidden sm:table-cell">No refund</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* How to cancel */}
          <div id="how-to-cancel" className="mb-12 pl-5 border-l-4 border-[#1B7A60]/30 hover:border-[#1B7A60] transition-colors">
            <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-4">
              How to Cancel
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Cancellations must be submitted in writing. Phone calls or WhatsApp messages alone
              do not constitute a formal cancellation.
            </p>
            <div className="space-y-3">
              {[
                {
                  step: "01",
                  title: "Email us",
                  desc: (
                    <>
                      Send a cancellation email to{" "}
                      <a href="mailto:bookings@engaisafaris.com" className="text-[#1B7A60] hover:underline font-medium">
                        bookings@engaisafaris.com
                      </a>
                    </>
                  ),
                },
                {
                  step: "02",
                  title: "Include your booking reference",
                  desc: "Quote your booking reference (e.g. ENG-2026-00042) in the subject line",
                },
                {
                  step: "03",
                  title: "We confirm in writing",
                  desc: "We will send written acknowledgement within 1 business day confirming your cancellation date and any applicable fee",
                },
                {
                  step: "04",
                  title: "Refund processed",
                  desc: "Any refund due is processed within 7–14 business days to your original payment method",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4 items-start p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="w-8 h-8 flex-shrink-0 rounded-full bg-[#1B7A60] text-white flex items-center justify-center text-xs font-bold">
                    {step}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{title}</p>
                    <p className="text-gray-600 text-sm mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Refunds */}
          <div id="refunds" className="mb-12 pl-5 border-l-4 border-[#1B7A60]/30 hover:border-[#1B7A60] transition-colors">
            <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Refund Timeline
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Refunds are processed within <strong>7–14 business days</strong> of your written
              cancellation request being acknowledged. The method of refund is:
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-sm text-gray-700">
              <li>M-Pesa payments: refunded to the originating M-Pesa number</li>
              <li>Card payments: refunded to the originating card via Pesapal</li>
              <li>Bank transfers: refunded to the originating bank account</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              International card refunds may take an additional 3–5 business days to appear on
              your statement depending on your card issuer.
            </p>
          </div>

          {/* Amendment policy */}
          <div id="amendments" className="mb-12 pl-5 border-l-4 border-[#1B7A60]/30 hover:border-[#1B7A60] transition-colors">
            <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Amendment Policy
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              We understand that plans change. We try to be as flexible as possible.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-teal-50 rounded-xl border border-teal-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-[#1B7A60] flex items-center justify-center text-xs font-bold">✓</span>
                  <p className="font-semibold text-gray-800 text-sm">One free date change</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  One date change is allowed free of charge, provided the request is made{" "}
                  <strong>30 or more days</strong> before your original departure date, subject to
                  availability.
                </p>
              </div>
              <div className="p-5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-stone-200 text-gray-600 flex items-center justify-center text-xs">i</span>
                  <p className="font-semibold text-gray-800 text-sm">Subsequent changes</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Additional amendments are subject to an admin fee of KES 5,000 (approx. $38 USD)
                  per change, plus any price difference from the new dates.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              All amendments must be requested in writing to{" "}
              <a href="mailto:bookings@engaisafaris.com" className="text-[#1B7A60] hover:underline">
                bookings@engaisafaris.com
              </a>. Amendments are subject to availability at lodges and camps.
            </p>
          </div>

          {/* Peak season note */}
          <div id="peak-season" className="mb-12 pl-5 border-l-4 border-amber-400 hover:border-amber-500 transition-colors">
            <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Peak Season Note (July–October)
            </h2>
            <div className="p-5 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                <div>
                  <p className="font-semibold text-amber-800 mb-2">Great Migration season: stricter cancellation terms</p>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    Safaris during July–October (Great Migration peak) involve pre-committed lodge and camp
                    reservations made many months in advance. Lodges in the Masai Mara are booked out and
                    are non-refundable once confirmed. We strongly recommend purchasing{" "}
                    <strong>comprehensive travel insurance</strong> that specifically covers trip cancellation
                    for peak-season bookings.
                  </p>
                  <p className="text-sm text-amber-700 mt-2">
                    The standard cancellation fee table above applies. There are no exceptions for late
                    cancellations during peak season.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Engai cancels */}
          <div id="engai-cancels" className="mb-12 pl-5 border-l-4 border-[#1B7A60]/30 hover:border-[#1B7A60] transition-colors">
            <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-4">
              If Engai Safaris Cancels
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              In the unlikely event that we must cancel your safari (excluding force majeure and
              non-payment), we will offer you:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-teal-50 rounded-xl border border-teal-100">
                <p className="text-xs font-semibold text-[#1B7A60] uppercase tracking-wider mb-2">Option A</p>
                <p className="font-semibold text-gray-800 text-sm mb-1">Full refund</p>
                <p className="text-sm text-gray-600">100% of all monies paid returned within 7 business days</p>
              </div>
              <div className="p-5 bg-teal-50 rounded-xl border border-teal-100">
                <p className="text-xs font-semibold text-[#1B7A60] uppercase tracking-wider mb-2">Option B</p>
                <p className="font-semibold text-gray-800 text-sm mb-1">Credit toward future booking</p>
                <p className="text-sm text-gray-600">Full value as credit, valid 24 months, for any Engai Safaris package</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              In force majeure cancellations (natural disasters, government bans, park closures),
              we will refund all amounts received minus non-recoverable third-party costs already
              committed, with full documentation provided.
            </p>
          </div>

          {/* Travel insurance */}
          <div id="travel-insurance" className="mb-12 pl-5 border-l-4 border-[#1B7A60]/30 hover:border-[#1B7A60] transition-colors">
            <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Travel Insurance: Strongly Recommended
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-5">
              Travel insurance is the single most important thing you can buy alongside your safari
              booking. A comprehensive policy protects you from cancellation fees, medical
              emergencies, and evacuation costs that can otherwise be significant in East Africa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {[
                {
                  name: "World Nomads",
                  href: "https://www.worldnomads.com",
                  desc: "Popular with adventure travellers. Covers safari activities and medical evacuation.",
                },
                {
                  name: "Allianz Travel",
                  href: "https://www.allianz.com",
                  desc: "Comprehensive cancellation and medical cover with 24/7 emergency assistance.",
                },
                {
                  name: "SafetyWing",
                  href: "https://safetywing.com",
                  desc: "Flexible subscription-based cover. Good for extended stays in Africa.",
                },
                {
                  name: "Your bank / card issuer",
                  href: "#",
                  desc: "Many premium Visa/Mastercard cards include trip cancellation cover. Check yours.",
                },
              ].map(({ name, href, desc }) => (
                <div key={name} className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <a
                    href={href}
                    target={href !== "#" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="font-semibold text-[#1B7A60] hover:underline text-sm"
                  >
                    {name} {href !== "#" && "→"}
                  </a>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 p-4 bg-stone-50 rounded-xl border border-stone-200">
              Engai Safaris is not affiliated with any insurance provider and receives no commission.
              These are suggestions only. Please read policy documents carefully before purchasing.
              Your policy should include at minimum: trip cancellation, medical evacuation ($100,000+),
              and emergency repatriation.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-[#0F1C17] rounded-2xl text-center">
            <p className="text-gray-400 text-sm mb-2">Ready to book with confidence?</p>
            <h2 className="font-display text-2xl font-bold text-white mb-4">
              We&apos;re here if you have any questions.
            </h2>
            <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
              Our team answers cancellation and booking queries within a few hours. If something
              comes up before your safari, talk to us and we&apos;ll always try to find a solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/safaris"
                className="inline-flex items-center justify-center gap-2 bg-[#1B7A60] hover:bg-[#156650] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Browse Safaris
              </Link>
              <a
                href="mailto:bookings@engaisafaris.com"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:bg-white/5 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Email Us
              </a>
            </div>
          </div>

          {/* Related links */}
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="text-gray-500">Related:</span>
            <Link href="/terms" className="text-[#1B7A60] hover:underline">Terms &amp; Conditions</Link>
            <span className="text-gray-300">·</span>
            <Link href="/privacy" className="text-[#1B7A60] hover:underline">Privacy Policy</Link>
            <span className="text-gray-300">·</span>
            <Link href="/faq" className="text-[#1B7A60] hover:underline">FAQ</Link>
          </div>
        </div>
      </section>
    </>
  );
}
