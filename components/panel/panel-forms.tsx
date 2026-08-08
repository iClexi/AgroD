'use client'

import { useId } from 'react'
import { X } from 'lucide-react'
import type { Device, DeviceModel, Farm, Plant } from '@/lib/types'
import { deviceModels } from '@/lib/schemas'

function Dialog({
  title,
  description,
  onClose,
  children,
}: {
  title: string
  description: string
  onClose: () => void
  children: React.ReactNode
}) {
  const titleId = useId()
  const descriptionId = useId()
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#071f42]/55 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId} className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[1.75rem] bg-white p-5 shadow-2xl sm:rounded-[1.75rem] sm:p-7">
        <header className="flex items-start justify-between gap-5">
          <div>
            <h2 id={titleId} className="font-display text-2xl font-extrabold text-[#172033]">{title}</h2>
            <p id={descriptionId} className="mt-2 leading-6 text-[#5f6978]">{description}</p>
          </div>
          <button type="button" onClick={onClose} className="icon-button shrink-0" aria-label="Cerrar formulario">
            <X aria-hidden="true" className="size-5" />
          </button>
        </header>
        <div className="mt-7">{children}</div>
      </section>
    </div>
  )
}

function FormActions({ pending, onClose, label }: { pending: boolean; onClose: () => void; label: string }) {
  return (
    <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#e4ebe5] pt-5 sm:flex-row sm:justify-end">
      <button type="button" onClick={onClose} className="secondary-button">Cancelar</button>
      <button type="submit" className="primary-button" disabled={pending}>{pending ? 'Guardando…' : label}</button>
    </div>
  )
}

export function FarmForm({
  farm,
  pending,
  onClose,
  onSubmit,
}: {
  farm?: Farm
  pending: boolean
  onClose: () => void
  onSubmit: (value: { name: string; province: string; rows: number; columns: number }) => void
}) {
  return (
    <Dialog title={farm ? 'Editar finca' : 'Crear finca virtual'} description="Define el tamaño del plano. Luego podrás ubicar cultivos por fila y columna." onClose={onClose}>
      <form onSubmit={(event) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        onSubmit({ name: String(form.get('name')), province: String(form.get('province')), rows: Number(form.get('rows')), columns: Number(form.get('columns')) })
      }}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="sm:col-span-2"><span className="form-label">Nombre de la finca</span><input className="form-input mt-2" name="name" required minLength={2} maxLength={100} defaultValue={farm?.name} placeholder="Finca La Esperanza" /></label>
          <label className="sm:col-span-2"><span className="form-label">Provincia</span><input className="form-input mt-2" name="province" required minLength={2} maxLength={80} defaultValue={farm?.province || 'La Vega'} /></label>
          <label><span className="form-label">Filas</span><input className="form-input mt-2" name="rows" type="number" min={1} max={100} required defaultValue={farm?.rows || 8} /></label>
          <label><span className="form-label">Columnas</span><input className="form-input mt-2" name="columns" type="number" min={1} max={100} required defaultValue={farm?.columns || 8} /></label>
        </div>
        <FormActions pending={pending} onClose={onClose} label={farm ? 'Guardar cambios' : 'Crear finca'} />
      </form>
    </Dialog>
  )
}

export function PlantForm({
  plant,
  farm,
  devices,
  pending,
  onClose,
  onSubmit,
}: {
  plant?: Plant
  farm: Farm
  devices: Device[]
  pending: boolean
  onClose: () => void
  onSubmit: (value: Record<string, unknown>) => void
}) {
  return (
    <Dialog title={plant ? 'Editar cultivo' : 'Agregar cultivo'} description={`Ubica la zona dentro de ${farm.name} y vincula un dispositivo si ya está instalado.`} onClose={onClose}>
      <form onSubmit={(event) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        const reading = (name: string) => form.get(name) === '' ? null : Number(form.get(name))
        onSubmit({
          ...(plant ? {} : { farmId: farm.id }),
          deviceId: form.get('deviceId') || null,
          name: String(form.get('name')),
          crop: String(form.get('crop')),
          variety: String(form.get('variety')),
          areaTasks: Number(form.get('areaTasks')),
          row: Number(form.get('row')),
          column: Number(form.get('column')),
          status: String(form.get('status')),
          humidity: reading('humidity'),
          temperature: reading('temperature'),
          ph: reading('ph'),
          conductivity: reading('conductivity'),
          notes: String(form.get('notes')),
        })
      }}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label><span className="form-label">Nombre de la zona</span><input className="form-input mt-2" name="name" required minLength={2} maxLength={100} defaultValue={plant?.name} placeholder="Tomate Norte" /></label>
          <label><span className="form-label">Cultivo</span><input className="form-input mt-2" name="crop" required minLength={2} maxLength={100} defaultValue={plant?.crop} placeholder="Tomate" /></label>
          <label><span className="form-label">Variedad</span><input className="form-input mt-2" name="variety" maxLength={100} defaultValue={plant?.variety} placeholder="Opcional" /></label>
          <label><span className="form-label">Área en tareas</span><input className="form-input mt-2" name="areaTasks" type="number" min="0.1" max="100000" step="0.1" required defaultValue={plant?.areaTasks || 1} /></label>
          <label><span className="form-label">Fila</span><input className="form-input mt-2" name="row" type="number" min={1} max={farm.rows} required defaultValue={plant?.row || 1} /></label>
          <label><span className="form-label">Columna</span><input className="form-input mt-2" name="column" type="number" min={1} max={farm.columns} required defaultValue={plant?.column || 1} /></label>
          <label className="sm:col-span-2"><span className="form-label">Dispositivo vinculado</span><select className="form-input mt-2" name="deviceId" defaultValue={plant?.deviceId || ''}><option value="">Sin dispositivo</option>{devices.map((device) => <option key={device.id} value={device.id}>{device.name} — {device.model}</option>)}</select></label>
          <label><span className="form-label">Estado</span><select className="form-input mt-2" name="status" defaultValue={plant?.status || 'no_data'}><option value="no_data">Sin datos</option><option value="stable">Estable</option><option value="attention">Atención</option><option value="critical">Crítico</option></select></label>
          <label><span className="form-label">Humedad del suelo (%)</span><input className="form-input mt-2" name="humidity" type="number" min={0} max={100} step="0.1" defaultValue={plant?.humidity ?? ''} /></label>
          <label><span className="form-label">Temperatura (°C)</span><input className="form-input mt-2" name="temperature" type="number" min={-20} max={80} step="0.1" defaultValue={plant?.temperature ?? ''} /></label>
          <label><span className="form-label">pH</span><input className="form-input mt-2" name="ph" type="number" min={0} max={14} step="0.1" defaultValue={plant?.ph ?? ''} /></label>
          <label><span className="form-label">Conductividad (mS/cm)</span><input className="form-input mt-2" name="conductivity" type="number" min={0} max={20} step="0.1" defaultValue={plant?.conductivity ?? ''} /></label>
          <label className="sm:col-span-2"><span className="form-label">Notas</span><textarea className="form-input mt-2 min-h-28 resize-y" name="notes" maxLength={2000} defaultValue={plant?.notes} /></label>
        </div>
        <FormActions pending={pending} onClose={onClose} label={plant ? 'Guardar cambios' : 'Agregar cultivo'} />
      </form>
    </Dialog>
  )
}

export function DeviceForm({
  device,
  farm,
  pending,
  onClose,
  onSubmit,
}: {
  device?: Device
  farm: Farm
  pending: boolean
  onClose: () => void
  onSubmit: (value: Record<string, unknown>) => void
}) {
  return (
    <Dialog title={device ? 'Editar dispositivo' : 'Agregar dispositivo'} description={`Registra el equipo instalado en ${farm.name}.`} onClose={onClose}>
      <form onSubmit={(event) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        const optionalNumber = (name: string) => form.get(name) === '' ? null : Number(form.get(name))
        onSubmit({
          ...(device ? {} : { farmId: farm.id }),
          name: String(form.get('name')),
          serial: String(form.get('serial')),
          model: String(form.get('model')) as DeviceModel,
          status: String(form.get('status')),
          battery: optionalNumber('battery'),
          signal: optionalNumber('signal'),
          supportsBuzzer: form.get('supportsBuzzer') === 'on',
        })
      }}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="sm:col-span-2"><span className="form-label">Nombre del dispositivo</span><input className="form-input mt-2" name="name" required minLength={2} maxLength={100} defaultValue={device?.name} placeholder="Sensor de suelo Norte" /></label>
          <label><span className="form-label">Modelo</span><select className="form-input mt-2" name="model" defaultValue={device?.model || deviceModels[0]}>{deviceModels.map((model) => <option key={model}>{model}</option>)}</select></label>
          <label><span className="form-label">Número de serie</span><input className="form-input mt-2 uppercase" name="serial" required minLength={5} maxLength={64} pattern="[A-Za-z0-9-]+" defaultValue={device?.serial} placeholder="AGD-T500-001" /></label>
          <label><span className="form-label">Estado</span><select className="form-input mt-2" name="status" defaultValue={device?.status || 'offline'}><option value="online">En línea</option><option value="offline">Sin conexión</option><option value="maintenance">Mantenimiento</option></select></label>
          <label><span className="form-label">Batería (%)</span><input className="form-input mt-2" name="battery" type="number" min={0} max={100} defaultValue={device?.battery ?? ''} /></label>
          <label><span className="form-label">Señal (%)</span><input className="form-input mt-2" name="signal" type="number" min={0} max={100} defaultValue={device?.signal ?? ''} /></label>
          <label className="flex items-start gap-3 rounded-xl border border-[#dce8de] bg-[#f6f8fa] p-4 sm:col-span-2"><input className="mt-1 size-5 accent-[#167a35]" name="supportsBuzzer" type="checkbox" defaultChecked={device?.supportsBuzzer ?? true} /><span><span className="form-label block">Zumbador de localización</span><span className="mt-1 block text-sm leading-6 text-[#5f6978]">Permite enviar una orden para identificar el equipo en el campo.</span></span></label>
        </div>
        <FormActions pending={pending} onClose={onClose} label={device ? 'Guardar cambios' : 'Agregar dispositivo'} />
      </form>
    </Dialog>
  )
}
