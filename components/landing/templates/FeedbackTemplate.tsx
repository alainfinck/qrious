'use client'

import { useState } from 'react'
import {
  Star,
  Check,
  Send,
  ExternalLink,
  MessageCircleQuestion,
  Smile,
  AlertCircle,
} from 'lucide-react'

import { resolveMediaUrl } from '@/components/landing/utils'
import type { LandingPageTemplateProps } from '@/types/landing-page'

export function FeedbackTemplate({ pageData }: LandingPageTemplateProps) {
  const { feedbackData, theme } = pageData
  const logoUrl = resolveMediaUrl(theme?.logo)

  const [rating, setRating] = useState<number | null>(null)
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!feedbackData) {
    return (
      <div className="flex h-64 items-center justify-center p-6 text-center text-slate-500">
        Aucune donnée d&apos;avis configurée.
      </div>
    )
  }

  const handleRatingClick = (selected: number) => {
    setRating(selected)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    setLoading(true)
    // Simulate sending email/storing feedback
    await new Promise((resolve) => setTimeout(resolve, 800))
    setLoading(false)
    setFormSubmitted(true)
  }

  const isPositive = rating !== null && rating >= 4
  const isNegative = rating !== null && rating <= 3

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans text-slate-800">
      {/* ── Header ── */}
      <div className="mx-auto max-w-md px-4 pt-10 text-center">
        {logoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={feedbackData.companyName || 'Logo'}
            className="mx-auto mb-6 max-h-16 object-contain"
          />
        )}

        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          {feedbackData.companyName || pageData.title}
        </h1>

        {rating === null && (
          <>
            <h2 className="mt-4 text-base font-medium text-slate-600">
              {feedbackData.heading || 'Votre avis compte !'}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {feedbackData.subheading ||
                'Aidez-nous à nous améliorer en partageant votre expérience.'}
            </p>
          </>
        )}
      </div>

      <div className="mx-auto mt-8 max-w-sm px-4">
        {/* ── Star Selection Container ── */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-md">
          {rating === null ? (
            <div className="py-4">
              <p className="mb-4 text-sm font-semibold text-slate-600">
                Quelle a été la qualité de votre expérience ?
              </p>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = hoverRating !== null ? star <= hoverRating : star <= (rating || 0)
                  return (
                    <button
                      key={star}
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="group p-1 transition-all hover:scale-110 active:scale-95"
                      type="button"
                    >
                      <Star
                        className={`h-9 w-9 transition-colors ${
                          active
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200 group-hover:text-slate-300'
                        }`}
                      />
                    </button>
                  )
                })}
              </div>
              <div className="mt-4 flex justify-between px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                <span>Médiocre</span>
                <span>Excellent</span>
              </div>
            </div>
          ) : (
            // ── After Rating Header ──
            <div className="flex flex-col items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                <Smile className="h-6 w-6" />
              </span>
              <p className="mt-3 text-sm font-bold text-slate-800">
                Vous avez donné {rating} {rating > 1 ? 'étoiles' : 'étoile'}
              </p>
              <button
                onClick={() => {
                  setRating(null)
                  setFormSubmitted(false)
                  setComment('')
                }}
                className="mt-1 text-xs font-semibold text-slate-400 underline hover:text-slate-600"
              >
                Modifier ma note
              </button>
            </div>
          )}
        </div>

        {/* ── Case 1: Positive Rating (4-5 Stars) ── */}
        {isPositive && (
          <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm">
              <p className="text-sm font-medium text-slate-700">
                Merci infiniment ! Si vous avez quelques secondes, pourriez-vous copier votre avis sur nos plateformes publiques ?
              </p>
            </div>

            <div className="grid gap-3">
              {feedbackData.googleReviewUrl && (
                <a
                  href={feedbackData.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-[0.98]"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-bold text-lg">
                    G
                  </span>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Laisser un avis sur</p>
                    <p className="text-sm font-bold text-slate-700">Google</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-400" />
                </a>
              )}

              {feedbackData.tripadvisorUrl && (
                <a
                  href={feedbackData.tripadvisorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-[0.98]"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 font-bold text-lg">
                    🦉
                  </span>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Laisser un avis sur</p>
                    <p className="text-sm font-bold text-slate-700">TripAdvisor</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-400" />
                </a>
              )}

              {feedbackData.trustpilotUrl && (
                <a
                  href={feedbackData.trustpilotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-[0.98]"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 font-bold text-lg">
                    ★
                  </span>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Laisser un avis sur</p>
                    <p className="text-sm font-bold text-slate-700">Trustpilot</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-400" />
                </a>
              )}

              {feedbackData.customReviewUrl && (
                <a
                  href={feedbackData.customReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-[0.98]"
                >
                  <span
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-white font-bold"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    ★
                  </span>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Laisser un avis sur</p>
                    <p className="text-sm font-bold text-slate-700">
                      {feedbackData.customReviewLabel || 'Notre Plateforme'}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-400" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* ── Case 2: Negative/Neutral Rating (1-3 Stars) ── */}
        {isNegative && (
          <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {feedbackData.enableDirectForm ? (
              !formSubmitted ? (
                <form
                  onSubmit={handleFormSubmit}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4"
                >
                  <div className="flex items-start gap-3 text-slate-600">
                    <MessageCircleQuestion className="h-5 w-5 mt-0.5 text-slate-400" />
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">
                        {feedbackData.promptQuestion || "Qu'aurions-nous pu mieux faire ?"}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        Votre retour sera envoyé directement à notre direction en toute confidentialité.
                      </p>
                    </div>
                  </div>

                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Écrivez vos remarques ici..."
                    required
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs shadow-inner placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />

                  <button
                    type="submit"
                    disabled={loading || !comment.trim()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    <Send className="h-3.5 w-3.5" />
                    {loading ? 'Envoi...' : 'Envoyer mon avis'}
                  </button>
                </form>
              ) : (
                <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm flex flex-col items-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 mb-3">
                    <Check className="h-5 w-5" />
                  </span>
                  <h3 className="text-sm font-bold text-slate-800">Merci pour vos suggestions</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    Nous prenons vos remarques très au sérieux et ferons le nécessaire pour améliorer nos services.
                  </p>
                </div>
              )
            ) : (
              <div className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-medium text-slate-700">
                  Nous sommes navrés que votre expérience n&apos;ait pas été à la hauteur de vos attentes.
                </p>
                {feedbackData.directFormEmail && (
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    N&apos;hésitez pas à nous faire part de vos critiques par e-mail à :{' '}
                    <a
                      href={`mailto:${feedbackData.directFormEmail}`}
                      className="font-bold underline"
                      style={{ color: 'var(--brand-primary)' }}
                    >
                      {feedbackData.directFormEmail}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
