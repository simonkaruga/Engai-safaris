import Link from "next/link";
import type { SafariList } from "@/types/api";
import { formatUSD, formatKES } from "@/lib/utils";

interface Props {
  safari: SafariList;
}

export default function SafariCard({ safari }: Props) {
  return (
    <Link
      href={`/safaris/${safari.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
    >
      <div
        className="h-52 bg-cover bg-center bg-gray-200 relative"
        style={{ backgroundImage: safari.cover_image ? `url(${safari.cover_image})` : undefined }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-2">
          {safari.category && (
            <span className="bg-teal-DEFAULT text-white text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
              {safari.category}
            </span>
          )}
          <span className="bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {safari.duration_days} day{safari.duration_days > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display font-bold text-lg mb-1 group-hover:text-teal-DEFAULT transition-colors line-clamp-2">
          {safari.name}
        </h3>
        {safari.tagline && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{safari.tagline}</p>
        )}

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">From (2 people)</p>
            {safari.price_usd_2pax && (
              <p className="font-bold text-teal-DEFAULT text-lg">
                {formatUSD(safari.price_usd_2pax)}<span className="text-sm font-normal text-gray-500">/pp</span>
              </p>
            )}
            {safari.price_kes_2pax && (
              <p className="text-xs text-gray-400">{formatKES(safari.price_kes_2pax)}/pp</p>
            )}
          </div>
          <span className="text-teal-DEFAULT text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
