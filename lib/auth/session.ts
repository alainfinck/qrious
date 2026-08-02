import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'

import config from '@payload-config'
import type { User } from '@/payload-types'

const AUTH_TIMEOUT_MS = 4_000

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`${label} timed out after ${ms}ms`))
    }, ms)
    promise.then(
      (value) => {
        clearTimeout(timer)
        resolve(value)
      },
      (err) => {
        clearTimeout(timer)
        reject(err)
      },
    )
  })
}

export async function getCurrentUser(): Promise<User | null> {
  // Avoid connecting to Payload/DB while Next is statically generating pages.
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return null
  }

  try {
    const user = await withTimeout(
      (async () => {
        const payload = await getPayload({ config })
        const headers = await getHeaders()
        const { user } = await payload.auth({ headers })
        if (user && 'collection' in user && user.collection === 'users') {
          return user as User
        }
        return null
      })(),
      AUTH_TIMEOUT_MS,
      'getCurrentUser',
    )
    return user
  } catch (err) {
    console.error('Error in getCurrentUser:', err)
    return null
  }
}

export async function isAuthenticated(): Promise<boolean> {
  return Boolean(await getCurrentUser())
}
