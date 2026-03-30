"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CashFlowAlert {
  reference: string;
  customer_name: string;
  safari_name: string;
  travel_date: string;
  lodge_payment_due: string;
  balance_kes: number;
}

interface Stats {
  total_bookings: number;
  confirmed_bookings: number;
  revenue_kes: number;
  new_enquiries: number;
  cash_flow_alerts: CashFlowAlert[];
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
    { label: "Availability", href: "/admin/availability", icon: "🗓️" },
    { label: "Safaris", href: "/admin/safaris", icon: "🦁" },
    { label: "Guides", href: "/admin/guides", icon: "👤" },
    { label: "Agents", href: "/admin/agents", icon: "🤝" },
    { label: "Blog", href: "/admin/blog", icon: "✍️" },
  ];

  const alerts = stats?.cash_flow_alerts ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
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

      {/* Cash flow alerts */}
      {alerts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <h2 className="font-bold text-amber-800 text-sm">Lodge Payment Due: Next 14 Days</h2>
          </div>
          <p className="text-amber-700 text-xs mb-4 leading-relaxed">
            These confirmed bookings have lodge payments falling due within 14 days (30 days before travel date).
            Ensure you have collected the balance from the customer before paying the lodge.
          </p>
          <div className="space-y-2">
            {alerts.map((a) => (
              <div key={a.reference} className="bg-white border border-amber-200 rounded-lg px-4 py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-teal-DEFAULT font-semibold">{a.reference}</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{a.customer_name} · {a.safari_name}</p>
                  <p className="text-xs text-gray-500">
                    Travel: {new Date(a.travel_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    &nbsp;·&nbsp;
                    Lodge due: <span className="font-semibold text-amber-700">{new Date(a.lodge_payment_due).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400">Balance from guest</p>
                  <p className="font-bold text-gray-900 text-sm">KES {Math.round(a.balance_kes).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Promo codes reference */}
      <div className="bg-teal-50 border border-teal-100 rounded-xl p-5 mb-8">
        <h2 className="font-bold text-teal-800 text-sm mb-3">Active Promo Codes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { code: "ENGAI10", desc: "10% welcome discount for first-time guests" },
            { code: "ENGAI15", desc: "15% loyalty discount for returning guests" },
            { code: "HONEY20", desc: "20% honeymoon special" },
            { code: "FAMILY10", desc: "10% family safari" },
            { code: "AGENT5", desc: "5% agent referral" },
          ].map((p) => (
            <div key={p.code} className="bg-white border border-teal-100 rounded-lg px-3 py-2">
              <p className="font-mono text-xs font-bold text-teal-DEFAULT">{p.code}</p>
              <p className="text-xs text-gray-500 mt-0.5">{p.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-teal-600 mt-3">Share codes with guests via WhatsApp or email. They enter them at checkout.</p>
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
