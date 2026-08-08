import { createUserSession } from '@/lib/auth'
import { findCredentials } from '@/lib/data'
import { parseJson, rejectCrossSite, serverError } from '@/lib/http'
import { allowRequest, requestKey } from '@/lib/rate-limit'
import { loginSchema } from '@/lib/schemas'
import { hashPassword, verifyPassword } from '@/lib/security'

const dummyHash = hashPassword('AgroD-dummy-password-2026')

export async function POST(request: Request) {
  const rejected = rejectCrossSite(request)
  if (rejected) return rejected
  if (!allowRequest(requestKey(request, 'login'), 10, 15 * 60 * 1000)) {
    return Response.json({ error: 'Demasiados intentos. Espera 15 minutos.' }, { status: 429 })
  }

  const parsed = await parseJson(request, loginSchema)
  if (!parsed.ok) return parsed.response

  try {
    const credentials = findCredentials(parsed.data.email)
    const valid = await verifyPassword(
      parsed.data.password,
      credentials?.passwordHash || (await dummyHash),
    )
    if (!credentials || !valid) {
      return Response.json({ error: 'Correo o contraseña incorrectos.' }, { status: 401 })
    }
    await createUserSession(credentials.id)
    return Response.json({ ok: true })
  } catch (error) {
    return serverError('inicio de sesión', error)
  }
}
