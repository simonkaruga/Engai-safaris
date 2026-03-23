"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AgentInvoicesPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("agent_token");
    if (!token) { router.push("/agent/login"); return; }
    // Agent invoices endpoint — lists past monthly invoices
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agent/invoices`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : [])
      .then(setInvoices)
      .catch(() => [])
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">Invoices</h1>
        <Link href="/agent/dashboard" className="text-sm text-gray-500 hover:text-teal-DEFAULT">← Dashboard</Link>
      </div>

      {invoices.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-400 text-lg mb-2">No invoices yet</p>
          <p className="text-gray-400 text-sm">Invoices are generated monthly for confirmed bookings. Payment terms: 30 days from invoice date.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Invoice #</th>
                <th className="px-5 py-3 text-left">Period</th>
                <th className="px-5 py-3 text-left">Bookings</th>
                <th className="px-5 py-3 text-left">Total KES</th>
                <th className="px-5 py-3 text-left">Due Date</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((inv: any) => (
                <tr key={inv.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-mono text-xs">{inv.reference}</td>
                  <td className="px-5 py-3">{inv.period}</td>
                  <td className="px-5 py-3">{inv.booking_count}</td>
                  <td className="px-5 py-3 font-semibold">KES {Number(inv.total_kes).toLocaleString()}</td>
                  <td className="px-5 py-3">{inv.due_date}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      inv.status === "paid" ? "bg-green-100 text-green-700" :
                      inv.status === "overdue" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>{inv.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    <a
                      href={`${process.env.NEXT_PUBLIC_API_URL}/api/agent/invoices/${inv.id}/pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-DEFAULT text-xs font-semibold hover:underline"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-xs text-gray-400 mt-4">Payment via bank transfer (Wise). Questions? WhatsApp your account manager.</p>
    </div>
  );
}
