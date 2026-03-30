"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AgentBooking {
  id: string;
  reference: string;
  customer_name: string;
  travel_date?: string;
  status: string;
  total_kes?: number;
}

export default function AgentDashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<AgentBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("agent_token");
    if (!token) { router.push("/agent/login"); return; }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agent/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setBookings)
      .catch(() => router.push("/agent/login"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold">Agent Dashboard</h1>
        <Link href="/agent/safaris" className="bg-teal-DEFAULT text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 transition-colors">
          Browse Wholesale Catalogue
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-gray-500 text-sm">Total Bookings</p>
          <p className="font-bold text-2xl mt-1">{bookings.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-gray-500 text-sm">Confirmed</p>
          <p className="font-bold text-2xl mt-1">{bookings.filter((b) => b.status === "confirmed").length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-gray-500 text-sm">Pending</p>
          <p className="font-bold text-2xl mt-1">{bookings.filter((b) => b.status === "pending").length}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-semibold">Recent Bookings</h2>
        </div>
        {bookings.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No bookings yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Reference</th>
                <th className="px-5 py-3 text-left">Guest</th>
                <th className="px-5 py-3 text-left">Travel Date</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Total KES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-mono text-xs">{b.reference}</td>
                  <td className="px-5 py-3">{b.customer_name}</td>
                  <td className="px-5 py-3">{b.travel_date}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      b.status === "confirmed" ? "bg-green-100 text-green-700" :
                      b.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>{b.status}</span>
                  </td>
                  <td className="px-5 py-3 font-semibold">KES {Number(b.total_kes).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
