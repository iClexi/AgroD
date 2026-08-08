import { getCurrentUser } from '@/lib/auth'
import { deleteDevice, updateDevice } from '@/lib/data'
import { notFound, parseJson, rejectCrossSite, serverError, unauthorized } from '@/lib/http'
import { deviceUpdateSchema } from '@/lib/schemas'

type Context = { params: Promise<{ id: string }> }

export async function PATCH(request: Request, context: Context) {
  const user = await getCurrentUser()
  if (!user) return unauthorized()
  const rejected = rejectCrossSite(request)
  if (rejected) return rejected
  const parsed = await parseJson(request, deviceUpdateSchema)
  if (!parsed.ok) return parsed.response
  try {
    const device = updateDevice(user.id, (await context.params).id, parsed.data)
    return device ? Response.json({ device }) : notFound('Dispositivo')
  } catch (error) {
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      return Response.json({ error: 'Ese número de serie ya está registrado.' }, { status: 409 })
    }
    return serverError('actualizar dispositivo', error)
  }
}

export async function DELETE(request: Request, context: Context) {
  const user = await getCurrentUser()
  if (!user) return unauthorized()
  const rejected = rejectCrossSite(request)
  if (rejected) return rejected
  try {
    return deleteDevice(user.id, (await context.params).id)
      ? Response.json({ ok: true })
      : notFound('Dispositivo')
  } catch (error) {
    return serverError('eliminar dispositivo', error)
  }
}
