import { getSafari, getSafaris } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import ItineraryAccordion from "@/components/safari/ItineraryAccordion";
import GroupPricingTable from "@/components/safari/GroupPricingTable";
import BeachExtensionCard from "@/components/safari/BeachExtensionCard";
import BookingSidebar from "@/components/safari/BookingSidebar";
import MobileBookingBar from "@/components/safari/MobileBookingBar";
import ViewerCount from "@/components/safari/ViewerCount";
import SchemaOrg from "@/components/seo/SchemaOrg";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamicParams = true;

export async function generateStaticParams() {
  const safaris = await getSafaris().catch(() => []);
  return safaris.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const safari = await getSafari(params.slug).catch(() => null);
  if (!safari) return {};
  return {
    title: safari.meta_title ?? safari.name,
    description: safari.meta_desc ?? safari.tagline ?? undefined,
    alternates: { canonical: `https://www.engaisafaris.com/safaris/${safari.slug}` },
    openGraph: { images: safari.cover_image ? [safari.cover_image] : [] },
  };
}

export default async function SafariDetailPage({ params }: { params: { slug: string } }) {
  const safari = await getSafari(params.slug).catch(() => null);
  if (!safari) notFound();

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
                { "@type": "ListItem", position: 2, name: "Safaris", item: "https://www.engaisafaris.com/safaris" },
                { "@type": "ListItem", position: 3, name: safari.name, item: `https://www.engaisafaris.com/safaris/${safari.slug}` },
              ],
            },
            {
              "@type": "TouristTrip",
          name: safari.name,
          description: safari.description,
          url: `https://www.engaisafaris.com/safaris/${safari.slug}`,
          image: safari.cover_image ? [safari.cover_image] : undefined,
          touristType: safari.category ? [safari.category.charAt(0).toUpperCase() + safari.category.slice(1)] : undefined,
          itinerary: safari.itinerary_days.map((d) => ({
            "@type": "TouristTrip",
            name: d.title,
            description: d.description,
          })),
          provider: {
            "@type": "TourOperator",
            name: "Engai Safaris",
            url: "https://www.engaisafaris.com",
          },
          offers: {
            "@type": "Offer",
            price: safari.price_usd_2pax ? Math.round(safari.price_usd_2pax / 2) : undefined,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            validFrom: new Date().toISOString().split("T")[0],
            url: `https://www.engaisafaris.com/safaris/${safari.slug}`,
          },
          duration: `P${safari.duration_days}D`,
            },
          ],
        }}
      />

      {/* Cinematic hero */}
      <section className="-mt-[100px] h-[75vh] relative bg-gray-900 flex items-end overflow-hidden">
        {safari.cover_image && (
          <Image src={safari.cover_image} alt={safari.name} fill priority className="object-cover" sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

        {/* Breadcrumb */}
        <div className="absolute top-[116px] left-0 right-0 px-4 md:px-8 max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-white/60">
            <Link href="/" className="hover:text-white/90 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/safaris" className="hover:text-white/90 transition-colors">Safaris</Link>
            <span>/</span>
            <span className="text-white/80 line-clamp-1">{safari.name}</span>
          </nav>
        </div>

        {/* Bottom content */}
        <div className="relative w-full px-4 md:px-8 pb-12 max-w-7xl mx-auto">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-teal-DEFAULT text-white uppercase tracking-wider">
              {safari.category}
            </span>
            <span className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white uppercase tracking-wider">
              {safari.duration_days} {safari.duration_days === 1 ? "day" : "days"}
            </span>
            {safari.difficulty && (
              <span className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-gold-DEFAULT/80 text-white uppercase tracking-wider">
                {safari.difficulty}
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-[0.95] mb-4">
            {safari.name}
          </h1>
          {safari.tagline && (
            <p className="text-gray-200 text-xl max-w-2xl leading-relaxed">{safari.tagline}</p>
          )}

          {/* Price pill */}
          {safari.price_usd_2pax && (
            <div className="mt-6 inline-flex items-center gap-3 bg-black/65 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3">
              <div>
                <p className="text-gray-400 text-xs">From (per person, 2 pax)</p>
                <p className="text-white font-display font-bold text-2xl">
                  ${Math.round(safari.price_usd_2pax / 2).toLocaleString()}
                </p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <p className="text-gray-400 text-xs">Instant booking</p>
                <p className="text-teal-300 text-sm font-semibold">No quote needed</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Mobile sticky booking bar */}
      <MobileBookingBar
        safariSlug={safari.slug}
        safariName={safari.name}
        priceUsd={safari.price_usd_2pax}
      />

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 pb-28 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-14">

            {/* Overview */}
            {safari.description && (
              <section>
                <p className="eyebrow text-teal-DEFAULT mb-3">Overview</p>
                <h2 className="font-display text-3xl font-bold text-gray-900 mb-5">About this safari</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{safari.description}</p>
              </section>
            )}

            {/* Highlights */}
            {safari.highlights && (
              <section>
                <p className="eyebrow text-teal-DEFAULT mb-3">Highlights</p>
                <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">What's included</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {safari.highlights.map((h) => (
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

            {/* Itinerary */}
            {safari.itinerary_days.length > 0 && (
              <section>
                <p className="eyebrow text-teal-DEFAULT mb-3">Day by day</p>
                <h2 className="font-display text-3xl font-bold text-gray-900 mb-8">Your itinerary</h2>
                <ItineraryAccordion days={safari.itinerary_days} />
              </section>
            )}

            {/* Inclusions / Exclusions */}
            {(safari.inclusions || safari.exclusions) && (
              <section>
                <p className="eyebrow text-teal-DEFAULT mb-3">What's covered</p>
                <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">Included & excluded</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {safari.inclusions && (
                    <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full bg-teal-DEFAULT flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-teal-DEFAULT">Included</h3>
                      </div>
                      <ul className="space-y-2">
                        {safari.inclusions.map((i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-teal-DEFAULT mt-0.5 flex-shrink-0">•</span> {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {safari.exclusions && (
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full bg-maasai-DEFAULT flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-maasai-DEFAULT">Not included</h3>
                      </div>
                      <ul className="space-y-2">
                        {safari.exclusions.map((e) => (
                          <li key={e} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-maasai-DEFAULT mt-0.5 flex-shrink-0">•</span> {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Cancellation policy */}
            {safari.cancellation_policy && (
              <section>
                <p className="eyebrow text-teal-DEFAULT mb-3">Booking terms</p>
                <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Cancellation policy</h2>
                <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 border border-gray-200 rounded-2xl p-6">
                  {safari.cancellation_policy}
                </p>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5 lg:pt-2">
            <ViewerCount slug={safari.slug} />

            <GroupPricingTable safari={safari} />

            <BookingSidebar safari={safari} />

            <BeachExtensionCard safari={safari} />

            {/* Need help? */}
            <div className="bg-gray-950 rounded-2xl p-6 text-center">
              <p className="text-white font-semibold mb-1">Have questions?</p>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">Our team responds within 2 hours on WhatsApp.</p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=Hi! I have questions about ${safari.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1da851] text-white py-3 rounded-xl font-semibold transition-colors text-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
