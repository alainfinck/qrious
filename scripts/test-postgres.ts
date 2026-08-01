import { getPayload } from 'payload'

import config from '../payload.config'
import { getDatabaseUrl } from '../lib/database-url'

async function testPostgres() {
  let databaseUrl: string
  try {
    databaseUrl = getDatabaseUrl()
  } catch (error) {
    console.error('❌', error instanceof Error ? error.message : error)
    process.exit(1)
  }

  const host = databaseUrl.replace(/:[^:@/]+@/, ':****@').split('@').pop()
  console.log(`→ Test connexion PostgreSQL (${host})...`)

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'landing-pages',
      limit: 1,
    })

    console.log('✅ Connexion PostgreSQL OK')
    console.log(`   Collections accessibles — landing-pages: ${result.totalDocs} document(s)`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Échec connexion PostgreSQL:')
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

testPostgres()
