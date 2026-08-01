'use client'

import { useState } from 'react'
import {
  CheckCircle2,
  ExternalLink,
  Eye,
  Globe,
  Heart,
  Instagram,
  Mail,
  Palette,
  Play,
  QrCode,
  Share2,
  Sparkles,
  User,
  Video,
} from 'lucide-react'
import { BorderBeam } from '@/components/ui/border-beam'
import { cn } from '@/lib/utils'

type TabType = 'fiche' | 'bio' | 'video' | 'cartel'

export function GalleryInteractivePreview() {
  const [activeTab, setActiveTab] = useState<TabType>('fiche')
  const [isSaved, setIsSaved] = useState(false)
  const [likesCount, setLikesCount] = useState(42)

  const handleLike = () => {
    if (isSaved) {
      setLikesCount((prev) => prev - 1)
      setIsSaved(false)
    } else {
      setLikesCount((prev) => prev + 1)
      setIsSaved(true)
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      {/* Navigation tabs */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md">
        <button
          onClick={() => setActiveTab('fiche')}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm',
            activeTab === 'fiche'
              ? 'bg-[#c4a574] text-mq-ink shadow-lg shadow-[#c4a574]/20'
              : 'text-white/70 hover:bg-white/10 hover:text-white',
          )}
        >
          <Palette className="h-4 w-4" />
          <span>1. Fiche Scannée</span>
        </button>
        <button
          onClick={() => setActiveTab('bio')}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm',
            activeTab === 'bio'
              ? 'bg-[#c4a574] text-mq-ink shadow-lg shadow-[#c4a574]/20'
              : 'text-white/70 hover:bg-white/10 hover:text-white',
          )}
        >
          <User className="h-4 w-4" />
          <span>2. Bio Artiste</span>
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm',
            activeTab === 'video'
              ? 'bg-[#c4a574] text-mq-ink shadow-lg shadow-[#c4a574]/20'
              : 'text-white/70 hover:bg-white/10 hover:text-white',
          )}
        >
          <Video className="h-4 w-4" />
          <span>3. Vidéo Atelier</span>
        </button>
        <button
          onClick={() => setActiveTab('cartel')}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm',
            activeTab === 'cartel'
              ? 'bg-[#c4a574] text-mq-ink shadow-lg shadow-[#c4a574]/20'
              : 'text-white/70 hover:bg-white/10 hover:text-white',
          )}
        >
          <QrCode className="h-4 w-4" />
          <span>4. Cartel Physique</span>
        </button>
      </div>

      {/* Main Container Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-mq-ink via-[#181412] to-[#0d0a09] p-4 shadow-2xl backdrop-blur-xl sm:p-8">
        <BorderBeam size={140} duration={12} colorFrom="#c4a574" colorTo="#e8d5b5" borderWidth={1.5} />

        {/* Top Gallery Header info */}
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c4a574]/20 font-display text-sm font-bold text-[#c4a574]">
              GM
            </div>
            <div>
              <p className="font-display text-sm font-semibold tracking-wide">Galerie Moderne Paris</p>
              <p className="text-xs text-white/50">Exposition « Lumières d’Automne » · 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Statut : Œuvre Disponible
          </div>
        </div>

        {/* Dynamic Display per Tab */}
        {activeTab === 'fiche' && (
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            {/* Artwork Preview Visual */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-tr from-[#3d2b1f] via-[#6b4c3b] to-[#1a1512] shadow-2xl lg:col-span-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-48 w-36 -rotate-2 rounded-sm bg-gradient-to-b from-[#d4b896] via-[#a38455] to-[#4a341e] p-3 shadow-2xl transition-transform duration-500 hover:rotate-0">
                  <div className="h-full w-full rounded border border-white/20 bg-[#1e1510]/40 p-2 backdrop-blur-sm">
                    <div className="h-2/3 w-full rounded bg-gradient-to-tr from-[#ffc53d]/40 via-[#ff5c4d]/30 to-[#12c4a8]/40" />
                    <div className="mt-2 h-2 w-3/4 rounded bg-white/60" />
                    <div className="mt-1 h-1.5 w-1/2 rounded bg-white/40" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-black/60 p-2.5 backdrop-blur-md text-xs text-white">
                <span className="flex items-center gap-1.5 font-medium text-[#c4a574]">
                  <Eye className="h-3.5 w-3.5" /> 342 vues aujourd'hui
                </span>
                <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/80">
                  Huile sur toile
                </span>
              </div>
            </div>

            {/* Artwork Metadata */}
            <div className="flex flex-col justify-between space-y-4 text-white lg:col-span-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#c4a574]/15 px-2.5 py-1 text-xs font-medium text-[#c4a574]">
                  <Sparkles className="h-3 w-3" /> N° 04 sur 18
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl text-white">
                  Horizon Serein #12
                </h3>
                <p className="mt-1 font-display text-base text-[#c4a574]">
                  par <strong className="text-white">Marie Dubois</strong> (b. 1984, Paris)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                <div>
                  <span className="text-white/40">Dimensions</span>
                  <p className="font-semibold text-white/90">120 × 90 cm</p>
                </div>
                <div>
                  <span className="text-white/40">Année</span>
                  <p className="font-semibold text-white/90">2026</p>
                </div>
                <div>
                  <span className="text-white/40">Technique</span>
                  <p className="font-semibold text-white/90">Huile & feuille d'or</p>
                </div>
                <div>
                  <span className="text-white/40">Prix public</span>
                  <p className="font-bold text-[#c4a574]">4 800 €</p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-white/60">
                « Une exploration poétique des contrastes de lumière entre l'aube méditerranéenne et l'abstraction minérale. »
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button className="flex-1 rounded-xl bg-gradient-to-r from-[#c4a574] to-[#a38455] px-4 py-2.5 text-center font-display text-xs font-semibold text-mq-ink shadow-lg shadow-[#c4a574]/20 transition-transform hover:scale-[1.02]">
                  Demander l'acquisition
                </button>
                <button
                  onClick={handleLike}
                  className={cn(
                    'flex items-center gap-1.5 rounded-xl border border-white/15 px-3 py-2.5 text-xs transition-all',
                    isSaved ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-white/5 text-white/80 hover:bg-white/10',
                  )}
                >
                  <Heart className={cn('h-4 w-4', isSaved && 'fill-rose-400 text-rose-400')} />
                  <span>{likesCount}</span>
                </button>
                <button className="flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2.5 text-white/80 hover:bg-white/10">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bio' && (
          <div className="space-y-4 text-white">
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="h-16 w-16 shrink-0 rounded-full border-2 border-[#c4a574] bg-gradient-to-br from-[#c4a574] to-[#3d2b1f] p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-mq-ink font-display text-lg font-bold text-[#c4a574]">
                  MD
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-display text-lg font-bold">Marie Dubois</h4>
                  <CheckCircle2 className="h-4 w-4 text-[#c4a574]" />
                </div>
                <p className="text-xs text-white/50">Artiste Peintre · diplômée des Beaux-Arts de Paris</p>
                <div className="flex items-center gap-3 pt-1 text-xs text-[#c4a574]">
                  <a href="#" className="flex items-center gap-1 hover:underline">
                    <Instagram className="h-3.5 w-3.5" /> @marie.dubois.art
                  </a>
                  <a href="#" className="flex items-center gap-1 hover:underline text-white/60">
                    <Globe className="h-3.5 w-3.5" /> mariedubois.com
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs leading-relaxed text-white/70 space-y-3">
              <p>
                Née en 1984 à Lyon, Marie Dubois développe une pratique picturale axée sur les jeux de matière, d'oxydation et de dorure à la feuille d'or. Ses travaux ont été acquis par plusieurs collections privées en France, en Suisse et au Japon.
              </p>
              <div className="border-t border-white/10 pt-3">
                <p className="font-semibold text-white/90 mb-1">Expositions récentes :</p>
                <ul className="list-disc list-inside space-y-1 text-white/60">
                  <li>2025 : Solo Show « Reflets & Matières », Galerie Moderne Paris</li>
                  <li>2024 : Exposition collective Art Paris, Grand Palais</li>
                  <li>2023 : Résidence de création à la Villa Medici, Rome</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'video' && (
          <div className="space-y-4 text-white">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#2a1d15] to-[#0f0c09] shadow-2xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <button className="group flex h-16 w-16 items-center justify-center rounded-full bg-[#c4a574] text-mq-ink shadow-xl shadow-[#c4a574]/30 transition-transform duration-300 hover:scale-110">
                  <Play className="h-7 w-7 fill-mq-ink translate-x-0.5" />
                </button>
                <p className="mt-4 font-display text-base font-semibold text-white">
                  Immersion dans l'atelier de Marie Dubois
                </p>
                <p className="mt-1 text-xs text-white/50">Coulisses de création & secrets de dorure à la feuille d'or (3 min 40)</p>
              </div>
              <div className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-[11px] text-white/80 backdrop-blur-sm">
                4K Ultra HD · Subtitles FR/EN
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cartel' && (
          <div className="grid gap-6 sm:grid-cols-2 items-center text-white">
            <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-[#c4a574]/40 bg-gradient-to-b from-[#1c1815] to-[#0e0c0b] p-6 shadow-2xl text-center">
              <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#c4a574]/40 bg-[#c4a574]/10 text-xs font-bold text-[#c4a574]">
                GM
              </div>
              <p className="text-[11px] font-semibold tracking-widest uppercase text-[#c4a574]">Galerie Moderne</p>
              <h4 className="mt-3 font-display text-lg font-bold">Horizon Serein #12</h4>
              <p className="text-xs text-white/60">Marie Dubois · 2026</p>
              <p className="mt-1 text-[11px] text-white/40">Huile sur toile · 120 × 90 cm</p>

              {/* QR Code visual box */}
              <div className="my-5 mx-auto flex h-28 w-28 items-center justify-center rounded-xl bg-white p-2 shadow-lg">
                <div className="relative flex h-full w-full items-center justify-center rounded border-2 border-mq-ink bg-mq-paper">
                  <QrCode className="h-20 w-20 text-mq-ink" />
                </div>
              </div>
              <p className="text-[10px] text-[#c4a574] font-medium tracking-wide">Scannez pour la fiche & le prix</p>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-white/70">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
                <h5 className="font-display text-sm font-semibold text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#c4a574]" />
                  Cartel Physique Haute Élégance
                </h5>
                <p>
                  Imprimez un QR code unique par emplacement d'œuvre. Le cartel reste accroché au mur, et vous mettez à jour la fiche en ligne instantanément depuis votre smartphone.
                </p>
              </div>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  Format discret et conforme aux normes muséales
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  Mise à jour du prix ou du statut "Vendu" à tout moment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  Zéro réimpression de papier lors du changement d'exposition
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
