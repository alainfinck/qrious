'use client'

import { Mail, Phone, ArrowRight, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { BrandMark } from '@/components/brand/BrandMark'
import { BrandWordmark } from '@/components/brand/BrandWordmark'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Link } from '@/src/i18n/routing'

export function MarketingFooter() {
  const t = useTranslations('Footer')

  return (
    <footer className="relative border-t border-white/15 bg-gradient-to-b from-mq-ink via-mq-ink to-black text-white overflow-hidden">
      {/* Decorative ambient background glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-mq-signal/10 blur-[120px] rounded-full"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        {/* Top Call To Action Banner */}
        <div className="mb-16 rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-md sm:p-10 lg:flex lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-mq-signal/15 px-3 py-1 text-xs font-semibold text-mq-signal border border-mq-signal/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t('ctaBadge')}</span>
            </div>
            <h3 className="text-2xl font-extrabold sm:text-3xl text-white font-display">
              {t('ctaTitle')}
            </h3>
            <p className="text-base text-white/70">
              {t('ctaDescription')}
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 lg:mt-0 shrink-0">
            <Link
              href="/editeur"
              className="inline-flex items-center gap-2 rounded-xl bg-mq-signal px-6 py-3.5 text-base font-bold text-mq-ink transition-all duration-200 hover:bg-mq-signal-deep hover:shadow-lg hover:shadow-mq-signal/20 active:scale-[0.98]"
            >
              <span>{t('ctaCreate')}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/30"
            >
              {t('ctaPricing')}
            </Link>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Identity & Description Column */}
          <div className="space-y-5 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 text-2xl font-extrabold tracking-tight text-white hover:opacity-90 transition-opacity">
              <BrandMark className="h-8 w-8 text-mq-coral" />
              <BrandWordmark />
            </Link>
            <p className="text-base leading-relaxed text-white/75 max-w-sm">
              {t('brandDescription')}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t('statusBadge')}</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {/* Column 1: Solutions */}
            <div>
              <h4 className="mb-4 text-base font-bold uppercase tracking-wider text-white">
                {t('colSolutions')}
              </h4>
              <ul className="space-y-3 text-base font-medium text-white/75">
                <li>
                  <Link href="/solutions/chrd" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    {t('linkChrd')}
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/corporate-event" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    {t('linkCorporate')}
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/ugc-retail" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    {t('linkUgc')}
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/field-service" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    {t('linkField')}
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/art" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    {t('linkArt')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Support */}
            <div>
              <h4 className="mb-4 text-base font-bold uppercase tracking-wider text-white">
                {t('colSupport')}
              </h4>
              <ul className="space-y-3 text-base font-medium text-white/75">
                <li>
                  <Link href="/demo" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    {t('linkDemo')}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    {t('linkContact')}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    {t('linkAbout')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Légal */}
            <div>
              <h4 className="mb-4 text-base font-bold uppercase tracking-wider text-white">
                {t('colLegal')}
              </h4>
              <ul className="space-y-3 text-base font-medium text-white/75">
                <li>
                  <Link href="/conditions" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    {t('linkCgu')}
                  </Link>
                </li>
                <li>
                  <Link href="/confidentialite" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    {t('linkPrivacy')}
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    {t('linkCookies')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: App */}
            <div>
              <h4 className="mb-4 text-base font-bold uppercase tracking-wider text-white">
                {t('colApp')}
              </h4>
              <ul className="space-y-3 text-base font-medium text-white/75">
                <li>
                  <Link href="/dashboard/login" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    {t('linkLogin')}
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    {t('linkDashboard')}
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/register" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    {t('linkRegister')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Direct Contact Links */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 text-sm sm:text-base text-white/70 sm:flex-row">
          <div className="flex items-center gap-4">
            <p>{t('copyright', { year: new Date().getFullYear() })}</p>
            <LanguageSwitcher variant="onDark" />
          </div>

          <div className="flex flex-wrap items-center gap-6 text-white/80">
            <a
              href="mailto:hello@qrious.fr"
              className="inline-flex items-center gap-2 hover:text-mq-signal transition-colors"
            >
              <Mail className="h-4 w-4 text-mq-coral" />
              <span>hello@qrious.fr</span>
            </a>
            <span className="hidden sm:inline text-white/30">•</span>
            <a
              href="tel:+33676380152"
              className="inline-flex items-center gap-2 hover:text-mq-signal transition-colors"
            >
              <Phone className="h-4 w-4 text-mq-coral" />
              <span>06 76 38 01 52</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
