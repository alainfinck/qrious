import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

import { LandingPages } from './src/collections/LandingPages'
import { getDatabaseUrl } from './lib/database-url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUrl = getDatabaseUrl()

export default buildConfig({
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
    {
      slug: 'users',
      auth: true,
      fields: [],
    },
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
  }),
})
