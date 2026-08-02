'use client'

import React from 'react'
import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'
import {
  Link2,
  Type,
  Mail,
  Phone,
  MessageSquare,
  Wifi,
  User,
  MessageCircle,
  MapPin,
  CalendarDays,
  Share2,
  FileText,
  Smartphone,
  Sparkles
} from 'lucide-react'

import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { CtaSection } from '@/components/marketing/CtaSection'
import { PublicQrEditor } from '@/components/qr-editor/PublicQrEditor'
import { BlurFade } from '@/components/ui/blur-fade'
import { type QrContentType } from '@/lib/qr/payload'

interface TypeConfig {
  title: string
  subtitle: string
  badge: string
  icon: React.ElementType
  description: string
  gradient: string
  accentColor: string
}

const TYPE_CONFIGS: Partial<Record<QrContentType, TypeConfig>> = {
  url: {
    title: 'Générateur de QR Code URL & Lien Web',
    subtitle: 'Redirigez vos utilisateurs vers n\'importe quel site web, page produit ou article en un seul scan.',
    badge: 'Lien Web & Redirection',
    icon: Link2,
    description: 'Le format le plus populaire pour connecter le monde physique au digital.',
    gradient: 'from-slate-900 via-slate-900 to-slate-950',
    accentColor: '#3b82f6', // blue
  },
  vcard: {
    title: 'Générateur de QR Code vCard (Contact)',
    subtitle: 'Partagez vos coordonnées complètes instantanément. Un scan suffit pour vous ajouter aux contacts.',
    badge: 'Carte de visite digitale',
    icon: User,
    description: 'Fini les cartes de visite papier perdues, passez à la vCard digitale.',
    gradient: 'from-[#06352e] via-slate-900 to-slate-950',
    accentColor: '#10b981', // emerald
  },
  wifi: {
    title: 'Générateur de QR Code Wi-Fi',
    subtitle: 'Permettez à vos invités ou clients de se connecter à votre réseau Wi-Fi sans taper de mot de passe.',
    badge: 'Connexion Automatique',
    icon: Wifi,
    description: 'Idéal pour les restaurants, hôtels, bureaux ou même à la maison.',
    gradient: 'from-amber-950 via-slate-900 to-slate-950',
    accentColor: '#f59e0b', // amber
  },
  email: {
    title: 'Générateur de QR Code Email',
    subtitle: 'Préparez un email avec destinataire, sujet et message préremplis.',
    badge: 'Email prérempli',
    icon: Mail,
    description: 'Facilitez la prise de contact, le support client ou les demandes de devis.',
    gradient: 'from-rose-950 via-slate-900 to-slate-950',
    accentColor: '#f43f5e', // rose
  },
  phone: {
    title: 'Générateur de QR Code Téléphone',
    subtitle: 'Déclenchez un appel téléphonique immédiat vers votre numéro.',
    badge: 'Appel direct',
    icon: Phone,
    description: 'Parfait pour les urgences, le SAV ou les commandes par téléphone.',
    gradient: 'from-emerald-950 via-slate-900 to-slate-950',
    accentColor: '#10b981', // emerald
  },
  sms: {
    title: 'Générateur de QR Code SMS',
    subtitle: 'Ouvrez l\'application de messagerie avec un numéro et un texte pré-rédigés.',
    badge: 'SMS prérempli',
    icon: MessageSquare,
    description: 'Idéal pour les jeux concours par SMS ou les validations rapides.',
    gradient: 'from-blue-950 via-slate-900 to-slate-950',
    accentColor: '#3b82f6', // blue
  },
  whatsapp: {
    title: 'Générateur de QR Code WhatsApp',
    subtitle: 'Lancez une conversation WhatsApp directe avec un message par défaut.',
    badge: 'WhatsApp Business',
    icon: MessageCircle,
    description: 'Connectez-vous avec vos clients sur leur application de messagerie préférée.',
    gradient: 'from-green-950 via-slate-900 to-slate-950',
    accentColor: '#22c55e', // green
  },
  location: {
    title: 'Générateur de QR Code Localisation (Maps)',
    subtitle: 'Ouvrez l\'application GPS avec des coordonnées exactes ou une adresse.',
    badge: 'Plan & Itinéraire',
    icon: MapPin,
    description: 'Guidez vos visiteurs directement vers votre point de vente ou événement.',
    gradient: 'from-red-950 via-slate-900 to-slate-950',
    accentColor: '#ef4444', // red
  },
  event: {
    title: 'Générateur de QR Code Événement (iCal)',
    subtitle: 'Ajoutez un événement directement dans l\'agenda de vos invités en un scan.',
    badge: 'Événement iCal',
    icon: CalendarDays,
    description: 'Augmentez la participation à vos événements, salons, webinaires ou soirées.',
    gradient: 'from-purple-950 via-slate-900 to-slate-950',
    accentColor: '#8b5cf6', // purple
  },
  social: {
    title: 'Générateur de QR Code Réseaux Sociaux',
    subtitle: 'Redirigez vers votre profil Instagram, TikTok, LinkedIn, YouTube ou X.',
    badge: 'Réseaux Sociaux',
    icon: Share2,
    description: 'Boostez votre audience et gagnez des abonnés depuis le monde physique.',
    gradient: 'from-pink-950 via-slate-900 to-slate-950',
    accentColor: '#ec4899', // pink
  },
  pdf: {
    title: 'Générateur de QR Code PDF',
    subtitle: 'Proposez un document PDF au téléchargement direct depuis un QR code.',
    badge: 'Document PDF',
    icon: FileText,
    description: 'Brochures, fiches techniques, menus, catalogues ou livres blancs.',
    gradient: 'from-orange-950 via-slate-900 to-slate-950',
    accentColor: '#f97316', // orange
  },
  app: {
    title: 'Générateur de QR Code App Store',
    subtitle: 'Liez directement au téléchargement de votre application mobile.',
    badge: 'App Store / Play',
    icon: Smartphone,
    description: 'Accélérez les téléchargements de votre application iOS ou Android.',
    gradient: 'from-indigo-950 via-slate-900 to-slate-950',
    accentColor: '#6366f1', // indigo
  },
  text: {
    title: 'Générateur de QR Code Texte',
    subtitle: 'Encodez un texte libre, une note, un numéro de série ou un message secret.',
    badge: 'Texte hors-ligne',
    icon: Type,
    description: 'Aucune connexion internet n\'est requise pour lire le contenu encodé.',
    gradient: 'from-slate-800 via-slate-900 to-slate-950',
    accentColor: '#94a3b8', // slate
  },
}

export default function TypeGeneratorPage() {
  const params = useParams()
  const typeKey = String(params?.type || '').toLowerCase() as QrContentType
  const config = TYPE_CONFIGS[typeKey]

  if (!config) {
    notFound()
  }

  const IconComponent = config.icon

  return (
    <div className="min-h-screen bg-mq-ink text-slate-900 font-sans">
      <MarketingHeader />

      {/* ── Hero Section ── */}
      <section className={`relative overflow-hidden bg-gradient-to-b ${config.gradient} py-16 lg:py-24`}>
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20 blur-[120px] rounded-full"
          style={{ backgroundColor: config.accentColor }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <BlurFade delay={0.1} inView>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white backdrop-blur">
                <IconComponent className="h-4 w-4" style={{ color: config.accentColor }} />
                <span>{config.badge}</span>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl text-white leading-tight">
                {config.title}
              </h1>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                {config.subtitle} {config.description}
              </p>
            </BlurFade>
            
            <BlurFade delay={0.4} inView>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center space-x-2 rounded-xl bg-mq-signal px-5 py-2.5 text-sm font-bold text-mq-ink shadow-lg shadow-mq-signal/20 transition hover:bg-mq-signal/90"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Créer ce QR en Dynamique</span>
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center justify-center space-x-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <span>Toutes les fonctionnalités</span>
                </Link>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* ── Editor Section ── */}
      <section className="py-12 lg:py-16 bg-mq-paper">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Générez votre QR Code gratuitement</h2>
            <p className="text-slate-600">Personnalisez les couleurs, le logo et téléchargez en haute définition.</p>
          </div>
          
          <PublicQrEditor initialType={typeKey} />
        </div>
      </section>

      <CtaSection />
      <MarketingFooter />
    </div>
  )
}
