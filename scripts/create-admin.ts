import { getPayload } from 'payload'

import config from '../payload.config'
import { getDatabaseUrl } from '../lib/database-url'

async function createAdmin() {
  const email = 'alain@wallprint.fr'
  const password = 'caldera'

  try {
    getDatabaseUrl()
  } catch (error) {
    console.error('❌', error instanceof Error ? error.message : error)
    process.exit(1)
  }

  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'users',
      id: existing.docs[0].id,
      data: { password },
    })
    console.log(`✅ Mot de passe mis à jour pour ${email}`)
  } else {
    await payload.create({
      collection: 'users',
      data: {
        email,
        password,
      },
    })
    console.log(`✅ Compte admin créé : ${email}`)
  }

  process.exit(0)
}

createAdmin().catch((error) => {
  console.error('❌ Échec création admin:', error instanceof Error ? error.message : error)
  process.exit(1)
})
