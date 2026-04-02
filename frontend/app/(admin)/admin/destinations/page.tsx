"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Destination {
  id: string;
  slug: string;
  name: string;
  region?: string;
  cover_image?: string | null;
  peak_fee_usd?: number;
  best_months?: string[] | string;
  is_active: boolean;
}

export default function AdminDestinationsPage() {
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/destinations`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/destinations`).then((r2) => r2.json()))
      .then(setDestinations)
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router, token]);

  const toggleActive = async (id: string, current: boolean) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/destinations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ is_active: !current }),
    });
    if (res.ok) {
      setDestinations((prev) => prev.map((d) => d.id === id ? { ...d, is_active: !current } : d));
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">Destinations</h1>
        <Link href="/admin/dashboard" className="text-sm text-teal-DEFAULT hover:underline">
          ← Dashboard
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {destinations.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No destinations found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Region</th>
                <th className="px-5 py-3 text-left">Park Fee</th>
                <th className="px-5 py-3 text-left">Best Months</th>
                <th className="px-5 py-3 text-center">Active</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {destinations.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium">
                    <div className="flex items-center gap-3">
                      {d.cover_image ? (
                        <Image src={d.cover_image} alt={d.name} width={36} height={36} className="w-9 h-9 rounded-lg object-cover shrink-0" unoptimized />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-bold shrink-0">📍</div>
                      )}
                      {d.name}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600 capitalize">{d.region ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-500">
                    {d.peak_fee_usd != null ? `$${d.peak_fee_usd}/day` : "—"}
                  </td>
                  <td className="px-5 py-3 text-gray-500 max-w-[200px]">
                    {Array.isArray(d.best_months) ? d.best_months.join(", ") : d.best_months ?? "—"}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => toggleActive(d.id, !!d.is_active)}
                      className={`w-8 h-8 rounded-full border-2 transition-colors mx-auto block ${
                        d.is_active ? "bg-green-500 border-green-500" : "bg-gray-200 border-gray-300"
                      }`}
                      title={d.is_active ? "Deactivate" : "Activate"}
                      aria-label={d.is_active ? "Deactivate destination" : "Activate destination"}
                    />
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/destinations/${d.id}/edit`}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-teal-200 bg-teal-50 text-teal-DEFAULT hover:bg-teal-DEFAULT hover:text-white transition-colors"
                    >
                      Edit
                    </Link>
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
