import type { Metadata, Viewport } from 'next'
import ErrorBoundary from '@/components/ErrorBoundary'
import GlobalErrorFallback from '@/components/GlobalErrorFallback'
import Template from './template'
import './globals.scss'

export const metadata: Metadata = {
  title: 'H5 SSR Template',
  description: '一个基于 Next.js 15 的移动端应用',
  generator: 'Next.js',
}

// 移动端视口设置至关重要
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // 也可设置 theme-color 等
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
          <Template>{children}</Template>
        </ErrorBoundary>
      </body>
    </html>
  )
}
