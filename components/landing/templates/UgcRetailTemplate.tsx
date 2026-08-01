'use client'

import { useState } from 'react'
import { Tag, Camera, Check, Gift, ShoppingBag, ExternalLink } from 'lucide-react'
import { resolveMediaUrl } from '@/components/landing/utils'
import type { LandingPageTemplateProps } from '@/types/landing-page'

export function UgcRetailTemplate({ pageData }: LandingPageTemplateProps) {
  const { ugcRetailData, theme } = pageData
  const logoUrl = resolveMediaUrl(theme?.logo)
  const [copiedCode, setCopiedCode] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!ugcRetailData) {
    return (
      <div className="flex h-64 items-center justify-center p-6 text-center text-slate-500">
        Aucune donnée Retail UGC configurée.
      </div>
    )
  }

  const copyCode = () => {
    if (ugcRetailData.rewardDiscountCode) {
      navigator.clipboard.writeText(ugcRetailData.rewardDiscountCode)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-12 font-sans text-slate-100">
      {/* ── Banner ── */}
      <div
        className="relative overflow-hidden bg-gradient-to-b from-purple-950 via-slate-900 to-slate-950 pb-8 pt-8 text-center text-white"
        style={{ borderBottom: '3px solid var(--brand-primary, #a855f7)' }}
      >
        <div className="mx-auto flex max-w-sm flex-col items-center px-4">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={ugcRetailData.brandName || 'Marque'}
              className="mb-3 max-h-12 object-contain"
            />
          ) : (
            <span className="mb-2 rounded-full bg-purple-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-purple-300 border border-purple-500/30">
              {ugcRetailData.brandName || 'Retail & Brand'}
            </span>
          )}

          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white">
            {ugcRetailData.campaignTitle || pageData.title}
          </h1>

          {ugcRetailData.productName && (
            <div className="mt-2 inline-flex items-center space-x-1.5 rounded-lg bg-slate-800 px-3 py-1 text-xs text-purple-300 border border-slate-700">
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Produit : {ugcRetailData.productName}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-md space-y-4 px-4 pt-4">
        {/* ── Formulaire / Participation UGC ── */}
        {!submitted ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400">
              <Camera className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white">Partagez votre photo</h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              {ugcRetailData.instructions ||
                'Scannez et déposez votre photo avec le produit pour débloquer votre avantage immédiat !'}
            </p>

            <div className="mt-4">
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/50 p-6 transition hover:border-purple-500 hover:bg-slate-800">
                <Camera className="h-8 w-8 text-purple-400 mb-2" />
                <span className="text-xs font-bold text-white">Sélectionner une photo</span>
                <span className="text-[10px] text-slate-500 mt-1">Formats JPG, PNG acceptés</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={() => setSubmitted(true)}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 p-5 text-center shadow-lg">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white">Photo reçue ! Merci 🎉</h3>
            <p className="mt-1 text-xs text-slate-300">
              {ugcRetailData.rewardDescription || 'Voici votre code promo réservé :'}
            </p>

            {ugcRetailData.rewardDiscountCode && (
              <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-900 p-3 border border-emerald-500/40">
                <span className="font-mono text-base font-extrabold text-emerald-400 tracking-wider">
                  {ugcRetailData.rewardDiscountCode}
                </span>
                <button
                  onClick={copyCode}
                  className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-slate-950 transition hover:bg-emerald-400 active:scale-95"
                >
                  {copiedCode ? 'Copié !' : 'Copier'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Règlement ── */}
        {ugcRetailData.rulesUrl && (
          <div className="text-center pt-2">
            <a
              href={ugcRetailData.rulesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-purple-300 transition"
            >
              <span>Voir le règlement complet du jeu</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
