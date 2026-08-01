import Link from 'next/link'
import { Mail, Phone, ArrowRight, Sparkles } from 'lucide-react'

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
              <span>Passez à la vitesse supérieure</span>
            </div>
            <h3 className="text-2xl font-extrabold sm:text-3xl text-white font-display">
              Prêt à dynamiser votre communication ?
            </h3>
            <p className="text-base text-white/70">
              Créez des QR codes intelligents et des pages d'atterrissage optimisées pour votre activité en quelques secondes.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 lg:mt-0 shrink-0">
            <Link
              href="/editeur"
              className="inline-flex items-center gap-2 rounded-xl bg-mq-signal px-6 py-3.5 text-base font-bold text-mq-ink transition-all duration-200 hover:bg-mq-signal-deep hover:shadow-lg hover:shadow-mq-signal/20 active:scale-[0.98]"
            >
              <span>Créer un QR code</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/30"
            >
              Voir les tarifs
            </Link>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Identity & Description Column */}
          <div className="space-y-5 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 font-display text-2xl font-extrabold tracking-tight text-white hover:opacity-90 transition-opacity">
              <BrandMark className="h-8 w-8 text-mq-coral" />
              <span>QRious</span>
            </Link>
            <p className="text-base leading-relaxed text-white/75 max-w-sm">
              Solution complète de QR codes dynamiques et landing pages métiers sur-mesure pour booster vos conversions et votre expérience client.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Services 100% opérationnels · Hebergé en France</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {/* Column 1: Solutions */}
            <div>
              <h4 className="mb-4 text-base font-bold uppercase tracking-wider text-white">
                Solutions Métier
              </h4>
              <ul className="space-y-3 text-base font-medium text-white/75">
                <li>
                  <Link href="/solutions/chrd" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    Hôtellerie & Resto
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/corporate-event" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    Événementiel B2B
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/ugc-retail" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    Retail & Concours UGC
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/field-service" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    Field Service & Maint.
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/art" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    Art & Galeries
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Support */}
            <div>
              <h4 className="mb-4 text-base font-bold uppercase tracking-wider text-white">
                Support
              </h4>
              <ul className="space-y-3 text-base font-medium text-white/75">
                <li>
                  <Link href="/demo" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    Démo interactive
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    À propos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Légal */}
            <div>
              <h4 className="mb-4 text-base font-bold uppercase tracking-wider text-white">
                Légal
              </h4>
              <ul className="space-y-3 text-base font-medium text-white/75">
                <li>
                  <Link href="/conditions" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    CGU
                  </Link>
                </li>
                <li>
                  <Link href="/confidentialite" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    Confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: App */}
            <div>
              <h4 className="mb-4 text-base font-bold uppercase tracking-wider text-white">
                Espace App
              </h4>
              <ul className="space-y-3 text-base font-medium text-white/75">
                <li>
                  <Link href="/dashboard/login" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    Se connecter
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    Tableau de bord
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/register" className="transition-all duration-150 hover:text-mq-signal hover:translate-x-0.5 inline-block">
                    Créer un compte
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Direct Contact Links */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 text-sm sm:text-base text-white/70 sm:flex-row">
          <p>© {new Date().getFullYear()} QRious. Tous droits réservés.</p>

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

