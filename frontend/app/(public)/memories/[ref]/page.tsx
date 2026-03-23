import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

interface MemoriesData {
  reference: string;
  customer_name: string;
  safari_name: string;
  travel_date: string;
  memories_url: string;
}

async function getMemories(ref: string): Promise<MemoriesData | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
    const res = await fetch(`${apiUrl}/api/memories/${ref.toUpperCase()}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { ref: string } }): Promise<Metadata> {
  return {
    title: "Your Safari Memories | Engai Safaris",
    description: "Your curated safari photo album from Engai Safaris Kenya.",
    robots: { index: false },
  };
}

export default async function MemoriesPage({ params }: { params: { ref: string } }) {
  const data = await getMemories(params.ref);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-stone-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-3">Album Coming Soon</h1>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Your photo album is being curated by our team. You'll receive an email with the link within 7 days of returning home.
          </p>
          <p className="text-xs text-gray-400 mb-6">Reference: {params.ref.toUpperCase()}</p>
          <Link href="/" className="text-teal-DEFAULT hover:underline text-sm font-medium">← Back to Engai Safaris</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-stone-50">
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="eyebrow text-teal-DEFAULT mb-4">Your Memories</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome back, {data.customer_name}
        </h1>
        <p className="text-gray-500 mb-2">{data.safari_name}</p>
        <p className="text-sm text-gray-400 mb-10">
          {new Date(data.travel_date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm mb-8">
          <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Your safari photo album is ready. Every photo is yours to keep, share, and relive whenever you need a reminder that it was real.
          </p>
          <a
            href={data.memories_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-teal-DEFAULT hover:bg-teal-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-sm"
          >
            View Your Photo Album →
          </a>
        </div>

        <p className="text-xs text-gray-400 mb-6">
          Share your adventure and tag us <strong>@engaisafaris</strong>
        </p>
        <Link href="/safaris" className="text-teal-DEFAULT hover:underline text-sm font-medium">
          Plan your next safari →
        </Link>
      </div>
    </div>
  );
}
