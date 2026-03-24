"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminGalleryPage() {
  const router = useRouter();
  const [safaris, setSafaris] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/safaris`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/safaris`).then((r2) => r2.json()))
      .then(setSafaris)
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router, token]);

  const images = safaris
    .filter((s) => s.cover_image || s.image_url)
    .map((s) => ({ name: s.name, url: s.cover_image ?? s.image_url }));

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">Image Gallery</h1>
        <Link href="/admin/dashboard" className="text-sm text-teal-DEFAULT hover:underline">
          ← Dashboard
        </Link>
      </div>

      {/* Notice banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 flex items-start gap-3">
        <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <p className="text-sm text-amber-800">
          To update safari cover photos, go to{" "}
          <Link href="/admin/safaris" className="font-semibold underline hover:text-amber-900">
            Safaris
          </Link>{" "}
          → select a safari → paste a photo URL into the cover image field.
          Full Cloudinary upload coming soon.
        </p>
      </div>

      {/* Existing cover images */}
      {images.length > 0 ? (
        <>
          <h2 className="font-semibold text-gray-700 mb-4">Current Safari Cover Images ({images.length})</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {images.map((img, i) => (
              <div key={i} className="group relative">
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-20 object-cover rounded-lg border border-gray-200"
                />
                <div className="absolute inset-0 bg-black/70 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-1">
                  <p className="text-white text-[10px] text-center font-medium leading-tight mb-1 line-clamp-2">
                    {img.name}
                  </p>
                  <p className="text-gray-300 text-[9px] text-center break-all line-clamp-2">{img.url}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500">
          No safari cover images found. Add Cloudinary URLs in the{" "}
          <Link href="/admin/safaris" className="text-teal-DEFAULT underline">
            Safaris page
          </Link>.
        </div>
      )}
    </div>
  );
}
