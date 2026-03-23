"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  quoted: "bg-purple-100 text-purple-700",
  negotiating: "bg-orange-100 text-orange-700",
  booked: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-600",
  lost: "bg-red-100 text-red-700",
};

const STATUSES = ["new", "contacted", "quoted", "negotiating", "booked", "completed", "lost"];

export default function AdminEnquiriesPage() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("new");

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/enquiries`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setEnquiries)
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router, token]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status } : e));
  };

  const filtered = enquiries.filter((e) => !filter || e.status === filter);

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold mb-6">Enquiries Pipeline</h1>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUSES.map((s) => {
          const count = enquiries.filter((e) => e.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                filter === s ? "bg-teal-DEFAULT text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s} {count > 0 && <span className="ml-1">({count})</span>}
            </button>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No enquiries with status "{filter}".</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Ref</th>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-5 py-3 text-left">Date</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-mono text-xs">{e.reference}</td>
                  <td className="px-5 py-3 font-medium">{e.customer_name}</td>
                  <td className="px-5 py-3 text-gray-500">{e.customer_email}</td>
                  <td className="px-5 py-3 text-gray-500">{new Date(e.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[e.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 flex items-center gap-3">
                    <select
                      value={e.status}
                      onChange={(ev) => updateStatus(e.id, ev.target.value)}
                      className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-teal-DEFAULT"
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <Link href={`/admin/enquiries/${e.id}`} className="text-xs text-teal-DEFAULT hover:underline font-semibold whitespace-nowrap">View →</Link>
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
