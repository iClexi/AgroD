import { CloudCog, RadioTower, SquareChartGantt } from 'lucide-react'

const steps = [
  { icon: RadioTower, number: '01', title: 'Sensores en el cultivo', text: 'Los dispositivos registran humedad del suelo, temperatura y otras variables definidas para la parcela.' },
  { icon: CloudCog, number: '02', title: 'AgroD organiza los datos', text: 'La plataforma centraliza las lecturas y señala condiciones que necesitan revisión.' },
  { icon: SquareChartGantt, number: '03', title: 'Tú decides y actúas', text: 'Consulta alertas, ubica el cultivo y sigue un orden de inspección fácil de entender.' },
]

export function Journey() {
  return <section id="como-funciona" className="bg-[#071f42] py-24 text-white lg:py-32"><div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8 xl:px-10"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="section-kicker text-[#8ed09f]">Cómo funciona</p><h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-balance sm:text-5xl lg:text-6xl">Del cultivo a una decisión clara.</h2></div><p className="max-w-2xl text-xl leading-8 text-white/70 lg:justify-self-end">AgroD traduce datos técnicos en acciones reconocibles para el productor, sin obligarlo a interpretar un sistema complejo.</p></div><ol className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] bg-white/12 lg:grid-cols-3">{steps.map((step) => { const Icon = step.icon; return <li key={step.number} className="relative bg-[#071f42] p-7 sm:p-9"><div className="flex items-center justify-between"><span className="flex size-13 items-center justify-center rounded-2xl bg-white/10 text-[#8ed09f]"><Icon aria-hidden="true" className="size-6" /></span><span className="font-display text-3xl font-extrabold text-white/18">{step.number}</span></div><h3 className="mt-8 font-display text-2xl font-bold">{step.title}</h3><p className="mt-4 text-lg leading-7 text-white/65">{step.text}</p></li> })}</ol></div></section>
}
