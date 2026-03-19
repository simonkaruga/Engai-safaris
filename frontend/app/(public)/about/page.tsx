import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Engai Safaris",
  description: "The story behind Kenya's first technology-native safari company. Local knowledge, transparent pricing, real guides.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-5xl font-bold mb-4">Our Story</h1>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto">
          Built by Kenyans. Built for the world. Built to change how Africa is experienced.
        </p>
      </div>

      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="font-display text-3xl font-bold">The Name</h2>
          <p className="text-gray-700 leading-relaxed">
            Engai (En-KAI) is the supreme sky deity of the Maasai people — the divine force governing
            rain, life, cattle, and the land. No tourism brand on earth had claimed this name.
            A tourist who learns its meaning never forgets it. The name IS the marketing.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold">The Problem We Solved</h2>
          <p className="text-gray-700 leading-relaxed">
            Every other Kenya tour operator says "contact us for a quote." We show you the price.
            Every other operator uses WhatsApp-only booking. We built a 24/7 self-serve booking engine.
            International agents mark up Kenya safaris by 30–300%. We sell direct, at local prices.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold">Our Guides</h2>
          <p className="text-gray-700 leading-relaxed">
            Every Engai guide is TRA-certified, background-checked, and has a minimum of 5 years
            field experience. You see their full profile — photo, bio, certifications, languages,
            specialities — before you book. You know exactly who is driving you.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            When any tourist on earth thinks "Africa" — they think Engai Safaris.
            Year 1: Own Kenya. Year 2: Own East Africa. Year 3–5: Own Africa.
          </p>
        </section>
      </div>

      <div className="mt-16 bg-teal-DEFAULT text-white rounded-2xl p-10 text-center">
        <h2 className="font-display text-3xl font-bold mb-4">Ready to Experience Kenya?</h2>
        <p className="text-teal-100 mb-6">Transparent pricing. Real guides. Instant booking.</p>
        <a href="/safaris" className="inline-block bg-gold-DEFAULT hover:bg-gold-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Browse Safaris
        </a>
      </div>
    </div>
  );
}
