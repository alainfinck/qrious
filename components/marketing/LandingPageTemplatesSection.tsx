'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  Megaphone,
  Utensils,
  Palette,
  Sparkles,
  ArrowRight,
  Check,
  ExternalLink,
  Smartphone,
  Eye,
  Star,
  QrCode,
} from 'lucide-react'

import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { MagicCard } from '@/components/ui/magic-card'

interface TemplateCategory {
  id: string
  label: string
  icon: React.ElementType
  badge: string
  description: string
  items: {
    title: string
    subtitle: string
    tag: string
    gradient: string
    borderColor: string
    accentColor: string
    targetUrl: string
    highlights: string[]
  }[]
}

const CATEGORIES: TemplateCategory[] = [
  {
    id: 'business',
    label: 'Entreprise',
    icon: Building2,
    badge: 'Business & Networking',
    description:
      'Augmentez votre présence commerciale avec des types de code QR personnalisés, liant facilement vos clients à vos services, pages Web, promotions et coordonnées vCard.',
    items: [
      {
        title: 'Carte de visite vCard',
        subtitle: 'Partage instantané de contacts HD',
        tag: 'Populaire',
        gradient: 'from-emerald-950 via-slate-900 to-slate-950',
        borderColor: 'border-emerald-500/30',
        accentColor: '#12c4a8',
        targetUrl: '/solutions/field-service',
        highlights: ['Ajout au carnet d’adresses en 1 clic', 'Photos & Réseaux Sociaux pro', 'V-Card téléchargeable'],
      },
      {
        title: 'Page Entreprise Hub',
        subtitle: 'Vitrine complète multi-services',
        tag: 'Corporate',
        gradient: 'from-blue-950 via-slate-900 to-slate-950',
        borderColor: 'border-blue-500/30',
        accentColor: '#3dbbff',
        targetUrl: '/solutions/corporate-event',
        highlights: ['Présentation équipe & services', 'Horaires d’ouverture', 'Geolocalisation Waze / Maps'],
      },
      {
        title: 'Réseaux Sociaux Pro',
        subtitle: 'Centralisation de vos profils digital',
        tag: 'Social',
        gradient: 'from-indigo-950 via-slate-900 to-slate-950',
        borderColor: 'border-indigo-500/30',
        accentColor: '#6366f1',
        targetUrl: '/features',
        highlights: ['LinkedIn, Twitter, YouTube', 'Stats d’engagement en direct', 'Bouton Suivre instantané'],
      },
      {
        title: 'Coupon & Offre Privilège',
        subtitle: 'Boostez vos ventes directes',
        tag: 'Conversion',
        gradient: 'from-amber-950 via-slate-900 to-slate-950',
        borderColor: 'border-amber-500/30',
        accentColor: '#ffc53d',
        targetUrl: '/solutions/ugc-retail',
        highlights: ['Code promo à scanner en caisse', 'Compte à rebours promotionnel', 'Conditions & règlement PDF'],
      },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing & Retail',
    icon: Megaphone,
    badge: 'Engagement & Ventes',
    description:
      'Renforcez vos campagnes marketing avec des codes QR dynamiques et interactifs, reliant vos acheteurs à des concours photo UGC, vos offres spéciales et votre catalogue produit.',
    items: [
      {
        title: 'Concours Photo UGC Retail',
        subtitle: 'Transformez vos clients en ambassadeurs',
        tag: 'Top ROI',
        gradient: 'from-purple-950 via-slate-900 to-slate-950',
        borderColor: 'border-purple-500/30',
        accentColor: '#a855f7',
        targetUrl: '/solutions/ugc-retail',
        highlights: ['Upload photo sur packaging', 'Attribution de coupons promo', 'Galerie photos modérée'],
      },
      {
        title: 'Lancement d’Application',
        subtitle: 'Détection intelligente iOS / Android',
        tag: 'App Store',
        gradient: 'from-cyan-950 via-slate-900 to-slate-950',
        borderColor: 'border-cyan-500/30',
        accentColor: '#06b6d4',
        targetUrl: '/features',
        highlights: ['Redirection selon le smartphone', 'Badges App Store & Play Store', 'Capture de leads'],
      },
      {
        title: 'Événement & Billetterie',
        subtitle: 'Invitez, confirmez et guidez vos visiteurs',
        tag: 'Événement',
        gradient: 'from-rose-950 via-slate-900 to-slate-950',
        borderColor: 'border-rose-500/30',
        accentColor: '#f43f5e',
        targetUrl: '/solutions/corporate-event',
        highlights: ['Agenda & intervenants', 'Live Wall de photos en direct', 'Code Wi-Fi invité centralisé'],
      },
      {
        title: 'Brochure & Catalogue PDF',
        subtitle: 'Brochure augmentée zéro impression',
        tag: 'Écologique',
        gradient: 'from-teal-950 via-slate-900 to-slate-950',
        borderColor: 'border-teal-500/30',
        accentColor: '#14b8a6',
        targetUrl: '/features',
        highlights: ['Consultation PDF instantanée', 'Mise à jour du document en 1 clic', 'Lien de téléchargement direct'],
      },
    ],
  },
  {
    id: 'chrd',
    label: 'Restaurants & CHRD',
    icon: Utensils,
    badge: 'Hôtellerie & Gastronomie',
    description:
      'Apportez de l’innovation à votre expérience de restaurant ou d’hôtel : créez des QR codes pour partager vos menus digitaux, capturer des avis Google et offrir des cadeaux exclusifs.',
    items: [
      {
        title: 'Menu & Carte Digitale',
        subtitle: 'Menu sur smartphone avec photos gourmandes',
        tag: 'Incontournable',
        gradient: 'from-rose-950 via-slate-900 to-slate-950',
        borderColor: 'border-rose-500/30',
        accentColor: '#e11d48',
        targetUrl: '/solutions/chrd',
        highlights: ['Filtre allergènes & plats du jour', 'Photos HD des assiettes', 'Multilingue automatique'],
      },
      {
        title: 'Boost Avis Google & TripAdvisor',
        subtitle: 'Augmentez votre note moyenne facilement',
        tag: 'Réputation',
        gradient: 'from-amber-950 via-slate-900 to-slate-950',
        borderColor: 'border-amber-500/30',
        accentColor: '#f59e0b',
        targetUrl: '/solutions/chrd',
        highlights: ['Redirection directe vers dépôt d’avis', 'Capture d’avis privés si mécontent', 'QR sur chevalet de table'],
      },
      {
        title: 'Connexion Wi-Fi Invité',
        subtitle: 'Partage de mot de passe sans saisie',
        tag: 'Confort',
        gradient: 'from-sky-950 via-slate-900 to-slate-950',
        borderColor: 'border-sky-500/30',
        accentColor: '#0ea5e9',
        targetUrl: '/solutions/chrd',
        highlights: ['Connexion automatique en 1 scan', 'Affichage du réseau Guest', 'Sécurité renforcée'],
      },
      {
        title: 'Cadeau Carte Postale Physio-Digitale',
        subtitle: 'Une carte postale physique offerte',
        tag: 'Fidélisation',
        gradient: 'from-emerald-950 via-slate-900 to-slate-950',
        borderColor: 'border-emerald-500/30',
        accentColor: '#10b981',
        targetUrl: '/solutions/chrd',
        highlights: ['Impression et envoi réel de carte', 'Effet Wouah garanti pour vos hôtes', 'Augmentation de la note de séjour'],
      },
    ],
  },
  {
    id: 'art_creative',
    label: 'Art & Créateurs',
    icon: Palette,
    badge: 'Culture & Personal Branding',
    description:
      'Générez un QR code personnalisé qui guide vos visiteurs vers une galerie d’art, votre portfolio vidéo, vos morceaux de musique ou votre cartographie d’exposition.',
    items: [
      {
        title: 'Cartel d’Art & Galerie',
        subtitle: 'Mettez en valeur chaque œuvre d’art',
        tag: 'Exposition',
        gradient: 'from-amber-950 via-slate-900 to-slate-950',
        borderColor: 'border-amber-500/30',
        accentColor: '#d97706',
        targetUrl: '/galeries',
        highlights: ['Dimensions, médium & biographie', 'Vidéo de l’artiste au travail', 'Bouton d’acquisition / devis'],
      },
      {
        title: 'Portfolio & Book Vidéo',
        subtitle: 'Montrez vos réalisations en haute définition',
        tag: 'Créatif',
        gradient: 'from-indigo-950 via-slate-900 to-slate-950',
        borderColor: 'border-indigo-500/30',
        accentColor: '#4f46e5',
        targetUrl: '/galeries',
        highlights: ['Intégration YouTube & Vimeo', 'Galerie photo lightbox', 'Lien de booking direct'],
      },
      {
        title: 'Lecteur Musique / MP3',
        subtitle: 'Partagez vos sons & podcasts',
        tag: 'Audio',
        gradient: 'from-fuchsia-950 via-slate-900 to-slate-950',
        borderColor: 'border-fuchsia-500/30',
        accentColor: '#c026d3',
        targetUrl: '/features',
        highlights: ['Lecteur audio web intégré', 'Lien Spotify / Apple Music', 'Téléchargement de morceaux'],
      },
      {
        title: 'Link-in-Bio Créateur',
        subtitle: 'Le hub unique pour vos réseaux',
        tag: 'Influencer',
        gradient: 'from-rose-950 via-slate-900 to-slate-950',
        borderColor: 'border-rose-500/30',
        accentColor: '#e11d48',
        targetUrl: '/features',
        highlights: ['Design personnalisé & thèmes dark', 'Boutique / Tipeee / Merch', 'Statistiques de clics'],
      },
    ],
  },
]

export function LandingPageTemplatesSection() {
  const [activeCatId, setActiveCatId] = useState<string>('business')
  const currentCategory = CATEGORIES.find((c) => c.id === activeCatId) || CATEGORIES[0]

  return (
    <section className="relative overflow-hidden bg-mq-paper py-24 sm:py-32">
      <div
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-mq-signal/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-mq-coral/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <BlurFade delay={0.1} inView>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mq-coral">
              Bibliothèque de modèles
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-mq-ink sm:text-5xl lg:text-6xl">
              Explorez les modèles de <span className="mq-rainbow-text">Landing Pages</span>
            </h2>
            <p className="text-lg text-mq-muted leading-relaxed">
              Une solution prête à l’emploi pour chaque métier, secteur et campagne marketing.
            </p>
          </div>
        </BlurFade>

        {/* Category Selector Tabs */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white p-2 border border-mq-ink/10 shadow-sm">
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCatId
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCatId(cat.id)}
                  className={`flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-mq-ink text-white shadow-md scale-[1.02]'
                      : 'text-mq-muted hover:bg-mq-mist hover:text-mq-ink'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-mq-signal' : 'text-mq-muted'}`} />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Description Banner */}
        <BlurFade key={currentCategory.id} delay={0.05} inView>
          <p className="mt-8 text-center text-sm sm:text-base text-mq-muted max-w-2xl mx-auto font-medium">
            {currentCategory.description}
          </p>

          {/* Cards Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {currentCategory.items.map((item, idx) => (
              <MagicCard
                key={idx}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                gradientFrom={item.accentColor}
                gradientTo="#ffffff"
                gradientOpacity={0.15}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-mq-mist px-3 py-1 text-xs font-bold text-mq-ink border border-mq-ink/10">
                      {item.tag}
                    </span>
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.accentColor }}
                    />
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold text-mq-ink group-hover:text-mq-coral transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-mq-muted leading-relaxed font-medium">
                      {item.subtitle}
                    </p>
                  </div>

                  <ul className="space-y-2 border-t border-mq-ink/5 pt-3">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-mq-ink/80">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-mq-ink/5 flex items-center justify-between">
                  <Link
                    href={item.targetUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-mq-ink hover:text-mq-signal transition-colors"
                  >
                    <span>Explorer</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/editeur"
                    className="text-[11px] font-semibold text-mq-muted hover:text-mq-ink underline"
                  >
                    Essayer le QR
                  </Link>
                </div>
              </MagicCard>
            ))}
          </div>
        </BlurFade>

        {/* View All Solutions Link */}
        <div className="mt-14 text-center">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 font-display text-base font-bold text-mq-ink hover:text-mq-coral transition-colors group"
          >
            <span>Explorer l'ensemble des univers & templates QRious</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
