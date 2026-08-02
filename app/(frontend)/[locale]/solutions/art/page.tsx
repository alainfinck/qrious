'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brush,
  CheckCircle2,
  CreditCard,
  Headphones,
  Instagram,
  MessageCircle,
  Newspaper,
  Palette,
  QrCode,
  Quote,
  RefreshCw,
  Search,
  Share2,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Target,
  Users,
  Video,
} from 'lucide-react'

import { ArtPhoneDemo } from '@/components/marketing/ArtPhoneDemo'
import { CtaSection } from '@/components/marketing/CtaSection'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { BlurFade } from '@/components/ui/blur-fade'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Particles } from '@/components/ui/particles'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { cn } from '@/lib/utils'

const toneStyles = {
  coral: 'bg-mq-coral/15 text-mq-coral-deep border-mq-coral/25',
  sun: 'bg-mq-sun/25 text-amber-700 border-mq-sun/40',
  sky: 'bg-mq-sky/15 text-sky-600 border-mq-sky/30',
  signal: 'bg-mq-signal/15 text-mq-signal-deep border-mq-signal/30',
  violet: 'bg-violet-100 text-violet-600 border-violet-200',
  rose: 'bg-rose-100 text-rose-600 border-rose-200',
} as const

type Tone = keyof typeof toneStyles

const universeFeatures: {
  icon: typeof Palette
  title: string
  desc: string
  tone: Tone
}[] = [
  {
    icon: Palette,
    title: 'Explorer le travail artistique',
    desc: 'Plongez dans l’univers créatif, les galeries et les parcours uniques de chaque artiste grâce à des contenus exclusifs.',
    tone: 'violet',
  },
  {
    icon: Brush,
    title: 'Comprendre les techniques',
    desc: 'Accédez aux secrets de fabrication, aux matériaux et aux méthodes de création expliquées par l’artiste.',
    tone: 'coral',
  },
  {
    icon: MessageCircle,
    title: 'Entrer en contact direct',
    desc: 'Échangez avec l’artiste ou la galerie via formulaire, réseaux sociaux ou messagerie intégrée.',
    tone: 'sky',
  },
  {
    icon: Newspaper,
    title: 'Suivre les actualités',
    desc: 'Restez informé des expositions, ventes et événements grâce à des mises à jour régulières.',
    tone: 'sun',
  },
  {
    icon: ShoppingBag,
    title: 'Commander des reproductions',
    desc: 'Accédez à la boutique pour acquérir des reproductions, originaux ou produits dérivés en quelques clics.',
    tone: 'signal',
  },
]

const techBenefits: { icon: typeof Headphones; title: string; desc: string; tone: Tone }[] = [
  {
    icon: Headphones,
    title: 'Découverte immersive',
    desc: 'Accès instantané aux détails de l’œuvre, à la biographie et à l’audio-guide depuis le smartphone.',
    tone: 'violet',
  },
  {
    icon: Users,
    title: 'Connexion avec l’artiste',
    desc: 'Créez un lien direct grâce à des contenus exclusifs, interviews et échanges sécurisés.',
    tone: 'coral',
  },
  {
    icon: Sparkles,
    title: 'Expérience mémorable',
    desc: 'Transformez chaque visite en moment unique avec des contenus personnalisés et enrichis.',
    tone: 'sun',
  },
  {
    icon: BookOpen,
    title: 'Galeries interactives',
    desc: 'Proposez des expositions virtuelles et des expériences immersives accessibles à tous.',
    tone: 'sky',
  },
]

const advancedFeatures: { icon: typeof QrCode; title: string; desc: string; tone: Tone }[] = [
  {
    icon: QrCode,
    title: 'QR codes personnalisés',
    desc: 'Couleurs, logo et style adaptés à votre identité artistique pour chaque œuvre.',
    tone: 'signal',
  },
  {
    icon: Palette,
    title: 'Fiches d’œuvres enrichies',
    desc: 'Photos HD, vidéos d’atelier, note d’intention, dimensions, prix et certificat.',
    tone: 'violet',
  },
  {
    icon: BarChart3,
    title: 'Analytics avancés',
    desc: 'Suivez les scans, l’engagement et l’intérêt des visiteurs en temps réel.',
    tone: 'sky',
  },
  {
    icon: Instagram,
    title: 'Intégration Instagram',
    desc: 'Liez le compte de l’artiste et montrez le processus créatif en coulisses.',
    tone: 'rose',
  },
]

const whyItems = [
  {
    title: 'QR codes artistiques',
    desc: 'Créez des QR uniques pour chaque œuvre, parfaitement intégrés à votre style.',
  },
  {
    title: 'Expérience immersive',
    desc: 'Vidéos, audio-guides et descriptions détaillées pour captiver votre audience.',
  },
  {
    title: 'Vente & acquisition',
    desc: 'Bouton d’achat, contact galerie et statut disponible / vendu en un clic.',
  },
  {
    title: 'Statistiques précises',
    desc: 'Comprenez quelles œuvres suscitent le plus de curiosité pendant vos expositions.',
  },
]

const testimonials = [
  {
    name: 'Marie Dubois',
    role: 'Artiste peintre',
    quote:
      'Qrious a révolutionné ma façon de présenter mes œuvres. Mes visiteurs découvrent l’histoire derrière chaque tableau et les statistiques m’aident à comprendre mon public.',
  },
  {
    name: 'Thomas Martin',
    role: 'Directeur de galerie',
    quote:
      'Nous cherchions une solution pour enrichir l’expérience de nos visiteurs. Qrious nous permet de présenter nos artistes de manière professionnelle et d’analyser l’engagement.',
  },
  {
    name: 'Sophie Laurent',
    role: 'Sculptrice',
    quote:
      'L’intégration Instagram est fantastique. Mes clients voient mes œuvres en cours de création et suivent mon processus artistique. Un vrai plus pour créer une connexion.',
  },
]

const galleryMarketing: {
  icon: typeof Smartphone
  title: string
  desc: string
  points: string[]
  tone: Tone
}[] = [
  {
    icon: Smartphone,
    title: 'Informations instantanées',
    desc: 'Donnez à vos clients un accès immédiat aux informations détaillées sur chaque œuvre et artiste. Plus besoin de brochures papier.',
    points: [
      'Biographies d’artistes complètes',
      'Descriptions détaillées des œuvres',
      'Prix et disponibilité en temps réel',
      'Vidéos et contenus multimédias',
    ],
    tone: 'sky',
  },
  {
    icon: Target,
    title: 'Marketing interactif',
    desc: 'Transformez chaque visite en opportunité de vente avec des contenus ciblés et des appels à l’action stratégiques.',
    points: [
      'Liens vers les réseaux sociaux',
      'Boutons d’achat directs',
      'Newsletter et fidélisation',
      'Partage viral facilité',
    ],
    tone: 'coral',
  },
  {
    icon: BarChart3,
    title: 'Analytics marketing',
    desc: 'Mesurez l’impact de vos expositions et optimisez votre stratégie avec des données précises sur l’engagement.',
    points: [
      'Suivi des interactions par œuvre',
      'Analyse du parcours client',
      'Rapports de performance',
      'Optimisation des conversions',
    ],
    tone: 'signal',
  },
]

const galleryClientInfo: { icon: typeof BookOpen; title: string; desc: string; tone: Tone }[] = [
  {
    icon: BookOpen,
    title: 'Fiches d’œuvres détaillées',
    desc: 'Descriptions complètes avec techniques, dimensions, prix et disponibilité.',
    tone: 'violet',
  },
  {
    icon: Users,
    title: 'Profils d’artistes enrichis',
    desc: 'Biographies, parcours, influences et autres œuvres de l’artiste.',
    tone: 'coral',
  },
  {
    icon: Video,
    title: 'Contenus multimédias',
    desc: 'Vidéos, interviews, making-of et visites virtuelles des ateliers.',
    tone: 'sky',
  },
  {
    icon: Share2,
    title: 'Interactions sociales',
    desc: 'Commentaires, partages et intégration avec les réseaux sociaux.',
    tone: 'sun',
  },
]

const galleryArtists = [
  { name: 'Sophie Martin', discipline: 'Sculpture', initial: 'S', tone: 'violet' as Tone },
  { name: 'Pierre Dubois', discipline: 'Peinture', initial: 'P', tone: 'coral' as Tone },
  { name: 'Emma Laurent', discipline: 'Photographie', initial: 'E', tone: 'sky' as Tone },
  { name: 'Thomas Moreau', discipline: 'Installation', initial: 'T', tone: 'signal' as Tone },
]

const galleryExperience: { icon: typeof Search; title: string; desc: string; tone: Tone }[] = [
  {
    icon: Search,
    title: 'Découverte approfondie',
    desc: 'Chaque scan révèle l’histoire derrière l’œuvre, la technique utilisée et l’inspiration de l’artiste.',
    tone: 'violet',
  },
  {
    icon: Smartphone,
    title: 'Accès mobile',
    desc: 'Informations disponibles 24h/24 sur smartphone, même après la visite de la galerie.',
    tone: 'sky',
  },
  {
    icon: RefreshCw,
    title: 'Contenu mis à jour',
    desc: 'Prix, disponibilité et nouvelles œuvres actualisés en temps réel.',
    tone: 'signal',
  },
  {
    icon: CreditCard,
    title: 'Achat facilité',
    desc: 'Liens directs vers les pages d’achat et contact avec la galerie en un clic.',
    tone: 'coral',
  },
]

const galleryTestimonials = [
  {
    name: 'Marie Laurent',
    role: 'Directrice, Galerie Contemporaine',
    quote:
      'Nos clients adorent pouvoir scanner les QR codes pour en savoir plus sur les artistes. C’est devenu un vrai plus dans notre stratégie marketing.',
  },
  {
    name: 'Pierre Dubois',
    role: 'Fondateur, Espace Moderne',
    quote:
      'Les informations détaillées sur chaque œuvre ont considérablement augmenté nos ventes. Les clients sont mieux informés et plus confiants.',
  },
  {
    name: 'Sophie Martin',
    role: 'Curatrice, Galerie Nouvelle',
    quote:
      'Un outil marketing exceptionnel qui nous permet de diffuser des informations riches tout en gardant une approche élégante et professionnelle.',
  },
]

function SectionEyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-600',
        className,
      )}
    >
      {children}
    </span>
  )
}

export default function ArtSolutionPage() {
  return (
    <div className="min-h-screen bg-mq-paper font-sans text-mq-ink">
      <MarketingHeader />

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#f6f0ff] via-[#fff5f8] to-[#e8f7f3] pt-28 pb-20 lg:pt-36 lg:pb-28">
          <div className="absolute inset-0" aria-hidden>
            <div className="absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-violet-300/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-mq-coral/20 blur-3xl" />
            <div className="absolute top-1/3 left-1/2 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-mq-sky/20 blur-3xl" />
            <Particles quantity={28} color="#a78bfa" size={0.45} className="absolute inset-0 opacity-40" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
                <BlurFade delay={0.1} inView>
                  <SectionEyebrow>Culture · Artistes · Musées</SectionEyebrow>
                </BlurFade>

                <BlurFade delay={0.2} inView>
                  <h1 className="font-display text-4xl font-extrabold tracking-tight text-mq-ink sm:text-5xl lg:text-6xl leading-[1.15]">
                    Racontez{' '}
                    <span className="rounded-2xl bg-gradient-to-r from-rose-400 to-violet-500 px-3 py-1 text-white shadow-sm">
                      l&apos;histoire
                    </span>{' '}
                    de{' '}
                    <span className="rounded-2xl bg-violet-200/80 px-3 py-1 text-violet-800">
                      vos œuvres d&apos;art
                    </span>
                  </h1>
                </BlurFade>

                <BlurFade delay={0.3} inView>
                  <p className="mx-auto max-w-xl text-base leading-relaxed text-mq-muted sm:text-lg lg:mx-0">
                    Créez des QR codes personnalisés pour vos œuvres et offrez à votre audience une
                    expérience immersive : histoire, techniques, inspiration et vente directe.
                  </p>
                </BlurFade>

                <BlurFade delay={0.35} inView>
                  <p className="text-sm font-medium text-violet-600">
                    Sublimez chaque œuvre avec une fiche enrichie, un audio-guide et la vente directe.
                  </p>
                </BlurFade>

                <BlurFade delay={0.4} inView>
                  <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row lg:justify-start">
                    <Link href="/dashboard/new?vertical=art">
                      <ShimmerButton
                        background="linear-gradient(135deg, #0b1220 0%, #1a2744 100%)"
                        shimmerColor="#ffffff"
                        borderRadius="12px"
                        className="h-12 px-7 text-base shadow-lg"
                      >
                        <span className="font-semibold text-white">Créer mon QR artistique</span>
                      </ShimmerButton>
                    </Link>
                    <Link
                      href="/editeur"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-mq-ink/15 bg-white/70 px-6 text-sm font-semibold text-mq-ink transition hover:border-mq-ink/30 hover:bg-white"
                    >
                      <QrCode className="h-4 w-4 text-violet-500" />
                      Essayer l&apos;éditeur
                    </Link>
                  </div>
                </BlurFade>
              </div>

              <div className="flex justify-center lg:col-span-5">
                <BlurFade delay={0.3} inView>
                  <ArtPhoneDemo />
                </BlurFade>
              </div>
            </div>
          </div>
        </section>

        {/* ── Univers de l'artiste ── */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BlurFade delay={0.1} inView>
              <div className="mx-auto mb-14 max-w-2xl text-center">
                <SectionEyebrow>Expérience visiteur</SectionEyebrow>
                <h2 className="mt-4 font-display text-3xl font-bold text-mq-ink sm:text-4xl">
                  Découvrez l&apos;univers de l&apos;artiste
                </h2>
                <p className="mt-3 text-sm text-mq-muted sm:text-base">
                  Chaque QR code Qrious ouvre une fenêtre sur l&apos;âme créative de l&apos;artiste.
                </p>
              </div>
            </BlurFade>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {universeFeatures.map((item, i) => (
                <BlurFade key={item.title} delay={0.1 + i * 0.05} inView>
                  <div className="h-full rounded-2xl border border-mq-ink/8 bg-gradient-to-b from-white to-mq-mist/40 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div
                      className={cn(
                        'mb-4 flex h-10 w-10 items-center justify-center rounded-xl border',
                        toneStyles[item.tone],
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-base font-bold text-mq-ink">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-mq-muted">{item.desc}</p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ── L'art rencontre la tech ── */}
        <section className="bg-gradient-to-b from-[#f6f0ff]/80 to-mq-paper py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BlurFade delay={0.1} inView>
              <div className="mx-auto mb-14 max-w-2xl text-center">
                <SectionEyebrow className="bg-mq-sky/15 text-sky-700">Médiation numérique</SectionEyebrow>
                <h2 className="mt-4 font-display text-3xl font-bold text-mq-ink sm:text-4xl">
                  L&apos;art rencontre la technologie
                </h2>
                <p className="mt-3 text-sm text-mq-muted sm:text-base">
                  Chaque œuvre a une histoire à raconter. Qrious permet aux visiteurs de galeries,
                  musées et expositions de plonger dans l&apos;univers créatif des artistes.
                </p>
              </div>
            </BlurFade>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {techBenefits.map((item, i) => (
                <BlurFade key={item.title} delay={0.1 + i * 0.06} inView>
                  <div className="h-full rounded-2xl border border-white bg-white p-6 shadow-sm transition hover:shadow-md">
                    <div
                      className={cn(
                        'mb-4 flex h-11 w-11 items-center justify-center rounded-xl border',
                        toneStyles[item.tone],
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-mq-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mq-muted">{item.desc}</p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pourquoi Qrious ── */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <BlurFade delay={0.1} inView>
                <div>
                  <SectionEyebrow className="bg-mq-coral/15 text-mq-coral-deep">
                    Pourquoi choisir Qrious
                  </SectionEyebrow>
                  <h2 className="mt-4 font-display text-3xl font-bold text-mq-ink sm:text-4xl">
                    Tout pour présenter vos œuvres
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-mq-muted sm:text-base">
                    Permettez aux visiteurs de découvrir l&apos;histoire, les techniques et
                    l&apos;inspiration derrière chaque œuvre grâce à des QR codes qui révèlent des
                    contenus exclusifs.
                  </p>
                  <ul className="mt-8 space-y-4">
                    {whyItems.map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-mq-signal" />
                        <div>
                          <p className="font-semibold text-mq-ink">{item.title}</p>
                          <p className="text-sm text-mq-muted">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <div className="relative overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-rose-50 p-8 shadow-lg">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">
                    Exemple · QR Code artistique
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold text-mq-ink">
                    La Joconde — Léonard de Vinci
                  </h3>
                  <p className="mt-2 text-sm text-mq-muted">
                    Scannez pour découvrir l&apos;histoire de ce chef-d&apos;œuvre
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-mq-ink/80">
                    {[
                      'Découvrir l’histoire de l’œuvre',
                      'Apprendre les techniques artistiques',
                      'Contacter l’artiste ou le musée',
                      'Commander une reproduction',
                    ].map((line) => (
                      <li key={line} className="flex items-center gap-2.5">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mq-signal/15 text-mq-signal-deep">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex items-center gap-4 rounded-2xl border border-mq-ink/8 bg-white p-4 shadow-sm">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-mq-ink p-2">
                      <QrCode className="h-full w-full text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-violet-500">
                        QR interactif
                      </p>
                      <p className="text-sm text-mq-muted">
                        Biographie, techniques, contexte historique et acquisition.
                      </p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ── Fonctionnalités avancées ── */}
        <section className="bg-mq-mist/50 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BlurFade delay={0.1} inView>
              <div className="mx-auto mb-14 max-w-2xl text-center">
                <SectionEyebrow className="bg-mq-signal/15 text-mq-signal-deep">
                  Suite professionnelle
                </SectionEyebrow>
                <h2 className="mt-4 font-display text-3xl font-bold text-mq-ink sm:text-4xl">
                  Fonctionnalités avancées
                </h2>
                <p className="mt-3 text-sm text-mq-muted">
                  Des outils pensés pour les artistes, galeries et institutions exigeants.
                </p>
              </div>
            </BlurFade>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {advancedFeatures.map((item, i) => (
                <BlurFade key={item.title} delay={0.1 + i * 0.05} inView>
                  <div className="h-full rounded-2xl border border-white bg-white p-6 shadow-sm transition hover:shadow-md">
                    <div
                      className={cn(
                        'mb-4 flex h-10 w-10 items-center justify-center rounded-xl border',
                        toneStyles[item.tone],
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-base font-bold text-mq-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mq-muted">{item.desc}</p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ── Chiffres ── */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <BlurFade delay={0.1} inView>
              <div className="grid grid-cols-2 gap-8 rounded-3xl border border-mq-ink/8 bg-gradient-to-r from-violet-50 via-white to-mq-mist p-8 text-center sm:grid-cols-4 sm:p-10">
                <div>
                  <div className="font-display text-3xl font-bold text-violet-600 sm:text-4xl">
                    <NumberTicker value={10000} className="text-violet-600" />+
                  </div>
                  <p className="mt-1 text-xs text-mq-muted">Artistes actifs</p>
                </div>
                <div>
                  <div className="font-display text-3xl font-bold text-mq-coral sm:text-4xl">
                    <NumberTicker value={500} className="text-mq-coral" />k+
                  </div>
                  <p className="mt-1 text-xs text-mq-muted">QR codes créés</p>
                </div>
                <div>
                  <div className="font-display text-3xl font-bold text-mq-sky sm:text-4xl">
                    <NumberTicker value={50} className="text-mq-sky" />+
                  </div>
                  <p className="mt-1 text-xs text-mq-muted">Pays</p>
                </div>
                <div>
                  <div className="font-display text-3xl font-bold text-mq-signal-deep sm:text-4xl">
                    99.9%
                  </div>
                  <p className="mt-1 text-xs text-mq-muted">Satisfaction</p>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ── Pour les Galeries d'Art ── */}
        <section id="galeries" className="bg-gradient-to-b from-[#fff5f8] to-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <BlurFade delay={0.1} inView className="lg:col-span-6">
                <SectionEyebrow className="bg-mq-coral/15 text-mq-coral-deep">
                  Pour les Galeries d&apos;Art
                </SectionEyebrow>
                <h2 className="mt-4 font-display text-3xl font-bold text-mq-ink sm:text-4xl leading-tight">
                  Transformez vos expositions en expériences interactives
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-mq-muted sm:text-base">
                  Utilisez les QR codes comme outil marketing pour diffuser des informations
                  détaillées sur vos artistes et leurs œuvres. Donnez à vos clients un accès
                  instantané à des contenus enrichis qui valorisent votre collection.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/galeries"
                    className="inline-flex items-center gap-2 rounded-xl bg-mq-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-mq-ink/90"
                  >
                    Découvrir l&apos;offre Galeries
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/dashboard/new?vertical=art"
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-mq-ink/15 bg-white px-5 py-3 text-sm font-semibold text-mq-ink transition hover:border-mq-ink/30"
                  >
                    Créer un cartel
                  </Link>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} inView className="lg:col-span-6">
                <div className="overflow-hidden rounded-3xl border border-violet-200 bg-white p-5 shadow-xl sm:p-6">
                  <div className="mb-5 flex items-center justify-between border-b border-mq-ink/8 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-rose-400 font-display text-sm font-bold text-white">
                        G
                      </div>
                      <div>
                        <p className="font-display text-sm font-bold tracking-wide text-mq-ink">
                          Galerie Moderne
                        </p>
                        <p className="text-[11px] text-violet-500">Artistes · Expositions · À propos</p>
                      </div>
                    </div>
                    <span className="hidden rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600 sm:inline-flex">
                      En ligne
                    </span>
                  </div>

                  <div className="rounded-2xl border border-mq-ink/8 bg-gradient-to-br from-violet-50/80 to-rose-50/50 p-4 sm:p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-mq-coral to-violet-500 font-display text-xl font-bold text-white">
                        M
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-lg font-bold text-mq-ink">Marie Dubois</p>
                        <p className="mt-1 text-xs leading-relaxed text-mq-muted">
                          Artiste contemporaine reconnue pour ses œuvres explorant la relation entre
                          technologie et humanité.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3 border-t border-mq-ink/8 pt-4 text-center">
                      <div>
                        <p className="font-display text-xl font-bold text-violet-600">24</p>
                        <p className="text-[10px] text-mq-muted">œuvres</p>
                      </div>
                      <div>
                        <p className="font-display text-xl font-bold text-mq-coral">156</p>
                        <p className="text-[10px] text-mq-muted">visites</p>
                      </div>
                      <div>
                        <p className="font-display text-xl font-bold text-mq-signal-deep">89%</p>
                        <p className="text-[10px] text-mq-muted">engagement</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-mq-ink/8 bg-white p-3 shadow-sm">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-mq-ink p-1.5">
                        <QrCode className="h-full w-full text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-violet-500">
                          QR Artiste
                        </p>
                        <p className="text-xs text-mq-muted">Scannez pour découvrir l&apos;artiste</p>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>

            <div className="mt-20">
              <BlurFade delay={0.1} inView>
                <div className="mx-auto mb-12 max-w-2xl text-center">
                  <h3 className="font-display text-2xl font-bold text-mq-ink sm:text-3xl">
                    Un outil marketing puissant pour vos galeries
                  </h3>
                  <p className="mt-3 text-sm text-mq-muted">
                    Diffusez des informations enrichies et engagez vos visiteurs avec des contenus
                    interactifs.
                  </p>
                </div>
              </BlurFade>

              <div className="grid gap-6 lg:grid-cols-3">
                {galleryMarketing.map((item, i) => (
                  <BlurFade key={item.title} delay={0.1 + i * 0.06} inView>
                    <div className="h-full rounded-2xl border border-mq-ink/8 bg-white p-6 shadow-sm transition hover:shadow-md">
                      <div
                        className={cn(
                          'mb-4 flex h-11 w-11 items-center justify-center rounded-xl border',
                          toneStyles[item.tone],
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>
                      <h4 className="font-display text-lg font-bold text-mq-ink">{item.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-mq-muted">{item.desc}</p>
                      <ul className="mt-5 space-y-2.5">
                        {item.points.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-sm text-mq-ink/80">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mq-signal" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>

            <div className="mt-20">
              <BlurFade delay={0.1} inView>
                <div className="mx-auto mb-10 max-w-2xl text-center">
                  <h3 className="font-display text-2xl font-bold text-mq-ink">
                    Informations enrichies pour vos clients
                  </h3>
                </div>
              </BlurFade>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {galleryClientInfo.map((item, i) => (
                  <BlurFade key={item.title} delay={0.1 + i * 0.05} inView>
                    <div className="h-full rounded-2xl border border-mq-ink/8 bg-white p-5 shadow-sm">
                      <div
                        className={cn(
                          'mb-3 flex h-9 w-9 items-center justify-center rounded-lg border',
                          toneStyles[item.tone],
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>
                      <p className="font-display text-sm font-bold text-mq-ink">{item.title}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-mq-muted">{item.desc}</p>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <BlurFade delay={0.1} inView>
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">
                    Artistes · Expositions · Analytics
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-mq-ink">
                    Vos artistes mis en avant
                  </h3>
                </div>
              </BlurFade>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {galleryArtists.map((artist, i) => (
                  <BlurFade key={artist.name} delay={0.1 + i * 0.04} inView>
                    <div className="flex items-center gap-3 rounded-2xl border border-mq-ink/8 bg-white p-4 shadow-sm transition hover:shadow-md">
                      <div
                        className={cn(
                          'flex h-11 w-11 items-center justify-center rounded-full border font-display text-sm font-bold',
                          toneStyles[artist.tone],
                        )}
                      >
                        {artist.initial}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-mq-ink">{artist.name}</p>
                        <p className="text-xs text-mq-muted">{artist.discipline}</p>
                      </div>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>

            <div className="mt-20">
              <BlurFade delay={0.1} inView>
                <div className="mx-auto mb-12 max-w-2xl text-center">
                  <h3 className="font-display text-2xl font-bold text-mq-ink sm:text-3xl">
                    Une expérience client enrichie
                  </h3>
                  <p className="mt-3 text-sm text-mq-muted">
                    Vos visiteurs découvrent plus qu&apos;une simple œuvre d&apos;art.
                  </p>
                </div>
              </BlurFade>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {galleryExperience.map((item, i) => (
                  <BlurFade key={item.title} delay={0.1 + i * 0.05} inView>
                    <div className="h-full rounded-2xl border border-mq-ink/8 bg-white p-5 shadow-sm">
                      <div
                        className={cn(
                          'mb-3 flex h-10 w-10 items-center justify-center rounded-xl border',
                          toneStyles[item.tone],
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>
                      <p className="font-display font-bold text-mq-ink">{item.title}</p>
                      <p className="mt-2 text-xs leading-relaxed text-mq-muted">{item.desc}</p>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>

            <div className="mt-20">
              <BlurFade delay={0.1} inView>
                <div className="mx-auto mb-10 max-w-2xl text-center">
                  <SectionEyebrow>Ils nous font confiance</SectionEyebrow>
                  <h3 className="mt-4 font-display text-2xl font-bold text-mq-ink">
                    Ce que disent les galeries
                  </h3>
                </div>
              </BlurFade>
              <div className="grid gap-6 md:grid-cols-3">
                {galleryTestimonials.map((t, i) => (
                  <BlurFade key={t.name} delay={0.1 + i * 0.08} inView>
                    <blockquote className="flex h-full flex-col rounded-2xl border border-mq-ink/8 bg-white p-6 shadow-sm">
                      <Quote className="mb-4 h-5 w-5 text-violet-400" />
                      <p className="flex-1 text-sm leading-relaxed text-mq-muted">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <footer className="mt-5 border-t border-mq-ink/8 pt-4">
                        <p className="font-display font-bold text-mq-ink">{t.name}</p>
                        <p className="text-xs text-violet-500">{t.role}</p>
                      </footer>
                    </blockquote>
                  </BlurFade>
                ))}
              </div>
            </div>

            <BlurFade delay={0.15} inView>
              <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-500 via-rose-400 to-mq-coral p-8 text-center shadow-lg sm:p-10">
                <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  Prêt à enrichir l&apos;expérience de vos clients ?
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-sm text-white/85">
                  Transformez vos expositions en expériences interactives avec Qrious.
                </p>
                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/galeries"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-mq-ink transition hover:bg-white/90"
                  >
                    Voir l&apos;édition Galeries
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    Contacter l&apos;équipe
                  </Link>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ── Témoignages ── */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BlurFade delay={0.1} inView>
              <div className="mx-auto mb-12 max-w-2xl text-center">
                <SectionEyebrow className="bg-mq-sun/30 text-amber-700">
                  Ils nous font confiance
                </SectionEyebrow>
                <h2 className="mt-4 font-display text-3xl font-bold text-mq-ink">
                  Ce que disent nos clients
                </h2>
              </div>
            </BlurFade>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <BlurFade key={t.name} delay={0.1 + i * 0.08} inView>
                  <blockquote className="flex h-full flex-col rounded-2xl border border-mq-ink/8 bg-gradient-to-b from-white to-mq-mist/30 p-6 shadow-sm">
                    <Quote className="mb-4 h-6 w-6 text-mq-coral/70" />
                    <p className="flex-1 text-sm leading-relaxed text-mq-muted">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <footer className="mt-5 border-t border-mq-ink/8 pt-4">
                      <p className="font-display font-bold text-mq-ink">{t.name}</p>
                      <p className="text-xs text-mq-muted">{t.role}</p>
                      <p className="mt-1 text-mq-sun" aria-label="5 étoiles">
                        ★★★★★
                      </p>
                    </footer>
                  </blockquote>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <CtaSection />
      </main>

      <MarketingFooter />
    </div>
  )
}
