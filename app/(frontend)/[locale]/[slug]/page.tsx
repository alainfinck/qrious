import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'

import { LandingPageRouter } from '@/components/landing/LandingPageRouter'
import { getLandingPageBySlug } from '@/lib/payload'
import { resolveSmartRoute } from '@/lib/smart-routing'

interface PageProps {
  params: Promise<{ slug: string }>
}

const RESERVED_SLUGS = new Set([
  'dashboard',
  'api',
  'admin',
  'cms',
  'editeur',
  'newqr',
  'features',
  'demo',
  'scanner',
  'galeries',
  'about',
  'contact',
  'solutions',
  'pricing',
  'tarifs',
  'generateur',
])

function landingDescription(page: NonNullable<Awaited<ReturnType<typeof getLandingPageBySlug>>>): string {
  const candidates = [
    page.genericData?.subheadline,
    page.genericData?.body,
    page.artData?.description,
    page.immoData?.welcomeMessage,
    page.vcardData?.bio,
    page.vcardData?.jobTitle,
    page.productData?.description,
    page.feedbackData?.subheading,
    page.feedbackData?.heading,
    page.tourismData?.description,
    page.chrdData?.welcomeMessage,
    page.corporateEventData?.welcomeMessage,
    page.ugcRetailData?.instructions,
    page.redirectData?.label,
    page.redirectData?.targetUrl,
  ]
  const found = candidates.find((v) => typeof v === 'string' && v.trim().length > 0)
  if (found) return found.trim().slice(0, 200)
  return `${page.title} — page dynamique QRious`
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const pageData = await getLandingPageBySlug(slug)

  if (!pageData) {
    return { title: 'Page introuvable' }
  }

  const description = landingDescription(pageData)
  const baseUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')
  const pageUrl = `${baseUrl}/${pageData.slug}`
  const logo =
    pageData.theme?.logo && typeof pageData.theme.logo === 'object'
      ? pageData.theme.logo.url
      : null

  return {
    title: pageData.title,
    description,
    openGraph: {
      title: pageData.title,
      description,
      url: pageUrl,
      type: 'website',
      siteName: 'QRious',
      ...(logo ? { images: [{ url: logo }] } : {}),
    },
    twitter: {
      card: logo ? 'summary_large_image' : 'summary',
      title: pageData.title,
      description,
      ...(logo ? { images: [logo] } : {}),
    },
  }
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params

  if (RESERVED_SLUGS.has(slug)) {
    notFound()
  }

  let pageData = await getLandingPageBySlug(slug)

  if (!pageData) {
    notFound()
  }

  // Evaluation du Smart Routing (Règles Horaires, Chronologie Événementielle, A/B Testing)
  const routeResult = resolveSmartRoute(pageData)

  if (routeResult.targetSlug && routeResult.targetSlug !== slug) {
    // Si une redirection vers un autre slug est configurée
    const targetPageData = await getLandingPageBySlug(routeResult.targetSlug)
    if (targetPageData) {
      pageData = targetPageData
    }
  }

  // Surcharges optionnelles selon la règle active
  if (routeResult.activeTimeSlot?.customHeadline && pageData.chrdData) {
    pageData = {
      ...pageData,
      chrdData: {
        ...pageData.chrdData,
        welcomeMessage: routeResult.activeTimeSlot.customHeadline,
      },
    }
  }

  return <LandingPageRouter pageData={pageData} />
}

