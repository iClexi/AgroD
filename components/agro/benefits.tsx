import { Clock3, Compass, Gauge, Search } from 'lucide-react'
import { Reveal } from './reveal'

const benefits = [
  { icon: Search, title: 'Menos recorridos a ciegas', text: 'Consulta la finca antes de salir y dirige la inspección hacia las zonas que requieren atención.' },
  { icon: Gauge, title: 'Mejor uso de recursos', text: 'Compara humedad, temperatura y estado del cultivo antes de decidir sobre riego e insumos.' },
  { icon: Clock3, title: 'Decisiones a tiempo', text: 'Recibe señales claras cuando una lectura sale del rango y registra lo que hiciste.' },
  { icon: Compass, title: 'Encuentra la zona correcta', text: 'Ubica cada cultivo en el mapa y activa el zumbador del dispositivo compatible para localizarlo.' },
]

export function Benefits() {
  return (
    <section id="beneficios" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-wider text-primary">Beneficios</p><h2 className="mt-3 text-balance font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">Tecnología que trabaja con la tierra</h2></Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => <Reveal key={benefit.title} delay={index * 100} className="group flex flex-col rounded-2xl border border-border/70 bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"><benefit.icon aria-hidden="true" className="h-6 w-6" /></span><h3 className="mt-6 font-display text-xl font-bold text-foreground">{benefit.title}</h3><p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{benefit.text}</p></Reveal>)}
        </div>
      </div>
    </section>
  )
}
