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

export default buildConfig({
  serverURL: (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, ''),
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
