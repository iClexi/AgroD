import { MonitorSmartphone, Smartphone } from 'lucide-react'
import { Reveal } from './reveal'

export function Availability() {
  return (
    <section className="bg-secondary/50 py-10 md:py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <Reveal className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-wider text-primary">AgroD donde trabajas</p><h2 className="mt-2 text-balance font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">Úsalo hoy desde el navegador.</h2><p className="mt-3 leading-7 text-muted-foreground">Funciona en móvil y computadora. Las aplicaciones nativas para iOS y Android están próximas.</p></Reveal>
        <Reveal delay={100} className="grid shrink-0 gap-3 sm:grid-cols-2"><StoreBadge icon={Smartphone} store="App Store" /><StoreBadge icon={MonitorSmartphone} store="Google Play" /></Reveal>
      </div>
    </section>
  )
}

function StoreBadge({ icon: Icon, store }: { icon: typeof Smartphone; store: string }) {
  return <div className="flex min-w-48 items-center gap-3 rounded-2xl bg-navy px-4 py-3 text-navy-foreground"><Icon aria-hidden="true" className="size-6 text-[#8ed09f]" /><span><small className="block text-[11px] text-white/55">Próximamente</small><strong className="mt-0.5 block font-display text-base">{store}</strong></span></div>
}
