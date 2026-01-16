import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://app.sublistme.com";
  const locales = ["ko", "en", "ja"];

  // 공개 페이지 (my, onboarding, api 제외)
  const publicRoutes = ["", "/login", "/subscriptions"];

  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of publicRoutes) {
      urls.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
      });
    }
  }

  return urls;
}
