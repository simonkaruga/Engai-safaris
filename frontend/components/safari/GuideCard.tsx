import Link from "next/link";
import Image from "next/image";
import type { Guide } from "@/types/api";

interface Props {
  guide: Guide;
}

export default function GuideCard({ guide }: Props) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      <div className="relative h-64 bg-gray-200">
        {guide.photo_url ? (
          <Image src={guide.photo_url} alt={guide.name} fill className="object-cover" />
        ) : (
          <div className="h-full flex items-center justify-center text-5xl">👤</div>
        )}
        {guide.is_featured && (
          <span className="absolute top-3 right-3 bg-gold-DEFAULT text-white text-xs font-semibold px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display font-bold text-lg mb-0.5 group-hover:text-teal-DEFAULT transition-colors">
          {guide.name}
        </h3>
        {guide.title && <p className="text-teal-DEFAULT text-sm font-medium mb-3">{guide.title}</p>}

        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
          {guide.years_exp && <span>🗓 {guide.years_exp} yrs</span>}
          {guide.home_region && <span>📍 {guide.home_region}</span>}
          {guide.avg_rating && <span>⭐ {guide.avg_rating}</span>}
        </div>

        {guide.languages && (
          <div className="flex flex-wrap gap-1">
            {(guide.languages as string[]).slice(0, 3).map((l) => (
              <span key={l} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{l}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
