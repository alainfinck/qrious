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
    scanCount: typeof doc.scanCount === 'number' ? doc.scanCount : null,
    theme: doc.theme as LandingPage['theme'],
    genericData: doc.genericData as LandingPage['genericData'],
    redirectData: doc.redirectData as LandingPage['redirectData'],
    artData: doc.artData,
    immoData: doc.immoData as LandingPage['immoData'],
    vcardData: doc.vcardData,
    productData: doc.productData as LandingPage['productData'],
    feedbackData: doc.feedbackData as LandingPage['feedbackData'],
    tourismData: doc.tourismData as LandingPage['tourismData'],
    chrdData: doc.chrdData as LandingPage['chrdData'],
    corporateEventData: doc.corporateEventData as LandingPage['corporateEventData'],
    ugcRetailData: doc.ugcRetailData as LandingPage['ugcRetailData'],
    fieldServiceData: doc.fieldServiceData as LandingPage['fieldServiceData'],
    smartRouting: doc.smartRouting as LandingPage['smartRouting'],
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
  if (data.scanCount !== undefined) payloadData.scanCount = data.scanCount
  if (data.genericData !== undefined) payloadData.genericData = data.genericData ?? undefined
  if (data.redirectData !== undefined) payloadData.redirectData = data.redirectData ?? undefined
  if (data.artData !== undefined) payloadData.artData = data.artData ?? undefined
  if (data.immoData !== undefined) payloadData.immoData = data.immoData ?? undefined
  if (data.vcardData !== undefined) payloadData.vcardData = data.vcardData ?? undefined
  if (data.productData !== undefined) payloadData.productData = data.productData ?? undefined
  if (data.feedbackData !== undefined) payloadData.feedbackData = data.feedbackData ?? undefined
  if (data.tourismData !== undefined) payloadData.tourismData = data.tourismData ?? undefined
  if (data.chrdData !== undefined) payloadData.chrdData = data.chrdData ?? undefined
  if (data.corporateEventData !== undefined) payloadData.corporateEventData = data.corporateEventData ?? undefined
  if (data.ugcRetailData !== undefined) payloadData.ugcRetailData = data.ugcRetailData ?? undefined
  if (data.fieldServiceData !== undefined) payloadData.fieldServiceData = data.fieldServiceData ?? undefined
  if (data.smartRouting !== undefined) payloadData.smartRouting = data.smartRouting ?? undefined

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
      redirect: pages.filter((p) => p.vertical === 'redirect').length,
      art: pages.filter((p) => p.vertical === 'art').length,
      immo: pages.filter((p) => p.vertical === 'immo').length,
      vcard: pages.filter((p) => p.vertical === 'vcard').length,
      product: pages.filter((p) => p.vertical === 'product').length,
      feedback: pages.filter((p) => p.vertical === 'feedback').length,
      tourism: pages.filter((p) => p.vertical === 'tourism').length,
      chrd: pages.filter((p) => p.vertical === 'chrd').length,
      corporate_event: pages.filter((p) => p.vertical === 'corporate_event').length,
      ugc_retail: pages.filter((p) => p.vertical === 'ugc_retail').length,
      field_service: pages.filter((p) => p.vertical === 'field_service').length,
    },
  }
}

export async function incrementScanCount(id: string): Promise<void> {
  const payload = await getPayload({ config })

  try {
    const doc = await payload.findByID({ collection: 'landing-pages', id, depth: 0 })
    const currentCount = typeof doc.scanCount === 'number' ? doc.scanCount : 0
    await payload.update({
      collection: 'landing-pages',
      id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { scanCount: currentCount + 1 } as any,
    })
  } catch {
    // Best-effort — don't throw on analytics failure
  }
}

export async function getAllMedia() {
  const payload = await getPayload({ config })
  
  const result = await payload.find({
    collection: 'media',
    limit: 200,
    sort: '-createdAt',
  })

  return result.docs
}

export async function createMedia(file: {
  data: Buffer
  mimetype: string
  name: string
  size: number
}, alt?: string) {
  const payload = await getPayload({ config })

  return payload.create({
    collection: 'media',
    data: {
      alt: alt || file.name.replace(/\.[^.]+$/, ''),
    },
    file,
  })
}
