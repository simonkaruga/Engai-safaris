import { getReviews } from "@/lib/api";
import ReviewForm from "@/components/reviews/ReviewForm";
import Image from "next/image";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Guest Reviews",
  description: "Read honest reviews from Engai Safaris guests. 4.9/5 average rating across 300+ safaris.",
  alternates: { canonical: "https://www.engaisafaris.com/reviews" },
};

function StarDisplay({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`${cls} ${i <= rating ? "text-gold-DEFAULT" : "text-gray-200"}`}
          fill="currentColor"
        >
          <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" />
        </svg>
      ))}
    </div>
  );
}

export default async function ReviewsPage() {
  const reviews = await getReviews();

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "4.9";

  const ratingBuckets = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
    pct: reviews.length
      ? Math.round((reviews.filter((r) => Math.round(r.rating) === star).length / reviews.length) * 100)
      : 0,
  }));

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-stone-100 pt-20 pb-16 px-4 md:px-6 relative overflow-hidden border-b border-stone-100">
        <div className="absolute inset-0 opacity-[0.05]">
          <Image src="/images/destinations/masai-mara.png" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="eyebrow text-teal-DEFAULT mb-4">Straight from our guests</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-5">
              What they say<br />
              <span className="italic text-gradient-gold">after the safari.</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Every review is from a real guest who booked and traveled with us. No incentivised reviews. No fake ratings.
            </p>
          </div>

          {/* Aggregate stats */}
          <div className="mt-12 flex flex-wrap gap-10 items-center">
            <div>
              <p className="font-display font-bold text-6xl text-gray-900 leading-none">{avg}</p>
              <StarDisplay rating={Math.round(Number(avg))} size="md" />
              <p className="text-gray-400 text-xs mt-1">out of 5</p>
            </div>
            <div className="space-y-2 flex-1 max-w-xs">
              {ratingBuckets.map(({ star, count, pct }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-4 text-right flex-shrink-0">{star}</span>
                  <svg className="w-3.5 h-3.5 text-gold-DEFAULT flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" />
                  </svg>
                  <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold-DEFAULT rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8 flex-shrink-0">{count}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="font-display font-bold text-3xl text-gray-900">{reviews.length}+</p>
              <p className="text-gray-500 text-sm">verified reviews</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">

          {/* Reviews feed — 2/3 */}
          <div className="lg:col-span-2">
            <p className="eyebrow text-teal-DEFAULT mb-3">Guest reviews</p>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-8">
              {reviews.length > 0 ? `${reviews.length} reviews` : "Reviews"}
            </h2>

            {reviews.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p>No approved reviews yet — be the first!</p>
              </div>
            ) : (
              <div className="space-y-5">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar initials */}
                        <div className="w-10 h-10 rounded-full bg-teal-DEFAULT flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {review.author_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{review.author_name}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            {review.author_country && <span>{review.author_country}</span>}
                            {review.author_country && review.trip_month && <span>·</span>}
                            {review.trip_month && <span>{review.trip_month}</span>}
                          </div>
                        </div>
                      </div>
                      <StarDisplay rating={review.rating} />
                    </div>

                    {/* Content */}
                    {review.title && (
                      <h3 className="font-display font-bold text-gray-900 text-lg mb-2">{review.title}</h3>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed">{review.body}</p>

                    {/* Sub-ratings */}
                    {(review.guide_rating || review.value_rating) && (
                      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
                        {review.guide_rating && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">Guide</span>
                            <StarDisplay rating={review.guide_rating} />
                          </div>
                        )}
                        {review.value_rating && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">Value</span>
                            <StarDisplay rating={review.value_rating} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Write a review — 1/3 sticky */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-card">
              <p className="eyebrow text-teal-DEFAULT mb-2">Share your experience</p>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">Write a review</h2>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Traveled with us? Tell others what it was really like.
              </p>
              <ReviewForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
