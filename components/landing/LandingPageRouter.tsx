import { ArtTemplate } from '@/components/landing/templates/ArtTemplate'
import { GenericTemplate } from '@/components/landing/templates/GenericTemplate'
import { ImmoTemplate } from '@/components/landing/templates/ImmoTemplate'
import { VCardTemplate } from '@/components/landing/templates/VCardTemplate'
import { ProductTemplate } from '@/components/landing/templates/ProductTemplate'
import { FeedbackTemplate } from '@/components/landing/templates/FeedbackTemplate'
import { TourismTemplate } from '@/components/landing/templates/TourismTemplate'
import { ThemeWrapper } from '@/components/landing/ThemeWrapper'
import type { LandingPage } from '@/types/landing-page'

interface LandingPageRouterProps {
  pageData: LandingPage
}

function renderVerticalTemplate(pageData: LandingPage) {
  switch (pageData.vertical) {
    case 'generic':
      return <GenericTemplate pageData={pageData} />
    case 'art':
      return <ArtTemplate pageData={pageData} />
    case 'immo':
      return <ImmoTemplate pageData={pageData} />
    case 'vcard':
      return <VCardTemplate pageData={pageData} slug={pageData.slug} />
    case 'product':
      return <ProductTemplate pageData={pageData} />
    case 'feedback':
      return <FeedbackTemplate pageData={pageData} />
    case 'tourism':
      return <TourismTemplate pageData={pageData} />
    default: {
      const _exhaustive: never = pageData.vertical
      return _exhaustive
    }
  }
}

export function LandingPageRouter({ pageData }: LandingPageRouterProps) {
  return (
    <ThemeWrapper theme={pageData.theme}>
      <main className="mx-auto w-full max-w-lg">
        {renderVerticalTemplate(pageData)}
      </main>
    </ThemeWrapper>
  )
}
