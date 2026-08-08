import Image from 'next/image'
import { Reveal } from './reveal'

const members = [
  { key: 'michael', name: 'Michael David Robles Fermín', role: 'Gestión y coordinación' },
  { key: 'sussette', name: 'Sussette Denyse Botero Morán', role: 'Diseño, branding y mercadeo' },
  { key: 'luis', name: 'Luis Miguel Araujo Reynoso', role: 'IoT y mecatrónica' },
  { key: 'dionela', name: 'Dionela Salomé Pérez Mateo', role: 'Ciberseguridad y protección de datos' },
]

export function Team() {
  return (
    <section id="equipo" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-wider text-primary">El equipo</p><h2 className="mt-3 text-balance font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">Cuatro especialidades construyendo una misma solución</h2><p className="mt-4 text-lg leading-relaxed text-muted-foreground">Estas son las personas detrás de AgroD, usando las fotografías y los roles definidos en el documento formal del proyecto.</p></Reveal>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => <Reveal as="li" key={member.name} delay={index * 100} className="group rounded-2xl border border-border/70 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"><div className={`team-photo team-photo-${member.key}`} role="img" aria-label={`Fotografía de ${member.name}`}><Image src="/images/brand/equipo-agrod.png" alt="" width={2048} height={1536} /></div><h3 className="mt-5 font-display text-lg font-bold leading-snug text-foreground">{member.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{member.role}</p></Reveal>)}
        </ul>
        <Reveal delay={120} className="mt-8"><details className="rounded-2xl border border-border/70 bg-secondary/40 p-4"><summary className="cursor-pointer font-semibold text-navy">Ver el organigrama original completo</summary><div className="mt-4 overflow-x-auto rounded-xl bg-white"><Image src="/images/brand/equipo-agrod.png" alt="Organigrama original del equipo AgroD con fotografías, nombres y responsabilidades" width={2048} height={1536} className="min-w-[760px]" /></div></details></Reveal>
      </div>
    </section>
  )
}
