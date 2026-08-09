import { Activity, ArrowRight, MapPinned, Siren, Sprout } from 'lucide-react'
import { Reveal } from './reveal'

const benefits = [
  { icon: Siren, feature: 'Prioridad por riesgo', title: 'Empieza por lo urgente', text: 'AgroD ordena las zonas que requieren atención para que no pierdas tiempo revisando todo por igual.', href: '#demo-alertas', cta: 'Ver alertas de ejemplo' },
  { icon: MapPinned, feature: 'Mapa, ruta y zumbador', title: 'Encuentra la zona correcta', text: 'Ubica cada cultivo, sigue un orden de inspección y haz sonar el dispositivo compatible cuando lo necesites.', href: '#demo-dispositivos', cta: 'Probar el localizador' },
  { icon: Activity, feature: 'Lecturas e historial', title: 'Decide con contexto', text: 'Compara humedad, temperatura, alertas y acciones anteriores antes de intervenir el cultivo.', href: '#demo-resumen', cta: 'Explorar la demo' },
]

export function Benefits() {
  return (
    <section id="como-funciona" className="relative py-7">
      <span id="beneficios" className="absolute -top-20" />
      <div className="mx-auto max-w-[1500px] px-5 md:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div><p className="text-sm font-semibold uppercase tracking-wider text-primary">Del sensor a la decisión</p><h2 className="mt-3 text-balance font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">Abre AgroD. Sal al campo sabiendo qué revisar.</h2></div>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground lg:justify-self-end">La plataforma organiza la información alrededor de tres decisiones reales: qué atender, dónde encontrarlo y con qué contexto actuar.</p>
        </Reveal>

        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 90} className="rounded-2xl border border-border/70 bg-card p-6">
              <div className="flex items-center justify-between gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><benefit.icon aria-hidden="true" className="h-5 w-5" /></span></div>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-primary">{benefit.feature}</p>
              <h3 className="mt-2 font-display text-xl font-bold text-foreground">{benefit.title}</h3>
              <p className="mt-3 text-pretty leading-7 text-muted-foreground">{benefit.text}</p>
              <a href={benefit.href} className="group mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline">{benefit.cta}<ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" /></a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="decision-flow relative mt-6 overflow-hidden rounded-2xl border border-border bg-secondary/55 px-5 py-5">
          <div aria-hidden="true" className="flow-dot" />
          <ol className="relative grid gap-4 sm:grid-cols-3">
            <li className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-card text-primary shadow-sm"><Sprout aria-hidden="true" className="size-5" /></span><div><strong className="block text-sm text-navy">1. El sensor mide</strong><span className="text-xs text-muted-foreground">Humedad y ambiente</span></div></li>
            <li className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-card text-primary shadow-sm"><Activity aria-hidden="true" className="size-5" /></span><div><strong className="block text-sm text-navy">2. AgroD organiza</strong><span className="text-xs text-muted-foreground">Riesgo, ubicación e historial</span></div></li>
            <li className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-card text-primary shadow-sm"><Siren aria-hidden="true" className="size-5" /></span><div><strong className="block text-sm text-navy">3. Tú priorizas</strong><span className="text-xs text-muted-foreground">La próxima inspección</span></div></li>
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
