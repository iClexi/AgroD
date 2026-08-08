import { createUserSession, getCurrentUser } from '@/lib/auth'
import { findCredentials, updatePasswordHash } from '@/lib/data'
import { parseJson, rejectCrossSite, serverError, unauthorized } from '@/lib/http'
import { allowRequest, requestKey } from '@/lib/rate-limit'
import { passwordChangeSchema } from '@/lib/schemas'
import { hashPassword, verifyPassword } from '@/lib/security'

export async function PATCH(request: Request) {
  const user = await getCurrentUser()
  if (!user) return unauthorized()
  const rejected = rejectCrossSite(request)
  if (rejected) return rejected
  if (!allowRequest(requestKey(request, `password:${user.id}`), 5, 15 * 60 * 1000)) {
    return Response.json({ error: 'Demasiados intentos. Espera 15 minutos.' }, { status: 429 })
  }
  const parsed = await parseJson(request, passwordChangeSchema)
  if (!parsed.ok) return parsed.response

  try {
    const credentials = findCredentials(user.email)
    if (!credentials || !(await verifyPassword(parsed.data.currentPassword, credentials.passwordHash))) {
      return Response.json({ error: 'La contraseña actual no coincide.' }, { status: 400 })
    }
    const passwordHash = await hashPassword(parsed.data.newPassword)
    updatePasswordHash(user.id, passwordHash)
    await createUserSession(user.id)
    return Response.json({ ok: true })
  } catch (error) {
    return serverError('cambiar contraseña', error)
  }
}
