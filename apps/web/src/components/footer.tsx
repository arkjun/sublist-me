'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="mt-auto border-t py-6 text-center text-sm text-muted-foreground">
      {t('copyright')}
    </footer>
  );
}
