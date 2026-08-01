import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { LandingPageRouter } from '@/components/landing/LandingPageRouter'
import { getLandingPageBySlug } from '@/lib/payload'

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

  const pageData = await getLandingPageBySlug(slug)

  if (!pageData) {
    notFound()
  }

  return <LandingPageRouter pageData={pageData} />
}
