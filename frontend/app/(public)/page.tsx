import { getFeaturedSafaris, getReviews, getGuides } from "@/lib/api";
import SchemaOrg from "@/components/seo/SchemaOrg";
import HeroSection from "@/components/home/HeroSection";
import HomePageSections from "@/components/home/HomePageSections";

export const revalidate = 60;

export default async function HomePage() {
  const [reviews, guides, safaris] = await Promise.all([
    getReviews(true).catch(() => [] as import("@/types/api").Review[]),
    getGuides().catch(() => [] as import("@/types/api").Guide[]),
    getFeaturedSafaris().catch(() => [] as import("@/types/api").SafariList[]),
  ]);
  const featuredGuide = guides.find((g) => g.is_featured) ?? guides[0] ?? null;

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "4.9";
  const reviewCount = reviews.length || 312;

  return (
    <>
      <SchemaOrg
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["TravelAgency", "LocalBusiness"],
              "@id": "https://www.engaisafaris.com/#organization",
              name: "Engai Safaris",
              alternateName: "Engai Safaris Kenya",
              url: "https://www.engaisafaris.com",
              logo: {
                "@type": "ImageObject",
                url: "https://www.engaisafaris.com/images/logo.png",
                width: 200,
                height: 200,
              },
              image: "https://www.engaisafaris.com/images/hero.png",
              description: "Kenya's first technology-native safari company. Transparent pricing, instant booking, real guides. Masai Mara, Amboseli, Naivasha & beyond.",
              telephone: "+254797033513",
              email: "hello@engaisafaris.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressCountry: "KE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -1.286389,
                longitude: 36.817223,
              },
              areaServed: {
                "@type": "Country",
                name: "Kenya",
              },
              priceRange: "$$",
              currenciesAccepted: "KES, USD",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                opens: "06:00",
                closes: "22:00",
              },
              sameAs: [
                "https://instagram.com/engaisafaris",
                "https://tiktok.com/@engaisafaris",
                "https://youtube.com/@engaisafaris",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: avgRating,
                reviewCount,
                bestRating: 5,
                worstRating: 1,
              },
            },
          ],
        }}
      />

      <HeroSection avgRating={avgRating} reviewCount={reviewCount} />

      <HomePageSections
        reviews={reviews}
        safaris={safaris}
        featuredGuide={featuredGuide}
        avgRating={avgRating}
        reviewCount={reviewCount}
      />
    </>
  );
}
