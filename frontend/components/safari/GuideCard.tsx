import Link from "next/link";
import Image from "next/image";
import type { Guide } from "@/types/api";

interface Props {
  guide: Guide;
}

// Deterministic gradient per guide based on name
const GRADIENTS = [
  "from-teal-900 via-teal-700 to-teal-500",
  "from-gray-950 via-teal-900 to-teal-700",
  "from-stone-900 via-teal-800 to-teal-600",
  "from-gray-900 via-gray-700 to-teal-800",
  "from-teal-950 via-gray-800 to-teal-700",
  "from-gray-950 via-teal-950 to-teal-800",
];

function getGradient(name: string) {
  const idx = name.charCodeAt(0) % GRADIENTS.length;
  return GRADIENTS[idx];
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i < full ? "text-gold-DEFAULT" : i === full && half ? "text-gold-DEFAULT opacity-50" : "text-white/20"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function GuideCard({ guide }: Props) {
  const gradient = getGradient(guide.name);

  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group block rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Photo / Avatar area */}
      <div className={`relative h-72 bg-gradient-to-br ${gradient} overflow-hidden`}>
        {guide.photo_url ? (
          <Image
            src={guide.photo_url}
            alt={guide.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <>
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <circle cx="160" cy="40" r="80" fill="white" />
                <circle cx="20" cy="160" r="60" fill="white" />
              </svg>
            </div>
            {/* Large initial */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-bold text-8xl text-white/20 select-none">
                {initials(guide.name)}
              </span>
            </div>
          </>
        )}

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {guide.is_featured && (
            <span className="bg-gold-DEFAULT text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Featured
            </span>
          )}
          {guide.avg_rating && (
            <span className="ml-auto glass-dark text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {guide.avg_rating}★
            </span>
          )}
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display font-bold text-white text-xl leading-tight mb-0.5 group-hover:text-gold-DEFAULT transition-colors">
            {guide.name}
          </h3>
          {guide.title && (
            <p className="text-white/70 text-xs mb-3">{guide.title}</p>
          )}

          {/* Rating + reviews */}
          {guide.avg_rating && (
            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={guide.avg_rating} />
              <span className="text-white/55 text-xs">{guide.review_count} reviews</span>
            </div>
          )}

          {/* Language pills */}
          {guide.languages && (
            <div className="flex flex-wrap gap-1">
              {(guide.languages as string[]).slice(0, 3).map((l) => (
                <span key={l} className="glass text-white/90 text-[10px] px-2 py-0.5 rounded-full">
                  {l}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer strip */}
      <div className="bg-white px-5 py-3.5 flex items-center justify-between border-t border-gray-100">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {guide.years_exp && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-teal-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {guide.years_exp} yrs exp
            </span>
          )}
          {guide.home_region && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-teal-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {guide.home_region.split("/")[0].trim()}
            </span>
          )}
        </div>
        <span className="text-teal-DEFAULT text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
          Profile
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
