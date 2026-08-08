import 'server-only'

import { randomUUID } from 'node:crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getDb } from '@/lib/db'
import { getUserProfile } from '@/lib/data'
import { createSessionToken, hashSessionToken } from '@/lib/security'
import type { User } from '@/lib/types'

const COOKIE_NAME = 'agrod_session'
const SESSION_DAYS = 30

type SessionRow = { userId: string }

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null

  const row = getDb()
    .prepare(`
      SELECT s.user_id AS userId
      FROM sessions s
      WHERE s.token_hash = ? AND s.expires_at > CURRENT_TIMESTAMP
      LIMIT 1
    `)
    .get(hashSessionToken(token)) as SessionRow | undefined

  return row ? getUserProfile(row.userId) : null
}

export async function requireUser(returnTo = '/panel'): Promise<User> {
  const user = await getCurrentUser()
  if (!user) redirect(`/iniciar-sesion?returnTo=${encodeURIComponent(returnTo)}`)
  return user
}

function sqliteTimestamp(date: Date): string {
  return date.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '')
}

export async function createUserSession(userId: string): Promise<void> {
  const token = createSessionToken()
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)
  const database = getDb()
  database.prepare('DELETE FROM sessions WHERE user_id = ? OR expires_at <= CURRENT_TIMESTAMP').run(userId)
  database
    .prepare('INSERT INTO sessions (id, user_id, token_hash, expires_at) VALUES (?, ?, ?, ?)')
    .run(randomUUID(), userId, hashSessionToken(token), sqliteTimestamp(expires))

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires,
  })
}

export async function destroyUserSession(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (token) getDb().prepare('DELETE FROM sessions WHERE token_hash = ?').run(hashSessionToken(token))
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0),
  })
}
