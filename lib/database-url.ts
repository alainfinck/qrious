export function getDatabaseUrl(): string {
  const direct = process.env.DATABASE_URI || process.env.DATABASE_URL

  if (direct) {
    if (direct.startsWith('mongodb')) {
      throw new Error(
        'DATABASE_URI pointe encore vers MongoDB. Remplacez-la par postgresql:// dans .env.local',
      )
    }
    if (!direct.startsWith('postgres')) {
      throw new Error(
        `DATABASE_URI invalide : attendu postgresql://, reçu "${direct.slice(0, 30)}..."`,
      )
    }
    return direct
  }

  const user = process.env.POSTGRES_USER
  const password = process.env.POSTGRES_PASSWORD
  const host = process.env.POSTGRES_HOST
  const port = process.env.POSTGRES_PORT || '5432'
  const database = process.env.POSTGRES_DB || 'qrious'

  if (user && password && host) {
    return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`
  }

  throw new Error(
    'PostgreSQL non configuré. Ajoutez dans .env.local :\n' +
      'DATABASE_URI=postgresql://user:password@host:5432/qrious\n' +
      '— ou POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DB',
  )
}
