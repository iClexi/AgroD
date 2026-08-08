'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertTriangle,
  BatteryCharging,
  Bell,
  ChartNoAxesCombined,
  CircleGauge,
  Cpu,
  Droplets,
  Edit3,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  Plus,
  Radio,
  RefreshCcw,
  Route,
  Sprout,
  ThermometerSun,
  Trash2,
  Volume2,
  X,
} from 'lucide-react'
import { Logo } from '@/components/agro/logo'
import { DeviceForm, FarmForm, PlantForm } from '@/components/panel/panel-forms'
import { FarmMap } from '@/components/panel/farm-map'
import { buildInspectionRoute } from '@/lib/route-planner'
import type { DashboardData, Device, Farm, Plant, User } from '@/lib/types'

type View = 'summary' | 'map' | 'plants' | 'devices' | 'alerts'
type Modal =
  | { kind: 'farm'; value?: Farm }
  | { kind: 'plant'; value?: Plant }
  | { kind: 'device'; value?: Device }
  | null

const navItems: Array<{ id: View; label: string; mobileLabel: string; icon: typeof LayoutDashboard }> = [
  { id: 'summary', label: 'Resumen', mobileLabel: 'Resumen', icon: LayoutDashboard },
  { id: 'map', label: 'Finca virtual', mobileLabel: 'Finca', icon: Map },
  { id: 'plants', label: 'Cultivos', mobileLabel: 'Cultivos', icon: Sprout },
  { id: 'devices', label: 'Dispositivos', mobileLabel: 'Equipos', icon: Radio },
  { id: 'alerts', label: 'Alertas', mobileLabel: 'Alertas', icon: Bell },
]

const titles: Record<View, { title: string; description: string }> = {
  summary: { title: 'Resumen de la finca', description: 'Lecturas y prioridades para decidir qué revisar hoy.' },
  map: { title: 'Finca virtual', description: 'Ubica cada cultivo y sigue un orden de inspección recomendado.' },
  plants: { title: 'Cultivos y zonas', description: 'Registra lecturas, ubicación y dispositivo asociado.' },
  devices: { title: 'Dispositivos AgroD', description: 'Administra sensores, estado de conexión y localización.' },
  alerts: { title: 'Alertas y recomendaciones', description: 'Comprende qué requiere atención y por qué.' },
}

const statusLabel = { stable: 'Estable', attention: 'Atención', critical: 'Crítico', no_data: 'Sin datos' }

async function apiRequest<T>(url: string, method: string, payload?: unknown): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: payload === undefined ? undefined : { 'content-type': 'application/json' },
    body: payload === undefined ? undefined : JSON.stringify(payload),
  })
  const body = (await response.json()) as T & { error?: string }
  if (!response.ok) throw new Error(body.error || 'No se pudo completar la operación.')
  return body
}

export function PanelApp({ user, initialData }: { user: User; initialData: DashboardData }) {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [view, setView] = useState<View>('summary')
  const [activeFarmId, setActiveFarmId] = useState(initialData.farms[0]?.id || '')
  const [modal, setModal] = useState<Modal>(null)
  const [pending, setPending] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [notice, setNotice] = useState<{ tone: 'success' | 'error' | 'info'; message: string } | null>(null)

  const activeFarm = data.farms.find((farm) => farm.id === activeFarmId) || data.farms[0] || null
  const farmPlants = useMemo(() => data.plants.filter((plant) => plant.farmId === activeFarm?.id), [data.plants, activeFarm?.id])
  const farmDevices = useMemo(() => data.devices.filter((device) => device.farmId === activeFarm?.id), [data.devices, activeFarm?.id])

  function showNotice(message: string, tone: 'success' | 'error' | 'info' = 'success') {
    setNotice({ message, tone })
    window.setTimeout(() => setNotice(null), 5500)
  }

  function selectView(next: View) {
    setView(next)
    setMenuOpen(false)
  }

  async function saveFarm(value: { name: string; province: string; rows: number; columns: number }) {
    setPending(true)
    try {
      if (modal?.kind === 'farm' && modal.value) {
        const result = await apiRequest<{ farm: Farm }>(`/api/farms/${modal.value.id}`, 'PATCH', value)
        setData((current) => ({ ...current, farms: current.farms.map((farm) => farm.id === result.farm.id ? result.farm : farm) }))
        showNotice('Finca actualizada.')
      } else {
        const result = await apiRequest<{ farm: Farm }>('/api/farms', 'POST', value)
        setData((current) => ({ ...current, farms: [result.farm, ...current.farms] }))
        setActiveFarmId(result.farm.id)
        showNotice('Finca creada. Ya puedes agregar cultivos y dispositivos.')
      }
      setModal(null)
    } catch (error) {
      showNotice(error instanceof Error ? error.message : 'No se pudo guardar la finca.', 'error')
    } finally {
      setPending(false)
    }
  }

  async function savePlant(value: Record<string, unknown>) {
    setPending(true)
    try {
      if (modal?.kind === 'plant' && modal.value) {
        const result = await apiRequest<{ plant: Plant }>(`/api/plants/${modal.value.id}`, 'PATCH', value)
        setData((current) => ({ ...current, plants: current.plants.map((plant) => plant.id === result.plant.id ? result.plant : plant) }))
        showNotice('Cultivo actualizado.')
      } else {
        const result = await apiRequest<{ plant: Plant }>('/api/plants', 'POST', value)
        setData((current) => ({ ...current, plants: [result.plant, ...current.plants] }))
        showNotice('Cultivo agregado al mapa.')
      }
      setModal(null)
    } catch (error) {
      showNotice(error instanceof Error ? error.message : 'No se pudo guardar el cultivo.', 'error')
    } finally {
      setPending(false)
    }
  }

  async function saveDevice(value: Record<string, unknown>) {
    setPending(true)
    try {
      if (modal?.kind === 'device' && modal.value) {
        const result = await apiRequest<{ device: Device }>(`/api/devices/${modal.value.id}`, 'PATCH', value)
        setData((current) => ({ ...current, devices: current.devices.map((device) => device.id === result.device.id ? result.device : device) }))
        showNotice('Dispositivo actualizado.')
      } else {
        const result = await apiRequest<{ device: Device }>('/api/devices', 'POST', value)
        setData((current) => ({ ...current, devices: [result.device, ...current.devices] }))
        showNotice('Dispositivo agregado.')
      }
      setModal(null)
    } catch (error) {
      showNotice(error instanceof Error ? error.message : 'No se pudo guardar el dispositivo.', 'error')
    } finally {
      setPending(false)
    }
  }

  async function removePlant(plant: Plant) {
    if (!window.confirm(`Eliminar ${plant.name}. Esta acción no se puede deshacer.`)) return
    try {
      await apiRequest(`/api/plants/${plant.id}`, 'DELETE')
      setData((current) => ({ ...current, plants: current.plants.filter((item) => item.id !== plant.id) }))
      showNotice('Cultivo eliminado.')
    } catch (error) { showNotice(error instanceof Error ? error.message : 'No se pudo eliminar.', 'error') }
  }

  async function removeDevice(device: Device) {
    if (!window.confirm(`Eliminar ${device.name}. Los cultivos vinculados quedarán sin dispositivo.`)) return
    try {
      await apiRequest(`/api/devices/${device.id}`, 'DELETE')
      setData((current) => ({
        ...current,
        devices: current.devices.filter((item) => item.id !== device.id),
        plants: current.plants.map((plant) => plant.deviceId === device.id ? { ...plant, deviceId: null } : plant),
      }))
      showNotice('Dispositivo eliminado.')
    } catch (error) { showNotice(error instanceof Error ? error.message : 'No se pudo eliminar.', 'error') }
  }

  async function removeFarm(farm: Farm) {
    if (!window.confirm(`Eliminar ${farm.name} junto con sus cultivos y dispositivos. Esta acción no se puede deshacer.`)) return
    try {
      await apiRequest(`/api/farms/${farm.id}`, 'DELETE')
      const remaining = data.farms.filter((item) => item.id !== farm.id)
      setData((current) => ({
        ...current,
        farms: remaining,
        plants: current.plants.filter((plant) => plant.farmId !== farm.id),
        devices: current.devices.filter((device) => device.farmId !== farm.id),
      }))
      setActiveFarmId(remaining[0]?.id || '')
      showNotice('Finca eliminada.')
    } catch (error) { showNotice(error instanceof Error ? error.message : 'No se pudo eliminar.', 'error') }
  }

  async function buzz(device: Device) {
    try {
      const result = await apiRequest<{ command: DashboardData['buzzCommands'][number]; message: string }>(`/api/devices/${device.id}/buzz`, 'POST')
      setData((current) => ({ ...current, buzzCommands: [result.command, ...current.buzzCommands].slice(0, 20) }))
      showNotice(result.message, 'info')
    } catch (error) { showNotice(error instanceof Error ? error.message : 'No se pudo enviar la orden.', 'error') }
  }

  async function logout() {
    try {
      await apiRequest('/api/auth/logout', 'POST')
      router.push('/')
      router.refresh()
    } catch (error) { showNotice(error instanceof Error ? error.message : 'No se pudo cerrar la sesión.', 'error') }
  }

  const heading = titles[view]
  const initials = user.fullName.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()

  return (
    <div className="min-h-screen bg-[#f5f8f6] text-[#172033] lg:grid lg:grid-cols-[282px_minmax(0,1fr)]">
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[282px] flex-col bg-[#071f42] p-5 text-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <span className="rounded-xl bg-white px-3 py-2"><Logo /></span>
          <button type="button" className="icon-button border-white/15 text-white hover:bg-white/10 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"><X aria-hidden="true" className="size-5" /></button>
        </div>

        <div className="mt-8">
          <label className="text-xs font-bold uppercase tracking-[0.16em] text-white/55" htmlFor="farm-select">Finca activa</label>
          <select id="farm-select" value={activeFarm?.id || ''} onChange={(event) => setActiveFarmId(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-white/8 px-3 text-sm font-bold text-white outline-none focus:border-[#8ed09f]" disabled={data.farms.length === 0}>
            {data.farms.length === 0 ? <option value="">Sin fincas</option> : data.farms.map((farm) => <option className="text-[#172033]" value={farm.id} key={farm.id}>{farm.name}</option>)}
          </select>
        </div>

        <nav className="mt-7 space-y-1" aria-label="Panel AgroD">
          {navItems.map((item) => {
            const Icon = item.icon
            return <button key={item.id} type="button" onClick={() => selectView(item.id)} className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-bold transition ${view === item.id ? 'bg-white text-[#071f42]' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}><Icon aria-hidden="true" className={`size-5 ${view === item.id ? 'text-[#167a35]' : ''}`} />{item.label}</button>
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-5">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#167a35] text-sm font-extrabold">{initials}</span>
            <div className="min-w-0"><p className="truncate text-sm font-bold">{user.fullName}</p><p className="truncate text-xs text-white/55">{user.email}</p></div>
          </div>
          <button type="button" onClick={logout} className="mt-4 flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-bold text-white/70 hover:bg-white/10 hover:text-white"><LogOut aria-hidden="true" className="size-5" />Cerrar sesión</button>
        </div>
      </aside>
      {menuOpen ? <button aria-label="Cerrar menú" className="fixed inset-0 z-40 bg-[#071f42]/50 lg:hidden" onClick={() => setMenuOpen(false)} /> : null}

      <main className="min-w-0 pb-20 lg:pb-0">
        <header className="sticky top-0 z-30 border-b border-[#dce8de] bg-white/92 px-4 py-3 backdrop-blur-lg sm:px-6 lg:px-8 xl:px-10">
          <div className="mx-auto flex min-h-12 max-w-[1480px] items-center justify-between gap-4">
            <button type="button" onClick={() => setMenuOpen(true)} className="icon-button lg:hidden" aria-label="Abrir menú"><Menu aria-hidden="true" className="size-5" /></button>
            <div className="min-w-0"><p className="truncate text-sm font-bold text-[#172033]">{activeFarm?.name || 'Configura tu primera finca'}</p><p className="mt-0.5 truncate text-xs text-[#6b7483]">{activeFarm ? `${activeFarm.province} · ${farmDevices.filter((device) => device.status === 'online').length} dispositivos en línea` : 'Sin datos todavía'}</p></div>
            <div className="ml-auto flex items-center gap-2">
              {activeFarm?.isDemo ? <span className="hidden rounded-full bg-[#fff5d8] px-3 py-2 text-xs font-extrabold text-[#825a00] sm:inline-flex">Datos de demostración</span> : null}
              <button type="button" onClick={() => router.refresh()} className="icon-button" aria-label="Actualizar página"><RefreshCcw aria-hidden="true" className="size-5" /></button>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1480px] px-4 py-7 sm:px-6 lg:px-8 lg:py-9 xl:px-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div><h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{heading.title}</h1><p className="mt-2 max-w-2xl text-base leading-7 text-[#5f6978]">{heading.description}</p></div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => setModal({ kind: 'farm', value: activeFarm || undefined })} className="secondary-button"><Edit3 aria-hidden="true" className="size-4" />{activeFarm ? 'Editar finca' : 'Crear finca'}</button>
              {activeFarm && (view === 'plants' || view === 'map') ? <button type="button" onClick={() => setModal({ kind: 'plant' })} className="primary-button"><Plus aria-hidden="true" className="size-5" />Agregar cultivo</button> : null}
              {activeFarm && view === 'devices' ? <button type="button" onClick={() => setModal({ kind: 'device' })} className="primary-button"><Plus aria-hidden="true" className="size-5" />Agregar dispositivo</button> : null}
            </div>
          </div>

          {!activeFarm ? (
            <div className="empty-panel mt-8"><Map aria-hidden="true" className="size-9" /><h2 className="mt-4 font-display text-2xl font-bold">Crea tu primera finca</h2><p className="mt-2 max-w-xl text-[#5f6978]">Define sus filas y columnas para empezar a ubicar cultivos y dispositivos.</p><button type="button" onClick={() => setModal({ kind: 'farm' })} className="primary-button mt-6"><Plus aria-hidden="true" className="size-5" />Crear finca</button></div>
          ) : (
            <div className="mt-8">
              {view === 'summary' ? <SummaryView plants={farmPlants} devices={farmDevices} onOpenAlerts={() => setView('alerts')} /> : null}
              {view === 'map' ? <FarmMap farm={activeFarm} plants={farmPlants} devices={farmDevices} onBuzz={buzz} /> : null}
              {view === 'plants' ? <PlantsView plants={farmPlants} devices={farmDevices} onEdit={(plant) => setModal({ kind: 'plant', value: plant })} onDelete={removePlant} onCreate={() => setModal({ kind: 'plant' })} /> : null}
              {view === 'devices' ? <DevicesView devices={farmDevices} plants={farmPlants} onEdit={(device) => setModal({ kind: 'device', value: device })} onDelete={removeDevice} onBuzz={buzz} onCreate={() => setModal({ kind: 'device' })} /> : null}
              {view === 'alerts' ? <AlertsView plants={farmPlants} onOpenMap={() => setView('map')} /> : null}
            </div>
          )}

          {activeFarm ? <div className="mt-12 flex justify-end border-t border-[#dce8de] pt-6"><button type="button" onClick={() => removeFarm(activeFarm)} className="danger-button"><Trash2 aria-hidden="true" className="size-4" />Eliminar finca</button></div> : null}
        </div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-[#dce8de] bg-white px-1 pb-[max(env(safe-area-inset-bottom),.25rem)] pt-1 shadow-[0_-12px_35px_-25px_rgba(7,31,66,.45)] lg:hidden" aria-label="Navegación móvil">
        {navItems.map((item) => { const Icon = item.icon; return <button key={item.id} type="button" onClick={() => selectView(item.id)} aria-label={item.label} className={`flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-0.5 text-[10px] font-bold ${view === item.id ? 'bg-[#f2f8f3] text-[#0d5a29]' : 'text-[#657080]'}`}><Icon aria-hidden="true" className="size-5" /><span className="max-w-full truncate">{item.mobileLabel}</span></button> })}
      </nav>

      {notice ? <div role={notice.tone === 'error' ? 'alert' : 'status'} className={`fixed bottom-20 left-1/2 z-[120] w-[min(92vw,520px)] -translate-x-1/2 rounded-xl border px-4 py-3 text-sm font-bold shadow-xl lg:bottom-6 ${notice.tone === 'error' ? 'border-[#d8483e]/30 bg-[#fff3f1] text-[#a52f28]' : notice.tone === 'info' ? 'border-[#0b3768]/25 bg-[#eef5ff] text-[#0b3768]' : 'border-[#167a35]/25 bg-[#f2f8f3] text-[#0d5a29]'}`}>{notice.message}</div> : null}

      {modal?.kind === 'farm' ? <FarmForm farm={modal.value} pending={pending} onClose={() => setModal(null)} onSubmit={saveFarm} /> : null}
      {modal?.kind === 'plant' && activeFarm ? <PlantForm plant={modal.value} farm={activeFarm} devices={farmDevices} pending={pending} onClose={() => setModal(null)} onSubmit={savePlant} /> : null}
      {modal?.kind === 'device' && activeFarm ? <DeviceForm device={modal.value} farm={activeFarm} pending={pending} onClose={() => setModal(null)} onSubmit={saveDevice} /> : null}
    </div>
  )
}

function Metric({ icon: Icon, label, value, note, tone = 'green' }: { icon: typeof Droplets; label: string; value: string; note: string; tone?: 'green' | 'blue' | 'amber' }) {
  return <div className="metric-card"><span className={`metric-icon metric-${tone}`}><Icon aria-hidden="true" className="size-5" /></span><p className="mt-5 text-sm font-bold text-[#687282]">{label}</p><p className="mt-2 font-display text-3xl font-extrabold text-[#172033]">{value}</p><p className="mt-2 text-sm text-[#687282]">{note}</p></div>
}

function SummaryView({ plants, devices, onOpenAlerts }: { plants: Plant[]; devices: Device[]; onOpenAlerts: () => void }) {
  const humidityValues = plants.flatMap((plant) => plant.humidity === null ? [] : [plant.humidity])
  const temperatureValues = plants.flatMap((plant) => plant.temperature === null ? [] : [plant.temperature])
  const average = (values: number[]) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null
  const humidity = average(humidityValues)
  const temperature = average(temperatureValues)
  const urgent = plants.filter((plant) => ['critical', 'attention'].includes(plant.status))
  const route = buildInspectionRoute(plants).slice(0, 3)

  return <>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Metric icon={Droplets} label="Humedad promedio" value={humidity === null ? 'Sin datos' : `${humidity.toFixed(0)}%`} note={`${humidityValues.length} zonas con lectura`} />
      <Metric icon={ThermometerSun} label="Temperatura promedio" value={temperature === null ? 'Sin datos' : `${temperature.toFixed(1)} °C`} note={`${temperatureValues.length} zonas con lectura`} tone="amber" />
      <Metric icon={Radio} label="Dispositivos conectados" value={`${devices.filter((device) => device.status === 'online').length} de ${devices.length}`} note="Estado registrado en AgroD" tone="blue" />
      <Metric icon={AlertTriangle} label="Requieren atención" value={String(urgent.length)} note={urgent.length ? 'Revisa las prioridades de hoy' : 'No hay alertas activas'} tone="amber" />
    </div>

    <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,.8fr)]">
      <section className="panel-card p-5 sm:p-6"><div className="flex items-center justify-between gap-4"><div><p className="section-kicker">Estado de cultivos</p><h2 className="mt-2 font-display text-2xl font-bold">Qué necesita tu atención</h2></div><button type="button" onClick={onOpenAlerts} className="text-button">Ver alertas</button></div><div className="mt-5 space-y-3">{plants.length ? plants.slice(0, 5).map((plant) => <div key={plant.id} className="flex items-center justify-between gap-4 rounded-xl bg-[#f6f8fa] px-4 py-3"><div className="min-w-0"><p className="truncate font-bold">{plant.name}</p><p className="mt-1 text-sm text-[#687282]">{plant.crop} · F{plant.row} C{plant.column}</p></div><span className={`status-badge status-${plant.status}`}>{statusLabel[plant.status]}</span></div>) : <p className="py-10 text-center text-[#687282]">Agrega un cultivo para comenzar.</p>}</div></section>
      <section className="rounded-[1.5rem] bg-[#071f42] p-5 text-white sm:p-6"><div className="flex items-center gap-3"><Route aria-hidden="true" className="size-6 text-[#8ed09f]" /><h2 className="font-display text-2xl font-bold">Primero revisa</h2></div><p className="mt-3 text-sm leading-6 text-white/65">Prioridades calculadas con lecturas y ubicación.</p><ol className="mt-5 space-y-4">{route.map((stop) => <li key={stop.plant.id} className="flex gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#167a35] text-sm font-extrabold">{stop.order}</span><span><span className="block text-sm font-bold">{stop.plant.name}</span><span className="mt-1 block text-xs text-white/60">{stop.reason}</span></span></li>)}</ol>{route.length === 0 ? <p className="mt-8 text-sm text-white/60">Todavía no hay una ruta para calcular.</p> : null}</section>
    </div>
  </>
}

function PlantsView({ plants, devices, onEdit, onDelete, onCreate }: { plants: Plant[]; devices: Device[]; onEdit: (plant: Plant) => void; onDelete: (plant: Plant) => void; onCreate: () => void }) {
  const deviceNames = new globalThis.Map(devices.map((device) => [device.id, device.name]))
  if (!plants.length) return <div className="empty-panel"><Sprout aria-hidden="true" className="size-9" /><h2 className="mt-4 font-display text-2xl font-bold">Agrega el primer cultivo</h2><p className="mt-2 text-[#5f6978]">Registra su ubicación y, si aplica, vincúlalo a un dispositivo AgroD.</p><button type="button" onClick={onCreate} className="primary-button mt-6"><Plus aria-hidden="true" className="size-5" />Agregar cultivo</button></div>
  return <div className="panel-card overflow-hidden"><div className="overflow-x-auto"><table className="data-table"><thead><tr><th>Cultivo</th><th>Ubicación</th><th>Lecturas</th><th>Dispositivo</th><th>Estado</th><th><span className="sr-only">Acciones</span></th></tr></thead><tbody>{plants.map((plant) => <tr key={plant.id}><td><strong>{plant.name}</strong><span>{plant.crop}{plant.variety ? ` · ${plant.variety}` : ''}</span></td><td>Fila {plant.row}, columna {plant.column}<span>{plant.areaTasks} tareas</span></td><td>{plant.humidity === null ? 'Sin humedad' : `${plant.humidity}% humedad`}<span>{plant.temperature === null ? 'Sin temperatura' : `${plant.temperature} °C`}</span></td><td>{plant.deviceId ? deviceNames.get(plant.deviceId) || 'Dispositivo no disponible' : 'Sin dispositivo'}</td><td><span className={`status-badge status-${plant.status}`}>{statusLabel[plant.status]}</span></td><td><div className="flex justify-end gap-2"><button type="button" className="icon-button" onClick={() => onEdit(plant)} aria-label={`Editar ${plant.name}`}><Edit3 aria-hidden="true" className="size-4" /></button><button type="button" className="icon-button text-[#a52f28]" onClick={() => onDelete(plant)} aria-label={`Eliminar ${plant.name}`}><Trash2 aria-hidden="true" className="size-4" /></button></div></td></tr>)}</tbody></table></div></div>
}

function DevicesView({ devices, plants, onEdit, onDelete, onBuzz, onCreate }: { devices: Device[]; plants: Plant[]; onEdit: (device: Device) => void; onDelete: (device: Device) => void; onBuzz: (device: Device) => void; onCreate: () => void }) {
  if (!devices.length) return <div className="empty-panel"><Cpu aria-hidden="true" className="size-9" /><h2 className="mt-4 font-display text-2xl font-bold">Registra tu primer dispositivo</h2><p className="mt-2 text-[#5f6978]">Agrega el modelo, número de serie y estado para vincularlo a un cultivo.</p><button type="button" onClick={onCreate} className="primary-button mt-6"><Plus aria-hidden="true" className="size-5" />Agregar dispositivo</button></div>
  return <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">{devices.map((device) => { const linked = plants.filter((plant) => plant.deviceId === device.id); return <article className="panel-card p-5" key={device.id}><div className="flex items-start justify-between gap-4"><span className="flex size-12 items-center justify-center rounded-xl bg-[#eef5ff] text-[#0b3768]"><Cpu aria-hidden="true" className="size-6" /></span><span className={`device-state device-${device.status}`}>{device.status === 'online' ? 'En línea' : device.status === 'offline' ? 'Sin conexión' : 'Mantenimiento'}</span></div><h2 className="mt-5 font-display text-xl font-bold">{device.name}</h2><p className="mt-1 text-sm text-[#687282]">{device.model} · {device.serial}</p><dl className="mt-5 grid grid-cols-2 gap-3"><div className="device-metric"><dt><BatteryCharging aria-hidden="true" className="size-4" />Batería</dt><dd>{device.battery === null ? 'Sin dato' : `${device.battery}%`}</dd></div><div className="device-metric"><dt><ChartNoAxesCombined aria-hidden="true" className="size-4" />Señal</dt><dd>{device.signal === null ? 'Sin dato' : `${device.signal}%`}</dd></div></dl><p className="mt-4 text-sm text-[#687282]">{linked.length} {linked.length === 1 ? 'cultivo vinculado' : 'cultivos vinculados'}</p><div className="mt-5 flex flex-wrap gap-2 border-t border-[#e4ebe5] pt-4">{device.supportsBuzzer ? <button type="button" onClick={() => onBuzz(device)} className="secondary-button min-h-10 px-3 text-xs"><Volume2 aria-hidden="true" className="size-4" />Hacer sonar</button> : null}<button type="button" onClick={() => onEdit(device)} className="icon-button" aria-label={`Editar ${device.name}`}><Edit3 aria-hidden="true" className="size-4" /></button><button type="button" onClick={() => onDelete(device)} className="icon-button text-[#a52f28]" aria-label={`Eliminar ${device.name}`}><Trash2 aria-hidden="true" className="size-4" /></button></div></article> })}</div>
}

function AlertsView({ plants, onOpenMap }: { plants: Plant[]; onOpenMap: () => void }) {
  const ordered = buildInspectionRoute(plants)
  if (!ordered.length) return <div className="empty-panel"><Bell aria-hidden="true" className="size-9" /><h2 className="mt-4 font-display text-2xl font-bold">Sin cultivos registrados</h2><p className="mt-2 text-[#5f6978]">Las alertas aparecerán cuando existan lecturas o estados para revisar.</p></div>
  return <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]"><section className="space-y-4">{ordered.map((stop) => <article key={stop.plant.id} className="panel-card p-5 sm:p-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><span className={`status-badge status-${stop.plant.status}`}>{statusLabel[stop.plant.status]}</span>{stop.plant.isDemo ? <span className="demo-badge">Demostración</span> : null}</div><h2 className="mt-3 font-display text-xl font-bold">{stop.plant.name}</h2><p className="mt-1 text-sm text-[#687282]">{stop.plant.crop} · Fila {stop.plant.row}, columna {stop.plant.column}</p></div><span className="flex size-10 items-center justify-center rounded-full bg-[#071f42] font-extrabold text-white">{stop.order}</span></div><div className="mt-5 rounded-xl bg-[#f6f8fa] p-4"><p className="text-sm font-bold text-[#172033]">{stop.reason}</p><p className="mt-2 text-sm leading-6 text-[#5f6978]">{recommendationFor(stop.plant)}</p></div></article>)}</section><aside className="h-fit rounded-[1.5rem] bg-[#eef5ff] p-6"><CircleGauge aria-hidden="true" className="size-7 text-[#0b3768]" /><h2 className="mt-4 font-display text-xl font-bold">Cómo se calcula</h2><p className="mt-3 text-sm leading-6 text-[#536274]">AgroD pondera el estado reportado, humedad, temperatura, pH y distancia desde la entrada. Es una recomendación de recorrido, no sustituye el criterio agronómico.</p><button type="button" onClick={onOpenMap} className="secondary-button mt-6"><Map aria-hidden="true" className="size-5" />Ver en el mapa</button></aside></div>
}

function recommendationFor(plant: Plant): string {
  if (plant.humidity !== null && plant.humidity < 25) return 'Revisa el sistema de riego y confirma la lectura directamente en el cultivo antes de aplicar agua.'
  if (plant.status === 'critical') return 'Realiza una inspección prioritaria y registra la acción tomada.'
  if (plant.status === 'attention') return 'Compara esta lectura con el historial y revisa visualmente la zona.'
  if (plant.humidity === null) return 'Comprueba la conexión del dispositivo o registra una lectura manual.'
  if (plant.temperature !== null && plant.temperature > 35) return 'Supervisa la temperatura durante las horas de mayor radiación.'
  return 'Mantén el seguimiento habitual. Los parámetros registrados se encuentran dentro del rango esperado.'
}
