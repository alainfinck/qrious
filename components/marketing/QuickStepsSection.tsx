'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Palette,
  Sliders,
  Sparkles,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  QrCode,
  Smartphone,
  Eye,
  Layers,
} from 'lucide-react'

import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { MagicCard } from '@/components/ui/magic-card'
import { NumberTicker } from '@/components/ui/number-ticker'
import { ShimmerButton } from '@/components/ui/shimmer-button'

interface TabInfo {
  id: string
  label: string
  title: string
  description: string
  badge: string
  icon: React.ElementType
  accentFrom: string
  accentTo: string
  bullets: string[]
  previewContent: React.ReactNode
}

const TABS: TabInfo[] = [
  {
    id: 'design',
    label: 'Conception QR Code',
    title: 'Options de design unique & personnalisé',
    badge: 'Design & Style',
    description:
      'Découvrez notre vaste gamme de cadres, formes, couleurs personnalisées et insérez le logo de votre entreprise pour créer des QR codes inoubliables.',
    icon: Palette,
    accentFrom: '#12c4a8',
    accentTo: '#3dbbff',
    bullets: [
      'Personnalisation intégrale des couleurs (dégradés, yeux, fond)',
      'Intégration du logo de votre marque au centre du QR',
      'Cadres interactifs avec appels à l’action ("Scannez-moi")',
      'Export haute résolution vectorielle (SVG, PNG HD)',
    ],
    previewContent: (
      <div className="relative flex flex-col items-center justify-center p-8 bg-slate-900/90 rounded-2xl border border-white/10 overflow-hidden">
        <BorderBeam size={100} duration={8} colorFrom="#12c4a8" colorTo="#3dbbff" />
        <div className="relative h-44 w-44 rounded-2xl bg-gradient-to-br from-mq-signal/20 via-white/10 to-mq-sky/20 p-4 border border-white/20 shadow-2xl flex items-center justify-center">
          <div className="grid grid-cols-6 gap-1.5 w-full h-full p-2 bg-white/10 rounded-xl">
            {Array.from({ length: 36 }).map((_, i) => {
              const active = [0, 1, 2, 5, 6, 12, 13, 17, 18, 23, 24, 29, 30, 33, 34, 35].includes(i)
              return (
                <div
                  key={i}
                  className={`rounded-sm ${
                    active
                      ? i % 2 === 0
                        ? 'bg-mq-signal'
                        : 'bg-mq-sky'
                      : 'bg-white/15'
                  }`}
                />
              )
            })}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-mq-ink border-2 border-mq-signal flex items-center justify-center shadow-lg">
              <QrCode className="h-5 w-5 text-mq-signal" />
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <span className="text-xs font-semibold text-mq-signal uppercase tracking-wider">
            Aperçu Haute Définition
          </span>
          <p className="text-sm text-white/70 mt-1">Prêt pour impression & affichage digital</p>
        </div>
      </div>
    ),
  },
  {
    id: 'customization',
    label: 'Personnalisation',
    title: 'Personnalisez vos données & types de conversion',
    badge: 'Formulaires & Dynamic Data',
    description:
      'Remplir des détails ne suffit pas. QRious vous donne l’opportunité de catégoriser et personnaliser chaque point de contact pour captiver votre audience.',
    icon: Sliders,
    accentFrom: '#ff5c4d',
    accentTo: '#ffc53d',
    bullets: [
      'Multi-formats : Web, PDF, WiFi, Menu, vCard, Réseaux Sociaux',
      'Mise à jour en temps réel sans jamais réimprimer le QR code',
      'Champs dynamiques configurables en quelques clics',
      'Support Smart Routing et redirection contextuelle',
    ],
    previewContent: (
      <div className="relative flex flex-col p-6 bg-slate-900/90 rounded-2xl border border-white/10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="h-8 w-8 rounded-lg bg-mq-coral/20 flex items-center justify-center text-mq-coral">
              <Smartphone className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Redirection Intelligente</p>
              <p className="text-xs text-white/60">Détecte la langue et le type d'appareil</p>
            </div>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
              Actif
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="h-8 w-8 rounded-lg bg-mq-sun/20 flex items-center justify-center text-mq-sun">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Menu & Fichiers PDF</p>
              <p className="text-xs text-white/60">Mise à jour instantanée du catalogue</p>
            </div>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-mq-sun/20 text-mq-sun font-medium">
              Synchro
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'solutions',
    label: 'Solutions',
    title: 'Les meilleures solutions de QR Code pour votre entreprise',
    badge: 'Templates Métiers',
    description:
      'Nous offrons la collection la plus riche de solutions landing pages sur-mesure pour vous aider à atteindre tous vos objectifs de conversion.',
    icon: Sparkles,
    accentFrom: '#3dbbff',
    accentTo: '#12c4a8',
    bullets: [
      'Templates dédiés CHRD, Événementiel B2B, Retail UGC, Immobilier & Art',
      'Expérience mobile-first fluide et ultrarapide',
      'Personnalisation visuelle aux couleurs de votre entreprise (Marque Blanche)',
      'Intégration d’avis Google, TripAdvisor et formulaires de capture',
    ],
    previewContent: (
      <div className="relative flex flex-col p-6 bg-slate-900/90 rounded-2xl border border-white/10">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-rose-900/40 to-slate-900 border border-rose-500/20 text-center">
            <p className="text-xs font-bold text-white">Hôtellerie & Resto</p>
            <p className="text-[10px] text-white/60 mt-1">Menu PDF & Wifi Guest</p>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 text-center">
            <p className="text-xs font-bold text-white">Corporate B2B</p>
            <p className="text-[10px] text-white/60 mt-1">Live Wall & Agenda</p>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-slate-900 border border-purple-500/20 text-center">
            <p className="text-xs font-bold text-white">Retail & UGC</p>
            <p className="text-[10px] text-white/60 mt-1">Jeu Concours Photo</p>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-900/40 to-slate-900 border border-amber-500/20 text-center">
            <p className="text-xs font-bold text-white">Art & Galeries</p>
            <p className="text-[10px] text-white/60 mt-1">Cartels & Audio Guide</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'analytics',
    label: 'Statistiques',
    title: 'Des statistiques précises pour suivre & maximiser vos scans',
    badge: 'Analytics & Suivi HD',
    description:
      'QRious vous fournit des analyses détaillées pour mesurer la performance de vos supports imprimés et adapter vos campagnes marketing.',
    icon: BarChart3,
    accentFrom: '#ffc53d',
    accentTo: '#ff5c4d',
    bullets: [
      'Nombre de scans en temps réel et heures de pointe',
      'Répartition par pays, villes, OS (iOS, Android, Desktop)',
      'Suivi des clics sur vos boutons d’action et de conversion',
      'Rapports téléchargeables et intégration d’analytics',
    ],
    previewContent: (
      <div className="relative flex flex-col p-6 bg-slate-900/90 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-white/60 uppercase tracking-wider">Total Scans</p>
            <p className="text-2xl font-bold text-white font-display">
              <NumberTicker value={12480} className="text-mq-signal" />
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <Eye className="h-3.5 w-3.5" />
            <span>+24.5% ce mois</span>
          </div>
        </div>
        <div className="h-16 flex items-end gap-1.5 pt-2 border-t border-white/10">
          {[35, 45, 60, 40, 80, 95, 70, 85, 100, 75, 90, 110].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-mq-signal/40 to-mq-signal rounded-t"
              style={{ height: `${(h / 110) * 100}%` }}
            />
          ))}
        </div>
      </div>
    ),
  },
]

export function QuickStepsSection() {
  const [activeTabId, setActiveTabId] = useState<string>('design')
  const currentTab = TABS.find((t) => t.id === activeTabId) || TABS[0]

  return (
    <section className="relative overflow-hidden bg-mq-ink py-24 text-white sm:py-32">
      {/* Background glow effects */}
      <div
        className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-mq-signal/15 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-mq-coral/15 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <BlurFade delay={0.1} inView>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-mq-sun backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-mq-sun" />
              <span>Tout-en-un pour vos QR codes</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Une plateforme pensée pour vos <span className="mq-rainbow-text">ambitions</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Créez, personnalisez, publiez et suivez vos codes QR dynamiques avec la liberté visuelle ultime.
            </p>
          </div>
        </BlurFade>

        {/* Dynamic Navigation Tabs inspired by qrcodecreator.com */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 p-2 backdrop-blur-md">
            {TABS.map((tab) => {
              const isActive = tab.id === activeTabId
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-mq-signal text-mq-ink shadow-lg shadow-mq-signal/25 scale-[1.02]'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-mq-ink' : 'text-mq-signal'}`} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content Panel */}
        <div className="mt-12">
          <BlurFade key={currentTab.id} delay={0.05} inView>
            <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent p-8 backdrop-blur-xl lg:p-12">
              <BorderBeam
                size={140}
                duration={10}
                colorFrom={currentTab.accentFrom}
                colorTo={currentTab.accentTo}
              />
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                {/* Left Column: Info & Features */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-lg bg-mq-signal/15 px-3 py-1 text-xs font-semibold text-mq-signal border border-mq-signal/30">
                    <currentTab.icon className="h-4 w-4" />
                    <span>{currentTab.badge}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
                    {currentTab.title}
                  </h3>
                  <p className="text-base text-white/75 leading-relaxed">
                    {currentTab.description}
                  </p>
                  <ul className="space-y-3 pt-2">
                    {currentTab.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-white/90">
                        <CheckCircle2 className="h-5 w-5 text-mq-signal shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 flex flex-wrap gap-4">
                    <Link href="/editeur">
                      <ShimmerButton
                        background="linear-gradient(135deg, #12c4a8 0%, #0b7a6a 100%)"
                        shimmerColor="#ffffff"
                        borderRadius="12px"
                        className="h-11 px-6"
                      >
                        <span className="flex items-center gap-2 font-bold text-mq-ink text-sm">
                          Tester cet outil
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </ShimmerButton>
                    </Link>
                    <Link
                      href="/solutions"
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                    >
                      Découvrir les solutions
                    </Link>
                  </div>
                </div>

                {/* Right Column: Visual Preview */}
                <div className="lg:col-span-5">{currentTab.previewContent}</div>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
