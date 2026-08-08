import { createUserSession } from '@/lib/auth'
import { createAccount } from '@/lib/data'
import { parseJson, rejectCrossSite, serverError } from '@/lib/http'
import { allowRequest, requestKey } from '@/lib/rate-limit'
import { registerSchema } from '@/lib/schemas'
import { hashPassword } from '@/lib/security'

export async function POST(request: Request) {
  const rejected = rejectCrossSite(request)
  if (rejected) return rejected
  if (!allowRequest(requestKey(request, 'register'), 5, 15 * 60 * 1000)) {
    return Response.json({ error: 'Demasiados intentos. Espera 15 minutos.' }, { status: 429 })
  }

  const parsed = await parseJson(request, registerSchema)
  if (!parsed.ok) return parsed.response

  try {
    const passwordHash = await hashPassword(parsed.data.password)
    const userId = createAccount({ ...parsed.data, passwordHash })
    await createUserSession(userId)
    return Response.json({ ok: true }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    if (message.includes('UNIQUE constraint failed: users.email')) {
      return Response.json({ error: 'Ya existe una cuenta con ese correo.' }, { status: 409 })
    }
    return serverError('registro', error)
  }
}
