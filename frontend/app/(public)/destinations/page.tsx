import { getDestinations } from "@/lib/api";

export const dynamic = "force-dynamic";
import DestinationCard from "@/components/destination/DestinationCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kenya Safari Destinations",
  description: "Explore Kenya's greatest safari destinations — Masai Mara, Amboseli, Naivasha, Samburu and more. Expert guides, transparent pricing.",
};

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl font-bold mb-4">Safari Destinations</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          From the Great Migration in the Mara to elephant herds under Kilimanjaro — every destination, expertly guided.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>
    </div>
  );
}
