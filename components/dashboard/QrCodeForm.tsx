'use client'

import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Box,
  Building2,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  LayoutGrid,
  Palette,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  User,
  Utensils,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RichTextEditor } from '@/components/dashboard/RichTextEditor'
import { slugify } from '@/lib/dashboard/utils'
import { cn } from '@/lib/utils'
import type { LandingPage, LandingPageVertical } from '@/types/landing-page'

interface QrCodeFormProps {
  page?: LandingPage
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean } | void>
  submitLabel: string
  initialVertical?: LandingPageVertical
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
  category: string
  icon: LucideIcon
  description: string
  fields: string[]
}[] = [
  {
    value: 'generic' as const,
    label: 'Générique',
    model: 'Page libre',
    category: 'Général',
    icon: LayoutGrid,
    description: 'Une landing page polyvalente avec texte libre, boutons d’action et sections sur mesure.',
    fields: ['Titre', 'Texte', 'Boutons', 'Sections'],
  },
  {
    value: 'redirect' as const,
    label: 'Redirection URL',
    model: 'Lien direct',
    category: 'Général',
    icon: ArrowUpRight,
    description: 'Redirige directement vers une URL externe. Le nombre de scans est comptabilisé automatiquement.',
    fields: ['URL cible', 'Label', 'Stats scans'],
  },
  {
    value: 'chrd',
    label: 'CHRD (Hôtel/Resto)',
    model: 'Menu & Expérience',
    category: 'Hospitalité & Commerce',
    icon: Utensils,
    description: 'Menu numérique PDF, accès Wi-Fi instantané et cartes postales virtuelles.',
    fields: ['Établissement', 'Menu PDF', 'Wi-Fi', 'Carte Postale'],
  },
  {
    value: 'art',
    label: 'Art & Galerie',
    model: 'Fiche œuvre',
    category: 'Art & Événements',
    icon: Palette,
    description: 'Fiche d’œuvre d’art, biographie artiste, audio-guide et demande d’acquisition.',
    fields: ['Artiste', 'Œuvre', 'Prix', 'Expo'],
  },
  {
    value: 'immo',
    label: 'Immobilier & Gîte',
    model: 'Bien / location',
    category: 'Immobilier & Services',
    icon: Building2,
    description: 'Présentation de bien à vendre ou louer, livret d’accueil, code Wi-Fi et contacts.',
    fields: ['Bien', 'Accueil', 'WiFi', 'Contacts'],
  },
  {
    value: 'vcard',
    label: 'vCard Pro',
    model: 'Carte de visite',
    category: 'Général',
    icon: User,
    description: 'Carte de visite digitale interactive avec sauvegarde contact et prise de RDV.',
    fields: ['Identité', 'Coords', 'Réseaux', 'RDV'],
  },
  {
    value: 'product',
    label: 'Produit & Notice',
    model: 'Manuel produit',
    category: 'Immobilier & Services',
    icon: Box,
    description: 'Notice d’utilisation, enregistrement de garantie, manuels PDF et assistance.',
    fields: ['Infos', 'Manuels', 'Garantie', 'Support'],
  },
  {
    value: 'feedback',
    label: 'Avis & Satisfactions',
    model: 'Collecte d’avis',
    category: 'Hospitalité & Commerce',
    icon: Star,
    description: 'Collecte d’avis Google/TripAdvisor et filtre de réclamations privées.',
    fields: ['Messages', 'Plateformes', 'Privé'],
  },
  {
    value: 'tourism',
    label: 'Tourisme & Guide',
    model: 'Fiche lieu',
    category: 'Art & Événements',
    icon: Compass,
    description: 'Guide touristique enrichi avec points d’intérêt et infos pratiques.',
    fields: ['Lieu', 'Médias', 'Pratique', 'À voir'],
  },
  {
    value: 'corporate_event',
    label: 'Événement Corporate',
    model: 'Séminaire & Live',
    category: 'Art & Événements',
    icon: Calendar,
    description: 'Programme en direct, Live Wall photo des participants, réseau Wi-Fi événementiel.',
    fields: ['Événement', 'Live Wall', 'Programme', 'Wi-Fi'],
  },
  {
    value: 'ugc_retail',
    label: 'Retail & Concours UGC',
    model: 'Jeu Photo & Promo',
    category: 'Hospitalité & Commerce',
    icon: ShoppingBag,
    description: 'Jeu concours photo client, partage sur réseaux, codes promo et collecte de leads.',
    fields: ['Marque', 'Partage Photo', 'Code Promo', 'Règlement'],
  },
  {
    value: 'field_service',
    label: 'Field Service & Machine',
    model: 'Maintenance',
    category: 'Immobilier & Services',
    icon: Wrench,
    description: 'Fiche de maintenance d’équipement, journal d’inspection et déclaration d’incidents.',
    fields: ['Équipement', 'Inspect', 'Documentation', 'Tickets'],
  },
]

const CONTENT_TABS: Record<LandingPageVertical, { id: string; label: string }[]> = {
  generic: [
    { id: 'content', label: 'Contenu' },
    { id: 'actions', label: 'Actions' },
    { id: 'contact', label: 'Contact' },
  ],
  redirect: [
    { id: 'redirect', label: 'Redirection' },
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

export function QrCodeForm({ page, action, submitLabel, initialVertical }: QrCodeFormProps) {
  const [step, setStep] = useState(0)
  const [title, setTitle] = useState(page?.title ?? '')
  const [slug, setSlug] = useState(page?.slug ?? '')
  const [vertical, setVertical] = useState<LandingPageVertical>(
    page?.vertical ?? initialVertical ?? 'generic',
  )
  const [status, setStatus] = useState<'draft' | 'published'>(page?.status ?? 'draft')
  const [dpe, setDpe] = useState(page?.immoData?.dpe ?? '')
  const [contentTab, setContentTab] = useState(
    CONTENT_TABS[page?.vertical ?? initialVertical ?? 'generic'][0].id,
  )
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [pending, setPending] = useState(false)

  // Selector modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous')

  const previewSlug = useMemo(() => slugify(slug || title || 'mon-qr-code'), [slug, title])
  const verticalMeta = VERTICALS.find((v) => v.value === vertical)
  const tabs = CONTENT_TABS[vertical]
  const ActiveIcon = verticalMeta?.icon ?? LayoutGrid

  const filteredVerticals = useMemo(() => {
    return VERTICALS.filter((v) => {
      const matchCat = selectedCategory === 'Tous' || v.category === selectedCategory
      const query = searchQuery.trim().toLowerCase()
      const matchQuery =
        !query ||
        v.label.toLowerCase().includes(query) ||
        v.model.toLowerCase().includes(query) ||
        v.description.toLowerCase().includes(query) ||
        v.fields.some((f) => f.toLowerCase().includes(query))
      return matchCat && matchQuery
    })
  }, [selectedCategory, searchQuery])

  function changeVertical(next: LandingPageVertical) {
    setVertical(next)
    setContentTab(CONTENT_TABS[next][0].id)
  }

  function goNext(e?: React.MouseEvent | React.FormEvent | React.KeyboardEvent) {
    e?.preventDefault()
    if (step === 0 && !title.trim()) {
      setError('Le titre est obligatoire pour passer à l’étape suivante.')
      const titleInput = document.getElementById('title') as HTMLInputElement | null
      if (titleInput) {
        titleInput.focus()
        titleInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }
    setError(null)
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function goBack(e?: React.MouseEvent) {
    e?.preventDefault()
    setError(null)
    setStep((s) => Math.max(s - 1, 0))
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  async function handleSubmit(formData: FormData) {
    if (!title.trim()) {
      setError('Le titre est obligatoire.')
      setStep(0)
      const titleInput = document.getElementById('title') as HTMLInputElement | null
      if (titleInput) titleInput.focus()
      return
    }

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
    <form
      action={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && e.target instanceof HTMLInputElement && step < STEPS.length - 1) {
          e.preventDefault()
          goNext(e)
        }
      }}
      className="space-y-6"
    >
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
                  onClick={(e) => {
                    if (index > 0 && !title.trim()) {
                      setError('Le titre est obligatoire.')
                      const titleInput = document.getElementById('title') as HTMLInputElement | null
                      if (titleInput) titleInput.focus()
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
          title="Identité du QR Code"
          description="Renseignez le nom de votre projet et choisissez la landing page adaptée à votre activité."
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
                  if (error) setError(null)
                  if (!page) setSlug(slugify(e.target.value))
                }}
                placeholder="Ex. Exposition Lumière 2026"
                className={cn(!title.trim() && error && 'border-red-500 ring-2 ring-red-500/20')}
                required
              />
              {!title.trim() && error ? (
                <p className="text-xs font-semibold text-red-600 animate-fadeIn">
                  ⚠️ Le titre est obligatoire pour pouvoir continuer.
                </p>
              ) : null}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="slug">Slug URL (Lien personnalisé)</Label>
              <Input
                id="slug"
                name="slug"
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                placeholder="exposition-lumiere-2026"
              />
              <p className="font-mono text-xs text-muted-foreground">
                URL scannée : /{previewSlug}
              </p>
            </div>
          </div>

          {/* SÉLECTEUR DE STYLE / MODÈLE AVEC DROPDOWN ET MODAL */}
          <div className="mt-8 space-y-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-bold text-slate-900">
                  Modèle & Style de QR Code
                </Label>
                <p className="text-xs text-slate-500 leading-normal">
                  Définit la structure et les fonctionnalités de la page scannée.
                </p>
              </div>

              {/* ACTION GROUP (DROPDOWN + CATALOGUE MODAL) */}
              <div className="flex flex-wrap items-center gap-2.5">
                <Select
                  value={vertical}
                  onValueChange={(v) => changeVertical(v as LandingPageVertical)}
                >
                  <SelectTrigger className="h-9.5 min-w-[200px] rounded-xl border-slate-200 bg-white font-semibold text-xs shadow-sm">
                    <SelectValue placeholder="Choisir un modèle..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {VERTICALS.map((item) => {
                      const Icon = item.icon
                      return (
                        <SelectItem key={item.value} value={item.value} className="py-2">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-mq-ink shrink-0" />
                            <span className="font-semibold text-xs">{item.label}</span>
                            <span className="text-[10px] text-slate-400">({item.model})</span>
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setModalOpen(true)}
                  className="h-9.5 shrink-0 rounded-xl border-slate-200 bg-white px-3 font-semibold text-xs hover:border-slate-300 hover:bg-slate-100/70 shadow-sm"
                >
                  <Sparkles className="mr-1.5 h-3.5 w-3.5 text-mq-coral" />
                  Catalogue visuel
                </Button>
              </div>
            </div>

            {/* CARTE DE PRÉSENTATION DU MODÈLE ACTIF */}
            {verticalMeta ? (
              <div className="relative overflow-hidden rounded-xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-sm transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mq-ink text-mq-signal shadow-sm ring-1 ring-slate-900/10">
                    <ActiveIcon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        {verticalMeta.label}
                      </h3>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                        {verticalMeta.model}
                      </span>
                      <span className="rounded-full bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                        {verticalMeta.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                      {verticalMeta.description}
                    </p>

                    <div className="pt-2.5 flex flex-wrap items-center gap-1.5 border-t border-slate-100">
                      <span className="text-[11px] font-semibold text-slate-400 mr-1">
                        Champs inclus :
                      </span>
                      {verticalMeta.fields.map((f) => (
                        <span
                          key={f}
                          className="rounded-md bg-slate-100/90 border border-slate-200/50 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* MODAL CATALOGUE VISUEL DES MODÈLES */}
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col p-6 gap-4 overflow-hidden rounded-2xl">
              <DialogHeader className="space-y-1 text-left">
                <DialogTitle className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Sparkles className="h-5 w-5 text-mq-coral" />
                  Catalogue des modèles QRious
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500">
                  Sélectionnez le type et la structure de landing page adaptés à vos objectifs.
                </DialogDescription>
              </DialogHeader>

              {/* RECHERCHE ET RECHERCHE PAR CATÉGORIES */}
              <div className="space-y-3 pt-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Rechercher par nom, métier ou fonction (ex: resto, art, vCard, avis)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-10 rounded-xl text-sm"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 text-xs">
                  {[
                    'Tous',
                    'Général',
                    'Hospitalité & Commerce',
                    'Art & Événements',
                    'Immobilier & Services',
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        'rounded-lg px-3 py-1.5 font-semibold transition-colors',
                        selectedCategory === cat
                          ? 'bg-mq-ink text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* GRILLE DES MODÈLES */}
              <div className="flex-1 overflow-y-auto pr-1">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 pb-2">
                  {filteredVerticals.map((item) => {
                    const ItemIcon = item.icon
                    const isSelected = vertical === item.value
                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => {
                          changeVertical(item.value)
                          setModalOpen(false)
                        }}
                        className={cn(
                          'group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all',
                          isSelected
                            ? 'border-mq-ink bg-slate-900 text-white shadow-md ring-2 ring-mq-ink'
                            : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-sm',
                        )}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span
                              className={cn(
                                'flex h-9 w-9 items-center justify-center rounded-lg',
                                isSelected
                                  ? 'bg-mq-signal/20 text-mq-signal'
                                  : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200',
                              )}
                            >
                              <ItemIcon className="h-5 w-5" />
                            </span>
                            {isSelected ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-mq-signal px-2 py-0.5 text-[11px] font-bold text-mq-ink">
                                <Check className="h-3 w-3" /> Sélectionné
                              </span>
                            ) : (
                              <span className="text-[11px] font-medium text-slate-400">
                                {item.model}
                              </span>
                            )}
                          </div>

                          <div className="font-bold text-sm leading-tight">{item.label}</div>
                          <p
                            className={cn(
                              'mt-1 text-xs leading-relaxed line-clamp-2',
                              isSelected ? 'text-white/70' : 'text-slate-500',
                            )}
                          >
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-100/15 flex flex-wrap gap-1">
                          {item.fields.map((f) => (
                            <span
                              key={f}
                              className={cn(
                                'rounded px-1.5 py-0.5 text-[10px] font-medium',
                                isSelected
                                  ? 'bg-white/10 text-white/80'
                                  : 'bg-slate-100 text-slate-600',
                              )}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
          {vertical === 'redirect' ? <RedirectFields page={page} /> : null}
          {vertical === 'art' ? <ArtFields page={page} tab={contentTab} /> : null}
          {vertical === 'immo' ? (
            <ImmoFields page={page} tab={contentTab} dpe={dpe} setDpe={setDpe} />
          ) : null}
          {vertical === 'vcard' ? <VcardFields page={page} tab={contentTab} /> : null}
          {vertical === 'product' ? <ProductFields page={page} tab={contentTab} /> : null}
          {vertical === 'feedback' ? <FeedbackFields page={page} tab={contentTab} /> : null}
          {vertical === 'tourism' ? <TourismFields page={page} tab={contentTab} /> : null}
          {vertical === 'chrd' ? <ChrdFields page={page} tab={contentTab} /> : null}
          {vertical === 'corporate_event' ? <CorporateEventFields page={page} tab={contentTab} /> : null}
          {vertical === 'ugc_retail' ? <UgcRetailFields page={page} tab={contentTab} /> : null}
          {vertical === 'field_service' ? <FieldServiceFields page={page} tab={contentTab} /> : null}
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

          {/* Section Smart Routing Dynamique */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>⏰ Smart Routing & Programmation Dynamique</span>
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Changez automatiquement le contenu ou redirigez les personnes scannant ce QR selon l’heure, la date ou pour un test A/B.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="smartRoutingMode">Mode de routage dynamique</Label>
                <select
                  id="smartRoutingMode"
                  name="smartRoutingMode"
                  defaultValue={page?.smartRouting?.mode ?? 'none'}
                  className={selectClassName}
                >
                  <option value="none">Désactivé — Toujours afficher ce modèle fixe</option>
                  <option value="time_slots">Règles Horaires — Ex: Petit-Déjeuner / Déjeuner / Soir</option>
                  <option value="event_timeline">Chronologie Événement — Ex: Avant / Pendant / Après</option>
                  <option value="ab_test">A/B Testing 50/50 — Ex: Split de trafic entre 2 variantes</option>
                </select>
              </div>

              {/* Créneaux Horaires */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">1. Plages Horaires (Restauration / Bar / CHRD)</h4>
                <div className="grid gap-3 sm:grid-cols-4 text-xs">
                  <Field id="slot1Label" label="Créneau 1 (ex: Petit-déj)" defaultValue={page?.smartRouting?.timeRules?.[0]?.label ?? 'Petit-déjeuner'} />
                  <Field id="slot1Start" label="Début (HH:mm)" defaultValue={page?.smartRouting?.timeRules?.[0]?.startTime ?? '07:00'} />
                  <Field id="slot1End" label="Fin (HH:mm)" defaultValue={page?.smartRouting?.timeRules?.[0]?.endTime ?? '11:00'} />
                  <Field id="slot1Target" label="Slug ou Redirection" defaultValue={page?.smartRouting?.timeRules?.[0]?.targetSlug} placeholder="menu-matin" />
                </div>
                <div className="grid gap-3 sm:grid-cols-4 text-xs">
                  <Field id="slot2Label" label="Créneau 2 (ex: Déjeuner)" defaultValue={page?.smartRouting?.timeRules?.[1]?.label ?? 'Déjeuner'} />
                  <Field id="slot2Start" label="Début (HH:mm)" defaultValue={page?.smartRouting?.timeRules?.[1]?.startTime ?? '12:00'} />
                  <Field id="slot2End" label="Fin (HH:mm)" defaultValue={page?.smartRouting?.timeRules?.[1]?.endTime ?? '15:00'} />
                  <Field id="slot2Target" label="Slug ou Redirection" defaultValue={page?.smartRouting?.timeRules?.[1]?.targetSlug} placeholder="menu-midi" />
                </div>
                <div className="grid gap-3 sm:grid-cols-4 text-xs">
                  <Field id="slot3Label" label="Créneau 3 (ex: Cocktails)" defaultValue={page?.smartRouting?.timeRules?.[2]?.label ?? 'Soir / Cocktails'} />
                  <Field id="slot3Start" label="Début (HH:mm)" defaultValue={page?.smartRouting?.timeRules?.[2]?.startTime ?? '19:00'} />
                  <Field id="slot3End" label="Fin (HH:mm)" defaultValue={page?.smartRouting?.timeRules?.[2]?.endTime ?? '23:30'} />
                  <Field id="slot3Target" label="Slug ou Redirection" defaultValue={page?.smartRouting?.timeRules?.[2]?.targetSlug} placeholder="carte-soir" />
                </div>
              </div>

              {/* Chronologie Événement */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">2. Chronologie Événementielle (Séminaire / Soirée)</h4>
                <div className="grid gap-3 sm:grid-cols-2 text-xs">
                  <Field id="eventStartDate" label="Date/Heure de début" defaultValue={page?.smartRouting?.eventSchedule?.eventStartDate} placeholder="2025-10-15T09:00" />
                  <Field id="eventEndDate" label="Date/Heure de fin" defaultValue={page?.smartRouting?.eventSchedule?.eventEndDate} placeholder="2025-10-17T18:00" />
                </div>
                <div className="grid gap-3 sm:grid-cols-3 text-xs">
                  <Field id="beforeEventTargetSlug" label="Avant événement (Compte à rebours)" defaultValue={page?.smartRouting?.eventSchedule?.beforeEventTargetSlug} placeholder="programme-preview" />
                  <Field id="duringEventTargetSlug" label="Pendant (Live Wall Photo)" defaultValue={page?.smartRouting?.eventSchedule?.duringEventTargetSlug} placeholder="galerie-live" />
                  <Field id="afterEventTargetSlug" label="Après (Formulaire Avis)" defaultValue={page?.smartRouting?.eventSchedule?.afterEventTargetSlug} placeholder="sondage-satisfaction" />
                </div>
              </div>

              {/* A/B Testing */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">3. A/B Testing (Split de Trafic)</h4>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    id="abTestEnabled"
                    name="abTestEnabled"
                    defaultChecked={page?.smartRouting?.abTest?.enabled ?? false}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  Activer le split A/B aléatoire sur les scans
                </label>
                <div className="grid gap-3 sm:grid-cols-3 text-xs">
                  <Field id="variantASlug" label="Slug Variante A (50%)" defaultValue={page?.smartRouting?.abTest?.variantASlug} placeholder="landing-promo-a" />
                  <Field id="variantBSlug" label="Slug Variante B (50%)" defaultValue={page?.smartRouting?.abTest?.variantBSlug} placeholder="landing-promo-b" />
                  <Field id="splitRatio" label="Ratio Variante A (%)" type="number" defaultValue={page?.smartRouting?.abTest?.splitRatio?.toString() ?? '50'} />
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 font-medium flex items-center justify-between shadow-sm">
          <span>⚠️ {error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-xs font-bold text-red-600 hover:underline ml-3 shrink-0"
          >
            Masquer
          </button>
        </div>
      ) : null}

      {success ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 font-medium shadow-sm">
          ✅ Modifications enregistrées avec succès.
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={(e) => goBack(e)}
          disabled={step === 0 || pending}
          className="h-10 px-4 font-semibold rounded-xl"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Retour
        </Button>

        {step < STEPS.length - 1 ? (
          <Button
            type="button"
            onClick={(e) => goNext(e)}
            className="h-10 px-5 font-bold bg-mq-ink text-white hover:bg-mq-ink/90 rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            Étape suivante : {STEPS[step + 1]?.label}
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={pending}
            className="h-10 px-6 font-bold bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl shadow-md transition-all"
          >
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
          placeholder="Une phrase d'accroche"
          className="sm:col-span-2"
        />
        {/* Champ texte brut caché pour compatibilité */}
        <input type="hidden" name="genericBody" value="" />
        {/* Éditeur WYSIWYG */}
        <div className="sm:col-span-2 space-y-1.5">
          <Label>Contenu principal (éditeur riche)</Label>
          <RichTextEditor
            name="genericBodyHtml"
            defaultValue={page?.genericData?.bodyHtml || page?.genericData?.body}
            placeholder="Rédigez votre contenu : titres, listes, liens, citations…"
          />
          <p className="text-xs text-muted-foreground">
            Utilisez la barre d’outils pour formater : gras, italic, titres, listes, liens…
          </p>
        </div>
        <TextAreaField
          id="genericSections"
          label="Sections supplémentaires (Titre : Contenu)"
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

function RedirectFields({ page }: { page?: LandingPage }) {
  return (
    <div className="space-y-5">
      {/* Bannière d'info */}
      <div className="rounded-xl border border-blue-200/80 bg-blue-50/60 p-4 flex gap-3">
        <ArrowUpRight className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-900">QR Code de Redirection</p>
          <p className="text-xs text-blue-700 mt-0.5">
            Ce QR code redirigera directement les visiteurs vers l’URL que vous définissez.
            Chaque scan est comptabilisé automatiquement dans vos statistiques.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="redirectTargetUrl">URL de destination *</Label>
          <Input
            id="redirectTargetUrl"
            name="redirectTargetUrl"
            type="url"
            defaultValue={page?.redirectData?.targetUrl || ''}
            placeholder="https://mon-site.fr/ma-page"
          />
          <p className="text-xs text-muted-foreground">
            L’URL complète vers laquelle le QR code redirigera (doit commencer par https://)
          </p>
        </div>
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="redirectLabel">Label descriptif (optionnel)</Label>
          <Input
            id="redirectLabel"
            name="redirectLabel"
            defaultValue={page?.redirectData?.label || ''}
            placeholder="Ex: Lien d’inscription conférence 2026"
          />
          <p className="text-xs text-muted-foreground">
            Ce libellé apparaît dans vos statistiques pour identifier facilement cette redirection.
          </p>
        </div>
      </div>

      {page?.scanCount !== undefined && page.scanCount !== null && (
        <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Scans totaux</p>
          <p className="text-3xl font-bold text-emerald-900 mt-1">{page.scanCount}</p>
          <p className="text-xs text-emerald-600 mt-0.5">Compteur réel — mis à jour à chaque scan</p>
        </div>
      )}
    </div>
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

function ChrdFields({ page, tab }: { page?: LandingPage; tab: string }) {
  return (
    <>
      <Panel active={tab === 'info'}>
        <Field id="establishmentName" label="Nom de l'établissement" defaultValue={page?.chrdData?.establishmentName} className="sm:col-span-2" placeholder="Hôtel la Plage / Bistro Gourmet" />
        <div className="space-y-1.5">
          <Label htmlFor="establishmentType">Type d'établissement</Label>
          <select id="establishmentType" name="establishmentType" defaultValue={page?.chrdData?.establishmentType ?? 'hotel'} className={selectClassName}>
            <option value="hotel">Hôtel</option>
            <option value="restaurant">Restaurant</option>
            <option value="bar">Bar / Cafétéria</option>
            <option value="camping">Camping / Gîte</option>
          </select>
        </div>
        <Field id="chrdWifiName" label="Nom du Wi-Fi" defaultValue={page?.chrdData?.wifiName} placeholder="Hotel-Guest-Wifi" />
        <Field id="chrdWifiPassword" label="Mot de passe Wi-Fi" defaultValue={page?.chrdData?.wifiPassword} placeholder="Bienvenue2025" />
        <TextAreaField id="chrdWelcomeMessage" label="Message de bienvenue" defaultValue={page?.chrdData?.welcomeMessage} className="sm:col-span-2" rows={3} placeholder="Toute l'équipe vous souhaite un excellent séjour !" />
      </Panel>

      <Panel active={tab === 'menu'}>
        <Field id="menuPdfUrl" label="Lien du Menu / Carte (PDF ou Web)" defaultValue={page?.chrdData?.menuPdfUrl} className="sm:col-span-2" placeholder="https://monsite.fr/menu.pdf" />
        <Field id="chrdGoogleReviewUrl" label="Lien Avis Google" defaultValue={page?.chrdData?.googleReviewUrl} className="sm:col-span-2" placeholder="https://g.page/r/..." />
        <Field id="chrdTripadvisorUrl" label="Lien TripAdvisor" defaultValue={page?.chrdData?.tripadvisorUrl} className="sm:col-span-2" placeholder="https://tripadvisor.fr/..." />
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input
            type="checkbox"
            id="enablePostcardGift"
            name="enablePostcardGift"
            defaultChecked={page?.chrdData?.enablePostcardGift ?? true}
            className="h-4 w-4 rounded border-slate-300"
          />
          Proposer une carte postale souvenir offerte aux clients
        </label>
        <Field id="postcardCode" label="Code cadeau carte postale" defaultValue={page?.chrdData?.postcardCode} placeholder="OFFERT2025" />
      </Panel>
    </>
  )
}

function CorporateEventFields({ page, tab }: { page?: LandingPage; tab: string }) {
  return (
    <>
      <Panel active={tab === 'info'}>
        <Field id="corporateEventName" label="Nom de l'événement" defaultValue={page?.corporateEventData?.eventName} className="sm:col-span-2" placeholder="Séminaire Annuel 2025" />
        <Field id="corporateCompanyName" label="Entreprise organisatrice" defaultValue={page?.corporateEventData?.companyName} placeholder="Acme Corp" />
        <Field id="eventDate" label="Date de l'événement" defaultValue={page?.corporateEventData?.eventDate} placeholder="15 Octobre 2025" />
        <Field id="eventLocation" label="Lieu / Salle" defaultValue={page?.corporateEventData?.location} className="sm:col-span-2" placeholder="Palais des Congrès, Salle A" />
        <Field id="eventWifiCode" label="Code Wi-Fi invités" defaultValue={page?.corporateEventData?.wifiCode} placeholder="AcmeSeminar2025" />
        <TextAreaField id="eventWelcomeMessage" label="Message d'accueil" defaultValue={page?.corporateEventData?.welcomeMessage} className="sm:col-span-2" rows={3} placeholder="Bienvenue à toutes nos équipes !" />
      </Panel>

      <Panel active={tab === 'agenda'}>
        <Field id="scheduleUrl" label="Lien du programme complet (PDF)" defaultValue={page?.corporateEventData?.scheduleUrl} className="sm:col-span-2" placeholder="https://..." />
        <Field id="slidesUrl" label="Lien des présentations / Slides" defaultValue={page?.corporateEventData?.slidesUrl} className="sm:col-span-2" placeholder="https://..." />
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input
            type="checkbox"
            id="liveWallEnabled"
            name="liveWallEnabled"
            defaultChecked={page?.corporateEventData?.liveWallEnabled ?? true}
            className="h-4 w-4 rounded border-slate-300"
          />
          Activer le Live Wall photo collaboratif Pixshare
        </label>
        <Field id="galleryCode" label="Code / Slug Galerie Pixshare" defaultValue={page?.corporateEventData?.galleryCode} placeholder="seminaire-2025" />
      </Panel>
    </>
  )
}

function UgcRetailFields({ page, tab }: { page?: LandingPage; tab: string }) {
  return (
    <>
      <Panel active={tab === 'info'}>
        <Field id="ugcBrandName" label="Nom de la marque" defaultValue={page?.ugcRetailData?.brandName} placeholder="Ma Marque" />
        <Field id="campaignTitle" label="Titre de l'opération promo" defaultValue={page?.ugcRetailData?.campaignTitle} placeholder="Partagez votre style & gagnez 15%" />
        <Field id="ugcProductName" label="Nom du produit" defaultValue={page?.ugcRetailData?.productName} className="sm:col-span-2" placeholder="Édition Limitée Été" />
        <TextAreaField id="ugcInstructions" label="Consignes de participation" defaultValue={page?.ugcRetailData?.instructions} className="sm:col-span-2" rows={3} placeholder="Prenez une photo de votre produit et recevez votre bon d'achat immédiat." />
      </Panel>

      <Panel active={tab === 'campaign'}>
        <Field id="rewardDiscountCode" label="Code promo offert" defaultValue={page?.ugcRetailData?.rewardDiscountCode} placeholder="PROMO15OFF" />
        <Field id="rewardDescription" label="Description du cadeau" defaultValue={page?.ugcRetailData?.rewardDescription} placeholder="15% de réduction sur votre prochaine commande" />
        <Field id="rulesUrl" label="Lien du règlement du jeu" defaultValue={page?.ugcRetailData?.rulesUrl} className="sm:col-span-2" placeholder="https://..." />
        <Field id="ugcSupportEmail" label="Email support client" type="email" defaultValue={page?.ugcRetailData?.supportEmail} className="sm:col-span-2" />
      </Panel>
    </>
  )
}

function FieldServiceFields({ page, tab }: { page?: LandingPage; tab: string }) {
  return (
    <>
      <Panel active={tab === 'info'}>
        <Field id="assetName" label="Nom de l'équipement" defaultValue={page?.fieldServiceData?.assetName} className="sm:col-span-2" placeholder="Groupe Électrogène XL-500" />
        <Field id="assetId" label="Numéro de série / ID Asset" defaultValue={page?.fieldServiceData?.assetId} placeholder="SN-2025-9981" />
        <Field id="assetCategory" label="Catégorie" defaultValue={page?.fieldServiceData?.category} placeholder="Énergie / Moteur" />
        <Field id="assetLocation" label="Emplacement (Bâtiment, Salle)" defaultValue={page?.fieldServiceData?.location} className="sm:col-span-2" placeholder="Bâtiment B - Sous-sol" />
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="assetStatus">Statut de l'équipement</Label>
          <select id="assetStatus" name="assetStatus" defaultValue={page?.fieldServiceData?.status ?? 'operational'} className={selectClassName}>
            <option value="operational">Opérationnel</option>
            <option value="maintenance_required">Maintenance requise</option>
            <option value="out_of_service">Hors service</option>
          </select>
        </div>
      </Panel>

      <Panel active={tab === 'maintenance'}>
        <Field id="lastInspectionDate" label="Date dernière inspection" defaultValue={page?.fieldServiceData?.lastInspectionDate} placeholder="12/06/2025" />
        <Field id="nextInspectionDate" label="Prochaine inspection prévue" defaultValue={page?.fieldServiceData?.nextInspectionDate} placeholder="12/12/2025" />
        <Field id="documentationUrl" label="Lien Fiche technique / Manuel PDF" defaultValue={page?.fieldServiceData?.documentationUrl} className="sm:col-span-2" placeholder="https://..." />
        <Field id="contactTechnicianPhone" label="Téléphone astreinte technique" defaultValue={page?.fieldServiceData?.contactTechnicianPhone} placeholder="+33 6..." />
        <Field id="emergencyContact" label="Numéro d'urgence" defaultValue={page?.fieldServiceData?.emergencyContact} placeholder="112 / Astreinte 24h" />
        <TextAreaField id="maintenanceNotes" label="Consignes & notes de maintenance" defaultValue={page?.fieldServiceData?.maintenanceNotes} className="sm:col-span-2" rows={3} placeholder="Vérifier la pression de l'huile avant démarrage..." />
      </Panel>
    </>
  )
}

