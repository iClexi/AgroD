import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'AgroD | Monitoreo inteligente para cultivos dominicanos', template: '%s | AgroD' },
  description: 'AgroD conecta sensores IoT con una plataforma clara para monitorear cultivos, recibir alertas y organizar el trabajo de la finca.',
  applicationName: 'AgroD',
  keywords: ['AgroD', 'agricultura inteligente', 'IoT agrícola', 'República Dominicana', 'monitoreo de cultivos'],
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    title: 'AgroD | Monitoreo inteligente para cultivos dominicanos',
    description: 'Cuida tus cultivos con datos, no con adivinanzas.',
  },
  icons: {
    icon: '/images/brand/agrod-logo-original.png',
    apple: '/images/brand/agrod-logo-original.png',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#071f42', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" data-scroll-behavior="smooth" className={`${body.variable} ${display.variable}`}><body>{children}</body></html>
}
