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
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="text-3xl">🖼️</div>
          <div>
            <h2 className="font-semibold text-blue-800 text-lg mb-1">Cloudinary Integration Coming Soon</h2>
            <p className="text-blue-700 text-sm mb-3">
              Full image management via Cloudinary is being set up. Once live, you will be able to upload,
              organize and tag photos directly from this page.
            </p>
            <p className="text-blue-600 text-sm font-medium">
              To update safari images now, go to the{" "}
              <Link href="/admin/safaris" className="underline hover:text-blue-800">
                Safaris admin page
              </Link>{" "}
              and paste a Cloudinary URL into the cover image field.
            </p>
          </div>
        </div>
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
