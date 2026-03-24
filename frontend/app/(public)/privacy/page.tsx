import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Engai Safaris",
  description:
    "How Engai Safaris collects, uses, and protects your personal data. Compliant with Kenya Data Protection Act 2019 and EU GDPR.",
  alternates: { canonical: "https://www.engaisafaris.com/privacy" },
};

const SECTIONS = [
  {
    id: "who-we-are",
    title: "1. Who We Are",
    content: (
      <>
        <p>
          <strong>Engai Safaris Ltd</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a safari
          operator incorporated in Kenya. This Privacy Policy explains how we collect, use, store,
          and protect your personal information when you use our website (engaisafaris.com) or make
          a booking with us.
        </p>
        <p className="mt-3 text-sm text-gray-700">
          We are registered as a Data Controller with the Office of the Data Protection
          Commissioner (ODPC), Kenya, and comply with the{" "}
          <strong>Kenya Data Protection Act 2019 (DPA)</strong> and the principles of the EU
          General Data Protection Regulation (GDPR) for visitors from the European Union.
        </p>
        <div className="mt-4 p-4 bg-stone-50 rounded-xl border border-stone-200 text-sm text-gray-600 space-y-1">
          <p><strong>Data Controller:</strong> Engai Safaris Ltd</p>
          <p>Nairobi, Kenya</p>
          <p>
            Privacy contact:{" "}
            <a href="mailto:privacy@engaisafaris.com" className="text-[#1B7A60] hover:underline">
              privacy@engaisafaris.com
            </a>
          </p>
        </div>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "2. What Data We Collect",
    content: (
      <>
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold text-[#1B7A60] uppercase tracking-wider mb-2">Booking &amp; enquiry data</p>
            <ul className="space-y-1 list-disc list-inside text-sm text-gray-700">
              <li>Full name, email address, phone number (including WhatsApp)</li>
              <li>Country of residence and nationality</li>
              <li>Passport number (required for national park fee payments)</li>
              <li>Travel dates, safari preferences, group composition</li>
              <li>Dietary requirements and relevant medical notes (where provided voluntarily)</li>
              <li>Special occasion information (e.g. honeymoon, anniversary)</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#1B7A60] uppercase tracking-wider mb-2">Payment data</p>
            <ul className="space-y-1 list-disc list-inside text-sm text-gray-700">
              <li>Payment is processed entirely by <strong>Pesapal Limited</strong> (PCI DSS compliant)</li>
              <li>Engai Safaris never stores card numbers or banking credentials</li>
              <li>We retain only transaction references and amounts for accounting purposes</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#1B7A60] uppercase tracking-wider mb-2">Website usage data</p>
            <ul className="space-y-1 list-disc list-inside text-sm text-gray-700">
              <li>IP address (anonymised after 24 hours)</li>
              <li>Browser type, device, pages visited, time spent</li>
              <li>Referring website and currency preference</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#1B7A60] uppercase tracking-wider mb-2">Communications data</p>
            <ul className="space-y-1 list-disc list-inside text-sm text-gray-700">
              <li>Emails and WhatsApp messages you send us</li>
              <li>AI Safari Planner conversation history (when you submit an enquiry)</li>
              <li>Reviews and feedback you provide</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Data",
    content: (
      <>
        <p className="text-sm text-gray-700">We use your data to:</p>
        <ul className="mt-3 space-y-1.5 list-disc list-inside text-sm text-gray-700">
          <li>Process your booking and send confirmation documents</li>
          <li>Send pre-trip logistics (itineraries, packing guides, wildlife reports)</li>
          <li>Contact you regarding your booking via WhatsApp, SMS, and email</li>
          <li>Process payment via Pesapal</li>
          <li>Submit park fees to Kenya Wildlife Service using your name and nationality</li>
          <li>Generate your post-safari photo album (with your permission)</li>
          <li>Send review requests after your safari</li>
          <li>Comply with legal obligations (Kenya Revenue Authority, KATO)</li>
          <li>Improve our website and services through anonymised analytics</li>
        </ul>
        <p className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-800">
          <strong>Marketing:</strong> We only send marketing emails if you have explicitly opted in.
          You may unsubscribe at any time by clicking &ldquo;Unsubscribe&rdquo; in any marketing email or
          emailing{" "}
          <a href="mailto:privacy@engaisafaris.com" className="underline">privacy@engaisafaris.com</a>.
          We will never sell your data to third parties. Ever.
        </p>
      </>
    ),
  },
  {
    id: "no-selling",
    title: "4. We Never Sell Your Data",
    content: (
      <>
        <p>
          Engai Safaris does <strong>not</strong> sell, rent, or trade your personal data to any
          third party for marketing or commercial purposes. Your information is shared only with
          trusted service providers necessary to deliver your safari:
        </p>
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Third Party</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Purpose</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Pesapal Limited", "Payment processing", "Kenya"],
                ["Africa's Talking", "SMS notifications", "Kenya"],
                ["Resend Inc.", "Email delivery", "USA (SCCs)"],
                ["Cloudinary Inc.", "Photo storage", "USA (SCCs)"],
                ["Partner lodges & camps", "Accommodation bookings", "Kenya"],
                ["Kenya Wildlife Service", "Park fee payments", "Kenya"],
                ["Anthropic (Claude AI)", "AI Safari Planner", "USA (SCCs)"],
                ["PostHog", "Website analytics (anonymised)", "EU"],
              ].map(([party, purpose, location]) => (
                <tr key={party} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{party}</td>
                  <td className="px-4 py-3 text-gray-600">{purpose}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          SCCs = Standard Contractual Clauses, the approved mechanism for international data transfers under both the Kenya DPA and EU GDPR.{" "}
          <a href="https://pesapal.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1B7A60] hover:underline">
            Pesapal Privacy Policy →
          </a>
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "5. Cookies",
    content: (
      <>
        <p className="text-sm text-gray-700">
          We use a minimal set of cookies to make our website work and to understand how visitors
          use it. No advertising cookies are used.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Cookie</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Purpose</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["engai-currency", "Remember your currency preference", "1 year"],
                ["posthog", "Anonymous website analytics", "1 year"],
                ["_ga", "Anonymous traffic analysis", "2 years"],
                ["Session cookie", "Keep admin/agent logged in", "Session only"],
              ].map(([cookie, purpose, duration]) => (
                <tr key={cookie} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">{cookie}</td>
                  <td className="px-4 py-3 text-gray-600">{purpose}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          You can accept or decline non-essential cookies when you first visit our website. You
          may also change your cookie preferences at any time in your browser settings.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "6. How Long We Keep Your Data",
    content: (
      <>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Data Type</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Retention</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Booking records", "5 years", "KRA tax compliance requirement"],
                ["Payment records", "7 years", "Kenya Revenue Authority"],
                ["Email communications", "3 years", "Customer service records"],
                ["Website analytics", "26 months", "Industry standard"],
                ["Marketing consent", "Until withdrawn + 1 year", "Legal compliance"],
                ["Enquiries (not booked)", "2 years", "Business development"],
              ].map(([type, retention, reason]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{type}</td>
                  <td className="px-4 py-3 text-[#1B7A60] font-medium">{retention}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          Booking records are retained for 5 years as required by the Kenya Revenue Authority
          (KRA) under the Income Tax Act. After the retention period expires, data is
          automatically and permanently deleted from our systems.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "7. Your Rights",
    content: (
      <>
        <p className="text-sm text-gray-700">
          Under the Kenya Data Protection Act 2019, and for EU visitors under the GDPR, you have
          the following rights:
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { right: "Access", desc: "Request a copy of all personal data we hold about you" },
            { right: "Correction", desc: "Request we correct inaccurate or incomplete data" },
            { right: "Erasure", desc: "Request deletion of your data, subject to legal retention requirements" },
            { right: "Restriction", desc: "Request we limit how we process your data" },
            { right: "Portability", desc: "Receive your data in a structured, machine-readable format" },
            { right: "Objection", desc: "Object to processing based on legitimate interest" },
            { right: "Withdraw consent", desc: "Withdraw marketing consent at any time, no questions asked" },
          ].map(({ right, desc }) => (
            <div key={right} className="p-3 rounded-xl border border-gray-200 bg-stone-50">
              <p className="text-xs font-semibold text-[#1B7A60] mb-1">{right}</p>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-gray-700">
          To exercise any right, email{" "}
          <a href="mailto:privacy@engaisafaris.com" className="text-[#1B7A60] hover:underline">
            privacy@engaisafaris.com
          </a>. We will respond within 21 days as required by the Kenya DPA. For EU residents,
          we will respond within 30 days per GDPR requirements.
        </p>
      </>
    ),
  },
  {
    id: "gdpr",
    title: "8. GDPR Compliance (EU & UK Visitors)",
    content: (
      <>
        <p className="text-sm text-gray-700">
          If you are visiting from the European Union or United Kingdom, additional protections apply:
        </p>
        <ul className="mt-3 space-y-1.5 list-disc list-inside text-sm text-gray-700">
          <li>We process your data only on lawful bases (contract performance, legal obligation, legitimate interest, or explicit consent)</li>
          <li>International transfers to the USA use Standard Contractual Clauses (SCCs)</li>
          <li>You have the right to lodge a complaint with your national Data Protection Authority</li>
          <li>EU/UK residents may contact the Irish DPC (our EU representative) or the UK ICO</li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          UK residents may contact:{" "}
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#1B7A60] hover:underline">
            ico.org.uk
          </a>. EU residents may contact their{" "}
          <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener noreferrer" className="text-[#1B7A60] hover:underline">
            national DPA
          </a>.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "9. Governing Law",
    content: (
      <>
        <p>
          This Privacy Policy is governed by the{" "}
          <strong>Kenya Data Protection Act 2019</strong> and the regulations issued thereunder.
          Any disputes regarding this policy shall be subject to the jurisdiction of the Kenyan
          courts, without prejudice to the right of EU/UK residents to seek remedies from their
          local data protection authorities.
        </p>
        <p className="mt-3 text-sm text-gray-700">
          To raise a complaint with the Kenyan regulator:{" "}
          <strong>Office of the Data Protection Commissioner (ODPC)</strong> —{" "}
          <a href="https://odpc.go.ke" target="_blank" rel="noopener noreferrer" className="text-[#1B7A60] hover:underline">
            odpc.go.ke
          </a>
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F1C17] via-[#1B7A60]/80 to-[#0F1C17] pt-20 pb-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#F5A623] text-xs font-semibold uppercase tracking-widest mb-3">Legal</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            We collect the minimum data needed to run your safari brilliantly. We never sell
            it, and we protect it rigorously.
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-400">
            <span>Last updated: March 2026</span>
            <span className="text-gray-600">·</span>
            <span>Kenya Data Protection Act 2019</span>
            <span className="text-gray-600">·</span>
            <span>EU GDPR compliant</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Quick nav */}
          <div className="mb-12 p-5 bg-stone-50 rounded-2xl border border-stone-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Jump to section</p>
            <div className="flex flex-wrap gap-2">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-gray-600 hover:border-[#1B7A60] hover:text-[#1B7A60] transition-colors"
                >
                  {s.title.split(". ")[1]}
                </a>
              ))}
            </div>
          </div>

          {/* Core promise callout */}
          <div className="mb-12 p-6 bg-[#0F1C17] rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-[#1B7A60]/20 border border-[#1B7A60]/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#1B7A60]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.955 11.955 0 0 0 3 10c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Our privacy promise</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                We collect only what we need. We protect everything we hold. We never sell your
                data to anyone. If you want it deleted, we delete it. Simple.
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {SECTIONS.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="pl-5 border-l-4 border-[#1B7A60]/30 hover:border-[#1B7A60] transition-colors"
              >
                <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <div className="text-gray-700 leading-relaxed text-[0.9375rem]">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-16 p-6 bg-[#0F1C17] rounded-2xl text-center">
            <p className="text-gray-400 text-sm mb-2">Privacy questions or data requests?</p>
            <p className="text-white font-semibold text-lg mb-4">Contact our data team directly.</p>
            <a
              href="mailto:privacy@engaisafaris.com"
              className="inline-flex items-center justify-center gap-2 bg-[#1B7A60] hover:bg-[#156650] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              privacy@engaisafaris.com
            </a>
          </div>

          {/* Related links */}
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="text-gray-500">Related:</span>
            <Link href="/terms" className="text-[#1B7A60] hover:underline">Terms &amp; Conditions</Link>
            <span className="text-gray-300">·</span>
            <Link href="/cancellation-policy" className="text-[#1B7A60] hover:underline">Cancellation Policy</Link>
            <span className="text-gray-300">·</span>
            <Link href="/faq" className="text-[#1B7A60] hover:underline">FAQ</Link>
          </div>
        </div>
      </section>
    </>
  );
}
