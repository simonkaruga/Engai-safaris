"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
  { label: "Enquiries", href: "/admin/enquiries", icon: "📋" },
  { label: "Bookings", href: "/admin/bookings", icon: "📅" },
  { label: "Vehicle Groups", href: "/admin/vehicle-groups", icon: "🚙" },
  { label: "Availability", href: "/admin/availability", icon: "🗓️" },
  { label: "Safaris", href: "/admin/safaris", icon: "🦁" },
  { label: "Destinations", href: "/admin/destinations", icon: "📍" },
  { label: "Guides", href: "/admin/guides", icon: "👤" },
  { label: "Reviews", href: "/admin/reviews", icon: "⭐" },
  { label: "Blog", href: "/admin/blog", icon: "✍️" },
  { label: "Agents", href: "/admin/agents", icon: "🤝" },
  { label: "Affiliates", href: "/admin/affiliates", icon: "🔗" },
  { label: "Messages", href: "/admin/messages", icon: "💬" },
  { label: "Memories", href: "/admin/memories", icon: "📸" },
  { label: "Gallery", href: "/admin/gallery", icon: "🖼️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 text-white flex flex-col shrink-0 fixed inset-y-0 left-0 z-40">
        <div className="px-5 py-5 border-b border-gray-700">
          <p className="font-display font-bold text-teal-400 text-lg leading-tight">Engai Safaris</p>
          <p className="text-gray-400 text-xs mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-3">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                  active ? "bg-teal-600 text-white font-semibold" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-5 py-4 border-t border-gray-700">
          <button
            onClick={() => { localStorage.removeItem("admin_token"); router.push("/admin/login"); }}
            aria-label="Sign out"
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Sign out →
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-56 flex-1 min-h-screen">
        {children}
      </main>
    </div>
  );
}
