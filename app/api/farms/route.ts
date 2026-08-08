import { getCurrentUser } from '@/lib/auth'
import { createFarm, getDashboardData } from '@/lib/data'
import { parseJson, rejectCrossSite, serverError, unauthorized } from '@/lib/http'
import { farmSchema } from '@/lib/schemas'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return unauthorized()
  return Response.json({ farms: getDashboardData(user.id).farms })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) return unauthorized()
  const rejected = rejectCrossSite(request)
  if (rejected) return rejected
  const parsed = await parseJson(request, farmSchema)
  if (!parsed.ok) return parsed.response
  try {
    return Response.json({ farm: createFarm(user.id, parsed.data) }, { status: 201 })
  } catch (error) {
    return serverError('crear finca', error)
  }
}
