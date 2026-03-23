import { getDestination, getDestinations, getSafaris } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import SchemaOrg from "@/components/seo/SchemaOrg";
import SafariCard from "@/components/safari/SafariCard";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamicParams = true;

export async function generateStaticParams() {
  const destinations = await getDestinations().catch(() => []);
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const dest = await getDestination(params.slug).catch(() => null);
  if (!dest) return {};
  return {
    title: dest.meta_title ?? `${dest.name} Safari | Engai Safaris Kenya`,
    description: dest.meta_desc ?? dest.tagline ?? undefined,
    alternates: { canonical: `https://www.engaisafaris.com/destinations/${dest.slug}` },
    openGraph: { images: dest.cover_image ? [dest.cover_image] : [] },
  };
}

// Destinations that have directly bookable safaris
const DESTINATION_SAFARIS: Record<string, string[]> = {
  "hells-gate":    ["hells-gate-cycling-day", "naivasha-hells-gate-combo"],
  "lake-naivasha": ["naivasha-day-trip", "naivasha-hells-gate-combo", "naivasha-nakuru-2-day"],
  "masai-mara":    ["3-day-masai-mara", "5-day-mara-amboseli", "3-day-mara-nakuru"],
  "amboseli":      ["5-day-mara-amboseli"],
  "lake-nakuru":   ["lake-nakuru-day-trip", "naivasha-nakuru-2-day", "3-day-mara-nakuru"],
  "nairobi":       ["nairobi-national-park-half-day", "nairobi-park-sheldrick", "nairobi-full-day"],
};

export default async function DestinationPage({ params }: { params: { slug: string } }) {
  const dest = await getDestination(params.slug).catch(() => null);
  if (!dest) notFound();

  const linkedSlugs = DESTINATION_SAFARIS[dest.slug] ?? [];
  const allSafaris = linkedSlugs.length > 0 ? await getSafaris().catch(() => []) : [];
  const linkedSafaris = allSafaris.filter((s) => linkedSlugs.includes(s.slug));

  const descriptionParagraphs = dest.description?.split("\n\n").filter(Boolean) ?? [];

  return (
    <>
      <SchemaOrg
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.engaisafaris.com" },
                { "@type": "ListItem", position: 2, name: "Destinations", item: "https://www.engaisafaris.com/destinations" },
                { "@type": "ListItem", position: 3, name: dest.name, item: `https://www.engaisafaris.com/destinations/${dest.slug}` },
              ],
            },
            {
              "@type": "TouristAttraction",
              name: dest.name,
              description: dest.description,
              url: `https://www.engaisafaris.com/destinations/${dest.slug}`,
              image: dest.cover_image ? [dest.cover_image] : undefined,
              geo: dest.latitude
                ? { "@type": "GeoCoordinates", latitude: dest.latitude, longitude: dest.longitude }
                : undefined,
              containedInPlace: { "@type": "Country", name: "Kenya" },
              touristType: ["Wildlife Safari", "Nature Tourism", "Adventure Tourism"],
              provider: {
                "@type": "TourOperator",
                name: "Engai Safaris",
                url: "https://www.engaisafaris.com",
              },
            },
          ],
        }}
      />

      {/* Cinematic hero — full bleed, bleeds under fixed header */}
      <section className="-mt-16 min-h-[70vh] relative bg-gray-900 flex items-end overflow-hidden">
        {dest.cover_image && (
          <Image src={dest.cover_image} alt={dest.name} fill priority className="object-cover" sizes="100vw" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Breadcrumb — top left */}
        <div className="absolute top-20 left-0 right-0 px-4 md:px-8 max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-white/60">
            <Link href="/" className="hover:text-white/90 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/destinations" className="hover:text-white/90 transition-colors">Destinations</Link>
            <span>/</span>
            <span className="text-white/80">{dest.name}</span>
          </nav>
        </div>

        {/* Bottom content */}
        <div className="relative w-full px-4 md:px-8 pb-12 max-w-7xl mx-auto">
          <p className="eyebrow text-gold-DEFAULT mb-3">{dest.country} · {dest.region}</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.9] mb-4">
            {dest.name}
          </h1>
          {dest.tagline && (
            <p className="text-gray-200 text-xl max-w-2xl leading-relaxed mb-6">{dest.tagline}</p>
          )}

          {/* Info chips */}
          <div className="flex flex-wrap gap-3">
            {dest.peak_fee_usd !== null && dest.peak_fee_usd !== undefined && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <svg className="w-4 h-4 text-gold-DEFAULT flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>
                <span className="text-white text-sm font-semibold">
                  {dest.peak_fee_usd === 0 ? "Free entry" : `$${dest.peak_fee_usd}/person park fee`}
                </span>
                {dest.peak_fee_usd === 26 && (
                  <span className="bg-gold-DEFAULT text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Lowest in Kenya
                  </span>
                )}
              </div>
            )}
            {dest.best_months && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <svg className="w-4 h-4 text-white/70 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span className="text-white text-sm">
                  Best: {(dest.best_months as string[]).slice(0, 3).join(", ")}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-14">

            {/* Description */}
            {descriptionParagraphs.length > 0 && (
              <section>
                <p className="eyebrow text-teal-DEFAULT mb-3">About this destination</p>
                {descriptionParagraphs.map((para, i) => (
                  <p key={i} className="text-gray-600 text-lg leading-relaxed mb-4">{para}</p>
                ))}
              </section>
            )}

            {/* Highlights */}
            {dest.highlights && (
              <section>
                <p className="eyebrow text-teal-DEFAULT mb-3">Highlights</p>
                <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">
                  What makes it special
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(dest.highlights as string[]).map((h) => (
                    <div key={h} className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-xl p-4">
                      <div className="w-5 h-5 rounded-full bg-teal-DEFAULT flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm font-medium leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Wildlife */}
            {dest.wildlife_list && (
              <section className="bg-gray-950 rounded-3xl p-8">
                <p className="eyebrow text-teal-200 mb-3">Wildlife</p>
                <h2 className="font-display text-3xl font-bold text-white mb-6">
                  What you'll see
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(dest.wildlife_list as string[]).map((w) => (
                    <span
                      key={w}
                      className="bg-white/10 border border-white/20 text-gray-200 text-sm px-3 py-1.5 rounded-full"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Linked safaris */}
            {linkedSafaris.length > 0 && (
              <section>
                <p className="eyebrow text-teal-DEFAULT mb-3">Book this destination</p>
                <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
                  Safari packages
                </h2>
                <p className="text-gray-500 text-sm mb-8">
                  Transparent pricing. Instant confirmation. No "contact us for a quote."
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {linkedSafaris.map((safari) => (
                    <SafariCard key={safari.id} safari={safari} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5 lg:pt-2">

            {/* Quick facts card — dark */}
            <div className="bg-gray-950 rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-white text-base border-b border-white/10 pb-4">Quick Facts</h3>

              {dest.region && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Region</span>
                  <span className="font-medium text-white">{dest.region}</span>
                </div>
              )}

              {dest.peak_fee_usd !== null && dest.peak_fee_usd !== undefined && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Park fee</span>
                  <span className="font-medium text-teal-300">
                    {dest.peak_fee_usd === 0 ? "Free" : `$${dest.peak_fee_usd}/person`}
                  </span>
                </div>
              )}

              {dest.best_months && (
                <div className="text-sm">
                  <p className="text-gray-400 mb-2">Best months</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(dest.best_months as string[]).map((m) => (
                      <span key={m} className="bg-teal-DEFAULT/20 border border-teal-DEFAULT/30 text-teal-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {dest.latitude && (
                <a
                  href={`https://www.google.com/maps?q=${dest.latitude},${dest.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-teal-300 hover:text-teal-200 transition-colors pt-1"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  View on Google Maps
                </a>
              )}
            </div>

            {/* CTA buttons */}
            <Link
              href={`/enquire?destination=${dest.slug}`}
              className="flex items-center justify-center gap-2 w-full bg-teal-DEFAULT hover:bg-teal-600 text-white py-4 rounded-xl font-semibold transition-colors text-sm"
            >
              Plan a Trip Here
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=Hi! I'd like to visit ${dest.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1da851] text-white py-4 rounded-xl font-semibold transition-colors text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>

            {/* Cross-sell callouts */}
            {dest.slug === "hells-gate" && (
              <div className="bg-gold-50 border border-gold-100 rounded-2xl p-5 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-gold-DEFAULT flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                  </svg>
                  <p className="font-semibold text-gold-DEFAULT">Combo Deal</p>
                </div>
                <p className="text-gray-600 mb-3 leading-relaxed">
                  Pair Hell's Gate with Lake Naivasha boat safari for Kenya's best value wildlife day.
                </p>
                <Link href="/safaris/naivasha-hells-gate-combo" className="text-teal-DEFAULT font-semibold hover:underline">
                  View Naivasha + Hell's Gate Combo →
                </Link>
              </div>
            )}

            {dest.slug === "lake-naivasha" && (
              <>
                <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-teal-DEFAULT flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                    </svg>
                    <p className="font-semibold text-teal-DEFAULT">Add Hell's Gate</p>
                  </div>
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    Hell's Gate is 20 minutes away. Combine both for Kenya's best value day trip.
                  </p>
                  <Link href="/safaris/naivasha-hells-gate-combo" className="text-teal-DEFAULT font-semibold hover:underline">
                    View Combo Package →
                  </Link>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-amber-700 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>
                    <p className="font-semibold text-amber-700">Add Lake Nakuru</p>
                  </div>
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    Nakuru is 45 minutes away. Both rhino species + flamingos — Kenya's best 2-day circuit.
                  </p>
                  <Link href="/safaris/naivasha-nakuru-2-day" className="text-teal-DEFAULT font-semibold hover:underline">
                    View 2-Day Circuit →
                  </Link>
                </div>
              </>
            )}

            {dest.slug === "lake-nakuru" && (
              <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-teal-DEFAULT flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                  <p className="font-semibold text-teal-DEFAULT">Add Lake Naivasha</p>
                </div>
                <p className="text-gray-600 mb-3 leading-relaxed">
                  Naivasha is 45 minutes away. Add a boat safari + Hell's Gate cycling for Kenya's best 2-day circuit.
                </p>
                <Link href="/safaris/naivasha-nakuru-2-day" className="text-teal-DEFAULT font-semibold hover:underline">
                  View 2-Day Circuit →
                </Link>
              </div>
            )}

            {["masai-mara", "amboseli", "lake-nakuru", "lake-naivasha", "hells-gate"].includes(dest.slug) && (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-gray-700 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  <p className="font-semibold text-gray-800">Add a Nairobi Day</p>
                </div>
                <p className="text-gray-600 mb-3 leading-relaxed">
                  Every tourist lands at JKIA. Add Nairobi NP + Sheldrick elephants to the start or end of any safari.
                </p>
                <Link href="/safaris/nairobi-full-day" className="text-teal-DEFAULT font-semibold hover:underline">
                  View Nairobi Full Day →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
