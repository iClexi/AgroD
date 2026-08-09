'use client'

import Link from 'next/link'
import { Cookie, ShieldCheck, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import styles from './cookie-consent.module.css'

const STORAGE_KEY = 'agrod-cookie-consent-v1'
const OPEN_EVENT = 'agrod:open-cookie-settings'

export function CookieConsent() {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(window.localStorage.getItem(STORAGE_KEY) === null), 0)
    const reopen = () => {
      restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      setOpen(true)
    }
    window.addEventListener(OPEN_EVENT, reopen)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener(OPEN_EVENT, reopen)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    const focusable = Array.from(dialog?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        save('necessary')
        return
      }
      if (event.key !== 'Tab' || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.requestAnimationFrame(() => focusable[0]?.focus())
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  function save(value: 'all' | 'necessary') {
    window.localStorage.setItem(STORAGE_KEY, value)
    if (value === 'necessary') window.localStorage.removeItem('agrod-demo-view')
    setOpen(false)
    window.requestAnimationFrame(() => restoreFocusRef.current?.focus())
  }

  if (!open) return null

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="cookie-title" aria-describedby="cookie-description" className={styles.banner}>
      <span className={styles.icon}><Cookie aria-hidden="true" /></span>
      <div className={styles.copy}>
        <p>Tu privacidad primero</p>
        <h2 id="cookie-title">Tú decides qué guardamos</h2>
        <p id="cookie-description">Usamos datos necesarios para iniciar sesión y proteger tu cuenta. Con permiso, recordamos preferencias. No usamos publicidad ni vendemos tus datos. <Link href="/privacidad#cookies">Ver detalles</Link></p>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={() => save('all')}>Permitir preferencias</button>
        <button type="button" onClick={() => save('necessary')}><ShieldCheck aria-hidden="true" /> Solo necesarias</button>
      </div>
      <button type="button" onClick={() => save('necessary')} className={styles.close} aria-label="Continuar solo con cookies necesarias"><X aria-hidden="true" /></button>
    </div>
  )
}

export function CookieSettingsButton() {
  return <button type="button" className="min-h-11 text-left text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>Configurar cookies</button>
}
