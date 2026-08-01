'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
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

const productItems = [
  {
    href: '/editeur',
    label: 'Éditeur QR',
    description: 'Créez et personnalisez un QR gratuitement',
    icon: QrCode,
  },
  {
    href: '/#fonctionnalites',
    label: 'Fonctionnalités',
    description: 'Tout pour des QR dynamiques pro',
    icon: LayoutGrid,
  },
  {
    href: '/demo',
    label: 'Demo',
    description: 'Voyez QRious en action',
    icon: Sparkles,
  },
  {
    href: '/features',
    label: 'Suite complète',
    description: 'Détail de tous les outils',
    icon: Wand2,
  },
]

const metierItems = [
  {
    href: '/solutions/chrd',
    label: 'Hôtellerie & Resto (CHRD)',
    description: 'Menu PDF, Wi-Fi & Carte postale',
    icon: Utensils,
  },
  {
    href: '/solutions/corporate-event',
    label: 'Événementiel Corporate',
    description: 'Live Wall photo & Séminaires B2B',
    icon: Calendar,
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
  },
  {
    href: '/solutions/vcard',
    label: 'Carte de visite (vCard)',
    description: 'vCard digitale en un scan',
    icon: Contact,
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

function NavDropdown({
  label,
  items,
}: {
  label: string
  items: typeof productItems
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const scheduleClose = () => {
    clearClose()
    closeTimer.current = setTimeout(() => setOpen(false), 120)
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
          'inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-base font-medium transition-colors',
          open ? 'bg-white/10 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white',
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 top-full z-50 mt-3 w-[340px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/15 bg-mq-ink p-2 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.85)]"
          onMouseEnter={clearClose}
          onMouseLeave={scheduleClose}
        >
          {items.map((item) => (
            <a
              key={item.href + item.label}
              href={item.href}
              role="menuitem"
              className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-all duration-150 hover:bg-white/15 hover:translate-x-0.5"
              onClick={() => setOpen(false)}
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mq-signal/15 text-mq-signal transition-colors duration-150 group-hover:bg-mq-coral group-hover:text-mq-ink">
                <item.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[15px] font-semibold text-white/90 transition-colors group-hover:text-white">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-sm leading-snug text-white/45 transition-colors group-hover:text-white/70">
                  {item.description}
                </span>
              </span>
            </a>
          ))}
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
              <NavDropdown label="Produit" items={productItems} />
              <NavDropdown label="Métiers" items={metierItems} />
              {simpleLinks.map((link) => (
                <Tooltip key={link.href}>
                  <TooltipTrigger asChild>
                    <a
                      href={link.href}
                      className="rounded-xl px-3 py-2 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
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
              className="mt-2 max-h-[min(70vh,560px)] space-y-1 overflow-y-auto rounded-2xl border border-white/15 bg-mq-ink p-3 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.85)] lg:hidden"
              aria-label="Navigation mobile"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-white/80 hover:bg-white/5"
                onClick={() => setMobileProduct((v) => !v)}
              >
                Produit
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    mobileProduct && 'rotate-180',
                  )}
                />
              </button>
              {mobileProduct &&
                productItems.map((item) => (
                  <a
                    key={item.href + item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="ml-2 block rounded-xl border-l-2 border-mq-signal/40 px-3 py-2.5"
                  >
                    <span className="block text-[15px] font-semibold text-white">{item.label}</span>
                    <span className="block text-sm text-white/45">{item.description}</span>
                  </a>
                ))}

              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-white/80 hover:bg-white/5"
                onClick={() => setMobileMetiers((v) => !v)}
              >
                Métiers
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    mobileMetiers && 'rotate-180',
                  )}
                />
              </button>
              {mobileMetiers &&
                metierItems.map((item) => (
                  <a
                    key={item.href + item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="ml-2 block rounded-xl border-l-2 border-mq-coral/40 px-3 py-2.5"
                  >
                    <span className="block text-[15px] font-semibold text-white">{item.label}</span>
                    <span className="block text-sm text-white/45">{item.description}</span>
                  </a>
                ))}

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
