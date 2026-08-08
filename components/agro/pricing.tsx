import { Check } from 'lucide-react'
import { Reveal } from './reveal'

const included = ['Panel web y acceso móvil', 'Fincas, cultivos y dispositivos', 'Alertas, mapa y ruta de inspección', 'Historial de órdenes de localización']

export function Pricing() {
  return (
    <section className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="text-sm font-semibold uppercase tracking-wider text-primary">Oferta de referencia</p><h2 className="mt-3 text-balance font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">Empieza con el campo que ya tienes.</h2></div><p className="max-w-2xl text-lg leading-relaxed text-muted-foreground lg:justify-self-end">Los valores provienen del modelo comercial académico y pueden cambiar según el área, la conectividad y los equipos necesarios.</p></Reveal>
        <Reveal delay={100} className="mt-14 grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[.9fr_1.1fr]">
          <div className="p-7 sm:p-10 lg:p-12"><p className="text-xs font-semibold uppercase tracking-wider text-primary">Kit inicial</p><p className="mt-4 font-display text-5xl font-bold text-navy">RD$55,000</p><p className="mt-2 text-muted-foreground">Referencia para equipos, instalación y configuración inicial.</p><dl className="mt-8 grid gap-4 border-t border-border pt-7 sm:grid-cols-2"><div><dt className="text-sm font-semibold text-muted-foreground">Equipo adicional</dt><dd className="mt-1 font-display text-xl font-bold">RD$3,000–6,000</dd></div><div><dt className="text-sm font-semibold text-muted-foreground">Mantenimiento</dt><dd className="mt-1 font-display text-xl font-bold">RD$5,000–10,000</dd></div></dl></div>
          <div className="bg-navy p-7 text-navy-foreground sm:p-10 lg:p-12"><p className="text-xs font-semibold uppercase tracking-wider text-[#8ed09f]">Plataforma AgroD</p><div className="mt-4 flex flex-wrap items-end gap-3"><p className="font-display text-5xl font-bold">RD$1,500–2,500</p><p className="pb-2 text-white/55">al mes</p></div><ul className="mt-8 space-y-4">{included.map((item) => <li key={item} className="flex gap-3 text-sm text-white/75"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check aria-hidden="true" className="size-4" /></span>{item}</li>)}</ul><p className="mt-8 text-xs leading-5 text-white/55">Plan profesional desde RD$3,500 mensuales. Valores sujetos a validación comercial e impuestos aplicables.</p></div>
        </Reveal>
      </div>
    </section>
  )
}
