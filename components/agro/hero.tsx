'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Droplets, Thermometer } from 'lucide-react'

const outcomes = [
  { value: 'Qué revisar', label: 'prioridades claras' },
  { value: 'Dónde está', label: 'mapa y localizador' },
  { value: 'Qué cambió', label: 'lecturas e historial' },
]

export function Hero() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      window.cancelAnimationFrame(raf)
      raf = window.requestAnimationFrame(() => setOffset(Math.min(window.scrollY * 0.12, 90)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="inicio" className="relative overflow-hidden pb-14 pt-24 md:pb-16 md:pt-28">
      <div aria-hidden="true" className="organic-hero-bg pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-9 lg:grid-cols-[1.02fr_.98fr]">
          <div className="hero-copy-in">
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3.5 py-1.5 text-[11px] font-semibold uppercase leading-5 tracking-wider text-primary sm:text-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="signal-ping absolute inline-flex h-full w-full rounded-full bg-primary" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Monitoreo inteligente para cultivos dominicanos
            </span>

            <h1 className="mt-5 text-balance font-display text-[2.65rem] font-extrabold leading-[1.03] tracking-tight text-foreground sm:text-6xl lg:text-[3.65rem]">
              Tu finca te dice qué necesita. <span className="text-primary">AgroD te dice dónde empezar.</span>
            </h1>

            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Sensores, alertas y mapa en una sola vista para detectar humedad baja, priorizar cultivos y encontrar cada dispositivo sin recorrer la finca a ciegas.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#demo" className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                Ver AgroD en acción
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link href="/registro" className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-7 text-sm font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40">
                Crear mi cuenta
              </Link>
            </div>

            <dl className="mt-8 grid max-w-xl grid-cols-3 gap-3 border-t border-border/70 pt-5">
              {outcomes.map((item) => (
                <div key={item.value}>
                  <dt className="font-display text-base font-bold text-navy sm:text-lg">{item.value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted-foreground">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero-visual-in relative">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-[0_30px_80px_-40px_rgba(20,40,30,0.45)]">
              <Image
                src="/images/hero-field.png"
                alt="Cultivos organizados con un dispositivo de monitoreo AgroD"
                width={1536}
                height={1024}
                priority
                className="h-[390px] w-full object-cover md:h-[450px]"
                style={{ transform: `translateY(-${offset * 0.35}px) scale(1.08)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
              <div aria-hidden="true" className="hero-scan" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2.5">
                <div className="float-card flex items-center gap-3 rounded-2xl border border-border/50 bg-card/92 px-4 py-3 shadow-lg backdrop-blur-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground"><Droplets aria-hidden="true" className="h-4.5 w-4.5" /></span>
                  <div><p className="text-xs font-semibold text-foreground">Riego recomendado</p><p className="text-[11px] text-muted-foreground">Tomate Norte · Humedad 31%</p></div>
                </div>
                <div className="float-card flex items-center gap-3 rounded-2xl border border-border/50 bg-card/92 px-4 py-3 shadow-lg backdrop-blur-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/10 text-navy"><Thermometer aria-hidden="true" className="h-4.5 w-4.5" /></span>
                  <div><p className="text-xs font-semibold text-foreground">29 °C</p><p className="text-[11px] text-muted-foreground">Lectura reciente</p></div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="absolute -left-4 top-10 hidden h-20 w-20 rounded-2xl border border-primary/20 bg-primary/5 md:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
