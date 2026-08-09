'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Logo } from '@/components/agro/logo'
import styles from './landing.module.css'

const navigation = [
  { label: 'Qué es AgroD', href: '#que-es' },
  { label: 'Plataforma', href: '#plataforma' },
  { label: 'Planes', href: '#planes' },
  { label: 'Quiénes somos', href: '#nosotros' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const mobileMenuRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const menuButton = menuButtonRef.current
    const menu = mobileMenuRef.current
    const focusable = Array.from(menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
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
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    window.requestAnimationFrame(() => focusable[0]?.focus())
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      menuButton?.focus()
    }
  }, [open])

  const headerClass = styles.header + (scrolled || open ? ' ' + styles.headerSolid : '')

  return (
    <header className={headerClass}>
      <div className={styles.headerInner}>
        <a href="#inicio" aria-label="AgroD, volver al inicio" className={styles.headerLogo}>
          <Logo compact />
        </a>
        <nav className={styles.desktopNav} aria-label="Navegación principal">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className={styles.headerActions}>
          <Link href="/iniciar-sesion" className={styles.headerLogin}>Entrar</Link>
          <Link href="/registro" className={styles.headerSignup}>Crear cuenta</Link>
        </div>
        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="landing-mobile-menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open ? (
        <nav ref={mobileMenuRef} id="landing-mobile-menu" className={styles.mobileMenu} aria-label="Navegación móvil">
          {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
          <div>
            <Link href="/iniciar-sesion" onClick={() => setOpen(false)}>Iniciar sesión</Link>
            <Link href="/registro" onClick={() => setOpen(false)}>Crear cuenta</Link>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
