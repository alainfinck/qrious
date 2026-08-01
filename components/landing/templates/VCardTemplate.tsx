'use client'

import { useState, useCallback } from 'react'
import {
  Calendar,
  Copy,
  Check,
  Download,
  ExternalLink,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  QrCode,
  Share2,
  Twitter,
  Youtube,
  Briefcase,
  Nfc,
  UserPlus,
} from 'lucide-react'

import { resolveMediaUrl } from '@/components/landing/utils'
import type { LandingPageTemplateProps } from '@/types/landing-page'

// ─── Types ───────────────────────────────────────────────────────────────────

interface VCardTemplateProps extends LandingPageTemplateProps {
  slug: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {/* silent */ }
  }

  return (
    <button
      onClick={handleCopy}
      className="ml-auto flex flex-shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all"
      style={{ backgroundColor: 'color-mix(in srgb, var(--brand-primary) 12%, transparent)', color: 'var(--brand-primary)' }}
      aria-label={`Copier ${label}`}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Copié' : 'Copier'}
    </button>
  )
}

function ContactRow({
  icon,
  label,
  href,
  value,
  copyable = false,
}: {
  icon: React.ReactNode
  label: string
  href: string
  value: string
  copyable?: boolean
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all hover:border-slate-200 hover:shadow-md active:scale-[0.98]"
    >
      <span
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-white"
        style={{ backgroundColor: 'var(--brand-primary)' }}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="truncate text-sm font-medium text-slate-800">{value}</p>
      </div>
      {copyable && <CopyButton value={value} label={label} />}
    </a>
  )
}

function SocialLink({
  href,
  icon,
  label,
  color,
}: {
  href: string
  icon: React.ReactNode
  label: string
  color: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition-all hover:scale-105 hover:shadow-md"
      aria-label={label}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ backgroundColor: color }}>
        {icon}
      </span>
      <span className="text-[10px] font-medium text-slate-500">{label}</span>
    </a>
  )
}

// ─── QR Modal ────────────────────────────────────────────────────────────────

function QrModal({ slug, onClose }: { slug: string; onClose: () => void }) {
  const qrUrl = `/api/qr/${slug}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-t-3xl bg-white p-6 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Scanner ce QR code</h2>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrUrl}
            alt="QR code de la carte"
            className="h-56 w-56 rounded-xl border border-slate-100 shadow-sm"
          />
          <p className="text-center text-sm text-slate-500">
            Pointez votre appareil photo sur ce code pour accéder à ma carte de visite
          </p>
          <a
            href={qrUrl}
            download={`qrious-${slug}.png`}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white"
            style={{ backgroundColor: 'var(--brand-primary)' }}
          >
            <Download className="h-4 w-4" />
            Télécharger le QR code PNG
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function VCardTemplate({ pageData, slug }: VCardTemplateProps) {
  const [showQr, setShowQr] = useState(false)
  const [nfcStatus, setNfcStatus] = useState<'idle' | 'writing' | 'done' | 'error' | 'unsupported'>('idle')

  const { vcardData, theme, title } = pageData
  const logoUrl = resolveMediaUrl(theme?.logo)

  const displayName =
    vcardData?.fullName ||
    [vcardData?.firstName, vcardData?.lastName].filter(Boolean).join(' ') ||
    title

  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const cardColor = vcardData?.coverColor || theme?.primaryColor || '#0f172a'
  const vcardDownloadUrl = `/api/vcard/${slug}`
  const pageUrl = typeof window !== 'undefined' ? window.location.href : `/${slug}`

  // ── Web Share ─────────────────────────────────────────────────────────────
  const handleShare = useCallback(async () => {
    if (!navigator.share) {
      await navigator.clipboard.writeText(pageUrl)
      return
    }
    try {
      await navigator.share({
        title: displayName,
        text: vcardData?.jobTitle
          ? `${displayName} — ${vcardData.jobTitle}${vcardData.company ? ` @ ${vcardData.company}` : ''}`
          : displayName,
        url: pageUrl,
      })
    } catch {/* user cancelled */ }
  }, [displayName, vcardData, pageUrl])

  // ── NFC Write ─────────────────────────────────────────────────────────────
  const handleNfc = useCallback(async () => {
    // @ts-expect-error — Web NFC API not yet in TS lib
    if (typeof NDEFReader === 'undefined') {
      setNfcStatus('unsupported')
      setTimeout(() => setNfcStatus('idle'), 3000)
      return
    }
    setNfcStatus('writing')
    try {
      // @ts-expect-error — Web NFC API
      const ndef = new NDEFReader()
      await ndef.write({
        records: [{ recordType: 'url', data: pageUrl }],
      })
      setNfcStatus('done')
      setTimeout(() => setNfcStatus('idle'), 3000)
    } catch {
      setNfcStatus('error')
      setTimeout(() => setNfcStatus('idle'), 3000)
    }
  }, [pageUrl])

  // ── Social links ──────────────────────────────────────────────────────────
  const socialLinks = [
    { href: vcardData?.linkedinUrl, icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn', color: '#0a66c2' },
    { href: vcardData?.twitterUrl, icon: <Twitter className="h-5 w-5" />, label: 'Twitter / X', color: '#000000' },
    { href: vcardData?.instagramUrl, icon: <Instagram className="h-5 w-5" />, label: 'Instagram', color: '#e1306c' },
    { href: vcardData?.githubUrl, icon: <Github className="h-5 w-5" />, label: 'GitHub', color: '#24292e' },
    { href: vcardData?.youtubeUrl, icon: <Youtube className="h-5 w-5" />, label: 'YouTube', color: '#ff0000' },
  ].filter((l) => l.href)

  const hasContacts =
    vcardData?.phone || vcardData?.phoneWork || vcardData?.email || vcardData?.emailWork ||
    vcardData?.website || vcardData?.address

  return (
    <>
      {showQr && <QrModal slug={slug} onClose={() => setShowQr(false)} />}

      <article className="flex min-h-screen flex-col">
        {/* ── Hero Card ──────────────────────────────────────── */}
        <header
          className="relative flex flex-col items-center gap-5 px-6 pb-10 pt-12 text-center text-white"
          style={{
            background: `linear-gradient(160deg, ${cardColor} 0%, color-mix(in srgb, ${cardColor} 60%, #1e1b4b) 100%)`,
          }}
        >
          {/* Decorative bubbles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5" />
            <div className="absolute -bottom-8 -left-12 h-40 w-40 rounded-full bg-white/5" />
            <div className="absolute right-8 bottom-4 h-20 w-20 rounded-full bg-white/5" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-4">
            {/* Avatar */}
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt={displayName}
                className="h-24 w-24 rounded-full object-cover shadow-xl ring-4 ring-white/30"
              />
            ) : (
              <div
                className="flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold shadow-xl ring-4 ring-white/20"
                style={{ backgroundColor: 'color-mix(in srgb, white 15%, transparent)' }}
              >
                {initials || '?'}
              </div>
            )}

            {/* Name & title */}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold leading-tight">{displayName}</h1>
              {vcardData?.jobTitle && (
                <p className="text-base font-medium text-white/80">{vcardData.jobTitle}</p>
              )}
              {vcardData?.company && (
                <p className="flex items-center justify-center gap-1.5 text-sm text-white/60">
                  <Briefcase className="h-3.5 w-3.5" />
                  {vcardData.company}
                </p>
              )}
            </div>

            {/* Bio */}
            {vcardData?.bio && (
              <p className="max-w-xs text-center text-sm leading-relaxed text-white/75">
                {vcardData.bio}
              </p>
            )}
          </div>

          {/* Action bar */}
          <div className="relative z-10 grid w-full max-w-xs grid-cols-2 gap-3 pt-2">
            <a
              href={vcardDownloadUrl}
              download
              className="flex items-center justify-center gap-2 rounded-xl bg-white/15 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25 active:scale-95"
            >
              <UserPlus className="h-4 w-4" />
              Enregistrer
            </a>
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 rounded-xl bg-white/15 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25 active:scale-95"
            >
              <Share2 className="h-4 w-4" />
              Partager
            </button>
            <button
              onClick={() => setShowQr(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-white/15 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25 active:scale-95"
            >
              <QrCode className="h-4 w-4" />
              QR Code
            </button>
            <button
              onClick={handleNfc}
              className="flex items-center justify-center gap-2 rounded-xl bg-white/15 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25 active:scale-95"
              disabled={nfcStatus !== 'idle'}
            >
              <Nfc className="h-4 w-4" />
              {nfcStatus === 'idle' && 'NFC'}
              {nfcStatus === 'writing' && 'Écriture…'}
              {nfcStatus === 'done' && '✓ Écrit !'}
              {nfcStatus === 'error' && '✗ Erreur'}
              {nfcStatus === 'unsupported' && 'Non dispo'}
            </button>
          </div>
        </header>

        {/* ── Content ────────────────────────────────────────── */}
        <div className="flex-1 space-y-5 px-4 py-6">

          {/* Contacts */}
          {hasContacts && (
            <section className="space-y-3" aria-label="Coordonnées">
              <h2 className="px-1 text-xs font-semibold uppercase tracking-widest text-slate-400">Coordonnées</h2>
              <div className="space-y-2">
                {vcardData?.phone && (
                  <ContactRow
                    icon={<Phone className="h-4 w-4" />}
                    label="Téléphone"
                    href={`tel:${vcardData.phone}`}
                    value={vcardData.phone}
                    copyable
                  />
                )}
                {vcardData?.phoneWork && (
                  <ContactRow
                    icon={<Phone className="h-4 w-4" />}
                    label="Tél. professionnel"
                    href={`tel:${vcardData.phoneWork}`}
                    value={vcardData.phoneWork}
                    copyable
                  />
                )}
                {vcardData?.email && (
                  <ContactRow
                    icon={<Mail className="h-4 w-4" />}
                    label="Email"
                    href={`mailto:${vcardData.email}`}
                    value={vcardData.email}
                    copyable
                  />
                )}
                {vcardData?.emailWork && (
                  <ContactRow
                    icon={<Mail className="h-4 w-4" />}
                    label="Email professionnel"
                    href={`mailto:${vcardData.emailWork}`}
                    value={vcardData.emailWork}
                    copyable
                  />
                )}
                {vcardData?.website && (
                  <ContactRow
                    icon={<Globe className="h-4 w-4" />}
                    label="Site web"
                    href={vcardData.website}
                    value={vcardData.website.replace(/^https?:\/\//, '')}
                  />
                )}
                {vcardData?.address && (
                  <ContactRow
                    icon={<MapPin className="h-4 w-4" />}
                    label="Adresse"
                    href={`https://maps.google.com/?q=${encodeURIComponent(vcardData.address)}`}
                    value={vcardData.address}
                  />
                )}
              </div>
            </section>
          )}

          {/* Calendly CTA */}
          {vcardData?.calendlyUrl && (
            <section aria-label="Prise de rendez-vous">
              <a
                href={vcardData.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl py-4 text-base font-bold text-white shadow-lg transition hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: cardColor }}
              >
                <Calendar className="h-5 w-5" />
                Prendre un rendez-vous
                <ExternalLink className="h-4 w-4 opacity-70" />
              </a>
            </section>
          )}

          {/* Social links */}
          {socialLinks.length > 0 && (
            <section className="space-y-3" aria-label="Réseaux sociaux">
              <h2 className="px-1 text-xs font-semibold uppercase tracking-widest text-slate-400">Réseaux</h2>
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
                {socialLinks.map((link) => (
                  <SocialLink key={link.label} {...link} href={link.href!} />
                ))}
              </div>
            </section>
          )}

          {/* vCard download CTA */}
          <section className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center" aria-label="Télécharger le contact">
            <div
              className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-white"
              style={{ backgroundColor: cardColor }}
            >
              <Download className="h-6 w-6" />
            </div>
            <h3 className="mb-1 text-sm font-semibold text-slate-900">Ajouter à mes contacts</h3>
            <p className="mb-4 text-xs text-slate-500">
              Téléchargez le fichier .vcf pour importer directement dans iOS, Android ou Outlook.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href={vcardDownloadUrl}
                download
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition hover:opacity-90"
                style={{ backgroundColor: cardColor }}
              >
                <UserPlus className="h-4 w-4" />
                Télécharger .vcf
              </a>
              <button
                onClick={() => setShowQr(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <QrCode className="h-4 w-4" />
                Afficher QR
              </button>
            </div>
          </section>

          {/* NFC info */}
          <p className="pb-2 text-center text-xs text-slate-400">
            📶 Approchez votre smartphone NFC pour transférer cette carte instantanément
          </p>
        </div>
      </article>
    </>
  )
}
