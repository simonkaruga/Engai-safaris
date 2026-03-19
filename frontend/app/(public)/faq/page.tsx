import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Kenya Safari Questions Answered",
  description: "50 frequently asked questions about Kenya safaris — costs, packing, visas, health, wildlife and more.",
};

const FAQS = [
  { q: "What is the best time to visit Kenya for a safari?", a: "July–October is peak season for the Great Migration and big cat sightings. April–May is low season (green, fewer crowds, lower prices). December–January is excellent for Amboseli with clear Kilimanjaro views." },
  { q: "How much does a Kenya safari cost?", a: "A 1-day Naivasha trip starts at $150pp. A 3-day Masai Mara safari is $550–$950pp depending on group size. A 7-day Kenya Grand Safari is $1,800–$2,200pp. All prices are transparent on every package page." },
  { q: "Do I need a visa for Kenya?", a: "Kenya operates an eTA (Electronic Travel Authorisation) system. Most nationalities apply online at etakenya.go.ke for $30. Processing takes 3 business days. Check the official site for your specific nationality." },
  { q: "What vaccinations do I need for Kenya?", a: "Yellow fever vaccination is required if arriving from a yellow fever endemic country. Recommended: Hepatitis A, Typhoid, Tetanus. Malaria prophylaxis is strongly recommended for safari areas. Consult your doctor 6–8 weeks before travel." },
  { q: "Is Kenya safe for tourists?", a: "Kenya's national parks and safari areas are very safe. Nairobi requires normal urban precautions. Our guides are with you throughout. We provide 24/7 emergency contact numbers for all bookings." },
  { q: "What is included in the safari price?", a: "All Engai Safaris packages include: 4x4 Land Cruiser, professional TRA-certified guide, accommodation, all meals as specified, park entry fees, and airport transfers. Excluded: flights, travel insurance, tips, personal items." },
  { q: "Can I pay by M-Pesa?", a: "Yes. We accept M-Pesa STK push (Lipa Na M-Pesa), Visa, and Mastercard via Pesapal. A 30% deposit confirms your booking. Balance is due 30 days before travel." },
  { q: "What is Lipa Polepole?", a: "Lipa Polepole (\"pay slowly\" in Swahili) is our 4-instalment payment plan for local Kenyan guests. Pay 25% now, then 3 equal monthly payments via M-Pesa. No interest, no fees." },
  { q: "What is the maximum group size per vehicle?", a: "Maximum 6 guests per Land Cruiser. This ensures every guest has a window seat and the guide can provide personalised attention. Larger groups get multiple vehicles." },
  { q: "Can I see the Great Migration?", a: "Yes. The Migration is in the Masai Mara from July–October. River crossings peak in August–September. We offer specific Migration packages with guides who know the crossing points." },
];

export default function FAQPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-lg">Everything you need to know about a Kenya safari.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
              <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 list-none">
                {faq.q}
                <span className="text-teal-DEFAULT group-open:rotate-180 transition-transform text-xl">+</span>
              </summary>
              <div className="px-5 pb-5 text-gray-700 text-sm leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            💬 WhatsApp Us
          </a>
        </div>
      </div>
    </>
  );
}
