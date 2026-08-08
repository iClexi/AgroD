import { getCurrentUser } from '@/lib/auth'
import { createPlant, getDashboardData } from '@/lib/data'
import { parseJson, rejectCrossSite, serverError, unauthorized } from '@/lib/http'
import { plantSchema } from '@/lib/schemas'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return unauthorized()
  return Response.json({ plants: getDashboardData(user.id).plants })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) return unauthorized()
  const rejected = rejectCrossSite(request)
  if (rejected) return rejected
  const parsed = await parseJson(request, plantSchema)
  if (!parsed.ok) return parsed.response
  try {
    return Response.json({ plant: createPlant(user.id, parsed.data) }, { status: 201 })
  } catch (error) {
    const code = error instanceof Error ? error.message : ''
    if (code === 'FARM_NOT_FOUND') return Response.json({ error: 'La finca seleccionada no existe.' }, { status: 400 })
    if (code === 'COORDINATES_OUTSIDE_FARM') return Response.json({ error: 'La fila o columna está fuera del mapa de la finca.' }, { status: 400 })
    if (code === 'DEVICE_LINK_INVALID') return Response.json({ error: 'El dispositivo no pertenece a esta finca.' }, { status: 400 })
    return serverError('crear cultivo', error)
  }
}
