import { ArtTemplate } from '@/components/landing/templates/ArtTemplate'
import { GenericTemplate } from '@/components/landing/templates/GenericTemplate'
import { ImmoTemplate } from '@/components/landing/templates/ImmoTemplate'
import { VCardTemplate } from '@/components/landing/templates/VCardTemplate'
import { ProductTemplate } from '@/components/landing/templates/ProductTemplate'
import { FeedbackTemplate } from '@/components/landing/templates/FeedbackTemplate'
import { TourismTemplate } from '@/components/landing/templates/TourismTemplate'
import { ChrdTemplate } from '@/components/landing/templates/ChrdTemplate'
import { CorporateEventTemplate } from '@/components/landing/templates/CorporateEventTemplate'
import { UgcRetailTemplate } from '@/components/landing/templates/UgcRetailTemplate'
import { FieldServiceTemplate } from '@/components/landing/templates/FieldServiceTemplate'
import { ThemeWrapper } from '@/components/landing/ThemeWrapper'
import type { LandingPage } from '@/types/landing-page'

interface LandingPageRouterProps {
  pageData: LandingPage
}

function renderVerticalTemplate(pageData: LandingPage) {
  switch (pageData.vertical) {
    case 'generic':
      return <GenericTemplate pageData={pageData} />
    case 'redirect':
      // Les QR codes redirect passent par /api/scan/[slug] et redirigent directement
      // Si on arrive ici c'est via l'URL directe - afficher une page de redirection
      return (
        <div className="flex min-h-screen items-center justify-center p-8">
          <div className="text-center space-y-4">
            <div className="text-4xl">↗️</div>
            <h1 className="text-xl font-bold">{pageData.title}</h1>
            {pageData.redirectData?.targetUrl && (
              <>
                <p className="text-muted-foreground text-sm">Vous allez être redirigé vers :</p>
                <a
                  href={pageData.redirectData.targetUrl}
                  className="text-primary underline break-all"
                >
                  {pageData.redirectData.targetUrl}
                </a>
                <meta httpEquiv="refresh" content={`0;url=${pageData.redirectData.targetUrl}`} />
              </>
            )}
          </div>
        </div>
      )
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
    case 'chrd':
      return <ChrdTemplate pageData={pageData} />
    case 'corporate_event':
      return <CorporateEventTemplate pageData={pageData} />
    case 'ugc_retail':
      return <UgcRetailTemplate pageData={pageData} />
    case 'field_service':
      return <FieldServiceTemplate pageData={pageData} />
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

