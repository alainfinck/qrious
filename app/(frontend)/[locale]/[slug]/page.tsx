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
  'features',
  'demo',
  'galeries',
  'about',
  'contact',
  'solutions',
])

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const pageData = await getLandingPageBySlug(slug)

  if (!pageData) {
    return { title: 'Page introuvable' }
  }

  return {
    title: pageData.title,
    description: `Landing page ${pageData.vertical} — ${pageData.title}`,
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

