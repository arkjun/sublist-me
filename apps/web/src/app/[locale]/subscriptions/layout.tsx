import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SubscriptionsMeta' });

  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    alternates: {
      canonical: `https://app.sublistme.com/${locale}/subscriptions`,
      languages: {
        ko: 'https://app.sublistme.com/ko/subscriptions',
        en: 'https://app.sublistme.com/en/subscriptions',
        ja: 'https://app.sublistme.com/ja/subscriptions',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://app.sublistme.com/${locale}/subscriptions`,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function SubscriptionsLayout({ children }: Props) {
  return <>{children}</>;
}
