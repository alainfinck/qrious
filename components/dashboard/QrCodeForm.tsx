'use client'

import { useMemo, useState } from 'react'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { slugify } from '@/lib/dashboard/utils'
import type { LandingPage, LandingPageVertical } from '@/types/landing-page'

interface QrCodeFormProps {
  page?: LandingPage
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean } | void>
  submitLabel: string
}

const STEPS = [
  { id: 'identity', label: 'Identité', hint: 'Titre & univers' },
  { id: 'content', label: 'Contenu', hint: 'Landing page' },
  { id: 'publish', label: 'Publication', hint: 'Statut & marque' },
] as const

const VERTICALS: {
  value: LandingPageVertical
  label: string
  model: string
  fields: string[]
}[] = [
  {
    value: 'generic',
    label: 'Générique',
    model: 'Page libre',
    fields: ['Titre', 'Texte', 'Boutons', 'Sections'],
  },
  {
    value: 'art',
    label: 'Art',
    model: 'Fiche œuvre',
    fields: ['Artiste', 'Œuvre', 'Prix', 'Expo'],
  },
  {
    value: 'immo',
    label: 'Immobilier',
    model: 'Bien / gîte',
    fields: ['Bien', 'Accueil', 'WiFi', 'Contacts'],
  },
  {
    value: 'vcard',
    label: 'vCard',
    model: 'Carte de visite',
    fields: ['Identité', 'Coords', 'Réseaux', 'RDV'],
  },
  {
    value: 'product',
    label: 'Produit',
    model: 'Manuel produit',
    fields: ['Infos', 'Manuels', 'Garantie', 'Support'],
  },
  {
    value: 'feedback',
    label: 'Avis',
    model: 'Collecte d’avis',
    fields: ['Messages', 'Plateformes', 'Privé'],
  },
  {
    value: 'tourism',
    label: 'Tourisme',
    model: 'Fiche lieu',
    fields: ['Lieu', 'Médias', 'Pratique', 'À voir'],
  },
  {
    value: 'chrd',
    label: 'CHRD (Hôtel/Resto)',
    model: 'Menu & Expérience',
    fields: ['Établissement', 'Menu PDF', 'Wi-Fi', 'Carte Postale'],
  },
  {
    value: 'corporate_event',
    label: 'Événement Pro',
    model: 'Séminaire & Live',
    fields: ['Événement', 'Live Wall', 'Programme', 'Wi-Fi'],
  },
  {
    value: 'ugc_retail',
    label: 'Retail & UGC',
    model: 'Concours Photo',
    fields: ['Marque', 'Partage Photo', 'Code Promo', 'Règlement'],
  },
  {
    value: 'field_service',
    label: 'Field Service',
    model: 'Maintenance Machine',
    fields: ['Équipement', 'Inspect', 'Documentation', 'Tickets'],
  },
]

const CONTENT_TABS: Record<LandingPageVertical, { id: string; label: string }[]> = {
  generic: [
    { id: 'content', label: 'Contenu' },
    { id: 'actions', label: 'Actions' },
    { id: 'contact', label: 'Contact' },
  ],
  art: [
    { id: 'artist', label: 'Artiste' },
    { id: 'work', label: 'Œuvre' },
    { id: 'price', label: 'Prix' },
    { id: 'expo', label: 'Expo' },
    { id: 'links', label: 'Liens' },
  ],
  immo: [
    { id: 'property', label: 'Bien' },
    { id: 'welcome', label: 'Accueil' },
    { id: 'stay', label: 'Séjour' },
    { id: 'contacts', label: 'Contacts' },
  ],
  vcard: [
    { id: 'identity', label: 'Identité' },
    { id: 'coords', label: 'Coordonnées' },
    { id: 'social', label: 'Réseaux' },
    { id: 'booking', label: 'RDV' },
  ],
  product: [
    { id: 'info', label: 'Produit' },
    { id: 'docs', label: 'Manuels' },
    { id: 'warranty', label: 'Garantie' },
    { id: 'support', label: 'Support' },
  ],
  feedback: [
    { id: 'messages', label: 'Messages' },
    { id: 'platforms', label: 'Plateformes' },
    { id: 'private', label: 'Privé' },
  ],
  tourism: [
    { id: 'place', label: 'Lieu' },
    { id: 'media', label: 'Médias' },
    { id: 'practical', label: 'Pratique' },
    { id: 'poi', label: 'À voir' },
  ],
  chrd: [
    { id: 'info', label: 'Établissement' },
    { id: 'menu', label: 'Menu & Services' },
  ],
  corporate_event: [
    { id: 'info', label: 'Événement' },
    { id: 'agenda', label: 'Agenda' },
  ],
  ugc_retail: [
    { id: 'info', label: 'Offre' },
    { id: 'campaign', label: 'Participation' },
  ],
  field_service: [
    { id: 'info', label: 'Équipement' },
    { id: 'maintenance', label: 'Maintenance' },
  ],
}

const selectClassName =
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'

export function QrCodeForm({ page, action, submitLabel }: QrCodeFormProps) {
  const [step, setStep] = useState(0)
  const [title, setTitle] = useState(page?.title ?? '')
  const [slug, setSlug] = useState(page?.slug ?? '')
  const [vertical, setVertical] = useState<LandingPageVertical>(page?.vertical ?? 'generic')
  const [status, setStatus] = useState<'draft' | 'published'>(page?.status ?? 'draft')
  const [dpe, setDpe] = useState(page?.immoData?.dpe ?? '')
  const [contentTab, setContentTab] = useState(CONTENT_TABS[page?.vertical ?? 'generic'][0].id)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [pending, setPending] = useState(false)

  const previewSlug = useMemo(() => slugify(slug || title || 'mon-qr-code'), [slug, title])
  const verticalMeta = VERTICALS.find((v) => v.value === vertical)
  const tabs = CONTENT_TABS[vertical]

  function changeVertical(next: LandingPageVertical) {
    setVertical(next)
    setContentTab(CONTENT_TABS[next][0].id)
  }

  function goNext() {
    if (step === 0 && !title.trim()) {
      setError('Le titre est obligatoire.')
      return
    }
    setError(null)
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  function goBack() {
    setError(null)
    setStep((s) => Math.max(s - 1, 0))
  }

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    setSuccess(false)
    formData.set('vertical', vertical)
    formData.set('status', status)
    formData.set('slug', previewSlug)
    if (dpe) formData.set('dpe', dpe)

    const result = await action(formData)
    if (result && 'error' in result && result.error) {
      setError(result.error)
      setPending(false)
    } else if (result && 'success' in result && result.success) {
      setSuccess(true)
      setPending(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Step indicator */}
      <nav aria-label="Étapes" className="rounded-xl border border-slate-200/80 bg-white p-2 shadow-sm">
        <ol className="grid grid-cols-3 gap-1">
          {STEPS.map((item, index) => {
            const active = index === step
            const done = index < step
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    if (index > 0 && !title.trim()) {
                      setError('Le titre est obligatoire.')
                      return
                    }
                    setError(null)
                    setStep(index)
                  }}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors',
                    active && 'bg-slate-900 text-white',
                    !active && done && 'bg-slate-50 text-slate-700 hover:bg-slate-100',
                    !active && !done && 'text-slate-400 hover:bg-slate-50 hover:text-slate-600',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                      active && 'bg-white/20 text-white',
                      done && !active && 'bg-emerald-100 text-emerald-700',
                      !active && !done && 'bg-slate-100 text-slate-500',
                    )}
                  >
                    {done && !active ? <Check className="h-3.5 w-3.5" /> : index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{item.label}</span>
                    <span
                      className={cn(
                        'hidden truncate text-xs sm:block',
                        active ? 'text-white/70' : 'text-slate-400',
                      )}
                    >
                      {item.hint}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Step panels — kept mounted to preserve uncontrolled field values */}
      <div className={cn(step !== 0 && 'hidden')}>
        <Section
          title="Identité du QR"
          description="Chaque style charge son propre modèle de champs — choisissez celui qui correspond à votre usage."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  if (!page) setSlug(slugify(e.target.value))
                }}
                placeholder="Ex. Exposition Lumière 2026"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug URL</Label>
              <Input
                id="slug"
                name="slug"
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                placeholder="exposition-lumiere-2026"
              />
              <p className="font-mono text-xs text-muted-foreground">/{previewSlug}</p>
            </div>

            <div className="space-y-2">
              <Label>Modèle sélectionné</Label>
              <div className="flex h-9 items-center rounded-md border border-dashed border-slate-200 bg-slate-50 px-3 text-sm text-slate-600">
                {verticalMeta?.model ?? '—'} · {status === 'published' ? 'Publié' : 'Brouillon'}
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <Label>Style / modèle</Label>
            <p className="text-xs text-muted-foreground">
              Les informations demandées à l’étape suivante changent selon le modèle choisi.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {VERTICALS.map((item) => {
                const selected = vertical === item.value
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => changeVertical(item.value)}
                    className={cn(
                      'rounded-xl border px-3.5 py-3 text-left transition-colors',
                      selected
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
                    )}
                  >
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold">{item.label}</span>
                      <span
                        className={cn(
                          'text-[11px] font-medium uppercase tracking-wide',
                          selected ? 'text-mq-signal' : 'text-slate-400',
                        )}
                      >
                        {item.model}
                      </span>
                    </span>
                    <span
                      className={cn(
                        'mt-2 flex flex-wrap gap-1',
                        selected ? 'text-white/70' : 'text-slate-500',
                      )}
                    >
                      {item.fields.map((field) => (
                        <span
                          key={field}
                          className={cn(
                            'rounded-md px-1.5 py-0.5 text-[11px]',
                            selected ? 'bg-white/10' : 'bg-slate-100',
                          )}
                        >
                          {field}
                        </span>
                      ))}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </Section>
      </div>

      <div className={cn(step !== 1 && 'hidden')}>
        <Section
          title={`Contenu — ${verticalMeta?.model ?? verticalMeta?.label ?? ''}`}
          description="Champs propres à ce modèle. Remplissez uniquement ce qui est utile."
        >
          <div className="mb-4 flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setContentTab(tab.id)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  contentTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {vertical === 'generic' ? <GenericFields page={page} tab={contentTab} /> : null}
          {vertical === 'art' ? <ArtFields page={page} tab={contentTab} /> : null}
          {vertical === 'immo' ? (
            <ImmoFields page={page} tab={contentTab} dpe={dpe} setDpe={setDpe} />
          ) : null}
          {vertical === 'vcard' ? <VcardFields page={page} tab={contentTab} /> : null}
          {vertical === 'product' ? <ProductFields page={page} tab={contentTab} /> : null}
          {vertical === 'feedback' ? <FeedbackFields page={page} tab={contentTab} /> : null}
          {vertical === 'tourism' ? <TourismFields page={page} tab={contentTab} /> : null}
        </Section>
      </div>

      <div className={cn(step !== 2 && 'hidden')}>
        <Section title="Publication" description="Apparence et statut avant génération du QR.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Statut</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as 'draft' | 'published')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="published">Publié</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryColor">Couleur de marque</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  name="primaryColor"
                  defaultValue={page?.theme?.primaryColor || '#0f172a'}
                  placeholder="#0f172a"
                  className="font-mono"
                />
              </div>
            </div>
          </div>

          <dl className="mt-5 grid gap-3 rounded-lg border border-slate-100 bg-slate-50/80 p-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400">Titre</dt>
              <dd className="mt-1 font-medium text-slate-800">{title || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400">URL</dt>
              <dd className="mt-1 font-mono text-slate-800">/{previewSlug}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400">Modèle</dt>
              <dd className="mt-1 font-medium text-slate-800">
                {verticalMeta?.label}
                {verticalMeta?.model ? (
                  <span className="font-normal text-slate-500"> · {verticalMeta.model}</span>
                ) : null}
              </dd>
            </div>
          </dl>
        </Section>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Modifications enregistrées avec succès.
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <Button type="button" variant="outline" onClick={goBack} disabled={step === 0 || pending}>
          <ChevronLeft className="h-4 w-4" />
          Retour
        </Button>

        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={goNext}>
            Continuer
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={pending}>
            {pending ? 'Enregistrement…' : submitLabel}
          </Button>
        )}
      </div>
    </form>
  )
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  )
}

function Panel({ active, children }: { active: boolean; children: React.ReactNode }) {
  return <div className={cn('grid gap-4 sm:grid-cols-2', !active && 'hidden')}>{children}</div>
}

function Field({
  id,
  label,
  defaultValue,
  type = 'text',
  className,
  placeholder,
}: {
  id: string
  label: string
  defaultValue?: string | null
  type?: string
  className?: string
  placeholder?: string
}) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} defaultValue={defaultValue ?? ''} placeholder={placeholder} />
    </div>
  )
}

function TextAreaField({
  id,
  label,
  defaultValue,
  className,
  placeholder,
  rows = 3,
}: {
  id: string
  label: string
  defaultValue?: string | null
  className?: string
  placeholder?: string
  rows?: number
}) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={id}>{label}</Label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        defaultValue={defaultValue ?? ''}
        placeholder={placeholder}
        className="flex min-h-[72px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  )
}

function GenericFields({ page, tab }: { page?: LandingPage; tab: string }) {
  return (
    <>
      <Panel active={tab === 'content'}>
        <Field
          id="genericHeadline"
          label="Titre affiché"
          defaultValue={page?.genericData?.headline}
          placeholder="Titre de la page"
          className="sm:col-span-2"
        />
        <Field
          id="genericSubheadline"
          label="Sous-titre"
          defaultValue={page?.genericData?.subheadline}
          placeholder="Une phrase d’accroche"
          className="sm:col-span-2"
        />
        <TextAreaField
          id="genericBody"
          label="Texte principal"
          defaultValue={page?.genericData?.body}
          className="sm:col-span-2"
          placeholder="Présentez votre contenu…"
          rows={4}
        />
        <TextAreaField
          id="genericSections"
          label="Sections (Titre : Contenu)"
          defaultValue={page?.genericData?.sections?.map((s) => `${s.title} : ${s.body}`).join('\n')}
          className="sm:col-span-2"
          placeholder={"Horaires : Ouvert du mar. au sam.\nAccès : Métro ligne 1"}
          rows={4}
        />
      </Panel>

      <Panel active={tab === 'actions'}>
        <Field id="genericCtaLabel" label="Bouton principal" defaultValue={page?.genericData?.ctaLabel} placeholder="Réserver" />
        <Field id="genericCtaUrl" label="URL bouton principal" defaultValue={page?.genericData?.ctaUrl} placeholder="https://…" />
        <Field id="genericSecondaryCtaLabel" label="Bouton secondaire" defaultValue={page?.genericData?.secondaryCtaLabel} placeholder="En savoir plus" />
        <Field id="genericSecondaryCtaUrl" label="URL bouton secondaire" defaultValue={page?.genericData?.secondaryCtaUrl} placeholder="https://…" />
      </Panel>

      <Panel active={tab === 'contact'}>
        <Field id="genericWebsiteUrl" label="Site web" defaultValue={page?.genericData?.websiteUrl} className="sm:col-span-2" />
        <Field id="genericContactEmail" label="Email" type="email" defaultValue={page?.genericData?.contactEmail} />
        <Field id="genericContactPhone" label="Téléphone" defaultValue={page?.genericData?.contactPhone} />
      </Panel>
    </>
  )
}

function ArtFields({ page, tab }: { page?: LandingPage; tab: string }) {
  return (
    <>
      <Panel active={tab === 'artist'}>
        <Field id="artistName" label="Nom" defaultValue={page?.artData?.artistName} placeholder="Claude Monet" className="sm:col-span-2" />
        <Field id="artistNationality" label="Nationalité" defaultValue={page?.artData?.artistNationality} placeholder="Français" />
        <Field id="artistBirthYear" label="Naissance" defaultValue={page?.artData?.artistBirthYear} placeholder="1985" />
        <TextAreaField id="artistBio" label="Biographie" defaultValue={page?.artData?.artistBio} className="sm:col-span-2" placeholder="Courte bio…" rows={3} />
      </Panel>

      <Panel active={tab === 'work'}>
        <Field id="artYear" label="Année" defaultValue={page?.artData?.year} placeholder="2024" />
        <Field id="medium" label="Médium" defaultValue={page?.artData?.medium} placeholder="Huile sur toile" />
        <Field id="dimensions" label="Dimensions" defaultValue={page?.artData?.dimensions} placeholder="80 × 60 cm" />
        <Field id="series" label="Série" defaultValue={page?.artData?.series} placeholder="Lumière bleue" />
        <Field id="edition" label="Édition" defaultValue={page?.artData?.edition} placeholder="3/10" />
        <Field id="certificate" label="Certificat" defaultValue={page?.artData?.certificate} placeholder="Certificat signé" />
        <TextAreaField id="artDescription" label="Description" defaultValue={page?.artData?.description} className="sm:col-span-2" placeholder="Note sur l’œuvre…" rows={3} />
      </Panel>

      <Panel active={tab === 'price'}>
        <Field id="artPrice" label="Prix" type="number" defaultValue={page?.artData?.price?.toString()} placeholder="1200" />
        <div className="space-y-1.5">
          <Label htmlFor="currency">Devise</Label>
          <select id="currency" name="currency" defaultValue={page?.artData?.currency ?? 'EUR'} className={selectClassName}>
            <option value="EUR">€ EUR</option>
            <option value="USD">$ USD</option>
            <option value="GBP">£ GBP</option>
            <option value="CHF">CHF</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" id="available" name="available" defaultChecked={page?.artData?.available ?? true} className="h-4 w-4 rounded border-slate-300" />
          Disponible
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" id="sold" name="sold" defaultChecked={page?.artData?.sold ?? false} className="h-4 w-4 rounded border-slate-300" />
          Vendu
        </label>
      </Panel>

      <Panel active={tab === 'expo'}>
        <Field id="exhibitionName" label="Exposition" defaultValue={page?.artData?.exhibitionName} placeholder="Art Paris 2025" className="sm:col-span-2" />
        <Field id="exhibitionLocation" label="Lieu" defaultValue={page?.artData?.exhibitionLocation} placeholder="Galerie du Soleil, Paris" />
        <Field id="exhibitionDates" label="Dates" defaultValue={page?.artData?.exhibitionDates} placeholder="15 jan. – 10 mars 2025" />
      </Panel>

      <Panel active={tab === 'links'}>
        <Field id="videoUrl" label="Vidéo" defaultValue={page?.artData?.videoUrl} placeholder="https://youtube.com/…" className="sm:col-span-2" />
        <Field id="audioGuideUrl" label="Audio-guide" defaultValue={page?.artData?.audioGuideUrl} placeholder="https://soundcloud.com/…" className="sm:col-span-2" />
        <Field id="instagramUsername" label="Instagram" defaultValue={page?.artData?.instagramUsername} placeholder="@artiste" />
        <Field id="websiteUrl" label="Site web" defaultValue={page?.artData?.websiteUrl} placeholder="https://artiste.fr" />
        <Field id="shopUrl" label="Lien d’achat" defaultValue={page?.artData?.shopUrl} placeholder="https://shop…" className="sm:col-span-2" />
        <Field id="contactEmail" label="Email acquisition" type="email" defaultValue={page?.artData?.contactEmail} placeholder="contact@galerie.fr" className="sm:col-span-2" />
      </Panel>
    </>
  )
}

function ImmoFields({
  page,
  tab,
  dpe,
  setDpe,
}: {
  page?: LandingPage
  tab: string
  dpe: string
  setDpe: (v: string) => void
}) {
  return (
    <>
      <Panel active={tab === 'property'}>
        <div className="space-y-1.5">
          <Label htmlFor="propertyType">Type</Label>
          <select id="propertyType" name="propertyType" defaultValue={page?.immoData?.propertyType ?? ''} className={selectClassName}>
            <option value="">Sélectionner…</option>
            <option value="apartment">Appartement</option>
            <option value="house">Maison</option>
            <option value="gite">Gîte</option>
            <option value="villa">Villa</option>
            <option value="studio">Studio</option>
          </select>
        </div>
        <Field id="city" label="Ville" defaultValue={page?.immoData?.city} />
        <Field id="address" label="Adresse" defaultValue={page?.immoData?.address} className="sm:col-span-2" />
        <Field id="price" label="Prix (€/nuit ou total)" type="number" defaultValue={page?.immoData?.price?.toString()} />
        <Field id="surface" label="Surface (m²)" type="number" defaultValue={page?.immoData?.surface?.toString()} />
        <Field id="rooms" label="Pièces" type="number" defaultValue={page?.immoData?.rooms?.toString()} />
        <div className="space-y-1.5">
          <Label htmlFor="dpe">DPE</Label>
          <Select value={dpe || undefined} onValueChange={setDpe}>
            <SelectTrigger id="dpe">
              <SelectValue placeholder="—" />
            </SelectTrigger>
            <SelectContent>
              {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Field id="bookingUrl" label="URL réservation" defaultValue={page?.immoData?.bookingUrl} className="sm:col-span-2" />
      </Panel>

      <Panel active={tab === 'welcome'}>
        <TextAreaField id="welcomeMessage" label="Bienvenue" defaultValue={page?.immoData?.welcomeMessage} className="sm:col-span-2" placeholder="Message d’accueil…" rows={3} />
        <Field id="checkInTime" label="Arrivée" defaultValue={page?.immoData?.checkInTime} placeholder="15h00" />
        <Field id="checkOutTime" label="Départ" defaultValue={page?.immoData?.checkOutTime} placeholder="11h00" />
        <TextAreaField id="checkInInstructions" label="Instructions d’arrivée" defaultValue={page?.immoData?.checkInInstructions} className="sm:col-span-2" placeholder="Boîte à clé, codes…" rows={3} />
      </Panel>

      <Panel active={tab === 'stay'}>
        <Field id="wifiName" label="WiFi (SSID)" defaultValue={page?.immoData?.wifiName} placeholder="MonReseau" />
        <Field id="wifiPassword" label="Mot de passe WiFi" defaultValue={page?.immoData?.wifiPassword} />
        <TextAreaField id="houseRules" label="Règles (une par ligne)" defaultValue={page?.immoData?.houseRules} className="sm:col-span-2" placeholder={"Pas de fumée\nSilence après 22h"} rows={3} />
        <TextAreaField
          id="amenities"
          label="Équipements (un par ligne)"
          defaultValue={page?.immoData?.amenities?.map((a) => (typeof a === 'string' ? a : a.name)).join('\n')}
          className="sm:col-span-2"
          placeholder={"Piscine\nParking\nWiFi"}
          rows={3}
        />
        <TextAreaField id="localTips" label="Conseils locaux" defaultValue={page?.immoData?.localTips} className="sm:col-span-2" placeholder="Restos, balades…" rows={3} />
      </Panel>

      <Panel active={tab === 'contacts'}>
        <Field id="hostName" label="Hôte" defaultValue={page?.immoData?.hostName} placeholder="Marie Dupont" />
        <Field id="hostPhone" label="Téléphone" defaultValue={page?.immoData?.hostPhone} placeholder="+33 6…" />
        <Field id="hostEmail" label="Email" type="email" defaultValue={page?.immoData?.hostEmail} />
        <Field id="emergencyPhone" label="Urgence" defaultValue={page?.immoData?.emergencyPhone} placeholder="15 / 18 / 112" />
      </Panel>
    </>
  )
}

function VcardFields({ page, tab }: { page?: LandingPage; tab: string }) {
  return (
    <>
      <Panel active={tab === 'identity'}>
        <Field id="firstName" label="Prénom" defaultValue={page?.vcardData?.firstName} />
        <Field id="lastName" label="Nom" defaultValue={page?.vcardData?.lastName} />
        <Field id="fullName" label="Nom affiché" defaultValue={page?.vcardData?.fullName} className="sm:col-span-2" />
        <Field id="jobTitle" label="Fonction" defaultValue={page?.vcardData?.jobTitle} />
        <Field id="company" label="Entreprise" defaultValue={page?.vcardData?.company} />
        <TextAreaField id="bio" label="Bio" defaultValue={page?.vcardData?.bio} className="sm:col-span-2" rows={3} />
      </Panel>

      <Panel active={tab === 'coords'}>
        <Field id="phone" label="Tél. perso" defaultValue={page?.vcardData?.phone} />
        <Field id="phoneWork" label="Tél. pro" defaultValue={page?.vcardData?.phoneWork} />
        <Field id="email" label="Email perso" type="email" defaultValue={page?.vcardData?.email} />
        <Field id="emailWork" label="Email pro" type="email" defaultValue={page?.vcardData?.emailWork} />
        <Field id="website" label="Site web" defaultValue={page?.vcardData?.website} className="sm:col-span-2" />
        <Field id="vcardAddress" label="Adresse" defaultValue={page?.vcardData?.address} className="sm:col-span-2" />
      </Panel>

      <Panel active={tab === 'social'}>
        <Field id="linkedinUrl" label="LinkedIn" defaultValue={page?.vcardData?.linkedinUrl} className="sm:col-span-2" />
        <Field id="twitterUrl" label="X / Twitter" defaultValue={page?.vcardData?.twitterUrl} />
        <Field id="instagramUrl" label="Instagram" defaultValue={page?.vcardData?.instagramUrl} />
        <Field id="githubUrl" label="GitHub" defaultValue={page?.vcardData?.githubUrl} />
        <Field id="youtubeUrl" label="YouTube" defaultValue={page?.vcardData?.youtubeUrl} />
      </Panel>

      <Panel active={tab === 'booking'}>
        <Field id="calendlyUrl" label="Lien RDV" defaultValue={page?.vcardData?.calendlyUrl} placeholder="https://calendly.com/…" className="sm:col-span-2" />
        <Field id="coverColor" label="Couleur carte" defaultValue={page?.vcardData?.coverColor} placeholder="#1e3a5f" />
      </Panel>
    </>
  )
}

function ProductFields({ page, tab }: { page?: LandingPage; tab: string }) {
  return (
    <>
      <Panel active={tab === 'info'}>
        <Field id="productName" label="Nom" defaultValue={page?.productData?.productName} />
        <Field id="brandName" label="Marque" defaultValue={page?.productData?.brandName} />
        <Field id="modelNumber" label="Modèle / SKU" defaultValue={page?.productData?.modelNumber} className="sm:col-span-2" />
        <TextAreaField id="productDescription" label="Description" defaultValue={page?.productData?.description} className="sm:col-span-2" rows={3} />
        <TextAreaField
          id="quickStartSteps"
          label="Démarrage rapide (Titre : Explication)"
          defaultValue={page?.productData?.quickStartSteps?.map((s) => `${s.title} : ${s.description}`).join('\n')}
          className="sm:col-span-2"
          placeholder={"Allumer : maintenir Power 3s\nBluetooth : appairer le modèle"}
          rows={4}
        />
      </Panel>

      <Panel active={tab === 'docs'}>
        <Field id="manualUrl" label="Manuel PDF" defaultValue={page?.productData?.manualUrl} className="sm:col-span-2" />
        <Field id="videoTutorialUrl" label="Tutoriel vidéo" defaultValue={page?.productData?.videoTutorialUrl} className="sm:col-span-2" />
        <Field id="troubleshootingUrl" label="FAQ / Dépannage" defaultValue={page?.productData?.troubleshootingUrl} className="sm:col-span-2" />
      </Panel>

      <Panel active={tab === 'warranty'}>
        <Field id="warrantyDuration" label="Durée" defaultValue={page?.productData?.warrantyDuration} placeholder="2 ans" />
        <Field id="registrationUrl" label="Enregistrement" defaultValue={page?.productData?.registrationUrl} />
        <TextAreaField id="warrantyDetails" label="Détails" defaultValue={page?.productData?.warrantyDetails} className="sm:col-span-2" rows={3} />
      </Panel>

      <Panel active={tab === 'support'}>
        <Field id="supportEmail" label="Email support" type="email" defaultValue={page?.productData?.supportEmail} />
        <Field id="supportPhone" label="Tél. support" defaultValue={page?.productData?.supportPhone} />
      </Panel>
    </>
  )
}

function FeedbackFields({ page, tab }: { page?: LandingPage; tab: string }) {
  return (
    <>
      <Panel active={tab === 'messages'}>
        <Field id="companyName" label="Établissement" defaultValue={page?.feedbackData?.companyName} className="sm:col-span-2" />
        <Field id="feedbackHeading" label="Titre" defaultValue={page?.feedbackData?.heading ?? 'Votre avis compte !'} className="sm:col-span-2" />
        <TextAreaField
          id="feedbackSubheading"
          label="Message"
          defaultValue={page?.feedbackData?.subheading ?? 'Aidez-nous à nous améliorer en partageant votre expérience.'}
          className="sm:col-span-2"
          rows={2}
        />
      </Panel>

      <Panel active={tab === 'platforms'}>
        <Field id="googleReviewUrl" label="Google" defaultValue={page?.feedbackData?.googleReviewUrl} className="sm:col-span-2" />
        <Field id="tripadvisorUrl" label="TripAdvisor" defaultValue={page?.feedbackData?.tripadvisorUrl} className="sm:col-span-2" />
        <Field id="trustpilotUrl" label="Trustpilot" defaultValue={page?.feedbackData?.trustpilotUrl} className="sm:col-span-2" />
        <Field id="customReviewUrl" label="Autre lien" defaultValue={page?.feedbackData?.customReviewUrl} />
        <Field id="customReviewLabel" label="Nom plateforme" defaultValue={page?.feedbackData?.customReviewLabel} placeholder="Facebook" />
      </Panel>

      <Panel active={tab === 'private'}>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input
            type="checkbox"
            id="enableDirectForm"
            name="enableDirectForm"
            defaultChecked={page?.feedbackData?.enableDirectForm ?? true}
            className="h-4 w-4 rounded border-slate-300"
          />
          Formulaire privé pour notes 1–3 ★
        </label>
        <Field id="directFormEmail" label="Email destination" defaultValue={page?.feedbackData?.directFormEmail} />
        <Field
          id="promptQuestion"
          label="Question"
          defaultValue={page?.feedbackData?.promptQuestion ?? "Qu'aurions-nous pu mieux faire ?"}
        />
      </Panel>
    </>
  )
}

function TourismFields({ page, tab }: { page?: LandingPage; tab: string }) {
  return (
    <>
      <Panel active={tab === 'place'}>
        <Field id="placeName" label="Lieu" defaultValue={page?.tourismData?.placeName} />
        <Field id="locationName" label="Ville" defaultValue={page?.tourismData?.locationName} />
        <Field id="historicPeriod" label="Époque" defaultValue={page?.tourismData?.historicPeriod} className="sm:col-span-2" />
        <TextAreaField id="tourismDescription" label="Histoire" defaultValue={page?.tourismData?.description} className="sm:col-span-2" rows={4} />
      </Panel>

      <Panel active={tab === 'media'}>
        <Field id="tourismAudioGuideUrl" label="Audio-guide" defaultValue={page?.tourismData?.audioGuideUrl} className="sm:col-span-2" />
        <Field id="tourismVideoUrl" label="Vidéo" defaultValue={page?.tourismData?.videoUrl} className="sm:col-span-2" />
        <Field id="tourismWebsiteUrl" label="Site officiel" defaultValue={page?.tourismData?.websiteUrl} />
        <Field id="contactPhone" label="Téléphone" defaultValue={page?.tourismData?.contactPhone} />
      </Panel>

      <Panel active={tab === 'practical'}>
        <Field id="tourismAddress" label="Adresse" defaultValue={page?.tourismData?.address} className="sm:col-span-2" />
        <Field id="latitude" label="Latitude" defaultValue={page?.tourismData?.latitude} />
        <Field id="longitude" label="Longitude" defaultValue={page?.tourismData?.longitude} />
        <Field id="entryFee" label="Tarifs" defaultValue={page?.tourismData?.entryFee} className="sm:col-span-2" />
        <TextAreaField id="openingHours" label="Horaires" defaultValue={page?.tourismData?.openingHours} className="sm:col-span-2" rows={2} />
      </Panel>

      <Panel active={tab === 'poi'}>
        <TextAreaField
          id="pointsOfInterest"
          label="Points d’intérêt (Nom : Description)"
          defaultValue={page?.tourismData?.pointsOfInterest?.map((poi) => `${poi.name} : ${poi.description}`).join('\n')}
          className="sm:col-span-2"
          placeholder={"Rosace Ouest : vitrail du XIIIe…"}
          rows={5}
        />
      </Panel>
    </>
  )
}
