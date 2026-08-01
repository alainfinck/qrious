'use client'

import { useState } from 'react'
import { Calendar, MapPin, Wifi, Camera, Download, Clock, Check } from 'lucide-react'
import { resolveMediaUrl } from '@/components/landing/utils'
import type { LandingPageTemplateProps } from '@/types/landing-page'

export function CorporateEventTemplate({ pageData }: LandingPageTemplateProps) {
  const { corporateEventData, theme } = pageData
  const logoUrl = resolveMediaUrl(theme?.logo)
  const [copiedWifi, setCopiedWifi] = useState(false)

  if (!corporateEventData) {
    return (
      <div className="flex h-64 items-center justify-center p-6 text-center text-slate-500">
        Aucune donnée événementielle configurée.
      </div>
    )
  }

  const copyWifi = () => {
    if (corporateEventData.wifiCode) {
      navigator.clipboard.writeText(corporateEventData.wifiCode)
      setCopiedWifi(true)
      setTimeout(() => setCopiedWifi(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-12 font-sans text-slate-100">
      {/* ── Banner ── */}
      <div
        className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 pb-8 pt-8 text-center text-white"
        style={{ borderBottom: '3px solid var(--brand-primary, #6366f1)' }}
      >
        <div className="mx-auto flex max-w-sm flex-col items-center px-4">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={corporateEventData.companyName || 'Logo'}
              className="mb-3 max-h-12 object-contain"
            />
          ) : (
            <span className="mb-2 rounded-full bg-indigo-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-indigo-300 border border-indigo-500/30">
              {corporateEventData.companyName || 'Corporate Event'}
            </span>
          )}

          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white">
            {corporateEventData.eventName || pageData.title}
          </h1>

          <div className="mt-3 flex flex-wrap justify-center gap-3 text-xs text-indigo-200">
            {corporateEventData.eventDate && (
              <span className="flex items-center space-x-1.5 rounded-lg bg-indigo-900/40 px-3 py-1 border border-indigo-700/50">
                <Calendar className="h-3.5 w-3.5 text-indigo-400" />
                <span>{corporateEventData.eventDate}</span>
              </span>
            )}
            {corporateEventData.location && (
              <span className="flex items-center space-x-1.5 rounded-lg bg-indigo-900/40 px-3 py-1 border border-indigo-700/50">
                <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                <span>{corporateEventData.location}</span>
              </span>
            )}
          </div>

          {corporateEventData.welcomeMessage && (
            <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-xs">
              {corporateEventData.welcomeMessage}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-md space-y-4 px-4 pt-4">
        {/* ── Live Wall & Pixshare ── */}
        {corporateEventData.liveWallEnabled && (
          <a
            href={corporateEventData.galleryCode ? `/e/${corporateEventData.galleryCode}` : '/galeries'}
            className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 font-semibold text-white shadow-lg shadow-indigo-900/40 transition active:scale-[0.98]"
          >
            <div className="flex items-center space-x-3">
              <div className="rounded-xl bg-white/20 p-2.5">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-base">Mur Photo & Galerie Live</div>
                <div className="text-xs text-indigo-100 font-normal">Partagez vos photos en temps réel</div>
              </div>
            </div>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              En Direct
            </span>
          </a>
        )}

        {/* ── Wi-Fi ── */}
        {corporateEventData.wifiCode && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-sky-500/20 p-2.5 text-sky-400">
                  <Wifi className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Wi-Fi Séminaire</h3>
                  <p className="font-mono text-xs font-semibold text-sky-300">{corporateEventData.wifiCode}</p>
                </div>
              </div>
              <button
                onClick={copyWifi}
                className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700 active:scale-95"
              >
                {copiedWifi ? (
                  <span className="flex items-center space-x-1"><Check className="h-3.5 w-3.5" /> <span>Copié</span></span>
                ) : (
                  'Copier'
                )}
              </button>
            </div>
          </div>
        )}

        {/* ── Téléchargements (Programme / Présentations) ── */}
        {(corporateEventData.scheduleUrl || corporateEventData.slidesUrl) && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {corporateEventData.scheduleUrl && (
              <a
                href={corporateEventData.scheduleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 rounded-2xl border border-slate-800 bg-slate-900 p-3.5 hover:bg-slate-800 transition"
              >
                <Clock className="h-5 w-5 text-indigo-400" />
                <div>
                  <div className="text-xs font-bold text-white">Programme Complet</div>
                  <div className="text-[10px] text-slate-400">Ordre du jour & horodateur</div>
                </div>
              </a>
            )}
            {corporateEventData.slidesUrl && (
              <a
                href={corporateEventData.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 rounded-2xl border border-slate-800 bg-slate-900 p-3.5 hover:bg-slate-800 transition"
              >
                <Download className="h-5 w-5 text-indigo-400" />
                <div>
                  <div className="text-xs font-bold text-white">Présentations PDF</div>
                  <div className="text-[10px] text-slate-400">Supports de conférences</div>
                </div>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
