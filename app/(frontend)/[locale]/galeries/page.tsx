'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Award,
  BarChart3,
  Building,
  Check,
  Compass,
  FileCheck,
  Globe,
  HelpCircle,
  Instagram,
  Layers,
  Lock,
  Mail,
  Music,
  Palette,
  QrCode,
  Quote,
  ShieldCheck,
  Sparkles,
  Tag,
  Volume2,
  XCircle,
  Zap,
} from 'lucide-react'

import { CtaSection } from '@/components/marketing/CtaSection'
import { GalleryInteractivePreview } from '@/components/marketing/GalleryInteractivePreview'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { DotPattern } from '@/components/ui/dot-pattern'
import { MagicCard } from '@/components/ui/magic-card'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Particles } from '@/components/ui/particles'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { cn } from '@/lib/utils'

const galleryFeatures = [
  {
    icon: Palette,
    tag: 'CAT-01',
    title: 'Notice d’Œuvre & Fiche HD',
    desc: 'Présentez le titre, l’artiste, le médium, les dimensions, la notice explicative et le prix dans un écrin sobre et raffiné.',
  },
  {
    icon: Volume2,
    tag: 'CAT-02',
    title: 'Audio-Guide Muséal Intégré',
    desc: 'Offrez un commentaire audio explicatif aux visiteurs directement depuis leur smartphone sans aucun matériel encombrant.',
  },
  {
    icon: Globe,
    tag: 'CAT-03',
    title: 'Traduction Automatique 12 Langues',
    desc: 'Accueillez vos collectionneurs internationaux avec une fiche traduite instantanément dans leur langue maternelle.',
  },
  {
    icon: Zap,
    tag: 'CAT-04',
    title: 'Mise à Jour Instantanée des Prix',
    desc: 'Modifiez les tarifs ou marquez une œuvre comme "Vendue" en 1 clic sans jamais réimprimer vos cartels physiques.',
  },
  {
    icon: Sparkles,
    tag: 'CAT-05',
    title: 'Marque Blanche & Charte Galerie',
    desc: 'Intégrez la charte visuelle, les typographies de prestige et le logo officiel de votre galerie ou fondation d’art.',
  },
  {
    icon: Instagram,
    tag: 'CAT-06',
    title: 'Coulisses & Vidéos d’Atelier',
    desc: 'Liez le compte Instagram de l’artiste et diffusez une courte vidéo de création captée pendant l’élaboration de l’œuvre.',
  },
  {
    icon: Mail,
    tag: 'CAT-07',
    title: 'Demande d’Acquisition & Prix Privé',
    desc: 'Permettez aux acheteurs potentiels de solliciter directement le galeriste pour réserver une œuvre ou connaître un prix sur demande.',
  },
  {
    icon: FileCheck,
    tag: 'CAT-08',
    title: 'Certificat d’Authenticité PDF',
    desc: 'Proposez en téléchargement sécurisé le certificat d’authenticité signé et le dossier d’exposition complet de l’artiste.',
  },
  {
    icon: BarChart3,
    tag: 'CAT-09',
    title: 'Statistiques & Intérêt Vernissage',
    desc: 'Analysez en temps réel quelles œuvres suscitent le plus de curiosité et captez des leads de collectionneurs ciblés.',
  },
]

const galleryUseCases = [
  {
    title: "Galeries d'Art Contemporain & Classique",
    desc: 'Sublimez vos accrochages temporaires et vos fonds permanents tout en conservant une esthétique minimaliste.',
    badge: 'Galeries de Cime',
    icon: Building,
  },
  {
    title: "Foires & Salons d'Art (Art Basel, FIAC, Paris Photo...)",
    desc: 'Gérez la haute affluence des vernissages, ajustez vos disponibilités en direct et captez les coordonnées des collectionneurs.',
    badge: 'Foires Internationales',
    icon: Layers,
  },
  {
    title: 'Artistes Indépendants & Ateliers Ouverts',
    desc: 'Donnez une dimension hautement professionnelle et muséale à vos travaux lors des visites d’atelier et expositions privées.',
    badge: 'Ateliers & Artistes',
    icon: Palette,
  },
  {
    title: 'Musées & Fondations Culturelles',
    desc: 'Offrez un parcours interactif riche, polyglotte et accessible à tous les visiteurs sans la lourdeur logistique des audioguides.',
    badge: 'Musées & Fondations',
    icon: Compass,
  },
]

const faqItems = [
  {
    question: 'En quoi les cartels QR Qrious subliment-ils l’expérience d’exposition ?',
    answer:
      'Chaque œuvre reçoit un cartel discret et élégant. En scannant le QR code, le visiteur accède immédiatement à une fiche d’art en haute définition avec la notice, l’audio-guide, la vidéo d’atelier, les dimensions et la possibilité de contacter directement le galeriste.',
  },
  {
    question: 'Peut-on personnaliser le design pour conserver l’identité visuelle de notre galerie ?',
    answer:
      'Oui. Grâce à notre option Marque Blanche, vous pouvez apposer votre logo officiel, vos typographies et vos palettes de couleurs (doré, noir mat, bordeaux, crème) tout en supprimant toute référence externe.',
  },
  {
    question: 'Comment gérer les prix des œuvres confidentielles ou sur demande ?',
    answer:
      'Qrious vous permet de choisir d’afficher le prix public, de le masquer, ou de proposer un bouton "Prix sur demande" qui ouvre un formulaire direct vers votre équipe de vente.',
  },
  {
    question: 'Quels matériaux sont recommandés pour l’impression des cartels ?',
    answer:
      'Nous fournissons des fichiers haute résolution (SVG/PDF vectoriels 300 DPI) adaptés à tous les supports d’art : Aluminium Dibond noir ou brossé, Plexiglas ultra-clair mat anti-reflet, Papier d’Art Canson Rag ou Laiton gravé.',
  },
  {
    question: 'Les visiteurs doivent-ils installer une application pour lire l’audio-guide ?',
    answer:
      'Non, aucun téléchargement n’est nécessaire. L’appareil photo natif du smartphone ouvre la fiche et l’audio-guide en moins d’une seconde.',
  },
]

export default function GaleriesPage() {
  return (
    <div className="min-h-dvh bg-[#0d0c0a] font-sans text-white">
      <MarketingHeader />
      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#16120e] via-[#0d0c0a] to-[#080706] pt-32 pb-24 lg:pt-40 lg:pb-32">
          {/* Ambient Museum Spotlight Glow */}
          <div className="absolute inset-0" aria-hidden>
            <div className="absolute top-0 left-1/2 h-[550px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,#c5a05928_0%,transparent_70%)] blur-3xl" />
            <Particles quantity={45} color="#d4af37" size={0.6} className="absolute inset-0 opacity-60" />
            <DotPattern
              className={cn(
                'text-[#c5a059]/10 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]',
              )}
              width={32}
              height={32}
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <BlurFade delay={0.1} inView>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/40 bg-[#c5a059]/10 px-4 py-1.5 backdrop-blur-md">
                  <Sparkles className="h-4 w-4 text-[#e6cf8b]" />
                  <span className="font-serif text-xs font-semibold uppercase tracking-[0.25em] text-[#e6cf8b]">
                    Édition Spéciale Galeries & Art
                  </span>
                </div>

                <h1 className="mt-6 font-serif text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
                  L'Élégance Muséale au Service de vos{' '}
                  <span className="bg-gradient-to-r from-[#f3e5c8] via-[#c5a059] to-[#9e7939] bg-clip-text text-transparent">
                    Cartels d'Art Interactifs
                  </span>
                </h1>

                <p className="mt-6 text-base leading-relaxed text-white/75 sm:text-lg">
                  Enrichissez l'expérience de vos collectionneurs avec des fiches d'œuvres élégantes, notices bilingues, audio-guides muséaux et gestion instantanée des tarifs.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href="/dashboard/register">
                    <ShimmerButton
                      background="linear-gradient(135deg, #d4af37 0%, #c5a059 50%, #8c6b30 100%)"
                      shimmerColor="#fff8ee"
                      borderRadius="12px"
                      className="h-13 px-8 text-base shadow-xl shadow-[#c5a059]/20"
                    >
                      <span className="font-serif font-bold text-[#0d0c0a]">Créer mes cartels d'art</span>
                    </ShimmerButton>
                  </Link>
                  <Link
                    href="/demo"
                    className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 text-sm font-serif font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
                  >
                    <span>Explorer la démo</span>
                    <ArrowRight className="h-4 w-4 text-[#c5a059]" />
                  </Link>
                </div>
              </BlurFade>

              {/* Key Proof Stats */}
              <BlurFade delay={0.2} inView>
                <div className="mt-16 grid grid-cols-2 gap-6 border-t border-[#c5a059]/20 pt-10 sm:grid-cols-4">
                  <div className="p-2">
                    <div className="font-serif text-3xl font-bold text-[#e6cf8b]">0 €</div>
                    <div className="mt-1 text-xs text-white/60">Réimpressions lors des ventes</div>
                  </div>
                  <div className="p-2">
                    <div className="font-serif text-3xl font-bold text-white">
                      +<NumberTicker value={340} className="text-white" />%
                    </div>
                    <div className="mt-1 text-xs text-white/60">Consultation des notices</div>
                  </div>
                  <div className="p-2">
                    <div className="font-serif text-3xl font-bold text-[#e6cf8b]">100%</div>
                    <div className="mt-1 text-xs text-white/60">Audio-Guide Sans Application</div>
                  </div>
                  <div className="p-2">
                    <div className="font-serif text-3xl font-bold text-white">12</div>
                    <div className="mt-1 text-xs text-white/60">Langues de Traduction</div>
                  </div>
                </div>
              </BlurFade>
            </div>

            {/* INTERACTIVE DEMO PREVIEW */}
            <div className="mt-16 lg:mt-20">
              <BlurFade delay={0.3} inView>
                <GalleryInteractivePreview />
              </BlurFade>
            </div>
          </div>
        </section>

        {/* COMPARATIVE SECTION: PAPIER VS QR DYNAMIQUE */}
        <section className="py-24 bg-[#110e0b] border-t border-[#c5a059]/20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <BlurFade delay={0.1} inView>
              <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                <span className="text-xs font-serif font-semibold uppercase tracking-[0.25em] text-[#e6cf8b]">
                  Médiation d'Exposition
                </span>
                <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
                  Cartel Papier Traditionnel vs Cartel QRious Art
                </h2>
                <p className="text-sm text-white/70">
                  Offrez à vos visiteurs la profondeur narrative et l'émotion que le papier ne peut transmettre.
                </p>
              </div>
            </BlurFade>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Paper Cartel Card */}
              <BlurFade delay={0.15} inView>
                <div className="h-full rounded-3xl border border-red-900/30 bg-red-950/20 p-8 shadow-sm text-white/80">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-900/40 border border-red-800/50 text-red-400">
                      <XCircle className="h-7 w-7" />
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white">
                      Cartel Papier Classique
                    </h3>
                  </div>
                  <ul className="space-y-4 text-sm leading-relaxed text-white/70">
                    <li className="flex items-start gap-3">
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                      <span><strong>Espace très restreint :</strong> impossible d’intégrer biographie complète, vidéo d’atelier ou audio-guide.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                      <span><strong>Réimpression permanente :</strong> chaque changement de prix ou statut "Vendu" exige de réimprimer le carton.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                      <span><strong>Absence de métriques :</strong> aucun moyen d’analyser quelles œuvres suscitent l’intérêt pendant le vernissage.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                      <span><strong>Barrière de la langue :</strong> les visiteurs internationaux repartent sans lire la notice.</span>
                    </li>
                  </ul>
                </div>
              </BlurFade>

              {/* Dynamic QR Cartel Card */}
              <BlurFade delay={0.2} inView>
                <div className="relative h-full overflow-hidden rounded-3xl border border-[#c5a059]/40 bg-gradient-to-br from-[#1b1713] to-[#0c0a08] p-8 text-white shadow-2xl">
                  <BorderBeam size={100} duration={8} colorFrom="#d4af37" colorTo="#c5a059" />
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#e6cf8b]">
                      <Sparkles className="h-7 w-7" />
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white">
                      Cartel Numérique QRious Art
                    </h3>
                  </div>
                  <ul className="space-y-4 text-sm leading-relaxed text-white/85">
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e6cf8b]" />
                      <span><strong>Notice enrichie & Audio-Guide :</strong> histoire complète, enregistrements sonores, vidéo et certificat PDF.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e6cf8b]" />
                      <span><strong>Mise à jour en 1-clic :</strong> ajustez le tarif ou marquez "Vendu" directement depuis votre mobile.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e6cf8b]" />
                      <span><strong>Statistiques d'exposition :</strong> découvrez en temps réel l'intérêt des acheteurs.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e6cf8b]" />
                      <span><strong>Acquisition instantanée :</strong> bouton direct vers le galeriste et traduction automatique en 12 langues.</span>
                    </li>
                  </ul>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* FEATURES CATALOG GRID SECTION */}
        <section className="py-24 sm:py-32 bg-[#0d0c0a]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <BlurFade delay={0.1} inView>
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <span className="text-xs font-serif font-semibold uppercase tracking-[0.25em] text-[#e6cf8b]">
                  Fonctionnalités Haute Curation
                </span>
                <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
                  Conçu avec et pour le marché de l'art
                </h2>
                <p className="text-sm text-white/70">
                  Des fonctionnalités d'exception pensées pour les besoins uniques des galeries et maisons de vente.
                </p>
              </div>
            </BlurFade>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleryFeatures.map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.04} inView>
                  <MagicCard
                    className="h-full rounded-2xl border border-[#c5a059]/20 bg-[#14100c]"
                    gradientFrom="#d4af37"
                    gradientTo="#8c6b30"
                    gradientColor="#c5a05918"
                    gradientOpacity={0.4}
                  >
                    <div className="flex h-full flex-col justify-between p-7 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e6cf8b] shadow-sm">
                          <f.icon className="h-6 w-6" />
                        </span>
                        <span className="font-serif text-[10px] font-bold tracking-widest text-[#c5a059] border border-[#c5a059]/30 px-2 py-0.5 rounded">
                          {f.tag}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-white mb-2">{f.title}</h3>
                        <p className="text-xs leading-relaxed text-white/70">{f.desc}</p>
                      </div>
                    </div>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY QUOTE TESTIMONIAL SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#14100c] via-[#0f0d0a] to-[#0a0806] py-24 text-white">
          <div className="relative mx-auto max-w-4xl px-4 text-center">
            <BlurFade delay={0.1} inView>
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#c5a059]/40 bg-[#c5a059]/10 text-[#e6cf8b]">
                <Quote className="h-7 w-7" />
              </div>
              <blockquote className="font-serif text-xl sm:text-2xl leading-relaxed italic text-white/90">
                « Qrious a métamorphosé la médiation de nos expositions lors d'Art Basel. Nos collectionneurs internationaux accèdent immédiatement au texte curatorial et aux tarifs dans leur langue, puis contactent l'équipe en un clic. »
              </blockquote>
              <div className="mt-8 space-y-1">
                <p className="font-serif font-bold text-[#e6cf8b]">Jean-Baptiste de Varenne</p>
                <p className="text-xs text-white/60">Directeur de Galerie · Paris Marais & Mayfair, Londres</p>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* USE CASES / UNIVERSES SECTION */}
        <section className="relative overflow-hidden bg-[#0d0c0a] py-24 sm:py-32">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <BlurFade delay={0.1} inView>
              <div className="max-w-2xl space-y-3">
                <span className="text-xs font-serif font-semibold uppercase tracking-[0.25em] text-[#e6cf8b]">
                  Secteurs d'Excellence
                </span>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Adapté à l'ensemble du monde de l'art
                </h2>
                <p className="text-sm text-white/70">
                  De l'espace indépendant aux grandes foires internationales d'art contemporain.
                </p>
              </div>
            </BlurFade>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {galleryUseCases.map((uc, index) => (
                <BlurFade key={uc.title} delay={0.1 + index * 0.06} inView>
                  <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-[#c5a059]/25 bg-[#14100c] p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#c5a059]/50 hover:bg-[#1a140f]">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e6cf8b]">
                          <uc.icon className="h-6 w-6" />
                        </span>
                        <span className="rounded font-serif text-[10px] font-semibold text-[#e6cf8b] border border-[#c5a059]/30 bg-[#c5a059]/10 px-2 py-0.5">
                          {uc.badge}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-white mb-2">{uc.title}</h3>
                      <p className="text-xs leading-relaxed text-white/60">{uc.desc}</p>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="py-24 sm:py-32 bg-[#110e0b] border-t border-[#c5a059]/20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-16 space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-4 py-2 text-xs font-serif font-bold text-[#e6cf8b]">
                  <HelpCircle className="h-4 w-4 text-[#c5a059]" />
                  <span>Réponses aux Galeristes</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
                  Questions Fréquentes
                </h2>
                <p className="text-sm text-white/60">
                  Retrouvez tout ce que vous devez savoir pour équiper vos expositions.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="rounded-3xl border border-[#c5a059]/25 bg-[#14100c] p-6 sm:p-8 shadow-xl">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {faqItems.map((item, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} className="border-white/10">
                      <AccordionTrigger className="font-serif text-base font-semibold text-white text-left hover:text-[#e6cf8b] hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-white/70">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* CTA SECTION */}
        <CtaSection />
      </main>

      <MarketingFooter />
    </div>
  )
}
