"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface WholesaleSafari {
  id: string;
  name: string;
  slug: string;
  duration_days: number;
  category?: string;
  wholesale_usd?: number;
  price_usd_2pax?: number;
}

export default function AgentSafarisPage() {
  const router = useRouter();
  const [safaris, setSafaris] = useState<WholesaleSafari[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("agent_token");
    if (!token) { router.push("/agent/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/safaris`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setSafaris)
      .catch(() => router.push("/agent/login"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">Wholesale Catalogue</h1>
        <Link href="/agent/dashboard" className="text-sm text-gray-500 hover:text-teal-DEFAULT">← Dashboard</Link>
      </div>
      <p className="text-gray-500 text-sm mb-6">All prices are wholesale — 15% below retail. Book for your clients and download PDF vouchers instantly.</p>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-5 py-3 text-left">Package</th>
              <th className="px-5 py-3 text-left">Days</th>
              <th className="px-5 py-3 text-left">Category</th>
              <th className="px-5 py-3 text-left">Wholesale USD (2pax)</th>
              <th className="px-5 py-3 text-left">Retail USD (2pax)</th>
              <th className="px-5 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {safaris.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 font-semibold">{s.name}</td>
                <td className="px-5 py-3">{s.duration_days}d</td>
                <td className="px-5 py-3">
                  <span className="bg-teal-DEFAULT/10 text-teal-DEFAULT px-2 py-0.5 rounded-full text-xs font-semibold capitalize">{s.category}</span>
                </td>
                <td className="px-5 py-3 font-bold text-teal-DEFAULT">
                  {s.wholesale_usd ? `$${Number(s.wholesale_usd).toLocaleString()}` : "—"}
                </td>
                <td className="px-5 py-3 text-gray-400 line-through">
                  {s.price_usd_2pax ? `$${Number(s.price_usd_2pax).toLocaleString()}` : "—"}
                </td>
                <td className="px-5 py-3">
                  <Link
                    href={`/safaris/${s.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-DEFAULT text-xs font-semibold hover:underline"
                  >
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-4">To make a booking for a client, contact your Engai Safaris account manager via WhatsApp.</p>
    </div>
  );
}
