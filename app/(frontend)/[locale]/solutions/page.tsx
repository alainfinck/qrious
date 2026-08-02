'use client'

import React from 'react'
import Link from 'next/link'
import {
  Utensils,
  Calendar,
  ShoppingBag,
  Wrench,
  Palette,
  Building2,
  Contact,
  QrCode,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Globe,
  FileText,
  Wifi,
  Smartphone,
  Tag,
  Star,
  Award,
  Layers,
  BarChart3,
} from 'lucide-react'

import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { CtaSection } from '@/components/marketing/CtaSection'
import { QuickStepsSection } from '@/components/marketing/QuickStepsSection'
import { LandingPageTemplatesSection } from '@/components/marketing/LandingPageTemplatesSection'
import { QrPrintMediumsSection } from '@/components/marketing/QrPrintMediumsSection'
import { DisclaimerSection } from '@/components/marketing/DisclaimerSection'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { MagicCard } from '@/components/ui/magic-card'
import { ShimmerButton } from '@/components/ui/shimmer-button'

const ALL_VERTICALS = [
  {
    slug: 'chrd',
    title: 'Solution CHRD : Hôtellerie & Restauration',
    badge: 'Hôtels, Restos & Campings',
    icon: Utensils,
    accentColor: '#e11d48',
    gradient: 'from-rose-950 via-slate-900 to-slate-950',
    description:
      'Proposez une expérience haut de gamme dès le premier scan sur table ou en chambre : menu digital interactif, Wi-Fi invité instantané, avis Google et carte postale physique offerte.',
    highlights: [
      'Menu digital toujours à jour avec photos HD',
      'Accès Wi-Fi automatique sans saisie de passe',
      'Boost automatique de vos avis Google & TripAdvisor',
      'Option Cadeau Carte Postale physique souvenir',
    ],
  },
  {
    slug: 'corporate-event',
    title: 'Événementiel B2B & Séminaires',
    badge: 'Corporate & Séminaires',
    icon: Calendar,
    accentColor: '#6366f1',
    gradient: 'from-indigo-950 via-slate-900 to-slate-950',
    description:
      'Centralisez les ressources de vos conférences et engagez votre audience avec un Live Wall photo interactif et le partage direct de présentations PDF.',
    highlights: [
      'Mur photo collaboratif en direct (Live Wall)',
      'Ordre du jour & programme des conférences',
      'Téléchargement direct des présentations PDF',
      'Code Wi-Fi invités partagé en un scan',
    ],
  },
  {
    slug: 'ugc-retail',
    title: 'Retail & Concours Photo UGC',
    badge: 'Retail & E-commerce',
    icon: ShoppingBag,
    accentColor: '#a855f7',
    gradient: 'from-purple-950 via-slate-900 to-slate-950',
    description:
      'Transformez vos emballages et tickets de caisse en générateurs d’UGC : vos acheteurs envoient une photo de leur achat pour débloquer un coupon de réduction exclusif.',
    highlights: [
      'Activation directe sur packaging ou ticket',
      'Collecte de contenus utilisateurs authentiques',
      'Attribution automatique de codes promo',
      'Fidélisation et augmentation du réachat',
    ],
  },
  {
    slug: 'field-service',
    title: 'Field Service & Maintenance Équipements',
    badge: 'Maintenance & Industrie',
    icon: Wrench,
    accentColor: '#059669',
    gradient: 'from-emerald-950 via-slate-900 to-slate-950',
    description:
      'Identifiez vos équipements sur le terrain grâce à des étiquettes QR durables : accès direct aux manuels techniques, fiches de sécurité et formulaires d’intervention.',
    highlights: [
      'Fiche technique et historique d’intervention',
      'Formulaire de signalement de panne instantané',
      'Accès direct aux notices et schémas PDF',
      'Historique de maintenance centralisé',
    ],
  },
  {
    slug: 'art',
    title: 'Art & Galeries d’Exposition',
    badge: 'Culture & Galeries',
    icon: Palette,
    accentColor: '#d97706',
    gradient: 'from-amber-950 via-slate-900 to-slate-950',
    description:
      'Mettez en valeur chaque œuvre d’art avec un cartel digital complet : biographie de l’artiste, vidéo d’atelier, dimensions et formulaire de demande d’acquisition.',
    highlights: [
      'Cartel digital interactif pour œuvres d’art',
      'Intégration vidéo et audioguide',
      'Lien direct vers le profil Instagram de l’artiste',
      'Bouton de demande de prix & réservation',
    ],
  },
]

const QUICK_TYPES = [
  { label: 'Site Web', icon: Globe, color: 'text-sky-400' },
  { label: 'Menu Digital', icon: Utensils, color: 'text-rose-400' },
  { label: 'PDF & Brochure', icon: FileText, color: 'text-emerald-400' },
  { label: 'vCard Contact', icon: Contact, color: 'text-amber-400' },
  { label: 'Wi-Fi Guest', icon: Wifi, color: 'text-indigo-400' },
  { label: 'Réseaux Sociaux', icon: Smartphone, color: 'text-purple-400' },
  { label: 'Coupons Promo', icon: Tag, color: 'text-yellow-400' },
  { label: 'Avis Google', icon: Star, color: 'text-amber-300' },
]

export default function SolutionsPage() {
  return (
    <div className="min-h-dvh bg-mq-paper font-body">
      <MarketingHeader />

      <main>
        {/* Main Hero Banner */}
        <section className="relative overflow-hidden bg-mq-ink pt-32 pb-24 text-white lg:pt-40 lg:pb-32">
          <div className="absolute inset-0" aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#102536_0%,#0b1220_70%)]" />
            <div className="mq-blob absolute left-1/4 top-10 h-72 w-72 rounded-full bg-mq-signal/20 blur-[100px]" />
            <div className="mq-blob-delay absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-mq-coral/20 blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <BlurFade delay={0.1} inView>
              <div className="text-center max-w-3xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-mq-signal backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Solutions QR Codes Intelligentes</span>
                </div>
                <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                  Un univers de solutions pour chaque <span className="mq-rainbow-text">métier</span>
                </h1>
                <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
                  Découvrez nos landing pages dynamiques sur-mesure et nos QR codes vectoriels pour l’hôtellerie, l’événementiel, le retail, l’art et la maintenance.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <Link href="/editeur">
                    <ShimmerButton
                      background="linear-gradient(135deg, #12c4a8 0%, #0b7a6a 100%)"
                      shimmerColor="#e8fff9"
                      borderRadius="12px"
                      className="h-12 px-7"
                    >
                      <span className="font-bold text-mq-ink flex items-center gap-2">
                        Créer mon premier QR
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </ShimmerButton>
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    Voir les offres & tarifs
                  </Link>
                </div>
              </div>
            </BlurFade>

            {/* Quick Type Chips Selector Banner */}
            <BlurFade delay={0.2} inView>
              <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <p className="text-center text-xs font-bold uppercase tracking-wider text-white/60 mb-4">
                  Types de QR Codes supportés instantanément
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {QUICK_TYPES.map((t, idx) => {
                    const Icon = t.icon
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/90 transition-all hover:bg-white/15 hover:scale-[1.03]"
                      >
                        <Icon className={`h-4 w-4 ${t.color}`} />
                        <span>{t.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Vertical Deep-Dive Section */}
        <section className="py-24 sm:py-32 bg-mq-paper">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-16">
            <BlurFade delay={0.1} inView>
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wider text-mq-coral">
                  Par Métier & Secteur
                </p>
                <h2 className="font-display text-3xl font-bold tracking-tight text-mq-ink sm:text-5xl">
                  Découvrez nos <span className="mq-rainbow-text">5 verticals</span> d'excellence
                </h2>
                <p className="text-base text-mq-muted leading-relaxed">
                  Chaque vertical dispose d’une landing page personnalisée, de champs métiers natifs et d'un tableau de bord de gestion direct.
                </p>
              </div>
            </BlurFade>

            <div className="grid gap-8 lg:grid-cols-2">
              {ALL_VERTICALS.map((v, index) => {
                const Icon = v.icon
                return (
                  <BlurFade key={v.slug} delay={0.08 + index * 0.06} inView>
                    <MagicCard
                      className="group relative flex flex-col justify-between h-full overflow-hidden rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl"
                      gradientFrom={v.accentColor}
                      gradientTo="#ffffff"
                      gradientOpacity={0.15}
                    >
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <span
                            className="flex h-13 w-13 items-center justify-center rounded-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-105"
                            style={{ backgroundColor: v.accentColor }}
                          >
                            <Icon className="h-7 w-7" />
                          </span>
                          <span className="text-xs font-bold text-mq-ink bg-mq-mist px-3 py-1 rounded-full border border-mq-ink/10">
                            {v.badge}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-display text-2xl font-bold text-mq-ink group-hover:text-mq-coral transition-colors">
                            {v.title}
                          </h3>
                          <p className="mt-3 text-sm text-mq-muted leading-relaxed">
                            {v.description}
                          </p>
                        </div>

                        <ul className="space-y-2.5 border-t border-mq-ink/5 pt-4">
                          {v.highlights.map((h, i) => (
                            <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-mq-ink/90">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-4 border-t border-mq-ink/5 flex items-center justify-between">
                        <Link
                          href={`/solutions/${v.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-bold text-mq-ink hover:text-mq-coral transition-colors group/link"
                        >
                          <span>Voir la présentation complète</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                        <Link
                          href="/editeur"
                          className="text-xs font-semibold text-mq-muted hover:text-mq-ink underline"
                        >
                          Créer le QR
                        </Link>
                      </div>
                    </MagicCard>
                  </BlurFade>
                )
              })}
            </div>
          </div>
        </section>

        {/* Tabbed Interactive Feature Showcase (QuickStepsSection) */}
        <QuickStepsSection />

        {/* Landing Page Templates Explorer (LandingPageTemplatesSection) */}
        <LandingPageTemplatesSection />

        {/* QR Print Mediums Showcase (QrPrintMediumsSection) */}
        <QrPrintMediumsSection />

        {/* Transparency & Legal Disclaimers (DisclaimerSection) */}
        <DisclaimerSection />

        {/* Call to action section */}
        <CtaSection />
      </main>

      <MarketingFooter />
    </div>
  )
}
