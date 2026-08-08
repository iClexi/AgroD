import Link from 'next/link'
import { Logo } from '@/components/agro/logo'

export function AuthShell({
  title,
  description,
  children,
  footer,
}: {
  title: string
  description: string
  children: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-[#f2f8f3] px-4 py-6 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(480px,0.95fr)] lg:p-0">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#071f42] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div aria-hidden="true" className="field-lines absolute inset-0 opacity-25" />
        <Link href="/" className="relative w-fit rounded-xl bg-white px-4 py-3 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white">
          <Logo />
        </Link>
        <div className="relative max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#8ed09f]">Monitoreo inteligente</p>
          <p className="mt-5 font-display text-5xl font-extrabold leading-[1.05] text-balance xl:text-6xl">
            Cuida tus cultivos con datos, no con adivinanzas.
          </p>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
            Revisa tu finca, conecta dispositivos y decide qué atender primero desde un solo lugar.
          </p>
        </div>
        <p className="relative text-sm text-white/60">AgroTech Dominicana</p>
      </section>

      <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-xl items-center lg:min-h-screen lg:px-12 xl:px-20">
        <div className="w-full rounded-[2rem] border border-[#dce8de] bg-white p-6 shadow-[0_24px_80px_-48px_rgba(7,31,66,.45)] sm:p-10 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
          <Link href="/" className="mb-10 inline-flex lg:hidden">
            <Logo />
          </Link>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-[#172033] sm:text-5xl">{title}</h1>
          <p className="mt-4 text-lg leading-7 text-[#596476]">{description}</p>
          <div className="mt-9">{children}</div>
          <div className="mt-8 border-t border-[#e4ebe5] pt-6 text-center text-base text-[#596476]">{footer}</div>
        </div>
      </section>
    </main>
  )
}
