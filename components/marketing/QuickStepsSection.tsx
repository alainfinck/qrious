'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
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
import { NumberTicker } from '@/components/ui/number-ticker'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { Link } from '@/src/i18n/routing'

type TabKey = 'design' | 'custom' | 'solutions' | 'analytics'

const TAB_META: {
  id: TabKey
  icon: React.ElementType
  accentFrom: string
  accentTo: string
}[] = [
  { id: 'design', icon: Palette, accentFrom: '#12c4a8', accentTo: '#3dbbff' },
  { id: 'custom', icon: Sliders, accentFrom: '#ff5c4d', accentTo: '#ffc53d' },
  { id: 'solutions', icon: Sparkles, accentFrom: '#3dbbff', accentTo: '#12c4a8' },
  { id: 'analytics', icon: BarChart3, accentFrom: '#ffc53d', accentTo: '#ff5c4d' },
]

function DesignPreview({
  previewLabel,
  previewHint,
}: {
  previewLabel: string
  previewHint: string
}) {
  return (
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
                  active ? (i % 2 === 0 ? 'bg-mq-signal' : 'bg-mq-sky') : 'bg-white/15'
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
          {previewLabel}
        </span>
        <p className="text-sm text-white/70 mt-1">{previewHint}</p>
      </div>
    </div>
  )
}

function CustomPreview({
  smartTitle,
  smartDesc,
  smartStatus,
  pdfTitle,
  pdfDesc,
  pdfStatus,
}: {
  smartTitle: string
  smartDesc: string
  smartStatus: string
  pdfTitle: string
  pdfDesc: string
  pdfStatus: string
}) {
  return (
    <div className="relative flex flex-col p-6 bg-slate-900/90 rounded-2xl border border-white/10">
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="h-8 w-8 rounded-lg bg-mq-coral/20 flex items-center justify-center text-mq-coral">
            <Smartphone className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">{smartTitle}</p>
            <p className="text-xs text-white/60">{smartDesc}</p>
          </div>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
            {smartStatus}
          </span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="h-8 w-8 rounded-lg bg-mq-sun/20 flex items-center justify-center text-mq-sun">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">{pdfTitle}</p>
            <p className="text-xs text-white/60">{pdfDesc}</p>
          </div>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-mq-sun/20 text-mq-sun font-medium">
            {pdfStatus}
          </span>
        </div>
      </div>
    </div>
  )
}

function SolutionsPreview({
  cards,
}: {
  cards: { title: string; sub: string; from: string; border: string }[]
}) {
  return (
    <div className="relative flex flex-col p-6 bg-slate-900/90 rounded-2xl border border-white/10">
      <div className="grid grid-cols-2 gap-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`p-3 rounded-xl bg-gradient-to-br ${card.from} to-slate-900 border ${card.border} text-center`}
          >
            <p className="text-xs font-bold text-white">{card.title}</p>
            <p className="text-[10px] text-white/60 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function AnalyticsPreview({ totalScans, growth }: { totalScans: string; growth: string }) {
  return (
    <div className="relative flex flex-col p-6 bg-slate-900/90 rounded-2xl border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-white/60 uppercase tracking-wider">{totalScans}</p>
          <p className="text-2xl font-bold text-white font-display">
            <NumberTicker value={12480} className="text-mq-signal" />
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <Eye className="h-3.5 w-3.5" />
          <span>{growth}</span>
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
  )
}

export function QuickStepsSection() {
  const t = useTranslations('QuickSteps')
  const [activeTabId, setActiveTabId] = useState<TabKey>('design')
  const currentMeta = TAB_META.find((tab) => tab.id === activeTabId) || TAB_META[0]
  const bullets = t.raw(`tabs.${currentMeta.id}.bullets`) as string[]

  const previewContent = (() => {
    switch (currentMeta.id) {
      case 'design':
        return (
          <DesignPreview
            previewLabel={t('tabs.design.previewLabel')}
            previewHint={t('tabs.design.previewHint')}
          />
        )
      case 'custom':
        return (
          <CustomPreview
            smartTitle={t('tabs.custom.smartTitle')}
            smartDesc={t('tabs.custom.smartDesc')}
            smartStatus={t('tabs.custom.smartStatus')}
            pdfTitle={t('tabs.custom.pdfTitle')}
            pdfDesc={t('tabs.custom.pdfDesc')}
            pdfStatus={t('tabs.custom.pdfStatus')}
          />
        )
      case 'solutions':
        return (
          <SolutionsPreview
            cards={[
              {
                title: t('tabs.solutions.cardChrd'),
                sub: t('tabs.solutions.cardChrdSub'),
                from: 'from-rose-900/40',
                border: 'border-rose-500/20',
              },
              {
                title: t('tabs.solutions.cardCorp'),
                sub: t('tabs.solutions.cardCorpSub'),
                from: 'from-indigo-900/40',
                border: 'border-indigo-500/20',
              },
              {
                title: t('tabs.solutions.cardRetail'),
                sub: t('tabs.solutions.cardRetailSub'),
                from: 'from-purple-900/40',
                border: 'border-purple-500/20',
              },
              {
                title: t('tabs.solutions.cardArt'),
                sub: t('tabs.solutions.cardArtSub'),
                from: 'from-amber-900/40',
                border: 'border-amber-500/20',
              },
            ]}
          />
        )
      case 'analytics':
        return (
          <AnalyticsPreview
            totalScans={t('tabs.analytics.totalScans')}
            growth={t('tabs.analytics.growth')}
          />
        )
    }
  })()

  return (
    <section className="relative overflow-hidden bg-mq-ink py-24 text-white sm:py-32">
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
              <span>{t('badge')}</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              {t('titleBefore')} <span className="mq-rainbow-text">{t('titleHighlight')}</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">{t('subtitle')}</p>
          </div>
        </BlurFade>

        <div className="mt-12 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 p-2 backdrop-blur-md">
            {TAB_META.map((tab) => {
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
                  <span>{t(`tabs.${tab.id}.label`)}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-12">
          <BlurFade key={currentMeta.id} delay={0.05} inView>
            <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent p-8 backdrop-blur-xl lg:p-12">
              <BorderBeam
                size={140}
                duration={10}
                colorFrom={currentMeta.accentFrom}
                colorTo={currentMeta.accentTo}
              />
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-lg bg-mq-signal/15 px-3 py-1 text-xs font-semibold text-mq-signal border border-mq-signal/30">
                    <currentMeta.icon className="h-4 w-4" />
                    <span>{t(`tabs.${currentMeta.id}.badge`)}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
                    {t(`tabs.${currentMeta.id}.title`)}
                  </h3>
                  <p className="text-base text-white/75 leading-relaxed">
                    {t(`tabs.${currentMeta.id}.description`)}
                  </p>
                  <ul className="space-y-3 pt-2">
                    {bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-white/90">
                        <CheckCircle2 className="h-5 w-5 text-mq-signal shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 flex flex-wrap gap-4">
                    <Link href="/newqr">
                      <ShimmerButton
                        background="linear-gradient(135deg, #12c4a8 0%, #0b7a6a 100%)"
                        shimmerColor="#ffffff"
                        borderRadius="12px"
                        className="h-11 px-6"
                      >
                        <span className="flex items-center gap-2 font-bold text-mq-ink text-sm">
                          {t('ctaTest')}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </ShimmerButton>
                    </Link>
                    <Link
                      href="/solutions"
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                    >
                      {t('ctaSolutions')}
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">{previewContent}</div>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
