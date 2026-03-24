import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | Engai Safaris",
  description:
    "Booking terms, payment policy, cancellation fees, and conditions for safaris with Engai Safaris Ltd, Nairobi, Kenya. Governed by the laws of the Republic of Kenya.",
  alternates: { canonical: "https://www.engaisafaris.com/terms" },
};

const SECTIONS = [
  {
    id: "company",
    title: "1. Company Information",
    content: (
      <>
        <p>
          These Terms and Conditions (&ldquo;Terms&rdquo;) govern all bookings and contracts made with{" "}
          <strong>Engai Safaris Ltd</strong>, a company incorporated and registered in Kenya,
          with offices in Nairobi, Kenya (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;, &ldquo;Engai Safaris&rdquo;).
        </p>
        <p className="mt-3">
          By submitting a booking or making a deposit payment, you confirm that you have read,
          understood, and agree to be bound by these Terms in full. The person making the
          booking accepts these Terms on behalf of all members of the travelling party.
        </p>
        <div className="mt-4 p-4 bg-stone-50 rounded-xl border border-stone-200 text-sm text-gray-600 space-y-1">
          <p><strong>Engai Safaris Ltd</strong></p>
          <p>Nairobi, Kenya</p>
          <p>
            Email:{" "}
            <a href="mailto:bookings@engaisafaris.com" className="text-[#1B7A60] hover:underline">
              bookings@engaisafaris.com
            </a>
          </p>
        </div>
      </>
    ),
  },
  {
    id: "booking-payment",
    title: "2. Booking & Payment Terms",
    content: (
      <>
        <p>A booking is confirmed when all three of the following are met:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 text-sm">
          <li>You have submitted a completed booking form or written enquiry</li>
          <li>We have sent a written booking confirmation email with your reference number</li>
          <li>Your deposit payment has been received and cleared</li>
        </ul>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
            <p className="text-xs font-semibold text-[#1B7A60] uppercase tracking-wider mb-1">Deposit</p>
            <p className="text-2xl font-bold text-gray-900">30%</p>
            <p className="text-sm text-gray-600 mt-1">Due at time of booking to secure your dates</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">Balance</p>
            <p className="text-2xl font-bold text-gray-900">70%</p>
            <p className="text-sm text-gray-600 mt-1">Due 30 days before departure date</p>
          </div>
        </div>

        <p className="mt-5 text-sm text-gray-700">
          <strong>Currency:</strong> International tourists are quoted in USD. Local Kenyan clients
          are quoted in KES. The exchange rate is locked at the date of deposit payment.
        </p>
        <p className="mt-3 text-sm text-gray-700">
          <strong>Price lock:</strong> Once your deposit is received, your safari price is fixed.
          We will not increase your price except where government-imposed park fee changes are
          applied at cost (you will be notified immediately) or in force majeure circumstances.
        </p>
        <p className="mt-3 text-sm text-gray-700">
          <strong>Payment methods:</strong> M-Pesa (STK Push), Visa, and Mastercard via Pesapal
          (PCI DSS compliant). Lipa Polepole instalment plan available for Kenyan residents.
        </p>
      </>
    ),
  },
  {
    id: "cancellation-client",
    title: "3. Cancellation by Client",
    content: (
      <>
        <p>
          All cancellations must be submitted in writing to{" "}
          <a href="mailto:bookings@engaisafaris.com" className="text-[#1B7A60] hover:underline">
            bookings@engaisafaris.com
          </a>{" "}
          quoting your booking reference. Cancellation charges are calculated from the date written
          notice is received:
        </p>

        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Notice Period</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Cancellation Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-700">60 days or more before departure</td>
                <td className="px-4 py-3 font-medium text-green-700">10% (admin fee only)</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-700">30–59 days before departure</td>
                <td className="px-4 py-3 font-medium text-amber-700">30% of total price</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-700">14–29 days before departure</td>
                <td className="px-4 py-3 font-medium text-orange-700">50% of total price</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-700">Less than 14 days / no-show</td>
                <td className="px-4 py-3 font-medium text-red-700">100% — non-refundable</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-gray-600 bg-amber-50 border border-amber-100 rounded-xl p-4">
          <strong className="text-amber-800">Travel insurance required:</strong> Cancellation
          charges apply regardless of reason — including illness, injury, or bereavement — unless
          your travel insurance covers the cost. We strongly recommend comprehensive travel insurance
          purchased at the time of booking.
        </p>
      </>
    ),
  },
  {
    id: "cancellation-engai",
    title: "4. Cancellation by Engai Safaris",
    content: (
      <>
        <p>We may cancel a confirmed booking in the following circumstances:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 text-sm">
          <li>Non-payment of deposit or balance by the agreed due date</li>
          <li>Force majeure events (see Clause 9)</li>
          <li>Government travel advisories or park closures affecting the destination</li>
          <li>Minimum group size not achieved for scheduled group departures</li>
        </ul>
        <p className="mt-4 text-sm text-gray-700">
          If Engai Safaris cancels your booking for reasons other than your non-payment or force
          majeure, you will receive either:
        </p>
        <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 text-sm">
          <li>A full refund of all monies paid; or</li>
          <li>An alternative safari of equivalent value at mutually agreed dates</li>
        </ul>
        <p className="mt-3 text-sm text-gray-700">
          In force majeure cancellations, we will refund all amounts received minus any
          non-recoverable costs already paid to third-party suppliers on your behalf. We will
          provide documentation of all such costs.
        </p>
      </>
    ),
  },
  {
    id: "inclusions",
    title: "5. What's Included & Excluded",
    content: (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
          <div>
            <p className="text-xs font-semibold text-[#1B7A60] uppercase tracking-wider mb-3">Included</p>
            <ul className="space-y-1.5 text-sm text-gray-700">
              {[
                "4x4 Land Cruiser (pop-up roof)",
                "Professional TRA-certified guide",
                "All park entry & conservation fees",
                "Accommodation as specified",
                "All meals as per itinerary",
                "Airport/hotel transfers",
                "Bottled water in vehicle",
                "Safari briefing documents",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 w-4 h-4 flex-shrink-0 rounded-full bg-teal-100 text-[#1B7A60] flex items-center justify-center text-xs">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-3">Excluded</p>
            <ul className="space-y-1.5 text-sm text-gray-700">
              {[
                "International or domestic flights",
                "Kenya e-Visa / eTA fees",
                "Travel insurance (your responsibility)",
                "Tips and gratuities for guides",
                "Personal items and laundry",
                "Alcoholic beverages (unless noted)",
                "Activities not listed in itinerary",
                "Medical expenses",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 w-4 h-4 flex-shrink-0 rounded-full bg-red-50 text-red-400 flex items-center justify-center text-xs">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "travel-insurance",
    title: "6. Travel Insurance",
    content: (
      <>
        <p>
          Travel insurance is <strong>strongly recommended</strong> for all clients and required
          for minors. Your policy should cover, as a minimum:
        </p>
        <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700 text-sm">
          <li>Trip cancellation and interruption</li>
          <li>Medical evacuation and repatriation (minimum $100,000 USD)</li>
          <li>Emergency medical treatment in Kenya</li>
          <li>Loss or theft of personal belongings</li>
          <li>Personal liability</li>
        </ul>
        <p className="mt-4 text-sm text-gray-700">
          We recommend{" "}
          <a href="https://www.worldnomads.com" target="_blank" rel="noopener noreferrer" className="text-[#1B7A60] hover:underline">
            World Nomads
          </a>
          {" "}or{" "}
          <a href="https://www.allianz.com" target="_blank" rel="noopener noreferrer" className="text-[#1B7A60] hover:underline">
            Allianz Travel Insurance
          </a>
          {" "}as starting points. Engai Safaris is not affiliated with any insurance provider and
          receives no commission from any recommendation.
        </p>
      </>
    ),
  },
  {
    id: "park-fees",
    title: "7. Park Fee Changes",
    content: (
      <>
        <p>
          Park entry fees are set by Kenya Wildlife Service (KWS), the Kenya Forest Service, and
          private conservancies. These fees are subject to change by the relevant authority at any time,
          including after your booking is confirmed.
        </p>
        <p className="mt-3 text-sm text-gray-700">
          If park fees increase between your deposit date and your departure date, the additional
          amount will be passed on to you at cost, with no mark-up by Engai Safaris. We will notify
          you in writing as soon as we receive official notice of any fee change affecting your booking.
          If you do not wish to pay the increase, you may cancel and receive a full refund of all
          monies paid.
        </p>
      </>
    ),
  },
  {
    id: "wildlife-disclaimer",
    title: "8. Wildlife & Nature Disclaimer",
    content: (
      <>
        <p>
          Safari activities take place in wild, natural environments. Wildlife sightings —
          including the Big Five — <strong>cannot be guaranteed</strong>. Animal behaviour is entirely
          unpredictable. Engai Safaris will use all reasonable skill and expertise to maximise
          wildlife sightings but accepts no liability for the absence of any particular species.
        </p>
        <p className="mt-3 text-sm text-gray-700">
          The Great Migration river crossings (July–October) depend entirely on wildebeest
          behaviour and cannot be predicted or guaranteed at any specific date or location. Weather
          conditions are part of the natural safari experience and do not constitute grounds for
          refund or compensation.
        </p>
      </>
    ),
  },
  {
    id: "force-majeure",
    title: "9. Force Majeure",
    content: (
      <>
        <p>
          Engai Safaris accepts no liability for failure to perform any obligation caused by
          circumstances beyond our reasonable control. Force majeure events include, but are not
          limited to:
        </p>
        <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700 text-sm">
          <li>Natural disasters (floods, drought, volcanic activity, earthquake)</li>
          <li>Acts of terrorism, war, or civil unrest</li>
          <li>Government travel bans, border closures, or park closures</li>
          <li>Pandemic or epidemic declarations (WHO or Kenya Government)</li>
          <li>Industrial action or strikes affecting transport infrastructure</li>
        </ul>
        <p className="mt-4 text-sm text-gray-700">
          In all force majeure situations, we will make every effort to reschedule your safari to
          mutually agreed alternative dates at no additional charge, subject to availability.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "10. Liability Limitations",
    content: (
      <>
        <p>
          Engai Safaris holds Public Liability Insurance covering incidents during our guiding
          services. Our maximum liability to you for any claim shall not exceed the total safari
          price paid to us.
        </p>
        <p className="mt-3 text-sm text-gray-700">We do not accept liability for:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 text-sm">
          <li>Loss or theft of personal belongings during the safari</li>
          <li>Personal injury not caused by our negligence or that of our employees</li>
          <li>Consequential or indirect losses (missed flights, lost business, etc.)</li>
          <li>Acts or omissions of third-party suppliers (lodges, airlines, conservancies)</li>
          <li>Injuries resulting from participation in optional activities</li>
        </ul>
        <p className="mt-4 text-sm text-gray-700">
          By accepting these Terms, you acknowledge the inherent risks of wildlife safaris and
          that you participate entirely at your own risk. Engai Safaris reserves the right to
          remove any client from a safari without refund if their behaviour endangers wildlife,
          other guests, or staff, or violates KWS regulations.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "11. Governing Law",
    content: (
      <>
        <p>
          These Terms are governed by and construed in accordance with the laws of the{" "}
          <strong>Republic of Kenya</strong>. Any disputes arising from these Terms or any booking
          shall be subject to the exclusive jurisdiction of the Kenyan courts.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F1C17] via-[#1B7A60]/80 to-[#0F1C17] pt-20 pb-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#F5A623] text-xs font-semibold uppercase tracking-widest mb-3">Legal</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Clear, honest terms for every safari booking. Governed by the laws of the Republic of Kenya.
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-400">
            <span>Last updated: March 2026</span>
            <span className="text-gray-600">·</span>
            <span>Governing law: Republic of Kenya</span>
            <span className="text-gray-600">·</span>
            <span>Engai Safaris Ltd, Nairobi</span>
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
            <p className="text-gray-400 text-sm mb-2">Questions about these terms?</p>
            <p className="text-white font-semibold text-lg mb-4">We&apos;re happy to explain anything.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:bookings@engaisafaris.com"
                className="inline-flex items-center justify-center gap-2 bg-[#1B7A60] hover:bg-[#156650] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                bookings@engaisafaris.com
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:bg-white/5 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Contact Page
              </Link>
            </div>
          </div>

          {/* Related links */}
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="text-gray-500">Related:</span>
            <Link href="/cancellation-policy" className="text-[#1B7A60] hover:underline">Cancellation Policy</Link>
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
