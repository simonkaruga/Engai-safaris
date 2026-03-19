import Link from "next/link";

interface Crumb {
  label: string;
  href: string;
}

interface Props {
  items: Crumb[];
}

export default function BreadcrumbNav({ items }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.engaisafaris.com" },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        item: `https://www.engaisafaris.com${item.href}`,
      })),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-teal-DEFAULT transition-colors">Home</Link>
        {items.map((item, i) => (
          <span key={item.href} className="flex items-center gap-2">
            <span>/</span>
            {i === items.length - 1 ? (
              <span className="text-gray-900 font-medium">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-teal-DEFAULT transition-colors">{item.label}</Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
