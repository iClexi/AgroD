import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Droplets, Radio, TriangleAlert } from 'lucide-react'

export function Hero() {
  return <section id="inicio" className="relative min-h-[760px] overflow-hidden bg-white pt-[76px] lg:min-h-[900px]">
    <div aria-hidden="true" className="field-lines pointer-events-none absolute inset-0 opacity-35" />
    <div className="mx-auto grid min-h-[calc(100vh-76px)] w-full max-w-[1480px] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,.88fr)_minmax(560px,1.12fr)] lg:px-8 lg:py-16 xl:px-10">
      <div className="relative z-10 max-w-3xl">
        <p className="section-kicker">Tecnología para el campo dominicano</p>
        <h1 className="mt-5 font-display text-[clamp(3.2rem,6.4vw,6.7rem)] font-extrabold leading-[.98] tracking-[-.055em] text-[#071f42] text-balance">Monitorea tus cultivos. <span className="text-[#167a35]">Decide a tiempo.</span></h1>
        <p className="mt-7 max-w-2xl text-xl leading-8 text-[#536071] sm:text-2xl sm:leading-9">AgroD conecta sensores en tu finca con alertas claras, recomendaciones prácticas y una ruta para revisar primero lo que más importa.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#contacto" className="primary-button min-h-14 px-7 text-base">Solicitar demostración<ArrowRight aria-hidden="true" className="size-5" /></a><Link href="/registro" className="secondary-button min-h-14 px-7 text-base">Probar el panel</Link></div>
        <ul className="mt-10 grid gap-3 text-base font-bold text-[#172033] sm:grid-cols-3">
          <li className="hero-proof"><Droplets aria-hidden="true" className="size-5 text-[#167a35]" />Humedad del suelo</li>
          <li className="hero-proof"><Radio aria-hidden="true" className="size-5 text-[#167a35]" />Sensores vinculados</li>
          <li className="hero-proof"><TriangleAlert aria-hidden="true" className="size-5 text-[#167a35]" />Alertas accionables</li>
        </ul>
      </div>

      <div className="relative min-h-[500px] lg:min-h-[720px]">
        <div className="absolute inset-0 overflow-hidden rounded-[2.25rem] shadow-[0_50px_100px_-55px_rgba(7,31,66,.65)]">
          <Image src="/images/hero-field.png" alt="Finca organizada con un sensor agrícola instalado entre los cultivos" fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#071f42]/65 to-transparent" />
        </div>
        <div className="absolute bottom-5 left-4 right-4 grid gap-3 sm:left-6 sm:right-6 sm:grid-cols-2 xl:bottom-8 xl:left-8 xl:right-8">
          <div className="data-float"><span className="data-float-icon"><Droplets aria-hidden="true" className="size-5" /></span><span><strong>Riego recomendado</strong><small>Tomate Norte · Humedad 31%</small></span></div>
          <div className="data-float"><span className="data-float-icon bg-[#eef5ff] text-[#0b3768]"><TriangleAlert aria-hidden="true" className="size-5" /></span><span><strong>Revisión prioritaria</strong><small>Ají Sur · Lectura de demostración</small></span></div>
        </div>
      </div>
    </div>
  </section>
}
