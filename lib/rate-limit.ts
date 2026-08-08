type Entry = { count: number; resetAt: number }

const buckets = new Map<string, Entry>()
const MAX_BUCKETS = 10_000

function removeExpired(now: number): void {
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key)
  }
}

export function allowRequest(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  if (buckets.size >= MAX_BUCKETS) removeExpired(now)
  if (buckets.size >= MAX_BUCKETS && !buckets.has(key)) return false
  const current = buckets.get(key)
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (current.count >= limit) return false
  current.count += 1
  return true
}

export function requestKey(request: Request, scope: string): string {
  const cloudflare = request.headers.get('cf-connecting-ip')?.trim()
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const ip = cloudflare || forwarded || request.headers.get('x-real-ip') || 'local'
  return `${scope}:${ip}`
}
