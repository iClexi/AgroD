'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'

export function LoginForm({ returnTo = '/panel' }: { returnTo?: string }) {
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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: data.get('email'), password: data.get('password') }),
      })
      const body = (await response.json()) as { error?: string }
      if (!response.ok) throw new Error(body.error || 'No se pudo iniciar sesión.')
      router.push(returnTo)
      router.refresh()
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'No se pudo iniciar sesión.')
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error ? (
        <div role="alert" className="rounded-xl border border-[#d8483e]/25 bg-[#fff3f1] px-4 py-3 text-sm font-semibold text-[#a52f28]">
          {error}
        </div>
      ) : null}
      <label className="block">
        <span className="text-sm font-bold text-[#172033]">Correo electrónico</span>
        <input className="form-input mt-2" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={160} placeholder="nombre@correo.com" />
      </label>
      <label className="block">
        <span className="text-sm font-bold text-[#172033]">Contraseña</span>
        <span className="relative mt-2 block">
          <input className="form-input pr-14" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required maxLength={128} />
          <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-[#596476] hover:text-[#0d5a29] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#167a35]" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
            {showPassword ? <EyeOff aria-hidden="true" className="size-5" /> : <Eye aria-hidden="true" className="size-5" />}
          </button>
        </span>
      </label>
      <button className="primary-button w-full" type="submit" disabled={pending}>
        {pending ? <LoaderCircle aria-hidden="true" className="size-5 animate-spin" /> : null}
        {pending ? 'Entrando…' : 'Iniciar sesión'}
      </button>
    </form>
  )
}
