'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { useParams, notFound } from 'next/navigation'
import {
  Utensils,
  Calendar,
  ShoppingBag,
  Wrench,
  Palette,
  Building2,
  Contact,
  Compass,
  Star,
  Box,
  CheckCircle2,
  QrCode,
  Sparkles,
} from 'lucide-react'

import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { CtaSection } from '@/components/marketing/CtaSection'
import { BlurFade } from '@/components/ui/blur-fade'
import { LandingPageRouter } from '@/components/landing/LandingPageRouter'
import { Link } from '@/src/i18n/routing'
import type { LandingPage } from '@/types/landing-page'

const SLUG_TO_MSG: Record<string, string> = {
  chrd: 'chrd',
  'corporate-event': 'corporate',
  'ugc-retail': 'ugc',
  'field-service': 'field',
  art: 'art',
  immo: 'immo',
  vcard: 'vcard',
  tourism: 'tourism',
  feedback: 'feedback',
  product: 'product',
}

interface VerticalConfig {
  icon: React.ElementType
  gradient: string
  accentColor: string
  mockData: LandingPage
}

const VERTICAL_CONFIGS: Record<string, VerticalConfig> = {
  chrd: {
    icon: Utensils,
    gradient: 'from-rose-950 via-slate-900 to-slate-950',
    accentColor: '#e11d48',
    mockData: {
      id: 'demo-chrd',
      title: 'Bistro & Hôtel la Plage',
      slug: 'demo-chrd',
      status: 'published',
      vertical: 'chrd',
      chrdData: {
        establishmentName: 'Bistro & Hôtel la Plage',
        establishmentType: 'hotel',
        welcomeMessage: 'Toute l’équipe vous souhaite un merveilleux séjour au bord de la mer !',
        menuPdfUrl: 'https://example.com/menu.pdf',
        wifiName: 'Hotel_LaPlage_Guest',
        wifiPassword: 'Vacances2025!',
        googleReviewUrl: 'https://g.page/r/example',
        tripadvisorUrl: 'https://tripadvisor.fr/example',
        enablePostcardGift: true,
        postcardCode: 'LAPLAGE2025',
      },
    },
  },
  'corporate-event': {
    icon: Calendar,
    gradient: 'from-indigo-950 via-slate-900 to-slate-950',
    accentColor: '#6366f1',
    mockData: {
      id: 'demo-corp',
      title: 'Séminaire Annuel Tech 2025',
      slug: 'demo-corp',
      status: 'published',
      vertical: 'corporate_event',
      corporateEventData: {
        eventName: 'Séminaire Annuel Tech 2025',
        companyName: 'Acme Innovation',
        eventDate: '15-17 Octobre 2025',
        location: 'Palais des Congrès, Paris',
        welcomeMessage: 'Bienvenue au sommet annuel de l’innovation !',
        wifiCode: 'AcmeTech2025!',
        scheduleUrl: 'https://example.com/agenda.pdf',
        slidesUrl: 'https://example.com/slides.pdf',
        liveWallEnabled: true,
        galleryCode: 'seminaire-tech-2025',
      },
    },
  },
  'ugc-retail': {
    icon: ShoppingBag,
    gradient: 'from-purple-950 via-slate-900 to-slate-950',
    accentColor: '#a855f7',
    mockData: {
      id: 'demo-ugc',
      title: 'Collection Été - Jeu Concours',
      slug: 'demo-ugc',
      status: 'published',
      vertical: 'ugc_retail',
      ugcRetailData: {
        brandName: 'Maison Riviera',
        campaignTitle: 'Partagez votre style & gagnez 15%',
        productName: 'Sac Riviera Cuir',
        instructions: 'Prenez une photo de votre sac en situation et débloquez votre réduction immédiate.',
        rewardDiscountCode: 'RIVIERA15OFF',
        rewardDescription: '15% de réduction valable sur votre prochaine commande',
        rulesUrl: 'https://example.com/reglement.pdf',
        supportEmail: 'contact@maisonriviera.fr',
      },
    },
  },
  'field-service': {
    icon: Wrench,
    gradient: 'from-slate-900 via-slate-900 to-slate-950',
    accentColor: '#0ea5e9',
    mockData: {
      id: 'demo-field',
      title: 'Groupe Électrogène XL-500',
      slug: 'demo-field',
      status: 'published',
      vertical: 'field_service',
      fieldServiceData: {
        assetName: 'Groupe Électrogène XL-500',
        assetId: 'SN-2025-9981',
        category: 'Énergie / Moteur Diesel',
        location: 'Bâtiment B - Sous-sol',
        status: 'operational',
        lastInspectionDate: '12/06/2025',
        nextInspectionDate: '12/12/2025',
        documentationUrl: 'https://example.com/notice.pdf',
        contactTechnicianPhone: '+33 6 12 34 56 78',
        emergencyContact: '112 / Astreinte 24h',
        maintenanceNotes: 'Vérifier la pression d’huile et le niveau de liquide de refroidissement avant démarrage.',
      },
    },
  },
  art: {
    icon: Palette,
    gradient: 'from-[#5c2b1a] via-slate-900 to-slate-950',
    accentColor: '#c5a059',
    mockData: {
      id: 'demo-art',
      title: 'Lumière d’Automne',
      slug: 'demo-art',
      status: 'published',
      vertical: 'art',
      theme: { primaryColor: '#c5a059' },
      artData: {
        artistName: 'Claude Dupont',
        artistBio:
          'Artiste peintre plasticien basé à Lyon. Ses travaux explorent la lumière naturelle à travers des glacis successifs et des ocres chauds.',
        artistNationality: 'Français',
        artistBirthYear: '1982',
        year: '2024',
        medium: 'Huile sur toile',
        dimensions: '100 × 80 cm',
        series: "Éclats d'Automne",
        edition: 'Pièce unique',
        certificate: 'Certificat signé (PDF)',
        description:
          "Cette toile capture la lumière dorée d'un soir d'octobre sur les collines lyonnaises. Les glacis successifs révèlent la profondeur des ocres et la vibration du ciel.",
        price: 2400,
        currency: 'EUR',
        available: true,
        exhibitionName: 'Biennale de Paris',
        exhibitionLocation: 'Grand Palais, Paris',
        exhibitionDates: '12 sept. – 20 oct. 2024',
        audioGuideUrl: 'https://example.com/audio-guide.mp3',
        shopUrl: 'https://example.com/shop',
        contactEmail: 'galerie@example.com',
        instagramUsername: 'claudedupont.art',
        websiteUrl: 'https://example.com',
      },
    },
  },
  immo: {
    icon: Building2,
    gradient: 'from-[#0a2a44] via-slate-900 to-slate-950',
    accentColor: '#3dbbff',
    mockData: {
      id: 'demo-immo',
      title: 'Villa les Pins - Cap Ferret',
      slug: 'demo-immo',
      status: 'published',
      vertical: 'immo',
      immoData: {
        propertyType: 'villa',
        city: 'Cap Ferret',
        surface: 140,
        rooms: 5,
        price: 250,
        dpe: 'A',
        welcomeMessage: 'Bienvenue dans notre havre de paix entre bassin et océan !',
        wifiName: 'VillaPins_Guest',
        wifiPassword: 'PassSeaSun2025',
        hostName: 'Marie & Jean',
        hostPhone: '+33 6 00 00 00 00',
      },
    },
  },
  vcard: {
    icon: Contact,
    gradient: 'from-[#06352e] via-slate-900 to-slate-950',
    accentColor: '#12c4a8',
    mockData: {
      id: 'demo-vcard',
      title: 'Alexandre Martin',
      slug: 'demo-vcard',
      status: 'published',
      vertical: 'vcard',
      vcardData: {
        fullName: 'Alexandre Martin',
        jobTitle: 'Fondateur & Directeur Général',
        company: 'QRious Technologies',
        email: 'alexandre@qrious.fr',
        phone: '+33 6 12 34 56 78',
        website: 'https://www.qrious.fr',
        linkedinUrl: 'https://linkedin.com/in/alexandre-martin',
      },
    },
  },
  tourism: {
    icon: Compass,
    gradient: 'from-amber-950 via-slate-900 to-slate-950',
    accentColor: '#f59e0b',
    mockData: {
      id: 'demo-tourism',
      title: 'Château de la Loire',
      slug: 'demo-tourism',
      status: 'published',
      vertical: 'tourism',
      tourismData: {
        placeName: 'Château de Chenonceau',
        locationName: 'Indre-et-Loire',
        historicPeriod: 'Renaissance (XVIe siècle)',
        description: 'Chef-d’œuvre d’architecture Renaissance bâti sur le Cher.',
        openingHours: 'Ouvert tous les jours de 9h00 à 18h30',
        entryFee: '15.50€ Adulte / 12€ Enfant',
        websiteUrl: 'https://example.com',
      },
    },
  },
  feedback: {
    icon: Star,
    gradient: 'from-yellow-950 via-slate-900 to-slate-950',
    accentColor: '#eab308',
    mockData: {
      id: 'demo-feedback',
      title: 'Avis Restaurant le Gourmet',
      slug: 'demo-feedback',
      status: 'published',
      vertical: 'feedback',
      feedbackData: {
        companyName: 'Bistro Le Gourmet',
        heading: 'Votre opinion compte !',
        subheading: 'Partagez votre expérience et aidez-nous à vous offrir le meilleur.',
        googleReviewUrl: 'https://g.page/r/example',
        enableDirectForm: true,
        directFormEmail: 'manager@legourmet.fr',
      },
    },
  },
  product: {
    icon: Box,
    gradient: 'from-cyan-950 via-slate-900 to-slate-950',
    accentColor: '#06b6d4',
    mockData: {
      id: 'demo-product',
      title: 'Casque Audio Pro-X',
      slug: 'demo-product',
      status: 'published',
      vertical: 'product',
      productData: {
        productName: 'Casque Audio Sans Fil Pro-X',
        brandName: 'AudioMaster',
        modelNumber: 'AM-PROX-2025',
        description: 'Casque à réduction de bruit active haute fidélité.',
        manualUrl: 'https://example.com/manual.pdf',
        warrantyDuration: '2 Ans Garantie Constructeur',
        supportEmail: 'support@audiomaster.com',
      },
    },
  },
}

export default function VerticalSolutionPage() {
  const t = useTranslations('SolutionsVertical')
  const params = useParams()
  const verticalKey = String(params?.vertical || '').toLowerCase()
  const config = VERTICAL_CONFIGS[verticalKey]
  const msgKey = SLUG_TO_MSG[verticalKey]

  if (!config || !msgKey) {
    notFound()
  }

  const title = t(`${msgKey}.title`)
  const subtitle = t(`${msgKey}.subtitle`)
  const badge = t(`${msgKey}.badge`)
  const highlights = [
    t(`${msgKey}.h1`),
    t(`${msgKey}.h2`),
    t(`${msgKey}.h3`),
    t(`${msgKey}.h4`),
  ]

  const IconComponent = config.icon

  return (
    <div className="min-h-screen bg-mq-ink text-white font-sans">
      <MarketingHeader />

      {/* ── Hero Section ── */}
      <section className={`relative overflow-hidden bg-gradient-to-b ${config.gradient} py-20 lg:py-28`}>
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-30 blur-[130px] rounded-full"
          style={{ backgroundColor: config.accentColor }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <BlurFade delay={0.1} inView>
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white backdrop-blur">
                  <IconComponent className="h-4 w-4" style={{ color: config.accentColor }} />
                  <span>{badge}</span>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.15]">
                  {title}
                </h1>
              </BlurFade>

              <BlurFade delay={0.3} inView>
                <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
                  {subtitle}
                </p>
              </BlurFade>

              <BlurFade delay={0.4} inView>
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href={`/dashboard/new?vertical=${config.mockData.vertical}`}
                    className="inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-mq-signal to-emerald-500 px-6 py-3.5 text-base font-bold text-mq-ink shadow-lg shadow-mq-signal/25 transition hover:opacity-95 active:scale-95"
                  >
                    <Sparkles className="h-5 w-5" />
                    <span>{t('ctaCreate', { badge })}</span>
                  </Link>
                  <Link
                    href="/editeur"
                    className="inline-flex items-center justify-center space-x-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
                  >
                    <QrCode className="h-5 w-5 text-slate-300" />
                    <span>{t('ctaEditor')}</span>
                  </Link>
                </div>
              </BlurFade>
            </div>

            {/* Right Live Interactive Phone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <BlurFade delay={0.3} inView>
                <div className="relative w-[340px] rounded-[42px] border-[8px] border-slate-800 bg-slate-950 p-2 shadow-2xl shadow-black/80 ring-1 ring-white/20">
                  {/* Speaker Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 h-4 w-28 bg-slate-900 rounded-full z-20 border border-slate-800" />

                  {/* Phone Screen Container */}
                  <div className="relative h-[600px] w-full overflow-y-auto rounded-[32px] bg-slate-900 pt-8 no-scrollbar">
                    <LandingPageRouter pageData={config.mockData} />
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Highlights ── */}
      <section className="py-20 bg-slate-950 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white">{t('whyTitle')}</h2>
            <p className="mt-3 text-slate-400">{t('whySubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 mb-4 text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{highlight}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{t('highlightHint')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
      <MarketingFooter />
    </div>
  )
}
