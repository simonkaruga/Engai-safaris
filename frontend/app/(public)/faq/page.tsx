import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ: Kenya Safari Questions Answered",
  description: "50 frequently asked questions about Kenya safaris: costs, packing, visas, health, wildlife and more.",
  alternates: { canonical: "https://www.engaisafaris.com/faq" },
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
      {/* JSON-LD schema — serialised from our own static data, not user input */}
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
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </>
  );
}
