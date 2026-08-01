'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/editeur', label: 'Éditeur' },
  { href: '/#fonctionnalites', label: 'Fonctionnalités' },
  { href: '/#metiers', label: 'Métiers' },
  { href: '/demo', label: 'Demo' },
  { href: '/contact', label: 'Contact' },
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

export function MarketingHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
        <div className="flex h-14 items-center justify-between rounded-2xl border border-white/10 bg-mq-ink/70 px-4 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-5">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-white"
          >
            <BrandMark className="h-7 w-7 text-mq-signal" />
            Qrious
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden text-white/70 hover:bg-white/10 hover:text-white sm:inline-flex"
            >
              <Link href="/dashboard/login">Connexion</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="rounded-xl bg-mq-signal font-semibold text-mq-ink hover:bg-mq-signal/90"
            >
              <Link href="/dashboard/register">Créer mon QR</Link>
            </Button>
            <button
              type="button"
              className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/80 hover:bg-white/10 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav
            className="mt-2 space-y-1 rounded-2xl border border-white/10 bg-mq-ink/95 p-3 backdrop-blur-xl md:hidden"
            aria-label="Navigation mobile"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-white/75 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/dashboard/login"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2.5 text-sm font-medium text-white/75 hover:bg-white/5 hover:text-white sm:hidden"
            >
              Connexion
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
