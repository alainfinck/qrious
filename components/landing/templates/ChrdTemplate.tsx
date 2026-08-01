'use client'

import { useState } from 'react'
import { Utensils, Wifi, Star, Gift, Check, FileText } from 'lucide-react'
import { resolveMediaUrl } from '@/components/landing/utils'
import type { LandingPageTemplateProps } from '@/types/landing-page'

export function ChrdTemplate({ pageData }: LandingPageTemplateProps) {
  const { chrdData, theme } = pageData
  const logoUrl = resolveMediaUrl(theme?.logo)
  const [copiedWifi, setCopiedWifi] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  if (!chrdData) {
    return (
      <div className="flex h-64 items-center justify-center p-6 text-center text-slate-500">
        Aucune donnée CHRD configurée.
      </div>
    )
  }

  const copyWifiPassword = () => {
    if (chrdData.wifiPassword) {
      navigator.clipboard.writeText(chrdData.wifiPassword)
      setCopiedWifi(true)
      setTimeout(() => setCopiedWifi(false), 2000)
    }
  }

  const copyPostcardCode = () => {
    if (chrdData.postcardCode) {
      navigator.clipboard.writeText(chrdData.postcardCode)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 pb-12 font-sans text-slate-100">
      {/* ── Header ── */}
      <div
        className="relative overflow-hidden bg-gradient-to-b from-rose-950 via-slate-900 to-slate-900 pb-8 pt-8 text-center text-white"
        style={{ borderBottom: '3px solid var(--brand-primary, #e11d48)' }}
      >
        <div className="mx-auto flex max-w-sm flex-col items-center px-4">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={chrdData.establishmentName || 'Logo'}
              className="mb-4 max-h-14 object-contain"
            />
          ) : (
            <span className="mb-2 rounded-full bg-rose-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-300 border border-rose-500/30">
              {chrdData.establishmentType === 'hotel'
                ? 'Hôtel & Séjour'
                : chrdData.establishmentType === 'restaurant'
                ? 'Restaurant & Saveurs'
                : chrdData.establishmentType === 'camping'
                ? 'Camping & Vacances'
                : 'Hospitalité & Convivialité'}
            </span>
          )}

          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white">
            {chrdData.establishmentName || pageData.title}
          </h1>

          {chrdData.welcomeMessage && (
            <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-xs">
              {chrdData.welcomeMessage}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-md space-y-4 px-4 pt-4">
        {/* ── Menu PDF / Lien ── */}
        {chrdData.menuPdfUrl && (
          <a
            href={chrdData.menuPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 p-4 font-semibold text-white shadow-lg shadow-rose-900/40 transition active:scale-[0.98]"
          >
            <div className="flex items-center space-x-3">
              <div className="rounded-xl bg-white/20 p-2.5">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-base">Consulter notre Menu / Carte</div>
                <div className="text-xs text-rose-100 font-normal">Découvrez nos plats & boissons</div>
              </div>
            </div>
            <FileText className="h-5 w-5 text-white/80" />
          </a>
        )}

        {/* ── WiFi ── */}
        {chrdData.wifiName && (
          <div className="rounded-2xl border border-slate-800 bg-slate-800/80 p-4 shadow-sm backdrop-blur">
            <div className="flex items-center space-x-3 mb-2">
              <div className="rounded-xl bg-sky-500/20 p-2">
                <Wifi className="h-5 w-5 text-sky-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Accès Wi-Fi Gratuit</h3>
                <p className="text-xs text-slate-400">Réseau : <span className="font-mono font-semibold text-sky-300">{chrdData.wifiName}</span></p>
              </div>
            </div>

            {chrdData.wifiPassword && (
              <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-900/90 px-3.5 py-2.5 border border-slate-700/50">
                <span className="font-mono text-sm tracking-wider text-slate-200">{chrdData.wifiPassword}</span>
                <button
                  onClick={copyWifiPassword}
                  className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-500 active:scale-95"
                >
                  {copiedWifi ? (
                    <span className="flex items-center space-x-1"><Check className="h-3.5 w-3.5" /> <span>Copié</span></span>
                  ) : (
                    'Copier'
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Carte Postale Souvenir Offerte ── */}
        {chrdData.enablePostcardGift && (
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-slate-800 to-slate-900 p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="rounded-xl bg-amber-500/20 p-2.5 text-amber-400">
                <Gift className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-amber-300">Votre Carte Postale Souvenir Offerte</h3>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Envoyez gratuitement une vraie carte postale physique personnalisée à vos proches offerte par l'établissement !
                </p>

                {chrdData.postcardCode && (
                  <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-900 p-2.5 border border-amber-500/30">
                    <span className="font-mono text-sm font-bold text-amber-400 tracking-wider">
                      Code : {chrdData.postcardCode}
                    </span>
                    <button
                      onClick={copyPostcardCode}
                      className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-slate-950 transition hover:bg-amber-400 active:scale-95"
                    >
                      {copiedCode ? 'Copié !' : 'Copier'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Avis Clients ── */}
        {(chrdData.googleReviewUrl || chrdData.tripadvisorUrl) && (
          <div className="rounded-2xl border border-slate-800 bg-slate-800/80 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
              <h3 className="text-sm font-bold text-white">Laissez-nous votre avis</h3>
            </div>
            <p className="text-xs text-slate-400 mb-3">Votre opinion compte énormément pour notre équipe !</p>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {chrdData.googleReviewUrl && (
                <a
                  href={chrdData.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 rounded-xl bg-slate-700 hover:bg-slate-600 px-4 py-2.5 text-xs font-semibold text-white transition"
                >
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <span>Avis Google</span>
                </a>
              )}
              {chrdData.tripadvisorUrl && (
                <a
                  href={chrdData.tripadvisorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white transition"
                >
                  <Star className="h-4 w-4 text-emerald-300" />
                  <span>TripAdvisor</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
