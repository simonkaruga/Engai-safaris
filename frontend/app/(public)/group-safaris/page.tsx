import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Join a Group Safari Kenya | From $650/person | Engai Safaris",
  description:
    "Join a shared group safari in Kenya. Share a private 4x4 with up to 6 guests, same guide and camps as a private safari — at a fraction of the cost. Fixed weekly departures from Nairobi.",
  alternates: { canonical: "https://www.engaisafaris.com/group-safaris" },
};

const BENEFITS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
      </svg>
    ),
    title: "Lower price",
    desc: "Vehicle costs split across 4–6 guests. You get the same private 4x4 experience at the 6-person shared rate.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5z" />
      </svg>
    ),
    title: "Same guide & camps as private",
    desc: "No compromise on quality. Your guide, vehicle, accommodation, and meals are identical to a private safari.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0z" />
      </svg>
    ),
    title: "Meet fellow travellers",
    desc: "Groups are typically 4–6 guests from different countries. Many guests leave as friends — and return together.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    title: "Fixed departure dates",
    desc: "No planning stress. Pick a package, pick a date, book your spot. We handle everything else.",
  },
];

const PACKAGES = [
  {
    slug: "join-group-3-day-masai-mara",
    name: "3-Day Masai Mara",
    duration: "3 days",
    price: 650,
    departure: "Every Friday from Nairobi",
    parks: ["Masai Mara"],
    highlight: "The world-famous Mara — big cats, wildebeest, open plains.",
    badge: "Most popular",
  },
  {
    slug: "join-group-5-day-mara-amboseli",
    name: "5-Day Mara & Amboseli",
    duration: "5 days",
    price: 1370,
    departure: "Every other Monday",
    parks: ["Masai Mara", "Amboseli"],
    highlight: "Mara's big cats plus Amboseli's elephants against Kilimanjaro.",
    badge: "Best value",
  },
  {
    slug: "join-group-7-day-classic-kenya",
    name: "7-Day Classic Kenya",
    duration: "7 days",
    price: 1950,
    departure: "Every other Sunday",
    parks: ["Masai Mara", "Amboseli", "Naivasha"],
    highlight: "The definitive Kenya safari — three parks, three ecosystems.",
    badge: null,
  },
];

const STEPS = [
  { n: "1", title: "Pick your package", desc: "Choose from our three group departures below. All prices are per person with no hidden fees." },
  { n: "2", title: "Book your spot", desc: "A deposit secures your place in the group. Pay the balance 30 days before departure." },
  { n: "3", title: "We match you with your group", desc: "We'll introduce you to your fellow travellers via WhatsApp a week before departure." },
];

const FAQS = [
  {
    q: "Who will I be travelling with?",
    a: "Groups are typically 4–6 guests from a mix of nationalities — solo travellers, couples, and sometimes small groups of friends. We intentionally keep groups small so the experience stays personal.",
  },
  {
    q: "Can couples join a group safari?",
    a: "Absolutely. Couples book two spots and share the vehicle with the rest of the group. Many couples prefer this — you get the social atmosphere without sacrificing the private guide experience.",
  },
  {
    q: "What if the group doesn't fill up?",
    a: "We guarantee the departure as long as at least 4 guests have booked. If we fall below 4 guests, we'll offer you a full refund or the option to move to the next departure date.",
  },
  {
    q: "What's included?",
    a: "Everything a private safari includes: a dedicated professional guide, a private 4x4 Land Cruiser or Jeep, all accommodation, meals (full board), park entry fees, and game drives. Flights and travel insurance are excluded.",
  },
];

export default function GroupSafarisPage() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP;

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-teal-700 text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-obsidian opacity-30 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <p className="eyebrow text-teal-200 mb-4 tracking-widest uppercase text-xs font-semibold">Group Safaris</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Join a Group Safari
          </h1>
          <p className="text-teal-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Share a private 4x4 with up to 6 guests and explore Kenya at a fraction of the private cost — same guide, same camps, same experience.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#packages" className="bg-gold-DEFAULT hover:bg-gold-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-gold">
              See Departure Dates
            </a>
            {waNumber && (
              <a
                href={`https://wa.me/${waNumber}?text=Hi, I'd like to know more about group safaris`}
                className="border border-teal-400 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-teal-600 transition-colors"
              >
                Ask on WhatsApp
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Why join a group? */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="eyebrow text-teal-DEFAULT mb-3 uppercase tracking-widest text-xs font-semibold">The benefits</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">Why join a group safari?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-teal-50 rounded-2xl p-6 hover:shadow-card transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center text-teal-DEFAULT mb-4">
                {b.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{b.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Package cards */}
      <section id="packages" className="bg-stone-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow text-teal-DEFAULT mb-3 uppercase tracking-widest text-xs font-semibold">Choose your trip</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">Group departure packages</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">All prices are per person. Deposits accepted to secure your spot.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <div key={pkg.slug} className="bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-shadow flex flex-col overflow-hidden">
                {pkg.badge && (
                  <div className="bg-gold-DEFAULT text-white text-xs font-bold uppercase tracking-wider text-center py-2">
                    {pkg.badge}
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{pkg.duration}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{pkg.highlight}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {pkg.parks.map((p) => (
                      <span key={p} className="text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full font-medium">{p}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-teal-DEFAULT flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    {pkg.departure}
                  </div>

                  <div className="mt-auto">
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900">${pkg.price.toLocaleString()}</span>
                      <span className="text-gray-400 text-sm ml-1">/ person</span>
                    </div>
                    <Link
                      href={`/safaris/${pkg.slug}`}
                      className="block w-full bg-teal-DEFAULT hover:bg-teal-600 text-white font-semibold text-center py-3 rounded-xl transition-colors"
                    >
                      Book this trip
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="eyebrow text-teal-DEFAULT mb-3 uppercase tracking-widest text-xs font-semibold">Simple process</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">How it works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s) => (
            <div key={s.n} className="text-center">
              <div className="w-12 h-12 rounded-full bg-teal-DEFAULT text-white font-display text-xl font-bold flex items-center justify-center mx-auto mb-4">
                {s.n}
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-stone-50 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow text-teal-DEFAULT mb-3 uppercase tracking-widest text-xs font-semibold">FAQ</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">Common questions</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-700 text-white py-16 px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Not sure which trip is right for you?
        </h2>
        <p className="text-teal-100 mb-8 max-w-xl mx-auto">
          Chat with us on WhatsApp and we'll help you pick the right departure date and package for your travel plans.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {waNumber && (
            <a
              href={`https://wa.me/${waNumber}?text=Hi, I'm interested in joining a group safari`}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              Chat with us on WhatsApp
            </a>
          )}
          <Link href="/safaris" className="border border-teal-500 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-teal-600 transition-colors">
            Browse All Safaris
          </Link>
        </div>
      </section>
    </div>
  );
}
