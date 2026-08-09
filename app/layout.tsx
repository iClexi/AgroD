import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import { CookieConsent } from '@/components/legal/cookie-consent'
import './globals.css'

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const display = Sora({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://agrod.iclexi.tech'),
  title: { default: 'AgroD | Monitoreo inteligente para cultivos dominicanos', template: '%s | AgroD' },
  description: 'AgroD conecta sensores IoT con una plataforma clara para monitorear cultivos, recibir alertas y organizar el trabajo de la finca.',
  applicationName: 'AgroD',
  keywords: ['AgroD', 'agricultura inteligente', 'IoT agrícola', 'República Dominicana', 'monitoreo de cultivos'],
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    title: 'AgroD | Monitoreo inteligente para cultivos dominicanos',
    description: 'Cuida tus cultivos con datos, no con adivinanzas.',
    images: [{ url: '/images/hero-field.png', width: 1536, height: 1024, alt: 'Cultivos monitoreados con AgroD' }],
  },
  twitter: { card: 'summary_large_image', title: 'AgroD | Monitoreo inteligente para cultivos dominicanos', description: 'Cuida tus cultivos con datos, no con adivinanzas.', images: ['/images/hero-field.png'] },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#071f42', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" data-scroll-behavior="smooth" className={`${body.variable} ${display.variable}`}><body>{children}<CookieConsent /></body></html>
}
