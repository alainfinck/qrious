'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  BedDouble,
  CalendarCheck,
  Clock,
  Copy,
  Check,
  ExternalLink,
  Home,
  Key,
  Mail,
  MapPin,
  Phone,
  Wifi,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Map,
  Info,
  ShieldCheck,
} from 'lucide-react'

import { formatPrice, getDpeColor, resolveMediaUrl } from '@/components/landing/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { LandingPageTemplateProps } from '@/types/landing-page'

// ─── Helpers ────────────────────────────────────────────────────────────────

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  apartment: 'Appartement',
  house: 'Maison',
  gite: 'Gîte',
  villa: 'Villa',
  studio: 'Studio',
}

const AMENITY_ICONS: Record<string, string> = {
  piscine: '🏊',
  parking: '🚗',
  wifi: '📶',
  'lave-vaisselle': '🍽️',
  'machine à laver': '🫧',
  barbecue: '🔥',
  vélos: '🚲',
  jardin: '🌿',
  terrasse: '☀️',
  cheminée: '🪵',
  'climatisation': '❄️',
  sauna: '🧖',
  jacuzzi: '🛁',
  bébé: '👶',
  'animaux acceptés': '🐾',
  vue: '🏔️',
  mer: '🌊',
  montagne: '⛰️',
}

function getAmenityIcon(name: string): string {
  const key = name.toLowerCase()
  for (const [k, v] of Object.entries(AMENITY_ICONS)) {
    if (key.includes(k)) return v
  }
  return '✓'
}

// ─── Types tab ───────────────────────────────────────────────────────────────

type Tab = 'welcome' | 'info' | 'wifi' | 'rules' | 'amenities' | 'explore' | 'contact'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'welcome', label: 'Accueil', icon: '🏡' },
  { id: 'info', label: 'Infos', icon: '📐' },
  { id: 'wifi', label: 'WiFi', icon: '📶' },
  { id: 'rules', label: 'Règles', icon: '📋' },
  { id: 'amenities', label: 'Équipements', icon: '✨' },
  { id: 'explore', label: 'Explorer', icon: '🗺️' },
  { id: 'contact', label: 'Contact', icon: '📞' },
]

// ─── CopyButton ──────────────────────────────────────────────────────────────

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback silently
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
      style={{ backgroundColor: 'color-mix(in srgb, var(--brand-primary) 12%, transparent)', color: 'var(--brand-primary)' }}
      aria-label={`Copier ${label}`}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copié !' : 'Copier'}
    </button>
  )
}

// ─── Main template ────────────────────────────────────────────────────────────

export function ImmoTemplate({ pageData }: LandingPageTemplateProps) {
  const [activeTab, setActiveTab] = useState<Tab>('welcome')
  const { immoData, theme, title } = pageData
  const logoUrl = resolveMediaUrl(theme?.logo)

  const amenityList: string[] =
    immoData?.amenities
      ?.map((a) => (typeof a === 'string' ? a : (a as { name: string }).name))
      .filter(Boolean) ?? []

  const houseRulesList: string[] =
    immoData?.houseRules
      ?.split('\n')
      .map((r) => r.trim())
      .filter(Boolean) ?? []

  const localTipsList: string[] =
    immoData?.localTips
      ?.split('\n')
      .map((t) => t.trim())
      .filter(Boolean) ?? []

  // Determine which tabs to show
  const visibleTabs = TABS.filter((tab) => {
    if (tab.id === 'wifi') return immoData?.wifiName || immoData?.wifiPassword
    if (tab.id === 'rules') return houseRulesList.length > 0
    if (tab.id === 'amenities') return amenityList.length > 0
    if (tab.id === 'explore') return localTipsList.length > 0
    if (tab.id === 'contact') return immoData?.hostName || immoData?.hostPhone || immoData?.hostEmail || immoData?.emergencyPhone
    return true
  })

  return (
    <article className="flex flex-col gap-0 min-h-screen">
      {/* ── Hero header ──────────────────────────────────── */}
      <header
        className="relative flex flex-col items-center gap-4 px-6 pb-6 pt-8 text-center"
        style={{ background: 'linear-gradient(135deg, var(--brand-primary) 0%, color-mix(in srgb, var(--brand-primary) 70%, #6d28d9) 100%)' }}
      >
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-10" style={{ background: 'white' }} />
          <div className="absolute -left-8 bottom-0 h-28 w-28 rounded-full opacity-10" style={{ background: 'white' }} />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-3">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="Logo"
              width={64}
              height={64}
              className="h-16 w-16 rounded-2xl object-cover shadow-lg ring-2 ring-white/30"
            />
          ) : (
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-lg ring-2 ring-white/20"
              style={{ backgroundColor: 'color-mix(in srgb, var(--brand-primary) 60%, black)' }}
            >
              {title.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="space-y-1">
            {immoData?.propertyType && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                {PROPERTY_TYPE_LABELS[immoData.propertyType] ?? immoData.propertyType}
              </p>
            )}
            <h1 className="text-xl font-bold leading-tight text-white">{title}</h1>
            {(immoData?.city || immoData?.address) && (
              <p className="flex items-center justify-center gap-1 text-sm text-white/80">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                {immoData.city ?? immoData.address}
              </p>
            )}
          </div>

          {/* Check-in / Check-out chips */}
          {(immoData?.checkInTime || immoData?.checkOutTime) && (
            <div className="flex items-center gap-3">
              {immoData.checkInTime && (
                <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                  <Key className="h-3 w-3" />
                  Arrivée {immoData.checkInTime}
                </div>
              )}
              {immoData.checkOutTime && (
                <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                  <Clock className="h-3 w-3" />
                  Départ {immoData.checkOutTime}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ── Tab navigation ───────────────────────────────── */}
      <nav
        className="sticky top-0 z-20 flex overflow-x-auto bg-white shadow-sm"
        style={{ scrollbarWidth: 'none' }}
        aria-label="Navigation livret d'accueil"
      >
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex flex-shrink-0 flex-col items-center gap-0.5 px-4 py-3 text-[11px] font-medium transition-colors"
            style={{
              color: activeTab === tab.id ? 'var(--brand-primary)' : '#94a3b8',
              borderBottom: activeTab === tab.id ? '2px solid var(--brand-primary)' : '2px solid transparent',
              backgroundColor: activeTab === tab.id ? 'color-mix(in srgb, var(--brand-primary) 5%, white)' : 'transparent',
            }}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            <span className="text-base leading-none">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* ── Tab content ──────────────────────────────────── */}
      <div className="flex-1 space-y-4 px-4 py-5">

        {/* ═══ WELCOME ═════════════════════════════════════ */}
        {activeTab === 'welcome' && (
          <section aria-label="Accueil" className="space-y-5">
            {immoData?.welcomeMessage && (
              <div
                className="rounded-2xl p-5 text-sm leading-relaxed text-white"
                style={{ background: 'linear-gradient(135deg, var(--brand-primary), color-mix(in srgb, var(--brand-primary) 70%, #6d28d9))' }}
              >
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/70">Message de bienvenue</p>
                <p className="whitespace-pre-line">{immoData.welcomeMessage}</p>
              </div>
            )}

            {/* Photo placeholder */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <Home className="h-10 w-10 text-slate-300" />
                <span className="text-sm font-medium text-slate-400">Photo du logement</span>
              </div>
            </div>

            {/* Key info cards */}
            {(immoData?.checkInTime || immoData?.checkOutTime || immoData?.checkInInstructions) && (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-slate-700">Informations d'arrivée</h2>

                {(immoData.checkInTime || immoData.checkOutTime) && (
                  <div className="grid grid-cols-2 gap-3">
                    {immoData.checkInTime && (
                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
                        <Key className="mx-auto mb-1 h-5 w-5 text-slate-400" />
                        <p className="text-lg font-bold text-slate-900">{immoData.checkInTime}</p>
                        <p className="text-xs text-slate-500">Arrivée dès</p>
                      </div>
                    )}
                    {immoData.checkOutTime && (
                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
                        <Clock className="mx-auto mb-1 h-5 w-5 text-slate-400" />
                        <p className="text-lg font-bold text-slate-900">{immoData.checkOutTime}</p>
                        <p className="text-xs text-slate-500">Départ avant</p>
                      </div>
                    )}
                  </div>
                )}

                {immoData.checkInInstructions && (
                  <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                      <Key className="h-3.5 w-3.5" />
                      Instructions d'arrivée
                    </p>
                    <p className="whitespace-pre-line text-sm text-amber-900">{immoData.checkInInstructions}</p>
                  </div>
                )}
              </div>
            )}

            {/* CTA réservation */}
            {immoData?.bookingUrl && (
              <Button
                asChild
                size="lg"
                className="w-full font-semibold shadow-md"
                style={{ backgroundColor: 'var(--brand-primary)', color: 'white' }}
              >
                <a href={immoData.bookingUrl} target="_blank" rel="noopener noreferrer">
                  <CalendarCheck className="h-4 w-4" />
                  Contacter l&apos;hôte / Réserver
                  <ExternalLink className="h-4 w-4 opacity-70" />
                </a>
              </Button>
            )}
          </section>
        )}

        {/* ═══ INFO ════════════════════════════════════════ */}
        {activeTab === 'info' && (
          <section aria-label="Informations du bien" className="space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Caractéristiques</h2>

            <div className="grid grid-cols-2 gap-3">
              {immoData?.surface && (
                <InfoCard
                  icon={<span className="text-xl">📐</span>}
                  value={`${immoData.surface} m²`}
                  label="Surface"
                />
              )}
              {immoData?.rooms && (
                <InfoCard
                  icon={<BedDouble className="h-6 w-6 text-slate-400" />}
                  value={String(immoData.rooms)}
                  label="Pièces"
                />
              )}
              {immoData?.price && (
                <InfoCard
                  icon={<span className="text-xl">💶</span>}
                  value={formatPrice(immoData.price)}
                  label="Prix"
                />
              )}
              {immoData?.propertyType && (
                <InfoCard
                  icon={<Home className="h-6 w-6 text-slate-400" />}
                  value={PROPERTY_TYPE_LABELS[immoData.propertyType] ?? immoData.propertyType}
                  label="Type"
                />
              )}
            </div>

            {immoData?.dpe && (
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="mb-3 text-sm font-medium text-slate-600">Diagnostic de Performance Énergétique</p>
                <div className="flex items-center gap-3">
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((grade) => (
                    <div
                      key={grade}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold text-white transition-transform"
                      style={{
                        backgroundColor: getDpeColor(grade as typeof immoData.dpe),
                        transform: grade === immoData?.dpe ? 'scale(1.25)' : 'scale(1)',
                        opacity: grade === immoData?.dpe ? 1 : 0.3,
                      }}
                    >
                      {grade}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(immoData?.address || immoData?.city) && (
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <MapPin className="h-3.5 w-3.5" />
                  Adresse
                </p>
                <p className="text-sm text-slate-900">
                  {[immoData.address, immoData.city].filter(Boolean).join(', ')}
                </p>
              </div>
            )}
          </section>
        )}

        {/* ═══ WIFI ════════════════════════════════════════ */}
        {activeTab === 'wifi' && (
          <section aria-label="WiFi" className="space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Connexion WiFi</h2>

            <div
              className="rounded-2xl p-6 text-white"
              style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)' }}
            >
              <Wifi className="mb-4 h-8 w-8 opacity-80" />
              <div className="space-y-4">
                {immoData?.wifiName && (
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/70">
                      Réseau
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-lg font-bold">{immoData.wifiName}</p>
                      <CopyButton value={immoData.wifiName} label="le nom du réseau" />
                    </div>
                  </div>
                )}
                {immoData?.wifiPassword && (
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/70">
                      Mot de passe
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-lg font-bold tracking-wider">{immoData.wifiPassword}</p>
                      <CopyButton value={immoData.wifiPassword} label="le mot de passe" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="text-center text-xs text-slate-400">
              Appuyez sur « Copier » pour coller directement dans les paramètres WiFi
            </p>
          </section>
        )}

        {/* ═══ RULES ═══════════════════════════════════════ */}
        {activeTab === 'rules' && (
          <section aria-label="Règles de la maison" className="space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Règles de la maison</h2>

            {houseRulesList.length > 0 ? (
              <ul className="space-y-2">
                {houseRulesList.map((rule, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: 'var(--brand-primary)' }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-slate-700">{rule}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState icon={<ShieldCheck className="h-8 w-8 text-slate-300" />} message="Aucune règle renseignée." />
            )}
          </section>
        )}

        {/* ═══ AMENITIES ═══════════════════════════════════ */}
        {activeTab === 'amenities' && (
          <section aria-label="Équipements" className="space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Équipements disponibles</h2>

            {amenityList.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {amenityList.map((amenity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm"
                  >
                    <span className="text-xl">{getAmenityIcon(amenity)}</span>
                    <span className="text-sm font-medium text-slate-700">{amenity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState icon={<Sparkles className="h-8 w-8 text-slate-300" />} message="Aucun équipement renseigné." />
            )}
          </section>
        )}

        {/* ═══ EXPLORE ═════════════════════════════════════ */}
        {activeTab === 'explore' && (
          <section aria-label="Conseils locaux" className="space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Explorer les environs</h2>

            {localTipsList.length > 0 ? (
              <ul className="space-y-3">
                {localTipsList.map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
                  >
                    <ChevronRight
                      className="mt-0.5 h-4 w-4 flex-shrink-0"
                      style={{ color: 'var(--brand-primary)' }}
                    />
                    <span className="text-sm text-slate-700">{tip}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState icon={<Map className="h-8 w-8 text-slate-300" />} message="Aucun conseil local renseigné." />
            )}
          </section>
        )}

        {/* ═══ CONTACT ═════════════════════════════════════ */}
        {activeTab === 'contact' && (
          <section aria-label="Contact" className="space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Vos contacts</h2>

            {/* Host */}
            {(immoData?.hostName || immoData?.hostPhone || immoData?.hostEmail) && (
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    {(immoData.hostName ?? '?').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{immoData.hostName ?? 'Votre hôte'}</p>
                    <p className="text-xs text-slate-500">Hôte</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {immoData.hostPhone && (
                    <a
                      href={`tel:${immoData.hostPhone}`}
                      className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <Phone className="h-4 w-4 text-slate-400" />
                      {immoData.hostPhone}
                    </a>
                  )}
                  {immoData.hostEmail && (
                    <a
                      href={`mailto:${immoData.hostEmail}`}
                      className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <Mail className="h-4 w-4 text-slate-400" />
                      {immoData.hostEmail}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Emergency */}
            {immoData?.emergencyPhone && (
              <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  Numéro d&apos;urgence
                </p>
                <a
                  href={`tel:${immoData.emergencyPhone}`}
                  className="flex items-center gap-3 rounded-lg bg-white p-3 text-sm font-bold text-red-700 shadow-sm"
                >
                  <Phone className="h-4 w-4" />
                  {immoData.emergencyPhone}
                </a>
              </div>
            )}

            {/* CTA */}
            {immoData?.bookingUrl && (
              <Button
                asChild
                size="lg"
                className="w-full font-semibold shadow-md"
                style={{ backgroundColor: 'var(--brand-primary)', color: 'white' }}
              >
                <a href={immoData.bookingUrl} target="_blank" rel="noopener noreferrer">
                  <CalendarCheck className="h-4 w-4" />
                  Réserver / Contacter
                  <ExternalLink className="h-4 w-4 opacity-70" />
                </a>
              </Button>
            )}
          </section>
        )}
      </div>
    </article>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function InfoCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm">
      {icon}
      <p className="text-xl font-bold text-slate-900">{value}</p>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
    </div>
  )
}

function EmptyState({ icon, message }: { icon: React.ReactNode; message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl bg-slate-50 py-10 text-center">
      {icon}
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  )
}
