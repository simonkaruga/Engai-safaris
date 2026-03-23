"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { SafariList } from "@/types/api";
import { useCurrency } from "@/context/CurrencyContext";
import { formatPrice } from "@/lib/currency";

function LiveViewers({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    const seed = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const base = 6 + (seed % 19);
    const timeSlot = Math.floor(Date.now() / (8 * 60 * 1000));
    setCount(base + ((timeSlot + seed) % 5));
  }, [slug]);
  if (!count) return null;
  return (
    <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm border border-white/20 text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-full">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
      </span>
      {count} viewing
    </div>
  );
}

interface Props {
  safari: SafariList;
  /** Fill height of parent — use when inside a fixed-height grid cell */
  fill?: boolean;
}

export default function SafariFeaturedCard({ safari, fill = true }: Props) {
  const { currency, rates } = useCurrency();
  const priceUSD = safari.price_usd_2pax;

  return (
    <Link
      href={`/safaris/${safari.slug}`}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 ${
        fill ? "h-full min-h-[320px]" : "h-[420px]"
      }`}
    >
      {/* Background image */}
      {safari.cover_image && (
        <Image
          src={safari.cover_image}
          alt={`${safari.name} — Kenya safari package`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 800px"
          priority
        />
      )}

      {/* Gradient overlays — top for badges, bottom for text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

      {/* Live viewer count */}
      <LiveViewers slug={safari.slug} />

      {/* Top badges */}
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        {safari.category && (
          <span className="bg-teal-DEFAULT text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {safari.category}
          </span>
        )}
        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
          {safari.duration_days} day{safari.duration_days > 1 ? "s" : ""}
        </span>
      </div>

      {/* Content — sits on gradient at bottom */}
      <div className="relative z-10 p-5 md:p-6">
        <h3 className="font-display text-white font-bold text-xl md:text-2xl leading-tight mb-1 group-hover:text-gold-DEFAULT transition-colors">
          {safari.name}
        </h3>

        {safari.tagline && (
          <p className="text-white/70 text-sm mb-4 line-clamp-2">{safari.tagline}</p>
        )}

        <div className="flex items-center justify-between">
          <div>
            {priceUSD ? (
              <>
                <p className="text-white/50 text-xs mb-0.5">From · 2 people</p>
                <p className="text-gold-DEFAULT font-bold text-xl">
                  {formatPrice(priceUSD / 2, currency, rates)}
                  <span className="text-white/60 text-sm font-normal">/pp</span>
                </p>
              </>
            ) : null}
          </div>

          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm hover:bg-teal-DEFAULT text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors group-hover:bg-teal-DEFAULT">
            View Safari
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
