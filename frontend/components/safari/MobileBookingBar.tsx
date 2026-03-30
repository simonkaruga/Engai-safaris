"use client";

import Link from "next/link";

interface Props {
  safariSlug: string;
  safariName: string;
  priceUsd: number | null;
}

export default function MobileBookingBar({ safariSlug, safariName, priceUsd }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.10)]">
      {/* Price strip */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <div className="min-w-0">
          <p className="text-[11px] text-gray-400 truncate">{safariName}</p>
          {priceUsd && (
            <p className="font-bold text-gray-900 text-base leading-tight">
              From{" "}
              <span className="text-teal-DEFAULT">${Math.round(priceUsd / 2).toLocaleString()}</span>
              <span className="text-gray-400 font-normal text-xs"> /person</span>
            </p>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          Instant booking
        </div>
      </div>

      {/* CTA buttons */}
      <div className="grid grid-cols-2 gap-2 px-4 pb-4 pt-2">
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=Hi! I'd like to enquire about ${encodeURIComponent(safariName)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:border-[#25D366] hover:text-[#25D366] transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Ask a question
        </a>
        <Link
          href={`/book?safari=${safariSlug}`}
          className="flex items-center justify-center gap-2 bg-teal-DEFAULT hover:bg-teal-600 text-white py-3 rounded-xl font-bold text-sm transition-colors shadow-teal"
        >
          Book Now
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
