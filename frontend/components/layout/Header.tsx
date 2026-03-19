"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { label: "Safaris", href: "/safaris" },
  { label: "Destinations", href: "/destinations" },
  { label: "Guides", href: "/guides" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display font-bold text-xl text-teal-DEFAULT">Engai Safaris</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-teal-DEFAULT transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/plan-my-safari"
            className="text-sm font-medium text-teal-DEFAULT hover:underline"
          >
            AI Planner
          </Link>
          <Link
            href="/enquire"
            className="bg-teal-DEFAULT hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Book a Safari
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-700"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-gray-700 hover:text-teal-DEFAULT py-1"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/enquire"
            onClick={() => setOpen(false)}
            className="block bg-teal-DEFAULT text-white text-center py-2.5 rounded-lg text-sm font-semibold mt-2"
          >
            Book a Safari
          </Link>
        </div>
      )}
    </header>
  );
}
