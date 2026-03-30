import { getSafaris } from "@/lib/api";
import SafarisContent from "./SafarisContent";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Kenya Safari Packages",
  description: "Browse all Engai Safaris Kenya packages. Transparent pricing, instant booking. Masai Mara, Amboseli, Naivasha & more.",
  alternates: { canonical: "https://www.engaisafaris.com/safaris" },
};

export default async function SafarisPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const safaris = await getSafaris({});

  return (
    <SafarisContent
      safaris={safaris}
      initialCategory={searchParams.category ?? ""}
    />
  );
}
