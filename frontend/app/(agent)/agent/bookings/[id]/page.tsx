"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface BookingDetail {
  id: string;
  reference: string;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  customer_country?: string;
  travel_date?: string;
  pax?: number;
  total_kes?: number;
  deposit_kes?: number;
  balance_kes?: number;
  status: string;
  created_at: string;
}

export default function AgentBookingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("agent_token");
    if (!token) { router.push("/agent/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agent/bookings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setBooking)
      .catch(() => router.push("/agent/dashboard"))
      .finally(() => setLoading(false));
  }, [router, id]);

  async function downloadVoucher() {
    const token = localStorage.getItem("agent_token");
    setDownloading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agent/bookings/${id}/voucher`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `voucher-${booking?.reference ?? id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Could not download voucher. Please contact support.");
    } finally {
      setDownloading(false);
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;
  if (!booking) return <div className="text-center py-20 text-gray-500">Booking not found.</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <Link href="/agent/dashboard" className="text-sm text-gray-500 hover:text-teal-DEFAULT">← Dashboard</Link>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          booking.status === "confirmed" ? "bg-green-100 text-green-700" :
          booking.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"
        }`}>{booking.status}</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h1 className="font-display text-2xl font-bold mb-1">{booking.reference}</h1>
        <p className="text-gray-500 text-sm mb-6">Booking created {new Date(booking.created_at).toLocaleDateString()}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            ["Guest Name", booking.customer_name],
            ["Email", booking.customer_email],
            ["Phone", booking.customer_phone],
            ["Country", booking.customer_country ?? "—"],
            ["Travel Date", booking.travel_date],
            ["Guests (pax)", booking.pax],
            ["Total (KES)", `KES ${Number(booking.total_kes).toLocaleString()}`],
            ["Deposit (KES)", `KES ${Number(booking.deposit_kes).toLocaleString()}`],
            ["Balance (KES)", `KES ${Number(booking.balance_kes).toLocaleString()}`],
          ].map(([label, val]) => (
            <div key={label as string}>
              <p className="text-gray-400 text-xs">{label}</p>
              <p className="font-semibold">{val}</p>
            </div>
          ))}
        </div>
      </div>

      {booking.status === "confirmed" && (
        <button
          onClick={downloadVoucher}
          disabled={downloading}
          className="w-full bg-teal-DEFAULT hover:bg-teal-600 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
        >
          {downloading ? "Generating PDF…" : "Download Voucher PDF"}
        </button>
      )}
      {booking.status !== "confirmed" && (
        <p className="text-center text-sm text-gray-400">Voucher available once booking is confirmed.</p>
      )}
    </div>
  );
}
