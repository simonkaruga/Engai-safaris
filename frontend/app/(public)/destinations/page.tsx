import { getDestinations } from "@/lib/api";
import DestinationsContent from "./DestinationsContent";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Kenya Safari Destinations",
  description: "Explore Kenya's greatest safari destinations — Masai Mara, Amboseli, Naivasha, Samburu and more. Expert guides, transparent pricing.",
  alternates: { canonical: "https://www.engaisafaris.com/destinations" },
};

export default async function DestinationsPage() {
  const destinations = await getDestinations();
  return <DestinationsContent destinations={destinations} />;
}
