import { getGuides } from "@/lib/api";
import GuideCard from "@/components/safari/GuideCard";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Safari Guides",
  description: "Meet the Engai Safaris guides — TRA-certified naturalists with 7–14 years field experience. Full profiles, certifications and guest reviews before you book.",
  alternates: { canonical: "https://www.engaisafaris.com/guides" },
};

const TRUST_POINTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />
      </svg>
    ),
    label: "TRA Class A Licensed",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    label: "Background checked",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "7+ years minimum",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    label: "4.9★ average rating",
  },
];

export default async function GuidesPage() {
  const guides = await getGuides().catch(() => []);

  const featured = guides.filter((g) => g.is_featured);
  const rest     = guides.filter((g) => !g.is_featured);

  const totalYears = guides.reduce((s, g) => s + (g.years_exp ?? 0), 0);
  const totalReviews = guides.reduce((s, g) => s + (g.review_count ?? 0), 0);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-stone-100 pt-20 pb-20 px-4 md:px-6 border-b border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="eyebrow text-teal-DEFAULT mb-4">The people behind the experience</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Meet Your<br />
              <span className="italic text-gradient-gold">Safari Guides</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-xl mb-10">
              You know exactly who is driving you before you book. Full profiles,
              certifications, specialities and guest reviews — no surprises.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {TRUST_POINTS.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-white border border-stone-200 shadow-sm px-4 py-2 rounded-full text-sm text-gray-700">
                  <span className="text-teal-DEFAULT">{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Stats row */}
          {guides.length > 0 && (
            <div className="grid grid-cols-3 gap-px bg-stone-200 rounded-2xl overflow-hidden mt-14 max-w-lg">
              {[
                { value: `${guides.length}`, label: "Expert guides" },
                { value: `${totalYears}+`, label: "Combined years" },
                { value: `${totalReviews}+`, label: "Guest reviews" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white px-6 py-5 text-center">
                  <p className="font-display font-bold text-3xl text-gray-900">{value}</p>
                  <p className="text-gray-400 text-xs mt-1 uppercase tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured guides */}
      {featured.length > 0 && (
        <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
          <p className="eyebrow text-teal-DEFAULT mb-8">Most requested</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </section>
      )}

      {/* All other guides */}
      {rest.length > 0 && (
        <section className="pb-20 px-4 md:px-6 max-w-7xl mx-auto">
          <p className="eyebrow text-teal-DEFAULT mb-8">All guides</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {guides.length === 0 && (
        <section className="py-32 text-center text-gray-400">
          <p className="text-lg">Guide profiles coming soon.</p>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-stone-50 border-t border-stone-200 py-16 px-4 md:px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">
            Request a specific guide
          </h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Have a guide in mind? Mention them in your enquiry and we will do our best to assign them to your safari.
          </p>
          <Link
            href="/enquire"
            className="inline-flex items-center gap-2 bg-teal-DEFAULT hover:bg-teal-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-teal hover:-translate-y-0.5"
          >
            Make an Enquiry
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
