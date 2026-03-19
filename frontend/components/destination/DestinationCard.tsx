import Link from "next/link";
import type { Destination } from "@/types/api";

interface Props {
  destination: Destination;
}

export default function DestinationCard({ destination }: Props) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      <div
        className="h-52 bg-cover bg-center bg-gray-200 relative"
        style={{ backgroundImage: destination.cover_image ? `url(${destination.cover_image})` : undefined }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-xs font-medium text-gray-300">{destination.country} · {destination.region}</p>
          <h3 className="font-display font-bold text-lg leading-tight">{destination.name}</h3>
        </div>
      </div>

      <div className="p-4">
        {destination.tagline && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{destination.tagline}</p>
        )}
        {destination.best_months && (
          <div className="flex flex-wrap gap-1">
            {(destination.best_months as string[]).slice(0, 4).map((m) => (
              <span key={m} className="bg-teal-50 text-teal-DEFAULT text-xs px-2 py-0.5 rounded-full">{m}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
