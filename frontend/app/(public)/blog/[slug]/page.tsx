import { getBlogPost } from "@/lib/api";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/seo/SchemaOrg";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug).catch(() => null) as any;
  if (!post) return {};
  return {
    title: post.meta_title ?? post.title,
    description: post.meta_desc ?? post.excerpt ?? undefined,
    alternates: { canonical: `https://www.engaisafaris.com/blog/${params.slug}` },
    openGraph: { images: post.cover_image ? [post.cover_image] : [] },
  };
}

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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug).catch(() => null) as any;
  if (!post || !post.is_published) notFound();

  return (
    <>
      <SchemaOrg
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.engaisafaris.com" },
                { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.engaisafaris.com/blog" },
                { "@type": "ListItem", position: 3, name: post.title, item: `https://www.engaisafaris.com/blog/${post.slug}` },
              ],
            },
            {
              "@type": "Article",
              headline: post.title,
              description: post.excerpt,
              image: post.cover_image,
              url: `https://www.engaisafaris.com/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: post.author ?? "Engai Safaris",
                url: "https://www.engaisafaris.com/about",
              },
              publisher: {
                "@type": "Organization",
                name: "Engai Safaris",
                url: "https://www.engaisafaris.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.engaisafaris.com/images/logo.png",
                },
              },
              datePublished: post.published_at,
              dateModified: post.updated_at ?? post.published_at,
              mainEntityOfPage: `https://www.engaisafaris.com/blog/${post.slug}`,
            },
          ],
        }}
      />

      {/* Hero cover */}
      {post.cover_image && (
        <div className="relative -mt-0 h-[50vh] min-h-[320px] max-h-[520px] overflow-hidden bg-gray-900">
          <Image src={post.cover_image} alt={post.title} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Category + breadcrumb on image */}
          <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-8 max-w-4xl mx-auto w-full">
            <nav className="flex items-center gap-2 text-xs text-white/60 mb-3">
              <Link href="/" className="hover:text-white/90 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white/90 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-white/80 line-clamp-1">{post.title}</span>
            </nav>
            {post.category && (
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${CATEGORY_COLORS[post.category] ?? "bg-white/20 text-white border-white/30"} backdrop-blur-sm`}>
                {post.category}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Article */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">

        {/* Breadcrumb — if no cover image */}
        {!post.cover_image && (
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
            <Link href="/" className="hover:text-teal-DEFAULT transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-teal-DEFAULT transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-600">{post.title}</span>
          </nav>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-5 mt-8">
          {!post.cover_image && post.category && (
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
              {post.category}
            </span>
          )}
          {post.read_time_min && (
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.read_time_min} min read
            </span>
          )}
          {post.published_at && (
            <span className="text-xs text-gray-400">{formatDate(post.published_at)}</span>
          )}
          {post.author && (
            <span className="flex items-center gap-1.5 text-xs text-gray-500 ml-auto">
              <div className="w-5 h-5 rounded-full bg-teal-DEFAULT flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                {post.author.charAt(0)}
              </div>
              {post.author}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt / lead */}
        {post.excerpt && (
          <p className="text-xl text-gray-500 mb-10 leading-relaxed border-l-4 border-teal-DEFAULT pl-5">
            {post.excerpt}
          </p>
        )}

        {/* Body */}
        {post.content && (
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:text-gray-900
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-a:text-teal-DEFAULT prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-blockquote:border-teal-DEFAULT prose-blockquote:bg-teal-50 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:not-italic
              prose-blockquote:text-gray-700
              prose-ul:text-gray-600 prose-li:marker:text-teal-DEFAULT
              prose-table:text-sm
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}

        {/* Tags */}
        {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
            {(post.tags as string[]).map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-500">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-teal-DEFAULT rounded-2xl p-8 text-white text-center">
          <h3 className="font-display text-2xl font-bold mb-2">Ready to Experience Kenya?</h3>
          <p className="text-teal-100 text-sm mb-6 leading-relaxed max-w-md mx-auto">
            Let our AI planner build your perfect itinerary, or browse our curated safari packages.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/safaris"
              className="inline-flex items-center justify-center bg-white text-teal-DEFAULT hover:bg-teal-50 font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              Browse Safaris
            </Link>
            <Link
              href="/plan-my-safari"
              className="inline-flex items-center justify-center bg-white/10 border border-white/25 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              AI Safari Planner
            </Link>
          </div>
        </div>

        {/* Back */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-teal-DEFAULT transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            All posts
          </Link>
        </div>
      </div>
    </>
  );
}
