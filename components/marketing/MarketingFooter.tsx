import Link from 'next/link'
import { QrCode } from 'lucide-react'

export function MarketingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                <QrCode className="h-4 w-4" />
              </span>
              Qrious
            </Link>
            <p className="max-w-xs text-sm text-slate-500">
              QR codes dynamiques et landing pages adaptées à votre métier. Un lien, des possibilités
              infinies.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Solutions
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/editeur" className="hover:text-slate-900">
                    Éditeur QR gratuit
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="hover:text-slate-900">
                    QR Codes artistiques
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="hover:text-slate-900">
                    Gestion d'œuvres
                  </Link>
                </li>
                <li>
                  <Link href="/galeries" className="hover:text-slate-900">
                    Pour les galeries
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="hover:text-slate-900">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Support
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/demo" className="hover:text-slate-900">
                    Demo
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="hover:text-slate-900">
                    Tarifs
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-slate-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Entreprise
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/about" className="hover:text-slate-900">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-slate-900">
                    Partenaires
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-slate-900">
                    Tableau de bord
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Qrious. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
