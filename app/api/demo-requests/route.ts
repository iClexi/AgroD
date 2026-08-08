import { createDemoRequest } from '@/lib/data'
import { parseJson, rejectCrossSite, serverError } from '@/lib/http'
import { allowRequest, requestKey } from '@/lib/rate-limit'
import { demoRequestSchema } from '@/lib/schemas'

export async function POST(request: Request) {
  const rejected = rejectCrossSite(request)
  if (rejected) return rejected
  if (!allowRequest(requestKey(request, 'demo'), 4, 60 * 60 * 1000)) {
    return Response.json({ error: 'Ya recibimos varias solicitudes. Inténtalo más tarde.' }, { status: 429 })
  }
  const parsed = await parseJson(request, demoRequestSchema)
  if (!parsed.ok) return parsed.response
  try {
    const id = createDemoRequest(parsed.data)
    return Response.json({ ok: true, id }, { status: 201 })
  } catch (error) {
    return serverError('solicitud de demostración', error)
  }
}
