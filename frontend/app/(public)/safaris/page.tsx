import { getSafaris } from "@/lib/api";
import SafariCard from "@/components/safari/SafariCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kenya Safari Packages",
  description: "Browse all Engai Safaris Kenya packages. Transparent pricing, instant booking. Masai Mara, Amboseli, Naivasha & more.",
};

const CATEGORIES = [
  { value: "", label: "All Safaris" },
  { value: "classic", label: "Classic" },
  { value: "luxury", label: "Luxury" },
  { value: "adventure", label: "Adventures" },
  { value: "cultural", label: "Cultural" },
  { value: "photography", label: "Photography" },
  { value: "corporate", label: "Corporate" },
];

export default async function SafarisPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const safaris = await getSafaris({ category: searchParams.category });

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl font-bold mb-4">Kenya Safari Packages</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Every price shown is the real price. Book online in minutes.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.value}
            href={cat.value ? `/safaris?category=${cat.value}` : "/safaris"}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              (searchParams.category ?? "") === cat.value
                ? "bg-teal-DEFAULT text-white border-teal-DEFAULT"
                : "border-gray-300 text-gray-600 hover:border-teal-DEFAULT hover:text-teal-DEFAULT"
            }`}
          >
            {cat.label}
          </a>
        ))}
      </div>

      {safaris.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No safaris found. Try a different category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safaris.map((safari) => (
            <SafariCard key={safari.id} safari={safari} />
          ))}
        </div>
      )}
    </div>
  );
}
