import Link from 'next/link'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AuthShell } from '@/components/auth/auth-shell'
import { LoginForm } from '@/components/auth/login-form'
import { getCurrentUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Iniciar sesión', robots: { index: false, follow: false } }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string }>
}) {
  if (await getCurrentUser()) redirect('/panel')
  const requested = (await searchParams).returnTo
  const returnTo = requested?.startsWith('/') && !requested.startsWith('//') ? requested : '/panel'

  return (
    <AuthShell
      title="Bienvenido a AgroD"
      description="Entra para revisar el estado de tu finca y organizar tu próxima inspección."
      footer={<>¿Todavía no tienes cuenta? <Link className="font-bold text-[#0d5a29] underline-offset-4 hover:underline" href="/registro">Crear cuenta</Link></>}
    >
      <LoginForm returnTo={returnTo} />
    </AuthShell>
  )
}
