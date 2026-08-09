import { Activity, AlertTriangle, ArrowRight, MapPinned } from 'lucide-react'
import { Reveal } from './reveal'

const facts = [
  ['11 de 12', 'mencionaron el riesgo de perder producción'],
  ['10 de 12', 'todavía dependían del monitoreo manual'],
  ['9 de 12', 'indicaron que reaccionaban tarde'],
]

const answers = [
  { icon: AlertTriangle, title: 'Qué revisar', text: 'Ordena las zonas por nivel de atención.' },
  { icon: MapPinned, title: 'Dónde está', text: 'Ubica el cultivo y su dispositivo en el mapa.' },
  { icon: Activity, title: 'Qué cambió', text: 'Consulta lecturas, alertas e historial juntos.' },
]

export function Evidence() {
  return (
    <section className="bg-navy py-16 text-navy-foreground md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#8ed09f]">El problema que validamos</p>
            <h2 className="mt-3 text-balance font-display text-4xl font-bold leading-tight md:text-5xl">El daño suele empezar antes de que puedas verlo.</h2>
            <p className="mt-4 max-w-xl leading-7 text-white/70">En una exploración académica con 12 participantes del entorno agrícola, el monitoreo manual y la reacción tardía aparecieron una y otra vez. AgroD nace para convertir esas señales en una prioridad concreta.</p>
          </Reveal>
          <dl className="grid gap-px overflow-hidden rounded-3xl bg-white/15 sm:grid-cols-3">
            {facts.map(([value, label], index) => (
              <Reveal as="div" key={value} delay={index * 90} className="bg-navy p-6">
                <dt className="font-display text-3xl font-bold text-[#8ed09f]">{value}</dt>
                <dd className="mt-2 text-sm leading-6 text-white/70">{label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal delay={100} className="mt-8 grid gap-4 rounded-3xl border border-white/15 bg-white/[.06] p-5 md:grid-cols-[repeat(3,1fr)_auto] md:items-center md:p-6">
          {answers.map((answer) => (
            <div key={answer.title} className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#8ed09f]/15 text-[#8ed09f]"><answer.icon aria-hidden="true" className="size-5" /></span>
              <div><h3 className="font-display font-bold">{answer.title}</h3><p className="mt-1 text-sm leading-5 text-white/65">{answer.text}</p></div>
            </div>
          ))}
          <a href="#demo" className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#8ed09f] px-5 text-sm font-bold text-navy transition hover:-translate-y-0.5">
            Verlo en la plataforma <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
