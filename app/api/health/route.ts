import { getDb } from '@/lib/db'

export async function GET() {
  try {
    getDb().prepare('SELECT 1 AS ok').get()
    return Response.json({ status: 'healthy' })
  } catch (error) {
    console.error('[AgroD] health check', error)
    return Response.json({ status: 'unhealthy' }, { status: 503 })
  }
}
