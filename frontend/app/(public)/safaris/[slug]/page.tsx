import { getSafari, getSafaris } from "@/lib/api";
import { notFound } from "next/navigation";
import ItineraryAccordion from "@/components/safari/ItineraryAccordion";
import GroupPricingTable from "@/components/safari/GroupPricingTable";
import BeachExtensionCard from "@/components/safari/BeachExtensionCard";
import SchemaOrg from "@/components/seo/SchemaOrg";
import BreadcrumbNav from "@/components/seo/BreadcrumbNav";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const safaris = await getSafaris();
  return safaris.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const safari = await getSafari(params.slug).catch(() => null);
  if (!safari) return {};
  return {
    title: safari.meta_title ?? safari.name,
    description: safari.meta_desc ?? safari.tagline ?? undefined,
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
          "@type": "TouristTrip",
          name: safari.name,
          description: safari.description,
          provider: { "@type": "TourOperator", name: "Engai Safaris" },
          offers: { "@type": "Offer", price: safari.price_usd_2pax, priceCurrency: "USD" },
        }}
      />

      <BreadcrumbNav
        items={[
          { label: "Safaris", href: "/safaris" },
          { label: safari.name, href: `/safaris/${safari.slug}` },
        ]}
      />

      {/* Hero */}
      <div
        className="h-[60vh] bg-cover bg-center relative"
        style={{ backgroundImage: safari.cover_image ? `url(${safari.cover_image})` : undefined }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="p-8 text-white max-w-4xl">
            <span className="bg-teal-DEFAULT text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              {safari.category} · {safari.duration_days} days
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-2">{safari.name}</h1>
            {safari.tagline && <p className="text-xl text-gray-200">{safari.tagline}</p>}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-10">
          {safari.description && (
            <section>
              <h2 className="font-display text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed">{safari.description}</p>
            </section>
          )}

          {safari.highlights && (
            <section>
              <h2 className="font-display text-2xl font-bold mb-4">Highlights</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(safari.highlights as string[]).map((h) => (
                  <li key={h} className="flex items-start gap-2 text-gray-700">
                    <span className="text-teal-DEFAULT mt-1">✓</span> {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {safari.itinerary_days.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold mb-4">Day-by-Day Itinerary</h2>
              <ItineraryAccordion days={safari.itinerary_days} />
            </section>
          )}

          {/* Inclusions / Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {safari.inclusions && (
              <div>
                <h3 className="font-semibold text-lg mb-3 text-teal-DEFAULT">✓ Included</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  {(safari.inclusions as string[]).map((i) => <li key={i}>• {i}</li>)}
                </ul>
              </div>
            )}
            {safari.exclusions && (
              <div>
                <h3 className="font-semibold text-lg mb-3 text-maasai-DEFAULT">✗ Excluded</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  {(safari.exclusions as string[]).map((e) => <li key={e}>• {e}</li>)}
                </ul>
              </div>
            )}
          </div>

          {safari.cancellation_policy && (
            <section>
              <h2 className="font-display text-2xl font-bold mb-4">Cancellation Policy</h2>
              <p className="text-gray-700 text-sm">{safari.cancellation_policy}</p>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <GroupPricingTable safari={safari} />

          <Link
            href={`/enquire?safari=${safari.slug}`}
            className="block w-full bg-teal-DEFAULT hover:bg-teal-600 text-white text-center py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Book This Safari
          </Link>

          {safari.installments_ok && (
            <div className="bg-gold-50 border border-gold-100 rounded-lg p-4 text-sm">
              <p className="font-semibold text-gold-DEFAULT mb-1">💳 Lipa Polepole Available</p>
              <p className="text-gray-600">Pay in 4 monthly M-Pesa instalments. No interest.</p>
            </div>
          )}

          <BeachExtensionCard safari={safari} />

          <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
            <p className="font-semibold">Quick Facts</p>
            <p>⏱ {safari.duration_days} day{safari.duration_days > 1 ? "s" : ""}</p>
            <p>👥 Max {safari.group_size_max} per vehicle</p>
            <p>💰 {safari.deposit_pct}% deposit to confirm</p>
          </div>
        </div>
      </div>
    </>
  );
}
