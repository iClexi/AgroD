import { firstZodError } from '@/lib/schemas'
import type { ZodType } from 'zod'

export function rejectCrossSite(request: Request): Response | null {
  const origin = request.headers.get('origin')
  if (origin) {
    try {
      const requestUrl = new URL(request.url)
      const requestHost = (request.headers.get('x-forwarded-host') || request.headers.get('host') || requestUrl.host)
        .split(',')[0]
        .trim()
      const requestProtocol = (request.headers.get('x-forwarded-proto') || requestUrl.protocol)
        .split(',')[0]
        .trim()
        .replace(/:$/, '')
      const expectedOrigin = `${requestProtocol}://${requestHost}`
      if (new URL(origin).origin !== expectedOrigin) {
        return Response.json({ error: 'Origen de solicitud no permitido.' }, { status: 403 })
      }
    } catch {
      return Response.json({ error: 'Origen de solicitud no válido.' }, { status: 403 })
    }
  }

  const fetchSite = request.headers.get('sec-fetch-site')
  if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) {
    return Response.json({ error: 'Solicitud entre sitios no permitida.' }, { status: 403 })
  }
  return null
}

export async function parseJson<T>(request: Request, schema: ZodType<T>): Promise<
  | { ok: true; data: T }
  | { ok: false; response: Response }
> {
  const length = Number(request.headers.get('content-length') || 0)
  if (length > 64_000) {
    return { ok: false, response: Response.json({ error: 'La solicitud es demasiado grande.' }, { status: 413 }) }
  }

  try {
    const parsed = schema.safeParse(await request.json())
    if (!parsed.success) {
      return {
        ok: false,
        response: Response.json(
          { error: firstZodError(parsed.error), issues: parsed.error.flatten() },
          { status: 400 },
        ),
      }
    }
    return { ok: true, data: parsed.data }
  } catch {
    return { ok: false, response: Response.json({ error: 'Envía un cuerpo JSON válido.' }, { status: 400 }) }
  }
}

export function unauthorized(): Response {
  return Response.json({ error: 'Inicia sesión para continuar.' }, { status: 401 })
}

export function notFound(resource: string): Response {
  return Response.json({ error: `${resource} no encontrado.` }, { status: 404 })
}

export function serverError(context: string, error: unknown): Response {
  console.error(`[AgroD] ${context}`, error)
  return Response.json({ error: 'No se pudo completar la operación. Inténtalo de nuevo.' }, { status: 500 })
}
