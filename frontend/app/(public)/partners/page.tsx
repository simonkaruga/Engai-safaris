import type { Metadata } from "next";
import PartnersClient from "./PartnersClient";

export const metadata: Metadata = {
  title: "Partner with Engai Safaris | Travel Agent & Referral Program",
  description:
    "Earn 5–12% commission on every Kenya safari you refer. Join the Engai Safaris affiliate program — trusted by travel agents and bloggers across East Africa.",
  alternates: { canonical: "https://www.engaisafaris.com/partners" },
};

export default function PartnersPage() {
  return <PartnersClient />;
}
