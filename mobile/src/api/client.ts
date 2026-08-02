import { getApiBaseUrl } from '../lib/utils'
import { getStoredToken } from '../auth/token'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type RequestOptions = {
  method?: string
  body?: unknown
  token?: string | null
  formData?: FormData
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const token = options.token === undefined ? await getStoredToken() : options.token
  const headers: Record<string, string> = {}

  if (token) {
    headers.Authorization = `JWT ${token}`
  }

  let body: BodyInit | undefined
  if (options.formData) {
    body = options.formData
  } else if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(options.body)
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: options.method || 'GET',
    headers,
    body,
  })

  const text = await response.text()
  let data: unknown = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = { message: text }
    }
  }

  if (!response.ok) {
    const message =
      typeof data === 'object' &&
      data &&
      'errors' in data &&
      Array.isArray((data as { errors: { message?: string }[] }).errors)
        ? (data as { errors: { message?: string }[] }).errors[0]?.message
        : typeof data === 'object' && data && 'message' in data
          ? String((data as { message: unknown }).message)
          : `Erreur ${response.status}`
    throw new ApiError(message || `Erreur ${response.status}`, response.status)
  }

  return data as T
}
