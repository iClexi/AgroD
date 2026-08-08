import type { InspectionStop, Plant } from '@/lib/types'

function priorityScore(plant: Plant): number {
  let score = { critical: 100, attention: 65, no_data: 35, stable: 10 }[plant.status]
  if (plant.humidity === null) score += 10
  else if (plant.humidity < 25) score += 55
  else if (plant.humidity < 35) score += 30
  if (plant.temperature !== null && plant.temperature > 35) score += 20
  if (plant.ph !== null && (plant.ph < 5.5 || plant.ph > 7.5)) score += 15
  return score
}

function reasonFor(plant: Plant): string {
  if (plant.status === 'critical') return 'Estado crítico reportado'
  if (plant.humidity !== null && plant.humidity < 25) return 'Humedad muy baja'
  if (plant.status === 'attention') return 'Requiere revisión'
  if (plant.humidity === null) return 'Faltan lecturas recientes'
  if (plant.temperature !== null && plant.temperature > 35) return 'Temperatura elevada'
  return 'Revisión preventiva'
}

function distance(a: { row: number; column: number }, b: { row: number; column: number }): number {
  return Math.abs(a.row - b.row) + Math.abs(a.column - b.column)
}

export function buildInspectionRoute(plants: Plant[]): InspectionStop[] {
  const remaining = [...plants]
  const result: InspectionStop[] = []
  let current = { row: 1, column: 1 }

  while (remaining.length > 0) {
    let bestIndex = 0
    let bestValue = Number.NEGATIVE_INFINITY
    for (let index = 0; index < remaining.length; index += 1) {
      const candidate = remaining[index]
      const value = priorityScore(candidate) * 4 - distance(current, candidate) * 3
      if (value > bestValue) {
        bestValue = value
        bestIndex = index
      }
    }
    const [plant] = remaining.splice(bestIndex, 1)
    result.push({
      plant,
      order: result.length + 1,
      score: priorityScore(plant),
      reason: reasonFor(plant),
    })
    current = plant
  }

  return result
}
