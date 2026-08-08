'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, BatteryCharging, CheckCircle2, Eye, EyeOff, KeyRound, LoaderCircle, MapPin, Radio, Save, ShieldCheck, Signal, UserRound } from 'lucide-react'
import { Logo } from '@/components/agro/logo'
import type { Device, User } from '@/lib/types'

type Notice = { tone: 'success' | 'error'; message: string }

export function ProfileApp({ initialUser, devices }: { initialUser: User; devices: Device[] }) {
  const [user, setUser] = useState(initialUser)
  const [pending, setPending] = useState(false)
  const [passwordPending, setPasswordPending] = useState(false)
  const [notice, setNotice] = useState<Notice | null>(null)
  const [passwordNotice, setPasswordNotice] = useState<Notice | null>(null)
  const [showPasswords, setShowPasswords] = useState(false)
  const initials = `${user.firstName[0] || ''}${user.lastName[0] || ''}`.toUpperCase()

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setNotice(null)
    const form = new FormData(event.currentTarget)
    const products = String(form.get('products') || '').split(',').map((item) => item.trim()).filter(Boolean)
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: form.get('firstName'),
          lastName: form.get('lastName'),
          email: form.get('email'),
          birthDate: form.get('birthDate') || null,
          phone: form.get('phone'),
          province: form.get('province'),
          municipality: form.get('municipality'),
          producerRole: form.get('producerRole'),
          primaryCrop: form.get('primaryCrop'),
          products,
          preferredContact: form.get('preferredContact'),
          notifyEmail: form.get('notifyEmail') === 'on',
          notifyWhatsapp: form.get('notifyWhatsapp') === 'on',
        }),
      })
      const body = (await response.json()) as { user?: User; error?: string }
      if (!response.ok || !body.user) throw new Error(body.error || 'No se pudo guardar el perfil.')
      setUser(body.user)
      setNotice({ tone: 'success', message: 'Tu perfil quedó actualizado.' })
    } catch (error) {
      setNotice({ tone: 'error', message: error instanceof Error ? error.message : 'No se pudo guardar el perfil.' })
    } finally {
      setPending(false)
    }
  }

  async function changePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formElement = event.currentTarget
    setPasswordPending(true)
    setPasswordNotice(null)
    const form = new FormData(formElement)
    try {
      const response = await fetch('/api/profile/password', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ currentPassword: form.get('currentPassword'), newPassword: form.get('newPassword') }),
      })
      const body = (await response.json()) as { error?: string }
      if (!response.ok) throw new Error(body.error || 'No se pudo cambiar la contraseña.')
      formElement.reset()
      setPasswordNotice({ tone: 'success', message: 'Contraseña actualizada. Tu sesión se renovó de forma segura.' })
    } catch (error) {
      setPasswordNotice({ tone: 'error', message: error instanceof Error ? error.message : 'No se pudo cambiar la contraseña.' })
    } finally {
      setPasswordPending(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f8f4] text-foreground">
      <header className="border-b border-border bg-card"><div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-4 px-5 md:px-8"><Link href="/" aria-label="Ir al inicio"><Logo compact /></Link><Link href="/panel" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold text-navy transition hover:border-primary hover:text-primary"><ArrowLeft aria-hidden="true" className="size-4" />Volver al panel</Link></div></header>

      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 md:px-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:py-12">
        <aside className="h-fit rounded-3xl bg-navy p-6 text-navy-foreground lg:sticky lg:top-6"><span className="flex size-20 items-center justify-center rounded-2xl bg-primary font-display text-2xl font-bold text-primary-foreground">{initials || 'AD'}</span><h1 className="mt-5 font-display text-2xl font-bold">{user.fullName}</h1><p className="mt-1 break-all text-sm text-white/60">{user.email}</p><dl className="mt-7 space-y-4 border-t border-white/10 pt-6"><ProfileFact icon={MapPin} label="Ubicación" value={[user.municipality, user.province].filter(Boolean).join(', ') || 'Sin completar'} /><ProfileFact icon={UserRound} label="Actividad" value={user.producerRole} /><ProfileFact icon={Radio} label="Equipos registrados" value={String(devices.length)} /></dl><p className="mt-7 rounded-xl bg-white/8 p-4 text-xs leading-5 text-white/60">Tu información ayuda a personalizar la plataforma y se mantiene separada de las cuentas de otros productores.</p></aside>

        <div className="space-y-6">
          <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8"><div className="flex items-start gap-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><UserRound aria-hidden="true" className="size-5" /></span><div><h2 className="font-display text-2xl font-bold">Datos personales y agrícolas</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">Actualiza cómo apareces en AgroD y qué produces en tu finca.</p></div></div>
            <form onSubmit={saveProfile} className="mt-7"><div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nombre"><input className="form-input mt-2" name="firstName" autoComplete="given-name" required minLength={2} maxLength={50} defaultValue={user.firstName} /></Field>
              <Field label="Apellido"><input className="form-input mt-2" name="lastName" autoComplete="family-name" required minLength={2} maxLength={70} defaultValue={user.lastName} /></Field>
              <Field label="Correo electrónico"><input className="form-input mt-2" name="email" type="email" autoComplete="email" required maxLength={160} defaultValue={user.email} /></Field>
              <Field label="Fecha de nacimiento"><input className="form-input mt-2" name="birthDate" type="date" max={new Date().toISOString().slice(0, 10)} defaultValue={user.birthDate || ''} /></Field>
              <Field label="Teléfono"><input className="form-input mt-2" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} defaultValue={user.phone} placeholder="809 000 0000" /></Field>
              <Field label="Tipo de usuario"><select className="form-input mt-2" name="producerRole" defaultValue={user.producerRole}>{['Propietario o encargado', 'Productor', 'Técnico agrícola', 'Agrónomo', 'Colaborador'].map((role) => <option key={role}>{role}</option>)}</select></Field>
              <Field label="Provincia"><input className="form-input mt-2" name="province" maxLength={80} defaultValue={user.province} placeholder="La Vega" /></Field>
              <Field label="Municipio"><input className="form-input mt-2" name="municipality" maxLength={80} defaultValue={user.municipality} placeholder="Constanza" /></Field>
              <Field label="Cultivo principal"><input className="form-input mt-2" name="primaryCrop" maxLength={100} defaultValue={user.primaryCrop} placeholder="Tomate" /></Field>
              <Field label="Contacto preferido"><select className="form-input mt-2" name="preferredContact" defaultValue={user.preferredContact}><option value="email">Correo electrónico</option><option value="whatsapp">WhatsApp</option><option value="phone">Llamada telefónica</option></select></Field>
              <Field label="Productos que cultivas" className="sm:col-span-2"><input className="form-input mt-2" name="products" maxLength={800} defaultValue={user.products.join(', ')} placeholder="Tomate, plátano, ají" /><span className="mt-2 block text-xs text-muted-foreground">Sepáralos con comas.</span></Field>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2"><Toggle name="notifyEmail" defaultChecked={user.notifyEmail} title="Alertas por correo" text="Recibir avisos importantes en tu correo." /><Toggle name="notifyWhatsapp" defaultChecked={user.notifyWhatsapp} title="Alertas por WhatsApp" text="Dejar preparada esta preferencia para la integración futura." /></div>
            {notice ? <NoticeBox notice={notice} /> : null}
            <button type="submit" className="primary-button mt-6" disabled={pending}>{pending ? <LoaderCircle aria-hidden="true" className="size-5 animate-spin" /> : <Save aria-hidden="true" className="size-5" />}{pending ? 'Guardando…' : 'Guardar perfil'}</button>
            </form>
          </section>

          <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8"><div className="flex items-start gap-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy"><Radio aria-hidden="true" className="size-5" /></span><div><h2 className="font-display text-2xl font-bold">Mis productos AgroD</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">Consulta en un solo lugar los equipos asociados a tu cuenta y su estado.</p></div></div>{devices.length ? <div className="mt-6 grid gap-4 sm:grid-cols-2">{devices.map((device) => <article key={device.id} className="rounded-2xl border border-border p-4"><div className="flex items-center justify-between gap-3"><span className={`device-state ${device.status === 'online' ? 'device-online' : device.status === 'maintenance' ? 'device-maintenance' : 'device-offline'}`}>{device.status === 'online' ? 'En línea' : device.status === 'maintenance' ? 'Mantenimiento' : 'Sin conexión'}</span><span className="text-xs text-muted-foreground">{device.serial}</span></div><h3 className="mt-4 font-display text-lg font-bold">{device.model}</h3><p className="mt-1 text-sm text-muted-foreground">{device.name}</p><dl className="mt-4 grid grid-cols-2 gap-2"><div className="device-metric"><dt><BatteryCharging aria-hidden="true" className="size-3.5" />Batería</dt><dd>{device.battery === null ? 'Sin dato' : `${device.battery}%`}</dd></div><div className="device-metric"><dt><Signal aria-hidden="true" className="size-3.5" />Señal</dt><dd>{device.signal === null ? 'Sin dato' : `${device.signal}%`}</dd></div></dl></article>)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-border p-8 text-center"><Radio aria-hidden="true" className="mx-auto size-8 text-primary" /><p className="mt-3 font-semibold">Todavía no hay equipos registrados.</p><Link href="/panel" className="mt-4 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline">Agregar un dispositivo desde el panel</Link></div>}</section>

          <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8"><div className="flex items-start gap-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#eef5ff] text-navy"><ShieldCheck aria-hidden="true" className="size-5" /></span><div><h2 className="font-display text-2xl font-bold">Seguridad de la cuenta</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">Cambia tu contraseña usando la actual para confirmar tu identidad.</p></div></div><form onSubmit={changePassword} className="mt-7"><div className="grid gap-5 sm:grid-cols-2"><Field label="Contraseña actual"><span className="relative mt-2 block"><input className="form-input pr-12" name="currentPassword" type={showPasswords ? 'text' : 'password'} autoComplete="current-password" required maxLength={128} /><button type="button" onClick={() => setShowPasswords((value) => !value)} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted-foreground" aria-label={showPasswords ? 'Ocultar contraseñas' : 'Mostrar contraseñas'}>{showPasswords ? <EyeOff aria-hidden="true" className="size-5" /> : <Eye aria-hidden="true" className="size-5" />}</button></span></Field><Field label="Nueva contraseña"><input className="form-input mt-2" name="newPassword" type={showPasswords ? 'text' : 'password'} autoComplete="new-password" required minLength={10} maxLength={128} aria-describedby="new-password-help" /><span id="new-password-help" className="mt-2 block text-xs text-muted-foreground">Mínimo 10 caracteres, una letra y un número.</span></Field></div>{passwordNotice ? <NoticeBox notice={passwordNotice} /> : null}<button type="submit" className="secondary-button mt-6" disabled={passwordPending}>{passwordPending ? <LoaderCircle aria-hidden="true" className="size-5 animate-spin" /> : <KeyRound aria-hidden="true" className="size-5" />}{passwordPending ? 'Actualizando…' : 'Cambiar contraseña'}</button></form></section>
        </div>
      </div>
    </main>
  )
}

function Field({ label, className = '', children }: { label: string; className?: string; children: React.ReactNode }) { return <label className={className}><span className="form-label">{label}</span>{children}</label> }
function Toggle({ name, title, text, defaultChecked }: { name: string; title: string; text: string; defaultChecked: boolean }) { return <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-4"><input className="mt-1 size-5 accent-[#167a35]" name={name} type="checkbox" defaultChecked={defaultChecked} /><span><strong className="block text-sm">{title}</strong><span className="mt-1 block text-xs leading-5 text-muted-foreground">{text}</span></span></label> }
function NoticeBox({ notice }: { notice: Notice }) { return <div role={notice.tone === 'error' ? 'alert' : 'status'} className={`mt-5 flex gap-3 rounded-xl border px-4 py-3 text-sm font-semibold ${notice.tone === 'success' ? 'border-primary/25 bg-primary/8 text-primary' : 'border-[#d8483e]/25 bg-[#fff3f1] text-[#a52f28]'}`}>{notice.tone === 'success' ? <CheckCircle2 aria-hidden="true" className="size-5 shrink-0" /> : null}{notice.message}</div> }
function ProfileFact({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) { return <div className="flex gap-3"><Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#8ed09f]" /><div><dt className="text-xs text-white/50">{label}</dt><dd className="mt-1 text-sm font-semibold text-white/85">{value}</dd></div></div> }
