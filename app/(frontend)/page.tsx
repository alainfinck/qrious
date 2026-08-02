import { CtaSection } from '@/components/marketing/CtaSection'
import { DisclaimerSection } from '@/components/marketing/DisclaimerSection'
import { FeaturesSection } from '@/components/marketing/FeaturesSection'
import { HeroSection } from '@/components/marketing/HeroSection'
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection'
import { LandingPageTemplatesSection } from '@/components/marketing/LandingPageTemplatesSection'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { QrPrintMediumsSection } from '@/components/marketing/QrPrintMediumsSection'
import { QuickStepsSection } from '@/components/marketing/QuickStepsSection'
import { SocialProofSection } from '@/components/marketing/SocialProofSection'
import { VerticalsSection } from '@/components/marketing/VerticalsSection'
import { WhiteLabelSection } from '@/components/marketing/WhiteLabelSection'

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-mq-paper font-body">
      <MarketingHeader />
      <main>
        <HeroSection />
        <SocialProofSection />
        <QuickStepsSection />
        <LandingPageTemplatesSection />
        <VerticalsSection />
        <FeaturesSection />
        <QrPrintMediumsSection />
        <HowItWorksSection />
        <WhiteLabelSection />
        <DisclaimerSection />
        <CtaSection />
      </main>
      <MarketingFooter />
    </div>
  )
}
