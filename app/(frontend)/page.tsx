import { CtaSection } from '@/components/marketing/CtaSection'
import { FeaturesSection } from '@/components/marketing/FeaturesSection'
import { HeroSection } from '@/components/marketing/HeroSection'
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
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
        <FeaturesSection />
        <VerticalsSection />
        <HowItWorksSection />
        <WhiteLabelSection />
        <CtaSection />
      </main>
      <MarketingFooter />
    </div>
  )
}
