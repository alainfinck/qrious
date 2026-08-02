'use client'

import Link from 'next/link'
import { Building2, Check, Sparkles, Zap } from 'lucide-react'

import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { MagicCard } from '@/components/ui/magic-card'
import { Particles } from '@/components/ui/particles'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Découverte',
    price: '0',
    period: '/mois',
    blurb: 'Pour tester QRious sans engagement',
    cta: 'Commencer gratuitement',
    href: '/dashboard/register',
    featured: false,
    tone: 'border-mq-ink/10',
    features: [
      '2 QR codes',
      'Landing page enrichie',
      'Statistiques de base',
      'Design responsive',
      'Éditeur QR gratuit',
    ],
  },
  {
    name: 'Starter',
    price: '29',
    period: '/mois',
    blurb: 'Parfait pour démarrer professionnellement',
    cta: 'Essayer 14 jours',
    href: '/dashboard/register',
    featured: true,
    tone: 'border-mq-coral/40',
    features: [
      "Jusqu'à 100 QR codes",
      'Templates métiers (art, immo, vCard)',
      'Statistiques de base',
      'Support par email',
      'Design responsive',
      'Marque blanche légère',
    ],
  },
  {
    name: 'Professional',
    price: '79',
    period: '/mois',
    blurb: 'Pour les pros et les petites équipes',
    cta: 'Choisir Professional',
    href: '/dashboard/register',
    featured: false,
    tone: 'border-mq-sky/35',
    features: [
      "Jusqu'à 500 QR codes",
      'Toutes les fonctionnalités Starter',
      'Statistiques avancées',
      'Personnalisation avancée',
      'Intégrations (Instagram, liens)',
      'Support prioritaire',
      'Export des données',
    ],
  },
]

const galleryPerks = [
  {
    icon: Sparkles,
    title: 'Branding personnalisé',
    desc: 'Logo, couleurs et style intégrés à chaque landing.',
  },
  {
    icon: Zap,
    title: 'Mise en avant des artistes',
    desc: 'Profils, biographies et portfolios accessibles au scan.',
  },
  {
    icon: Building2,
    title: 'Analytics détaillés',
    desc: "Suivez l'engagement et l'impact de vos expositions.",
  },
]

export default function PricingPageClient() {
  return (
    <div className="min-h-dvh bg-mq-paper font-body">
      <MarketingHeader />
      <main>
        <section className="relative overflow-hidden bg-mq-ink pt-32 pb-24 text-white lg:pt-40 lg:pb-28">
          <Particles quantity={50} color="#12c4a8" size={0.4} className="absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,#ff5c4d33_0%,transparent_45%)]" />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <BlurFade delay={0.1} inView>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mq-sun">Tarifs</p>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Tarifs simples et <span className="mq-rainbow-text">transparents</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-white/60">
                Choisissez le plan qui correspond à vos besoins. Tous les plans payants incluent un
                essai gratuit de 14 jours.
              </p>
            </BlurFade>
          </div>
        </section>

        <section className="relative z-10 -mt-10 pb-20">
          <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <BlurFade key={plan.name} delay={0.1 + index * 0.08} inView>
                <div
                  className={cn(
                    'relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-7',
                    plan.tone,
                    plan.featured &&
                      'scale-[1.02] shadow-[0_30px_60px_-30px_rgba(255,92,77,0.35)]',
                  )}
                >
                  {plan.featured && (
                    <>
                      <BorderBeam
                        size={120}
                        duration={8}
                        colorFrom="#ff5c4d"
                        colorTo="#ffc53d"
                        borderWidth={1.5}
                      />
                      <span className="absolute right-4 top-4 rounded-xl bg-mq-coral px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                        Populaire
                      </span>
                    </>
                  )}
                  <p className="font-display text-xl font-bold text-mq-ink">{plan.name}</p>
                  <p className="mt-1 text-sm text-mq-muted">{plan.blurb}</p>
                  <div className="mt-6 flex items-end gap-1">
                    <span className="font-display text-5xl font-bold text-mq-ink">{plan.price}€</span>
                    <span className="mb-1.5 text-sm text-mq-muted">{plan.period}</span>
                  </div>
                  <ul className="mt-8 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-mq-ink/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-mq-signal" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href} className="mt-8 block">
                    {plan.featured ? (
                      <ShimmerButton
                        className="h-11 w-full"
                        background="linear-gradient(135deg, #ff5c4d 0%, #ffc53d 100%)"
                        shimmerColor="#fff7e8"
                        borderRadius="12px"
                      >
                        <span className="font-semibold text-mq-ink">{plan.cta}</span>
                      </ShimmerButton>
                    ) : (
                      <span className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-mq-ink/15 bg-mq-paper text-sm font-semibold text-mq-ink transition-colors hover:bg-mq-mist">
                        {plan.cta}
                      </span>
                    )}
                  </Link>
                </div>
              </BlurFade>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl px-4 text-center text-sm text-mq-muted sm:px-6">
            Besoin de comparer les fonctionnalités ?{' '}
            <Link href="/features" className="font-medium text-mq-signal-deep hover:underline">
              Voir toutes les fonctionnalités
            </Link>
          </p>
        </section>

        <section className="border-t border-mq-ink/5 bg-white/50 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <BlurFade delay={0.1} inView>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mq-coral">
                Pour les galeries
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-mq-ink sm:text-4xl">
                Mettez en avant votre branding et vos artistes
              </h2>
              <p className="mt-4 max-w-2xl text-mq-muted">
                Créez une expérience digitale qui reflète votre identité et valorise vos artistes —
                sans réimprimer à chaque exposition.
              </p>
            </BlurFade>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {galleryPerks.map((perk, i) => (
                <BlurFade key={perk.title} delay={0.1 + i * 0.06} inView>
                  <MagicCard
                    className="h-full rounded-2xl"
                    gradientFrom="#ff5c4d"
                    gradientTo="#12c4a8"
                    gradientColor="#ff5c4d14"
                  >
                    <div className="flex h-full flex-col gap-3 p-6">
                      <perk.icon className="h-6 w-6 text-mq-coral" />
                      <h3 className="font-display text-lg font-semibold text-mq-ink">{perk.title}</h3>
                      <p className="text-sm text-mq-muted">{perk.desc}</p>
                    </div>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/galeries">
                <ShimmerButton
                  background="#0b1220"
                  shimmerColor="#12c4a8"
                  borderRadius="12px"
                  className="h-11 px-5"
                >
                  <span className="font-semibold text-white">Découvrir pour les galeries</span>
                </ShimmerButton>
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center rounded-xl border border-mq-ink/15 px-5 text-sm font-semibold text-mq-ink hover:bg-mq-mist"
              >
                Demander une démo
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-mq-ink px-6 py-12 text-white sm:px-10">
            <BorderBeam size={140} duration={10} colorFrom="#12c4a8" colorTo="#ffc53d" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,#3dbbff33_0%,transparent_50%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mq-sky">
                  Enterprise
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold">
                  Solution sur-mesure pour les institutions
                </h2>
                <p className="mt-3 text-white/60">
                  QR illimités, API, analytics détaillés, accompagnement dédié et développements sur
                  mesure.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-white/75">
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-mq-signal" /> Support 24/7 & formation équipes
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-mq-signal" /> Consultant dédié
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-mq-signal" /> Personnalisation complète
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
                <p className="font-display text-4xl font-bold">
                  199€<span className="text-base font-medium text-white/50">/mois</span>
                </p>
                <p className="mt-2 text-sm text-white/50">Facturation annuelle possible</p>
                <Link href="/contact" className="mt-6 inline-block w-full">
                  <ShimmerButton
                    className="h-11 w-full"
                    background="linear-gradient(135deg, #12c4a8 0%, #3dbbff 100%)"
                    shimmerColor="#e8fff9"
                    borderRadius="12px"
                  >
                    <span className="font-semibold text-mq-ink">Parler à un expert</span>
                  </ShimmerButton>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}
