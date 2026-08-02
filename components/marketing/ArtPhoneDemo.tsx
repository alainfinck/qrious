'use client'

import { useState } from 'react'
import {
  CheckCircle2,
  Headphones,
  Heart,
  Instagram,
  Mail,
  Pause,
  Play,
  ShoppingBag,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Interactive phone mockup for the Art solutions hero —
 * simulates a scanned artwork fiche.
 */
export function ArtPhoneDemo() {
  const [playing, setPlaying] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(86)

  const toggleLike = () => {
    setLiked((v) => !v)
    setLikes((n) => (liked ? n - 1 : n + 1))
  }

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(ellipse_at_center,#c4b5fd55_0%,#fda4af33_40%,transparent_70%)] blur-2xl"
        aria-hidden
      />

      <div className="relative w-[300px] sm:w-[320px] rounded-[42px] border-[8px] border-slate-800 bg-slate-900 p-2 shadow-2xl shadow-violet-500/20 ring-1 ring-violet-300/40">
        {/* Dynamic Island */}
        <div className="absolute top-3.5 left-1/2 z-30 h-5 w-24 -translate-x-1/2 rounded-full border border-white/10 bg-black" />

        {/* Screen */}
        <div className="relative h-[560px] w-full overflow-hidden rounded-[32px] bg-white">
          <div className="h-full overflow-y-auto no-scrollbar">
            {/* Artwork hero */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/art/lumiere-automne.jpg"
                alt="Lumière d'Automne — Claude Dupont"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute right-3 top-10 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-emerald-500/90 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm backdrop-blur-md">
                  <CheckCircle2 className="h-3 w-3" />
                  Disponible
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 space-y-1 px-4 pb-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  2024 · Huile sur toile
                </p>
                <h3 className="font-display text-xl font-bold leading-tight text-white">
                  Lumière d&apos;Automne
                </h3>
                <p className="text-xs text-white/75">par Claude Dupont</p>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-3 bg-[#faf8ff] px-3.5 py-4 text-slate-900">
              <div className="flex items-center justify-between gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-400 p-3.5 text-white shadow-lg shadow-violet-500/25">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-white/70">Prix</p>
                  <p className="font-display text-xl font-bold">2 400 €</p>
                </div>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-xl bg-white px-3 py-2 text-[11px] font-bold text-violet-700 transition hover:bg-white/90"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    Acquérir
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-xl bg-white/20 px-2.5 py-2 text-[11px] font-semibold text-white backdrop-blur transition hover:bg-white/30"
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-violet-100 bg-white p-3 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-violet-600">
                    <Headphones className="h-3.5 w-3.5" />
                    Audio-guide
                  </div>
                  <span className="text-[9px] text-slate-400">1:32</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPlaying((v) => !v)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-rose-400 text-white shadow-md transition hover:scale-105"
                    aria-label={playing ? 'Pause' : 'Lecture'}
                  >
                    {playing ? (
                      <Pause className="h-3.5 w-3.5 fill-current" />
                    ) : (
                      <Play className="h-3.5 w-3.5 fill-current translate-x-px" />
                    )}
                  </button>
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 overflow-hidden rounded-full bg-violet-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-rose-400 transition-all duration-500"
                        style={{ width: playing ? '58%' : '12%' }}
                      />
                    </div>
                    <p className="text-[9px] text-slate-400">
                      Note d&apos;intention · Claude Dupont
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Dimensions', value: '100 × 80 cm' },
                  { label: 'Édition', value: 'Pièce unique' },
                  { label: 'Série', value: "Éclats d'Automne" },
                  { label: 'Certificat', value: 'Signé · PDF' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-violet-100 bg-white p-2.5 shadow-sm"
                  >
                    <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-slate-800">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-violet-100 bg-white p-3 shadow-sm">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                  <p className="text-[11px] font-bold text-slate-800">Note de l&apos;artiste</p>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Cette toile capture la lumière dorée d&apos;un soir d&apos;octobre sur les collines
                  lyonnaises. Les glacis successifs révèlent la profondeur des ocres…
                </p>
              </div>

              <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-3">
                <p className="text-[9px] font-semibold uppercase tracking-wide text-rose-500">
                  Exposition
                </p>
                <p className="mt-0.5 text-xs font-bold text-slate-800">Biennale de Paris</p>
                <p className="text-[10px] text-slate-500">Grand Palais · 12 sept. – 20 oct. 2024</p>
              </div>

              <div className="flex gap-2 pb-2">
                <a
                  href="#demo"
                  onClick={(e) => e.preventDefault()}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-violet-100 bg-white py-2.5 text-[11px] font-semibold text-slate-700 shadow-sm"
                >
                  <Instagram className="h-3.5 w-3.5 text-[#e1306c]" />
                  @claudedupont.art
                </a>
                <button
                  type="button"
                  onClick={toggleLike}
                  className={cn(
                    'flex items-center gap-1 rounded-xl border px-3 py-2.5 text-[11px] font-semibold transition',
                    liked
                      ? 'border-rose-300 bg-rose-50 text-rose-500'
                      : 'border-violet-100 bg-white text-slate-600 shadow-sm',
                  )}
                >
                  <Heart className={cn('h-3.5 w-3.5', liked && 'fill-rose-500')} />
                  {likes}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-violet-200 bg-white/95 px-3 py-1 text-[10px] font-semibold text-violet-600 shadow-lg backdrop-blur">
        Aperçu fiche scannée · Démo interactive
      </div>
    </div>
  )
}
