import Link from 'next/link'

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

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 bg-mq-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-bold">
              <BrandMark className="h-7 w-7 text-mq-coral" />
              QRious
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/45">
              QR codes dynamiques et landing pages adaptées à votre métier.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                Solutions
              </p>
              <ul className="space-y-2.5 text-sm text-white/60">
                <li>
                  <Link href="/editeur" className="transition-colors hover:text-mq-signal">
                    Éditeur QR
                  </Link>
                </li>
                <li>
                  <Link href="/galeries" className="transition-colors hover:text-mq-signal">
                    Pour les galeries
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="transition-colors hover:text-mq-signal">
                    Fonctionnalités
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="transition-colors hover:text-mq-signal">
                    Tarifs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                Support
              </p>
              <ul className="space-y-2.5 text-sm text-white/60">
                <li>
                  <Link href="/demo" className="transition-colors hover:text-mq-signal">
                    Demo
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition-colors hover:text-mq-signal">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="transition-colors hover:text-mq-signal">
                    À propos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                Légal
              </p>
              <ul className="space-y-2.5 text-sm text-white/60">
                <li>
                  <Link href="/conditions" className="transition-colors hover:text-mq-signal">
                    CGU
                  </Link>
                </li>
                <li>
                  <Link href="/confidentialite" className="transition-colors hover:text-mq-signal">
                    Confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="transition-colors hover:text-mq-signal">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                App
              </p>
              <ul className="space-y-2.5 text-sm text-white/60">
                <li>
                  <Link href="/dashboard" className="transition-colors hover:text-mq-signal">
                    Tableau de bord
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/register" className="transition-colors hover:text-mq-signal">
                    Créer un compte
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/30 sm:flex-row">
          <p>© {new Date().getFullYear()} QRious. Tous droits réservés.</p>
          <p className="text-white/25">hello@qrious.fr · 06 76 38 01 52</p>
        </div>
      </div>
    </footer>
  )
}
