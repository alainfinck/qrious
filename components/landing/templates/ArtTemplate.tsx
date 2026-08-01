'use client'

import { useState, useRef } from 'react'
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Globe,
  Headphones,
  Home,
  Info,
  Instagram,
  Mail,
  MapPin,
  Package,
  Palette,
  Play,
  Shield,
  ShoppingBag,
  Tag,
  XCircle,
  Sparkles,
} from 'lucide-react'

import { resolveMediaUrl } from '@/components/landing/utils'
import type { LandingPageTemplateProps } from '@/types/landing-page'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  CHF: 'CHF ',
}

function formatArtPrice(price?: number | null, currency?: string | null): string {
  const sym = CURRENCY_SYMBOLS[currency ?? 'EUR'] ?? '€'
  if (price == null) return ''
  return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(price) + '\u00A0' + sym.trim()
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function DetailChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm">
      <span
        className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-white"
        style={{ backgroundColor: 'var(--brand-primary)' }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-800">{value}</p>
      </div>
    </div>
  )
}

function ExpandableSection({
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <button
        className="flex w-full items-center gap-3 p-4 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-white"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        >
          {icon}
        </span>
        <span className="flex-1 text-sm font-semibold text-slate-800">{title}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-slate-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-400" />
        )}
      </button>
      {open && <div className="border-t border-slate-50 px-4 pb-4 pt-3">{children}</div>}
    </div>
  )
}

function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  // If it's a direct audio URL (mp3, ogg, wav), render a player
  const isDirectAudio = /\.(mp3|ogg|wav|m4a|aac)(\?.*)?$/i.test(src)

  if (!isDirectAudio) {
    return (
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
        style={{ backgroundColor: 'var(--brand-primary)' }}
      >
        <Headphones className="h-4 w-4" />
        Écouter l&apos;audio-guide
        <ExternalLink className="h-4 w-4 opacity-70" />
      </a>
    )
  }

  return (
    <div className="space-y-3">
      <audio ref={audioRef} src={src} onEnded={() => setPlaying(false)} className="hidden" />
      <div
        className="flex w-full items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold text-white"
        style={{ background: 'linear-gradient(135deg, var(--brand-primary), color-mix(in srgb, var(--brand-primary) 60%, #6d28d9))' }}
      >
        <Headphones className="h-5 w-5" />
        <span>Audio-guide</span>
        <button
          onClick={() => {
            if (playing) {
              audioRef.current?.pause()
              setPlaying(false)
            } else {
              audioRef.current?.play()
              setPlaying(true)
            }
          }}
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/30"
          aria-label={playing ? 'Pause' : 'Lecture'}
        >
          {playing ? '⏸' : '▶'}
        </button>
      </div>
    </div>
  )
}

// ─── Main Template ────────────────────────────────────────────────────────────

export function ArtTemplate({ pageData }: LandingPageTemplateProps) {
  const { artData, theme, title } = pageData
  const logoUrl = resolveMediaUrl(theme?.logo)

  const instagramHandle = artData?.instagramUsername?.replace(/^@/, '')
  const instagramUrl = instagramHandle ? `https://instagram.com/${instagramHandle}` : null
  const priceStr = artData?.price ? formatArtPrice(artData.price, artData.currency) : null

  const isSold = artData?.sold === true
  const isAvailable = artData?.available === true && !isSold

  return (
    <article className="flex min-h-screen flex-col">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="relative">
        {/* Artwork image area */}
        <div
          className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900"
        >
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={`${title} — ${artData?.artistName ?? ''}`}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-white/30">
              <Palette className="h-14 w-14" />
              <span className="text-sm font-medium">Visuel de l&apos;œuvre</span>
            </div>
          )}

          {/* Sold / Available badge */}
          {(isSold || isAvailable) && (
            <div className="absolute right-3 top-3">
              {isSold ? (
                <span className="flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                  <XCircle className="h-3.5 w-3.5" />
                  Vendu
                </span>
              ) : (
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Disponible
                </span>
              )}
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Title on image */}
          <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              {artData?.year ? `${artData.year} · ` : ''}
              {artData?.medium ?? 'Œuvre d\'art'}
            </p>
            <h1 className="mt-0.5 text-xl font-bold leading-tight text-white">{title}</h1>
            {artData?.artistName && (
              <p className="mt-0.5 text-sm text-white/75">par {artData.artistName}</p>
            )}
          </div>
        </div>
      </header>

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="flex-1 space-y-4 px-4 py-5">

        {/* Price + CTA */}
        {(priceStr || artData?.shopUrl || artData?.contactEmail) && (
          <div
            className="flex items-center justify-between gap-3 rounded-2xl p-4 text-white"
            style={{ background: 'linear-gradient(135deg, var(--brand-primary), color-mix(in srgb, var(--brand-primary) 65%, #1e1b4b))' }}
          >
            <div>
              {priceStr && (
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Prix</p>
                  <p className="text-2xl font-bold">{priceStr}</p>
                </>
              )}
              {isSold && <p className="text-sm font-semibold text-red-300">✕ Vendu</p>}
            </div>
            <div className="flex flex-col gap-2">
              {artData?.shopUrl && (
                <a
                  href={artData.shopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Acquérir
                </a>
              )}
              {artData?.contactEmail && (
                <a
                  href={`mailto:${artData.contactEmail}?subject=Acquisition - ${title}`}
                  className="flex items-center gap-1.5 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
                >
                  <Mail className="h-4 w-4" />
                  Contacter
                </a>
              )}
            </div>
          </div>
        )}

        {/* Audio guide */}
        {artData?.audioGuideUrl && (
          <AudioPlayer src={artData.audioGuideUrl} />
        )}

        {/* Key specs chips */}
        {(artData?.dimensions || artData?.edition || artData?.series || artData?.certificate) && (
          <div className="grid grid-cols-2 gap-2">
            {artData.dimensions && (
              <DetailChip icon={<Package className="h-3.5 w-3.5" />} label="Dimensions" value={artData.dimensions} />
            )}
            {artData.edition && (
              <DetailChip icon={<Sparkles className="h-3.5 w-3.5" />} label="Édition" value={artData.edition} />
            )}
            {artData.series && (
              <DetailChip icon={<BookOpen className="h-3.5 w-3.5" />} label="Série" value={artData.series} />
            )}
            {artData.certificate && (
              <DetailChip icon={<Shield className="h-3.5 w-3.5" />} label="Certificat" value={artData.certificate} />
            )}
          </div>
        )}

        {/* Description */}
        {artData?.description && (
          <ExpandableSection
            title="Note de l'artiste"
            icon={<Info className="h-4 w-4" />}
            defaultOpen
          >
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
              {artData.description}
            </p>
          </ExpandableSection>
        )}

        {/* Artist bio */}
        {(artData?.artistBio || artData?.artistNationality || artData?.artistBirthYear) && (
          <ExpandableSection title={`À propos de ${artData?.artistName ?? 'l\'artiste'}`} icon={<Palette className="h-4 w-4" />}>
            <div className="space-y-3">
              {(artData.artistNationality || artData.artistBirthYear) && (
                <div className="flex flex-wrap gap-2">
                  {artData.artistNationality && (
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                      🌍 {artData.artistNationality}
                    </span>
                  )}
                  {artData.artistBirthYear && (
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                      🎂 né(e) en {artData.artistBirthYear}
                    </span>
                  )}
                </div>
              )}
              {artData.artistBio && (
                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                  {artData.artistBio}
                </p>
              )}
            </div>
          </ExpandableSection>
        )}

        {/* Exhibition */}
        {(artData?.exhibitionName || artData?.exhibitionLocation || artData?.exhibitionDates) && (
          <ExpandableSection title="Exposition" icon={<Home className="h-4 w-4" />} defaultOpen>
            <div className="space-y-2">
              {artData.exhibitionName && (
                <p className="text-sm font-semibold text-slate-800">{artData.exhibitionName}</p>
              )}
              {artData.exhibitionLocation && (
                <p className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {artData.exhibitionLocation}
                </p>
              )}
              {artData.exhibitionDates && (
                <p className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  {artData.exhibitionDates}
                </p>
              )}
            </div>
          </ExpandableSection>
        )}

        {/* Video */}
        {artData?.videoUrl && (
          <a
            href={artData.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl py-4 text-sm font-semibold text-white shadow-md transition hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #111827, #374151)' }}
          >
            <Play className="h-5 w-5 fill-white" />
            Voir la vidéo de l&apos;œuvre
            <ExternalLink className="h-4 w-4 opacity-60" />
          </a>
        )}

        {/* Social & links */}
        {(instagramUrl || artData?.websiteUrl) && (
          <div className="flex gap-3">
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-100 bg-white py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <Instagram className="h-4 w-4" style={{ color: '#e1306c' }} />
                @{instagramHandle}
              </a>
            )}
            {artData?.websiteUrl && (
              <a
                href={artData.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-100 bg-white py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <Globe className="h-4 w-4 text-slate-400" />
                Site web
              </a>
            )}
          </div>
        )}

        {/* Tags line */}
        {(artData?.medium || artData?.year || artData?.series) && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Tag className="h-3.5 w-3.5 text-slate-300" />
            {artData.medium && (
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
                {artData.medium}
              </span>
            )}
            {artData.year && (
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
                {artData.year}
              </span>
            )}
            {artData.series && (
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
                {artData.series}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
