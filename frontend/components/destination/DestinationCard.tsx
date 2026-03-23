import Link from "next/link";
import Image from "next/image";
import type { Destination } from "@/types/api";

interface Props {
  destination: Destination;
}

export default function DestinationCard({ destination }: Props) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-gray-900"
    >
      {/* Full-bleed image */}
      <div className="relative h-64 bg-gray-800 overflow-hidden">
        {destination.cover_image ? (
          <Image
            src={destination.cover_image}
            alt={`${destination.name} — Kenya safari destination`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-gray-950" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Best months chips — top right */}
        {destination.best_months && (
          <div className="absolute top-3 right-3 flex flex-wrap justify-end gap-1 max-w-[60%]">
            {(destination.best_months as string[]).slice(0, 3).map((m) => (
              <span
                key={m}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white"
              >
                {m}
              </span>
            ))}
          </div>
        )}

        {/* Region badge — top left */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-teal-DEFAULT/80 backdrop-blur-sm text-white uppercase tracking-wider">
            {destination.region}
          </span>
        </div>

        {/* Name overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display font-bold text-xl text-white leading-tight mb-1 group-hover:text-teal-200 transition-colors">
            {destination.name}
          </h3>
          {destination.tagline && (
            <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">{destination.tagline}</p>
          )}
        </div>
      </div>

      {/* Footer strip */}
      <div className="bg-white px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {destination.peak_fee_usd !== null && destination.peak_fee_usd !== undefined && (
            <span className="text-xs text-gray-500 font-medium">
              {destination.peak_fee_usd === 0 ? "Free entry" : `From $${destination.peak_fee_usd}/person`}
            </span>
          )}
        </div>
        <span className="inline-flex items-center gap-1 text-teal-DEFAULT text-xs font-semibold group-hover:gap-2 transition-all">
          Explore
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
