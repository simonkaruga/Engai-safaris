"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Affiliate {
  id: string;
  name?: string;
  full_name?: string;
  code?: string;
  commission_percent?: number;
  total_referrals?: number;
  referral_count?: number;
  total_earnings_kes?: number;
  is_active: boolean;
}

export default function AdminAffiliatesPage() {
  const router = useRouter();
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/affiliates`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setAffiliates)
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router, token]);

  const toggleActive = async (id: string, current: boolean) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/affiliates/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ is_active: !current }),
    });
    if (res.ok) {
      setAffiliates((prev) => prev.map((a) => a.id === id ? { ...a, is_active: !current } : a));
    }
  };

  const copyLink = (code: string, id: string) => {
    const url = `${window.location.origin}/?ref=${code}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">Affiliates</h1>
        <Link href="/admin/dashboard" className="text-sm text-teal-DEFAULT hover:underline">
          ← Dashboard
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {affiliates.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No affiliates found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Code</th>
                <th className="px-5 py-3 text-left">Commission %</th>
                <th className="px-5 py-3 text-left">Total Referrals</th>
                <th className="px-5 py-3 text-left">Total Earnings KES</th>
                <th className="px-5 py-3 text-center">Active</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {affiliates.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium">{a.name ?? a.full_name ?? "—"}</td>
                  <td className="px-5 py-3 font-mono text-xs text-teal-DEFAULT font-semibold">{a.code ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-600">
                    {a.commission_percent != null ? `${a.commission_percent}%` : "—"}
                  </td>
                  <td className="px-5 py-3 text-gray-600">{a.total_referrals ?? a.referral_count ?? "—"}</td>
                  <td className="px-5 py-3 font-semibold">
                    {a.total_earnings_kes != null ? `KES ${Number(a.total_earnings_kes).toLocaleString()}` : "—"}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => toggleActive(a.id, !!a.is_active)}
                      className={`w-8 h-8 rounded-full border-2 transition-colors mx-auto block ${
                        a.is_active ? "bg-green-500 border-green-500" : "bg-gray-200 border-gray-300"
                      }`}
                      title={a.is_active ? "Deactivate" : "Activate"}
                      aria-label={a.is_active ? "Deactivate affiliate" : "Activate affiliate"}
                    />
                  </td>
                  <td className="px-5 py-3">
                    {a.code && (
                      <button
                        onClick={() => copyLink(a.code!, a.id)}
                        className={`text-xs font-semibold px-3 py-1 rounded border transition-colors ${
                          copied === a.id
                            ? "bg-green-100 text-green-700 border-green-300"
                            : "bg-gray-50 text-teal-DEFAULT border-gray-200 hover:bg-teal-DEFAULT hover:text-white hover:border-teal-DEFAULT"
                        }`}
                      >
                        {copied === a.id ? "Copied!" : "Copy Link"}
                      </button>
                    )}
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
