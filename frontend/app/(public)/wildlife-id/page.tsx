"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

type WildlifeResult = {
  found: true;
  common_name: string;
  scientific_name: string;
  swahili_name: string;
  tagline: string;
  description: string;
  habitat: string;
  diet: string;
  social: string;
  conservation_status: string;
  conservation_code: string;
  lifespan: string;
  fun_facts: string[];
  kenya_parks: string[];
  best_time_to_see: string;
  danger_level: string;
  interesting_behaviour: string;
} | {
  found: false;
  message: string;
};

const CONSERVATION_COLORS: Record<string, string> = {
  "LC": "bg-green-100 text-green-800",
  "NT": "bg-lime-100 text-lime-800",
  "VU": "bg-yellow-100 text-yellow-800",
  "EN": "bg-orange-100 text-orange-800",
  "CR": "bg-red-100 text-red-800",
  "EW": "bg-purple-100 text-purple-800",
  "EX": "bg-gray-800 text-white",
};

const DANGER_COLORS: Record<string, string> = {
  "Low": "text-green-700",
  "Medium": "text-amber-700",
  "High": "text-red-700",
};

export default function WildlifeIDPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState("image/jpeg");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WildlifeResult | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    setMediaType(file.type || "image/jpeg");
    setResult(null);
    setError("");
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const identify = async () => {
    if (!preview) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wildlife-id`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_base64: preview, media_type: mediaType }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Identification failed");
      }
      const data: WildlifeResult = await res.json();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPreview(null);
    setResult(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const conservationColor = result?.found
    ? CONSERVATION_COLORS[result.conservation_code] ?? "bg-gray-100 text-gray-700"
    : "";

  const dangerLevel = result?.found
    ? result.danger_level.split("—")[0].trim()
    : "";
  const dangerColor = DANGER_COLORS[dangerLevel] ?? "text-gray-600";

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-950 via-teal-900 to-gray-950">
      {/* Header */}
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-gold-DEFAULT/20 border border-gold-DEFAULT/30 text-gold-DEFAULT px-4 py-1.5 rounded-full text-xs font-semibold mb-5 uppercase tracking-widest">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          AI Wildlife Identifier
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-3 leading-tight">
          What animal is that?
        </h1>
        <p className="text-teal-200 text-lg leading-relaxed">
          Take a photo on safari and our AI identifies the animal instantly — species, Swahili name, fun facts, and where to find it in Kenya.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-20">

        {/* Upload zone */}
        {!preview && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            className="relative border-2 border-dashed border-teal-600 hover:border-gold-DEFAULT rounded-2xl p-10 text-center cursor-pointer transition-colors group bg-teal-900/30"
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleInput}
              className="hidden"
            />
            <div className="w-16 h-16 rounded-full bg-teal-800 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-DEFAULT/20 transition-colors">
              <svg className="w-8 h-8 text-teal-300 group-hover:text-gold-DEFAULT transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>
            </div>
            <p className="text-white font-semibold text-lg mb-1">Take a photo or upload one</p>
            <p className="text-teal-400 text-sm">On mobile, this opens your camera directly</p>
            <p className="text-teal-600 text-xs mt-3">Supports JPG, PNG, WebP · Max 10MB</p>
          </div>
        )}

        {/* Image preview + identify */}
        {preview && !result && (
          <div className="bg-teal-900/40 border border-teal-700 rounded-2xl overflow-hidden">
            <div className="relative h-64 sm:h-80 bg-gray-900">
              <Image src={preview} alt="Selected animal photo" fill className="object-contain" unoptimized />
            </div>
            <div className="p-5 flex gap-3">
              <button
                onClick={reset}
                className="flex-1 border border-teal-600 text-teal-300 py-3 rounded-xl font-semibold text-sm hover:bg-teal-800/50 transition-colors"
              >
                Try different photo
              </button>
              <button
                onClick={identify}
                disabled={loading}
                className="flex-1 bg-gold-DEFAULT hover:bg-gold-600 text-white py-3 rounded-xl font-bold text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Identifying…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                    Identify Animal
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="mt-4 bg-teal-900/40 border border-teal-700 rounded-2xl p-8 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[0,1,2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-gold-DEFAULT animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
            <p className="text-teal-200 font-semibold">Analysing your photo…</p>
            <p className="text-teal-500 text-sm mt-1">Claude is identifying the species</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 bg-red-900/30 border border-red-700 rounded-2xl p-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Not found */}
        {result && !result.found && (
          <div className="mt-4 bg-teal-900/40 border border-teal-700 rounded-2xl p-6 text-center">
            <p className="text-3xl mb-3">🔍</p>
            <p className="text-white font-semibold mb-1">No animal detected</p>
            <p className="text-teal-400 text-sm mb-4">{result.message}</p>
            <button onClick={reset} className="text-gold-DEFAULT text-sm font-semibold underline">
              Try another photo
            </button>
          </div>
        )}

        {/* Results */}
        {result?.found && (
          <div className="mt-4 space-y-4">

            {/* Photo + identity header */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              {preview && (
                <div className="relative h-56 sm:h-72 bg-gray-100">
                  <Image src={preview} alt={result.common_name} fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-white font-display font-bold text-2xl sm:text-3xl leading-tight">
                          {result.common_name}
                        </p>
                        <p className="text-white/70 text-sm italic">{result.scientific_name}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-3">
                        <div className="bg-teal-DEFAULT text-white text-sm font-bold px-3 py-1 rounded-lg mb-1">
                          {result.swahili_name}
                        </div>
                        <p className="text-white/50 text-[10px]">Swahili</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-5">
                <p className="text-gold-DEFAULT font-semibold italic text-sm mb-3">&ldquo;{result.tagline}&rdquo;</p>
                <p className="text-gray-700 text-sm leading-relaxed">{result.description}</p>

                {/* Observation note */}
                {result.interesting_behaviour && (
                  <div className="mt-3 bg-teal-50 border border-teal-100 rounded-xl px-4 py-3">
                    <p className="text-teal-800 text-xs font-semibold mb-0.5">In your photo</p>
                    <p className="text-teal-700 text-sm">{result.interesting_behaviour}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Conservation</p>
                <span className={`inline-block text-sm font-bold px-2.5 py-1 rounded-lg ${conservationColor}`}>
                  {result.conservation_code} · {result.conservation_status}
                </span>
              </div>
              <div className="bg-white rounded-2xl p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Lifespan</p>
                <p className="text-gray-800 font-semibold text-sm">{result.lifespan}</p>
              </div>
              <div className="bg-white rounded-2xl p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Diet</p>
                <p className="text-gray-800 text-sm">{result.diet}</p>
              </div>
              <div className="bg-white rounded-2xl p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Danger level</p>
                <p className={`font-bold text-sm ${dangerColor}`}>{dangerLevel}</p>
                <p className="text-gray-400 text-xs mt-0.5 leading-snug">{result.danger_level.split("—")[1]?.trim()}</p>
              </div>
            </div>

            {/* Habitat & Social */}
            <div className="bg-white rounded-2xl p-5 space-y-3">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Habitat</p>
                <p className="text-gray-700 text-sm">{result.habitat}</p>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Social behaviour</p>
                <p className="text-gray-700 text-sm">{result.social}</p>
              </div>
            </div>

            {/* Fun facts */}
            {result.fun_facts?.length > 0 && (
              <div className="bg-white rounded-2xl p-5">
                <p className="text-gray-800 font-bold mb-3">Did you know?</p>
                <ul className="space-y-2.5">
                  {result.fun_facts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-gold-DEFAULT/15 text-gold-DEFAULT text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-gray-600 text-sm leading-relaxed">{fact}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Where to see in Kenya */}
            {result.kenya_parks?.length > 0 && (
              <div className="bg-white rounded-2xl p-5">
                <p className="text-gray-800 font-bold mb-1">See this animal in Kenya</p>
                <p className="text-gray-500 text-xs mb-3">{result.best_time_to_see}</p>
                <div className="flex flex-wrap gap-2">
                  {result.kenya_parks.map((park) => (
                    <span key={park} className="bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                      {park}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-br from-teal-DEFAULT to-teal-700 rounded-2xl p-6 text-center">
              <p className="text-white font-display font-bold text-xl mb-1">
                Want to see {result.common_name.split(" ").pop()} in the wild?
              </p>
              <p className="text-teal-200 text-sm mb-4">
                Our guides know exactly where and when to find them.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/safaris"
                  className="bg-white text-teal-DEFAULT font-bold px-6 py-3 rounded-xl text-sm hover:bg-teal-50 transition-colors"
                >
                  Browse Safari Packages
                </Link>
                <Link
                  href="/plan-my-safari"
                  className="bg-gold-DEFAULT text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-gold-600 transition-colors"
                >
                  Plan with AI
                </Link>
              </div>
            </div>

            {/* Try another */}
            <button
              onClick={reset}
              className="w-full border-2 border-teal-700 text-teal-300 py-3 rounded-xl font-semibold text-sm hover:bg-teal-900/30 transition-colors"
            >
              Identify another animal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
