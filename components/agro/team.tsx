import { Reveal } from './reveal'

const members = [
  { key: 'michael', name: 'Michael David Robles Fermín', role: 'Gestión y coordinación' },
  { key: 'sussette', name: 'Sussette Denyse Botero Morán', role: 'Diseño, branding y mercadeo' },
  { key: 'luis', name: 'Luis Miguel Araujo Reynoso', role: 'IoT y mecatrónica' },
  { key: 'dionela', name: 'Dionela Salomé Pérez Mateo', role: 'Ciberseguridad y protección de datos' },
]

export function Team() {
  return (
    <section id="equipo" className="py-14 md:py-16">
      <div className="mx-auto max-w-[1500px] px-5 md:px-8">
        <Reveal className="grid gap-5 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><p className="text-sm font-semibold uppercase tracking-wider text-primary">El equipo</p><h2 className="mt-3 text-balance font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">Campo, tecnología y negocio en un mismo equipo.</h2></div><p className="max-w-2xl leading-7 text-muted-foreground lg:justify-self-end">Cuatro especialidades convierten una necesidad agrícola real en una solución que conecta hardware, software y acompañamiento.</p></Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => <Reveal as="li" key={member.name} delay={index * 80} className="grid grid-cols-[104px_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-border/70 bg-card p-4 sm:block"><div className={`team-photo team-photo-${member.key}`} role="img" aria-label={`Fotografía completa de ${member.name}`} /><div><h3 className="font-display text-lg font-bold leading-snug text-foreground sm:mt-4">{member.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{member.role}</p></div></Reveal>)}
        </ul>
      </div>
    </section>
  )
}
