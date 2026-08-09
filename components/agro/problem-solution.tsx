import { ArrowDown, BellRing, MapPinned, Radio, Route, Sprout } from 'lucide-react'
import { Reveal } from './reveal'

const before = [
  {
    icon: Sprout,
    title: 'Recorridos sin una prioridad clara',
    text: 'Se revisa fila por fila y una señal importante puede aparecer cuando el daño ya avanzó.',
  },
  {
    icon: MapPinned,
    title: 'Zonas difíciles de localizar',
    text: 'Con muchos cultivos y equipos, encontrar la planta correcta consume tiempo que hace falta en la finca.',
  },
  {
    icon: Radio,
    title: 'Información en lugares separados',
    text: 'Lecturas, apuntes y ubicaciones no siempre cuentan la misma historia al momento de decidir.',
  },
]

const after = [
  {
    icon: BellRing,
    title: 'Empieza por lo que necesita atención',
    text: 'AgroD organiza las alertas por nivel de riesgo para que sepas qué revisar primero.',
  },
  {
    icon: Route,
    title: 'Sigue una ruta dentro de tu finca',
    text: 'El mapa reúne cultivos y zonas para ayudarte a llegar en un orden más práctico.',
  },
  {
    icon: Radio,
    title: 'Relaciona el cultivo con su equipo',
    text: 'Cada dispositivo queda asociado a su zona y puede emitir una señal para que lo encuentres.',
  },
]

export function ProblemSolution() {
  return (
    <section id="problema" className="relative overflow-hidden bg-[#f3f6ef] py-24 md:py-32">
      <div aria-hidden="true" className="absolute -right-24 top-12 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Una jornada más clara</p>
          <h2 className="mt-3 text-balance font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            El problema no es trabajar la finca. Es trabajar sin saber dónde empezar.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            AgroD convierte lecturas dispersas en una lista de prioridades, una ubicación y una acción para considerar.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <Reveal className="rounded-3xl bg-navy p-6 text-navy-foreground shadow-xl md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">Sin una vista unificada</p>
            <div className="mt-6 space-y-4">
              {before.map((item) => (
                <article key={item.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white/75">
                    <item.icon aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/65">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>

          <div aria-hidden="true" className="flex items-center justify-center py-1 lg:px-1">
            <span className="flex size-12 items-center justify-center rounded-full border border-primary/20 bg-card text-primary shadow-md lg:-rotate-90">
              <ArrowDown className="size-5" />
            </span>
          </div>

          <Reveal delay={120} className="rounded-3xl border border-primary/20 bg-card p-6 shadow-xl md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Con AgroD</p>
            <div className="mt-6 space-y-4">
              {after.map((item) => (
                <article key={item.title} className="flex gap-4 rounded-2xl border border-border/70 bg-background p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
