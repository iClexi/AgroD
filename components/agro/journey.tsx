import { Cloud, LayoutDashboard, Radio } from 'lucide-react'
import { Reveal } from './reveal'

const steps = [
  { icon: Radio, step: '01', title: 'Sensores AgroD', desc: 'Los equipos recogen humedad, temperatura, señal y otras condiciones directamente en la finca.' },
  { icon: Cloud, step: '02', title: 'AgroD Cloud', desc: 'Las lecturas se organizan por finca, cultivo y dispositivo para que toda la información quede en un solo lugar.' },
  { icon: LayoutDashboard, step: '03', title: 'App y web', desc: 'Recibes alertas claras, una ruta de inspección y recomendaciones que puedes consultar en móvil o computadora.' },
]

export function Journey() {
  return (
    <section id="como-funciona" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Cómo funciona</p>
          <h2 className="mt-3 text-balance font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">Del campo a tu decisión, en un solo flujo</h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">La tecnología trabaja en segundo plano. Tú recibes la información que necesitas para decidir qué revisar y qué hacer.</p>
        </Reveal>

        <div className="relative mt-16">
          <svg aria-hidden="true" className="pointer-events-none absolute left-0 top-[52px] hidden h-2 w-full md:block" viewBox="0 0 1000 8" preserveAspectRatio="none">
            <line x1="60" y1="4" x2="940" y2="4" stroke="var(--primary)" strokeWidth="2" className="flow-dash" opacity="0.55" />
          </svg>
          <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
            {steps.map((item, index) => (
              <Reveal as="li" key={item.step} delay={index * 120} className="relative">
                <div className="flex flex-col items-start">
                  <div className="relative flex h-[104px] items-center">
                    <span className="relative flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-primary/20 bg-card shadow-sm">
                      <item.icon aria-hidden="true" className="h-7 w-7 text-primary" />
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-navy-foreground">{item.step}</span>
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
