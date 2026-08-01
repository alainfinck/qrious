import config from '@payload-config'
import { getPayload } from 'payload'

import type { LandingPage as PayloadLandingPage } from '@/payload-types'
import type { LandingPage, LandingPageInput } from '@/types/landing-page'

function mapLandingPage(doc: PayloadLandingPage): LandingPage {
  return {
    id: String(doc.id),
    title: doc.title,
    slug: doc.slug,
    status: doc.status,
    vertical: doc.vertical as LandingPage['vertical'],
    theme: doc.theme as LandingPage['theme'],
    artData: doc.artData,
    immoData: doc.immoData as LandingPage['immoData'],
    vcardData: doc.vcardData,
    productData: doc.productData as LandingPage['productData'],
    feedbackData: doc.feedbackData as LandingPage['feedbackData'],
    tourismData: doc.tourismData as LandingPage['tourismData'],
    updatedAt: doc.updatedAt,
    createdAt: doc.createdAt,
  }
}

function toPayloadData(data: Partial<LandingPageInput>) {
  const payloadData: Record<string, unknown> = {}

  if (data.title !== undefined) payloadData.title = data.title
  if (data.slug !== undefined) payloadData.slug = data.slug
  if (data.status !== undefined) payloadData.status = data.status
  if (data.vertical !== undefined) payloadData.vertical = data.vertical
  if (data.theme !== undefined) {
    payloadData.theme = { primaryColor: data.theme?.primaryColor ?? '#0f172a' }
  }
  if (data.artData !== undefined) payloadData.artData = data.artData ?? undefined
  if (data.immoData !== undefined) payloadData.immoData = data.immoData ?? undefined
  if (data.vcardData !== undefined) payloadData.vcardData = data.vcardData ?? undefined
  if (data.productData !== undefined) payloadData.productData = data.productData ?? undefined
  if (data.feedbackData !== undefined) payloadData.feedbackData = data.feedbackData ?? undefined
  if (data.tourismData !== undefined) payloadData.tourismData = data.tourismData ?? undefined

  return payloadData
}

export async function getLandingPageBySlug(slug: string): Promise<LandingPage | null> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'landing-pages',
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
    },
    depth: 2,
    limit: 1,
  })

  const doc = result.docs[0]
  return doc ? mapLandingPage(doc) : null
}

export async function getLandingPageBySlugAny(slug: string): Promise<LandingPage | null> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'landing-pages',
    where: {
      slug: { equals: slug },
    },
    depth: 1,
    limit: 1,
  })

  const doc = result.docs[0]
  return doc ? mapLandingPage(doc) : null
}

export async function getAllLandingPages(): Promise<LandingPage[]> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'landing-pages',
    depth: 1,
    limit: 200,
    sort: '-updatedAt',
  })

  return result.docs.map(mapLandingPage)
}

export async function getLandingPageById(id: string): Promise<LandingPage | null> {
  const payload = await getPayload({ config })

  try {
    const doc = await payload.findByID({
      collection: 'landing-pages',
      id,
      depth: 1,
    })
    return mapLandingPage(doc)
  } catch {
    return null
  }
}

export async function createLandingPage(data: LandingPageInput): Promise<LandingPage> {
  const payload = await getPayload({ config })

  const doc = await payload.create({
    collection: 'landing-pages',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: toPayloadData(data) as any,
  })

  return mapLandingPage(doc)
}

export async function updateLandingPage(
  id: string,
  data: Partial<LandingPageInput>,
): Promise<LandingPage> {
  const payload = await getPayload({ config })

  const doc = await payload.update({
    collection: 'landing-pages',
    id,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: toPayloadData(data) as any,
  })

  return mapLandingPage(doc)
}

export async function deleteLandingPage(id: string): Promise<void> {
  const payload = await getPayload({ config })
  await payload.delete({
    collection: 'landing-pages',
    id,
  })
}

export async function getDashboardStats() {
  const pages = await getAllLandingPages()

  return {
    total: pages.length,
    published: pages.filter((p) => p.status === 'published').length,
    drafts: pages.filter((p) => p.status === 'draft').length,
    byVertical: {
      generic: pages.filter((p) => p.vertical === 'generic').length,
      art: pages.filter((p) => p.vertical === 'art').length,
      immo: pages.filter((p) => p.vertical === 'immo').length,
      vcard: pages.filter((p) => p.vertical === 'vcard').length,
      product: pages.filter((p) => p.vertical === 'product').length,
      feedback: pages.filter((p) => p.vertical === 'feedback').length,
      tourism: pages.filter((p) => p.vertical === 'tourism').length,
    },
  }
}
