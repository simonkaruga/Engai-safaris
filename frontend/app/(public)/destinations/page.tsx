import { getDestinations } from "@/lib/api";
import DestinationCard from "@/components/destination/DestinationCard";
import Image from "next/image";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kenya Safari Destinations",
  description: "Explore Kenya's greatest safari destinations — Masai Mara, Amboseli, Naivasha, Samburu and more. Expert guides, transparent pricing.",
  alternates: { canonical: "https://www.engaisafaris.com/destinations" },
};

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-stone-100 pt-20 pb-16 px-4 md:px-6 relative overflow-hidden border-b border-stone-100">
        <div className="absolute inset-0 opacity-[0.05]">
          <Image src="/images/destinations/masai-mara.png" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="eyebrow text-teal-DEFAULT mb-4">Where we take you</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-5">
              Kenya's Greatest<br />
              <span className="italic text-gradient-gold">Wild Places.</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              From the Great Migration thunder of the Mara to pink flamingo horizons at Nakuru —
              every destination guided by people who grew up next to the park they show you.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-12">
            {[
              { value: "10+", label: "Destinations" },
              { value: "6", label: "Expert guides" },
              { value: "4.9★", label: "Guest rating" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display font-bold text-2xl text-gray-900">{value}</p>
                <p className="text-gray-400 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        {destinations.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p>No destinations found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
