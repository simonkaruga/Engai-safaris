import { getReviews } from "@/lib/api";

export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest Reviews",
  description: "Read honest reviews from Engai Safaris guests. 4.9/5 average rating across 300+ safaris.",
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "4.9";

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl font-bold mb-4">Guest Reviews</h1>
        <div className="flex items-center justify-center gap-3 text-2xl font-bold text-gold-DEFAULT">
          <span>⭐ {avg}</span>
          <span className="text-gray-400 font-normal text-base">· {reviews.length} reviews</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < review.rating ? "text-gold-DEFAULT" : "text-gray-200"}>★</span>
              ))}
            </div>
            {review.title && <h3 className="font-semibold mb-2">{review.title}</h3>}
            <p className="text-gray-600 text-sm mb-4">{review.body}</p>
            <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">{review.author_name}</p>
                {review.author_country && <p className="text-xs text-gray-400">{review.author_country}</p>}
              </div>
              {review.trip_month && <span className="text-xs text-gray-400">{review.trip_month}</span>}
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <p className="text-center text-gray-500 py-20">Reviews coming soon.</p>
      )}
    </div>
  );
}
