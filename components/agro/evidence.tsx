import { Reveal } from './reveal'

const facts = [
  ['11 de 12', 'mencionaron el riesgo de perder producción'],
  ['10 de 12', 'todavía dependían del monitoreo manual'],
  ['9 de 12', 'indicaron que reaccionaban tarde'],
]

export function Evidence() {
  return (
    <section className="bg-navy py-20 text-navy-foreground md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
        <Reveal><p className="text-sm font-semibold uppercase tracking-wider text-[#8ed09f]">Diagnóstico exploratorio</p><h2 className="mt-3 text-balance font-display text-4xl font-bold leading-tight md:text-5xl">El problema empieza antes de que el daño sea visible.</h2><p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">El equipo conversó con 12 participantes del entorno agrícola para entender qué debía resolver primero AgroD. Es una muestra académica exploratoria, no un estudio nacional.</p></Reveal>
        <dl className="grid gap-px overflow-hidden rounded-3xl bg-white/15 sm:grid-cols-3">{facts.map(([value, label], index) => <Reveal as="div" key={value} delay={index * 100} className="bg-navy p-7 sm:p-8"><dt className="font-display text-3xl font-bold text-[#8ed09f]">{value}</dt><dd className="mt-3 text-sm leading-6 text-white/70">{label}</dd></Reveal>)}</dl>
      </div>
    </section>
  )
}
