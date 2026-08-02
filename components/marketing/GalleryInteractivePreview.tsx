'use client'

import { useState } from 'react'
import {
  Award,
  BarChart3,
  CheckCircle2,
  Eye,
  FileCheck,
  Globe,
  Heart,
  Info,
  Instagram,
  Layers,
  Mail,
  Music,
  Palette,
  Pause,
  Play,
  QrCode,
  Share2,
  Sparkles,
  User,
  Volume2,
  Zap,
} from 'lucide-react'
import { BorderBeam } from '@/components/ui/border-beam'
import { cn } from '@/lib/utils'

type PreviewTab = 'fiche' | 'wall' | 'material' | 'stats'
type CartelMaterial = 'dibond' | 'plexiglas' | 'canson' | 'brass'

export function GalleryInteractivePreview() {
  const [activeTab, setActiveTab] = useState<PreviewTab>('fiche')
  const [material, setMaterial] = useState<CartelMaterial>('dibond')
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [likesCount, setLikesCount] = useState(128)
  const [activeLang, setActiveLang] = useState<'FR' | 'EN' | 'ES'>('FR')

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
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Navigation tabs */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-[#c5a059]/25 bg-[#14110e]/80 p-2 backdrop-blur-xl shadow-2xl">
        <button
          onClick={() => setActiveTab('fiche')}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wide transition-all sm:text-sm',
            activeTab === 'fiche'
              ? 'bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7939] text-[#0d0c0a] shadow-lg shadow-[#c5a059]/25 font-bold'
              : 'text-white/70 hover:bg-white/10 hover:text-white',
          )}
        >
          <Palette className="h-4 w-4" />
          <span>1. Fiche Scannée Mobile</span>
        </button>

        <button
          onClick={() => setActiveTab('wall')}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wide transition-all sm:text-sm',
            activeTab === 'wall'
              ? 'bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7939] text-[#0d0c0a] shadow-lg shadow-[#c5a059]/25 font-bold'
              : 'text-white/70 hover:bg-white/10 hover:text-white',
          )}
        >
          <Eye className="h-4 w-4" />
          <span>2. Accrochage en Galerie</span>
        </button>

        <button
          onClick={() => setActiveTab('material')}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wide transition-all sm:text-sm',
            activeTab === 'material'
              ? 'bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7939] text-[#0d0c0a] shadow-lg shadow-[#c5a059]/25 font-bold'
              : 'text-white/70 hover:bg-white/10 hover:text-white',
          )}
        >
          <Layers className="h-4 w-4" />
          <span>3. Matériaux du Cartel</span>
        </button>

        <button
          onClick={() => setActiveTab('stats')}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wide transition-all sm:text-sm',
            activeTab === 'stats'
              ? 'bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7939] text-[#0d0c0a] shadow-lg shadow-[#c5a059]/25 font-bold'
              : 'text-white/70 hover:bg-white/10 hover:text-white',
          )}
        >
          <BarChart3 className="h-4 w-4" />
          <span>4. Analytics Vernissage</span>
        </button>
      </div>

      {/* Main Container Card */}
      <div className="relative overflow-hidden rounded-3xl border border-[#c5a059]/30 bg-gradient-to-b from-[#181411] via-[#100d0a] to-[#080706] p-4 sm:p-8 shadow-2xl backdrop-blur-2xl">
        <BorderBeam size={160} duration={10} colorFrom="#d4af37" colorTo="#c5a059" borderWidth={1.5} />

        {/* Gallery Top Navigation Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#c5a059]/40 bg-gradient-to-br from-[#c5a059]/30 to-[#14110e] font-serif text-base font-bold text-[#e6cf8b]">
              G
            </div>
            <div>
              <p className="font-serif text-sm font-bold tracking-wider text-white">GALERIE DE L'ÉLYSÉE</p>
              <p className="text-xs text-[#c5a059]">Exposition Internationale · Marais, Paris</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Multi-language Selector Pills */}
            <div className="flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 p-1 text-[11px] font-medium">
              {(['FR', 'EN', 'ES'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={cn(
                    'rounded px-2 py-0.5 transition-colors',
                    activeLang === lang ? 'bg-[#c5a059] text-mq-ink font-bold' : 'text-white/60 hover:text-white',
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Disponible à l'acquisition
            </span>
          </div>
        </div>

        {/* TAB 1: FICHE SCANNEE MOBILE */}
        {activeTab === 'fiche' && (
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Artwork Frame Showcase */}
            <div className="relative lg:col-span-6">
              <div className="group relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-2xl border-4 border-[#241e17] bg-gradient-to-br from-[#2a221b] via-[#1a1410] to-[#0d0907] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                {/* Spotlighting simulation */}
                <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,#fff5d644_0%,transparent_70%)] blur-2xl" />

                {/* Simulated Oil Painting canvas */}
                <div className="relative h-full w-full overflow-hidden rounded border border-white/10 bg-gradient-to-tr from-[#3a2212] via-[#7a4e2b] to-[#c5a059] p-4 flex flex-col justify-between">
                  {/* Subtle Canvas Texture */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:8px_8px] opacity-40" />

                  <div className="relative z-10 flex justify-between items-start">
                    <span className="rounded bg-black/60 px-2 py-1 font-serif text-[10px] text-[#e6cf8b] backdrop-blur-sm border border-[#c5a059]/30">
                      Œuvre Restée Unique N° 03
                    </span>
                    <span className="flex items-center gap-1 rounded bg-black/60 px-2.5 py-1 text-[10px] text-white/90 backdrop-blur-sm">
                      <Eye className="h-3 w-3 text-[#c5a059]" /> 412 Vues Vernissage
                    </span>
                  </div>

                  <div className="relative z-10 space-y-1">
                    <div className="h-24 w-full rounded border border-white/20 bg-gradient-to-r from-amber-400/30 via-rose-500/20 to-amber-200/40 backdrop-blur-sm flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-[#e6cf8b] animate-pulse" />
                    </div>
                  </div>

                  <div className="relative z-10 flex items-end justify-between border-t border-white/20 pt-2 text-[11px] text-white/80">
                    <div>
                      <p className="font-serif font-bold text-white text-sm">« Solitude Dorée, 2026 »</p>
                      <p className="text-[#e6cf8b]">Huile & Pan d'or sur toile Canson</p>
                    </div>
                    <p className="font-serif font-bold text-[#e6cf8b]">140 × 110 cm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Artwork Details & Audio Guide */}
            <div className="flex flex-col justify-between space-y-5 text-white lg:col-span-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-[#c5a059]/40 bg-[#c5a059]/10 px-3 py-1 text-xs font-semibold text-[#e6cf8b]">
                    Artiste Permanent
                  </span>
                  <span className="text-xs text-white/40">Cote Certifiée Drouot</span>
                </div>

                <h3 className="mt-3 font-serif text-3xl font-bold tracking-tight text-white">
                  Éléonore de Saint-Germain
                </h3>
                <p className="mt-1 text-sm text-[#c5a059] font-serif">
                  « Solitude Dorée » (Série Éclats d'Automne)
                </p>
              </div>

              {/* Audio Guide Player Block */}
              <div className="rounded-2xl border border-[#c5a059]/30 bg-[#1a1612]/90 p-4 backdrop-blur-md shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-[#e6cf8b]">
                    <Volume2 className="h-4 w-4 text-[#c5a059]" />
                    <span>Audio-Guide Muséal (FR)</span>
                  </div>
                  <span className="text-[10px] text-white/50">Durée : 1 min 45</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#d4af37] to-[#9e7939] text-mq-ink shadow-md transition-transform hover:scale-105"
                  >
                    {isPlayingAudio ? (
                      <Pause className="h-4 w-4 fill-mq-ink" />
                    ) : (
                      <Play className="h-4 w-4 fill-mq-ink translate-x-0.5" />
                    )}
                  </button>

                  <div className="flex-1 space-y-1">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-[#d4af37] to-[#e6cf8b] transition-all duration-300"
                        style={{ width: isPlayingAudio ? '65%' : '20%' }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-white/40">
                      <span>{isPlayingAudio ? '0:42' : '0:00'}</span>
                      <span>1:45</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Artwork Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                <div>
                  <span className="text-white/40">Technique</span>
                  <p className="font-semibold text-white/90">Huile & Pan d'or</p>
                </div>
                <div>
                  <span className="text-white/40">Prix Galerie</span>
                  <p className="font-serif font-bold text-[#e6cf8b] text-sm">6 500 €</p>
                </div>
                <div>
                  <span className="text-white/40">Provenance</span>
                  <p className="font-semibold text-white/90">Atelier de l'Artiste, Paris</p>
                </div>
                <div>
                  <span className="text-white/40">Certificat</span>
                  <p className="font-semibold text-emerald-400 flex items-center gap-1">
                    <FileCheck className="h-3 w-3" /> Inclus (PDF & QR)
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button className="flex-1 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7939] px-5 py-3 text-center font-serif text-xs font-bold text-[#0d0c0a] shadow-xl shadow-[#c5a059]/20 transition-transform hover:scale-[1.02]">
                  <Mail className="mr-2 inline h-4 w-4" />
                  Demander l'acquisition au galeriste
                </button>
                <button
                  onClick={handleLike}
                  className={cn(
                    'flex items-center gap-1.5 rounded-xl border border-white/15 px-3.5 py-3 text-xs font-semibold transition-all',
                    isSaved ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-white/5 text-white/80 hover:bg-white/10',
                  )}
                >
                  <Heart className={cn('h-4 w-4', isSaved && 'fill-rose-400 text-rose-400')} />
                  <span>{likesCount}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ACCROCHAGE EN GALERIE */}
        {activeTab === 'wall' && (
          <div className="space-y-6 text-white">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#e6cf8b]">
                Simulation Curation
              </span>
              <h4 className="font-serif text-2xl font-bold">Rendu d'Exposition sur Mur de Galerie</h4>
              <p className="text-xs text-white/60">
                Chaque tableau est accompagné d'un cartel élégant et sobre intégrant le QR Code Qrious.
              </p>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#c5a059]/30 bg-gradient-to-b from-[#221c17] via-[#16120e] to-[#0c0907] p-6 shadow-2xl flex items-center justify-around">
              {/* Ceiling Spotlight effect */}
              <div className="pointer-events-none absolute -top-12 left-1/4 h-48 w-48 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,#fff5d633_0%,transparent_70%)] blur-xl" />
              <div className="pointer-events-none absolute -top-12 right-1/4 h-48 w-48 translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,#fff5d633_0%,transparent_70%)] blur-xl" />

              {/* Artwork 1 on Wall */}
              <div className="relative group flex flex-col items-center">
                <div className="h-32 w-24 rounded border-2 border-[#3a2e24] bg-gradient-to-tr from-amber-600/40 to-yellow-200/50 shadow-2xl p-1.5">
                  <div className="h-full w-full rounded border border-white/20 bg-black/40" />
                </div>
                {/* Cartel Plaque below */}
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#c5a059]/40 bg-[#120f0c] p-2 shadow-lg backdrop-blur-md">
                  <div className="space-y-0.5 text-left text-[9px]">
                    <p className="font-serif font-bold text-white">Solitude Dorée</p>
                    <p className="text-[#c5a059]">E. de Saint-Germain</p>
                    <p className="text-white/40">6 500 €</p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-white p-0.5">
                    <QrCode className="h-full w-full text-black" />
                  </div>
                </div>
              </div>

              {/* Artwork 2 on Wall (Central Masterpiece) */}
              <div className="relative group flex flex-col items-center">
                <div className="h-44 w-36 rounded border-4 border-[#2b221a] bg-gradient-to-br from-rose-900/50 via-amber-700/40 to-yellow-400/50 shadow-2xl p-2">
                  <div className="h-full w-full rounded border border-white/20 bg-black/40 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-[#e6cf8b]" />
                  </div>
                </div>
                {/* Cartel Plaque below */}
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#c5a059]/50 bg-[#14100c] p-2.5 shadow-xl backdrop-blur-md">
                  <div className="space-y-0.5 text-left text-[10px]">
                    <p className="font-serif font-bold text-white">Mémoire d'Or, 2026</p>
                    <p className="text-[#c5a059]">Marie Dubois</p>
                    <p className="font-bold text-emerald-400">Disponible</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1">
                    <QrCode className="h-full w-full text-black" />
                  </div>
                </div>
              </div>

              {/* Artwork 3 on Wall */}
              <div className="relative group flex flex-col items-center">
                <div className="h-32 w-24 rounded border-2 border-[#3a2e24] bg-gradient-to-tr from-emerald-800/40 to-teal-400/40 shadow-2xl p-1.5">
                  <div className="h-full w-full rounded border border-white/20 bg-black/40" />
                </div>
                {/* Cartel Plaque below */}
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#c5a059]/40 bg-[#120f0c] p-2 shadow-lg backdrop-blur-md">
                  <div className="space-y-0.5 text-left text-[9px]">
                    <p className="font-serif font-bold text-white">Structure III</p>
                    <p className="text-[#c5a059]">V. Kinsky</p>
                    <p className="text-rose-400 font-bold">Vendu</p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-white p-0.5">
                    <QrCode className="h-full w-full text-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MATERIAUX DU CARTEL */}
        {activeTab === 'material' && (
          <div className="space-y-6 text-white">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#e6cf8b]">
                Qualité Muséale
              </span>
              <h4 className="font-serif text-2xl font-bold">Choisissez la Finition de vos Cartels</h4>
              <p className="text-xs text-white/60">
                Sélectionnez le matériau physique adapté à vos cimaises et vitrines d'exposition.
              </p>
            </div>

            {/* Material Selector Buttons */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { id: 'dibond', name: 'Aluminium Dibond', desc: 'Noir mat ou Brossé', icon: ShieldCheck },
                { id: 'plexiglas', name: 'Plexiglas Gloss', desc: 'Haute Transparence UV', icon: Sparkles },
                { id: 'canson', name: 'Papier d’Art Canson', desc: 'Rag 310g Mat', icon: Palette },
                { id: 'brass', name: 'Laiton Gravé Or', desc: 'Musées & Maisons de Vente', icon: Award },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setMaterial(item.id as CartelMaterial)}
                  className={cn(
                    'flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all',
                    material === item.id
                      ? 'border-[#c5a059] bg-[#c5a059]/15 text-[#e6cf8b] shadow-xl shadow-[#c5a059]/15 scale-[1.02]'
                      : 'border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.08]',
                  )}
                >
                  <item.icon className="h-6 w-6 mb-2 text-[#c5a059]" />
                  <span className="font-serif text-xs font-bold text-white">{item.name}</span>
                  <span className="mt-1 text-[10px] text-white/50">{item.desc}</span>
                </button>
              ))}
            </div>

            {/* Material Preview Render */}
            <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-[#c5a059]/40 bg-[#14100c] p-6 shadow-2xl text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-3 py-1 text-[11px] font-semibold text-[#e6cf8b]">
                <Sparkles className="h-3.5 w-3.5 text-[#c5a059]" />
                Rendu : {material.toUpperCase()}
              </div>

              <div
                className={cn(
                  'mx-auto p-5 rounded-xl border transition-all duration-500 shadow-2xl space-y-3',
                  material === 'dibond' && 'border-slate-700 bg-gradient-to-b from-[#1c1917] to-[#0f0e0d] text-white',
                  material === 'plexiglas' && 'border-white/30 bg-white/10 backdrop-blur-xl text-white',
                  material === 'canson' && 'border-[#e6ded1] bg-[#f9f6f0] text-[#1c1917]',
                  material === 'brass' && 'border-[#d4af37] bg-gradient-to-br from-[#c5a059] via-[#8c6b30] to-[#59421b] text-white',
                )}
              >
                <p className="font-serif text-sm font-bold uppercase tracking-wider">GALERIE DE L'ÉLYSÉE</p>
                <h5 className="font-serif text-lg font-bold">Horizon Serein #12</h5>
                <p className="text-xs opacity-80">Marie Dubois · Huile & Feuille d'or · 2026</p>

                <div className="my-3 mx-auto flex h-24 w-24 items-center justify-center rounded-lg bg-white p-1.5 shadow-md">
                  <QrCode className="h-full w-full text-black" />
                </div>

                <p className="text-[10px] font-medium tracking-wide opacity-90">
                  Scannez pour la notice, l'audio-guide & le prix
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ANALYTICS VERNISSAGE */}
        {activeTab === 'stats' && (
          <div className="space-y-6 text-white">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#e6cf8b]">
                Suivi d'Intérêt & Collectionneurs
              </span>
              <h4 className="font-serif text-2xl font-bold">Tableau de Bord du Vernissage</h4>
              <p className="text-xs text-white/60">
                Mesurez en temps réel l'engagement des acheteurs pendant l'exposition.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <span className="text-xs text-white/50">Total Scans Soirée</span>
                <p className="mt-1 font-serif text-3xl font-bold text-[#e6cf8b]">1 480</p>
                <span className="mt-1 inline-block text-[10px] text-emerald-400">+42% vs vernissage précédent</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <span className="text-xs text-white/50">Demandes de Prix Directes</span>
                <p className="mt-1 font-serif text-3xl font-bold text-white">34</p>
                <span className="mt-1 inline-block text-[10px] text-white/60">Converties via bouton galeriste</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <span className="text-xs text-white/50">Écoutes Audio-Guide</span>
                <p className="mt-1 font-serif text-3xl font-bold text-[#e6cf8b]">892</p>
                <span className="mt-1 inline-block text-[10px] text-white/60">Temps moyen : 1 min 20s</span>
              </div>
            </div>

            {/* Top Visited Artworks Ranking */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
              <p className="font-serif text-sm font-bold text-white">Top 3 Œuvres les Plus Scannées</p>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c5a059] font-bold text-mq-ink">
                      1
                    </span>
                    <div>
                      <p className="font-serif font-bold text-white">« Solitude Dorée »</p>
                      <p className="text-white/50">Marie Dubois</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#e6cf8b]">412 Scans</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 font-bold text-white">
                      2
                    </span>
                    <div>
                      <p className="font-serif font-bold text-white">« Horizon Serein #12 »</p>
                      <p className="text-white/50">Éléonore de Saint-Germain</p>
                    </div>
                  </div>
                  <span className="font-bold text-white">348 Scans</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 font-bold text-white">
                      3
                    </span>
                    <div>
                      <p className="font-serif font-bold text-white">« Structure III »</p>
                      <p className="text-white/50">V. Kinsky</p>
                    </div>
                  </div>
                  <span className="font-bold text-white">290 Scans</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
