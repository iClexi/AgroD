import { Clock3, Compass, Gauge, Search } from 'lucide-react'

const items = [
  { icon: Search, title: 'Menos recorridos a ciegas', text: 'Consulta el estado registrado y dirige la inspección hacia las zonas que más lo necesitan.' },
  { icon: Gauge, title: 'Mejor uso de recursos', text: 'Compara humedad y otras variables antes de decidir sobre riego e insumos.' },
  { icon: Clock3, title: 'Decisiones a tiempo', text: 'Recibe señales claras cuando una lectura sale del rango que definiste.' },
  { icon: Compass, title: 'La planta correcta', text: 'Ubica cada zona en el plano y solicita el zumbido del dispositivo compatible.' },
]

export function Benefits() { return <section id="beneficios" className="bg-white py-24 lg:py-32"><div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8 xl:px-10"><div className="max-w-4xl"><p className="section-kicker">Beneficios</p><h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-[#071f42] text-balance sm:text-5xl lg:text-6xl">Más control. Menos incertidumbre.</h2></div><div className="mt-14 grid border-y border-[#dce8de] md:grid-cols-2 xl:grid-cols-4">{items.map((item,index) => { const Icon=item.icon; return <article key={item.title} className={`py-8 md:p-8 ${index > 0 ? 'border-t border-[#dce8de] md:border-t-0' : ''} ${index % 2 ? 'md:border-l' : ''} ${index > 1 ? 'xl:border-l' : ''}`}><Icon aria-hidden="true" className="size-7 text-[#167a35]" /><h3 className="mt-6 font-display text-2xl font-bold">{item.title}</h3><p className="mt-4 text-lg leading-7 text-[#5f6978]">{item.text}</p></article> })}</div></div></section> }
