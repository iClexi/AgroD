'use client'

import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'

export function DemoForm() {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setMessage(null)
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    try {
      const response = await fetch('/api/demo-requests', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: form.get('name'), phone: form.get('phone'), email: form.get('email'), province: form.get('province'), crop: form.get('crop'), farmSize: form.get('farmSize'), message: form.get('message') }) })
      const body = (await response.json()) as { error?: string }
      if (!response.ok) throw new Error(body.error || 'No se pudo guardar la solicitud.')
      formElement.reset()
      setMessage({ ok: true, text: 'Solicitud guardada. El equipo de AgroD podrá revisarla desde el servidor.' })
    } catch (error) { setMessage({ ok: false, text: error instanceof Error ? error.message : 'No se pudo guardar la solicitud.' }) }
    finally { setPending(false) }
  }

  return <section id="contacto" className="bg-[#071f42] py-24 text-white lg:py-32"><div className="mx-auto grid w-full max-w-[1480px] gap-12 px-4 sm:px-6 lg:grid-cols-[.82fr_1.18fr] lg:px-8 xl:px-10"><div><p className="section-kicker text-[#8ed09f]">Solicita una demostración</p><h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-balance sm:text-5xl lg:text-6xl">Ve AgroD trabajando con una finca como la tuya.</h2><p className="mt-6 max-w-xl text-xl leading-8 text-white/70">Cuéntanos qué cultivas y el tamaño aproximado. Esta solicitud queda guardada en AgroD para una futura coordinación comercial.</p><div className="mt-10 rounded-2xl border border-white/12 bg-white/5 p-5 text-sm leading-6 text-white/65"><strong className="block text-white">Nota del prototipo</strong>El formulario guarda la solicitud, pero todavía no envía correos ni mensajes automáticos.</div></div><form onSubmit={submit} className="rounded-[2rem] bg-white p-6 text-[#172033] sm:p-9"><div className="grid gap-5 sm:grid-cols-2"><label><span className="form-label">Nombre</span><input className="form-input mt-2" name="name" required minLength={2} maxLength={100} /></label><label><span className="form-label">Teléfono</span><input className="form-input mt-2" name="phone" type="tel" inputMode="tel" required minLength={7} maxLength={30} /></label><label><span className="form-label">Correo</span><input className="form-input mt-2" name="email" type="email" inputMode="email" required maxLength={160} /></label><label><span className="form-label">Provincia</span><input className="form-input mt-2" name="province" required minLength={2} maxLength={80} /></label><label><span className="form-label">Cultivo principal</span><input className="form-input mt-2" name="crop" required minLength={2} maxLength={100} /></label><label><span className="form-label">Tamaño aproximado</span><input className="form-input mt-2" name="farmSize" required maxLength={80} placeholder="Ej. 25 tareas" /></label><label className="sm:col-span-2"><span className="form-label">¿Qué deseas monitorear?</span><textarea className="form-input mt-2 min-h-28 resize-y" name="message" maxLength={2000} /></label></div>{message ? <div role={message.ok ? 'status' : 'alert'} className={`mt-5 flex gap-3 rounded-xl border px-4 py-3 text-sm font-bold ${message.ok ? 'border-[#167a35]/25 bg-[#f2f8f3] text-[#0d5a29]' : 'border-[#d8483e]/25 bg-[#fff3f1] text-[#a52f28]'}`}>{message.ok ? <CheckCircle2 aria-hidden="true" className="size-5 shrink-0" /> : null}{message.text}</div> : null}<button type="submit" className="primary-button mt-6 w-full sm:w-auto" disabled={pending}>{pending ? 'Guardando…' : 'Guardar solicitud'}<Send aria-hidden="true" className="size-4" /></button></form></div></section>
}
