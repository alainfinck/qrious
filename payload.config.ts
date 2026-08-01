import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

import { LandingPages } from './src/collections/LandingPages'
import { Users } from './src/collections/Users'
import { migrations } from './src/migrations'
import { getDatabaseUrl } from './lib/database-url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUrl = getDatabaseUrl()

const smtpHost = process.env.SMTP_HOST
const fromEmail = process.env.FROM_EMAIL || 'noreply@qrious.fr'

export default buildConfig({
  serverURL: (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, ''),
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Qrious',
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
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'qrious-dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
    },
    prodMigrations: migrations,
  }),
  ...(smtpHost
    ? {
        email: nodemailerAdapter({
          defaultFromAddress: fromEmail,
          defaultFromName: 'Qrious',
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
