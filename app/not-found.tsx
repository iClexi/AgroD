import Link from 'next/link'
import { Logo } from '@/components/agro/logo'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7f3] px-5 py-12">
      <section className="w-full max-w-2xl rounded-[2rem] border border-[#dce8de] bg-white p-8 text-center shadow-[0_24px_70px_-45px_rgba(7,31,66,.35)] sm:p-12">
        <Link href="/" aria-label="Volver al inicio de AgroD" className="inline-flex"><Logo /></Link>
        <p className="section-kicker mt-10">Página no encontrada</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-[#071f42] sm:text-5xl">Esta ruta no existe en AgroD.</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#5f6978]">Vuelve a la página principal o entra al panel para continuar con la gestión de tu finca.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="primary-button">Ir al inicio</Link>
          <Link href="/panel" className="secondary-button">Entrar al panel</Link>
        </div>
      </section>
    </main>
  )
}
