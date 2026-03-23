"use client";

import Link from "next/link";

interface Props {
  safariSlug: string;
  safariName: string;
  priceUsd: number | null;
}

export default function MobileBookingBar({ safariSlug, safariName, priceUsd }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 shadow-2xl px-4 py-3 flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 truncate">{safariName}</p>
        {priceUsd && (
          <p className="font-bold text-gray-900 text-sm">
            From <span className="text-teal-DEFAULT">${Math.round(priceUsd / 2).toLocaleString()}</span>
            <span className="text-gray-400 font-normal text-xs">/pp</span>
          </p>
        )}
      </div>
      <Link
        href={`/book?safari=${safariSlug}`}
        className="flex-shrink-0 bg-teal-DEFAULT hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-md"
      >
        Book Now →
      </Link>
    </div>
  );
}
