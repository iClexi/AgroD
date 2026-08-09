'use client'

import Link from 'next/link'
import { Cookie, ShieldCheck, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'agrod-cookie-consent-v1'
const OPEN_EVENT = 'agrod:open-cookie-settings'

export function CookieConsent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(window.localStorage.getItem(STORAGE_KEY) === null), 0)
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, reopen)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener(OPEN_EVENT, reopen)
    }
  }, [])

  function save(value: 'all' | 'necessary') {
    window.localStorage.setItem(STORAGE_KEY, value)
    if (value === 'necessary') window.localStorage.removeItem('agrod-demo-view')
    setOpen(false)
  }

  if (!open) return null

  return (
    <aside role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-description" className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-2xl border border-border bg-card p-5 shadow-[0_24px_80px_-24px_rgba(7,31,66,.55)] sm:inset-x-5 sm:p-6">
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary"><Cookie aria-hidden="true" className="size-5" /></span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div><p className="text-xs font-bold uppercase tracking-wider text-primary">Tu privacidad primero</p><h2 id="cookie-title" className="mt-1 font-display text-xl font-bold text-foreground">Tú decides qué guardamos</h2></div>
            <button type="button" onClick={() => save('necessary')} className="flex size-11 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Continuar solo con cookies necesarias"><X aria-hidden="true" className="size-5" /></button>
          </div>
          <p id="cookie-description" className="mt-3 text-sm leading-6 text-muted-foreground">Usamos cookies necesarias para iniciar sesión y proteger tu cuenta. Con tu permiso, también podemos recordar preferencias de uso, como la vista de demostración. No usamos publicidad ni vendemos tus datos.</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="button" onClick={() => save('all')} className="primary-button sm:min-w-48">Permitir preferencias</button>
            <button type="button" onClick={() => save('necessary')} className="secondary-button sm:min-w-44"><ShieldCheck aria-hidden="true" className="size-4" />Solo necesarias</button>
            <Link href="/privacidad#cookies" className="inline-flex min-h-11 items-center justify-center px-2 text-sm font-bold text-primary underline underline-offset-4">Ver detalles</Link>
          </div>
        </div>
      </div>
    </aside>
  )
}

export function CookieSettingsButton() {
  return <button type="button" className="min-h-11 text-left text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>Configurar cookies</button>
}
