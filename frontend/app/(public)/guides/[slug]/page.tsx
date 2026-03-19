import { getGuide, getGuides } from "@/lib/api";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/seo/SchemaOrg";
import type { Metadata } from "next";
import Image from "next/image";

export async function generateStaticParams() {
  const guides = await getGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = await getGuide(params.slug).catch(() => null);
  if (!guide) return {};
  return { title: `${guide.name} — Safari Guide`, description: guide.bio?.slice(0, 160) };
}

export default async function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = await getGuide(params.slug).catch(() => null);
  if (!guide) notFound();

  return (
    <>
      <SchemaOrg
        schema={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: guide.name,
          jobTitle: guide.title,
          description: guide.bio,
          image: guide.photo_url,
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-10">
          {guide.photo_url && (
            <div className="flex-shrink-0">
              <Image
                src={guide.photo_url}
                alt={guide.name}
                width={280}
                height={320}
                className="rounded-2xl object-cover w-full md:w-[280px] h-[320px]"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="font-display text-4xl font-bold mb-1">{guide.name}</h1>
            {guide.title && <p className="text-teal-DEFAULT font-semibold mb-4">{guide.title}</p>}

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              {guide.years_exp && <span>🗓 {guide.years_exp} years experience</span>}
              {guide.home_region && <span>📍 {guide.home_region}</span>}
              {guide.avg_rating && <span>⭐ {guide.avg_rating} ({guide.review_count} reviews)</span>}
            </div>

            {guide.bio && <p className="text-gray-700 leading-relaxed mb-6">{guide.bio}</p>}

            {guide.languages && (
              <div className="mb-4">
                <p className="font-semibold text-sm mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {(guide.languages as string[]).map((l) => (
                    <span key={l} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">{l}</span>
                  ))}
                </div>
              </div>
            )}

            {guide.specialities && (
              <div className="mb-4">
                <p className="font-semibold text-sm mb-2">Specialities</p>
                <div className="flex flex-wrap gap-2">
                  {(guide.specialities as string[]).map((s) => (
                    <span key={s} className="bg-teal-50 text-teal-DEFAULT text-xs px-3 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {guide.certifications && (
              <div className="mb-4">
                <p className="font-semibold text-sm mb-2">Certifications</p>
                <ul className="space-y-1">
                  {(guide.certifications as string[]).map((c) => (
                    <li key={c} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="text-teal-DEFAULT">✓</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {guide.fun_fact && (
              <div className="bg-gold-50 border border-gold-100 rounded-lg p-4 mt-4">
                <p className="text-sm font-semibold text-gold-DEFAULT mb-1">Fun Fact</p>
                <p className="text-sm text-gray-700">{guide.fun_fact}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
