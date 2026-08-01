'use client'

import {
  MapPin,
  Clock,
  Compass,
  Globe,
  Phone,
  Play,
  Volume2,
  Navigation,
  DollarSign,
  Map,
} from 'lucide-react'

import { resolveMediaUrl } from '@/components/landing/utils'
import type { LandingPageTemplateProps } from '@/types/landing-page'

export function TourismTemplate({ pageData }: LandingPageTemplateProps) {
  const { tourismData, theme } = pageData
  const logoUrl = resolveMediaUrl(theme?.logo)

  if (!tourismData) {
    return (
      <div className="flex h-64 items-center justify-center p-6 text-center text-slate-500">
        Aucune donnée touristique configurée.
      </div>
    )
  }

  const mapsUrl =
    tourismData.latitude && tourismData.longitude
      ? `https://www.google.com/maps/dir/?api=1&destination=${tourismData.latitude},${tourismData.longitude}`
      : tourismData.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tourismData.address)}`
      : null

  const hasPoints = tourismData.pointsOfInterest && tourismData.pointsOfInterest.length > 0

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans text-slate-800">
      {/* ── Header ── */}
      <div
        className="relative overflow-hidden bg-gradient-to-b from-amber-950 via-slate-900 to-slate-900 pb-12 pt-8 text-center text-white"
        style={{ borderBottom: '3px solid var(--brand-primary)' }}
      >
        <div className="mx-auto flex max-w-sm flex-col items-center px-4">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={tourismData.placeName || 'Logo'}
              className="mb-4 max-h-12 object-contain"
            />
          ) : (
            <span className="mb-2 rounded bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-300">
              Patrimoine & Culture
            </span>
          )}

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {tourismData.placeName || pageData.title}
          </h1>

          {tourismData.locationName && (
            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin className="h-3 w-3 text-amber-500" />
              {tourismData.locationName}
            </p>
          )}

          {tourismData.historicPeriod && (
            <span className="mt-3 inline-block rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300 border border-amber-500/30">
              {tourismData.historicPeriod}
            </span>
          )}
        </div>

        {/* Backdrop light effect */}
        <div className="absolute -top-10 left-1/2 -z-10 h-40 w-40 -translate-x-1/2 rounded-full bg-amber-500/10 opacity-30 blur-3xl" />
      </div>

      <div className="mx-auto -mt-6 max-w-md space-y-6 px-4">
        {/* ── Video / Audio Guide ── */}
        {(tourismData.audioGuideUrl || tourismData.videoUrl) && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {tourismData.audioGuideUrl && (
              <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-md">
                <div className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <Volume2 className="h-4 w-4 text-amber-500" />
                  Audio Guide
                </div>
                <audio controls src={tourismData.audioGuideUrl} className="w-full h-8" />
              </div>
            )}

            {tourismData.videoUrl && (
              <a
                href={tourismData.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-md transition-all hover:bg-slate-50 active:scale-[0.98]"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-rose-600 text-white">
                  <Play className="h-4 w-4 fill-white ml-0.5" />
                </span>
                <div className="text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Présentation</p>
                  <p className="text-xs font-bold text-slate-700">Regarder la vidéo</p>
                </div>
              </a>
            )}
          </div>
        )}

        {/* ── Main History / Description ── */}
        {tourismData.description && (
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider">
              <Compass className="h-4 w-4 text-amber-500" />
              Histoire & Récit
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
              {tourismData.description}
            </p>
          </div>
        )}

        {/* ── Points of Interest ── */}
        {hasPoints && (
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              <Map className="h-4 w-4 text-slate-400" />
              À ne pas manquer
            </h2>
            <div className="grid gap-3">
              {tourismData.pointsOfInterest?.map((poi, idx) => (
                <div
                  key={poi.id || idx}
                  className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <h3 className="text-sm font-bold text-slate-800">
                    {poi.name}
                  </h3>
                  {poi.description && (
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                      {poi.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Practical Information ── */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
            Infos Pratiques
          </h2>

          <div className="grid gap-3 text-xs text-slate-600">
            {tourismData.address && (
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Adresse</p>
                  <p className="mt-0.5">{tourismData.address}</p>
                </div>
              </div>
            )}

            {tourismData.openingHours && (
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Horaires</p>
                  <p className="mt-0.5 whitespace-pre-line">{tourismData.openingHours}</p>
                </div>
              </div>
            )}

            {tourismData.entryFee && (
              <div className="flex items-start gap-3">
                <DollarSign className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Tarifs</p>
                  <p className="mt-0.5">{tourismData.entryFee}</p>
                </div>
              </div>
            )}
          </div>

          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: 'var(--brand-primary)' }}
            >
              <Navigation className="h-3.5 w-3.5" />
              S&apos;y rendre (Google Maps)
            </a>
          )}
        </div>

        {/* ── Official Contacts ── */}
        {(tourismData.websiteUrl || tourismData.contactPhone) && (
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
              En savoir plus
            </h2>
            <div className="grid gap-3">
              {tourismData.websiteUrl && (
                <a
                  href={tourismData.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 shadow-sm transition-all hover:bg-slate-50 active:scale-[0.98]"
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    <Globe className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Site officiel</p>
                    <p className="truncate text-xs font-medium text-slate-700">{tourismData.websiteUrl}</p>
                  </div>
                </a>
              )}

              {tourismData.contactPhone && (
                <a
                  href={`tel:${tourismData.contactPhone}`}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 shadow-sm transition-all hover:bg-slate-50 active:scale-[0.98]"
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    <Phone className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Téléphone</p>
                    <p className="truncate text-xs font-medium text-slate-700">{tourismData.contactPhone}</p>
                  </div>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
