'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Contact,
  LayoutGrid,
  Menu,
  Palette,
  QrCode,
  Sparkles,
  Wand2,
  X,
  Link2,
  User,
  Wifi,
  Utensils,
  Calendar,
  ShoppingBag,
  Wrench,
  Compass,
  Star,
  Box,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { BrandMark } from '@/components/brand/BrandMark'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Link } from '@/src/i18n/routing'
import { motion, useReducedMotion } from 'motion/react'

function HeaderBrand() {
  const reduce = useReducedMotion()

  return (
    <Link
      href="/"
      className="group flex items-center gap-3 font-display text-xl font-bold tracking-tight text-white sm:text-2xl"
    >
      <motion.span
        className="inline-flex text-mq-coral"
        initial={reduce ? false : { opacity: 0, scale: 0.5, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 18, delay: 0.05 }}
        whileHover={reduce ? undefined : { rotate: [0, -8, 8, -4, 0], scale: 1.08 }}
      >
        <BrandMark className="h-8 w-8 transition-colors group-hover:text-mq-signal sm:h-9 sm:w-9" />
      </motion.span>

      <span className="inline-flex items-baseline leading-none" aria-label="QRious">
        <motion.span
          className="font-qr inline-block translate-y-[0.04em] text-[1.08em] font-bold leading-none tracking-[0.04em] transition-colors group-hover:text-mq-signal"
          initial={reduce ? false : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: [0, 0.55, 0.55, 1] }}
          transition={{
            delay: 0.12,
            duration: 0.42,
            times: [0, 0.35, 0.55, 1],
            ease: 'linear',
          }}
          aria-hidden
        >
          QR
        </motion.span>
        <motion.span
          className="font-display inline-block font-bold leading-none tracking-tight"
          initial={reduce ? false : { opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.32, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          ious
        </motion.span>
      </span>
    </Link>
  )
}

export interface MenuItem {
  href: string
  label: string
  description: string
  icon: React.ElementType
  badge?: string
  badgeTone?: string
}

interface NavDropdownProps {
  label: string
  items: MenuItem[]
  cols?: 1 | 2 | 3
  widthClass?: string
  sectionHeader?: string
  footer?: {
    text: string
    linkText: string
    href: string
  }
}

function NavDropdown({
  label,
  items,
  cols = 2,
  widthClass,
  sectionHeader,
  footer,
}: NavDropdownProps) {
  const t = useTranslations('Header')
  const [open, setOpen] = useState(false)
  const [panelPos, setPanelPos] = useState<{ top: number; left: number } | null>(
    null,
  )
  const ref = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const scheduleClose = () => {
    clearClose()
    closeTimer.current = setTimeout(() => setOpen(false), 150)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        ref.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return
      }
      setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
      clearClose()
    }
  }, [])

  useEffect(() => {
    if (!open) {
      setPanelPos(null)
      return
    }

    const updatePosition = () => {
      const bar = ref.current?.closest('[data-header-bar]') as HTMLElement | null
      const anchor = bar ?? ref.current
      if (!anchor) return
      const rect = anchor.getBoundingClientRect()
      setPanelPos({
        top: rect.bottom + 12,
        left: rect.left + rect.width / 2,
      })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [open])

  const gridColsClass =
    cols === 3
      ? 'grid-cols-3'
      : cols === 2
      ? 'grid-cols-2'
      : 'grid-cols-1'

  const defaultWidth =
    cols === 3
      ? 'w-[min(920px,calc(100vw-2rem))]'
      : cols === 2
      ? 'w-[min(760px,calc(100vw-2rem))]'
      : 'w-[min(360px,calc(100vw-2rem))]'

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        clearClose()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={cn(
          'inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-base font-medium transition-all duration-150',
          open
            ? 'bg-white/15 text-white shadow-inner'
            : 'text-white/90 hover:bg-white/10 hover:text-white',
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200 text-white/70', open && 'rotate-180 text-white')}
        />
      </button>

      {open && panelPos && (
        <div
          ref={panelRef}
          role="menu"
          style={{ top: panelPos.top, left: panelPos.left }}
          className={cn(
            'fixed z-50 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/15 bg-mq-ink/95 backdrop-blur-2xl shadow-[0_24px_60px_-16px_rgba(0,0,0,0.9)] transition-all animate-in fade-in-0 zoom-in-95 duration-150',
            widthClass || defaultWidth,
          )}
          onMouseEnter={clearClose}
          onMouseLeave={scheduleClose}
        >
          {/* Top triangle pointer */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-t border-l border-white/20 bg-mq-ink" />

          {sectionHeader && (
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 bg-white/[0.02]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-mq-signal/90">
                {sectionHeader}
              </span>
              <span className="text-[10px] uppercase font-semibold text-white/40 tracking-wider">
                {t('optionsAvailable', { count: items.length })}
              </span>
            </div>
          )}

          <div className={cn('grid gap-2 p-3', gridColsClass)}>
            {items.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                role="menuitem"
                className="group relative flex items-start gap-3.5 rounded-xl border border-transparent p-3 transition-all duration-150 hover:border-white/15 hover:bg-white/10 hover:shadow-md"
                onClick={() => setOpen(false)}
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-mq-signal transition-all duration-200 group-hover:scale-105 group-hover:border-mq-coral/40 group-hover:bg-gradient-to-br group-hover:from-mq-coral group-hover:to-mq-sun group-hover:text-mq-ink group-hover:shadow-sm">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-1">
                    <span className="block font-display text-[15px] font-semibold text-white/95 transition-colors group-hover:text-white">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className={cn(
                          'inline-flex items-center rounded-md border px-1.5 py-0.2 text-[10px] font-bold tracking-wide uppercase',
                          item.badgeTone || 'bg-mq-signal/20 text-mq-signal border-mq-signal/30',
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-white/50 transition-colors group-hover:text-white/80 line-clamp-2">
                    {item.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          {footer && (
            <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-white/70">
              <span>{footer.text}</span>
              <Link
                href={footer.href}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 font-semibold text-mq-signal hover:text-white transition-colors group"
              >
                <span>{footer.linkText}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function MarketingHeader() {
  const t = useTranslations('Header')
  const [open, setOpen] = useState(false)
  const [mobileProduct, setMobileProduct] = useState(false)
  const [mobileMetiers, setMobileMetiers] = useState(false)

  const productItems: MenuItem[] = [
    {
      href: '/generateur',
      label: t('productItems.universal.label'),
      description: t('productItems.universal.description'),
      icon: QrCode,
      badge: t('productItems.universal.badge'),
      badgeTone: 'bg-mq-signal/20 text-mq-signal border-mq-signal/30',
    },
    {
      href: '/generateur/url',
      label: t('productItems.url.label'),
      description: t('productItems.url.description'),
      icon: Link2,
    },
    {
      href: '/generateur/vcard',
      label: t('productItems.vcard.label'),
      description: t('productItems.vcard.description'),
      icon: User,
    },
    {
      href: '/generateur/wifi',
      label: t('productItems.wifi.label'),
      description: t('productItems.wifi.description'),
      icon: Wifi,
    },
    {
      href: '/editeur',
      label: t('productItems.editor.label'),
      description: t('productItems.editor.description'),
      icon: Wand2,
      badge: t('productItems.editor.badge'),
      badgeTone: 'bg-mq-sun/20 text-mq-sun border-mq-sun/30',
    },
    {
      href: '/#fonctionnalites',
      label: t('productItems.dynamic.label'),
      description: t('productItems.dynamic.description'),
      icon: LayoutGrid,
      badge: t('productItems.dynamic.badge'),
      badgeTone: 'bg-mq-coral/20 text-mq-coral border-mq-coral/30',
    },
    {
      href: '/demo',
      label: t('productItems.demo.label'),
      description: t('productItems.demo.description'),
      icon: Sparkles,
      badge: t('productItems.demo.badge'),
      badgeTone: 'bg-mq-sky/20 text-mq-sky border-mq-sky/30',
    },
  ]

  const metierItems: MenuItem[] = [
    {
      href: '/solutions/chrd',
      label: t('metierItems.chrd.label'),
      description: t('metierItems.chrd.description'),
      icon: Utensils,
      badge: t('metierItems.chrd.badge'),
      badgeTone: 'bg-mq-signal/20 text-mq-signal border-mq-signal/30',
    },
    {
      href: '/solutions/corporate-event',
      label: t('metierItems.corporate.label'),
      description: t('metierItems.corporate.description'),
      icon: Calendar,
      badge: t('metierItems.corporate.badge'),
      badgeTone: 'bg-mq-sky/20 text-mq-sky border-mq-sky/30',
    },
    {
      href: '/solutions/ugc-retail',
      label: t('metierItems.ugc.label'),
      description: t('metierItems.ugc.description'),
      icon: ShoppingBag,
    },
    {
      href: '/solutions/field-service',
      label: t('metierItems.field.label'),
      description: t('metierItems.field.description'),
      icon: Wrench,
    },
    {
      href: '/solutions/art',
      label: t('metierItems.art.label'),
      description: t('metierItems.art.description'),
      icon: Palette,
    },
    {
      href: '/solutions/immo',
      label: t('metierItems.immo.label'),
      description: t('metierItems.immo.description'),
      icon: Building2,
      badge: t('metierItems.immo.badge'),
      badgeTone: 'bg-mq-sun/20 text-mq-sun border-mq-sun/30',
    },
    {
      href: '/solutions/vcard',
      label: t('metierItems.vcard.label'),
      description: t('metierItems.vcard.description'),
      icon: Contact,
      badge: t('metierItems.vcard.badge'),
      badgeTone: 'bg-mq-signal/20 text-mq-signal border-mq-signal/30',
    },
    {
      href: '/solutions/tourism',
      label: t('metierItems.tourism.label'),
      description: t('metierItems.tourism.description'),
      icon: Compass,
    },
    {
      href: '/solutions/feedback',
      label: t('metierItems.feedback.label'),
      description: t('metierItems.feedback.description'),
      icon: Star,
      badge: t('metierItems.feedback.badge'),
      badgeTone: 'bg-mq-coral/20 text-mq-coral border-mq-coral/30',
    },
    {
      href: '/solutions/product',
      label: t('metierItems.product.label'),
      description: t('metierItems.product.description'),
      icon: Box,
    },
  ]

  const simpleLinks = [
    { href: '/pricing', label: t('pricing'), tip: t('pricingTip') },
    { href: '/about', label: t('about'), tip: t('aboutTip') },
    { href: '/contact', label: t('contact'), tip: t('contactTip') },
  ]

  return (
    <TooltipProvider delayDuration={200}>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
          <div
            data-header-bar
            className="flex h-16 items-center justify-between rounded-2xl border border-white/15 bg-mq-ink/95 px-4 text-white shadow-[0_8px_32px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:h-[4.25rem] sm:px-6"
          >
            <HeaderBrand />

            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label={t('navAriaLabel')}
            >
              <NavDropdown
                label={t('product')}
                items={productItems}
                cols={2}
                widthClass="w-[min(760px,calc(100vw-2rem))]"
                sectionHeader={t('productSectionHeader')}
                footer={{
                  text: t('productFooterText'),
                  linkText: t('productFooterLink'),
                  href: '/editeur',
                }}
              />
              <NavDropdown
                label={t('metiers')}
                items={metierItems}
                cols={3}
                widthClass="w-[min(920px,calc(100vw-2rem))]"
                sectionHeader={t('metiersSectionHeader')}
                footer={{
                  text: t('metiersFooterText'),
                  linkText: t('metiersFooterLink'),
                  href: '/contact',
                }}
              />
              {simpleLinks.map((link) => (
                <Tooltip key={link.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={link.href}
                      className="rounded-xl px-3.5 py-2 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    sideOffset={10}
                    className="border-white/10 bg-mq-ink text-white"
                  >
                    {link.tip}
                  </TooltipContent>
                </Tooltip>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher variant="onDark" className="hidden lg:inline-flex" />
              <Link
                href="/dashboard/login"
                className="inline-flex h-11 items-center justify-center rounded-xl px-3 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:px-4 sm:text-base"
              >
                {t('login')}
              </Link>
              <Button
                asChild
                className="h-11 rounded-xl bg-gradient-to-r from-mq-coral to-mq-sun px-5 text-base font-semibold text-mq-ink hover:opacity-90"
              >
                <Link href="/editeur">{t('createQr')}</Link>
              </Button>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white/85 hover:bg-white/10 lg:hidden"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? t('closeMenu') : t('openMenu')}
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {open && (
            <nav
              className="mt-2 max-h-[min(75vh,600px)] space-y-1.5 overflow-y-auto rounded-2xl border border-white/15 bg-mq-ink p-3 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.85)] lg:hidden"
              aria-label={t('navMobileAriaLabel')}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-white/90 hover:bg-white/5"
                onClick={() => setMobileProduct((v) => !v)}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-mq-signal" />
                  {t('product')}
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    mobileProduct && 'rotate-180',
                  )}
                />
              </button>
              {mobileProduct && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2 pr-1 pb-2">
                  {productItems.map((item) => (
                    <Link
                      key={item.href + item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-2.5 transition-colors hover:bg-white/10"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-mq-signal/15 text-mq-signal">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="block text-[13px] font-semibold text-white">{item.label}</span>
                          {item.badge && (
                            <span className="text-[9px] font-bold uppercase text-mq-signal bg-mq-signal/15 px-1.5 py-0.5 rounded">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <span className="block text-[11px] text-white/50 line-clamp-1">{item.description}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-white/90 hover:bg-white/5"
                onClick={() => setMobileMetiers((v) => !v)}
              >
                <span className="flex items-center gap-2">
                  <Building2 className="h-4.5 w-4.5 text-mq-coral" />
                  {t('metiersMobile')}
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    mobileMetiers && 'rotate-180',
                  )}
                />
              </button>
              {mobileMetiers && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2 pr-1 pb-2">
                  {metierItems.map((item) => (
                    <Link
                      key={item.href + item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-2.5 transition-colors hover:bg-white/10"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-mq-coral/15 text-mq-coral">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="block text-[13px] font-semibold text-white">{item.label}</span>
                          {item.badge && (
                            <span className="text-[9px] font-bold uppercase text-mq-coral bg-mq-coral/15 px-1.5 py-0.5 rounded">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <span className="block text-[11px] text-white/50 line-clamp-1">{item.description}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {simpleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <div className="px-1 py-1">
                <LanguageSwitcher variant="onDark" className="w-full justify-start" />
              </div>

              <Link
                href="/dashboard/login"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-base font-medium text-white/80 hover:bg-white/5 hover:text-white sm:hidden"
              >
                {t('login')}
              </Link>
            </nav>
          )}
        </div>
      </header>
    </TooltipProvider>
  )
}
