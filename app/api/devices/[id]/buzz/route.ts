import { getCurrentUser } from '@/lib/auth'
import { createBuzzCommand } from '@/lib/data'
import { notFound, rejectCrossSite, serverError, unauthorized } from '@/lib/http'

type Context = { params: Promise<{ id: string }> }

export async function POST(request: Request, context: Context) {
  const user = await getCurrentUser()
  if (!user) return unauthorized()
  const rejected = rejectCrossSite(request)
  if (rejected) return rejected
  try {
    const command = createBuzzCommand(user.id, (await context.params).id)
    if (!command) return notFound('Dispositivo')
    return Response.json({
      command,
      message: 'Orden simulada. La integración física del zumbador aún está pendiente.',
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'BUZZER_UNSUPPORTED') {
      return Response.json({ error: 'Este modelo no incluye zumbador.' }, { status: 409 })
    }
    return serverError('hacer sonar dispositivo', error)
  }
}
