"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminGuidesPage() {
  const router = useRouter();
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/guides`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guides`).then((r2) => r2.json()))
      .then(setGuides)
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router, token]);

  const toggleActive = async (id: string, current: boolean) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/guides/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ is_active: !current }),
    });
    if (res.ok) {
      setGuides((prev) => prev.map((g) => g.id === id ? { ...g, is_active: !current } : g));
    }
  };

  const renderStars = (rating: number) => {
    const full = Math.floor(rating ?? 0);
    return "★".repeat(full) + "☆".repeat(5 - full);
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">Guides</h1>
        <Link href="/admin/dashboard" className="text-sm text-teal-DEFAULT hover:underline">
          ← Dashboard
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {guides.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No guides found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Photo</th>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Speciality</th>
                <th className="px-5 py-3 text-left">Languages</th>
                <th className="px-5 py-3 text-left">Rating</th>
                <th className="px-5 py-3 text-center">Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {guides.map((g) => (
                <tr key={g.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    {g.profile_image ? (
                      <img
                        src={g.profile_image}
                        alt={g.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-teal-DEFAULT/20 flex items-center justify-center text-teal-DEFAULT font-bold text-sm">
                        {(g.name ?? "?")[0].toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3 font-medium">{g.name}</td>
                  <td className="px-5 py-3 text-gray-600 capitalize">{g.speciality ?? g.specialty ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-500">
                    {Array.isArray(g.languages) ? g.languages.join(", ") : g.languages ?? "—"}
                  </td>
                  <td className="px-5 py-3 text-yellow-500 text-sm">
                    {g.rating != null ? (
                      <span title={`${g.rating}/5`}>{renderStars(g.rating)}</span>
                    ) : "—"}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => toggleActive(g.id, !!g.is_active)}
                      className={`w-8 h-8 rounded-full border-2 transition-colors mx-auto block ${
                        g.is_active ? "bg-green-500 border-green-500" : "bg-gray-200 border-gray-300"
                      }`}
                      title={g.is_active ? "Deactivate" : "Activate"}
                    />
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
