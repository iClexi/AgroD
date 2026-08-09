import Link from 'next/link'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AuthShell } from '@/components/auth/auth-shell'
import { RegisterForm } from '@/components/auth/register-form'
import { getCurrentUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Crear cuenta', robots: { index: false, follow: false } }

export default async function RegisterPage() {
  if (await getCurrentUser()) redirect('/panel')
  return (
    <AuthShell
      title="Crea tu cuenta"
      description="Empieza con una finca de demostración o agrega tus propios cultivos y dispositivos."
      footer={<>¿Ya tienes cuenta? <Link className="font-bold text-[#0d5a29] underline-offset-4 hover:underline" href="/iniciar-sesion">Iniciar sesión</Link></>}
    >
      <RegisterForm />
    </AuthShell>
  )
}
