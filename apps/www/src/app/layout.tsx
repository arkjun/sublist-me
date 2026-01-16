import type { Metadata } from 'next';
import './globals.css';

const title = 'SubList Me - Subscription Manager';
const description = 'Manage all your subscriptions in one place';

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://www.sublistme.com'),
  alternates: {
    canonical: 'https://www.sublistme.com',
  },
  openGraph: {
    title,
    description,
    url: 'https://www.sublistme.com',
    siteName: 'SubList Me',
    locale: 'en',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'SubList Me',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.svg'],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SubList Me',
  url: 'https://www.sublistme.com',
  logo: 'https://www.sublistme.com/logo.png',
};

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SubList Me',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description,
  url: 'https://www.sublistme.com',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareJsonLd),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
