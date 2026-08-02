'use client'

import React from 'react'
import Link from 'next/link'
import { Megaphone, CreditCard, FileText, BookOpen, ArrowRight, Printer, Sparkles } from 'lucide-react'

import { BlurFade } from '@/components/ui/blur-fade'
import { MagicCard } from '@/components/ui/magic-card'

const PRINT_ITEMS = [
  {
    icon: Megaphone,
    title: 'Marketing & Grand Affichage',
    subtitle: 'Faites passer votre message, captez votre audience.',
    description:
      'Transformez vos bannières, panneaux d’affichage et vitrines en points de contact interactifs scannables à plusieurs mètres.',
    tag: 'Affiches & Bannières',
    accentColor: '#ff5c4d',
    gradient: 'from-rose-500/10 via-transparent to-transparent',
  },
  {
    icon: CreditCard,
    title: 'Cartes de Visite',
    subtitle: 'Créez une première impression mémorable.',
    description:
      'Proposez une carte physique enrichie par une vCard dynamique : partage de contact direct, réseaux sociaux et portfolio.',
    tag: 'Réseau & vCard',
    accentColor: '#12c4a8',
    gradient: 'from-emerald-500/10 via-transparent to-transparent',
  },
  {
    icon: FileText,
    title: 'Flyers & Prospectus',
    subtitle: 'Diffusez vos offres avec style et interactivité.',
    description:
      'Incitez à l’action immédiate avec un QR code promotionnel donnant accès à un coupon de réduction ou un formulaire.',
    tag: 'Promotions',
    accentColor: '#ffc53d',
    gradient: 'from-amber-500/10 via-transparent to-transparent',
  },
  {
    icon: BookOpen,
    title: 'Brochures & Catalogues',
    subtitle: 'Racontez votre histoire en images et en détails.',
    description:
      'Enrichissez vos documents papier avec des vidéos de démonstration, des fiches techniques PDF et des avis clients.',
    tag: 'Catalogues HD',
    accentColor: '#3dbbff',
    gradient: 'from-sky-500/10 via-transparent to-transparent',
  },
]

export function QrPrintMediumsSection() {
  return (
    <section className="relative overflow-hidden bg-mq-ink py-24 text-white sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[800px] -translate-x-1/2 bg-mq-sky/10 blur-[130px] rounded-full"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <BlurFade delay={0.1} inView>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-mq-signal backdrop-blur-md">
              <Printer className="h-3.5 w-3.5 text-mq-signal" />
              <span>Qualité Impression Vectorielle</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Codes QR pour vos <span className="mq-rainbow-text">supports d’impression</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Distribuez et convertissez plus rapidement avec nos options d’export vectoriel (SVG, PNG HD) optimisées pour le print.
            </p>
          </div>
        </BlurFade>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRINT_ITEMS.map((item, index) => {
            const Icon = item.icon
            return (
              <BlurFade key={item.title} delay={0.08 + index * 0.06} inView>
                <MagicCard
                  className="group flex flex-col justify-between h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20"
                  gradientFrom={item.accentColor}
                  gradientTo="#0b1220"
                  gradientOpacity={0.2}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-xl text-mq-ink shadow-md"
                        style={{ backgroundColor: item.accentColor }}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/60 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                        {item.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-mq-signal transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-mq-sun">
                        {item.subtitle}
                      </p>
                      <p className="mt-3 text-sm text-white/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <Link
                      href="/editeur"
                      className="inline-flex items-center gap-2 text-xs font-bold text-mq-signal hover:text-white transition-colors group/link"
                    >
                      <span>Créer ce QR code</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </MagicCard>
              </BlurFade>
            )
          })}
        </div>
      </div>
    </section>
  )
}
