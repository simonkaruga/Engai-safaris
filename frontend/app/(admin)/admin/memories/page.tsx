"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminMemoriesPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings?status=completed`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setBookings)
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router, token]);

  const setAlbumUrl = async (id: string) => {
    const url = prompt("Enter the photo album URL for this booking:");
    if (!url) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ memories_url: url }),
    });
    if (res.ok) {
      setBookings((prev) => prev.map((b) => b.id === id ? { ...b, memories_url: url } : b));
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-display text-3xl font-bold">Post-trip Memory Albums</h1>
        <Link href="/admin/dashboard" className="text-sm text-teal-DEFAULT hover:underline">
          ← Dashboard
        </Link>
      </div>

      <p className="text-gray-500 text-sm mb-8">
        After each safari, upload the guest photo album URL here. Guests receive a link to relive their adventure.
      </p>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {bookings.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No completed bookings found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Reference</th>
                <th className="px-5 py-3 text-left">Guest</th>
                <th className="px-5 py-3 text-left">Safari Date</th>
                <th className="px-5 py-3 text-left">Album URL</th>
                <th className="px-5 py-3 text-left">Created</th>
                <th className="px-5 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-mono text-xs text-teal-DEFAULT font-semibold">
                    {b.reference || b.id?.slice(0, 8)}
                  </td>
                  <td className="px-5 py-3 font-medium">{b.customer_name ?? b.guest_name ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-500">
                    {b.travel_date ? new Date(b.travel_date).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-5 py-3 max-w-[200px]">
                    {b.memories_url ? (
                      <a
                        href={b.memories_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-DEFAULT text-xs underline truncate block"
                      >
                        {b.memories_url}
                      </a>
                    ) : (
                      <span className="text-gray-400 text-xs italic">Not set</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {b.created_at ? new Date(b.created_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => setAlbumUrl(b.id)}
                      className="text-xs font-semibold px-3 py-1 rounded border border-gray-200 bg-gray-50 text-teal-DEFAULT hover:bg-teal-DEFAULT hover:text-white hover:border-teal-DEFAULT transition-colors"
                    >
                      {b.memories_url ? "Update Album" : "Set Album URL"}
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
