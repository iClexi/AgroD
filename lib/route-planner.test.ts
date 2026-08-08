import { describe, expect, it } from 'vitest'
import { buildInspectionRoute } from '@/lib/route-planner'
import type { Plant } from '@/lib/types'

const base: Plant = {
  id: '00000000-0000-4000-8000-000000000001',
  farmId: '00000000-0000-4000-8000-000000000002',
  deviceId: null,
  name: 'Zona',
  crop: 'Tomate',
  variety: '',
  areaTasks: 1,
  row: 1,
  column: 1,
  status: 'stable',
  humidity: 50,
  temperature: 28,
  ph: 6.5,
  conductivity: 1.2,
  notes: '',
  isDemo: false,
  lastReadingAt: null,
  createdAt: '2026-01-01',
  updatedAt: '2026-01-01',
}

describe('buildInspectionRoute', () => {
  it('prioriza una lectura crítica aunque esté más lejos', () => {
    const route = buildInspectionRoute([
      { ...base, id: 'a', name: 'Cerca', row: 1, column: 2 },
      { ...base, id: 'b', name: 'Urgente', row: 8, column: 8, status: 'critical', humidity: 18 },
    ])
    expect(route[0].plant.name).toBe('Urgente')
    expect(route[0].reason).toBe('Estado crítico reportado')
  })

  it('devuelve una secuencia estable para todas las zonas', () => {
    const route = buildInspectionRoute([
      base,
      { ...base, id: 'b', name: 'Zona B', row: 2, column: 2, status: 'attention' },
      { ...base, id: 'c', name: 'Zona C', row: 4, column: 4, humidity: null },
    ])
    expect(route.map((stop) => stop.order)).toEqual([1, 2, 3])
    expect(new Set(route.map((stop) => stop.plant.id)).size).toBe(3)
  })
})
