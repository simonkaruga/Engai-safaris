"use client";

import Link from "next/link";
import Image from "next/image";
import type { SafariList } from "@/types/api";
import { useCurrency } from "@/context/CurrencyContext";
import { formatPrice } from "@/lib/currency";

interface Props {
  safari: SafariList;
}

export default function SafariCard({ safari }: Props) {
  const { currency, rates } = useCurrency();
  const priceUSD = safari.price_usd_2pax;

  return (
    <Link
      href={`/safaris/${safari.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 border border-gray-100/80"
    >
      {/* Image */}
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        {safari.cover_image && (
          <Image
            src={safari.cover_image}
            alt={`${safari.name} — Kenya safari`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {safari.category && (
            <span className="bg-teal-DEFAULT text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {safari.category}
            </span>
          )}
          <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
            {safari.duration_days}d
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-display font-bold text-base text-gray-900 mb-1 group-hover:text-teal-DEFAULT transition-colors line-clamp-2 leading-snug">
          {safari.name}
        </h3>
        {safari.tagline && (
          <p className="text-gray-400 text-xs mb-4 line-clamp-2 leading-relaxed">{safari.tagline}</p>
        )}

        <div className="flex items-end justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-[10px] text-gray-400 mb-0.5 uppercase tracking-wide">From / person</p>
            {priceUSD ? (
              <p className="font-bold text-teal-DEFAULT text-lg leading-none">
                {formatPrice(priceUSD, currency, rates)}
              </p>
            ) : (
              <p className="text-gray-400 text-sm">Contact us</p>
            )}
            {currency !== "USD" && priceUSD ? (
              <p className="text-[10px] text-gray-400 mt-0.5">
                ~${Math.round(priceUSD).toLocaleString()} USD
              </p>
            ) : null}
          </div>
          <span className="inline-flex items-center gap-1 text-teal-DEFAULT text-xs font-semibold group-hover:gap-2 transition-all">
            View
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
