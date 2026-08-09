import Link from 'next/link'
import { ArrowRight, Globe2, LogIn, Smartphone } from 'lucide-react'
import { Reveal } from './reveal'

export function Availability() {
  return (
    <section className="bg-secondary/50 py-10 md:py-12">
      <div className="mx-auto grid max-w-[1500px] gap-7 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(420px,.78fr)] lg:items-center">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">AgroD donde trabajas</p>
          <h2 className="mt-2 text-balance font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">Tu finca cabe en el bolsillo. Y en la computadora.</h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">La aplicación web funciona hoy en móvil y PC. Las versiones nativas para iOS y Android están en preparación.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/registro" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg">
              Probar la plataforma <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/iniciar-sesion" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-bold text-navy transition hover:border-primary hover:text-primary">
              <LogIn aria-hidden="true" className="size-4" /> Ya tengo cuenta
            </Link>
          </div>
        </Reveal>
        <Reveal delay={100} className="grid gap-3 sm:grid-cols-2">
          <PlatformStatus icon={Globe2} eyebrow="Disponible ahora" title="Aplicación web" detail="Móvil y computadora" active />
          <PlatformStatus icon={Smartphone} eyebrow="En preparación" title="iOS y Android" detail="Publicación planificada" />
        </Reveal>
      </div>
    </section>
  )
}

function PlatformStatus({ icon: Icon, eyebrow, title, detail, active = false }: { icon: typeof Smartphone; eyebrow: string; title: string; detail: string; active?: boolean }) {
  return (
    <div className={`flex min-h-32 items-start gap-3 rounded-2xl border p-4 ${active ? 'border-primary/25 bg-card shadow-sm' : 'border-border bg-background/75'}`}>
      <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${active ? 'bg-primary text-primary-foreground' : 'bg-navy text-navy-foreground'}`}><Icon aria-hidden="true" className="size-5" /></span>
      <span><small className={`block text-[11px] font-bold uppercase tracking-wider ${active ? 'text-primary' : 'text-muted-foreground'}`}>{eyebrow}</small><strong className="mt-1 block font-display text-base text-foreground">{title}</strong><span className="mt-1 block text-xs leading-5 text-muted-foreground">{detail}</span></span>
    </div>
  )
}
