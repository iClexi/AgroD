import { getCurrentUser } from '@/lib/auth'
import { createDevice, getDashboardData } from '@/lib/data'
import { parseJson, rejectCrossSite, serverError, unauthorized } from '@/lib/http'
import { deviceSchema } from '@/lib/schemas'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return unauthorized()
  return Response.json({ devices: getDashboardData(user.id).devices })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) return unauthorized()
  const rejected = rejectCrossSite(request)
  if (rejected) return rejected
  const parsed = await parseJson(request, deviceSchema)
  if (!parsed.ok) return parsed.response
  try {
    return Response.json({ device: createDevice(user.id, parsed.data) }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    if (message === 'FARM_NOT_FOUND') return Response.json({ error: 'La finca seleccionada no existe.' }, { status: 400 })
    if (message.includes('UNIQUE constraint failed')) return Response.json({ error: 'Ese número de serie ya está registrado.' }, { status: 409 })
    return serverError('crear dispositivo', error)
  }
}
