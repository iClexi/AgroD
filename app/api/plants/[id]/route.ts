import { getCurrentUser } from '@/lib/auth'
import { deletePlant, updatePlant } from '@/lib/data'
import { notFound, parseJson, rejectCrossSite, serverError, unauthorized } from '@/lib/http'
import { plantUpdateSchema } from '@/lib/schemas'

type Context = { params: Promise<{ id: string }> }

export async function PATCH(request: Request, context: Context) {
  const user = await getCurrentUser()
  if (!user) return unauthorized()
  const rejected = rejectCrossSite(request)
  if (rejected) return rejected
  const parsed = await parseJson(request, plantUpdateSchema)
  if (!parsed.ok) return parsed.response
  try {
    const plant = updatePlant(user.id, (await context.params).id, parsed.data)
    return plant ? Response.json({ plant }) : notFound('Cultivo')
  } catch (error) {
    const code = error instanceof Error ? error.message : ''
    if (code === 'COORDINATES_OUTSIDE_FARM') return Response.json({ error: 'La ubicación está fuera del mapa de la finca.' }, { status: 400 })
    if (code === 'DEVICE_LINK_INVALID') return Response.json({ error: 'El dispositivo no pertenece a esta finca.' }, { status: 400 })
    return serverError('actualizar cultivo', error)
  }
}

export async function DELETE(request: Request, context: Context) {
  const user = await getCurrentUser()
  if (!user) return unauthorized()
  const rejected = rejectCrossSite(request)
  if (rejected) return rejected
  try {
    return deletePlant(user.id, (await context.params).id)
      ? Response.json({ ok: true })
      : notFound('Cultivo')
  } catch (error) {
    return serverError('eliminar cultivo', error)
  }
}
