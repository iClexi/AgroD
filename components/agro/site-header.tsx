'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/agro/logo'

const links = [
  ['Cómo funciona', '#como-funciona'],
  ['Producto', '#producto'],
  ['Beneficios', '#beneficios'],
  ['Equipo', '#equipo'],
  ['Contacto', '#contacto'],
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-[#dce8de] bg-white/95 backdrop-blur-lg">
    <div className="mx-auto flex h-[76px] w-full max-w-[1480px] items-center gap-6 px-4 sm:px-6 lg:px-8 xl:px-10">
      <Link href="#inicio" aria-label="Ir al inicio de AgroD" className="shrink-0 rounded-lg focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#167a35]"><Logo /></Link>
      <nav className="ml-auto hidden items-center gap-6 xl:flex" aria-label="Navegación principal">{links.map(([label, href]) => <a key={href} href={href} className="min-h-11 content-center rounded-lg px-1 text-sm font-bold text-[#536071] hover:text-[#0d5a29] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#167a35]">{label}</a>)}</nav>
      <div className="ml-auto hidden items-center gap-3 sm:flex xl:ml-3"><Link href="/iniciar-sesion" className="secondary-button">Iniciar sesión</Link><a href="#contacto" className="primary-button">Solicitar demostración</a></div>
      <button type="button" className="icon-button ml-auto sm:ml-0 xl:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>{open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}</button>
    </div>
    {open ? <nav id="mobile-nav" className="border-t border-[#dce8de] bg-white px-4 py-4 xl:hidden" aria-label="Navegación móvil"><div className="mx-auto grid max-w-[1480px] gap-1">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="flex min-h-12 items-center rounded-xl px-3 font-bold text-[#172033] hover:bg-[#f2f8f3]">{label}</a>)}<div className="mt-3 grid gap-3 border-t border-[#dce8de] pt-4 sm:hidden"><Link href="/iniciar-sesion" className="secondary-button" onClick={() => setOpen(false)}>Iniciar sesión</Link><a href="#contacto" className="primary-button" onClick={() => setOpen(false)}>Solicitar demostración</a></div></div></nav> : null}
  </header>
}
