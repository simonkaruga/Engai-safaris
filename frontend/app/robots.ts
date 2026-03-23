import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin/", "/agent/", "/api/", "/booking/confirmation"] },
    ],
    sitemap: "https://www.engaisafaris.com/sitemap.xml",
  };
}
