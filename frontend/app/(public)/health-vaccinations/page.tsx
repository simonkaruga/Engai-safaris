import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Health & Vaccinations for Kenya Safari | Engai Safaris",
  description:
    "Complete Kenya safari health guide: required vaccinations, malaria prevention, what to pack in your medical kit, and entry requirements for 2025.",
};

const VACCINES = [
  {
    name: "Yellow Fever",
    required: true,
    detail:
      "A Yellow Fever certificate is required if you are arriving from a yellow fever endemic country (most of sub-Saharan Africa and South America). Confirm with your nearest travel clinic at least 10 days before departure.",
  },
  {
    name: "Hepatitis A",
    required: false,
    detail:
      "Recommended for all travellers. Transmitted through contaminated food and water. A two-dose course gives protection for 20+ years.",
  },
  {
    name: "Hepatitis B",
    required: false,
    detail:
      "Recommended if you may need medical treatment or plan an extended stay. Three-dose course over 6 months, or accelerated schedule available.",
  },
  {
    name: "Typhoid",
    required: false,
    detail:
      "Recommended. Especially relevant if you will spend time in rural areas or eat street food. Injectable or oral vaccine available.",
  },
  {
    name: "Tetanus / Diphtheria / Polio",
    required: false,
    detail:
      "Ensure routine vaccinations are up to date before travel. A booster is recommended if you haven't had one in the last 10 years.",
  },
  {
    name: "Meningococcal",
    required: false,
    detail:
      "Recommended for extended stays, especially in Northern Kenya border regions. Single dose of MenACWY vaccine.",
  },
  {
    name: "Rabies",
    required: false,
    detail:
      "Consider if you will be doing bush walks, working with animals, or staying in remote areas far from medical care. Pre-exposure course is 3 doses.",
  },
];

const MALARIA_REGIONS = [
  {
    region: "Masai Mara & Laikipia",
    risk: "Moderate",
    color: "text-amber-600",
    note: "Altitude varies. Risk present but lower than coast. Prophylaxis recommended.",
  },
  {
    region: "Amboseli & Tsavo",
    risk: "Moderate",
    color: "text-amber-600",
    note: "Low to moderate risk. Prophylaxis recommended.",
  },
  {
    region: "Nairobi (1,700m)",
    risk: "Very Low",
    color: "text-green-600",
    note: "High altitude, malaria risk is negligible in the city. Discuss with your doctor.",
  },
  {
    region: "Lake Victoria & Coast",
    risk: "Higher",
    color: "text-red-600",
    note: "Higher transmission areas. Prophylaxis strongly recommended.",
  },
];

const MEDS = [
  {
    name: "Atovaquone/Proguanil (Malarone)",
    notes:
      "Start 1–2 days before travel, take daily during stay, stop 7 days after return. Well tolerated, fewer side effects. No resistance reported in Kenya.",
  },
  {
    name: "Doxycycline",
    notes:
      "Start 1–2 days before travel, take daily, stop 4 weeks after return. Cheap but can cause sun sensitivity, so wear high SPF sunscreen.",
  },
  {
    name: "Mefloquine (Lariam)",
    notes:
      "Weekly tablet. Effective but may cause vivid dreams and mood changes in some people. Start 2–3 weeks before travel.",
  },
];

export default function HealthVaccinationsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-teal-DEFAULT py-16 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-teal-100">
            Pre-Trip Guide
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Health &amp; Vaccinations
          </h1>
          <p className="text-teal-100 text-lg leading-relaxed max-w-2xl mx-auto">
            Kenya is a safe and well-visited destination. With the right
            preparation, most safari-goers have no health issues at all. Here's
            everything you need to know.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-16">
        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-5 text-sm text-amber-800">
          <strong>Important:</strong> This page is for general information only.
          Always consult a qualified travel health professional or GP at least
          6–8 weeks before travel. They will tailor advice to your specific
          health history, itinerary, and the vaccines you have already had.
        </div>

        {/* Vaccinations */}
        <section>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
            Vaccinations
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Visit a travel clinic or your GP 6–8 weeks before departure. Some
            vaccines need multiple doses spread over weeks.
          </p>
          <div className="space-y-3">
            {VACCINES.map((v) => (
              <div
                key={v.name}
                className="border border-gray-200 rounded-xl p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">
                    {v.required ? (
                      <span className="inline-block bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Required (some)
                      </span>
                    ) : (
                      <span className="inline-block bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {v.name}
                    </h3>
                    <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                      {v.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Malaria */}
        <section>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
            Malaria
          </h2>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Malaria is present in Kenya but risk varies significantly by region
            and altitude. Most safari parks are at low-to-moderate risk. Taking
            prophylaxis and avoiding mosquito bites are both important.
          </p>

          <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
            Risk by region
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {MALARIA_REGIONS.map((r) => (
              <div
                key={r.region}
                className="border border-gray-200 rounded-xl p-4"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-gray-900 text-sm">
                    {r.region}
                  </span>
                  <span className={`text-xs font-bold ${r.color}`}>
                    {r.risk}
                  </span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {r.note}
                </p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
            Prophylaxis options
          </h3>
          <div className="space-y-3">
            {MEDS.map((m) => (
              <div
                key={m.name}
                className="border border-gray-200 rounded-xl p-4"
              >
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {m.name}
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {m.notes}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800">
            <strong>Mosquito bite prevention:</strong> Use DEET repellent (30–50%
            concentration), cover arms and legs at dusk and dawn, sleep under a
            mosquito net if one is provided, and choose accommodation with screened
            windows where possible.
          </div>
        </section>

        {/* Entry requirements */}
        <section>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
            Kenya Entry Requirements
          </h2>
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-xs">1</span>
              <p>
                <strong>eVisa / Visa on Arrival —</strong> Most nationalities
                can apply for an eVisa online at{" "}
                <strong>evisa.go.ke</strong> before travel. The standard tourist
                eVisa is valid for 90 days. Apply at least 2 weeks before
                departure.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-xs">2</span>
              <p>
                <strong>Passport validity —</strong> Your passport must be valid
                for at least 6 months beyond your planned date of departure from
                Kenya.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-xs">3</span>
              <p>
                <strong>Yellow Fever certificate —</strong> Required if you are
                arriving from or transiting through a yellow fever endemic
                country. Border officials do check this. Carry the original
                certificate (not a photo).
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-xs">4</span>
              <p>
                <strong>Travel insurance —</strong> Not a visa requirement but
                strongly recommended. Ensure your policy covers emergency
                medical evacuation, which is the most important coverage for
                remote safari areas.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-xs">5</span>
              <p>
                <strong>ETA (Electronic Travel Authorisation) —</strong> Kenya
                introduced the ETA system in 2023. Check the current
                requirements at{" "}
                <strong>etakenya.go.ke</strong> as rules may have been updated.
              </p>
            </div>
          </div>
        </section>

        {/* Medical kit */}
        <section>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
            Medical Kit Checklist
          </h2>
          <p className="text-gray-600 text-sm mb-5 leading-relaxed">
            Pharmacies exist in Nairobi and major towns. Once in the bush, the
            nearest pharmacy may be hours away. Pack these basics:
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Antimalarial medication (as prescribed)",
              "DEET insect repellent (30–50%)",
              "Antihistamine tablets (for bites, allergies)",
              "Oral rehydration sachets",
              "Ibuprofen / paracetamol",
              "Imodium (loperamide) for diarrhoea",
              "Antibiotic (Ciprofloxacin), ask your doctor first",
              "Antiseptic cream and plasters",
              "SPF 50+ sunscreen",
              "Blister plasters",
              "Hand sanitiser",
              "Any regular prescription medication (extra supply)",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                <svg className="w-3.5 h-3.5 text-teal-DEFAULT flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Water & food */}
        <section>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
            Food &amp; Water Safety
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>
              <strong>Water:</strong> Drink bottled or boiled water only. All Engai
              safari camps and lodges provide safe drinking water. Do not drink
              from taps or rivers.
            </p>
            <p>
              <strong>Food:</strong> Engai-selected camps serve freshly prepared
              meals with high food safety standards. When eating in Nairobi, stick
              to reputable restaurants. Avoid raw salads at roadside stalls.
            </p>
            <p>
              <strong>Ice:</strong> Ask whether ice is made from purified water
              before accepting it in drinks.
            </p>
          </div>
        </section>

        {/* Altitude */}
        <section>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
            Sun &amp; Altitude
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>
              Kenya straddles the equator. UV radiation is strong year-round, even
              on cloudy days. Wear SPF 50+ sunscreen, a hat, and UV-protective
              sunglasses on game drives.
            </p>
            <p>
              Nairobi sits at 1,700m and the Masai Mara at around 1,500m. Minor
              altitude effects (slight headache, fatigue) may be felt by some
              people on arrival. These pass within 24 hours. Drink plenty of water
              and avoid strenuous activity on day one.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-50 rounded-2xl p-8 text-center">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">
            Questions about your trip?
          </h2>
          <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
            Our team is available 7 days a week to answer any questions before
            your safari, whether health, logistics or anything else.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-teal-DEFAULT text-teal-DEFAULT text-sm font-semibold hover:bg-teal-50 transition-colors"
            >
              Read the FAQ
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-teal-DEFAULT text-white text-sm font-semibold hover:bg-teal-dark transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
