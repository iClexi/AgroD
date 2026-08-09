'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight, Droplets, Play, Thermometer } from 'lucide-react'

const outcomes = [
  { value: 'Prioridad', label: 'qué revisar primero' },
  { value: 'Ubicación', label: 'dónde está cada cultivo' },
  { value: 'Contexto', label: 'lecturas y alertas juntas' },
]

export function Hero() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      window.cancelAnimationFrame(raf)
      raf = window.requestAnimationFrame(() => setOffset(Math.min(window.scrollY * 0.15, 120)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="inicio" className="relative overflow-hidden pt-28 md:pt-32">
      <div aria-hidden="true" className="organic-hero-bg pointer-events-none absolute inset-x-0 top-0 -z-10 h-[540px]" />

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hero-copy-in">
            <span className="inline-flex max-w-full items-center gap-2 whitespace-normal rounded-2xl border border-primary/25 bg-primary/8 px-3.5 py-1.5 text-center text-[11px] font-semibold uppercase leading-5 tracking-wider text-primary sm:rounded-full sm:text-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="signal-ping absolute inline-flex h-full w-full rounded-full bg-primary" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Monitoreo inteligente para fincas dominicanas
            </span>

            <h1 className="mt-6 text-balance font-display text-[2.65rem] font-extrabold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-[4rem]">
              Detecta a tiempo lo que tu cultivo necesita. <span className="text-primary">Protege tu cosecha.</span>
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              AgroD convierte humedad, temperatura y riesgo en prioridades claras: qué revisar primero, dónde está y qué acción considerar.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#demo" className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                Probar con datos de ejemplo
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="#como-funciona" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-7 text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40">
                <Play aria-hidden="true" className="h-4 w-4 text-primary" />
                Ver cómo funciona
              </a>
              <Link href="/registro" className="text-center text-sm font-bold text-navy underline-offset-4 hover:underline sm:px-2">Crear cuenta</Link>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-t border-border/70 pt-6">
              {outcomes.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-2xl font-bold text-navy">{stat.value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted-foreground">{stat.label}</dd>
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
                className="h-[420px] w-full object-cover md:h-[520px]"
                style={{ transform: `translateY(-${offset * 0.4}px) scale(1.08)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-3">
                <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card/90 px-4 py-3 shadow-lg backdrop-blur-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground"><Droplets aria-hidden="true" className="h-4.5 w-4.5" /></span>
                  <div><p className="text-xs font-semibold text-foreground">Riego recomendado</p><p className="text-[11px] text-muted-foreground">Tomate Norte · Humedad 31%</p></div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card/90 px-4 py-3 shadow-lg backdrop-blur-sm">
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
