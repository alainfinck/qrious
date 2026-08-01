import Link from 'next/link'
import { QrCode } from 'lucide-react'

import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/features', label: 'Fonctionnalités' },
  { href: '/#pricing', label: 'Tarifs' },
  { href: '/demo', label: 'Demo' },
  { href: '/galeries', label: 'Galeries' },
  { href: '/about', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
]

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
            <QrCode className="h-5 w-5" />
          </span>
          Qrious
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/dashboard">Connexion</Link>
          </Button>
          <Button asChild size="sm" className="bg-slate-900 hover:bg-slate-800">
            <Link href="/dashboard">Créer mon QR code</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
