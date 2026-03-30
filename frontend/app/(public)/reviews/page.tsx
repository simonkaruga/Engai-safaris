import { getReviews } from "@/lib/api";
import ReviewsContent from "./ReviewsContent";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Guest Reviews",
  description: "Read honest reviews from Engai Safaris guests. 4.9/5 average rating across 300+ safaris.",
  alternates: { canonical: "https://www.engaisafaris.com/reviews" },
};

export default async function ReviewsPage() {
  const reviews = await getReviews();
  return <ReviewsContent reviews={reviews} />;
}
