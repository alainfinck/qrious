import { HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const DEFAULT_ENDPOINT = 'https://s3.fr-par.scw.cloud'
const DEFAULT_BUCKET = 'qrious'
const DEFAULT_REGION = 'fr-par'

export function getS3Config() {
  return {
    bucket: process.env.S3_BUCKET || DEFAULT_BUCKET,
    endpoint: (process.env.S3_ENDPOINT || DEFAULT_ENDPOINT).replace(/\/$/, ''),
    region: process.env.S3_REGION || DEFAULT_REGION,
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  }
}

let cachedClient: S3Client | null = null

export function getS3Client() {
  if (cachedClient) return cachedClient

  const { endpoint, region, accessKeyId, secretAccessKey } = getS3Config()
  cachedClient = new S3Client({
    endpoint,
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })
  return cachedClient
}

export function sanitizeUploadFilename(filename: string) {
  const base = filename.split(/[/\\]/).pop() || 'upload'
  const cleaned = base
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return cleaned || `upload-${Date.now()}`
}

export function uniqueUploadFilename(filename: string) {
  const safe = sanitizeUploadFilename(filename)
  const dot = safe.lastIndexOf('.')
  const stamp = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
  if (dot <= 0) return `${safe}-${stamp}`
  return `${safe.slice(0, dot)}-${stamp}${safe.slice(dot)}`
}

export function publicUrlForKey(key: string) {
  const { endpoint, bucket } = getS3Config()
  const encoded = key
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/')
  return `${endpoint}/${bucket}/${encoded}`
}

export async function createPresignedPutUrl(args: {
  key: string
  contentType: string
  expiresIn?: number
}) {
  const { bucket } = getS3Config()
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: args.key,
    ContentType: args.contentType,
  })

  return getSignedUrl(getS3Client(), command, {
    expiresIn: args.expiresIn ?? 600,
  })
}

export async function assertS3ObjectExists(key: string) {
  const { bucket } = getS3Config()
  await getS3Client().send(
    new HeadObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
  )
}
