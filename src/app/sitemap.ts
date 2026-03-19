import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://anujajay.com");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = new URL(siteUrl);
  const now = new Date();

  return [
    {
      url: new URL("/", baseUrl).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/dir/Anuja_CV.pdf", baseUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
