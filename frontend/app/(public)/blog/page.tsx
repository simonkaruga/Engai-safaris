import { getBlogPosts } from "@/lib/api";

export const dynamic = "force-dynamic";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kenya Safari Blog",
  description: "Expert Kenya safari guides, wildlife tips, packing lists, and destination guides from the Engai Safaris team.",
};

export default async function BlogPage({ searchParams }: { searchParams: { category?: string; page?: string } }) {
  const posts = await getBlogPosts(searchParams.category, Number(searchParams.page ?? 1));

  const CATEGORIES = [
    { value: "", label: "All" },
    { value: "destinations", label: "Destinations" },
    { value: "wildlife", label: "Wildlife" },
    { value: "tips", label: "Tips & Planning" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl font-bold mb-4">Safari Blog</h1>
        <p className="text-gray-600 text-lg">Expert guides, wildlife insights, and honest travel advice.</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.value}
            href={cat.value ? `/blog?category=${cat.value}` : "/blog"}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              (searchParams.category ?? "") === cat.value
                ? "bg-teal-DEFAULT text-white border-teal-DEFAULT"
                : "border-gray-300 text-gray-600 hover:border-teal-DEFAULT"
            }`}
          >
            {cat.label}
          </a>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No posts yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              {post.cover_image && (
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${post.cover_image})` }} />
              )}
              <div className="p-5">
                {post.category && (
                  <span className="text-xs font-semibold text-teal-DEFAULT uppercase tracking-wide">{post.category}</span>
                )}
                <h2 className="font-display font-bold text-lg mt-1 mb-2 group-hover:text-teal-DEFAULT transition-colors line-clamp-2">
                  {post.title}
                </h2>
                {post.excerpt && <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>}
                <div className="flex items-center gap-3 mt-4 text-xs text-gray-400">
                  {post.read_time_min && <span>⏱ {post.read_time_min} min read</span>}
                  {post.published_at && <span>{new Date(post.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
