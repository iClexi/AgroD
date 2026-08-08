import type { Metadata, Viewport } from 'next'
import { Atkinson_Hyperlegible, Manrope } from 'next/font/google'
import './globals.css'

const body = Atkinson_Hyperlegible({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '700'],
})

const display = Manrope({
  subsets: ['latin'],
  variable: '--font-display',
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
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#071f42', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" data-scroll-behavior="smooth" className={`${body.variable} ${display.variable}`}><body>{children}</body></html>
}
