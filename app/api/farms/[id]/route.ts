import { getCurrentUser } from '@/lib/auth'
import { deleteFarm, updateFarm } from '@/lib/data'
import { notFound, parseJson, rejectCrossSite, serverError, unauthorized } from '@/lib/http'
import { farmUpdateSchema } from '@/lib/schemas'

type Context = { params: Promise<{ id: string }> }

export async function PATCH(request: Request, context: Context) {
  const user = await getCurrentUser()
  if (!user) return unauthorized()
  const rejected = rejectCrossSite(request)
  if (rejected) return rejected
  const parsed = await parseJson(request, farmUpdateSchema)
  if (!parsed.ok) return parsed.response
  try {
    const farm = updateFarm(user.id, (await context.params).id, parsed.data)
    return farm ? Response.json({ farm }) : notFound('Finca')
  } catch (error) {
    if (error instanceof Error && error.message === 'FARM_DIMENSIONS_CONFLICT') {
      return Response.json({ error: 'La finca no puede reducirse porque hay cultivos fuera del nuevo límite.' }, { status: 409 })
    }
    return serverError('actualizar finca', error)
  }
}

export async function DELETE(request: Request, context: Context) {
  const user = await getCurrentUser()
  if (!user) return unauthorized()
  const rejected = rejectCrossSite(request)
  if (rejected) return rejected
  try {
    const deleted = deleteFarm(user.id, (await context.params).id)
    return deleted ? Response.json({ ok: true }) : notFound('Finca')
  } catch (error) {
    return serverError('eliminar finca', error)
  }
}
