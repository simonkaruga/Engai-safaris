import { getDestination, getDestinations, getSafaris } from "@/lib/api";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/seo/SchemaOrg";
import BreadcrumbNav from "@/components/seo/BreadcrumbNav";
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
    openGraph: { images: dest.cover_image ? [dest.cover_image] : [] },
  };
}

// Destinations that have directly bookable safaris — map slug → safari slugs to surface
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

  // Fetch linked safaris if any
  const linkedSlugs = DESTINATION_SAFARIS[dest.slug] ?? [];
  const allSafaris = linkedSlugs.length > 0 ? await getSafaris().catch(() => []) : [];
  const linkedSafaris = allSafaris.filter((s) => linkedSlugs.includes(s.slug));

  const descriptionParagraphs = dest.description?.split("\n\n").filter(Boolean) ?? [];

  return (
    <>
      <SchemaOrg
        schema={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: dest.name,
          description: dest.description,
          geo: dest.latitude
            ? { "@type": "GeoCoordinates", latitude: dest.latitude, longitude: dest.longitude }
            : undefined,
        }}
      />

      <BreadcrumbNav
        items={[
          { label: "Destinations", href: "/destinations" },
          { label: dest.name, href: `/destinations/${dest.slug}` },
        ]}
      />

      {/* Hero */}
      <div
        className="h-[60vh] bg-cover bg-center relative bg-gray-800"
        style={{ backgroundImage: dest.cover_image ? `url(${dest.cover_image})` : undefined }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-5xl mx-auto">
          <p className="text-gold-DEFAULT font-semibold text-sm uppercase tracking-widest mb-2">
            {dest.country} · {dest.region}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
            {dest.name}
          </h1>
          {dest.tagline && (
            <p className="text-xl text-gray-200 max-w-2xl">{dest.tagline}</p>
          )}

          {/* Park fee badge */}
          {dest.peak_fee_usd !== null && dest.peak_fee_usd !== undefined && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
              <span className="text-white text-sm font-semibold">
                🎟 Park fee: ${dest.peak_fee_usd === 0 ? "Free entry" : `${dest.peak_fee_usd}/person`}
              </span>
              {dest.peak_fee_usd === 26 && (
                <span className="bg-gold-DEFAULT text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  Lowest in Kenya
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Description */}
            {descriptionParagraphs.length > 0 && (
              <section>
                {descriptionParagraphs.map((para, i) => (
                  <p key={i} className="text-gray-700 text-lg leading-relaxed mb-4">{para}</p>
                ))}
              </section>
            )}

            {/* Highlights */}
            {dest.highlights && (
              <section>
                <h2 className="font-display text-2xl font-bold mb-5">Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(dest.highlights as string[]).map((h) => (
                    <div key={h} className="flex items-start gap-3 bg-teal-50 rounded-lg p-3">
                      <span className="text-teal-DEFAULT mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-gray-700 text-sm font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Wildlife */}
            {dest.wildlife_list && (
              <section>
                <h2 className="font-display text-2xl font-bold mb-5">Wildlife</h2>
                <div className="flex flex-wrap gap-2">
                  {(dest.wildlife_list as string[]).map((w) => (
                    <span
                      key={w}
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full border border-gray-200"
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
                <h2 className="font-display text-2xl font-bold mb-2">Book This Destination</h2>
                <p className="text-gray-500 text-sm mb-6">
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
          <div className="space-y-5">

            {/* Quick facts */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
              <h3 className="font-semibold text-base">Quick Facts</h3>

              {dest.region && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Region</span>
                  <span className="font-medium">{dest.region}</span>
                </div>
              )}

              {dest.peak_fee_usd !== null && dest.peak_fee_usd !== undefined && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Park fee</span>
                  <span className="font-medium text-teal-DEFAULT">
                    {dest.peak_fee_usd === 0 ? "Free" : `$${dest.peak_fee_usd}/person`}
                  </span>
                </div>
              )}

              {dest.best_months && (
                <div className="text-sm">
                  <p className="text-gray-500 mb-2">Best months</p>
                  <div className="flex flex-wrap gap-1">
                    {(dest.best_months as string[]).map((m) => (
                      <span key={m} className="bg-teal-50 text-teal-DEFAULT text-xs font-semibold px-2 py-0.5 rounded-full">
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
                  className="flex items-center gap-2 text-sm text-teal-DEFAULT hover:underline pt-1"
                >
                  📍 View on Google Maps
                </a>
              )}
            </div>

            {/* CTA */}
            <Link
              href={`/enquire?destination=${dest.slug}`}
              className="block w-full bg-teal-DEFAULT hover:bg-teal-600 text-white text-center py-3.5 rounded-xl font-semibold transition-colors"
            >
              Plan a Trip Here
            </Link>

            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=Hi! I'd like to visit ${dest.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3.5 rounded-xl font-semibold transition-colors"
            >
              💬 WhatsApp Us
            </a>

            {/* Hell's Gate specific callout */}
            {dest.slug === "hells-gate" && (
              <div className="bg-gold-50 border border-gold-100 rounded-xl p-4 text-sm">
                <p className="font-semibold text-gold-DEFAULT mb-2">🚲 Combo Deal</p>
                <p className="text-gray-600 mb-3">
                  Pair Hell's Gate with Lake Naivasha boat safari for Kenya's best value wildlife day.
                </p>
                <Link
                  href="/safaris/naivasha-hells-gate-combo"
                  className="text-teal-DEFAULT font-semibold hover:underline"
                >
                  View Naivasha + Hell's Gate Combo →
                </Link>
              </div>
            )}

            {/* Naivasha cross-sell to Hell's Gate */}
            {dest.slug === "lake-naivasha" && (
              <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 text-sm">
                <p className="font-semibold text-teal-DEFAULT mb-2">🚲 Add Hell's Gate</p>
                <p className="text-gray-600 mb-3">
                  Hell's Gate is 20 minutes away. Combine both for Kenya's best value day trip.
                </p>
                <Link
                  href="/safaris/naivasha-hells-gate-combo"
                  className="text-teal-DEFAULT font-semibold hover:underline"
                >
                  View Combo Package →
                </Link>
              </div>
            )}

            {/* Naivasha cross-sell to Nakuru */}
            {dest.slug === "lake-naivasha" && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm">
                <p className="font-semibold text-amber-700 mb-2">🦏 Add Lake Nakuru</p>
                <p className="text-gray-600 mb-3">
                  Nakuru is 45 minutes away. Both rhino species + 2 million flamingos — Kenya's best 2-day circuit.
                </p>
                <Link
                  href="/safaris/naivasha-nakuru-2-day"
                  className="text-teal-DEFAULT font-semibold hover:underline"
                >
                  View 2-Day Circuit →
                </Link>
              </div>
            )}

            {/* Nairobi — add-on callout on every multi-day safari destination */}
            {["masai-mara", "amboseli", "lake-nakuru", "lake-naivasha", "hells-gate"].includes(dest.slug) && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm">
                <p className="font-semibold text-gray-800 mb-2">✈️ Add a Nairobi Day</p>
                <p className="text-gray-600 mb-3">
                  Every tourist lands at JKIA. Add Nairobi NP + Sheldrick elephants to the start or end of any safari.
                </p>
                <Link
                  href="/safaris/nairobi-full-day"
                  className="text-teal-DEFAULT font-semibold hover:underline"
                >
                  View Nairobi Full Day →
                </Link>
              </div>
            )}

            {/* Nakuru cross-sell to Naivasha */}
            {dest.slug === "lake-nakuru" && (
              <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 text-sm">
                <p className="font-semibold text-teal-DEFAULT mb-2">🚤 Add Lake Naivasha</p>
                <p className="text-gray-600 mb-3">
                  Naivasha is 45 minutes away. Add a boat safari + Hell's Gate cycling for Kenya's best 2-day circuit.
                </p>
                <Link
                  href="/safaris/naivasha-nakuru-2-day"
                  className="text-teal-DEFAULT font-semibold hover:underline"
                >
                  View 2-Day Circuit →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
