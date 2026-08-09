'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AlertTriangle, ArrowRight, BatteryCharging, Bell, CheckCircle2, Droplets, LayoutDashboard, MapPinned, Radio, Route, Signal, Sprout, ThermometerSun, Volume2 } from 'lucide-react'
import { Logo } from './logo'
import { Reveal } from './reveal'

type DemoView = 'resumen' | 'cultivos' | 'dispositivos' | 'alertas'

const views: Array<{ id: DemoView; label: string; icon: typeof LayoutDashboard }> = [
  { id: 'resumen', label: 'Resumen', icon: LayoutDashboard },
  { id: 'cultivos', label: 'Cultivos', icon: Sprout },
  { id: 'dispositivos', label: 'Dispositivos', icon: Radio },
  { id: 'alertas', label: 'Alertas', icon: Bell },
]

export function DemoExperience() {
  const [view, setView] = useState<DemoView>('resumen')
  const [buzzed, setBuzzed] = useState(false)

  function buzz() {
    setBuzzed(true)
    window.setTimeout(() => setBuzzed(false), 3500)
  }

  return (
    <section id="demo" className="py-10">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="overflow-hidden rounded-[2rem] bg-navy text-navy-foreground shadow-[0_40px_100px_-55px_rgba(7,31,66,.85)]">
          <div className="grid lg:grid-cols-[.65fr_1.35fr]">
            <div className="relative overflow-hidden px-6 py-10 md:px-8 lg:py-12">
              <div aria-hidden="true" className="demo-field-bg absolute inset-0 opacity-25" />
              <div className="relative"><p className="text-sm font-semibold uppercase tracking-wider text-[#8ed09f]">La plataforma, sin explicaciones largas</p><h2 className="mt-3 text-balance font-display text-4xl font-bold leading-tight">Abre el panel. Ya sabes por dónde empezar.</h2><p className="mt-4 leading-7 text-white/72">La finca de ejemplo reúne lecturas, mapa, alertas y equipos para que pruebes la experiencia antes de registrarte.</p>
                <ul className="mt-6 space-y-3 text-sm text-white/78"><li className="flex gap-3"><CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#8ed09f]" />Cambia de vista y revisa prioridades reales</li><li className="flex gap-3"><MapPinned aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#8ed09f]" />Prueba el mapa y el localizador de equipos</li></ul>
                <div className="mt-7 flex flex-col gap-3"><Link href="/registro" className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">Crear mi finca<ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" /></Link><Link href="/iniciar-sesion" className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10">Iniciar sesión</Link></div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-[#f4f8f4] p-3 text-foreground sm:p-4 lg:p-5">
              <div aria-hidden="true" className="demo-data-sweep" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-4 py-3 sm:px-5"><Logo compact /><div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-navy"><span className="relative flex size-2"><span className="signal-ping absolute inline-flex size-full rounded-full bg-primary" /><span className="relative inline-flex size-2 rounded-full bg-primary" /></span>Finca demostrativa</div></div>
                <nav className="grid grid-cols-2 border-b border-border/70 bg-background/70 sm:grid-cols-4" aria-label="Vistas de la demostración">{views.map((item) => <button type="button" key={item.id} onClick={() => setView(item.id)} className={`flex min-h-12 items-center justify-center gap-2 px-2 text-xs font-semibold transition-colors ${view === item.id ? 'bg-card text-primary shadow-[inset_0_-2px_0_var(--primary)]' : 'text-muted-foreground hover:bg-card hover:text-foreground'}`}><item.icon aria-hidden="true" className="size-4" />{item.label}</button>)}</nav>
                <div key={view} className="demo-panel-in min-h-[390px] p-4 sm:p-5">
                  {view === 'resumen' ? <SummaryDemo /> : null}
                  {view === 'cultivos' ? <CropsDemo /> : null}
                  {view === 'dispositivos' ? <DevicesDemo buzzed={buzzed} onBuzz={buzz} /> : null}
                  {view === 'alertas' ? <AlertsDemo /> : null}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function SummaryDemo() {
  return <><div><p className="text-xs font-semibold text-primary">La Vega · Lecturas ilustrativas</p><h3 className="mt-1 font-display text-2xl font-bold">Buenos días. Estas son tus prioridades.</h3></div><div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4"><DemoMetric icon={Droplets} label="Humedad" value="41%" /><DemoMetric icon={ThermometerSun} label="Temperatura" value="29 °C" /><DemoMetric icon={AlertTriangle} label="Atención" value="2 zonas" /><DemoMetric icon={Signal} label="Conectados" value="2 equipos" /></div><div className="mt-4 grid gap-4 sm:grid-cols-[1.15fr_.85fr]"><div className="rounded-2xl border border-border p-4"><div className="flex items-center justify-between"><p className="font-semibold">Finca virtual</p><span className="text-xs font-semibold text-primary">Ruta activa</span></div><div className="mini-farm mt-3 h-[155px]"><span className="mini-marker marker-one">1</span><span className="mini-marker marker-two">2</span><span className="mini-marker marker-three">3</span></div></div><div className="rounded-2xl bg-navy p-4 text-navy-foreground"><div className="flex items-center gap-2"><Route aria-hidden="true" className="size-4 text-[#8ed09f]" /><p className="font-semibold">Orden recomendado</p></div><ol className="mt-4 space-y-3 text-sm text-white/75"><li>1. Ají Sur</li><li>2. Tomate Norte</li><li>3. Plátano Este</li></ol></div></div></>
}

function DemoMetric({ icon: Icon, label, value }: { icon: typeof Droplets; label: string; value: string }) {
  return <div className="rounded-xl border border-border bg-background p-3"><Icon aria-hidden="true" className="size-4 text-primary" /><p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p><p className="mt-1 font-display text-lg font-bold">{value}</p></div>
}

function CropsDemo() {
  return <div><div className="flex items-end justify-between gap-3"><div><p className="text-xs font-semibold text-primary">Cultivos y zonas</p><h3 className="mt-1 font-display text-2xl font-bold">Tres zonas registradas</h3></div><span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">24 tareas</span></div><div className="mt-5 space-y-3"><CropRow name="Ají Sur" crop="Ají cubanela · Fila 7, columna 3" value="22% humedad" tone="critical" /><CropRow name="Tomate Norte" crop="Tomate Barceló · Fila 2, columna 2" value="31% humedad" tone="attention" /><CropRow name="Plátano Este" crop="Plátano FHIA-21 · Fila 4, columna 6" value="47% humedad" tone="stable" /></div></div>
}

function CropRow({ name, crop, value, tone }: { name: string; crop: string; value: string; tone: 'critical' | 'attention' | 'stable' }) {
  const labels = { critical: 'Crítico', attention: 'Atención', stable: 'Estable' }
  return <article className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2"><Sprout aria-hidden="true" className="size-4 text-primary" /><h4 className="font-semibold">{name}</h4></div><p className="mt-1 text-xs text-muted-foreground">{crop}</p></div><div className="flex items-center gap-3"><span className={`status-badge status-${tone}`}>{labels[tone]}</span><strong className="text-sm">{value}</strong></div></article>
}

function DevicesDemo({ buzzed, onBuzz }: { buzzed: boolean; onBuzz: () => void }) {
  return <div><p className="text-xs font-semibold text-primary">Equipos AgroD</p><h3 className="mt-1 font-display text-2xl font-bold">Hardware y software, conectados</h3><div className="mt-5 grid gap-4 sm:grid-cols-2"><DeviceCard model="AgroD Terra 500X" name="Sensor de suelo Norte" battery={82} signal={91} buzzed={buzzed} onBuzz={onBuzz} /><DeviceCard model="AgroD Clima 600X" name="Estación climática Central" battery={76} signal={86} /></div>{buzzed ? <div role="status" className="mt-4 flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/8 p-4 text-sm text-primary"><Volume2 aria-hidden="true" className="mt-0.5 size-5 shrink-0" /><span><strong className="block">Señal de localización enviada</strong>El Terra 500X simula el zumbido para ayudarte a encontrar la zona.</span></div> : null}</div>
}

function DeviceCard({ model, name, battery, signal, buzzed, onBuzz }: { model: string; name: string; battery: number; signal: number; buzzed?: boolean; onBuzz?: () => void }) {
  return <article className={`rounded-2xl border p-4 transition ${buzzed ? 'border-primary shadow-[0_0_0_3px_rgba(22,122,53,.12)]' : 'border-border'}`}><div className="flex items-center justify-between"><span className="flex size-10 items-center justify-center rounded-xl bg-navy text-navy-foreground"><Radio aria-hidden="true" className="size-5" /></span><span className="device-state device-online">En línea</span></div><h4 className="mt-4 font-display text-lg font-bold">{model}</h4><p className="mt-1 text-xs text-muted-foreground">{name}</p><dl className="mt-4 grid grid-cols-2 gap-2"><div className="device-metric"><dt><BatteryCharging aria-hidden="true" className="size-3.5" />Batería</dt><dd>{battery}%</dd></div><div className="device-metric"><dt><Signal aria-hidden="true" className="size-3.5" />Señal</dt><dd>{signal}%</dd></div></dl>{onBuzz ? <button type="button" onClick={onBuzz} className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full border border-border text-xs font-semibold text-navy transition hover:border-primary hover:text-primary"><Volume2 aria-hidden="true" className="size-4" />{buzzed ? 'Sonando…' : 'Hacer sonar'}</button> : null}</article>
}

function AlertsDemo() {
  return <div><p className="text-xs font-semibold text-primary">Alertas y recomendaciones</p><h3 className="mt-1 font-display text-2xl font-bold">Qué revisar primero y por qué</h3><div className="mt-5 space-y-3"><AlertRow icon={AlertTriangle} title="Inspección prioritaria" detail="Ají Sur tiene humedad baja. Confirma la lectura y revisa el riego." tone="critical" /><AlertRow icon={Droplets} title="Revisar riego" detail="Tomate Norte está cerca del límite inferior definido." tone="attention" /><AlertRow icon={CheckCircle2} title="Condiciones favorables" detail="Plátano Este se mantiene dentro del rango esperado." tone="stable" /></div></div>
}

function AlertRow({ icon: Icon, title, detail, tone }: { icon: typeof Bell; title: string; detail: string; tone: 'critical' | 'attention' | 'stable' }) {
  const iconStyle = { critical: 'bg-[#fff0ed] text-[#a52f28]', attention: 'bg-[#fff5d8] text-[#825a00]', stable: 'bg-[#eaf7ed] text-[#0d6b2c]' }
  return <article className="flex gap-3 rounded-xl border border-border p-4"><span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconStyle[tone]}`}><Icon aria-hidden="true" className="size-5" /></span><div><h4 className="font-semibold">{title}</h4><p className="mt-1 text-sm leading-6 text-muted-foreground">{detail}</p></div></article>
}
