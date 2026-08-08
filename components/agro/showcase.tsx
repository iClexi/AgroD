'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AlertTriangle, Bell, CheckCircle2, CloudSun, Droplets, Signal, Sprout, ThermometerSun } from 'lucide-react'
import { Logo } from './logo'
import { Reveal } from './reveal'

const bars = [42, 55, 48, 63, 58, 71, 66, 52]

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.3 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

function Gauge({ value, active }: { value: number; active: boolean }) {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const shown = active ? value : 0
  return (
    <div className="relative h-28 w-28">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--muted)" strokeWidth="8" />
        <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--primary)" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference - (circumference * shown) / 100} style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="font-display text-2xl font-bold text-foreground">{shown}%</span><span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Humedad</span></div>
    </div>
  )
}

export function Showcase() {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <section id="plataforma" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-secondary/40" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-wider text-primary">La plataforma</p><h2 className="mt-3 text-balance font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">Tus cultivos, claros de un vistazo</h2><p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">Humedad, temperatura, estado de cada zona y dispositivos conectados. AgroD ordena la información para que sepas dónde comenzar.</p></Reveal>

        <div ref={ref} className="relative mt-14">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_40px_100px_-50px_rgba(20,40,30,0.5)]">
              <div className="flex items-center justify-between border-b border-border/70 px-5 py-3 md:px-7"><Logo compact /><div className="hidden items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground sm:flex"><Signal aria-hidden="true" className="h-3.5 w-3.5 text-primary" />Finca demostrativa · 2 equipos conectados</div><div className="flex items-center gap-2"><span className="relative flex h-2 w-2"><span className="signal-ping absolute inline-flex h-full w-full rounded-full bg-primary" /><span className="relative inline-flex h-2 w-2 rounded-full bg-primary" /></span><span className="text-xs font-medium text-muted-foreground">En vivo</span></div></div>
              <div className="grid gap-5 p-5 md:grid-cols-3 md:p-7">
                <div className="flex flex-col items-center justify-center rounded-2xl border border-border/70 bg-background p-6"><Gauge value={41} active={inView} /><div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Droplets aria-hidden="true" className="h-4 w-4 text-primary" />Tomate Norte</div></div>
                <div className="flex flex-col gap-5">
                  <Metric icon={<ThermometerSun className="h-5 w-5" />} label="Temperatura" value="29 °C" tone="accent" />
                  <Metric icon={<CloudSun className="h-5 w-5" />} label="Condición" value="Atención moderada" tone="navy" />
                </div>
                <div className="rounded-2xl border border-border/70 bg-background p-5"><div className="flex items-center justify-between"><p className="text-xs uppercase tracking-wide text-muted-foreground">Humedad · 8 h</p><span className="text-xs font-semibold text-primary">+6%</span></div><div className="mt-4 flex h-24 items-end gap-2">{bars.map((bar, index) => <div key={index} className="flex-1 rounded-t bg-primary/80" style={{ height: inView ? `${bar}%` : '0%', transition: `height 1s cubic-bezier(0.22,1,0.36,1) ${index * 70}ms` }} />)}</div></div>
                <div className="rounded-2xl border border-border/70 bg-background p-5 md:col-span-2"><p className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground"><Sprout aria-hidden="true" className="h-4 w-4 text-primary" />Estado de cultivos</p><ul className="space-y-3"><CropStatus name="Ají Sur" label="Revisión prioritaria" tone="alert" /><CropStatus name="Tomate Norte" label="Revisar riego" tone="warn" /><CropStatus name="Plátano Este" label="Cultivo estable" tone="ok" /></ul></div>
                <div className="flex flex-col justify-between rounded-2xl bg-navy p-5 text-navy-foreground"><div className="flex items-center gap-2"><Bell aria-hidden="true" className="h-4 w-4" /><p className="text-sm font-semibold">Prioridades de hoy</p></div><p className="mt-4 font-display text-4xl font-bold">3</p><p className="mt-1 text-sm text-navy-foreground/70">1 crítica · 1 atención · 1 estable</p></div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200} className="absolute -bottom-10 right-4 hidden w-52 lg:block">
            <div className="overflow-hidden rounded-[2rem] border-4 border-navy bg-card shadow-2xl"><div className="bg-navy px-4 py-2.5 text-navy-foreground"><p className="text-[10px] uppercase tracking-wide text-navy-foreground/70">AgroD móvil</p><p className="text-sm font-semibold">Alertas</p></div><div className="space-y-2.5 p-3"><MobileAlert icon={<Droplets className="h-3.5 w-3.5" />} tone="warn" title="Revisar riego" sub="Tomate Norte" /><MobileAlert icon={<AlertTriangle className="h-3.5 w-3.5" />} tone="alert" title="Inspección prioritaria" sub="Ají Sur" /><MobileAlert icon={<CheckCircle2 className="h-3.5 w-3.5" />} tone="ok" title="Cultivo estable" sub="Plátano Este" /></div></div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Metric({ icon, label, value, tone }: { icon: ReactNode; label: string; value: string; tone: 'accent' | 'navy' }) {
  return <div className="flex items-center gap-4 rounded-2xl border border-border/70 bg-background p-5"><span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone === 'accent' ? 'bg-accent text-accent-foreground' : 'bg-navy/10 text-navy'}`}>{icon}</span><div><p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p><p className="font-display text-lg font-bold text-foreground">{value}</p></div></div>
}

function CropStatus({ name, label, tone }: { name: string; label: string; tone: 'warn' | 'alert' | 'ok' }) {
  const styles = { warn: 'bg-accent text-accent-foreground', alert: 'bg-destructive/12 text-destructive', ok: 'bg-primary/12 text-primary' }
  return <li className="flex items-center justify-between gap-3 rounded-xl bg-secondary/50 px-4 py-3"><span className="text-sm text-foreground">{name}</span><span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${styles[tone]}`}>{label}</span></li>
}

function MobileAlert({ icon, tone, title, sub }: { icon: ReactNode; tone: 'warn' | 'alert' | 'ok'; title: string; sub: string }) {
  const styles = { warn: 'bg-accent text-accent-foreground', alert: 'bg-destructive/12 text-destructive', ok: 'bg-primary/12 text-primary' }
  return <div className="flex items-center gap-2.5 rounded-xl border border-border/70 bg-background p-2.5"><span className={`flex h-7 w-7 items-center justify-center rounded-lg ${styles[tone]}`}>{icon}</span><div className="min-w-0"><p className="truncate text-[11px] font-semibold text-foreground">{title}</p><p className="truncate text-[10px] text-muted-foreground">{sub}</p></div></div>
}
