'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
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
  Utensils,
  Calendar,
  ShoppingBag,
  Wrench,
  Compass,
  Star,
  Box,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export interface MenuItem {
  href: string
  label: string
  description: string
  icon: React.ElementType
  badge?: string
  badgeTone?: string
}

const productItems: MenuItem[] = [
  {
    href: '/generateur',
    label: 'Générateur Universel',
    description: 'Créez vos QR codes (Wi-Fi, vCard, PDF, App...)',
    icon: QrCode,
    badge: 'Essentiel',
    badgeTone: 'bg-mq-signal/20 text-mq-signal border-mq-signal/30',
  },
  {
    href: '/editeur',
    label: 'Éditeur & Design Pro',
    description: 'Customisation avancée, yeux, couleurs & logos',
    icon: Wand2,
    badge: 'Populaire',
    badgeTone: 'bg-mq-sun/20 text-mq-sun border-mq-sun/30',
  },
  {
    href: '/#fonctionnalites',
    label: 'QR Dynamiques',
    description: 'Modifiez la destination sans réimprimer',
    icon: LayoutGrid,
    badge: 'Pro',
    badgeTone: 'bg-mq-coral/20 text-mq-coral border-mq-coral/30',
  },
  {
    href: '/demo',
    label: 'Démo Interactive',
    description: 'Testez la solution QRious en temps réel',
    icon: Sparkles,
    badge: 'Gratuit',
    badgeTone: 'bg-mq-sky/20 text-mq-sky border-mq-sky/30',
  },
]

const metierItems: MenuItem[] = [
  {
    href: '/solutions/chrd',
    label: 'Hôtellerie & Resto (CHRD)',
    description: 'Menu PDF, Wi-Fi & Carte interactive',
    icon: Utensils,
    badge: 'Top Choix',
    badgeTone: 'bg-mq-signal/20 text-mq-signal border-mq-signal/30',
  },
  {
    href: '/solutions/corporate-event',
    label: 'Événementiel Corporate',
    description: 'Live Wall photo & Séminaires B2B',
    icon: Calendar,
    badge: 'B2B',
    badgeTone: 'bg-mq-sky/20 text-mq-sky border-mq-sky/30',
  },
  {
    href: '/solutions/ugc-retail',
    label: 'Retail & Concours UGC',
    description: 'Photos produit & Codes promo',
    icon: ShoppingBag,
  },
  {
    href: '/solutions/field-service',
    label: 'Field Service & Maintenance',
    description: 'Gestion d’équipements & astreinte',
    icon: Wrench,
  },
  {
    href: '/solutions/art',
    label: 'Art & Galeries',
    description: 'Landings œuvres et expositions',
    icon: Palette,
  },
  {
    href: '/solutions/immo',
    label: 'Immobilier & Gîtes',
    description: 'Biens, prix, DPE et réservation',
    icon: Building2,
    badge: 'Populaire',
    badgeTone: 'bg-mq-sun/20 text-mq-sun border-mq-sun/30',
  },
  {
    href: '/solutions/vcard',
    label: 'Carte de visite (vCard)',
    description: 'vCard digitale en un scan',
    icon: Contact,
    badge: 'Essentiel',
    badgeTone: 'bg-mq-signal/20 text-mq-signal border-mq-signal/30',
  },
  {
    href: '/solutions/tourism',
    label: 'Tourisme & Musées',
    description: 'Audio-guides et lieux culturels',
    icon: Compass,
  },
  {
    href: '/solutions/feedback',
    label: 'Avis & E-Réputation',
    description: 'Collecte Google Reviews & privé',
    icon: Star,
    badge: 'Nouveau',
    badgeTone: 'bg-mq-coral/20 text-mq-coral border-mq-coral/30',
  },
  {
    href: '/solutions/product',
    label: 'Manuel Produit',
    description: 'Guides vidéo & dépannage',
    icon: Box,
  },
]

const simpleLinks = [
  { href: '/pricing', label: 'Tarifs', tip: 'Plans et tarification' },
  { href: '/about', label: 'À propos', tip: 'Notre histoire et mission' },
  { href: '/contact', label: 'Contact', tip: 'Écrivez-nous' },
]

function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2.2" />
      <rect x="5" y="5" width="6" height="6" fill="currentColor" />
      <rect x="18" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2.2" />
      <rect x="21" y="5" width="6" height="6" fill="currentColor" />
      <rect x="2" y="18" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2.2" />
      <rect x="5" y="21" width="6" height="6" fill="currentColor" />
      <rect x="18" y="18" width="5" height="5" fill="currentColor" />
      <rect x="25" y="18" width="5" height="5" fill="currentColor" />
      <rect x="18" y="25" width="5" height="5" fill="currentColor" />
      <rect x="24" y="24" width="6" height="6" fill="currentColor" />
    </svg>
  )
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
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
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
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
      clearClose()
    }
  }, [])

  const gridColsClass =
    cols === 3
      ? 'grid-cols-3'
      : cols === 2
      ? 'grid-cols-2'
      : 'grid-cols-1'

  const defaultWidth =
    cols === 3
      ? 'w-[740px]'
      : cols === 2
      ? 'w-[620px]'
      : 'w-[340px]'

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

      {open && (
        <div
          role="menu"
          className={cn(
            'absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/15 bg-mq-ink/95 backdrop-blur-2xl shadow-[0_24px_60px_-16px_rgba(0,0,0,0.9)] transition-all animate-in fade-in-0 zoom-in-95 duration-150',
            widthClass || defaultWidth,
          )}
          onMouseEnter={clearClose}
          onMouseLeave={scheduleClose}
        >
          {/* Top triangle pointer */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-t border-l border-white/20 bg-mq-ink" />

          {sectionHeader && (
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 bg-white/[0.02]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-mq-signal/90">
                {sectionHeader}
              </span>
              <span className="text-[10px] uppercase font-semibold text-white/40 tracking-wider">
                {items.length} options disponibles
              </span>
            </div>
          )}

          <div className={cn('grid gap-1.5 p-2.5', gridColsClass)}>
            {items.map((item) => (
              <a
                key={item.href + item.label}
                href={item.href}
                role="menuitem"
                className="group relative flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-all duration-150 hover:border-white/15 hover:bg-white/10 hover:shadow-md"
                onClick={() => setOpen(false)}
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-mq-signal transition-all duration-200 group-hover:scale-105 group-hover:border-mq-coral/40 group-hover:bg-gradient-to-br group-hover:from-mq-coral group-hover:to-mq-sun group-hover:text-mq-ink group-hover:shadow-sm">
                  <item.icon className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-1">
                    <span className="block font-display text-[14px] font-semibold text-white/95 transition-colors group-hover:text-white">
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
                  <span className="mt-0.5 block text-xs leading-snug text-white/50 transition-colors group-hover:text-white/80 line-clamp-2">
                    {item.description}
                  </span>
                </span>
              </a>
            ))}
          </div>

          {footer && (
            <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-white/70">
              <span>{footer.text}</span>
              <a
                href={footer.href}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 font-semibold text-mq-signal hover:text-white transition-colors group"
              >
                <span>{footer.linkText}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function MarketingHeader() {
  const [open, setOpen] = useState(false)
  const [mobileProduct, setMobileProduct] = useState(false)
  const [mobileMetiers, setMobileMetiers] = useState(false)

  return (
    <TooltipProvider delayDuration={200}>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
          <div className="flex h-16 items-center justify-between rounded-2xl border border-white/15 bg-mq-ink/95 px-4 text-white shadow-[0_8px_32px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:h-[4.25rem] sm:px-6">
            <Link
              href="/"
              className="flex items-center gap-3 font-display text-xl font-bold tracking-tight text-white sm:text-2xl"
            >
              <BrandMark className="h-8 w-8 text-mq-coral sm:h-9 sm:w-9" />
              QRious
            </Link>

            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label="Navigation principale"
            >
              <NavDropdown
                label="Produit"
                items={productItems}
                cols={2}
                widthClass="w-[580px]"
                sectionHeader="Suite & Outils QRious"
                footer={{
                  text: 'Besoin de personnaliser votre design ?',
                  linkText: "Ouvrir l'éditeur complet",
                  href: '/editeur',
                }}
              />
              <NavDropdown
                label="Métiers"
                items={metierItems}
                cols={2}
                widthClass="w-[660px]"
                sectionHeader="Solutions par Secteur"
                footer={{
                  text: 'Une demande sur-mesure pour votre entreprise ?',
                  linkText: "Contacter l'équipe",
                  href: '/contact',
                }}
              />
              {simpleLinks.map((link) => (
                <Tooltip key={link.href}>
                  <TooltipTrigger asChild>
                    <a
                      href={link.href}
                      className="rounded-xl px-3.5 py-2 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {link.label}
                    </a>
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
              <Link
                href="/dashboard/login"
                className="inline-flex h-11 items-center justify-center rounded-xl px-3 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:px-4 sm:text-base"
              >
                Connexion
              </Link>
              <Button
                asChild
                className="h-11 rounded-xl bg-gradient-to-r from-mq-coral to-mq-sun px-5 text-base font-semibold text-mq-ink hover:opacity-90"
              >
                <Link href="/editeur">Créer mon QR</Link>
              </Button>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white/85 hover:bg-white/10 lg:hidden"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {open && (
            <nav
              className="mt-2 max-h-[min(75vh,600px)] space-y-1.5 overflow-y-auto rounded-2xl border border-white/15 bg-mq-ink p-3 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.85)] lg:hidden"
              aria-label="Navigation mobile"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-white/90 hover:bg-white/5"
                onClick={() => setMobileProduct((v) => !v)}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-mq-signal" />
                  Produit
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
                    <a
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
                    </a>
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
                  Métiers & Solutions
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
                    <a
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
                    </a>
                  ))}
                </div>
              )}

              {simpleLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}

              <Link
                href="/dashboard/login"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-base font-medium text-white/80 hover:bg-white/5 hover:text-white sm:hidden"
              >
                Connexion
              </Link>
            </nav>
          )}
        </div>
      </header>
    </TooltipProvider>
  )
}



