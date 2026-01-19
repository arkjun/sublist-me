import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/my/', '/onboarding/', '/api/'],
      },
    ],
    sitemap: 'https://app.sublistme.com/sitemap.xml',
  };
}
