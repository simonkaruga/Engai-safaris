"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const SAFARI_HREFS: [string, string][] = [
  ["footer.classicSafaris",     "/safaris?category=classic"],
  ["footer.luxurySafaris",      "/safaris?category=luxury"],
  ["footer.photographySafaris", "/safaris?category=photography"],
  ["footer.culturalSafaris",    "/safaris?category=cultural"],
  ["footer.corporateSafaris",   "/safaris?category=corporate"],
  ["footer.viewAllPackages",    "/safaris"],
];

const DESTINATION_HREFS: [string, string][] = [
  ["Masai Mara",    "/destinations/masai-mara"],
  ["Amboseli",      "/destinations/amboseli"],
  ["Lake Naivasha", "/destinations/lake-naivasha"],
  ["Samburu",       "/destinations/samburu"],
  ["Lake Nakuru",   "/destinations/lake-nakuru"],
];

const COMPANY_HREFS: [string, string][] = [
  ["footer.aboutUs",      "/about"],
  ["footer.ourGuides",    "/guides"],
  ["footer.guestReviews", "/reviews"],
  ["footer.blog",         "/blog"],
  ["footer.faq",          "/faq"],
  ["footer.contact",      "/contact"],
];

const LEGAL_HREFS: [string, string][] = [
  ["footer.terms",             "/terms"],
  ["footer.privacy",           "/privacy"],
  ["footer.cancellationPolicy","/cancellation-policy"],
];

const SOCIAL = [
  {
    name: "Instagram",
    href: "https://instagram.com/engaisafaris",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@engaisafaris",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@engaisafaris",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-teal-900 text-gray-400">
      <div className="h-px bg-gradient-to-r from-transparent via-teal-DEFAULT/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="mb-4">
              <Image src="/images/logo.png" alt="Engai Safaris" width={160} height={48} className="h-10 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-2">{t("footer.tagline")}</p>
            <p className="text-sm text-gray-500 italic mb-5">{t("footer.taglineQuote")}</p>
            <div className="flex flex-wrap gap-2 mb-6 text-xs">
              {(["footer.badgeOwned", "footer.badgeLicensed", "footer.badgeGDPR"] as const).map((key) => (
                <span key={key} className="px-2.5 py-1 rounded-full border border-teal-800 text-gray-500">
                  {t(key)}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              {SOCIAL.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                  className="w-9 h-9 rounded-lg border border-teal-800 flex items-center justify-center text-gray-500 hover:text-white hover:border-teal-DEFAULT hover:bg-teal-DEFAULT/10 transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Safaris */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-300 mb-5">{t("footer.safaris")}</p>
            <ul className="space-y-2.5">
              {SAFARI_HREFS.map(([key, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {t(key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-300 mb-5">{t("footer.destinations")}</p>
            <ul className="space-y-2.5">
              {DESTINATION_HREFS.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/destinations" className="text-sm text-gray-500 hover:text-white transition-colors">
                  {t("footer.allDestinations")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-300 mb-5">{t("footer.company")}</p>
            <ul className="space-y-2.5">
              {COMPANY_HREFS.map(([key, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {t(key as any)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/agent/login" className="text-sm text-teal-500 hover:text-teal-400 transition-colors">
                  {t("footer.agentPortal")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-300 mb-5">{t("footer.legal")}</p>
            <ul className="space-y-2.5">
              {LEGAL_HREFS.map(([key, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {t(key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Review badges */}
        <div className="border-t border-teal-800/60 pt-8 pb-6 flex flex-wrap items-center justify-center gap-4">
          <a href="https://g.page/r/engaisafaris/review" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors">
            <svg viewBox="0 0 48 48" className="w-4 h-4 flex-shrink-0">
              <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
              <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.6 19.2 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z"/>
              <path fill="#FBBC05" d="M24 46c5.5 0 10.6-1.8 14.5-5l-6.7-5.5C29.8 37 27 38 24 38c-6.1 0-11.2-4.1-13-9.7l-7.1 5.5C7.6 41.5 15.3 46 24 46z"/>
              <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.9 2.5-2.6 4.7-4.8 6.2l6.7 5.5C42.2 36.4 46 30.7 46 24c0-1.3-.2-2.7-.5-4z"/>
            </svg>
            4.9★ Google Reviews
          </a>
          <span className="text-gray-800">·</span>
          <a href="https://www.tripadvisor.com/engaisafaris" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[#34E0A1]" />)}
            </div>
            5.0 TripAdvisor
          </a>
          <span className="text-gray-800">·</span>
          <span className="text-xs text-teal-700">SafariBookings Top Operator 2025</span>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-teal-800/60 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-teal-700">
          <p>© {new Date().getFullYear()} Engai Safaris Ltd. {t("footer.allRights")}</p>
          <p className="text-center sm:text-right">{t("footer.builtIn")}</p>
        </div>
      </div>
    </footer>
  );
}
