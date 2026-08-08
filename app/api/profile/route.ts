import { getCurrentUser } from '@/lib/auth'
import { getUserProfile, updateUserProfile } from '@/lib/data'
import { notFound, parseJson, rejectCrossSite, serverError, unauthorized } from '@/lib/http'
import { profileSchema } from '@/lib/schemas'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return unauthorized()
  return Response.json({ user: getUserProfile(user.id) })
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser()
  if (!user) return unauthorized()
  const rejected = rejectCrossSite(request)
  if (rejected) return rejected
  const parsed = await parseJson(request, profileSchema)
  if (!parsed.ok) return parsed.response

  try {
    const updated = updateUserProfile(user.id, parsed.data)
    if (!updated) return notFound('Perfil')
    return Response.json({ user: updated })
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    if (message.includes('UNIQUE constraint failed: users.email')) {
      return Response.json({ error: 'Ese correo ya pertenece a otra cuenta.' }, { status: 409 })
    }
    return serverError('actualizar perfil', error)
  }
}
