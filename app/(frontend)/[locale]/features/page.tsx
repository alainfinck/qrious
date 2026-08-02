'use client'

import Link from 'next/link'
import {
  BarChart3,
  Download,
  FileText,
  Globe,
  LayoutDashboard,
  Palette,
  QrCode,
  Share2,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'

import { CtaSection } from '@/components/marketing/CtaSection'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { DotPattern } from '@/components/ui/dot-pattern'
import { MagicCard } from '@/components/ui/magic-card'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Particles } from '@/components/ui/particles'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: QrCode,
    title: 'QR codes dynamiques',
    description: 'Un QR imprimé une fois, un contenu que vous mettez à jour à volonté.',
  },
  {
    icon: FileText,
    title: 'Templates métiers',
    description: 'Art, immobilier, vCard — des champs adaptés à chaque vertical.',
  },
  {
    icon: Palette,
    title: 'Marque blanche',
    description: 'Logo et couleur primaire : vos landings portent votre identité.',
  },
  {
    icon: LayoutDashboard,
    title: 'Tableau de bord',
    description: 'Créez, publiez et gérez tous vos QR depuis un seul espace.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-first',
    description: 'Landings optimisées pour le scan smartphone, rapides et lisibles.',
  },
  {
    icon: BarChart3,
    title: 'Statistiques',
    description: 'Suivez les scans et l’engagement de vos pages en un coup d’œil.',
  },
  {
    icon: Share2,
    title: 'Partage instantané',
    description: 'URL unique, QR téléchargeable, prêt pour print ou digital.',
  },
  {
    icon: Download,
    title: 'Export QR',
    description: 'Téléchargez vos QR en haute qualité pour l’impression.',
  },
  {
    icon: Globe,
    title: 'En ligne en secondes',
    description: 'Publiez et partagez immédiatement — zéro déploiement technique.',
  },
  {
    icon: ShieldCheck,
    title: 'Fiable & sécurisé',
    description: 'Hébergement moderne, données protégées, pages toujours disponibles.',
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-dvh bg-mq-paper font-body">
      <MarketingHeader />
      <main>
        <section className="relative overflow-hidden bg-mq-ink pt-32 pb-24 text-white lg:pt-40 lg:pb-28">
          <div className="absolute inset-0" aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#1a3d36_0%,transparent_50%)]" />
            <Particles quantity={50} color="#0f9f8a" size={0.4} className="absolute inset-0" />
            <DotPattern
              className={cn(
                'text-white/10 [mask-image:radial-gradient(500px_circle_at_70%_40%,white,transparent)]',
              )}
              width={28}
              height={28}
            />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <BlurFade delay={0.1} inView>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mq-signal">
                Fonctionnalités
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                La suite complète pour des QR professionnels
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
                Créez, personnalisez et publiez des landing pages scannables — sans code, sans
                réimpression.
              </p>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href="/demo">
                  <ShimmerButton
                    background="linear-gradient(135deg, #0f9f8a 0%, #0b7a6a 100%)"
                    shimmerColor="#e8fff9"
                    borderRadius="12px"
                    className="h-12 px-6"
                  >
                    <span className="font-semibold text-mq-ink">Voir la démo</span>
                  </ShimmerButton>
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 px-6 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Voir les tarifs
                </Link>
              </div>
            </BlurFade>
            <BlurFade delay={0.3} inView>
              <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 sm:max-w-lg">
                <div>
                  <div className="font-display text-2xl font-bold text-white">
                    <NumberTicker value={10} className="text-white" />+
                  </div>
                  <div className="text-sm text-white/45">Fonctionnalités</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-white">
                    <NumberTicker value={100} className="text-white" />%
                  </div>
                  <div className="text-sm text-white/45">Responsive</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-white">
                    <NumberTicker value={3} className="text-white" />
                  </div>
                  <div className="text-sm text-white/45">Verticals</div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <BlurFade key={feature.title} delay={0.05 + index * 0.04} inView>
                  <MagicCard
                    className="h-full rounded-2xl"
                    gradientFrom="#0f9f8a"
                    gradientTo="#5eead4"
                    gradientColor="#0f9f8a14"
                    gradientOpacity={0.45}
                  >
                    <div className="flex h-full flex-col gap-4 p-7">
                      <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-mq-signal/20 border border-mq-signal/30 text-mq-ink shadow-sm">
                        <feature.icon className="h-7 w-7" />
                      </span>
                      <h3 className="font-display text-lg font-semibold text-mq-ink">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-mq-muted">{feature.description}</p>
                    </div>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-mq-ink/5 bg-white/50 py-20">
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl border border-mq-ink/8 bg-mq-ink p-8 text-white sm:p-12">
              <BorderBeam size={120} duration={10} colorFrom="#0f9f8a" colorTo="#5eead4" />
              <BlurFade delay={0.1} inView>
                <h2 className="font-display text-2xl font-bold sm:text-3xl">
                  Prêt à tester sur votre métier ?
                </h2>
                <p className="mt-3 max-w-lg text-white/55">
                  Créez votre premier QR en quelques minutes et voyez le résultat sur mobile.
                </p>
                <Link href="/dashboard/register" className="mt-8 inline-block">
                  <ShimmerButton
                    background="linear-gradient(135deg, #0f9f8a 0%, #0b7a6a 100%)"
                    shimmerColor="#e8fff9"
                    borderRadius="12px"
                    className="h-11 px-5"
                  >
                    <span className="font-semibold text-mq-ink">Commencer gratuitement</span>
                  </ShimmerButton>
                </Link>
              </BlurFade>
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <MarketingFooter />
    </div>
  )
}
