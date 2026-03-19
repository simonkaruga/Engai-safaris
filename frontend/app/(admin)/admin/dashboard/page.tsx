"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Stats {
  total_bookings: number;
  confirmed_bookings: number;
  revenue_kes: number;
  new_enquiries: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) { router.push("/admin/login"); return; }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setStats)
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  const KPI_CARDS = [
    { label: "Total Bookings", value: stats?.total_bookings ?? 0, color: "text-teal-DEFAULT" },
    { label: "Confirmed", value: stats?.confirmed_bookings ?? 0, color: "text-green-600" },
    { label: "Revenue (KES)", value: `KES ${(stats?.revenue_kes ?? 0).toLocaleString()}`, color: "text-gold-DEFAULT" },
    { label: "New Enquiries", value: stats?.new_enquiries ?? 0, color: "text-maasai-DEFAULT" },
  ];

  const QUICK_LINKS = [
    { label: "Enquiries Pipeline", href: "/admin/enquiries", icon: "📋" },
    { label: "Bookings", href: "/admin/bookings", icon: "📅" },
    { label: "Safaris", href: "/admin/safaris", icon: "🦁" },
    { label: "Guides", href: "/admin/guides", icon: "👤" },
    { label: "Agents", href: "/admin/agents", icon: "🤝" },
    { label: "Blog", href: "/admin/blog", icon: "✍️" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => { localStorage.removeItem("admin_token"); router.push("/admin/login"); }}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Sign out
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {KPI_CARDS.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-gray-500 text-xs mb-1">{kpi.label}</p>
            <p className={`font-bold text-2xl ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-teal-DEFAULT hover:shadow-sm transition-all flex items-center gap-3"
          >
            <span className="text-2xl">{link.icon}</span>
            <span className="font-semibold text-sm">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
