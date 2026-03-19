import { getDestination, getDestinations } from "@/lib/api";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/seo/SchemaOrg";
import BreadcrumbNav from "@/components/seo/BreadcrumbNav";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const dest = await getDestination(params.slug).catch(() => null);
  if (!dest) return {};
  return {
    title: dest.meta_title ?? dest.name,
    description: dest.meta_desc ?? dest.tagline ?? undefined,
    openGraph: { images: dest.cover_image ? [dest.cover_image] : [] },
  };
}

export default async function DestinationPage({ params }: { params: { slug: string } }) {
  const dest = await getDestination(params.slug).catch(() => null);
  if (!dest) notFound();

  return (
    <>
      <SchemaOrg
        schema={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: dest.name,
          description: dest.description,
          geo: dest.latitude ? { "@type": "GeoCoordinates", latitude: dest.latitude, longitude: dest.longitude } : undefined,
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
        className="h-[55vh] bg-cover bg-center relative"
        style={{ backgroundImage: dest.cover_image ? `url(${dest.cover_image})` : undefined }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="p-8 text-white max-w-4xl">
            <p className="text-gold-DEFAULT font-semibold text-sm uppercase tracking-widest mb-2">
              {dest.country} · {dest.region}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">{dest.name}</h1>
            {dest.tagline && <p className="text-xl text-gray-200">{dest.tagline}</p>}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {dest.description && (
          <section>
            <p className="text-gray-700 text-lg leading-relaxed">{dest.description}</p>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dest.highlights && (
            <div>
              <h2 className="font-display text-xl font-bold mb-4">Highlights</h2>
              <ul className="space-y-2">
                {(dest.highlights as string[]).map((h) => (
                  <li key={h} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-teal-DEFAULT">✓</span> {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {dest.wildlife_list && (
            <div>
              <h2 className="font-display text-xl font-bold mb-4">Wildlife</h2>
              <ul className="space-y-2">
                {(dest.wildlife_list as string[]).map((w) => (
                  <li key={w} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-gold-DEFAULT">🦁</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {dest.best_months && (
            <div>
              <h2 className="font-display text-xl font-bold mb-4">Best Time to Visit</h2>
              <div className="flex flex-wrap gap-2">
                {(dest.best_months as string[]).map((m) => (
                  <span key={m} className="bg-teal-50 text-teal-DEFAULT text-xs font-semibold px-3 py-1 rounded-full">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
