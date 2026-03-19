import { getGuides } from "@/lib/api";

export const dynamic = "force-dynamic";
import GuideCard from "@/components/safari/GuideCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Safari Guides",
  description: "Meet the Engai Safaris guides — TRA-certified, 10+ years experience, full profiles and certifications. The biggest differentiator in Kenya tourism.",
};

export default async function GuidesPage() {
  const guides = await getGuides();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl font-bold mb-4">Our Guides</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Every guide is TRA-certified, background-checked, and has a minimum of 5 years field experience.
          You know exactly who is driving you before you book.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>
    </div>
  );
}
