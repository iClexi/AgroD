import { ArrowRight, Check } from 'lucide-react'
import { Reveal } from './reveal'

const points = [
  'Instalación y configuración incluidas',
  'Acompañamiento agronómico local',
  'Alertas en español, claras y accionables',
]

export function CallToAction() {
  return (
    <section id="demo" className="pb-28 pt-4">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="relative overflow-hidden rounded-3xl bg-navy px-6 py-14 text-navy-foreground md:px-14 md:py-20">
          {/* organic field imagery */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-25 md:block"
            style={{
              backgroundImage: 'url(/images/field-aerial.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage:
                'linear-gradient(to right, transparent, black 55%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 55%)',
            }}
          />
          <div className="relative max-w-xl">
            <h2 className="text-balance font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Vea AgroD funcionando en su finca
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-navy-foreground/80">
              Agenda una demostración personalizada y descubre cómo convertir los
              datos de tus cultivos en decisiones más rentables.
            </p>

            <ul className="mt-8 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#demo"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Solicitar demostración
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex h-12 items-center justify-center rounded-full border border-navy-foreground/25 px-7 text-sm font-semibold text-navy-foreground transition-colors hover:bg-navy-foreground/10"
              >
                Ver cómo funciona
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
