import { getGuide, getGuides } from "@/lib/api";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/seo/SchemaOrg";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const dynamicParams = true;

export async function generateStaticParams() {
  const guides = await getGuides().catch(() => []);
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = await getGuide(params.slug).catch(() => null);
  if (!guide) return {};
  return {
    title: `${guide.name} — ${guide.title ?? "Safari Guide"}`,
    description: guide.bio?.slice(0, 160),
    alternates: { canonical: `https://www.engaisafaris.com/guides/${guide.slug}` },
  };
}

const GRADIENTS = [
  "from-teal-900 via-teal-700 to-teal-500",
  "from-gray-950 via-teal-900 to-teal-700",
  "from-stone-900 via-teal-800 to-teal-600",
  "from-gray-900 via-gray-700 to-teal-800",
  "from-teal-950 via-gray-800 to-teal-700",
  "from-gray-950 via-teal-950 to-teal-800",
];
function getGradient(name: string) {
  return GRADIENTS[name.charCodeAt(0) % GRADIENTS.length];
}
function initials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("");
}

export default async function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = await getGuide(params.slug).catch(() => null);
  if (!guide) notFound();

  const gradient = getGradient(guide.name);

  return (
    <>
      <SchemaOrg
        schema={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: guide.name,
          jobTitle: guide.title ?? "Safari Guide",
          description: guide.bio,
          image: guide.photo_url,
          url: `https://www.engaisafaris.com/guides/${guide.slug}`,
          worksFor: {
            "@type": "TourOperator",
            name: "Engai Safaris",
            url: "https://www.engaisafaris.com",
          },
          knowsAbout: guide.specialities ?? ["Kenya Wildlife", "Safari Guiding", "Big Five", "Masai Mara"],
          hasOccupation: {
            "@type": "Occupation",
            name: "Safari Guide",
            occupationLocation: { "@type": "Country", name: "Kenya" },
          },
          ...(guide.review_count && guide.avg_rating ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: guide.avg_rating,
              reviewCount: guide.review_count,
              bestRating: 5,
            },
          } : {}),
        }}
      />

      {/* Hero banner */}
      <section className={`relative bg-gradient-to-br ${gradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <circle cx="350" cy="50" r="180" fill="white" />
            <circle cx="30" cy="280" r="140" fill="white" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-12 pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-8">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-white/80 transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-white/80">{guide.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Photo / Avatar */}
            <div className="flex-shrink-0">
              {guide.photo_url ? (
                <Image
                  src={guide.photo_url}
                  alt={guide.name}
                  width={200}
                  height={240}
                  className="w-40 h-48 md:w-48 md:h-56 rounded-2xl object-cover shadow-2xl"
                />
              ) : (
                <div className="w-40 h-48 md:w-48 md:h-56 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-2xl">
                  <span className="font-display font-bold text-7xl text-white/40">
                    {initials(guide.name)}
                  </span>
                </div>
              )}
            </div>

            {/* Identity */}
            <div className="flex-1">
              {guide.is_featured && (
                <span className="inline-block bg-gold-DEFAULT text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                  Featured Guide
                </span>
              )}
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                {guide.name}
              </h1>
              {guide.title && (
                <p className="text-white/70 text-lg mb-5">{guide.title}</p>
              )}

              {/* Key stats */}
              <div className="flex flex-wrap gap-4 text-sm mb-5">
                {guide.years_exp && (
                  <div className="flex items-center gap-2 text-white/80">
                    <svg className="w-4 h-4 text-teal-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {guide.years_exp} years experience
                  </div>
                )}
                {guide.home_region && (
                  <div className="flex items-center gap-2 text-white/80">
                    <svg className="w-4 h-4 text-teal-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {guide.home_region}
                  </div>
                )}
                {guide.avg_rating && (
                  <div className="flex items-center gap-2 text-white/80">
                    <svg className="w-4 h-4 text-gold-DEFAULT" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {guide.avg_rating} · {guide.review_count} guest reviews
                  </div>
                )}
              </div>

              {/* Language pills */}
              {guide.languages && (
                <div className="flex flex-wrap gap-2">
                  {(guide.languages as string[]).map((l) => (
                    <span key={l} className="glass text-white/90 text-xs px-3 py-1 rounded-full">
                      {l}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Bio — main col */}
          <div className="lg:col-span-2 space-y-10">
            {guide.bio && (
              <div>
                <p className="eyebrow text-teal-DEFAULT mb-4">About {guide.name.split(" ")[0]}</p>
                <p className="text-gray-700 text-lg leading-relaxed">{guide.bio}</p>
              </div>
            )}

            {/* Specialities */}
            {guide.specialities && (
              <div>
                <p className="eyebrow text-teal-DEFAULT mb-4">Specialities</p>
                <div className="flex flex-wrap gap-2">
                  {(guide.specialities as string[]).map((s) => (
                    <span key={s} className="bg-teal-50 border border-teal-100 text-teal-DEFAULT text-sm px-4 py-2 rounded-xl font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Fun fact */}
            {guide.fun_fact && (
              <div className="bg-gold-50 border border-gold-100 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold-DEFAULT flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gold-DEFAULT text-sm mb-1">Fun Fact</p>
                    <p className="text-gray-700 leading-relaxed">{guide.fun_fact}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Certifications */}
            {guide.certifications && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
                <p className="eyebrow text-teal-DEFAULT mb-4">Certifications</p>
                <ul className="space-y-3">
                  {(guide.certifications as string[]).map((c) => (
                    <li key={c} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-teal-DEFAULT flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700 leading-snug">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stats card */}
            <div className="bg-gray-950 rounded-2xl p-6 space-y-4">
              {guide.years_exp && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Experience</span>
                  <span className="text-white font-bold">{guide.years_exp} years</span>
                </div>
              )}
              {guide.avg_rating && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Avg rating</span>
                  <span className="text-gold-DEFAULT font-bold">{guide.avg_rating}★</span>
                </div>
              )}
              {guide.review_count > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Guest reviews</span>
                  <span className="text-white font-bold">{guide.review_count}</span>
                </div>
              )}
              {guide.home_region && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Base region</span>
                  <span className="text-white font-bold text-right text-sm">{guide.home_region}</span>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="bg-teal-DEFAULT rounded-2xl p-6 text-white text-center">
              <p className="font-display font-bold text-lg mb-1">Book with {guide.name.split(" ")[0]}</p>
              <p className="text-teal-100 text-sm mb-5 leading-relaxed">
                Request {guide.name.split(" ")[0]} when you make your enquiry.
              </p>
              <Link
                href={`/enquire?guide=${guide.slug}`}
                className="block w-full bg-white text-teal-DEFAULT hover:bg-teal-50 font-semibold text-sm py-3 rounded-xl transition-colors"
              >
                Make an Enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-teal-DEFAULT transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          All guides
        </Link>
      </div>
    </>
  );
}
