'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f4f7f3] px-5 py-12">
      <section className="w-full max-w-2xl rounded-[2rem] border border-[#dce8de] bg-white p-8 text-center sm:p-12">
        <p className="section-kicker">No pudimos cargar esta vista</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-[#071f42]">Intenta nuevamente.</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#5f6978]">Tus datos guardados no se eliminaron. Puedes reintentar la carga o volver al inicio.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="primary-button">Reintentar</button>
          <Link href="/" className="secondary-button">Volver al inicio</Link>
        </div>
      </section>
    </main>
  )
}
