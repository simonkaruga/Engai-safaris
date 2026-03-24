import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Engai Safaris. WhatsApp, email, or enquiry form.",
  alternates: { canonical: "https://www.engaisafaris.com/contact" },
};

export default function ContactPage() {
  return <ContactContent />;
}
