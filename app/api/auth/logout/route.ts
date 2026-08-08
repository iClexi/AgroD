import { destroyUserSession } from '@/lib/auth'
import { rejectCrossSite } from '@/lib/http'

export async function POST(request: Request) {
  const rejected = rejectCrossSite(request)
  if (rejected) return rejected
  await destroyUserSession()
  return Response.json({ ok: true })
}
