'use client'

import { useMemo, useState } from 'react'
import { LocateFixed, MapPinned, Route, Volume2 } from 'lucide-react'
import { buildInspectionRoute } from '@/lib/route-planner'
import type { Device, Farm, Plant } from '@/lib/types'

const statusText = {
  stable: 'Estable',
  attention: 'Atención',
  critical: 'Crítico',
  no_data: 'Sin datos',
}

export function FarmMap({
  farm,
  plants,
  devices,
  onBuzz,
}: {
  farm: Farm
  plants: Plant[]
  devices: Device[]
  onBuzz: (device: Device) => void
}) {
  const route = useMemo(() => buildInspectionRoute(plants), [plants])
  const orderByPlant = useMemo(() => new Map(route.map((stop) => [stop.plant.id, stop.order])), [route])
  const deviceById = useMemo(() => new Map(devices.map((device) => [device.id, device])), [devices])
  const [selectedId, setSelectedId] = useState<string | null>(plants[0]?.id || null)
  const selected = plants.find((plant) => plant.id === selectedId) || null
  const selectedDevice = selected?.deviceId ? deviceById.get(selected.deviceId) || null : null

  if (plants.length === 0) {
    return (
      <div className="empty-panel">
        <MapPinned aria-hidden="true" className="size-8" />
        <h3 className="mt-4 font-display text-xl font-bold">El mapa está listo</h3>
        <p className="mt-2 max-w-lg text-[#5f6978]">Agrega el primer cultivo e indica su fila y columna para verlo dentro de la finca virtual.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
      <section className="overflow-hidden rounded-[1.5rem] border border-[#dce8de] bg-white shadow-[0_18px_60px_-45px_rgba(7,31,66,.45)]">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e4ebe5] px-5 py-4">
          <div>
            <h3 className="font-display text-xl font-bold text-[#172033]">Plano de {farm.name}</h3>
            <p className="mt-1 text-sm text-[#687282]">Entrada en fila 1, columna 1 · {farm.rows} filas por {farm.columns} columnas</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-[#f2f8f3] px-3 py-2 text-sm font-bold text-[#0d5a29]">
            <Route aria-hidden="true" className="size-4" />
            Ruta calculada
          </div>
        </header>

        <div className="p-4 sm:p-6">
          <div className="farm-map relative min-h-[440px] overflow-hidden rounded-[1.25rem] border border-[#cfe0d2] bg-[#edf6ee] sm:min-h-[560px]" aria-label={`Mapa virtual de ${farm.name}`}>
            <div className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-xs font-bold text-[#071f42] shadow-sm">
              <LocateFixed aria-hidden="true" className="size-4 text-[#167a35]" />
              Entrada
            </div>
            {plants.map((plant) => {
              const order = orderByPlant.get(plant.id)
              const left = ((plant.column - 0.5) / farm.columns) * 100
              const top = ((plant.row - 0.5) / farm.rows) * 100
              return (
                <button
                  key={plant.id}
                  type="button"
                  onClick={() => setSelectedId(plant.id)}
                  className={`map-marker status-${plant.status} ${selectedId === plant.id ? 'is-selected' : ''}`}
                  style={{ left: `${left}%`, top: `${top}%` }}
                  aria-label={`Paso ${order}. ${plant.name}, fila ${plant.row}, columna ${plant.column}, ${statusText[plant.status]}`}
                >
                  <span>{order}</span>
                </button>
              )
            })}
          </div>
        </div>

        {selected ? (
          <div className="border-t border-[#e4ebe5] bg-[#f8faf8] p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-display text-xl font-bold text-[#172033]">{selected.name}</h4>
                  <span className={`status-badge status-${selected.status}`}>{statusText[selected.status]}</span>
                </div>
                <p className="mt-2 text-sm text-[#5f6978]">{selected.crop} · Fila {selected.row}, columna {selected.column}{selectedDevice ? ` · ${selectedDevice.name}` : ' · Sin dispositivo'}</p>
              </div>
              {selectedDevice?.supportsBuzzer ? (
                <button type="button" onClick={() => onBuzz(selectedDevice)} className="secondary-button">
                  <Volume2 aria-hidden="true" className="size-5" />
                  Hacer sonar
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </section>

      <aside className="rounded-[1.5rem] bg-[#071f42] p-5 text-white sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-[#8ed09f]"><Route aria-hidden="true" className="size-5" /></span>
          <div><h3 className="font-display text-xl font-bold">Orden recomendado</h3><p className="mt-1 text-sm text-white/65">Urgencia y distancia</p></div>
        </div>
        <p className="mt-5 text-sm leading-6 text-white/70">La ruta prioriza estados críticos y lecturas fuera de rango; luego reduce recorridos desde el último punto.</p>
        <ol className="mt-6 space-y-3">
          {route.map((stop) => (
            <li key={stop.plant.id}>
              <button type="button" onClick={() => setSelectedId(stop.plant.id)} className={`flex min-h-16 w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${selectedId === stop.plant.id ? 'border-[#8ed09f] bg-white/12' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#167a35] text-sm font-extrabold text-white">{stop.order}</span>
                <span className="min-w-0"><span className="block truncate text-sm font-bold">{stop.plant.name}</span><span className="mt-1 block truncate text-xs text-white/60">{stop.reason} · F{stop.plant.row} C{stop.plant.column}</span></span>
              </button>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  )
}
