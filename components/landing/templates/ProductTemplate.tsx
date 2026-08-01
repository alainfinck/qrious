'use client'

import { useState } from 'react'
import {
  FileText,
  Play,
  HelpCircle,
  ShieldCheck,
  Mail,
  Phone,
  CheckCircle,
  ExternalLink,
  BookOpen,
} from 'lucide-react'

import { resolveMediaUrl } from '@/components/landing/utils'
import type { LandingPageTemplateProps } from '@/types/landing-page'

export function ProductTemplate({ pageData }: LandingPageTemplateProps) {
  const { productData, theme } = pageData
  const logoUrl = resolveMediaUrl(theme?.logo)

  // Track checked quick start steps
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({})

  if (!productData) {
    return (
      <div className="flex h-64 items-center justify-center p-6 text-center text-slate-500">
        Aucune donnée produit configurée.
      </div>
    )
  }

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const hasQuickStart = productData.quickStartSteps && productData.quickStartSteps.length > 0

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans text-slate-800">
      {/* ── Header / Hero ── */}
      <div
        className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pb-12 pt-8 text-center text-white"
        style={{ borderBottom: '3px solid var(--brand-primary)' }}
      >
        <div className="mx-auto flex max-w-sm flex-col items-center px-4">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={productData.brandName || 'Brand logo'}
              className="mb-4 max-h-12 object-contain"
            />
          ) : productData.brandName ? (
            <span className="mb-2 rounded bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-300">
              {productData.brandName}
            </span>
          ) : null}

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {productData.productName || pageData.title}
          </h1>

          {productData.modelNumber && (
            <p className="mt-1 text-xs font-mono text-slate-400">
              Modèle: {productData.modelNumber}
            </p>
          )}

          {productData.description && (
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {productData.description}
            </p>
          )}
        </div>

        {/* Ambient light effect */}
        <div
          className="absolute -top-10 left-1/2 -z-10 h-40 w-40 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        />
      </div>

      <div className="mx-auto -mt-6 max-w-md space-y-6 px-4">
        {/* ── Quick Actions / Links ── */}
        <div className="grid grid-cols-3 gap-3 rounded-2xl bg-white p-3 shadow-md border border-slate-100">
          {productData.manualUrl ? (
            <a
              href={productData.manualUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1.5 rounded-xl py-3.5 text-center transition-all hover:bg-slate-50 active:scale-95"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                <FileText className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-semibold text-slate-600 leading-tight">Manuel PDF</span>
            </a>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1.5 py-3.5 opacity-40">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-400">
                <FileText className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-semibold text-slate-400 leading-tight">Indisponible</span>
            </div>
          )}

          {productData.videoTutorialUrl ? (
            <a
              href={productData.videoTutorialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1.5 rounded-xl py-3.5 text-center transition-all hover:bg-slate-50 active:scale-95"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-600 text-white">
                <Play className="h-5 w-5 fill-white ml-0.5" />
              </span>
              <span className="text-[11px] font-semibold text-slate-600 leading-tight">Vidéo Guide</span>
            </a>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1.5 py-3.5 opacity-40">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-400">
                <Play className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-semibold text-slate-400 leading-tight">Pas de vidéo</span>
            </div>
          )}

          {productData.troubleshootingUrl ? (
            <a
              href={productData.troubleshootingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1.5 rounded-xl py-3.5 text-center transition-all hover:bg-slate-50 active:scale-95"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white">
                <HelpCircle className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-semibold text-slate-600 leading-tight">Dépannage</span>
            </a>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1.5 py-3.5 opacity-40">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-400">
                <HelpCircle className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-semibold text-slate-400 leading-tight">Pas d&apos;aide</span>
            </div>
          )}
        </div>

        {/* ── Quick Start Guide ── */}
        {hasQuickStart && (
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-800">
              <BookOpen className="h-5 w-5 text-indigo-600" style={{ color: 'var(--brand-primary)' }} />
              Guide de démarrage rapide
            </h2>
            <div className="space-y-4">
              {productData.quickStartSteps?.map((step, idx) => {
                const isDone = !!completedSteps[idx]
                return (
                  <button
                    key={step.id || idx}
                    onClick={() => toggleStep(idx)}
                    className="flex w-full items-start gap-3 rounded-xl border border-slate-50 bg-slate-50/50 p-3 text-left transition-all hover:bg-slate-50 active:scale-[0.99]"
                  >
                    <span className="mt-0.5 flex-shrink-0">
                      {isDone ? (
                        <CheckCircle
                          className="h-5 w-5 text-emerald-500 fill-emerald-50"
                        />
                      ) : (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-300 text-[10px] font-bold text-slate-400">
                          {idx + 1}
                        </span>
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-semibold transition-all ${
                          isDone ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {step.title}
                      </p>
                      {step.description && (
                        <p
                          className={`mt-1 text-xs transition-all leading-relaxed ${
                            isDone ? 'text-slate-400/80' : 'text-slate-500'
                          }`}
                        >
                          {step.description}
                        </p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Warranty Section ── */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div
            className="flex items-center gap-3 px-5 py-4 text-white"
            style={{ backgroundColor: 'var(--brand-primary)' }}
          >
            <ShieldCheck className="h-6 w-6 flex-shrink-0" />
            <div>
              <h2 className="text-sm font-bold">Garantie constructeur</h2>
              {productData.warrantyDuration && (
                <p className="text-xs text-slate-200">Durée : {productData.warrantyDuration}</p>
              )}
            </div>
          </div>
          <div className="p-5">
            {productData.warrantyDetails && (
              <p className="text-xs leading-relaxed text-slate-600 mb-4">
                {productData.warrantyDetails}
              </p>
            )}

            {productData.registrationUrl && (
              <a
                href={productData.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                Enregistrer mon produit
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        {/* ── Support & Contacts ── */}
        {(productData.supportEmail || productData.supportPhone) && (
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-slate-800">Besoin d&apos;assistance supplémentaire ?</h2>
            <div className="grid gap-3">
              {productData.supportEmail && (
                <a
                  href={`mailto:${productData.supportEmail}`}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 shadow-sm transition-all hover:bg-slate-50 active:scale-[0.98]"
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    <Mail className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Écrivez-nous</p>
                    <p className="truncate text-xs font-medium text-slate-700">{productData.supportEmail}</p>
                  </div>
                </a>
              )}

              {productData.supportPhone && (
                <a
                  href={`tel:${productData.supportPhone}`}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 shadow-sm transition-all hover:bg-slate-50 active:scale-[0.98]"
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    <Phone className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Appelez-nous</p>
                    <p className="truncate text-xs font-medium text-slate-700">{productData.supportPhone}</p>
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
