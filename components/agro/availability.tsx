import { MonitorSmartphone, Smartphone } from 'lucide-react'
import { Reveal } from './reveal'

export function Availability() {
  return (
    <section className="bg-secondary/50 py-20 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-9 px-5 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <Reveal className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-wider text-primary">AgroD donde trabajas</p><h2 className="mt-3 text-balance font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">En móvil y computadora desde el navegador.</h2><p className="mt-5 text-lg leading-relaxed text-muted-foreground">La plataforma web ya se adapta a ambas pantallas. Las aplicaciones nativas continúan en desarrollo y se anuncian como próximas.</p></Reveal>
        <Reveal delay={120} className="grid shrink-0 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"><StoreBadge icon={Smartphone} store="App Store" /><StoreBadge icon={MonitorSmartphone} store="Google Play" /></Reveal>
      </div>
    </section>
  )
}

function StoreBadge({ icon: Icon, store }: { icon: typeof Smartphone; store: string }) {
  return <div className="flex min-w-56 items-center gap-3 rounded-2xl bg-navy px-5 py-4 text-navy-foreground"><Icon aria-hidden="true" className="size-7 text-[#8ed09f]" /><span><small className="block text-xs text-white/55">Próximamente</small><strong className="mt-0.5 block font-display text-lg">{store}</strong></span></div>
}
