import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'

import config from '@payload-config'
import type { User } from '@/payload-types'

export async function getCurrentUser(): Promise<User | null> {
  const payload = await getPayload({ config })
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  if (user && 'collection' in user && user.collection === 'users') {
    return user as User
  }

  return null
}

export async function isAuthenticated(): Promise<boolean> {
  return Boolean(await getCurrentUser())
}
