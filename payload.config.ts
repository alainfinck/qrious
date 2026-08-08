import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'

import { LandingPages } from './src/collections/LandingPages'
import { Users } from './src/collections/Users'
import { migrations } from './src/migrations'
import { appleOAuth, googleOAuth } from './lib/auth/oauth'
import { getDatabaseUrl } from './lib/database-url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUrl = getDatabaseUrl()

const smtpHost = process.env.SMTP_HOST
const fromEmail = process.env.FROM_EMAIL || 'noreply@qrious.fr'

/** Next sets this during `next build` — never run interactive migrations then. */
const isNextBuild = process.env.NEXT_PHASE === 'phase-production-build'
const isProd = process.env.NODE_ENV === 'production'

const serverUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

const allowedOrigins = Array.from(
  new Set(
    [
      serverUrl,
      'https://www.qrious.fr',
      'https://qrious.fr',
      'https://www.cartepostale.cool',
      'https://cartepostale.cool',
      'https://www.postcard.cool',
      'https://postcard.cool',
      'http://localhost:3000',
      'http://localhost:8081',
      'http://localhost:8082',
      'http://localhost:19006',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:8081',
      'http://127.0.0.1:8082',
      'http://127.0.0.1:19006',
    ].filter(Boolean),
  ),
)

export default buildConfig({
  serverURL: serverUrl,
  cors: allowedOrigins,
  csrf: allowedOrigins,
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— QRious',
    },
    importMap: {
      baseDir: path.resolve(dirname, 'app/(payload)'),
      importMapFile: path.resolve(dirname, 'app/(payload)/cms/importMap.js'),
    },
  },
  routes: {
    admin: '/cms',
  },
  collections: [
    LandingPages,
    {
      slug: 'media',
      upload: true,
      access: {
        read: () => true,
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
    Users,
  ],
  plugins: [
    googleOAuth,
    appleOAuth,
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || 'qrious',
      // Direct browser/app uploads via presigned PUT (bypass Next body limits).
      // Bucket CORS must allow PUT from the app origins.
      clientUploads: true,
      config: {
        endpoint: process.env.S3_ENDPOINT || 'https://s3.fr-par.scw.cloud',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'fr-par',
        // Optional: depending on the S3 provider, you might need to force path style
        // forcePathStyle: true,
      },
    }),
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'qrious-dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
      // Fail fast instead of hanging RSC navigations when DB is unreachable.
      connectionTimeoutMillis: 4_000,
      idleTimeoutMillis: 20_000,
      max: 20,
    },
    // Never auto-push schema in prod/build (avoids mixing push + migrations).
    push: !isProd && !isNextBuild && process.env.PAYLOAD_DATABASE_PUSH !== 'false',
    // Skip during Next build: migrate prompt hangs CI when a `batch = -1` row exists.
    ...(isNextBuild ? {} : { prodMigrations: migrations }),
  }),
  ...(smtpHost
    ? {
        email: nodemailerAdapter({
          defaultFromAddress: fromEmail,
          defaultFromName: 'QRious',
          skipVerify: true,
          transportOptions: {
            host: smtpHost,
            port: Number(process.env.SMTP_PORT || 587),
            secure: Number(process.env.SMTP_PORT || 587) === 465,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          },
        }),
      }
    : {}),
})
