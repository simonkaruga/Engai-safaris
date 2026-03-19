import { getBlogPost } from "@/lib/api";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/seo/SchemaOrg";
import BreadcrumbNav from "@/components/seo/BreadcrumbNav";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug).catch(() => null);
  if (!post) return {};
  return {
    title: (post as any).meta_title ?? post.title,
    description: (post as any).meta_desc ?? post.excerpt ?? undefined,
    openGraph: { images: post.cover_image ? [post.cover_image] : [] },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug).catch(() => null) as any;
  if (!post || !post.is_published) notFound();

  return (
    <>
      <SchemaOrg
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: post.cover_image,
          author: { "@type": "Person", name: post.author ?? "Engai Safaris" },
          datePublished: post.published_at,
        }}
      />

      <BreadcrumbNav
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 py-12">
        {post.cover_image && (
          <div className="h-[400px] bg-cover bg-center rounded-2xl mb-8" style={{ backgroundImage: `url(${post.cover_image})` }} />
        )}

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          {post.category && <span className="text-teal-DEFAULT font-semibold uppercase tracking-wide text-xs">{post.category}</span>}
          {post.read_time_min && <span>⏱ {post.read_time_min} min read</span>}
          {post.published_at && <span>{new Date(post.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>}
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>

        {post.excerpt && <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>}

        {post.content && (
          <div
            className="prose prose-lg max-w-none prose-headings:font-display prose-a:text-teal-DEFAULT"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
      </article>
    </>
  );
}
