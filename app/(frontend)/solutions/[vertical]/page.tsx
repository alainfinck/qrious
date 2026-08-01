'use client'

import React from 'react'
import Link from 'next/link'
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
  ArrowRight,
  CheckCircle2,
  QrCode,
  Sparkles,
  Smartphone,
} from 'lucide-react'

import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { CtaSection } from '@/components/marketing/CtaSection'
import { BlurFade } from '@/components/ui/blur-fade'
import { LandingPageRouter } from '@/components/landing/LandingPageRouter'
import type { LandingPage, LandingPageVertical } from '@/types/landing-page'

interface VerticalConfig {
  title: string
  subtitle: string
  badge: string
  icon: React.ElementType
  description: string
  highlights: string[]
  gradient: string
  accentColor: string
  mockData: LandingPage
}

const VERTICAL_CONFIGS: Record<string, VerticalConfig> = {
  chrd: {
    title: 'Solution CHRD : Hôtellerie & Restauration',
    subtitle: 'Digitalez vos menus, boostez vos avis Google et offrez des cartes postales à vos clients.',
    badge: 'Hôtellerie, Resto & Camping',
    icon: Utensils,
    description:
      'Proposez une expérience haut de gamme à vos clients dès leur arrivée avec un QR code placé sur la table ou en chambre.',
    highlights: [
      'Menu & Carte digitale interactifs toujours à jour',
      'Accès Wi-Fi instantané sans saisie fastidieuse',
      'Boost automatique de vos avis Google & TripAdvisor',
      'Carte postale souvenir physique offerte aux clients',
    ],
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
    title: 'Événementiel B2B & Séminaires',
    subtitle: 'Engagez vos collaborateurs avec un Live Wall photo et centralisez les ressources de vos séminaires.',
    badge: 'Corporate & Séminaires',
    icon: Calendar,
    description:
      'Un QR code unique sur les badges ou écrans d’accueil pour fluidifier le déroulement de vos événements professionnels.',
    highlights: [
      'Mur photo collaboratif en direct (Live Wall)',
      'Accès instantané à l’ordre du jour & programme',
      'Téléchargement direct des présentations PDF',
      'Code Wi-Fi invités partagé en un scan',
    ],
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
    title: 'Retail & Concours Photo UGC',
    subtitle: 'Transformez vos acheteurs en ambassadeurs grâce au partage de photos sur packaging.',
    badge: 'Retail & Brands',
    icon: ShoppingBag,
    description:
      'Incitez vos clients à photographier leurs achats en échange d’un coupon de réduction immédiat.',
    highlights: [
      'Activation directe sur packaging ou ticket de caisse',
      'Collecte de contenus authentiques générés par les utilisateurs (UGC)',
      'Attribution automatique de codes promo exclusifs',
      'Fidélisation et augmentation du réachat',
    ],
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
    title: 'Field Service & Maintenance Équipements',
    subtitle: 'Identifiez vos équipements sur le terrain et simplifiez le suivi d’intervention et de maintenance.',
    badge: 'Maintenance & Industrie',
    icon: Wrench,
    description:
      'Collez des QR codes durables sur vos machines pour offrir un accès instantané aux fiches techniques et au signalement de panne.',
    highlights: [
      'Statut en temps réel (Opérationnel, Maintenance, Hors Service)',
      'Notice & documentation technique accessible au scan',
      'Création instantanée de tickets d’incident avec photos',
      'Numéros d’urgence & astreinte technique directes',
    ],
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
    title: 'Art & Galeries d’Exposition',
    subtitle: 'Sublimez chaque œuvre avec une fiche enrichie, un livre d’or et la vente directe.',
    badge: 'Culture & Musées',
    icon: Palette,
    description: 'La solution idéale pour les galeries, artistes indépendants et salons d’art.',
    highlights: [
      'Cartel numérique complet (Dimensions, Médium, Année)',
      'Audio-guide et note d’intention de l’artiste',
      'Contact direct pour acquisition et prix',
      'Lien Instagram & portfolio',
    ],
    gradient: 'from-[#5c2b1a] via-slate-900 to-slate-950',
    accentColor: '#ffc53d',
    mockData: {
      id: 'demo-art',
      title: 'Lumière d’Automne',
      slug: 'demo-art',
      status: 'published',
      vertical: 'art',
      artData: {
        artistName: 'Claude Dupont',
        artistBio: 'Artiste peintre plasticien basé à Lyon.',
        year: '2024',
        medium: 'Huile sur toile',
        dimensions: '100 × 80 cm',
        price: 2400,
        currency: 'EUR',
        available: true,
        exhibitionName: 'Biennale de Paris',
        instagramUsername: 'claudedupont.art',
      },
    },
  },
  immo: {
    title: 'Immobilier, Gîtes & Locations',
    subtitle: 'Présentez vos biens et facilitez le séjour de vos voyageurs avec un livret d’accueil digital.',
    badge: 'Immobilier & Saisonniers',
    icon: Building2,
    description: 'Gagnez du temps et offrez un accueil 5 étoiles à vos locataires.',
    highlights: [
      'Informations clés du bien (Surface, pièces, DPE)',
      'Consignes d’arrivée et accès Wi-Fi',
      'Recommandations et bons plans locaux',
      'Formulaire de réservation en ligne',
    ],
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
    title: 'Carte de Visite Digitale vCard',
    subtitle: 'Partagez instantanément vos coordonnées et réseaux sociaux en un scan sans carte papier.',
    badge: 'Réseau & Business',
    icon: Contact,
    description: 'Ne manquez plus aucun contact professionnel.',
    highlights: [
      'Ajout direct dans les contacts du téléphone (.vcf)',
      'Liens vers tous vos réseaux sociaux (LinkedIn, Twitter, IG)',
      'Prise de rendez-vous directe via Calendly',
      'Branding personnalisé à vos couleurs',
    ],
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
        website: 'https://qrious.fr',
        linkedinUrl: 'https://linkedin.com/in/alexandre-martin',
      },
    },
  },
  tourism: {
    title: 'Tourisme & Patrimoine Culturel',
    subtitle: 'Enrichissez l’expérience de vos visiteurs sur vos sites touristiques et monuments.',
    badge: 'Tourisme & Villes',
    icon: Compass,
    description: 'Transformez chaque lieu historique en un parcours interactif dynamique.',
    highlights: [
      'Audio-guide et contenus explicatifs',
      'Carte interactive et géolocalisation',
      'Points d’intérêt notables et anecdotes',
      'Horaires et tarifs d’accès',
    ],
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
    title: 'Collecte d’Avis & E-Réputation',
    subtitle: 'Multipliez vos avis 5 étoiles sur Google et gérez les remarques privées.',
    badge: 'Avis & E-Réputation',
    icon: Star,
    description: 'Redirigez vos clients satisfaits vers Google tout en captant les retours constructifs en privé.',
    highlights: [
      'Redirection intelligente vers Google, TripAdvisor ou Trustpilot',
      'Formulaire privé de réclamation pour préserver votre note',
      'Design incitatif et optimisé pour le taux de conversion',
      'Statistiques de satisfaction en temps réel',
    ],
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
    title: 'Notice & Manuel Produit Numérique',
    subtitle: 'Remplacez vos manuels papier par un QR code d’assistance complet.',
    badge: 'Produits & Support',
    icon: Box,
    description: 'Diminuez les appels au support et offrez des guides vidéo de démarrage rapide.',
    highlights: [
      'Téléchargement de notice PDF toujours disponible',
      'Tutoriels vidéo et étapes de démarrage rapide',
      'Enregistrement de garantie et support client',
      'FAQ et résolution de problèmes fréquents',
    ],
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
  const params = useParams()
  const verticalKey = String(params?.vertical || '').toLowerCase()
  const config = VERTICAL_CONFIGS[verticalKey]

  if (!config) {
    notFound()
  }

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
                  <span>{config.badge}</span>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.15]">
                  {config.title}
                </h1>
              </BlurFade>

              <BlurFade delay={0.3} inView>
                <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
                  {config.subtitle}
                </p>
              </BlurFade>

              <BlurFade delay={0.4} inView>
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href={`/dashboard/nouveau?vertical=${config.mockData.vertical}`}
                    className="inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-mq-signal to-emerald-500 px-6 py-3.5 text-base font-bold text-mq-ink shadow-lg shadow-mq-signal/25 transition hover:opacity-95 active:scale-95"
                  >
                    <Sparkles className="h-5 w-5" />
                    <span>Créer mon QR {config.badge}</span>
                  </Link>
                  <Link
                    href="/editeur"
                    className="inline-flex items-center justify-center space-x-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
                  >
                    <QrCode className="h-5 w-5 text-slate-300" />
                    <span>Essayer l'éditeur gratuit</span>
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
            <h2 className="text-3xl font-extrabold text-white">Pourquoi choisir cette solution ?</h2>
            <p className="mt-3 text-slate-400">Des fonctionnalités clés conçues pour votre activité.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.highlights.map((highlight, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 mb-4 text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{highlight}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Prêt à l'emploi et configurable en moins de 2 minutes depuis votre espace utilisateur.
                </p>
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
