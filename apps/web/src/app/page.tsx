'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { routing } from '@/i18n/routing';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const browserLocale = navigator.language.split('-')[0];
    const targetLocale = routing.locales.includes(
      browserLocale as (typeof routing.locales)[number],
    )
      ? browserLocale
      : routing.defaultLocale;

    router.replace(`/${targetLocale}`);
  }, [router]);

  return (
    <html lang="ko">
      <body>
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-transparent" />
        </div>
      </body>
    </html>
  );
}
