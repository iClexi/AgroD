'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from './logo'

const links = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Plataforma', href: '#plataforma' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Equipo', href: '#equipo' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'border-b border-border/70 bg-background/92 shadow-sm backdrop-blur-md' : 'border-b border-transparent'}`}>
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <a href="#inicio" aria-label="AgroD, volver al inicio"><Logo compact /></a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {links.map((link) => <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{link.label}</a>)}
        </nav>
        <div className="ml-auto hidden items-center gap-2 sm:flex lg:ml-0">
          <Link href="/iniciar-sesion" className="inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold text-navy transition-colors hover:bg-secondary">Iniciar sesión</Link>
          <a href="#demo" className="inline-flex h-10 items-center justify-center rounded-full bg-navy px-5 text-sm font-semibold text-navy-foreground shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-navy/90">Probar AgroD</a>
        </div>
        <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-navy sm:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
          {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>
      </div>
      {open ? (
        <nav id="mobile-menu" className="border-t border-border/70 bg-background px-5 pb-6 pt-3 sm:hidden" aria-label="Navegación móvil">
          <div className="mx-auto grid max-w-6xl gap-1">
            {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center rounded-xl px-3 font-semibold text-foreground hover:bg-secondary">{link.label}</a>)}
            <Link href="/iniciar-sesion" className="mt-2 inline-flex h-12 items-center justify-center rounded-full border border-border bg-card font-semibold text-navy">Iniciar sesión</Link>
            <Link href="/registro" className="inline-flex h-12 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">Crear cuenta</Link>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
