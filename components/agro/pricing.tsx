import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Reveal } from './reveal'

const included = ['Panel web y acceso móvil', 'Fincas, cultivos y dispositivos', 'Alertas, mapa y ruta de inspección', 'Historial y localización de equipos']

export function Pricing() {
  return (
    <section id="precios" className="bg-secondary/40 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="grid gap-5 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div><p className="text-sm font-semibold uppercase tracking-wider text-primary">Oferta de referencia</p><h2 className="mt-3 text-balance font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">Empieza con la finca que ya tienes.</h2></div>
          <p className="max-w-2xl leading-7 text-muted-foreground lg:justify-self-end">Una referencia comercial clara para combinar equipos, instalación y la plataforma. El precio final depende del área y la conectividad disponible.</p>
        </Reveal>
        <Reveal delay={100} className="mt-8 grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[.9fr_1.1fr]">
          <div className="p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-wider text-primary">Kit inicial</p><p className="mt-3 font-display text-4xl font-bold text-navy">RD$55,000</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Equipos, instalación y configuración inicial de referencia.</p><dl className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-2"><div><dt className="text-xs font-semibold text-muted-foreground">Equipo adicional</dt><dd className="mt-1 font-display text-lg font-bold">RD$3,000–6,000</dd></div><div><dt className="text-xs font-semibold text-muted-foreground">Mantenimiento</dt><dd className="mt-1 font-display text-lg font-bold">RD$5,000–10,000</dd></div></dl></div>
          <div className="bg-navy p-6 text-navy-foreground sm:p-8"><p className="text-xs font-semibold uppercase tracking-wider text-[#8ed09f]">Plataforma AgroD</p><div className="mt-3 flex flex-wrap items-end gap-2"><p className="font-display text-4xl font-bold">RD$1,500–2,500</p><p className="pb-1 text-sm text-white/55">al mes</p></div><ul className="mt-5 grid gap-3 sm:grid-cols-2">{included.map((item) => <li key={item} className="flex gap-2 text-sm leading-5 text-white/75"><span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check aria-hidden="true" className="size-3.5" /></span>{item}</li>)}</ul><div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"><Link href="/registro" className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground">Crear cuenta <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" /></Link><p className="text-xs leading-5 text-white/55">Valores sujetos a validación comercial e impuestos.</p></div></div>
        </Reveal>
      </div>
    </section>
  )
}
