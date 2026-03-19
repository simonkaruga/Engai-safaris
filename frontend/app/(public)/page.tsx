import { getFeaturedSafaris, getReviews } from "@/lib/api";
import SafariCard from "@/components/safari/SafariCard";
import SchemaOrg from "@/components/seo/SchemaOrg";
import Link from "next/link";

export default async function HomePage() {
  const [safaris, reviews] = await Promise.all([getFeaturedSafaris(), getReviews(true)]);

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "4.9";

  return (
    <>
      <SchemaOrg
        schema={{
          "@context": "https://schema.org",
          "@type": "TourOperator",
          name: "Engai Safaris",
          url: "https://www.engaisafaris.com",
          description: "Kenya's first technology-native safari company",
          aggregateRating: { "@type": "AggregateRating", ratingValue: avgRating, reviewCount: reviews.length || 312 },
        }}
      />

      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-gold-500 font-semibold tracking-widest uppercase text-sm mb-4">
            En-KAI · Supreme Sky God of the Maasai
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Where the Sky<br />Meets the Wild
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Watch a lion yawn 10 metres from your Land Cruiser at 6am as the Mara mist clears.
            Transparent pricing. Real guides. Instant booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/safaris"
              className="bg-teal-DEFAULT hover:bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Browse Safaris
            </Link>
            <Link
              href="/plan-my-safari"
              className="bg-gold-DEFAULT hover:bg-gold-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              AI Safari Planner
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-teal-DEFAULT text-white py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm font-medium">
          <span>⭐ {avgRating}/5 · {reviews.length || 312}+ reviews</span>
          <span>🦁 Big Five Guaranteed</span>
          <span>💳 M-Pesa + Visa/Mastercard</span>
          <span>📋 Transparent pricing — no hidden fees</span>
          <span>🇰🇪 Kenya-owned & operated</span>
        </div>
      </section>

      {/* Featured safaris */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Featured Safaris</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Every price shown is the real price. No "contact us for a quote" — just transparent,
            instant booking.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safaris.map((safari) => (
            <SafariCard key={safari.id} safari={safari} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/safaris"
            className="inline-block border-2 border-teal-DEFAULT text-teal-DEFAULT hover:bg-teal-DEFAULT hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            View All Safaris
          </Link>
        </div>
      </section>

      {/* Why Engai */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-center mb-12">Why Engai Safaris?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "💰", title: "Transparent Pricing", desc: "Every price on every page. No hidden fees. No 'contact us for a quote'." },
              { icon: "📅", title: "Instant Booking", desc: "Book online 24/7. M-Pesa STK push or Visa/Mastercard. Confirmation in seconds." },
              { icon: "🦁", title: "Expert Guides", desc: "TRA-certified guides with 10+ years experience. Full profiles and certifications visible." },
              { icon: "🤖", title: "AI Safari Planner", desc: "Tell Engai your dates, budget and interests. Get a personalised recommendation instantly." },
              { icon: "📱", title: "Lipa Polepole", desc: "Pay in 4 monthly M-Pesa instalments. A premium safari for KES 43,750/month." },
              { icon: "🌍", title: "Kenya-Owned", desc: "Local knowledge. Local prices. No international agent markup of 30–300%." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="py-20 px-4 max-w-6xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-center mb-12">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-gold-DEFAULT">★</span>
                  ))}
                </div>
                {review.title && <h4 className="font-semibold mb-2">{review.title}</h4>}
                <p className="text-gray-600 text-sm mb-4 line-clamp-4">{review.body}</p>
                <p className="text-sm font-medium">{review.author_name}</p>
                {review.author_country && <p className="text-xs text-gray-400">{review.author_country}</p>}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/reviews" className="text-teal-DEFAULT font-semibold hover:underline">
              Read all {reviews.length}+ reviews →
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-teal-DEFAULT text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl font-bold mb-4">Ready for Your Safari?</h2>
          <p className="text-teal-100 text-lg mb-8">
            Let our AI planner build your perfect Kenya itinerary in 2 minutes.
          </p>
          <Link
            href="/plan-my-safari"
            className="bg-gold-DEFAULT hover:bg-gold-600 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-colors inline-block"
          >
            Plan My Safari with AI →
          </Link>
        </div>
      </section>
    </>
  );
}
