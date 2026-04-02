import { getBlogPosts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kenya Safari Blog",
  description: "Expert Kenya safari guides, wildlife tips, packing lists, and destination guides from the Engai Safaris team.",
  alternates: { canonical: "https://www.engaisafaris.com/blog" },
};

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "destinations", label: "Destinations" },
  { value: "wildlife", label: "Wildlife" },
  { value: "tips", label: "Tips & Planning" },
  { value: "cultural", label: "Cultural" },
];

const CATEGORY_COLORS: Record<string, string> = {
  destinations: "bg-teal-DEFAULT/10 text-teal-DEFAULT border-teal-DEFAULT/20",
  wildlife:     "bg-gold-DEFAULT/10 text-gold-DEFAULT border-gold-DEFAULT/20",
  tips:         "bg-maasai-DEFAULT/10 text-maasai-DEFAULT border-maasai-DEFAULT/20",
  cultural:     "bg-purple-100 text-purple-700 border-purple-200",
};

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string; page?: string };
}) {
  const posts = await getBlogPosts(
    searchParams.category,
    Number(searchParams.page ?? 1)
  ).catch(() => []);

  const activeCategory = searchParams.category ?? "";
  const featuredPost   = posts[0];
  const restPosts      = posts.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-stone-100 pt-20 pb-16 px-4 md:px-6 border-b border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="eyebrow text-teal-DEFAULT mb-4">Straight from the bush</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-5">
              Safari Blog
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Expert wildlife guides, honest destination advice, packing lists and planning tips, written by guides who live and work in Kenya's national parks.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.value}
              href={cat.value ? `/blog?category=${cat.value}` : "/blog"}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === cat.value
                  ? "bg-teal-DEFAULT text-white border-teal-DEFAULT"
                  : "border-gray-200 text-gray-600 hover:border-teal-DEFAULT hover:text-teal-DEFAULT bg-white"
              }`}
            >
              {cat.label}
            </a>
          ))}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg">No posts in this category yet.</p>
            <Link href="/blog" className="mt-4 inline-block text-teal-DEFAULT text-sm hover:underline">← View all posts</Link>
          </div>
        ) : (
          <>
            {/* Featured / hero post */}
            {featuredPost && (
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block mb-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
                  {/* Image */}
                  <div className="relative h-64 lg:h-auto min-h-[280px] bg-gray-900 overflow-hidden">
                    {featuredPost.cover_image ? (
                      <Image src={featuredPost.cover_image} alt={featuredPost.title} fill priority className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-gray-950" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 lg:bg-none" />
                  </div>

                  {/* Text */}
                  <div className="bg-white p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      {featuredPost.category && (
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${CATEGORY_COLORS[featuredPost.category] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                          {featuredPost.category}
                        </span>
                      )}
                      <span className="text-xs text-gray-400 font-medium">Featured</span>
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-teal-DEFAULT transition-colors">
                      {featuredPost.title}
                    </h2>
                    {featuredPost.excerpt && (
                      <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        {featuredPost.read_time_min && (
                          <span>{featuredPost.read_time_min} min read</span>
                        )}
                        {featuredPost.published_at && (
                          <span>{formatDate(featuredPost.published_at)}</span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-teal-DEFAULT text-sm font-semibold group-hover:gap-2.5 transition-all">
                        Read
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Post grid */}
            {restPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 border border-gray-100/60"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gray-900 overflow-hidden">
                      {post.cover_image ? (
                        <Image src={post.cover_image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-gray-950" />
                      )}
                      {/* Category badge on image */}
                      {post.category && (
                        <div className="absolute top-3 left-3">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${CATEGORY_COLORS[post.category] ?? "bg-white/90 text-gray-700 border-white/50"} backdrop-blur-sm`}>
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h2 className="font-display font-bold text-base text-gray-900 mb-2 leading-snug group-hover:text-teal-DEFAULT transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-[11px] text-gray-400">
                          {post.read_time_min && (
                            <span>{post.read_time_min} min</span>
                          )}
                          {post.published_at && post.read_time_min && (
                            <span className="text-gray-200">·</span>
                          )}
                          {post.published_at && (
                            <span>{formatDate(post.published_at)}</span>
                          )}
                        </div>
                        <svg className="w-3.5 h-3.5 text-teal-DEFAULT group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
