import crypto from 'crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'qrious_manager_session'

function getSessionToken(): string {
  return crypto
    .createHmac('sha256', process.env.PAYLOAD_SECRET || 'qrious-dev-secret')
    .update('manager-session')
    .digest('hex')
}

export function verifyManagerPassword(password: string): boolean {
  const expected = process.env.MANAGER_PASSWORD
  if (!expected) return false
  return password === expected
}

export async function createManagerSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, getSessionToken(), {
    httpOnly: true,
    secure: process.env.MANAGER_COOKIE_SECURE === 'true',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function clearManagerSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function isManagerAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value === getSessionToken()
}
