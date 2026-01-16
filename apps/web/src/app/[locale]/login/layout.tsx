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
  const t = await getTranslations({ locale, namespace: 'LoginMeta' });

  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    alternates: {
      canonical: `https://app.sublistme.com/${locale}/login`,
      languages: {
        ko: 'https://app.sublistme.com/ko/login',
        en: 'https://app.sublistme.com/en/login',
        ja: 'https://app.sublistme.com/ja/login',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://app.sublistme.com/${locale}/login`,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function LoginLayout({ children }: Props) {
  return <>{children}</>;
}
