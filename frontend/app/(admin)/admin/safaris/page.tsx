"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CATEGORY_COLORS: Record<string, string> = {
  wildlife: "bg-green-100 text-green-700",
  beach: "bg-blue-100 text-blue-700",
  cultural: "bg-purple-100 text-purple-700",
  adventure: "bg-orange-100 text-orange-700",
  luxury: "bg-yellow-100 text-yellow-700",
  photography: "bg-pink-100 text-pink-700",
  corporate: "bg-gray-100 text-gray-700",
};

export default function AdminSafarisPage() {
  const router = useRouter();
  const [safaris, setSafaris] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/safaris`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/safaris`).then((r2) => r2.json()))
      .then(setSafaris)
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router, token]);

  const toggleField = async (id: string, field: "is_featured" | "is_active", current: boolean) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/safaris/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ [field]: !current }),
    });
    if (res.ok) {
      setSafaris((prev) => prev.map((s) => s.id === id ? { ...s, [field]: !current } : s));
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">Safaris</h1>
        <Link href="/admin/dashboard" className="text-sm text-teal-DEFAULT hover:underline">
          ← Dashboard
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {safaris.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No safaris found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Category</th>
                <th className="px-5 py-3 text-left">Days</th>
                <th className="px-5 py-3 text-left">Price (USD 2pax)</th>
                <th className="px-5 py-3 text-left">Order</th>
                <th className="px-5 py-3 text-center">Featured</th>
                <th className="px-5 py-3 text-center">Active</th>
                <th className="px-5 py-3 text-left">Photos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {safaris.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium max-w-[220px]">
                    <span className="truncate block">{s.name}</span>
                    {s.subtitle && <span className="text-xs text-gray-400 truncate block">{s.subtitle}</span>}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${CATEGORY_COLORS[s.category] ?? "bg-gray-100 text-gray-600"}`}>
                      {s.category ?? "—"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{s.duration_days ?? "—"}</td>
                  <td className="px-5 py-3 font-semibold">
                    {s.price_usd_2pax != null ? `$${Number(s.price_usd_2pax).toLocaleString()}` : "—"}
                  </td>
                  <td className="px-5 py-3 text-gray-500">{s.sort_order ?? "—"}</td>
                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => toggleField(s.id, "is_featured", !!s.is_featured)}
                      className={`w-8 h-8 rounded-full border-2 transition-colors mx-auto flex items-center justify-center text-xs font-bold ${
                        s.is_featured ? "bg-gold-DEFAULT border-gold-DEFAULT text-white" : "bg-gray-100 border-gray-300 text-gray-400"
                      }`}
                      title={s.is_featured ? "Remove from featured" : "Mark as featured"}
                      aria-label={s.is_featured ? "Remove from featured" : "Mark as featured"}
                    >
                      ★
                    </button>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => toggleField(s.id, "is_active", !!s.is_active)}
                      className={`w-8 h-8 rounded-full border-2 transition-colors mx-auto block ${
                        s.is_active ? "bg-green-500 border-green-500" : "bg-gray-200 border-gray-300"
                      }`}
                      title={s.is_active ? "Deactivate" : "Activate"}
                      aria-label={s.is_active ? "Deactivate safari" : "Activate safari"}
                    />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/safaris/${s.id}/edit`}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-teal-200 bg-teal-50 text-teal-DEFAULT hover:bg-teal-DEFAULT hover:text-white transition-colors"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/admin/safaris/${s.id}/photos`}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                        s.cover_image
                          ? "text-green-700 border-green-200 bg-green-50 hover:bg-green-100"
                          : "text-amber-700 border-amber-200 bg-amber-50 hover:bg-amber-100"
                      }`}
                    >
                      {s.cover_image ? "Edit" : "⚠ Add Photos"}
                    </Link>
                    </div>
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
