import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Magami - 구독 관리',
  description: '내 구독 서비스를 한눈에 관리하세요',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
