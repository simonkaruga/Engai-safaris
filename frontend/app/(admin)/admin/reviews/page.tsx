"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Review {
  id: string;
  author_name?: string;
  country?: string;
  rating?: number;
  safari_name?: string;
  title?: string;
  is_approved: boolean;
  is_featured: boolean;
}

const FILTER_TABS = ["all", "pending", "approved", "featured"];

export default function AdminReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/reviews`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setReviews)
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router, token]);

  const toggleField = async (id: string, field: "is_approved" | "is_featured", current: boolean) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ [field]: !current }),
    });
    if (res.ok) {
      setReviews((prev) => prev.map((r) => r.id === id ? { ...r, [field]: !current } : r));
    }
  };

  const deleteReview = async (id: string) => {
    if (confirmDeleteId !== id) { setConfirmDeleteId(id); return; }
    setConfirmDeleteId(null);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/reviews/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const filtered = (() => {
    if (filter === "all") return reviews;
    if (filter === "pending") return reviews.filter((r) => !r.is_approved);
    if (filter === "approved") return reviews.filter((r) => r.is_approved);
    if (filter === "featured") return reviews.filter((r) => r.is_featured);
    return reviews;
  })();

  const renderStars = (rating: number) => "★".repeat(Math.floor(rating ?? 0)) + "☆".repeat(5 - Math.floor(rating ?? 0));

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">Reviews</h1>
        <Link href="/admin/dashboard" className="text-sm text-teal-DEFAULT hover:underline">
          ← Dashboard
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_TABS.map((tab) => {
          const count = (() => {
            if (tab === "all") return reviews.length;
            if (tab === "pending") return reviews.filter((r) => !r.is_approved).length;
            if (tab === "approved") return reviews.filter((r) => r.is_approved).length;
            if (tab === "featured") return reviews.filter((r) => r.is_featured).length;
            return 0;
          })();
          return (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                filter === tab ? "bg-teal-DEFAULT text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab} {count > 0 && <span className="ml-1">({count})</span>}
            </button>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No reviews found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Author</th>
                <th className="px-5 py-3 text-left">Country</th>
                <th className="px-5 py-3 text-left">Rating</th>
                <th className="px-5 py-3 text-left">Safari</th>
                <th className="px-5 py-3 text-left">Title</th>
                <th className="px-5 py-3 text-center">Approved</th>
                <th className="px-5 py-3 text-center">Featured</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium">{r.author_name ?? r.name ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-500">{r.country ?? "—"}</td>
                  <td className="px-5 py-3 text-yellow-500 text-sm" title={`${r.rating}/5`}>
                    {r.rating != null ? renderStars(r.rating) : "—"}
                  </td>
                  <td className="px-5 py-3 text-gray-600 max-w-[140px] truncate">
                    {r.safari_name ?? r.safari?.name ?? "—"}
                  </td>
                  <td className="px-5 py-3 max-w-[180px] truncate">{r.title ?? "—"}</td>
                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => toggleField(r.id, "is_approved", !!r.is_approved)}
                      className={`w-8 h-8 rounded-full border-2 transition-colors mx-auto block ${
                        r.is_approved ? "bg-green-500 border-green-500" : "bg-gray-200 border-gray-300"
                      }`}
                      title={r.is_approved ? "Revoke approval" : "Approve"}
                      aria-label={r.is_approved ? "Revoke approval" : "Approve review"}
                    />
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => toggleField(r.id, "is_featured", !!r.is_featured)}
                      className={`w-8 h-8 rounded-full border-2 transition-colors mx-auto flex items-center justify-center text-xs font-bold ${
                        r.is_featured ? "bg-gold-DEFAULT border-gold-DEFAULT text-white" : "bg-gray-100 border-gray-300 text-gray-400"
                      }`}
                      title={r.is_featured ? "Unfeature" : "Feature"}
                      aria-label={r.is_featured ? "Unfeature review" : "Feature review"}
                    >
                      ★
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => deleteReview(r.id)}
                      className={`text-xs font-semibold transition-colors ${
                        confirmDeleteId === r.id
                          ? "text-white bg-red-500 px-2 py-0.5 rounded"
                          : "text-red-500 hover:text-red-700"
                      }`}
                    >
                      {confirmDeleteId === r.id ? "Confirm delete" : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
