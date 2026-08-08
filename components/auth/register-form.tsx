'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'

export function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError('')
    const data = new FormData(event.currentTarget)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          fullName: data.get('fullName'),
          email: data.get('email'),
          password: data.get('password'),
          includeDemo: data.get('includeDemo') === 'on',
        }),
      })
      const body = (await response.json()) as { error?: string }
      if (!response.ok) throw new Error(body.error || 'No se pudo crear la cuenta.')
      router.push('/panel')
      router.refresh()
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'No se pudo crear la cuenta.')
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error ? (
        <div role="alert" className="rounded-xl border border-[#d8483e]/25 bg-[#fff3f1] px-4 py-3 text-sm font-semibold text-[#a52f28]">{error}</div>
      ) : null}
      <label className="block">
        <span className="text-sm font-bold text-[#172033]">Nombre completo</span>
        <input className="form-input mt-2" name="fullName" autoComplete="name" required minLength={2} maxLength={100} placeholder="Tu nombre y apellido" />
      </label>
      <label className="block">
        <span className="text-sm font-bold text-[#172033]">Correo electrónico</span>
        <input className="form-input mt-2" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={160} placeholder="nombre@correo.com" />
      </label>
      <label className="block">
        <span className="text-sm font-bold text-[#172033]">Contraseña</span>
        <span className="relative mt-2 block">
          <input className="form-input pr-14" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required minLength={10} maxLength={128} aria-describedby="password-help" />
          <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-[#596476] hover:text-[#0d5a29] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#167a35]" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
            {showPassword ? <EyeOff aria-hidden="true" className="size-5" /> : <Eye aria-hidden="true" className="size-5" />}
          </button>
        </span>
        <span id="password-help" className="mt-2 block text-sm text-[#6b7483]">Mínimo 10 caracteres, una letra y un número.</span>
      </label>
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#dce8de] bg-[#f6f8fa] p-4">
        <input className="mt-1 size-5 accent-[#167a35]" name="includeDemo" type="checkbox" defaultChecked />
        <span>
          <span className="block text-sm font-bold text-[#172033]">Incluir finca de demostración</span>
          <span className="mt-1 block text-sm leading-6 text-[#596476]">Agrega cultivos y dispositivos de muestra para aprender el panel. Podrás eliminarlos.</span>
        </span>
      </label>
      <button className="primary-button w-full" type="submit" disabled={pending}>
        {pending ? <LoaderCircle aria-hidden="true" className="size-5 animate-spin" /> : null}
        {pending ? 'Creando cuenta…' : 'Crear cuenta'}
      </button>
      <p className="text-sm leading-6 text-[#6b7483]">Al crear tu cuenta aceptas usar AgroD como prototipo demostrativo. Las lecturas incluidas no provienen de sensores físicos.</p>
    </form>
  )
}
