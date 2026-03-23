import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Engai Safaris Kenya",
    short_name: "Engai Safaris",
    description: "Kenya's first technology-native safari company. Transparent pricing, instant booking, real guides.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F1C17",
    theme_color: "#1B7A60",
    orientation: "portrait-primary",
    categories: ["travel", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/images/hero.png",
        sizes: "1920x1280",
        type: "image/png",
        // @ts-ignore — form_factor is valid in the Web App Manifest spec
        form_factor: "wide",
        label: "Engai Safaris — Where the Sky Meets the Wild",
      },
    ],
    shortcuts: [
      {
        name: "Browse Safaris",
        url: "/safaris",
        description: "View all Kenya safari packages",
      },
      {
        name: "AI Safari Planner",
        url: "/plan-my-safari",
        description: "Get a personalised safari itinerary",
      },
      {
        name: "Book a Safari",
        url: "/book",
        description: "Book your safari online",
      },
    ],
  };
}
