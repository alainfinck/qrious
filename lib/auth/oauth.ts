import type { PayloadRequest } from 'payload'
import { OAuth2Plugin, defaultGetToken } from 'payload-oauth2'

function getServerUrl(): string {
  return (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(
    /\/$/,
    '',
  )
}

export const googleOAuthEnabled =
  Boolean(process.env.GOOGLE_CLIENT_ID) && Boolean(process.env.GOOGLE_CLIENT_SECRET)

export const appleOAuthEnabled =
  Boolean(process.env.APPLE_CLIENT_ID) && Boolean(process.env.APPLE_CLIENT_SECRET)

export const googleOAuth = OAuth2Plugin({
  enabled: googleOAuthEnabled,
  strategyName: 'google',
  useEmailAsIdentity: true,
  serverURL: getServerUrl(),
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  authorizePath: '/oauth/google',
  callbackPath: '/oauth/google/callback',
  authCollection: 'users',
  onUserNotFoundBehavior: 'create',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  scopes: [
    'openid',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
  providerAuthorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  getUserInfo: async (accessToken: string) => {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!response.ok) {
      throw new Error(`Google userinfo failed: ${response.status}`)
    }
    const user = (await response.json()) as { email?: string; sub?: string }
    if (!user.email || !user.sub) {
      throw new Error('Google account did not return email/sub')
    }
    return {
      email: user.email,
      sub: user.sub,
      role: 'user',
    }
  },
  getToken: async (code: string) => {
    return defaultGetToken(
      'https://oauth2.googleapis.com/token',
      process.env.GOOGLE_CLIENT_ID || '',
      process.env.GOOGLE_CLIENT_SECRET || '',
      `${getServerUrl()}/api/users/oauth/google/callback`,
      code,
    )
  },
  successRedirect: () => '/dashboard',
  failureRedirect: (_req: PayloadRequest, err) => {
    console.error('[oauth:google]', err)
    return '/dashboard/login?error=oauth'
  },
})

export const appleOAuth = OAuth2Plugin({
  enabled: appleOAuthEnabled,
  strategyName: 'apple',
  useEmailAsIdentity: true,
  serverURL: getServerUrl(),
  clientId: process.env.APPLE_CLIENT_ID || '',
  clientSecret: process.env.APPLE_CLIENT_SECRET || '',
  authorizePath: '/oauth/apple',
  callbackPath: '/oauth/apple/callback',
  authCollection: 'users',
  onUserNotFoundBehavior: 'create',
  tokenEndpoint: 'https://appleid.apple.com/auth/token',
  scopes: ['name', 'email'],
  providerAuthorizationUrl: 'https://appleid.apple.com/auth/authorize',
  responseMode: 'form_post',
  getUserInfo: async (idToken: string) => {
    const parts = idToken.split('.')
    if (parts.length !== 3) {
      throw new Error('Invalid Apple ID token')
    }
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8')) as {
      email?: string
      sub?: string
    }
    if (!payload.email || !payload.sub) {
      throw new Error('Apple account did not return email/sub')
    }
    return {
      email: payload.email,
      sub: payload.sub,
      role: 'user',
    }
  },
  getToken: async (code: string) => {
    const redirectUri = `${getServerUrl()}/api/users/oauth/apple/callback`
    const params = new URLSearchParams({
      client_id: process.env.APPLE_CLIENT_ID || '',
      client_secret: process.env.APPLE_CLIENT_SECRET || '',
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    })

    const response = await fetch('https://appleid.apple.com/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })

    if (!response.ok) {
      throw new Error(`Apple token exchange failed: ${await response.text()}`)
    }

    const tokenResponse = (await response.json()) as { id_token?: string }
    if (!tokenResponse.id_token) {
      throw new Error('Apple did not return an id_token')
    }
    return tokenResponse.id_token
  },
  successRedirect: () => '/dashboard',
  failureRedirect: (_req: PayloadRequest, err) => {
    console.error('[oauth:apple]', err)
    return '/dashboard/login?error=oauth'
  },
})
