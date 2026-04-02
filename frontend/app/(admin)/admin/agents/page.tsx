"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Agent {
  id: string;
  name?: string;
  full_name?: string;
  company?: string;
  agency_name?: string;
  email?: string;
  phone?: string;
  tier?: string;
  commission_percent?: number;
  total_bookings?: number;
  is_active: boolean;
  created_at?: string;
}

const TIER_COLORS: Record<string, string> = {
  standard: "bg-blue-100 text-blue-700",
  premium: "bg-yellow-100 text-yellow-800",
  vip: "bg-purple-100 text-purple-700",
};

export default function AdminAgentsPage() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/agents`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setAgents)
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router, token]);

  const toggleActive = async (id: string, current: boolean) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/agents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ is_active: !current }),
    });
    if (res.ok) {
      setAgents((prev) => prev.map((a) => a.id === id ? { ...a, is_active: !current } : a));
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">Travel Agents</h1>
        <Link href="/admin/dashboard" className="text-sm text-teal-DEFAULT hover:underline">
          ← Dashboard
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {agents.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No agents found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Company</th>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-5 py-3 text-left">Phone</th>
                <th className="px-5 py-3 text-left">Tier</th>
                <th className="px-5 py-3 text-left">Commission %</th>
                <th className="px-5 py-3 text-left">Total Bookings</th>
                <th className="px-5 py-3 text-left">Created</th>
                <th className="px-5 py-3 text-center">Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {agents.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium">{a.name ?? a.full_name ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-600">{a.company ?? a.agency_name ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-500">{a.email ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-500">{a.phone ?? "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${TIER_COLORS[a.tier ?? ""] ?? "bg-gray-100 text-gray-600"}`}>
                      {a.tier ?? "standard"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {a.commission_percent != null ? `${a.commission_percent}%` : "—"}
                  </td>
                  <td className="px-5 py-3 text-gray-500">{a.total_bookings ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-500">
                    {a.created_at ? new Date(a.created_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => toggleActive(a.id, !!a.is_active)}
                      className={`w-8 h-8 rounded-full border-2 transition-colors mx-auto block ${
                        a.is_active ? "bg-green-500 border-green-500" : "bg-gray-200 border-gray-300"
                      }`}
                      title={a.is_active ? "Deactivate" : "Activate"}
                      aria-label={a.is_active ? "Deactivate agent" : "Activate agent"}
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
