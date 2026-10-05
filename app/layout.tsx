import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://powerpole.ae'),
  title: 'Power Pole | Industrial Equipment Supply Abu Dhabi',
  description: 'Electrical, automation, hazardous area and oil and gas equipment supplied from Abu Dhabi, UAE. Request a quote for industrial procurement.',
  openGraph: {
    title: 'Power Pole | Industrial Equipment Supply Abu Dhabi',
    description: 'Industrial equipment supply for demanding applications. Clear quotes from Abu Dhabi.',
    type: 'website',
    images: [{ url: '/industrial-hero.png', width: 1200, height: 630, alt: 'Industrial electrical components' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Power Pole | Industrial Equipment Supply Abu Dhabi',
    description: 'Industrial equipment supply for demanding applications. Clear quotes from Abu Dhabi.',
    images: ['/industrial-hero.png'],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className={`${manrope.className} antialiased`}>
        {children}
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
