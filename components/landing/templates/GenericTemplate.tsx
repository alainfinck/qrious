import { ExternalLink, Mail, Phone, Globe } from 'lucide-react'

import { resolveMediaUrl } from '@/components/landing/utils'
import type { LandingPageTemplateProps } from '@/types/landing-page'

export function GenericTemplate({ pageData }: LandingPageTemplateProps) {
  const { genericData, theme, title } = pageData
  const logoUrl = resolveMediaUrl(theme?.logo)

  if (!genericData) {
    return (
      <div className="flex h-64 items-center justify-center p-6 text-center text-slate-500">
        Aucune donnée configurée.
      </div>
    )
  }

  const headline = genericData.headline || title
  const sections = genericData.sections?.filter((s) => s.title) ?? []

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans text-slate-800">
      <div className="mx-auto max-w-md px-4 pt-10">
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoUrl} alt={headline} className="mx-auto mb-6 max-h-16 object-contain" />
        ) : null}

        <h1 className="text-center text-2xl font-bold tracking-tight text-slate-900">{headline}</h1>

        {genericData.subheadline ? (
          <p className="mt-2 text-center text-base text-slate-500">{genericData.subheadline}</p>
        ) : null}

        {genericData.body ? (
          <p className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
            {genericData.body}
          </p>
        ) : null}

        {(genericData.ctaUrl || genericData.secondaryCtaUrl) && (
          <div className="mt-8 flex flex-col gap-3">
            {genericData.ctaUrl ? (
              <a
                href={genericData.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-4 py-3 text-sm font-semibold text-white"
              >
                {genericData.ctaLabel || 'En savoir plus'}
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
            {genericData.secondaryCtaUrl ? (
              <a
                href={genericData.secondaryCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800"
              >
                {genericData.secondaryCtaLabel || 'Lien secondaire'}
              </a>
            ) : null}
          </div>
        )}

        {sections.length > 0 ? (
          <div className="mt-10 space-y-4">
            {sections.map((section, index) => (
              <section
                key={section.id ?? `${section.title}-${index}`}
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <h2 className="text-sm font-semibold text-slate-900">{section.title}</h2>
                {section.body ? (
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                    {section.body}
                  </p>
                ) : null}
              </section>
            ))}
          </div>
        ) : null}

        {(genericData.websiteUrl || genericData.contactEmail || genericData.contactPhone) && (
          <div className="mt-10 space-y-3 border-t border-slate-200 pt-6 text-sm">
            {genericData.websiteUrl ? (
              <a
                href={genericData.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <Globe className="h-4 w-4 shrink-0" />
                {genericData.websiteUrl.replace(/^https?:\/\//, '')}
              </a>
            ) : null}
            {genericData.contactEmail ? (
              <a
                href={`mailto:${genericData.contactEmail}`}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {genericData.contactEmail}
              </a>
            ) : null}
            {genericData.contactPhone ? (
              <a
                href={`tel:${genericData.contactPhone}`}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {genericData.contactPhone}
              </a>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}
