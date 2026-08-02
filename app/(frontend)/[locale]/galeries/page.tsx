'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Building,
  Check,
  Globe,
  HelpCircle,
  Instagram,
  Layers,
  Lock,
  Mail,
  Palette,
  QrCode,
  ShieldCheck,
  Sparkles,
  Tag,
  Video,
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
    title: 'Fiche Œuvre Élégante & Complet',
    desc: 'Présentez le titre, l’artiste, le médium, les dimensions, la notice explicative et le prix en haute définition.',
  },
  {
    icon: Zap,
    title: 'Mise à Jour Instantanée',
    desc: 'Modifiez le prix ou marquez une œuvre comme "Vendue" en 1 clic sans jamais réimprimer vos cartels.',
  },
  {
    icon: Globe,
    title: 'Multi-Langue Automatique',
    desc: 'Accueillez vos collectionneurs internationaux avec une traduction automatique (Français, Anglais, Espagnol...).',
  },
  {
    icon: Sparkles,
    title: 'Marque Blanche & Identité Galerie',
    desc: 'Personnalisez la charte visuelle avec les couleurs et le logo officiel de votre galerie d’art.',
  },
  {
    icon: Instagram,
    title: 'Réseaux & Vidéos d’Atelier',
    desc: 'Connectez le compte Instagram de l’artiste et intégrez des coulisses vidéo de création directement accessibles au scan.',
  },
  {
    icon: Mail,
    title: 'Bouton de Demande d’Acquisition',
    desc: 'Permettez aux acheteurs potentiels de contacter le galeriste en direct pour réserver ou négocier une œuvre.',
  },
  {
    icon: BarChart3,
    title: 'Statistiques de Consultation',
    desc: 'Découvrez en temps réel quelles œuvres captivent le plus vos visiteurs pendant et après les vernissages.',
  },
  {
    icon: ShieldCheck,
    title: 'Certificats & Fiches PDF',
    desc: 'Proposez en téléchargement sécurisé la fiche technique complète ou le certificat d’authenticité.',
  },
  {
    icon: QrCode,
    title: 'Format QR Universel',
    desc: 'Compatible avec 100% des smartphones sans aucune application à installer pour les visiteurs.',
  },
]

const galleryUseCases = [
  {
    title: "Galeries d'Art Contemporain & Classique",
    desc: 'Valorisez vos expositions temporaires et votre fonds permanent tout en gardant des cartels élégants et épurés.',
    badge: 'Galeries',
    icon: Building,
  },
  {
    title: "Foires & Salons d'Art (FIAC, Art Basel...)",
    desc: 'Gérez la haute affluence, ajustez vos prix en direct pendant la foire et captez immédiatement les coordonnées des acheteurs.',
    badge: 'Foires & Salons',
    icon: Layers,
  },
  {
    title: 'Artistes Indépendants & Vernissages',
    desc: 'Donnez une image hautement professionnelle à votre travail lors de vos ateliers ouverts et expositions personnelles.',
    badge: 'Artistes',
    icon: Palette,
  },
  {
    title: 'Musées & Fondations Culturelles',
    desc: 'Offrez un parcours interactif riche et bilingue à vos visiteurs sans les coûts logistiques des audioguides traditionnels.',
    badge: 'Musées',
    icon: Sparkles,
  },
]

const faqItems = [
  {
    question: 'Comment fonctionnent les QR codes dynamiques pour les cartels ?',
    answer:
      'Chaque œuvre ou emplacement se voit attribuer un QR code unique. Lorsqu’un visiteur scanne ce code, il accède à la fiche mise à jour en temps réel. Vous pouvez modifier le prix, la description, ajouter une vidéo ou marquer l’œuvre comme "Vendue" depuis votre smartphone sans jamais réimprimer le carton physique.',
  },
  {
    question: 'Est-il possible de personnaliser la fiche avec le logo et les couleurs de ma galerie ?',
    answer:
      'Absolument. Grâce à notre option Marque Blanche, vous pouvez importer le logo de votre galerie d’art, définir vos couleurs principales (doré, noir, bordeaux, etc.) et supprimer toute mention de Qrious pour préserver votre identité de marque.',
  },
  {
    question: 'Les visiteurs doivent-ils télécharger une application pour scanner ?',
    answer:
      'Non, aucun téléchargement n’est requis. Les visiteurs utilisent simplement l’appareil photo natif de leur smartphone (iPhone ou Android) pour ouvrir immédiatement la fiche de l’œuvre en moins d’une seconde.',
  },
  {
    question: 'Puis-je suivre le nombre de scans et l’intérêt des acheteurs ?',
    answer:
      'Oui, votre tableau de bord vous fournit des statistiques précises : nombre de vues par œuvre, temps de consultation, clics sur le bouton de réservation ou vers l’Instagram de l’artiste.',
  },
  {
    question: 'Comment imprimer les QR codes pour mon accrochage ?',
    answer:
      'Qrious vous permet d’exporter vos QR codes en très haute résolution (PNG, SVG ou PDF) prêts pour l’imprimeur, sur plexiglas, bois, aluminium Dibond ou carton d’art.',
  },
]

export default function GaleriesPage() {
  return (
    <div className="min-h-dvh bg-mq-paper font-body">
      <MarketingHeader />
      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-mq-ink pt-32 pb-24 text-white lg:pt-40 lg:pb-32">
          <div className="absolute inset-0" aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#3d2b1f66_0%,transparent_70%)]" />
            <Particles quantity={60} color="#c4a574" size={0.5} className="absolute inset-0" />
            <DotPattern
              className={cn(
                'text-white/10 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]',
              )}
              width={28}
              height={28}
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <BlurFade delay={0.1} inView>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#c4a574]/30 bg-[#c4a574]/10 px-4 py-1.5 backdrop-blur-md">
                  <Sparkles className="h-4 w-4 text-[#c4a574]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c4a574]">
                    Solution Art & Galeries
                  </span>
                </div>

                <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Transformez vos cartels en{' '}
                  <span className="bg-gradient-to-r from-[#e8d5b5] via-[#c4a574] to-[#a38455] bg-clip-text text-transparent">
                    expériences d'art interactives
                  </span>
                </h1>

                <p className="mt-6 text-lg leading-relaxed text-white/70 sm:text-xl">
                  Présentez l'histoire des œuvres, les vidéos d'atelier et les tarifs en temps réel.
                  Un QR code sur votre cartel, 100% de flexibilité sans réimpression.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href="/dashboard/register">
                    <ShimmerButton
                      background="linear-gradient(135deg, #c4a574 0%, #a38455 100%)"
                      shimmerColor="#fff8ee"
                      borderRadius="12px"
                      className="h-13 px-8 text-base shadow-xl shadow-[#c4a574]/20"
                    >
                      <span className="font-semibold text-mq-ink">Créer ma galerie gratuite</span>
                    </ShimmerButton>
                  </Link>
                  <Link
                    href="/demo"
                    className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
                  >
                    <span>Voir une démonstration</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </BlurFade>

              {/* Key Proof Stats */}
              <BlurFade delay={0.2} inView>
                <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-4">
                  <div>
                    <div className="font-display text-3xl font-extrabold text-[#c4a574]">0 €</div>
                    <div className="mt-1 text-xs text-white/50">Réimpressions de cartels</div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-extrabold text-white">
                      +<NumberTicker value={340} className="text-white" />%
                    </div>
                    <div className="mt-1 text-xs text-white/50">Consultation des fiches</div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-extrabold text-[#c4a574]">
                      &lt; <NumberTicker value={2} className="text-[#c4a574]" /> min
                    </div>
                    <div className="mt-1 text-xs text-white/50">Pour configurer une expo</div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-extrabold text-white">100%</div>
                    <div className="mt-1 text-xs text-white/50">Compatible smartphones</div>
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
        <section className="py-24 bg-white/70">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <BlurFade delay={0.1} inView>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c4a574]">
                  Pourquoi moderniser vos cartels ?
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-mq-ink sm:text-4xl">
                  Le cartel papier vs Le cartel QR Qrious
                </h2>
                <p className="mt-4 text-base text-mq-muted">
                  Ne laissez plus le format papier limiter l'émotion et l'information transmises à vos visiteurs.
                </p>
              </div>
            </BlurFade>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Paper Cartel Card */}
              <BlurFade delay={0.15} inView>
                <div className="h-full rounded-3xl border border-red-200 bg-red-50/40 p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                      <XCircle className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-xl font-bold text-mq-ink">
                      Cartel Papier Traditionnel
                    </h3>
                  </div>
                  <ul className="space-y-4 text-sm text-mq-ink/80">
                    <li className="flex items-start gap-3">
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                      <span><strong>Informations très limitées :</strong> impossible d'intégrer bio, vidéo ou audio-guide.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                      <span><strong>Réimpression obligatoire :</strong> chaque changement de prix ou statut "Vendu" exige de réimprimer.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                      <span><strong>Aucune donnée :</strong> impossible de savoir quelles œuvres intéressent les visiteurs.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                      <span><strong>Perte de contact :</strong> le visiteur repart sans garder de trace de l'œuvre ou de la galerie.</span>
                    </li>
                  </ul>
                </div>
              </BlurFade>

              {/* Dynamic QR Cartel Card */}
              <BlurFade delay={0.2} inView>
                <div className="relative h-full overflow-hidden rounded-3xl border border-[#c4a574]/40 bg-gradient-to-br from-mq-ink to-[#1a1410] p-8 text-white shadow-xl">
                  <BorderBeam size={100} duration={8} colorFrom="#c4a574" colorTo="#e8d5b5" />
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c4a574]/20 text-[#c4a574]">
                      <Sparkles className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-xl font-bold text-white">
                      Cartel QR Dynamique Qrious
                    </h3>
                  </div>
                  <ul className="space-y-4 text-sm text-white/80">
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#c4a574]" />
                      <span><strong>Fiche enrichie et dynamique :</strong> texte complet, vidéos d'atelier, Instagram & bio artiste.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#c4a574]" />
                      <span><strong>Mise à jour en 1-clic :</strong> modifiez les prix ou le statut "Vendu" directement depuis votre mobile.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#c4a574]" />
                      <span><strong>Statistiques d'exposition :</strong> suivez l'engagement et les scans des collectionneurs.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#c4a574]" />
                      <span><strong>Acquisition facilitée :</strong> bouton de demande de prix direct et partage instantané.</span>
                    </li>
                  </ul>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <BlurFade delay={0.1} inView>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c4a574]">
                  Fonctionnalités Clés
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-mq-ink sm:text-4xl">
                  Tout ce dont votre galerie a besoin pour rayonner
                </h2>
                <p className="mt-4 text-mq-muted text-base">
                  Une plateforme pensée spécifiquement avec et pour les professionnels du marché de l'art.
                </p>
              </div>
            </BlurFade>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryFeatures.map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.04} inView>
                  <MagicCard
                    className="h-full rounded-2xl"
                    gradientFrom="#c4a574"
                    gradientTo="#a38455"
                    gradientColor="#c4a57418"
                    gradientOpacity={0.5}
                  >
                    <div className="flex h-full flex-col gap-3 p-6">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mq-ink text-[#c4a574]">
                        <f.icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-display text-lg font-bold text-mq-ink">{f.title}</h3>
                      <p className="text-sm leading-relaxed text-mq-muted">{f.desc}</p>
                    </div>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* USE CASES / UNIVERSES SECTION */}
        <section className="relative overflow-hidden bg-mq-ink py-24 text-white sm:py-32">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="mq-blob absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_center,#c4a57422_0%,transparent_70%)]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <BlurFade delay={0.1} inView>
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c4a574]">
                  Secteurs & Usages
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  Adapté à tous les acteurs du monde de l'art
                </h2>
                <p className="mt-4 text-base text-white/60">
                  Des galeries parisiennes aux grandes foires internationales, Qrious s'adapte à vos besoins d'accrochage.
                </p>
              </div>
            </BlurFade>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {galleryUseCases.map((uc, index) => (
                <BlurFade key={uc.title} delay={0.1 + index * 0.06} inView>
                  <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#c4a574]/40 hover:bg-white/[0.06]">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c4a574]/15 text-[#c4a574]">
                          <uc.icon className="h-5 w-5" />
                        </span>
                        <span className="rounded-full border border-[#c4a574]/30 bg-[#c4a574]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#c4a574]">
                          {uc.badge}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-white mb-2">{uc.title}</h3>
                      <p className="text-xs leading-relaxed text-white/60">{uc.desc}</p>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="py-24 sm:py-32 bg-mq-paper">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 rounded-full border border-mq-ink/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-mq-ink shadow-sm">
                  <HelpCircle className="h-3.5 w-3.5 text-[#c4a574]" />
                  <span>Questions fréquentes</span>
                </div>
                <h2 className="mt-4 font-display text-3xl font-bold text-mq-ink sm:text-4xl">
                  Tout ce que vous devez savoir
                </h2>
                <p className="mt-3 text-mq-muted text-sm">
                  Retrouvez les réponses aux questions les plus posées par les galeristes.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="rounded-3xl border border-mq-ink/10 bg-white p-6 sm:p-8 shadow-sm">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {faqItems.map((item, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} className="border-mq-ink/10">
                      <AccordionTrigger className="font-display text-base font-semibold text-mq-ink text-left hover:text-[#c4a574] hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-mq-muted">
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
