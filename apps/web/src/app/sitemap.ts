import type { MetadataRoute } from "next";

export const dynamic = "force-static";

type RouteConfig = {
  path: string;
  changeFrequency: "weekly" | "monthly" | "daily";
  priority: number;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://app.sublistme.com";
  const locales = ["ko", "en", "ja"] as const;

  const publicRoutes: RouteConfig[] = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/login", changeFrequency: "monthly", priority: 0.7 },
    { path: "/subscriptions", changeFrequency: "weekly", priority: 0.9 },
  ];

  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of publicRoutes) {
      const alternateLanguages: Record<string, string> = {};
      for (const altLocale of locales) {
        alternateLanguages[altLocale] = `${baseUrl}/${altLocale}${route.path}`;
      }

      urls.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: alternateLanguages,
        },
      });
    }
  }

  return urls;
}
